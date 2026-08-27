import { ShieldCheck } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";
import { LocaleLink, useTranslation } from "@/lib/i18n";
import { AUTHORIZED_DISTRIBUTOR_LABEL } from "@/lib/i18n/authorized-distributor";
import { getLegalContent } from "@/lib/legal";
import { getYokohamaCategoryName, YOKOHAMA_CATEGORY_DEFINITIONS } from "@/lib/yokohama-categories";

export function Footer() {
  const { t, locale } = useTranslation();
  const legal = getLegalContent(locale);

  return (
    <footer className="brand-footer site-footer-corporate relative z-10 shrink-0 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.15fr_0.85fr_1.35fr] lg:gap-12 lg:px-8 lg:py-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <img
            src="/model-oils/images/logo-main-2026-v2.png"
            alt="MODEL GRUP"
            width={1536}
            height={1024}
            className="h-16 w-auto object-contain lg:h-20"
          />
          <div className="mt-4 inline-flex max-w-sm items-start gap-2 border-l-2 border-primary pl-3 text-xs font-semibold leading-relaxed text-muted-foreground rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{AUTHORIZED_DISTRIBUTOR_LABEL[locale]}</span>
          </div>
        </div>

        <nav aria-label={t.footer.company}>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            {t.footer.company}
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {NAV_LINKS.filter(({ brand }) => !brand).map((link) => (
              <li key={link.to}>
                <LocaleLink
                  to={link.to}
                  className="inline-flex py-1 transition-colors hover:text-primary"
                >
                  {t.nav[link.key]}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={`YOKOHAMA ${t.footer.products}`}>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            YOKOHAMA <span className="text-primary">{t.footer.products}</span>
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {YOKOHAMA_CATEGORY_DEFINITIONS.map(({ slug }) => (
              <li key={slug}>
                <LocaleLink
                  to={`/yokohama/${slug}`}
                  className="inline-flex py-1 transition-colors hover:text-primary"
                >
                  {getYokohamaCategoryName(slug, locale)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-start lg:px-8">
          <p>
            © {new Date().getFullYear()} MODEL GRUP. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            <LocaleLink to="/privacy" className="transition-colors hover:text-primary">
              {legal.labels.privacy}
            </LocaleLink>
            <LocaleLink to="/kvkk" className="transition-colors hover:text-primary">
              {legal.labels.kvkk}
            </LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
