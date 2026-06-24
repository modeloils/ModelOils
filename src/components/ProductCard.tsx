import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSET_BASE } from "@/lib/site-data";
import type { Product } from "@/lib/site-data";
import { LocaleLink, useTranslation } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,oklch(0.66_0.18_248/0.18),transparent_70%)]">
        <div className="tech-grid absolute inset-0 opacity-60" />
        <img
          src={product.image ?? `${ASSET_BASE}/hi-tech/5w40-4lt.png`}
          alt={`${product.name} packaging`}
          loading="lazy"
          width={180}
          height={240}
          className="relative h-40 w-auto object-contain drop-shadow-[0_18px_30px_oklch(0.05_0.02_255/0.75)] transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {product.category}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.benefit}</p>
        <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between gap-2 border-t border-border/60 pt-2">
            <dt>{t.card.spec}</dt>
            <dd className="text-right text-foreground/80">{product.spec}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>{t.card.packaging}</dt>
            <dd className="text-right text-foreground/80">{product.packaging}</dd>
          </div>
        </dl>
        <Button asChild variant="steel" size="sm" className="mt-5 w-full">
          <LocaleLink to="/contact">
            {t.card.requestQuote} <ArrowRight className="h-4 w-4" />
          </LocaleLink>
        </Button>
      </div>
    </div>
  );
}
