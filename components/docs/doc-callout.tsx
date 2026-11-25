import * as React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Alert02Icon, BulbIcon, InformationCircleIcon, SecurityCheckIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type Tone = "info" | "tip" | "warn" | "secure";

const icons: Record<Tone, IconSvgElement> = {
  info: InformationCircleIcon,
  tip: BulbIcon,
  warn: Alert02Icon,
  secure: SecurityCheckIcon,
};

interface DocCalloutProps {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/* A hairline box with an ink icon. Tone only changes the icon, never the colour. */
export function DocCallout({ tone = "info", title, children, className }: DocCalloutProps) {
  const icon = icons[tone];
  return (
    <aside className={cn("flex gap-3 rounded-lg border border-hairline px-4 py-3.5 text-[15px] leading-relaxed text-ink-2", className)}>
      <HugeiconsIcon icon={icon} className={cn("mt-[3px] h-4 w-4 shrink-0", tone === "warn" ? "text-ink-1" : "text-ink-3")} />
      <div className="min-w-0 space-y-1">
        {title && <p className="font-medium text-ink-1">{title}</p>}
        <div>{children}</div>
      </div>
    </aside>
  );
}
