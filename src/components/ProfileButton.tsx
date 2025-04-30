"use client";

import { PersonIcon } from "@/icons/Person";
import { Session } from "next-auth";
import Popover from "./Popover";
import { signOut } from "next-auth/react";

type ProfileButtonProps = {
  session?: Session | null;
};

export const ProfileButton: React.FC<ProfileButtonProps> = ({ session }) => {
  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    if (session) {
      await signOut({ callbackUrl: "/login" });
    }
    return;
  };

  const options = [
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
      title={"Jorge Lopes"}
    />
  );
};

const Trigger = () => {
  return (
    <div className="flex rounded-xl border border-border-default p-[12px] shadow-md hover:cursor-pointer">
      <PersonIcon size={16} />
    </div>
  );
};
