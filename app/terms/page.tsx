import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { FOOTER_CONTACT } from "@/constants/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions under which you may access and use axenity.com. Read these terms carefully before using the site.",
  alternates: canonical("/terms"),
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "16 September 2026";

export default function TermsPage() {
  return (
    <main className="bg-background text-foreground">
        <Breadcrumb path="/terms" />
      <article className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:py-28">
        <header className="mb-12 border-b border-white/10 pb-8">
          <p className="text-sm font-semibold text-primary">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="prose prose-invert max-w-none space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">1. Agreement</h2>
            <p>
              These terms govern your access to and use of{" "}
              <a
                className="text-primary underline-offset-4 hover:underline"
                href="https://www.axenity.com"
              >
                www.axenity.com
              </a>{" "}
              (the &ldquo;Site&rdquo;), operated by Axenity based in{" "}
              {FOOTER_CONTACT.location}. By using the Site you agree to these
              terms. If you do not agree, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Nature of the Site
            </h2>
            <p>
              The Site is an informational website describing services offered
              by Axenity, showcasing prior work, and providing a way to contact
              us. Nothing on the Site constitutes a binding offer to provide
              services. Engagements are governed by a separate written
              agreement between Axenity and the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Use the Site in any way that violates applicable law.</li>
              <li>
                Attempt to interfere with, disrupt, or damage the Site, its
                servers, or any connected networks.
              </li>
              <li>
                Reverse-engineer, scrape at abusive rates, or attempt to
                circumvent security measures (including rate limits and bot
                protection).
              </li>
              <li>
                Submit false, misleading, or malicious content through the
                contact form or chat.
              </li>
              <li>
                Impersonate another person or misrepresent your affiliation
                with a person or entity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Intellectual property
            </h2>
            <p>
              All content on the Site &mdash; text, graphics, logos, images,
              code, and case-study material &mdash; is owned by Axenity or its
              licensors and is protected by copyright, trademark, and other
              intellectual-property laws. You may view and share the content
              for personal, non-commercial purposes with attribution. Any other
              use, including reproduction, republication, or commercial
              redistribution, requires our prior written permission.
            </p>
            <p>
              Portfolio case studies mention client work only where the client
              has consented to disclosure. If you are a former client and want
              a mention updated or removed, contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Third-party links
            </h2>
            <p>
              The Site may link to third-party websites. We do not control
              those sites and are not responsible for their content, privacy
              practices, or availability. Your use of any third-party site is
              at your own risk and subject to its own terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. No warranty
            </h2>
            <p>
              The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis. Performance figures, uptime numbers, and
              outcome metrics presented in case studies describe past
              engagements and are not a warranty of future results for any
              other engagement. To the maximum extent permitted by applicable
              law, we disclaim all warranties, express or implied, including
              fitness for a particular purpose and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Limitation of liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Axenity will
              not be liable for any indirect, incidental, consequential,
              special, or punitive damages arising out of or in connection with
              your use of the Site. This does not limit liability that cannot
              be excluded under Australian law, including under the Australian
              Consumer Law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Privacy
            </h2>
            <p>
              Use of the Site is also governed by our{" "}
              <a
                className="text-primary underline-offset-4 hover:underline"
                href="/privacy"
              >
                Privacy Policy
              </a>
              , which explains what personal information we collect and how we
              use it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Governing law
            </h2>
            <p>
              These terms are governed by the laws of New South Wales,
              Australia. Any dispute arising out of or relating to the Site or
              these terms is subject to the exclusive jurisdiction of the
              courts of New South Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Changes
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the
              Site after an update constitutes acceptance of the revised
              terms. The &ldquo;Last updated&rdquo; date at the top of this
              page is authoritative.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Contact
            </h2>
            <p>
              Questions about these terms? Email{" "}
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={`mailto:${FOOTER_CONTACT.email}`}
              >
                {FOOTER_CONTACT.email}
              </a>
              .
            </p>
          </section>

          <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.03] p-6 text-sm text-white/60">
            <p>
              This document is operational, not legal advice. Have qualified
              counsel review it before you rely on it as your final published
              terms, especially if you begin selling packaged services online
              or engaging with jurisdictions outside Australia.
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
