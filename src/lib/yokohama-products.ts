import type { Locale } from "./i18n/types";
import { YOKOHAMA_CATEGORY_DEFINITIONS } from "./yokohama-categories";
import { YOKOHAMA_PRODUCT_DETAILS } from "./yokohama-product-details.generated";
import { YOKOHAMA_PRODUCTS } from "./yokohama-products.generated";

export { getYokohamaCategoryName, YOKOHAMA_CATEGORY_DEFINITIONS } from "./yokohama-categories";

export interface YokohamaProductItem {
  slug: string;
  name: string;
  image: string;
}

export interface YokohamaProductDetail {
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;
  standards: string | Record<Locale, string>;
  packaging: string[];
}

const PRODUCT_DETAILS_BY_SOURCE_KEY = YOKOHAMA_PRODUCT_DETAILS as Record<
  string,
  YokohamaProductDetail
>;

export interface YokohamaSubcategoryGroup {
  title: string;
  products: YokohamaProductItem[];
}

export interface YokohamaCategoryData {
  title: string;
  products: YokohamaProductItem[];
  details: Record<string, YokohamaProductDetail>;
  subcategories?: Record<string, YokohamaSubcategoryGroup>;
}

const SUBDIVIDED_MOTOR_OIL_CATEGORIES = new Set([
  "Binek-Arac-Motor-Yaglari",
  "Agir-Hizmet-Motor-Yaglari",
  "Motosiklet-Yaglari",
]);

const HANDLE_CLEANED_CATEGORIES = new Set(["Binek-Arac-Motor-Yaglari", "Antifrizler"]);

function getViscosityGroup(product: YokohamaProductItem): string | undefined {
  if (/\b2\s*-?\s*T\b/i.test(product.name)) return "2T";

  const multigrade = product.name.match(/\b(\d+)W-?(\d+)\b/i);
  if (multigrade) return `${multigrade[1]}W-${multigrade[2]}`;

  const monograde = product.name.match(/\bSAE\s*(\d+)\b/i);
  if (monograde) return `SAE-${monograde[1]}`;

  return undefined;
}

function createViscositySubcategories(
  products: YokohamaProductItem[],
): Record<string, YokohamaSubcategoryGroup> {
  const subcategories: Record<string, YokohamaSubcategoryGroup> = {};

  for (const product of products) {
    const grade = getViscosityGroup(product) ?? "Other";
    subcategories[grade] ??= { title: grade, products: [] };
    subcategories[grade].products.push(product);
  }

  return subcategories;
}

function useTransparentPackshot(image: string, category: string): string {
  const suffix = HANDLE_CLEANED_CATEGORIES.has(category)
    ? "-transparent-clean.webp"
    : "-transparent.webp";
  return image.replace(/\.webp$/i, suffix);
}

export const YOKOHAMA_CATEGORY_DATA = Object.fromEntries(
  YOKOHAMA_CATEGORY_DEFINITIONS.map((category) => {
    const sourceProducts = YOKOHAMA_PRODUCTS.filter(
      (product) => product.category === category.slug,
    );
    const products = sourceProducts.map(({ slug, name, image }) => ({
      slug,
      name,
      image: useTransparentPackshot(image, category.slug),
    }));
    const details = Object.fromEntries(
      sourceProducts.map((product) => [
        product.slug,
        PRODUCT_DETAILS_BY_SOURCE_KEY[`${category.slug}:${product.slug}`],
      ]),
    ) as Record<string, YokohamaProductDetail>;
    const usesSubcategories = SUBDIVIDED_MOTOR_OIL_CATEGORIES.has(category.slug);

    return [
      category.slug,
      {
        title: category.names.en,
        products: usesSubcategories ? [] : products,
        details,
        ...(usesSubcategories ? { subcategories: createViscositySubcategories(products) } : {}),
      },
    ];
  }),
) as Record<string, YokohamaCategoryData>;

export function findYokohamaProduct(
  categorySlug: string,
  productSlug: string,
): YokohamaProductItem | undefined {
  const category = YOKOHAMA_CATEGORY_DATA[categorySlug];
  if (!category) return undefined;

  const directProduct = category.products.find((product) => product.slug === productSlug);
  if (directProduct) return directProduct;

  for (const subcategory of Object.values(category.subcategories ?? {})) {
    const product = subcategory.products.find((item) => item.slug === productSlug);
    if (product) return product;
  }

  return undefined;
}

export function findYokohamaSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): YokohamaSubcategoryGroup | undefined {
  return YOKOHAMA_CATEGORY_DATA[categorySlug]?.subcategories?.[subcategorySlug];
}

export function getYokohamaSubcategorySlugs(categorySlug: string): string[] {
  return Object.keys(YOKOHAMA_CATEGORY_DATA[categorySlug]?.subcategories ?? {});
}
