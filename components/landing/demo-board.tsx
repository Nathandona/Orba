"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

import { cards, columns, people, type Column } from "@/components/landing/data";
import { DemoCardView } from "@/components/landing/demo-card";

const team = ["elena", "mika", "jo", "sam"] as const;

/* A sample Orba board. Cards carry a layoutId, so when the board state changes
   (the week band switches day) each card glides to its new column. */
export function DemoBoard({ board }: { board: Record<Column, string[]> }) {
  const total = columns.reduce((sum, column) => sum + board[column].length, 0);
  const done = board.Done.length;

  return (
    <div className="overflow-hidden rounded-panel bg-card text-left shadow-[0_2px_4px_rgb(17_17_20/0.05),0_40px_80px_rgb(10_20_90/0.30)]">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="size-7 shrink-0 -rotate-6 rounded-lg bg-brand" />
          <div className="min-w-0">
            <p className="truncate text-[17px] font-bold tracking-[-0.01em] text-card-foreground">Website relaunch</p>
            <p className="text-[13px] font-medium text-muted-foreground">
              {done} of {total} cards done, due Dec 12
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            role="progressbar"
            aria-label="Cards done"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            className="hidden h-2 w-40 overflow-hidden rounded-full bg-column sm:block"
          >
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={false}
              animate={{ width: `${(done / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
            />
          </div>
          <div className="hidden -space-x-2 sm:flex">
            {team.map((id) => (
              <Image
                key={id}
                src={people[id].avatar}
                alt={people[id].name}
                width={30}
                height={30}
                className="rounded-full ring-2 ring-card"
              />
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground">
            <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2} aria-hidden />
            New card
          </span>
        </div>
      </div>

      <LayoutGroup id="demo-board">
        <div className="grid h-[560px] grid-cols-[repeat(4,minmax(232px,1fr))] gap-3.5 overflow-x-auto p-4 sm:p-6">
          {columns.map((column) => (
            <section key={column} aria-label={column} className="flex min-h-0 flex-col gap-2.5 rounded-2xl bg-column p-3">
              <h3 className="flex items-center gap-2 px-1 pt-1 text-[15px] font-bold text-foreground">
                {column}
                <span className="text-[13px] font-semibold text-muted-foreground tabular-nums">{board[column].length}</span>
              </h3>
              <ul className="flex min-h-0 flex-col gap-2.5 overflow-hidden [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
                {board[column].map((id) => (
                  <motion.li
                    key={id}
                    layoutId={id}
                    layout="position"
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  >
                    <DemoCardView card={cards[id]} done={column === "Done"} />
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}
