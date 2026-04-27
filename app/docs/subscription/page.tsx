import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Plans, billing, and the Stripe customer portal.",
};

export default function SubscriptionPage() {
  return (
    <DocPage
      eyebrow="Account"
      title="Subscriptions."
      lead="One plan covers your team. Pay monthly or annually. Cancel any time, keep your data."
    >
      <DocSection title="Plans" description="The full breakdown lives on the pricing page — here's the short version.">
        <DocBullets
          items={[
            { title: "Free", description: "Up to 3 members, 3 boards. Real-time, comments, mobile. No card." },
            { title: "Pro", description: "Unlimited members and boards. WIP limits, automations, analytics." },
            { title: "Enterprise", description: "SSO, audit logs, dedicated support, custom DPA. Talk to us." },
          ]}
        />
        <div className="mt-6">
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/pricing">
              See pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DocSection>

      <DocSection title="Upgrade or downgrade">
        <DocBullets
          items={[
            { title: "Upgrade", description: "Settings → Billing → Upgrade. Stripe handles the checkout. Effective immediately." },
            { title: "Downgrade", description: "Same path. Takes effect at the end of the current billing period." },
            { title: "Annual switch", description: "Toggle annual on the pricing page before checkout — saves you about two months." },
          ]}
        />
      </DocSection>

      <DocSection title="Customer portal" description="The Stripe portal is where receipts, payment methods, and tax IDs live.">
        <DocBullets
          items={[
            { title: "Update card", description: "Without re-doing checkout." },
            { title: "Download invoices", description: "PDFs, sent to billing email by default." },
            { title: "Add tax ID", description: "Required for VAT-registered teams in the EU." },
          ]}
        />
      </DocSection>

      <DocSection title="Cancellation">
        <DocCallout tone="info" title="Your data sticks around">
          Cancel and your team drops to Free at the next renewal. Boards stay accessible — they just respect the Free limits. Pull data via export at any time.
        </DocCallout>
      </DocSection>

      <DocFooter
        prev={{ href: "/docs/authentication", label: "Authentication" }}
        next={{ href: "/docs/tips", label: "Tips & tricks" }}
      />
    </DocPage>
  );
}
