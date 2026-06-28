import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Ship, Boxes, ShieldCheck, Wrench, Handshake } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { PACKAGING } from "@/lib/site-data";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import exportImg from "@/assets/export.jpg";

export function exportHead(locale: Locale) {
  return pageHead(locale, "export", [{ property: "og:image", content: exportImg }]);
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
      <div className="relative">
        {/* Full image — no cropping, natural width × auto height */}
        <img
          src="/model-oils/images/export-hero.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 w-full h-auto select-none"
        />

        <div className="relative z-10">
          {/* Hero sits directly over the image with a light tint for text readability */}
          <div className="bg-background/55">
            <PageHero
              eyebrow={t.exportPage.heroEyebrow}
              title={t.exportPage.heroTitle}
              subtitle={t.exportPage.heroSubtitle}
              transparent
            >
              <div className="mt-8">
                <Button asChild variant="hero" size="lg">
                  <LocaleLink to="/contact">
                    {t.exportPage.requestOffer} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </LocaleLink>
                </Button>
              </div>
            </PageHero>
          </div>

          <section className="border-b border-border bg-background/85 py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading eyebrow={t.exportPage.capEyebrow} title={t.exportPage.capTitle} />
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.exportCards.map((card, i) => {
                  const Icon = ICONS[i % ICONS.length];
                  return (
                    <div
                      key={card.title}
                      className="rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 transition-all hover:border-primary/50"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-[image:var(--gradient-blue)]">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-background/85 py-20 lg:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              <div>
                <SectionHeading eyebrow={t.exportPage.packagingEyebrow} title={t.exportPage.packagingTitle} />
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
              <div>
                <SectionHeading eyebrow={t.exportPage.marketsEyebrow} title={t.exportPage.marketsTitle} />
                <div className="mt-8 flex flex-wrap gap-3">
                  {data.exportMarkets.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
