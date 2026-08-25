import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LOCALES } from "@/lib/i18n/types";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Base (English) paths. Every locale mirrors this set.
        const pages: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/products/hi-tech", changefreq: "weekly", priority: "0.9" },
          { path: "/products/yokohama", changefreq: "weekly", priority: "0.8" },
          { path: "/catalogs", changefreq: "monthly", priority: "0.7" },
          { path: "/industries", changefreq: "monthly", priority: "0.7" },
          { path: "/export", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/media", changefreq: "monthly", priority: "0.5" },
          { path: "/blog", changefreq: "weekly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
        ];

        // English is served unprefixed; every other locale lives under its own prefix.
        const entries: SitemapEntry[] = LOCALES.flatMap((locale) =>
          locale === "en"
            ? pages
            : pages.map((p) => ({
                ...p,
                path: p.path === "/" ? `/${locale}` : `/${locale}${p.path}`,
              })),
        );

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
