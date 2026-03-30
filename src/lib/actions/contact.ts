"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import { CONTACT_EMAIL } from "@/lib/constants";

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization") || undefined,
    teamSize: formData.get("teamSize") || undefined,
    message: formData.get("message") || undefined,
    _honeypot: formData.get("_honeypot") || undefined,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: "Invalid form data." };
  }

  const { name, email, organization, teamSize, message, _honeypot } = parsed.data;

  // Honeypot check — bots fill this field, humans don't
  if (_honeypot) {
    return { status: "success" }; // silently succeed to not tip off bots
  }

  const html = `
    <h2>New demo request from Shiftly landing page</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ""}
    ${teamSize ? `<p><strong>Team size:</strong> ${teamSize}</p>` : ""}
    ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Shiftly <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Demo request from ${name}`,
      html,
    });

    if (error) {
      return { status: "error", message: "Failed to send message. Please try again." };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to send message. Please try again." };
  }
}
