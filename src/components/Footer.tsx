import { Mail, MessageCircle, Globe, MapPin } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";
import { LocaleLink, useTranslation } from "@/lib/i18n";
import {
  getYokohamaCategoryName,
  YOKOHAMA_CATEGORY_DEFINITIONS,
} from "@/lib/yokohama-categories";

export function Footer() {
  const { t, data, locale } = useTranslation();

  return (
    <footer className="border-t border-border bg-[image:var(--gradient-panel)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <img
            src="/model-oils/images/logo-main.png"
            alt="Model Oils"
            className="h-20 w-auto object-contain lg:h-28"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.footer.taglinePre}{" "}
            <span className="font-semibold text-foreground">HI-TECH</span> {t.footer.taglinePost}
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <a href={`mailto:${CONTACT.email}`} className="flex min-h-[44px] items-center gap-2 hover:text-primary">
              <Mail className="h-4 w-4 shrink-0" /> {CONTACT.email}
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 hover:text-primary">
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
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <LocaleLink to={l.to} className="hover:text-primary">
                  {t.nav[l.key]}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            <span className="block text-primary">HI-TECH</span>
            <span className="mt-1 block text-xs text-foreground">
              {t.footer.products}
            </span>
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {data.categories.slice(0, 6).map((c) => (
              <li key={c.name}>
                <LocaleLink to={c.slug ? `/hi-tech/${c.slug}` : "/hi-tech"} className="hover:text-primary">
                  {c.name}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="yokohama-footer-products p-5">
          <h4 className="relative font-display text-sm font-bold uppercase tracking-wider">
            <span className="block text-[oklch(0.7_0.22_27)]">YOKOHAMA</span>
            <span className="mt-1 block text-xs text-[oklch(0.76_0.16_154)]">
              {t.footer.products}
            </span>
          </h4>
          <ul className="relative mt-4 space-y-2 text-sm text-muted-foreground">
            {YOKOHAMA_CATEGORY_DEFINITIONS.slice(0, 6).map(({ slug }, index) => (
              <li key={slug}>
                <LocaleLink
                  to={`/yokohama/${slug}`}
                  className="group flex items-start gap-2 transition-colors hover:text-[oklch(0.8_0.15_154)]"
                >
                  <span
                    className={
                      index % 2 === 0
                        ? "mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.68_0.22_27)]"
                        : "mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.7_0.17_154)]"
                    }
                    aria-hidden="true"
                  />
                  <span>{getYokohamaCategoryName(slug, locale)}</span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            {t.footer.exportMarkets}
          </h4>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {data.exportMarkets.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Model Oils. {t.footer.rights}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">LinkedIn</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
