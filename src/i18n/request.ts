import { getUserLanguageFromCookieServer } from "@/utils/cookies/userLanguageCookies";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Get cookies from the request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Get user language from cookie
  const userLanguage = getUserLanguageFromCookieServer(cookieHeader);
  const locale = userLanguage ?? "pt";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
