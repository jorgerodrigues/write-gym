interface FeedbackContentProps {
  /** The feedback overall score */
  overallScore: number;
  /** The feedback overall feedback */
  overallFeedback: Array<string>;

  /** The feedback grammar score */
  grammarScore: number;
  /** The feedback grammar feedback */
  grammarFeedback: Array<string>;

  /** The feedback spelling score */
  spellingScore: number;
  /** The feedback spelling feedback */
  spellingFeedback: Array<string>;

  /** The feedback punctuation score */
  punctuationScore?: number;
  /** The feedback punctuation feedback */
  punctuationFeedback?: Array<string>;

  /** The feedback style score */
  styleScore?: number;
  /** The feedback style feedback */
  styleFeedback?: Array<string>;
}
export const FeedbackContent: React.FC<FeedbackContentProps> = ({
  overallScore,
  overallFeedback,
  grammarScore,
  grammarFeedback,
  spellingScore,
  spellingFeedback,
  punctuationScore,
  punctuationFeedback,
  styleScore,
  styleFeedback,
}) => {
  return (
    <div className="flex w-full flex-col gap-large">
      <div>
        <div className={"text-caption text-text-light"}>Overall Score</div>
        <div className="text-number">
          {overallScore}{" "}
          <span className={"text-caption text-text-light"}>out of 10</span>
        </div>
        <div>
          {overallFeedback?.map((i) => {
            return <div key={i}>{i}</div>;
          })}
      </div>
      </div>
      <div>
        <div className={"text-caption text-text-light"}>Grammar</div>
        <div className="text-number">
          {grammarScore}{" "}
          <span className={"text-caption text-text-light"}>out of 10</span>
        </div>
        <div>
          {grammarFeedback?.map((i) => {
            return <div key={i}>{i}</div>;
          })}
      </div>
      </div>
      <div>
        <div className={"text-caption text-text-light"}>Spelling</div>
        <div className="text-number">
          {spellingScore}{" "}
          <span className={"text-caption text-text-light"}>out of 10</span>
        </div>
        <div>
          {spellingFeedback?.map((i) => {
            return <div key={i}>{i}</div>;
          })}
      </div>
      </div>
      <div>
        <div className={"text-caption text-text-light"}>Style</div>
        <div className="text-number">
          {styleScore}{" "}
          <span className={"text-caption text-text-light"}>out of 10</span>
        </div>
          <div>
          {styleFeedback?.map((i) => {
            return <div key={i}>{i}</div>;
          })}
      </div>
      </div>
      <div>
        <div className={"text-caption text-text-light"}>Punctuation</div>
        <div className="text-number">
          {punctuationScore}{" "}
          <span className={"text-caption text-text-light"}>out of 10</span>
        </div>
        <div>
          {punctuationFeedback?.map((i) => {
            return <div key={i}>{i}</div>;
          })}
        </div>
      </div>
    </div>
  );
};
