import { z } from "zod";

export const WordSchema = z.object({
  id: z.string().uuid(),
  word: z.string(),
  definition: z.string(),
  language: z.string().optional(),

  sentenceId: z.string().uuid(),
});

export type User = z.infer<typeof WordSchema>;
