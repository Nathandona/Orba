import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { inkButton } from "@/lib/ui";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Free and Pro, billing through Stripe, and cancellation.",
};

export default function SubscriptionPage() {
  return (
    <DocPage
      eyebrow="Account"
      title="Subscriptions."
      lead="Two plans. Pro is one flat price for the whole team, monthly or yearly. Cancel any time."
    >
      <DocSection title="Plans">
        <DocBullets
          items={[
            { title: "Free", description: `${FREE_LIMITS.boards} projects, up to ${FREE_LIMITS.membersPerBoard} people on each. No card.` },
            { title: "Pro", description: `Unlimited projects and people, plus the Pro templates. $${PRO_PRICE.annualPerMonth} a month billed yearly ($${PRO_PRICE.annualTotal}), or $${PRO_PRICE.monthly} month to month. One price for the whole team.` },
          ]}
        />
        <div className="mt-6">
          <Link href="/pricing" className={cn(inkButton, "h-10 px-4 text-sm")}>
            See pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>

      <DocSection title="Upgrade">
        <DocBullets
          items={[
            { title: "From the pricing page", description: "Pick monthly or yearly. Stripe handles the checkout, and Pro starts as soon as the payment goes through." },
            { title: "No trial", description: "Free has no time limit, so there is nothing to trial." },
          ]}
        />
      </DocSection>

      <DocSection title="Manage billing" description="Profile, Billing tab, Manage subscription opens the Stripe customer portal.">
        <DocBullets
          items={[
            { title: "Payment method", description: "Update your card without going through checkout again." },
            { title: "Invoices", description: "Download past invoices." },
            { title: "Cancel", description: "Cancel from the portal. Pro stays active until the end of the period you paid for." },
          ]}
        />
      </DocSection>

      <DocSection title="After you cancel">
        <DocCallout tone="info" title="Nothing is deleted">
          Your projects, cards and files stay. The Free limits apply again to anything new: you cannot create more than{" "}
          {FREE_LIMITS.boards} projects or add people past {FREE_LIMITS.membersPerBoard} per project until you upgrade.
        </DocCallout>
      </DocSection>
    </DocPage>
  );
}
