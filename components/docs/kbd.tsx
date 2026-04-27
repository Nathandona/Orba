import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-hairline bg-surface-2 px-1.5 font-mono text-[11px] font-medium text-ink-1 shadow-[inset_0_-1px_0_var(--hairline)]",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

interface KbdRowProps {
  keys: string[];
  className?: string;
}

export function KbdRow({ keys, className }: KbdRowProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((k, i) => (
        <React.Fragment key={`${k}-${i}`}>
          <Kbd>{k}</Kbd>
          {i < keys.length - 1 && <span className="text-ink-3">+</span>}
        </React.Fragment>
      ))}
    </span>
  );
}
