import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations,
  setRequestLocale} from "next-intl/server";
import { getCertifications } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Download, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Certifications & Compliance — ISO 9001, API, ACEA | Model Oils",
  description:
    "Model Oils holds ISO 9001:2015, ISO 14001:2015, API, and ACEA certifications. Download certificate scans and compliance documentation. Trusted by procurement teams in 40+ countries.",
};

const FALLBACK_CERTS = [
  {
    _id: "1",
    abbreviation: "ISO 9001",
    name: "ISO 9001:2015 Quality Management System",
    description:
      "Our production, blending, and export operations are certified to ISO 9001:2015 — the international standard for quality management systems. Certificate number: QMS-2024-XXXX. Valid through December 2026.",
    scope: "Blending, packaging, and export of lubricants and industrial oils",
    issuingBody: "Bureau Veritas (BV)",
    certificateNumber: "QMS-2024-XXXX",
    validUntil: "2026-12-31",
    logo: null,
  },
  {
    _id: "2",
    abbreviation: "ISO 14001",
    name: "ISO 14001:2015 Environmental Management System",
    description:
      "Our environmental management system meets ISO 14001:2015 requirements, demonstrating commitment to minimizing environmental impact across all operations.",
    scope: "Manufacturing and export operations at Istanbul facility",
    issuingBody: "Bureau Veritas (BV)",
    certificateNumber: "EMS-2024-XXXX",
    validUntil: "2026-12-31",
    logo: null,
  },
  {
    _id: "3",
    abbreviation: "API",
    name: "American Petroleum Institute (API) Engine Oil Licensing",
    description:
      "Selected products carry API licensing for service categories SN, SN+, CF, CJ-4, and CK-4. API donut marks are present on licensed product labels. Verification available via the API Product Compliance Database.",
    scope: "Licensed passenger car motor oils and commercial diesel engine oils",
    issuingBody: "American Petroleum Institute",
    certificateNumber: "N/A — per-product license",
    validUntil: "Annually renewed",
    logo: null,
  },
  {
    _id: "4",
    abbreviation: "ACEA",
    name: "ACEA European Oil Sequences",
    description:
      "Our European-market motor oils are formulated and tested to ACEA A3/B4, C3, E7, and E9 sequences. ACEA compliance is verified through independent accredited laboratory testing.",
    scope: "Motor oils for European OEM approvals",
    issuingBody: "European Automobile Manufacturers' Association (ACEA)",
    certificateNumber: "Lab report available on request",
    validUntil: "Per batch — COA provided",
    logo: null,
  },
  {
    _id: "5",
    abbreviation: "SGS",
    name: "SGS Inspection & Verification",
    description:
      "Pre-shipment inspection services by SGS are available on request for large container orders. SGS issues an Independent Inspection Report confirming product specification compliance before loading.",
    scope: "Pre-shipment product inspection for bulk export orders",
    issuingBody: "SGS Group",
    certificateNumber: "Per-shipment",
    validUntil: "Per-shipment",
    logo: null,
  },
  {
    _id: "6",
    abbreviation: "REACH",
    name: "EU REACH Compliance",
    description:
      "Our products comply with EU Regulation No 1907/2006 (REACH). Safety Data Sheets (SDS) are prepared in accordance with REACH Annex II and are available in English. Country-specific language SDS available on request.",
    scope: "All products exported to EU member states",
    issuingBody: "European Chemicals Agency (ECHA)",
    certificateNumber: "SDS available per product",
    validUntil: "Ongoing compliance",
    logo: null,
  },
];

const COMPLIANCE_DOCS = [
  { label: "ISO 9001:2015 Certificate", available: true },
  { label: "ISO 14001:2015 Certificate", available: true },
  { label: "Certificate of Analysis (COA) — per batch", available: true },
  { label: "Material Safety Data Sheet (MSDS/SDS)", available: true },
  { label: "Technical Data Sheet (TDS) — per product", available: true },
  { label: "Certificate of Origin (Chamber attested)", available: true },
  { label: "Halal Certificate", available: true },
  { label: "SASO Certificate of Conformity", available: true },
  { label: "Fumigation Certificate", available: true },
  { label: "API License Documentation", available: true },
  { label: "REACH Compliance Declaration", available: true },
  { label: "Phytosanitary / ISPM-15 Declaration", available: true },
];


