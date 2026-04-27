import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  withRule?: boolean;
}

export function Eyebrow({ withRule = true, className, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-3",
        className,
      )}
      {...props}
    >
      {withRule && <span aria-hidden className="h-px w-8 bg-ink-3/60" />}
      <span>{children}</span>
    </div>
  );
}
