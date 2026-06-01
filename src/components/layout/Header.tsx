"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react";

const BRANDS_MENU = [
  { name: "Shell",       slug: "Shell"   },
  { name: "Mobil",       slug: "mobil"   },
  { name: "Castrol",     slug: "castrol" },
  { name: "Elf / Total", slug: "total"   },
  { name: "Motul",       slug: "motul"   },
  { name: "Texol",       slug: "texol"   },
  { name: "Texaco",      slug: "texaco"  },
];

const BRAND_CATEGORY_PATHS = [
  { labelKey: "motorOils" as const,           path: "motor-yaglari"      },
  { labelKey: "industrialLubricants" as const, path: "endustriyel-yaglar" },
];

const LOCALES = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "tr", label: "Türkçe",   flag: "🇹🇷" },
  { code: "ru", label: "Русский",  flag: "🇷🇺" },
  { code: "fa", label: "فارسی",    flag: "🇮🇷" },
];

const SUPPORTED_LOCALE_CODES = LOCALES.map((l) => l.code);

const MEGA_MENU_KEYS = [
  {
    categoryKey: "motorOils" as const,
    href: "/products",
    itemKeys: ["synthetic5w30", "hd15w40", "mineral20w50"] as const,
  },
  {
    categoryKey: "mineralOils" as const,
    href: "/products",
    itemKeys: ["whiteMineralOil", "processOils", "transformerOil"] as const,
  },
  {
    categoryKey: "industrialLubricants" as const,
    href: "/products",
    itemKeys: ["hydraulicOils", "gearOils", "compressorOils"] as const,
  },
];

interface HeaderProps {
  locale?: string;
}

