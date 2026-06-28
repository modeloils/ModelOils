import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  centered = false,
  compact = false,
  backgroundImage,
  transparent = false,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  compact?: boolean;
  backgroundImage?: string;
  transparent?: boolean;
  children?: ReactNode;
}) {
  const paddingClass = compact
    ? "py-8 lg:py-10"
    : centered
      ? "py-14 text-center lg:py-16"
      : "py-16 lg:py-24";

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
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${paddingClass}`}>
        <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
        </span>
        <h1 className={`mt-4 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${compact ? "max-w-3xl" : centered ? "font-display font-extrabold mx-auto max-w-4xl sm:text-5xl lg:text-6xl" : "font-display font-extrabold max-w-3xl sm:text-5xl"}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${centered ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
