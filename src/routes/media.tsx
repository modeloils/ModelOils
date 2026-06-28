import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
      "/model-oils/media/fuar/fuar-2.png",
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

  // While the lightbox is open, freeze background scroll (and compensate for the
  // scrollbar width to avoid layout shift). Restore on close. Esc also closes.
  useEffect(() => {
    if (!lightbox) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <SiteLayout>
      {lightbox && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onPointerDown={() => setLightbox(null)}
        >
          <div
            className="relative flex items-center justify-center"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox}
              alt=""
              className="block max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 sm:-right-4 sm:-top-4"
            >
              <X className="h-5 w-5 text-gray-800" />
            </button>
          </div>
        </div>,
        document.body,
      )}

      <PageHero compact eyebrow="Model Oils" title={t.mediaPage.heroTitle} subtitle={t.mediaPage.heroSubtitle} />

      <div className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {MEDIA_ALBUMS.map((album) => (
            <section key={album.title}>
              <SectionHeading eyebrow={t.mediaPage.galleryEyebrow} title={album.title} />
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {album.images.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightbox(src)}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-border bg-secondary"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 opacity-100 shadow transition-all group-hover:bg-white/90 sm:bg-white/0 sm:opacity-0 sm:group-hover:bg-white/90 sm:group-hover:opacity-100">
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
