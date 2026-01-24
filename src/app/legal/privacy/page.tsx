import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy - Kinigo.id",
  description: "Privacy Policy for Kinigo.id platform",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-sm border rounded-2xl bg-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Privacy Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardHeader>

          <Separator />

          <CardContent className="prose prose-gray max-w-none">
            {/* Intro */}
            <section className="space-y-4">
              <p>
                At <strong>Kinigo.id</strong>, we take your privacy seriously.
                This Privacy Policy explains how we collect, use, and share your
                personal information when you use our platform.
              </p>
            </section>

            {/* 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                1. Information We Collect
              </h2>

              <div className="space-y-2">
                <h3 className="text-lg font-medium mt-4">
                  a. Information you provide to us:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Account information (name, email address, phone number)
                  </li>
                  <li>Profile information (photo, bio, social media links)</li>
                  <li>Content you create or share on the platform</li>
                  <li>Communications with us</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium mt-4">
                  b. Information we collect automatically:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Usage data (how you interact with our platform)</li>
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            {/* 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Personalize your experience</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>
                  Communicate with you about products, services, and events
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                3. How We Share Your Information
              </h2>
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Service providers who assist in operating our platform</li>
                <li>
                  Other users as directed by you (e.g., when you join an event)
                </li>
                <li>
                  Third parties when required by law or to protect our rights
                </li>
                <li>Business transfers (in case of merger or acquisition)</li>
              </ul>
              <p className="font-medium">
                We do not sell your personal information to third parties.
              </p>
            </section>

            {/* 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">4. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to
                provide our services and for legitimate business purposes. Once
                no longer needed, we will securely remove it from our systems.
              </p>
            </section>

            {/* 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">5. Your Rights</h2>
              <p>You may have the following rights regarding your data:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@kinigo.id"
                  className="text-primary underline"
                >
                  privacy@kinigo.id
                </a>
                .
              </p>
            </section>

            {/* 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                6. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar technologies to track activity on our
                platform. You can instruct your browser to refuse cookies or
                notify you when a cookie is being sent.
              </p>
            </section>

            {/* 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">7. Data Security</h2>
              <p>
                We implement technical and organizational measures to protect
                your data from unauthorized access, alteration, disclosure, or
                destruction.
              </p>
            </section>

            {/* 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                8. Children&apos;s Privacy
              </h2>
              <p>
                Our platform is not intended for children under 13. We do not
                knowingly collect data from children. If we discover such data,
                we will delete it immediately.
              </p>
            </section>

            {/* 9 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Updates
                will be posted here with the new effective date.
              </p>
            </section>

            {/* 10 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">10. Contact Us</h2>
              <p>
                For questions about this Privacy Policy, contact us at{" "}
                <a
                  href="mailto:privacy@kinigo.id"
                  className="text-primary underline"
                >
                  privacy@kinigo.id
                </a>
                .
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
