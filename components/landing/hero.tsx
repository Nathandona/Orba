import Image from "next/image";

import { FREE_LIMITS } from "@/lib/plans";
import { OutlineButton, StickyButton } from "@/components/landing/sticky-button";

/* Paper cut-outs sit in the white margins, never behind the copy. They are
   decoration only, so they hide on small screens where they would crowd it. */
export function Hero() {
  return (
    <section className="relative px-4 pt-20 pb-24 text-center sm:px-8 sm:pt-24 lg:pb-28">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8">
        <h1 className="text-display font-extrabold text-balance text-foreground">
          Plan the week on Monday, and watch the board empty by Friday.
        </h1>
        <p className="max-w-[640px] text-lead text-pretty text-foreground-secondary">
          Orba is a Kanban board for small teams. Name your columns, drag cards to Done, and see where every project
          stands without asking anyone.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <StickyButton href="/register" size="lg">
            Start free
          </StickyButton>
          <OutlineButton href="/pricing">See pricing</OutlineButton>
        </div>
        <p className="text-[15px] text-muted-foreground">
          Free for {FREE_LIMITS.boards} boards, no card needed.
        </p>
      </div>

      <Image
        src="/landing/sticker-plane.webp"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute top-[46%] left-[max(1rem,calc(50%-640px))] hidden w-[clamp(120px,12vw,180px)] -rotate-6 lg:block"
      />
      <Image
        src="/landing/sticker-coffee.webp"
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute top-[50%] right-[max(1rem,calc(50%-620px))] hidden w-[clamp(110px,11vw,160px)] rotate-6 lg:block"
      />
    </section>
  );
}
