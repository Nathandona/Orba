import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Comment01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { people, type DemoCard, type Label, type Priority } from "@/components/landing/data";

export const labelTone: Record<Label, string> = {
  Feature: "bg-label-feature text-label-feature-foreground",
  Design: "bg-label-design text-label-design-foreground",
  Bug: "bg-label-design text-label-design-foreground",
  Copy: "bg-label-copy text-label-copy-foreground",
  Platform: "bg-label-neutral text-label-neutral-foreground",
};

export const priorityTone: Record<Priority, string> = {
  High: "text-priority-high",
  Medium: "text-priority-medium",
  Low: "text-priority-low",
};

export function LabelPill({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", labelTone[label as Label] ?? labelTone.Platform, className)}>
      {label}
    </span>
  );
}

export function Avatar({ person, size = 22, className }: { person: keyof typeof people; size?: number; className?: string }) {
  const p = people[person];
  return (
    <Image
      src={p.avatar}
      alt={p.name}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full", className)}
    />
  );
}

/* The face of a card, as it looks on a real Orba board. */
export function DemoCardView({ card, done = false }: { card: DemoCard; done?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-card bg-card p-3 shadow-[0_1px_2px_rgb(17_17_20/0.06),0_0_0_1px_rgb(17_17_20/0.05)] transition-opacity duration-300 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.06)]",
        done && "opacity-55",
      )}
    >
      <div className="flex">
        <LabelPill label={card.label} />
      </div>
      <p className="text-[15px] leading-5 font-semibold text-card-foreground">{card.title}</p>
      <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
        {card.due && (
          <span className="inline-flex items-center gap-1">
            <HugeiconsIcon icon={Calendar03Icon} size={14} strokeWidth={2} aria-hidden />
            {card.due}
          </span>
        )}
        {card.comments ? (
          <span className="inline-flex items-center gap-1">
            <HugeiconsIcon icon={Comment01Icon} size={14} strokeWidth={2} aria-hidden />
            <span className="sr-only">Comments: </span>
            {card.comments}
          </span>
        ) : null}
        <span className="flex-1" />
        <span className={cn("font-semibold", priorityTone[card.priority])}>{card.priority}</span>
        <Avatar person={card.assignee} />
      </div>
    </div>
  );
}
