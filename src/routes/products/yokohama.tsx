import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { BRAND_IMAGES, YOKOHAMA_CATALOGS } from "@/lib/site-data";
import { LocaleLink, pageHead, useTranslation, type Locale } from "@/lib/i18n";

interface LineCopy {
  kicker: string;
  title: string;
  blurb: string;
  /** Applications for the oils, build features for the batteries. */
  points: string[];
}

interface YokohamaCopy {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  motorOil: LineCopy;
  volt: LineCopy;
}

const yokohamaCopy: Record<Locale, YokohamaCopy> = {
  en: {
    heroEyebrow: "Distributed by Model Petrol",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "Japanese-quality lubricants and batteries, supplied to distributors and wholesalers through Model Petrol.",
    motorOil: {
      kicker: "Motor Oil",
      title: "The Yokohama lubricant range",
      blurb:
        "Full synthetic, semi-synthetic and mineral oils across eleven application groups, meeting API, ACEA, ILSAC and JASO specifications.",
      points: [
        "Passenger cars",
        "Trucks and buses",
        "Automatic transmission",
        "Mechanical transmission",
        "Antifreeze coolants",
        "Motorcycle",
        "Tractor and agricultural",
        "Industrial",
        "Greases",
        "Marine",
        "Special products",
      ],
    },
    volt: {
      kicker: "Batteries",
      title: "Yokohama VOLT",
      blurb:
        "Starter batteries built for demanding starts and long service life, with a sealed lid system and quick-charge capability.",
      points: [
        "Enhanced cranking power",
        "Strong structure",
        "Advanced quick-charge capability",
        "Patented closed lid system",
        "Special grid design with strong positive plates",
      ],
    },
  },
  tr: {
    heroEyebrow: "Model Petrol dağıtımıyla",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "Model Petrol aracılığıyla distribütörlere ve toptancılara sunulan Japon kalitesinde yağlar ve aküler.",
    motorOil: {
      kicker: "Motor Yağı",
      title: "Yokohama yağ serisi",
      blurb:
        "API, ACEA, ILSAC ve JASO spesifikasyonlarını karşılayan on bir uygulama grubunda tam sentetik, yarı sentetik ve mineral yağlar.",
      points: [
        "Binek araçlar",
        "Kamyon ve otobüs",
        "Otomatik şanzıman",
        "Mekanik şanzıman",
        "Antifriz ve soğutucular",
        "Motosiklet",
        "Traktör ve tarım",
        "Endüstriyel",
        "Gresler",
        "Denizcilik",
        "Özel ürünler",
      ],
    },
    volt: {
      kicker: "Akü",
      title: "Yokohama VOLT",
      blurb:
        "Zorlu ilk çalıştırmalar ve uzun ömür için üretilen, kapalı kapak sistemi ve hızlı şarj kabiliyetine sahip marş aküleri.",
      points: [
        "Yüksek marş gücü",
        "Güçlü yapı",
        "Gelişmiş hızlı şarj kabiliyeti",
        "Patentli kapalı kapak sistemi",
        "Güçlü pozitif plakalı özel ızgara tasarımı",
      ],
    },
  },
  ru: {
    heroEyebrow: "Поставляется Model Petrol",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "Смазочные материалы и аккумуляторы японского качества, поставляемые дистрибьюторам и оптовикам через Model Petrol.",
    motorOil: {
      kicker: "Моторное масло",
      title: "Линейка масел Yokohama",
      blurb:
        "Полностью синтетические, полусинтетические и минеральные масла в одиннадцати группах применения, соответствующие спецификациям API, ACEA, ILSAC и JASO.",
      points: [
        "Легковые автомобили",
        "Грузовики и автобусы",
        "Автоматические трансмиссии",
        "Механические трансмиссии",
        "Антифризы",
        "Мотоциклы",
        "Тракторы и сельхозтехника",
        "Промышленность",
        "Смазки",
        "Судоходство",
        "Специальные продукты",
      ],
    },
    volt: {
      kicker: "Аккумуляторы",
      title: "Yokohama VOLT",
      blurb:
        "Стартерные аккумуляторы для тяжёлых пусков и длительного срока службы, с герметичной крышкой и возможностью быстрой зарядки.",
      points: [
        "Повышенная пусковая мощность",
        "Прочная конструкция",
        "Быстрая зарядка",
        "Запатентованная закрытая крышка",
        "Особая конструкция решётки с усиленными положительными пластинами",
      ],
    },
  },
  fa: {
    heroEyebrow: "توزیع توسط Model Petrol",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "روانکارها و باتری‌های با کیفیت ژاپنی، عرضه‌شده به توزیع‌کنندگان و عمده‌فروشان از طریق Model Petrol.",
    motorOil: {
      kicker: "روغن موتور",
      title: "محدوده روانکار یوکوهاما",
      blurb:
        "روغن‌های تمام‌سنتتیک، نیمه‌سنتتیک و معدنی در یازده گروه کاربردی، مطابق با استانداردهای API، ACEA، ILSAC و JASO.",
      points: [
        "خودروهای سواری",
        "کامیون و اتوبوس",
        "گیربکس اتوماتیک",
        "گیربکس دستی",
        "ضدیخ و خنک‌کننده",
        "موتورسیکلت",
        "تراکتور و کشاورزی",
        "صنعتی",
        "گریس",
        "دریایی",
        "محصولات ویژه",
      ],
    },
    volt: {
      kicker: "باتری",
      title: "Yokohama VOLT",
      blurb:
        "باتری‌های استارتر برای روشن شدن در شرایط سخت و عمر طولانی، با سیستم درپوش بسته و قابلیت شارژ سریع.",
      points: [
        "قدرت استارت بالا",
        "ساختار مستحکم",
        "قابلیت شارژ سریع پیشرفته",
        "سیستم درپوش بسته ثبت‌شده",
        "طراحی ویژه شبکه با صفحات مثبت مقاوم",
      ],
    },
  },
  ar: {
    heroEyebrow: "موزعة من Model Petrol",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "مواد تشحيم وبطاريات بجودة يابانية، تُورَّد للموزعين وتجار الجملة عبر Model Petrol.",
    motorOil: {
      kicker: "زيوت المحركات",
      title: "مجموعة مواد التشحيم من يوكوهاما",
      blurb:
        "زيوت تخليقية بالكامل وشبه تخليقية ومعدنية ضمن إحدى عشرة مجموعة تطبيقية، تلبي مواصفات API وACEA وILSAC وJASO.",
      points: [
        "سيارات الركاب",
        "الشاحنات والحافلات",
        "ناقل الحركة الأوتوماتيكي",
        "ناقل الحركة الميكانيكي",
        "مضادات التجمد",
        "الدراجات النارية",
        "الجرارات والزراعة",
        "الصناعة",
        "الشحوم",
        "البحرية",
        "منتجات خاصة",
      ],
    },
    volt: {
      kicker: "البطاريات",
      title: "Yokohama VOLT",
      blurb:
        "بطاريات بدء تشغيل مصممة للتشغيل في الظروف الصعبة ولعمر خدمة طويل، بغطاء محكم الإغلاق وقدرة على الشحن السريع.",
      points: [
        "قدرة بدء تشغيل عالية",
        "بنية قوية",
        "قدرة شحن سريع متقدمة",
        "نظام غطاء مغلق حاصل على براءة اختراع",
        "تصميم شبكي خاص بألواح موجبة قوية",
      ],
    },
  },
  de: {
    heroEyebrow: "Vertrieben von Model Petrol",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "Schmierstoffe und Batterien in japanischer Qualität, über Model Petrol an Distributoren und Großhändler geliefert.",
    motorOil: {
      kicker: "Motorenöl",
      title: "Das Yokohama Schmierstoffsortiment",
      blurb:
        "Vollsynthetische, teilsynthetische und mineralische Öle in elf Anwendungsgruppen, nach API-, ACEA-, ILSAC- und JASO-Spezifikationen.",
      points: [
        "Pkw",
        "Lkw und Busse",
        "Automatikgetriebe",
        "Schaltgetriebe",
        "Frostschutzmittel",
        "Motorrad",
        "Traktoren und Landwirtschaft",
        "Industrie",
        "Fette",
        "Schifffahrt",
        "Spezialprodukte",
      ],
    },
    volt: {
      kicker: "Batterien",
      title: "Yokohama VOLT",
      blurb:
        "Starterbatterien für anspruchsvolle Startvorgänge und lange Lebensdauer, mit geschlossenem Deckelsystem und Schnellladefähigkeit.",
      points: [
        "Erhöhte Startleistung",
        "Robuste Bauweise",
        "Fortschrittliche Schnellladefähigkeit",
        "Patentiertes geschlossenes Deckelsystem",
        "Spezielles Gitterdesign mit starken Positivplatten",
      ],
    },
  },
  fr: {
    heroEyebrow: "Distribuée par Model Petrol",
    heroTitle: "Yokohama Motor Oil",
    heroSubtitle:
      "Des lubrifiants et batteries de qualité japonaise, fournis aux distributeurs et grossistes via Model Petrol.",
    motorOil: {
      kicker: "Huile moteur",
      title: "La gamme de lubrifiants Yokohama",
      blurb:
        "Huiles 100 % synthétiques, semi-synthétiques et minérales réparties en onze groupes d'application, conformes aux spécifications API, ACEA, ILSAC et JASO.",
      points: [
        "Véhicules de tourisme",
        "Poids lourds et autobus",
        "Transmission automatique",
        "Transmission mécanique",
        "Liquides de refroidissement",
        "Moto",
        "Tracteurs et agriculture",
        "Industrie",
        "Graisses",
        "Marine",
        "Produits spéciaux",
      ],
    },
    volt: {
      kicker: "Batteries",
      title: "Yokohama VOLT",
      blurb:
        "Batteries de démarrage conçues pour les démarrages exigeants et une longue durée de vie, avec couvercle scellé et charge rapide.",
      points: [
        "Puissance de démarrage renforcée",
        "Structure robuste",
        "Charge rapide avancée",
        "Système de couvercle fermé breveté",
        "Grille spéciale à plaques positives renforcées",
      ],
    },
  },
};

