import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  bullets?: string[];
  variant?: "default" | "compact" | "ink";
  className?: string;
  children?: React.ReactNode;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  bullets,
  variant = "default",
  className,
  children,
}: FeatureCardProps) {
  const ink = variant === "ink";
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 sm:p-8 transition-colors duration-[var(--dur-base)] ease-out-expo",
        ink
          ? "border-ink-1 bg-ink-1 text-background"
          : "border-hairline bg-surface-1 hover:border-brand/40",
        variant === "compact" && "p-6 sm:p-7",
        className,
      )}
    >
      {Icon && (
        <div
          className={cn(
            "mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border",
            ink ? "border-background/30 text-background" : "border-hairline text-brand",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3
        className={cn(
          "mb-3 text-h3 font-medium tracking-[-0.01em]",
          ink ? "text-background" : "text-ink-1",
        )}
      >
        {title}
      </h3>
      <p className={cn("text-base leading-relaxed", ink ? "text-background/75" : "text-ink-2")}>
        {description}
      </p>
      {bullets && bullets.length > 0 && (
        <ul
          className={cn(
            "mt-6 space-y-2 border-t pt-5 text-sm",
            ink ? "border-background/15 text-background/75" : "border-hairline text-ink-2",
          )}
        >
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "h-1 w-1 rounded-full",
                  ink ? "bg-background/60" : "bg-brand",
                )}
              />
              {b}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
