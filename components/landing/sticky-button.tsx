import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/* Orba's main call to action: a sticky note with a peeled corner, tilted -3deg.
   It is the only primary button style on the marketing site.
   - tone "highlight" (yellow) by default, "brand" (cobalt) on yellow ground.
   - the drop shadow lives on the wrapper because clip-path would cut it. */

const tones = {
  highlight: "bg-highlight text-highlight-foreground [--fold:var(--color-highlight-fold)]",
  brand: "bg-brand text-brand-foreground [--fold:var(--color-brand-fold)]",
} as const;

const sizes = {
  md: "px-5 py-3 text-base [--peel:12px]",
  lg: "px-7 py-4 text-lg [--peel:16px]",
} as const;

type StickyButtonProps = ComponentProps<typeof Link> & {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
};

export function StickyButton({ tone = "highlight", size = "md", className, children, ...props }: StickyButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex shrink-0 -rotate-3 rounded-card",
        "[filter:drop-shadow(0_1px_1px_rgb(17_17_20/0.08))_drop-shadow(0_8px_12px_rgb(17_17_20/0.14))]",
        "transition-transform duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:-rotate-2 active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      <span
        className={cn(
          "relative inline-flex items-center gap-2 rounded-card font-bold whitespace-nowrap",
          "[clip-path:polygon(0_0,100%_0,100%_calc(100%-var(--peel)),calc(100%-var(--peel))_100%,0_100%)]",
          tones[tone],
          sizes[size],
        )}
      >
        {children}
        <span
          aria-hidden
          className="absolute right-0 bottom-0 size-[var(--peel)] rounded-tl-[3px] bg-[var(--fold)] [clip-path:polygon(0_0,100%_0,0_100%)]"
        />
      </span>
    </Link>
  );
}

/* Quiet secondary action: an outlined pill. */
export function OutlineButton({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full border-[1.5px] border-foreground/15 px-6 py-3.5 text-base font-semibold text-foreground",
        "transition-[background-color,border-color,transform] duration-150 ease-out hover:border-foreground/30 hover:bg-foreground/[0.03] active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    />
  );
}
