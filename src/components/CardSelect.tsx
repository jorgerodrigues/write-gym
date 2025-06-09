"use client";
import { ReactNode } from "react";

type CardSelectOptions = {
  id: string;
  content: string | ReactNode;
};

type CardSelectProps = {
  options: Array<CardSelectOptions>;
  onSelect: (option: string) => void;
  selectedId?: string;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  /**
   * Number of columns to display options in
   * @default 1
   */
  columns?: 1 | 2 | 3 | 4;
};

type CardSelectOptionProps = {
  option: CardSelectOptions;
  isSelected: boolean;
  onSelect: () => void;
  size?: "sm" | "md" | "lg";
};

/**
 * Individual selectable card option
 */
const CardSelectOption: React.FC<CardSelectOptionProps> = ({
  option,
  isSelected,
  onSelect,
  size = "md",
}) => {
  // Size-based styling
  const sizes = {
    sm: "p-xSmall",
    md: "p-small",
    lg: "p-large",
  };

  // Base styles
  const baseStyles = [
    "flex flex-col w-full",
    "rounded-lg",
    "bg-white",
    "backdrop-blur-xl",
    sizes[size],
    "border",
    isSelected
      ? "border-control-cta border bg-control-cta/50"
      : "border-border-default",
    "shadow",
    "transition-all hover:shadow-xl",
    "cursor-pointer",
  ].join(" ");

  return (
    <div
      className={baseStyles}
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      data-testid={`card-select-option-${option.id}`}
    >
      {option.content}
    </div>
  );
};

/**
 * CardSelect component
 *
 * A card-based selection component similar to radio buttons
 * where users can select one option from multiple cards.
 */

export const CardSelect: React.FC<CardSelectProps> = ({
  options,
  onSelect,
  selectedId,
  className = "",
  label,
  size = "md",
  columns = 1,
}) => {
  const handleSelect = (id: string) => {
    onSelect(id);
  };

  // Generate grid column classes based on the columns prop
  const gridColumnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-base-bold text-text-dark mb-small">
          {label}
        </label>
      )}
      <div
        className={`grid ${gridColumnClasses[columns]} gap-small`}
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => (
          <CardSelectOption
            key={option.id}
            option={option}
            isSelected={selectedId === option.id}
            onSelect={() => handleSelect(option.id)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};
