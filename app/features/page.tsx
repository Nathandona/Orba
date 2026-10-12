"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Section } from "@/components/marketing/section";
import { DisplayHeading } from "@/components/marketing/display-heading";
import { CtaBand } from "@/components/marketing/cta-band";
import { FeatureRow } from "@/components/marketing/features-page-row";
import {
  CardDetailVisual,
  OverviewVisual,
  TeamVisual,
  TemplatesVisual,
  ThreadVisual,
} from "@/components/marketing/feature-visuals";
import { ShipVisual } from "@/components/marketing/week-visuals";

import { cn } from "@/lib/utils";
import { focusRing, inkButton } from "@/lib/ui";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";

/* Only what the app does today. Keep this list in sync with the product:
   no realtime, mentions, analytics, integrations, automations or shortcuts. */
const ROWS = [
  {
    label: "Boards",
    title: "Columns that match how your team works.",
    body: "Every project is a board. Name the columns, give each one a colour, add or remove them as the work changes. Drag a card across and it is saved where you drop it.",
    facts: ["Custom columns, named and coloured", "Drag and drop between columns", "One board per project"],
    visual: (play: boolean) => <ShipVisual play={play} />,
  },
  {
    label: "Cards",
    title: "The detail lives on the card.",
    body: "Priority, due date, labels and an owner sit on the card face, so a glance at the board tells you what is late and who has it. Open a card for the full description.",
    facts: ["Low, medium or high priority", "Due date and labels", "One assignee per card", "A description for the long version"],
    visual: () => <CardDetailVisual />,
  },
  {
    label: "Comments and files",
    title: "Talk and attach where the work is.",
    body: "Comment on any card instead of starting a thread somewhere else. Attach the brief, the screenshot or the export, and the counts show on the card so nothing gets buried.",
    facts: ["Comments on every card", "Files up to 10 MB each", "Comment and file counts on the card face"],
    visual: () => <ThreadVisual />,
  },
  {
    label: "Team",
    title: "Invite by email. Pick a role.",
    body: "Add people to a project with their email address. Anyone without an account gets a one-click link to sign up, and lands straight on the board.",
    facts: ["Owner, admin or member", "Invites work with or without an account", `Free: ${FREE_LIMITS.membersPerBoard} people per board`],
    visual: () => <TeamVisual />,
  },
  {
    label: "Templates",
    title: "Start from a template, or from three columns.",
    body: "New projects open with To Do, In Progress and Done. Or pick a template and start with its columns and sample cards already in place.",
    facts: ["Blank board with three default columns", "Templates with columns and sample cards", "Pro templates on the paid plan"],
    visual: () => <TemplatesVisual />,
  },
  {
    label: "Overview",
    title: "Every project at a glance.",
    body: "The dashboard lists each project with its progress, team size and due date, and the cards due next right below. Nobody has to ask where things stand.",
    facts: ["Done versus open, per project", "Team size and due date", "The cards due next, across projects"],
    visual: () => <OverviewVisual />,
  },
];

const LEFT_OUT = [
  { title: "No time tracking", body: "Due dates and priority, not timesheets." },
  { title: "No Gantt charts", body: "Columns show the state of the work. That is enough for most weeks." },
  { title: "No setup project", body: "Three columns are ready the moment the board exists." },
  { title: "No per-feature tiers", body: `Free covers ${FREE_LIMITS.boards} boards. Pro lifts the limits for the whole team.` },
];

export default function FeaturesPage() {
  const { data: session } = useSession();
  const href = session ? "/dashboard" : "/register";

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Hero */}
      <section className="px-4 pt-32 pb-8 sm:px-6 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto grid max-w-[80rem] grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <span className="inline-flex items-center rounded-full border border-hairline px-3 py-1 text-xs text-ink-2">
              Features
            </span>
            <h1 className="mt-6 text-display leading-[0.98] font-semibold tracking-[-0.035em] text-balance text-ink-1">
              Everything a board needs. <span className="text-ink-3">Nothing it does not.</span>
            </h1>
          </div>
          <motion.div
            variants={staggerChildren(0.08, 0.1)}
            initial="hidden"
            animate="show"
            className="min-w-0 lg:col-span-5 lg:pb-2"
          >
            <motion.p variants={fadeUp} className="max-w-[38ch] text-lead leading-relaxed text-ink-2">
              Six things, done properly: boards, cards, comments and files, a team with roles, templates and an
              overview. Here is each one, as it works today.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={href} className={cn(inkButton, "group h-12 px-6 text-base")}>
                {session ? "Open dashboard" : "Start free"}
                <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-md px-4 text-base text-ink-1 underline-offset-4 hover:underline",
                  focusRing,
                )}
              >
                See pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* In-page index: plain anchors, mono numbers. */}
        <nav aria-label="On this page" className="mx-auto mt-16 max-w-[80rem] lg:mt-20">
          <ol className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-hairline pt-5 sm:grid-cols-3 lg:grid-cols-6">
            {ROWS.map((r, i) => (
              <li key={r.label} className="min-w-0">
                <a
                  href={`#${r.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn("flex items-baseline gap-2 rounded-sm text-sm text-ink-2 hover:text-ink-1", focusRing)}
                >
                  <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="truncate">{r.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* Feature rows */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[80rem]">
          {ROWS.map((r, i) => (
            <div key={r.label} id={r.label.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20">
              <FeatureRow
                index={String(i + 1).padStart(2, "0")}
                label={r.label}
                title={r.title}
                body={r.body}
                facts={r.facts}
                visual={r.visual}
                flip={i % 2 === 1}
              />
            </div>
          ))}
        </div>
      </section>

      {/* What Orba leaves out */}
      <Section tone="muted">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="min-w-0 lg:col-span-5">
            <DisplayHeading size="h2">Short on purpose.</DisplayHeading>
            <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-ink-2">
              A board stays fast when it does a few things well. These are the things Orba does not try to be.
            </p>
          </div>
          <ul className="grid min-w-0 grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-7">
            {LEFT_OUT.map((item) => (
              <li key={item.title} className="bg-background p-6">
                <p className="text-[15px] font-medium text-ink-1">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{item.body}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </Section>

      <CtaBand
        heading={
          <>
            <span className="text-ink-3">{FREE_LIMITS.boards} boards, free.</span>
            <br />
            See how it fits your week.
          </>
        }
        description={`No card needed. When the team outgrows the free plan, Pro is $${PRO_PRICE.annualPerMonth} a month for everyone, billed yearly.`}
        secondaryHref="/pricing"
        secondaryText="See pricing"
      />

      <Footer />
    </div>
  );
}
