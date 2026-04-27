import type { Metadata } from "next";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "When something looks wrong, start here.",
};

interface Issue {
  title: string;
  steps: string[];
}

const groups: { title: string; issues: Issue[] }[] = [
  {
    title: "Invitations and email",
    issues: [
      {
        title: "Invitation email never arrived",
        steps: [
          "Check the spam folder — first emails often land there.",
          "Confirm the address in Settings → Members → Pending. One typo and the email goes nowhere.",
          "Resend from the Pending list. Resends use a fresh signed link.",
        ],
      },
      {
        title: "Password reset email is stuck",
        steps: [
          "Wait two minutes — corporate inboxes can lag.",
          "Try a different address if you have multiple.",
          "Email hello@orba.work and we'll reset manually.",
        ],
      },
    ],
  },
  {
    title: "Boards and cards",
    issues: [
      {
        title: "I can't move a card",
        steps: [
          "Refresh the page — a stale session can drop the WebSocket connection.",
          "Check your role. Guests can't move cards.",
          "Try a different browser to rule out an extension blocking drag events.",
        ],
      },
      {
        title: "Changes from a teammate aren't showing up",
        steps: [
          "Check the connection indicator (top-right). If it's red, your tab lost real-time.",
          "Reload the tab. Cards rehydrate within a second on a healthy network.",
          "If multiple teammates are stuck, check status.orba.work.",
        ],
      },
    ],
  },
  {
    title: "Performance",
    issues: [
      {
        title: "The board feels slow",
        steps: [
          "Close other heavy tabs — the editor and a video call together can saturate memory.",
          "Disable browser extensions for orba.work and reload.",
          "Clear the site cache: Settings → Privacy → Clear data for orba.work.",
        ],
      },
      {
        title: "Search is empty when I know the card exists",
        steps: [
          "Search is scoped to projects you can see. Confirm you're a member of the project.",
          "Newly created cards take a second or two to be indexed.",
          "Try the card title verbatim — partial matches need at least three characters.",
        ],
      },
    ],
  },
];

export default function TroubleshootingPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="Troubleshooting."
      lead="The most common issues and the fastest fix for each. If none of these solve it, email hello@orba.work."
    >
      {groups.map((group) => (
        <DocSection key={group.title} title={group.title}>
          <div className="space-y-5">
            {group.issues.map((issue) => (
              <details
                key={issue.title}
                className="group rounded-xl border border-hairline bg-surface-1 px-5 py-4 open:bg-surface-2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-ink-1">
                  {issue.title}
                  <span
                    aria-hidden
                    className="ml-3 text-ink-3 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ol className="mt-4 space-y-2.5 text-sm text-ink-2">
                  {issue.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-serif italic text-brand">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </DocSection>
      ))}

      <DocCallout tone="info" title="Still stuck?">
        Email{" "}
        <a className="text-brand hover:underline" href="mailto:hello@orba.work">
          hello@orba.work
        </a>{" "}
        with the project name and a screenshot. We usually reply within a few hours.
      </DocCallout>

      <DocFooter prev={{ href: "/docs/faq", label: "FAQ" }} />
    </DocPage>
  );
}
