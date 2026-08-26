export const ASSET_BASE = "/model-oils";

export const CONTACT = {
  legalName: "MODEL PETROL ÜRÜNLERİ OTOMOTİV SANAYİ TİCARET LİMİTED ŞİRKETİ",
  email: "info@modelgrup.com",
  phone: "+90 533 456 7975",
  whatsapp:
    "https://wa.me/905334567975?text=Hello,%20I%27m%20interested%20in%20a%20Model%20Oils%20quote.",
  address: "Ucevler Mah. Izmir Yolu Cad. No: 241/334, Nilufer / Bursa, Turkiye",
  hours: "Mon-Fri: 09:00-18:00 (UTC+3)",
  instagram: "https://www.instagram.com/modeloils/",
} as const;

import type { NavKey } from "./i18n/ui";

export const NAV_LINKS: {
  key: NavKey;
  to: string;
  highlight: boolean;
  brand?: "YOKOHAMA";
}[] = [
  { key: "products", to: "/yokohama", highlight: true, brand: "YOKOHAMA" },
  { key: "industries", to: "/industries", highlight: false },
  { key: "export", to: "/export", highlight: false },
  { key: "about", to: "/about", highlight: false },
  { key: "blog", to: "/blog", highlight: false },
  { key: "contact", to: "/contact", highlight: false },
];

export const PACKAGING = ["1L", "3L", "4L", "5L", "7L", "10.5L", "20L", "200L"];

/** Yokohama catalogues, distributed by Model Petrol. One file per product line, not per language. */
export const YOKOHAMA_CATALOGS = {
  motorOil: `${ASSET_BASE}/docs/yokohama/yokohama-motor-oil-catalogue-en.pdf`,
  volt: `${ASSET_BASE}/docs/yokohama/yokohama-volt-battery-catalogue-en.pdf`,
} as const;

export const BRAND_IMAGES = {
  yokohama: `${ASSET_BASE}/brands/yokohama-range.jpg`,
  yokohamaBackground: `${ASSET_BASE}/brands/yokohama-page-bg.png`,
  yokohamaCover: `${ASSET_BASE}/brands/yokohama-cover.jpg`,
  yokohamaVolt: `${ASSET_BASE}/brands/yokohama-volt.jpg`,
} as const;
