import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations,
  setRequestLocale} from "next-intl/server";
import { ArrowLeft, ArrowRight, FlaskConical, Truck, Droplets } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BRANDS: Record<string, { name: string; logo: string }> = {
  castrol: { name: "Castrol",     logo: "/brands/castrol.jpg" },
  texaco:  { name: "Texaco",      logo: "/brands/texaco.png"  },
  texol:   { name: "Texol",       logo: "/brands/texol.jpg"   },
  shell:   { name: "Shell",       logo: "/brands/Shell.png"   },
  total:   { name: "Elf / Total", logo: "/brands/total.png"   },
  motul:   { name: "Motul",       logo: "/brands/motul.jpg"   },
  mobil:          { name: "Mobil",        logo: "/brands/mobil.png"        },
  "petrol-ofisi": { name: "Petrol Ofisi", logo: "/brands/petrol-ofisi.png" },
};

const CATEGORIES: Record<string, {
  label: string;
  description: string;
  icon: "truck" | "flask" | "droplets";
  products: string[];
}> = {
  "motor-yaglari": {
    label: "Motor Yağları",
    description: "Otomotiv, ağır hizmet ve binek araçlar için motor yağları",
    icon: "truck",
    products: [
      "SAE 5W-30 Tam Sentetik", "SAE 15W-40 Ağır Hizmet", "SAE 20W-50 Mineral",
      "SAE 10W-40 Yarı Sentetik", "SAE 0W-20 Tam Sentetik", "SAE 5W-40 Tam Sentetik",
      "SAE 0W-30 Tam Sentetik", "SAE 10W-30 Mineral", "SAE 15W-50 Yarı Sentetik",
    ],
  },
  "mineral-yaglar": {
    label: "Mineral Yağlar",
    description: "Beyaz mineral yağlar, proses yağları ve özel uygulamalar",
    icon: "droplets",
    products: [
      "Beyaz Mineral Yağ 15 cSt", "Beyaz Mineral Yağ 35 cSt", "Beyaz Mineral Yağ 70 cSt",
      "Proses Yağı — Aromatik", "Proses Yağı — Naftenik", "Trafo Yağı (IEC 60296)",
      "Kauçuk Proses Yağı", "Tekstil Yağı", "Soğutma Yağı",
    ],
  },
  "endustriyel-yaglar": {
    label: "Endüstriyel Yağlar",
    description: "Endüstriyel ve ticari uygulamalar için yağlayıcılar",
    icon: "flask",
    products: [
      "ISO VG 46 Hidrolik Yağ", "ISO VG 68 Hidrolik Yağ", "ISO VG 100 Hidrolik Yağ",
      "Dişli Yağı GL-5 SAE 90", "Dişli Yağı GL-4 SAE 80W-90", "Kompresör Yağı 100",
      "Kompresör Yağı 46", "Gres Yağı EP2", "Metal İşleme Sıvısı",
    ],
  },
  "antifriz": {
    label: "Antifriz",
    description: "Motor soğutma sistemleri için antifriz ve soğutma sıvıları",
    icon: "droplets",
    products: [
      "Antifriz -25°C", "Antifriz -40°C", "Uzun Ömürlü Antifriz OAT", "Organik Antifriz HOAT",
      "Motor Soğutma Sıvısı Konsantre", "Hazır Karışım Antifriz 50/50",
    ],
  },
  "sanziman-disli-yaglari": {
    label: "Şanzıman Dişli Yağları",
    description: "Manuel ve otomatik şanzımanlar, diferansiyel ve akslar için yağlar",
    icon: "flask",
    products: [
      "ATF Otomatik Şanzıman Yağı", "Manuel Şanzıman Yağı MTF", "Diferansiyel Yağı GL-5 SAE 90",
      "Diferansiyel Yağı GL-5 75W-90", "Transfer Kutusu Yağı", "CVT Vites Yağı",
      "DSG / DCT Şanzıman Yağı",
    ],
  },
  "gres-yaglari": {
    label: "Gres Yağları",
    description: "Rulmanlar, şasi ve endüstriyel uygulamalar için gres yağları",
    icon: "flask",
    products: [
      "Çok Amaçlı Gres EP2", "Lityum Bazlı Gres EP2", "Molibdenli Gres EP2",
      "Yüksek Sıcaklık Gresi", "Su Dirençli Gres", "Biyobozunur Gres",
      "Gres EP0 Yarı Akışkan",
    ],
  },
  "motosiklet-tekne-yaglari": {
    label: "Motosiklet ve Tekne Yağları",
    description: "Motosikletler, dıştan takma motorlar ve deniz motorları için özel yağlar",
    icon: "truck",
    products: [
      "4T Motosiklet Yağı 10W-40", "4T Motosiklet Yağı 20W-50", "4T Motosiklet Yağı 15W-50",
      "2T Karışım Yağı", "Denizel Motor Yağı 4T", "Dıştan Takma Motor Yağı",
      "Motosiklet Dişli Yağı",
    ],
  },
};

// Card background colors per brand
const BRAND_CARD_COLORS: Record<string, {
  primary: string; secondary: string; accent: string; accentText: string;
}> = {
  shell:   { primary: "#DD1D21", secondary: "#9b1015", accent: "#FBCE07", accentText: "#9b1015" },
  mobil:   { primary: "#003DA5", secondary: "#001a5c", accent: "#CC0000",  accentText: "#ffffff" },
  castrol: { primary: "#007A37", secondary: "#004d22", accent: "#E31837",  accentText: "#ffffff" },
  total:   { primary: "#EE1C25", secondary: "#aa1019", accent: "#FFD100",  accentText: "#aa1019" },
  motul:   { primary: "#1a1a1a", secondary: "#000000", accent: "#E8192C",  accentText: "#ffffff" },
  texol:   { primary: "#0052A1", secondary: "#002d6b", accent: "#7EC8E3",  accentText: "#002d6b" },
  texaco:         { primary: "#CC0000", secondary: "#880000", accent: "#ffffff",  accentText: "#CC0000" },
  "petrol-ofisi": { primary: "#CC2229", secondary: "#8c0f13", accent: "#ffffff",  accentText: "#CC2229" },
};

