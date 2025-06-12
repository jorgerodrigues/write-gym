"use client";

import { PersonIcon } from "@/icons/Person";
import { Session } from "next-auth";
import Popover from "./Popover";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProfileButtonProps = {
  session?: Session | null;
};

export const ProfileButton: React.FC<ProfileButtonProps> = ({ session }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log({ isMobile });

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    if (session) {
      await signOut({ callbackUrl: "/login" });
    }
    return;
  };

  const handleNavigateToProfile = () => {
    if (session) {
      router.push("/profile");
    }
  };

  const title = session.user?.name || "User";

  const options = [
    {
      id: "2",
      item: "Profile",
      href: "/profile",
      onClick: handleNavigateToProfile,
    },
    {
      id: "1",
      item: "Log out",
      onClick: handleLogout,
    },
  ];

  // function for determining if we are on mobile or larger screens

  return (
    <Popover
      trigger={<Trigger />}
      options={options}
      showArrow={false}
      side={isMobile ? "top" : "right"}
      align="end"
      title={title}
    />
  );
};

const Trigger = () => {
  return (
    <div className="flex  p-[12px]  hover:cursor-pointer border-l md:border-t md:border-l-0 border-default">
      <PersonIcon size={20} />
    </div>
  );
};
