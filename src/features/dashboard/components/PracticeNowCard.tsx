"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useUser } from "@/providers/LoggedUserProvider";
import { languageNameFromCode } from "@/utils/language/languageNameFromCode";
import Link from "next/link";

export const PracticeNowCard = () => {
  const { user } = useUser();
  const { language } = user;
  const languageName = language ? languageNameFromCode(language) : "";

  return (
    <Card>
      <>
        <div>
          <h2 className="text-large ">Start Practicing {languageName}</h2>
          <p className="mb-4">Put in some reps! Practice some sentences</p>
          <div className={"flex w-full justify-start py-small"}>
            <Link href={"/sentence"}>
              <Button aria-label="start-practice"> Practice Now</Button>
            </Link>
          </div>
        </div>
      </>
    </Card>
  );
};
