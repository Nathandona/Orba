"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  GitBranch,
  Layers,
  Layout,
  PlayCircle,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Section } from "@/components/marketing/section";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { DisplayHeading, SerifEm } from "@/components/marketing/display-heading";
import { BentoGrid, BentoCell } from "@/components/marketing/bento";
import { KanbanMockup, type Preset } from "@/components/marketing/kanban-mockup";
import { MarqueeLogos } from "@/components/marketing/marquee-logos";
import { StatGroup } from "@/components/marketing/stat-block";
import { PullQuote } from "@/components/marketing/testimonial";
import { CtaBand } from "@/components/marketing/cta-band";

import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";

const LOGOS = [
  { name: "Northwind" },
  { name: "Atlas" },
  { name: "Foundry" },
  { name: "Lumen" },
  { name: "Parallel" },
  { name: "Halcyon" },
  { name: "Meridian" },
  { name: "Polaris" },
];

const STATS = [
  { value: "10×", label: "Faster planning", detail: "vs. spreadsheets and email threads." },
  { value: "<100ms", label: "Interaction time", detail: "Drag, drop, type — no waiting." },
  { value: "99.9%", label: "Uptime SLA", detail: "Every paid plan, in writing." },
];

const WALKTHROUGH: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  icon: typeof Layout;
  preset: Preset;
}[] = [
  {
    eyebrow: "Plan",
    title: "Start the week with a board your team will actually open.",
    body: "Pick a template, drop in this sprint, hand the rest to columns. No ceremony, no setup theater.",
    bullets: ["Templates for sprints, launches, hiring", "Custom columns and statuses", "Bulk import from CSV or Trello"],
    icon: Layout,
    preset: "roadmap",
  },
  {
    eyebrow: "Track",
    title: "Real-time movement, not refresh-and-pray.",
    body: "Cards move the moment a teammate moves them. Comments show up where work happens — on the card.",
    bullets: ["Live cursors on shared boards", "@mentions and threaded comments", "Activity feed per project"],
    icon: Workflow,
    preset: "bugs",
  },
  {
    eyebrow: "Ship",
    title: "Close the loop without writing a status update.",
    body: "Burn down the column, send the changelog, archive the board. Analytics tell the story so you don't have to.",
    bullets: ["Cycle time and throughput charts", "Auto-generated changelogs", "Slack & GitHub mirroring"],
    icon: BarChart3,
    preset: "reviews",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const heroHref = session ? "/dashboard" : "/register";
  const heroLabel = session ? "Open dashboard" : "Start free";

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--brand-muted),transparent_60%)]"
        />
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerChildren(0.1)}
            initial="hidden"
            animate="show"
            className="grid items-center gap-14 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <motion.div variants={fadeUp}>
                <Eyebrow>Project management, redrawn</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-6">
                <DisplayHeading as="h1" size="display">
                  The Kanban your team
                  <br />
                  will <SerifEm>actually&nbsp;open</SerifEm> on Monday.
                </DisplayHeading>
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-[34rem] text-lead leading-relaxed text-ink-2"
              >
                Orba is a quiet, fast, opinionated Kanban for product teams. Plan the
                sprint, run the standup, ship the work — without losing an afternoon to
                the tool.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Button asChild size="lg" className="h-12 bg-brand px-7 text-base text-brand-foreground hover:bg-brand/90">
                  <Link href={heroHref}>
                    {heroLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-hairline px-7 text-base">
                  <Link href="/features">
                    See it move
                    <PlayCircle className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-5 text-xs text-ink-3">
                Free for teams of three. No card. No demo gating.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="relative lg:col-span-6"
            >
              <KanbanMockup preset="launch" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Logo wall */}
      <Section tone="default" className="py-14 sm:py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>Trusted by teams shipping serious work</Eyebrow>
          <MarqueeLogos items={LOGOS} className="w-full" />
        </div>
      </Section>

      {/* Bento features */}
      <Section tone="default">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">Inside Orba</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            One workspace. Every <SerifEm>moving piece</SerifEm>.
          </DisplayHeading>
          <p className="mt-5 text-lead leading-relaxed text-ink-2">
            The features you need, none of the ones you don't. Designed to disappear
            into your team's rhythm.
          </p>
        </motion.div>

        <BentoGrid className="mt-16">
          <BentoCell colSpan="4" rowSpan="2" tone="default" className="overflow-hidden">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand" />
              <span className="text-eyebrow uppercase tracking-[0.18em] text-ink-3">
                Boards
              </span>
            </div>
            <h3 className="mt-4 text-h3 font-medium tracking-[-0.01em]">
              Boards that read like a system, not a list.
            </h3>
            <p className="mt-3 max-w-[36ch] text-base text-ink-2">
              Multi-board projects, swimlanes, custom statuses, and WIP limits — all
              without leaving your keyboard.
            </p>
            <div className="relative mt-8 -mx-7 -mb-8 overflow-hidden">
              <div className="origin-top scale-[0.92]">
                <KanbanMockup variant="embed" tilt={false} preset="hiring" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface-1" />
            </div>
          </BentoCell>

          <BentoCell colSpan="2" tone="brand">
            <Users className="h-5 w-5 text-brand" />
            <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">Live presence</h3>
            <p className="mt-3 text-sm text-ink-2">
              See cursors, edits, and status changes the instant they happen.
            </p>
            <div className="mt-auto pt-6 flex -space-x-2">
              {["NA", "EL", "MK", "SR"].map((initials, i) => (
                <span
                  key={initials}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-brand-tint text-white text-xs font-medium"
                  style={{
                    background: [
                      "oklch(0.55 0.18 270)",
                      "oklch(0.62 0.16 30)",
                      "oklch(0.58 0.16 180)",
                      "oklch(0.50 0.18 320)",
                    ][i],
                  }}
                >
                  {initials}
                </span>
              ))}
            </div>
          </BentoCell>

          <BentoCell colSpan="2">
            <Sparkles className="h-5 w-5 text-brand" />
            <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">Automations</h3>
            <p className="mt-3 text-sm text-ink-2">
              When a card moves to <span className="font-medium text-ink-1">Done</span>,
              do the boring parts for you.
            </p>
            <div className="mt-auto pt-6 space-y-1.5">
              {[
                "→ Notify Slack",
                "→ Create release note",
                "→ Archive after 7 days",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-md border border-hairline bg-brand-tint/40 px-3 py-2 font-mono text-[11px] text-ink-2"
                >
                  {line}
                </div>
              ))}
            </div>
          </BentoCell>

          <BentoCell colSpan="2">
            <BarChart3 className="h-5 w-5 text-brand" />
            <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">Analytics</h3>
            <p className="mt-3 text-sm text-ink-2">
              Cycle time, throughput, and burn-down — without owning a dashboard tool.
            </p>
            <div className="mt-6 flex h-16 items-end gap-1.5">
              {[28, 38, 22, 54, 41, 68, 49, 72, 60, 84, 70, 92].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-brand/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </BentoCell>

          <BentoCell colSpan="2">
            <GitBranch className="h-5 w-5 text-brand" />
            <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">Integrations</h3>
            <p className="mt-3 text-sm text-ink-2">
              GitHub, Slack, Linear, Figma. Two-way sync that doesn't drop updates.
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {["GitHub", "Slack", "Linear", "Figma", "Notion"].map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-hairline px-3 py-1 text-xs text-ink-2"
                >
                  {n}
                </span>
              ))}
            </div>
          </BentoCell>

          <BentoCell colSpan="2">
            <Bell className="h-5 w-5 text-brand" />
            <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">
              Quiet by default
            </h3>
            <p className="mt-3 text-sm text-ink-2">
              Smart digests over notification spam. Mute boards, batch alerts, sleep on
              weekends.
            </p>
          </BentoCell>
        </BentoGrid>
      </Section>

      {/* Walkthrough */}
      <Section tone="muted">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">Plan · Track · Ship</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            A week with Orba, <SerifEm>start to finish</SerifEm>.
          </DisplayHeading>
        </motion.div>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {WALKTHROUGH.map((step, i) => (
            <motion.div
              key={step.eyebrow}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-5">
                <Eyebrow>{step.eyebrow}</Eyebrow>
                <DisplayHeading as="h3" size="h2" className="mt-5">
                  {step.title}
                </DisplayHeading>
                <p className="mt-5 text-lead leading-relaxed text-ink-2">{step.body}</p>
                <ul className="mt-6 space-y-2 text-base text-ink-2">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl border border-hairline bg-surface-1 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 text-brand" />
                      <span className="text-xs font-medium text-ink-2">
                        {step.eyebrow}
                      </span>
                    </div>
                    <span className="text-xs text-ink-3">Atlas launch</span>
                  </div>
                  <div className="mt-4">
                    <KanbanMockup variant="embed" tilt={false} preset={step.preset} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section tone="default" className="py-20 sm:py-24">
        <StatGroup stats={STATS} />
      </Section>

      {/* Pull quote */}
      <Section tone="default" className="pt-0">
        <PullQuote
          quote="The first project tool we shipped to the whole company without an internal email asking people to please log in."
          author="Marie K."
          role="Head of Engineering"
          company="Atlas Robotics"
        />
      </Section>

      {/* Pricing teaser */}
      <Section tone="muted" className="py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-hairline bg-surface-1 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-[36rem]">
            <Eyebrow>Pricing</Eyebrow>
            <h3 className="mt-4 text-h2 font-medium tracking-[-0.02em]">
              Free for three. <SerifEm>$10</SerifEm> for the rest.
            </h3>
            <p className="mt-3 text-base text-ink-2">
              No seat math. No per-feature paywalls. The price you see is the price you
              pay.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="h-12 border-hairline px-6">
            <Link href="/pricing">
              Compare plans
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <CtaBand
        eyebrow="Try Orba"
        heading={
          <>
            Three boards. <SerifEm>Free</SerifEm>.<br />
            Five minutes to set up.
          </>
        }
        description="No card, no demo gate, no sales call. Open Orba, build a board, invite your team."
        primaryText="Start free"
        secondaryText="Talk to sales"
      />

      <Footer />
    </div>
  );
}
