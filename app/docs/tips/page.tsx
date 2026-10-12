import type { Metadata } from "next";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Tips",
  description: "Habits that keep an Orba board readable.",
};

export default function TipsPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="Tips."
      lead="Small habits that compound. None of them are required, all of them keep the board readable."
    >
      <DocSection title="Run a tighter board">
        <DocBullets
          items={[
            { title: "Three columns by default", description: "To Do · In Progress · Done. Add Review only if every card actually goes through it." },
            { title: "Agree on a limit for In Progress", description: "Pick a number with your team and stick to it. Fewer cards in flight means more of them finish." },
            { title: "Clear Done regularly", description: "Delete or move finished cards at the end of a cycle so the board shows what matters now." },
          ]}
        />
      </DocSection>

      <DocSection title="Write better cards">
        <DocBullets
          items={[
            { title: "Verb-led titles", description: "'Migrate auth tokens' beats 'Auth migration thing'." },
            { title: "Acceptance criteria in the description", description: "Three lines at most. If you need more, split the card." },
            { title: "Consistent labels", description: "One or two words each: 'frontend', 'billing'. Reuse them instead of inventing new ones." },
          ]}
        />
      </DocSection>

      <DocSection title="Run a faster standup">
        <DocBullets
          items={[
            { title: "Walk the board right to left", description: "Start with what is closest to Done. It keeps the talk on finishing, not starting." },
            { title: "One owner per card", description: "Set the assignee, so nobody has to ask who is on it." },
            { title: "Use due dates sparingly", description: "Only where a date is real. The dashboard lists the cards due next." },
          ]}
        />
      </DocSection>

      <DocCallout tone="tip" title="The two-minute rule">
        If a card takes less than two minutes, do it instead of moving it.
      </DocCallout>
    </DocPage>
  );
}
