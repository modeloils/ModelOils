import type { ComponentProps, ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { UI, PAGE_META, type PageKey } from "./ui";
import { SITE_CONTENT } from "./content";
import { type Locale, LOCALE_COOKIE, LOCALES } from "./types";

export type { Locale } from "./types";
export { LOCALE_COOKIE, DEFAULT_LOCALE, LOCALES } from "./types";

export const SITE_URL = "https://modeloils.com";

/** Base (English) path for each page, used for locale switching and hreflang. */
const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  export: "/export",
  industries: "/industries",
  yokohama: "/yokohama",
  blog: "/blog",
};

/** Prefix a base English path with the locale prefix when not English. */
export function localePath(to: string, locale: Locale): string {
  if (locale === "en") return to;
  return to === "/" ? `/${locale}` : `/${locale}${to}`;
}

/** Remove a leading locale prefix, returning the base English path. */
export function stripLocale(pathname: string): string {
  if (
    pathname === "/tr" ||
    pathname === "/ru" ||
    pathname === "/fa" ||
    pathname === "/ar" ||
    pathname === "/de" ||
    pathname === "/fr"
  )
    return "/";
  if (
    pathname.startsWith("/tr/") ||
    pathname.startsWith("/ru/") ||
    pathname.startsWith("/fa/") ||
    pathname.startsWith("/ar/") ||
    pathname.startsWith("/de/") ||
    pathname.startsWith("/fr/")
  )
    return pathname.slice(3);
  return pathname;
}

/** Derive the active locale from the current URL path. */
export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/tr" || pathname.startsWith("/tr/")) return "tr";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  if (pathname === "/fa" || pathname.startsWith("/fa/")) return "fa";
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return "ar";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  return "en";
}

/** Access UI strings and structured content for the active locale. */
export function useTranslation() {
  const locale = useLocale();
  return { locale, t: UI[locale], data: SITE_CONTENT[locale] };
}

type LinkProps = ComponentProps<typeof Link>;

/** A TanStack Link that keeps navigation within the active locale. */
export function LocaleLink({
  to,
  children,
  ...rest
}: Omit<LinkProps, "to"> & { to: string; children?: ReactNode }) {
  const locale = useLocale();
  return (
    // The computed path is always a registered route (English or /tr mirror).
    <Link to={localePath(to, locale) as LinkProps["to"]} {...rest}>
      {children}
    </Link>
  );
}

/** Persist the visitor's language choice so auto-detect does not override it. */
export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]+)`));
  const v = match?.[1];
  return v === "en" ||
    v === "tr" ||
    v === "ru" ||
    v === "fa" ||
    v === "ar" ||
    v === "de" ||
    v === "fr"
    ? v
    : null;
}

/** Decide whether a first-time visitor at "/" should be sent to /tr. */
export function detectPreferredLocale(): Locale {
  const cookie = readLocaleCookie();
  if (cookie) return cookie;
  if (typeof navigator !== "undefined") {
    const langs = navigator.languages ?? [navigator.language];
    if (langs.some((l) => l?.toLowerCase().startsWith("tr"))) return "tr";
    if (langs.some((l) => l?.toLowerCase().startsWith("ru"))) return "ru";
    if (langs.some((l) => l?.toLowerCase().startsWith("fa"))) return "fa";
    if (langs.some((l) => l?.toLowerCase().startsWith("ar"))) return "ar";
    if (langs.some((l) => l?.toLowerCase().startsWith("de"))) return "de";
    if (langs.some((l) => l?.toLowerCase().startsWith("fr"))) return "fr";
  }
  return "en";
}

/** Switch languages while preserving the current page. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const base = stripLocale(pathname);

  const options = LOCALES;
  const activeIndex = options.indexOf(locale);

  return (
    <div
      className={cn(
        "language-switcher relative inline-flex shrink-0 items-center overflow-hidden rounded-md border border-border bg-secondary/40 p-0.5 text-xs font-semibold shadow-inner shadow-black/20",
        className,
      )}
      role="group"
      aria-label={UI[locale].lang.label}
      dir="ltr"
    >
      <span
        className="language-switcher-thumb pointer-events-none absolute left-0.5 top-0.5 h-[calc(100%-0.25rem)] w-9 rounded bg-[image:var(--gradient-action)] shadow-[var(--shadow-glow)]"
        style={{ transform: `translateX(${activeIndex * 2.25}rem)` }}
        aria-hidden="true"
      >
        <span key={locale} className="language-switcher-shine" />
      </span>
      {options.map((opt) => (
        <a
          key={opt}
          href={localePath(base, opt)}
          onClick={() => setLocaleCookie(opt)}
          aria-current={locale === opt ? "page" : undefined}
          className={cn(
            "relative z-10 flex h-8 w-9 shrink-0 items-center justify-center rounded uppercase tracking-wide transition-colors duration-200",
            locale === opt
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </a>
      ))}
    </div>
  );
}

export function absoluteUrl(path: string): string {
  if (/^(?:https?:|data:)/i.test(path)) return path;
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

export interface CustomPageHeadOptions {
  basePath: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "product";
  extraMeta?: Array<Record<string, string>>;
  structuredData?: Record<string, unknown>;
}

/** Build absolute canonical, social and hreflang metadata for any localized route. */
export function customPageHead(locale: Locale, options: CustomPageHeadOptions) {
  const canonicalPath = localePath(options.basePath, locale);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(options.image ?? "/model-oils/images/logo-main-2026-v2.png");
  const ogLocale =
    locale === "tr"
      ? "tr_TR"
      : locale === "ru"
        ? "ru_RU"
        : locale === "fa"
          ? "fa_IR"
          : locale === "ar"
            ? "ar_AE"
            : locale === "de"
              ? "de_DE"
              : locale === "fr"
                ? "fr_FR"
                : "en_US";

  const extraMeta = (options.extraMeta ?? []).filter(
    (meta) => meta.property !== "og:image" && meta.name !== "twitter:image",
  );
  const structuredMeta: Array<Record<string, string>> = options.structuredData
    ? [
        {
          "script:ld+json": options.structuredData,
        } as unknown as Record<string, string>,
      ]
    : [];

  return {
    meta: [
      { title: options.title },
      { name: "description", content: options.description },
      { property: "og:title", content: options.title },
      { property: "og:description", content: options.description },
      { property: "og:type", content: options.type ?? "website" },
      { property: "og:locale", content: ogLocale },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: options.title },
      { name: "twitter:description", content: options.description },
      { name: "twitter:image", content: imageUrl },
      ...structuredMeta,
      ...extraMeta,
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
      ...LOCALES.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: absoluteUrl(localePath(options.basePath, alternateLocale)),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: absoluteUrl(options.basePath),
      },
    ],
  };
}

/** Build a route `head()` payload for a known top-level page. */
export function pageHead(
  locale: Locale,
  key: PageKey,
  extraMeta: Array<Record<string, string>> = [],
) {
  const m = PAGE_META[locale][key];
  const socialImage = extraMeta.find((meta) => meta.property === "og:image")?.content;

  return customPageHead(locale, {
    basePath: PAGE_PATHS[key],
    title: m.title,
    description: m.description,
    image: socialImage,
    extraMeta,
  });
}
