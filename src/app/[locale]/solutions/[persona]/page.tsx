import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, CheckCircle } from "lucide-react";

interface PersonaData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  solutions: { title: string; desc: string }[];
  featuredProducts: { name: string; grade: string; api: string; slug: string; category: string }[];
  testimonialQuote: string;
  testimonialName: string;
  testimonialRole: string;
  faq: { q: string; a: string }[];
}

const PERSONAS: Record<string, PersonaData> = {
  "fleet-operators": {
    title: "Fleet Operators",
    metaTitle: "Bulk Engine Oil for Fleet Operators — Wholesale Lubricant Supplier",
    metaDescription:
      "Lubricants for commercial fleet operators: API CK-4, SAE 15W-40, SAE 10W-40 in 205L drums and IBC. Competitive wholesale pricing, consistent quality, 24-hour quote turnaround.",
    eyebrow: "Solutions for Fleet Operators",
    headline: "Consistent Engine Oil Supply for Commercial Fleets",
    subheadline:
      "Stop managing multiple oil suppliers. We supply SAE-graded motor oils for diesel and petrol fleets in bulk — drums, IBCs, and bulk tanker. ISO certified, API rated, consistent across every order.",
    painPoints: [
      "Inconsistent oil quality causing early drain intervals",
      "Multiple suppliers with incompatible specifications",
      "Rising fleet maintenance costs from premium retail lubricants",
      "Documentation requirements from OEM warranty programs",
      "No dedicated account manager for re-order coordination",
    ],
    solutions: [
      { title: "Bulk Pricing That Scales With Your Fleet", desc: "From 1,000L trial orders to full bulk tanker quantities. Price per liter drops significantly at IBC and tanker volumes." },
      { title: "API and OEM Specification Matching", desc: "Our technical team matches the correct API SN, CJ-4, or CK-4 specification to your fleet's OEM requirements — Mercedes, MAN, Volvo, Cummins, DDC, and others." },
      { title: "Consistent Batch-to-Batch Quality", desc: "ISO 9001:2015 quality management and batch-specific Certificate of Analysis on every order. Same formulation, same performance, every delivery." },
      { title: "Flexible Delivery Scheduling", desc: "Monthly, quarterly, or annual supply agreements available. Proactive lead time communication so you never face an unplanned stock-out." },
    ],
    featuredProducts: [
      { name: "SAE 15W-40 Heavy Duty Diesel Engine Oil", grade: "15W-40", api: "API CK-4", slug: "sae-15w40-engine-oil", category: "motor-oils" },
      { name: "SAE 10W-40 Semi-Synthetic Engine Oil", grade: "10W-40", api: "API SN Plus", slug: "sae-10w40-semi-synthetic", category: "motor-oils" },
      { name: "SAE 5W-30 Full Synthetic Engine Oil", grade: "5W-30", api: "API SN Plus", slug: "sae-5w30-synthetic", category: "motor-oils" },
    ],
    testimonialQuote:
      "We switched from three separate local suppliers to Model Oils for our entire 200-vehicle fleet. Pricing improved, documentation improved, and we haven't had a specification mismatch in 18 months.",
    testimonialName: "Kwame A.",
    testimonialRole: "Fleet Maintenance Director, West Africa",
    faq: [
      { q: "What is the minimum order for fleet supply?", a: "Minimum bulk order is 1,000L (typically 5× 205L drums). For IBC quantities, minimum is 1 unit. We recommend starting with a trial order before committing to a supply agreement." },
      { q: "Can you supply API CK-4 certified oil for modern diesel engines?", a: "Yes. Our SAE 15W-40 HD diesel oil carries API CK-4 certification, backward compatible with API CJ-4 and CI-4. Certificate and COA provided with every shipment." },
      { q: "Do you offer price-lock agreements for fleet operators?", a: "Yes. 6-month and 12-month price-lock agreements are available for verified fleet operators committing to minimum quarterly volumes. Contact our sales team to discuss terms." },
      { q: "Can I mix products across multiple specifications in one shipment?", a: "Yes. We regularly ship multi-product orders in a single container — different grades, different product types — with separate COA for each batch." },
    ],
  },

  "automotive-distributors": {
    title: "Automotive Distributors",
    metaTitle: "Wholesale Motor Oil for Automotive Distributors — Private Label & OEM Spec",
    metaDescription:
      "Motor oils for automotive distributors: API-certified, ACEA-compliant, private label available. Wholesale pricing on 205L drums, IBCs, and bulk. 40+ export markets.",
    eyebrow: "Solutions for Automotive Distributors",
    headline: "Reliable Wholesale Motor Oil Supply for Distributors",
    subheadline:
      "Establish a consistent supply of API and ACEA certified motor oils for your distribution network. Private label, co-packing, and custom formulation available for qualifying volume orders.",
    painPoints: [
      "Unreliable supplier causing stock gaps in your distribution network",
      "No private label option from current manufacturer",
      "API and ACEA certifications required by automotive sector buyers",
      "Inconsistent quality complaints from end customers",
      "High cost of maintaining multiple source suppliers",
    ],
    solutions: [
      { title: "Private Label & Co-Packing", desc: "We can supply products under your label with your branding on drums and IBCs. Minimum private label run is 5,000L. ACEA and API marks retained per licensing requirements." },
      { title: "Full API and ACEA Certification Portfolio", desc: "API SN, SN+, CF, CK-4, and ACEA A3/B4, C3, E7, E9 across our motor oil range. Certification documents available for your import compliance files." },
      { title: "Distributor Pricing Tiers", desc: "Volume-based pricing with additional margin for distributors committing to quarterly minimum orders. Exclusive regional distributor agreements available in select markets." },
      { title: "Complete Export Documentation", desc: "Commercial invoice, COA, MSDS, Certificate of Origin, and country-specific compliance documents. Your end customers clear customs without delays." },
    ],
    featuredProducts: [
      { name: "SAE 5W-30 Full Synthetic Engine Oil", grade: "5W-30", api: "API SN Plus / ACEA C3", slug: "sae-5w30-synthetic", category: "motor-oils" },
      { name: "SAE 15W-40 Heavy Duty Engine Oil", grade: "15W-40", api: "API CK-4 / ACEA E7", slug: "sae-15w40-engine-oil", category: "motor-oils" },
      { name: "SAE 20W-50 Mineral Engine Oil", grade: "20W-50", api: "API SL/CF", slug: "sae-20w50", category: "motor-oils" },
    ],
    testimonialQuote:
      "We moved our entire product range to Model Oils as our single source supplier 14 months ago. Private label setup was straightforward, and the API documentation satisfied our local trade authority requirements immediately.",
    testimonialName: "Rodrigo M.",
    testimonialRole: "Import Director, South America",
    faq: [
      { q: "What is the minimum for private label production?", a: "Minimum private label run is 5,000L per SKU (typically 25× 205L drums or 5× 1,000L IBCs). Lead time from label artwork approval to dispatch is 10–14 working days." },
      { q: "Can you supply ACEA A3/B4 for European passenger car distribution?", a: "Yes. Our 5W-30 and 5W-40 synthetic oils are formulated and tested to ACEA A3/B4 and C3 sequences. Lab test reports are available on request." },
      { q: "Do you work with exclusive distributor agreements?", a: "Yes, for select markets. Exclusive distributor status requires a minimum annual volume commitment and is reviewed quarterly. Contact our partnership team to discuss." },
      { q: "How do you handle quality complaints from my end customers?", a: "All batches are traceable via COA batch numbers. If a quality complaint references a batch number, we investigate within 48 hours and provide a written response. Replacement product dispatched if investigation confirms a batch issue." },
    ],
  },

  "industrial-companies": {
    title: "Industrial Companies",
    metaTitle: "Industrial Lubricants Wholesale — Hydraulic Oil, Gear Oil, Compressor Oil Supplier",
    metaDescription:
      "Hydraulic oils, gear oils, compressor oils, and metalworking fluids for industrial companies. ISO VG grades, OEM specs, bulk pricing. Export worldwide with full documentation.",
    eyebrow: "Solutions for Industrial Companies",
    headline: "Industrial Lubricants for Manufacturing & Processing Plants",
    subheadline:
      "Hydraulic fluids, gear oils, compressor oils, and specialty lubricants for industrial machinery. ISO VG graded, OEM specification matched, available in drums, IBCs, and bulk tanker.",
    painPoints: [
      "Multiple lubricant types from multiple suppliers creating procurement complexity",
      "High per-liter cost of branded industrial lubricants from major OEMs",
      "Difficulty sourcing ISO VG grades not stocked by local distributors",
      "Need for OEM approval documentation for warranty compliance",
      "Inconsistent lead times causing unplanned production downtime",
    ],
    solutions: [
      { title: "Full Industrial Lubricant Range Under One Supplier", desc: "Hydraulic oils (ISO VG 32/46/68/100), gear oils (GL-4/GL-5), compressor oils (ISO VG 46/68/100), greases, and metalworking fluids. Consolidate procurement." },
      { title: "ISO VG Grade Matching", desc: "We stock or can formulate any ISO VG grade to DIN 51524, ISO 6743, or manufacturer specification. Our technical team reviews your equipment OEM spec before recommending products." },
      { title: "Long-Term Supply Agreements", desc: "Annual supply agreements with quarterly delivery scheduling. Consistent pricing, consistent specification, dedicated account manager." },
      { title: "Technical Expertise", desc: "Our lubricants engineers can review your current product slate and identify consolidation opportunities — often reducing the number of lubricant grades needed without compromising performance." },
    ],
    featuredProducts: [
      { name: "ISO VG 46 Hydraulic Oil", grade: "ISO VG 46", api: "DIN 51524-2 HLP", slug: "hydraulic-oil-iso-46", category: "industrial-lubricants" },
      { name: "Gear Oil GL-5 SAE 90", grade: "SAE 90", api: "API GL-5", slug: "gear-oil-gl5-sae90", category: "industrial-lubricants" },
      { name: "Compressor Oil ISO 100", grade: "ISO VG 100", api: "ISO 6743/3A DAG", slug: "compressor-oil-iso-100", category: "industrial-lubricants" },
    ],
    testimonialQuote:
      "We consolidated from seven separate lubricant suppliers down to two — Model Oils for our hydraulic and gear oils, and our existing grease supplier. The cost reduction was significant, and technical support has been excellent.",
    testimonialName: "Dmitri K.",
    testimonialRole: "Procurement Manager, Eastern European Manufacturing Group",
    faq: [
      { q: "Do you supply lubricants to ISO 6743 classification?", a: "Yes. Our industrial lubricant range covers ISO 6743 categories including HLP hydraulic fluids, CKD gear oils, VDL compressor oils, and others. Specify the ISO category in your quote request." },
      { q: "Can you cross-reference against major OEM lubricant specifications?", a: "Yes. Our technical team maintains cross-reference tables against Bosch Rexroth, Parker, Sauer-Danfoss, and other major hydraulic OEM specifications. Share your current product list and we'll match equivalents." },
      { q: "What is the lead time for industrial lubricants?", a: "Standard grades are available from stock with 5–10 working day lead time for export orders. Custom or unusual ISO VG grades require 15–20 working days from order confirmation." },
      { q: "Do you offer a lubricant audit service?", a: "Yes. For qualified buyers considering a supply agreement, we offer a complimentary lubricant portfolio review — we analyze your current product slate, usage volumes, and OEM requirements and produce a consolidation recommendation." },
    ],
  },

  "lubricant-importers": {
    title: "Lubricant Importers",
    metaTitle: "Lubricant Import Partner — Reliable Turkish Exporter | Model Oils",
    metaDescription:
      "Partner with a reliable Turkish lubricant exporter for motor oils, mineral oils, and industrial lubricants. Full documentation, competitive FOB/CIF pricing, ISO certified. Request importer terms.",
    eyebrow: "Solutions for Lubricant Importers",
    headline: "A Reliable Turkish Export Partner for Lubricant Importers",
    subheadline:
      "Istanbul-based lubricant exporter with 15+ years of international trade experience. Consistent product quality, competitive FOB/CIF pricing, full customs documentation, and dedicated export management for importers.",
    painPoints: [
      "Difficulty finding a reliable manufacturer that also handles export documentation",
      "Quality inconsistency between batches from trading companies",
      "Complex import compliance documentation requirements",
      "High minimum order quantities from major lubricant brands",
      "Limited flexibility on Incoterms and payment terms",
    ],
    solutions: [
      { title: "Direct Manufacturer, Not a Trading Company", desc: "We blend and package lubricants in our Istanbul facility. No intermediary, no margin stacking, no quality variability from multiple production sources." },
      { title: "Complete Export Documentation In-House", desc: "Our dedicated trade compliance team prepares every document required for your import clearance — no delays waiting for third-party documentation providers." },
      { title: "Flexible Incoterms and Payment Terms", desc: "EXW, FOB, CFR, CIF, DAP, or DDP. T/T or L/C at sight. First order typically 30%/70% T/T; established buyers can negotiate net terms." },
      { title: "Dedicated Export Account Manager", desc: "Single point of contact from order confirmation to delivery at destination port. Proactive updates on production, loading, and estimated arrival." },
    ],
    featuredProducts: [
      { name: "SAE 15W-40 HD Engine Oil", grade: "15W-40", api: "API CK-4", slug: "sae-15w40-engine-oil", category: "motor-oils" },
      { name: "White Mineral Oil Pharmaceutical Grade", grade: "Ph. Eur.", api: "Ph. Eur. / USP", slug: "white-mineral-oil-pharmaceutical", category: "mineral-oils" },
      { name: "ISO VG 46 Hydraulic Oil", grade: "ISO VG 46", api: "DIN 51524 HLP", slug: "hydraulic-oil-iso-46", category: "industrial-lubricants" },
    ],
    testimonialQuote:
      "As an importer handling customs clearance in three different countries, documentation accuracy is critical for us. Model Oils has not had a single documentation error in 23 shipments across 18 months.",
    testimonialName: "Priya N.",
    testimonialRole: "Import & Logistics Manager, Southeast Asia",
    faq: [
      { q: "Are you a manufacturer or a trading company?", a: "We are a manufacturer and exporter. All blending and packaging takes place at our Istanbul facility. We do not resell third-party products." },
      { q: "What are your typical lead times?", a: "Standard stock products: 5–7 working days from proforma invoice confirmation. Custom formulations or private label: 15–20 working days. Production schedule is confirmed at order placement." },
      { q: "Can you prepare documentation for specific country import requirements?", a: "Yes. We have experience exporting to 40+ countries and maintain current knowledge of country-specific requirements for MENA, Africa, Southeast Asia, and European markets. Specify destination on the quote form." },
      { q: "Do you have an existing importer in my country?", a: "We work directly with importers in most markets. We do not maintain exclusivity by default — exclusivity agreements are available for importers committing to minimum annual volumes. Contact us for market-specific discussion." },
    ],
  },
};

