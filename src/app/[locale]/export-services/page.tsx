import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations,
  setRequestLocale} from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, CheckCircle, Package, FileText, Globe, Truck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Lubricant Export Services — Shipping, Documentation & Compliance",
  description:
    "Model Oils provides full-service lubricant export: FOB/CIF/DAP/DDP shipping, ISO documentation, COA, MSDS, certificates of origin. Container loading from Istanbul to 40+ countries.",
};

const CONTAINER_DATA = {
  rows: [
    ["205L Steel Drums", "80 drums", "168 drums", "16,400L / 34,440L"],
    ["1,000L IBC", "16 units", "20 units", "16,000L / 20,000L"],
    ["20L Plastic Pails", "960 pails", "2,016 pails", "19,200L / 40,320L"],
    ["Bulk Flexi-Tank", "1 unit (20ft)", "N/A", "Up to 21,000L"],
  ],
};

const DOCUMENTS = [
  "Commercial Invoice (proforma and final)",
  "Packing List",
  "Bill of Lading (Ocean) / Airway Bill",
  "Certificate of Origin (Chamber of Commerce attested)",
  "MSDS / Safety Data Sheet (SDS)",
  "Technical Data Sheet (TDS)",
  "Certificate of Analysis (COA) — batch-specific",
  "ISPM-15 Phytosanitary Declaration (for wooden pallets)",
  "Fumigation Certificate (on request)",
  "Halal Certificate (on request)",
  "SASO Certificate of Conformity (Saudi Arabia)",
];

const EXPORT_REGIONS = [
  { region: "MENA", countries: "Saudi Arabia, UAE, Egypt, Iraq, Jordan, Kuwait, Qatar, Oman, Libya, Morocco, Tunisia", highlight: true },
  { region: "Sub-Saharan Africa", countries: "Nigeria, Kenya, Ghana, Tanzania, Ethiopia, Ivory Coast, Senegal, Cameroon, DRC", highlight: false },
  { region: "Southeast Asia", countries: "Indonesia, Vietnam, Thailand, Philippines, Malaysia, Bangladesh, Pakistan", highlight: false },
  { region: "Central Asia & CIS", countries: "Kazakhstan, Uzbekistan, Azerbaijan, Georgia, Ukraine", highlight: false },
  { region: "Europe", countries: "Romania, Bulgaria, Poland, Hungary, Serbia, Albania, Bosnia", highlight: false },
  { region: "Latin America", countries: "Colombia, Chile, Peru, Ecuador, Bolivia — ongoing expansion", highlight: false },
];


interface ExportServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ExportServicesPage({ params }: ExportServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("exportSvc");

  const capabilities = [
    { icon: Package, title: t("c1Title"), desc: t("c1Desc") },
    { icon: Globe, title: t("c2Title"), desc: t("c2Desc") },
    { icon: FileText, title: t("c3Title"), desc: t("c3Desc") },
    { icon: Truck, title: t("c4Title"), desc: t("c4Desc") },
    { icon: ShieldCheck, title: t("c5Title"), desc: t("c5Desc") },
    { icon: CheckCircle, title: t("c6Title"), desc: t("c6Desc") },
  ];

  const incoterms = [
    { term: "EXW", name: t("exw"), desc: t("exwDesc") },
    { term: "FOB", name: t("fob"), desc: t("fobDesc") },
    { term: "CFR", name: t("cfr"), desc: t("cfrDesc") },
    { term: "CIF", name: t("cif"), desc: t("cifDesc") },
    { term: "DAP", name: t("dap"), desc: t("dapDesc") },
    { term: "DDP", name: t("ddp"), desc: t("ddpDesc") },
  ];

  const containerHeaders = [t("thPackaging"), t("th20ft"), t("th40ft"), t("thVolume")];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Export Services", item: "https://www.modeloils.com/export-services" },
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
        </div>
      </section>

      {/* Core capabilities */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">{t("capTitle")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-white border border-brand-200 rounded-xl p-6 hover:border-accent-600 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center mb-4">
                  <cap.icon className="h-5 w-5 text-accent-500" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-brand-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Container loading table */}
      <section className="bg-white py-12 border-y border-brand-100" id="container-loading">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-2">{t("containerTitle")}</h2>
          <p className="text-brand-500 text-sm mb-6">{t("containerNote")}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Container loading specifications">
              <thead>
                <tr className="bg-brand-900 text-left">
                  {containerHeaders.map((h) => (
                    <th key={h} className="text-brand-300 font-semibold px-4 py-3 text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONTAINER_DATA.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-brand-50"}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 border-b border-brand-100 ${
                          j === 0 ? "font-medium text-brand-700" : "font-mono text-brand-900"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-500 mt-3">{t("containerFootnote")}</p>
        </div>
      </section>

      {/* Incoterms */}
      <section className="bg-brand-50 py-12" id="incoterms">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-2">{t("incotermsTitle")}</h2>
          <p className="text-brand-500 text-sm mb-6">{t("incotermsNote")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incoterms.map((item) => (
              <div key={item.term} className="bg-white border border-brand-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm font-bold text-accent-600 bg-accent-100/50 px-2 py-0.5 rounded">
                    {item.term}
                  </span>
                  <span className="text-xs text-brand-500">{item.name}</span>
                </div>
                <p className="text-sm text-brand-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation package */}
      <section className="bg-brand-900 py-12 hex-texture" id="documentation">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">{t("docTitle")}</h2>
              <p className="text-brand-300 text-sm leading-relaxed mb-6">{t("docNote")}</p>
              <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/contact/request-quote">{t("docCta")}</Link>
              </Button>
            </div>
            <ul className="space-y-2">
              {DOCUMENTS.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-accent-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-brand-300 text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Export regions */}
      <section className="bg-white py-12 border-t border-brand-100" id="regions">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-2">{t("regionsTitle")}</h2>
          <p className="text-brand-500 text-sm mb-8">{t("regionsNote")}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPORT_REGIONS.map((region) => (
              <div
                key={region.region}
                className={`rounded-xl p-5 border ${
                  region.highlight ? "bg-brand-900 border-brand-700" : "bg-brand-50 border-brand-200"
                }`}
              >
                <p className={`text-sm font-bold mb-2 ${region.highlight ? "text-accent-400" : "text-brand-900"}`}>
                  {region.region}
                </p>
                <p className={`text-xs leading-relaxed ${region.highlight ? "text-brand-400" : "text-brand-600"}`}>
                  {region.countries}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment terms */}
      <section className="bg-brand-50 py-10 border-t border-brand-100">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-6">{t("paymentTitle")}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white border border-brand-200 rounded-xl p-5">
              <p className="text-sm font-bold text-brand-900 mb-1">{t("ttTitle")}</p>
              <p className="text-xs text-brand-600 leading-relaxed">{t("ttDesc")}</p>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5">
              <p className="text-sm font-bold text-brand-900 mb-1">{t("lcTitle")}</p>
              <p className="text-xs text-brand-600 leading-relaxed">{t("lcDesc")}</p>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5">
              <p className="text-sm font-bold text-brand-900 mb-1">{t("netTitle")}</p>
              <p className="text-xs text-brand-600 leading-relaxed">{t("netDesc")}</p>
            </div>
          </div>
          <p className="text-xs text-brand-500 mt-4">{t("currencyNote")}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-12 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-brand-300 mb-6 text-sm">{t("ctaBody")}</p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{t("ctaBtn")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
