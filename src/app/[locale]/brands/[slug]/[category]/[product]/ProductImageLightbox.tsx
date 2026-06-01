"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props { src: string; alt: string; accent: string; borderColor: string; }

export default function ProductImageLightbox({ src, alt, accent, borderColor }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div
        className="shrink-0 w-52 h-64 rounded-2xl overflow-hidden border-4 shadow-2xl bg-white flex items-center justify-center cursor-zoom-in"
        style={{ borderColor }}
        onClick={() => setOpen(true)}
        title="Büyütmek için tıklayın"
      >
        <Image src={src} alt={alt} width={208} height={256} className="object-contain w-full h-full p-3" priority />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl p-6 shadow-2xl mx-4 max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-bold leading-none"
              aria-label="Kapat"
            >
              ×
            </button>
            <div className="rounded-xl overflow-hidden border-4 bg-white flex items-center justify-center" style={{ borderColor: accent }}>
              <Image src={src} alt={alt} width={400} height={500} className="object-contain w-full h-auto p-4" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-3 font-medium">{alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
