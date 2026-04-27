import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "tint" | "ink";
type Width = "narrow" | "default" | "wide" | "full";

const toneClass: Record<Tone, string> = {
  default: "bg-background text-ink-1",
  muted:
    "text-ink-1 bg-[linear-gradient(to_bottom,var(--background)_0%,var(--surface-2)_18%,var(--surface-2)_82%,var(--background)_100%)]",
  tint: "text-ink-1 bg-[linear-gradient(to_bottom,var(--background)_0%,var(--brand-tint)_22%,var(--brand-tint)_78%,var(--background)_100%)]",
  ink: "bg-ink-1 text-background",
};

const widthClass: Record<Width, string> = {
  narrow: "max-w-[64rem]",
  default: "max-w-[80rem]",
  wide: "max-w-[96rem]",
  full: "max-w-none",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  width?: Width;
  bleed?: boolean;
  innerClassName?: string;
}

export function Section({
  tone = "default",
  width = "default",
  bleed = false,
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative px-4 sm:px-6 lg:px-8",
        bleed ? "py-0" : "py-20 sm:py-24 lg:py-32",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      <div className={cn("mx-auto", widthClass[width], innerClassName)}>{children}</div>
    </section>
  );
}
