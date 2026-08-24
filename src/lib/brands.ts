import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { BRAND_IMAGES } from "@/lib/site-data";

/**
 * The two lubricant brands presented under /products. Both ranges are rendered by the
 * same components; only the copy, artwork and link base differ.
 */
export type BrandKey = "hi-tech" | "yokohama";

export interface BrandLanding {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  becomeDistributor: string;
  whyEyebrow: string;
  whyTitle: string;
  bullets: string[];
  rangeEyebrow: string;
  rangeTitle: string;
}

const YOKOHAMA_LANDING: Record<Locale, BrandLanding> = {
  en: {
    heroEyebrow: "Distributed Brand",
    heroTitle: "Yokohama — Japanese Quality, Supplied by Model Petrol",
    heroSubtitle:
      "Japanese-quality lubricants and batteries, supplied to distributors and wholesalers through Model Petrol.",
    becomeDistributor: "Become a Yokohama Distributor",
    whyEyebrow: "Why Yokohama",
    whyTitle: "Japanese Engineering. Export-Ready Supply.",
    bullets: [
      "A complete motor oil family covering passenger, commercial, agricultural and marine use.",
      "Packaging from 1L bottles through to 200L drums for export volumes.",
      "Backed by Model Petrol's technical support and distributor cooperation.",
      "Supplied alongside Yokohama VOLT batteries from a single source.",
    ],
    rangeEyebrow: "Yokohama Range",
    rangeTitle: "Featured Yokohama Products",
  },
  tr: {
    heroEyebrow: "Dağıtım Markası",
    heroTitle: "Yokohama — Japon Kalitesi, Model Petrol Güvencesiyle",
    heroSubtitle:
      "Model Petrol aracılığıyla distribütörlere ve toptancılara sunulan Japon kalitesinde yağlar ve aküler.",
    becomeDistributor: "Yokohama Distribütörü Olun",
    whyEyebrow: "Neden Yokohama",
    whyTitle: "Japon Mühendisliği. İhracata Hazır Tedarik.",
    bullets: [
      "Binek, ticari, tarım ve denizcilik kullanımını kapsayan eksiksiz bir motor yağı ailesi.",
      "İhracat hacimleri için 1L şişeden 200L varile kadar ambalaj seçenekleri.",
      "Model Petrol'ün teknik desteği ve distribütör iş birliğiyle desteklenir.",
      "Yokohama VOLT aküleriyle birlikte tek kaynaktan tedarik edilir.",
    ],
    rangeEyebrow: "Yokohama Serisi",
    rangeTitle: "Öne Çıkan Yokohama Ürünleri",
  },
  ru: {
    heroEyebrow: "Дистрибутируемый бренд",
    heroTitle: "Yokohama — японское качество от Model Petrol",
    heroSubtitle:
      "Смазочные материалы и аккумуляторы японского качества, поставляемые дистрибьюторам и оптовикам через Model Petrol.",
    becomeDistributor: "Стать дистрибьютором Yokohama",
    whyEyebrow: "Почему Yokohama",
    whyTitle: "Японская инженерия. Готовность к экспорту.",
    bullets: [
      "Полная линейка моторных масел для легкового, коммерческого, сельскохозяйственного и морского применения.",
      "Упаковка от 1 л до 200 л для экспортных объёмов.",
      "Техническая поддержка и дистрибьюторское сотрудничество от Model Petrol.",
      "Поставляется вместе с аккумуляторами Yokohama VOLT из одного источника.",
    ],
    rangeEyebrow: "Линейка Yokohama",
    rangeTitle: "Избранные продукты Yokohama",
  },
  fa: {
    heroEyebrow: "برند توزیعی",
    heroTitle: "یوکوهاما — کیفیت ژاپنی با Model Petrol",
    heroSubtitle:
      "روانکارها و باتری‌های با کیفیت ژاپنی، عرضه‌شده به توزیع‌کنندگان و عمده‌فروشان از طریق Model Petrol.",
    becomeDistributor: "نماینده یوکوهاما شوید",
    whyEyebrow: "چرا یوکوهاما",
    whyTitle: "مهندسی ژاپنی. آماده صادرات.",
    bullets: [
      "خانواده کامل روغن موتور برای کاربردهای سواری، تجاری، کشاورزی و دریایی.",
      "بسته‌بندی از بطری ۱ لیتری تا بشکه ۲۰۰ لیتری برای حجم‌های صادراتی.",
      "با پشتیبانی فنی و همکاری توزیع Model Petrol.",
      "همراه با باتری‌های Yokohama VOLT از یک منبع واحد عرضه می‌شود.",
    ],
    rangeEyebrow: "محدوده یوکوهاما",
    rangeTitle: "محصولات برجسته یوکوهاما",
  },
  ar: {
    heroEyebrow: "علامة موزعة",
    heroTitle: "يوكوهاما — جودة يابانية عبر Model Petrol",
    heroSubtitle:
      "مواد تشحيم وبطاريات بجودة يابانية، تُورَّد للموزعين وتجار الجملة عبر Model Petrol.",
    becomeDistributor: "كن موزعاً ليوكوهاما",
    whyEyebrow: "لماذا يوكوهاما",
    whyTitle: "هندسة يابانية. جاهزية للتصدير.",
    bullets: [
      "عائلة متكاملة من زيوت المحركات تغطي الاستخدام الخاص والتجاري والزراعي والبحري.",
      "تغليف من عبوة 1 لتر حتى برميل 200 لتر لأحجام التصدير.",
      "مدعومة بالدعم الفني والتعاون التوزيعي من Model Petrol.",
      "تُورَّد إلى جانب بطاريات Yokohama VOLT من مصدر واحد.",
    ],
    rangeEyebrow: "مجموعة يوكوهاما",
    rangeTitle: "منتجات يوكوهاما المميزة",
  },
  de: {
    heroEyebrow: "Vertriebsmarke",
    heroTitle: "Yokohama — japanische Qualität von Model Petrol",
    heroSubtitle:
      "Schmierstoffe und Batterien in japanischer Qualität, über Model Petrol an Distributoren und Großhändler geliefert.",
    becomeDistributor: "Yokohama-Distributor werden",
    whyEyebrow: "Warum Yokohama",
    whyTitle: "Japanische Technik. Exportbereite Versorgung.",
    bullets: [
      "Eine vollständige Motorenölfamilie für Pkw, Nutzfahrzeuge, Landwirtschaft und Schifffahrt.",
      "Gebinde von der 1-L-Flasche bis zum 200-L-Fass für Exportmengen.",
      "Unterstützt durch technische Beratung und Distributorbetreuung von Model Petrol.",
      "Wird gemeinsam mit Yokohama VOLT Batterien aus einer Hand geliefert.",
    ],
    rangeEyebrow: "Yokohama Sortiment",
    rangeTitle: "Ausgewählte Yokohama Produkte",
  },
  fr: {
    heroEyebrow: "Marque distribuée",
    heroTitle: "Yokohama — la qualité japonaise par Model Petrol",
    heroSubtitle:
      "Des lubrifiants et batteries de qualité japonaise, fournis aux distributeurs et grossistes via Model Petrol.",
    becomeDistributor: "Devenir distributeur Yokohama",
    whyEyebrow: "Pourquoi Yokohama",
    whyTitle: "Ingénierie japonaise. Prêt pour l'export.",
    bullets: [
      "Une gamme complète d'huiles moteur pour le tourisme, le transport, l'agriculture et la marine.",
      "Des conditionnements du bidon de 1 L au fût de 200 L pour les volumes export.",
      "Soutenue par le support technique et l'accompagnement distributeur de Model Petrol.",
      "Fournie avec les batteries Yokohama VOLT depuis une source unique.",
    ],
    rangeEyebrow: "Gamme Yokohama",
    rangeTitle: "Produits Yokohama en vedette",
  },
};

