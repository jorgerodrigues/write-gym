export const getUserLanguageFromLocalStorage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const language = localStorage.getItem("userLanguage");
  return language;
};
