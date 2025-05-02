import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { profile } from "./features/profile";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      console.log("sess");
      return await addUserIdToSession({ session, token });
    },
  },
  providers: [Google],
  pages: {
    signIn: "/login",
  },
});

const addUserIdToSession = async ({
  session,
  token,
}: {
  session: {
    user: AdapterUser;
  } & AdapterSession &
    Session;
  token: JWT;
}) => {
  const email = token.email;
  if (!email) return session;

  const user = await profile.getUserInfo({ email });
  if (!user.data) return session;

  session.user.id = user?.data?.id;

  return session;
};
