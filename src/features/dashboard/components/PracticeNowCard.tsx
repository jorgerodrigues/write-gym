"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useUser } from "@/providers/LoggedUserProvider";
import { languageNameFromCode } from "@/utils/language/languageNameFromCode";
import Link from "next/link";

export const PracticeNowCard = () => {
  const { user, loading } = useUser();
  const { language } = user;
  const languageName = languageNameFromCode(language ?? "");

  return (
    <Card>
      <>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            <h2 className="text-large ">Start Practicing {languageName}</h2>
            <p className="mb-4">Put in some reps! Practice some sentences</p>
            <div className={"flex w-full justify-start py-small"}>
              <Button aria-label="start-practice">
                <Link href={"/sentence"}>Practice now</Link>
              </Button>
            </div>
          </div>
        )}
      </>
    </Card>
  );
};
