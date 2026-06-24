export const ASSET_BASE = "/model-oils";

export const CONTACT = {
  email: "info@modelgrup.com",
  phone: "+90 533 456 7975",
  whatsapp: "https://wa.me/905334567975?text=Hello,%20I%27m%20interested%20in%20a%20Model%20Oils%20quote.",
  address: "Ucevler Mah. Izmir Yolu Cad. No: 241/334, Nilufer / Bursa, Turkiye",
  hours: "Mon-Fri: 09:00-18:00 (UTC+3)",
} as const;

import type { NavKey } from "./i18n/ui";

export const NAV_LINKS: { key: NavKey; to: string; highlight: boolean }[] = [
  { key: "hiTech", to: "/hi-tech", highlight: true },
  { key: "products", to: "/products", highlight: false },
  { key: "industries", to: "/industries", highlight: false },
  { key: "export", to: "/export", highlight: false },
  { key: "about", to: "/about", highlight: false },
  { key: "media", to: "/media", highlight: false },
  { key: "blog", to: "/blog", highlight: false },
  { key: "contact", to: "/contact", highlight: false },
];

export const PACKAGING = ["1L", "3L", "4L", "5L", "7L", "10.5L", "20L", "200L"];

// Translatable structured content (categories, products, export cards, trust points,
// industries, badges, markets) now lives in ./i18n/content.ts, keyed by locale.
// Types are re-exported here so existing imports keep working.
export type { Category, Product } from "./i18n/content";

export const CATALOG_BRANDS = [
  { name: "Shell",       slug: "Shell",       logo: `${ASSET_BASE}/brands/Shell.png` },
  { name: "Mobil",       slug: "Mobil",       logo: `${ASSET_BASE}/brands/mobil.png` },
  { name: "Motul",       slug: "Motul",       logo: `${ASSET_BASE}/brands/motul.jpg` },
  { name: "Texol",       slug: "Texol",       logo: `${ASSET_BASE}/brands/texol.jpg`, logoClassName: "max-h-16 max-w-[95%]" },
  { name: "Texaco",      slug: "Texaco",      logo: `${ASSET_BASE}/brands/texaco.png`, logoClassName: "max-h-16 max-w-[95%]" },
  { name: "Petrol Ofisi", slug: "PetrolOfisi", logo: `${ASSET_BASE}/brands/petrol-ofisi.png` },
];

export const MEDIA_HIGHLIGHTS = [
  { title: "Fair Presence", image: `${ASSET_BASE}/media/fuar/fuar-1.png` },
  { title: "Off-road Sponsorship", image: `${ASSET_BASE}/media/off-road/off-road-1.png` },
  { title: "Rally Activity", image: `${ASSET_BASE}/media/ralli/ralli-1.png` },
];
