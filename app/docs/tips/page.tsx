import type { Metadata } from "next";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Tips & tricks",
  description: "Small habits that make Orba feel faster.",
};

export default function TipsPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="Tips & tricks."
      lead="Small habits that compound. None of these are required — all of them save minutes a day."
    >
      <DocSection title="Run a tighter board">
        <DocBullets
          items={[
            { title: "Three columns by default", description: "Backlog · In progress · Done. Add Review only if every card actually goes through it." },
            { title: "Cap In progress", description: "Pro plans support WIP limits. Even without them, agree on a number with your team." },
            { title: "Archive on Friday", description: "Move Done cards to Archive at the end of the week. Keeps the board readable." },
          ]}
        />
      </DocSection>

      <DocSection title="Write better cards">
        <DocBullets
          items={[
            { title: "Verb-led titles", description: "'Migrate auth tokens' beats 'Auth migration thing'." },
            { title: "Acceptance criteria in the description", description: "Three bullets max. If you can't, the card should be split." },
            { title: "Tag consistently", description: "Two-word max. 'frontend' not 'front-end stuff that touches React'." },
          ]}
        />
      </DocSection>

      <DocSection title="Run a faster standup">
        <DocBullets
          items={[
            { title: "Filter to the assignee", description: "On standup, each person filters the board to their cards. Walks through them in 30 seconds." },
            { title: "Use search across boards", description: "Cmd/Ctrl + K. Type a name to see what they own everywhere." },
            { title: "Pin the active sprint", description: "Pinned projects show up at the top of the sidebar." },
          ]}
        />
      </DocSection>

      <DocCallout tone="tip" title="The two-minute rule">
        If a card takes less than two minutes, do it instead of moving it. Less ceremony, less context-switching.
      </DocCallout>

      <DocFooter
        prev={{ href: "/docs/subscription", label: "Subscriptions" }}
        next={{ href: "/docs/shortcuts", label: "Shortcuts" }}
      />
    </DocPage>
  );
}
