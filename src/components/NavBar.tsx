"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

type NavItemVariant = "active" | "default";
type NavItemState = "disabled" | "enabled";

interface NavItemProps {
  icon: ReactNode;
  variant?: NavItemVariant;
  state?: NavItemState;
  onClick?: () => void;
}

interface NavItem {
  icon: ReactNode;
  label: string;
  id: string;
  href: string;
  disabled?: boolean;
}

interface NavBarProps {
  items: NavItem[];
  onNavClick?: (href: string) => void;
  position?: "right" | "left";
}

const navItemStyles = {
  base: "p-3 flex items-center justify-center rounded-xl transition-colors duration-200",
  variant: {
    active: "bg-slate-500 text-white stroke-2",
    default: "text-gray-600 hover:bg-slate-200",
  },
  state: {
    disabled: "opacity-50 cursor-not-allowed",
    enabled: "",
  },
};

const navBarStyles = {
  container:
    "fixed top-1/2 -translate-y-1/2 border border-border-default z-50 shadow-md px-xSmall py-small rounded-xl",
  position: {
    right: "right-4",
    left: "left-4",
  },
  items: "flex flex-col gap-2 items-center justify-center",
};

const NavItem: FC<NavItemProps> = ({
  icon,
  variant = "default",
  state = "enabled",
  onClick,
}) => {
  const isDisabled = state === "disabled";

  return (
    <button
      onClick={() => !isDisabled && onClick?.()}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={`
        ${navItemStyles.base}
        ${navItemStyles.variant[variant]}
        ${navItemStyles.state[state]}
      `}
    >
      {icon}
    </button>
  );
};

const NavBar: FC<NavBarProps> = ({ items, onNavClick, position = "right" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (href: string) => {
    if (onNavClick) {
      onNavClick(href);
    } else {
      router.push(href);
    }
  };

  const getItemVariant = (id: string): NavItemVariant => {
    return pathname.slice(1) === id ? "active" : "default";
  };

  const getItemState = (disabled?: boolean): NavItemState => {
    return disabled ? "disabled" : "enabled";
  };

  return (
    <nav
      className={`${navBarStyles.container} ${navBarStyles.position[position]}`}
    >
      <div className={navBarStyles.items}>
        {items.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            onClick={() => handleNavClick(item.href)}
            variant={getItemVariant(item.id)}
            state={getItemState(item.disabled)}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
