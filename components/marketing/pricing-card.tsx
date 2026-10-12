"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { inkButton, outlineButton } from "@/lib/ui";

export type Billing = "monthly" | "annual";

export interface PricingPlan {
  name: string;
  description: string;
  price: { monthly: number; annual: number };
  priceId: { monthly: string | null | undefined; annual: string | null | undefined };
  features: string[];
  cta: string;
  variant: "free" | "paid";
}

interface PricingCardProps {
  plan: PricingPlan;
  billing: Billing;
  onError?: (msg: string | null) => void;
  className?: string;
}

export function PricingCard({ plan, billing, onError, className }: PricingCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const paid = plan.variant === "paid";
  const price = billing === "monthly" ? plan.price.monthly : plan.price.annual;

  const handleClick = async () => {
    onError?.(null);
    if (!paid) {
      router.push(session ? "/dashboard" : "/register?callbackUrl=/pricing");
      return;
    }
    if (!session) {
      router.push("/register?callbackUrl=/pricing");
      return;
    }
    const priceId = plan.priceId[billing];
    if (!priceId) {
      onError?.("Price configuration error. Please try again later.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, billingCycle: billing }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create checkout session");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const label = loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      Processing
    </>
  ) : (
    <>
      {!paid && session ? "Go to dashboard" : plan.cta}
      <ArrowRight className="h-4 w-4" />
    </>
  );

  const buttonClass = cn(paid ? inkButton : outlineButton, "h-11 w-full text-sm");

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col rounded-2xl border border-hairline p-6 sm:p-8",
        paid ? "bg-surface-1" : "bg-background",
        className,
      )}
    >
      <h3 className="text-sm font-medium text-ink-2">{plan.name}</h3>
      <p className="mt-1 text-sm text-ink-3">{plan.description}</p>

      <div className="mt-8 flex items-baseline gap-2">
        <span className="text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.03em] tabular-nums text-ink-1">
          ${price}
        </span>
        <span className="text-base text-ink-3">{paid ? "/ month" : "forever"}</span>
      </div>
      <p className="mt-2 min-h-[1.25rem] text-sm text-ink-3">
        {paid
          ? billing === "annual"
            ? `For the whole team, billed yearly ($${plan.price.annual * 12}).`
            : "For the whole team, billed monthly."
          : "No card needed."}
      </p>

      <div className="mt-8">
        {paid && session ? (
          <button type="button" onClick={handleClick} disabled={loading} className={cn(buttonClass, "disabled:opacity-70")}>
            {label}
          </button>
        ) : paid ? (
          <Link href="/register?callbackUrl=/pricing" className={buttonClass}>
            {label}
          </Link>
        ) : (
          <button type="button" onClick={handleClick} className={buttonClass}>
            {label}
          </button>
        )}
      </div>

      <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-ink-1">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-2" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
