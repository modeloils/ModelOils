import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const BRANDS = [
  { id: 1, name: "Shell",       logo: "/brands/Shell.png",   slug: "Shell",   scale: "",            blend: false },
  { id: 2, name: "Mobil",       logo: "/brands/mobil.png",   slug: "mobil",   scale: "",            blend: true  },
  { id: 3, name: "Castrol",     logo: "/brands/castrol.jpg", slug: "castrol", scale: "",            blend: true  },
  { id: 4, name: "Elf / Total", logo: "/brands/total.png",   slug: "total",   scale: "scale-[1.3]", blend: true  },
  { id: 5, name: "Motul",       logo: "/brands/motul.jpg",   slug: "motul",   scale: "",            blend: true  },
  { id: 6, name: "Texol",       logo: "/brands/texol.jpg",   slug: "texol",   scale: "",            blend: true  },
  { id: 7, name: "Texaco",      logo: "/brands/texaco.png",  slug: "texaco",  scale: "",            blend: true  },
];

export function BrandsSection() {
  const t = useTranslations("brandPage");

  return (
    <section className="bg-brand-50 section-padding" aria-labelledby="brands-heading">
      <div className="container-xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent-600 mb-3">
            {t("brandsHeadingEyebrow")}
          </p>
          <h2 id="brands-heading" className="text-3xl md:text-4xl font-bold text-brand-900">
            {t("brandsHeading")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              aria-label={brand.name}
              className="group flex items-center justify-center bg-white border border-brand-200 rounded-[var(--radius-card)] p-8 w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative w-full h-28 overflow-hidden">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className={`object-contain ${brand.blend ? "mix-blend-multiply" : ""} ${brand.scale}`}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
