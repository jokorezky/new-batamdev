import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service - Kinigo.id",
  description: "Terms of Service for Kinigo.id platform",
};

export default function TermsOfService() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-sm border rounded-2xl bg-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Terms of Service
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
            {/* 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using <strong>Kinigo.id</strong> ("the
                Platform"), you agree to comply with and be bound by these Terms
                of Service and all applicable laws and regulations. If you do
                not agree to these Terms, you must not use or access the
                Platform.
              </p>
            </section>

            {/* 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">2. License to Use</h2>
              <p>
                We grant you a limited, non-exclusive, non-transferable license
                to access and use the Platform for personal, non-commercial
                purposes. Under this license, you may not:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Modify or copy the materials;</li>
                <li>
                  Use the materials for commercial purposes or public display;
                </li>
                <li>Reverse-engineer or attempt to extract the source code;</li>
                <li>Remove copyright or proprietary notices;</li>
                <li>Transfer or mirror the materials on another server.</li>
              </ul>
            </section>

            {/* 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                3. Account Registration
              </h2>
              <p>
                To access certain features, you may need to create an account.
                You agree to provide accurate, current, and complete information
                during registration and keep it up to date. You are responsible
                for maintaining the confidentiality of your account credentials
                and all activities under your account.
              </p>
            </section>

            {/* 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">4. User Content</h2>
              <p>
                You retain ownership of any content you submit, post, or share
                on the Platform. However, by doing so, you grant Kinigo.id a
                worldwide, non-exclusive, royalty-free license to use,
                reproduce, adapt, publish, display, and distribute your content
                for the purposes of operating and improving the Platform.
              </p>
            </section>

            {/* 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                5. Prohibited Activities
              </h2>
              <p>You agree not to engage in any of the following activities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Copying, distributing, or disclosing any part of the Platform
                  in any medium;
                </li>
                <li>
                  Using automated systems (e.g., bots, scrapers) to access the
                  Platform;
                </li>
                <li>
                  Transmitting spam, chain letters, or unsolicited messages;
                </li>
                <li>
                  Attempting to compromise the security or integrity of the
                  Platform;
                </li>
                <li>
                  Overloading our infrastructure with unreasonable requests;
                </li>
                <li>Uploading harmful code, viruses, or malware;</li>
                <li>
                  Collecting personal data from other users without consent;
                </li>
                <li>
                  Impersonating another person or misrepresenting your identity;
                </li>
                <li>
                  Interfering with the proper functioning of the Platform;
                </li>
                <li>Accessing content through unauthorized methods.</li>
              </ul>
            </section>

            {/* 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">6. Termination</h2>
              <p>
                We may suspend or terminate your account, with or without
                notice, if you violate these Terms or engage in activities that
                may harm the Platform, its users, or our business interests.
              </p>
            </section>

            {/* 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                7. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Kinigo.id and its
                affiliates shall not be liable for any indirect, incidental,
                special, or consequential damages, including but not limited to
                loss of profits, data, or goodwill, arising from your use of the
                Platform.
              </p>
            </section>

            {/* 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">
                8. Changes to Terms
              </h2>
              <p>
                We may update these Terms from time to time. If we make material
                changes, we will provide notice at least 30 days before the new
                Terms take effect. Continued use of the Platform after updates
                means you accept the revised Terms.
              </p>
            </section>

            {/* 9 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of Indonesia, without regard to conflict of law
                principles.
              </p>
            </section>

            {/* 10 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mt-8">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:legal@kinigo.id"
                  className="text-primary underline"
                >
                  legal@kinigo.id
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
