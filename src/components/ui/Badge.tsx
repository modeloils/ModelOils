import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-semibold uppercase tracking-[0.08em] text-[11px] rounded-[var(--radius-badge)]",
  {
    variants: {
      variant: {
        default: "bg-brand-800 text-brand-100 px-2 py-1",
        amber: "bg-accent-600 text-white px-2 py-1",
        success: "bg-success/15 text-success border border-success/30 px-2 py-1",
        outline: "border border-brand-600 text-brand-400 px-2 py-1",
        light: "bg-brand-50 text-brand-700 px-2 py-1",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-[11px] px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
