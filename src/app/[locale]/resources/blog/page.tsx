import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Lubricant Technical Guides & Export Insights | Model Oils Blog",
  description:
    "Technical guides on API oil classifications, viscosity grades, ACEA standards, and export regulations for lubricant importers. Written by Model Oils export specialists.",
};

const SAMPLE_POSTS = [
  {
    _id: "1",
    title: "What Is API SN Plus? The New Standard for GDI Engine Protection",
    slug: "api-sn-plus-explained",
    excerpt: "API SN Plus was introduced specifically for engines equipped with Gasoline Direct Injection (GDI) and turbocharged GDI systems. Here is what lubricant buyers need to know.",
    publishedAt: "2026-04-01",
    category: "technical-guides",
    readingTimeMinutes: 8,
    author: "Model Oils Technical Team",
    coverImage: null,
  },
  {
    _id: "2",
    title: "Importing Lubricants to Nigeria: Regulations, HS Codes & NAFDAC Requirements",
    slug: "importing-lubricants-nigeria",
    excerpt: "A complete guide to importing motor oils and industrial lubricants into Nigeria — covering NAFDAC registration, SON certification, HS code classification, and port clearance procedures.",
    publishedAt: "2026-03-15",
    category: "export-guides",
    readingTimeMinutes: 12,
    author: "Model Oils Export Team",
    coverImage: null,
  },
  {
    _id: "3",
    title: "How to Read a Lubricant Technical Data Sheet: A Buyer's Field Guide",
    slug: "how-to-read-lubricant-tds",
    excerpt: "A TDS contains everything needed to evaluate a lubricant — if you know how to read it. This guide explains every section of a typical motor oil or hydraulic fluid TDS.",
    publishedAt: "2026-03-01",
    category: "technical-guides",
    readingTimeMinutes: 10,
    author: "Model Oils Technical Team",
    coverImage: null,
  },
  {
    _id: "4",
    title: "5W-30 vs 10W-40: Which Engine Oil Is Right for Your Fleet?",
    slug: "5w30-vs-10w40-fleet-comparison",
    excerpt: "Viscosity grade selection affects fuel economy, cold start wear, and engine life — especially in mixed-climate fleets. We compare 5W-30 and 10W-40 across the key decision factors.",
    publishedAt: "2026-02-15",
    category: "technical-guides",
    readingTimeMinutes: 7,
    author: "Model Oils Technical Team",
    coverImage: null,
  },
  {
    _id: "5",
    title: "Incoterms 2020 Explained for Lubricant Importers: FOB, CIF, DAP Compared",
    slug: "incoterms-lubricant-importers",
    excerpt: "FOB, CIF, DAP — which Incoterm protects you and which leaves you exposed? We break down the most commonly used trade terms for lubricant imports and explain when each makes sense.",
    publishedAt: "2026-02-01",
    category: "export-guides",
    readingTimeMinutes: 9,
    author: "Model Oils Export Team",
    coverImage: null,
  },
  {
    _id: "6",
    title: "ACEA Engine Oil Sequences Explained: A3/B4, C3, E7, E9 for Buyers",
    slug: "acea-classification-guide",
    excerpt: "ACEA classifications determine whether a motor oil meets European OEM requirements. This guide explains each sequence and which vehicles and applications they cover.",
    publishedAt: "2026-01-15",
    category: "technical-guides",
    readingTimeMinutes: 11,
    author: "Model Oils Technical Team",
    coverImage: null,
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  "technical-guides": "Technical Guide",
  "export-guides": "Export Guide",
  "industry-news": "Industry News",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts(20).catch(() => []);
  const displayPosts = posts.length > 0 ? posts : SAMPLE_POSTS;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.modeloils.com/resources" },
      { "@type": "ListItem", position: 3, name: "Blog", item: "https://www.modeloils.com/resources/blog" },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">Blog & Resources</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow="Technical Resources"
            headline="Lubricant Guides & Export Insights"
            subheadline="Technical guides on API and ACEA classifications, viscosity grades, and import regulations. Written for procurement managers, importers, and fleet operators."
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          {/* Category filter strip */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {["All", "Technical Guide", "Export Guide"].map((cat) => (
              <button
                key={cat}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-200 bg-white text-brand-700 hover:border-accent-600 hover:text-accent-600 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post) => (
              <Link
                key={post._id}
                href={`/resources/blog/${post.slug}`}
                className="group bg-white border border-brand-200 rounded-xl overflow-hidden hover:border-accent-600 hover:shadow-[0_8px_24px_rgba(13,27,42,0.1)] transition-all"
              >
                {/* Cover image placeholder */}
                <div className="aspect-[16/9] bg-brand-900 flex items-center justify-center relative overflow-hidden">
                  <div className="hex-texture absolute inset-0 opacity-30" />
                  <span className="text-accent-400 font-mono text-xs font-semibold z-10 px-3 text-center">
                    {post.category ? (CATEGORY_LABELS[post.category] ?? post.category) : "Article"}
                  </span>
                </div>

                <div className="p-5">
                  {post.category && (
                    <Badge variant="amber" className="mb-3">
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </Badge>
                  )}
                  <h2 className="text-sm font-bold text-brand-900 leading-snug mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-xs text-brand-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-brand-500">
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.readingTimeMinutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {post.readingTimeMinutes} min read
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-10 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-lg font-bold text-white mb-2">Need a Specific Technical Answer?</h2>
          <p className="text-brand-300 text-sm mb-5">
            Our technical team answers product specification, OEM approval, and application questions directly.
          </p>
          <Link
            href="/contact/request-quote"
            className="inline-flex items-center gap-2 text-accent-400 font-semibold text-sm hover:text-accent-300 transition-colors"
          >
            Ask a Technical Question <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
