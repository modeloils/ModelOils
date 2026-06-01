import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getProductsByCategory, type Product } from "@/lib/sanity/queries";
import { ProductCard } from "@/components/features/products/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";

const VALID_CATEGORIES = ["motor-oils", "mineral-oils", "industrial-lubricants"];

const FALLBACK_PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  "motor-oils": [
    {
      _id: "fb-mo-1", name: "SAE 15W-40 Heavy Duty Engine Oil", slug: "sae-15w40-engine-oil",
      category: { name: "Motor Oils", slug: "motor-oils" },
      viscosityGrade: "15W-40", apiClassification: "CI-4/SL", aceaClassification: "E7/A3/B3",
      summary: "Multi-grade diesel engine oil for heavy-duty trucks and buses. Exceeds API CI-4 and ACEA E7 for extended drain intervals.",
      inStock: true,
    },
    {
      _id: "fb-mo-2", name: "SAE 5W-30 Full Synthetic Engine Oil", slug: "sae-5w30-synthetic",
      category: { name: "Motor Oils", slug: "motor-oils" },
      viscosityGrade: "5W-30", apiClassification: "SN Plus", aceaClassification: "C3",
      summary: "Full synthetic motor oil for modern passenger car and light commercial vehicles with GDI engines.",
      inStock: true,
    },
    {
      _id: "fb-mo-3", name: "SAE 20W-50 Mineral Engine Oil", slug: "sae-20w50",
      category: { name: "Motor Oils", slug: "motor-oils" },
      viscosityGrade: "20W-50", apiClassification: "SL/CF",
      summary: "High-viscosity mineral engine oil for older petrol and diesel engines in high-temperature climates.",
      inStock: true,
    },
  ],
  "mineral-oils": [
    {
      _id: "fb-min-1", name: "White Mineral Oil — Pharmaceutical Grade", slug: "white-mineral-oil-pharmaceutical",
      category: { name: "Mineral Oils", slug: "mineral-oils" },
      viscosityGrade: "15 / 35 / 70 cSt",
      summary: "Highly refined, colorless mineral oil meeting USP, BP, and EP pharmacopoeia standards for pharmaceutical, food, and cosmetic use.",
      inStock: true,
    },
    {
      _id: "fb-min-2", name: "Transformer Oil — Mineral Insulating Oil", slug: "transformer-oil-mineral",
      category: { name: "Mineral Oils", slug: "mineral-oils" },
      viscosityGrade: "ISO VG 10",
      summary: "Naphthenic mineral insulating oil for power transformers, circuit breakers, and switchgear. Meets IEC 60296 standard.",
      inStock: true,
    },
  ],
  "industrial-lubricants": [
    {
      _id: "fb-ind-1", name: "ISO VG 46 Hydraulic Oil", slug: "hydraulic-oil-iso-46",
      category: { name: "Industrial Lubricants", slug: "industrial-lubricants" },
      viscosityGrade: "ISO VG 46", apiClassification: "HLP/HM",
      summary: "Premium anti-wear hydraulic oil for industrial hydraulic systems, mobile equipment, and machine tools.",
      inStock: true,
    },
    {
      _id: "fb-ind-2", name: "Gear Oil GL-5 SAE 90", slug: "gear-oil-gl5-sae90",
      category: { name: "Industrial Lubricants", slug: "industrial-lubricants" },
      viscosityGrade: "SAE 90", apiClassification: "GL-5",
      summary: "Extreme-pressure gear oil for heavy-duty manual transmissions, differentials, and axles. Meets API GL-5 and MIL-PRF-2105E.",
      inStock: true,
    },
    {
      _id: "fb-ind-3", name: "Compressor Oil ISO VG 100", slug: "compressor-oil-iso-100",
      category: { name: "Industrial Lubricants", slug: "industrial-lubricants" },
      viscosityGrade: "ISO VG 100",
      summary: "Non-detergent mineral compressor oil for reciprocating and rotary air compressors. Excellent oxidation resistance.",
      inStock: true,
    },
  ],
};
const CATEGORY_NAMES: Record<string, string> = {
  "motor-oils": "Motor Oils",
  "mineral-oils": "Mineral Oils",
  "industrial-lubricants": "Industrial Lubricants",
};

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const name = CATEGORY_NAMES[category] ?? category;
  return {
    title: `${name} Wholesale Supplier | Bulk Export`,
    description: `Wholesale supplier of ${name.toLowerCase()}: ISO certified, API rated. Drum, IBC & bulk tanker available. Export to MENA, Africa, Europe. Request pricing.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;

  if (!VALID_CATEGORIES.includes(category)) notFound();

  const rawProducts = await getProductsByCategory(category, locale).catch(() => []);
  const products = rawProducts.length > 0 ? rawProducts : (FALLBACK_PRODUCTS_BY_CATEGORY[category] ?? []);
  const categoryName = CATEGORY_NAMES[category] ?? category;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.modeloils.com/products" },
      { "@type": "ListItem", position: 3, name: categoryName, item: `https://www.modeloils.com/products/${category}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Category hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="hover:text-brand-300">Products</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">{categoryName}</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow="Product Category"
            headline={`${categoryName} — Wholesale Bulk Export`}
            subheadline="ISO 9001 certified. API and ACEA compliant. Available in drums, IBCs, and bulk tanker quantities."
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Products grid */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">Request Bulk Quote for {categoryName}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
