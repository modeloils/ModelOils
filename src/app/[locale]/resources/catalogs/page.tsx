import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Product Catalogs & Technical Documentation — Model Oils",
  description:
    "Download product catalogs for Shell, Mobil, Castrol, Petrol Ofisi and more. Motor oils, mineral oils, and industrial lubricants for B2B buyers worldwide.",
};

const BRANDS = [
  { name: "Shell",        logo: "/brands/Shell.png",        slug: "Shell",        blend: false },
  { name: "Mobil",        logo: "/brands/mobil.png",        slug: "mobil",        blend: true  },
  { name: "Castrol",      logo: "/brands/castrol.jpg",      slug: "castrol",      blend: true  },
  { name: "Elf / Total",  logo: "/brands/total.png",        slug: "total",        blend: true  },
  { name: "Motul",        logo: "/brands/motul.jpg",        slug: "motul",        blend: true  },
  { name: "Texol",        logo: "/brands/texol.jpg",        slug: "texol",        blend: true  },
  { name: "Texaco",       logo: "/brands/texaco.png",       slug: "texaco",       blend: true  },
  { name: "Petrol Ofisi", logo: "/brands/petrol-ofisi.png", slug: "petrol-ofisi", blend: true  },
];

interface CatalogsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CatalogsPage({ params }: CatalogsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalogsPage");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.modeloils.com" },
      { "@type": "ListItem", position: 2, name: "Catalogs", item: "https://www.modeloils.com/resources/catalogs" },
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
            subheadline={t("selectBrand")}
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Brand grid */}
      <section className="bg-brand-50 section-padding">
        <div className="container-xl">
          <div className="flex flex-wrap justify-center gap-6">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/resources/catalogs/${brand.slug}`}
                aria-label={brand.name}
                className="group flex items-center justify-center bg-white border border-brand-200 rounded-[var(--radius-card)] p-8 w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="relative w-full h-28 overflow-hidden">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className={`object-contain ${brand.blend ? "mix-blend-multiply" : ""}`}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
