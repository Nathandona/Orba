import * as React from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocCardLinkProps {
  href: string;
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function DocCardLink({
  href,
  icon: Icon,
  eyebrow,
  title,
  description,
  className,
}: DocCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-hairline bg-surface-1 p-6 transition-colors duration-[var(--dur-base)] ease-out-expo hover:border-brand/40 hover:bg-brand/[0.02]",
        className,
      )}
    >
      {Icon && (
        <Icon className="mb-5 h-5 w-5 text-brand transition-transform duration-[var(--dur-base)] ease-out-expo group-hover:-translate-y-0.5" />
      )}
      {eyebrow && (
        <span className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
          {eyebrow}
        </span>
      )}
      <span className="text-base font-medium text-ink-1">{title}</span>
      {description && (
        <span className="mt-1.5 text-sm leading-relaxed text-ink-2">{description}</span>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand">
        Read guide
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
