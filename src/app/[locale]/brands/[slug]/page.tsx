import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FlaskConical, Truck } from "lucide-react";

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
            Anasayfaya Dön
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-48 h-24 shrink-0">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain" priority />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-accent-600 mb-2">
                Ürün Yelpazemiz
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-900">
                {brand.name} Ürünleri
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Two clickable section cards */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Motor Yağları */}
            <Link
              href={`/brands/${slug}/motor-yaglari`}
              className="group bg-white border border-brand-200 rounded-[var(--radius-card)] p-8 flex flex-col gap-6 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center">
                <Truck className="w-7 h-7 text-accent-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-brand-900 mb-2">{brand.name} Motor Yağları</h2>
                <p className="text-brand-500 text-sm leading-relaxed">
                  Otomotiv, ağır hizmet ve binek araçlar için tam sentetik, yarı sentetik ve mineral motor yağları.
                </p>
              </div>
              <div className="flex items-center gap-2 text-accent-600 font-semibold text-sm group-hover:gap-3 transition-all">
                Ürünleri Gör <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Endüstriyel Yağlar */}
            <Link
              href={`/brands/${slug}/endustriyel-yaglar`}
              className="group bg-white border border-brand-200 rounded-[var(--radius-card)] p-8 flex flex-col gap-6 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center">
                <FlaskConical className="w-7 h-7 text-brand-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-brand-900 mb-2">{brand.name} Endüstriyel Yağlar</h2>
                <p className="text-brand-500 text-sm leading-relaxed">
                  Hidrolik, dişli, kompresör, gres ve metal işleme sıvıları dahil endüstriyel yağlayıcılar.
                </p>
              </div>
              <div className="flex items-center gap-2 text-brand-500 font-semibold text-sm group-hover:gap-3 transition-all">
                Ürünleri Gör <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}
