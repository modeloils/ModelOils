import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "tr" | "ru" | "fa")) {
    locale = routing.defaultLocale;
  }

  const enMessages = (await import("../../messages/en.json")).default as Record<string, unknown>;
  const localeMessages =
    locale === "en"
      ? enMessages
      : {
          ...enMessages,
          ...((await import(`../../messages/${locale}.json`)).default as Record<string, unknown>),
        };

  return {
    locale,
    messages: localeMessages,
  };
});
