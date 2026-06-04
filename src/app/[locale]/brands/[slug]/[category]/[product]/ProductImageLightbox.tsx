"use client";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  accent: string;
  borderColor: string;
}

export default function ProductImageLightbox({ src, alt, accent, borderColor }: Props) {
  return (
    <div
      className="shrink-0 w-52 h-64 rounded-2xl overflow-hidden border-4 shadow-2xl flex items-center justify-center bg-white"
      style={{ borderColor }}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={240}
        className="object-contain w-full h-full p-2"
      />
    </div>
  );
}
