"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { HERO_SLIDES, type HeroSlide } from "@/constants/hero";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate w-full overflow-hidden bg-background"
    >
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop
        speed={900}
        autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{
          clickable: true,
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        className="hero-swiper"
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.title} className="hero-slide">
            <Slide slide={slide} priority={i === 0} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper,
        .hero-swiper .swiper-wrapper {
          width: 100%;
        }
        .hero-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hero-swiper .swiper-pagination {
          position: absolute;
          bottom: 1.5rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          z-index: 20;
        }
        .hero-bullet {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: rgba(17, 24, 39, 0.25);
          cursor: pointer;
          transition: width 300ms ease, background-color 300ms ease;
        }
        .hero-bullet-active {
          width: 28px;
          background: #5abb4a;
        }
        @media (max-width: 1023px) {
          .hero-bullet {
            background: rgba(255, 255, 255, 0.55);
          }
          .hero-bullet-active {
            background: #ffffff;
          }
        }

        /* Animations driven by Swiper's active class so loop clones animate too. */
        .hero-slide .hero-content > * {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 700ms ease-out,
            transform 700ms ease-out;
        }
        .hero-slide .hero-image {
          transform: scale(1);
          transition: transform 7000ms ease-out;
        }
        .swiper-slide-active .hero-content > * {
          opacity: 1;
          transform: translateY(0);
        }
        .swiper-slide-active .hero-content > *:nth-child(1) {
          transition-delay: 120ms;
        }
        .swiper-slide-active .hero-content > *:nth-child(2) {
          transition-delay: 220ms;
        }
        .swiper-slide-active .hero-content > *:nth-child(3) {
          transition-delay: 320ms;
        }
        .swiper-slide-active .hero-content > *:nth-child(4) {
          transition-delay: 420ms;
        }
        .swiper-slide-active .hero-image {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}

function Slide({ slide, priority }: { slide: HeroSlide; priority?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background image — flows across the full slide on every breakpoint.
          Subject anchored right on desktop; full cover on mobile. */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="hero-image object-cover object-center lg:object-right"
        />

        {/* Mobile readability wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/55 to-[#5ABB4A]/55 lg:hidden" />

        {/* Desktop: long, soft white fade — no hard seam, image dissolves into background */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.98) 22%, rgba(255,255,255,0.85) 38%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.10) 72%, rgba(255,255,255,0) 90%)",
          }}
        />

        {/* Desktop: subtle brand wash that also flows across, biased to the image side */}
        <div
          aria-hidden
          className="absolute inset-0 hidden mix-blend-multiply lg:block"
          style={{
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 45%, rgba(90,187,74,0.10) 70%, rgba(90,187,74,0.22) 100%)",
          }}
        />
      </div>

      {/* Content overlays the image; constrained to the left half on desktop */}
      <div className="relative z-10 flex min-h-[600px] items-center px-6 py-20 sm:px-10 lg:min-h-[640px] lg:px-16 xl:px-24">
        <div className="hero-content max-w-xl lg:max-w-[44%] xl:max-w-[40%]">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white lg:text-primary">
            <span className="h-px w-8 bg-current" />
            {slide.eyebrow}
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl lg:text-foreground">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg lg:text-foreground/70">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3",
                "text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(90,187,74,0.55)]",
                "transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-[0_12px_28px_-8px_rgba(90,187,74,0.65)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              Start a Project
              <ArrowIcon className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white lg:text-foreground"
            >
              View Our Work
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10h12" />
      <path d="M11 5l5 5-5 5" />
    </svg>
  );
}
