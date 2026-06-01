import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

const BRANDS: Record<string, { name: string; logo: string }> = {
  castrol: { name: "Castrol",     logo: "/brands/castrol.jpg" },
  texaco:  { name: "Texaco",      logo: "/brands/texaco.png"  },
  texol:   { name: "Texol",       logo: "/brands/texol.jpg"   },
  shell:   { name: "Shell",       logo: "/brands/Shell.png"   },
  total:   { name: "Elf / Total", logo: "/brands/total.png"   },
  motul:   { name: "Motul",       logo: "/brands/motul.jpg"   },
  mobil:   { name: "Mobil",       logo: "/brands/mobil.png"   },
};

interface BrandPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BRANDS).map((slug) => ({ slug }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = BRANDS[slug.toLowerCase()];
  if (!brand) notFound();

  const t = await getTranslations("brandPage");

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

      {/* Two clickable section cards */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Motor Oils */}
            <Link
              href={`/brands/${slug}/motor-yaglari`}
              className="group relative rounded-[var(--radius-card)] overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              style={{ minHeight: 320 }}
            >
              <Image
                src="/images/motor-yaglari-bg.jpg"
                alt={t("motorOilsCard")}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
              <div className="relative z-10 flex flex-col justify-end h-full p-8" style={{ minHeight: 320 }}>
                <span className="text-5xl font-black italic text-white/20 leading-none mb-3 select-none">01</span>
                <h2 className="text-2xl font-bold text-white mb-3">{brand.name} {t("motorOilsCard")}</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{t("motorOilsCardDesc")}</p>
                <div className="flex items-center gap-2 text-accent-400 font-semibold text-sm group-hover:gap-4 transition-all duration-200">
                  {t("explore")} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Industrial Lubricants */}
            <Link
              href={`/brands/${slug}/endustriyel-yaglar`}
              className="group relative rounded-[var(--radius-card)] overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              style={{ minHeight: 320 }}
            >
              <Image
                src="/images/endustriyel-yaglar-bg.jpg"
                alt={t("industrialLubsCard")}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
              <div className="relative z-10 flex flex-col justify-end h-full p-8" style={{ minHeight: 320 }}>
                <span className="text-5xl font-black italic text-white/20 leading-none mb-3 select-none">02</span>
                <h2 className="text-2xl font-bold text-white mb-3">{brand.name} {t("industrialLubsCard")}</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{t("industrialLubsCardDesc")}</p>
                <div className="flex items-center gap-2 text-accent-400 font-semibold text-sm group-hover:gap-4 transition-all duration-200">
                  {t("explore")} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}
