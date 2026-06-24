import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import flagshipImg from "@/assets/flagship.png";

export function aboutHead(locale: Locale) {
  return pageHead(locale, "about", [{ property: "og:image", content: flagshipImg }]);
}

export const Route = createFileRoute("/about")({
  head: () => aboutHead("en"),
  component: About,
});

export function About() {
  const { t, data } = useTranslation();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.about.heroEyebrow}
        title={t.about.heroTitle}
        subtitle={t.about.heroSubtitle}
      />

      <section className="border-b border-border bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow={t.about.focusEyebrow} title={t.about.focusTitle} />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t.about.focusP1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t.about.focusP2}
            </p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <LocaleLink to="/contact">
                {t.about.partnerCta} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </LocaleLink>
            </Button>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] glow-blue">
            <img
              src={flagshipImg}
              alt={t.imgAlt.productDisplay}
              loading="lazy"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.about.whyEyebrow} title={t.about.whyTitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.trustPoints.map((tp) => (
              <div key={tp.title} className="flex gap-4 rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">{tp.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
