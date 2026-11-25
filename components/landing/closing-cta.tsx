import Image from "next/image";

import { StickyButton } from "@/components/landing/sticky-button";

/* Yellow paper band. On yellow ground the sticky note turns cobalt so it
   never disappears into the background. */
export function ClosingCta() {
  return (
    <section aria-labelledby="close-heading" className="relative isolate overflow-hidden bg-highlight px-4 py-36 text-center sm:px-8 lg:py-44">
      <Image src="/landing/paper-close.webp" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-7">
        <h2 id="close-heading" className="text-display font-extrabold text-balance text-highlight-foreground">
          Your first board takes a minute.
        </h2>
        <p className="max-w-[560px] text-lead text-highlight-foreground/80">
          No card, no demo, no sales call. Name a board, pick the columns, invite two people.
        </p>
        <StickyButton href="/register" tone="brand" size="lg" className="mt-2">
          Start free
        </StickyButton>
      </div>
    </section>
  );
}
