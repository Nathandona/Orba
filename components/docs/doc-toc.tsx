"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { focusRing } from "@/lib/ui";

interface Heading {
  id: string;
  text: string;
}

/* "On this page": built from the article's h2s after each navigation, with
   the heading nearest the top of the viewport marked active. */
export function DocToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLHeadingElement>("[data-doc-article] h2[id]"));
    setHeadings(els.map((el) => ({ id: el.id, text: el.dataset.tocLabel || el.textContent || "" })));
    setActive(els[0]?.id ?? null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto py-10 pl-2">
      <p className="mb-3 text-[13px] text-ink-3">On this page</p>
      <ul className="space-y-px border-l border-hairline">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 pl-3 text-[13px] leading-snug transition-colors",
                active === h.id ? "border-ink-1 text-ink-1" : "border-transparent text-ink-3 hover:text-ink-1",
                focusRing,
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
