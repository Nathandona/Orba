import { cn } from "@/lib/utils";

/* The Orba mark: a sticky note tilted -8deg with a peeled corner, and a bold
   "o" on it. In the wordmark the mark stands in for the "o" of "orba". */
export function OrbaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className={cn("shrink-0", className)}>
      <g transform="rotate(-8 80 80)">
        <path d="M32 10H128Q150 10 150 32V108L108 150H32Q10 150 10 128V32Q10 10 32 10Z" className="fill-highlight" />
        <path d="M150 108H118Q108 108 108 118V150Z" className="fill-highlight-fold" />
      </g>
      <circle cx="78" cy="78" r="36" fill="none" stroke="#111114" strokeWidth="26" />
    </svg>
  );
}

export function OrbaLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-end gap-0.5 text-foreground", className)}>
      <OrbaMark className="size-[0.82em]" />
      <span aria-hidden className="text-[1em] leading-[0.8] font-extrabold tracking-[-0.045em]">
        rba
      </span>
      <span className="sr-only">Orba</span>
    </span>
  );
}
