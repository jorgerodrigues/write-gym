import { z } from "zod";
import { SentenceSchema } from "../../types/sentence";

export const CardSchema = z.object({
  id: z.string().uuid(),
  front: z.string(),
  back: z.string(),
  repetitions: z.number().default(0),
  tags: z.array(z.string()).optional(),
  easeFactor: z.number(),
  interval: z.number(),
  nextDueDate: z.string().datetime().optional(),
  userId: z.string().uuid(),
  sentenceId: z.string().uuid().optional(),

  sentence: SentenceSchema.optional(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Card = z.infer<typeof CardSchema>;
