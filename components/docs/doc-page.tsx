import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DocFooter } from "@/components/docs/doc-footer";

interface DocPageProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}

/* One docs article: small section label, h1, lead, body, then previous / next
   links computed from the docs navigation. */
export function DocPage({ eyebrow, title, lead, children, className }: DocPageProps) {
  return (
    <article data-doc-article className={cn("mx-auto w-full max-w-[45rem] py-10 sm:py-14 lg:py-16", className)}>
      <header className="mb-12 border-b border-hairline pb-10">
        {eyebrow && <p className="mb-4 text-sm text-ink-3">{eyebrow}</p>}
        <h1 className="text-h1 leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-ink-1">{title}</h1>
        {lead && <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-ink-2">{lead}</p>}
      </header>
      <div className="space-y-14 text-[15px] leading-relaxed text-ink-2 sm:text-base">{children}</div>
      <DocFooter />
    </article>
  );
}

/* Inline prose helpers. */
export function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-ink-1 underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:decoration-ink-1"
    >
      {children}
    </Link>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-1">
      {children}
    </code>
  );
}

/* Hairline table: head row in ink-3, rows separated by hairlines. */
export function DocTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full min-w-[28rem] text-sm">
        <thead className="border-b border-hairline text-ink-3">
          <tr>
            {head.map((h, i) => (
              <th key={h} className={cn("px-4 py-2.5 font-normal", i === 0 ? "text-left" : "text-center")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className={cn("px-4 py-3", j === 0 ? "font-medium text-ink-1" : "text-center text-ink-2")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
