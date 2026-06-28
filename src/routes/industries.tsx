import { createFileRoute } from "@tanstack/react-router";
import { Anchor, ArrowRight, Car, Factory, HardHat, Route as RouteIcon, Truck, Wheat, Wrench, type LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";

const industryIcons: LucideIcon[] = [Car, Truck, RouteIcon, Factory, HardHat, Wheat, Anchor, Wrench];

export function industriesHead(locale: Locale) {
  return pageHead(locale, "industries");
}

export const Route = createFileRoute("/industries")({
  head: () => industriesHead("en"),
  component: Industries,
});

export function Industries() {
  const { t, data } = useTranslation();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.industriesPage.heroEyebrow}
        title={t.industriesPage.heroTitle}
        subtitle={t.industriesPage.heroSubtitle}
        backgroundImage="/model-oils/images/industries-hero.jpg"
      />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.industries.map((ind, i) => {
              const Icon = industryIcons[i] ?? Factory;
              return (
              <div
                key={ind.name}
                className="group rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.detail}</p>
              </div>
              );
            })}
          </div>
          <div className="mt-14 text-center">
            <Button asChild variant="hero" size="xl">
              <LocaleLink to="/contact">
                {t.industriesPage.discussCta} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </LocaleLink>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
