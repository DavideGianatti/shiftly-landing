import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254),
  organization: z.string().max(200).optional(),
  teamSize: z.enum(["1-10", "11-50", "51-200", "200+"]).optional(),
  message: z.string().max(1000).optional(),
  _honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
