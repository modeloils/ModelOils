import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { HI_TECH_CATALOGS } from "@/lib/site-data";
import { useTranslation } from "@/lib/i18n";

const catalogs = [
  { title: "HI-TECH English Catalogue", href: HI_TECH_CATALOGS.en, language: "English" },
  { title: "HI-TECH Turkish Catalogue", href: HI_TECH_CATALOGS.tr, language: "Türkçe" },
  { title: "HI-TECH Russian Catalogue", href: HI_TECH_CATALOGS.ru, language: "Русский" },
];

export const Route = createFileRoute("/catalogs")({
  head: () => ({ meta: [{ title: "HI-TECH Catalogues | Model Oils" }] }),
  component: Catalogs,
});

export function Catalogs() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <PageHero compact eyebrow="HI-TECH" title={t.nav.catalogs} />
      <main className="bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
          {catalogs.map((catalog) => (
            <article
              key={catalog.href}
              className="flex min-h-64 flex-col justify-between rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 shadow-[var(--shadow-card)]"
            >
              <div>
                <FileText className="h-9 w-9 text-primary" aria-hidden="true" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">{catalog.language}</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-foreground">{catalog.title}</h2>
              </div>
              <Button asChild variant="hero" className="mt-8 w-full">
                <a href={catalog.href} target="_blank" rel="noreferrer">
                  <Download />
                  {t.hitech.downloadCatalog}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}
