"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUPS = [
  {
    heading: "Data & storage",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis / Upstash",
      "Amazon S3 / R2",
      "Elasticsearch",
    ],
  },
  {
    heading: "Auth & identity",
    items: [
      "Auth0",
      "Clerk",
      "NextAuth / Auth.js",
      "Firebase Auth",
      "SAML / SSO",
      "OAuth 2.0 · JWT",
    ],
  },
  {
    heading: "Payments & billing",
    items: [
      "Stripe",
      "PayPal",
      "Paddle",
      "Square",
      "Xero API",
      "QuickBooks",
    ],
  },
  {
    heading: "Messaging & queues",
    items: [
      "RabbitMQ",
      "Kafka",
      "AWS SQS / SNS",
      "Google Pub/Sub",
      "Twilio",
      "Resend",
    ],
  },
  {
    heading: "Observability",
    items: [
      "Sentry",
      "Datadog",
      "Grafana + Prometheus",
      "OpenTelemetry",
      "PagerDuty",
      "Better Stack",
    ],
  },
  {
    heading: "AI & search",
    items: [
      "OpenAI · Anthropic",
      "Cohere",
      "Pinecone",
      "Weaviate",
      "Algolia",
      "Meilisearch",
    ],
  },
];

export function IntegrationsSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary">Integrations</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Wired into the tools you already run on
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
            Backends rarely stand alone. We integrate with the databases,
            payment processors, auth providers, message queues, and
            observability tooling your team already trusts — and pick the
            right one when you&apos;re starting fresh.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: EASE, delay: gi * 0.05 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">
                {g.heading}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/80">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
