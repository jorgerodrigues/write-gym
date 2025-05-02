/**
 * Validates the language code
 * @param languageCode - The language code to validate
 * @returns Object containing validation result
 */
export function validateLanguageCode(languageCode: unknown): {
  valid: boolean;
  error?: string;
} {
  // Check if languageCode exists and is a string
  if (typeof languageCode !== 'string') {
    return { valid: false, error: 'Language code must be a string' };
  }
  
  // Check length (language codes are typically 2-5 characters)
  if (languageCode.length < 2 || languageCode.length > 5) {
    return { valid: false, error: 'Language code must be between 2 and 5 characters' };
  }
  
  return { valid: true };
}