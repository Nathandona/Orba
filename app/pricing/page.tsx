"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Check, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Section } from "@/components/marketing/section";
import { DisplayHeading } from "@/components/marketing/display-heading";
import { PricingCard, type PricingPlan, type Billing } from "@/components/marketing/pricing-card";
import { PricingMatrix, type MatrixGroup } from "@/components/marketing/pricing-matrix";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { CtaBand } from "@/components/marketing/cta-band";

import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { focusRing } from "@/lib/ui";
import { cn } from "@/lib/utils";

const { boards, membersPerBoard } = FREE_LIMITS;

const PLANS: PricingPlan[] = [
  {
    name: "Free",
    description: "For a small team getting started.",
    price: { monthly: 0, annual: 0 },
    priceId: { monthly: null, annual: null },
    variant: "free",
    features: [
      `${boards} boards`,
      `${membersPerBoard} people on each board`,
      "Custom columns, drag and drop",
      "Comments and files on cards",
      "Free templates",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    description: "For a team that has outgrown three boards.",
    price: { monthly: PRO_PRICE.monthly, annual: PRO_PRICE.annualPerMonth },
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
      annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL,
    },
    variant: "paid",
    features: [
      "Unlimited boards",
      "Unlimited people on each board",
      "Everything in Free",
      "Pro templates",
      "Cancel any time",
    ],
    cta: "Upgrade to Pro",
  },
];

const MATRIX: MatrixGroup[] = [
  {
    title: "Limits",
    rows: [
      { label: "Boards", values: [String(boards), "Unlimited"] },
      { label: "People per board", values: [String(membersPerBoard), "Unlimited"] },
      { label: "Templates", values: ["Free", "Free + Pro"] },
    ],
  },
  {
    title: "Boards and cards",
    rows: [
      { label: "Custom columns", values: [true, true] },
      { label: "Drag and drop", values: [true, true] },
      { label: "Priority, due date, labels, assignee", values: [true, true] },
      { label: "Comments", values: [true, true] },
      { label: "File attachments", hint: "Up to 10 MB each", values: [true, true] },
    ],
  },
  {
    title: "Team",
    rows: [
      { label: "Invite by email", values: [true, true] },
      { label: "Owner, admin and member roles", values: [true, true] },
    ],
  },
  {
    title: "Billing",
    rows: [
      { label: "Card required", values: [false, true] },
      { label: "Price", hint: "Flat, for the whole team", values: ["$0", `$${PRO_PRICE.annualPerMonth}/mo`] },
    ],
  },
];

const FAQ = [
  {
    q: "Is Pro priced per person?",
    a: `No. Pro is one flat price for the whole team: $${PRO_PRICE.annualPerMonth} a month billed yearly ($${PRO_PRICE.annualTotal}), or $${PRO_PRICE.monthly} month to month.`,
  },
  {
    q: "What does Free include?",
    a: `${boards} boards with up to ${membersPerBoard} people on each, the free templates, comments and files. No card, and no time limit.`,
  },
  {
    q: "What is the difference between monthly and yearly?",
    a: `Only the price. Yearly is $${PRO_PRICE.annualTotal} up front, which works out to two months free compared with paying $${PRO_PRICE.monthly} every month.`,
  },
  {
    q: "How do I cancel?",
    a: "From your profile, open billing and cancel the subscription. When it ends, your account goes back to Free: your boards stay, and the Free limits apply to new boards and invites.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Cards, handled by Stripe. Orba never sees your card number.",
  },
];

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-md border border-hairline p-0.5">
      {(["monthly", "annual"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "inline-flex h-8 items-center gap-2 rounded-[5px] px-3 text-sm transition-colors",
            value === opt ? "bg-surface-2 text-ink-1" : "text-ink-3 hover:text-ink-1",
            focusRing,
          )}
        >
          {opt === "monthly" ? "Monthly" : "Yearly"}
          {opt === "annual" && <span className="font-mono text-[11px] text-ink-3">2 months free</span>}
        </button>
      ))}
    </div>
  );
}

function PricingContent() {
  const [billing, setBilling] = React.useState<Billing>("annual");
  const [error, setError] = React.useState<string | null>(null);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 sm:pt-36 lg:pt-44 lg:pb-16">
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <h1 className="min-w-0 text-display leading-[0.98] font-semibold tracking-[-0.035em] text-balance text-ink-1 lg:col-span-7">
              Free to start. <span className="text-ink-3">One flat price after that.</span>
            </h1>
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="min-w-0 lg:col-span-5 lg:pb-2">
              <p className="max-w-[36ch] text-lead leading-relaxed text-ink-2">
                {boards} boards with {membersPerBoard} people on each, free. Pro lifts both limits for the whole team at
                ${PRO_PRICE.annualPerMonth} a month.
              </p>
              <div className="mt-8">
                <BillingToggle value={billing} onChange={setBilling} />
              </div>
            </motion.div>
          </div>

          {(success || canceled || error) && (
            <div className="mt-10 max-w-2xl" role="status">
              {success && (
                <Alert className="border-hairline">
                  <Check className="h-4 w-4" />
                  <AlertDescription className="text-ink-1">Subscription active. Welcome to Pro.</AlertDescription>
                </Alert>
              )}
              {canceled && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Checkout canceled. You can try again anytime.</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Plans */}
      <Section tone="default" className="pt-0 sm:pt-0 lg:pt-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} billing={billing} onError={setError} />
          ))}
        </motion.div>
      </Section>

      {/* Comparison */}
      <Section tone="muted">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <DisplayHeading size="h2">Everything on one page.</DisplayHeading>
            <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-ink-2">
              The two plans run the same product. Pro only removes the limits.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border border-hairline bg-surface-1 p-5 sm:p-8 lg:col-span-8">
            <PricingMatrix plans={["Free", "Pro"]} groups={MATRIX} />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="default">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <DisplayHeading size="h2">Questions about billing.</DisplayHeading>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </Section>

      <CtaBand
        heading={
          <>
            <span className="text-ink-3">Three boards, free.</span>
            <br />
            Your first one takes a minute.
          </>
        }
        description="No card, no demo, no sales call. Name a board, pick the columns, invite two people."
        secondaryHref="/features"
        secondaryText="See features"
      />

      <Footer />
    </div>
  );
}

export default function PricingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-ink-3" />
          </div>
          <Footer />
        </div>
      }
    >
      <PricingContent />
    </React.Suspense>
  );
}
