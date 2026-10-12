import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { inkButton } from "@/lib/ui";
import { FREE_LIMITS } from "@/lib/plans";
import { DocPage, DocLink } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocSteps } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Create an account, your first project and its columns.",
};

export default function GettingStartedPage() {
  return (
    <DocPage
      eyebrow="Getting started"
      title="Your first board in a few minutes."
      lead="Create an account, add a project, shape its columns and invite the people who work on it."
    >
      <DocSection step="01" title="Create your account">
        <DocSteps
          items={[
            { title: "Open the sign-up page", description: "Use an email and a password, or continue with Google or GitHub." },
            { title: "Land on your dashboard", description: "It is empty until you create a project." },
          ]}
        />
        <div className="mt-6">
          <Link href="/register" className={cn(inkButton, "h-10 px-4 text-sm")}>
            Create an account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DocSection>

      <DocSection
        step="02"
        title="Create your first project"
        description="A project is one board: a sprint, a launch, a hiring pipeline."
      >
        <DocSteps
          items={[
            { title: "Click New project on the dashboard", description: "A dialog opens with two tabs, Custom and Template." },
            { title: "Name it and pick a colour", description: "Add a description and a due date if you want them." },
            { title: "Start custom or from a template", description: "Custom starts with To Do, In Progress and Done. A template brings its own columns and sample cards." },
          ]}
        />
        <DocCallout tone="info" title="Free plan">
          The Free plan includes {FREE_LIMITS.boards} projects with up to {FREE_LIMITS.membersPerBoard} people on each.
          See <DocLink href="/docs/subscription">Subscriptions</DocLink>.
        </DocCallout>
      </DocSection>

      <DocSection step="03" title="Shape your columns" description="Columns are your workflow. Most teams need three or four.">
        <DocSteps
          items={[
            { title: "Add a column", description: "Click Add Column on the board, then give it a name and a colour." },
            { title: "Edit or delete a column", description: "Open the menu on the column header." },
            { title: "Add cards", description: "Create a card in a column, then drag it to the next one as the work moves." },
          ]}
        />
        <DocCallout tone="tip" title="Keep it short">
          Five columns at most. Past that, cards get lost between stages nobody looks at.
        </DocCallout>
      </DocSection>

      <DocSection step="04" title="Invite your team">
        <DocSteps
          items={[
            { title: "Open the board and click Team", description: "The team dialog lists everyone on the project." },
            { title: "Invite by email", description: "People without an account get an email with a link to sign up." },
            { title: "Pick a role", description: "Member or Admin. Roles are explained on the Collaboration page." },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
