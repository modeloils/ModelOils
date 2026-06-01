import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations,
  setRequestLocale} from "next-intl/server";
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

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blogPage");
  const tb = await getTranslations("blog");
  const posts = await getBlogPosts(20).catch(() => []);

  const categoryLabels = tb.raw("categoryLabels") as Record<string, string>;

  const staticPosts = [
    {
      _id: "static-madeni-yag-tanimi",
      title: "Madeni Yağ: Tanımı, Çeşitleri ve Bilinmesi Gerekenler",
      slug: "madeni-yag-tanimi",
      excerpt: "Madeni yağlar nedir, çeşitleri nelerdir, nasıl seçilir? Viskozite, kalite faktörleri, yağ türleri karşılaştırması ve yaygın yanılgılar hakkında kapsamlı teknik rehber.",
      category: "technical-guides",
      publishedAt: "2026-06-01T00:00:00.000Z",
      readingTimeMinutes: 8,
    },
  ];

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-GB" : locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

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
              <li><Link href="/" className="hover:text-brand-300">{t("breadcrumbHome")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">{t("breadcrumbPage")}</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow={t("eyebrow")}
            headline=""
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...staticPosts, ...posts].map((post) => (
              <Link
                key={post._id}
                href={`/resources/blog/${post.slug}`}
                className="group bg-white border border-brand-200 rounded-xl overflow-hidden hover:border-accent-600 hover:shadow-[0_8px_24px_rgba(13,27,42,0.1)] transition-all"
              >
                <div className="aspect-[16/9] bg-brand-900 flex items-center justify-center relative overflow-hidden">
                  <div className="hex-texture absolute inset-0 opacity-30" />
                  <span className="text-accent-400 font-mono text-xs font-semibold z-10 px-3 text-center">
                    {post.category ? (categoryLabels[post.category] ?? post.category) : "Article"}
                  </span>
                </div>
                <div className="p-5">
                  {post.category && (
                    <Badge variant="amber" className="mb-3">
                      {categoryLabels[post.category] ?? post.category}
                    </Badge>
                  )}
                  <h2 className="text-sm font-bold text-brand-900 leading-snug mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {"excerpt" in post && post.excerpt && (
                    <p className="text-xs text-brand-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt as string}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-brand-500">
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.readingTimeMinutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {post.readingTimeMinutes} {t("minRead")}
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
          <h2 className="text-lg font-bold text-white mb-2">{t("ctaTitle")}</h2>
          <p className="text-brand-300 text-sm mb-5">{t("ctaBody")}</p>
          <Link
            href="/contact/request-quote"
            className="inline-flex items-center gap-2 text-accent-400 font-semibold text-sm hover:text-accent-300 transition-colors"
          >
            {t("ctaBtn")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
