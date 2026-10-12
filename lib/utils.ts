import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The custom type scale in globals.css (--text-display, --text-h1...) must be
// known as font sizes, or tailwind-merge reads "text-h1" as a colour and drops
// it whenever a text colour is merged in.
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["eyebrow", "display", "h1", "h2", "h3", "lead"] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
