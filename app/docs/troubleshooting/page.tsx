import type { Metadata } from "next";
import { DocPage, DocLink } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocCallout } from "@/components/docs/doc-callout";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "When something looks wrong, start here.",
};

const GROUPS: { title: string; issues: { title: string; steps: string[] }[] }[] = [
  {
    title: "Invitations and email",
    issues: [
      {
        title: "An invitation email never arrived",
        steps: [
          "Check the spam folder: first emails often land there.",
          "Open Team on the board and check the address. One typo and the email goes nowhere.",
          "Remove the pending person and invite them again with the right address.",
        ],
      },
      {
        title: "The password reset email is stuck",
        steps: [
          "Wait a few minutes. Corporate inboxes can lag.",
          "Request a new link from Forgot password? on the sign-in page.",
          "Email hello@orba.work and we will help you get back in.",
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
          "Reload the page; your session may have expired.",
          "Check that you are still on the project's team.",
          "Try another browser to rule out an extension blocking drag and drop.",
        ],
      },
      {
        title: "A teammate's changes aren't showing",
        steps: [
          "Reload the board. Changes from others appear on reload, not live.",
          "Check that you are both looking at the same project.",
        ],
      },
      {
        title: "I can't create another project",
        steps: [
          "On Free, you can have up to three projects. Delete one you no longer need, or upgrade to Pro.",
        ],
      },
    ],
  },
  {
    title: "Files",
    issues: [
      {
        title: "A file won't upload",
        steps: [
          "Files are limited to 10 MB each. Compress or split larger files.",
          "Reload the card and try again.",
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
      lead="The most common issues and the fastest fix for each."
    >
      {GROUPS.map((group) => (
        <DocSection key={group.title} title={group.title}>
          <div className="divide-y divide-hairline border-y border-hairline">
            {group.issues.map((issue) => (
              <details key={issue.title} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-1">
                  {issue.title}
                  <span aria-hidden className="text-ink-3 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <ol className="mt-3 space-y-2 text-[15px] text-ink-2">
                  {issue.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-4 shrink-0 font-mono text-xs leading-6 text-ink-3">{i + 1}</span>
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
        Email <DocLink href="mailto:hello@orba.work">hello@orba.work</DocLink> with the project name and a screenshot.
      </DocCallout>
    </DocPage>
  );
}
