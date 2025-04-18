import prisma from "@/database/client";
import { loadPrompt } from "@/utils/prompt-loader";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject, generateText } from "ai";
import { NextRequest } from "next/server";
import { z } from "zod";

// Definition schema for word definitions
const DefinitionSchema = z.object({
  word: z.string(),
  definition: z.string(),
});

// Main schema for sentence data
const SentenceDataSchema = z.object({
  sentence: z.string(),
  translation: z.string(),
  definitions: z.array(DefinitionSchema),
});

// Schema for an array of sentence data
const SentenceDataArraySchema = z.object({
  sentences: z.array(SentenceDataSchema),
});

const possibleStructures = [
  "Questions",
  "Commands/imperatives",
  "Complex sentences with subordinate clauses",
  "Simple statements",
  "Conditional sentences (if/then)",
  "Sentences with time expressions",
  "Exclamations",
  "Comparative sentences",
  "Sentences with reported speech",
  "Sentences with modal verbs",
];

const levels = [
  "Level 1: Simple vocabulary, present tense only",
  "Level 2: Expanded vocabulary, present and past tenses",
  "Level 3: Intermediate vocabulary, multiple tenses",
  "Level 4: Advanced vocabulary, complex grammatical structures",
];

const possibleContexts = [
  "At a restaurant",
  "In a classroom",
  "During a job interview",
  "While traveling",
  "At a family gathering",
  "At a store",
  "In a business meeting",
  "At a doctor's office",
  "On public transportation",
  "During a phone conversation",
];

const possibleTopics = [
  "Food and drink",
  "Travel and transportation",
  "Family and relationships",
  "Work and career",
  "Health and wellness",
  "Education and learning",
  "Technology and gadgets",
  "Entertainment and leisure",
  "Nature and environment",
  "Fashion and style",
  "food and cooking",
  "shopping and errands",
  "family relationships",
  "work and career",
  "school and education",
  "hobbies and leisure",
  "travel and transportation",
  "weather and seasons",
  "health and wellness",
  "home and household",
  "technology and devices",
  "social interactions",
  "time and schedules",
  "celebrations and holidays",
  "pets and animals",
  "clothing and fashion",
  "emotions and feelings",
  "money and finances",
  "directions and locations",
  "sports and exercise",
  "entertainment and media",
  "restaurants and dining out",
  "arts and culture",
  "daily routines",
  "nature and environment",
  "community and neighborhood",
  "emergency situations",
  "personal preferences",
  "future plans",
  "past experiences",
];

// Export the schemas
export { DefinitionSchema, SentenceDataSchema, SentenceDataArraySchema };

export async function POST(request: Request) {
  // get userId and language from request body
  const body = await request.json();
  const { userId, language } = body;

  if (!userId || !language) {
    return new Response("missing-required-args", { status: 400 });
  }

  try {
    const structure_1 =
      possibleStructures[Math.floor(Math.random() * possibleStructures.length)];
    const structure_2 =
      possibleStructures[Math.floor(Math.random() * possibleStructures.length)];

    const level = levels[Math.floor(Math.random() * levels.length)];

    const context =
      possibleContexts[Math.floor(Math.random() * possibleContexts.length)];

    const topic =
      possibleTopics[Math.floor(Math.random() * possibleTopics.length)];

    const prompt = await loadPrompt(
      "src/prompts/generate-sentences-prompt.md",
      { language: "danish", structure_1, structure_2, level, context, topic }
    );
    console.log({ prompt });
    // generate 10 new sentences and store them in the database

    const { object } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      schema: SentenceDataArraySchema,
      temperature: 0.9,
      prompt,
    });

    for (const sentence of object.sentences) {
      await prisma.sentence.create({
        data: {
          content: sentence.sentence,
          translation: sentence.translation,
          words: {
            createMany: {
              data: sentence.definitions.map((d) => ({
                word: d.word,
                definition: d.definition,
                language: "da",
              })),
            },
          },
        },
      });
    }

    return new Response(JSON.stringify(object), {
      status: 200, // Or any other appropriate status code
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     // get the latest 10 sentences from the database
//     const { object } = await generateObject({
//       model: anthropic("claude-3-haiku-20240307"),
//       schema: SentenceDataArraySchema,
//       prompt: `
//      Generate an array with 2 entries.
//      The entries must be sentences in Danish.
//      The sentences should be about everyday life and be realistic.
//      The sentences should be written in common language.
//      Include the translation and definition of each word.
//      `,
//     });

//     return new Response(JSON.stringify(object));
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
