import prisma from "@/database/client";

type Args = {
  userId: string;
};

export const getOnboardingStatus = async ({ userId }: Args) => {
  try {
    const onboardingSetting = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        onboardingCompleted: true,
      },
    });

    // If no setting exists, user hasn't completed onboarding
    if (!onboardingSetting?.onboardingCompleted) {
      return {
        data: { isCompleted: false },
        error: null,
      };
    }

    return {
      data: { isCompleted: onboardingSetting.onboardingCompleted },
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
