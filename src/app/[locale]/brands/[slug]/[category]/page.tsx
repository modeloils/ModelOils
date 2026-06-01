import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, FlaskConical, Truck, Droplets } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BRANDS: Record<string, { name: string; logo: string }> = {
  castrol: { name: "Castrol",     logo: "/brands/castrol.jpg" },
  texaco:  { name: "Texaco",      logo: "/brands/texaco.png"  },
  texol:   { name: "Texol",       logo: "/brands/texol.jpg"   },
  shell:   { name: "Shell",       logo: "/brands/Shell.png"   },
  total:   { name: "Elf / Total", logo: "/brands/total.png"   },
  motul:   { name: "Motul",       logo: "/brands/motul.jpg"   },
  mobil:   { name: "Mobil",       logo: "/brands/mobil.png"   },
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
  texaco:  { primary: "#CC0000", secondary: "#880000", accent: "#ffffff",  accentText: "#CC0000" },
};

// Strips any known brand prefix then slugifies
function toSlug(name: string) {
  return name
    .replace(/^(Shell|Mobil|Castrol|Total|Elf|Motul|Texol|Texaco)\s+/i, "")
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
    "Shell Helix Ultra 0W-20", "Shell Helix Ultra 0W-30", "Shell Helix Ultra 0W-40",
    "Shell Helix Ultra 5W-30", "Shell Helix Ultra 5W-40",
    "Shell Helix Ultra ECT C2/C3 0W-30", "Shell Helix Ultra ECT C3 5W-30",
    "Shell Helix Ultra Professional AB-L 0W-30", "Shell Helix Ultra Professional AF 5W-20",
    "Shell Helix Ultra Professional AG 5W-30", "Shell Helix Ultra Professional AM-L 5W-30",
    "Shell Helix Ultra Professional AV-L 0W-30", "Shell Helix Ultra Professional AV 5W-30",
    "Shell Helix HX8 5W-30", "Shell Helix HX8 5W-40", "Shell Helix HX8 10W-40",
    "Shell Helix HX8 ECT 5W-30",
    "Shell Helix HX7 5W-40", "Shell Helix HX7 10W-40", "Shell Helix HX7 15W-40",
    "Shell Helix HX7 AV-L 5W-30",
    "Shell Helix HX6 10W-40",
    "Shell Helix HX5 15W-40", "Shell Helix HX5 20W-50",
    "Shell Helix HX3 20W-50",
    "Shell Rimula R2 Extra 15W-40", "Shell Rimula R3 15W-40", "Shell Rimula R3 Multi 10W-30",
    "Shell Rimula R4 L 15W-40", "Shell Rimula R4 X 15W-40",
    "Shell Rimula R5 E 10W-40", "Shell Rimula R5 LE 10W-40",
    "Shell Rimula R6 LME 5W-30", "Shell Rimula R6 ME 5W-30",
  ],
  "shell:endustriyel-yaglar": [
    "Shell Tellus S2 MX 32", "Shell Tellus S2 MX 46", "Shell Tellus S2 MX 68",
    "Shell Tellus S2 MX 100", "Shell Tellus S3 M 46",
    "Shell Omala S2 GX 150", "Shell Omala S2 GX 220", "Shell Omala S2 GX 320", "Shell Omala S2 GX 460",
    "Shell Corena S3 R 46", "Shell Corena S4 R 46",
    "Shell Gadus S2 V220 2",
    "Shell Morlina S2 BL 10",
    "Shell Tonna S3 M 68",
    "Shell Diala S4 ZX-I",
  ],

  /* ── MOBIL ──────────────────────────────────────────────────────── */
  "mobil:motor-yaglari": [
    "Mobil 1 ESP X2 0W-20", "Mobil 1 ESP 0W-30", "Mobil 1 ESP 5W-30",
    "Mobil 1 ESP X4 0W-40", "Mobil 1 FS 5W-40", "Mobil 1 New Life 0W-40",
    "Mobil Super 3000 FE 5W-30", "Mobil Super 3000 X1 5W-40",
    "Mobil Super 2000 10W-40",
    "Mobil Delvac 1 ESP 5W-30", "Mobil Delvac 1 ESP 5W-40",
    "Mobil Delvac 1300 Super 15W-40",
    "Mobil Super 1000 15W-40",
  ],
  "mobil:endustriyel-yaglar": [
    "Mobil DTE 10 Excel 32", "Mobil DTE 10 Excel 46",
    "Mobil DTE 10 Excel 68", "Mobil DTE 10 Excel 100",
    "Mobil SHC 630", "Mobil SHC 632",
    "Mobil Rarus 427", "Mobil Rarus SHC 1024",
    "Mobil Vactra 2",
    "Mobil Grease XHP 222",
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
};

interface CardColors { primary: string; secondary: string; accent: string; accentText: string }

function BrandedProductCard({
  name, categorySlug, brandSlug, colors,
}: { name: string; categorySlug: string; brandSlug: string; colors: CardColors }) {
  const { series, grade } = parseProductName(name);
  const productSlug = toSlug(name);

  return (
    <Link
      href={`/brands/${brandSlug}/${categorySlug}/${productSlug}`}
      className="rounded-[var(--radius-card)] overflow-hidden border hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-200 flex flex-col"
      style={{ borderColor: colors.primary + "40" }}
    >
      {/* Colored header */}
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
          <span className="text-2xl font-black tracking-tight leading-none relative z-10"
            style={{ color: colors.accent }}>
            {grade}
          </span>
        )}
        <span className="text-2xl font-black tracking-tight leading-none text-white text-center relative z-10">
          {series}
        </span>
      </div>

      {/* White body */}
      <div className="bg-white p-3 flex flex-col flex-1 gap-3">
        <p className="text-brand-900 text-xs font-medium leading-snug flex-1">{name}</p>
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
  const { slug, category } = await params;
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
                ? <BrandedProductCard key={name} name={name} categorySlug={category} brandSlug={slug} colors={colors!} />
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
