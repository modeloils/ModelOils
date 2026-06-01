import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const PERSONAS = [
  { slug: "fleet-operators",        msgKey: "fleet"        },
  { slug: "automotive-distributors", msgKey: "distributors" },
  { slug: "industrial-companies",    msgKey: "industrial"   },
  { slug: "lubricant-importers",     msgKey: "importers"    },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("solutions");
  return {
    title: t("indexTitle"),
    description: t("indexSubtitle"),
  };
}

export default async function SolutionsIndexPage() {
  const t = await getTranslations("solutions");

  const cards = await Promise.all(
    PERSONAS.map(async ({ slug, msgKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = t.raw(msgKey as any) as Record<string, string>;
      return { slug, title: p.title ?? slug, eyebrow: p.eyebrow ?? "", subheadline: p.subheadline ?? "" };
    })
  );

  return (
    <main className="min-h-screen bg-brand-50 pt-[120px]">
      {/* Header */}
      <section className="bg-brand-900 py-16 hex-texture">
        <div className="container-xl text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent-500 mb-4">
            {t("breadcrumbSolutions")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("indexTitle")}
          </h1>
          <p className="text-brand-300 text-lg max-w-2xl mx-auto">
            {t("indexSubtitle")}
          </p>
        </div>
      </section>

      {/* Persona cards */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map(({ slug, title, eyebrow, subheadline }) => (
              <Link
                key={slug}
                href={`/solutions/${slug}`}
                className="group bg-white border border-brand-200 rounded-[var(--radius-card)] p-8 flex flex-col gap-4 hover:border-accent-500 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 mb-2">
                    {eyebrow}
                  </p>
                  <h2 className="text-xl font-bold text-brand-900 group-hover:text-accent-700 transition-colors">
                    {title}
                  </h2>
                </div>
                {subheadline && (
                  <p className="text-sm text-brand-500 leading-relaxed line-clamp-3">
                    {subheadline}
                  </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-accent-600 text-sm font-semibold group-hover:gap-2.5 transition-all mt-auto">
                  {t("requestQuote")} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
