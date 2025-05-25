import prisma from "@/database/client";

type Args = {
  userId: string;
};

export const markOnboardingComplete = async ({ userId }: Args) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true },
    });

    return {
      data: { success: true },
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
