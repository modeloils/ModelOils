import { useTranslation, type Locale } from "@/lib/i18n";

export interface YokohamaLanding {
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

const YOKOHAMA_LANDING: Record<Locale, YokohamaLanding> = {
  en: {
    heroEyebrow: "Distributed Brand",
    heroTitle: "Yokohama — Japanese Quality, Supplied by MODEL GRUP",
    heroSubtitle:
      "Yokohama motor oils supplied to distributors and wholesalers through MODEL GRUP.",
    becomeDistributor: "Become a Yokohama Motor Oil Distributor",
    whyEyebrow: "Why Yokohama",
    whyTitle: "Japanese Engineering. Export-Ready Supply.",
    bullets: [
      "A complete motor oil family covering passenger, commercial, agricultural and marine use.",
      "Packaging from 1L bottles through to 200L drums for export volumes.",
      "Technical support and distributor cooperation from MODEL GRUP.",
      "Authorized Yokohama motor oil distribution for the Middle East and Europe.",
    ],
    rangeEyebrow: "Yokohama Range",
    rangeTitle: "Featured Yokohama Products",
  },
  tr: {
    heroEyebrow: "Dağıtım Markası",
    heroTitle: "Yokohama — Japon Kalitesi, MODEL GRUP Güvencesiyle",
    heroSubtitle:
      "Yokohama motor yağları, MODEL GRUP aracılığıyla distribütörlere ve toptancılara sunulur.",
    becomeDistributor: "Yokohama Motor Yağı Distribütörü Olun",
    whyEyebrow: "Neden Yokohama",
    whyTitle: "Japon Mühendisliği. İhracata Hazır Tedarik.",
    bullets: [
      "Binek, ticari, tarım ve denizcilik kullanımını kapsayan eksiksiz bir motor yağı ailesi.",
      "İhracat hacimleri için 1L şişeden 200L varile kadar ambalaj seçenekleri.",
      "MODEL GRUP teknik desteği ve distribütör iş birliği.",
      "Orta Doğu ve Avrupa için yetkili Yokohama motor yağı distribütörlüğü.",
    ],
    rangeEyebrow: "Yokohama Serisi",
    rangeTitle: "Öne Çıkan Yokohama Ürünleri",
  },
  ru: {
    heroEyebrow: "Дистрибьютируемый бренд",
    heroTitle: "Yokohama — японское качество от MODEL GRUP",
    heroSubtitle:
      "Моторные масла Yokohama поставляются дистрибьюторам и оптовикам через MODEL GRUP.",
    becomeDistributor: "Стать дистрибьютором моторных масел Yokohama",
    whyEyebrow: "Почему Yokohama",
    whyTitle: "Японская инженерия. Готовность к экспорту.",
    bullets: [
      "Полная линейка моторных масел для легкового, коммерческого, сельскохозяйственного и морского применения.",
      "Упаковка от 1-литровых канистр до 200-литровых бочек для экспортных объемов.",
      "Техническая поддержка и сотрудничество с дистрибьюторами от MODEL GRUP.",
      "Официальная дистрибуция моторных масел Yokohama на Ближнем Востоке и в Европе.",
    ],
    rangeEyebrow: "Линейка Yokohama",
    rangeTitle: "Избранные продукты Yokohama",
  },
  fa: {
    heroEyebrow: "برند توزیعی",
    heroTitle: "Yokohama — کیفیت ژاپنی با عرضه MODEL GRUP",
    heroSubtitle:
      "روغن موتورهای Yokohama از طریق MODEL GRUP به توزیع‌کنندگان و عمده‌فروشان عرضه می‌شوند.",
    becomeDistributor: "توزیع‌کننده روغن موتور Yokohama شوید",
    whyEyebrow: "چرا Yokohama",
    whyTitle: "مهندسی ژاپنی. آماده صادرات.",
    bullets: [
      "خانواده کامل روغن موتور برای خودروهای سواری، تجاری، کشاورزی و دریایی.",
      "بسته‌بندی از بطری ۱ لیتری تا بشکه ۲۰۰ لیتری برای حجم‌های صادراتی.",
      "پشتیبانی فنی و همکاری توزیع از طرف MODEL GRUP.",
      "توزیع رسمی روغن موتور Yokohama در خاورمیانه و اروپا.",
    ],
    rangeEyebrow: "مجموعه Yokohama",
    rangeTitle: "محصولات برگزیده Yokohama",
  },
  ar: {
    heroEyebrow: "علامة موزعة",
    heroTitle: "Yokohama — جودة يابانية بتوريد MODEL GRUP",
    heroSubtitle: "تُورّد زيوت محركات Yokohama إلى الموزعين وتجار الجملة عبر MODEL GRUP.",
    becomeDistributor: "كن موزعاً لزيوت محركات Yokohama",
    whyEyebrow: "لماذا Yokohama",
    whyTitle: "هندسة يابانية. جاهزية للتصدير.",
    bullets: [
      "مجموعة متكاملة من زيوت المحركات للاستخدام الخاص والتجاري والزراعي والبحري.",
      "عبوات من 1 لتر حتى براميل 200 لتر لأحجام التصدير.",
      "دعم فني وتعاون مع الموزعين من MODEL GRUP.",
      "توزيع معتمد لزيوت محركات Yokohama في الشرق الأوسط وأوروبا.",
    ],
    rangeEyebrow: "مجموعة Yokohama",
    rangeTitle: "منتجات Yokohama المميزة",
  },
  de: {
    heroEyebrow: "Vertriebsmarke",
    heroTitle: "Yokohama — japanische Qualität von MODEL GRUP",
    heroSubtitle:
      "Yokohama Motoröle werden über MODEL GRUP an Distributoren und Großhändler geliefert.",
    becomeDistributor: "Yokohama Motoröl-Distributor werden",
    whyEyebrow: "Warum Yokohama",
    whyTitle: "Japanische Technik. Exportbereite Versorgung.",
    bullets: [
      "Eine vollständige Motorölfamilie für Pkw, Nutzfahrzeuge, Landwirtschaft und Schifffahrt.",
      "Gebinde von der 1-L-Flasche bis zum 200-L-Fass für Exportmengen.",
      "Technische Unterstützung und Distributorbetreuung durch MODEL GRUP.",
      "Autorisierter Vertrieb von Yokohama Motorölen im Nahen Osten und in Europa.",
    ],
    rangeEyebrow: "Yokohama Sortiment",
    rangeTitle: "Ausgewählte Yokohama Produkte",
  },
  fr: {
    heroEyebrow: "Marque distribuée",
    heroTitle: "Yokohama — la qualité japonaise fournie par MODEL GRUP",
    heroSubtitle:
      "Les huiles moteur Yokohama sont fournies aux distributeurs et grossistes par MODEL GRUP.",
    becomeDistributor: "Devenir distributeur d'huiles moteur Yokohama",
    whyEyebrow: "Pourquoi Yokohama",
    whyTitle: "Ingénierie japonaise. Prêt pour l'export.",
    bullets: [
      "Une gamme complète d'huiles moteur pour le tourisme, le transport, l'agriculture et la marine.",
      "Des conditionnements du bidon de 1 L au fût de 200 L pour les volumes export.",
      "Assistance technique et accompagnement des distributeurs par MODEL GRUP.",
      "Distribution agréée des huiles moteur Yokohama au Moyen-Orient et en Europe.",
    ],
    rangeEyebrow: "Gamme Yokohama",
    rangeTitle: "Produits Yokohama en vedette",
  },
};

export function useYokohamaLanding(): YokohamaLanding {
  const { locale } = useTranslation();
  return YOKOHAMA_LANDING[locale];
}
