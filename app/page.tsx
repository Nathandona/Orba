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
import { fadeUp, staggerChildren } from "@/lib/motion";

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
              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="inline-flex items-center rounded-full border border-hairline px-3 py-1 text-xs text-ink-2"
              >
                Kanban for product teams
              </motion.span>
              {/* The h1 is the LCP element: it renders immediately, never from opacity 0. */}
              <h1 className="mt-6 text-display leading-[0.98] font-semibold tracking-[-0.035em] text-balance text-ink-1">
                The Kanban your team <span className="text-ink-3">will actually open on Monday.</span>
              </h1>
            </div>

            <motion.div
              variants={staggerChildren(0.08, 0.1)}
              initial="hidden"
              animate="show"
              className="min-w-0 lg:col-span-5 lg:pb-2"
            >
              <motion.p variants={fadeUp} className="max-w-[36ch] text-lead leading-relaxed text-ink-2">
                Orba is a quiet, fast, opinionated board for planning the sprint, running the standup and shipping
                the work. Everything else stays out of your way.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              </motion.div>
              <motion.p variants={fadeUp} className="mt-4 font-mono text-xs text-ink-3">
                Free for {FREE_LIMITS.boards} boards · then ${PRO_PRICE.annualPerMonth} a month per team
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
