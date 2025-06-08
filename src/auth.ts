import NextAuth, { Profile, Session } from "next-auth";
import Google from "next-auth/providers/google";
import { profile } from "./features/profile";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      return await addUserIdToSession({ session, token });
    },
    signIn: async ({ profile }) => {
      return await handleSignIn(profile);
    },
  },
  providers: [Google],
  pages: {
    signIn: "/login",
  },
});

const handleSignIn = async (profile: Profile | undefined) => {
  try {
    const email = profile?.email;

    if (!email) {
      return false;
    }

    const userExists = await checkUserExists(email);
    return userExists;
  } catch (e) {
    console.error("Error during sign-in:", e);
    return false;
  }
};

const checkUserExists = async (email: string) => {
  try {
    const userExists = await profile.getUserInfo({ email });
    if (userExists?.data?.id) {
      return true;
    }

    return false;
  } catch (e) {
    console.error("Error checking user existence:", e);
    return false;
  }
};

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
