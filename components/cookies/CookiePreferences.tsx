"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */
interface CookieCategory {
  id: string;
  title: string;
  description: string;
  alwaysActive?: boolean;
  enabled: boolean;
  cookies: CookieEntry[];
}

interface CookieEntry {
  name: string;
  duration: string;
  description: string;
}

/* ────────────────────────────────────────────
   Cookie Data
   ──────────────────────────────────────────── */
const DEFAULT_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    title: "Necessary",
    description:
      "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
    alwaysActive: true,
    enabled: true,
    cookies: [
      {
        name: "cookieyes-consent",
        duration: "1 year",
        description:
          "CookieYes sets this cookie to remember users' consent preferences so that their preferences are respected on subsequent visits to this site.",
      },
      {
        name: "cookieyes-necessary",
        duration: "1 year",
        description:
          "CookieYes sets this cookie to remember the consent of users for the use of cookies in the 'Necessary' category.",
      },
      {
        name: "__cf_bm",
        duration: "30 minutes",
        description:
          "Cloudflare sets this cookie to support Cloudflare Bot Management, identifying and mitigating automated traffic to protect your site from bad bots.",
      },
    ],
  },
  {
    id: "functional",
    title: "Functional",
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
    alwaysActive: false,
    enabled: false,
    cookies: [
      {
        name: "__lc_cid",
        duration: "Session",
        description:
          "This cookie is used for live chat functionality and to maintain a session between the visitor and a customer service agent.",
      },
      {
        name: "__lc_cst",
        duration: "Session",
        description:
          "This cookie is used to store information about user session settings for the live chat widget.",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
    alwaysActive: false,
    enabled: false,
    cookies: [
      {
        name: "_ga",
        duration: "2 years",
        description:
          "Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site's analytics report.",
      },
      {
        name: "_ga_*",
        duration: "1 year 1 month 4 days",
        description:
          "Google Analytics sets this cookie to store and count page views.",
      },
      {
        name: "_gid",
        duration: "1 day",
        description:
          "Google Analytics sets this cookie to store information on how visitors use a website while also creating an analytics report of the website's performance.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    description:
      "Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
    alwaysActive: false,
    enabled: false,
    cookies: [
      {
        name: "_gat_UA-*",
        duration: "1 minute",
        description:
          "Google Analytics sets this cookie for user behaviour tracking.",
      },
      {
        name: "SL_C_*",
        duration: "1 year",
        description:
          "Smartlook sets this cookie to allow the web analytics service to uniquely identify a visitor and track their site interactions.",
      },
    ],
  },
  {
    id: "advertisement",
    title: "Advertisement",
    description:
      "Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.",
    alwaysActive: false,
    enabled: false,
    cookies: [
      {
        name: "_gcl_au",
        duration: "3 months",
        description:
          "Google Tag Manager sets the cookie to experiment advertisement efficiency of websites using their services.",
      },
      {
        name: "test_cookie",
        duration: "15 minutes",
        description:
          "doubleclick.net sets this cookie to determine if the user's browser supports cookies.",
      },
      {
        name: "IDE",
        duration: "1 year 24 days",
        description:
          "Google DoubleClick IDE cookies store information about how the user uses the website to present them with relevant ads according to the user profile.",
      },
    ],
  },
];

const STORAGE_KEY = "cookie_preferences_accepted";
const PREFS_KEY = "cookie_preferences_data";

/* ────────────────────────────────────────────
   Chevron Icon
   ──────────────────────────────────────────── */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────
   Toggle Switch
   ──────────────────────────────────────────── */
function ToggleSwitch({
  enabled,
  onChange,
  disabled,
  id,
}: {
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Enabled" : "Disabled"}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onChange();
      }}
      disabled={disabled}
      className={`
        relative inline-flex h-[26px] w-[48px] shrink-0 cursor-pointer
        items-center rounded-full transition-colors duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50
        focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF7]
        ${disabled ? "cursor-default opacity-60" : ""}
        ${enabled ? "bg-primary-500" : "bg-gray-300"}
      `}
      style={
        enabled
          ? {
              boxShadow: "0 0 12px rgba(90, 187, 74, 0.3)",
            }
          : {}
      }
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          pointer-events-none inline-block h-[20px] w-[20px] rounded-full
          bg-white shadow-md
        `}
        style={{
          marginLeft: enabled ? "24px" : "4px",
        }}
      />
    </button>
  );
}

/* ────────────────────────────────────────────
   Accordion Item
   ──────────────────────────────────────────── */
function AccordionItem({
  category,
  isOpen,
  onToggleOpen,
  onToggleEnabled,
}: {
  category: CookieCategory;
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleEnabled: () => void;
}) {
  return (
    <div
      className="group overflow-hidden rounded-2xl border border-black/[0.04] bg-white/80
        transition-all duration-300 hover:border-black/[0.08] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      {/* Header */}
      <div
        className="flex w-full items-center justify-between pr-5
          transition-colors duration-200"
      >
        <button
          onClick={onToggleOpen}
          aria-expanded={isOpen}
          aria-controls={`accordion-body-${category.id}`}
          className="flex flex-1 items-center gap-3 py-4 pl-5 text-left focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-inset"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex h-6 w-6 items-center justify-center text-gray-400"
          >
            <ChevronIcon />
          </motion.div>
          <div>
            <span className="text-sm font-semibold tracking-tight text-gray-900">
              {category.title}
            </span>
          </div>
        </button>

        <div className="flex items-center pl-4 py-4">
          {category.alwaysActive ? (
            <span className="text-xs font-semibold tracking-wide text-primary-500">
              Always Active
            </span>
          ) : (
            <ToggleSwitch
              id={`toggle-${category.id}`}
              enabled={category.enabled}
              onChange={onToggleEnabled}
            />
          )}
        </div>
      </div>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-body-${category.id}`}
            role="region"
            aria-labelledby={`accordion-header-${category.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              {/* Description */}
              <p className="mb-4 text-[13px] leading-relaxed text-gray-500">
                {category.description}
              </p>

              {/* Cookie Table */}
              {category.cookies.length > 0 && (
                <div className="overflow-hidden rounded-xl bg-[#F5F5F0]/80 ring-1 ring-black/[0.03]">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.2fr_0.7fr_2fr] gap-3 border-b border-black/[0.04] px-4 py-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Cookie
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Duration
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Description
                    </span>
                  </div>

                  {/* Table Rows */}
                  {category.cookies.map((cookie, idx) => (
                    <div
                      key={cookie.name}
                      className={`grid grid-cols-[1.2fr_0.7fr_2fr] gap-3 px-4 py-3 ${
                        idx < category.cookies.length - 1
                          ? "border-b border-black/[0.03]"
                          : ""
                      }`}
                    >
                      <span className="break-all text-[12px] font-medium text-gray-700">
                        {cookie.name}
                      </span>
                      <span className="text-[12px] text-gray-500">
                        {cookie.duration}
                      </span>
                      <span className="text-[12px] leading-relaxed text-gray-500">
                        {cookie.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────── */
export default function CookiePreferences() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
  const [categories, setCategories] =
    useState<CookieCategory[]>(DEFAULT_CATEGORIES);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  /* ── Load from localStorage ── */
  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    const savedPrefs = localStorage.getItem(PREFS_KEY);

    if (accepted === "true") {
      setHasAccepted(true);
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs) as Record<string, boolean>;
          setCategories((prev) =>
            prev.map((cat) => ({
              ...cat,
              enabled: cat.alwaysActive
                ? true
                : parsed[cat.id] ?? cat.enabled,
            })),
          );
        } catch {
          /* ignore parse errors */
        }
      }
    } else {
      setHasAccepted(false);
      // Auto-open modal after 1 second on first visit
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  /* ── ESC to close ── */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  /* ── Lock body scroll when modal is open ── */
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  /* ── Save preferences ── */
  const savePreferences = useCallback(() => {
    const prefs: Record<string, boolean> = {};
    categories.forEach((cat) => {
      prefs[cat.id] = cat.alwaysActive ? true : cat.enabled;
    });
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    localStorage.setItem(STORAGE_KEY, "true");
    setHasAccepted(true);
    setIsModalOpen(false);
  }, [categories]);

  /* ── Accept all ── */
  const acceptAll = useCallback(() => {
    const updated = categories.map((cat) => ({ ...cat, enabled: true }));
    setCategories(updated);
    const prefs: Record<string, boolean> = {};
    updated.forEach((cat) => {
      prefs[cat.id] = true;
    });
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    localStorage.setItem(STORAGE_KEY, "true");
    setHasAccepted(true);
    setIsModalOpen(false);
  }, [categories]);

  /* ── Toggle accordion ── */
  const toggleAccordion = useCallback((id: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /* ── Toggle category ── */
  const toggleCategory = useCallback((id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, enabled: !cat.enabled } : cat,
      ),
    );
  }, []);

  /* ── Don't render anything server-side ── */
  if (hasAccepted === null) return null;

  return (
    <>
      {/* ─── FLOATING REVISIT BUTTON ─── */}
      <motion.button
        id="cookie-revisit-button"
        aria-label="Cookie Preferences"
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[9998] flex h-14 w-14 items-center justify-center
          rounded-full bg-primary-500 shadow-[0_4px_20px_rgba(90,187,74,0.35)]
          transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(90,187,74,0.5)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
          focus-visible:ring-offset-2 max-md:bottom-4 max-md:left-4 max-md:h-12 max-md:w-12"
      >
        <Image
          src="/images/cookies/revisit.svg"
          alt="Cookie preferences"
          width={28}
          height={28}
          className="max-md:h-6 max-md:w-6"
        />
      </motion.button>

      {/* ─── MODAL ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="cookie-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Centering Wrapper */}
            <div className="fixed inset-0 z-[10000] flex items-end justify-center md:pb-8">
              <motion.div
                ref={modalRef}
                id="cookie-preferences-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Cookie Preferences"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-hidden
                  rounded-t-3xl border border-black/[0.05] bg-[#FAFAF7]
                  shadow-[0_-8px_60px_rgba(0,0,0,0.12),0_-2px_20px_rgba(0,0,0,0.06)]
                  md:rounded-3xl
                  max-md:max-h-[90vh] max-md:max-w-[calc(100vw-24px)]"
              >
                {/* ── Header ── */}
                <div className="flex shrink-0 items-center justify-between border-b border-black/[0.04] px-6 py-5 md:px-8">
                  <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
                    Customise Consent Preferences
                  </h2>
                  <button
                    id="cookie-modal-close"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close cookie preferences"
                    className="flex h-9 w-9 items-center justify-center rounded-full
                      transition-all duration-200 hover:bg-black/[0.05]
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-primary-500/30"
                  >
                    <Image
                      src="/images/cookies/close.svg"
                      alt="Close"
                      width={12}
                      height={12}
                    />
                  </button>
                </div>

                {/* ── Scrollable Body ── */}
                <div
                  className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 md:px-8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0,0,0,0.12) transparent",
                  }}
                >
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-sm leading-relaxed text-gray-600">
                      We use cookies to enhance your browsing experience, serve
                      personalised ads or content, and analyse our traffic. By
                      clicking &quot;Accept All&quot;, you consent to our use of
                      cookies.
                      {showMoreDescription && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {" "}
                          Cookies are small text files that are placed on your
                          device when you visit a website. They are widely used to
                          make websites work more efficiently, as well as to
                          provide reporting information to website owners. Cookies
                          set by the website owner are called &quot;first party
                          cookies&quot;. Cookies set by parties other than the
                          website owner are called &quot;third party
                          cookies&quot;. Third party cookies enable third party
                          features or functionality to be provided on or through
                          the website, such as advertising, interactive content
                          and analytics.
                        </motion.span>
                      )}
                    </p>
                    <button
                      onClick={() => setShowMoreDescription(!showMoreDescription)}
                      className="mt-2 text-sm font-medium text-primary-600 transition-colors
                        duration-200 hover:text-primary-700 focus-visible:outline-none
                        focus-visible:underline"
                    >
                      {showMoreDescription ? "Show less" : "Show more"}
                    </button>
                  </div>

                  {/* Accordion Categories */}
                  <div className="flex flex-col gap-3">
                    {categories.map((category) => (
                      <AccordionItem
                        key={category.id}
                        category={category}
                        isOpen={openAccordions.has(category.id)}
                        onToggleOpen={() => toggleAccordion(category.id)}
                        onToggleEnabled={() => toggleCategory(category.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* ── Footer ── */}
                <div
                  className="flex shrink-0 items-center justify-end gap-3 border-t border-black/[0.04]
                    bg-[#F5F5F0] px-6 py-4 md:px-8"
                >
                  <button
                    id="cookie-save-preferences"
                    onClick={savePreferences}
                    className="rounded-xl border-2 border-primary-500 bg-white px-5 py-2.5
                      text-sm font-semibold text-primary-600 transition-all duration-300
                      hover:bg-primary-50 hover:shadow-[0_2px_12px_rgba(90,187,74,0.15)]
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-primary-500/30 focus-visible:ring-offset-2
                      active:scale-[0.98]"
                  >
                    Save My Preferences
                  </button>
                  <button
                    id="cookie-accept-all"
                    onClick={acceptAll}
                    className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold
                      text-white shadow-[0_2px_12px_rgba(90,187,74,0.3)]
                      transition-all duration-300 hover:bg-primary-400
                      hover:shadow-[0_4px_20px_rgba(90,187,74,0.45)]
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-primary-500/50 focus-visible:ring-offset-2
                      active:scale-[0.98]"
                  >
                    Accept All
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
