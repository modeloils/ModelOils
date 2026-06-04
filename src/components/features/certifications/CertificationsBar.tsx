import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Certification } from "@/lib/sanity/queries";

interface CertificationsBarProps {
  certifications: Certification[];
}

const FALLBACK_CERTS = [
  { _id: "1", name: "Quality Management System", abbreviation: "ISO 9001:2015" },
  { _id: "2", name: "Environmental Management", abbreviation: "ISO 14001:2015" },
  { _id: "3", name: "API Engine Oil Certification", abbreviation: "API CI-4/SL" },
  { _id: "4", name: "ACEA European Oil Sequences", abbreviation: "ACEA E7" },
  { _id: "5", name: "SGS Inspection Certificate", abbreviation: "SGS Verified" },
];

export function CertificationsBar({ certifications }: CertificationsBarProps) {
  const t = useTranslations("certifications");
  const certs = certifications.length > 0 ? certifications : FALLBACK_CERTS;

  return (
    <section className="bg-white border-y border-brand-200 py-12" aria-labelledby="certifications-heading">
      <div className="container-xl">
        <div className="text-center mb-8">
          <h2
            id="certifications-heading"
            className="text-lg font-semibold text-brand-700 uppercase tracking-[0.06em]"
          >
            {t("title")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {certs.slice(0, 6).map((cert) => (
            <div
              key={cert._id}
              className="flex flex-col items-center gap-2 group cursor-default"
              title={cert.name}
            >
              {/* Certification badge – circular */}
              <div
                className="w-20 h-20 rounded-full border-2 border-accent-600 bg-brand-900 flex flex-col items-center justify-center gap-0.5 group-hover:scale-105 transition-transform duration-200"
                role="img"
                aria-label={`${cert.abbreviation} certification`}
              >
                <span className="text-[9px] font-bold text-accent-500 uppercase tracking-[0.06em] text-center leading-tight px-1">
                  {cert.abbreviation}
                </span>
              </div>
              <span className="text-[10px] text-brand-500 text-center max-w-[80px] leading-tight hidden sm:block">
                {cert.name.split(" ").slice(0, 3).join(" ")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/certifications"
            className="text-accent-600 text-sm font-semibold hover:text-accent-500 underline-offset-4 hover:underline transition-colors"
          >
            {t("requestDocs")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
