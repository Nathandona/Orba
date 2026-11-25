import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { OutlineButton, StickyButton } from "@/components/landing/sticky-button";

function Feature({ children, inverted }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <HugeiconsIcon
        icon={Tick02Icon}
        size={20}
        strokeWidth={2.2}
        aria-hidden
        className={cn("mt-0.5 shrink-0", inverted ? "text-highlight" : "text-brand")}
      />
      {children}
    </li>
  );
}

/* Two plan cards tossed on white paper. Plans are things you can pick up, so
   they tilt (2deg); the numbers come from lib/plans.ts, the single source. */
export function PricingSection() {
  return (
    <section aria-labelledby="pricing-heading" className="relative isolate mt-28 overflow-hidden px-4 pt-28 pb-32 sm:px-8 lg:mt-44 lg:pt-36 lg:pb-40">
      <Image src="/landing/paper-pricing.webp" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-16">
        <h2 id="pricing-heading" className="max-w-[820px] text-center text-h2 font-extrabold text-balance text-foreground">
          Free for {FREE_LIMITS.boards} boards. One flat price after that.
        </h2>

        <div className="grid w-full gap-8 md:grid-cols-2">
          <article className="flex flex-col gap-7 rounded-panel bg-card p-9 shadow-[0_0_0_1px_rgb(17_17_20/0.08),0_20px_40px_rgb(17_17_20/0.07)] md:-rotate-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-bold text-card-foreground">Free</h3>
              <p className="text-[17px] text-foreground-secondary">For a small team getting started.</p>
            </div>
            <p className="flex items-baseline gap-2">
              <span className="text-[80px] leading-none font-extrabold tracking-[-0.04em] text-card-foreground tabular-nums">$0</span>
              <span className="text-[17px] text-muted-foreground">forever, no card</span>
            </p>
            <ul className="flex flex-1 flex-col gap-3 text-[17px] text-card-foreground">
              <Feature>{FREE_LIMITS.boards} boards</Feature>
              <Feature>{FREE_LIMITS.membersPerBoard} people on each board</Feature>
              <Feature>Every card feature: labels, due dates, comments, files</Feature>
            </ul>
            <div>
              <OutlineButton href="/register">Start free</OutlineButton>
            </div>
          </article>

          <article className="flex flex-col gap-7 rounded-panel bg-foreground p-9 text-background shadow-[0_24px_48px_rgb(17_17_20/0.20)] md:rotate-2 dark:bg-card dark:text-card-foreground dark:shadow-[0_0_0_1px_rgb(255_255_255/0.1)]">
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-bold">Pro</h3>
              <p className="text-[17px] opacity-75">
                One price for the whole team, not per person. ${PRO_PRICE.monthly} if you pay monthly.
              </p>
            </div>
            <p className="flex items-baseline gap-2">
              <span className="text-[80px] leading-none font-extrabold tracking-[-0.04em] tabular-nums">${PRO_PRICE.annualPerMonth}</span>
              <span className="text-[17px] opacity-70">a month, billed yearly</span>
            </p>
            <ul className="flex flex-1 flex-col gap-3 text-[17px]">
              <Feature inverted>Unlimited boards</Feature>
              <Feature inverted>Unlimited people on each board</Feature>
              <Feature inverted>Pro templates</Feature>
            </ul>
            <div>
              <StickyButton href="/register?callbackUrl=/pricing">Go Pro</StickyButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
