import { SectionHeading } from "@/components/SectionHeading";
import { FACILITY_SHOWCASE_COPY } from "@/lib/facility-showcase";
import { useTranslation } from "@/lib/i18n";

const facilityImages = [
  {
    src: "/model-oils/brands/facility/facility-exterior-close.webp",
    width: 1198,
    height: 1313,
  },
  {
    src: "/model-oils/brands/facility/facility-production-line.webp",
    width: 1086,
    height: 1448,
  },
  {
    src: "/model-oils/brands/facility/facility-storage-tanks.webp",
    width: 1086,
    height: 1448,
  },
  {
    src: "/model-oils/brands/facility/facility-filling-line.webp",
    width: 1086,
    height: 1448,
  },
  {
    src: "/model-oils/brands/facility/facility-quality-lab.webp",
    width: 1086,
    height: 1448,
  },
] as const;

export function FacilityShowcase() {
  const { locale } = useTranslation();
  const copy = FACILITY_SHOWCASE_COPY[locale];

  return (
    <section className="brand-section-neutral border-b border-border py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[22rem] lg:grid-cols-4">
          {facilityImages.map((image, index) => {
            const card = copy.cards[index];
            const spanClass = index === 0 ? "lg:col-span-2 lg:row-span-2" : "";

            return (
              <figure
                key={image.src}
                className={`group relative min-h-[28rem] overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-card)] lg:min-h-0 ${spanClass}`}
              >
                <img
                  src={image.src}
                  alt={card.alt}
                  loading="lazy"
                  decoding="async"
                  width={image.width}
                  height={image.height}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-xl font-bold">{card.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
                    {card.description}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
