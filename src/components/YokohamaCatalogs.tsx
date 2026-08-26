import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useTranslation, type Locale } from "@/lib/i18n";
import { BRAND_IMAGES, YOKOHAMA_CATALOGS } from "@/lib/site-data";

interface CatalogCopy {
  sectionDescription: string;
  motorOilKicker: string;
  motorOilTitle: string;
  motorOilDescription: string;
  motorOilMeta: string;
  batteryKicker: string;
  batteryTitle: string;
  batteryDescription: string;
  batteryMeta: string;
}

const CATALOG_COPY: Record<Locale, CatalogCopy> = {
  en: {
    sectionDescription:
      "Explore the official Yokohama motor oil and VOLT battery catalogues for product ranges and technical information.",
    motorOilKicker: "Motor Oil",
    motorOilTitle: "Yokohama Motor Oil Catalogue",
    motorOilDescription: "Explore the Yokohama motor oil range and its technical information.",
    motorOilMeta: "55 pages · PDF",
    batteryKicker: "Batteries",
    batteryTitle: "Yokohama VOLT Battery Catalogue",
    batteryDescription: "Explore the Yokohama VOLT battery range and its technical information.",
    batteryMeta: "17 pages · PDF",
  },
  tr: {
    sectionDescription:
      "Ürün serileri ve teknik bilgiler için resmi Yokohama motor yağı ve VOLT akü kataloglarını inceleyin.",
    motorOilKicker: "Motor Yağı",
    motorOilTitle: "Yokohama Motor Yağı Kataloğu",
    motorOilDescription: "Yokohama motor yağı ürün serisini ve teknik bilgilerini inceleyin.",
    motorOilMeta: "55 sayfa · PDF",
    batteryKicker: "Akü",
    batteryTitle: "Yokohama VOLT Akü Kataloğu",
    batteryDescription: "Yokohama VOLT akü serisini ve teknik bilgilerini inceleyin.",
    batteryMeta: "17 sayfa · PDF",
  },
  ru: {
    sectionDescription:
      "Ознакомьтесь с официальными каталогами моторных масел Yokohama и аккумуляторов VOLT, включая ассортимент и техническую информацию.",
    motorOilKicker: "Моторное масло",
    motorOilTitle: "Каталог моторных масел Yokohama",
    motorOilDescription:
      "Ознакомьтесь с ассортиментом моторных масел Yokohama и технической информацией.",
    motorOilMeta: "55 страниц · PDF",
    batteryKicker: "Аккумуляторы",
    batteryTitle: "Каталог аккумуляторов Yokohama VOLT",
    batteryDescription:
      "Ознакомьтесь с ассортиментом аккумуляторов Yokohama VOLT и технической информацией.",
    batteryMeta: "17 страниц · PDF",
  },
  fa: {
    sectionDescription:
      "کاتالوگ‌های رسمی روغن موتور Yokohama و باتری VOLT را برای مشاهده محصولات و اطلاعات فنی بررسی کنید.",
    motorOilKicker: "روغن موتور",
    motorOilTitle: "کاتالوگ روغن موتور Yokohama",
    motorOilDescription: "مجموعه روغن موتور Yokohama و اطلاعات فنی آن را بررسی کنید.",
    motorOilMeta: "۵۵ صفحه · PDF",
    batteryKicker: "باتری",
    batteryTitle: "کاتالوگ باتری Yokohama VOLT",
    batteryDescription: "مجموعه باتری Yokohama VOLT و اطلاعات فنی آن را بررسی کنید.",
    batteryMeta: "۱۷ صفحه · PDF",
  },
  ar: {
    sectionDescription:
      "استعرض الكتالوجات الرسمية لزيوت محركات Yokohama وبطاريات VOLT للتعرف على المنتجات والمعلومات الفنية.",
    motorOilKicker: "زيت المحرك",
    motorOilTitle: "كتالوج زيوت محركات Yokohama",
    motorOilDescription: "استعرض مجموعة زيوت محركات Yokohama ومعلوماتها الفنية.",
    motorOilMeta: "55 صفحة · PDF",
    batteryKicker: "البطاريات",
    batteryTitle: "كتالوج بطاريات Yokohama VOLT",
    batteryDescription: "استعرض مجموعة بطاريات Yokohama VOLT ومعلوماتها الفنية.",
    batteryMeta: "17 صفحة · PDF",
  },
  de: {
    sectionDescription:
      "Entdecken Sie die offiziellen Kataloge für Yokohama Motoröle und VOLT Batterien mit Sortimenten und technischen Informationen.",
    motorOilKicker: "Motoröl",
    motorOilTitle: "Yokohama Motoröl-Katalog",
    motorOilDescription:
      "Entdecken Sie das Yokohama Motoröl-Sortiment und die technischen Informationen.",
    motorOilMeta: "55 Seiten · PDF",
    batteryKicker: "Batterien",
    batteryTitle: "Yokohama VOLT Batteriekatalog",
    batteryDescription:
      "Entdecken Sie das Yokohama VOLT Batteriesortiment und die technischen Informationen.",
    batteryMeta: "17 Seiten · PDF",
  },
  fr: {
    sectionDescription:
      "Consultez les catalogues officiels des huiles moteur Yokohama et des batteries VOLT pour découvrir les gammes et leurs informations techniques.",
    motorOilKicker: "Huile moteur",
    motorOilTitle: "Catalogue des huiles moteur Yokohama",
    motorOilDescription:
      "Découvrez la gamme d’huiles moteur Yokohama et ses informations techniques.",
    motorOilMeta: "55 pages · PDF",
    batteryKicker: "Batteries",
    batteryTitle: "Catalogue des batteries Yokohama VOLT",
    batteryDescription:
      "Découvrez la gamme de batteries Yokohama VOLT et ses informations techniques.",
    batteryMeta: "17 pages · PDF",
  },
};

function CatalogCard({
  title,
  description,
  kicker,
  meta,
  image,
  href,
  downloadLabel,
}: {
  title: string;
  description: string;
  kicker: string;
  meta: string;
  image: string;
  href: string;
  downloadLabel: string;
}) {
  return (
    <article className="brand-card flex h-full flex-col overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)]">
      <div className="relative h-80 overflow-hidden bg-black/90 sm:h-[26rem]">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
        />
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="relative h-full w-full object-contain p-3 drop-shadow-2xl sm:p-5"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{kicker}</p>
        <h3 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-muted-foreground">
          <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
          {meta}
        </p>
        <div className="mt-auto pt-7">
          <Button asChild variant="hero" className="w-full sm:w-auto">
            <a href={href} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              {downloadLabel}
            </a>
          </Button>
        </div>
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
        <SectionHeading
          eyebrow="YOKOHAMA"
          title={t.nav.catalogs}
          description={copy.sectionDescription}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <CatalogCard
            title={copy.motorOilTitle}
            description={copy.motorOilDescription}
            kicker={copy.motorOilKicker}
            meta={copy.motorOilMeta}
            image={BRAND_IMAGES.yokohamaCover}
            href={YOKOHAMA_CATALOGS.motorOil}
            downloadLabel={t.productDetails.downloadCatalog}
          />
          <CatalogCard
            title={copy.batteryTitle}
            description={copy.batteryDescription}
            kicker={copy.batteryKicker}
            meta={copy.batteryMeta}
            image={BRAND_IMAGES.yokohamaVolt}
            href={YOKOHAMA_CATALOGS.volt}
            downloadLabel={t.productDetails.downloadCatalog}
          />
        </div>
      </div>
    </section>
  );
}
