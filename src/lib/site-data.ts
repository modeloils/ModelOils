export const ASSET_BASE = "/model-oils";

export const CONTACT = {
  legalName: "MODEL PETROL ÜRÜNLERİ OTOMOTİV SANAYİ TİCARET LİMİTED ŞİRKETİ",
  email: "info@modelgrup.com",
  phone: "+90 533 456 7975",
  whatsapp: "https://wa.me/905334567975?text=Hello,%20I%27m%20interested%20in%20a%20Model%20Oils%20quote.",
  address: "Ucevler Mah. Izmir Yolu Cad. No: 241/334, Nilufer / Bursa, Turkiye",
  hours: "Mon-Fri: 09:00-18:00 (UTC+3)",
  instagram: "https://www.instagram.com/modeloils/",
} as const;

import type { NavKey } from "./i18n/ui";

export const NAV_LINKS: { key: NavKey; to: string; highlight: boolean }[] = [
  { key: "products", to: "/products", highlight: true },
  { key: "catalogs", to: "/catalogs", highlight: false },
  { key: "industries", to: "/industries", highlight: false },
  { key: "export", to: "/export", highlight: false },
  { key: "about", to: "/about", highlight: false },
  { key: "media", to: "/media", highlight: false },
  { key: "blog", to: "/blog", highlight: false },
  { key: "contact", to: "/contact", highlight: false },
];

export const PACKAGING = ["1L", "3L", "4L", "5L", "7L", "10.5L", "20L", "200L"];

/** The owned HI-TECH catalogue, selected to match the visitor's language where available. */
export const HI_TECH_CATALOGS = {
  en: `${ASSET_BASE}/docs/hi-tech/hi-tech-final-catalogue-en.pdf`,
  tr: `${ASSET_BASE}/docs/hi-tech/hi-tech-final-catalogue-tr.pdf`,
  ru: `${ASSET_BASE}/docs/hi-tech/hi-tech-final-catalogue-ru.pdf`,
  fa: `${ASSET_BASE}/docs/hi-tech/hi-tech-final-catalogue-fa.pdf`,
} as const;

/** Yokohama catalogues, distributed by Model Petrol. One file per product line, not per language. */
export const YOKOHAMA_CATALOGS = {
  motorOil: `${ASSET_BASE}/docs/yokohama/yokohama-motor-oil-catalogue-en.pdf`,
  volt: `${ASSET_BASE}/docs/yokohama/yokohama-volt-battery-catalogue-en.pdf`,
} as const;

/**
 * Artwork for the two brand panels on /products. The Yokohama images are the
 * distributor catalogue's own key visual and cover, extracted from the supplied PDF.
 */
export const BRAND_IMAGES = {
  hiTech: `${ASSET_BASE}/images/HI-TECH-BG.png`,
  yokohama: `${ASSET_BASE}/brands/yokohama-range.jpg`,
  yokohamaCover: `${ASSET_BASE}/brands/yokohama-cover.jpg`,
  yokohamaVolt: `${ASSET_BASE}/brands/yokohama-volt.jpg`,
} as const;

// Translatable structured content (categories, products, export cards, trust points,
// industries, badges, markets) now lives in ./i18n/content.ts, keyed by locale.
// Types are re-exported here so existing imports keep working.
export type { Category, Product } from "./i18n/content";

export const MEDIA_HIGHLIGHTS = [
  { title: "Fair Presence", image: `${ASSET_BASE}/media/fuar/fuar-1.png` },
  { title: "Off-road Sponsorship", image: `${ASSET_BASE}/media/off-road/off-road-1.png` },
  { title: "Rally Activity", image: `${ASSET_BASE}/media/ralli/ralli-1.png` },
];
