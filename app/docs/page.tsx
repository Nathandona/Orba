import Link from "next/link";
import {
  Compass,
  FileText,
  LayoutGrid,
  Users,
  Lock,
  CreditCard,
  Lightbulb,
  Keyboard,
  HelpCircle,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocCardLink } from "@/components/docs/doc-card-link";
import { DocFooter } from "@/components/docs/doc-footer";

export default function DocsOverviewPage() {
  return (
    <DocPage
      eyebrow="Documentation"
      title="Everything you need to run Orba."
      lead="Plain-English guides for setting up boards, inviting your team, and shipping work — without losing an afternoon to the tool."
    >
      <DocSection title="Start here" description="If you have ten minutes, start with these.">
        <div className="grid gap-3 sm:grid-cols-2">
          <DocCardLink
            href="/docs/getting-started"
            icon={Compass}
            eyebrow="10 min read"
            title="Getting started"
            description="Sign up, create a board, drop in your first tasks."
          />
          <DocCardLink
            href="/docs/user-guide"
            icon={FileText}
            eyebrow="20 min read"
            title="User guide"
            description="The core workflow — boards, tasks, columns, ownership."
          />
        </div>
      </DocSection>

      <DocSection title="Guides" description="Go deeper on the parts of Orba you use every day.">
        <div className="grid gap-3 sm:grid-cols-2">
          <DocCardLink
            href="/docs/projects"
            icon={LayoutGrid}
            title="Projects"
            description="Create, configure, and archive boards."
          />
          <DocCardLink
            href="/docs/collaboration"
            icon={Users}
            title="Collaboration"
            description="Invitations, roles, and how teams share boards."
          />
          <DocCardLink
            href="/docs/authentication"
            icon={Lock}
            title="Authentication"
            description="Sign in, OAuth providers, password reset."
          />
          <DocCardLink
            href="/docs/subscription"
            icon={CreditCard}
            title="Subscriptions"
            description="Plans, billing, and the customer portal."
          />
        </div>
      </DocSection>

      <DocSection title="Reference" description="Short pages you'll come back to.">
        <div className="grid gap-3 sm:grid-cols-2">
          <DocCardLink
            href="/docs/tips"
            icon={Lightbulb}
            title="Tips & tricks"
            description="Small habits that make Orba feel faster."
          />
          <DocCardLink
            href="/docs/shortcuts"
            icon={Keyboard}
            title="Keyboard shortcuts"
            description="Move through Orba without leaving the keyboard."
          />
          <DocCardLink
            href="/docs/faq"
            icon={HelpCircle}
            title="FAQ"
            description="Quick answers to the most common questions."
          />
          <DocCardLink
            href="/docs/troubleshooting"
            icon={Wrench}
            title="Troubleshooting"
            description="When something looks wrong, start here."
          />
        </div>
      </DocSection>

      <DocSection title="Still stuck?" description="The fastest way to get unblocked is usually a quick search.">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-hairline bg-surface-2 px-5 py-4 text-sm text-ink-2">
          <span>
            Can&apos;t find what you need? Email{" "}
            <a className="text-brand hover:underline" href="mailto:hello@orba.work">
              hello@orba.work
            </a>{" "}
            and a human will reply.
          </span>
          <Link
            href="/dashboard"
            className="ml-auto inline-flex items-center gap-1.5 text-brand hover:underline"
          >
            Open dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </DocSection>

      <DocFooter next={{ href: "/docs/getting-started", label: "Getting started" }} />
    </DocPage>
  );
}
