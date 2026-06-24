import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import { GENERAL_ARTICLES, FAQ_ARTICLES, type BlogArticle } from "@/lib/blog-data";

export function blogHead(locale: Locale) {
  return pageHead(locale, "blog");
}

export const Route = createFileRoute("/blog")({
  head: () => blogHead("en"),
  component: Blog,
});

function ArticleCard({ article }: { article: BlogArticle }) {
  const { t } = useTranslation();
  const excerpt = article.body[0].length > 120
    ? article.body[0].slice(0, 120).trimEnd() + "…"
    : article.body[0];

  return (
    <LocaleLink
      to={`/blog/${article.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 transition-colors hover:border-primary/50"
    >
      <h3 className="font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {excerpt}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
        {t.blogPage.readMore} <ArrowRight className="h-3 w-3" />
      </span>
    </LocaleLink>
  );
}

export function Blog() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <section className="border-b border-border bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.blogPage.generalInfo} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GENERAL_ARTICLES.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.blogPage.faq} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FAQ_ARTICLES.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {t.blogPage.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            {t.blogPage.ctaBody}
          </p>
          <LocaleLink
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.quoteCta.requestWholesale} <ArrowRight className="h-4 w-4" />
          </LocaleLink>
        </div>
      </section>
    </SiteLayout>
  );
}
