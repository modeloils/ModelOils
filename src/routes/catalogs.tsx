import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { HI_TECH_CATALOGS } from "@/lib/site-data";
import { useTranslation, type Locale } from "@/lib/i18n";

type CatalogLanguage = keyof typeof HI_TECH_CATALOGS;

const catalogCopy: Record<Locale, Record<CatalogLanguage, { language: string; title: string }>> = {
  en: {
    en: { language: "English", title: "HI-TECH English Catalogue" },
    tr: { language: "Turkish", title: "HI-TECH Turkish Catalogue" },
    ru: { language: "Russian", title: "HI-TECH Russian Catalogue" },
    fa: { language: "Persian", title: "HI-TECH Persian Catalogue" },
  },
  tr: {
    en: { language: "İngilizce", title: "HI-TECH İngilizce Katalog" },
    tr: { language: "Türkçe", title: "HI-TECH Türkçe Katalog" },
    ru: { language: "Rusça", title: "HI-TECH Rusça Katalog" },
    fa: { language: "Farsça", title: "HI-TECH Farsça Katalog" },
  },
  ru: {
    en: { language: "Английский", title: "Английский каталог HI-TECH" },
    tr: { language: "Турецкий", title: "Турецкий каталог HI-TECH" },
    ru: { language: "Русский", title: "Русский каталог HI-TECH" },
    fa: { language: "Персидский", title: "Персидский каталог HI-TECH" },
  },
  fa: {
    en: { language: "انگلیسی", title: "کاتالوگ انگلیسی HI-TECH" },
    tr: { language: "ترکی", title: "کاتالوگ ترکی HI-TECH" },
    ru: { language: "روسی", title: "کاتالوگ روسی HI-TECH" },
    fa: { language: "فارسی", title: "کاتالوگ فارسی HI-TECH" },
  },
  ar: {
    en: { language: "الإنجليزية", title: "كتالوج HI-TECH باللغة الإنجليزية" },
    tr: { language: "التركية", title: "كتالوج HI-TECH باللغة التركية" },
    ru: { language: "الروسية", title: "كتالوج HI-TECH باللغة الروسية" },
    fa: { language: "الفارسية", title: "كتالوج HI-TECH باللغة الفارسية" },
  },
  de: {
    en: { language: "Englisch", title: "Englischer HI-TECH-Katalog" },
    tr: { language: "Türkisch", title: "Türkischer HI-TECH-Katalog" },
    ru: { language: "Russisch", title: "Russischer HI-TECH-Katalog" },
    fa: { language: "Persisch", title: "Persischer HI-TECH-Katalog" },
  },
  fr: {
    en: { language: "Anglais", title: "Catalogue HI-TECH en anglais" },
    tr: { language: "Turc", title: "Catalogue HI-TECH en turc" },
    ru: { language: "Russe", title: "Catalogue HI-TECH en russe" },
    fa: { language: "Persan", title: "Catalogue HI-TECH en persan" },
  },
};

export const Route = createFileRoute("/catalogs")({
  head: () => ({ meta: [{ title: "HI-TECH Catalogues | Model Oils" }] }),
  component: Catalogs,
});

export function Catalogs() {
  const { locale, t } = useTranslation();
  const catalogs = (Object.entries(HI_TECH_CATALOGS) as [CatalogLanguage, string][]).map(
    ([language, href]) => ({ ...catalogCopy[locale][language], href }),
  );

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
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {catalog.language}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-foreground">
                  {catalog.title}
                </h2>
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
