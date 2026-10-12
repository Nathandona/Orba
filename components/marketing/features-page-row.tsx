"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/motion";

/* One feature on /features: copy and a fact list on one side, a decorative UI
   crop on a muted plate on the other. `visual` receives `play` (false under
   reduced motion, which renders the final state). */
export function FeatureRow({
  index,
  label,
  title,
  body,
  facts,
  visual,
  flip = false,
}: {
  index: string;
  label: string;
  title: string;
  body: string;
  facts: string[];
  visual: (play: boolean) => React.ReactNode;
  flip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 items-center gap-8 border-t border-hairline py-14 lg:grid-cols-12 lg:gap-16 lg:py-20"
    >
      <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2")}>
        <p className="flex items-center gap-3 text-sm text-ink-3">
          <span className="font-mono text-xs text-ink-3">{index}</span>
          <span>{label}</span>
        </p>
        <h3 className="mt-4 text-h2 leading-[1.05] font-medium tracking-[-0.02em] text-balance text-ink-1">{title}</h3>
        <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-ink-2">{body}</p>
        <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
          {facts.map((f) => (
            <li key={f} className="py-2.5 text-sm text-ink-2">
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn("min-w-0 lg:col-span-7", flip && "lg:order-1")}>
        <div aria-hidden className="relative min-h-[260px] overflow-hidden rounded-2xl border border-hairline bg-surface-2">
          {/* Mounted once in view, so animated visuals start from their first frame. */}
          <div className="mx-auto max-w-[36rem]">{inView || reduce ? visual(!reduce) : null}</div>
        </div>
      </div>
    </motion.div>
  );
}
