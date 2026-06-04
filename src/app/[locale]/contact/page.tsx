import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Model Oils — Export Team & Technical Support",
  description:
    "Contact Model Oils for bulk lubricant inquiries, technical product matching, or export documentation support. WhatsApp, email, and phone. 24-hour response guaranteed.",
};

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    label: "WhatsApp (Fastest)",
    value: "+90 533 456 7975",
    href: "https://wa.me/905334567975?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20bulk%20lubricant%20order.",
    description: "Preferred channel for international clients. Typically responds within 2 hours.",
    external: true,
    highlight: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+90 533 456 7975",
    href: "tel:+905334567975",
    description: "Mon–Fri, 09:00–17:00 (GMT+3). English and Turkish spoken.",
    external: false,
    highlight: false,
  },
  {
    icon: Mail,
    label: "General Inquiries",
    value: "info@modeloils.com",
    href: "mailto:info@modeloils.com",
    description: "General questions, partnership proposals, media inquiries.",
    external: false,
    highlight: false,
  },
  {
    icon: Mail,
    label: "Export & Sales",
    value: "info@modeloils.com",
    href: "mailto:info@modeloils.com",
    description: "For bulk quotes, shipping logistics, and documentation requests.",
    external: false,
    highlight: false,
  },
];

const INQUIRY_TYPES = [
  {
    title: "Request a Bulk Quote",
    desc: "Get pricing for motor oils, mineral oils, or industrial lubricants. Includes full spec sheet and documentation package.",
    href: "/contact/request-quote",
    cta: "Start Quote Form",
  },
  {
    title: "Technical Product Matching",
    desc: "Not sure which product is right for your application? Our engineers will match the correct specification to your equipment, OEM requirements, and climate.",
    href: "/contact/request-quote",
    cta: "Request Technical Review",
  },
  {
    title: "Documentation & Compliance",
    desc: "Need ISO certificates, COA, MSDS, Halal certificates, or country-specific compliance documents? We prepare all standard export documentation in-house.",
    href: "/certifications",
    cta: "View Certifications",
  },
  {
    title: "Become a Distributor",
    desc: "Interested in exclusive distribution rights for your region? We partner with established lubricant distributors and importers worldwide.",
    href: "/contact/request-quote",
    cta: "Partner With Us",
  },
];

export default function ContactPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.modeloils.com/contact" },
    ],
  };

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Model Oils",
    url: "https://www.modeloils.com/contact",
    description: "Contact page for Model Oils export team",
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={contactPage} />

      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-16 hex-texture">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-brand-500">
              <li><Link href="/" className="hover:text-brand-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-300">Contact</li>
            </ol>
          </nav>
          <div className="max-w-[600px]">
            <p className="text-accent-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Contact Our Export Team
            </h1>
            <p className="text-brand-300 text-lg leading-relaxed">
              Whether you need a bulk quote, technical product matching, or export documentation — our team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry type cards */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">How Can We Help?</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {INQUIRY_TYPES.map((type) => (
              <div
                key={type.title}
                className="bg-white border border-brand-200 rounded-xl p-6 flex flex-col"
              >
                <h3 className="text-base font-bold text-brand-900 mb-2">{type.title}</h3>
                <p className="text-sm text-brand-600 leading-relaxed mb-5 flex-1">{type.desc}</p>
                <Button asChild size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  <Link href={type.href}>{type.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact methods + address */}
      <section className="bg-white py-12 border-t border-brand-100">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact channels */}
            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-6">Direct Contact</h2>
              <div className="space-y-4">
                {CONTACT_METHODS.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className={`flex gap-4 p-4 rounded-xl border transition-all hover:shadow-md group ${
                      method.highlight
                        ? "border-whatsapp/30 bg-[#25D366]/5 hover:border-whatsapp/50"
                        : "border-brand-200 hover:border-brand-300"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        method.highlight ? "bg-[#25D366]" : "bg-brand-900"
                      }`}
                    >
                      <method.icon
                        className={`h-5 w-5 ${method.highlight ? "text-white" : "text-accent-500"}`}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-brand-500 font-medium">{method.label}</p>
                      <p
                        className={`font-semibold text-sm mt-0.5 ${
                          method.highlight ? "text-whatsapp" : "text-brand-900"
                        }`}
                      >
                        {method.value}
                      </p>
                      <p className="text-xs text-brand-500 mt-1 leading-relaxed">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Office address + hours */}
            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-6">Office & Operations</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-accent-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-900 mb-1">Headquarters</p>
                    <address className="text-sm text-brand-600 not-italic leading-relaxed">
                      Model Oils<br />
                      Üçevler Mah. İzmir Yolu Cad. No: 241/334<br />
                      Nilüfer / Bursa<br />
                      Türkiye
                    </address>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-accent-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-900 mb-1">Business Hours</p>
                    <div className="text-sm text-brand-600 space-y-0.5">
                      <p>Monday – Friday: 09:00 – 17:00 (GMT+3)</p>
                      <p>Saturday: 09:00 – 13:00 (GMT+3)</p>
                      <p>Sunday & Turkish Public Holidays: Closed</p>
                    </div>
                    <p className="text-xs text-brand-500 mt-2">
                      WhatsApp available 24/7 for urgent export inquiries.
                    </p>
                  </div>
                </div>

                {/* Response commitment */}
                <div className="bg-brand-900 rounded-xl p-5">
                  <p className="text-white text-sm font-semibold mb-1">Our Response Commitment</p>
                  <p className="text-brand-300 text-xs leading-relaxed">
                    All quote requests submitted via the form are acknowledged within 2 hours during business hours and receive a full quotation within 24–48 business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <section className="bg-brand-900 py-10 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-xl font-bold text-white mb-3">Ready to Get a Quote?</h2>
          <p className="text-brand-300 text-sm mb-6">
            Use our structured quote form for the fastest response from our export team.
          </p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">Start Quote Request</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
