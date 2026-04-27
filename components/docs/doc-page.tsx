import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/marketing/eyebrow";

interface DocPageProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}

export function DocPage({ eyebrow, title, lead, children, className }: DocPageProps) {
  return (
    <article className={cn("mx-auto w-full max-w-[44rem] py-12 sm:py-16 lg:py-20", className)}>
      <header className="mb-12 sm:mb-14">
        {eyebrow && (
          <Eyebrow withRule={false} className="mb-5 text-brand">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="text-h1 font-medium tracking-[-0.02em] text-ink-1 leading-[1.05]">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[36rem] text-lead leading-relaxed text-ink-2">
            {lead}
          </p>
        )}
      </header>
      <div className="space-y-14">{children}</div>
    </article>
  );
}
