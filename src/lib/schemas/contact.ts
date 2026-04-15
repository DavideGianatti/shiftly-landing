import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254),
  organization: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  teamSize: z.enum(["1-10", "10-30", "30-100", "100+"]).optional(),
  message: z.string().max(10000).optional(),
  configJson: z.string().max(50000).optional(),
  _honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
