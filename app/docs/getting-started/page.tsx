import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocSteps } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Sign up, create your first board, and add tasks in under ten minutes.",
};

export default function GettingStartedPage() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Up and running in ten minutes."
      lead="Sign up, drop in your first board, and invite the team. By the end of this guide your sprint is on screen."
    >
      <DocSection
        step="01"
        title="Create your account"
        description="One step. Email and a password — or sign in with Google or GitHub if you prefer."
      >
        <DocSteps
          items={[
            {
              title: "Open the sign-up page",
              description: "Pick email/password or any OAuth provider on the right.",
            },
            {
              title: "Confirm your email",
              description: "We send one link. Click it and you're in — no SMS codes, no captcha hell.",
            },
            {
              title: "Land on your dashboard",
              description: "Empty by design. The next step fills it in.",
            },
          ]}
        />
        <div className="mt-6">
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/register">
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DocSection>

      <DocSection
        step="02"
        title="Create your first project"
        description="Projects are boards. One project per body of work — a sprint, a launch, a hiring pipeline."
      >
        <DocSteps
          items={[
            {
              title: "Click New project on the dashboard",
              description: "Top-right corner.",
            },
            {
              title: "Name it and pick a color",
              description: "The color shows up on cards across the app — make it count.",
            },
            {
              title: "Choose a starter template, or skip",
              description: "Templates pre-fill columns. You can always rename later.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        step="03"
        title="Set up your columns"
        description="Columns are your workflow. Most teams need three. Some need five."
      >
        <DocSteps
          items={[
            {
              title: "Default columns",
              description: "Backlog · In progress · Done. Good enough for most teams on day one.",
            },
            {
              title: "Add columns",
              description: "Click + at the end of the row. Rename by double-clicking the title.",
            },
            {
              title: "Reorder by drag",
              description: "Grab the column header. Drop it where it should live.",
            },
          ]}
        />
        <DocCallout tone="tip" title="Don't over-engineer">
          Five columns max. Anything more and cards get lost. You can always add a column later — you can&apos;t reclaim
          attention spent on the wrong workflow.
        </DocCallout>
      </DocSection>

      <DocSection
        step="04"
        title="Invite your team"
        description="A board is more useful with two people on it. Even more so with five."
      >
        <DocSteps
          items={[
            {
              title: "Open project settings",
              description: "Settings tab inside any project.",
            },
            {
              title: "Invite by email",
              description: "Members get a one-click link. They sign in or sign up — both routes work.",
            },
            {
              title: "Pick a role",
              description: "Member, Admin, or Owner. Roles are explained on the Collaboration page.",
            },
          ]}
        />
      </DocSection>

      <DocFooter
        prev={{ href: "/docs", label: "Overview" }}
        next={{ href: "/docs/user-guide", label: "User guide" }}
      />
    </DocPage>
  );
}
