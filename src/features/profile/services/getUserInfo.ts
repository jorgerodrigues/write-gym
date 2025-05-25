import prisma from "@/database/client";

type Args = {
  userId?: string;
  email?: string;
};

export const getUserInfo = async ({ userId, email }: Args) => {
  if (!userId && !email) {
    return {
      data: null,
      error: "missing-args",
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
              mode: "insensitive",
            },
            id: userId,
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        nativeLanguage: true,
        createdAt: true,
        updatedAt: true,
        onboardingCompleted: true,
      },
    });
    return {
      data: user,
      error: null,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return {
        data: null,
        error: e.message,
      };
    }
    return {
      data: null,
      error: "Unknown error",
    };
  }
};
