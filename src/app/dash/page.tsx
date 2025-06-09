import { PracticeNowCard } from "@/features/dashboard/components/PracticeNowCard";

export default async function page({}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div
      className={
        "flex flex-col gap-large 2xl:max-w-[60%] justify-center mx-auto py-large"
      }
    >
      <PracticeNowCard />
    </div>
  );
}
