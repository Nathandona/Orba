"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Section } from "@/components/marketing/section";
import { BentoCell, BentoGrid } from "@/components/marketing/bento";
import {
  BoardsVisual,
  CardDetailVisual,
  OverviewVisual,
  TeamVisual,
  TemplatesVisual,
  ThreadVisual,
} from "@/components/marketing/feature-visuals";
import { Reveal, RevealText, afterWords, wordCount } from "@/components/marketing/reveal";

/* Only features the app has today. Keep in step with the product. */
const CELLS = [
  {
    colSpan: "3",
    plate: "lg",
    title: "Columns that match how you work.",
    body: "Name them, colour them, add as many as you need. Drag a card across and it is saved where you drop it.",
    visual: <BoardsVisual />,
  },
  {
    colSpan: "3",
    plate: "lg",
    title: "Every card carries its detail.",
    body: "Priority, due date, labels and an assignee on the card face, and a full description when you open it.",
    visual: <CardDetailVisual />,
  },
  {
    colSpan: "2",
    title: "Talk and attach where the work is.",
    body: "Comment on any card and attach files up to 10 MB. The counts sit on the card, so nothing gets buried.",
    visual: <ThreadVisual />,
  },
  {
    colSpan: "2",
    title: "Invite by email. Pick a role.",
    body: "Owner, admin or member. People without an account get a one-click sign-up link.",
    visual: <TeamVisual />,
  },
  {
    colSpan: "2",
    title: "Start from a template, or from three columns.",
    body: "New projects open with To Do, In Progress and Done, or with a template's columns and sample cards. Pro templates come with the paid plan.",
    visual: <TemplatesVisual />,
  },
  {
    colSpan: "6",
    layout: "row",
    title: "Every project at a glance.",
    body: "Your dashboard shows each project's progress, team size and due date, with the cards due next right below.",
    visual: <OverviewVisual />,
  },
] as const;

const HEADING = ["One workspace.", "\n", "Every moving piece."];

export function FeaturesSection() {
  return (
    <Section tone="default" id="features">
      <div className="mx-auto max-w-[40rem] text-center">
        <RevealText
          segments={HEADING}
          className="text-h1 leading-[1.02] font-medium tracking-[-0.02em] text-balance text-ink-1"
        />
        <Reveal as="p" delay={afterWords(wordCount(HEADING))} className="mt-5 text-lead leading-relaxed text-ink-2">
          Columns you define, cards that carry the detail, and a team you invite by email. That is the
          whole product, and it stays fast.
        </Reveal>
      </div>

      <BentoGrid className="mt-14 lg:mt-16">
        {CELLS.map((c) => (
          <BentoCell
            key={c.title}
            colSpan={c.colSpan}
            plate={"plate" in c ? c.plate : "md"}
            layout={"layout" in c ? c.layout : "stack"}
            title={c.title}
            body={c.body}
            visual={c.visual}
          />
        ))}
      </BentoGrid>
    </Section>
  );
}
