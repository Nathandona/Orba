"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal, RevealText, afterWords, wordCount, type Segment } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";
import { focusRing } from "@/lib/ui";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  title: Segment[];
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/* Highlights the section nearest the top of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function LegalPage({ title, intro, lastUpdated, sections }: LegalPageProps) {
  const ids = React.useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  const after = afterWords(wordCount(title));

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      <header className="mx-auto max-w-[80rem] px-4 pt-32 pb-12 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40 lg:pb-16">
        <div className="max-w-[48rem]">
          <RevealText
            as="h1"
            instant
            segments={title}
            className="text-h1 leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-ink-1"
          />
          <Reveal as="p" instant delay={after} className="mt-6 max-w-[40rem] text-lead leading-relaxed text-ink-2">
            {intro}
          </Reveal>
          <Reveal as="p" instant delay={after + 90} className="mt-6 font-mono text-xs text-ink-3">
            Last updated {lastUpdated}
          </Reveal>
        </div>
      </header>

      <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-10 border-t border-hairline px-4 pt-10 pb-24 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pt-14 lg:pb-32">
        {/* Contents: sticky list on lg, collapsible on small screens. */}
        <aside className="min-w-0 lg:col-span-3">
          <details className="group rounded-lg border border-hairline lg:hidden">
            <summary className={cn("flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-ink-1", focusRing)}>
              Contents
              <span className="font-mono text-xs text-ink-3 group-open:hidden">{sections.length} sections</span>
            </summary>
            <ol className="border-t border-hairline px-4 py-3">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={cn("flex gap-3 py-1.5 text-sm text-ink-2 hover:text-ink-1", focusRing)}>
                    <span className="font-mono text-xs leading-5 text-ink-3">{num(i)}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <nav aria-label="Contents" className="sticky top-24 hidden lg:block">
            <p className="mb-3 text-[13px] text-ink-3">Contents</p>
            <ol className="space-y-px">
              {sections.map((s, i) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "flex items-baseline gap-3 rounded-sm py-1.5 text-sm leading-snug transition-colors",
                        on ? "text-ink-1" : "text-ink-2 hover:text-ink-1",
                        focusRing,
                      )}
                    >
                      <span className="font-mono text-xs text-ink-3">{num(i)}</span>
                      <span className="min-w-0 flex-1">{s.title}</span>
                      <span aria-hidden className={cn("h-1 w-1 shrink-0 self-center rounded-full bg-brand transition-opacity", on ? "opacity-100" : "opacity-0")} />
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[45rem] lg:col-span-9">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-hairline py-10 first:border-t-0 first:pt-0">
              <h2 className="group flex items-baseline gap-3 text-h3 font-medium tracking-[-0.015em] text-ink-1">
                <span className="font-mono text-sm font-normal text-ink-3">{num(i)}</span>
                <span className="min-w-0">{s.title}</span>
                <a
                  href={`#${s.id}`}
                  aria-label={`Link to ${s.title}`}
                  className={cn("rounded-sm text-ink-3 opacity-0 transition-opacity hover:text-ink-1 group-hover:opacity-100 focus-visible:opacity-100", focusRing)}
                >
                  <Link2 className="h-4 w-4" />
                </a>
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-2 sm:text-base [&_a]:text-ink-1 [&_a]:underline [&_a]:decoration-hairline [&_a]:underline-offset-4 [&_a:hover]:decoration-ink-1 [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-ink-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-ink-3">
                {s.body}
              </div>
            </section>
          ))}
        </article>
      </div>

      <Footer />
    </div>
  );
}
