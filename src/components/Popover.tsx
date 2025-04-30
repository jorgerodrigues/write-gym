"use client";
import * as RadixPopover from "@radix-ui/react-popover";
import React, { ReactNode } from "react";

export type PopoverOption = {
  id: string;
  item: string | ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export interface PopoverProps {
  /* Optional title for the options list */
  children?: ReactNode;
  trigger: ReactNode;
  options?: PopoverOption[];
  title?: string | ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  width?: "auto" | "trigger" | "sm" | "md" | "lg";
  showArrow?: boolean;
  padding?: boolean;
  shadow?: boolean;
  border?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  options,
  title,
  open,
  onOpenChange,
  align = "center",
  side = "bottom",
  className = "",
  width = "auto",
  showArrow = true,
  padding = true,
  shadow = true,
  border = true,
}) => {
  // Width classes mapping
  const widthClasses = {
    auto: "w-auto",
    trigger: "w-[var(--radix-popover-trigger-width)]",
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
  };

  // Content container styles
  const contentBaseClasses = [
    "z-50 origin-[var(--radix-popover-content-transform-origin)]",
    "bg-bg-white ",
    "rounded-xl",
    "outline-none",
    padding ? "p-small" : "",
    shadow ? "shadow-lg" : "",
    border ? "border border-border-default" : "",
    widthClasses[width],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Generate options content if options array is provided
  const renderOptionsContent = () => {
    if (!options || options.length === 0) return null;

    return (
      <>
        {title && <PopoverHeading>{title}</PopoverHeading>}
        {options.map((option) => (
          <PopoverItem
            key={option.id}
            onClick={option.onClick}
            disabled={option.disabled}
            className={option.className}
          >
            {typeof option.item === "string" ? (
              <span>{option.item}</span>
            ) : (
              option.item
            )}
          </PopoverItem>
        ))}
      </>
    );
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>
        {/* Using a span instead of div for better inline behavior */}
        <span className="inline-block">{trigger}</span>
      </RadixPopover.Trigger>

      {/* Content that appears next to the trigger */}
      <RadixPopover.Portal>
        <RadixPopover.Content
          className={contentBaseClasses}
          align={align}
          side={side}
          sideOffset={10}
          avoidCollisions
        >
          {showArrow && (
            <RadixPopover.Arrow
              className="fill-white/80 stroke-border-default stroke-1"
              width={12}
              height={7}
            />
          )}
          {options ? renderOptionsContent() : children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

// Convenient sub-components to structure content
export const PopoverHeading = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`font-semibold p-small py-xSmall ${className}`}>
    {children}
    <PopoverSeparator />
  </div>
);

export const PopoverBody = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`text-sm text-text-body ${className}`}>{children}</div>;

export const PopoverSeparator = ({
  className = "",
}: {
  className?: string;
}) => <div className={`h-px bg-border-default mt-xSmall ${className}`} />;

export const PopoverItem = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  const combinedClasses = [
    "px-small py-xSmall hover:bg-control-secondaryHover rounded-md cursor-pointer",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ].join(" ");

  return (
    <div
      className={combinedClasses}
      onClick={disabled ? undefined : onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
};

export default Popover;
