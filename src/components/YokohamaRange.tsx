import type { ReactNode } from "react";
import { notFound, Outlet, useParams } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronLeft, Flame } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useYokohamaLanding } from "@/lib/brands";
import { LocaleLink, useTranslation, type Locale } from "@/lib/i18n";
import { AUTHORIZED_DISTRIBUTOR_LABEL } from "@/lib/i18n/authorized-distributor";
import {
  getYokohamaCategoryName,
  YOKOHAMA_CATEGORY_DATA,
  YOKOHAMA_CATEGORY_DEFINITIONS,
  type YokohamaProductDetail,
  type YokohamaProductItem,
} from "@/lib/yokohama-products";

const BASE_PATH = "/yokohama";

const categoryBackgrounds: Record<string, string> = {
  "Binek-Arac-Motor-Yaglari": "/model-oils/brands/yokohama-categories/passenger-cars.jpg",
  "Agir-Hizmet-Motor-Yaglari": "/model-oils/brands/yokohama-categories/heavy-duty.jpg",
  "Otomatik-Transmisyon-Yaglari": "/model-oils/brands/yokohama-categories/transmission.jpg",
  "Disli-ve-Transmisyon-Yaglari": "/model-oils/brands/yokohama-categories/transmission.jpg",
  Antifrizler: "/model-oils/brands/yokohama-categories/antifreeze.jpg",
  "Motosiklet-Yaglari": "/model-oils/brands/yokohama-categories/motorcycle.jpg",
  "Traktor-ve-Tarim-Yaglari": "/model-oils/brands/yokohama-categories/light-commercial.jpg",
  "Endustriyel-Yaglar": "/model-oils/brands/yokohama-categories/industrial.jpg",
  Gresler: "/model-oils/brands/yokohama-categories/greases.jpg",
  "Deniz-Yaglari": "/model-oils/brands/yokohama-categories/marine.jpg",
  "Ozel-Urunler": "/model-oils/brands/yokohama-range.jpg",
  Akuler: "/model-oils/brands/yokohama-volt.jpg",
};

const packageSizePattern = /(\d+(?:[.,]\d+)?)\s*(?:L(?:IT(?:ER|RE)S?)?|KG|KILOGRAMS?)\b/gi;

function resolveText(value: string | Record<Locale, string>, locale: Locale): string {
  return typeof value === "string" ? value : (value[locale] ?? value.en ?? "");
}

function smallestPackageSize(values: string[]): number | undefined {
  const sizes = values.flatMap((value) => {
    const matches = [...value.matchAll(packageSizePattern)];
    packageSizePattern.lastIndex = 0;
    return matches.map((match) => Number.parseFloat(match[1].replace(",", ".")));
  });

  return sizes.length > 0 ? Math.min(...sizes) : undefined;
}

function sortProductsByPackage(
  products: YokohamaProductItem[],
  details: Record<string, YokohamaProductDetail>,
  locale: Locale,
): YokohamaProductItem[] {
  return [...products].sort((a, b) => {
    const aSize =
      smallestPackageSize([a.name]) ??
      smallestPackageSize(details[a.slug]?.packaging ?? []) ??
      Number.POSITIVE_INFINITY;
    const bSize =
      smallestPackageSize([b.name]) ??
      smallestPackageSize(details[b.slug]?.packaging ?? []) ??
      Number.POSITIVE_INFINITY;

    if (aSize !== bSize) return aSize - bSize;

    return a.name.localeCompare(b.name, locale, { sensitivity: "base", numeric: true });
  });
}

