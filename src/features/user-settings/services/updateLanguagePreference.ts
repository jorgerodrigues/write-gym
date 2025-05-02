import prisma from "@/database/client";
import { LanguagePreferenceResponse } from "../types";

/**
 * Update a user's language preference
 */
export async function updateLanguagePreference(
  userId: string,
  languageCode: string
): Promise<LanguagePreferenceResponse> {
  try {
    // Create a setting name based on the language code
    const settingName = `Practice Language - ${languageCode.toUpperCase()}`;

    // Find or create a Settings entry for this specific language
    let languageSetting = await prisma.settings.findFirst({
      where: {
        type: "practice_language",
        name: settingName,
      },
    });

    // If specific language setting doesn't exist, create it
    if (!languageSetting) {
      languageSetting = await prisma.settings.create({
        data: {
          name: settingName,
          type: "practice_language",
          scope: "user",
        },
      });
    }

    const existingSetting = await prisma.userSettings.findFirst({
      where: {
        userId,
        settingsId: languageSetting.id,
        data: languageCode,
        enabled: true,
      },
    });

    if (existingSetting) {
      return {
        userId,
        languageCode,
        userSetting: existingSetting.id,
        settingId: languageSetting.id,
        settingName: languageSetting.name,
        updatedAt: existingSetting.updatedAt,
      };
    }

    // First, disable any other practice_language settings this user might have
    await prisma.userSettings.updateMany({
      where: {
        userId,
        settings: {
          type: "practice_language",
        },
      },
      data: {
        enabled: false,
      },
    });

    // Create new user setting
    const userSetting = await prisma.userSettings.create({
      data: {
        userId,
        settingsId: languageSetting.id,
        enabled: true,
        data: languageCode,
      },
    });

    return {
      userId,
      languageCode,
      userSetting: userSetting.id,
      settingId: languageSetting.id,
      settingName: languageSetting.name,
      updatedAt: userSetting.updatedAt,
    };
  } catch (error) {
    console.error("Error updating language preference:", error);
    throw error;
  }
}
