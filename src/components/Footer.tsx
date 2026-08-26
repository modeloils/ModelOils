import { Mail, MessageCircle, Globe, MapPin, ShieldCheck } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";
import { LocaleLink, useTranslation } from "@/lib/i18n";
import { AUTHORIZED_DISTRIBUTOR_LABEL } from "@/lib/i18n/authorized-distributor";
import { getYokohamaCategoryName, YOKOHAMA_CATEGORY_DEFINITIONS } from "@/lib/yokohama-categories";
import { cn } from "@/lib/utils";

export function Footer({ variant = "default" }: { variant?: "default" | "yokohama" }) {
  const { t, locale } = useTranslation();

  return (
    <footer
      className={cn(
        "brand-footer relative z-10 shrink-0 border-t border-border bg-[image:var(--gradient-panel)]",
        variant === "yokohama" ? "yokohama-footer-theme" : "site-footer-sandstone",
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-y-10 px-4 py-14 sm:grid-cols-2 sm:gap-x-8 sm:px-6 lg:grid-cols-[2fr_1fr_1fr] lg:gap-x-8 lg:px-8 xl:gap-x-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <img
            src="/model-oils/images/logo-main-2026-v2.png"
            alt="MODEL GRUP"
            className="h-20 w-auto object-contain lg:h-28"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.about.heroSubtitle}
          </p>
          <div className="mt-4 inline-flex max-w-sm items-start gap-2 rounded-md border border-brand-green/35 bg-brand-green/10 px-3 py-2 text-xs font-bold leading-relaxed text-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>{AUTHORIZED_DISTRIBUTOR_LABEL[locale]}</span>
          </div>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex min-h-[44px] items-center gap-2 hover:text-brand-red"
            >
              <Mail className="h-4 w-4 shrink-0" /> {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 hover:text-brand-green"
            >
              <MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp: {CONTACT.phone}
            </a>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> {t.footer.exportWelcome}
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {CONTACT.address}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            {t.footer.company}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.filter(({ brand }) => !brand).map((l) => (
              <li key={l.to}>
                <LocaleLink to={l.to} className="hover:text-primary">
                  {t.nav[l.key]}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">
            <span className="block text-brand-red">YOKOHAMA</span>
            <span className="mt-1 block text-xs text-brand-green">{t.footer.products}</span>
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {YOKOHAMA_CATEGORY_DEFINITIONS.slice(0, 6).map(({ slug }) => (
              <li key={slug}>
                <LocaleLink
                  to={`/yokohama/${slug}`}
                  className="transition-colors hover:text-brand-green"
                >
                  {getYokohamaCategoryName(slug, locale)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} MODEL GRUP. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
