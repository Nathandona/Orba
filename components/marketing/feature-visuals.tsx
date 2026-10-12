"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, FileText, MessageSquare, Paperclip } from "lucide-react";

import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

/* Decorative UI crops for the features grid. Sample data only, never claims.
   No focusable elements: the plates are aria-hidden. */

const DEMO = {
  boards: {
    from: { name: "In Progress", count: 3, cards: ["Pricing page copy", "Onboarding empty state"] },
    to: { name: "Review", count: 1 },
    moving: "Fix invite email on Safari",
    menu: ["Rename column", "Change colour", "Delete column"],
  },
  card: {
    title: "Ship annual billing toggle",
    due: "Oct 24",
    labels: ["billing", "web"],
    assignee: { initials: "JL", name: "Jonas" },
  },
  thread: [
    { initials: "EL", name: "Elena", time: "2h", text: "Copy is in the doc, ready for review." },
    { initials: "MK", name: "Marc", time: "12m", text: "Looks good. Shipping after QA." },
  ],
  file: { name: "pricing-v3.pdf", size: "2.4 MB" },
  team: [
    { initials: "JL", name: "Jonas L.", email: "jonas@studio.dev", role: "Owner" },
    { initials: "ER", name: "Elena R.", email: "elena@studio.dev", role: "Admin" },
  ],
  pending: "sam@studio.dev",
  templates: [
    { name: "Blank board", category: "To Do · In Progress · Done", plan: "Free" },
    { name: "Sprint planning", category: "Product", plan: "Free" },
    { name: "Content calendar", category: "Marketing", plan: "Pro" },
  ],
  projects: [
    { name: "Website relaunch", done: 14, total: 22, members: 4, due: "Nov 3" },
    { name: "Mobile onboarding", done: 5, total: 9, members: 2, due: "Oct 28" },
  ],
  dueNext: [
    { title: "Review pricing table", priority: "High", due: "Oct 21" },
    { title: "Draft release notes", priority: "Medium", due: "Oct 22" },
  ],
};

const inView = { once: true, amount: 0.5 } as const;

/* ---------- primitives ---------- */

export function MiniCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-hairline bg-background p-3 shadow-[0_1px_0_var(--hairline)]", className)}>
      {children}
    </div>
  );
}

export function Chip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded border border-hairline px-1.5 py-0.5 text-[11px] leading-none text-ink-2", className)}>
      {children}
    </span>
  );
}

export function Avatar({ initials, dashed, className }: { initials?: string; dashed?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-medium",
        dashed ? "border border-dashed border-ink-3 text-ink-3" : "bg-ink-1 text-background",
        className,
      )}
    >
      {initials}
    </span>
  );
}

function Priority({ level }: { level: "Low" | "Medium" | "High" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[12px]",
        level === "High" ? "font-medium text-ink-1" : level === "Medium" ? "text-ink-2" : "text-ink-3",
      )}
    >
      {level === "High" && <span className="h-1.5 w-1.5 rounded-full bg-ink-1" />}
      {level}
    </span>
  );
}

/* ---------- 1. Boards: a column close-up ---------- */

