"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface DocFaqProps {
  items: { q: string; a: React.ReactNode }[];
  className?: string;
}

export function DocFaq({ items, className }: DocFaqProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("divide-y divide-hairline border-y border-hairline", className)}
    >
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-0">
          <AccordionTrigger className="py-5 text-left text-base font-medium text-ink-1 hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-ink-2">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
