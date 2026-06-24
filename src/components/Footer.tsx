import { Mail, MessageCircle, Globe, MapPin } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";
import { LocaleLink, useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t, data } = useTranslation();

  return (
    <footer className="border-t border-border bg-[image:var(--gradient-panel)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <img
            src="/model-oils/images/logo-main.png"
            alt="Model Oils"
            className="h-28 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.footer.taglinePre}{" "}
            <span className="font-semibold text-foreground">HI-TECH</span> {t.footer.taglinePost}
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-primary">
              <Mail className="h-4 w-4" /> {CONTACT.email}
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
              <MessageCircle className="h-4 w-4" /> WhatsApp: {CONTACT.phone}
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
            {t.footer.products}
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
