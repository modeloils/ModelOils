import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProductBySlug, getFAQItems } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Download, MessageCircle, CheckCircle } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug, locale).catch(() => null);
  if (!product) return {};

  return {
    title: `${product.name} ${product.viscosityGrade ?? ""} Bulk Supplier | Export`,
    description: `${product.name} ${product.apiClassification ?? ""} certified. ${product.summary?.substring(0, 120) ?? ""} Export worldwide. Download TDS or request bulk pricing.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { locale, category, slug } = await params;

  const [product, faqs] = await Promise.all([
    getProductBySlug(slug, locale).catch(() => null),
    getFAQItems(slug).catch(() => []),
  ]);

  if (!product) notFound();

  const t = await getTranslations("productDetailPage");

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    sku: product._id,
    brand: { "@type": "Brand", name: "Model Oils" },
    category: product.category.name,
    url: `https://www.modeloils.com/products/${category}/${slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Model Oils" },
    },
    ...(product.specifications && product.specifications.length > 0
      ? {
          additionalProperty: product.specifications.map((spec) => ({
            "@type": "PropertyValue",
            name: spec.property,
            value: spec.value,
          })),
        }
      : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.modeloils.com/products" },
      { "@type": "ListItem", position: 3, name: product.category.name, item: `https://www.modeloils.com/products/${category}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `https://www.modeloils.com/products/${category}/${slug}` },
    ],
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: "See FAQ section below." },
    })),
  } : null;

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumb} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Product hero */}
      <section className="bg-brand-900 pt-32 pb-12 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500 flex-wrap">
              <li><Link href="/" className="hover:text-brand-300">{t("breadcrumbHome")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="hover:text-brand-300">{t("breadcrumbProducts")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/products/${category}`} className="hover:text-brand-300">{product.category.name}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">{product.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <div>
              {/* Certification badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.viscosityGrade && <Badge variant="amber">{product.viscosityGrade}</Badge>}
                {product.apiClassification && <Badge variant="default">{product.apiClassification}</Badge>}
                {product.aceaClassification && <Badge variant="outline">{product.aceaClassification}</Badge>}
                {product.inStock ? (
                  <Badge variant="success">{t("inStock")}</Badge>
                ) : (
                  <Badge variant="outline">{t("contactAvailability")}</Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                {product.name}
                {product.viscosityGrade && ` — ${product.viscosityGrade}`}
              </h1>
              {product.summary && (
                <p className="text-brand-300 text-lg leading-relaxed mb-6">{product.summary}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  <Link href={`/contact/request-quote?product=${encodeURIComponent(product.name)}`}>
                    {t("requestQuoteForProduct")}
                  </Link>
                </Button>
                <Button asChild size="md" variant="outline">
                  <a
                    href={`https://wa.me/905334567975?text=Hi%2C%20I'd%20like%20a%20quote%20for%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: product image placeholder */}
            <div className="bg-brand-800 border border-brand-700 rounded-xl aspect-[4/3] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-28 rounded-lg bg-gradient-to-b from-accent-600 to-amber-900 shadow-xl flex items-end justify-center pb-3">
                  <span className="text-white text-[9px] font-bold tracking-widest">
                    {product.viscosityGrade ?? ""}
                  </span>
                </div>
                <span className="text-brand-400 text-xs">{t("imageComingSoon")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick specs table */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="bg-white border-b border-brand-200 py-10" id="specifications">
          <div className="container-xl">
            <h2 className="text-xl font-bold text-brand-900 mb-6">{t("techSpecs")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Technical specifications">
                <thead>
                  <tr className="bg-brand-900 text-left">
                    <th className="text-brand-300 font-semibold px-4 py-3 text-xs uppercase tracking-wider w-2/5">{t("thProperty")}</th>
                    <th className="text-brand-300 font-semibold px-4 py-3 text-xs uppercase tracking-wider w-2/5">{t("thValue")}</th>
                    <th className="text-brand-300 font-semibold px-4 py-3 text-xs uppercase tracking-wider">{t("thTestMethod")}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-brand-50"}>
                      <td className="px-4 py-3 font-medium text-brand-700 border-b border-brand-100">{spec.property}</td>
                      <td className="px-4 py-3 font-mono text-brand-900 border-b border-brand-100">{spec.value}</td>
                      <td className="px-4 py-3 text-brand-500 text-xs border-b border-brand-100">{spec.testMethod ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Applications */}
      {product.applications && product.applications.length > 0 && (
        <section className="bg-brand-50 py-10">
          <div className="container-xl">
            <h2 className="text-xl font-bold text-brand-900 mb-6">{t("applications")}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.applications.map((app, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-accent-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-brand-700 text-sm">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Packaging & Export */}
      <section className="bg-white py-10" id="packaging">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-6">{t("packagingExport")}</h2>
          {product.packagingOptions && product.packagingOptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Packaging options">
                <thead>
                  <tr className="bg-brand-900 text-left">
                    {[t("thPackage"), t("thCapacity"), t("thUnitsPallet"), t("thGrossWeight")].map((h) => (
                      <th key={h} className="text-brand-300 font-semibold px-4 py-3 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.packagingOptions.map((pkg, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-brand-50"}>
                      <td className="px-4 py-3 font-medium text-brand-700 border-b border-brand-100">{pkg.type}</td>
                      <td className="px-4 py-3 font-mono text-brand-900 border-b border-brand-100">{pkg.capacity}</td>
                      <td className="px-4 py-3 text-brand-700 border-b border-brand-100">{pkg.unitsPerPallet ?? "—"}</td>
                      <td className="px-4 py-3 text-brand-700 border-b border-brand-100">{pkg.grossWeight ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-brand-500 text-sm">{t("packagingFallback")}</p>
          )}
          <div className="mt-4 text-sm text-brand-500">
            <strong className="text-brand-700">{t("incotermsLabel")}:</strong> EXW · FOB · CFR · CIF · DAP · DDP
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-brand-900 py-10" id="downloads">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-white mb-6">{t("techDocs")}</h2>
          <div className="flex flex-wrap gap-3">
            {product.technicalDataSheet?.asset.url ? (
              <Button asChild variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                <a href={product.technicalDataSheet.asset.url} download target="_blank" rel="noopener noreferrer">
                  {t("downloadTds")}
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                <Link href={`/contact?tds=${encodeURIComponent(product.name)}`}>{t("requestTds")}</Link>
              </Button>
            )}
            {product.safetyDataSheet?.asset.url ? (
              <Button asChild variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                <a href={product.safetyDataSheet.asset.url} download target="_blank" rel="noopener noreferrer">
                  {t("downloadSds")}
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                <Link href={`/contact?sds=${encodeURIComponent(product.name)}`}>{t("requestSds")}</Link>
              </Button>
            )}
          </div>
          <p className="text-brand-400 text-xs mt-4">
            {t("docsNote")}{" "}
            <Link href="/contact" className="text-accent-500 hover:text-accent-400 underline">
              {t("contactTechTeam")}
            </Link>
          </p>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="bg-brand-50 py-10" id="faq">
          <div className="container-xl">
            <h2 className="text-xl font-bold text-brand-900 mb-6">{t("faqTitle")}</h2>
            <div className="space-y-4 max-w-[720px]">
              {faqs.map((faq) => (
                <details key={faq._id} className="bg-white border border-brand-200 rounded-[var(--radius-card)] group">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-sm text-brand-900 list-none flex items-center justify-between gap-2">
                    {faq.question}
                    <span className="text-accent-600 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-brand-600 text-sm leading-relaxed border-t border-brand-100 pt-3">
                    <p>{t("faqFallback")}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote CTA */}
      <section className="bg-brand-900 py-12 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-brand-300 mb-6 text-sm">{t("ctaBody", { name: product.name })}</p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href={`/contact/request-quote?product=${encodeURIComponent(product.name)}`}>
              {t("ctaBtn")}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
