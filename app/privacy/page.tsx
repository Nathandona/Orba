import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            <CardTitle className="text-4xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground mt-2">Last updated: October 20, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Orba (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information 
                  and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you use our project management service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-2 mt-4">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We collect personal information that you voluntarily provide to us when you register on the Service, 
                  express an interest in obtaining information about us or our products and services, or otherwise contact us.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The personal information we collect may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Name and contact data (email address, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Profile information (avatar, bio, preferences)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 mt-4">Usage Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We automatically collect certain information when you visit, use, or navigate the Service. This information 
                  includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                  <li>Pages viewed and features used</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 mt-4">Content Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We store the content you create within the Service, including projects, tasks, comments, and any files 
                  you upload. This content is necessary to provide you with the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect or receive:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To facilitate account creation and authentication</li>
                  <li>To provide and maintain our Service</li>
                  <li>To process your transactions and manage your subscriptions</li>
                  <li>To send you administrative information, updates, and security alerts</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To improve and personalize your experience</li>
                  <li>To monitor and analyze usage and trends</li>
                  <li>To detect, prevent, and address technical issues and fraudulent activity</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We may share your information in the following situations:
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-4">With Service Providers</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We share your information with third-party service providers who perform services on our behalf, such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Payment processing (Stripe)</li>
                  <li>Email delivery services</li>
                  <li>Cloud hosting providers</li>
                  <li>Analytics services</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 mt-4">For Legal Reasons</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may disclose your information if required to do so by law or in response to valid requests by public 
                  authorities (e.g., a court or government agency), or to protect our rights, property, or safety.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4">With Your Consent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may share your information with third parties when you have given us explicit consent to do so.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4">Business Transfers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition 
                  of all or a portion of our business to another company, your information may be transferred.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We implement appropriate technical and organizational security measures to protect your personal information. 
                  These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Secure authentication mechanisms</li>
                  <li>Access controls and monitoring</li>
                  <li>Regular backups of your data</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
                  guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, unless a longer retention period is required or permitted by law. When you delete your account, 
                  we will delete or anonymize your personal information within 90 days, except where we are required to retain 
                  it for legal or regulatory purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Your Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  To exercise these rights, please contact us through your account settings or our support channels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain information. 
                  Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Essential cookies for authentication and security</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Analytics cookies to understand how you use our Service</li>
                  <li>Performance cookies to improve Service functionality</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  You can control cookies through your browser settings, but disabling certain cookies may affect the functionality 
                  of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service may contain links to third-party websites or services that are not owned or controlled by us. 
                  We have no control over and assume no responsibility for the content, privacy policies, or practices of any 
                  third-party websites or services. We encourage you to review the privacy policy of every site you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Children&apos;s Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal 
                  information from children under 13. If you become aware that a child has provided us with personal information, 
                  please contact us, and we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">11. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and maintained on computers located outside of your state, province, 
                  country, or other governmental jurisdiction where data protection laws may differ. We take appropriate steps 
                  to ensure that your information is treated securely and in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">12. California Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you are a California resident, you have specific rights regarding your personal information under the 
                  California Consumer Privacy Act (CCPA). This includes the right to know what personal information is collected, 
                  the right to delete personal information, and the right to opt-out of the sale of personal information. 
                  We do not sell your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">13. GDPR Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you are in the European Economic Area (EEA), you have certain data protection rights under the General 
                  Data Protection Regulation (GDPR). We process your personal information based on legitimate interests, 
                  contractual necessity, or your consent. You have the right to access, correct, delete, or transfer your data, 
                  as well as the right to object to processing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">14. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy 
                  Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">15. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Through our contact form available within the Service</li>
                  <li>Via the support channels in your account settings</li>
                  <li>By submitting a privacy request through our website</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We take all privacy concerns seriously and will respond to your inquiry as soon as possible.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

