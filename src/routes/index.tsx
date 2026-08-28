import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Boxes,
  Ship,
  Wrench,
  Globe2,
  CheckCircle2,
  Truck,
  Factory,
  Car,
  Route as RouteIcon,
  HardHat,
  Wheat,
  Anchor,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import { AUTHORIZED_DISTRIBUTOR_LABEL } from "@/lib/i18n/authorized-distributor";
import { BRAND_IMAGES } from "@/lib/site-data";
import heroImg from "@/assets/yokohama-hero-cream.webp";
import exportImg from "@/assets/export.jpg";

export function homeHead(locale: Locale) {
  return pageHead(locale, "home", [{ property: "og:image", content: heroImg }]);
}

export const Route = createFileRoute("/")({
  head: () => homeHead("en"),
  component: Home,
});

export function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Flagship />
      <ExportSection />
      <Industries />
      <WhyUs />
      <QuoteCta />
    </SiteLayout>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="home-hero-cream relative overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-center motion-reduce:hidden"
        src="/model-oils/videos/home-hero.mp4"
        poster={heroImg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <img
        src={heroImg}
        alt={t.imgAlt.heroProducts}
        width={1920}
        height={1080}
        className="absolute inset-0 hidden h-full w-full object-cover object-[68%_center] sm:object-center motion-reduce:block"
      />
      <div className="home-hero-overlay absolute inset-0" />
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-40">
        <div className="max-w-2xl animate-float-up">
          <span className="brand-pill inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <Globe2 className="h-3.5 w-3.5" /> {t.hero.badge}
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.hero.titlePre} <span className="home-hero-highlight">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <LocaleLink to="/contact">
                {t.hero.requestQuote} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </LocaleLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-primary/50 bg-background/90 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <LocaleLink to="/yokohama">{t.hero.exploreYokohama}</LocaleLink>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground/75">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> {t.hero.bulletPackaging}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> {t.hero.bulletExport}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Flagship() {
  const { t, locale } = useTranslation();
  return (
    <section className="brand-section-red corporate-section-light relative overflow-hidden border-y border-border py-20 lg:py-28">
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm bg-[image:var(--gradient-red)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {AUTHORIZED_DISTRIBUTOR_LABEL[locale]}
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            YOKOHAMA
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.flagship.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {t.flagship.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg">
              <LocaleLink to="/contact">
                {t.flagship.becomeDistributor} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </LocaleLink>
            </Button>
            <Button asChild variant="steel" size="lg">
              <LocaleLink to="/yokohama" hash="kategorilerimiz">
                {t.flagship.viewRange}
              </LocaleLink>
            </Button>
          </div>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] sm:min-h-[28rem] lg:min-h-[31rem]">
          <img
            src={BRAND_IMAGES.yokohamaFactory}
            alt={t.imgAlt.yokohamaFactory}
            loading="lazy"
            decoding="async"
            width={1448}
            height={1086}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

function ExportSection() {
  const { t, data } = useTranslation();
  const icons = [Ship, Boxes, ShieldCheck, Boxes, Wrench, Truck];
  return (
    <section className="brand-section-neutral corporate-dark-section relative overflow-hidden border-y border-border py-20 lg:py-28">
      <img
        src={exportImg}
        alt={t.imgAlt.exportWarehouse}
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.exportHome.eyebrow}
          title={t.exportHome.title}
          description={t.exportHome.description}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.exportCards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={card.title}
                className="brand-card rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all hover:border-primary/50"
              >
                <span className="brand-icon grid h-11 w-11 place-items-center rounded-lg">
                  <Icon className="h-5 w-5" />
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
  );
}

const industryIcons: LucideIcon[] = [
  Car,
  Truck,
  RouteIcon,
  Factory,
  HardHat,
  Wheat,
  Anchor,
  Wrench,
];

function Industries() {
  const { t, data } = useTranslation();
  return (
    <section className="brand-section-green corporate-section-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.industriesHome.eyebrow}
          title={t.industriesHome.title}
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.industries.map((ind, i) => {
            const Icon = industryIcons[i] ?? Factory;
            return (
              <div
                key={ind.name}
                className="brand-card group flex flex-col items-center gap-3 rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="brand-icon grid h-11 w-11 place-items-center rounded-lg transition-[filter] group-hover:brightness-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{ind.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const { t, data } = useTranslation();
  return (
    <section className="brand-section-blue corporate-section-white border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.trustPoints.map((tp) => (
            <div
              key={tp.title}
              className="brand-card flex gap-4 rounded-xl border border-border bg-card/60 p-6"
            >
              <CheckCircle2 className="brand-cycle-mark mt-0.5 h-6 w-6 shrink-0" />
              <div>
                <h3 className="font-display text-base font-bold text-foreground">{tp.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tp.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteCta() {
  const { t } = useTranslation();
  return (
    <section className="brand-section-green corporate-dark-section relative overflow-hidden border-t border-border py-20 lg:py-24">
      <div className="brand-cta-glow absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {t.quoteCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{t.quoteCta.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <LocaleLink to="/contact">
              {t.quoteCta.requestWholesale} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </LocaleLink>
          </Button>
          <Button asChild variant="steel" size="xl">
            <LocaleLink to="/export">{t.quoteCta.exportCapabilities}</LocaleLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
