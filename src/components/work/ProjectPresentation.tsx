"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, WORK_PAGE_CONTENT } from "@/data/projects";
import { useIsomorphicLayoutEffect } from "@/components/shared/useIsomorphicLayoutEffect";
import { animateProjectSwitchIn } from "./animations/workAnimations";

export interface ProjectPresentationProps {
  readonly project: Project;
  readonly projectIndex: number;
  readonly totalInView: number;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
  readonly registerEntranceRefs?: (refs: {
    mediaFrame: HTMLElement | null;
    details: HTMLElement | null;
  }) => void;
}

export const ProjectPresentation: React.FC<ProjectPresentationProps> = ({
  project,
  projectIndex,
  totalInView,
  onPrevious,
  onNext,
  registerEntranceRefs,
}) => {
  const isFirstMountRef = useRef(true);
  const headerBadgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const mediaFrameRef = useRef<HTMLDivElement | null>(null);
  const mediaImageRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const metaRowRef = useRef<HTMLDListElement | null>(null);
  const ctaLinkRef = useRef<HTMLAnchorElement | null>(null);
  const detailsContainerRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (registerEntranceRefs) {
      registerEntranceRefs({
        mediaFrame: mediaFrameRef.current,
        details: detailsContainerRef.current,
      });
    }
  }, [registerEntranceRefs]);

  useIsomorphicLayoutEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    const tl = animateProjectSwitchIn({
      headerBadge: headerBadgeRef.current,
      title: titleRef.current,
      mediaFrame: mediaFrameRef.current,
      mediaImage: mediaImageRef.current,
      description: descRef.current,
      metaRow: metaRowRef.current,
      ctaLink: ctaLinkRef.current,
    });

    return () => {
      tl.kill();
    };
  }, [project.id]);

  const paddedNumber = String(projectIndex + 1).padStart(2, "0");
  const paddedTotal = String(totalInView).padStart(2, "0");

  return (
    <article
      aria-live="polite"
      aria-label={`Selected project ${project.title}`}
      className="flex flex-col bg-[#F8FAFD] p-5 sm:p-7 lg:p-9"
    >
      {/* 1 & 2. Project Identifier + Category */}
      <div
        ref={headerBadgeRef}
        className="flex flex-wrap items-center justify-between gap-2 will-change-transform"
      >
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#64748B]">
          <span className="font-semibold text-[#0A5FD7]">
            {paddedNumber} / {paddedTotal}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-[#06162C] font-medium">{project.category}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="hidden sm:inline">{project.serviceType}</span>
        </div>
        <span className="font-mono text-[11px] text-[#64748B]">{project.year}</span>
      </div>

      {/* 3. Project Title */}
      <h2
        ref={titleRef}
        className="mt-2.5 font-sans text-[24px] sm:text-[30px] lg:text-[34px] font-bold tracking-[-0.028em] leading-[1.14] text-[#06162C] will-change-transform"
      >
        {project.title}
      </h2>

      {/* 4. Large Actual Project Screenshot (Natural 16:9, Zero Distortion, Clickable Case Study Link) */}
      <div
        ref={mediaFrameRef}
        className="mt-5 sm:mt-6 relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-[#DCE5F2] bg-white shadow-[0_18px_48px_-22px_rgba(6,22,44,0.18)]"
      >
        <Link
          href={`/work/${project.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full case study for ${project.title} in a new tab`}
          className="group/shot block relative w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] focus-visible:ring-inset"
        >
          <div ref={mediaImageRef} className="relative w-full h-full will-change-transform">
            <Image
              key={project.coverImage}
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              sizes="(max-width: 768px) 94vw, (max-width: 1280px) 62vw, 820px"
              className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.015]"
            />
          </div>
        </Link>
      </div>

      {/* 5, 6 & 7. Description, Supported Metadata & Case Study + Prev/Next Controls */}
      <div ref={detailsContainerRef} className="mt-5 sm:mt-6 flex flex-col">
        <p
          ref={descRef}
          className="font-sans text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#475569] max-w-[70ch] will-change-transform"
        >
          {project.summary}
        </p>

        {/* Honest Project Metadata (Only supported fields rendered) */}
        <dl
          ref={metaRowRef}
          className="mt-5 pt-4 border-t border-[#E2EAF4] grid grid-cols-2 sm:grid-cols-4 gap-4 will-change-transform"
        >
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
              Project Type
            </dt>
            <dd className="mt-1 font-sans text-[13px] font-medium text-[#06162C]">
              {project.serviceType}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
              Platform
            </dt>
            <dd className="mt-1 font-sans text-[13px] font-medium text-[#06162C]">
              {project.platform[0]}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
              Deliverables
            </dt>
            <dd className="mt-1 font-sans text-[13px] font-medium text-[#06162C]">
              {project.deliverablesLabel}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
              Archive Status
            </dt>
            <dd className="mt-1 font-sans text-[13px] font-medium text-[#06162C]">
              Concept Sample · {project.year}
            </dd>
          </div>
        </dl>

        {/* Bottom Action Row: Case Study Link (New Tab) + Previous/Next Controls */}
        <div className="mt-6 pt-5 border-t border-[#E2EAF4] flex flex-wrap items-center justify-between gap-4">
          <Link
            ref={ctaLinkRef}
            href={`/work/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cs inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-[#0A5FD7] hover:text-[#06162C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] rounded-xs will-change-transform"
          >
            <span className="border-b border-[#0A5FD7]/40 group-hover/cs:border-[#06162C] pb-0.5 transition-colors">
              {WORK_PAGE_CONTENT.archive.caseStudyLinkLabel}
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>

          {totalInView > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrevious}
                aria-label={`${WORK_PAGE_CONTENT.archive.previousLabel} in ${project.category}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#DCE5F2] px-3.5 py-1.5 font-sans text-[12.5px] font-medium text-[#06162C] shadow-2xs transition-all duration-200 hover:border-[#0A5FD7]/50 hover:text-[#0A5FD7] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
              >
                <span aria-hidden="true">←</span>
                <span>Prev</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label={`${WORK_PAGE_CONTENT.archive.nextLabel} in ${project.category}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#DCE5F2] px-3.5 py-1.5 font-sans text-[12.5px] font-medium text-[#06162C] shadow-2xs transition-all duration-200 hover:border-[#0A5FD7]/50 hover:text-[#0A5FD7] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
              >
                <span>Next</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
