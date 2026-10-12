"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/marketing/section";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { outlineButton } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Reveal, RevealText, afterWords, wordCount } from "@/components/marketing/reveal";

/* A usage meter drawn like a workspace billing screen. `limit === null` is the
   unlimited row: no bar, a dashed hairline for "no ceiling". */
function UsageMeter({
  label,
  used,
  limit,
  delay = 0,
}: {
  label: string;
  used: number;
  limit: number | null;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const atLimit = limit !== null && used >= limit;
  const pct = limit === null ? 0 : Math.min(1, used / limit);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-ink-2">{label}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs tabular-nums text-ink-1">
          {atLimit && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />}
          {limit === null ? "Unlimited" : `${used} / ${limit}`}
        </span>
      </div>
      {limit === null ? (
        <div aria-hidden className="mt-2.5 border-t border-dashed border-hairline" />
      ) : (
        <div aria-hidden className="mt-2 h-1 overflow-hidden rounded-full bg-hairline">
          <motion.div
            className="h-full origin-left rounded-full bg-ink-1"
            style={{ width: `${pct * 100}%` }}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeOutExpo, delay }}
          />
        </div>
      )}
    </div>
  );
}

function PlanColumn({
  name,
  price,
  suffix,
  notes,
  children,
}: {
  name: string;
  price: string;
  suffix?: string;
  notes: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 sm:p-8">
      <p className="text-sm font-medium text-ink-2">{name}</p>
      <p className="mt-4 text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink-1">
        {price}
        {suffix && <span className="ml-1.5 text-base font-normal tracking-normal text-ink-3">{suffix}</span>}
      </p>
      <div className="mt-3 space-y-0.5 text-sm text-ink-3">
        {notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
      <div className="mt-8 space-y-5">{children}</div>
    </div>
  );
}

export function PricingTeaser() {
  const { boards, membersPerBoard } = FREE_LIMITS;
  const heading = ["Free up to three.", { text: `$${PRO_PRICE.annualPerMonth} a month after that.`, className: "text-ink-3" }];

  return (
    <Section tone="default">
      <div className="grid gap-12 border-t border-hairline pt-16 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <RevealText
            segments={heading}
            className="text-h2 font-medium leading-[1.05] tracking-[-0.02em] text-balance text-ink-1"
          />
          <Reveal as="p" delay={afterWords(wordCount(heading))} className="mt-5 max-w-[32rem] text-base leading-relaxed text-ink-2">
            {boards} boards, {membersPerBoard} people on each, no card. Pro lifts both
            limits for the whole team at one flat price.
          </Reveal>
          <Reveal delay={afterWords(wordCount(heading)) + 90} className="mt-8 hidden lg:block">
            <Link href="/pricing" className={cn(outlineButton, "h-11 px-5 text-sm")}>
              Compare plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid divide-y divide-hairline rounded-2xl border border-hairline bg-surface-1 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <PlanColumn name="Free" price="$0" notes={["Forever. No card."]}>
              <UsageMeter label="Boards" used={boards - 1} limit={boards} />
              <UsageMeter label="Members per board" used={membersPerBoard} limit={membersPerBoard} delay={0.12} />
            </PlanColumn>
            <PlanColumn
              name="Pro"
              price={`$${PRO_PRICE.annualPerMonth}`}
              suffix="/ month"
              notes={[
                `For the whole team, billed yearly ($${PRO_PRICE.annualTotal}).`,
                `Or $${PRO_PRICE.monthly} month to month.`,
              ]}
            >
              <UsageMeter label="Boards" used={0} limit={null} />
              <UsageMeter label="Members per board" used={0} limit={null} />
            </PlanColumn>
          </div>
          <Link href="/pricing" className={cn(outlineButton, "mt-6 h-11 w-full px-5 text-sm sm:w-auto lg:hidden")}>
            Compare plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
