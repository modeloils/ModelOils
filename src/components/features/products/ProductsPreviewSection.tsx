import Link from "next/link";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/sanity/queries";

interface ProductsPreviewSectionProps {
  products: Product[];
}

export function ProductsPreviewSection({ products }: ProductsPreviewSectionProps) {
  const t = useTranslations("products");

  return (
    <section className="bg-brand-50 section-padding" aria-labelledby="products-heading">
      <div className="container-xl">
        <SectionHeader
          id="products-heading"
          eyebrow="Product Range"
          headline={t("title")}
          subheadline={t("subtitle")}
        />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* Skeleton placeholder while Sanity is being connected */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-brand-200 rounded-[var(--radius-card)] overflow-hidden"
              >
                <div className="aspect-[4/3] bg-brand-100 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-brand-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-brand-50 rounded animate-pulse" />
                  <div className="h-3 bg-brand-50 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/products">{t("viewAll")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
