import { z } from "zod";

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Language = z.infer<typeof LanguageSchema>;