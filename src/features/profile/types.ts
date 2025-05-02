import { z } from "zod";

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Language = z.infer<typeof LanguageSchema>;

export const BasicUserInfo = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type BasicUserInfo = z.infer<typeof BasicUserInfo>;
