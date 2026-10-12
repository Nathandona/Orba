"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { focusRing } from "@/lib/ui";
import { DOCS_NAV, isDocsActive } from "@/components/docs/nav";

/* The docs link list, shared by the desktop sidebar and the mobile sheet. */
export function DocsNavList({ size = "sm", onNavigate }: { size?: "sm" | "lg"; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className={size === "lg" ? "space-y-8" : "space-y-7"}>
      {DOCS_NAV.map((group) => (
        <div key={group.label}>
          <p className={cn("mb-2 text-ink-3", size === "lg" ? "text-sm" : "px-3 text-[13px]")}>{group.label}</p>
          <ul className={size === "lg" ? "" : "space-y-px"}>
            {group.items.map((item) => {
              const active = isDocsActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center transition-colors",
                      size === "lg"
                        ? "h-12 border-b border-hairline text-xl font-medium tracking-tight"
                        : "rounded-md px-3 py-1.5 text-sm",
                      active ? "text-ink-1" : "text-ink-2 hover:text-ink-1",
                      size === "lg" && !active && "text-ink-2",
                      focusRing,
                    )}
                  >
                    {active && size === "sm" && (
                      <span aria-hidden className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-ink-1" />
                    )}
                    {active && size === "lg" && <span aria-hidden className="mr-3 h-1 w-1 rounded-full bg-brand" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebar() {
  return (
    <aside className="hidden md:block">
      <nav
        aria-label="Documentation"
        className="sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto py-10 pr-4"
      >
        <DocsNavList />
      </nav>
    </aside>
  );
}
