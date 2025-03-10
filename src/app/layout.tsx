import type { Metadata } from "next";
import { DM_Mono, Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import { PersonIcon } from "../icons/Person";
import { useSession } from "next-auth/react";
import { auth } from "../auth";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Write gym!",
  description: "Do it and learn faster!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const sideBarItems = [
    {
      icon: <PersonIcon />,
      label: "Profile",
      id: "profile",
      href: "/profile",
    },
    {
      icon: <PersonIcon />,
      label: "Profile2",
      id: "p",
      href: "/profile",
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${dmMono.variable} relative antialiased font-sans bg-bg-default`}
      >
        <div className={"mr-xLarge"}>{children}</div>
        {session && <NavBar items={sideBarItems} />}
      </body>
    </html>
  );
}
