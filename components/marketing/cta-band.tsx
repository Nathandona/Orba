"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import { NewBoardCard } from "@/components/marketing/new-board-card";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { focusRing, inkButton } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  heading?: React.ReactNode;
  description?: string;
  primaryText?: string;
  secondaryHref?: string;
  secondaryText?: string;
  className?: string;
}

const ctaFadeUp = {
  ...fadeUp,
  hidden: { opacity: 0, y: 12 },
};

const DEFAULT_HEADING = (
  <>
    <span className="text-ink-3">Three boards, free.</span>
    <br />
    Your first one takes a minute.
  </>
);

export function CtaBand({
  heading = DEFAULT_HEADING,
  description = "No card, no demo, no sales call. Name a board, pick the columns, invite two people.",
  primaryText = "Start free",
  secondaryHref = "/pricing",
  secondaryText = "See pricing",
  className,
}: CtaBandProps) {
  const { data: session } = useSession();
  const href = session ? "/dashboard" : "/register";

  return (
    <section className={cn("bg-background px-4 sm:px-6 lg:px-8", className)}>
      <motion.div
        variants={ctaFadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto grid max-w-[80rem] items-center gap-12 border-t border-hairline py-20 lg:grid-cols-12 lg:py-28"
      >
        <div className="lg:col-span-7">
          <h2 className="max-w-[20ch] text-h1 font-medium leading-[1.02] tracking-[-0.02em] text-balance text-ink-1">
            {heading}
          </h2>
          {description && (
            <p className="mt-6 max-w-[34rem] text-lead leading-relaxed text-ink-2">{description}</p>
          )}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link href={href} className={cn(inkButton, "h-11 px-6 text-base")}>
              {session ? "Open dashboard" : primaryText}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={secondaryHref}
              className={cn(
                "inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-ink-2 transition-colors hover:text-ink-1 sm:self-auto",
                focusRing,
              )}
            >
              {secondaryText}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs text-ink-3">
            Free for {FREE_LIMITS.boards} boards · Pro ${PRO_PRICE.annualPerMonth}/mo per team, billed yearly
          </p>
        </div>
        <div className="flex lg:col-span-5 lg:justify-end">
          <NewBoardCard />
        </div>
      </motion.div>
    </section>
  );
}
