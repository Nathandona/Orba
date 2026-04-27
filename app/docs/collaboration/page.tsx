import type { Metadata } from "next";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocBullets, DocSteps } from "@/components/docs/doc-list";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "Invitations, roles, and how teams share boards in Orba.",
};

const roleRows = [
  { role: "Owner", view: true, edit: true, invite: true, billing: true },
  { role: "Admin", view: true, edit: true, invite: true, billing: false },
  { role: "Member", view: true, edit: true, invite: false, billing: false },
  { role: "Guest", view: true, edit: false, invite: false, billing: false },
];

export default function CollaborationPage() {
  return (
    <DocPage
      eyebrow="Guides"
      title="Collaboration."
      lead="Invite the team, hand out roles, and let real-time take care of the rest. No syncing, no refresh."
    >
      <DocSection title="Invite people">
        <DocSteps
          items={[
            { title: "Open project Settings → Members", description: "Or use the Invite button on the board header." },
            { title: "Type an email", description: "One at a time, or paste a comma-separated list." },
            { title: "Pick a role", description: "Member is the default. Change it later if needed." },
            { title: "Send", description: "They get a one-click link. Sign-in or sign-up — both routes work." },
          ]}
        />
        <DocCallout tone="info" title="Pending invites">
          Invitations expire after 14 days. Resend or revoke from Settings → Members → Pending.
        </DocCallout>
      </DocSection>

      <DocSection title="Roles" description="Four roles. Most teams only need two.">
        <div className="overflow-hidden rounded-xl border border-hairline">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-ink-3">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-center font-medium">View</th>
                <th className="px-4 py-3 text-center font-medium">Edit</th>
                <th className="px-4 py-3 text-center font-medium">Invite</th>
                <th className="px-4 py-3 text-center font-medium">Billing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {roleRows.map((r) => (
                <tr key={r.role}>
                  <td className="px-4 py-3 font-medium text-ink-1">{r.role}</td>
                  <td className="px-4 py-3 text-center text-ink-2">{r.view ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-center text-ink-2">{r.edit ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-center text-ink-2">{r.invite ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-center text-ink-2">{r.billing ? "✓" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Real-time" description="What you see is what your teammates see — within a few hundred milliseconds.">
        <DocBullets
          items={[
            { title: "Live cursors", description: "See where others are clicking on the board." },
            { title: "Card locks", description: "If a teammate is editing a card, you see it before you start typing over them." },
            { title: "Activity rail", description: "Every change is logged. Click an entry to jump to the card." },
          ]}
        />
      </DocSection>

      <DocSection title="Comments and mentions">
        <DocBullets
          items={[
            { title: "@mention a teammate", description: "They get a notification. The comment also shows up in their inbox." },
            { title: "Resolve threads", description: "Comments thread on the card. Mark resolved to collapse." },
            { title: "Email digest", description: "Optional daily summary of activity on cards you own or watch." },
          ]}
        />
      </DocSection>

      <DocFooter
        prev={{ href: "/docs/projects", label: "Projects" }}
        next={{ href: "/docs/authentication", label: "Authentication" }}
      />
    </DocPage>
  );
}
