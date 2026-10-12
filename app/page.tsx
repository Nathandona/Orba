"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroBoard } from "@/components/marketing/hero-board";
import { FeaturesSection } from "@/components/marketing/features-section";
import { WeekWalkthrough } from "@/components/marketing/week-walkthrough";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { CtaBand } from "@/components/marketing/cta-band";

import { cn } from "@/lib/utils";
import { focusRing, inkButton } from "@/lib/ui";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { Reveal, RevealText, afterWords, wordCount } from "@/components/marketing/reveal";

const HEADLINE = ["The Kanban your team", { text: "will actually open on Monday.", className: "text-ink-3" }];
const HERO_START = 80;
const AFTER_HEADLINE = afterWords(wordCount(HEADLINE), HERO_START);

export default function Home() {
  const { data: session } = useSession();
  const heroHref = session ? "/dashboard" : "/register";
  const heroLabel = session ? "Open dashboard" : "Start free";

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-36 lg:pt-44">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <Reveal
                as="span"
                instant
                className="inline-flex items-center rounded-full border border-hairline px-3 py-1 text-xs text-ink-2"
              >
                Kanban for product teams
              </Reveal>
              {/* LCP element: the reveal is pure CSS, so it plays on first paint, before hydration. */}
              <RevealText
                as="h1"
                instant
                delay={HERO_START}
                segments={HEADLINE}
                className="mt-6 text-display leading-[0.98] font-semibold tracking-[-0.035em] text-balance text-ink-1"
              />
            </div>

            <div className="min-w-0 lg:col-span-5 lg:pb-2">
              <Reveal as="p" instant delay={AFTER_HEADLINE} className="max-w-[36ch] text-lead leading-relaxed text-ink-2">
                Orba is a quiet, fast, opinionated board for planning the sprint, running the standup and shipping
                the work. Everything else stays out of your way.
              </Reveal>
              <Reveal instant delay={AFTER_HEADLINE + 90} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href={heroHref} className={cn(inkButton, "group h-12 px-6 text-base")}>
                  {heroLabel}
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
              </Reveal>
              <Reveal as="p" instant delay={AFTER_HEADLINE + 180} className="mt-4 font-mono text-xs text-ink-3">
                Free for {FREE_LIMITS.boards} boards · then ${PRO_PRICE.annualPerMonth} a month per team
              </Reveal>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: (AFTER_HEADLINE + 120) / 1000, ease: [0.23, 1, 0.32, 1] }}
            className="mt-14 lg:mt-20"
          >
            <HeroBoard />
          </motion.div>
        </div>
      </section>

      <FeaturesSection />
      <WeekWalkthrough />
      <PricingTeaser />
      <CtaBand />

      <Footer />
    </div>
  );
}
