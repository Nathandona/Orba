import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocFaq } from "@/components/docs/doc-faq";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Quick answers to the most common Orba questions.",
};

export default function FAQPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="FAQ."
      lead="Short answers to the questions we get most. Need more? Email hello@orba.work and a human replies."
    >
      <DocSection title="Getting started">
        <DocFaq
          items={[
            {
              q: "How do I create my first board?",
              a: (
                <>
                  Sign in, click <strong>New project</strong> on the dashboard, give it a name and color, then click
                  Create. Your board lands with three default columns.
                </>
              ),
            },
            {
              q: "Do I need a credit card to start?",
              a: "No. Free is free for teams up to three. We don't ask for a card until you upgrade.",
            },
            {
              q: "Can I import from Trello, Jira, or Notion?",
              a: "CSV import is available on every plan. Native Jira and Linear importers are on Pro.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Team and access">
        <DocFaq
          items={[
            {
              q: "How do I invite my team?",
              a: (
                <>
                  Open project Settings → Members. Type emails. Pick a role. The full breakdown lives on the{" "}
                  <Link href="/docs/collaboration" className="text-brand hover:underline">
                    Collaboration page
                  </Link>
                  .
                </>
              ),
            },
            {
              q: "Can I have guests on a board?",
              a: "Yes. Guest role is read-only with comment access. Guests don't count against your member quota.",
            },
            {
              q: "Is real-time collaboration included on Free?",
              a: "Yes. Cursors, card locks, and live updates work on every plan.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Boards and cards">
        <DocFaq
          items={[
            {
              q: "Can I customize columns?",
              a: "Yes. Add, rename, reorder, and archive any column. Drag the column header to move it.",
            },
            {
              q: "How many cards can a board hold?",
              a: "No hard limit. Performance stays smooth past a thousand cards thanks to virtualized rendering.",
            },
            {
              q: "Can I move a card between projects?",
              a: "Yes. Open the card → … menu → Move to project. Comments and history travel with it.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Billing and plans">
        <DocFaq
          items={[
            {
              q: "When do I get charged?",
              a: "On upgrade. Annual is billed in full at checkout. Monthly renews the same date each month.",
            },
            {
              q: "Can I cancel any time?",
              a: "Yes. Cancellation is one click in the customer portal. You keep access until the period ends.",
            },
            {
              q: "What happens to my data if I downgrade to Free?",
              a: "Nothing is deleted. Boards beyond the Free quota go read-only until you upgrade or delete them.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Security and privacy">
        <DocFaq
          items={[
            {
              q: "Where is my data hosted?",
              a: "Orba runs on OVHcloud infrastructure in the EU. Sub-processors and DPA are in our privacy policy.",
            },
            {
              q: "Do you train AI on my data?",
              a: "No. Orba does not train AI models on your boards, cards, or comments.",
            },
            {
              q: "Can I export everything?",
              a: "Yes. Settings → Export. JSON and CSV formats supported.",
            },
          ]}
        />
      </DocSection>

      <DocFooter
        prev={{ href: "/docs/shortcuts", label: "Shortcuts" }}
        next={{ href: "/docs/troubleshooting", label: "Troubleshooting" }}
      />
    </DocPage>
  );
}
