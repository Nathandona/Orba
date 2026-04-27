import type { Metadata } from "next";
import { LegalPage, SerifEm, type LegalSection } from "@/components/marketing/legal-page";

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
          We collect the minimum we need to run Orba, never sell your data, and give you
          the tools to export or delete it on demand. The rest of this page explains how.
        </p>
        <ul>
          <li><strong>Minimum collection.</strong> If we don&rsquo;t need it, we don&rsquo;t store it.</li>
          <li><strong>No sale, ever.</strong> Your data is not a product line.</li>
          <li><strong>Your data, your call.</strong> Export or delete from settings.</li>
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
            <strong>Account data.</strong> Email, name, password hash, profile photo (if
            provided), workspace name, billing info via Stripe.
          </li>
          <li>
            <strong>Workspace content.</strong> Boards, columns, tasks, comments,
            attachments, and metadata you and your teammates create.
          </li>
          <li>
            <strong>Usage and device data.</strong> IP address, browser, OS, pages
            visited, performance metrics. Used to keep the Service running.
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
          <li>Send transactional email (confirmations, security alerts, billing receipts).</li>
          <li>Send product updates if you opt in. You can unsubscribe at any time.</li>
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
          <li><strong>Stripe</strong> &mdash; payments.</li>
          <li><strong>OVHcloud</strong> &mdash; hosting (EU region).</li>
          <li><strong>ZeptoMail</strong> &mdash; transactional email.</li>
          <li><strong>Cloudflare</strong> &mdash; DDoS mitigation and edge caching.</li>
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
          <li><strong>First-party analytics.</strong> Aggregate page views, no cross-site tracking, no third-party adtech.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <p>
          Workspace content lives as long as your account does. When you delete your
          account, we delete content within 30 days. Backups are purged within 90 days.
        </p>
        <p>
          Billing records are retained for 7 years to comply with tax law. Logs are
          retained for 30 days for security.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <p>
          Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Production
          access is gated by SSO with hardware keys, audited monthly. We&rsquo;re working
          toward SOC 2 Type II certification &mdash; status updates at
          <a href="https://orba.work/security"> orba.work/security</a>.
        </p>
        <p>
          Found a vulnerability? Email
          <a href="mailto:security@orba.work"> security@orba.work</a>. We respond within
          24 hours and credit responsible disclosure.
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
          <li><strong>Port</strong> it to another tool (CSV or JSON export).</li>
          <li><strong>Object</strong> to processing based on legitimate interest.</li>
        </ul>
        <p>
          Most of these are one-click in your account settings. For anything else, email
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
        Orba is hosted in the EU. If you access the Service from outside the EU, your
        data is transferred to and stored in the EU. We rely on Standard Contractual
        Clauses for any onward transfer.
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
      eyebrow="Legal"
      title={<>Privacy, <SerifEm>without&nbsp;the dark patterns</SerifEm>.</>}
      intro="What we collect, what we don't, and what you can do about it. No legalese, no fine print."
      lastUpdated="April 27, 2026"
      sections={SECTIONS}
      cta={{
        eyebrow: "Still have questions",
        heading: <>Email a <SerifEm>real human</SerifEm>.</>,
        description: "Privacy questions go to a small team that actually replies.",
      }}
    />
  );
}
