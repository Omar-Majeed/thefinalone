import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { AUTHORS, BLOG_POSTS } from "@/constants/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering, product, and hiring decisions behind the products Axenity has shipped. Case-study writeups, architecture posts, and opinionated technical notes.",
  alternates: canonical("/blog"),
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );

  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path="/blog" />

      {/* Hero */}
      <section className="border-b border-foreground/[0.06] bg-background-alt py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Notes
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Engineering, product, and the decisions behind the builds
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
            Honest walkthroughs of the systems we&apos;ve shipped —
            architecture, cost, the almost-failures, and what we&apos;d do
            differently next time.
          </p>
        </div>
      </section>

      {/* Post list */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <ul className="divide-y divide-foreground/10">
            {posts.map((post) => {
              const author = AUTHORS[post.authorId];
              return (
                <li key={post.slug} className="py-10 first:pt-0 last:pb-0">
                  <article>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 text-foreground/50">
                        <Calendar className="h-3 w-3" aria-hidden />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-foreground/50">
                        <Clock className="h-3 w-3" aria-hidden />
                        {post.readTimeMinutes} min read
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-base leading-7 text-foreground/70">
                      {post.description}
                    </p>

                    <p className="mt-4 text-sm text-foreground/50">
                      by{" "}
                      <span className="font-medium text-foreground/70">
                        {author.name}
                      </span>{" "}
                      · {author.role}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
