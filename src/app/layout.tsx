import type { Metadata } from "next";
import { DM_Mono, Lexend } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import { auth } from "../auth";
import { PlayIcon } from "@/icons/Play";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { FileTextIcon } from "@/icons/FileText";
import { ProfileButton } from "@/components/ProfileButton";
import { LoggedUserProvider } from "@/providers/LoggedUserProvider";

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
      icon: <PlayIcon size={13} />,
      label: "Sentence review",
      id: "sentence",
      href: "/sentence",
    },
    {
      icon: <FileTextIcon size={13} />,
      label: "Writing practice",
      id: "practice",
      href: "/practice",
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${dmMono.variable} relative antialiased font-sans bg-bg-default min-h-[100dvh] p-large`}
      >
        <ReactQueryProvider>
          <LoggedUserProvider userId={session?.user?.id ?? ""}>
            <div className={"mr-xLarge"}>{children}</div>
            {session && <NavBar items={sideBarItems} />}

            {session && (
              <div className={"absolute bottom-small left-small"}>
                <ProfileButton session={session} />
              </div>
            )}
          </LoggedUserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
