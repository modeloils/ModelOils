"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  labelKey: "countries" | "tonnes" | "clients" | "years" | "delivery";
}

const STATS: Stat[] = [
  { value: "40+", numericValue: 40, suffix: "+", labelKey: "countries" },
  { value: "12,000+", numericValue: 12000, suffix: "+", labelKey: "tonnes" },
  { value: "200+", numericValue: 200, suffix: "+", labelKey: "clients" },
  { value: "15+", numericValue: 15, suffix: "+", labelKey: "years" },
  { value: "98.6%", numericValue: 98.6, suffix: "%", labelKey: "delivery" },
];

function useCountUp(target: number, suffix: string, active: boolean, isDecimal: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, active]);

  if (!active) return "0" + suffix;
  const display = isDecimal ? count.toFixed(1) : count >= 1000 ? count.toLocaleString() : count.toString();
  return display + suffix;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const t = useTranslations("stats");
  const isDecimal = stat.numericValue % 1 !== 0;
  const display = useCountUp(stat.numericValue, stat.suffix, active, isDecimal);

  return (
    <div className="flex flex-col items-center gap-1 px-4 py-6">
      <span
        className="text-[2.5rem] sm:text-[3rem] font-bold leading-none tracking-tight"
        style={{ color: "var(--color-accent-600)" }}
        aria-label={stat.value}
      >
        {display}
      </span>
      <span className="text-brand-500 text-sm text-center leading-snug max-w-[100px]">
        {t(stat.labelKey)}
      </span>
    </div>
  );
}

export function StatsBar() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-white border-y border-brand-200"
      aria-label="Company statistics"
    >
      <div className="container-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.labelKey}
              className={cn(
                "border-brand-200",
                i < STATS.length - 1 && "border-r",
                i >= 2 && i < 4 && "sm:border-t lg:border-t-0"
              )}
            >
              <StatItem stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
