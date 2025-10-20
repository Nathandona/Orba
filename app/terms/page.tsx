import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Terms of Service</CardTitle>
            <p className="text-muted-foreground mt-2">Last updated: October 20, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Orba (&quot;the Service&quot;), you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Permission is granted to temporarily use Orba for personal or commercial project management purposes. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose without a valid subscription</li>
                  <li>Attempt to decompile or reverse engineer any software contained in Orba</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  When you create an account with us, you must provide information that is accurate, complete, and current 
                  at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination 
                  of your account on our Service.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for safeguarding the password that you use to access the Service and for any activities 
                  or actions under your password, whether your password is with our Service or a third-party service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Subscription and Billing</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring 
                  and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set on a monthly or annual basis.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  At the end of each Billing Cycle, your subscription will automatically renew under the exact same conditions 
                  unless you cancel it or we cancel it. You may cancel your subscription renewal through your account settings 
                  or by contacting our customer support team.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A valid payment method, including credit card, is required to process the payment for your subscription. 
                  You shall provide accurate and complete billing information including full name, address, state, zip code, 
                  and valid payment method information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer a 30-day money-back guarantee for annual subscriptions. If you are not satisfied with the Service 
                  within the first 30 days of your annual subscription, you may request a full refund. Monthly subscriptions 
                  are non-refundable after the first payment is processed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Content and Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The Service and its original content (excluding user-generated content), features, and functionality are and 
                  will remain the exclusive property of Orba and its licensors. The Service is protected by copyright, trademark, 
                  and other laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You retain all rights to any content you submit, post, or display on or through the Service. By submitting, 
                  posting, or displaying content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free 
                  license to use, reproduce, and process such content solely for the purpose of providing the Service to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use 
                  the Service:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>In any way that violates any applicable national or international law or regulation</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                  <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service</li>
                  <li>To upload or transmit viruses, malware, or any other malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not guarantee that the Service will be available at all times or that it will be uninterrupted or 
                  error-free. We reserve the right to suspend, withdraw, or restrict the availability of all or any part of 
                  the Service for business and operational reasons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Orba, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
                  for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss 
                  of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
                  inability to access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or 
                  liability, under our sole discretion, for any reason whatsoever and without limitation, including but not 
                  limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using 
                  the Service or contact us to request account deletion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">11. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                  is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes 
                  a material change will be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard 
                  to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be 
                  considered a waiver of those rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">13. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us through our contact form or support channels 
                  available within the Service.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

