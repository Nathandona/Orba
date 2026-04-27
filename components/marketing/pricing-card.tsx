"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight, Check, Loader2, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ContactSalesDialog } from "@/components/contact-sales-dialog";

export type Billing = "monthly" | "annual";

export interface PricingPlan {
  name: string;
  description: string;
  icon: LucideIcon;
  price: { monthly: number | null; annual: number | null };
  priceId: { monthly: string | null | undefined; annual: string | null | undefined };
  features: { name: string; included: boolean }[];
  cta: string;
  featured?: boolean;
  variant?: "free" | "paid" | "enterprise";
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
  const Icon = plan.icon;
  const featured = plan.featured;

  const priceLabel = (() => {
    if (plan.variant === "enterprise" || plan.price.monthly === null) return "Custom";
    if (plan.price.monthly === 0) return "Free";
    return `$${billing === "monthly" ? plan.price.monthly : plan.price.annual}`;
  })();

  const priceSuffix = plan.price.monthly && plan.price.monthly > 0 ? "/user/month" : null;

  const handleClick = async () => {
    onError?.(null);
    if (plan.variant === "free") {
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

  const ButtonContent = (
    <>
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing
        </>
      ) : (
        <>
          {plan.variant === "free" && session ? "Go to dashboard" : plan.cta}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </>
  );

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-surface-1 p-7 sm:p-8",
        featured ? "border-brand bg-brand-tint" : "border-hairline",
        className,
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-background px-3 py-1 text-eyebrow font-medium uppercase tracking-[0.18em] text-brand">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          Most chosen
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-brand">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-xl font-medium text-ink-1">{plan.name}</h3>
      </div>
      <p className="mt-3 text-sm text-ink-2">{plan.description}</p>

      <div className="mt-8 flex items-baseline gap-2">
        <span className="font-serif text-[clamp(2.75rem,5vw,3.75rem)] leading-none text-ink-1">
          {priceLabel}
        </span>
        {priceSuffix && <span className="text-sm text-ink-3">{priceSuffix}</span>}
      </div>
      {billing === "annual" && (plan.price.annual ?? 0) > 0 ? (
        <p className="mt-1 text-xs text-ink-3">
          Billed annually · ${(plan.price.annual ?? 0) * 12}/user/year
        </p>
      ) : null}

      <div className="mt-8">
        {plan.variant === "enterprise" ? (
          <ContactSalesDialog
            trigger={
              <Button variant="outline" size="lg" className="w-full">
                {ButtonContent}
              </Button>
            }
          />
        ) : session ? (
          <Button
            size="lg"
            variant={featured ? "default" : "outline"}
            className={cn(
              "w-full",
              featured && "bg-brand text-brand-foreground hover:bg-brand/90",
            )}
            onClick={handleClick}
            disabled={loading}
          >
            {ButtonContent}
          </Button>
        ) : (
          <Button
            size="lg"
            variant={featured ? "default" : "outline"}
            className={cn(
              "w-full",
              featured && "bg-brand text-brand-foreground hover:bg-brand/90",
            )}
            asChild
          >
            <Link href="/register?callbackUrl=/pricing">{ButtonContent}</Link>
          </Button>
        )}
      </div>

      <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-sm">
        {plan.features.map((f) => (
          <li key={f.name} className="flex items-start gap-3">
            {f.included ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            ) : (
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-3/50" />
            )}
            <span className={cn(f.included ? "text-ink-1" : "text-ink-3/70")}>{f.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
