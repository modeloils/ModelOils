import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download, ShieldCheck, Clock, BadgeCheck } from "lucide-react";

export function FinalCTASection() {
  const t = useTranslations("finalCta");

  return (
    <section
      className="relative bg-brand-900 section-padding overflow-hidden hex-texture"
      aria-labelledby="final-cta-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(196,123,31,0.15) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="container-lg relative z-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-500 mb-4">
          {t("preHeadline")}
        </p>
        <h2
          id="final-cta-heading"
          className="text-[2.5rem] font-bold text-white leading-tight tracking-tight mb-4 max-w-[600px] mx-auto"
        >
          {t("title")}
        </h2>
        <p className="text-brand-300 text-lg leading-relaxed mb-8 max-w-[560px] mx-auto">
          {t("body")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{t("primaryCta")}</Link>
          </Button>
          <Button asChild size="md" variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            <Link href="/catalog">{t("secondaryCta")}</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: ShieldCheck, key: "trust1" },
            { icon: Clock, key: "trust2" },
            { icon: BadgeCheck, key: "trust3" },
          ].map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-1.5 text-brand-400 text-sm">
              <Icon className="h-4 w-4 text-accent-600" aria-hidden="true" />
              {t(key as "trust1" | "trust2" | "trust3")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
