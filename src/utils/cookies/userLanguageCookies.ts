// Utility functions for handling user language cookies

/**
 * Sets the user language in a cookie
 * Cookie is set with HttpOnly: false to make it accessible from client-side JavaScript
 * Expiration is set to 30 days
 */
export const setUserLanguageCookie = (language: string | null): void => {
  if (typeof document !== "undefined") {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // 30 days expiration

    const cookieValue = `userLanguage=${
      language || ""
    }; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
    document.cookie = cookieValue;
  }
};

/**
 * Gets the user language from a cookie
 * Returns null if the cookie doesn't exist or if called from server-side
 */
export const getUserLanguageFromCookie = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "userLanguage") {
      return value || null;
    }
  }

  return null;
};

/**
 * Server-side function to get the user language from a cookie
 * @param cookieHeader - The Cookie header from the request
 */
export const getUserLanguageFromCookieServer = (
  cookieHeader: string | null
): string | null => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "userLanguage") {
      return value || null;
    }
  }

  return null;
};