export function Header({ locale = "en" }: HeaderProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const pathname = usePathname();
  const isHome = pathname === "/" || /^\/[a-z]{2}$/.test(pathname);
  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

  // Build locale-switching URL preserving the current path
  const getLocaleHref = useCallback((newLocale: string) => {
    const pattern = new RegExp(`^/(${SUPPORTED_LOCALE_CODES.join("|")})(?=/|$)`);
    const withoutLocale = pathname.replace(pattern, "") || "/";
    if (newLocale === "en") return withoutLocale || "/";
    return withoutLocale === "/" ? `/${newLocale}` : `/${newLocale}${withoutLocale}`;
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-300",
        scrolled || !isHome
          ? "bg-brand-900/98 backdrop-blur-[12px] shadow-[0_2px_16px_rgba(8,15,23,0.32)]"
          : "bg-transparent"
      )}
    >
      <div className="container-xl flex items-center justify-between h-[120px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo-main.png"
            alt="Model Oils — International Export"
            width={147}
            height={80}
            className="h-28 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
          {/* Products mega-menu trigger */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-brand-200 hover:text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-white/6 transition-colors"
              onMouseEnter={() => setProductMenuOpen(true)}
              onMouseLeave={() => setProductMenuOpen(false)}
              aria-expanded={productMenuOpen}
              aria-haspopup="true"
            >
              {t("products")} <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {/* Mega-menu dropdown */}
            <div
              className={cn(
                "absolute top-full left-0 mt-1 w-[780px] bg-brand-900 border border-brand-700 rounded-lg shadow-[0_16px_48px_rgba(8,15,23,0.48)] transition-all duration-200 origin-top-left z-[var(--z-dropdown)]",
                productMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              )}
              onMouseEnter={() => setProductMenuOpen(true)}
              onMouseLeave={() => setProductMenuOpen(false)}
            >
              <div className="grid grid-cols-4 gap-0 p-6">
                {BRANDS_MENU.map((brand) => (
                  <div key={brand.slug} className="pr-4">
                    <span className="text-accent-500 text-[11px] font-semibold uppercase tracking-[0.08em] block mb-3">
                      {brand.name}
                    </span>
                    <ul className="space-y-1.5">
                      {BRAND_CATEGORY_PATHS.map((cat) => (
                        <li key={cat.path}>
                          <Link
                            href={`/brands/${brand.slug}/${cat.path}`}
                            className="text-brand-300 text-sm hover:text-white transition-colors block py-0.5"
                            onClick={() => setProductMenuOpen(false)}
                          >
                            {t(cat.labelKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {[
            { label: t("industries"), href: "/solutions" },
            { label: t("exportServices"), href: "/export-services" },
            { label: t("certifications"), href: "/certifications" },
            { label: t("about"), href: "/about" },
            { label: t("blog"), href: "/resources/blog" },
            { label: t("catalogs"), href: "/resources/catalogs" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-brand-200 hover:text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-white/6 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: locale + phone + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Locale selector */}
          <div className="relative">
            <button
              className="flex items-center gap-1.5 text-brand-300 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-md hover:bg-white/6 transition-colors"
              onClick={() => setLocaleMenuOpen(!localeMenuOpen)}
              aria-expanded={localeMenuOpen}
            >
              <Globe className="h-3.5 w-3.5" />
              {currentLocale.code.toUpperCase()}
              <ChevronDown className="h-3 w-3" />
            </button>
            {localeMenuOpen && (
              <div className="absolute top-full right-0 mt-1 bg-brand-900 border border-brand-700 rounded-lg shadow-lg py-1 min-w-[140px] z-[var(--z-dropdown)]">
                {LOCALES.map((loc) => (
                  <button
                    key={loc.code}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm hover:bg-brand-800 transition-colors w-full text-left",
                      loc.code === locale ? "text-accent-500 font-medium" : "text-brand-200"
                    )}
                    onClick={() => {
                      setLocaleMenuOpen(false);
                      window.location.href = getLocaleHref(loc.code);
                    }}
                  >
                    <span>{loc.flag}</span>
                    {loc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="tel:+905334567975"
            className="flex items-center gap-1.5 text-brand-300 hover:text-white text-sm transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+90 533 456 7975</span>
          </a>

          <Button asChild size="sm">
            <Link href="/contact/request-quote">{t("requestQuote")}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/8 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[120px] bg-brand-950/98 backdrop-blur-[12px] z-[calc(var(--z-header)-1)] transition-transform duration-300 overflow-y-auto",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col p-6 gap-1">
          {/* Locale selector – mobile */}
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-brand-700">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  loc.code === locale
                    ? "bg-accent-600/20 text-accent-500"
                    : "text-brand-300 hover:text-white hover:bg-white/6"
                )}
                onClick={() => {
                  setMobileOpen(false);
                  window.location.href = getLocaleHref(loc.code);
                }}
              >
                <span>{loc.flag}</span> {loc.label}
              </button>
            ))}
          </div>

          {/* Products accordion */}
          <button
            className="flex items-center justify-between text-brand-100 font-medium py-3 border-b border-brand-800"
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            {t("products")}
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileProductsOpen && "rotate-180")} />
          </button>
          {mobileProductsOpen && (
            <div className="pl-4 pb-2">
              {MEGA_MENU_KEYS.map((col) => (
                <div key={col.categoryKey} className="mb-3">
                  <Link
                    href={col.href}
                    className="text-accent-500 text-xs font-semibold uppercase tracking-widest block mb-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(col.categoryKey)}
                  </Link>
                  {col.itemKeys.map((key) => (
                    <Link
                      key={key}
                      href={col.href}
                      className="block text-brand-300 text-sm py-1 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(key)}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          {[
            { label: t("industries"), href: "/solutions" },
            { label: t("exportServices"), href: "/export-services" },
            { label: t("certifications"), href: "/certifications" },
            { label: t("about"), href: "/about" },
            { label: t("blog"), href: "/resources/blog" },
            { label: t("catalogs"), href: "/resources/catalogs" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-brand-100 font-medium py-3 border-b border-brand-800 hover:text-accent-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile bottom CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="tel:+905334567975"
              className="flex items-center justify-center gap-2 text-brand-300 py-3 border border-brand-700 rounded-[var(--radius-btn)] text-sm hover:text-white hover:border-brand-500 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +90 533 456 7975
            </a>
            <Button asChild size="full" onClick={() => setMobileOpen(false)}>
              <Link href="/contact/request-quote">{t("requestQuote")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
