import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { loadPrompt } from "@/utils/prompt-loader";

interface ThemeRequest {
  language: string;
}

interface ThemeResponse {
  theme: string;
  inspiration: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ThemeRequest;
    const { language } = body;

    if (!language) {
      return NextResponse.json(
        { error: "Language is required" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Load the example first
    const examples = await loadPrompt("src/prompts/examples/theme-example.md");

    // Load the main prompt and include the examples
    const themePrompt = await loadPrompt("src/prompts/theme-prompt.md", {
      language,
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      temperature: 0.9, // Slightly higher temperature for more creative themes
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: themePrompt },
            { type: "text", text: examples },
          ],
        },
      ],
    });

    const content = msg.content[0];
    let themeData: ThemeResponse | undefined;

    if (content.type === "text") {
      themeData = JSON.parse(content.text);
    }

    if (!themeData) {
      throw new Error("Invalid response format from AI");
    }

    return NextResponse.json(themeData);
  } catch (error) {
    console.error("Error generating theme:", error);
    return NextResponse.json(
      { error: "Failed to generate theme" },
      { status: 500 }
    );
  }
}
