import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { inkButton } from "@/lib/ui";
import { DocPage, DocLink } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets, DocSteps } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Projects",
  description: "Create projects, shape their columns, edit and delete them.",
};

export default function ProjectsPage() {
  return (
    <DocPage
      eyebrow="Guides"
      title="Projects."
      lead="A project is a board: one per body of work. Create it, shape its columns, invite a team, and delete it when you no longer need it."
    >
      <DocSection step="01" title="Create a project" description="From the dashboard, click New project.">
        <DocSteps
          items={[
            { title: "Pick a name", description: "Short and specific. 'Q3 launch' beats 'Q3 launch project for marketing'." },
            { title: "Pick a colour", description: "It marks the project across the dashboard." },
            { title: "Add a description and a due date", description: "Both optional. The due date shows on the dashboard." },
            { title: "Custom or template", description: "Custom starts with To Do, In Progress and Done. Templates bring their own columns and sample cards; some templates are part of Pro." },
          ]}
        />
      </DocSection>

      <DocSection step="02" title="Shape the columns" description="Most teams need three or four. Past five, the board fights you.">
        <DocBullets
          items={[
            { title: "Default", description: "To Do · In Progress · Done." },
            { title: "With review", description: "To Do · In Progress · Review · Done." },
            { title: "With blocked", description: "Add a Blocked column only if you actually use it. Otherwise cards sit there forever." },
          ]}
        />
        <DocCallout tone="tip" title="Name the state, not the action">
          &apos;In review&apos; beats &apos;Review this&apos;.
        </DocCallout>
      </DocSection>

      <DocSection step="03" title="Invite the team" description="Open the board and click Team, then invite by email and pick a role.">
        <p>
          Roles and limits are on the <DocLink href="/docs/collaboration">Collaboration</DocLink> page.
        </p>
      </DocSection>

      <DocSection step="04" title="Edit or delete" description="Use the project's menu on the dashboard.">
        <DocBullets
          items={[
            { title: "Edit Project", description: "Change the name, description, colour or due date." },
            { title: "Delete Project", description: "Only the project owner can delete it. Columns, cards, comments and files go with it." },
          ]}
        />
        <DocCallout tone="warn" title="There is no archive">
          Deleting a project is permanent and cannot be undone.
        </DocCallout>
      </DocSection>

      <div>
        <Link href="/dashboard" className={cn(inkButton, "h-10 px-4 text-sm")}>
          Open dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </DocPage>
  );
}
