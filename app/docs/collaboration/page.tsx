import type { Metadata } from "next";
import { FREE_LIMITS } from "@/lib/plans";
import { DocPage, DocTable } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets, DocSteps } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "Invitations, roles and comments in Orba.",
};

const yes = "✓";
const no = "·";

export default function CollaborationPage() {
  return (
    <DocPage
      eyebrow="Guides"
      title="Collaboration."
      lead="Invite the people who work on a project, give each one a role, and keep the conversation on the cards."
    >
      <DocSection title="Invite people">
        <DocSteps
          items={[
            { title: "Open the board and click Team", description: "The dialog lists the owner and every member." },
            { title: "Enter a name and an email", description: "One person at a time." },
            { title: "Pick a role", description: "Member is the default. Admin can also manage the team." },
            { title: "Send", description: "People who already have an account are added. Others get an email with a link to sign up, and show as pending until they do." },
          ]}
        />
        <DocCallout tone="info" title="Free plan limit">
          On Free, each project holds up to {FREE_LIMITS.membersPerBoard} people. Pro removes the limit.
        </DocCallout>
      </DocSection>

      <DocSection title="Roles" description="Three roles. The owner is whoever created the project.">
        <DocTable
          head={["Role", "View", "Edit cards", "Manage team", "Delete project"]}
          rows={[
            ["Owner", yes, yes, yes, yes],
            ["Admin", yes, yes, yes, no],
            ["Member", yes, yes, no, no],
          ]}
        />
      </DocSection>

      <DocSection title="Working together">
        <DocBullets
          items={[
            { title: "Comments", description: "Every card has a Comments tab. Comments are listed in order, with the author and time." },
            { title: "Files", description: "Attach files up to 10 MB to a card so the whole team finds them in one place." },
            { title: "Seeing changes", description: "A teammate's changes appear when you reload the board." },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
