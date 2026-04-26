"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import {
  FOOTER_CONTACT,
  FOOTER_COPY,
  FOOTER_LEGAL,
  FOOTER_NAV,
  FOOTER_SERVICES,
  FOOTER_SOCIALS,
} from "@/constants/footer";

const EASE = [0.22, 1, 0.36, 1] as const;

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.79 1.07.79 2.16v3.21c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.86l-5.36-6.94L4.6 22H1.34l8.02-9.17L1 2h7.04l4.84 6.36L18.24 2zm-1.2 18h1.9L7.06 4H5.05l11.99 16z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
  X: XIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111827] text-[#9CA3AF]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="container mx-auto py-16 sm:py-20"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:max-w-xs">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF]">
              {FOOTER_COPY.tagline}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {FOOTER_SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label] ?? GithubIcon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#9CA3AF] transition-all duration-300 ease-out hover:scale-110 hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation */}
          <FooterColumn title="Navigation">
            {FOOTER_NAV.map((l) => (
              <FooterLinkItem key={l.href} href={l.href}>
                {l.label}
              </FooterLinkItem>
            ))}
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Services">
            {FOOTER_SERVICES.map((l) => (
              <FooterLinkItem key={l.href} href={l.href}>
                {l.label}
              </FooterLinkItem>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${FOOTER_CONTACT.email}`}
                className="group inline-flex items-start gap-2.5 text-sm text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-primary"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                <span>{FOOTER_CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${FOOTER_CONTACT.phone.replace(/\s|\(|\)|-/g, "")}`}
                className="group inline-flex items-start gap-2.5 text-sm text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-primary"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                <span>{FOOTER_CONTACT.phone}</span>
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5 text-sm text-[#9CA3AF]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
              <span>{FOOTER_CONTACT.location}</span>
            </li>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#9CA3AF] sm:mt-16 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="footer-underline relative text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <style>{`
        .footer-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1px;
          width: 100%;
          background-color: #5ABB4A;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease-out;
        }
        .footer-underline:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </footer>
  );
}

/* ---------------- Building blocks ---------------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="footer-underline relative text-sm text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}
