import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { canonical } from "@/lib/seo";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/constants/portfolio";
import { SITE_CONFIG } from "@/constants/site";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.productName} — Case Study`,
    description: project.shortDescription,
    alternates: canonical(`/portfolio/${slug}`),
  };
}

/**
 * Emits a CreativeWork node identifying this case study, plus a nested
 * Service node linking to the primary capability from the site-wide
 * Organization graph in app/layout.tsx.
 */
function projectSchema(project: PortfolioProject) {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const url = `${base}/portfolio/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    name: project.productName,
    headline: project.shortDescription,
    description: project.longDescription,
    creator: { "@id": `${base}/#organization` },
    dateCreated: project.year,
    inLanguage: "en-AU",
    keywords: project.categories.join(", "),
    about: {
      "@type": "Service",
      name: project.categories[0],
      provider: { "@id": `${base}/#organization` },
      areaServed: { "@type": "Country", name: "Australia" },
    },
    image: `${base}${project.screenshot.src}`,
    url,
  };
}

export default async function PortfolioDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const isMobile = project.screenshot.orientation === "mobile";
  const otherProjects = PORTFOLIO_PROJECTS.filter(
    (p) => p.slug !== project.slug,
  ).slice(0, 3);

  return (
    <main className="bg-background text-foreground">
      <Breadcrumb path={`/portfolio/${slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema(project)) }}
      />

      {/* Hero */}
      <section className="border-b border-foreground/[0.06] bg-background-alt py-16 sm:py-20">
        <div className="container px-6">
          <Link
            href="/portfolio"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All work
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            {/* Copy column */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold uppercase tracking-[0.14em] text-primary">
                  {project.categories[0]}
                </span>
                <span aria-hidden className="text-foreground/25">·</span>
                <span className="text-foreground/60">{project.industry}</span>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {project.productName}
              </h1>

              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground/50">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {project.location} · {project.year}
              </p>

              <p className="mt-6 text-base leading-8 text-foreground/75 sm:text-lg">
                {project.longDescription}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs font-medium text-foreground/70"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image column */}
            <div
              className={
                "relative " +
                (isMobile ? "mx-auto w-full max-w-[340px]" : "w-full")
              }
            >
              <DeviceFrame variant={isMobile ? "mobile" : "desktop"}>
                <Image
                  src={project.screenshot.src}
                  alt={project.screenshot.alt}
                  width={isMobile ? 750 : 1440}
                  height={isMobile ? 1624 : 900}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </DeviceFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Features + tech */}
      <section className="bg-background py-20 sm:py-24">
        <div className="container px-6">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="text-sm font-semibold text-primary">What we built</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Features that shipped
              </h2>
              <ul className="mt-8 space-y-4">
                {project.keyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <p className="text-base leading-7 text-foreground/75">{f}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-2xl border border-foreground/10 bg-background-alt p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/60">
                Stack
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center rounded-full border border-foreground/15 bg-background px-3 py-1 text-xs font-medium text-foreground/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/60">
                Type
              </h3>
              <p className="mt-2 text-sm text-foreground/75">
                {project.serviceType}
              </p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/60">
                Industry
              </h3>
              <p className="mt-2 text-sm text-foreground/75">{project.industry}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* Other work */}
      <section className="border-t border-foreground/[0.06] bg-background-alt py-20 sm:py-24">
        <div className="container px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-primary">More work</span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Explore other builds
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline-flex"
              >
                All projects
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background transition-shadow duration-300 hover:shadow-[0_20px_50px_-40px_rgba(15,23,42,0.35)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-alt">
                    <Image
                      src={p.screenshot.src}
                      alt={p.screenshot.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {p.categories[0]}
                    </div>
                    <p className="mt-2 text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
                      {p.productName}
                    </p>
                    <p className="mt-1 text-xs text-foreground/50">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DeviceFrame({
  variant,
  children,
}: {
  variant: "desktop" | "mobile";
  children: React.ReactNode;
}) {
  if (variant === "mobile") {
    return (
      <div className="relative rounded-[42px] border border-foreground/15 bg-foreground p-2 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5)]">
        <div className="overflow-hidden rounded-[34px] bg-foreground">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden />
      </div>
      {children}
    </div>
  );
}
