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
  title: "Authentication",
  description: "Sign in, OAuth providers, password reset.",
};

export default function AuthenticationPage() {
  return (
    <DocPage
      eyebrow="Account"
      title="Authentication."
      lead="Sign in with email, Google, or GitHub. Forgot your password? One link, no codes."
    >
      <DocSection title="Sign up">
        <DocBullets
          items={[
            { title: "Email + password", description: "Use a real email — we send a confirmation link." },
            { title: "Continue with Google", description: "One click. Uses the email on your Google account." },
            { title: "Continue with GitHub", description: "Useful if your team already lives there." },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/register">
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-hairline">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </DocSection>

      <DocSection title="Sign in" description="Same providers as sign-up. Same email = same account.">
        <DocCallout tone="info" title="Multiple providers, one account">
          If you signed up with email and later click Continue with Google using the same address, we link them. You don&apos;t end up with duplicate accounts.
        </DocCallout>
      </DocSection>

      <DocSection title="Forgot password" description="Enter your email. We send a link. Click it. Set a new password.">
        <DocCallout tone="warn" title="Didn't get the email?">
          Check spam first. If it&apos;s not there after two minutes, try again — the address might be off by a character.
        </DocCallout>
      </DocSection>

      <DocSection title="Sessions and security">
        <DocBullets
          items={[
            { title: "Sessions are signed", description: "Tokens are HTTP-only cookies. JavaScript on the page can't read them." },
            { title: "Sign out everywhere", description: "Settings → Security → Sign out of all sessions." },
            { title: "Account deletion", description: "Settings → Account → Delete. Permanent after a 30-day grace period." },
          ]}
        />
      </DocSection>

      <DocFooter
        prev={{ href: "/docs/collaboration", label: "Collaboration" }}
        next={{ href: "/docs/subscription", label: "Subscriptions" }}
      />
    </DocPage>
  );
}
