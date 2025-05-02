"use client";

import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { PersonIcon } from "@/icons/Person";
import Image from "next/image";
import { CardSelect } from "@/components/CardSelect";
import { TextInput } from "@/components/TextInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/lib/api/apiFetcher";

type ProfileContentProps = {
  session: Session | null;
  userId: string;
};

type LanguagePreferenceMutationVars = {
  languageCode: string;
};

type LanguagePreferenceQueryData = {
  data: {
    userId: string;
    languageCode: string;
    updatedAt: string;
  };
  error: string | null;
};

export const ProfileContent = ({ session, userId }: ProfileContentProps) => {
  const [language, setLanguage] = useState<string>();

  const { data: languageToPractice, isSuccess } = useQuery({
    queryKey: ["userPreference", userId],
    queryFn: async () =>
      await apiFetcher<LanguagePreferenceQueryData>(
        `/api/user/${userId}/language-preference`
      ),
  });

  const { mutate: updateLanguageToLearn, isPending: isSaving } = useMutation<
    unknown,
    Error,
    LanguagePreferenceMutationVars
  >({
    mutationFn: async (vars) =>
      await apiFetcher(`/api/user/${userId}/language-preference`, {
        method: "PUT",
        body: JSON.stringify({
          languageCode: vars.languageCode,
        }),
      }),
  });

  const user = session?.user;
  const userName = user?.name || "User";
  const userEmail = user?.email || "email@example.com";
  const userImage = user?.image;

  useEffect(() => {
    if (languageToPractice?.data && isSuccess) {
      setLanguage(languageToPractice.data.languageCode);
    }
  }, [isSuccess, languageToPractice]);

  const handleUpdateLanguage = (languageCode: string) => {
    if (languageCode === "") {
      return;
    }
    try {
      setLanguage(languageCode);
      updateLanguageToLearn({ languageCode });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto gap-large">
      <div className="flex flex-col items-center justify-center gap-xSmall w-full text-center">
        <div className="flex items-center justify-center rounded-xl overflow-hidden border-control-secondary">
          {userImage ? (
            <Image
              src={userImage}
              width={100}
              height={100}
              alt={`${userName}'s profile picture`}
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-xl">
              <PersonIcon size={64} />
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold mt-4">{userName}</h1>
          <p className="text-text-light">{userEmail}</p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-large">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="flex flex-col gap-small">
          <TextInput
            label="First Name"
            type="text"
            placeholder="Your first name"
            defaultValue={userName.split(" ")[0]}
            disabled
          />
          <TextInput
            label="Last Name"
            type="text"
            placeholder="Your last name"
            defaultValue={userName.split(" ").slice(1).join(" ")}
            disabled
          />
          <TextInput label="Email" type="email" value={userEmail} disabled />
        </div>
      </div>

      <div className="w-full flex flex-col gap-small">
        <div>
          <h2 className="text-xl font-semibold">Language to practice</h2>
          <p className="text-sm text-text-light">
            Select the language you want to practice now. You can change at any
            point and your progress is always saved.
          </p>
        </div>

        <div className="flex gap-small">
          <CardSelect
            columns={4}
            options={[
              { id: "da", content: "🇩🇰 Danish" },
              { id: "en", content: "🇬🇧 English" },
            ]}
            onSelect={(id) => setLanguage(id)}
            selectedId={language}
          />
        </div>
        <div className="mt-6">
          <Button
            variant="primary"
            onClick={() => handleUpdateLanguage(language ?? "")}
            isLoading={isSaving}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
