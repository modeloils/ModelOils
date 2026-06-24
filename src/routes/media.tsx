import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { pageHead, useTranslation, type Locale } from "@/lib/i18n";

const MEDIA_ALBUMS = [
  {
    title: "Fuar",
    images: [
      "/model-oils/media/fuar/fuar-1.png",
      "/model-oils/media/fuar/fuar%202.png",
      "/model-oils/media/fuar/fuar3.png",
      "/model-oils/media/fuar/fuar-4.jpg",
    ],
  },
  {
    title: "Moto-Cross",
    images: [
      "/model-oils/media/moto-cross/moto-cross-1.jpeg",
      "/model-oils/media/moto-cross/moto-cross-2.png",
      "/model-oils/media/moto-cross/moto-cross-3.jpeg",
    ],
  },
  {
    title: "Ralli",
    images: [
      "/model-oils/media/ralli/ralli-1.png",
      "/model-oils/media/ralli/ralli-2.png",
      "/model-oils/media/ralli/ralli-3.png",
      "/model-oils/media/ralli/ralli-4.png",
    ],
  },
  {
    title: "Off-Road",
    images: [
      "/model-oils/media/off-road/off-road-1.png",
      "/model-oils/media/off-road/off-road-2.jpeg",
      "/model-oils/media/off-road/off-road-3.jpeg",
      "/model-oils/media/off-road/off-road-4.jpeg",
    ],
  },
];

export function mediaHead(locale: Locale) {
  return pageHead(locale, "media");
}

export const Route = createFileRoute("/media")({
  head: () => mediaHead("en"),
  component: Media,
});

export function Media() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <SiteLayout>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox}
              alt=""
              className="max-h-[88vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-800" />
            </button>
          </div>
        </div>
      )}

      <PageHero eyebrow="Model Oils" title={t.mediaPage.heroTitle} subtitle={t.mediaPage.heroSubtitle} />

      <div className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {MEDIA_ALBUMS.map((album) => (
            <section key={album.title}>
              <SectionHeading eyebrow={t.mediaPage.galleryEyebrow} title={album.title} />
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {album.images.map((src) => (
                  <button
                    key={src}
                    onClick={() => setLightbox(src)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/0 opacity-0 shadow transition-all group-hover:bg-white/90 group-hover:opacity-100">
                        <ZoomIn className="h-4 w-4 text-gray-800" />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
