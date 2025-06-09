"use client";

import { PersonIcon } from "@/icons/Person";
import { Session } from "next-auth";
import Popover from "./Popover";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type ProfileButtonProps = {
  session?: Session | null;
};

export const ProfileButton: React.FC<ProfileButtonProps> = ({ session }) => {
  const router = useRouter();

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

  return (
    <Popover
      trigger={<Trigger />}
      options={options}
      showArrow={false}
      side="left"
      align="end"
      title={title}
    />
  );
};

const Trigger = () => {
  return (
    <div className="flex rounded-xl border-[0.5px] border-border-default bg-white/0 backdrop-blur-lg p-[12px] shadow-xl hover:cursor-pointer">
      <PersonIcon size={20} />
    </div>
  );
};
