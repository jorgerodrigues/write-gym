"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useUser } from "@/providers/LoggedUserProvider";
import { languageNameFromCode } from "@/utils/language/languageNameFromCode";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const PracticeNowCard = () => {
  const t = useTranslations("dash");
  const { user } = useUser();
  const { language } = user;
  const languageName = language ? languageNameFromCode(language) : "";

  return (
    <Card>
      <>
        <div>
          <h2 className="text-large ">
            {t("start-practicing", { language: languageName })}
          </h2>
          <p className="mb-4">
            {t("start-practicing-description", { language: languageName })}
          </p>
          <div className={"flex w-full justify-start py-small"}>
            <Link href={"/sentence"}>
              <Button aria-label="start-practice">
                {t("button-practice-now")}
              </Button>
            </Link>
          </div>
        </div>
      </>
    </Card>
  );
};
