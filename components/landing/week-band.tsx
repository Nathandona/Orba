"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MotionConfig, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { week } from "@/components/landing/data";
import { DemoBoard } from "@/components/landing/demo-board";

const AUTOPLAY_MS = 3800;

/* Monday to Friday on one board. The tabs are a real tablist (arrow keys,
   Home, End). While the band is on screen it plays through the week on its
   own, until someone picks a day; with reduced motion it never autoplays. */
export function WeekBand() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || touched || reduceMotion) return;
    const timer = window.setInterval(() => setActive((day) => (day + 1) % week.length), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [inView, touched, reduceMotion]);

  const select = (index: number, focus = false) => {
    setTouched(true);
    setActive(index);
    if (focus) tabsRef.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = week.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  const day = week[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="week-heading"
      className="relative isolate overflow-hidden bg-brand px-4 pt-24 pb-24 sm:px-8 sm:pt-28 lg:pb-32"
    >
      <Image
        src="/landing/paper-week.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <h2 id="week-heading" className="sr-only">
        A week on Orba
      </h2>

      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-7">
        <div
          role="tablist"
          aria-label="Day of the week"
          className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/12 p-1.5 backdrop-blur-sm"
        >
          {week.map((d, index) => (
            <button
              key={d.id}
              ref={(node) => {
                tabsRef.current[index] = node;
              }}
              id={`tab-${d.id}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="week-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200 sm:px-6 sm:text-base",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                index === active ? "bg-highlight font-bold text-highlight-foreground" : "text-white hover:bg-white/10",
              )}
            >
              {d.name}
            </button>
          ))}
        </div>

        <div id="week-panel" role="tabpanel" aria-labelledby={`tab-${day.id}`} className="flex w-full flex-col items-center gap-8">
          <MotionConfig reducedMotion="user">
            <div className="w-full">
              <DemoBoard board={day.board} />
            </div>
          </MotionConfig>
          {/* Announce only days the visitor picked, not the autoplay. */}
          <p aria-live={touched ? "polite" : "off"} className="max-w-[680px] text-center text-lg leading-8 text-white/85 sm:text-[21px]">
            <span className="font-bold text-white">{day.lead}</span> {day.body}
          </p>
        </div>
      </div>
    </section>
  );
}
