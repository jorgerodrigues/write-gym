"use client";
import { Button } from "@/components/Button";
import { LANGUAGES } from "@/constants/languages";
import { LanguageSelector } from "@/features/intro/components/LanguageSelector";
import { languageFlagFromCode } from "@/utils/language/languageFlagFromCode";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function IntroPage() {
  const [usersLanguage, setUsersLanguage] = useState<string | null>(null);
  const [languageToLearn, setLanguageToLearn] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const possibleLanguages = Object.entries(LANGUAGES).map(([code, name]) => ({
    id: code,
    content: `${languageFlagFromCode(code)}  ${name}`,
  }));

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    }
  };

  const handlePrevStep = () => {
    if (step === 1) {
      setStep(0);
    }
  };

  const possibleToMoveForward = () => {
    if (step === 0) {
      return usersLanguage !== null;
    }
    if (step === 1) {
      return languageToLearn !== null;
    }
    return false;
  };

  const possibleToMoveBack = () => {
    if (step === 0) {
      return false;
    }
    if (step === 1) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-xLarge items-center">
      <div className="flex flex-col lg:max-w-[50%]  gap-large">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              className="flex w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                x: -20,
                transition: { duration: 0.2 },
              }}
            >
              <LanguageSelector
                titleContent={"Which one of these languages do you speak best?"}
                possibleLanguages={possibleLanguages}
                selectedLanguage={usersLanguage ?? ""}
                onSelectLanguage={setUsersLanguage}
              />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              key="step1"
              className="flex w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                x: 20,
                transition: { duration: 0.2 },
              }}
            >
              <LanguageSelector
                titleContent={"Which one language would you like to practice?"}
                possibleLanguages={possibleLanguages}
                selectedLanguage={languageToLearn ?? ""}
                onSelectLanguage={setLanguageToLearn}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={"flex w-full justify-between"}>
          <Button
            variant="secondary"
            disabled={!possibleToMoveBack()}
            onClick={handlePrevStep}
          >
            Go back
          </Button>
          <Button
            variant="primary"
            disabled={!possibleToMoveForward()}
            onClick={handleNextStep}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
