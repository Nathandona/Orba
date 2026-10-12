import * as React from "react";
import { cn } from "@/lib/utils";

interface DocListProps {
  items: { title: string; description?: React.ReactNode }[];
  className?: string;
}

/* Numbered steps: mono counters joined by a hairline rail. */
export function DocSteps({ items, className }: DocListProps) {
  return (
    <ol className={cn("space-y-6", className)}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="relative pl-11 after:absolute after:top-8 after:-bottom-6 after:left-[0.6875rem] after:w-px after:bg-hairline last:after:hidden"
        >
          <span
            aria-hidden
            className="absolute top-0 left-0 grid h-6 w-6 place-items-center rounded-md border border-hairline bg-background font-mono text-[11px] text-ink-2"
          >
            {i + 1}
          </span>
          <p className="font-medium text-ink-1">{item.title}</p>
          {item.description && <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{item.description}</p>}
        </li>
      ))}
    </ol>
  );
}

/* Definition-style bullets: a small ink dot, a title, a line of detail. */
export function DocBullets({ items, className }: DocListProps) {
  return (
    <ul className={cn("divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item) => (
        <li key={item.title} className="flex gap-4 py-4">
          <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-ink-3" />
          <div className="min-w-0">
            <p className="font-medium text-ink-1">{item.title}</p>
            {item.description && <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{item.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
