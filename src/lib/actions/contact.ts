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
    phone: formData.get("phone") || undefined,
    teamSize: formData.get("teamSize") || undefined,
    message: formData.get("message") || undefined,
    _honeypot: formData.get("_honeypot") || undefined,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: "Invalid form data." };
  }

  const { name, email, organization, phone, teamSize, message, _honeypot } = parsed.data;

  // Honeypot check — bots fill this field, humans don't
  if (_honeypot) {
    return { status: "success" }; // silently succeed to not tip off bots
  }

  const schedulingRows = message
    ? message
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const colonIdx = line.indexOf(": ");
          if (colonIdx === -1) return `<tr><td colspan="2" style="padding:10px 14px;font-size:14px;color:#374151;">${line}</td></tr>`;
          const label = line.slice(0, colonIdx);
          const value = line.slice(colonIdx + 2);
          return `
            <tr>
              <td style="padding:10px 14px;font-size:13px;color:#6b7280;width:55%;border-bottom:1px solid #f3f4f6;">${label}</td>
              <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
            </tr>`;
        })
        .join("")
    : "";

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">

      <div style="background:#e8602e;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">New demo request</h1>
        <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Shiftly landing page</p>
      </div>

      <div style="padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;width:35%;border-bottom:1px solid #f3f4f6;">Name</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Email</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="color:#e8602e;text-decoration:none;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Phone</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${phone}</td>
          </tr>` : ""}
          ${organization ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Organization</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${organization}</td>
          </tr>` : ""}
          ${teamSize ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;">Team size</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;">${teamSize}</td>
          </tr>` : ""}
        </table>

        ${schedulingRows ? `
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Scheduling information</p>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;">
          ${schedulingRows}
        </table>` : ""}

      </div>
    </div>
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
      console.error("[Resend error]", error);
      return { status: "error", message: "Failed to send message. Please try again." };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[submitContact error]", err);
    return { status: "error", message: "Failed to send message. Please try again." };
  }
}
