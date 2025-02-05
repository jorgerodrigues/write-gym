// Card types
type BlurStrength =
  | "backdrop-blur-sm"
  | "backdrop-blur"
  | "backdrop-blur-md"
  | "backdrop-blur-xl"
  | "backdrop-blur-2xl"
  | "backdrop-blur-3xl";
type OpacityValue = "20" | "40" | "60" | "80";
type PaddingSize = "p-xSmall" | "p-small" | "p-large" | "p-xLarge";

interface CardProps {
  /** Child elements to be rendered inside the card */
  children: React.ReactNode;

  /** Additional CSS classes to be applied */
  className?: string;

  /** Padding size for the card */
  padding?: PaddingSize;

  /** Blur intensity for the frosted glass effect */
  blur?: BlurStrength;

  /** Background opacity level */
  opacity?: OpacityValue;

  /** Whether to show the border */
  border?: boolean;

  /** Click handler for the card */
  onClick?: () => void;

  /** Enable hover animations */
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "p-large", // Customizable padding
  blur = "backdrop-blur-xl", // Blur intensity
  opacity = "40", // Background opacity (20, 40, 60, 80)
  border = false, // Show/hide border
  onClick, // Optional click handler
  hoverable = false, // Enable hover effects
}) => {
  // Base styles
  const baseStyles = [
    "flex flex-col w-full",
    "rounded-2xl",
    `bg-white bg-opacity-${opacity}`,
    blur,
    padding,
    border && "border border-border-default",
    "shadow ",
    hoverable ? "transition-all hover:shadow-xl hover:scale-[1.02]" : "",
    onClick ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={baseStyles}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {/* Main content */}
      {children}
    </div>
  );
};
