export interface TextAreaInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  setWordCount?: (wordCount: number) => void;
  setCharCount?: (charCount: number) => void;
  /** Label text for the textarea */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
  /** Whether the textarea is in a loading state */
  isLoading?: boolean;
  /** Controlled value */
  value: string;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// components/TextAreaInput/TextAreaInput.tsx
import React, { useEffect, useRef } from "react";

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  error,
  helperText,
  isLoading = false,
  value,
  onChange,
  disabled,
  placeholder,
  required,
  setWordCount,
  setCharCount,
  id,
  ...props
}) => {
  // Generate a unique ID if none is provided
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // make the textarea resizable
  const handleTextareaResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "24px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const countWords = (text: string) => {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };

  useEffect(() => {
    handleTextareaResize();
    const amountOfWRords = countWords(value);
    setWordCount?.(amountOfWRords);
    setCharCount?.(value.length);
  }, [setCharCount, setWordCount, value]);

  return (
    <div className="flex flex-col gap-xSmall">
      {label && (
        <label htmlFor={id} className="text-base text-text-dark">
          {label}
          {required && <span className="text-text-light ml-xSmall">*</span>}
        </label>
      )}

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled || isLoading}
        placeholder={placeholder}
        ref={textareaRef}
        tabIndex={0}
        required={required}
        className={`
          flex
          min-h-[400px]
          w-full
          rounded-lg
          bg-control-secondary
          px-small
          py-small
          text-base
          text-text-dark
          resize-none
          placeholder:text-text-placeholder
          focus:outline-none
          focus:outline-0
          disabled:bg-control-disabled
          disabled:text-text-light
          transition-all
          duration-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }
        `}
        {...props}
      />

      {/* Error or Helper Text */}
      {(error || helperText) && (
        <p
          className={`text-caption ${
            error ? "text-red-500" : "text-text-light"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
