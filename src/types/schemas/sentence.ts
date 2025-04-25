import { z } from "zod";

// Definition schema for word definitions
export const DefinitionSchema = z.object({
  word: z.string(),
  definition: z.string(),
});

// Main schema for sentence data
export const SentenceDataSchema = z.object({
  sentence: z.string(),
  translation: z.string(),
  definitions: z.array(DefinitionSchema),
});

// Schema for an array of sentence data
export const SentenceDataArraySchema = z.object({
  sentences: z.array(SentenceDataSchema),
});
