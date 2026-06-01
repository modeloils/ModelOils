import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";

const BASE_URL = "https://www.modeloils.com";
const LOCALES = ["en", "tr", "ar"];

function localizedUrls(path: string, priority: number, changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: locale === "en" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedUrls("/", 1.0, "weekly"),
    ...localizedUrls("/products", 0.9, "weekly"),
    ...localizedUrls("/products/motor-oils", 0.9, "weekly"),
    ...localizedUrls("/products/mineral-oils", 0.9, "weekly"),
    ...localizedUrls("/products/industrial-lubricants", 0.9, "weekly"),
    ...localizedUrls("/export-services", 0.8, "monthly"),
    ...localizedUrls("/certifications", 0.8, "monthly"),
    ...localizedUrls("/contact", 0.7, "monthly"),
    ...localizedUrls("/contact/request-quote", 0.9, "monthly"),
    ...localizedUrls("/solutions/fleet-operators", 0.7, "monthly"),
    ...localizedUrls("/solutions/automotive-distributors", 0.7, "monthly"),
    ...localizedUrls("/solutions/industrial-companies", 0.7, "monthly"),
    ...localizedUrls("/solutions/lubricant-importers", 0.7, "monthly"),
    ...localizedUrls("/resources/blog", 0.7, "weekly"),
    ...localizedUrls("/about", 0.5, "monthly"),
  ];

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await sanityClient.fetch<{ slug: string; category: string }[]>(
      `*[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current)] {
        "slug": slug.current,
        "category": category->slug.current
      }`
    );

    productPages = products.flatMap(({ slug, category }) =>
      localizedUrls(`/products/${category}/${slug}`, 0.8, "monthly")
    );
  } catch {
    // Sanity not configured yet — skip dynamic pages
  }

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await sanityClient.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "blogPost" && !(_id in path("drafts.**")) && defined(publishedAt)] {
        "slug": slug.current,
        publishedAt
      }`
    );

    blogPages = posts.flatMap(({ slug, publishedAt }) =>
      LOCALES.map((locale) => ({
        url: locale === "en"
          ? `${BASE_URL}/resources/blog/${slug}`
          : `${BASE_URL}/${locale}/resources/blog/${slug}`,
        lastModified: new Date(publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );
  } catch {
    // Sanity not configured yet — skip dynamic pages
  }

  return [...staticPages, ...productPages, ...blogPages];
}
