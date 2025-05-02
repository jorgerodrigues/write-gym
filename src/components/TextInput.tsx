import React from "react";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Label text for the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Whether the input is in a loading state */
  isLoading?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  isLoading = false,
  disabled,
  placeholder,
  required,
  id,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-xSmall">
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
          {required && <span className="text-text-light ml-xSmall">*</span>}
        </label>
      )}

      <input
        id={id}
        disabled={disabled || isLoading}
        placeholder={placeholder}
        required={required}
        className={`
          w-full
          p-2
          border
          ${disabled ? "bg-gray-50" : ""}
          ${error ? "border-red-500" : "border-border-default"}
          rounded-lg
          focus:outline-none
          focus:ring-2
          ${error ? "focus:ring-red-500" : "focus:ring-primary"}
          disabled:text-text-light
          transition-all
          duration-100
        `}
        {...props}
      />

      {/* Error or Helper Text */}
      {(error || helperText) && (
        <p
          className={`text-xs ${error ? "text-red-500" : "text-text-light"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};