"use client";

import * as React from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";

import { cn } from "@/lib/utils";

/* Word-by-word heading reveal and soft block reveal. All motion is CSS (see
   "Text reveal" in globals.css); this file only splits words and flips
   data-reveal when the element scrolls into view. `instant` plays on first
   paint instead, for above-the-fold copy. */

export type Segment = string | { text: string; className?: string } | "\n";

const STEP_MS = 45;

/** Number of words in a set of segments, to chain the next block's delay. */
export function wordCount(segments: Segment[]) {
  return segments.reduce((n, s) => (s === "\n" ? n : n + (typeof s === "string" ? s : s.text).trim().split(/\s+/).length), 0);
}

/** Delay (ms) at which a heading of `words` words has finished rising. */
export function afterWords(words: number, base = 0) {
  return base + words * STEP_MS + 250;
}

function useRevealState(instant: boolean) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return { ref, state: instant ? undefined : inView ? "in" : "out" };
}

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  segments: Segment[];
  className?: string;
  /** Start delay in ms. */
  delay?: number;
  instant?: boolean;
};

export function RevealText({ as: Tag = "h2", segments, className, delay = 0, instant = false }: RevealTextProps) {
  const { ref, state } = useRevealState(instant);
  let i = 0;
  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      data-reveal={state}
      className={cn(instant && "reveal-load", className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {segments.map((seg, s) => {
        if (seg === "\n") return <br key={s} />;
        const text = typeof seg === "string" ? seg : seg.text;
        const words = text.trim().split(/\s+/);
        return (
          <span key={s} className={typeof seg === "string" ? undefined : seg.className}>
            {words.map((w, k) => (
              <React.Fragment key={k}>
                <span className="reveal-word">
                  <span style={{ "--i": i++ } as React.CSSProperties}>{w}</span>
                </span>
                {k < words.length - 1 || s < segments.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "p" | "span";
  delay?: number;
  instant?: boolean;
};

export function Reveal({ as: Tag = "div", delay = 0, instant = false, className, style, children, ...props }: RevealProps) {
  const { ref, state } = useRevealState(instant);
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal={state}
      className={cn("reveal-soft", instant && "reveal-load", className)}
      style={{ "--d": `${delay}ms`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}
