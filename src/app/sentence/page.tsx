"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useAnimatedText } from "@/hooks/useAnimatedText";
import { apiFetcher } from "@/lib/api/apiFetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@/features/card/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/providers/LoggedUserProvider";

export default function Page() {
  const [showDefinition, setShowDefinition] = useState(false);
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cards", user.id],
    queryFn: () =>
      apiFetcher<Array<CardType>>(`api/card/types/sentence/${user.id}`),
    enabled: Boolean(user.id),
  });

  const { mutate: logCard } = useMutation({
    mutationFn: (r: number) =>
      apiFetcher(`api/card/${selectedCardId}/review`, {
        method: "POST",
        body: JSON.stringify({
          rating: r,
        }),
      }),
  });

  useEffect(() => {
    const cardInfo = data?.[selectedSentenceIdx];
    if (cardInfo) {
      setSelectedCardId(cardInfo.id);
    }
  }, [data, selectedSentenceIdx]);

  const handleNextSentence = async () => {
    if (!data?.length) return;

    if (selectedSentenceIdx < data?.length - 1) {
      setSelectedSentenceIdx((prev) => prev + 1);
    }

    if (selectedSentenceIdx === data?.length - 1) {
      await refetch();
      setSelectedSentenceIdx(0);
    }

    setShowDefinition(false);
    return;
  };

  const handleSkip = () => {
    handleNextSentence();
  };

  const handleShowAnswer = () => {
    setShowDefinition(true);
  };

  const handleWrong = () => {
    logCard(0);
    handleNextSentence();
    return;
  };

  const handleRight = () => {
    logCard(5);
    handleNextSentence();
  };

  const selectedSentence = useMemo(() => {
    if (!data) {
      return null;
    }
    if (selectedSentenceIdx > data?.length - 1) {
      return null;
    }

    if (selectedSentenceIdx < 0) {
      return null;
    }

    if (!data?.[selectedSentenceIdx]) {
      return null;
    }

    const rawData = data[selectedSentenceIdx];
    return {
      id: rawData.id,
      sentence: rawData.front,
      translation: rawData.back,
      definitions: rawData?.sentence?.words?.map((word) => ({
        id: word.id,
        word: word.word,
        definition: word.definition,
      })),
    };
  }, [data, selectedSentenceIdx]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className={`w-full flex flex-col items-center justify-center h-[100vh] gap-xLarge`}
      layout={"position"}
    >
      {!selectedSentence && (
        <div>
          Generating new sentences. Wait a couple of minutes or come back later
        </div>
      )}
      {selectedSentence && (
        <>
          <Sentence
            content={selectedSentence?.sentence ?? ""}
            onSkip={handleSkip}
            onShowAnswer={handleShowAnswer}
            answerDisplayed={showDefinition}
          />
          <AnimatePresence mode={"wait"}>
            {showDefinition && (
              <Definition
                onWrong={handleWrong}
                onRight={handleRight}
                sentenceDefinition={selectedSentence?.translation ?? ""}
                words={selectedSentence?.definitions ?? []}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

type SentenceProps = {
  content: string;
  answerDisplayed?: boolean;
  onSkip: () => void;
  onShowAnswer: () => void;
};

const Sentence: React.FC<SentenceProps> = ({
  content,
  onSkip,
  onShowAnswer,
  answerDisplayed,
}) => {
  const contentValue = useAnimatedText(content);

  return (
    <motion.div
      layout={"position"}
      className={"flex flex-col items-center gap-xLarge w-[80ch]"}
    >
      <motion.p
        layout={"position"}
        className={
          "flex w-full flex-1 text-[60px] font-medium text-text-dark text-pretty"
        }
      >
        {contentValue}
      </motion.p>
      {!answerDisplayed && (
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className={"flex w-full justify-between"}
        >
          <Button variant="secondary" onClick={onSkip}>
            Skip
          </Button>
          <Button variant="primary" onClick={onShowAnswer}>
            Show answer
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

type DefinitionProps = {
  sentenceDefinition: string;
  words: Array<WordDefinition>;
  onWrong: () => void;
  onRight: () => void;
};

type WordDefinition = {
  word: string;
  definition: string;
};

const Definition: React.FC<DefinitionProps> = ({
  sentenceDefinition,
  words,
  onWrong,
  onRight,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        "flex flex-col item-center justify-center gap-large w-full max-w-[600px] xl:max-w-[850px]"
      }
    >
      <Card className={"flex items-center w-full gap-large"}>
        <p
          className={
            "text-large font-medium wrap-pretty max-w-[600px] text-center"
          }
        >
          {sentenceDefinition}
        </p>
        <div className={"flex flex-col w-full gap-small"}>
          {words.map((w) => {
            return (
              <div key={w.word} className={"flex flex-col"}>
                <p className={"font-medium capitalize"}>{w.word}: </p>
                <p>{w.definition}</p>
              </div>
            );
          })}
        </div>
      </Card>
      <div className={"flex w-full justify-between"}>
        <Button variant="secondary" onClick={onWrong}>
          Wrong
        </Button>
        <Button variant="primary" onClick={onRight}>
          Correct
        </Button>
      </div>
    </motion.div>
  );
};
