import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getBlogArticles } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n/types";
import { YOKOHAMA_CATEGORY_DEFINITIONS } from "@/lib/yokohama-categories";
import { getYokohamaSubcategorySlugs } from "@/lib/yokohama-products";
import { YOKOHAMA_PRODUCTS } from "@/lib/yokohama-products.generated";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function localizePath(path: string, locale: (typeof LOCALES)[number]): string {
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPages: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/yokohama", changefreq: "weekly", priority: "0.9" },
          { path: "/industries", changefreq: "monthly", priority: "0.7" },
          { path: "/export", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/blog", changefreq: "weekly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/privacy", changefreq: "monthly", priority: "0.2" },
          { path: "/kvkk", changefreq: "monthly", priority: "0.2" },
        ];

        const categoryPages: SitemapEntry[] = YOKOHAMA_CATEGORY_DEFINITIONS.flatMap(({ slug }) => [
          { path: `/yokohama/${slug}`, changefreq: "weekly", priority: "0.8" },
          ...getYokohamaSubcategorySlugs(slug).map((subcategory) => ({
            path: `/yokohama/${slug}/${subcategory}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
        ]);

        const productPages: SitemapEntry[] = YOKOHAMA_PRODUCTS.map((product) => ({
          path: `/yokohama/${product.category}/${product.slug}`,
          changefreq: "weekly",
          priority: "0.7",
        }));

        const blogPages: SitemapEntry[] = [
          ...getBlogArticles("en", "general"),
          ...getBlogArticles("en", "faq"),
        ].map((article) => ({
          path: `/blog/${article.slug}`,
          changefreq: "monthly",
          priority: "0.5",
        }));

        const uniquePages = [
          ...new Map(
            [...staticPages, ...categoryPages, ...productPages, ...blogPages].map((entry) => [
              entry.path,
              entry,
            ]),
          ).values(),
        ];

        const entries = LOCALES.flatMap((locale) =>
          uniquePages.map((entry) => ({
            ...entry,
            path: localizePath(entry.path, locale),
          })),
        );

        const urls = entries.map((entry) =>
          [
            "  <url>",
            `    <loc>${escapeXml(new URL(entry.path, SITE_URL).toString())}</loc>`,
            entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
            entry.priority ? `    <priority>${entry.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
