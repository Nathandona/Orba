import type { Metadata } from "next";
import { DocPage, DocLink } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "User guide",
  description: "The core Orba workflow: boards, columns, cards, comments and files.",
};

export default function UserGuidePage() {
  return (
    <DocPage
      eyebrow="User guide"
      title="The core workflow, end to end."
      lead="Everything you touch on a normal week, and nothing you don't need."
    >
      <DocSection title="Boards" description="Each project is one board, read left to right.">
        <DocBullets
          items={[
            { title: "Columns are stages", description: "To Do, In Progress, Done by default. Move cards right as the work advances." },
            { title: "Cards are work items", description: "One card per task. Keep titles short and verb-led." },
            { title: "Drag and drop", description: "Drag a card within a column to reorder it, or into another column to move it. Orba saves where you drop it." },
          ]}
        />
      </DocSection>

      <DocSection title="Cards" description="Click a card to open it. The dialog has three tabs: Details, Comments and Attachments.">
        <DocBullets
          items={[
            { title: "Title and description", description: "Plain text. Keep the detail in the description, not the title." },
            { title: "Priority and due date", description: "Low, Medium or High, and an optional due date shown on the card." },
            { title: "Labels", description: "Type a label and press Enter to add it." },
            { title: "Assignee", description: "One person per card, picked from the project's team." },
          ]}
        />
      </DocSection>

      <DocSection title="Comments and files">
        <DocBullets
          items={[
            { title: "Comments", description: "Write in the Comments tab and press Enter to post. Shift + Enter adds a new line." },
            { title: "Attachments", description: "Attach files up to 10 MB in the Attachments tab." },
            { title: "Counts on the card", description: "The card shows how many comments and files it has." },
          ]}
        />
      </DocSection>

      <DocSection title="Columns">
        <DocBullets
          items={[
            { title: "Add", description: "Add Column on the board: a name and a colour." },
            { title: "Edit", description: "Column header menu, Edit Column, to rename it or change its colour." },
            { title: "Delete", description: "Column header menu, Delete Column. This also removes the cards inside it." },
          ]}
        />
        <DocCallout tone="warn" title="Deleting is permanent">
          A deleted column takes its cards with it. Move the cards you want to keep first.
        </DocCallout>
      </DocSection>

      <DocSection title="Keep going">
        <p>
          Next: <DocLink href="/docs/projects">Projects</DocLink> and{" "}
          <DocLink href="/docs/collaboration">Collaboration</DocLink>.
        </p>
      </DocSection>
    </DocPage>
  );
}
