"use client";
import { Button } from "@/components/Button";
import { LANGUAGES } from "@/constants/languages";
import { LanguageSelector } from "@/features/intro/components/LanguageSelector";
import { LanguagePreferenceMutationVars } from "@/features/profile/components/ProfileContent";
import { apiFetcher } from "@/lib/api/apiFetcher";
import { useUser } from "@/providers/LoggedUserProvider";
import { languageFlagFromCode } from "@/utils/language/languageFlagFromCode";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();
  const { user } = useUser();
  const [usersLanguage, setUsersLanguage] = useState<string | null>(null);
  const [languageToLearn, setLanguageToLearn] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const { mutate: updateLanguageToLearn } = useMutation<
    unknown,
    Error,
    LanguagePreferenceMutationVars
  >({
    mutationFn: async (vars) =>
      await apiFetcher(`/api/user/${user.id}/language-preference`, {
        method: "PUT",
        body: JSON.stringify({
          languageCode: vars.languageCode,
        }),
      }),
  });

  const { mutate: updateNativeLanguage } = useMutation<
    unknown,
    Error,
    LanguagePreferenceMutationVars
  >({
    mutationFn: async (vars) =>
      await apiFetcher(`/api/user/${user.id}/native-language`, {
        method: "PUT",
        body: JSON.stringify({
          languageCode: vars.languageCode,
        }),
      }),
  });

  const { mutate: markOnboardingComplete } = useMutation<unknown, Error>({
    mutationFn: async () =>
      await apiFetcher(`/api/user/${user.id}/onboarding`, {
        method: "POST",
        body: JSON.stringify({
          languageToLearn,
        }),
      }),
  });

  const possibleLanguagesToLearn = Object.entries(LANGUAGES).map(
    ([code, name]) => ({
      id: code,
      content: `${languageFlagFromCode(code)}  ${name}`,
    })
  );

  const possibleBaseLanguages = Object.entries(LANGUAGES)
    .map(([code, name]) => ({
      id: code,
      content: `${languageFlagFromCode(code)}  ${name}`,
    }))
    .filter((l) => l.id === "EN" || l.id === "PT");

  const handleNextStep = () => {
    if (!usersLanguage) {
      return null;
    }

    if (step === 0) {
      updateNativeLanguage({ languageCode: usersLanguage });
      setStep(1);
    }

    if (step === 1) {
      if (!languageToLearn) {
        return null;
      }
      updateLanguageToLearn({ languageCode: languageToLearn });
      markOnboardingComplete();
      router.push("/dash");
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
                possibleLanguages={possibleBaseLanguages}
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
                possibleLanguages={possibleLanguagesToLearn}
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
