import { DocPage, DocLink } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocCardLink } from "@/components/docs/doc-card-link";

const GROUPS = [
  {
    title: "Start here",
    cards: [
      { href: "/docs/getting-started", title: "Getting started", description: "Create an account, a first project and its columns." },
      { href: "/docs/user-guide", title: "User guide", description: "Boards, columns and cards, end to end." },
    ],
  },
  {
    title: "Guides",
    cards: [
      { href: "/docs/projects", title: "Projects", description: "Create, edit and delete projects." },
      { href: "/docs/collaboration", title: "Collaboration", description: "Invitations, roles and comments." },
      { href: "/docs/authentication", title: "Authentication", description: "Email, Google, GitHub and password reset." },
      { href: "/docs/subscription", title: "Subscriptions", description: "Free and Pro, billing and cancellation." },
    ],
  },
  {
    title: "Reference",
    cards: [
      { href: "/docs/tips", title: "Tips", description: "Habits that keep a board readable." },
      { href: "/docs/shortcuts", title: "Keyboard", description: "The keys that work in Orba today." },
      { href: "/docs/faq", title: "FAQ", description: "Short answers to common questions." },
      { href: "/docs/troubleshooting", title: "Troubleshooting", description: "When something looks wrong." },
    ],
  },
];

export default function DocsOverviewPage() {
  return (
    <DocPage
      eyebrow="Documentation"
      title="Everything you need to run Orba."
      lead="Plain-English guides for setting up projects, inviting your team and moving work across the board."
    >
      {GROUPS.map((g) => (
        <DocSection key={g.title} title={g.title}>
          <div className="grid gap-3 sm:grid-cols-2">
            {g.cards.map((c) => (
              <DocCardLink key={c.href} {...c} />
            ))}
          </div>
        </DocSection>
      ))}

      <DocSection title="Still stuck?">
        <p>
          Email <DocLink href="mailto:hello@orba.work">hello@orba.work</DocLink> with the project name and what you
          expected to happen.
        </p>
      </DocSection>
    </DocPage>
  );
}
