"use client";

import * as React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Clock, GripVertical, MessageSquare, Paperclip, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

/* Sample data only, shared by the three visuals: one task followed through the week. */
const TASK = { title: "Billing page copy", label: "Website", due: "Oct 16", owner: "JL" };

type VisualProps = { play: boolean };

function Initials({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-1 text-[10px] font-medium text-background",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Pip({ className }: { className?: string }) {
  return <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", className)} />;
}

/* MON · Plan: crop of the "New project" dialog. */
export function PlanVisual({ play }: VisualProps) {
  const columns = [
    { name: "To Do", pip: "bg-ink-3" },
    { name: "In Progress", pip: "bg-ink-2" },
    { name: "Done", pip: "bg-ink-1" },
  ];
  const swatches = ["bg-ink-1", "bg-ink-2", "bg-ink-3", "bg-hairline", "bg-surface-2", "bg-brand"];
  const typed = "Review";
  const [chars, setChars] = React.useState(play ? 0 : typed.length);

  React.useEffect(() => {
    if (!play) {
      setChars(typed.length);
      return;
    }
    setChars(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(function tick() {
      i += 1;
      setChars(i);
      if (i < typed.length) timer = setTimeout(tick, 100);
    }, 450);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [play]);

  return (
    <div className="w-full max-w-[27.5rem] min-w-0 rounded-xl border border-hairline bg-surface-1 p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink-1">New project</p>
        <div className="flex gap-4 text-xs">
          <span className="text-ink-3">Template</span>
          <span className="border-b border-ink-1 pb-0.5 text-ink-1">Custom</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] text-ink-3">Name</p>
        <div className="mt-1 flex h-9 items-center rounded-md border border-hairline bg-background px-3 text-sm text-ink-1">
          <span className="truncate">Website relaunch</span>
        </div>
        <div className="mt-3 flex gap-2">
          {swatches.map((s, i) => (
            <span
              key={s}
              className={cn(
                "h-5 w-5 rounded-full border border-hairline",
                s,
                i === 0 && "ring-2 ring-ink-1 ring-offset-2 ring-offset-surface-1",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] text-ink-3">Columns</p>
        <ul className="mt-1.5 space-y-1.5">
          {columns.map((c, i) => (
            <motion.li
              key={c.name}
              initial={play ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: play ? i * 0.04 : 0, ease: easeOutExpo }}
              className="flex h-8 items-center gap-2 rounded-md border border-hairline bg-background px-2.5 text-sm text-ink-1"
            >
              <GripVertical className="h-3.5 w-3.5 shrink-0 text-ink-3" />
              <Pip className={c.pip} />
              <span className="truncate">{c.name}</span>
            </motion.li>
          ))}
          <li className="flex h-8 items-center gap-2 rounded-md border border-dashed border-hairline px-2.5 text-sm">
            <Plus className="h-3.5 w-3.5 shrink-0 text-ink-3" />
            {chars > 0 ? (
              <span className="truncate text-ink-1">
                {typed.slice(0, chars)}
                {play && chars < typed.length && (
                  <span aria-hidden className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-brand" />
                )}
              </span>
            ) : (
              <span className="text-ink-3">Add column</span>
            )}
          </li>
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <div className="flex items-center gap-1.5">
          <Initials>JL</Initials>
          <Initials className="bg-ink-2">EL</Initials>
          <span className="inline-flex h-6 items-center gap-1 rounded-full border border-dashed border-hairline px-2 text-[11px] text-ink-2">
            <Plus className="h-3 w-3" />
            Invite
          </span>
        </div>
        <span className="inline-flex h-8 shrink-0 items-center rounded-md bg-ink-1 px-3 text-xs font-medium text-background">
          Create project
        </span>
      </div>
    </div>
  );
}

function TaskCard({ className, lifted }: { className?: string; lifted?: boolean }) {
  return (
    <div
      className={cn(
        "w-full min-w-0 rounded-lg border border-hairline bg-background p-3",
        lifted && "shadow-lg dark:shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded border border-hairline px-1.5 py-0.5 text-[11px] text-ink-2">{TASK.label}</span>
        <span className="text-[11px] font-medium text-ink-1">High</span>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-ink-1">{TASK.title}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 font-mono text-[11px] text-ink-3">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {TASK.due}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />2
          </span>
          <span className="inline-flex items-center gap-1">
            <Paperclip className="h-3 w-3" />1
          </span>
        </div>
        <Initials>{TASK.owner}</Initials>
      </div>
    </div>
  );
}

/* WED · Track: the card and its detail panel, Comments tab open. */
export function TrackVisual({ play }: VisualProps) {
  const comments = [
    { who: "EL", name: "Elena", time: "09:12", text: "Pricing table copy is in the doc." },
    { who: "JL", name: "Jonas", time: "11:40", text: "Looks good, shipping the FR version after." },
  ];
  return (
    <div className="flex w-full max-w-[34rem] min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:gap-0">
      <div className="relative w-full sm:w-[45%] sm:shrink-0 sm:pt-10">
        <TaskCard />
      </div>

      <div className="w-full min-w-0 rounded-xl border border-hairline bg-surface-1 shadow-sm relative sm:-ml-6 sm:w-[58%]">
        <div className="flex gap-4 border-b border-hairline px-4 pt-3 text-xs">
          <span className="pb-2.5 text-ink-3">Details</span>
          <span className="border-b border-ink-1 pb-2.5 text-ink-1">
            Comments <span className="font-mono text-ink-3">2</span>
          </span>
          <span className="pb-2.5 text-ink-3">
            Files <span className="font-mono">1</span>
          </span>
        </div>
        <ul className="space-y-3 px-4 py-3">
          {comments.map((c, i) => (
            <motion.li
              key={c.time}
              initial={play && i === 1 ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: play ? 0.45 : 0, ease: easeOutExpo }}
              className="flex gap-2.5"
            >
              <Initials className={i === 0 ? "bg-ink-2" : undefined}>{c.who}</Initials>
              <div className="min-w-0">
                <p className="text-xs text-ink-1">
                  <span className="font-medium">{c.name}</span>{" "}
                  <span className="font-mono text-[11px] text-ink-3">{c.time}</span>
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-ink-2">{c.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-hairline px-4 py-3">
          <span className="flex h-8 min-w-0 flex-1 items-center rounded-md border border-hairline bg-background px-2.5 text-xs text-ink-3">
            <span className="truncate">Add a comment...</span>
          </span>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink-1 text-background">
            <Send className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* FRI · Ship: the card dragged into Done, the project progress ticks up. */
export function ShipVisual({ play }: VisualProps) {
  const [moved, setMoved] = React.useState(!play);

  React.useEffect(() => {
    if (!play) {
      setMoved(true);
      return;
    }
    setMoved(false);
    const t = setTimeout(() => setMoved(true), 700);
    return () => clearTimeout(t);
  }, [play]);

  const done = moved ? 9 : 8;
  const columns = [
    { name: "In Progress", count: moved ? 2 : 3, holds: !moved, rest: 1 },
    { name: "Done", count: done, holds: moved, rest: 1 },
  ];

  return (
    <div className="w-full max-w-[30rem] min-w-0 space-y-4">
      <LayoutGroup id="ship-visual">
        <div className="grid grid-cols-2 gap-3">
          {columns.map((col) => (
            <div key={col.name} className="min-w-0 rounded-xl border border-hairline bg-surface-2 p-2.5">
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-ink-1">
                  <span className="truncate">{col.name}</span>
                  {col.name === "Done" && moved && play && (
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.2, times: [0, 0.15, 0.8, 1] }}
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                  )}
                </span>
                <span className="font-mono text-[11px] text-ink-3">{col.count}</span>
              </div>
              <div className="space-y-2">
                {col.holds && (
                  <motion.div
                    layoutId="ship-card"
                    transition={{ duration: play ? 0.7 : 0, ease: easeOutExpo }}
                    className={cn(
                      "truncate rounded-lg border border-hairline bg-background px-2.5 py-2 text-xs font-medium text-ink-1",
                      !moved && play && "rotate-2 shadow-lg dark:shadow-black/40",
                    )}
                  >
                    {TASK.title}
                  </motion.div>
                )}
                {Array.from({ length: col.rest }).map((_, i) => (
                  <div key={i} className="h-8 rounded-lg border border-hairline bg-background opacity-60" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>

      <div className="rounded-xl border border-hairline bg-surface-1 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink-1">
            <Pip className="bg-ink-1" />
            <span className="truncate">Website relaunch</span>
          </span>
          <span className="shrink-0 font-mono text-[11px] text-ink-3">{done} / 11 done</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-hairline">
          <motion.div
            className="h-full origin-left rounded-full bg-ink-1"
            initial={false}
            animate={{ scaleX: done / 11 }}
            transition={{ duration: play ? 0.6 : 0, ease: easeOutExpo }}
          />
        </div>
      </div>
    </div>
  );
}
