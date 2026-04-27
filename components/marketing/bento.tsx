import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6 [grid-auto-rows:minmax(220px,auto)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type Span = "1" | "2" | "3" | "4" | "5" | "6";
interface BentoCellProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: Span;
  rowSpan?: "1" | "2";
  tone?: "default" | "ink" | "brand";
}

const colMap: Record<Span, string> = {
  "1": "lg:col-span-1",
  "2": "lg:col-span-2",
  "3": "lg:col-span-3",
  "4": "lg:col-span-4",
  "5": "lg:col-span-5",
  "6": "lg:col-span-6",
};

const rowMap = {
  "1": "lg:row-span-1",
  "2": "lg:row-span-2",
} as const;

const toneMap = {
  default: "bg-surface-1 text-ink-1 border-hairline",
  ink: "bg-ink-1 text-background border-ink-1",
  brand: "bg-brand-tint text-ink-1 border-transparent",
} as const;

export function BentoCell({
  colSpan = "2",
  rowSpan = "1",
  tone = "default",
  className,
  children,
  ...props
}: BentoCellProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border p-7 sm:p-8 transition-colors duration-[var(--dur-base)] ease-out-expo",
        colMap[colSpan],
        rowMap[rowSpan],
        toneMap[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
