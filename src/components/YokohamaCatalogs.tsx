import { Download } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useTranslation, type Locale } from "@/lib/i18n";
import { BRAND_IMAGES, YOKOHAMA_CATALOGS } from "@/lib/site-data";

interface CatalogCopy {
  motorOilTitle: string;
  motorOilDescription: string;
  batteryTitle: string;
  batteryDescription: string;
}

const CATALOG_COPY: Record<Locale, CatalogCopy> = {
  en: {
    motorOilTitle: "Yokohama Motor Oil Catalogue",
    motorOilDescription: "Explore the Yokohama motor oil range and its technical information.",
    batteryTitle: "Yokohama VOLT Battery Catalogue",
    batteryDescription: "Explore the Yokohama VOLT battery range and its technical information.",
  },
  tr: {
    motorOilTitle: "Yokohama Motor Yağı Kataloğu",
    motorOilDescription: "Yokohama motor yağı ürün serisini ve teknik bilgilerini inceleyin.",
    batteryTitle: "Yokohama VOLT Akü Kataloğu",
    batteryDescription: "Yokohama VOLT akü serisini ve teknik bilgilerini inceleyin.",
  },
  ru: {
    motorOilTitle: "Каталог моторных масел Yokohama",
    motorOilDescription:
      "Ознакомьтесь с ассортиментом моторных масел Yokohama и технической информацией.",
    batteryTitle: "Каталог аккумуляторов Yokohama VOLT",
    batteryDescription:
      "Ознакомьтесь с ассортиментом аккумуляторов Yokohama VOLT и технической информацией.",
  },
  fa: {
    motorOilTitle: "کاتالوگ روغن موتور Yokohama",
    motorOilDescription: "مجموعه روغن موتور Yokohama و اطلاعات فنی آن را بررسی کنید.",
    batteryTitle: "کاتالوگ باتری Yokohama VOLT",
    batteryDescription: "مجموعه باتری Yokohama VOLT و اطلاعات فنی آن را بررسی کنید.",
  },
  ar: {
    motorOilTitle: "كتالوج زيوت محركات Yokohama",
    motorOilDescription: "استعرض مجموعة زيوت محركات Yokohama ومعلوماتها الفنية.",
    batteryTitle: "كتالوج بطاريات Yokohama VOLT",
    batteryDescription: "استعرض مجموعة بطاريات Yokohama VOLT ومعلوماتها الفنية.",
  },
  de: {
    motorOilTitle: "Yokohama Motoröl-Katalog",
    motorOilDescription:
      "Entdecken Sie das Yokohama Motoröl-Sortiment und die technischen Informationen.",
    batteryTitle: "Yokohama VOLT Batteriekatalog",
    batteryDescription:
      "Entdecken Sie das Yokohama VOLT Batteriesortiment und die technischen Informationen.",
  },
  fr: {
    motorOilTitle: "Catalogue des huiles moteur Yokohama",
    motorOilDescription:
      "Découvrez la gamme d’huiles moteur Yokohama et ses informations techniques.",
    batteryTitle: "Catalogue des batteries Yokohama VOLT",
    batteryDescription:
      "Découvrez la gamme de batteries Yokohama VOLT et ses informations techniques.",
  },
};

function CatalogCard({
  title,
  description,
  image,
  href,
  downloadLabel,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
  downloadLabel: string;
}) {
  return (
    <article className="brand-card overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)]">
      <div className="relative h-64 overflow-hidden sm:h-72">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        <Button asChild variant="hero" className="mt-7 w-full sm:w-auto">
          <a href={href} target="_blank" rel="noreferrer">
            <Download className="h-4 w-4" />
            {downloadLabel}
          </a>
        </Button>
      </div>
    </article>
  );
}

export function YokohamaCatalogs() {
  const { locale, t } = useTranslation();
  const copy = CATALOG_COPY[locale];

  return (
    <section className="border-b border-border bg-background/55 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="YOKOHAMA" title={t.nav.catalogs} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <CatalogCard
            title={copy.motorOilTitle}
            description={copy.motorOilDescription}
            image={BRAND_IMAGES.yokohamaCover}
            href={YOKOHAMA_CATALOGS.motorOil}
            downloadLabel={t.productDetails.downloadCatalog}
          />
          <CatalogCard
            title={copy.batteryTitle}
            description={copy.batteryDescription}
            image={BRAND_IMAGES.yokohamaVolt}
            href={YOKOHAMA_CATALOGS.volt}
            downloadLabel={t.productDetails.downloadCatalog}
          />
        </div>
      </div>
    </section>
  );
}
