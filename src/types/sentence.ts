import { z } from "zod";
import { WordSchema } from "./word";

export const SentenceSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  translation: z.string().optional(),
  words: z.array(WordSchema).optional(),

  userId: z.string().uuid(),
});
