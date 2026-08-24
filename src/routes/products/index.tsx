import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/SiteLayout";
import { BRAND_IMAGES } from "@/lib/site-data";
import { LocaleLink, pageHead, useTranslation, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BrandCopy {
  /** Brand names are wordmarks and stay in Latin script across every locale. */
  name: string;
  kicker: string;
  blurb: string;
  cta: string;
}

interface ChooserCopy {
  title: string;
  subtitle: string;
  hiTech: BrandCopy;
  yokohama: BrandCopy;
}

const chooserCopy: Record<Locale, ChooserCopy> = {
  en: {
    title: "Oil Products",
    subtitle: "Two lubricant brands, one supplier. Choose a range to explore.",
    hiTech: {
      name: "HI-TECH",
      kicker: "Our own brand",
      blurb:
        "Model Petrol's flagship lubricant range — motor, diesel, transmission, hydraulic and industrial oils, greases and antifreeze.",
      cta: "Explore HI-TECH",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "Japanese quality · Distributed by Model Petrol",
      blurb:
        "Yokohama Motor Oil and VOLT batteries — passenger car, truck, transmission, motorcycle, agricultural, industrial and marine lubricants.",
      cta: "Explore Yokohama",
    },
  },
  tr: {
    title: "Yağ Ürünleri",
    subtitle: "Tek tedarikçiden iki yağ markası. Keşfetmek istediğiniz seriyi seçin.",
    hiTech: {
      name: "HI-TECH",
      kicker: "Kendi markamız",
      blurb:
        "Model Petrol'ün amiral gemisi yağ serisi — motor, dizel, şanzıman, hidrolik ve endüstriyel yağlar, gresler ve antifriz.",
      cta: "HI-TECH'i keşfedin",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "Japon kalitesi · Model Petrol dağıtımıyla",
      blurb:
        "Yokohama motor yağları ve VOLT aküleri — binek, ticari araç, şanzıman, motosiklet, tarım, endüstri ve denizcilik yağları.",
      cta: "Yokohama'yı keşfedin",
    },
  },
  ru: {
    title: "Масляная продукция",
    subtitle: "Два бренда смазочных материалов от одного поставщика. Выберите линейку.",
    hiTech: {
      name: "HI-TECH",
      kicker: "Собственный бренд",
      blurb:
        "Флагманская линейка смазочных материалов Model Petrol — моторные, дизельные, трансмиссионные, гидравлические и индустриальные масла, смазки и антифриз.",
      cta: "Открыть HI-TECH",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "Японское качество · Поставляется Model Petrol",
      blurb:
        "Моторные масла Yokohama и аккумуляторы VOLT — для легковых автомобилей, грузовиков, трансмиссий, мотоциклов, сельского хозяйства, промышленности и судоходства.",
      cta: "Открыть Yokohama",
    },
  },
  fa: {
    title: "محصولات روغن",
    subtitle: "دو برند روانکار از یک تأمین‌کننده. محدوده مورد نظر خود را انتخاب کنید.",
    hiTech: {
      name: "HI-TECH",
      kicker: "برند اختصاصی ما",
      blurb:
        "محدوده پرچم‌دار روانکار Model Petrol — روغن موتور، دیزل، گیربکس، هیدرولیک و صنعتی، گریس و ضدیخ.",
      cta: "کاوش HI-TECH",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "کیفیت ژاپنی · توزیع توسط Model Petrol",
      blurb:
        "روغن موتور یوکوهاما و باتری‌های VOLT — سواری، کامیون، گیربکس، موتورسیکلت، کشاورزی، صنعتی و دریایی.",
      cta: "کاوش یوکوهاما",
    },
  },
  ar: {
    title: "منتجات الزيوت",
    subtitle: "علامتان تجاريتان للمواد التشحيمية من مورد واحد. اختر المجموعة التي تريد استكشافها.",
    hiTech: {
      name: "HI-TECH",
      kicker: "علامتنا الخاصة",
      blurb:
        "مجموعة المواد التشحيمية الرائدة من Model Petrol — زيوت المحركات والديزل وناقل الحركة والهيدروليك والصناعية والشحوم ومضادات التجمد.",
      cta: "استكشف HI-TECH",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "جودة يابانية · موزعة من Model Petrol",
      blurb:
        "زيوت محركات يوكوهاما وبطاريات VOLT — لسيارات الركاب والشاحنات وناقلات الحركة والدراجات النارية والزراعة والصناعة والبحرية.",
      cta: "استكشف يوكوهاما",
    },
  },
  de: {
    title: "Ölprodukte",
    subtitle: "Zwei Schmierstoffmarken, ein Lieferant. Wählen Sie ein Sortiment.",
    hiTech: {
      name: "HI-TECH",
      kicker: "Unsere Eigenmarke",
      blurb:
        "Das Flaggschiff-Schmierstoffsortiment von Model Petrol — Motoren-, Diesel-, Getriebe-, Hydraulik- und Industrieöle, Fette und Frostschutzmittel.",
      cta: "HI-TECH entdecken",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "Japanische Qualität · Vertrieben von Model Petrol",
      blurb:
        "Yokohama Motorenöle und VOLT-Batterien — für Pkw, Lkw, Getriebe, Motorräder, Landwirtschaft, Industrie und Schifffahrt.",
      cta: "Yokohama entdecken",
    },
  },
  fr: {
    title: "Produits lubrifiants",
    subtitle: "Deux marques de lubrifiants, un seul fournisseur. Choisissez une gamme.",
    hiTech: {
      name: "HI-TECH",
      kicker: "Notre marque propre",
      blurb:
        "La gamme phare de lubrifiants de Model Petrol — huiles moteur, diesel, de transmission, hydrauliques et industrielles, graisses et antigel.",
      cta: "Découvrir HI-TECH",
    },
    yokohama: {
      name: "YOKOHAMA",
      kicker: "Qualité japonaise · Distribuée par Model Petrol",
      blurb:
        "Huiles moteur Yokohama et batteries VOLT — tourisme, poids lourds, transmissions, motos, agriculture, industrie et marine.",
      cta: "Découvrir Yokohama",
    },
  },
};

/**
 * One of the two brand panels. On desktop the panels share the row evenly and the
 * hovered one takes extra flex space, easing the other back; on small screens they
 * simply stack. All motion is behind `motion-safe`.
 */
function BrandPanel({
  to,
  image,
  imageClassName,
  copy,
}: {
  to: string;
  image: string;
  imageClassName?: string;
  copy: BrandCopy;
}) {
  return (
    <LocaleLink
      to={to}
      className="group relative flex h-[380px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-[flex-grow,border-color] duration-500 ease-out hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-[440px] lg:h-[560px] lg:flex-1 lg:motion-safe:hover:grow-[1.4]"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105",
          imageClassName,
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background from-38% via-background/60 via-72% to-background/5 transition-colors duration-500 group-hover:via-background/45"
        aria-hidden="true"
      />
      <div className="relative mt-auto w-full p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{copy.kicker}</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {copy.name}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          {copy.blurb}
        </p>
        <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-foreground">
          {copy.cta}
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out rtl:rotate-180 motion-safe:group-hover:translate-x-1 rtl:motion-safe:group-hover:-translate-x-1" />
        </span>
      </div>
    </LocaleLink>
  );
}

export function productsHead(locale: Locale) {
  return pageHead(locale, "products", [{ property: "og:image", content: BRAND_IMAGES.yokohama }]);
}

export const Route = createFileRoute("/products/")({
  head: () => productsHead("en"),
  component: Products,
});

export function Products() {
  const { locale } = useTranslation();
  const copy = chooserCopy[locale];

  return (
    <SiteLayout>
      <PageHero compact eyebrow="MODEL PETROL" title={copy.title} subtitle={copy.subtitle} />
      <div className="bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
            <BrandPanel
              to="/products/hi-tech"
              image={BRAND_IMAGES.hiTech}
              // The refinery photograph is a night scene; lift it so the panel carries the
              // same visual weight as the brightly lit Yokohama artwork beside it.
              imageClassName="brightness-[1.45] saturate-[1.1]"
              copy={copy.hiTech}
            />
            <BrandPanel
              to="/products/yokohama"
              image={BRAND_IMAGES.yokohama}
              // The catalogue key visual is portrait; bias the crop down onto the bottle lineup
              // so the artwork's own logo does not collide with the panel heading.
              imageClassName="object-[center_80%]"
              copy={copy.yokohama}
            />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
