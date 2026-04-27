import * as React from "react";
import { cn } from "@/lib/utils";

interface DocStepsProps {
  items: { title: string; description?: React.ReactNode }[];
  className?: string;
}

export function DocSteps({ items, className }: DocStepsProps) {
  return (
    <ol className={cn("space-y-5", className)}>
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-5">
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-1 font-serif italic text-sm text-brand"
          >
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="font-medium text-ink-1">{item.title}</p>
            {item.description && (
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

interface DocBulletsProps {
  items: { title: string; description?: React.ReactNode }[];
  className?: string;
}

export function DocBullets({ items, className }: DocBulletsProps) {
  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => (
        <li key={item.title} className="flex gap-4">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <div className="min-w-0">
            <p className="font-medium text-ink-1">{item.title}</p>
            {item.description && (
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
