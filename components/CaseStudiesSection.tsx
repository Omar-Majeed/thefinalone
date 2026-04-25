import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CASE_STUDIES,
  CASE_STUDY_TILES,
  type CaseStudy,
  type CaseStudyTile,
} from "@/constants/case-studies";
import { cn } from "@/lib/utils";

export function CaseStudiesSection() {
  return (
    <section aria-label="Case studies" className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(260px,0.88fr)_minmax(380px,1.12fr)] lg:items-center lg:gap-6">
          <div className="max-w-lg self-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Case Studies
            </p>
            <h2 className="mt-3 text-[1.95rem] font-bold tracking-tight text-foreground sm:text-[2.35rem] lg:text-[2.8rem]">
              Client success stories
            </h2>
          </div>

          <div className="flex h-full max-w-xl flex-col items-start justify-center gap-5 lg:justify-self-start">
            <p className="max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
              Discover the transformative impact we have had on top global brands like yours as we craft groundbreaking digital journeys that redefine the future of customer experience. Explore our client success stories to see how we turn challenges into success stories.
            </p>
            <SlideButton href="/case-studies">All Case Studies</SlideButton>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:hidden">
          {CASE_STUDIES.map((study) => (
            <MobileCaseStudyBlock key={study.company} study={study} />
          ))}
        </div>

        <div className="mt-14 hidden overflow-hidden md:grid md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CASE_STUDY_TILES.map((tile, index) => (
            <CaseStudyTileCard
              key={`${tile.study.company}-${tile.type}-${index}`}
              tile={tile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCaseStudyBlock({ study }: { study: CaseStudy }) {
  return (
    <Link href={study.href} className="group block overflow-hidden">
      <div className="relative h-[260px] overflow-hidden sm:h-[300px]">
        <Image
          src={study.image}
          alt={study.imageAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/5 transition-colors duration-300 group-hover:bg-foreground/0" />
      </div>

      <div className="bg-primary p-6 text-white sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/90">
          {study.company}
        </p>
        <p className="mt-4 max-w-[20rem] text-base leading-relaxed text-white/88 sm:text-lg">
          {study.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function CaseStudyTileCard({ tile }: { tile: CaseStudyTile }) {
  const { study, type } = tile;

  return (
    <Link
      href={study.href}
      className={cn(
        "group relative block h-[280px] overflow-hidden md:h-[300px] lg:h-[320px]",
        type === "content" ? "bg-primary" : "bg-background-alt",
      )}
    >
      {type === "image" ? (
        <>
          <Image
            src={study.image}
            alt={study.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/5 transition-colors duration-300 group-hover:bg-foreground/0" />
        </>
      ) : (
        <div className="flex h-full flex-col justify-center p-6 text-white sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/90">
            {study.company}
          </p>
          <p className="mt-4 max-w-[18rem] text-base leading-relaxed text-white/88 sm:text-lg">
            {study.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
            View Case Study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      )}
    </Link>
  );
}

function SlideButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/case relative inline-block pb-[6px] pr-[6px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-[4px] border border-primary",
          "transition-transform duration-300 ease-out group-hover/case:translate-x-[3px] group-hover/case:translate-y-[3px]",
        )}
      />
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-[4px]",
          "border border-foreground bg-white px-5 py-2.5 text-sm font-semibold text-foreground",
          "transition-colors duration-300 group-hover/case:text-white",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 origin-left scale-x-0 bg-primary",
            "transition-transform duration-300 ease-out group-hover/case:scale-x-100",
          )}
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}