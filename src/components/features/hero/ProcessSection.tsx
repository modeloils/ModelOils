import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const STEPS = ["step1", "step2", "step3", "step4", "step5"] as const;

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="bg-brand-50 section-padding" aria-labelledby="process-heading">
      <div className="container-xl">
        <SectionHeader
          id="process-heading"
          eyebrow={t("eyebrow")}
          headline={t("title")}
          subheadline={t("subtitle")}
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-8 left-[calc(10%-1px)] right-[calc(10%-1px)] h-[1px] border-t-2 border-dashed border-brand-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-accent-600 flex items-center justify-center shadow-sm">
                  <span className="text-accent-600 font-bold text-xl">{index + 1}</span>
                </div>
                <div className="bg-white border border-brand-200 rounded-[var(--radius-card)] p-4 w-full">
                  <h3 className="text-brand-900 font-semibold text-sm mb-2">
                    {t(`${step}Title` as "step1Title")}
                  </h3>
                  <p className="text-brand-500 text-xs leading-relaxed">
                    {t(`${step}Desc` as "step1Desc")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/contact/request-quote">{t("startCta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
