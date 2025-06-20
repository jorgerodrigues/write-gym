export const setUserLanguageOnLocalStorage = (language: string | null) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userLanguage", language || "");
  }
};
