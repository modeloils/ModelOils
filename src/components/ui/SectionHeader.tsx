import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  id?: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  alignment?: "left" | "center";
  headingLevel?: 1 | 2 | 3;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  id,
  eyebrow,
  headline,
  subheadline,
  alignment = "center",
  headingLevel = 2,
  dark = false,
  className,
}: SectionHeaderProps) {
  const Tag = `h${headingLevel}` as "h1" | "h2" | "h3";
  const alignClass = alignment === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div id={id} className={cn("flex flex-col gap-3 mb-12", alignClass, className)}>
      {eyebrow && (
        <span className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.08em]",
          dark ? "text-accent-500" : "text-accent-600"
        )}>
          {eyebrow}
        </span>
      )}
      <Tag className={cn(
        "font-bold leading-tight tracking-tight",
        headingLevel === 1 ? "text-[3.5rem] leading-[1.1]" : headingLevel === 2 ? "text-[2.5rem] leading-[1.2]" : "text-[1.875rem] leading-[1.25]",
        dark ? "text-brand-100" : "text-brand-900"
      )}>
        {headline}
      </Tag>
      {subheadline && (
        <p className={cn(
          "text-lg max-w-[640px]",
          dark ? "text-brand-300" : "text-brand-500"
        )}>
          {subheadline}
        </p>
      )}
    </div>
  );
}
