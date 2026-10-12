import { cn } from "@/lib/utils";

/* Shared marketing styles. Blue (--brand) is a signal only: focus, live dot,
   active state. Never a filled button. */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* Solid ink button: the only filled button style on the marketing site. */
export const inkButton = cn(
  "inline-flex items-center justify-center gap-1.5 rounded-md bg-ink-1 font-medium text-background transition-[background-color,transform] duration-150 ease-out hover:bg-ink-1/90 active:scale-[0.97]",
  focusRing,
);

/* Outlined secondary, same height as inkButton. */
export const outlineButton = cn(
  "inline-flex items-center justify-center gap-1.5 rounded-md border border-hairline bg-background font-medium text-ink-1 transition-[background-color,transform] duration-150 ease-out hover:bg-surface-2 active:scale-[0.97]",
  focusRing,
);
