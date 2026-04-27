import * as React from "react";
import { Info, Lightbulb, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "tip" | "warn" | "secure";

const config: Record<
  Tone,
  { icon: React.ComponentType<{ className?: string }>; ring: string; iconColor: string }
> = {
  info: { icon: Info, ring: "border-brand/30 bg-brand/[0.04]", iconColor: "text-brand" },
  tip: { icon: Lightbulb, ring: "border-brand/30 bg-brand/[0.04]", iconColor: "text-brand" },
  warn: {
    icon: AlertTriangle,
    ring: "border-amber-300/60 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/[0.06]",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  secure: { icon: ShieldCheck, ring: "border-hairline bg-surface-2", iconColor: "text-ink-2" },
};

interface DocCalloutProps {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function DocCallout({ tone = "info", title, children, className }: DocCalloutProps) {
  const { icon: Icon, ring, iconColor } = config[tone];
  return (
    <aside
      className={cn(
        "flex gap-4 rounded-xl border px-5 py-4 text-sm leading-relaxed text-ink-2",
        ring,
        className,
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} />
      <div className="space-y-1">
        {title && <p className="font-medium text-ink-1">{title}</p>}
        <div>{children}</div>
      </div>
    </aside>
  );
}
