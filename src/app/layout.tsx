import type { Metadata } from "next";
import { DM_Mono, Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import { PersonIcon } from "../icons/Person";
import { auth } from "../auth";
import { PlayIcon } from "@/icons/Play";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

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
      icon: <PlayIcon size={16} />,
      label: "practice",
      id: "practice",
      href: "/practice",
    },
    {
      icon: <PersonIcon />,
      label: "profile",
      id: "profile",
      href: "/profile",
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${dmMono.variable} relative antialiased font-sans bg-bg-default`}
      >
        <ReactQueryProvider>
          <div className={"mr-xLarge"}>{children}</div>
          {session && <NavBar items={sideBarItems} />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
