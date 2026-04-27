"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Bug,
  CheckCircle2,
  Circle,
  CircleDot,
  Clock,
  Compass,
  Flag,
  GitPullRequest,
  Megaphone,
  MessageSquare,
  Paintbrush,
  Paperclip,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "green" | "amber" | "rose" | "violet" | "slate" | "teal" | "lime";

interface MockTask {
  id: string;
  title: string;
  tag: { label: string; tone: Tone };
  priority?: "low" | "med" | "high";
  due?: string;
  comments?: number;
  attachments?: number;
  assignees: string[];
  progress?: number;
}

interface MockColumn {
  id: string;
  title: string;
  accent: string;
  tasks: MockTask[];
  empty?: { kind: "drop" | "shipped"; label: string };
}

interface BoardPreset {
  project: string;
  subtitle: string;
  badge: string;
  icon: LucideIcon;
  columns: [MockColumn, MockColumn, MockColumn];
}

const TAG_TONE: Record<Tone, string> = {
  blue: "bg-[oklch(0.93_0.05_250)] text-[oklch(0.42_0.18_250)] dark:bg-[oklch(0.42_0.18_250/0.18)] dark:text-[oklch(0.78_0.14_250)]",
  green:
    "bg-[oklch(0.94_0.06_150)] text-[oklch(0.42_0.16_150)] dark:bg-[oklch(0.42_0.16_150/0.18)] dark:text-[oklch(0.80_0.13_150)]",
  amber:
    "bg-[oklch(0.95_0.07_85)] text-[oklch(0.50_0.15_70)] dark:bg-[oklch(0.50_0.15_70/0.18)] dark:text-[oklch(0.84_0.13_85)]",
  rose: "bg-[oklch(0.94_0.06_15)] text-[oklch(0.48_0.18_15)] dark:bg-[oklch(0.48_0.18_15/0.18)] dark:text-[oklch(0.80_0.14_15)]",
  violet:
    "bg-[oklch(0.93_0.06_295)] text-[oklch(0.46_0.20_295)] dark:bg-[oklch(0.46_0.20_295/0.18)] dark:text-[oklch(0.80_0.15_295)]",
  slate:
    "bg-[oklch(0.95_0.005_240)] text-[oklch(0.40_0.01_240)] dark:bg-[oklch(0.40_0.01_240/0.22)] dark:text-[oklch(0.78_0.005_240)]",
  teal: "bg-[oklch(0.93_0.06_200)] text-[oklch(0.42_0.14_200)] dark:bg-[oklch(0.42_0.14_200/0.18)] dark:text-[oklch(0.80_0.12_200)]",
  lime: "bg-[oklch(0.95_0.08_120)] text-[oklch(0.45_0.16_125)] dark:bg-[oklch(0.45_0.16_125/0.18)] dark:text-[oklch(0.82_0.13_120)]",
};

const PRIORITY = {
  low: { color: "text-ink-3/50", icon: Circle },
  med: { color: "text-[oklch(0.65_0.16_85)]", icon: CircleDot },
  high: { color: "text-[oklch(0.62_0.20_25)]", icon: CircleDot },
} as const;

// ── Presets ────────────────────────────────────────────────────────────

const launch: BoardPreset = {
  project: "Atlas launch",
  subtitle: "Q2 · 23 tasks",
  badge: "orba.work / atlas-launch",
  icon: Flag,
  columns: [
    {
      id: "todo",
      title: "Backlog",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "l1",
          title: "Polish onboarding empty states",
          tag: { label: "Design", tone: "violet" },
          priority: "med",
          due: "Apr 30",
          comments: 3,
          attachments: 2,
          assignees: ["NA", "JM"],
        },
        {
          id: "l2",
          title: "Wire Stripe webhooks for cancellations",
          tag: { label: "Billing", tone: "blue" },
          priority: "high",
          due: "May 02",
          comments: 1,
          assignees: ["EL"],
        },
        {
          id: "l3",
          title: "Investigate flaky e2e on Chromium",
          tag: { label: "QA", tone: "slate" },
          priority: "low",
          assignees: ["SR"],
        },
      ],
    },
    {
      id: "doing",
      title: "In progress",
      accent: "bg-brand",
      tasks: [
        {
          id: "l4",
          title: "Migrate legacy boards to v2 schema",
          tag: { label: "Platform", tone: "amber" },
          priority: "high",
          due: "Apr 28",
          comments: 12,
          attachments: 4,
          assignees: ["NA", "MK", "JM"],
          progress: 64,
        },
        {
          id: "l5",
          title: "Realtime cursors on shared boards",
          tag: { label: "Feature", tone: "green" },
          priority: "med",
          due: "May 05",
          comments: 7,
          assignees: ["EL", "SR"],
          progress: 32,
        },
      ],
      empty: { kind: "drop", label: "Drop task here" },
    },
    {
      id: "done",
      title: "Shipped",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "l6",
          title: "Two-factor auth via authenticator apps",
          tag: { label: "Security", tone: "rose" },
          due: "Apr 24",
          comments: 4,
          attachments: 1,
          assignees: ["NA", "MK"],
        },
      ],
      empty: { kind: "shipped", label: "23 shipped this quarter" },
    },
  ],
};

