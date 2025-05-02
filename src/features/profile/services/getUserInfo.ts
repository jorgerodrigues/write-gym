import prisma from "@/database/client";

export const getUserInfo = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
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
