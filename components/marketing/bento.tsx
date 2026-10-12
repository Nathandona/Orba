import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6", className)} {...props}>
      {children}
    </div>
  );
}

type Span = "2" | "3" | "6";

const colMap: Record<Span, string> = {
  "2": "lg:col-span-2",
  "3": "lg:col-span-3",
  "6": "sm:col-span-2 lg:col-span-6",
};

interface BentoCellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  colSpan?: Span;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** Decorative UI crop shown on a plate above (or beside, with layout="row") the text. */
  visual?: React.ReactNode;
  layout?: "stack" | "row";
  /** Plate height on sm and up for stacked cells. */
  plate?: "md" | "lg";
}

/* A feature cell: a muted plate holding a small UI crop, then title and body.
   Without title/visual it renders its children in a padded box. */
export function BentoCell({
  colSpan = "2",
  title,
  body,
  visual,
  layout = "stack",
  plate = "md",
  className,
  children,
  ...props
}: BentoCellProps) {
  const structured = title !== undefined || visual !== undefined;
  const row = layout === "row";

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-background transition-colors duration-[var(--dur-base)] hover:border-ink-3/40",
        row && "lg:flex-row-reverse lg:items-stretch",
        colMap[colSpan],
        !structured && "p-7 sm:p-8",
        className,
      )}
      {...props}
    >
      {structured ? (
        <>
          {visual && (
            <div
              aria-hidden="true"
              className={cn(
                "relative m-2 flex-1 overflow-hidden rounded-xl bg-surface-2",
                plate === "lg" ? "sm:min-h-[240px]" : "sm:min-h-[200px]",
                row && "lg:w-3/5 lg:shrink-0",
              )}
            >
              {visual}
            </div>
          )}
          <div className={cn("px-6 pb-6 pt-4", row && "lg:flex lg:w-2/5 lg:flex-col lg:justify-center lg:py-8")}>
            {title && <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink-1">{title}</h3>}
            {body && <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-ink-2">{body}</p>}
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
