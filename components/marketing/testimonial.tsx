import * as React from "react";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  className?: string;
}

export function PullQuote({ quote, author, role, company, className }: PullQuoteProps) {
  return (
    <figure className={cn("mx-auto max-w-[56rem] text-center", className)}>
      <span aria-hidden className="font-serif text-7xl leading-none text-brand">
        &ldquo;
      </span>
      <blockquote className="mt-2 font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic leading-[1.25] text-ink-1">
        {quote}
      </blockquote>
      <figcaption className="mt-8 flex flex-col items-center gap-1 text-sm">
        <span className="font-medium text-ink-1">{author}</span>
        {(role || company) && (
          <span className="text-ink-3">
            {role}
            {role && company && " · "}
            {company}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
