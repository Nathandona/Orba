import type { Metadata } from "next";
import { LegalPage, SerifEm, type LegalSection } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service · Orba",
  description: "The terms that govern your use of Orba.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: (
      <>
        <p>
          By creating an account, accessing, or using Orba (the <strong>Service</strong>),
          you agree to these Terms of Service (the <strong>Terms</strong>). If you are using
          Orba on behalf of an organization, you are agreeing to these Terms for that
          organization and confirming you have the authority to do so.
        </p>
        <p>If you do not agree, do not use the Service.</p>
      </>
    ),
  },
  {
    id: "account",
    title: "Your account",
    body: (
      <>
        <p>
          You are responsible for the security of your account credentials and for all
          activity that occurs under your account. Notify us immediately at
          <a href="mailto:security@orba.work"> security@orba.work</a> if you suspect
          unauthorized access.
        </p>
        <ul>
          <li>You must be at least 16 years old to use Orba.</li>
          <li>One account per person; share workspaces, not credentials.</li>
          <li>You are responsible for the actions of teammates you invite.</li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Violate any applicable law or third-party right.</li>
          <li>Upload malware, spam, or content you don&rsquo;t have rights to share.</li>
          <li>Reverse-engineer, scrape, or resell the Service without our written consent.</li>
          <li>Probe, attack, or interfere with the integrity of the Service or its users.</li>
        </ul>
        <p>
          We may suspend or terminate accounts that breach this section, with or without
          notice depending on severity.
        </p>
      </>
    ),
  },
  {
    id: "content",
    title: "Your content",
    body: (
      <>
        <p>
          You retain ownership of the boards, tasks, comments, and files you upload (your
          <strong> Content</strong>). You grant Orba a worldwide, non-exclusive,
          royalty-free license to host, display, and process your Content solely for the
          purpose of providing the Service to you and your team.
        </p>
        <p>
          You can export your Content at any time from your workspace settings. We delete
          Content within 30 days of account closure unless retention is required by law.
        </p>
      </>
    ),
  },
  {
    id: "billing",
    title: "Plans and billing",
    body: (
      <>
        <p>
          Free plans include the features listed on our
          <a href="/pricing"> pricing page</a>. Paid plans are billed in advance on a
          monthly or annual basis through Stripe. You authorize us to charge your payment
          method on each renewal until you cancel.
        </p>
        <ul>
          <li>Annual plans include a 20% discount and are billed up front.</li>
          <li>Cancel any time from billing settings; cancellations take effect at the end of the current period.</li>
          <li>Refunds are issued at our discretion for service-impacting incidents.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "Our intellectual property",
    body: (
      <p>
        Orba, the Orba logo, and the look-and-feel of the Service are owned by Orba and
        protected by copyright, trademark, and other laws. These Terms grant you a
        limited, non-transferable license to use the Service. Nothing here transfers any
        ownership of our IP to you.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        You may close your account at any time. We may suspend or terminate the Service
        (or any portion of it) for breach of these Terms, fraud, abuse, or to comply with
        legal requirements. On termination, your right to use the Service ends and we
        delete your Content as described above.
      </p>
    ),
  },
  {
    id: "warranty",
    title: "Disclaimer and limitation of liability",
    body: (
      <>
        <p>
          The Service is provided <strong>as is</strong> without warranties of any kind,
          express or implied, including merchantability, fitness for a particular purpose,
          and non-infringement.
        </p>
        <p>
          To the maximum extent permitted by law, Orba&rsquo;s total liability arising
          out of or related to these Terms will not exceed the greater of (a) the fees
          paid by you to Orba in the twelve months preceding the claim, or (b)
          USD&nbsp;100.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. We&rsquo;ll post the new version
        here and update the date at the top. Material changes will be announced by email
        or in-product notice at least 14 days before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these Terms? Email
        <a href="mailto:legal@orba.work"> legal@orba.work</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={<>The terms, in <SerifEm>plain&nbsp;English</SerifEm>.</>}
      intro="Short, fair, and free of dark patterns. The agreement between you and Orba when you use the Service."
      lastUpdated="April 27, 2026"
      sections={SECTIONS}
      cta={{
        eyebrow: "Still have questions",
        heading: <>Talk to a <SerifEm>real human</SerifEm>.</>,
        description: "Our legal team reads every email. Most replies land within a business day.",
      }}
    />
  );
}
