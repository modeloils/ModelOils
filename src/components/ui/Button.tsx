"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-accent-600 to-accent-500 text-white hover:from-accent-500 hover:to-accent-600 shadow-sm hover:shadow-[0_4px_16px_rgba(196,123,31,0.40)] active:scale-[0.98]",
        secondary:
          "border-[1.5px] border-brand-900 bg-transparent text-brand-900 hover:bg-brand-900/6 active:scale-[0.98]",
        outline:
          "border-[1.5px] border-white bg-transparent text-white hover:bg-white/8 active:scale-[0.98]",
        ghost: "bg-transparent text-brand-900 hover:bg-brand-900/6",
        link: "bg-transparent text-accent-600 hover:text-accent-500 underline-offset-4 hover:underline p-0 h-auto",
        whatsapp:
          "bg-whatsapp text-white hover:brightness-110 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[var(--radius-btn)]",
        md: "h-[52px] px-7 text-[15px] tracking-[0.03em] rounded-[var(--radius-btn)]",
        lg: "h-14 px-8 text-base tracking-[0.03em] rounded-[var(--radius-btn)]",
        icon: "h-10 w-10 rounded-[var(--radius-btn)]",
        full: "h-[52px] w-full px-7 text-[15px] tracking-[0.03em] rounded-[var(--radius-btn)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        <Slottable>{children}</Slottable>
        {!isLoading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
