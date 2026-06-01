import { sanityClient } from "./client";

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: { asset: { url: string } };
}

export interface ProductSpecification {
  property: string;
  value: string;
  testMethod?: string;
}

export interface PackagingOption {
  type: string;
  capacity: string;
  unitsPerPallet?: string;
  grossWeight?: string;
}

export interface Certification {
  _id: string;
  name: string;
  abbreviation: string;
  description?: string;
  logo?: { asset: { url: string } };
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: { name: string; slug: string };
  viscosityGrade?: string;
  apiClassification?: string;
  aceaClassification?: string;
  summary?: string;
  description?: unknown[];
  specifications?: ProductSpecification[];
  applications?: string[];
  oemApprovals?: { spec: string; oem: string; status: string }[];
  heroImage?: { asset: { url: string }; alt?: string };
  galleryImages?: { asset: { url: string }; alt?: string }[];
  technicalDataSheet?: { asset: { url: string; originalFilename: string } };
  safetyDataSheet?: { asset: { url: string; originalFilename: string } };
  certifications?: Certification[];
  packagingOptions?: PackagingOption[];
  inStock: boolean;
  featuredOrder?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: unknown[];
  coverImage?: { asset: { url: string }; alt?: string };
  publishedAt: string;
  category?: string;
  readingTimeMinutes?: number;
  author?: string;
}

export interface Industry {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  products?: { name: string; slug: string }[];
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: unknown[];
  productRef?: string;
}

// Queries
export async function getProducts(locale: string = "en"): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current)]
    | order(coalesce(featuredOrder, 999) asc) {
      _id,
      "slug": slug.current,
      ${locale === "tr" ? '"name": coalesce(nameTr, name),' : locale === "ar" ? '"name": coalesce(nameAr, name),' : "name,"}
      "category": category->{name, "slug": slug.current},
      viscosityGrade,
      apiClassification,
      aceaClassification,
      summary,
      "heroImage": heroImage{asset->{url}, alt},
      inStock,
      featuredOrder,
      certifications[]->{_id, name, abbreviation}
    }`,
    { locale }
  );
}

export async function getProductBySlug(
  slug: string,
  locale: string = "en"
): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      "slug": slug.current,
      ${locale === "tr" ? '"name": coalesce(nameTr, name),' : locale === "ar" ? '"name": coalesce(nameAr, name),' : "name,"}
      "category": category->{name, "slug": slug.current},
      viscosityGrade,
      apiClassification,
      aceaClassification,
      summary,
      description,
      specifications,
      applications,
      oemApprovals,
      "heroImage": heroImage{asset->{url}, alt},
      "galleryImages": galleryImages[]{asset->{url}, alt},
      "technicalDataSheet": technicalDataSheet{asset->{url, originalFilename}},
      "safetyDataSheet": safetyDataSheet{asset->{url, originalFilename}},
      certifications[]->{_id, name, abbreviation, description, "logo": logo{asset->{url}}},
      packagingOptions,
      inStock
    }`,
    { slug, locale }
  );
}

export async function getProductsByCategory(
  categorySlug: string,
  locale: string = "en"
): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))]
    | order(coalesce(featuredOrder, 999) asc) {
      _id,
      "slug": slug.current,
      ${locale === "tr" ? '"name": coalesce(nameTr, name),' : locale === "ar" ? '"name": coalesce(nameAr, name),' : "name,"}
      "category": category->{name, "slug": slug.current},
      viscosityGrade,
      apiClassification,
      summary,
      "heroImage": heroImage{asset->{url}, alt},
      inStock,
      certifications[]->{abbreviation}
    }`,
    { categorySlug, locale }
  );
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return sanityClient.fetch(
    `*[_type == "productCategory" && !(_id in path("drafts.**"))]
    | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      "image": image{asset->{url}}
    }`
  );
}

export async function getBlogPosts(limit: number = 10): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && !(_id in path("drafts.**")) && defined(publishedAt)]
    | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "coverImage": coverImage{asset->{url}, alt},
      publishedAt,
      category,
      readingTimeMinutes,
      author
    }`,
    { limit }
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      "coverImage": coverImage{asset->{url}, alt},
      publishedAt,
      category,
      readingTimeMinutes,
      author
    }`,
    { slug }
  );
}

export async function getIndustries(): Promise<Industry[]> {
  return sanityClient.fetch(
    `*[_type == "industry" && !(_id in path("drafts.**"))]
    | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      icon,
      description,
      "products": featuredProducts[]->{name, "slug": slug.current}
    }`
  );
}

export async function getCertifications(): Promise<Certification[]> {
  return sanityClient.fetch(
    `*[_type == "certification" && !(_id in path("drafts.**"))]
    | order(order asc) {
      _id,
      name,
      abbreviation,
      description,
      "logo": logo{asset->{url}}
    }`
  );
}

export async function getFAQItems(productSlug?: string): Promise<FAQItem[]> {
  const filter = productSlug
    ? `*[_type == "faqItem" && (!defined(productRef) || productRef->slug.current == $productSlug)]`
    : `*[_type == "faqItem" && !defined(productRef)]`;

  return sanityClient.fetch(
    `${filter} | order(_createdAt asc) {
      _id, question, answer,
      "productRef": productRef->slug.current
    }`,
    { productSlug: productSlug ?? "" }
  );
}
