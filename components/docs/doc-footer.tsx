import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

interface DocFooterProps {
  prev?: NavItem;
  next?: NavItem;
  className?: string;
}

export function DocFooter({ prev, next, className }: DocFooterProps) {
  if (!prev && !next) return null;
  return (
    <nav
      className={cn(
        "mt-20 grid gap-3 border-t border-hairline pt-10 sm:grid-cols-2",
        className,
      )}
      aria-label="Page navigation"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-xl border border-hairline bg-surface-1 px-5 py-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:border-brand/40 sm:items-start"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
            <ArrowLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="text-sm font-medium text-ink-1 group-hover:text-brand">
            {prev.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col gap-1 rounded-xl border border-hairline bg-surface-1 px-5 py-4 text-right transition-colors duration-[var(--dur-base)] ease-out-expo hover:border-brand/40 sm:items-end"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
            Next
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium text-ink-1 group-hover:text-brand">
            {next.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