/** Which brand the current URL sits under, plus the base path its links should use. */
export function useBrand(): { key: BrandKey; base: string } {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const key: BrandKey = pathname.includes("/products/yokohama") ? "yokohama" : "hi-tech";
  return { key, base: `/products/${key}` };
}

/** Landing-page copy for the active brand, in the active locale. */
export function useBrandLanding(): BrandLanding {
  const { key } = useBrand();
  const { t, locale } = useTranslation();

  if (key === "yokohama") return YOKOHAMA_LANDING[locale];

  return {
    heroEyebrow: t.hitech.heroEyebrow,
    heroTitle: t.hitech.heroTitle,
    heroSubtitle: t.hitech.heroSubtitle,
    becomeDistributor: t.hitech.becomeDistributor,
    whyEyebrow: t.hitech.whyEyebrow,
    whyTitle: t.hitech.whyTitle,
    bullets: t.hitech.bullets,
    rangeEyebrow: t.hitech.rangeEyebrow,
    rangeTitle: t.hitech.rangeTitle,
  };
}

/**
 * Backdrop and feature artwork for the active brand's range page.
 *
 * Both brands share the refinery backdrop: it reads as industrial atmosphere rather than
 * branding, and the Yokohama catalogue artwork carries baked-in logo text plus white page
 * margins, which scale into visible fragments behind a full-bleed layout. Brand identity
 * comes from the feature image instead.
 */
export function useBrandArtwork(hiTechBackdrop: string, hiTechFeature: string) {
  const { key } = useBrand();
  if (key === "yokohama") {
    return { backdrop: hiTechBackdrop, feature: BRAND_IMAGES.yokohama };
  }
  return { backdrop: hiTechBackdrop, feature: hiTechFeature };
}