export function BoardsVisual() {
  const reduce = useReducedMotion();
  const d = DEMO.boards;
  return (
    <div className="relative flex min-h-[220px] gap-3 p-5 pt-6 pb-20">
      <div className="relative w-1/2 min-w-0">
        <div className="border-t-2 border-ink-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-ink-1">{d.from.name}</span>
            <span className="font-mono text-[11px] text-ink-3">{d.from.count}</span>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {d.from.cards.map((c) => (
            <MiniCard key={c} className="py-2.5">
              <p className="truncate text-[12px] text-ink-1">{c}</p>
            </MiniCard>
          ))}
        </div>
        <div className="hidden">
          {d.menu.map((m, i) => (
            <div
              key={m}
              className={cn(
                "rounded px-2 py-1.5 text-[11px]",
                i === d.menu.length - 1 ? "text-destructive" : "text-ink-2",
                i === 0 && "bg-surface-2 text-ink-1",
              )}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 min-w-0">
        <div className="border-t-2 border-brand pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-ink-1">{d.to.name}</span>
            <span className="font-mono text-[11px] text-ink-3">{d.to.count}</span>
          </div>
        </div>
        <div className="mt-3 h-[52px] rounded-lg border border-dashed border-brand/50 bg-brand-tint/40" />
      </div>
      <motion.div
        initial={reduce ? false : { x: -24, rotate: -3 }}
        whileInView={{ x: 0, rotate: -3 }}
        viewport={inView}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="absolute bottom-6 left-[34%] w-[44%] min-w-0"
      >
        <MiniCard className="py-2.5 shadow-lg dark:shadow-black/40">
          <p className="truncate text-[12px] text-ink-1">{d.moving}</p>
          <div className="mt-2 flex items-center justify-between">
            <Chip>Bug</Chip>
            <Avatar initials="MK" />
          </div>
        </MiniCard>
      </motion.div>
    </div>
  );
}

/* ---------- 2. Card detail: property panel ---------- */

export function CardDetailVisual() {
  const reduce = useReducedMotion();
  const d = DEMO.card;
  return (
    <div className="relative p-5">
      <MiniCard className="p-4">
        <p className="text-[14px] font-medium text-ink-1">{d.title}</p>
        <dl className="mt-4 grid grid-cols-[5.5rem_1fr] items-center gap-y-2.5 text-[12px]">
          <dt className="text-ink-3">Priority</dt>
          <dd className="relative">
            <span className="inline-flex rounded px-1.5 py-0.5 ring-1 ring-brand">
              <Priority level="High" />
            </span>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.4, delay: 0.2, ease: easeOutExpo }}
              className="absolute left-0 top-7 z-10 hidden w-28 rounded-lg border border-hairline bg-background p-1 shadow-md sm:block"
            >
              {(["Low", "Medium", "High"] as const).map((l) => (
                <div key={l} className={cn("flex items-center justify-between rounded px-2 py-1", l === "High" && "bg-surface-2")}>
                  <Priority level={l} />
                  {l === "High" && <Check className="h-3 w-3 text-ink-1" />}
                </div>
              ))}
            </motion.div>
          </dd>
          <dt className="text-ink-3">Due</dt>
          <dd className="font-mono text-[11px] text-ink-1">{d.due}</dd>
          <dt className="text-ink-3">Labels</dt>
          <dd className="flex gap-1">
            {d.labels.map((l) => (
              <Chip key={l}>{l}</Chip>
            ))}
          </dd>
          <dt className="text-ink-3">Assignee</dt>
          <dd className="flex items-center gap-1.5 text-ink-1">
            <Avatar initials={d.assignee.initials} />
            {d.assignee.name}
          </dd>
        </dl>
      </MiniCard>
    </div>
  );
}

/* ---------- 3. Comments & files ---------- */

export function ThreadVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col gap-2 p-5">
      {DEMO.thread.map((c, i) => (
        <motion.div
          key={c.name}
          initial={reduce || i === 0 ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
        >
          <MiniCard className="p-2.5">
            <div className="flex items-center gap-1.5">
              <Avatar initials={c.initials} />
              <span className="text-[12px] font-medium text-ink-1">{c.name}</span>
              <span className="font-mono text-[10px] text-ink-3">{c.time}</span>
            </div>
            <p className="mt-1.5 truncate text-[12px] text-ink-2">{c.text}</p>
          </MiniCard>
        </motion.div>
      ))}
      <MiniCard className="flex items-center gap-2 p-2.5">
        <FileText className="h-3.5 w-3.5 shrink-0 text-ink-3" />
        <span className="min-w-0 flex-1 truncate text-[12px] text-ink-1">{DEMO.file.name}</span>
        <span className="font-mono text-[10px] text-ink-3">{DEMO.file.size}</span>
      </MiniCard>
      <div className="mt-auto flex items-center gap-3 px-1 font-mono text-[11px] text-ink-3">
        <span className="inline-flex items-center gap-1">
          <MessageSquare className="h-3 w-3" /> 2
        </span>
        <span className="inline-flex items-center gap-1">
          <Paperclip className="h-3 w-3" /> 1
        </span>
      </div>
    </div>
  );
}

