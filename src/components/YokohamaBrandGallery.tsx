import { SectionHeading } from "@/components/SectionHeading";
import { FACILITY_SHOWCASE_COPY } from "@/lib/facility-showcase";
import { useTranslation } from "@/lib/i18n";

export function YokohamaBrandGallery() {
  const { locale } = useTranslation();
  const copy = FACILITY_SHOWCASE_COPY[locale];

  return (
    <section className="border-b border-border bg-background/35 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.roadEyebrow}
          title={copy.roadTitle}
          description={copy.roadDescription}
        />

        <div className="mt-12 grid items-start gap-5 md:grid-cols-[0.915fr_1.333fr]">
          <figure className="group relative aspect-[1200/1311] overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-card)]">
            <img
              src="/model-oils/brands/facility/yokohama-branded-suv.webp"
              alt={copy.suvAlt}
              loading="lazy"
              decoding="async"
              width={1200}
              height={1311}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-lg font-bold text-white">
              {copy.suvCaption}
            </figcaption>
          </figure>

          <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-card)]">
            <img
              src="/model-oils/brands/facility/yokohama-branded-pickup.webp"
              alt={copy.pickupAlt}
              loading="lazy"
              decoding="async"
              width={1448}
              height={1086}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-lg font-bold text-white">
              {copy.pickupCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
