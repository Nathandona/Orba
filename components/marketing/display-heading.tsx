import * as React from "react";
import { cn } from "@/lib/utils";

type Size = "display" | "h1" | "h2" | "h3";

const sizeClass: Record<Size, string> = {
  display: "text-display leading-[0.95]",
  h1: "text-h1 leading-[1.02]",
  h2: "text-h2 leading-[1.05]",
  h3: "text-h3 leading-[1.15]",
};

interface DisplayHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  size?: Size;
  balance?: boolean;
}

export function DisplayHeading({
  as: Tag = "h2",
  size = "h2",
  balance = true,
  className,
  children,
  ...props
}: DisplayHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-sans font-medium tracking-[-0.02em] text-ink-1",
        sizeClass[size],
        balance && "text-balance",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

interface SerifEmphasisProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function SerifEm({ className, children, ...props }: SerifEmphasisProps) {
  return (
    <span
      className={cn("font-serif italic font-normal text-brand", className)}
      {...props}
    >
      {children}
    </span>
  );
}
