// "use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import prisma from "@/database/client";
import Link from "next/link";

const fetchAllPrompts = async (userId: string) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        userId,
      },
      include: {
        InfoPoints: true,
      },
    });

    return prompts ?? [];
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export default async function page({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId = "" } = await searchParams;

  if (typeof userId !== "string" || !userId) {
    return <div>Invalid user id</div>;
  }

  console.log({ userId });
  const prompts = (await fetchAllPrompts(userId)) || [];

  return (
    <div className={"p-large"}>
      <Card className="p-0">
        <div className={"text-number p-large"}>Practices</div>
        <div className={"border-y border-border-default"}>
          {prompts?.map((entry) => (
            <PracticeRow
              key={entry.id}
              id={entry.id}
              theme={entry.theme}
              overallScore={0}
            />
          ))}
        </div>
        <div className={"flex w-full justify-end p-large"}>
          <Button>
            <Link href={"/"}>Practice now</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface PracticeRowProps {
  id: string;
  theme: string;
  overallScore: number;
}
const PracticeRow: React.FC<PracticeRowProps> = ({
  id,
  theme,
  overallScore,
}) => {
  return (
    <Link
      href={`/?prompt=${id}`}
      key={id}
      className={`flex w-full
         border-b last:border-none border-border-default
         px-large py-small
         hover:cursor
         hover:bg-control-hover/10
         `}
    >
      <div className={"flex flex-col items-start"}>
        <p className={""}>{theme}</p>
        <p className={"text-sm text-text-light"}>Overall: {overallScore}</p>
      </div>
    </Link>
  );
};
