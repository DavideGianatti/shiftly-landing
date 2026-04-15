"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import { CONTACT_EMAIL } from "@/lib/constants";

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSchedulingHtml(message: string, configJson: string | undefined): string {
  if (!message && !configJson) return "";

  const sections: string[] = [];

  if (message) {
    const blocks = message.split(/\n(?===)/).filter(Boolean);
    for (const block of blocks) {
      const lines = block.split("\n").filter(Boolean);
      const header = lines[0].replace(/^===\s*/, "").replace(/\s*===$/, "");
      const rows = lines.slice(1);
      if (!rows.length) continue;
      sections.push(`
        <p style="margin:16px 0 6px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(header)}</p>
        <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;overflow:hidden;">
          ${rows
            .map(
              (line) =>
                `<tr><td style="padding:8px 12px;font-size:13px;color:#374151;border-bottom:1px solid #f3f4f6;">${escapeHtml(line)}</td></tr>`
            )
            .join("")}
        </table>`);
    }
  }

  if (configJson) {
    sections.push(`
      <p style="margin:16px 0 6px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Configuration JSON</p>
      <pre style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px;font-size:11px;color:#374151;overflow-x:auto;white-space:pre-wrap;word-break:break-all;">${escapeHtml(configJson)}</pre>`);
  }

  return sections.join("");
}

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
    configJson: formData.get("configJson") || undefined,
    _honeypot: formData.get("_honeypot") || undefined,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: "Invalid form data." };
  }

  const {
    name,
    email,
    organization,
    phone,
    teamSize,
    message,
    configJson,
    _honeypot,
  } = parsed.data;

  // Honeypot check — bots fill this field, humans don't
  if (_honeypot) {
    return { status: "success" };
  }

  // File attachment (optional, ≤ 10 MB)
  const fileField = formData.get("scheduleFile");
  const attachments: { filename: string; content: Buffer }[] = [];
  if (fileField instanceof File && fileField.size > 0) {
    const MAX = 10 * 1024 * 1024;
    if (fileField.size <= MAX) {
      const buf = Buffer.from(await fileField.arrayBuffer());
      attachments.push({ filename: fileField.name, content: buf });
    }
  }

  const schedulingHtml = buildSchedulingHtml(message ?? "", configJson);

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">

      <div style="background:#e8602e;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">New demo request</h1>
        <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Shiftly landing page</p>
      </div>

      <div style="padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">

        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;width:35%;border-bottom:1px solid #f3f4f6;">Name</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Email</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;"><a href="mailto:${escapeHtml(email)}" style="color:#e8602e;text-decoration:none;">${escapeHtml(email)}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Phone</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(phone)}</td>
          </tr>` : ""}
          ${organization ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Organization</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(organization)}</td>
          </tr>` : ""}
          ${teamSize ? `
          <tr>
            <td style="padding:10px 14px;font-size:13px;color:#6b7280;">Team size</td>
            <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#111827;">${escapeHtml(teamSize)}</td>
          </tr>` : ""}
        </table>

        ${schedulingHtml}

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
      ...(attachments.length > 0 ? { attachments } : {}),
    });

    if (error) {
      console.error("[Resend error]", error);
      return {
        status: "error",
        message: "Failed to send message. Please try again.",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[submitContact error]", err);
    return {
      status: "error",
      message: "Failed to send message. Please try again.",
    };
  }
}
