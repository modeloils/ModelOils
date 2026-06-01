import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/formatting";
import type { BlogPost } from "@/lib/sanity/queries";
import { Clock } from "lucide-react";

interface BlogPreviewSectionProps {
  posts: BlogPost[];
  locale: string;
}

export function BlogPreviewSection({ posts, locale }: BlogPreviewSectionProps) {
  const t = useTranslations("blog");
  const rawSamplePosts = t.raw("samplePosts") as Array<{ title: string; excerpt: string; category: string }>;
  const categoryLabels = t.raw("categoryLabels") as Record<string, string>;

  const samplePosts = rawSamplePosts.map((p, i) => ({
    _id: String(i + 1),
    title: p.title,
    slug: `sample-post-${i + 1}`,
    excerpt: p.excerpt,
    category: p.category,
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: [8, 10, 7][i] ?? 8,
    author: "Technical Team",
  }));

  const displayPosts = posts.length > 0 ? posts : samplePosts;

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
              <div className="aspect-[16/9] bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center">
                <span className="text-accent-500 text-[10px] font-semibold uppercase tracking-widest">
                  {post.category ? (categoryLabels[post.category] ?? post.category) : "Article"}
                </span>
              </div>

              <div className="p-5">
                <Badge variant="light" className="mb-3">
                  {post.category ? (categoryLabels[post.category] ?? post.category) : "Article"}
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
                    {formatDate(post.publishedAt, locale)}
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
