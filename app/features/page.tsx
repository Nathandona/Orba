"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  GitBranch,
  Layers,
  Lock,
  PlayCircle,
  Shuffle,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Section } from "@/components/marketing/section";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { DisplayHeading, SerifEm } from "@/components/marketing/display-heading";
import { BentoGrid, BentoCell } from "@/components/marketing/bento";
import { KanbanMockup, type Preset } from "@/components/marketing/kanban-mockup";
import { CtaBand } from "@/components/marketing/cta-band";

import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ANATOMY: {
  eyebrow: string;
  icon: typeof Layers;
  title: string;
  body: string;
  bullets: string[];
  preset: Preset;
}[] = [
  {
    eyebrow: "Boards",
    icon: Layers,
    title: "Kanban that respects your wrist.",
    body: "Every interaction is a single keypress away. Drag, archive, assign, label — without a second click and without a modal.",
    bullets: [
      "Unlimited boards, columns, swimlanes",
      "Drag, multi-select, bulk move",
      "WIP limits with soft warnings",
      "Templates for sprints, launches, hiring",
    ],
    preset: "design",
  },
  {
    eyebrow: "Collaboration",
    icon: Users,
    title: "Real-time, not real-tense.",
    body: "Cards move when teammates move them. Comments live on the card, not in a parallel chat. Mentions show up where you'll see them.",
    bullets: [
      "Live cursors and typing indicators",
      "Threaded comments with mentions",
      "Role-based access on every project",
      "Audit trail per task",
    ],
    preset: "hiring",
  },
  {
    eyebrow: "Velocity",
    icon: Zap,
    title: "Fast in a way you can feel.",
    body: "Sub-100ms interactions, edge-deployed reads, and an offline mode that doesn't pretend. Built on the same primitives we use ourselves.",
    bullets: [
      "Sub-100ms drag and edits",
      "Offline mode with conflict resolution",
      "Smart caching for shared boards",
      "Edge-deployed reads worldwide",
    ],
    preset: "reviews",
  },
];

const POWER = [
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Cycle time, throughput, burn-down — the numbers that change a standup, not just decorate one.",
    span: "3" as const,
  },
  {
    icon: Lock,
    title: "Security",
    description: "SOC 2 Type II, SSO/SCIM on every paid plan, and audit logs that actually answer the question.",
    span: "3" as const,
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Digests by default. Push only the cards that name you. Sleep on weekends — Orba does too.",
    span: "2" as const,
  },
  {
    icon: Workflow,
    title: "Automations",
    description: "When-this-then-that without learning a DSL. Built into the card menu, not a separate module.",
    span: "2" as const,
  },
  {
    icon: GitBranch,
    title: "Integrations",
    description: "GitHub, Slack, Linear, Figma, Notion, Google. Two-way sync that doesn't drop updates.",
    span: "2" as const,
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Create",
    description: "Open a template or build from scratch. Three columns is enough.",
    icon: Target,
  },
  {
    step: "02",
    title: "Organize",
    description: "Drop the work in. Tag, assign, set due dates. Skip the meeting.",
    icon: Shuffle,
  },
  {
    step: "03",
    title: "Collaborate",
    description: "Invite the team. Real-time presence, mentions, threaded comments.",
    icon: Users,
  },
  {
    step: "04",
    title: "Track",
    description: "Watch cycle time fall. Send the changelog. Archive. Repeat.",
    icon: CheckCircle2,
  },
];

const INTEGRATIONS = [
  "GitHub",
  "Slack",
  "Linear",
  "Figma",
  "Notion",
  "Google",
  "Vercel",
  "Sentry",
  "Loom",
  "Calendly",
  "Zapier",
  "Webhooks",
];

