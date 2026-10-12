import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusRing } from "@/lib/ui";

interface DocCardLinkProps {
  href: string;
  title: string;
  description?: string;
  className?: string;
}

/* A hairline card: title and one line. */
export function DocCardLink({ href, title, description, className }: DocCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-hairline p-5 transition-colors hover:border-ink-3/50 hover:bg-surface-2",
        focusRing,
        className,
      )}
    >
      <span className="flex items-center justify-between gap-3 font-medium text-ink-1">
        {title}
        <ArrowRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform motion-safe:group-hover:translate-x-0.5" />
      </span>
      {description && <span className="mt-1.5 text-sm leading-relaxed text-ink-2">{description}</span>}
    </Link>
  );
}
