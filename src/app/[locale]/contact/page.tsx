import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations,
  setRequestLocale} from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Model Oils — Export Team & Technical Support",
  description:
    "Contact Model Oils for bulk lubricant inquiries, technical product matching, or export documentation support. WhatsApp, email, and phone. 24-hour response guaranteed.",
};


interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

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

  const contactMethods = [
    {
      icon: MessageCircle,
      label: t("cm1Label"),
      value: "+90 533 456 7975",
      href: "https://wa.me/905334567975?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20bulk%20lubricant%20order.",
      description: t("cm1Desc"),
      external: true,
      highlight: true,
    },
    {
      icon: Phone,
      label: t("cm2Label"),
      value: "+90 533 456 7975",
      href: "tel:+905334567975",
      description: t("cm2Desc"),
      external: false,
      highlight: false,
    },
    {
      icon: Mail,
      label: t("cm3Label"),
      value: "info@modeloils.com",
      href: "mailto:info@modeloils.com",
      description: t("cm3Desc"),
      external: false,
      highlight: false,
    },
    {
      icon: Mail,
      label: t("cm4Label"),
      value: "info@modeloils.com",
      href: "mailto:info@modeloils.com",
      description: t("cm4Desc"),
      external: false,
      highlight: false,
    },
  ];

  const inquiryTypes = [
    { title: t("iq1Title"), desc: t("iq1Desc"), href: "/contact/request-quote", cta: t("iq1Cta") },
    { title: t("iq2Title"), desc: t("iq2Desc"), href: "/contact/request-quote", cta: t("iq2Cta") },
    { title: t("iq3Title"), desc: t("iq3Desc"), href: "/certifications", cta: t("iq3Cta") },
    { title: t("iq4Title"), desc: t("iq4Desc"), href: "/contact/request-quote", cta: t("iq4Cta") },
  ];

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={contactPage} />

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
          <div className="max-w-[600px]">
            <p className="text-accent-500 text-xs font-semibold uppercase tracking-widest mb-3">
              {t("eyebrow")}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {t("headline")}
            </h1>
            <p className="text-brand-300 text-lg leading-relaxed">{t("subheadline")}</p>
          </div>
        </div>
      </section>

      {/* Inquiry type cards */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <h2 className="text-xl font-bold text-brand-900 mb-8">{t("inquiriesTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {inquiryTypes.map((type) => (
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
              <h2 className="text-xl font-bold text-brand-900 mb-6">{t("directContact")}</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
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
              <h2 className="text-xl font-bold text-brand-900 mb-6">{t("officeTitle")}</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-accent-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-900 mb-1">{t("hqTitle")}</p>
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
                    <p className="text-sm font-semibold text-brand-900 mb-1">{t("hoursTitle")}</p>
                    <div className="text-sm text-brand-600 space-y-0.5">
                      <p>{t("weekday")}</p>
                      <p>{t("saturday")}</p>
                      <p>{t("sunday")}</p>
                    </div>
                    <p className="text-xs text-brand-500 mt-2">{t("whatsappNote")}</p>
                  </div>
                </div>

                <div className="bg-brand-900 rounded-xl p-5">
                  <p className="text-white text-sm font-semibold mb-1">{t("commitmentTitle")}</p>
                  <p className="text-brand-300 text-xs leading-relaxed">{t("commitmentBody")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <section className="bg-brand-900 py-10 hex-texture">
        <div className="container-lg text-center">
          <h2 className="text-xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-brand-300 text-sm mb-6">{t("ctaBody")}</p>
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{t("ctaBtn")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
