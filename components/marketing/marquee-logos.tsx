"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeLogosProps {
  items: { name: string; node?: React.ReactNode }[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

const speedClass = {
  slow: "[animation-duration:60s]",
  normal: "[animation-duration:40s]",
  fast: "[animation-duration:24s]",
};

export function MarqueeLogos({ items, className, speed = "normal" }: MarqueeLogosProps) {
  const list = [...items, ...items];
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max items-center gap-16 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]",
          speedClass[speed],
        )}
      >
        {list.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex h-10 shrink-0 items-center text-ink-3/70 transition-colors hover:text-ink-1"
          >
            {item.node ?? (
              <span className="font-serif text-2xl tracking-tight">{item.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
