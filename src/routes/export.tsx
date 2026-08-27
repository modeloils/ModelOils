import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Ship, Boxes, ShieldCheck, Wrench, Handshake } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { PACKAGING } from "@/lib/site-data";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";

const EXPORT_HERO_IMAGE = "/model-oils/images/export-hero-v2.webp";

export function exportHead(locale: Locale) {
  return pageHead(locale, "export", [{ property: "og:image", content: EXPORT_HERO_IMAGE }]);
}

export const Route = createFileRoute("/export")({
  head: () => exportHead("en"),
  component: Export,
});

const ICONS = [Ship, Boxes, ShieldCheck, Boxes, Wrench, Handshake];

export function Export() {
  const { t, data } = useTranslation();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.exportPage.heroEyebrow}
        title={t.exportPage.heroTitle}
        subtitle={t.exportPage.heroSubtitle}
        backgroundImage={EXPORT_HERO_IMAGE}
        backgroundImageClassName="opacity-90"
        backgroundOverlayClassName="bg-background/55"
      >
        <div className="mt-8">
          <Button asChild variant="hero" size="lg">
            <LocaleLink to="/contact">
              {t.exportPage.requestOffer} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </LocaleLink>
          </Button>
        </div>
      </PageHero>

      <section className="brand-section-red corporate-dark-section border-b border-border/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.exportPage.capEyebrow}
            title={t.exportPage.capTitle}
            className="[&_h2]:text-foreground"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.exportCards.map((card, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={card.title}
                  className="brand-card rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 transition-all hover:border-primary/50"
                >
                  <span className="brand-icon grid h-11 w-11 place-items-center rounded-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section-green py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.exportPage.packagingEyebrow}
            title={t.exportPage.packagingTitle}
            className="[&_h2]:text-foreground"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {PACKAGING.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-semibold text-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
