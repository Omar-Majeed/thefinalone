import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { AUTHORS, BLOG_POSTS, type BlogPostMeta } from "@/constants/blog";
import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";
import { SITE_CONFIG } from "@/constants/site";

import AiBookingAgentTyreShop from "@/components/blog/posts/ai-booking-agent-tyre-shop";
import PwaVsNativeAppForRestaurants from "@/components/blog/posts/pwa-vs-native-app-for-restaurants";

interface Params {
  params: Promise<{ slug: string }>;
}

const POST_COMPONENTS: Record<string, () => React.ReactElement> = {
  "ai-booking-agent-tyre-shop": AiBookingAgentTyreShop,
  "pwa-vs-native-app-for-restaurants": PwaVsNativeAppForRestaurants,
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  const author = AUTHORS[post.authorId];
  return {
    title: post.title,
    description: post.description,
    alternates: canonical(`/blog/${slug}`),
    authors: [{ name: author.name }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate ?? post.publishedDate,
      authors: [author.name],
      tags: post.tags,
    },
  };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function articleSchema(post: BlogPostMeta) {
  const author = AUTHORS[post.authorId];
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const url = `${base}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    inLanguage: "en-AU",
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      worksFor: { "@id": `${base}/#organization` },
    },
    publisher: { "@id": `${base}/#organization` },
    mainEntityOfPage: url,
    url,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const Body = POST_COMPONENTS[post.slug];
  if (!Body) notFound();

  const author = AUTHORS[post.authorId];
  const relatedProject = post.relatedProjectSlug
    ? PORTFOLIO_PROJECTS.find((p) => p.slug === post.relatedProjectSlug)
    : undefined;

  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path={`/blog/${slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />

      {/* Hero */}
      <section className="border-b border-foreground/[0.06] bg-background-alt py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All posts
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
            {post.title}
          </h1>

          <p className="mt-5 text-base leading-7 text-foreground/70 sm:text-lg">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-foreground/10 pt-6 text-sm">
            <div>
              <p className="font-semibold text-foreground">{author.name}</p>
              <p className="text-foreground/60">{author.role}</p>
            </div>
            <span aria-hidden className="text-foreground/25">·</span>
            <span className="inline-flex items-center gap-1.5 text-foreground/60">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatDate(post.publishedDate)}
            </span>
            <span aria-hidden className="text-foreground/25">·</span>
            <span className="inline-flex items-center gap-1.5 text-foreground/60">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Body />
        </div>
      </article>

      {/* Related project + related service */}
      {(relatedProject || post.relatedServicePath) && (
        <section className="border-t border-foreground/[0.06] bg-background-alt py-14">
          <div className="mx-auto grid max-w-3xl gap-4 px-6 sm:grid-cols-2">
            {relatedProject && (
              <Link
                href={`/portfolio/${relatedProject.slug}`}
                className="group flex flex-col rounded-2xl border border-foreground/10 bg-background p-6 transition-shadow hover:shadow-[0_20px_50px_-40px_rgba(15,23,42,0.35)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  The case study
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                  {relatedProject.productName}
                </p>
                <p className="mt-1 text-sm text-foreground/60">
                  {relatedProject.location} · {relatedProject.industry}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  View project
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            )}
            {post.relatedServicePath && (
              <Link
                href={post.relatedServicePath}
                className="group flex flex-col rounded-2xl border border-foreground/10 bg-background p-6 transition-shadow hover:shadow-[0_20px_50px_-40px_rgba(15,23,42,0.35)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Working on this?
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
                  Related service
                </p>
                <p className="mt-1 text-sm text-foreground/60">
                  How we help teams ship this kind of work.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Explore
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
