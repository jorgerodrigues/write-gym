import { IconProps } from "./Send";

export const PlayIcon: React.FC<IconProps> = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
