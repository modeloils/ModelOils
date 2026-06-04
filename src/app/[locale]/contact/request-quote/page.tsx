import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/features/quote/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckCircle, Clock, FileText, Shield, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Bulk Quote — Lubricant Export | Model Oils",
  description:
    "Request a wholesale quote for motor oils, mineral oils, or industrial lubricants. ISO certified supplier. 24-hour response. Bulk export worldwide. Fill in your requirements to get started.",
};

interface Props {
  searchParams: Promise<{ product?: string }>;
}

const TRUST_ITEMS = [
  {
    icon: Clock,
    title: "24-Hour Response",
    desc: "Our export team reviews every inquiry within one business day.",
  },
  {
    icon: FileText,
    title: "Full Documentation Package",
    desc: "COA, MSDS, Certificate of Origin, and country-specific compliance documents included.",
  },
  {
    icon: Shield,
    title: "ISO 9001:2015 Certified",
    desc: "Every batch is tested against specification before shipment.",
  },
  {
    icon: CheckCircle,
    title: "No Commitment Required",
    desc: "A quote is just information. You decide whether to proceed.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the minimum order quantity?",
    a: "Our minimum bulk order starts at 1,000 liters (typically 5× 205L drums). For IBC quantities, minimum is 1 unit (1,000L). Bulk tanker from 20,000L.",
  },
  {
    q: "How long does it take to receive a quotation?",
    a: "Standard turnaround is 24–48 business hours. Complex multi-product or custom spec inquiries may take slightly longer.",
  },
  {
    q: "Which Incoterms do you offer?",
    a: "We support EXW, FOB, CFR, CIF, DAP, and DDP. Your preferred Incoterm should be noted in the Additional Notes field.",
  },
  {
    q: "Can you supply API and ACEA certified products?",
    a: "Yes. Our motor oil range carries API SN, SN+, CF, CK-4 and ACEA A3/B4, C3, E7, E9 certifications. Specific approvals are listed on each product page.",
  },
];

export default async function RequestQuotePage({ searchParams }: Props) {
  const { product } = await searchParams;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.modeloils.com/contact" },
      { "@type": "ListItem", position: 3, name: "Request a Quote", item: "https://www.modeloils.com/contact/request-quote" },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Page hero */}
      <section className="bg-brand-900 pt-32 pb-12 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/contact" className="hover:text-brand-300">Contact</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">Request a Quote</li>
            </ol>
          </nav>
          <div className="max-w-[640px]">
            <p className="text-accent-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Bulk Export Inquiry
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              Request a Bulk Quote
            </h1>
            <p className="text-brand-300 text-base leading-relaxed">
              Fill in your product requirements below. Our export team responds within 24 business hours with competitive pricing, full specification sheets, and export documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Form + trust signals */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* Quote form */}
            <div>
              <QuoteForm {...(product !== undefined && { defaultProductSpec: product })} />
            </div>

            {/* Trust sidebar */}
            <aside className="space-y-6">
              {/* Trust items */}
              <div className="bg-white border border-brand-200 rounded-xl p-6 space-y-5">
                <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
                  What Happens Next
                </h2>
                {TRUST_ITEMS.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-accent-500" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-900">{item.title}</p>
                      <p className="text-xs text-brand-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct contact */}
              <div className="bg-brand-900 rounded-xl p-6 space-y-4">
                <p className="text-white font-semibold text-sm">Prefer to speak directly?</p>
                <a
                  href="https://wa.me/905334567975?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20bulk%20lubricant%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-whatsapp text-sm font-medium hover:brightness-110 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp: +90 533 456 7975
                </a>
                <a
                  href="tel:+905334567975"
                  className="flex items-center gap-2.5 text-brand-300 text-sm hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +90 533 456 7975
                </a>
                <p className="text-brand-500 text-xs">
                  Available Mon–Fri, 09:00–17:00 (GMT+3). WhatsApp preferred for international calls.
                </p>
              </div>

              {/* Certifications mini-display */}
              <div className="bg-white border border-brand-200 rounded-xl p-6">
                <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-4">Certified Supplier</p>
                <div className="flex flex-wrap gap-2">
                  {["ISO 9001:2015", "ISO 14001:2015", "API CI-4", "ACEA E7", "SGS Verified"].map((cert) => (
                    <span
                      key={cert}
                      className="text-xs font-mono font-semibold bg-brand-900 text-accent-400 px-2.5 py-1 rounded-md"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 border-t border-brand-100">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-[900px]">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="space-y-2">
                <h3 className="text-sm font-semibold text-brand-900">{item.q}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
