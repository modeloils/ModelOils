import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

const BRANDS: Record<string, { name: string; logo: string }> = {
  castrol:        { name: "Castrol",      logo: "/brands/castrol.jpg"        },
  texaco:         { name: "Texaco",       logo: "/brands/texaco.png"         },
  texol:          { name: "Texol",        logo: "/brands/texol.jpg"          },
  shell:          { name: "Shell",        logo: "/brands/Shell.png"          },
  total:          { name: "Elf / Total",  logo: "/brands/total.png"          },
  motul:          { name: "Motul",        logo: "/brands/motul.jpg"          },
  mobil:          { name: "Mobil",        logo: "/brands/mobil.png"          },
  "petrol-ofisi": { name: "Petrol Ofisi", logo: "/brands/petrol-ofisi.png"   },
};

interface BrandPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BRANDS).map((slug) => ({ slug }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const brand = BRANDS[slug.toLowerCase()];
  if (!brand) notFound();

  const t = await getTranslations("brandPage");

  const CATEGORIES = [
    {
      num: "01",
      href: `motor-yaglari`,
      titleKey: "motorOilsCard" as const,
      descKey: "motorOilsCardDesc" as const,
      bg: "#0d1a2e",
      accent: "#c47b1f",
      imgSrc: "/images/motor-yaglari-bg.jpg",
    },
    {
      num: "02",
      href: `endustriyel-yaglar`,
      titleKey: "industrialLubsCard" as const,
      descKey: "industrialLubsCardDesc" as const,
      bg: "#1a1a2e",
      accent: "#c47b1f",
      imgSrc: "/images/endustriyel-yaglar-bg.jpg",
    },
    {
      num: "03",
      href: `antifriz`,
      titleKey: "antifreezeCard" as const,
      descKey: "antifreezeCardDesc" as const,
      bg: "linear-gradient(145deg,#0a2a4a 0%,#0e3d6b 100%)",
      accent: "#38bdf8",
      imgSrc: null,
    },
    {
      num: "04",
      href: `sanziman-disli-yaglari`,
      titleKey: "transmissionGearOilsCard" as const,
      descKey: "transmissionGearOilsCardDesc" as const,
      bg: "linear-gradient(145deg,#2d1a08 0%,#4a2e0a 100%)",
      accent: "#f59e0b",
      imgSrc: null,
    },
    {
      num: "05",
      href: `gres-yaglari`,
      titleKey: "greasesCard" as const,
      descKey: "greasesCardDesc" as const,
      bg: "linear-gradient(145deg,#1a1a1a 0%,#2d2d2d 100%)",
      accent: "#a3a3a3",
      imgSrc: null,
    },
    {
      num: "06",
      href: `motosiklet-tekne-yaglari`,
      titleKey: "motorcycleMarineCard" as const,
      descKey: "motorcycleMarineCardDesc" as const,
      bg: "linear-gradient(145deg,#042f2e 0%,#0f4b47 100%)",
      accent: "#2dd4bf",
      imgSrc: null,
    },
  ];

  return (
    <main className="min-h-screen bg-brand-50 pt-[120px]">

      {/* Header */}
      <section className="bg-white border-b border-brand-200 py-12">
        <div className="container-xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-900 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToHome")}
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-48 h-24 shrink-0">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain" priority />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-accent-600 mb-2">
                {t("productRange")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-900">
                {brand.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={`/brands/${slug}/${cat.href}`}
                className="group relative rounded-[var(--radius-card)] overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                style={{ minHeight: 260 }}
              >
                {/* Background */}
                {cat.imgSrc ? (
                  <Image
                    src={cat.imgSrc}
                    alt={t(cat.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={cat.num === "01" || cat.num === "02"}
                  />
                ) : (
                  <div className="absolute inset-0 hex-texture" style={{ background: cat.bg }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6" style={{ minHeight: 260 }}>
                  <span className="text-4xl font-black italic leading-none mb-2 select-none" style={{ color: `${cat.accent}30` }}>
                    {cat.num}
                  </span>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {brand.name} {t(cat.titleKey)}
                  </h2>
                  <p className="text-white/65 text-xs leading-relaxed mb-4">{t(cat.descKey)}</p>
                  <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all duration-200" style={{ color: cat.accent }}>
                    {t("explore")} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
