import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "tr" | "ru" | "fa")) {
    locale = routing.defaultLocale;
  }

  const enMessages = (await import("../../messages/en.json")).default as Record<string, unknown>;

  const fallbackConfig = {
    onError() { /* suppress */ },
    getMessageFallback({ namespace, key }: { namespace?: string; key: string }) {
      return [namespace, key].filter(Boolean).join(".");
    },
  };

  if (locale === "en") {
    return { locale, messages: enMessages, ...fallbackConfig };
  }

  const localeRaw = (await import(`../../messages/${locale}.json`)).default as Record<string, unknown>;

  // Shallow-merge top-level namespaces, but deep-merge `pd` so that locale
  // entries override only the products they translate while EN entries remain
  // as fallback for everything else (prevents MISSING_MESSAGE noise for brands
  // that only have EN/TR translations in the pd namespace).
  const messages = {
    ...enMessages,
    ...localeRaw,
    pd: {
      ...(enMessages.pd as Record<string, unknown>),
      ...(localeRaw.pd as Record<string, unknown>),
    },
  };

  return { locale, messages, ...fallbackConfig };
});
