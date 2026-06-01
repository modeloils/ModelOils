import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Download, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Catalogs & Technical Documentation — Model Oils",
  description:
    "Download Model Oils product catalogs, technical data sheets, and export documentation. Motor oils, mineral oils, and industrial lubricants for B2B buyers worldwide.",
};

interface CatalogsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CatalogsPage({ params }: CatalogsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalogsPage");

  const catalogs = [
    {
      id: "general-product-catalog",
      title: t("catalog1Title"),
      description: t("catalog1Desc"),
      pages: t("catalog1Pages"),
      file: "/docs/catalogs/general-product-catalog.pdf",
      updated: "2026",
    },
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Catalogs", item: "https://www.modeloils.com/resources/catalogs" },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">{t("breadcrumbHome")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">{t("breadcrumbPage")}</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow={t("eyebrow")}
            headline={t("headline")}
            subheadline={t("subheadline")}
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Catalog list */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
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
                  <p className="text-sm text-brand-600 leading-relaxed mb-3">{catalog.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-brand-500">
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-brand-700">{t("updatedLabel")}:</span>
                      {catalog.updated}
                    </span>
                    <span>{catalog.pages}</span>
                  </div>
                </div>

                {/* Download */}
                <div className="shrink-0">
                  <a
                    href={catalog.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[var(--radius-btn)] transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    {t("downloadBtn")}
                  </a>
                </div>
              </div>
            ))}
          </div>
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
