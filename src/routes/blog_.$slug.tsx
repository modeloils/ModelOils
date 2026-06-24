import { createFileRoute, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import { getBlogArticle } from "@/lib/blog-data";

export function blogArticleHead(locale: Locale) {
  return pageHead(locale, "blog");
}

export const Route = createFileRoute("/blog_/$slug")({
  head: () => blogArticleHead("en"),
  component: BlogArticle,
});

export function BlogArticle() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { t } = useTranslation();
  const article = getBlogArticle(slug);

  if (!article) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{t.notFound.title}</p>
            <LocaleLink
              to="/blog"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> {t.blogPage.backToBlog}
            </LocaleLink>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="border-b border-border bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LocaleLink
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t.blogPage.backToBlog}
          </LocaleLink>

          <h1 className="mt-8 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-10 space-y-5">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <section className="border-t border-border bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {t.blogPage.ctaTitle}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {t.blogPage.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LocaleLink
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.quoteCta.requestWholesale} <ArrowRight className="h-4 w-4" />
            </LocaleLink>
            <LocaleLink
              to="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" /> {t.blogPage.backToBlog}
            </LocaleLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
