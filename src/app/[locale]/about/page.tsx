import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Model Oils — ISO Certified Lubricant Exporter, Istanbul",
  description:
    "Model Oils is an Istanbul-based lubricant manufacturer and exporter with 15+ years of experience. ISO 9001:2015 certified. Serving B2B buyers in 40+ countries across MENA, Africa, and Europe.",
};

const MILESTONES = [
  { year: "2009", event: "Founded in Istanbul, initially supplying domestic automotive distributors." },
  { year: "2012", event: "First export contract — 205L drums to Libyan automotive sector." },
  { year: "2015", event: "ISO 9001:2015 certification achieved. Expanded to 12 export markets." },
  { year: "2018", event: "API licensing obtained for motor oil product line. New blending facility commissioned." },
  { year: "2021", event: "Reached 30+ active export countries. ISO 14001 environmental certification added." },
  { year: "2024", event: "40+ countries served. 12,000+ metric tons exported annually. Private label program launched." },
];

const VALUES = [
  {
    title: "Technical Integrity",
    desc: "Every product claim is backed by independent laboratory test data. We publish TDS and SDS for every product and provide batch-specific COA with every shipment.",
  },
  {
    title: "Operational Reliability",
    desc: "B2B buyers stake supply chains on our consistency. We maintain strict production schedules, proactive communication, and a 98.6% on-time delivery rate.",
  },
  {
    title: "Export Professionalism",
    desc: "International buyers deserve the same documentation standards as domestic buyers. We treat customs compliance, language accuracy, and certificate validity as non-negotiables.",
  },
  {
    title: "Long-Term Partnerships",
    desc: "We do not optimize for one-time transactions. Our pricing, terms, and account management are structured to make long-term partnership commercially logical for both sides.",
  },
];

export default function AboutPage() {
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
      availableLanguage: ["English", "Turkish", "Arabic"],
    },
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={orgSchema} />

      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">About</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow="About Model Oils"
            headline="15 Years of Industrial Lubricant Export"
            subheadline="An Istanbul-based manufacturer and exporter. ISO 9001:2015 certified. 40+ active export markets. We build long-term supply relationships, not one-time transactions."
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
              <h2 className="text-xl font-bold text-brand-900 mb-4">Who We Are</h2>
              <div className="space-y-4 text-sm text-brand-700 leading-relaxed">
                <p>
                  Model Oils is a lubricant manufacturer and bulk exporter headquartered in Bursa, Turkey. We blend and package motor oils, mineral oils, and industrial lubricants at our facility in Nilüfer, Bursa, and export to distributors, importers, fleet operators, and industrial companies worldwide.
                </p>
                <p>
                  Founded in 2009, we spent our first years building technical credibility in the Turkish domestic market before expanding internationally in 2012. Today, we export to 40+ countries across MENA, Sub-Saharan Africa, Southeast Asia, Central Asia, and Europe — with active freight lanes and established customs experience in each region.
                </p>
                <p>
                  We are not a trading company. Every product we export is blended and packaged at our own facility. This means consistent quality, traceable batches, and a technical team that knows every formulation we sell.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "40+", label: "Export Countries" },
                { stat: "15+", label: "Years in Operation" },
                { stat: "12,000+", label: "Metric Tons Annually" },
                { stat: "200+", label: "Active B2B Clients" },
                { stat: "ISO 9001", label: ":2015 Certified" },
                { stat: "98.6%", label: "On-Time Delivery" },
              ].map((item) => (
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
          <h2 className="text-xl font-bold text-white mb-8">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
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
          <h2 className="text-xl font-bold text-brand-900 mb-8">Our History</h2>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-brand-200 hidden sm:block" aria-hidden="true" />
            <div className="space-y-6">
              {MILESTONES.map((m) => (
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
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Work With Us?</h2>
          <p className="text-brand-300 mb-6 text-sm">
            Get a bulk quote or contact our export team to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">Request a Quote</Link>
            </Button>
            <Button asChild size="md" variant="outline">
              <Link href="/certifications">View Our Certifications</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
