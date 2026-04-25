"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, type NavLink } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
          onClick={() => setMobileOpen(false)}
        >
          Omar<span className="text-primary">Tech</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.label} link={link} />
            ) : (
              <DesktopLink key={link.label} link={link} />
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <CtaButton href="/contact">Let&apos;s Talk</CtaButton>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((p) => !p)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-background-alt lg:hidden"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
}

/* ---------------------------------- Desktop --------------------------------- */

function DesktopLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="group relative px-4 py-2 text-sm font-medium text-foreground"
    >
      {link.label}
      <UnderlineFx />
    </Link>
  );
}

function DesktopDropdown({ link }: { link: NavLink }) {
  return (
    <div className="group relative">
      <Link
        href={link.href}
        className="relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground"
      >
        {link.label}
        <ChevronIcon className="transition-transform duration-200 group-hover:rotate-180" />
        <UnderlineFx />
      </Link>

      <div
        className={cn(
          "invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-1 pt-3 opacity-0",
          "transition-all duration-200 ease-out",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-2 shadow-[0_8px_24px_rgba(17,24,39,0.06)]">
          {link.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-background-alt hover:text-primary"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function UnderlineFx() {
  // Enter: origin-left → grows L→R. Leave: origin-right → collapses L→R.
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-1 left-4 right-4 h-[2px] origin-right scale-x-0 bg-primary",
        "transition-transform duration-300 ease-out",
        "group-hover:origin-left group-hover:scale-x-100",
      )}
    />
  );
}

/* ----------------------------------- CTA ------------------------------------ */

function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/cta relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "border border-primary bg-white px-5 py-2 text-sm font-semibold text-foreground",
        "transition-colors duration-300 hover:text-white",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left scale-x-0 bg-primary",
          "transition-transform duration-300 ease-out",
          "group-hover/cta:scale-x-100",
        )}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

/* --------------------------------- Mobile ----------------------------------- */

function MobileMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "lg:hidden",
        "grid overflow-hidden border-b border-[#E5E7EB] bg-background transition-[grid-template-rows] duration-300 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0">
        <nav className="container mx-auto flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <MobileAccordion key={link.label} link={link} onNavigate={onNavigate} />
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={onNavigate}
                className="rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-background-alt hover:text-primary"
              >
                {link.label}
              </Link>
            ),
          )}

          <div className="mt-3">
            <CtaButton href="/contact">Let&apos;s Talk</CtaButton>
          </div>
        </nav>
      </div>
    </div>
  );
}

function MobileAccordion({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-background-alt"
      >
        <span>{link.label}</span>
        <ChevronIcon
          className={cn("transition-transform duration-200", expanded && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <div className="ml-3 mt-1 flex flex-col border-l border-[#E5E7EB] pl-3">
            {link.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-background-alt hover:text-primary"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Icons ----------------------------------- */

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 8l4 4 4-4" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <span
        className={cn(
          "absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300",
          open && "translate-y-[7px] rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300",
          open && "-translate-y-[7px] -rotate-45",
        )}
      />
    </div>
  );
}
