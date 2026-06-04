import type { Metadata } from "next";
import Link from "next/link";
import { getProductCategories } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Product Catalog — Motor Oils, Mineral Oils & Industrial Lubricants",
  description:
    "Wholesale supplier of motor oils, mineral oils, and industrial lubricants. ISO certified, API rated. Drum, IBC & bulk tanker available. Export to MENA, Africa, Europe. Request pricing.",
};

const FALLBACK_CATEGORIES = [
  {
    _id: "1",
    name: "Motor Oils",
    slug: "motor-oils",
    description:
      "SAE-graded engine oils for passenger cars, commercial vehicles, and heavy-duty diesel engines. API and ACEA certified.",
  },
  {
    _id: "2",
    name: "Mineral Oils",
    slug: "mineral-oils",
    description:
      "White mineral oils, process oils, transformer oils, and specialty mineral base oils for industrial and pharmaceutical applications.",
  },
  {
    _id: "3",
    name: "Industrial Lubricants",
    slug: "industrial-lubricants",
    description:
      "Hydraulic oils, compressor oils, gear oils, metalworking fluids, and greases for industrial machinery and equipment.",
  },
];

export default async function ProductsPage() {
  const categories = await getProductCategories().catch(() => FALLBACK_CATEGORIES);
  const displayCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.modeloils.com/products" },
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
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">Products</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow="Full Catalog"
            headline="Motor Oils, Mineral Oils & Industrial Lubricants"
            subheadline="500+ products across three categories. All ISO certified, API compliant, with full technical documentation."
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Category grid */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayCategories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products/${cat.slug}`}
                className="group bg-white border border-brand-200 rounded-[var(--radius-card)] p-8 hover:border-accent-600 hover:shadow-[0_8px_24px_rgba(13,27,42,0.12)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-900 flex items-center justify-center mb-5 group-hover:bg-accent-600 transition-colors">
                  <span className="text-white font-bold text-sm">{cat.name.charAt(0)}</span>
                </div>
                <h2 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-accent-600 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-brand-500 text-sm leading-relaxed mb-5">
                  {cat.description}
                </p>
                <span className="text-accent-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Products <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-8 bg-brand-900 rounded-xl text-center hex-texture">
            <h2 className="text-white text-2xl font-bold mb-3">Need a Custom Product Specification?</h2>
            <p className="text-brand-300 text-sm mb-6 max-w-[480px] mx-auto">
              Our technical team can match the correct product to your engine type, OEM specification, and operating conditions.
            </p>
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">Request Technical Matching</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
