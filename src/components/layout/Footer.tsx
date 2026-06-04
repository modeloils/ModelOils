import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const productLinks = [
    { label: t("motorOils"), href: "/products/motor-oils" },
    { label: t("mineralOils"), href: "/products/mineral-oils" },
    { label: t("industrialLubricants"), href: "/products/industrial-lubricants" },
    { label: t("hydraulicOils"), href: "/products/industrial-lubricants" },
    { label: t("gearOils"), href: "/products/industrial-lubricants" },
    { label: t("productCatalog"), href: "/catalog" },
  ];

  const companyLinks = [
    { label: t("aboutUs"), href: "/about" },
    { label: t("certifications"), href: "/certifications" },
    { label: t("exportRegions"), href: "/export-services" },
    { label: t("blog"), href: "/resources/blog" },
    { label: t("technicalGuides"), href: "/resources/technical-guides" },
    { label: t("exportGuides"), href: "/resources/export-guides" },
  ];

  return (
    <footer className="bg-brand-950 border-t border-brand-700" aria-label="Site footer">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 – Brand */}
          <div>
            <Link href="/" className="inline-flex mb-5">
              <Image
                src="/images/logo-main.png"
                alt="Model Oils — International Export"
                width={176}
                height={96}
                className="h-40 w-auto"
              />
            </Link>
            <p className="text-brand-400 text-sm leading-relaxed mb-5">
              {t("tagline")}
            </p>
            {/* ISO badge */}
            <div className="inline-flex items-center gap-2 border border-brand-700 rounded-[var(--radius-badge)] px-3 py-1.5 mb-4">
              <div className="w-5 h-5 rounded-full border-2 border-accent-600 flex items-center justify-center">
                <span className="text-[7px] font-bold text-accent-500">✓</span>
              </div>
              <span className="text-[11px] font-semibold text-brand-300 uppercase tracking-[0.08em]">
                {t("isoCertified")}
              </span>
            </div>
            <div className="text-[11px] text-brand-500 uppercase tracking-[0.08em]">
              {t("registeredExporter")}
            </div>
          </div>

          {/* Column 2 – Products */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-[0.08em] mb-4">
              {t("products")}
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-brand-400 text-sm hover:text-brand-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-[0.08em] mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-brand-400 text-sm hover:text-brand-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-[0.08em] mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent-600 mt-0.5 shrink-0" />
                <span className="text-brand-400 text-sm leading-relaxed">
                  Üçevler Mah. İzmir Yolu Cad.<br />No: 241/334, Nilüfer / Bursa<br />Türkiye
                </span>
              </li>
              <li>
                <a
                  href="tel:+905334567975"
                  className="flex items-center gap-2.5 text-brand-400 text-sm hover:text-brand-100 transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent-600 shrink-0" />
                  +90 533 456 7975
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@modeloils.com"
                  className="flex items-center gap-2.5 text-brand-400 text-sm hover:text-brand-100 transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent-600 shrink-0" />
                  info@modeloils.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/905334567975?text=Hello,%20I'm%20interested%20in%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-whatsapp text-sm hover:brightness-110 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp: +90 533 456 7975
                </a>
              </li>
            </ul>
            <p className="text-brand-500 text-xs mt-4">
              {t("businessHours")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-800">
        <div className="container-xl py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-500 text-xs">
            © {year} Model Oils. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-brand-500 text-xs hover:text-brand-300 transition-colors">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="text-brand-500 text-xs hover:text-brand-300 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
