"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { focusRing } from "@/lib/ui";
import { DOCS_PAGES } from "@/components/docs/nav";

/* Previous / next, derived from the docs navigation order so it never drifts.
   DocPage renders it; pages do not pass anything. */
export function DocFooter({ className }: { className?: string }) {
  const pathname = usePathname();
  const i = DOCS_PAGES.findIndex((p) => p.href === pathname);
  if (i === -1) return null;
  const prev = DOCS_PAGES[i - 1];
  const next = DOCS_PAGES[i + 1];
  const card = "group flex flex-col gap-1 rounded-lg border border-hairline px-4 py-3.5 transition-colors hover:border-ink-3/50";

  return (
    <nav aria-label="Previous and next" className={cn("mt-16 grid gap-3 border-t border-hairline pt-8 sm:grid-cols-2", className)}>
      {prev ? (
        <Link href={prev.href} className={cn(card, focusRing)}>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-3">
            <ArrowLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="font-medium text-ink-1">{prev.label}</span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
      {next && (
        <Link href={next.href} className={cn(card, "sm:items-end sm:text-right", focusRing)}>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-3">
            Next
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-medium text-ink-1">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
