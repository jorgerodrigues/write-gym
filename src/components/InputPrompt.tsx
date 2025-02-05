import { Spinner } from "./Spinner";

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

export const InputPrompt: React.FC<InputPromptProps> = ({
  prompt,
  theme,
  targetWordCount,
  description,
  infoPoints = [],
  loading = false,
}) => {
  if (loading) {
    return <LoadingPrompt />
  }
  return (
    <div className="flex flex-col gap-small">
      <div className="flex flex-col gap-xSmall rounded-lg">
        {theme && (
          <p className="text-caption text-text-light uppercase">{theme}</p>
        )}
        {targetWordCount && (
          <p className="font-mono text-caption text-text-light">
            Target length: {targetWordCount} words
          </p>
        )}
      </div>
      <div className={"flex flex-col"}>
        <p className="text-large text-text-dark">{prompt}</p>
        {description && <p className="text-text-light">{description}</p>}
      </div>

      <div className="flex flex-col gap-xSmall">
        {infoPoints.map((point) => (
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
}