export function YokohamaRange({ extraSection }: { extraSection?: ReactNode } = {}) {
  const { t, locale } = useTranslation();
  const landing = useYokohamaLanding();
  const categories = YOKOHAMA_CATEGORY_DEFINITIONS.map(({ slug }) => ({
    name: getYokohamaCategoryName(slug, locale),
    slug,
    background: categoryBackgrounds[slug] ?? "/model-oils/brands/yokohama-range.jpg",
  }));

  return (
    <SiteLayout>
      <div className="yokohama-theme yokohama-page-surface bg-background">
        <section
          id="kategorilerimiz"
          className="border-b border-border bg-background/35 py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={landing.rangeEyebrow} title={landing.rangeTitle} as="h1" />
            <div className="yokohama-accent-line mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <LocaleLink
                  key={category.slug}
                  to={`${BASE_PATH}/${category.slug}`}
                  className="group relative flex min-h-40 items-end overflow-hidden rounded-lg border border-border shadow-[var(--shadow-card)] transition-[transform,border-color] duration-150 ease-out hover:-translate-y-1 hover:border-primary/50"
                >
                  <img
                    src={category.background}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <h3 className="relative p-5 font-display text-base font-bold leading-snug text-white drop-shadow-sm">
                    {category.name}
                  </h3>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>

        {extraSection}

        <section className="border-b border-border bg-background/35 py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <img
                src="/model-oils/brands/yokohama-range.jpg"
                alt={t.imgAlt.flagshipFamily}
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <SectionHeading eyebrow={landing.whyEyebrow} title={landing.whyTitle} />
              <ul className="mt-6 space-y-4">
                {landing.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--yokohama-green)]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-background/35">
          <PageHero
            eyebrow={AUTHORIZED_DISTRIBUTOR_LABEL[locale]}
            title={landing.heroTitle}
            subtitle={landing.heroSubtitle}
            transparent
            headingLevel="h2"
          >
            <div className="mt-7 flex flex-wrap gap-2">
              {t.flagship.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="hero" size="lg">
                <LocaleLink to="/contact">
                  {landing.becomeDistributor} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </LocaleLink>
              </Button>
            </div>
          </PageHero>
        </div>
      </div>
    </SiteLayout>
  );
}

function BackToCategories() {
  const { t } = useTranslation();
  return (
    <LocaleLink
      to={BASE_PATH}
      hash="kategorilerimiz"
      className="mb-8 inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
      {t.common.backToProducts}
    </LocaleLink>
  );
}

export function YokohamaSubcategory() {
  const { category, product } = useParams({ strict: false });
  const { t, locale } = useTranslation();
  const catData = category ? YOKOHAMA_CATEGORY_DATA[category] : undefined;
  const translatedCategory = category ? getYokohamaCategoryName(category, locale) : "";
  const pageClassName = "yokohama-theme yokohama-page-surface min-h-[55vh] py-20 lg:py-24";

  if (!category || !catData) throw notFound();

  if (product && catData?.subcategories) {
    const subcategory = catData.subcategories[product];
    if (subcategory) {
      const sortedProducts = sortProductsByPackage(subcategory.products, catData.details, locale);
      const columns = sortedProducts.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
      return (
        <SiteLayout>
          <div className={pageClassName}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <LocaleLink
                to={`${BASE_PATH}/${category}`}
                className="mb-8 inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-border bg-[image:var(--gradient-panel)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
                {translatedCategory}
              </LocaleLink>
              <SectionHeading eyebrow="YOKOHAMA" title={subcategory.title} as="h1" />
              <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${columns}`}>
                {sortedProducts.map((item) => (
                  <ProductTile key={item.slug} product={item} category={category ?? ""} />
                ))}
              </div>
            </div>
          </div>
        </SiteLayout>
      );
    }
  }

  if (product) return <Outlet />;

  if (catData?.subcategories) {
    return (
      <SiteLayout>
        <div className={pageClassName}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BackToCategories />
            <SectionHeading eyebrow="YOKOHAMA" title={translatedCategory} as="h1" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(catData.subcategories).map(([slug, subcategory]) => (
                <LocaleLink
                  key={slug}
                  to={`${BASE_PATH}/${category}/${slug}`}
                  className="group relative flex min-h-44 items-end overflow-hidden rounded-lg border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)] transition-[transform,border-color] duration-150 ease-out hover:-translate-y-1 hover:border-primary/50"
                >
                  {subcategory.products[0] && (
                    <img
                      src={subcategory.products[0].image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="absolute bottom-2 right-4 h-36 w-auto object-contain drop-shadow-lg transition-transform duration-150 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="relative z-10 max-w-[55%] p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {subcategory.title}
                    </h3>
                  </div>
                </LocaleLink>
              ))}
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (catData) {
    const sortedProducts = sortProductsByPackage(catData.products, catData.details, locale);
    const columns = sortedProducts.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
    return (
      <SiteLayout>
        <div className={pageClassName}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BackToCategories />
            <SectionHeading eyebrow="YOKOHAMA" title={translatedCategory} as="h1" />
            {catData.products.length > 0 ? (
              <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${columns}`}>
                {sortedProducts.map((item) => (
                  <ProductTile key={item.slug} product={item} category={category ?? ""} />
                ))}
              </div>
            ) : (
              <div className="mt-10">
                <Button asChild variant="hero" size="lg">
                  <LocaleLink to="/contact">
                    {t.flagship.becomeDistributor} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </LocaleLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SiteLayout>
    );
  }

  throw notFound();
}

