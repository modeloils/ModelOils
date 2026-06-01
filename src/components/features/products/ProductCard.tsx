import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download } from "lucide-react";
import type { Product } from "@/lib/sanity/queries";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "list";
  className?: string;
}

export function ProductCard({ product, variant = "grid", className }: ProductCardProps) {
  const t = useTranslations("products");

  return (
    <article
      className={cn(
        "bg-white border border-brand-200 rounded-[var(--radius-card)] overflow-hidden group hover:border-accent-600 transition-all duration-200",
        "hover:shadow-[0_8px_24px_rgba(13,27,42,0.16)]",
        variant === "list" && "flex gap-4",
        className
      )}
    >
      {/* Product image */}
      <div
        className={cn(
          "bg-brand-900 relative overflow-hidden",
          variant === "grid" ? "aspect-[4/3]" : "w-36 shrink-0"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder until real product images are uploaded to Sanity */}
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-12 h-16 rounded-md bg-gradient-to-b from-accent-600/80 to-amber-900/60 shadow-lg" />
            <span className="text-[10px] text-brand-400 font-medium">
              {product.viscosityGrade ?? product.category.name}
            </span>
          </div>
        </div>
        {/* Category tag */}
        <div className="absolute top-2 left-2">
          <Badge variant="amber">{product.category.name}</Badge>
        </div>
        {/* In stock indicator */}
        {product.inStock && (
          <div className="absolute top-2 right-2">
            <Badge variant="success">In Stock</Badge>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-semibold text-brand-900 text-base leading-snug mb-1 group-hover:text-accent-600 transition-colors">
            <Link href={`/products/${product.category.slug}/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          {product.summary && (
            <p className="text-brand-500 text-sm leading-relaxed line-clamp-2">
              {product.summary}
            </p>
          )}
        </div>

        {/* Spec mini-row */}
        {(product.viscosityGrade ?? product.apiClassification) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {product.viscosityGrade && (
              <span className="text-xs text-brand-400 font-mono">
                <span className="text-brand-600 font-semibold">Grade:</span> {product.viscosityGrade}
              </span>
            )}
            {product.apiClassification && (
              <span className="text-xs text-brand-400 font-mono">
                <span className="text-brand-600 font-semibold">API:</span> {product.apiClassification}
              </span>
            )}
            {product.aceaClassification && (
              <span className="text-xs text-brand-400 font-mono">
                <span className="text-brand-600 font-semibold">ACEA:</span> {product.aceaClassification}
              </span>
            )}
          </div>
        )}

        {/* Certification badges */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.certifications.slice(0, 3).map((cert) => (
              <Badge key={cert._id} variant="outline" size="sm">
                {cert.abbreviation}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-brand-100">
          <Button asChild size="sm" className="flex-1 text-xs">
            <Link href={`/products/${product.category.slug}/${product.slug}`}>
              {t("requestQuote")} <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary" className="flex-1 text-xs">
            <Link href={`/products/${product.category.slug}/${product.slug}#downloads`}>
              <Download className="h-3 w-3" /> TDS
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
