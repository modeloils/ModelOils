import Link from "next/link";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/formatting";
import type { BlogPost } from "@/lib/sanity/queries";
import { Clock } from "lucide-react";

interface BlogPreviewSectionProps {
  posts: BlogPost[];
}

const SAMPLE_POSTS = [
  {
    _id: "1",
    title: "API Oil Classifications Explained: Complete Buyer Guide 2026",
    slug: "api-oil-classifications-explained",
    excerpt: "A comprehensive reference for procurement managers on API service categories — from SA through SP — with compatibility guidance and application recommendations.",
    category: "Technical Guide",
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: 8,
    author: "Technical Team",
  },
  {
    _id: "2",
    title: "Importing Motor Oil to Nigeria: Regulations, HS Codes & NAFDAC Requirements",
    slug: "importing-motor-oil-nigeria",
    excerpt: "A practical guide for lubricant importers covering Nigerian customs HS codes, NAFDAC registration requirements, and documentation needed for smooth clearance.",
    category: "Export Insights",
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: 10,
    author: "Technical Team",
  },
  {
    _id: "3",
    title: "SAE Viscosity Grades Explained: Selecting the Right Grade for Your Climate",
    slug: "sae-viscosity-grades-explained",
    excerpt: "An engineer-level guide to SAE J300 viscosity grades — covering kinematic viscosity at 40°C and 100°C, HTTHS requirements, and selection for tropical and cold climates.",
    category: "Technical Guide",
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: 7,
    author: "Technical Team",
  },
];

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const t = useTranslations("blog");
  const displayPosts = posts.length > 0 ? posts : SAMPLE_POSTS;

  return (
    <section className="bg-brand-50 section-padding" aria-labelledby="blog-heading">
      <div className="container-xl">
        <SectionHeader
          id="blog-heading"
          eyebrow={t("eyebrow")}
          headline={t("title")}
          subheadline={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {displayPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white border border-brand-200 rounded-[var(--radius-card)] overflow-hidden group hover:border-accent-600 hover:shadow-[0_8px_24px_rgba(13,27,42,0.12)] transition-all duration-200"
            >
              {/* Cover image placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center">
                <span className="text-accent-500 text-[10px] font-semibold uppercase tracking-widest">
                  {post.category ?? "Article"}
                </span>
              </div>

              <div className="p-5">
                <Badge variant="light" className="mb-3">
                  {post.category ?? "Technical Guide"}
                </Badge>
                <h3 className="font-semibold text-brand-900 text-sm leading-snug mb-2 group-hover:text-accent-600 transition-colors">
                  <Link href={`/resources/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-brand-500 text-xs leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-brand-400">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  {post.readingTimeMinutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTimeMinutes} {t("minRead")}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/resources/blog"
            className="text-accent-600 font-semibold text-sm hover:text-accent-500 underline-offset-4 hover:underline transition-colors"
          >
            {t("viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