const hiring: BoardPreset = {
  project: "Senior PM · hiring",
  subtitle: "Pipeline · 14 candidates",
  badge: "people / sr-pm-q2",
  icon: UserPlus,
  columns: [
    {
      id: "applied",
      title: "Applied",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "h1",
          title: "Priya R. — ex Stripe, Notion",
          tag: { label: "Strong fit", tone: "green" },
          due: "Apr 26",
          comments: 2,
          assignees: ["JM"],
        },
        {
          id: "h2",
          title: "Tomás A. — agency background",
          tag: { label: "Maybe", tone: "amber" },
          due: "Apr 27",
          assignees: ["EL"],
        },
        {
          id: "h3",
          title: "Yuki K. — referral from Linear",
          tag: { label: "Referral", tone: "violet" },
          due: "Apr 28",
          comments: 5,
          assignees: ["NA"],
        },
      ],
    },
    {
      id: "interview",
      title: "Interview",
      accent: "bg-brand",
      tasks: [
        {
          id: "h4",
          title: "Sara L. — case study round",
          tag: { label: "Round 2/3", tone: "blue" },
          priority: "high",
          due: "Apr 29",
          comments: 8,
          attachments: 3,
          assignees: ["NA", "MK"],
          progress: 67,
        },
        {
          id: "h5",
          title: "Daniel O. — culture interview",
          tag: { label: "Round 3/3", tone: "blue" },
          priority: "high",
          due: "Apr 30",
          comments: 4,
          assignees: ["EL", "SR"],
          progress: 90,
        },
      ],
      empty: { kind: "drop", label: "Move candidate" },
    },
    {
      id: "offer",
      title: "Offer",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "h6",
          title: "Ava M. — verbal accepted",
          tag: { label: "Closing", tone: "lime" },
          due: "May 01",
          comments: 3,
          assignees: ["JM", "MK"],
        },
      ],
      empty: { kind: "shipped", label: "3 hires this quarter" },
    },
  ],
};

const content: BoardPreset = {
  project: "Q3 content calendar",
  subtitle: "Marketing · 18 pieces",
  badge: "marketing / q3",
  icon: Megaphone,
  columns: [
    {
      id: "draft",
      title: "Drafting",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "c1",
          title: "Why we removed dark mode from the demo",
          tag: { label: "Essay", tone: "violet" },
          priority: "med",
          due: "May 04",
          comments: 6,
          assignees: ["NA"],
        },
        {
          id: "c2",
          title: "Customer story · Atlas Robotics",
          tag: { label: "Case study", tone: "blue" },
          priority: "med",
          due: "May 06",
          attachments: 4,
          assignees: ["EL"],
        },
      ],
    },
    {
      id: "review",
      title: "In review",
      accent: "bg-brand",
      tasks: [
        {
          id: "c3",
          title: "Realtime cursors · launch post",
          tag: { label: "Launch", tone: "amber" },
          priority: "high",
          due: "May 02",
          comments: 11,
          attachments: 2,
          assignees: ["MK", "SR", "JM"],
          progress: 80,
        },
        {
          id: "c4",
          title: "Twitter thread · pricing rewrite",
          tag: { label: "Social", tone: "teal" },
          due: "Apr 29",
          comments: 4,
          assignees: ["JM"],
          progress: 50,
        },
      ],
      empty: { kind: "drop", label: "Drop draft to review" },
    },
    {
      id: "live",
      title: "Published",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "c5",
          title: "How we shipped offline mode",
          tag: { label: "Engineering", tone: "green" },
          due: "Apr 22",
          comments: 32,
          assignees: ["NA", "MK"],
        },
      ],
      empty: { kind: "shipped", label: "12 published this quarter" },
    },
  ],
};

