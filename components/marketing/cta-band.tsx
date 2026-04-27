"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ContactSalesDialog } from "@/components/contact-sales-dialog";
import { DisplayHeading, SerifEm } from "@/components/marketing/display-heading";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: string;
  primaryText?: string;
  secondaryText?: string;
  className?: string;
}

export function CtaBand({
  eyebrow = "Get started",
  heading,
  description,
  primaryText = "Start free",
  secondaryText = "Talk to sales",
  className,
}: CtaBandProps) {
  const { data: session } = useSession();
  const href = session ? "/dashboard" : "/register";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,var(--brand-tint)_22%,var(--brand-tint)_78%,var(--background)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_60%,var(--brand-muted),transparent_60%)]"
      />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto flex max-w-[64rem] flex-col items-center gap-8 py-24 text-center sm:py-28 lg:py-32"
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <DisplayHeading size="h1" as="h2" className="max-w-[24ch] text-ink-1">
          {heading}
        </DisplayHeading>
        {description && (
          <p className="max-w-[36rem] text-lead leading-relaxed text-ink-2">
            {description}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 bg-brand px-7 text-base text-brand-foreground shadow-[0_10px_30px_-12px_var(--brand)] hover:bg-brand/90"
            asChild
          >
            <Link href={href}>
              {session ? "Open dashboard" : primaryText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <ContactSalesDialog
            trigger={
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-hairline bg-background/60 px-7 text-base backdrop-blur"
              >
                {secondaryText}
              </Button>
            }
          />
        </div>
        <p className="text-xs text-ink-3">
          Free for teams of three. No card required.
        </p>
      </motion.div>
    </section>
  );
}

export { SerifEm };
