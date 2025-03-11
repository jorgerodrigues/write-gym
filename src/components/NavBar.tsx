"use client";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({ icon, isActive = false, onClick }) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={`p-3 rounded-full transition-colors duration-200
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:bg-slate-100"
        }`}
    >
      {icon}
    </button>
  );
};

interface NavBarProps {
  items: Array<{
    icon: ReactNode;
    label: string;
    id: string;
    href: string;
  }>;
  onNavClick?: (href: string) => void;
}

const NavBar: FC<NavBarProps> = ({ items }) => {
  const router = useRouter();
  const handleNavClick = (id: string) => {
    router.push(id);
  };

  return (
    <nav className="fixed top-1/2 -translate-y-1/2 right-4 border border-slate-200 backdrop-blur-2xl z-50 shadow-md px-xSmall py-small rounded-full">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            onClick={() => handleNavClick(item.href)}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
