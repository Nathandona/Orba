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

export function DocSection({ id, step, title, description, children, className }: DocSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <header className="mb-5 flex items-baseline gap-4">
        {step && (
          <span
            aria-hidden
            className="font-serif italic text-h3 leading-none text-brand"
          >
            {step}
          </span>
        )}
        <h2 className="text-h3 font-medium tracking-[-0.01em] text-ink-1 leading-tight">
          {title}
        </h2>
      </header>
      {description && (
        <div className="mb-6 text-base leading-relaxed text-ink-2">{description}</div>
      )}
      {children}
    </section>
  );
}
