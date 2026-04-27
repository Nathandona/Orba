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
  title: "User guide",
  description: "The core Orba workflow — boards, tasks, columns, ownership, comments.",
};

export default function UserGuidePage() {
  return (
    <DocPage
      eyebrow="User guide"
      title="The core workflow, end to end."
      lead="Everything you'll touch on a normal week. Nothing you don't need."
    >
      <DocSection title="Boards" description="One board per body of work. Read top to bottom, left to right.">
        <DocBullets
          items={[
            {
              title: "Columns are stages",
              description: "Backlog, In progress, Done. Move cards rightward as work advances.",
            },
            {
              title: "Cards are work items",
              description: "One card per ticket, story, or task. Keep titles short and verb-led.",
            },
            {
              title: "Ownership is explicit",
              description: "Every active card has one owner. Watchers come along for the ride.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Tasks" description="Click a card to open it. The detail panel slides in from the right.">
        <DocBullets
          items={[
            {
              title: "Title and description",
              description: "Markdown supported. Paste links — they unfurl.",
            },
            {
              title: "Assignee, due date, tags",
              description: "Tags filter the board view. Due dates show on the card edge.",
            },
            {
              title: "Comments and activity",
              description: "Mention with @. Everything is logged in the activity rail.",
            },
            {
              title: "Subtasks",
              description: "Check off the small steps. Progress shows on the parent card.",
            },
          ]}
        />
        <DocCallout tone="tip" title="Use the keyboard">
          Press <kbd className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-xs">N</kbd>{" "}
          on any board to create a card without lifting your hands. Full list on the{" "}
          <Link href="/docs/shortcuts" className="text-brand hover:underline">
            Shortcuts page
          </Link>
          .
        </DocCallout>
      </DocSection>

      <DocSection title="Columns" description="Columns are how your team agrees on what 'in progress' means.">
        <DocBullets
          items={[
            {
              title: "Add, rename, reorder",
              description: "Drag the column header. Double-click to rename.",
            },
            {
              title: "WIP limits (Pro)",
              description: "Cap the number of cards per column. Exceeded columns turn amber.",
            },
            {
              title: "Hidden columns",
              description: "Archive columns you no longer use without losing the cards inside.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="Filters and views"
        description="The same board, sliced different ways. Filters are scoped to your session — they don't change what your teammates see."
      >
        <DocBullets
          items={[
            { title: "Filter by assignee", description: "See only your cards, or only one teammate's." },
            { title: "Filter by tag", description: "Cluster the work by area: backend, design, infra." },
            { title: "Search", description: "Cmd/Ctrl + K opens search across every board you can see." },
          ]}
        />
      </DocSection>

      <DocSection title="Ready to keep going?" description="The next pages cover the parts most teams ask about.">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="border-hairline">
            <Link href="/docs/projects">
              Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-hairline">
            <Link href="/docs/collaboration">
              Collaboration
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DocSection>

      <DocFooter
        prev={{ href: "/docs/getting-started", label: "Getting started" }}
        next={{ href: "/docs/projects", label: "Projects" }}
      />
    </DocPage>
  );
}
