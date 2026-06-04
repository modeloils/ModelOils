import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/products": "/products",
    "/export-services": "/export-services",
    "/certifications": "/certifications",
    "/about": "/about",
    "/contact": "/contact",
    "/contact/request-quote": "/contact/request-quote",
    "/resources/blog": "/resources/blog",
  },
});

export type Locale = (typeof routing.locales)[number];