interface CertificationsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CertificationsPage({ params }: CertificationsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("certPage");
  const certifications = await getCertifications().catch(() => []);
  const displayCerts = certifications.length > 0 ? certifications : FALLBACK_CERTS;

  const qaSteps = [
    { step: "01", title: t("qa1Title"), desc: t("qa1Desc") },
    { step: "02", title: t("qa2Title"), desc: t("qa2Desc") },
    { step: "03", title: t("qa3Title"), desc: t("qa3Desc") },
    { step: "04", title: t("qa4Title"), desc: t("qa4Desc") },
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Certifications", item: "https://www.modeloils.com/certifications" },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="md" rightIcon={<Download className="h-4 w-4" />} variant="outline">
              <Link href="/contact?docs=certification-package">{t("reqDocPkg")}</Link>
            </Button>
            <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/contact/request-quote">{t("reqBulkQuote")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Certification badge strip */}
      <section className="bg-white border-b border-brand-100 py-6">
        <div className="container-xl">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider shrink-0">
              {t("certCompliant")}
            </span>
            {["ISO 9001:2015", "ISO 14001:2015", "API SN / CK-4", "ACEA E7 / C3", "SGS Verified", "REACH Compliant"].map((cert) => (
              <span
                key={cert}
                className="text-xs font-mono font-bold text-accent-600 bg-accent-100/50 border border-accent-200 px-3 py-1.5 rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Certification detail cards */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">{t("ourCertsTitle")}</h2>
          <div className="grid gap-5">
            {displayCerts.map((cert) => (
              <div
                key={cert._id}
                className="bg-white border border-brand-200 rounded-xl p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Badge */}
                  <div className="w-16 h-16 rounded-xl bg-brand-900 border border-brand-700 flex items-center justify-center shrink-0">
                    <span className="text-accent-400 font-mono font-bold text-xs text-center leading-tight px-1">
                      {cert.abbreviation}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-brand-900 mb-2">{cert.name}</h3>
                    <p className="text-sm text-brand-600 leading-relaxed mb-4">
                      {"description" in cert ? (cert.description as string) : ""}
                    </p>

                    {"scope" in cert && (
                      <div className="grid sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-brand-500 font-medium block mb-0.5">{t("scopeLabel")}</span>
                          <span className="text-brand-700">{"scope" in cert ? (cert.scope as string) : ""}</span>
                        </div>
                        <div>
                          <span className="text-brand-500 font-medium block mb-0.5">{t("issuingBodyLabel")}</span>
                          <span className="text-brand-700">{"issuingBody" in cert ? (cert.issuingBody as string) : ""}</span>
                        </div>
                        <div>
                          <span className="text-brand-500 font-medium block mb-0.5">{t("validUntilLabel")}</span>
                          <span className="text-brand-700">{"validUntil" in cert ? (cert.validUntil as string) : ""}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Download placeholder */}
                  <div className="shrink-0">
                    <Button asChild size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>
                      <Link href={`/contact?cert=${encodeURIComponent(cert.abbreviation)}`}>
                        {t("requestCopy")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available documents */}
      <section className="bg-brand-900 py-12 hex-texture">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-6 w-6 text-accent-500" aria-hidden="true" />
                <h2 className="text-xl font-bold text-white">{t("docsTitle")}</h2>
              </div>
              <p className="text-brand-300 text-sm leading-relaxed mb-6">{t("docsNote")}</p>
              <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/contact/request-quote">{t("docsCta")}</Link>
              </Button>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {COMPLIANCE_DOCS.map((doc) => (
                <li key={doc.label} className="flex items-center gap-2.5">
                  <CheckCircle
                    className={`h-4 w-4 shrink-0 ${doc.available ? "text-accent-500" : "text-brand-600"}`}
                    aria-hidden="true"
                  />
                  <span className={`text-sm ${doc.available ? "text-brand-200" : "text-brand-500"}`}>
                    {doc.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quality process */}
      <section className="bg-white py-12 border-t border-brand-100">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">{t("qaTitle")}</h2>
          <div className="grid sm:grid-cols-4 gap-5">
            {qaSteps.map((item) => (
              <div key={item.step} className="relative">
                <span className="text-4xl font-bold text-brand-100 leading-none block mb-3">{item.step}</span>
                <h3 className="text-sm font-bold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-xs text-brand-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
