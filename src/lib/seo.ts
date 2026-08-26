import { notFound } from "@tanstack/react-router";
import { getBlogArticle, type BlogLocale } from "@/lib/blog-data";
import { absoluteUrl, customPageHead, localePath, type Locale } from "@/lib/i18n";
import {
  findYokohamaProduct,
  findYokohamaSubcategory,
  getYokohamaCategoryName,
  YOKOHAMA_CATEGORY_DATA,
} from "@/lib/yokohama-products";

const YOKOHAMA_META_DESCRIPTION: Record<Locale, (name: string) => string> = {
  en: (name) =>
    `Explore ${name} from MODEL GRUP, the authorized distributor of Yokohama motor oils for the Middle East and Europe.`,
  tr: (name) =>
    `MODEL GRUP'un Orta Doğu ve Avrupa yetkili distribütörlüğündeki ${name} ürünlerini inceleyin.`,
  ru: (name) =>
    `Откройте для себя ${name} от MODEL GRUP — официального дистрибьютора моторных масел Yokohama на Ближнем Востоке и в Европе.`,
  fa: (name) =>
    `${name} را از MODEL GRUP، توزیع‌کننده رسمی روغن موتور Yokohama در خاورمیانه و اروپا، مشاهده کنید.`,
  ar: (name) =>
    `استكشف ${name} من MODEL GRUP، الموزع المعتمد لزيوت محركات Yokohama في الشرق الأوسط وأوروبا.`,
  de: (name) =>
    `Entdecken Sie ${name} bei MODEL GRUP, dem autorisierten Distributor für Yokohama Motoröle im Nahen Osten und in Europa.`,
  fr: (name) =>
    `Découvrez ${name} auprès de MODEL GRUP, distributeur agréé des huiles moteur Yokohama au Moyen-Orient et en Europe.`,
};

export function requireYokohamaCategory(categorySlug: string) {
  if (!YOKOHAMA_CATEGORY_DATA[categorySlug]) throw notFound();
}

export function requireYokohamaSegment(categorySlug: string, segmentSlug: string) {
  requireYokohamaCategory(categorySlug);
  if (
    !findYokohamaSubcategory(categorySlug, segmentSlug) &&
    !findYokohamaProduct(categorySlug, segmentSlug)
  ) {
    throw notFound();
  }
}

export function hasYokohamaSegmentMatch(matches: Array<{ params: unknown }>): boolean {
  return matches.some(
    (match) =>
      typeof match.params === "object" && match.params !== null && "product" in match.params,
  );
}

export function yokohamaCategoryHead(locale: Locale, categorySlug: string) {
  const categoryName = getYokohamaCategoryName(categorySlug, locale);
  const basePath = `/yokohama/${categorySlug}`;
  return customPageHead(locale, {
    basePath,
    title: `${categoryName} | YOKOHAMA | MODEL GRUP`,
    description: YOKOHAMA_META_DESCRIPTION[locale](categoryName),
    image: "/model-oils/brands/yokohama-range.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: categoryName,
      url: absoluteUrl(localePath(basePath, locale)),
      isPartOf: { "@type": "WebSite", name: "MODEL GRUP", url: absoluteUrl("/") },
    },
  });
}

export function yokohamaSegmentHead(locale: Locale, categorySlug: string, segmentSlug: string) {
  const subcategory = findYokohamaSubcategory(categorySlug, segmentSlug);
  const product = findYokohamaProduct(categorySlug, segmentSlug);
  const categoryName = getYokohamaCategoryName(categorySlug, locale);
  const name =
    product?.name ?? (subcategory ? `${categoryName} ${subcategory.title}` : categoryName);
  const basePath = `/yokohama/${categorySlug}/${segmentSlug}`;

  return customPageHead(locale, {
    basePath,
    title: `${name} | YOKOHAMA | MODEL GRUP`,
    description: YOKOHAMA_META_DESCRIPTION[locale](name),
    image: product?.image ?? "/model-oils/brands/yokohama-range.jpg",
    type: product ? "product" : "website",
    structuredData: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: absoluteUrl(product.image),
          category: categoryName,
          brand: { "@type": "Brand", name: "YOKOHAMA" },
          url: absoluteUrl(localePath(basePath, locale)),
        }
      : {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name,
          url: absoluteUrl(localePath(basePath, locale)),
        },
  });
}

export function requireBlogArticle(locale: Locale, slug: string) {
  if (!getBlogArticle(slug, locale as BlogLocale)) throw notFound();
}

export function blogArticleHead(locale: Locale, slug: string) {
  const article = getBlogArticle(slug, locale as BlogLocale);
  const title = article?.title ?? "Blog";
  const description = article?.body[0]?.slice(0, 155) ?? title;

  return customPageHead(locale, {
    basePath: `/blog/${slug}`,
    title: `${title} | MODEL GRUP`,
    description,
    type: "article",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      inLanguage: locale,
      mainEntityOfPage: absoluteUrl(localePath(`/blog/${slug}`, locale)),
      author: { "@type": "Organization", name: "MODEL GRUP" },
      publisher: { "@type": "Organization", name: "MODEL GRUP" },
    },
  });
}
