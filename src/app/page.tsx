import { Button } from "@/components/Button";
import { SendIcon } from "@/icons/Send";

export default function Home() {
  return (
    <div className={"flex flex-col gap-small p-large"}>
      <textarea className="w-full h-32 p-4 border border-border-default rounded-lg" />
      <div className={"flex w-full justify-end"}>
        <Button variant={"primary"} icon={SendIcon}>
          Get feedback
        </Button>
      </div>
    </div>
  );
}
