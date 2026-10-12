"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { FREE_LIMITS } from "@/lib/plans";
import { easeOutExpo } from "@/lib/motion";

const BOARD_NAME = "Q4 launch";
const COLUMNS = ["Backlog", "Doing", "Done"];

/* The onboarding moment: a new board typing its own name, then its columns
   and members appearing. Decorative, plays once, final state under reduced
   motion. Plain divs only, nothing focusable. */
export function NewBoardCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [pressed, setPressed] = useState(false);

  const done = reduce || typed >= BOARD_NAME.length;

  useEffect(() => {
    if (reduce || !inView || typed >= BOARD_NAME.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 300 : 60);
    return () => clearTimeout(t);
  }, [inView, reduce, typed]);

  useEffect(() => {
    if (reduce || !done || !inView) return;
    const down = setTimeout(() => setPressed(true), COLUMNS.length * 60 + 700);
    const up = setTimeout(() => setPressed(false), COLUMNS.length * 60 + 850);
    return () => {
      clearTimeout(down);
      clearTimeout(up);
    };
  }, [done, inView, reduce]);

  const shown = reduce ? BOARD_NAME : BOARD_NAME.slice(0, typed);
  const appear = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 4 },
          animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 },
          transition: { duration: 0.3, ease: easeOutExpo, delay: done ? i * 0.06 : 0 },
        };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full max-w-[26rem] rounded-xl border border-hairline bg-surface-1 p-5 shadow-sm"
    >
      <p className="text-xs text-ink-3">New board</p>

      {/* Name field. The invisible full name reserves the width. */}
      <div className="mt-3 flex h-10 items-center rounded-md border border-hairline bg-background px-3 text-sm text-ink-1">
        <span className="relative">
          <span className="invisible">{BOARD_NAME}</span>
          <span className="absolute inset-0 whitespace-nowrap">
            {shown}
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-brand motion-safe:animate-pulse" />
          </span>
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs text-ink-3">Columns</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {COLUMNS.map((c, i) => (
            <motion.span
              key={c}
              {...appear(i)}
              className="inline-flex h-7 items-center rounded-full border border-hairline px-2.5 text-xs text-ink-2"
            >
              {c}
            </motion.span>
          ))}
          <motion.span
            {...appear(COLUMNS.length)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-hairline text-xs text-ink-3"
          >
            +
          </motion.span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs text-ink-3">Members</p>
        <motion.div {...appear(COLUMNS.length + 1)} className="mt-2 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-1 text-[9px] font-medium text-background">
              JL
            </span>
            {[0, 1].map((k) => (
              <span
                key={k}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-hairline bg-surface-1 text-[10px] text-ink-3"
              >
                +
              </span>
            ))}
          </div>
          <span className="font-mono text-xs text-ink-3">
            1 of {FREE_LIMITS.membersPerBoard} members
          </span>
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <span className="text-xs text-ink-3">Private to your workspace</span>
        <motion.span
          animate={{ scale: pressed ? 0.98 : 1 }}
          transition={{ duration: 0.15 }}
          className="inline-flex h-8 items-center rounded-md bg-ink-1 px-3 text-xs font-medium text-background"
        >
          Create board
        </motion.span>
      </div>
    </div>
  );
}
