import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ExternalLink, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BRANDS: Record<string, { name: string; logo: string; blend: boolean }> = {
  Shell:          { name: "Shell",        logo: "/brands/Shell.png",        blend: false },
  mobil:          { name: "Mobil",        logo: "/brands/mobil.png",        blend: true  },
  castrol:        { name: "Castrol",      logo: "/brands/castrol.jpg",      blend: true  },
  total:          { name: "Elf / Total",  logo: "/brands/total.png",        blend: true  },
  motul:          { name: "Motul",        logo: "/brands/motul.jpg",        blend: true  },
  texol:          { name: "Texol",        logo: "/brands/texol.jpg",        blend: true  },
  texaco:         { name: "Texaco",       logo: "/brands/texaco.png",       blend: true  },
  "petrol-ofisi": { name: "Petrol Ofisi", logo: "/brands/petrol-ofisi.png", blend: true  },
};

interface CatalogEntry {
  id: string;
  title: string;
  descKey: string;
  pagesKey: string;
  file: string;
  updated: string;
}

const BRAND_CATALOGS: Record<string, CatalogEntry[]> = {
  Shell:          [],
  mobil:          [],
  castrol:        [],
  total:          [],
  motul:          [],
  texol:          [{ id: "texol-genel", title: "Texol Genel Ürün Kataloğu", descKey: "catalog1Desc", pagesKey: "catalog1Pages", file: "/docs/catalogs/general-product-catalog.pdf", updated: "2026" }],
  texaco:         [],
  "petrol-ofisi": [],
};

interface BrandCatalogsPageProps {
  params: Promise<{ locale: string; brand: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BRANDS).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: BrandCatalogsPageProps): Promise<Metadata> {
  const { brand } = await params;
  const b = BRANDS[brand];
  if (!b) return {};
  return {
    title: `${b.name} Product Catalogs — Model Oils`,
    description: `Download ${b.name} motor oil and lubricant catalogs. B2B export documentation available.`,
  };
}

export default async function BrandCatalogsPage({ params }: BrandCatalogsPageProps) {
  const { locale, brand } = await params;
  setRequestLocale(locale);

  const brandInfo = BRANDS[brand];
  if (!brandInfo) notFound();

  const t = await getTranslations("catalogsPage");
  const catalogs = BRAND_CATALOGS[brand] ?? [];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">{t("breadcrumbHome")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/resources/catalogs" className="hover:text-brand-300">{t("breadcrumbPage")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">{brandInfo.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Brand logo */}
            <div className="relative w-40 h-20 shrink-0 bg-white rounded-xl p-3">
              <Image
                src={brandInfo.logo}
                alt={brandInfo.name}
                fill
                className={`object-contain p-3 ${brandInfo.blend ? "mix-blend-multiply" : ""}`}
                priority
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">
                {t("eyebrow")}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {brandInfo.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog list */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <Link
            href="/resources/catalogs"
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-900 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToCatalogs")}
          </Link>

          {catalogs.length === 0 ? (
            <div className="bg-white border border-brand-200 rounded-xl p-10 text-center">
              <FileText className="h-10 w-10 text-brand-300 mx-auto mb-4" aria-hidden="true" />
              <p className="text-brand-500 text-sm">{t("ctaBody")}</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {catalogs.map((catalog) => (
                <div
                  key={catalog.id}
                  className="bg-white border border-brand-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-brand-900 border border-brand-700 flex items-center justify-center shrink-0">
                    <FileText className="h-7 w-7 text-accent-400" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-brand-900 mb-2">{catalog.title}</h2>
                    <p className="text-sm text-brand-600 leading-relaxed mb-3">{t(catalog.descKey as "catalog1Desc")}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-brand-500">
                      <span>
                        <span className="font-medium text-brand-700">{t("updatedLabel")}:</span> {catalog.updated}
                      </span>
                      <span>{t(catalog.pagesKey as "catalog1Pages")}</span>
                    </div>
                  </div>

                  {/* Open in browser */}
                  <div className="shrink-0">
                    <a
                      href={catalog.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[var(--radius-btn)] transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("openBtn")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-14 hex-texture">
        <div className="container-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-brand-300 text-sm max-w-xl mx-auto mb-8">{t("ctaBody")}</p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact">{t("ctaBtn")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
