import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";
import { LocaleLink, LanguageSwitcher, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6 lg:h-28 lg:px-8">
        <LocaleLink to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <img
            src="/model-oils/images/logo-main.png"
            alt="Model Oils"
            className="h-12 w-auto shrink-0 object-contain sm:h-16 lg:h-24"
          />
        </LocaleLink>

        <nav className="ml-3 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <LocaleLink
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className={cn(
                "relative rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-foreground",
                l.highlight && "text-foreground",
              )}
            >
              {l.key === "hiTech" ? (
                <span className="flex flex-col items-center leading-none">
                  <span>HI-TECH</span>
                  <span className="mt-0.5 text-[11px] font-semibold">{t.nav.hiTech.replace("HI-TECH ", "")}</span>
                </span>
              ) : (
                t.nav[l.key]
              )}
            </LocaleLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            className="grid h-11 w-11 place-items-center rounded-md border border-border text-foreground lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background/95 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((l) => (
              <LocaleLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-secondary text-primary" }}
                className="flex min-h-[44px] items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-foreground"
              >
                {l.key === "hiTech" ? (
                  <span className="flex flex-col leading-none">
                    <span>HI-TECH</span>
                    <span className="mt-1 text-xs font-semibold">{t.nav.hiTech.replace("HI-TECH ", "")}</span>
                  </span>
                ) : (
                  t.nav[l.key]
                )}
              </LocaleLink>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
