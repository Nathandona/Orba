import type { Metadata } from "next";
import { FREE_LIMITS, PRO_PRICE } from "@/lib/plans";
import { DocPage, DocLink } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocFaq } from "@/components/docs/doc-faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Quick answers to the most common Orba questions.",
};

export default function FAQPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="FAQ."
      lead="Short answers to the questions we get most. Need more? Email hello@orba.work."
    >
      <DocSection title="Getting started">
        <DocFaq
          items={[
            {
              q: "How do I create my first board?",
              a: "Sign in, click New project on the dashboard, give it a name and a colour, and create it. It starts with To Do, In Progress and Done, or with a template's columns.",
            },
            {
              q: "Do I need a credit card to start?",
              a: `No. Free has no card and no time limit: ${FREE_LIMITS.boards} projects with up to ${FREE_LIMITS.membersPerBoard} people on each.`,
            },
            {
              q: "Can I import from Trello, Jira or Notion?",
              a: "Not yet. There is no importer today, so cards are created in Orba.",
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
                  Open the board, click Team, enter a name and an email, and pick a role. The details are on the{" "}
                  <DocLink href="/docs/collaboration">Collaboration</DocLink> page.
                </>
              ),
            },
            {
              q: "Is there a read-only guest role?",
              a: "No. A project has an owner, admins and members, and everyone on it can view and edit cards.",
            },
            {
              q: "Do changes show up live?",
              a: "Not yet. A teammate's changes appear when you reload the board.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Boards and cards">
        <DocFaq
          items={[
            {
              q: "Can I customise columns?",
              a: "Yes. Add a column with a name and a colour, and edit or delete it from the column header menu. Deleting a column also deletes its cards.",
            },
            {
              q: "Can I attach files?",
              a: "Yes, up to 10 MB per file, from the card's Attachments tab.",
            },
            {
              q: "Can I move a card to another project?",
              a: "No. Cards move between the columns of their own project.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Billing and plans">
        <DocFaq
          items={[
            {
              q: "How much is Pro?",
              a: `$${PRO_PRICE.annualPerMonth} a month billed yearly ($${PRO_PRICE.annualTotal}), or $${PRO_PRICE.monthly} month to month. One flat price for the whole team, not per person.`,
            },
            {
              q: "Can I cancel any time?",
              a: "Yes, from Profile, Billing, Manage Subscription. Pro stays active until the end of the period you paid for.",
            },
            {
              q: "What happens to my data if I go back to Free?",
              a: `Nothing is deleted. The Free limits apply to anything new, so you cannot create more than ${FREE_LIMITS.boards} projects until you upgrade again.`,
            },
          ]}
        />
      </DocSection>

      <DocSection title="Privacy">
        <DocFaq
          items={[
            {
              q: "Where is my data hosted?",
              a: (
                <>
                  In the EU. Our processors are listed in the <DocLink href="/privacy">privacy policy</DocLink>.
                </>
              ),
            },
            {
              q: "Do you train AI on my data?",
              a: "No. Orba does not train AI models on your projects, cards or comments.",
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
