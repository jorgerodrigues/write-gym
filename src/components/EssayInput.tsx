"use client";
import { SendIcon } from "@/icons/Send";
import { Button } from "./Button";
import { Card } from "./Card";
import { TextAreaInput } from "./TextAreaInput";
import { useState } from "react";

interface EssayInputProps {
  handleGetFeedback: () => Promise<void>;
  text: string;
  setText: (text: string) => void;
  loading: boolean;
  error: string | null;
}

export const EssayInput: React.FC<EssayInputProps> = ({
  handleGetFeedback,
  text,
  setText,
  loading,
  error,
}) => {
  const [wordCount, setWordCount] = useState(0);

  return (
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
          disabled={loading || !text.trim()}
        >
          {loading ? "Getting feedback..." : "Get feedback"}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </Card>
  );
};
