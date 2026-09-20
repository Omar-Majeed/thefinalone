/**
 * Shared prose primitives for blog post bodies.
 *
 * Every post uses these components rather than raw JSX + Tailwind so the
 * typography stays consistent post-to-post. Kept minimal on purpose — add
 * one when the writing needs it, not before.
 */

import Link from "next/link";
import { AlertCircle, Info, Lightbulb, TriangleAlert } from "lucide-react";
import type React from "react";

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 pt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
    >
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 pt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-8 text-foreground/75 sm:text-[17px]">
      {children}
    </p>
  );
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export function Em({ children }: { children: React.ReactNode }) {
  return <em className="italic">{children}</em>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-1 list-disc space-y-2 pl-6 text-base leading-7 text-foreground/75 marker:text-primary sm:text-[17px]">
      {children}
    </ul>
  );
}

export function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="ml-1 list-decimal space-y-2 pl-6 text-base leading-7 text-foreground/75 marker:font-semibold marker:text-primary sm:text-[17px]">
      {children}
    </ol>
  );
}

export function Li({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground/85">
      {children}
    </code>
  );
}

export function Pre({ children, lang }: { children: string; lang?: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 text-sm leading-6 text-foreground/85">
      <code className={lang ? `language-${lang}` : undefined}>{children}</code>
    </pre>
  );
}

export function Blockquote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <blockquote className="border-l-4 border-primary/70 bg-primary/[0.03] px-5 py-4 text-base italic leading-7 text-foreground/80 sm:text-[17px]">
      {children}
      {attribution && (
        <footer className="mt-2 text-sm not-italic text-foreground/50">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

type CalloutTone = "info" | "warn" | "insight" | "danger";

const CALLOUT_STYLES: Record<
  CalloutTone,
  { border: string; bg: string; icon: React.ReactNode }
> = {
  info: {
    border: "border-blue-500/25",
    bg: "bg-blue-500/[0.04]",
    icon: <Info className="h-4 w-4 text-blue-600" aria-hidden />,
  },
  warn: {
    border: "border-amber-500/25",
    bg: "bg-amber-500/[0.05]",
    icon: <TriangleAlert className="h-4 w-4 text-amber-600" aria-hidden />,
  },
  insight: {
    border: "border-primary/30",
    bg: "bg-primary/[0.04]",
    icon: <Lightbulb className="h-4 w-4 text-primary" aria-hidden />,
  },
  danger: {
    border: "border-red-500/25",
    bg: "bg-red-500/[0.04]",
    icon: <AlertCircle className="h-4 w-4 text-red-600" aria-hidden />,
  },
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
}) {
  const style = CALLOUT_STYLES[tone];
  return (
    <aside
      className={`flex gap-3 rounded-2xl border ${style.border} ${style.bg} p-4 text-[15px] leading-7 text-foreground/80`}
    >
      <span className="mt-1 shrink-0">{style.icon}</span>
      <div className="flex-1">
        {title && (
          <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
        )}
        <div className="[&>p]:m-0 [&>p]:text-inherit [&>p]:leading-inherit">
          {children}
        </div>
      </div>
    </aside>
  );
}

/** Wraps a whole post body — spaces every direct child vertically. */
export function ProseBody({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
