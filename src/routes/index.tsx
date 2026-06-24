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
import { CATALOG_BRANDS } from "@/lib/site-data";
import { LocaleLink, useTranslation, pageHead, type Locale } from "@/lib/i18n";
import heroImg from "@/assets/hero.png";
import flagshipImg from "@/assets/flagship.png";
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
      <CatalogBrands />
      <QuoteCta />
    </SiteLayout>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroImg}
        alt={t.imgAlt.heroProducts}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      <div className="absolute inset-0 bg-background/55" />
      <div className="tech-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-40">
        <div className="max-w-2xl animate-float-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Globe2 className="h-3.5 w-3.5" /> {t.hero.badge}
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.hero.titlePre}{" "}
            <span className="text-gradient-steel">{t.hero.titleHighlight}</span>
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
            <Button asChild variant="steel" size="xl">
              <LocaleLink to="/hi-tech">{t.hero.exploreHiTech}</LocaleLink>
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
  const { t, data } = useTranslation();
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-20 lg:py-28">
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm bg-[image:var(--gradient-blue)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {t.flagship.badge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            HI-TECH
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.flagship.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {data.hitechBadges.map((b) => (
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
              <LocaleLink to="/hi-tech" hash="kategorilerimiz">{t.flagship.viewRange}</LocaleLink>
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] glow-blue">
          <img
            src={flagshipImg}
            alt={t.imgAlt.flagshipFamily}
            loading="lazy"
            width={1536}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,oklch(0.14_0.02_255/0.7))]" />
        </div>
      </div>
    </section>
  );
}

function ExportSection() {
  const { t, data } = useTranslation();
  const icons = [Ship, Boxes, ShieldCheck, Boxes, Wrench, Truck];
  return (
    <section className="relative overflow-hidden border-y border-border py-20 lg:py-28">
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
                className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all hover:border-primary/50"
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
  );
}

const industryIcons: LucideIcon[] = [Car, Truck, RouteIcon, Factory, HardHat, Wheat, Anchor, Wrench];

function Industries() {
  const { t, data } = useTranslation();
  return (
    <section className="bg-background py-20 lg:py-28">
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
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
    <section className="border-t border-border bg-[image:var(--gradient-panel)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.trustPoints.map((tp) => (
            <div key={tp.title} className="flex gap-4 rounded-xl border border-border bg-card/60 p-6">
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
  );
}

function CatalogBrands() {
  const { t } = useTranslation();
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.catalog.eyebrow}
          title={t.catalog.title}
          description={t.catalog.description}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATALOG_BRANDS.map((b) => (
            <LocaleLink
              key={b.name}
              to={`/products/${b.slug}`}
              className="flex h-20 items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary/40 p-4 transition-all hover:border-primary/50 hover:bg-secondary/70"
            >
              <img
                src={b.logo}
                alt={b.name}
                className={`${b.logoClassName ?? "max-h-10 max-w-full"} w-auto object-contain`}
              />
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteCta() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.66_0.18_248/0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {t.quoteCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          {t.quoteCta.body}
        </p>
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
