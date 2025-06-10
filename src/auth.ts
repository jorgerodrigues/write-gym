import NextAuth, { Profile } from "next-auth";
import Google from "next-auth/providers/google";
import { profile } from "./features/profile";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (token.userId && session) {
        session.user.id = token.userId as string;
      }
      return session;
    },
    jwt: async ({ trigger, token }) => {
      if (trigger === "signIn" || trigger === "signUp") {
        return await addUserIdToToken({ token });
      }
      return token;
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

const addUserIdToToken = async ({ token }: { token: JWT }) => {
  try {
    const email = token.email;
    if (!email) return token;

    const user = await profile.getUserInfo({ email });
    if (!user.data) return token;

    token.userId = user?.data?.id;

    return token;
  } catch (e) {
    console.error("Error adding user ID to token:", e);
    return token;
  }
};
