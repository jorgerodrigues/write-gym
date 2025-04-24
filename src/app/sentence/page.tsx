"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useAnimatedText } from "@/hooks/useAnimatedText";
import { apiFetcher } from "@/lib/api/apiFetcher";
import { Card as CardType } from "@/types/card";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const fakeData = [
  {
    id: "1",
    sentence: "Hun læser en bog hver aften.",
    translation: "She reads a book every evening.",
    definitions: [
      {
        word: "Hun",
        definition: "She (personal pronoun)",
      },
      {
        word: "læser",
        definition: "Reads (verb, present tense of 'at læse')",
      },
      {
        word: "en",
        definition: "A/an (indefinite article)",
      },
      {
        word: "bog",
        definition: "Book (noun)",
      },
      {
        word: "hver",
        definition: "Every (adjective)",
      },
      {
        word: "aften",
        definition: "Evening (noun)",
      },
    ],
  },
  {
    id: "2",
    sentence: "Jeg kan godt lide at rejse til Danmark.",
    translation: "I like to travel to Denmark.",
    definitions: [
      {
        word: "Jeg",
        definition: "I (personal pronoun)",
      },
      {
        word: "kan",
        definition: "Can (modal verb)",
      },
      {
        word: "godt",
        definition: "Well, good (adverb used in expressions of liking)",
      },
      {
        word: "lide",
        definition: "Like, suffer (verb)",
      },
      {
        word: "at",
        definition: "To (infinitive marker)",
      },
      {
        word: "rejse",
        definition: "Travel (verb)",
      },
      {
        word: "til",
        definition: "To (preposition)",
      },
      {
        word: "Danmark",
        definition: "Denmark (proper noun)",
      },
    ],
  },
  {
    id: "3",
    sentence: "Vejret er koldt i dag.",
    translation: "The weather is cold today.",
    definitions: [
      {
        word: "Vejret",
        definition: "The weather (noun with definite article)",
      },
      {
        word: "er",
        definition: "Is (verb, present tense of 'at være')",
      },
      {
        word: "koldt",
        definition: "Cold (adjective)",
      },
      {
        word: "i",
        definition: "In, on (preposition)",
      },
      {
        word: "dag",
        definition: "Day, today (noun)",
      },
    ],
  },
  {
    id: "4",
    sentence: "Vi skal mødes på torvet klokken ti.",
    translation: "We will meet at the square at ten o'clock.",
    definitions: [
      {
        word: "Vi",
        definition: "We (personal pronoun)",
      },
      {
        word: "skal",
        definition: "Shall, must, will (modal verb)",
      },
      {
        word: "mødes",
        definition: "Meet (reflexive verb)",
      },
      {
        word: "på",
        definition: "On, at (preposition)",
      },
      {
        word: "torvet",
        definition: "The square (noun with definite article)",
      },
      {
        word: "klokken",
        definition: "Clock, o'clock (noun)",
      },
      {
        word: "ti",
        definition: "Ten (numeral)",
      },
    ],
  },
  {
    id: "5",
    sentence: "Børnene leger i haven.",
    translation: "The children are playing in the garden.",
    definitions: [
      {
        word: "Børnene",
        definition: "The children (noun with definite plural)",
      },
      {
        word: "leger",
        definition: "Play (verb, present tense of 'at lege')",
      },
      {
        word: "i",
        definition: "In (preposition)",
      },
      {
        word: "haven",
        definition: "The garden (noun with definite article)",
      },
    ],
  },
  {
    id: "6",
    sentence: "Han drikker kaffe om morgenen.",
    translation: "He drinks coffee in the morning.",
    definitions: [
      {
        word: "Han",
        definition: "He (personal pronoun)",
      },
      {
        word: "drikker",
        definition: "Drinks (verb, present tense of 'at drikke')",
      },
      {
        word: "kaffe",
        definition: "Coffee (noun)",
      },
      {
        word: "om",
        definition: "About, in, during (preposition)",
      },
      {
        word: "morgenen",
        definition: "The morning (noun with definite article)",
      },
    ],
  },
  {
    id: "7",
    sentence: "De taler dansk meget flydende.",
    translation: "They speak Danish very fluently.",
    definitions: [
      {
        word: "De",
        definition: "They (personal pronoun)",
      },
      {
        word: "taler",
        definition: "Speak (verb, present tense of 'at tale')",
      },
      {
        word: "dansk",
        definition: "Danish (noun/adjective)",
      },
      {
        word: "meget",
        definition: "Very, much (adverb)",
      },
      {
        word: "flydende",
        definition: "Fluent, flowing (adjective)",
      },
    ],
  },
  {
    id: "8",
    sentence: "Min ven bor i København.",
    translation: "My friend lives in Copenhagen.",
    definitions: [
      {
        word: "Min",
        definition: "My (possessive pronoun)",
      },
      {
        word: "ven",
        definition: "Friend (noun)",
      },
      {
        word: "bor",
        definition: "Lives (verb, present tense of 'at bo')",
      },
      {
        word: "i",
        definition: "In (preposition)",
      },
      {
        word: "København",
        definition: "Copenhagen (proper noun)",
      },
    ],
  },
  {
    id: "9",
    sentence: "Hvad koster denne trøje?",
    translation: "How much does this sweater cost?",
    definitions: [
      {
        word: "Hvad",
        definition: "What (interrogative pronoun)",
      },
      {
        word: "koster",
        definition: "Costs (verb, present tense of 'at koste')",
      },
      {
        word: "denne",
        definition: "This (demonstrative pronoun)",
      },
      {
        word: "trøje",
        definition: "Sweater (noun)",
      },
    ],
  },
  {
    id: "10",
    sentence: "Jeg er født i Aarhus.",
    translation: "I was born in Aarhus.",
    definitions: [
      {
        word: "Jeg",
        definition: "I (personal pronoun)",
      },
      {
        word: "er",
        definition: "Am, is, are (verb, present tense of 'at være')",
      },
      {
        word: "født",
        definition: "Born (past participle of 'at føde')",
      },
      {
        word: "i",
        definition: "In (preposition)",
      },
      {
        word: "Aarhus",
        definition: "Aarhus (proper noun, city in Denmark)",
      },
    ],
  },
  {
    id: "11",
    sentence: "Hvor mange mennesker bor i din by?",
    translation: "How many people live in your town?",
    definitions: [
      {
        word: "Hvor",
        definition: "Where, how (interrogative adverb)",
      },
      {
        word: "mange",
        definition: "Many (adjective)",
      },
      {
        word: "mennesker",
        definition: "People, humans (noun, plural)",
      },
      {
        word: "bor",
        definition: "Live (verb, present tense of 'at bo')",
      },
      {
        word: "i",
        definition: "In (preposition)",
      },
      {
        word: "din",
        definition: "Your (possessive pronoun)",
      },
      {
        word: "by",
        definition: "Town, city (noun)",
      },
    ],
  },
  {
    id: "12",
    sentence: "Jeg har glemt mine nøgler.",
    translation: "I have forgotten my keys.",
    definitions: [
      {
        word: "Jeg",
        definition: "I (personal pronoun)",
      },
      {
        word: "har",
        definition: "Have (verb, present tense of 'at have')",
      },
      {
        word: "glemt",
        definition: "Forgotten (past participle of 'at glemme')",
      },
      {
        word: "mine",
        definition: "My, mine (possessive pronoun, plural)",
      },
      {
        word: "nøgler",
        definition: "Keys (noun, plural)",
      },
    ],
  },
  {
    id: "13",
    sentence: "Hun spiser altid morgenmad.",
    translation: "She always eats breakfast.",
    definitions: [
      {
        word: "Hun",
        definition: "She (personal pronoun)",
      },
      {
        word: "spiser",
        definition: "Eats (verb, present tense of 'at spise')",
      },
      {
        word: "altid",
        definition: "Always (adverb)",
      },
      {
        word: "morgenmad",
        definition: "Breakfast (noun)",
      },
    ],
  },
  {
    id: "14",
    sentence: "De røde huse er typisk danske.",
    translation: "The red houses are typically Danish.",
    definitions: [
      {
        word: "De",
        definition: "The (definite article, plural)",
      },
      {
        word: "røde",
        definition: "Red (adjective, plural)",
      },
      {
        word: "huse",
        definition: "Houses (noun, plural)",
      },
      {
        word: "er",
        definition: "Are (verb, present tense of 'at være')",
      },
      {
        word: "typisk",
        definition: "Typical, typically (adjective/adverb)",
      },
      {
        word: "danske",
        definition: "Danish (adjective, plural)",
      },
    ],
  },
  {
    id: "15",
    sentence: "Kan du hjælpe mig med denne opgave?",
    translation: "Can you help me with this task?",
    definitions: [
      {
        word: "Kan",
        definition: "Can (modal verb)",
      },
      {
        word: "du",
        definition: "You (personal pronoun)",
      },
      {
        word: "hjælpe",
        definition: "Help (verb)",
      },
      {
        word: "mig",
        definition: "Me (personal pronoun, object form)",
      },
      {
        word: "med",
        definition: "With (preposition)",
      },
      {
        word: "denne",
        definition: "This (demonstrative pronoun)",
      },
      {
        word: "opgave",
        definition: "Task, assignment (noun)",
      },
    ],
  },
  {
    id: "16",
    sentence: "Hvordan kommer jeg til stationen?",
    translation: "How do I get to the station?",
    definitions: [
      {
        word: "Hvordan",
        definition: "How (interrogative adverb)",
      },
      {
        word: "kommer",
        definition: "Come, get (verb, present tense of 'at komme')",
      },
      {
        word: "jeg",
        definition: "I (personal pronoun)",
      },
      {
        word: "til",
        definition: "To (preposition)",
      },
      {
        word: "stationen",
        definition: "The station (noun with definite article)",
      },
    ],
  },
  {
    id: "17",
    sentence: "Vi skal besøge hendes familie i weekenden.",
    translation: "We are going to visit her family on the weekend.",
    definitions: [
      {
        word: "Vi",
        definition: "We (personal pronoun)",
      },
      {
        word: "skal",
        definition: "Shall, will, must (modal verb)",
      },
      {
        word: "besøge",
        definition: "Visit (verb)",
      },
      {
        word: "hendes",
        definition: "Her (possessive pronoun)",
      },
      {
        word: "familie",
        definition: "Family (noun)",
      },
      {
        word: "i",
        definition: "In, on (preposition)",
      },
      {
        word: "weekenden",
        definition: "The weekend (noun with definite article)",
      },
    ],
  },
  {
    id: "18",
    sentence: "Der er mange cykler i gaderne.",
    translation: "There are many bicycles in the streets.",
    definitions: [
      {
        word: "Der",
        definition: "There (adverb)",
      },
      {
        word: "er",
        definition: "Is, are (verb, present tense of 'at være')",
      },
      {
        word: "mange",
        definition: "Many (adjective)",
      },
      {
        word: "cykler",
        definition: "Bicycles (noun, plural)",
      },
      {
        word: "i",
        definition: "In (preposition)",
      },
      {
        word: "gaderne",
        definition: "The streets (noun with definite plural)",
      },
    ],
  },
  {
    id: "19",
    sentence: "Jeg taler ikke flydende dansk endnu.",
    translation: "I don't speak fluent Danish yet.",
    definitions: [
      {
        word: "Jeg",
        definition: "I (personal pronoun)",
      },
      {
        word: "taler",
        definition: "Speak (verb, present tense of 'at tale')",
      },
      {
        word: "ikke",
        definition: "Not (adverb)",
      },
      {
        word: "flydende",
        definition: "Fluent (adjective)",
      },
      {
        word: "dansk",
        definition: "Danish (noun/adjective)",
      },
      {
        word: "endnu",
        definition: "Yet, still (adverb)",
      },
    ],
  },
  {
    id: "20",
    sentence: "Vi skal fejre jul hos mine bedsteforældre.",
    translation: "We are going to celebrate Christmas at my grandparents'.",
    definitions: [
      {
        word: "Vi",
        definition: "We (personal pronoun)",
      },
      {
        word: "skal",
        definition: "Shall, will, must (modal verb)",
      },
      {
        word: "fejre",
        definition: "Celebrate (verb)",
      },
      {
        word: "jul",
        definition: "Christmas (noun)",
      },
      {
        word: "hos",
        definition:
          "At, with (preposition indicating location at someone's place)",
      },
      {
        word: "mine",
        definition: "My (possessive pronoun, plural)",
      },
      {
        word: "bedsteforældre",
        definition: "Grandparents (noun, plural)",
      },
    ],
  },
];

export default function Page() {
  const [showDefinition, setShowDefinition] = useState(false);
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["decks"],
    queryFn: () =>
      apiFetcher<Array<CardType>>(
        `api/card/53161625-0eb1-47dd-ae1f-6c49c00a0711/types/sentence`
      ),
  });

  console.log({ data, isLoading });

  const handleNextSentence = () => {
    if (selectedSentenceIdx < fakeData.length - 1) {
      setSelectedSentenceIdx((prev) => prev + 1);
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
    return;
  };

  const handleRight = () => {
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

    // if (selectedSentenceIdx > fakeData.length - 1) {
    //   return null;
    // }

    // if (!fakeData[selectedSentenceIdx]) {
    //   return null;
    // }

    // return fakeData[selectedSentenceIdx];
  }, [data, selectedSentenceIdx]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className={`w-full flex flex-col items-center justify-center h-[100vh] gap-xLarge`}
      layout={"position"}
    >
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
              <div key={w.word} className={"flex flex-col gap-xSmall"}>
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
