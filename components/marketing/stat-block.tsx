import * as React from "react";
import { cn } from "@/lib/utils";

export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Stat[];
}

export function StatGroup({ stats, className, ...props }: StatGroupProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 divide-y divide-hairline border-y border-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0",
        className,
      )}
      {...props}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 px-2 py-10 sm:px-8">
          <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink-1">
            {stat.value}
          </div>
          <div className="text-eyebrow uppercase tracking-[0.18em] text-ink-3">{stat.label}</div>
          {stat.detail && <p className="text-sm text-ink-2">{stat.detail}</p>}
        </div>
      ))}
    </div>
  );
}
