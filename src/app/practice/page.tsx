"use client";

import { Card } from "@/components/Card";
import { EssayInput } from "@/components/EssayInput";
import { FeedbackContent } from "@/components/FeedbackContent";
import { InputPrompt } from "@/components/InputPrompt";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useUser } from "@/providers/LoggedUserProvider";

// Type for the feedback response
interface FeedbackResponse {
  overallScore: number;
  overallFeedback: Array<string>;
  grammarScore: number;
  grammarFeedback: Array<string>;
  spellingScore: number;
  spellingFeedback: Array<string>;
  styleScore: number;
  styleFeedback: Array<string>;
  punctuationScore: number;
  punctuationFeedback: Array<string>;
}

export interface InputPrompt {
  theme: string;
  prompt: string;
  targetWordCount: number;
  description: string;
  infoPoints: Array<InfoPoints>;
}

export interface InfoPoints {
  id: string;
  content: string;
  category?: string;
}

export default function Home() {
  const [text, setText] = useState("");
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const t = useSearchParams();

  const handleGetFeedback = async () => {
    if (!text.trim()) return;

    setIsLoadingFeedback(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          theme: t.get("theme") ?? "",
          language: user.language || "da", // Using user's language preference, fallback to Danish
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get feedback");
      }
      const data = await response.json();
      setFeedback(data);
    } catch (err) {
      setError("Failed to get feedback. Please try again.");
      console.error("Error getting feedback:", err);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-full p-xLarge gap-xLarge flex-col xl:flex-row">
        <div className={"flex flex-col gap-large items-start w-full"}>
          <Card padding="p-large">
            <InputPrompt />
          </Card>
          <EssayInput
            handleGetFeedback={handleGetFeedback}
            text={text}
            setText={setText}
            loading={isLoadingFeedback}
            error={error}
          />
        </div>
        <Card>
          {feedback && (
            <FeedbackContent
              overallScore={feedback.overallScore}
              overallFeedback={feedback.overallFeedback}
              grammarScore={feedback.grammarScore}
              grammarFeedback={feedback.grammarFeedback}
              spellingScore={feedback.spellingScore}
              spellingFeedback={feedback.spellingFeedback}
              styleScore={feedback.styleScore}
              styleFeedback={feedback.styleFeedback}
              punctuationScore={feedback.punctuationScore}
              punctuationFeedback={feedback.punctuationFeedback}
            />
          )}
        </Card>
      </div>
    </Suspense>
  );
}
