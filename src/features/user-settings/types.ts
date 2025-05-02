import { z } from "zod";

export const LanguagePreferenceSchema = z.object({
  languageCode: z.string().min(2).max(5),
});

export type LanguagePreference = z.infer<typeof LanguagePreferenceSchema>;

export type UserSetting = {
  id: string;
  userId: string;
  settingsId: string;
  enabled: boolean;
  settingName?: string;
  updatedAt: Date;
};

export type LanguagePreferenceResponse = {
  userId: string;
  languageCode: string | null;
  userSetting?: string;
  settingId?: string;
  settingName?: string;
  updatedAt?: Date;
};

/**
 * Validates a language code using the schema
 */
export function validateLanguageCode(input: unknown) {
  return LanguagePreferenceSchema.safeParse({ languageCode: input });
}