function WorkflowTimeline() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-hairline lg:left-1/2 lg:block" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-4 top-0 hidden w-px bg-brand lg:left-1/2 lg:block"
      />
      <div className="space-y-16 lg:space-y-24">
        {WORKFLOW.map((step, i) => {
          const Icon = step.icon;
          const right = i % 2 === 1;
          return (
            <motion.div
              key={step.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={cn(
                "relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16",
                right && "lg:[&>div:first-child]:col-start-2",
              )}
            >
              <div className={cn(right && "lg:text-right")}>
                <div
                  className={cn(
                    "flex items-center gap-4",
                    right && "lg:flex-row-reverse",
                  )}
                >
                  <span className="font-serif text-5xl italic leading-none text-brand">
                    {step.step}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-2">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-2">
                  {step.description}
                </p>
              </div>
              <div
                aria-hidden
                className="absolute left-4 top-2 hidden h-3 w-3 rounded-full border-2 border-background bg-brand lg:left-1/2 lg:block lg:-translate-x-1/2"
              />
              <div className="hidden lg:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  const { data: session } = useSession();
  const heroHref = session ? "/dashboard" : "/register";
  const heroLabel = session ? "Open dashboard" : "Try it free";

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 h-[600px] bg-[radial-gradient(circle_at_70%_0%,var(--brand-muted),transparent_60%)]"
        />
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-[52rem]"
          >
            <Eyebrow className="justify-center">Every feature, deliberate</Eyebrow>
            <DisplayHeading as="h1" size="display" className="mt-6">
              Built for the work, <SerifEm>not the demo</SerifEm>.
            </DisplayHeading>
            <p className="mx-auto mt-7 max-w-[40rem] text-lead leading-relaxed text-ink-2">
              We didn't ship every feature on the roadmap. We shipped the ones that
              earn their place on a real team's screen.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 bg-brand px-7 text-base text-brand-foreground hover:bg-brand/90"
              >
                <Link href={heroHref}>
                  {heroLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-hairline px-7 text-base">
                <Link href="#anatomy">
                  Tour the product
                  <PlayCircle className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="mt-20"
          >
            <KanbanMockup preset="content" />
          </motion.div>
        </div>
      </section>

      {/* Anatomy */}
      <Section tone="muted" id="anatomy">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">Anatomy of Orba</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            Three pillars, <SerifEm>nothing extra</SerifEm>.
          </DisplayHeading>
        </motion.div>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {ANATOMY.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.eyebrow}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-12 lg:gap-16",
                  i % 2 === 1 && "lg:[&>div:first-child]:order-2",
                )}
              >
                <div className="lg:col-span-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Eyebrow className="mt-6">{section.eyebrow}</Eyebrow>
                  <DisplayHeading as="h3" size="h2" className="mt-5">
                    {section.title}
                  </DisplayHeading>
                  <p className="mt-5 text-lead leading-relaxed text-ink-2">
                    {section.body}
                  </p>
                  <ul className="mt-7 space-y-3 text-base text-ink-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-hairline bg-surface-1 p-4 sm:p-5">
                    <KanbanMockup variant="embed" tilt={false} preset={section.preset} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Power features */}
      <Section tone="default">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">More inside</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            The <SerifEm>quiet</SerifEm> features that earn their keep.
          </DisplayHeading>
          <p className="mt-5 text-lead leading-relaxed text-ink-2">
            Not every feature needs a hero shot.
          </p>
        </motion.div>

        <BentoGrid className="mt-16">
          {POWER.map((p, i) => {
            const Icon = p.icon;
            const tone = i === 0 || i === 1 ? "brand" : "default";
            return (
              <BentoCell key={p.title} colSpan={p.span} tone={tone}>
                <Icon className="h-5 w-5 text-brand" />
                <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-2">
                  {p.description}
                </p>
              </BentoCell>
            );
          })}
        </BentoGrid>
      </Section>

      {/* Workflow timeline */}
      <Section tone="muted">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">How it goes</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            Four steps to a board your team <SerifEm>actually&nbsp;uses</SerifEm>.
          </DisplayHeading>
        </motion.div>

        <div className="mx-auto mt-20 max-w-[64rem]">
          <WorkflowTimeline />
        </div>
      </Section>

      {/* Integrations */}
      <Section tone="default">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">Connects to your stack</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            Plays well with the <SerifEm>tools you already pay for</SerifEm>.
          </DisplayHeading>
          <p className="mt-5 text-lead leading-relaxed text-ink-2">
            Two-way sync. Real webhooks. No duct tape.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INTEGRATIONS.map((name) => (
            <div
              key={name}
              className="group flex aspect-[5/3] items-center justify-center rounded-xl border border-hairline bg-surface-1 transition-colors hover:border-brand/40 hover:bg-brand-tint"
            >
              <span className="font-serif text-2xl text-ink-2 transition-colors group-hover:text-brand">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Try Orba"
        heading={
          <>
            Open a board. <SerifEm>Move</SerifEm> something.
          </>
        }
        description="That's the demo. No call required."
        primaryText="Start free"
        secondaryText="See pricing"
      />

      <Footer />
    </div>
  );
}
