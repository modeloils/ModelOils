import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/site-data";
import { LocaleLink, useTranslation } from "@/lib/i18n";

export function CategoryCard({ category }: { category: Category }) {
  const { t } = useTranslation();
  return (
    <div className="group flex flex-col rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50">
      {category.image && (
        <div className="mb-5 flex h-28 items-center justify-center rounded-lg bg-[radial-gradient(circle_at_50%_30%,oklch(0.66_0.18_248/0.14),transparent_72%)]">
          <img
            src={category.image}
            alt=""
            loading="lazy"
            width={120}
            height={150}
            className="h-24 w-auto object-contain drop-shadow-[0_12px_22px_oklch(0.05_0.02_255/0.65)]"
          />
        </div>
      )}
      <h3 className="font-display text-lg font-bold leading-snug text-foreground">
        {category.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {category.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {category.packaging.split(", ").map((p) => (
          <span
            key={p}
            className="rounded-sm border border-border bg-secondary/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {p}
          </span>
        ))}
      </div>
      <Button asChild variant="ghost" size="sm" className="mt-5 justify-start px-0 text-primary hover:bg-transparent hover:text-primary/80">
        <LocaleLink to="/contact">
          {t.card.requestQuote} <ArrowRight className="h-4 w-4" />
        </LocaleLink>
      </Button>
    </div>
  );
}
