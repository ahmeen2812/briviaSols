"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { WORK_PAGE_CONTENT, Project } from "@/data/projects";
import { useIsomorphicLayoutEffect } from "@/components/shared/useIsomorphicLayoutEffect";
import { initWorkHeroAnimation } from "./animations/workAnimations";

export interface WorkHeroProps {
  readonly primaryProject: Project;
  readonly secondaryProject: Project;
}

export const WorkHero: React.FC<WorkHeroProps> = ({
  primaryProject,
  secondaryProject,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const exploreLinkRef = useRef<HTMLAnchorElement | null>(null);
  const primaryMaskRef = useRef<HTMLDivElement | null>(null);
  const primaryImgRef = useRef<HTMLDivElement | null>(null);
  const secondaryCardRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const validLines = headlineLineRefs.current.filter(
      (el): el is HTMLSpanElement => Boolean(el)
    );

    const ctx = initWorkHeroAnimation({
      section: sectionRef.current,
      eyebrow: eyebrowRef.current,
      headlineLines: validLines,
      description: descRef.current,
      exploreLink: exploreLinkRef.current,
      primaryMask: primaryMaskRef.current,
      primaryImg: primaryImgRef.current,
      secondaryCard: secondaryCardRef.current,
      caption: captionRef.current,
      scrollCue: scrollCueRef.current,
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const archiveEl = document.getElementById("work-archive");
    if (archiveEl) {
      archiveEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="work-hero"
      ref={sectionRef}
      aria-labelledby="work-hero-heading"
      className="relative w-full bg-[#F4F7FC] border-b border-[#DCE5F2] pt-2 pb-10 sm:pt-4 sm:pb-12 lg:pb-14 select-none overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center min-h-[54svh] lg:min-h-[60svh]">
          {/* LEFT COLUMN: Editorial Title, Description & Text Navigation Link */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 will-change-transform"
            >
              <span
                aria-hidden="true"
                className="h-[1.5px] w-5 bg-[#0A5FD7] inline-block"
              />
              <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A5FD7]">
                {WORK_PAGE_CONTENT.hero.eyebrow}
              </span>
            </div>

            <h1
              id="work-hero-heading"
              className="mt-4 sm:mt-5 font-sans text-[36px] sm:text-[46px] lg:text-[50px] xl:text-[56px] font-bold tracking-[-0.036em] leading-[1.06] text-[#06162C]"
            >
              <span className="block overflow-hidden pb-0.5">
                <span
                  ref={(el) => {
                    headlineLineRefs.current[0] = el;
                  }}
                  className="block will-change-transform"
                >
                  Where ideas become
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  ref={(el) => {
                    headlineLineRefs.current[1] = el;
                  }}
                  className="block text-[#0A5FD7] will-change-transform"
                >
                  working systems.
                </span>
              </span>
            </h1>

            <p
              ref={descRef}
              className="mt-4 sm:mt-5 font-sans text-[15px] sm:text-[16.5px] leading-[1.68] text-[#475569] max-w-[490px] font-normal will-change-transform"
            >
              {WORK_PAGE_CONTENT.hero.description}
            </p>

            <a
              ref={exploreLinkRef}
              href="#work-archive"
              onClick={handleExploreClick}
              className="group/explore mt-6 sm:mt-7 inline-flex items-center gap-2.5 font-sans text-[14px] sm:text-[14.5px] font-semibold text-[#06162C] hover:text-[#0A5FD7] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] rounded-xs will-change-transform"
            >
              <span className="border-b border-[#06162C]/30 group-hover/explore:border-[#0A5FD7] pb-0.5 transition-colors">
                {WORK_PAGE_CONTENT.hero.ctaLinkLabel}
              </span>
              <svg
                aria-hidden="true"
                className="h-4 w-4 text-[#0A5FD7] transition-transform duration-300 group-hover/explore:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m0 0l-5-5m5 5l5-5"
                />
              </svg>
            </a>
          </div>

          {/* RIGHT COLUMN: Composed Real Project Screenshot Preview (Zero Mockups / Orbiting Icons) */}
          <div className="lg:col-span-7 relative">
            <div className="relative pb-4 sm:pb-7 lg:pl-4">
              {/* Primary Showcase Frame */}
              <div
                ref={primaryMaskRef}
                className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-[#CEDBE9] bg-white shadow-[0_24px_60px_-24px_rgba(6,22,44,0.28)]"
              >
                <div ref={primaryImgRef} className="relative w-full h-full">
                  <Image
                    src={primaryProject.coverImage}
                    alt={primaryProject.coverAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Restrained Secondary Overlapping Preview Frame (Desktop & Tablet) */}
              <div
                ref={secondaryCardRef}
                className="hidden sm:block absolute -bottom-1 left-0 lg:-left-2 w-[42%] max-w-[300px] aspect-[16/9] overflow-hidden rounded-lg border border-[#CEDBE9] bg-white shadow-[0_18px_40px_-14px_rgba(6,22,44,0.28)] will-change-transform"
              >
                <Image
                  src={secondaryProject.coverImage}
                  alt={secondaryProject.coverAlt}
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Minimal Portfolio Preview Caption */}
            <div
              ref={captionRef}
              className="mt-2 sm:mt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-mono text-[#64748B] will-change-transform"
            >
              <span>
                {primaryProject.title} · {secondaryProject.title}
              </span>
              <span className="text-[#0A5FD7] font-medium">
                {primaryProject.year} Portfolio Archive
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Transition Cue Leading Into Archive */}
        <div
          ref={scrollCueRef}
          className="mt-6 sm:mt-8 pt-4 border-t border-[#DCE5F2]/80 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-[#64748B] will-change-transform"
        >
          <span>{WORK_PAGE_CONTENT.hero.scrollHint}</span>
          <a
            href="#work-archive"
            onClick={handleExploreClick}
            className="inline-flex items-center gap-1.5 text-[#06162C] hover:text-[#0A5FD7] transition-colors"
          >
            <span>Scroll to index</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