const bugs: BoardPreset = {
  project: "Bug triage",
  subtitle: "Engineering · this week",
  badge: "engineering / triage",
  icon: Bug,
  columns: [
    {
      id: "new",
      title: "New",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "b1",
          title: "Drag preview offset on Safari 17",
          tag: { label: "Browser", tone: "rose" },
          priority: "high",
          due: "Apr 28",
          comments: 7,
          assignees: ["NA", "EL"],
        },
        {
          id: "b2",
          title: "Webhook retry storms after 502",
          tag: { label: "Backend", tone: "amber" },
          priority: "high",
          comments: 3,
          assignees: ["MK"],
        },
        {
          id: "b3",
          title: "Tooltip clips inside dialogs",
          tag: { label: "UI", tone: "violet" },
          priority: "low",
          assignees: ["JM"],
        },
      ],
    },
    {
      id: "fixing",
      title: "Investigating",
      accent: "bg-brand",
      tasks: [
        {
          id: "b4",
          title: "Realtime drift on slow networks",
          tag: { label: "P0", tone: "rose" },
          priority: "high",
          due: "Apr 27",
          comments: 24,
          attachments: 6,
          assignees: ["NA", "MK", "SR"],
          progress: 45,
        },
        {
          id: "b5",
          title: "Stripe portal returns 400 on cancel",
          tag: { label: "Billing", tone: "blue" },
          priority: "med",
          comments: 9,
          assignees: ["EL"],
          progress: 70,
        },
      ],
      empty: { kind: "drop", label: "Assign to engineer" },
    },
    {
      id: "closed",
      title: "Resolved",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "b6",
          title: "Empty board flicker on hard reload",
          tag: { label: "Fixed", tone: "green" },
          due: "Apr 25",
          comments: 5,
          assignees: ["MK"],
        },
      ],
      empty: { kind: "shipped", label: "47 squashed this month" },
    },
  ],
};

const design: BoardPreset = {
  project: "Design system v2",
  subtitle: "Design · sprint 4",
  badge: "design / dsv2",
  icon: Paintbrush,
  columns: [
    {
      id: "ideas",
      title: "Exploring",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "d1",
          title: "Motion tokens · ease curves",
          tag: { label: "Tokens", tone: "violet" },
          priority: "med",
          comments: 3,
          assignees: ["JM"],
        },
        {
          id: "d2",
          title: "New empty-state illustrations",
          tag: { label: "Illustration", tone: "rose" },
          due: "May 03",
          attachments: 5,
          assignees: ["NA"],
        },
      ],
    },
    {
      id: "crafting",
      title: "Crafting",
      accent: "bg-brand",
      tasks: [
        {
          id: "d3",
          title: "Card component · v2 spec",
          tag: { label: "Spec", tone: "teal" },
          priority: "high",
          due: "Apr 29",
          comments: 17,
          attachments: 8,
          assignees: ["NA", "JM"],
          progress: 75,
        },
        {
          id: "d4",
          title: "Tooltip rebuild on Radix",
          tag: { label: "Component", tone: "blue" },
          priority: "med",
          comments: 6,
          assignees: ["EL"],
          progress: 40,
        },
      ],
      empty: { kind: "drop", label: "Drop spec here" },
    },
    {
      id: "shipped",
      title: "In product",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "d5",
          title: "Pill nav with layoutId indicator",
          tag: { label: "Shipped", tone: "lime" },
          due: "Apr 24",
          comments: 9,
          assignees: ["NA"],
        },
      ],
      empty: { kind: "shipped", label: "12 components shipped" },
    },
  ],
};

