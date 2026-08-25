import type { Locale } from "./i18n/types";

type CategoryNames = Record<Locale, string>;

interface YokohamaCategoryDefinition {
  slug: string;
  names: CategoryNames;
}

export const YOKOHAMA_CATEGORY_DEFINITIONS: YokohamaCategoryDefinition[] = [
  {
    slug: "Binek-Arac-Motor-Yaglari",
    names: {
      en: "Passenger Car Motor Oils",
      tr: "Binek Araç Motor Yağları",
      ru: "Моторные масла для легковых автомобилей",
      fa: "روغن موتور خودروهای سواری",
      ar: "زيوت محركات سيارات الركاب",
      de: "Pkw-Motorenöle",
      fr: "Huiles moteur pour voitures particulières",
    },
  },
  {
    slug: "Agir-Hizmet-Motor-Yaglari",
    names: {
      en: "Truck & Bus Oils",
      tr: "Kamyon ve Otobüs Yağları",
      ru: "Масла для грузовиков и автобусов",
      fa: "روغن کامیون و اتوبوس",
      ar: "زيوت الشاحنات والحافلات",
      de: "Lkw- und Busöle",
      fr: "Huiles pour camions et autobus",
    },
  },
  {
    slug: "Otomatik-Transmisyon-Yaglari",
    names: {
      en: "Automatic Transmission Fluids",
      tr: "Otomatik Şanzıman Yağları",
      ru: "Жидкости для автоматических трансмиссий",
      fa: "سیالات گیربکس اتوماتیک",
      ar: "سوائل ناقل الحركة الأوتوماتيكي",
      de: "Automatikgetriebeöle",
      fr: "Fluides de transmission automatique",
    },
  },
  {
    slug: "Disli-ve-Transmisyon-Yaglari",
    names: {
      en: "Mechanical Transmission Oils",
      tr: "Mekanik Şanzıman Yağları",
      ru: "Масла для механических трансмиссий",
      fa: "روغن‌های گیربکس دستی",
      ar: "زيوت ناقل الحركة اليدوي",
      de: "Schaltgetriebeöle",
      fr: "Huiles de transmission mécanique",
    },
  },
  {
    slug: "Antifrizler",
    names: {
      en: "Antifreeze Coolants",
      tr: "Antifriz ve Soğutucular",
      ru: "Антифризы и охлаждающие жидкости",
      fa: "ضدیخ و خنک‌کننده",
      ar: "مضادات التجمد وسوائل التبريد",
      de: "Frostschutz- und Kühlmittel",
      fr: "Antigels et liquides de refroidissement",
    },
  },
  {
    slug: "Motosiklet-Yaglari",
    names: {
      en: "Motorcycle Oils",
      tr: "Motosiklet Yağları",
      ru: "Мотоциклетные масла",
      fa: "روغن موتورسیکلت",
      ar: "زيوت الدراجات النارية",
      de: "Motorradöle",
      fr: "Huiles pour motos",
    },
  },
  {
    slug: "Traktor-ve-Tarim-Yaglari",
    names: {
      en: "Tractor & Agricultural Oils",
      tr: "Traktör ve Tarım Yağları",
      ru: "Масла для тракторов и сельхозтехники",
      fa: "روغن تراکتور و کشاورزی",
      ar: "زيوت الجرارات والزراعة",
      de: "Traktor- und Landwirtschaftsöle",
      fr: "Huiles pour tracteurs et agriculture",
    },
  },
  {
    slug: "Endustriyel-Yaglar",
    names: {
      en: "Industrial Oils",
      tr: "Endüstriyel Yağlar",
      ru: "Промышленные масла",
      fa: "روغن‌های صنعتی",
      ar: "الزيوت الصناعية",
      de: "Industrieöle",
      fr: "Huiles industrielles",
    },
  },
  {
    slug: "Gresler",
    names: {
      en: "Greases",
      tr: "Gresler",
      ru: "Смазки",
      fa: "گریس‌ها",
      ar: "الشحوم",
      de: "Schmierfette",
      fr: "Graisses",
    },
  },
  {
    slug: "Deniz-Yaglari",
    names: {
      en: "Marine Oils",
      tr: "Deniz Yağları",
      ru: "Судовые масла",
      fa: "روغن‌های دریایی",
      ar: "الزيوت البحرية",
      de: "Schiffsöle",
      fr: "Huiles marines",
    },
  },
  {
    slug: "Ozel-Urunler",
    names: {
      en: "Special Products",
      tr: "Özel Ürünler",
      ru: "Специальные продукты",
      fa: "محصولات ویژه",
      ar: "منتجات خاصة",
      de: "Spezialprodukte",
      fr: "Produits spéciaux",
    },
  },
  {
    slug: "Akuler",
    names: {
      en: "Batteries",
      tr: "Aküler",
      ru: "Аккумуляторы",
      fa: "باتری‌ها",
      ar: "البطاريات",
      de: "Batterien",
      fr: "Batteries",
    },
  },
];

export function getYokohamaCategoryName(slug: string, locale: Locale): string {
  const category = YOKOHAMA_CATEGORY_DEFINITIONS.find(
    (item) => item.slug === slug,
  );
  return category?.names[locale] ?? category?.names.en ?? slug;
}