/** A product line: artwork, positioning copy, its application list and its catalogue. */
function LineCard({
  copy,
  image,
  imageClassName,
  href,
  downloadLabel,
}: {
  copy: LineCopy;
  image: string;
  imageClassName?: string;
  href: string;
  downloadLabel: string;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)]">
      <div className="relative h-52 overflow-hidden sm:h-64">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`h-full w-full object-cover ${imageClassName ?? ""}`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
          aria-hidden="true"
        />
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{copy.kicker}</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {copy.blurb}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {copy.points.map((point) => (
            <li
              key={point}
              className="rounded-md border border-border/70 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {point}
            </li>
          ))}
        </ul>
        <Button asChild variant="hero" className="mt-8 w-full sm:w-auto">
          <a href={href} target="_blank" rel="noreferrer">
            <Download />
            {downloadLabel}
          </a>
        </Button>
      </div>
    </article>
  );
}

export function yokohamaHead(locale: Locale) {
  return pageHead(locale, "yokohama", [{ property: "og:image", content: BRAND_IMAGES.yokohama }]);
}

export const Route = createFileRoute("/products/yokohama")({
  head: () => yokohamaHead("en"),
  component: Yokohama,
});

export function Yokohama() {
  const { locale, t } = useTranslation();
  const copy = yokohamaCopy[locale];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        subtitle={copy.heroSubtitle}
        backgroundImage={BRAND_IMAGES.yokohamaCover}
      />

      <div className="bg-background py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <LocaleLink
            to="/products"
            className="mb-8 inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
            {t.common.backToBrands}
          </LocaleLink>

          <div className="grid gap-6 lg:grid-cols-2">
            <LineCard
              copy={copy.motorOil}
              image={BRAND_IMAGES.yokohama}
              imageClassName="object-[center_70%]"
              href={YOKOHAMA_CATALOGS.motorOil}
              downloadLabel={t.hitech.downloadCatalog}
            />
            <LineCard
              copy={copy.volt}
              image={BRAND_IMAGES.yokohamaVolt}
              href={YOKOHAMA_CATALOGS.volt}
              downloadLabel={t.hitech.downloadCatalog}
            />
          </div>

          <section className="mt-14 rounded-xl border border-border bg-[image:var(--gradient-panel)] p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {t.quoteCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.quoteCta.body}
            </p>
            <Button asChild variant="hero" className="mt-8">
              <LocaleLink to="/contact">{t.quoteCta.requestWholesale}</LocaleLink>
            </Button>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
