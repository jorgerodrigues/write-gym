"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FeedbackContent } from "@/components/FeedbackContent";
import { InputPrompt } from "@/components/InputPrompt";
import { TextAreaInput } from "@/components/TextAreaInput";
import { SendIcon } from "@/icons/Send";
import { Suspense, useEffect, useState } from "react";


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

interface InputPrompt {
 theme: string;
 prompt: string;
 targetWordCount: number;
 description: string;
 infoPoints: Array<InfoPoints>; 
}

interface InfoPoints {
  id: string;
  content: string;
  category?: string;
}

export default function Home() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [themeInfo, setThemeInfo] = useState<InputPrompt>()

  useEffect(() => {
    handleGetTheme()
  }, [])

  const handleGetFeedback = async () => {
    if (!text.trim()) return;
    
    setIsLoadingFeedback(true);
    setError(null);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          theme: themeInfo?.theme ?? '',
          language: "Danish", // You might want to make this configurable
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }
      
      const data = await response.json();
      setFeedback(data);
    } catch (err) {
      setError('Failed to get feedback. Please try again.');
      console.error('Error getting feedback:', err);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const handleGetTheme = async () => {
    setIsLoadingPrompt(true);
    setError(null);
    
    try {
      const response = await fetch('/api/theme-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: "Danish", // Match the language used in feedback
        }),
      });
     
      if (!response.ok) {
        throw new Error('Failed to get theme');
      }
      
      const data = await response.json();
      // TODO: Update state with new theme data

      const infoPoints = Array.isArray(data?.inspiration) ? data?.inspiration : []
      const theme = data?.theme ?? ""
      const description = data?.description


      setThemeInfo({
        theme: 'Writing practice',
        infoPoints: formatInfoPoints(infoPoints),
        prompt: theme,
        targetWordCount: 400,
        description
      })

      
    } catch (err) {
      setError('Failed to get theme. Please try again.');
      console.error('Error getting theme:', err);
    } finally {
      setIsLoadingPrompt(false);
    }
  }

  const formatInfoPoints = (points: Array<string>) => {
    return points.map((i, idx) => {
      return {
        id: idx.toString(),
        content: i
      }
    })
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-full p-xLarge gap-xLarge flex-col xl:flex-row">
        <div className={"flex flex-col gap-large items-start w-full"}>
          <Card padding="p-large">
            <InputPrompt {...themeInfo} loading={isLoadingPrompt} />
          </Card>
          <Card padding="p-large">
            <TextAreaInput
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder={"Start writing here..."}
              setWordCount={setWordCount}
            />
            <div className={"flex w-full justify-between px-large py-small"}>
              <div className="flex gap-small">
                <div>
                  <p className={"text-caption text-text-light"}>Words:</p>
                  <p className={"text-base-bold font-mono"}>{wordCount}</p>
                </div>
              </div>
              <Button 
                variant={"primary"} 
                icon={SendIcon}
                onClick={handleGetFeedback}
                disabled={isLoadingFeedback || !text.trim()}
              >
                {isLoadingFeedback ? 'Getting feedback...' : 'Get feedback'}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 mt-2 text-sm">{error}</p>
            )}
          </Card>
        </div>
        {feedback && (
          <Card>
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
          </Card>
        )}
      </div>
    </Suspense>
  );
}
