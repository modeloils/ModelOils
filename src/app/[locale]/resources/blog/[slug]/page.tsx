import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return {};

  return {
    title: `${post.title} | Model Oils`,
    description: post.excerpt ?? `${post.title} — technical insights from Model Oils export team.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const [post, relatedPosts] = await Promise.all([
    getBlogPostBySlug(slug).catch(() => null),
    getBlogPosts(4).catch(() => []),
  ]);

  if (!post) notFound();

  const t = await getTranslations("blogArticlePage");
  const tn = await getTranslations("nav");
  const tb = await getTranslations("blog");
  const categoryLabels = tb.raw("categoryLabels") as Record<string, string>;
  const categoryLabel = post.category ? (categoryLabels[post.category] ?? post.category) : null;

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-GB" : locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author ?? "Model Oils Technical Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Model Oils",
      url: "https://www.modeloils.com",
    },
    url: `https://www.modeloils.com/resources/blog/${slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.modeloils.com/resources/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.modeloils.com/resources/blog/${slug}` },
    ],
  };

  const otherPosts = relatedPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumb} />

      {/* Article hero */}
      <section className="bg-brand-900 pt-32 pb-12 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500 flex-wrap">
              <li><Link href="/" className="hover:text-brand-300">{t("breadcrumbHome")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/resources/blog" className="hover:text-brand-300">{t("breadcrumbBlog")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300 truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          <div className="max-w-[760px]">
            {categoryLabel && <Badge variant="amber" className="mb-4">{categoryLabel}</Badge>}
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-brand-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-xs text-brand-500">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTimeMinutes && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {post.readingTimeMinutes} {t("minRead")}
                </span>
              )}
              {post.author && <span>{t("by")} {post.author}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Article content + sidebar */}
      <section className="bg-white section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            {/* Main content */}
            <article>
              {/* Cover image placeholder */}
              <div className="aspect-[16/7] bg-brand-900 rounded-xl flex items-center justify-center mb-10 hex-texture relative overflow-hidden">
                <span className="text-brand-500 text-xs z-10">Cover image coming soon</span>
              </div>

              {/* Content — Portable Text would render here */}
              <div className="prose prose-brand max-w-none">
                {post.content ? (
                  <p className="text-brand-600 text-sm">
                    Article content is loaded from Sanity CMS. Connect your Sanity project to display full article content.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <p className="text-brand-700 leading-relaxed">
                      This article is available in full once Sanity Studio is connected. The content covers all technical details related to: <strong>{post.title}</strong>.
                    </p>
                    <p className="text-brand-600 text-sm leading-relaxed">
                      To add article content, open Sanity Studio at <code className="bg-brand-100 px-1 py-0.5 rounded text-xs">/studio</code>, navigate to Blog Posts, find this article, and add content blocks in the Content field.
                    </p>
                  </div>
                )}
              </div>

              {/* Back link */}
              <div className="mt-12 pt-8 border-t border-brand-100">
                <Link
                  href="/resources/blog"
                  className="inline-flex items-center gap-2 text-brand-600 text-sm hover:text-accent-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> {t("backToBlog")}
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 sticky top-24">
              {/* CTA */}
              <div className="bg-brand-900 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-2">{t("ctaTitle")}</p>
                <p className="text-brand-400 text-xs mb-4 leading-relaxed">{t("ctaBody")}</p>
                <Button asChild size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />} className="w-full">
                  <Link href="/contact/request-quote">{t("ctaBtn")}</Link>
                </Button>
              </div>

              {/* Related posts */}
              {otherPosts.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-4">{t("relatedTitle")}</p>
                  <div className="space-y-3">
                    {otherPosts.map((related) => (
                      <Link
                        key={related._id}
                        href={`/resources/blog/${related.slug}`}
                        className="group block"
                      >
                        <p className="text-sm font-medium text-brand-900 group-hover:text-accent-600 transition-colors leading-snug">
                          {related.title}
                        </p>
                        {related.readingTimeMinutes && (
                          <p className="text-xs text-brand-500 mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.readingTimeMinutes} {t("minRead")}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Product links */}
              <div>
                <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-3">{tn("products")}</p>
                <div className="space-y-1">
                  {[
                    { name: tn("motorOils"), href: "/products/motor-oils" },
                    { name: tn("mineralOils"), href: "/products/mineral-oils" },
                    { name: tn("industrialLubricants"), href: "/products/industrial-lubricants" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between text-sm text-brand-700 hover:text-accent-600 transition-colors py-1"
                    >
                      {link.name}
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
