import prisma from "@/database/client";
import { LanguagePreferenceResponse } from "../types";
import { userSettings } from "..";

/**
 * Update a user's native language
 */
export async function updateNativeLanguage(
  userId: string,
  languageCode: string
): Promise<Pick<LanguagePreferenceResponse, "userId" | "languageCode">> {
  try {
    const res = userSettings.validateLanguageCode(languageCode);

    if (!res.success) {
      throw new Error("Invalid language code");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        nativeLanguage: languageCode,
      },
    });

    return {
      userId: updatedUser.id,
      languageCode: updatedUser.nativeLanguage,
    };
  } catch (error) {
    console.error("Error updating language preference:", error);
    throw error;
  }
}
