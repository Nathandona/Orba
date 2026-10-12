"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

/* The hero's single product moment: one card dragged from In progress to
   Review, the only thing a Kanban really does (dnd-kit in the app). Sample
   data only, and only fields the real Task has: title, label, priority, due
   date, comment count, one assignee. Decorative: aria-hidden, no focusables. */

type Card = {
  id: string;
  title: string;
  label: string;
  priority: "low" | "medium" | "high";
  due?: string;
  comments?: number;
  who: string;
  stub?: boolean;
};

const CARDS: Record<string, Card> = {
  a1: { id: "a1", title: "Empty state for archived boards", label: "Design", priority: "low", due: "Oct 21", who: "EL" },
  a2: { id: "a2", title: "Import cards from CSV", label: "Platform", priority: "medium", comments: 1, who: "MK" },
  a3: { id: "a3", title: "", label: "", priority: "low", who: "", stub: true },
  move: { id: "move", title: "Ship keyboard shortcuts for card moves", label: "Feature", priority: "high", due: "Oct 14", comments: 4, who: "JL" },
  p2: { id: "p2", title: "Due date reminders by email", label: "Feature", priority: "medium", due: "Oct 18", who: "SR" },
  p3: { id: "p3", title: "Fix drag ghost on Safari", label: "Bug", priority: "high", comments: 2, who: "MK" },
  r1: { id: "r1", title: "Rename columns inline", label: "Feature", priority: "medium", due: "Oct 12", comments: 3, who: "EL" },
  d1: { id: "d1", title: "Archive a project", label: "Feature", priority: "low", who: "JL" },
  d2: { id: "d2", title: "Invite by email", label: "Feature", priority: "medium", comments: 5, who: "SR" },
  d3: { id: "d3", title: "", label: "", priority: "low", who: "", stub: true },
};

type ColId = "backlog" | "progress" | "review" | "done";
const COLS: { id: ColId; name: string; extra: number; mobile: boolean }[] = [
  { id: "backlog", name: "Backlog", extra: 1, mobile: false },
  { id: "progress", name: "In progress", extra: 0, mobile: true },
  { id: "review", name: "Review", extra: 0, mobile: true },
  { id: "done", name: "Done", extra: 3, mobile: false },
];

const START: Record<ColId, string[]> = {
  backlog: ["a1", "a2", "a3"],
  progress: ["move", "p2", "p3"],
  review: ["r1"],
  done: ["d1", "d2", "d3"],
};
const END: Record<ColId, string[]> = { ...START, progress: ["p2", "p3"], review: ["move", "r1"] };

type Phase = "rest" | "point" | "lift" | "dropped";

function PriorityMark({ p }: { p: Card["priority"] }) {
  const bars = p === "high" ? 3 : p === "medium" ? 2 : 1;
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[1, 2, 3].map((i) => (
        <span key={i} className={cn("w-[3px] rounded-[1px]", i <= bars ? "bg-ink-2" : "bg-hairline")} style={{ height: 3 + i * 2 }} />
      ))}
    </span>
  );
}

function Cursor() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="drop-shadow-sm" aria-hidden>
      <path d="M2 1.5 13.5 7 8 8.4 5.6 14 2 1.5Z" className="fill-ink-1 stroke-background" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function BoardCard({ card, phase, isMover }: { card: Card; phase: Phase; isMover: boolean }) {
  if (card.stub) {
    return <div className="h-[72px] rounded-lg border border-hairline bg-background/60 opacity-50" />;
  }
  const lifted = isMover && phase === "lift";
  return (
    <motion.div
      layout
      layoutId={`hero-${card.id}`}
      transition={springSoft}
      animate={{ rotate: lifted ? -1.5 : 0, scale: lifted ? 1.02 : 1 }}
      className={cn(
        "relative rounded-lg border border-hairline bg-background p-3 transition-shadow",
        lifted && "z-10 shadow-[0_14px_32px_-14px_rgb(0_0_0/0.35)]",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate rounded border border-hairline px-1.5 py-0.5 text-[11px] text-ink-2">{card.label}</span>
        <PriorityMark p={card.priority} />
      </div>
      <p className="mt-2 text-[13px] leading-snug font-medium text-ink-1">{card.title}</p>
      <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[11px] text-ink-3">
        <span className="flex min-w-0 items-center gap-2.5">
          {card.due && <span>{card.due}</span>}
          {card.comments ? (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {card.comments}
            </span>
          ) : null}
        </span>
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-1 font-sans text-[9px] font-medium text-background">
          {card.who}
        </span>
      </div>
      {isMover && (phase === "point" || phase === "lift") && (
        <motion.span
          initial={{ opacity: 0, x: 18, y: 14 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute right-8 top-9"
        >
          <Cursor />
        </motion.span>
      )}
    </motion.div>
  );
}

export function HeroBoard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [cols, setCols] = useState(START);
  const [phase, setPhase] = useState<Phase>("rest");
  const [fade, setFade] = useState(false);

  // Reduced motion: show the end state, no loop.
  useEffect(() => {
    if (reduce) {
      setCols(END);
      setPhase("dropped");
    }
  }, [reduce]);

  useEffect(() => {
    if (reduce || !inView) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => t.push(setTimeout(fn, ms));
    const run = () => {
      at(800, () => setPhase("point"));
      at(1350, () => setPhase("lift"));
      at(1550, () => setCols(END));
      at(2350, () => setPhase("dropped"));
      at(5300, () => setFade(true));
      at(5600, () => {
        setCols(START);
        setPhase("rest");
      });
      at(5650, () => setFade(false));
      at(6000, run);
    };
    run();
    return () => t.forEach(clearTimeout);
  }, [inView, reduce]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div aria-hidden className="overflow-hidden rounded-t-2xl border border-b-0 border-hairline bg-surface-2 [mask-image:linear-gradient(to_bottom,black_72%,transparent)]">
        {/* Board header: project name and one owner, nothing claimed. */}
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-ink-1" />
            <span className="truncate text-sm font-medium text-ink-1">Web app</span>
            <span className="truncate font-mono text-xs text-ink-3">Sprint 14</span>
          </div>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-1 text-[10px] font-medium text-background">JL</span>
        </div>

        <motion.div
          animate={{ opacity: fade ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="grid h-[22rem] grid-cols-2 gap-3 p-3 sm:p-4 md:h-[30rem] md:grid-cols-4 md:gap-4"
        >
          <LayoutGroup>
            {COLS.map((col) => {
              const count = cols[col.id].length + col.extra;
              return (
                <div key={col.id} className={cn("min-w-0 flex-col gap-2.5", col.mobile ? "flex" : "hidden md:flex")}>
                  <div className="flex items-center gap-2 px-1 pb-1">
                    <span className="text-xs font-medium text-ink-2">{col.name}</span>
                    <span className="font-mono text-[11px] tabular-nums text-ink-3">{count}</span>
                    {col.id === "review" && phase === "dropped" && (
                      <motion.span
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: [0.4, 1.6, 1], opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="h-1.5 w-1.5 rounded-full bg-brand"
                      />
                    )}
                  </div>
                  {col.id === "review" && phase === "lift" && cols.review[0] !== "move" && (
                    <div className="h-[92px] rounded-lg border border-dashed border-hairline" />
                  )}
                  {cols[col.id].map((id) => (
                    <BoardCard key={id} card={CARDS[id]} phase={phase} isMover={id === "move"} />
                  ))}
                </div>
              );
            })}
          </LayoutGroup>
        </motion.div>
      </div>
      <p className="sr-only">Illustration: a card moving from In progress to Review on an Orba board.</p>
    </div>
  );
}