/* ---------- 4. Team & roles ---------- */

export function TeamVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col gap-2 p-5">
      <div className="flex items-center gap-2 rounded-md border border-hairline bg-background py-1 pl-3 pr-1">
        <span className="min-w-0 flex-1 truncate text-[12px] text-ink-3">Invite by email</span>
        <span className="rounded bg-ink-1 px-2 py-1 text-[11px] font-medium text-background">Send</span>
      </div>
      <div className="rounded-lg border border-hairline bg-background">
        {DEMO.team.map((m) => (
          <div key={m.name} className="flex items-center gap-2 border-b border-hairline px-2.5 py-2">
            <Avatar initials={m.initials} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-ink-1">{m.name}</p>
              <p className="truncate text-[10px] text-ink-3">{m.email}</p>
            </div>
            <Chip>{m.role}</Chip>
          </div>
        ))}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
          className="flex items-center gap-2 px-2.5 py-2"
        >
          <Avatar dashed />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] text-ink-1">{DEMO.pending}</p>
            <p className="inline-flex items-center gap-1 text-[10px] text-ink-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Pending
            </p>
          </div>
          <Chip>Member</Chip>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- 5. Templates picker ---------- */

export function TemplatesVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col gap-2 p-5">
      {DEMO.templates.map((t, i) => (
        <div key={t.name} className="relative">
          {i === 0 && (
            <motion.span
              aria-hidden
              initial={reduce ? false : { y: 56 }}
              whileInView={{ y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
              className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-brand"
            />
          )}
          <MiniCard className="flex items-center gap-3 p-2.5">
            <span className="flex h-6 w-8 shrink-0 items-end gap-0.5 rounded bg-surface-2 p-1">
              <span className="h-full w-1/3 rounded-[1px] bg-ink-3/40" />
              <span className="h-2/3 w-1/3 rounded-[1px] bg-ink-3/40" />
              <span className="h-1/3 w-1/3 rounded-[1px] bg-ink-3/40" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] text-ink-1">{t.name}</span>
              <span className="block truncate text-[10px] text-ink-3">{t.category}</span>
            </span>
            {t.plan === "Pro" ? (
              <span className="rounded bg-ink-1 px-1.5 py-0.5 text-[10px] font-medium leading-none text-background">Pro</span>
            ) : (
              <Chip>Free</Chip>
            )}
            {i === 0 && <Check className="h-3.5 w-3.5 shrink-0 text-ink-1" />}
          </MiniCard>
        </div>
      ))}
    </div>
  );
}

/* ---------- 6. Overview: dashboard crop ---------- */

export function OverviewVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col p-5 sm:p-6">
      <div className="space-y-2">
        {DEMO.projects.map((p, i) => (
          <MiniCard key={p.name} className={cn("p-3", i === 1 && "hidden sm:block")}>
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[12px] font-medium text-ink-1">{p.name}</span>
              <span className="shrink-0 font-mono text-[11px] text-ink-3">
                {p.done}/{p.total} tasks
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-hairline">
              <motion.div
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inView}
                transition={{ duration: 0.9, delay: 0.1 * i, ease: easeOutExpo }}
                style={{ width: `${(p.done / p.total) * 100}%` }}
                className="h-full origin-left rounded-full bg-ink-1"
              />
            </div>
            <div className="mt-2 flex gap-3 text-[11px] text-ink-3">
              <span>{p.members} members</span>
              <span className="font-mono">Due {p.due}</span>
            </div>
          </MiniCard>
        ))}
      </div>
      <div className="mt-3 border-t border-hairline pt-3">
        <p className="text-[11px] font-medium text-ink-2">Due next</p>
        {DEMO.dueNext.map((t) => (
          <div key={t.title} className="mt-1.5 flex items-center gap-3 text-[12px]">
            <span className="min-w-0 flex-1 truncate text-ink-1">{t.title}</span>
            <Priority level={t.priority as "High" | "Medium"} />
            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-ink-3">{t.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