function ProductTile({ product, category }: { product: YokohamaProductItem; category: string }) {
  return (
    <LocaleLink
      to={`${BASE_PATH}/${category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-panel)] shadow-[var(--shadow-card)] transition-[transform,border-color] duration-150 ease-out hover:-translate-y-1 hover:border-primary/50"
    >
      <div className="flex items-center justify-center p-8">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-contain transition-transform duration-150 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="border-t border-border p-5">
        <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
      </div>
    </LocaleLink>
  );
}

export function YokohamaProduct() {
  const { product: productSlug, category } = useParams({ strict: false });
  const { t, locale } = useTranslation();
  const catData = category ? YOKOHAMA_CATEGORY_DATA[category] : undefined;
  let product = catData?.products.find((item) => item.slug === productSlug);
  let parentSubcategorySlug: string | undefined;
  let parentSubcategoryTitle: string | undefined;

  if (!product && catData?.subcategories) {
    for (const [slug, subcategory] of Object.entries(catData.subcategories)) {
      const found = subcategory.products.find((item) => item.slug === productSlug);
      if (found) {
        product = found;
        parentSubcategorySlug = slug;
        parentSubcategoryTitle = subcategory.title;
        break;
      }
    }
  }

  const translatedCategory = category ? getYokohamaCategoryName(category, locale) : "";
  const detail = productSlug ? catData?.details[productSlug] : undefined;

  if (!product) {
    throw notFound();
  }

  const backPath = parentSubcategorySlug
    ? `${BASE_PATH}/${category}/${parentSubcategorySlug}`
    : `${BASE_PATH}/${category ?? ""}`;

  return (
    <SiteLayout>
      <div className="yokohama-theme yokohama-page-surface">
        <div className="border-b border-border bg-background/80 py-3">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <LocaleLink
              to={backPath}
              className="inline-flex min-h-[44px] items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 shrink-0 rtl:rotate-180" />
              {parentSubcategoryTitle ?? translatedCategory ?? category}
            </LocaleLink>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex w-full shrink-0 items-center justify-center lg:w-auto">
              <div className="yokohama-product-halo group relative flex h-64 w-64 items-center justify-center rounded-full sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 h-56 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-64 lg:h-72"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  YOKOHAMA
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {product.name.replace(/\s+\d[\d.-]*\s*[Ll]$/, "")}
                </h1>
              </div>
              {detail && (
                <div className="rounded border border-border bg-[image:var(--gradient-panel)] p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {t.productDetails.productDescription}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-primary">
                      YOKOHAMA {product.name.replace(/\s+\d+L$/i, "").toUpperCase()}
                    </span>{" "}
                    {resolveText(detail.description, locale)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {detail && (
          <div className="mx-auto max-w-6xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
                {t.productDetails.productFeatures}
              </h3>
              <div className="space-y-2">
                {(detail.features[locale] ?? detail.features.en ?? []).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded border border-border bg-[image:var(--gradient-panel)] px-4 py-3"
                  >
                    <Flame className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <p className="text-sm text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {resolveText(detail.standards, locale) && (
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
                  {t.productDetails.productStandards}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {resolveText(detail.standards, locale)}
                </p>
              </div>
            )}

            <div className="rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6">
              <Button asChild variant="hero" size="lg">
                <LocaleLink to="/contact">
                  {t.quoteCta.requestWholesale} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </LocaleLink>
              </Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
