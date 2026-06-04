import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Car,
  Truck,
  Factory,
  Anchor,
  Tractor,
  Mountain,
  Zap,
  Package,
} from "lucide-react";

type IndustryKey = "automotive" | "transport" | "industrial" | "marine" | "agricultural" | "mining" | "power" | "wholesale";

const INDUSTRIES: { icon: typeof Car; key: IndustryKey; href: string }[] = [
  { icon: Car, key: "automotive", href: "/solutions/fleet-operators" },
  { icon: Truck, key: "transport", href: "/solutions/automotive-distributors" },
  { icon: Factory, key: "industrial", href: "/solutions/industrial-companies" },
  { icon: Anchor, key: "marine", href: "/solutions/industrial-companies" },
  { icon: Tractor, key: "agricultural", href: "/solutions/industrial-companies" },
  { icon: Mountain, key: "mining", href: "/solutions/industrial-companies" },
  { icon: Zap, key: "power", href: "/solutions/industrial-companies" },
  { icon: Package, key: "wholesale", href: "/solutions/lubricant-importers" },
];

export function IndustriesSection() {
  const t = useTranslations("industries");

  return (
    <section className="bg-brand-950 section-padding hex-texture" aria-labelledby="industries-heading">
      <div className="container-xl">
        <SectionHeader
          id="industries-heading"
          eyebrow="Applications"
          headline={t("title")}
          subheadline={t("subtitle")}
          dark
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map(({ icon: Icon, key, href }) => (
            <Link
              key={key}
              href={href}
              className="group bg-brand-800 border border-brand-600 rounded-[var(--radius-card)] p-5 flex flex-col gap-3 hover:border-accent-600 hover:bg-brand-700 transition-all duration-200"
            >
              <Icon className="h-8 w-8 text-accent-600 group-hover:text-accent-500 transition-colors" aria-hidden="true" />
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {t(key)}
                </h3>
                <span className="text-accent-500 text-xs font-medium group-hover:text-accent-400 transition-colors">
                  {t("viewProducts")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