const roadmap: BoardPreset = {
  project: "Roadmap · 2026",
  subtitle: "Product · half-year",
  badge: "product / 2026-h1",
  icon: Compass,
  columns: [
    {
      id: "later",
      title: "Later",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "r1",
          title: "Public API · v1",
          tag: { label: "Platform", tone: "amber" },
          due: "Q3",
          comments: 8,
          assignees: ["MK", "EL"],
        },
        {
          id: "r2",
          title: "Mobile native app",
          tag: { label: "Mobile", tone: "violet" },
          due: "Q3",
          comments: 12,
          assignees: ["NA", "JM"],
        },
      ],
    },
    {
      id: "next",
      title: "Next",
      accent: "bg-brand",
      tasks: [
        {
          id: "r3",
          title: "Workflow automations · GA",
          tag: { label: "GA", tone: "blue" },
          priority: "high",
          due: "Q2",
          comments: 21,
          attachments: 5,
          assignees: ["NA", "MK", "EL", "SR"],
          progress: 55,
        },
        {
          id: "r4",
          title: "SOC 2 Type II audit",
          tag: { label: "Compliance", tone: "rose" },
          priority: "high",
          due: "Q2",
          comments: 14,
          assignees: ["JM", "MK"],
          progress: 80,
        },
      ],
      empty: { kind: "drop", label: "Drop initiative" },
    },
    {
      id: "now",
      title: "Now",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "r5",
          title: "Realtime cursors · launching",
          tag: { label: "Launching", tone: "lime" },
          due: "May 06",
          comments: 18,
          assignees: ["NA", "EL"],
          progress: 95,
        },
      ],
      empty: { kind: "shipped", label: "5 initiatives shipped" },
    },
  ],
};

const reviews: BoardPreset = {
  project: "Pull requests",
  subtitle: "Engineering · today",
  badge: "engineering / prs",
  icon: GitPullRequest,
  columns: [
    {
      id: "open",
      title: "Open",
      accent: "bg-ink-3/40",
      tasks: [
        {
          id: "p1",
          title: "feat(api): cursor pagination on /tasks",
          tag: { label: "API", tone: "blue" },
          priority: "med",
          comments: 4,
          assignees: ["NA"],
        },
        {
          id: "p2",
          title: "fix(ui): dialog focus trap in Safari",
          tag: { label: "UI", tone: "violet" },
          priority: "high",
          comments: 2,
          assignees: ["EL"],
        },
      ],
    },
    {
      id: "review",
      title: "Reviewing",
      accent: "bg-brand",
      tasks: [
        {
          id: "p3",
          title: "feat(realtime): presence in offline mode",
          tag: { label: "Realtime", tone: "teal" },
          priority: "high",
          due: "Apr 28",
          comments: 19,
          attachments: 3,
          assignees: ["NA", "MK", "SR"],
          progress: 60,
        },
        {
          id: "p4",
          title: "chore(deps): bump next to 15.6",
          tag: { label: "Deps", tone: "slate" },
          comments: 1,
          assignees: ["JM"],
          progress: 30,
        },
      ],
      empty: { kind: "drop", label: "Drop PR for review" },
    },
    {
      id: "merged",
      title: "Merged",
      accent: "bg-[oklch(0.65_0.16_150)]",
      tasks: [
        {
          id: "p5",
          title: "feat(billing): annual discount banner",
          tag: { label: "Merged", tone: "green" },
          due: "Apr 25",
          comments: 6,
          assignees: ["MK", "JM"],
        },
      ],
      empty: { kind: "shipped", label: "31 merged this week" },
    },
  ],
};

export const PRESETS = {
  launch,
  hiring,
  content,
  bugs,
  design,
  roadmap,
  reviews,
} as const;

export type Preset = keyof typeof PRESETS;

// ── Renderers ──────────────────────────────────────────────────────────

function Avatar({ initials, idx }: { initials: string; idx: number }) {
  const palettes = [
    "bg-[oklch(0.55_0.18_270)] text-white",
    "bg-[oklch(0.62_0.16_30)] text-white",
    "bg-[oklch(0.58_0.16_180)] text-white",
    "bg-[oklch(0.50_0.18_320)] text-white",
    "bg-[oklch(0.62_0.13_120)] text-white",
  ];
  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ring-2 ring-card",
        palettes[idx % palettes.length],
      )}
    >
      {initials}
    </span>
  );
}

