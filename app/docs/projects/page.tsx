import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets, DocSteps } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Create boards, configure columns, and archive what's done.",
};

export default function ProjectsPage() {
  return (
    <DocPage
      eyebrow="Guides"
      title="Projects."
      lead="A project is a board. One per body of work. Configure columns, invite a team, and ship — then archive."
    >
      <DocSection
        step="01"
        title="Create a project"
        description="From the dashboard, click New project."
      >
        <DocSteps
          items={[
            { title: "Pick a name", description: "Short and verb-led. 'Q3 launch' beats 'Q3 launch project for marketing'." },
            { title: "Pick a color", description: "Used everywhere the project shows up — sidebar, cards, search." },
            { title: "Add a description (optional)", description: "Helpful if more than one team uses Orba." },
            { title: "Choose a template", description: "Or skip and start from blank columns." },
          ]}
        />
      </DocSection>

      <DocSection
        step="02"
        title="Configure columns"
        description="Most teams need three. Some need five. Past five and the board fights you."
      >
        <DocBullets
          items={[
            { title: "Default", description: "Backlog · In progress · Done." },
            { title: "With review", description: "Backlog · In progress · Review · Done." },
            { title: "With blocked", description: "Add a Blocked lane only if you actually use it. Otherwise cards rot there." },
          ]}
        />
        <DocCallout tone="tip" title="Naming columns">
          Column names should describe state, not action. 'In review' beats 'Review this'.
        </DocCallout>
      </DocSection>

      <DocSection
        step="03"
        title="Invite the team"
        description="Open Settings → Members. Invite by email. Pick a role."
      >
        <div className="mt-2">
          <Button asChild variant="outline" className="border-hairline">
            <Link href="/docs/collaboration">
              Roles and permissions
              <Users className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DocSection>

      <DocSection
        step="04"
        title="Archive when done"
        description="Settings → Archive project. The board disappears from your sidebar but stays searchable. Restore at any time."
      >
        <DocCallout tone="warn" title="Archiving is reversible">
          We never delete archived projects. Cards, comments, and activity are kept. Use Settings → Delete project for permanent removal.
        </DocCallout>
      </DocSection>

      <DocSection title="Quick links">
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/dashboard">
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-hairline">
            <Link href="/docs/getting-started">Getting started</Link>
          </Button>
        </div>
      </DocSection>

      <DocFooter
        prev={{ href: "/docs/user-guide", label: "User guide" }}
        next={{ href: "/docs/collaboration", label: "Collaboration" }}
      />
    </DocPage>
  );
}
