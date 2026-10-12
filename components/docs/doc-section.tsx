import * as React from "react";
import { cn } from "@/lib/utils";

interface DocSectionProps {
  id?: string;
  step?: string;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* An h2 section with an anchor link on hover. The id feeds "On this page". */
export function DocSection({ id, step, title, description, children, className }: DocSectionProps) {
  const anchor = id ?? slugify(title);
  return (
    <section className={cn("scroll-mt-20", className)}>
      <h2
        id={anchor}
        data-toc-label={title}
        className="group mb-4 flex scroll-mt-20 items-baseline gap-3 text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-ink-1"
      >
        {step && (
          <span aria-hidden className="font-mono text-sm font-normal tracking-normal text-ink-3">
            {step}
          </span>
        )}
        <span>{title}</span>
        <a
          href={`#${anchor}`}
          aria-label={`Link to ${title}`}
          className="font-normal text-ink-3 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          #
        </a>
      </h2>
      {description && <div className="mb-6 max-w-[40rem]">{description}</div>}
      {children}
    </section>
  );
}
