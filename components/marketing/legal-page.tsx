"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section } from "@/components/marketing/section";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { DisplayHeading, SerifEm } from "@/components/marketing/display-heading";
import { CtaBand } from "@/components/marketing/cta-band";
import { fadeUp, viewportOnce } from "@/lib/motion";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  cta?: {
    eyebrow?: string;
    heading: React.ReactNode;
    description?: string;
  };
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  cta,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(circle_at_50%_0%,var(--brand-muted),transparent_60%)]"
        />
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-[52rem] text-center"
          >
            <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
            <DisplayHeading as="h1" size="display" className="mt-6">
              {title}
            </DisplayHeading>
            <p className="mx-auto mt-7 max-w-[42rem] text-lead leading-relaxed text-ink-2">
              {intro}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ink-3">
              Last updated · {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <Section tone="default" className="pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* TOC */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <Eyebrow>Contents</Eyebrow>
              <nav className="mt-5 flex flex-col gap-2 border-l border-hairline pl-5">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-baseline gap-3 text-sm text-ink-2 transition-colors hover:text-brand"
                  >
                    <span className="font-serif text-xs italic text-ink-3 group-hover:text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <article className="lg:col-span-8 xl:col-span-9">
            <div className="space-y-16">
              {sections.map((s, i) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="scroll-mt-24"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-3xl italic text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-h2 font-medium tracking-[-0.02em]">{s.title}</h2>
                  </div>
                  <div className="mt-6 space-y-4 border-t border-hairline pt-6 text-base leading-relaxed text-ink-2 [&_a]:text-brand [&_a]:underline-offset-4 [&_a:hover]:underline [&_strong]:font-medium [&_strong]:text-ink-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6">
                    {s.body}
                  </div>
                </motion.section>
              ))}
            </div>
          </article>
        </div>
      </Section>

      {cta && (
        <CtaBand
          eyebrow={cta.eyebrow ?? "Questions"}
          heading={cta.heading}
          description={cta.description}
          primaryText="Start free"
          secondaryText="Talk to legal"
        />
      )}

      <Footer />
    </div>
  );
}

export { SerifEm };
