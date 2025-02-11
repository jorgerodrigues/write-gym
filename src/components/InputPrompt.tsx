import { useEffect, useState } from "react";
import { InputPrompt as IInputPrompt } from "@/app/page";
import { usePathname, useRouter } from "next/navigation";

export interface InfoPoint {
  id?: string;
  content: string;
  source?: string;
  category?: string;
}

export interface InputPromptProps {
  prompt?: string;
  theme?: string;
  targetWordCount?: number;
  description?: string;
  infoPoints?: InfoPoint[];
  loading?: boolean;
}

const InfoPointItem: React.FC<{ point: InfoPoint }> = ({ point }) => (
  <div className="flex flex-col gap-xSmall">
    <p className="text-base text-text-dark">{point.content}</p>
    {point.source && (
      <span className="text-caption text-text-light italic">
        Source: {point.source}
      </span>
    )}
  </div>
);

export const InputPrompt: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [themeInfo, setThemeInfo] = useState<IInputPrompt>();
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [, setError] = useState<undefined | null | string>();

  // useEffect(() => {
  //   handleGetTheme();
  // }, []);

  const handleGetTheme = async () => {
    setIsLoadingPrompt(true);
    setError(null);

    try {
      const response = await fetch("/api/theme-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "Danish", // Match the language used in feedback
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get theme");
      }

      const data = await response.json();
      // TODO: Update state with new theme data

      const infoPoints = Array.isArray(data?.inspiration)
        ? data?.inspiration
        : [];
      const theme = data?.theme ?? "";
      const description = data?.description;

      setThemeInfo({
        theme: "Writing practice",
        infoPoints: formatInfoPoints(infoPoints),
        prompt: theme,
        targetWordCount: 400,
        description,
      });

      // add a query to the url to set the theme
      const params = new URLSearchParams();
      params.set("theme", theme);
      router.push(`${pathName}?${params.toString()}`);
    } catch (err) {
      setError("Failed to get theme. Please try again.");
      console.error("Error getting theme:", err);
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const formatInfoPoints = (points: Array<string>) => {
    return points.map((i, idx) => {
      return {
        id: idx.toString(),
        content: i,
      };
    });
  };

  if (isLoadingPrompt) {
    return <LoadingPrompt />;
  }
  return (
    <div className="flex flex-col gap-small">
      <div className="flex flex-col gap-xSmall rounded-lg">
        {themeInfo?.theme && (
          <p className="text-caption text-text-light uppercase">
            {themeInfo.theme}
          </p>
        )}
        {themeInfo?.targetWordCount && (
          <p className="font-mono text-caption text-text-light">
            Target length: {themeInfo.targetWordCount} words
          </p>
        )}
      </div>
      <div className={"flex flex-col"}>
        <p className="text-large text-text-dark">{themeInfo?.prompt}</p>
        {themeInfo?.description && (
          <p className="text-text-light">{themeInfo.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-xSmall">
        {themeInfo?.infoPoints.map((point) => (
          <InfoPointItem key={point.id} point={point} />
        ))}
      </div>
    </div>
  );
};

const LoadingPrompt = () => {
  return (
    <div className=" flex w-full justify-center items-center animate-pulse opacity-10 transition-opacity duration-1000 text-large font-light">
      Generating a new theme
    </div>
  );
};
