"use client";

import { useUser } from "@/providers/LoggedUserProvider";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { ProfileButton } from "./ProfileButton";

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
  session?: Session | null;
}

const navItemStyles = {
  base: "p-3 flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer",
  variant: {
    active: "bg-slate-200/70  stroke-1",
    default: "text-gray-600 hover:bg-slate-200",
  },
  state: {
    disabled: "opacity-50 cursor-not-allowed",
    enabled: "",
  },
};

const navBarStyles = {
  container:
    "fixed z-50 bg-white/10 shadow-xl backdrop-blur-md px-xSmall py-xSmall md:py-small rounded-full " +
    "top-4 left-1/2 -translate-x-1/2 " +
    "md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:bottom-auto md:left-auto",
  position: {
    left: "md:left-4",
    right: "md:right-4",
  },
  items:
    "flex gap-2 items-center justify-center " + "flex-row " + "md:flex-col",
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

const NavBar: FC<NavBarProps> = ({
  items,
  onNavClick,
  position = "right",
  session,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setFullPageLoading } = useUser();

  const handleNavClick = (href: string) => {
    if (onNavClick) {
      onNavClick(href);
    } else {
      setFullPageLoading?.(true);
      router.push(href);
      setFullPageLoading?.(false);
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
        <ProfileButton session={session} />
      </div>
    </nav>
  );
};

export default NavBar;