function MockCard({ task, idx }: { task: MockTask; idx: number }) {
  const PrioIcon = task.priority ? PRIORITY[task.priority].icon : null;
  const prioColor = task.priority ? PRIORITY[task.priority].color : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.06 * idx, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-hairline bg-card p-3.5 shadow-[0_1px_0_rgba(0,0,0,0.02),0_4px_12px_-6px_rgba(15,15,15,0.08)]"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-medium",
            TAG_TONE[task.tag.tone],
          )}
        >
          {task.tag.label}
        </span>
        {PrioIcon && <PrioIcon className={cn("h-3.5 w-3.5", prioColor)} />}
      </div>
      <h4 className="mt-2.5 text-[13px] font-medium leading-snug text-ink-1">
        {task.title}
      </h4>

      {typeof task.progress === "number" && (
        <div className="mt-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-ink-3/15">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-3">
        <div className="flex items-center gap-2.5">
          {task.due && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {task.due}
            </span>
          )}
          {task.comments != null && (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {task.comments}
            </span>
          )}
          {task.attachments != null && (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {task.attachments}
            </span>
          )}
        </div>
        <div className="flex -space-x-1.5">
          {task.assignees.map((a, i) => (
            <Avatar key={a + i} initials={a} idx={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface KanbanMockupProps {
  className?: string;
  tilt?: boolean;
  variant?: "hero" | "embed";
  preset?: Preset;
}

export function KanbanMockup({
  className,
  tilt = true,
  variant = "hero",
  preset = "launch",
}: KanbanMockupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 4, -4]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const enableTilt = tilt && !reduce;
  const board = PRESETS[preset];
  const ProjectIcon = board.icon;
  const totalTasks = board.columns.reduce((n, c) => n + c.tasks.length, 0);
  const teamCount = Array.from(
    new Set(board.columns.flatMap((c) => c.tasks.flatMap((t) => t.assignees))),
  ).length;

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full",
        variant === "hero" && "[perspective:1800px]",
        className,
      )}
    >
      <motion.div
        style={
          enableTilt
            ? { rotateX, rotateY, y, transformStyle: "preserve-3d" as const }
            : undefined
        }
        className={cn(
          "relative mx-auto w-full overflow-hidden rounded-2xl border border-hairline bg-surface-1 shadow-[0_60px_120px_-50px_rgba(15,15,15,0.35),0_0_0_1px_rgba(15,15,15,0.04)]",
          variant === "hero" && "max-w-[1100px]",
        )}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-hairline bg-surface-2/60 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.15_25)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.14_85)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.15_150)]" />
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-hairline bg-background/80 px-3 py-1 text-[11px] text-ink-3 sm:inline-flex">
            <Search className="h-3 w-3" />
            orba.work / {board.badge.split("/")[1]?.trim() ?? board.badge}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-ink-3">
            <Sparkles className="h-3 w-3 text-brand" />
            <span className="hidden sm:inline">Realtime</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-tint text-brand">
              <ProjectIcon className="h-3 w-3" />
            </span>
            <span className="text-sm font-medium text-ink-1">{board.project}</span>
            <span className="hidden text-xs text-ink-3 sm:inline">
              · {board.subtitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden -space-x-2 sm:flex">
              {["NA", "EL", "MK", "SR"].slice(0, Math.min(teamCount, 4)).map((init, i) => (
                <Avatar key={init} initials={init} idx={i} />
              ))}
            </div>
            <div className="hidden h-7 items-center gap-1 rounded-md border border-hairline px-2 text-[11px] text-ink-2 sm:inline-flex">
              <Users className="h-3 w-3" />
              {teamCount}
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-3 p-3 sm:gap-4 sm:p-5">
          {board.columns.map((col) => (
            <div key={col.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full", col.accent)} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    {col.title}
                  </span>
                  <span className="text-[11px] text-ink-3/70">{col.tasks.length}</span>
                </div>
                <button
                  type="button"
                  aria-label="Add task"
                  className="rounded-md p-1 text-ink-3 hover:text-ink-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {col.tasks.map((task, i) => (
                  <MockCard key={task.id} task={task} idx={i} />
                ))}
                {col.empty?.kind === "drop" && (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-hairline px-3 py-4 text-[11px] text-ink-3">
                    {col.empty.label}
                  </div>
                )}
                {col.empty?.kind === "shipped" && (
                  <div className="flex items-center gap-2 rounded-xl border border-hairline bg-surface-2/40 px-3 py-2.5 text-[11px] text-ink-3">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                    {col.empty.label}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer stat strip */}
        <div className="flex items-center justify-between border-t border-hairline bg-surface-2/40 px-4 py-2 text-[11px] text-ink-3 sm:px-5">
          <span>{totalTasks} cards</span>
          <span className="hidden sm:inline">{board.subtitle}</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            Synced just now
          </span>
        </div>
      </motion.div>

      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 -z-10 mx-auto h-[260px] w-[80%] rounded-full bg-brand/20 blur-3xl"
      />
    </div>
  );
}
