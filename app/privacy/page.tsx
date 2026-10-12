import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy · Orba",
  description: "How Orba collects, uses, and protects your data.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "principles",
    title: "Our principles",
    body: (
      <>
        <p>
          We collect the minimum we need to run Orba, never sell your data, and delete it
          when you ask. The rest of this page explains how.
        </p>
        <ul>
          <li><strong>Minimum collection.</strong> If we don&rsquo;t need it, we don&rsquo;t store it.</li>
          <li><strong>No sale, ever.</strong> Your data is not a product line.</li>
          <li><strong>Your data, your call.</strong> Ask for a copy or for deletion by email.</li>
        </ul>
      </>
    ),
  },
  {
    id: "what",
    title: "What we collect",
    body: (
      <>
        <p>We collect three buckets of data:</p>
        <ul>
          <li>
            <strong>Account data.</strong> Email, name, password hash (or your Google or
            GitHub account if you sign in with one), profile photo if provided, and billing
            details handled by Stripe.
          </li>
          <li>
            <strong>Workspace content.</strong> Boards, columns, tasks, comments,
            attachments, and metadata you and your teammates create.
          </li>
          <li>
            <strong>Usage and device data.</strong> IP address, browser, operating system and
            pages visited, through our host and its analytics. Used to keep the Service running.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how",
    title: "How we use it",
    body: (
      <>
        <p>We use the data above only to:</p>
        <ul>
          <li>Provide and improve the Service.</li>
          <li>Authenticate you and prevent abuse.</li>
          <li>Process payments via Stripe.</li>
          <li>Send transactional email (invitations, password resets, replies to contact requests). Stripe sends billing receipts.</li>
        </ul>
        <p>We do not use your workspace content to train machine learning models. Period.</p>
      </>
    ),
  },
  {
    id: "share",
    title: "Who we share with",
    body: (
      <>
        <p>We only share data with sub-processors strictly necessary to run the Service:</p>
        <ul>
          <li><strong>Vercel</strong>: hosting and privacy-friendly page analytics (Vercel Web Analytics).</li>
          <li><strong>A managed PostgreSQL database</strong>: storage of your account and workspace data.</li>
          <li><strong>Stripe</strong>: payments.</li>
          <li><strong>ZeptoMail</strong>: transactional email.</li>
          <li><strong>Google</strong> and <strong>GitHub</strong>: sign-in, only if you choose to use them.</li>
        </ul>
        <p>
          Each sub-processor is bound by a data-processing agreement. We never sell or
          rent your data to advertisers.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar tech",
    body: (
      <>
        <p>We use cookies for two things and two things only:</p>
        <ul>
          <li><strong>Strictly necessary.</strong> Authentication, CSRF protection, theme preference.</li>
          <li><strong>Analytics.</strong> Aggregate page views through Vercel Web Analytics, no cross-site tracking, no adtech.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        {/* TODO(Nathan): confirm deletion delay and any backup retention; nothing in the code sets them. */}
        <p>
          Workspace content lives as long as your account does. When you ask us to delete
          your account, we delete your content.
        </p>
        <p>Billing records are kept for as long as tax law requires.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <p>
          All traffic to Orba is encrypted in transit over HTTPS, and passwords are stored
          as salted hashes, never in plain text.
        </p>
        <p>
          Found a vulnerability? Email
          <a href="mailto:security@orba.work"> security@orba.work</a>. We credit responsible
          disclosure.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>Whatever your jurisdiction, you have the right to:</p>
        <ul>
          <li><strong>Access</strong> a copy of your data.</li>
          <li><strong>Correct</strong> it if it&rsquo;s wrong.</li>
          <li><strong>Delete</strong> it.</li>
          <li><strong>Port</strong> it to another tool.</li>
          <li><strong>Object</strong> to processing based on legitimate interest.</li>
        </ul>
        <p>
          You can update your name and photo in your profile. For anything else, email
          <a href="mailto:privacy@orba.work"> privacy@orba.work</a>.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Our providers may process data in countries other than yours. Where the law
        requires it, these transfers rely on Standard Contractual Clauses.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We&rsquo;ll post the new version here and update the date at the top. Material
        changes are announced by email at least 14 days before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        {/* TODO(Nathan): confirm the dpo@ mailbox exists, or remove it. */}
        Privacy questions? Email
        <a href="mailto:privacy@orba.work"> privacy@orba.work</a>. EU users may also
        contact our DPO at
        <a href="mailto:dpo@orba.work"> dpo@orba.work</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title={["Privacy Policy.", { text: "Without the dark patterns.", className: "text-ink-3" }]}
      intro="What we collect, what we don't, and what you can do about it. No fine print."
      lastUpdated="October 12, 2026"
      sections={SECTIONS}
    />
  );
}
