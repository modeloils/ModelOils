import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { HI_TECH_CATALOGS, YOKOHAMA_CATALOGS } from "@/lib/site-data";
import { useTranslation, type Locale } from "@/lib/i18n";

type CatalogLanguage = keyof typeof HI_TECH_CATALOGS;
type YokohamaLine = keyof typeof YOKOHAMA_CATALOGS;

/** A catalogue tile. `kicker` is the language for HI-TECH, the product line for Yokohama. */
type CatalogEntry = { kicker: string; title: string; href: string };

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

/** Per-brand section headings plus the Yokohama tile labels. */
const brandCopy: Record<
  Locale,
  {
    hiTech: { title: string; description: string };
    yokohama: {
      title: string;
      description: string;
      lines: Record<YokohamaLine, { kicker: string; title: string }>;
    };
  }
> = {
  en: {
    hiTech: {
      title: "HI-TECH Catalogues",
      description: "Our own HI-TECH lubricant range, available in four languages.",
    },
    yokohama: {
      title: "Yokohama Catalogues",
      description:
        "Yokohama motor oils and VOLT batteries, distributed by Model Petrol for the Middle East.",
      lines: {
        motorOil: { kicker: "Motor Oil", title: "Yokohama Motor Oil Catalogue" },
        volt: { kicker: "Batteries", title: "Yokohama VOLT Battery Catalogue" },
      },
    },
  },
  tr: {
    hiTech: {
      title: "HI-TECH Katalogları",
      description: "Dört dilde sunulan kendi HI-TECH madeni yağ ürün gamımız.",
    },
    yokohama: {
      title: "Yokohama Katalogları",
      description:
        "Model Petrol’ün Orta Doğu için dağıtımını yaptığı Yokohama motor yağları ve VOLT aküleri.",
      lines: {
        motorOil: { kicker: "Motor Yağı", title: "Yokohama Motor Yağı Kataloğu" },
        volt: { kicker: "Akü", title: "Yokohama VOLT Akü Kataloğu" },
      },
    },
  },
  ru: {
    hiTech: {
      title: "Каталоги HI-TECH",
      description: "Собственная линейка смазочных материалов HI-TECH на четырёх языках.",
    },
    yokohama: {
      title: "Каталоги Yokohama",
      description:
        "Моторные масла Yokohama и аккумуляторы VOLT, поставляемые Model Petrol на Ближний Восток.",
      lines: {
        motorOil: { kicker: "Моторное масло", title: "Каталог моторных масел Yokohama" },
        volt: { kicker: "Аккумуляторы", title: "Каталог аккумуляторов Yokohama VOLT" },
      },
    },
  },
  fa: {
    hiTech: {
      title: "کاتالوگ‌های HI-TECH",
      description: "مجموعه روان‌کارهای HI-TECH ما، در چهار زبان.",
    },
    yokohama: {
      title: "کاتالوگ‌های یوکوهاما",
      description: "روغن موتور یوکوهاما و باتری‌های VOLT، توزیع‌شده توسط مدل پترول برای خاورمیانه.",
      lines: {
        motorOil: { kicker: "روغن موتور", title: "کاتالوگ روغن موتور یوکوهاما" },
        volt: { kicker: "باتری", title: "کاتالوگ باتری VOLT یوکوهاما" },
      },
    },
  },
  ar: {
    hiTech: {
      title: "كتالوجات HI-TECH",
      description: "مجموعتنا الخاصة من زيوت HI-TECH، متوفرة بأربع لغات.",
    },
    yokohama: {
      title: "كتالوجات يوكوهاما",
      description: "زيوت محركات يوكوهاما وبطاريات VOLT، الموزعة من قبل موديل بترول للشرق الأوسط.",
      lines: {
        motorOil: { kicker: "زيت المحرك", title: "كتالوج زيوت محركات يوكوهاما" },
        volt: { kicker: "البطاريات", title: "كتالوج بطاريات يوكوهاما VOLT" },
      },
    },
  },
  de: {
    hiTech: {
      title: "HI-TECH-Kataloge",
      description: "Unser eigenes HI-TECH-Schmierstoffsortiment in vier Sprachen.",
    },
    yokohama: {
      title: "Yokohama-Kataloge",
      description:
        "Yokohama-Motorenöle und VOLT-Batterien, vertrieben von Model Petrol für den Nahen Osten.",
      lines: {
        motorOil: { kicker: "Motoröl", title: "Yokohama Motoröl-Katalog" },
        volt: { kicker: "Batterien", title: "Yokohama VOLT Batterie-Katalog" },
      },
    },
  },
  fr: {
    hiTech: {
      title: "Catalogues HI-TECH",
      description: "Notre propre gamme de lubrifiants HI-TECH, disponible en quatre langues.",
    },
    yokohama: {
      title: "Catalogues Yokohama",
      description:
        "Huiles moteur Yokohama et batteries VOLT, distribuées par Model Petrol pour le Moyen-Orient.",
      lines: {
        motorOil: { kicker: "Huile moteur", title: "Catalogue d’huiles moteur Yokohama" },
        volt: { kicker: "Batteries", title: "Catalogue de batteries Yokohama VOLT" },
      },
    },
  },
};

export const Route = createFileRoute("/catalogs")({
  head: () => ({ meta: [{ title: "Catalogues | Model Oils" }] }),
  component: Catalogs,
});

function CatalogGrid({
  entries,
  downloadLabel,
}: {
  entries: CatalogEntry[];
  downloadLabel: string;
}) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((catalog) => (
        <article
          key={catalog.href}
          className="brand-card flex min-h-64 flex-col justify-between rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 shadow-[var(--shadow-card)]"
        >
          <div>
            <FileText className="h-9 w-9 text-primary" aria-hidden="true" />
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {catalog.kicker}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
              {catalog.title}
            </h3>
          </div>
          <Button asChild variant="hero" className="mt-8 w-full">
            <a href={catalog.href} target="_blank" rel="noreferrer">
              <Download />
              {downloadLabel}
            </a>
          </Button>
        </article>
      ))}
    </div>
  );
}

export function Catalogs() {
  const { locale, t } = useTranslation();
  const brands = brandCopy[locale];

  const hiTechEntries: CatalogEntry[] = (
    Object.entries(HI_TECH_CATALOGS) as [CatalogLanguage, string][]
  ).map(([language, href]) => ({
    kicker: catalogCopy[locale][language].language,
    title: catalogCopy[locale][language].title,
    href,
  }));

  const yokohamaEntries: CatalogEntry[] = (
    Object.entries(YOKOHAMA_CATALOGS) as [YokohamaLine, string][]
  ).map(([line, href]) => ({ ...brands.yokohama.lines[line], href }));

  return (
    <SiteLayout>
      <PageHero compact eyebrow="HI-TECH · YOKOHAMA" title={t.nav.catalogs} />
      <main className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          <section>
            <SectionHeading
              eyebrow="HI-TECH"
              title={brands.hiTech.title}
              description={brands.hiTech.description}
            />
            <CatalogGrid entries={hiTechEntries} downloadLabel={t.hitech.downloadCatalog} />
          </section>

          <section>
            <SectionHeading
              eyebrow="YOKOHAMA"
              title={brands.yokohama.title}
              description={brands.yokohama.description}
            />
            <CatalogGrid entries={yokohamaEntries} downloadLabel={t.hitech.downloadCatalog} />
          </section>
        </div>
      </main>
    </SiteLayout>
  );
}
