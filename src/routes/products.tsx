import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ASSET_BASE } from "@/lib/site-data";
import { useTranslation, pageHead, LocaleLink, type Locale } from "@/lib/i18n";

export function productsHead(locale: Locale) {
  return pageHead(locale, "products");
}

export const Route = createFileRoute("/products")({
  head: () => productsHead("en"),
  component: Products,
});

export const PRODUCT_BRANDS = [
  {
    pathName: "Shell",
    label: "Shell",
    logo: `${ASSET_BASE}/brands/Shell.png`,
    summary: "Motor, endustriyel ve denizcilik yaglari icin katalog tedarigi.",
    documents: [
      { label: "Shell Coolant Catalogue", href: `${ASSET_BASE}/docs/shell/shell-coolant-catalogue.pdf` },
      { label: "Shell Helix Catalogue", href: `${ASSET_BASE}/docs/shell/shell-helix-catalogue.pdf` },
      { label: "Shell Marine Catalogue", href: `${ASSET_BASE}/docs/shell/shell-marine-catalogue.pdf` },
      { label: "Shell Industrial Catalogue", href: `${ASSET_BASE}/docs/shell/shell-endustriyel-katalog.pdf` },
    ],
    products: [
      { name: "Shell Helix Ultra 5W-40", image: `${ASSET_BASE}/images/products/shell/helix-ultra-5w-40.jpg` },
      { name: "Shell Rimula R4 X 15W-40", image: `${ASSET_BASE}/images/products/shell/rimula-r4-x-15w-40.jpg` },
      { name: "Shell Tellus S2 M 46", image: `${ASSET_BASE}/images/products/shell/tellus-s2-m-46.jpg` },
    ],
  },
  {
    pathName: "Mobil",
    label: "Mobil",
    logo: `${ASSET_BASE}/brands/mobil.png`,
    summary: "Otomotiv, agir hizmet, endustriyel ve denizcilik Mobil urunleri.",
    documents: [
      { label: "Mobil Motor Oils", href: `${ASSET_BASE}/docs/mobil/mobil-motor-oils.pdf` },
      { label: "Mobil Industrial Lubricants", href: `${ASSET_BASE}/docs/mobil/mobil-industrial-lubricants.pdf` },
      { label: "Mobil Delvac Heavy Vehicle", href: `${ASSET_BASE}/docs/mobil/mobil-delvac-heavy-vehicle.pdf` },
    ],
    products: [
      { name: "Mobil 1 ESP Formula 5W-30", image: `${ASSET_BASE}/images/products/mobil/1-esp-formula-5w-30.jpg` },
      { name: "Mobil Delvac 1 5W-40", image: `${ASSET_BASE}/images/products/mobil/delvac-1-5w-40.jpg` },
      { name: "Mobil DTE 25", image: `${ASSET_BASE}/images/products/mobil/dte-25.jpg` },
    ],
  },
  {
    pathName: "Motul",
    label: "Motul",
    logo: `${ASSET_BASE}/brands/motul.jpg`,
    summary: "Motul motor yaglari ve performans odakli katalog urunleri.",
    documents: [
      { label: "Motul Genel Katalog", href: `${ASSET_BASE}/docs/motul/motul-genel-katalog.pdf` },
    ],
    products: [],
  },
  {
    pathName: "Texol",
    label: "Texol",
    logo: `${ASSET_BASE}/brands/texol.jpg`,
    logoClassName: "max-h-32 max-w-[88%]",
    summary: "Texol motor ve endustriyel yag katalog tedarigi.",
    documents: [
      { label: "Texol Motor Oils", href: `${ASSET_BASE}/docs/texol/texol-motor-oils.pdf` },
      { label: "Texol Endustriyel Yaglar", href: `${ASSET_BASE}/docs/texol/texol-endustriyel-yaglar.pdf` },
    ],
    products: [],
  },
  {
    pathName: "Texaco",
    label: "Texaco",
    logo: `${ASSET_BASE}/brands/texaco.png`,
    logoClassName: "max-h-32 max-w-[90%]",
    summary: "Texaco motor yaglari ve genel katalog urunleri.",
    documents: [
      { label: "Texaco Genel Katalog", href: `${ASSET_BASE}/docs/texaco/texaco-genel-katalog.pdf` },
      { label: "Texaco Motor Oils", href: `${ASSET_BASE}/docs/texaco/texaco-motor-oils.pdf` },
    ],
    products: [],
  },
  {
    pathName: "PetrolOfisi",
    label: "Petrol Ofisi",
    logo: `${ASSET_BASE}/brands/petrol-ofisi.png`,
    summary: "Petrol Ofisi katalog urunleri icin toptan ve ihracat odakli tedarik.",
    documents: [
      { label: "Petrol Ofisi Katalog", href: `${ASSET_BASE}/docs/petrol-ofisi/petrol-ofisi-katalog.pdf` },
    ],
    products: [],
  },
] as const;

export function getProductBrand(pathName: string) {
  return PRODUCT_BRANDS.find((brand) => brand.pathName.toLowerCase() === pathName.toLowerCase());
}

export function Products() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <div className="relative overflow-hidden border-b border-border">
        <img
          src={`${ASSET_BASE}/images/hero-bg.png`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="tech-grid absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.66_0.18_248/0.16),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <LocaleLink
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.common.backToHome}
          </LocaleLink>
        </div>

        <PageHero
          eyebrow={t.productsPage.heroEyebrow}
          title={t.productsPage.heroTitle}
          subtitle={t.productsPage.heroSubtitle || undefined}
          centered
          transparent
        />

        <section className="relative pb-20 pt-6 lg:pb-24 lg:pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_BRANDS.map((brand) => (
                <LocaleLink
                  key={brand.pathName}
                  to={`/products/${brand.pathName}`}
                  aria-label={`${brand.label} products`}
                  className="group block overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted/40">
                    <img
                      src={brand.logo}
                      alt={`${brand.label} logo`}
                      loading="lazy"
                      width={180}
                      height={100}
                      className={`${brand.logoClassName ?? "max-h-24 max-w-[70%]"} object-contain transition-transform duration-300 group-hover:scale-105`}
                    />
                  </div>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