// Strips any known brand prefix then slugifies
function toSlug(name: string) {
  return name
    .replace(/^(Shell|Mobil|Castrol|Total|Elf|Motul|Texol|Texaco|Petrol Ofisi)\s+/i, "")
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Extracts series + grade from a product name
function parseProductName(name: string): { series: string; grade: string } {
  const withoutBrand = name.replace(/^(Shell|Mobil|Castrol|Total|Elf|Motul|Texol|Texaco)\s+/i, "");
  // SAE multi-grade (e.g. 5W-30)
  const saeMatch = withoutBrand.match(/\d+W-\d+$/);
  if (saeMatch) {
    return { grade: saeMatch[0], series: withoutBrand.slice(0, withoutBrand.length - saeMatch[0].length).trim() };
  }
  // ISO VG / monograde (trailing standalone number, e.g. 46, 220)
  const isoMatch = withoutBrand.match(/\s(\d+)$/);
  if (isoMatch) {
    return { grade: isoMatch[1] ?? "", series: withoutBrand.slice(0, withoutBrand.length - isoMatch[0]!.length).trim() };
  }
  return { series: withoutBrand, grade: "" };
}

// Brand-specific product lists
const BRAND_OVERRIDES: Record<string, string[]> = {
  /* ── SHELL ─────────────────────────────────────────────────────── */
  "shell:motor-yaglari": [
    "Shell Helix Ultra SP 0W-20",
    "Shell Helix Ultra ECT C2-C3 0W-30",
    "Shell Helix Ultra Pro AF 5W-30", "Shell Helix Ultra Pro AG 5W-30",
    "Shell Helix Ultra Pro AR-L 5W-30", "Shell Helix Ultra Pro AM-L 5W-30",
    "Shell Helix Ultra Pro AP-L 5W-30",
    "Shell Helix Ultra ECT Multi 5W-30",
    "Shell Helix Ultra 5W-40",
    "Shell Helix HX8 5W-30", "Shell Helix HX8 5W-40",
    "Shell Helix HX7 10W-40",
    "Shell Helix HX6 10W-40",
    "Shell Helix HX3 20W-50",
    "Shell Rimula R6 LME 5W-30",
    "Shell Rimula R6 M 10W-40", "Shell Rimula R6 LM 10W-40",
    "Shell Rimula R5 E 10W-40",
    "Shell Rimula R4 X 15W-40", "Shell Rimula R4 L 15W-40",
    "Shell Rimula R3+ 10W", "Shell Rimula R3+ 30", "Shell Rimula R3+ 40",
    "Shell Rimula R3 50",
    "Shell Rimula R2 Extra 15W-40",
    "Shell Spirax S6 TXME",
  ],
  "shell:endustriyel-yaglar": [
    "Shell Tellus S2 M 32", "Shell Tellus S2 M 46", "Shell Tellus S2 M 68", "Shell Tellus S2 M 100",
    "Shell Tellus S2 V 15", "Shell Tellus S2 V 22", "Shell Tellus S2 V 32", "Shell Tellus S2 V 46", "Shell Tellus S2 V 68", "Shell Tellus S2 V 100",
    "Shell Tellus S3 M 32", "Shell Tellus S3 M 46", "Shell Tellus S3 M 68", "Shell Tellus S3 M 100",
    "Shell Tellus S4 ME 32", "Shell Tellus S4 ME 46",
    "Shell Tellus S4 VX 32",
    "Shell Morlina S2 BL 5", "Shell Morlina S2 BL 10", "Shell Morlina S2 BL 22",
    "Shell Morlina S2 B 46", "Shell Morlina S2 B 68", "Shell Morlina S2 B 100", "Shell Morlina S2 B 150", "Shell Morlina S2 B 220", "Shell Morlina S2 B 320",
    "Shell Corena S2 P 68", "Shell Corena S2 P 100", "Shell Corena S2 P 150",
    "Shell Corena S3 R 46", "Shell Corena S3 R 68",
    "Shell Corena S4 R 46", "Shell Corena S4 R 68",
    "Shell Refrigeration Oil S4 FR-F 32", "Shell Refrigeration Oil S4 FR-F 68", "Shell Refrigeration Oil S4 FR-F 100",
    "Shell Refrigeration Oil S4 FR-V 32", "Shell Refrigeration Oil S4 FR-V 46", "Shell Refrigeration Oil S4 FR-V 68",
    "Shell Tonna S3 M 68", "Shell Tonna S3 M 220",
    "Shell Turbo T 32", "Shell Turbo T 46", "Shell Turbo T 68",
    "Shell Turbo CC 32", "Shell Turbo CC 46",
    "Shell Turbo S5 DR 46", "Shell Turbo J 32",
    "Shell Diala S4 ZX-I",
    "Shell Heat Transfer Oil S2",
    "Shell Naturelle HF-E",
    "Shell Tequla V 32",
    "Shell Textile Needle S2 M 32",
    "Shell Air Tool S2 A 100",
    "Shell Edelex 956",
    "Shell Catenex S 321",
    "Shell Ondina X 415", "Shell Ondina X 432", "Shell Ondina X 420",
    "Shell Ensis Engine Oil 30", "Shell Ensis DW 2462",
    "Shell Irus Fluid C",
  ],

  /* ── MOBIL ──────────────────────────────────────────────────────── */
  "mobil:motor-yaglari": [
    "Mobil 1 ESP X2 0W-20", "Mobil Super 3000 X1 5W-40",
  
    "Mobil 1 Extended Life 10W-60",
    "Mobil 1 FS New Life 0W-40",
    "Mobil 1 ESP Formula 5W-30",
    "Mobil 1 ESP 5W-30 Dexos2",
    "Mobil 1 FS 5W-50",
    "Mobil 1 ESP X3 0W-40",
    "Mobil Super 3000 Formula FE 5W-30",
    "Mobil Super 3000 XE 5W-30 C3",
    "Mobil Super 2000 X1 Diesel 10W-40",
    "Mobil Delvac XHP Ultra LE 5W-30",
    "Mobil Delvac 1 5W-40",
    "Mobil Delvac XHP LE 10W-40",
    "Mobil Delvac XHP Extra 10W-40",
    "Mobil Delvac XHP ESP 10W-40",
    "Mobil Delvac MX ESP 15W-40",
    "Mobil Delvac LCV F 5W-30",
    "Mobil Delvac MX 15W-40",
    "Mobil Delvac MX ESP 10W-30",
    "Mobil Delvac XHP 15W-40",
    "Mobil Delvac Super 20W-50",
    "Mobil Delvac 1350",
    "Mobil Delvac 1340",
    "Mobil Delvac 1330",
    "Mobil Delvac Super 1000 20W-50",
    "Mobil Delvac CT Diesel 10W-30",
  ],
  "mobil:endustriyel-yaglar": [
    "Mobil Almo Oil 525",
    "Mobil Velocite Oil No 4",
    "Mobil Velocite Oil No 10",
    "Mobil Almo Oil 527",
    "Mobil Met 763",
    "Mobil Met 766",
    "Mobil Met 424",
    "Mobil DTE 27",
    "Mobil DTE 24",
    "Mobil DTE 10 Excel 32",
    "Mobil DTE 26",
    "Mobil DTE 25",
    "Mobil DTE 10 Excel 100",
    "Mobil DTE 10 Excel 46",
    "Mobil DTE 10 Excel 68",
    "Mobil Vactra Oil No 1",
    "Mobil Vactra Oil No 4",
    "Mobil Vactra Oil No 2",
    "Mobil Therm 605",
    "Mobil Jet Oil 2",
    "Mobil DTE Oil Heavy Medium",
    "Mobil DTE Oil Heavy",
    "Mobil DTE Oil Light",
    "Mobil Rarus 424",
    "Mobil Gargoyle Arctic 300",
    "Mobil Gargoyle Arctic SHC 226E",
    "Mobil EAL Arctic 68",
    "Mobil EAL Arctic 32",
    "Mobil Rarus 427",
    "Mobil Rarus 425",
    "Mobil Rarus SHC 1026",
    "Mobil Rarus SHC 1025",
    "Mobil EAL Arctic 46",
    "Mobil Socony Oven Conveyer Lubricant",
    "Mobil Vacuoline 546",
    "Mobil Vacuoline 537",
    "Mobil Vacuoline 533",
    "Mobil Vacuoline 528",
    "Mobil Vacuoline 525",
    "Mobil Velocite Oil No 6",
    "Mobil Velocite Oil No 3",
    "Mobil Met 762",
    "Mobil Arma 798",
    "Mobil Nuto H 46",
    "Mobil DTE 22",
    "Mobil Delvac Hydraulic 10W",
    "Mobil DTE Oil Medium",
    "Mobil DTE 797",
    "Mobil DTE 846",
    "Mobil DTE 832",
    "Mobil SHC Rarus 68",
    "Mobil SHC Rarus 46",
    "Mobil SHC Rarus 32",
    "Mobil Gargoyle Arctic 155",
    "Mobil Gargoyle Arctics SHC 230",
    "Mobil EAL Arctic 100",
    "Mobil Rarus 429",
    "Mobil Rarus 426",
    "Mobil Rarus SHC 1024",
    "Mobil Nuto H 68",
    "Mobil DTE 21",
    "Mobil EAL Arctic 22",
    "Mobil Somentor AH 70",
    "Mobil Aero HF",
    "Mobil Aero HFA",
    "Mobil Met 427",
    "Mobil DTE 10 Excel 15",
    "Mobil Pyrotec HFC 46",
    "Mobil ECT 44",
    "Mobil Prosol NT 70",
    "Mobil Cut 250",
    "Mobil Cut 240",
    "Mobil Cut 230",
    "Mobil Cut 210",
    "Mobil Cut 140",
    "Mobil Cut 100",
    "Exxon Hyjet V",
    "Exxon Hyjet IV A Plus",
    "Mobil Jet Oil 254",
    "Mobil DTE 746",
    "Mobil DTE 732",
    "Mobil Gargoyle Arctic SHC NH 68",
    "Mobil Rarus 829",
    "Mobil Rarus 827",
  ],

  /* ── CASTROL ────────────────────────────────────────────────────── */
  "castrol:motor-yaglari": [
    "Castrol EDGE 0W-20", "Castrol EDGE 0W-30", "Castrol EDGE 5W-30",
    "Castrol EDGE 5W-40", "Castrol EDGE 0W-40", "Castrol EDGE 10W-60",
    "Castrol Magnatec 5W-30", "Castrol Magnatec 5W-40", "Castrol Magnatec 10W-40",
    "Castrol GTX 15W-40", "Castrol GTX 20W-50",
    "Castrol Vecton 15W-40", "Castrol Vecton Long Drain 10W-40",
  ],
  "castrol:endustriyel-yaglar": [
    "Castrol Hyspin AWS 32", "Castrol Hyspin AWS 46",
    "Castrol Hyspin AWS 68", "Castrol Hyspin AWS 100",
    "Castrol Optigear BM 100", "Castrol Optigear BM 220",
    "Castrol Tribol 1100/220",
    "Castrol Aircol SN 46",
    "Castrol Molub-Alloy 860/220-2 EL",
  ],

  /* ── TOTAL / ELF ────────────────────────────────────────────────── */
  "total:motor-yaglari": [
    "Total Quartz 9000 Energy 5W-30", "Total Quartz 9000 Energy 5W-40",
    "Total Quartz 9000 Energy 0W-40", "Total Quartz 9000 Future NFC 5W-30",
    "Total Quartz 9000 Future EcoB 5W-20",
    "Total Quartz INEO ECS 5W-30",
    "Total Quartz 7000 10W-40", "Total Quartz 5000 15W-40",
    "Total Rubia TIR 8600 15W-40", "Total Rubia TIR 9200 5W-30",
    "Elf Evolution 900 SXR 5W-30", "Elf Evolution 900 FT 5W-40",
    "Elf Turbo Diesel 15W-40",
  ],
  "total:endustriyel-yaglar": [
    "Total Azolla ZS 32", "Total Azolla ZS 46", "Total Azolla ZS 68", "Total Azolla ZS 100",
    "Total Carter EP 220", "Total Carter EP 320",
    "Total Planetelf ACD 46",
    "Total Multis EP 2",
    "Total Biohydran TMP 46",
  ],

  /* ── MOTUL ──────────────────────────────────────────────────────── */
  "motul:motor-yaglari": [
    "Motul 8100 X-clean EFE 5W-20", "Motul 8100 X-clean+ 5W-30",
    "Motul 8100 X-cess Gen2 5W-40", "Motul 8100 Eco-nergy 0W-30",
    "Motul 8100 Eco-lite 0W-20",
    "Motul 300V Competition 5W-40", "Motul 300V High RPM 0W-20",
    "Motul 300V Le Mans 20W-60",
    "Motul Specific BMW LL-04 5W-30", "Motul Specific VW 508.00 0W-20",
    "Motul Truck and Bus 15W-40",
    "Motul 5100 Ester 10W-40",
  ],
  "motul:endustriyel-yaglar": [
    "Motul Gear 300 LS 75W-90", "Motul Gear 300 75W-90",
    "Motul ATF VI", "Motul Multi DCTF",
    "Motul Hydraulic SUS 46", "Motul Hydraulic SUS 68",
    "Motul Coolant Ultra -37",
    "Motul Inugel G13 Ultra",
  ],

  /* ── TEXOL ──────────────────────────────────────────────────────── */
  "texol:motor-yaglari": [
    "Texol Premium 5W-30", "Texol Premium 5W-40",
    "Texol Ultra 10W-40", "Texol Supreme 15W-40",
    "Texol Supreme 20W-50", "Texol Diesel Extra 15W-40",
    "Texol Long Life 5W-30", "Texol Heavy Duty 20W-50",
    "Texol Syntech 0W-30", "Texol Mineral 15W-40",
  ],
  "texol:endustriyel-yaglar": [
    "Texol Hydraulic 32", "Texol Hydraulic 46", "Texol Hydraulic 68",
    "Texol Gear Oil 220", "Texol Gear Oil 320",
    "Texol Compressor 46",
    "Texol Grease EP 2",
    "Texol Slideway 68",
  ],

  /* ── PETROL OFİSİ ──────────────────────────────────────────────── */
  "petrol-ofisi:motor-yaglari": [
    "Petrol Ofisi Maxima CX 0W-20 Plus", "Petrol Ofisi Maxima CX 0W-30 Plus", "Petrol Ofisi Maxima CX 5W-30 Plus",
    "Petrol Ofisi Maxima Hybrid 0W-20", "Petrol Ofisi Maxima Hybrid Tech 0W-20",
    "Petrol Ofisi Maxima LL 5W-30", "Petrol Ofisi Maxima VSA 0W-20",
    "Petrol Ofisi Maxima K 0W-20", "Petrol Ofisi Maxima 0W-20", "Petrol Ofisi Maxima 0W-30",
    "Petrol Ofisi Maximus LA 5W-30", "Petrol Ofisi Maximus LA 10W-40",
    "Petrol Ofisi Maximus HD-E 5W-30", "Petrol Ofisi Maximus HD-M 5W-30", "Petrol Ofisi Maximus M 5W-30",
    "Petrol Ofisi Maximus HD 15W-40", "Petrol Ofisi Maximus HD 10W-40",
    "Petrol Ofisi Maximus HD-E 10W-40", "Petrol Ofisi Maximus 10W-40",
    "Petrol Ofisi Maximus Turbo Diesel Extra 15W-40",
  ],
  "petrol-ofisi:endustriyel-yaglar": [
    "Petrol Ofisi Hydro Oil HD 32", "Petrol Ofisi Hydro Oil HD 46",
    "Petrol Ofisi Hydro Oil HD 68", "Petrol Ofisi Hydro Oil HD 100",
    "Petrol Ofisi Hydro Tech HVI 32", "Petrol Ofisi Hydro Tech HVI 46", "Petrol Ofisi Hydro Tech HVI 68",
    "Petrol Ofisi Gravis M 220", "Petrol Ofisi Gravis M 320", "Petrol Ofisi Gravis M 460",
    "Petrol Ofisi Gravis MP 150", "Petrol Ofisi Gravis MP 220", "Petrol Ofisi Gravis MP 320",
    "Petrol Ofisi Compressor Oil XT 46", "Petrol Ofisi Compressor Oil XT 68",
    "Petrol Ofisi Compressor Oil SP 46", "Petrol Ofisi Compressor Oil SP 68",
    "Petrol Ofisi Turbine Oil TX 46",
    "Petrol Ofisi Super Gres EP 2", "Petrol Ofisi Molibdenli Gres 2",
  ],

  /* ── TEXACO ─────────────────────────────────────────────────────── */
  "texaco:motor-yaglari": [
    "Texaco Havoline ProDS 5W-30", "Texaco Havoline ProDS 5W-40",
    "Texaco Havoline Extra 10W-40", "Texaco Havoline Motor Oil 20W-50",
    "Texaco Havoline Synthetic 5W-30", "Texaco Havoline DX5 5W-30",
    "Texaco Ursa Premium TDX 15W-40", "Texaco Ursa Super Plus 10W-40",
    "Texaco Ursa TDX 10W-30",
    "Texaco Delo 400 MGX 15W-40", "Texaco Delo 400 XSP 5W-40",
    "Texaco Havoline 0W-20",
  ],
  "texaco:endustriyel-yaglar": [
    "Texaco Meropa XL 220", "Texaco Meropa XL 320", "Texaco Meropa XL 460",
    "Texaco Rando HDZ 32", "Texaco Rando HDZ 46", "Texaco Rando HDZ 68",
    "Texaco Cetus PAO 46",
    "Texaco Multifak EP 2",
    "Texaco Novatex GP 2",
  ],

  /* ── NEW CATEGORIES — brand-specific overrides can be added here later ── */
  /* All brands fall back to the generic CATEGORIES products above for now   */
};

interface CardColors { primary: string; secondary: string; accent: string; accentText: string }

const PRODUCT_IMAGES: Record<string, string> = {
  "shell:helix-ultra-sp-0w-20":        "/images/products/shell/helix-ultra-sp-0w-20.jpg",
  "shell:helix-ultra-ect-c2-c3-0w-30": "/images/products/shell/helix-ultra-ect-c2-c3-0w-30.jpg",
  "shell:helix-ultra-pro-af-5w-30":    "/images/products/shell/helix-ultra-pro-af-5w-30.jpg",
  "shell:helix-ultra-pro-ag-5w-30":    "/images/products/shell/helix-ultra-pro-ag-5w-30.jpg",
  "shell:helix-ultra-pro-ar-l-5w-30":  "/images/products/shell/helix-ultra-pro-ar-l-5w-30.jpg",
  "shell:helix-ultra-pro-am-l-5w-30":  "/images/products/shell/helix-ultra-pro-am-l-5w-30.jpg",
  "shell:helix-ultra-pro-ap-l-5w-30":  "/images/products/shell/helix-ultra-pro-ap-l-5w-30.png",
  "shell:helix-ultra-ect-multi-5w-30": "/images/products/shell/helix-ultra-ect-multi-5w-30.jpg",
  "shell:helix-ultra-5w-40":           "/images/products/shell/helix-ultra-5w-40.jpg",
  "shell:helix-hx8-5w-30":             "/images/products/shell/helix-hx8-5w-30.jpg",
  "shell:helix-hx8-5w-40":             "/images/products/shell/helix-hx8-5w-40.jpg",
  "shell:helix-hx7-10w-40":            "/images/products/shell/helix-hx7-10w-40.jpg",
  "shell:helix-hx6-10w-40":            "/images/products/shell/helix-hx6-10w-40.jpg",
  "shell:helix-hx3-20w-50":            "/images/products/shell/helix-hx3-20w-50.jpg",
  "shell:rimula-r6-lme-5w-30":         "/images/products/shell/rimula-r6-lme-5w-30.jpg",
  "shell:rimula-r6-m-10w-40":          "/images/products/shell/rimula-r6-m-10w-40.png",
  "shell:rimula-r6-lm-10w-40":         "/images/products/shell/rimula-r6-lm-10w-40.png",
  "shell:rimula-r5-e-10w-40":          "/images/products/shell/rimula-r5-e-10w-40.png",
  "shell:rimula-r4-x-15w-40":          "/images/products/shell/rimula-r4-x-15w-40.jpg",
  "shell:rimula-r4-l-15w-40":          "/images/products/shell/rimula-r4-l-15w-40.png",
  "shell:rimula-r3plus-10w":           "/images/products/shell/rimula-r3plus-10w.jpg",
  "shell:rimula-r3plus-30":            "/images/products/shell/rimula-r3plus-30.jpg",
  "shell:rimula-r3plus-40":            "/images/products/shell/rimula-r3plus-40.jpg",
  "shell:rimula-r3-50":                "/images/products/shell/rimula-r3-50.jpg",
  "shell:rimula-r2-extra-15w-40":      "/images/products/shell/rimula-r2-extra-15w-40.jpg",
  "shell:spirax-s6-txme":              "/images/products/shell/spirax-s6-txme.jpg",
  // Industrial
  "shell:tellus-s2-m-32":              "/images/products/shell/tellus-s2-m-32.jpg",
  "shell:tellus-s2-m-46":              "/images/products/shell/tellus-s2-m-46.jpg",
  "shell:tellus-s2-m-68":              "/images/products/shell/tellus-s2-m-68.jpg",
  "shell:tellus-s2-m-100":             "/images/products/shell/tellus-s2-m-100.jpg",
  "shell:tellus-s2-v-15":              "/images/products/shell/tellus-s2-v-15.jpg",
  "shell:tellus-s2-v-22":              "/images/products/shell/tellus-s2-v-22.jpg",
  "shell:tellus-s2-v-32":              "/images/products/shell/tellus-s2-v-32.jpg",
  "shell:tellus-s2-v-46":              "/images/products/shell/tellus-s2-v-46.jpg",
  "shell:tellus-s2-v-68":              "/images/products/shell/tellus-s2-v-68.jpg",
  "shell:tellus-s2-v-100":             "/images/products/shell/tellus-s2-v-100.jpg",
  "shell:tellus-s3-m-32":              "/images/products/shell/tellus-s3-m-32.jpg",
  "shell:tellus-s3-m-46":              "/images/products/shell/tellus-s3-m-46.jpg",
  "shell:tellus-s3-m-68":              "/images/products/shell/tellus-s3-m-68.jpg",
  "shell:tellus-s3-m-100":             "/images/products/shell/tellus-s3-m-100.jpg",
  "shell:tellus-s4-me-32":             "/images/products/shell/tellus-s4-me-32.jpg",
  "shell:tellus-s4-me-46":             "/images/products/shell/tellus-s4-me-46.jpg",
  "shell:tellus-s4-vx-32":             "/images/products/shell/tellus-s4-vx-32.jpg",
  "shell:morlina-s2-bl-5":             "/images/products/shell/morlina-s2-bl-5.jpg",
  "shell:morlina-s2-bl-10":            "/images/products/shell/morlina-s2-bl-10.jpg",
  "shell:morlina-s2-bl-22":            "/images/products/shell/morlina-s2-bl-22.jpg",
  "shell:morlina-s2-b-46":             "/images/products/shell/morlina-s2-b-46.jpg",
  "shell:morlina-s2-b-68":             "/images/products/shell/morlina-s2-b-68.jpg",
  "shell:morlina-s2-b-100":            "/images/products/shell/morlina-s2-b-100.jpg",
  "shell:morlina-s2-b-150":            "/images/products/shell/morlina-s2-b-150.jpg",
  "shell:morlina-s2-b-220":            "/images/products/shell/morlina-s2-b-220.jpg",
  "shell:morlina-s2-b-320":            "/images/products/shell/morlina-s2-b-320.jpg",
  "shell:corena-s2-p-68":              "/images/products/shell/corena-s2-p-68.jpg",
  "shell:corena-s2-p-100":             "/images/products/shell/corena-s2-p-100.jpg",
  "shell:corena-s2-p-150":             "/images/products/shell/corena-s2-p-150.jpg",
  "shell:corena-s3-r-46":              "/images/products/shell/corena-s3-r-46.jpg",
  "shell:corena-s3-r-68":              "/images/products/shell/corena-s3-r-68.jpg",
  "shell:corena-s4-r-46":              "/images/products/shell/corena-s4-r-46.png",
  "shell:corena-s4-r-68":              "/images/products/shell/corena-s4-r-68.png",
  "shell:refrigeration-s4-fr-f-32":        "/images/products/shell/refrigeration-s4-fr-f-32.jpg",
  "shell:refrigeration-oil-s4-fr-f-32":    "/images/products/shell/refrigeration-s4-fr-f-32.jpg",
  "shell:refrigeration-s4-fr-f-68":        "/images/products/shell/refrigeration-s4-fr-f-68.jpg",
  "shell:refrigeration-oil-s4-fr-f-68":    "/images/products/shell/refrigeration-s4-fr-f-68.jpg",
  "shell:refrigeration-s4-fr-f-100":       "/images/products/shell/refrigeration-s4-fr-f-100.jpg",
  "shell:refrigeration-oil-s4-fr-f-100":   "/images/products/shell/refrigeration-s4-fr-f-100.jpg",
  "shell:refrigeration-s4-fr-v-32":        "/images/products/shell/refrigeration-s4-fr-v-32.jpg",
  "shell:refrigeration-oil-s4-fr-v-32":    "/images/products/shell/refrigeration-s4-fr-v-32.jpg",
  "shell:refrigeration-s4-fr-v-46":        "/images/products/shell/refrigeration-s4-fr-v-46.jpg",
  "shell:refrigeration-oil-s4-fr-v-46":    "/images/products/shell/refrigeration-s4-fr-v-46.jpg",
  "shell:refrigeration-s4-fr-v-68":        "/images/products/shell/refrigeration-s4-fr-v-68.jpg",
  "shell:refrigeration-oil-s4-fr-v-68":    "/images/products/shell/refrigeration-s4-fr-v-68.jpg",
  "shell:tonna-s3-m-68":               "/images/products/shell/tonna-s3-m-68.jpg",
  "shell:tonna-s3-m-220":              "/images/products/shell/tonna-s3-m-220.jpg",
  "shell:turbo-t-32":                  "/images/products/shell/turbo-t-32.jpg",
  "shell:turbo-t-46":                  "/images/products/shell/turbo-t-46.jpg",
  "shell:turbo-t-68":                  "/images/products/shell/turbo-t-68.jpg",
  "shell:turbo-cc-32":                 "/images/products/shell/turbo-cc-32.jpg",
  "shell:turbo-cc-46":                 "/images/products/shell/turbo-cc-46.jpg",
  "shell:turbo-fluid-dr-46":           "/images/products/shell/turbo-fluid-dr-46.jpg",
  "shell:turbo-s5-dr-46":             "/images/products/shell/turbo-fluid-dr-46.jpg",
  "shell:turbo-j-32":                  "/images/products/shell/turbo-j-32.jpg",
  "shell:diala-s4-zx-i":               "/images/products/shell/diala-s4-zx-i.jpg",
  "shell:heat-transfer-oil-s2":        "/images/products/shell/heat-transfer-oil-s2.jpg",
  "shell:naturelle-hf-e":              "/images/products/shell/naturelle-hf-e.jpg",
  "shell:tequla-v-32":                 "/images/products/shell/tequla-v-32.jpg",
  "shell:textile-needle-s2-m-32":      "/images/products/shell/textile-needle-s2-m-32.jpg",
  "shell:air-tool-s2-a-100":           "/images/products/shell/air-tool-s2-a-100.jpg",
  "shell:edelex-956":                  "/images/products/shell/edelex-956.jpg",
  "shell:catenex-s-321":               "/images/products/shell/catenex-s-321.jpg",
  "shell:ondina-x-415":                "/images/products/shell/ondina-x-415.jpg",
  "shell:ondina-x-432":                "/images/products/shell/ondina-x-432.jpg",
  "shell:ondina-x-420":                "/images/products/shell/ondina-x-420.jpg",
  "shell:ensis-engine-oil-30":         "/images/products/shell/ensis-engine-oil-30.jpg",
  "shell:ensis-dw-2462":               "/images/products/shell/ensis-dw-2462.jpg",
  "shell:irus-fluid-c":                "/images/products/shell/irus-fluid-c.jpg",
  // Mobil
  "mobil:1-esp-5w-30-dexos2": "/images/products/mobil/1-esp-5w-30-dexos2.jpg",
  "mobil:1-esp-formula-5w-30": "/images/products/mobil/1-esp-formula-5w-30.jpg",
  "mobil:1-esp-x2-0w-20": "/images/products/mobil/1-esp-x2-0w-20.jpg",
  "mobil:1-esp-x3-0w-40": "/images/products/mobil/1-esp-x3-0w-40.jpg",
  "mobil:1-extended-life-10w-60": "/images/products/mobil/1-extended-life-10w-60.jpg",
  "mobil:1-fs-5w-50": "/images/products/mobil/1-fs-5w-50.jpg",
  "mobil:1-fs-new-life-0w-40": "/images/products/mobil/1-fs-new-life-0w-40.jpg",
  "mobil:delvac-1-5w-40": "/images/products/mobil/delvac-1-5w-40.jpg",
  "mobil:delvac-1330": "/images/products/mobil/delvac-1330.jpg",
  "mobil:delvac-1340": "/images/products/mobil/delvac-1340.jpg",
  "mobil:delvac-1350": "/images/products/mobil/delvac-1350.jpg",
  "mobil:delvac-ct-diesel-10w-30": "/images/products/mobil/delvac-ct-diesel-10w-30.jpg",
  "mobil:delvac-lcv-f-5w-30": "/images/products/mobil/delvac-lcv-f-5w-30.jpg",
  "mobil:delvac-mx-15w-40": "/images/products/mobil/delvac-mx-15w-40.png",
  "mobil:delvac-mx-esp-10w-30": "/images/products/mobil/delvac-mx-esp-10w-30.jpg",
  "mobil:delvac-mx-esp-15w-40": "/images/products/mobil/delvac-mx-esp-15w-40.jpg",
  "mobil:delvac-super-1000-20w-50": "/images/products/mobil/delvac-super-1000-20w-50.jpg",
  "mobil:delvac-super-20w-50": "/images/products/mobil/delvac-super-20w-50.png",
  "mobil:delvac-xhp-15w-40": "/images/products/mobil/delvac-xhp-15w-40.jpg",
  "mobil:delvac-xhp-esp-10w-40": "/images/products/mobil/delvac-xhp-esp-10w-40.png",
  "mobil:delvac-xhp-extra-10w-40": "/images/products/mobil/delvac-xhp-extra-10w-40.png",
  "mobil:delvac-xhp-le-10w-40": "/images/products/mobil/delvac-xhp-le-10w-40.jpg",
  "mobil:delvac-xhp-ultra-le-5w-30": "/images/products/mobil/delvac-xhp-ultra-le-5w-30.jpg",
  "mobil:super-2000-x1-diesel-10w-40": "/images/products/mobil/super-2000-x1-diesel-10w-40.jpg",
  "mobil:super-3000-formula-fe-5w-30": "/images/products/mobil/super-3000-formula-fe-5w-30.jpg",
  "mobil:super-3000-x1-5w-40": "/images/products/mobil/super-3000-x1-5w-40.png",
  "mobil:super-3000-xe-5w-30-c3": "/images/products/mobil/super-3000-xe-5w-30-c3.jpg",
  // Mobil Industrial Oils
  "mobil:almo-oil-525": "/images/products/mobil/almo-oil-525.jpg",
  "mobil:velocite-oil-no-4": "/images/products/mobil/velocite-oil-no-4.jpg",
  "mobil:velocite-oil-no-10": "/images/products/mobil/velocite-oil-no-10.jpg",
  "mobil:almo-oil-527": "/images/products/mobil/almo-oil-527.jpg",
  "mobil:met-763": "/images/products/mobil/met-763.jpg",
  "mobil:met-766": "/images/products/mobil/met-766.jpg",
  "mobil:met-424": "/images/products/mobil/met-424.jpg",
  "mobil:dte-27": "/images/products/mobil/dte-27.jpg",
  "mobil:dte-24": "/images/products/mobil/dte-24.jpg",
  "mobil:dte-10-excel-32": "/images/products/mobil/dte-10-excel-32.jpg",
  "mobil:dte-26": "/images/products/mobil/dte-26.jpg",
  "mobil:dte-25": "/images/products/mobil/dte-25.jpg",
  "mobil:dte-10-excel-100": "/images/products/mobil/dte-10-excel-100.jpg",
  "mobil:dte-10-excel-46": "/images/products/mobil/dte-10-excel-46.jpg",
  "mobil:dte-10-excel-68": "/images/products/mobil/dte-10-excel-68.jpg",
  "mobil:vactra-oil-no-1": "/images/products/mobil/vactra-oil-no-1.jpg",
  "mobil:vactra-oil-no-4": "/images/products/mobil/vactra-oil-no-4.jpg",
  "mobil:vactra-oil-no-2": "/images/products/mobil/vactra-oil-no-2.jpg",
  "mobil:therm-605": "/images/products/mobil/therm-605.jpg",
  "mobil:jet-oil-2": "/images/products/mobil/jet-oil-2.jpg",
  "mobil:dte-oil-heavy-medium": "/images/products/mobil/dte-oil-heavy-medium.jpg",
  "mobil:dte-oil-heavy": "/images/products/mobil/dte-oil-heavy.jpg",
  "mobil:dte-oil-light": "/images/products/mobil/dte-oil-light.jpg",
  "mobil:rarus-424": "/images/products/mobil/rarus-424.jpg",
  "mobil:gargoyle-arctic-300": "/images/products/mobil/gargoyle-arctic-300.jpg",
  "mobil:gargoyle-arctic-shc-226e": "/images/products/mobil/gargoyle-arctic-shc-226e.jpg",
  "mobil:eal-arctic-68": "/images/products/mobil/eal-arctic-68.jpg",
  "mobil:eal-arctic-32": "/images/products/mobil/eal-arctic-32.jpg",
  "mobil:rarus-427": "/images/products/mobil/rarus-427.jpg",
  "mobil:rarus-425": "/images/products/mobil/rarus-425.jpg",
  "mobil:rarus-shc-1026": "/images/products/mobil/rarus-shc-1026.jpg",
  "mobil:rarus-shc-1025": "/images/products/mobil/rarus-shc-1025.jpg",
  "mobil:eal-arctic-46": "/images/products/mobil/eal-arctic-46.jpg",
  "mobil:socony-oven-conveyer-lubricant": "/images/products/mobil/socony-oven-conveyer-lubricant.jpg",
  "mobil:vacuoline-546": "/images/products/mobil/vacuoline-546.jpg",
  "mobil:vacuoline-537": "/images/products/mobil/vacuoline-537.jpg",
  "mobil:vacuoline-533": "/images/products/mobil/vacuoline-533.jpg",
  "mobil:vacuoline-528": "/images/products/mobil/vacuoline-528.jpg",
  "mobil:vacuoline-525": "/images/products/mobil/vacuoline-525.jpg",
  "mobil:velocite-oil-no-6": "/images/products/mobil/velocite-oil-no-6.jpg",
  "mobil:velocite-oil-no-3": "/images/products/mobil/velocite-oil-no-3.jpg",
  "mobil:met-762": "/images/products/mobil/met-762.jpg",
  "mobil:arma-798": "/images/products/mobil/arma-798.jpg",
  "mobil:nuto-h-46": "/images/products/mobil/nuto-h-46.jpg",
  "mobil:dte-22": "/images/products/mobil/dte-22.jpg",
  "mobil:delvac-hydraulic-10w": "/images/products/mobil/delvac-hydraulic-10w.jpg",
  "mobil:dte-oil-medium": "/images/products/mobil/dte-oil-medium.jpg",
  "mobil:dte-797": "/images/products/mobil/dte-797.jpg",
  "mobil:dte-846": "/images/products/mobil/dte-846.jpg",
  "mobil:dte-832": "/images/products/mobil/dte-832.jpg",
  "mobil:shc-rarus-68": "/images/products/mobil/shc-rarus-68.jpg",
  "mobil:shc-rarus-46": "/images/products/mobil/shc-rarus-46.jpg",
  "mobil:shc-rarus-32": "/images/products/mobil/shc-rarus-32.jpg",
  "mobil:gargoyle-arctic-155": "/images/products/mobil/gargoyle-arctic-155.jpg",
  "mobil:gargoyle-arctics-shc-230": "/images/products/mobil/gargoyle-arctic-shc-230.jpg",
  "mobil:gargoyle-arctic-shc-230": "/images/products/mobil/gargoyle-arctic-shc-230.jpg",
  "mobil:eal-arctic-100": "/images/products/mobil/eal-arctic-100.jpg",
  "mobil:rarus-429": "/images/products/mobil/rarus-429.jpg",
  "mobil:rarus-426": "/images/products/mobil/rarus-426.jpg",
  "mobil:rarus-shc-1024": "/images/products/mobil/rarus-shc-1024.jpg",
  "mobil:nuto-h-68": "/images/products/mobil/nuto-h-68.jpg",
  "mobil:dte-21": "/images/products/mobil/dte-21.jpg",
  "mobil:eal-arctic-22": "/images/products/mobil/eal-arctic-22.jpg",
  "mobil:somentor-ah-70": "/images/products/mobil/somentor-ah-70.jpg",
  "mobil:aero-hf": "/images/products/mobil/aero-hf.jpg",
  "mobil:aero-hfa": "/images/products/mobil/aero-hfa.jpg",
  "mobil:met-427": "/images/products/mobil/met-427.jpg",
  "mobil:dte-10-excel-15": "/images/products/mobil/dte-10-excel-15.jpg",
  "mobil:pyrotec-hfc-46": "/images/products/mobil/pyrotec-hfc-46.jpg",
  "mobil:ect-44": "/images/products/mobil/ect-44.jpg",
  "mobil:prosol-nt-70": "/images/products/mobil/prosol-nt-70.jpg",
  "mobil:cut-250": "/images/products/mobil/cut-250.jpg",
  "mobil:cut-240": "/images/products/mobil/cut-240.jpg",
  "mobil:cut-230": "/images/products/mobil/cut-230.jpg",
  "mobil:cut-210": "/images/products/mobil/cut-210.jpg",
  "mobil:cut-140": "/images/products/mobil/cut-140.jpg",
  "mobil:cut-100": "/images/products/mobil/cut-100.jpg",
  "mobil:exxon-hyjet-v": "/images/products/mobil/exxon-hyjet-v.jpg",
  "mobil:exxon-hyjet-iv-a-plus": "/images/products/mobil/exxon-hyjet-iv-a-plus.jpg",
  "mobil:jet-oil-254": "/images/products/mobil/jet-oil-254.jpg",
  "mobil:dte-746": "/images/products/mobil/dte-746.jpg",
  "mobil:dte-732": "/images/products/mobil/dte-732.jpg",
  "mobil:gargoyle-arctic-shc-nh-68": "/images/products/mobil/gargoyle-arctic-shc-nh-68.jpg",
  "mobil:rarus-829": "/images/products/mobil/rarus-829.jpg",
  "mobil:rarus-827": "/images/products/mobil/rarus-827.jpg",
};

function getProductImage(brandSlug: string, productSlug: string): string | null {
  return PRODUCT_IMAGES[`${brandSlug}:${productSlug}`] ?? null;
}

function BrandedProductCard({
  name, categorySlug, brandSlug, colors,
}: { name: string; categorySlug: string; brandSlug: string; colors: CardColors }) {
  const { series, grade } = parseProductName(name);
  const productSlug = toSlug(name);
  const imageSrc = getProductImage(brandSlug, productSlug);

  return (
    <Link
      href={`/brands/${brandSlug}/${categorySlug}/${productSlug}`}
      className="rounded-[var(--radius-card)] overflow-hidden border hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-200 flex flex-col"
      style={{ borderColor: colors.primary + "40" }}
    >
      {/* Header: product image if available, otherwise brand gradient */}
      {imageSrc ? (
        <div className="relative bg-white flex items-center justify-center overflow-hidden" style={{ height: 140 }}>
          <Image src={imageSrc} alt={name} fill className="object-contain p-3" sizes="220px" />
        </div>
      ) : (
        <div
          className="relative flex flex-col items-center justify-center px-4 pt-6 pb-5 gap-1 overflow-hidden"
          style={{ background: `linear-gradient(145deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}
        >
          <svg viewBox="0 0 120 60" className="absolute bottom-0 left-0 w-full opacity-10" aria-hidden="true">
            {[...Array(7)].map((_, i) => (
              <line key={i} x1="60" y1="60" x2={10 + i * 17} y2="0"
                stroke={colors.accent} strokeWidth="6" strokeLinecap="round" />
            ))}
          </svg>
          {grade && (
            <span className="text-2xl font-black tracking-tight leading-none relative z-10" style={{ color: colors.accent }}>
              {grade}
            </span>
          )}
          <span className="text-2xl font-black tracking-tight leading-none text-white text-center relative z-10">
            {series}
          </span>
        </div>
      )}

      {/* White body */}
      <div className="bg-white p-3 flex flex-col flex-1 gap-3">
        <p className="text-brand-900 text-sm font-semibold leading-snug flex-1">{name}</p>
        <span className="inline-flex items-center justify-center gap-1 text-xs font-semibold border rounded px-2 py-1.5 hover:opacity-80 transition-colors"
          style={{ color: colors.primary, borderColor: colors.primary + "40" }}>
          ▶ <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

function PlaceholderCard({ name }: { name: string }) {
  return (
    <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200 flex flex-col">
      <div className="bg-brand-100 h-36 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-brand-400">
          <div className="w-14 h-14 rounded-full bg-brand-200 flex items-center justify-center">
            <FlaskConical className="w-7 h-7 text-brand-400" />
          </div>
          <span className="text-xs">–</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-brand-900 text-sm mb-3 flex-1">{name}</h3>
        <Button asChild size="sm" variant="outline" className="w-full" rightIcon={<ArrowRight className="h-3 w-3" />}>
          <Link href="/contact/request-quote">→</Link>
        </Button>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string; category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BRANDS).flatMap((slug) =>
    Object.keys(CATEGORIES).map((category) => ({ slug, category }))
  );
}

export default async function BrandCategoryPage({ params }: CategoryPageProps) {
  const { locale, slug, category } = await params;
  setRequestLocale(locale);
  const brand = BRANDS[slug.toLowerCase()];
  const cat = CATEGORIES[category];

  if (!brand || !cat) notFound();

  const t = await getTranslations("brandPage");
  const isMotor = category === "motor-yaglari";

  const Icon = cat.icon === "truck" ? Truck : cat.icon === "droplets" ? Droplets : FlaskConical;
  const overrideKey = `${slug.toLowerCase()}:${category}`;
  const products = BRAND_OVERRIDES[overrideKey] ?? cat.products;
  const colors = BRAND_CARD_COLORS[slug.toLowerCase()];
  const hasBrandedCards = overrideKey in BRAND_OVERRIDES && !!colors;

  const catLabel = isMotor ? t("motorOilsCard") : t("industrialLubsCard");
  const catDesc = isMotor ? t("motorCatDesc") : t("industrialCatDesc");

  return (
    <main className="min-h-screen bg-brand-50 pt-[120px]">

      {/* Header */}
      <section className="bg-white border-b border-brand-200 py-12">
        <div className="container-xl">
          <Link
            href={`/brands/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-900 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBrand", { brand: brand.name })}
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-40 h-20 shrink-0">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain" priority />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-accent-600 mb-1">
                  {brand.name}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-900">
                  {brand.name} {catLabel}
                </h1>
                <p className="text-brand-500 text-sm mt-1">{catDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((name) =>
              hasBrandedCards
                ? <BrandedProductCard key={name} name={name} categorySlug={category} brandSlug={slug.toLowerCase()} colors={colors!} />
                : <PlaceholderCard key={name} name={name} />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container-xl text-center">
          <p className="text-brand-500 text-lg mb-6 max-w-xl mx-auto">
            {t("notFoundHelp")}
          </p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{t("requestQuote")}</Link>
          </Button>
        </div>
      </section>

    </main>
  );
}
