"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

import { Section } from "@/components/marketing/section";
import { PlanVisual, ShipVisual, TrackVisual } from "@/components/marketing/week-visuals";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { focusRing } from "@/lib/ui";
import { Reveal, RevealText, afterWords, wordCount } from "@/components/marketing/reveal";

const ADVANCE_MS = 7000;

const STEPS = [
  {
    id: "plan",
    day: "MON",
    name: "Plan",
    title: "Set up the board before standup.",
    body: "Start from a template or name your own columns. Give the project a colour and a due date, invite the team by email, and you are ready.",
    facts: ["Templates", "Custom columns", "Member or admin roles"],
    Visual: PlanVisual,
  },
  {
    id: "track",
    day: "WED",
    name: "Track",
    title: "Everything about a task lives on its card.",
    body: "Priority, due date, labels and an owner on the front. The description, comments and files sit one click behind it.",
    facts: ["Low · Medium · High", "Comments", "Files up to 10 MB"],
    Visual: TrackVisual,
  },
  {
    id: "ship",
    day: "FRI",
    name: "Ship",
    title: "Drag it to Done. The dashboard keeps count.",
    body: "Move cards between columns with drag and drop. Each project shows how much is done and how much is still open, so nobody has to ask where things stand.",
    facts: ["Drag and drop", "Done vs. open per project"],
    Visual: ShipVisual,
  },
] as const;

function Facts({ facts }: { facts: readonly string[] }) {
  return <p className="font-mono text-[11px] tracking-wide text-ink-3">{facts.join(" / ")}</p>;
}

function StepLabel({ day, name }: { day: string; name: string }) {
  return (
    <p className="flex items-center gap-2 text-xs">
      <span className="font-mono tracking-wide text-ink-2">{day}</span>
      <span className="text-ink-3">{name}</span>
    </p>
  );
}

/* Desktop: vertical tabs with one stage, auto-advancing while in view. */
function Tabs() {
  const reduce = useReducedMotion();
  const frameRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { amount: 0.4 });
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [stopped, setStopped] = React.useState(false);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const running = !reduce && !stopped && !hovered && inView;

  React.useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, running]);

  const select = (i: number) => {
    setStopped(true);
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = STEPS.length - 1;
    const next =
      e.key === "ArrowDown" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowUp" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
  };

  const step = STEPS[active];
  const Visual = step.Visual;

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(false);
      }}
      className="mt-14 hidden overflow-hidden rounded-2xl border border-hairline bg-surface-1 lg:grid lg:grid-cols-12"
    >
      <div role="tablist" aria-orientation="vertical" aria-label="A week with Orba" onKeyDown={onKeyDown} className="col-span-4 border-r border-hairline">
        {STEPS.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`week-tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="week-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "relative block w-full border-b border-hairline px-7 py-6 text-left transition-colors last:border-b-0",
                isActive ? "bg-surface-2" : "hover:bg-surface-2/60",
                focusRing,
                "focus-visible:ring-inset focus-visible:ring-offset-0",
              )}
            >
              <span aria-hidden className={cn("absolute inset-y-0 left-0 w-0.5", isActive ? "bg-ink-1" : "bg-transparent")}>
                {isActive && running && (
                  <motion.span
                    key={`${s.id}-${active}`}
                    className="absolute inset-x-0 top-0 block bg-brand"
                    initial={{ height: "0%" }}
                    animate={{ height: "100%" }}
                    transition={{ duration: ADVANCE_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
              <StepLabel day={s.day} name={s.name} />
              <span className={cn("mt-2 block text-lg font-medium tracking-[-0.01em]", isActive ? "text-ink-1" : "text-ink-2")}>
                {s.title}
              </span>
              {isActive && (
                <span className="mt-3 block space-y-3">
                  <span className="block text-sm leading-relaxed text-ink-2">{s.body}</span>
                  <Facts facts={s.facts} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id="week-panel"
        role="tabpanel"
        aria-labelledby={`week-tab-${step.id}`}
        className="col-span-8 flex min-h-[520px] items-center justify-center bg-background bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:16px_16px] p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            aria-hidden
            className="flex w-full justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: easeOutExpo } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          >
            <Visual play={!reduce} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Mobile and tablet: three stacked cards, each visual plays once in view. */
function MobileCard({ step }: { step: (typeof STEPS)[number] }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const Visual = step.Visual;
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-hairline bg-surface-1">
      <div className="space-y-3 p-6">
        <StepLabel day={step.day} name={step.name} />
        <h3 className="text-lg font-medium tracking-[-0.01em] text-ink-1">{step.title}</h3>
        <p className="text-sm leading-relaxed text-ink-2">{step.body}</p>
        <Facts facts={step.facts} />
      </div>
      <div
        ref={ref}
        aria-hidden
        className="flex min-h-[300px] items-center justify-center border-t border-hairline bg-background px-4 py-8"
      >
        {seen || reduce ? <Visual play={!reduce} /> : null}
      </div>
    </article>
  );
}

const HEADING = ["A week with Orba,", { text: "start to finish.", className: "text-ink-3" }];

export function WeekWalkthrough() {
  return (
    <Section tone="muted">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <RevealText
          segments={HEADING}
          className="text-h1 leading-[1.02] font-medium tracking-[-0.02em] text-balance text-ink-1 lg:col-span-7"
        />
        <Reveal as="p" delay={afterWords(wordCount(HEADING))} className="text-lead leading-relaxed text-ink-2 lg:col-span-5">
          Follow one task from Monday&apos;s plan to Friday&apos;s done. Three moments, one board, nothing you have to configure first.
        </Reveal>
      </div>

      <Tabs />

      <div className="mt-12 grid grid-cols-1 gap-4 lg:hidden">
        {STEPS.map((s) => (
          <MobileCard key={s.id} step={s} />
        ))}
      </div>
    </Section>
  );
}
