"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Building2,
  Check,
  Loader2,
  Users,
  Zap,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Section } from "@/components/marketing/section";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { DisplayHeading, SerifEm } from "@/components/marketing/display-heading";
import { PricingCard, type PricingPlan, type Billing } from "@/components/marketing/pricing-card";
import { PricingMatrix, type MatrixGroup } from "@/components/marketing/pricing-matrix";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { StatGroup } from "@/components/marketing/stat-block";
import { CtaBand } from "@/components/marketing/cta-band";

import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    description: "For small teams trying us out.",
    price: { monthly: 0, annual: 0 },
    priceId: { monthly: null, annual: null },
    icon: Zap,
    variant: "free",
    features: [
      { name: "Up to 3 boards", included: true },
      { name: "3 team members", included: true },
      { name: "Basic templates", included: true },
      { name: "Email support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom workflows", included: false },
      { name: "Priority support", included: false },
      { name: "SSO & advanced security", included: false },
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    description: "For growing teams that want the full instrument.",
    price: { monthly: 12, annual: 10 },
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
      annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL,
    },
    icon: Users,
    variant: "paid",
    featured: true,
    features: [
      { name: "Unlimited boards", included: true },
      { name: "Unlimited team members", included: true },
      { name: "Premium templates", included: true },
      { name: "Priority email support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom workflows", included: true },
      { name: "Integrations", included: true },
      { name: "SSO & advanced security", included: false },
    ],
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    description: "For organizations that read SOC 2 reports for fun.",
    price: { monthly: null, annual: null },
    priceId: { monthly: null, annual: null },
    icon: Building2,
    variant: "enterprise",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Unlimited workspaces", included: true },
      { name: "Advanced security & SSO", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Custom integrations", included: true },
      { name: "On-premise deployment", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Training & onboarding", included: true },
    ],
    cta: "Talk to sales",
  },
];

const TRUST = [
  { value: "SOC 2", label: "Type II", detail: "Audited annually." },
  { value: "24/7", label: "Support", detail: "Real humans on Pro and above." },
  { value: "99.9%", label: "Uptime", detail: "Backed by an SLA on every paid plan." },
];

const MATRIX: MatrixGroup[] = [
  {
    title: "Boards",
    rows: [
      { label: "Boards", values: ["3", "Unlimited", "Unlimited"] },
      { label: "Team members", values: ["3", "Unlimited", "Unlimited"] },
      { label: "Templates", values: ["Basic", "Premium", "Custom"] },
      { label: "WIP limits", values: [false, true, true] },
    ],
  },
  {
    title: "Collaboration",
    rows: [
      { label: "Real-time presence", values: [true, true, true] },
      { label: "Comments & mentions", values: [true, true, true] },
      { label: "Custom workflows", values: [false, true, true] },
      { label: "Audit log", values: [false, true, true] },
    ],
  },
  {
    title: "Security",
    rows: [
      { label: "TLS 1.3 encryption", values: [true, true, true] },
      { label: "SSO / SCIM", values: [false, false, true] },
      { label: "On-premise deployment", values: [false, false, true] },
      { label: "SOC 2 Type II report", values: [false, true, true] },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Email", values: [true, "Priority", true] },
      { label: "Phone & video", values: [false, false, true] },
      { label: "Dedicated account manager", values: [false, false, true] },
      { label: "SLA", values: [false, "99.9%", "Custom"] },
    ],
  },
];

const FAQ = [
  {
    q: "Can I switch plans whenever I want?",
    a: "Yes. Upgrade or downgrade at any time — we prorate the difference and the change takes effect right away.",
  },
  {
    q: "What happens after the 14-day trial?",
    a: "Nothing dramatic. If you don't upgrade, your workspace converts to the free Starter plan. We don't lock your data.",
  },
  {
    q: "Do you offer a discount for nonprofits or students?",
    a: "Yes — 50% off Pro for registered nonprofits and accredited educational institutions. Email sales@orba.work.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "All major credit cards. Annual plans can be invoiced for ACH/wire transfer.",
  },
  {
    q: "Is my data really mine?",
    a: "Yes. Export to CSV or JSON at any time, no friction. Cancel and we delete your data within 30 days.",
  },
];

function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-hairline bg-surface-1 p-1 text-sm">
      {(["monthly", "annual"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors",
            value === opt ? "text-ink-1" : "text-ink-3 hover:text-ink-1",
          )}
        >
          {value === opt && (
            <motion.span
              layoutId="billing-pill"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="absolute inset-0 rounded-full bg-brand-tint"
            />
          )}
          <span className="relative">{opt === "monthly" ? "Monthly" : "Annual"}</span>
          {opt === "annual" && (
            <span className="relative inline-flex items-center rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-foreground">
              -20%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function PricingContent() {
  const [billing, setBilling] = React.useState<Billing>("monthly");
  const [error, setError] = React.useState<string | null>(null);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <div className="min-h-screen bg-background text-ink-1">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[500px] bg-[radial-gradient(circle_at_50%_0%,var(--brand-muted),transparent_60%)]"
        />
        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-[52rem]"
          >
            <Eyebrow className="justify-center">Pricing</Eyebrow>
            <DisplayHeading as="h1" size="display" className="mt-6">
              <SerifEm>Honest</SerifEm> pricing.
              <br />
              No surprises.
            </DisplayHeading>
            <p className="mx-auto mt-7 max-w-[36rem] text-lead leading-relaxed text-ink-2">
              Start free. Pay flat per seat when you outgrow it. Talk to us only if you
              actually need to talk to us.
            </p>

            <div className="mt-10 flex justify-center">
              <BillingToggle value={billing} onChange={setBilling} />
            </div>
          </motion.div>

          {(success || canceled || error) && (
            <div className="mx-auto mt-10 max-w-2xl">
              {success && (
                <Alert className="bg-brand-tint border-brand/30">
                  <Check className="h-4 w-4 text-brand" />
                  <AlertDescription className="text-ink-1">
                    Subscription active. Welcome to Pro.
                  </AlertDescription>
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

      {/* Plan cards */}
      <Section tone="default" className="pt-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} billing={billing} onError={setError} />
          ))}
        </motion.div>
      </Section>

      {/* Comparison matrix */}
      <Section tone="muted">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[48rem] text-center"
        >
          <Eyebrow className="justify-center">Compare every feature</Eyebrow>
          <DisplayHeading size="h1" className="mt-6">
            All the small print, <SerifEm>large&nbsp;and clear</SerifEm>.
          </DisplayHeading>
        </motion.div>

        <div className="mt-16 rounded-2xl border border-hairline bg-surface-1 p-4 sm:p-8">
          <PricingMatrix plans={["Starter", "Pro", "Enterprise"]} groups={MATRIX} />
        </div>
      </Section>

      {/* Trust */}
      <Section tone="default" className="py-16 sm:py-20">
        <StatGroup stats={TRUST} />
      </Section>

      {/* FAQ */}
      <Section tone="default" className="pt-0">
        <div className="mx-auto max-w-[48rem]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center"
          >
            <Eyebrow className="justify-center">FAQ</Eyebrow>
            <DisplayHeading size="h1" className="mt-6">
              Questions, <SerifEm>answered</SerifEm>.
            </DisplayHeading>
          </motion.div>
          <div className="mt-12">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Get started"
        heading={
          <>
            Three boards, <SerifEm>free forever</SerifEm>.
          </>
        }
        description="No card. No demo gating. Open Orba and start moving."
        primaryText="Start free"
        secondaryText="Talk to sales"
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
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </div>
          <Footer />
        </div>
      }
    >
      <PricingContent />
    </React.Suspense>
  );
}
