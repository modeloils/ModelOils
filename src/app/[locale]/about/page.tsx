import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Model Oils — ISO Certified Lubricant Exporter, Istanbul",
  description:
    "Model Oils is an Istanbul-based lubricant manufacturer and exporter with 15+ years of experience. ISO 9001:2015 certified. Serving B2B buyers in 40+ countries across MENA, Africa, and Europe.",
};

export default async function AboutPage() {
  const t = await getTranslations("about");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.modeloils.com/about" },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Model Oils",
    url: "https://www.modeloils.com",
    foundingDate: "2009",
    foundingLocation: "Bursa, Turkey",
    description:
      "ISO 9001:2015 certified lubricant manufacturer and exporter based in Bursa, Turkey. Supplying motor oils, mineral oils, and industrial lubricants to B2B buyers in 40+ countries.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Üçevler Mah. İzmir Yolu Cad. No: 241/334",
      addressLocality: "Nilüfer",
      addressRegion: "Bursa",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-533-456-7975",
      contactType: "sales",
      availableLanguage: ["English", "Turkish"],
    },
  };

  const milestones = [
    { year: "2009", event: t("m2009") },
    { year: "2012", event: t("m2012") },
    { year: "2015", event: t("m2015") },
    { year: "2018", event: t("m2018") },
    { year: "2021", event: t("m2021") },
    { year: "2024", event: t("m2024") },
  ];

  const values = [
    { title: t("v1Title"), desc: t("v1Desc") },
    { title: t("v2Title"), desc: t("v2Desc") },
    { title: t("v3Title"), desc: t("v3Desc") },
    { title: t("v4Title"), desc: t("v4Desc") },
  ];

  const stats = [
    { stat: "40+", label: t("stat1") },
    { stat: "15+", label: t("stat2") },
    { stat: "12,000+", label: t("stat3") },
    { stat: "200+", label: t("stat4") },
    { stat: t("stat5Abbr"), label: t("stat5Label") },
    { stat: "98.6%", label: t("stat6") },
  ];

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={orgSchema} />

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
            headline={t("headline")}
            subheadline={t("subheadline")}
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Company overview */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-4">{t("whoWeAreTitle")}</h2>
              <div className="space-y-4 text-sm text-brand-700 leading-relaxed">
                <p>{t("para1")}</p>
                <p>{t("para2")}</p>
                <p>{t("para3")}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="bg-white border border-brand-200 rounded-xl p-5 text-center"
                >
                  <p className="text-2xl font-bold text-accent-600 mb-1">{item.stat}</p>
                  <p className="text-xs text-brand-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-900 py-12 hex-texture">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-white mb-8">{t("valuesTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <CheckCircle className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{v.title}</p>
                  <p className="text-brand-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-12 border-t border-brand-100">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">{t("historyTitle")}</h2>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-brand-200 hidden sm:block" aria-hidden="true" />
            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="w-[52px] shrink-0 text-right">
                    <span className="text-xs font-mono font-bold text-accent-600">{m.year}</span>
                  </div>
                  <div className="hidden sm:block w-3 h-3 rounded-full bg-accent-600 border-2 border-white ring-1 ring-brand-200 mt-0.5 shrink-0 relative z-10" aria-hidden="true" />
                  <p className="text-sm text-brand-700 leading-relaxed pb-4">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-12 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-brand-300 mb-6 text-sm">{t("ctaBody")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">{t("ctaQuote")}</Link>
            </Button>
            <Button asChild size="md" variant="outline">
              <Link href="/certifications">{t("ctaCerts")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
