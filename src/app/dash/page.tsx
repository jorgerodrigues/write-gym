import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";

export default async function page({}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div
      className={
        "flex flex-col gap-large 2xl:max-w-[60%] justify-center mx-auto"
      }
    >
      <Card className="">
        <h2 className="text-large ">Start Practicing Danish</h2>
        <p className="mb-4">Put in some reps! Practice some sentences</p>
        <div className={"flex w-full justify-start py-small"}>
          <Button aria-label="start-practice">
            <Link href={"/sentence"}>Practice now</Link>
          </Button>
        </div>
      </Card>
      <Card>
        <h2 className={"text-large"}>Your practice stats:</h2>
        <p>Coming soon</p>
      </Card>
    </div>
  );
}
