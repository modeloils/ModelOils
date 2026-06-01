"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Globe, Clock } from "lucide-react";

const TRUST_BADGES = [
  { icon: ShieldCheck, key: "trustBadge1" },
  { icon: Globe, key: "trustBadge2" },
  { icon: Clock, key: "trustBadge3" },
];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex items-center bg-brand-950 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Hex texture + amber glow */}
      <div className="absolute inset-0 hex-texture pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 85%, rgba(196,123,31,0.18) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-xl relative z-10 pt-[120px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
          {/* Left: Content */}
          <div className="py-20 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Pre-headline */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-500 mb-5">
                {t("preHeadline")}
              </p>

              {/* H1 */}
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6"
              >
                {t("headline")}
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-brand-300 leading-relaxed mb-8 max-w-[520px]">
                {t("subheadline")}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button asChild size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  <Link href="/contact/request-quote">{t("primaryCta")}</Link>
                </Button>
                <Button asChild size="md" variant="outline">
                  <Link href="/products">{t("secondaryCta")}</Link>
                </Button>
              </div>

              {/* Trust micro-badges */}
              <div className="flex flex-wrap gap-4">
                {TRUST_BADGES.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-accent-500" aria-hidden="true" />
                    <span className="text-xs text-brand-400 font-medium">
                      {t(key as "trustBadge1" | "trustBadge2" | "trustBadge3")}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Product visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            aria-hidden="true"
          >
            <div className="relative w-full max-w-[440px] aspect-square">
              {/* Decorative amber ring */}
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(196,123,31,0.15) 0%, transparent 60%, rgba(196,123,31,0.08) 100%)",
                  animation: "spin 20s linear infinite",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Diagonal section divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-brand-50"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
