import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  FlaskConical,
  FileText,
  Package2,
  BadgeCheck,
  Users,
  CreditCard,
} from "lucide-react";

const FEATURES = [
  { icon: FlaskConical, titleKey: "feature1Title", descKey: "feature1Desc" },
  { icon: FileText, titleKey: "feature2Title", descKey: "feature2Desc" },
  { icon: Package2, titleKey: "feature3Title", descKey: "feature3Desc" },
  { icon: BadgeCheck, titleKey: "feature4Title", descKey: "feature4Desc" },
  { icon: Users, titleKey: "feature5Title", descKey: "feature5Desc" },
  { icon: CreditCard, titleKey: "feature6Title", descKey: "feature6Desc" },
] as const;

export function WhyUsSection() {
  const t = useTranslations("whyUs");

  return (
    <section className="bg-brand-900 section-padding hex-texture" aria-labelledby="whyus-heading">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-500 block mb-4">
              {t("eyebrow")}
            </span>
            <h2 id="whyus-heading" className="text-[2.5rem] font-bold text-white leading-tight tracking-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-brand-300 text-lg leading-relaxed mb-8">
              {t("subtitle")}
            </p>
            <Button asChild size="md" variant="outline">
              <Link href="/about">{t("downloadProfileBtn")}</Link>
            </Button>
          </div>

          {/* Right: Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="bg-brand-800 border-l-[3px] border-accent-600 rounded-[var(--radius-card)] p-5"
              >
                <Icon className="h-7 w-7 text-accent-600 mb-3" aria-hidden="true" />
                <h3 className="text-white font-semibold text-sm mb-1.5">{t(titleKey)}</h3>
                <p className="text-brand-300 text-xs leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