interface SolutionPageProps {
  params: Promise<{ locale: string; persona: string }>;
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { persona } = await params;
  const data = PERSONAS[persona];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { persona } = await params;
  const data = PERSONAS[persona];
  if (!data) notFound();

  const ts = await getTranslations("solutions");
  const PERSONA_KEY: Record<string, string> = {
    "fleet-operators": "fleet",
    "automotive-distributors": "distributors",
    "industrial-companies": "industrial",
    "lubricant-importers": "importers",
  };
  const msgKey = PERSONA_KEY[persona];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = (msgKey ? ts.raw(msgKey as any) : undefined) as Record<string, string> | undefined ?? {};

  const title       = (p.title       ?? data.title);
  const eyebrow     = (p.eyebrow     ?? data.eyebrow);
  const headline    = (p.headline    ?? data.headline);
  const subheadline = (p.subheadline ?? data.subheadline);
  const painPoints  = [p.p1, p.p2, p.p3, p.p4, p.p5].filter(Boolean) as string[];
  const solutions   = [
    { title: p.s1t ?? data.solutions[0]?.title, desc: p.s1d ?? data.solutions[0]?.desc },
    { title: p.s2t ?? data.solutions[1]?.title, desc: p.s2d ?? data.solutions[1]?.desc },
    { title: p.s3t ?? data.solutions[2]?.title, desc: p.s3d ?? data.solutions[2]?.desc },
    { title: p.s4t ?? data.solutions[3]?.title, desc: p.s4d ?? data.solutions[3]?.desc },
  ].filter((s) => s.title);
  const faq = [
    { q: p.faq1q ?? data.faq[0]?.q, a: p.faq1a ?? data.faq[0]?.a },
    { q: p.faq2q ?? data.faq[1]?.q, a: p.faq2a ?? data.faq[1]?.a },
    { q: p.faq3q ?? data.faq[2]?.q, a: p.faq3a ?? data.faq[2]?.a },
    { q: p.faq4q ?? data.faq[3]?.q, a: p.faq4a ?? data.faq[3]?.a },
  ].filter((f) => f.q);
  const testimonialQuote = p.testimonial     ?? data.testimonialQuote;
  const testimonialName  = p.testimonialName ?? data.testimonialName;
  const testimonialRole  = p.testimonialRole ?? data.testimonialRole;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.modeloils.com/solutions" },
      { "@type": "ListItem", position: 3, name: data.title, item: `https://www.modeloils.com/solutions/${persona}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500 flex-wrap">
              <li><Link href="/" className="hover:text-brand-300">{ts("breadcrumbHome")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/solutions" className="hover:text-brand-300">{ts("breadcrumbSolutions")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">{title}</li>
            </ol>
          </nav>
          <SectionHeader
            eyebrow={eyebrow}
            headline={headline}
            subheadline={subheadline}
            alignment="left"
            dark
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">{ts("requestQuote")}</Link>
            </Button>
            <Button asChild size="md" variant="outline">
              <Link href="/products">{ts("browseCatalog")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pain points + solutions */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Pain points */}
            <div>
              <h2 className="text-lg font-bold text-brand-900 mb-5">{ts("challengesTitle")}</h2>
              <ul className="space-y-3">
                {(painPoints.length > 0 ? painPoints : data.painPoints).map((pain) => (
                  <li key={pain} className="flex items-start gap-3 bg-white border border-brand-200 rounded-xl px-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-2 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-brand-700">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-lg font-bold text-brand-900 mb-5">{ts("solutionsTitle")}</h2>
              <div className="space-y-4">
                {(solutions.length > 0 ? solutions : data.solutions).map((sol) => (
                  <div key={sol.title} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-brand-900">{sol.title}</p>
                      <p className="text-sm text-brand-600 mt-0.5 leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-12 border-y border-brand-100">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-6">{ts("recommendedTitle", { title })}</h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {data.featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.category}/${product.slug}`}
                className="group bg-brand-50 border border-brand-200 rounded-xl p-5 hover:border-accent-600 hover:shadow-md transition-all"
              >
                <div className="flex gap-2 mb-3">
                  <Badge variant="amber">{product.grade}</Badge>
                  <Badge variant="default">{product.api.split("/")[0]?.trim()}</Badge>
                </div>
                <p className="text-sm font-semibold text-brand-900 group-hover:text-accent-600 transition-colors">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
          <Button asChild size="sm" variant="outline" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            <Link href="/products">{ts("viewFullCatalog")}</Link>
          </Button>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-brand-900 py-12">
        <div className="container-lg">
          <blockquote className="text-center">
            <p className="text-white text-lg font-medium leading-relaxed mb-6 max-w-[680px] mx-auto">
              &ldquo;{testimonialQuote}&rdquo;
            </p>
            <footer>
              <p className="text-accent-400 font-semibold text-sm">{testimonialName}</p>
              <p className="text-brand-500 text-xs mt-0.5">{testimonialRole}</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-50 py-12">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">{ts("faqTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-[900px]">
            {(faq.length > 0 ? faq : data.faq).map((item) => (
              <div key={item.q} className="space-y-2">
                <h3 className="text-sm font-semibold text-brand-900">{item.q}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-12 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{ts("ctaTitle")}</h2>
          <p className="text-brand-300 mb-6 text-sm">{ts("ctaBody")}</p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{ts("ctaBtn")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
