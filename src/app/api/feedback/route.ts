import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { loadPrompt } from "@/utils/prompt-loader";

// Type for the expected request body
interface FeedbackRequest {
  text: string;
  theme: string;
  language: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as FeedbackRequest;
    const { text, theme, language } = body;

    if (!text || !theme || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const systemPrompt = await loadPrompt('src/prompts/examples/feedback-example.md');
    const userPrompt = await loadPrompt('src/prompts/feedback-prompt.md', {
      text,
      theme,
      language,
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: systemPrompt },
            { type: "text", text: userPrompt }
          ]
        }
      ]
    });

    const content = msg.content[0];
    let feedbackData;
    if (content.type === 'text') {
      feedbackData = JSON.parse(content.text);
    }

    return NextResponse.json(feedbackData);
  } catch (error) {
    console.error("Error processing feedback request:", error);
    return NextResponse.json(
      { error: "Failed to process feedback request" },
      { status: 500 }
    );
  }
} 