import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useTranslation, LocaleLink } from "@/lib/i18n";

export interface BrandCatalogItem {
  title: string;
  href?: string;
}

export function BrandCatalogPage({
  brandName,
  logo,
  logoClassName = "max-w-[360px]",
  catalogs,
}: {
  brandName: string;
  logo: string;
  logoClassName?: string;
  catalogs: BrandCatalogItem[];
}) {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <main className="bg-background text-foreground">
        <section className="relative overflow-hidden border-b border-border bg-[image:var(--gradient-panel)]">
          <div className="tech-grid absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.66_0.18_248/0.16),transparent_55%)]" />
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <LocaleLink
              to="/products"
              className="relative inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
              {t.common.backToBrands}
            </LocaleLink>

            <div className="relative flex min-h-[200px] items-center justify-center py-8 sm:min-h-[360px] sm:py-12">
              <img
                src={logo}
                alt={brandName}
                width={360}
                height={360}
                className={`h-auto w-full object-contain ${logoClassName}`}
              />
            </div>
          </div>
        </section>

        <section className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
              {t.common.catalogs}
            </p>

            <div className={`mt-6 grid gap-5 sm:grid-cols-2 ${catalogs.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
              {catalogs.map((catalog) => (
                <a
                  key={catalog.title}
                  href={catalog.href ?? "#"}
                  target={catalog.href?.startsWith("http") ? "_blank" : undefined}
                  rel={catalog.href?.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex min-h-56 flex-col items-center justify-center rounded-md border border-border bg-[image:var(--gradient-panel)] p-6 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                  aria-label={`${catalog.title} — ${t.common.catalog}`}
                >
                  <img
                    src={logo}
                    alt=""
                    loading="lazy"
                    width={86}
                    height={86}
                    className="max-h-16 max-w-28 object-contain"
                  />
                  <h2 className="mt-7 text-xl font-extrabold leading-snug text-foreground">
                    {catalog.title}
                  </h2>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
