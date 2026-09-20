import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { FOOTER_CONTACT } from "@/constants/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Axenity collects, uses, stores, and shares personal information you provide through this website, and the choices available to you.",
  alternates: canonical("/privacy"),
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "16 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path="/privacy" />
      <article className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:py-28">
        <header className="mb-12 border-b border-foreground/10 pb-8">
          <p className="text-sm font-semibold text-primary">Legal</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-foreground/50">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="max-w-none space-y-10 text-base leading-7 text-foreground/75">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">1. Who we are</h2>
            <p>
              This site is operated by Axenity (&ldquo;Axenity&rdquo;,
              &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), a digital
              agency based in {FOOTER_CONTACT.location}. You can reach us at{" "}
              <a
                className="font-medium text-primary underline-offset-4 hover:underline"
                href={`mailto:${FOOTER_CONTACT.email}`}
              >
                {FOOTER_CONTACT.email}
              </a>
              . This policy explains what personal information we collect when
              you interact with this website, how we use it, and the choices
              available to you.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              2. Information we collect
            </h2>
            <p>We only collect information we need to run the site and reply to enquiries:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-primary">
              <li>
                <strong className="font-semibold text-foreground">Contact form and chat submissions:</strong>{" "}
                your name, email address, company (optional), phone number
                (chat only, optional), project type or interest, and message
                body.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Technical information:</strong>{" "}
                your IP address (for anti-abuse rate limiting), browser type,
                referring URL, and timestamps. We do not store this
                information beyond what is needed for security and
                diagnostics.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Analytics:</strong>{" "}
                anonymised, aggregated visit data collected by Vercel
                Analytics. This does not use cookies and does not track
                individuals across sites.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Bot protection:</strong>{" "}
                the contact form uses Cloudflare Turnstile, which may inspect
                signals from your browser to distinguish humans from bots.
                See Cloudflare&rsquo;s privacy policy for details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              3. How we use your information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-primary">
              <li>To respond to your enquiry or chat message.</li>
              <li>
                To send you a confirmation of your submission and any follow-up
                communications you have asked for.
              </li>
              <li>
                To operate and secure the website (rate limiting, spam
                filtering).
              </li>
              <li>
                To understand aggregate usage patterns and improve the site.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information, and we do not use it for
              targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              4. Third-party processors
            </h2>
            <p>The site relies on the following processors:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-primary">
              <li>
                <strong className="font-semibold text-foreground">Vercel</strong>{" "}
                (hosting, edge network, analytics) &mdash; servers in the
                Singapore region.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Resend</strong>{" "}
                (transactional email delivery) &mdash; receives the content of
                your contact-form and chat messages so we can email them to our
                internal inbox and send you a confirmation.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Cloudflare Turnstile</strong>{" "}
                (bot protection).
              </li>
              <li>
                <strong className="font-semibold text-foreground">Upstash Redis</strong>{" "}
                (rate-limit state) &mdash; stores hashed IP-derived identifiers
                for short windows only.
              </li>
            </ul>
            <p className="mt-4">
              We select processors that offer suitable privacy protections and
              use them only for the purposes described above.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              5. Data retention
            </h2>
            <p>
              We keep contact form and chat submissions for as long as needed
              to serve the enquiry and for reasonable follow-up thereafter.
              Rate-limit records expire automatically after one hour. Vercel
              Analytics aggregates are retained according to Vercel&rsquo;s
              retention policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">6. Your rights</h2>
            <p>You can ask us at any time to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-primary">
              <li>Access the personal information we hold about you.</li>
              <li>Correct information that is inaccurate or out of date.</li>
              <li>
                Delete your information, subject to legitimate retention
                obligations.
              </li>
              <li>Opt out of any future communications.</li>
            </ul>
            <p className="mt-4">
              Send requests to{" "}
              <a
                className="font-medium text-primary underline-offset-4 hover:underline"
                href={`mailto:${FOOTER_CONTACT.email}`}
              >
                {FOOTER_CONTACT.email}
              </a>
              . We aim to respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">7. Cookies</h2>
            <p>
              This site uses only strictly necessary cookies for its own
              functionality. Third-party services (Cloudflare Turnstile) may
              set their own cookies while active on the contact page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">
              8. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time to reflect changes in
              our practices or legal obligations. The &ldquo;Last updated&rdquo;
              date at the top of this page is authoritative.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">9. Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a
                className="font-medium text-primary underline-offset-4 hover:underline"
                href={`mailto:${FOOTER_CONTACT.email}`}
              >
                {FOOTER_CONTACT.email}
              </a>
              .
            </p>
          </section>

        </div>
      </article>
      <Footer />
    </main>
  );
}
