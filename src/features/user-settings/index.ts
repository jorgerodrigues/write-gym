import { validateLanguageCode } from "./types";
import { getLanguagePreference } from "./services/getLanguagePreference";
import { getUserById } from "./services/getUserById";
import { updateLanguagePreference } from "./services/updateLanguagePreference";

export const userSettings = {
  // Logic
  validateLanguageCode,
  
  // Services
  getUserById,
  getLanguagePreference,
  updateLanguagePreference,
};