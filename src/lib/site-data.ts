export const ASSET_BASE = "/model-oils";

export const CONTACT = {
  legalName: "MODEL PETROL ÜRÜNLERİ OTOMOTİV SANAYİ TİCARET LİMİTED ŞİRKETİ",
  email: "info@modelgrup.com",
  emailDisplay: "info [at] modelgrup.com",
  phone: "+90 533 456 7975",
  whatsapp:
    "https://wa.me/905334567975?text=Hello,%20I%27m%20interested%20in%20a%20MODEL%20GRUP%20quote.",
  address: "Ucevler Mah. Izmir Yolu Cad. No: 241/334, Nilufer / Bursa, Turkiye",
  factoryAddress: "Yaylacık Mahallesi, Ferhan Sokak, A Blok No:20/1 Başiskele/Kocaeli - Türkiye",
  hours: "Mon-Fri: 09:00-18:00 (UTC+3)",
  instagram: "https://www.instagram.com/modelgrupofficial/",
} as const;

import type { NavKey } from "./i18n/ui";

export const NAV_LINKS: {
  key: NavKey;
  to: string;
  highlight: boolean;
  brand?: "YOKOHAMA";
}[] = [
  { key: "products", to: "/yokohama", highlight: true, brand: "YOKOHAMA" },
  { key: "catalogs", to: "/catalogs", highlight: false },
  { key: "industries", to: "/industries", highlight: false },
  { key: "export", to: "/export", highlight: false },
  { key: "about", to: "/about", highlight: false },
  { key: "blog", to: "/blog", highlight: false },
  { key: "contact", to: "/contact", highlight: false },
];

export const PACKAGING = ["1L", "3L", "4L", "5L", "7L", "10.5L", "20L", "200L"];

export const BRAND_IMAGES = {
  yokohama: `${ASSET_BASE}/brands/yokohama-range.jpg`,
  yokohamaBackground: `${ASSET_BASE}/brands/yokohama-page-bg.png`,
  yokohamaCover: `${ASSET_BASE}/brands/yokohama-cover.jpg`,
  yokohamaFactory: `${ASSET_BASE}/brands/yokohama-factory-hero.webp`,
  yokohamaVolt: `${ASSET_BASE}/brands/yokohama-volt.jpg`,
} as const;

export const YOKOHAMA_CATALOGS = {
  motorOil: `${ASSET_BASE}/docs/yokohama/yokohama-motor-oil-catalogue.pdf`,
  volt: `${ASSET_BASE}/docs/yokohama/yokohama-volt-battery-catalogue.pdf`,
} as const;
