import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { inkButton, outlineButton } from "@/lib/ui";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign up and sign in with email, Google or GitHub, and reset your password.",
};

export default function AuthenticationPage() {
  return (
    <DocPage
      eyebrow="Account"
      title="Authentication."
      lead="Sign in with an email and a password, with Google or with GitHub. Forgot your password? One email, one link."
    >
      <DocSection title="Sign up">
        <DocBullets
          items={[
            { title: "Email and password", description: "Your name, your email and a password. You land on the dashboard straight away." },
            { title: "Continue with Google", description: "Uses the email on your Google account." },
            { title: "Continue with GitHub", description: "Uses the email on your GitHub account." },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/register" className={cn(inkButton, "h-10 px-4 text-sm")}>
            Create an account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/login" className={cn(outlineButton, "h-10 px-4 text-sm")}>
            Sign in
          </Link>
        </div>
      </DocSection>

      <DocSection title="Forgot password" description="On the sign-in page, choose Forgot password and enter your email. We send a link; open it and set a new password.">
        <DocCallout tone="warn" title="Didn't get the email?">
          Check spam first. If it is not there after a few minutes, try again: the address might be off by a character.
        </DocCallout>
      </DocSection>

      <DocSection title="Sessions">
        <DocBullets
          items={[
            { title: "Sign out", description: "Use Log out in the account menu, top right." },
            { title: "Profile", description: "Your name, job title, company, location and bio live on the Profile page." },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
