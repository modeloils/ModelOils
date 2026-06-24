import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  centered = false,
  backgroundImage,
  transparent = false,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  backgroundImage?: string;
  transparent?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`relative overflow-hidden ${transparent ? "" : "border-b border-border bg-[image:var(--gradient-panel)]"}`}>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}
      {backgroundImage && <div className="absolute inset-0 bg-background/70" />}
      {!transparent && <div className="tech-grid absolute inset-0 opacity-40" />}
      {!transparent && <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,oklch(0.66_0.18_248/0.15),transparent_55%)]" />}
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${centered ? "py-14 text-center lg:py-16" : "py-16 lg:py-24"}`}>
        <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
        </span>
        <h1 className={`mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl ${centered ? "mx-auto max-w-4xl lg:text-6xl" : "max-w-3xl"}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${centered ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
