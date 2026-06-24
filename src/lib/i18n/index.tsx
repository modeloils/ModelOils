import type { ComponentProps, ReactNode } from "react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { UI, PAGE_META, type PageKey } from "./ui";
import { SITE_CONTENT } from "./content";
import { type Locale, LOCALE_COOKIE, LOCALES } from "./types";

export type { Locale } from "./types";
export { LOCALE_COOKIE, DEFAULT_LOCALE, LOCALES } from "./types";

/** Base (English) path for each page, used for locale switching and hreflang. */
const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  export: "/export",
  hitech: "/hi-tech",
  industries: "/industries",
  products: "/products",
  media: "/media",
  blog: "/blog",
};

/** Prefix a base English path with the locale prefix when not English. */
export function localePath(to: string, locale: Locale): string {
  if (locale === "en") return to;
  if (locale === "tr" && to === "/hi-tech") return "/tr/HI-TECH";
  if (locale === "tr" && to.startsWith("/hi-tech/")) return `/tr/HI-TECH${to.slice("/hi-tech".length)}`;
  return to === "/" ? `/${locale}` : `/${locale}${to}`;
}

/** Remove a leading locale prefix, returning the base English path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/tr" || pathname === "/ru" || pathname === "/fa" || pathname === "/ar" || pathname === "/de" || pathname === "/fr") return "/";
  if (pathname === "/tr/HI-TECH") return "/hi-tech";
  if (pathname.startsWith("/tr/HI-TECH/")) return `/hi-tech${pathname.slice("/tr/HI-TECH".length)}`;
  if (pathname.startsWith("/tr/") || pathname.startsWith("/ru/") || pathname.startsWith("/fa/") || pathname.startsWith("/ar/") || pathname.startsWith("/de/") || pathname.startsWith("/fr/")) return pathname.slice(3);
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
  return v === "en" || v === "tr" || v === "ru" || v === "fa" || v === "ar" || v === "de" || v === "fr" ? v : null;
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

/** Toggle between English and Turkish, preserving the current page. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const base = stripLocale(pathname);

  function switchTo(next: Locale) {
    if (next === locale) return;
    setLocaleCookie(next);
    router.navigate({ to: localePath(base, next) as LinkProps["to"] });
  }

  const options = LOCALES;
  const activeIndex = options.indexOf(locale);

  return (
    <div
      className={cn(
        "language-switcher relative inline-flex items-center overflow-hidden rounded-md border border-border bg-secondary/40 p-0.5 text-xs font-semibold shadow-inner shadow-black/20",
        className,
      )}
      role="group"
      aria-label={UI[locale].lang.label}
      dir="ltr"
    >
      <span
        className="language-switcher-thumb pointer-events-none absolute left-0.5 top-0.5 h-[calc(100%-0.25rem)] w-9 rounded bg-[image:var(--gradient-blue)] shadow-[var(--shadow-glow)]"
        style={{ transform: `translateX(${activeIndex * 2.25}rem)` }}
        aria-hidden="true"
      >
        <span key={locale} className="language-switcher-shine" />
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => switchTo(opt)}
          aria-pressed={locale === opt}
          className={cn(
            "relative z-10 flex h-8 w-9 shrink-0 items-center justify-center rounded uppercase tracking-wide transition-colors duration-200",
            locale === opt
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/** Build a route `head()` payload (meta + hreflang) for a page in a locale. */
export function pageHead(
  locale: Locale,
  key: PageKey,
  extraMeta: Array<Record<string, string>> = [],
) {
  const m = PAGE_META[locale][key];
  const enHref = PAGE_PATHS[key];
  const trHref = localePath(PAGE_PATHS[key], "tr");
  const ruHref = localePath(PAGE_PATHS[key], "ru");
  const faHref = localePath(PAGE_PATHS[key], "fa");
  const arHref = localePath(PAGE_PATHS[key], "ar");
  const deHref = localePath(PAGE_PATHS[key], "de");
  const frHref = localePath(PAGE_PATHS[key], "fr");
  const ogLocale =
    locale === "tr" ? "tr_TR" : locale === "ru" ? "ru_RU" : locale === "fa" ? "fa_IR" : locale === "ar" ? "ar_AE" : locale === "de" ? "de_DE" : locale === "fr" ? "fr_FR" : "en_US";

  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.ogTitle },
      { property: "og:description", content: m.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: ogLocale },
      ...extraMeta,
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: enHref },
      { rel: "alternate", hrefLang: "tr", href: trHref },
      { rel: "alternate", hrefLang: "ru", href: ruHref },
      { rel: "alternate", hrefLang: "fa", href: faHref },
      { rel: "alternate", hrefLang: "ar", href: arHref },
      { rel: "alternate", hrefLang: "de", href: deHref },
      { rel: "alternate", hrefLang: "fr", href: frHref },
      { rel: "alternate", hrefLang: "x-default", href: enHref },
    ],
  };
}
