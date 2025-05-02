import prisma from "@/database/client";
import { LanguagePreferenceResponse } from "../types";

/**
 * Get a user's language preference
 */
export async function getLanguagePreference(
  userId: string
): Promise<LanguagePreferenceResponse | null> {
  try {
    const userSetting = await prisma.userSettings.findFirst({
      where: {
        userId,
        enabled: true,
        settings: {
          type: "practice_language",
        },
      },
      include: {
        settings: true,
      },
    });

    if (!userSetting) {
      return {
        userId,
        languageCode: null,
      };
    }

    return {
      userId,
      languageCode: userSetting.data,
      userSetting: userSetting.id,
      settingId: userSetting.settingsId,
      settingName: userSetting.settings.name,
      updatedAt: userSetting.updatedAt,
    };
  } catch (error) {
    console.error("Error retrieving language preference:", error);
    throw error;
  }
}
