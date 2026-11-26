"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, WORK_PAGE_CONTENT } from "@/data/projects";
import { useIsomorphicLayoutEffect } from "@/components/shared/useIsomorphicLayoutEffect";
import { initCaseStudyEntrance } from "./animations/workAnimations";
import { SearchCta } from "@/components/services/google-ads/search/SearchCta";
import { Footer } from "@/components/footer";

export interface CaseStudyViewProps {
  readonly project: Project;
  readonly relatedProjects: readonly Project[];
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  relatedProjects,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroItemRefs = useRef<(HTMLElement | null)[]>([]);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const galleryRefs = useRef<(HTMLElement | null)[]>([]);

  const { caseStudy } = project;
  const galleryItems = caseStudy.galleryItems;

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const validHero = heroItemRefs.current.filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const validGallery = galleryRefs.current.filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const ctx = initCaseStudyEntrance({
      container: containerRef.current,
      heroItems: validHero,
      heroMedia: heroMediaRef.current,
      galleryItems: validGallery,
    });

    return () => {
      ctx.revert();
    };
  }, [project.slug]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 220);
    return () => clearTimeout(timer);
  }, []);

  // Lightbox keyboard handling & scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((curr) =>
          curr === null ? 0 : (curr + 1) % galleryItems.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((curr) =>
          curr === null
            ? 0
            : (curr - 1 + galleryItems.length) % galleryItems.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, galleryItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-clip bg-[#F4F7FC]"
    >
      {/* SECTION 1 — CASE STUDY INTRODUCTION */}
      <section className="relative w-full bg-[#F4F7FC] pt-3 sm:pt-5 pb-12 sm:pb-16 border-b border-[#DCE5F2]">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            ref={(el) => {
              heroItemRefs.current[0] = el;
            }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#64748B] will-change-transform"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[#06162C] hover:text-[#0A5FD7] transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>Work Archive</span>
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#0A5FD7]">{project.category}</span>
            <span aria-hidden="true">/</span>
            <span className="truncate max-w-[240px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          {/* Header Grid */}
          <div className="mt-6 sm:mt-8 max-w-[900px]">
            <div
              ref={(el) => {
                heroItemRefs.current[1] = el;
              }}
              className="flex flex-wrap items-center gap-3 will-change-transform"
            >
              <span className="inline-flex items-center rounded-full bg-white border border-[#DCE5F2] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#0A5FD7]">
                {project.serviceType}
              </span>
              {caseStudy.isConceptDemo && (
                <span className="inline-flex items-center rounded-full bg-[#EEF4FD] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#06162C]">
                  Concept &amp; Interface Demonstration
                </span>
              )}
            </div>

            <h1
              ref={(el) => {
                heroItemRefs.current[2] = el;
              }}
              className="mt-4 font-sans text-[32px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.032em] leading-[1.08] text-[#06162C] will-change-transform"
            >
              {project.title}
            </h1>

            <p
              ref={(el) => {
                heroItemRefs.current[3] = el;
              }}
              className="mt-4 font-sans text-[16px] sm:text-[18px] leading-[1.68] text-[#475569] will-change-transform"
            >
              {project.summary}
            </p>
          </div>

          {/* Supported Project Metadata Bar */}
          <dl
            ref={(el) => {
              heroItemRefs.current[4] = el;
            }}
            className="mt-7 pt-5 border-t border-[#DCE5F2] grid grid-cols-2 sm:grid-cols-4 gap-5 will-change-transform"
          >
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#64748B]">
                Category
              </dt>
              <dd className="mt-1 font-sans text-[14px] font-semibold text-[#06162C]">
                {project.category}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#64748B]">
                Platform
              </dt>
              <dd className="mt-1 font-sans text-[14px] font-semibold text-[#06162C]">
                {project.platform.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#64748B]">
                Interface Screens
              </dt>
              <dd className="mt-1 font-sans text-[14px] font-semibold text-[#06162C]">
                {project.deliverablesLabel}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#64748B]">
                Archive Year
              </dt>
              <dd className="mt-1 font-sans text-[14px] font-semibold text-[#06162C]">
                {project.year}
              </dd>
            </div>
          </dl>

          {/* Main Cover Screenshot */}
          <div
            ref={heroMediaRef}
            className="mt-8 sm:mt-10 relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-[#CEDBE9] bg-white shadow-[0_24px_64px_-24px_rgba(6,22,44,0.22)]"
          >
            <Image
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* SECTIONS 2–6 & 8–9 — EDITORIAL CASE STUDY NARRATIVE */}
      <section className="w-full bg-white py-14 sm:py-20 border-b border-[#DCE5F2]">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Main Narrative Column */}
            <div className="lg:col-span-8 space-y-11">
              {/* Section 2: Overview */}
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                  01 / Project Overview
                </span>
                <h2 className="mt-2 font-sans text-[24px] sm:text-[28px] font-bold tracking-[-0.025em] text-[#06162C]">
                  System purpose &amp; design scope
                </h2>
                <p className="mt-3.5 font-sans text-[15.5px] leading-[1.75] text-[#334155]">
                  {caseStudy.overview}
                </p>
              </div>

              {/* Section 3: The Challenge */}
              {caseStudy.challenge && (
                <div className="pt-8 border-t border-[#E8EEF7]">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                    02 / The Challenge
                  </span>
                  <h2 className="mt-2 font-sans text-[22px] sm:text-[26px] font-bold tracking-[-0.024em] text-[#06162C]">
                    Operational bottleneck addressed
                  </h2>
                  <p className="mt-3.5 font-sans text-[15.5px] leading-[1.75] text-[#334155]">
                    {caseStudy.challenge}
                  </p>
                </div>
              )}

              {/* Section 4: Our Approach */}
              {caseStudy.approach && (
                <div className="pt-8 border-t border-[#E8EEF7]">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                    03 / Our Approach
                  </span>
                  <h2 className="mt-2 font-sans text-[22px] sm:text-[26px] font-bold tracking-[-0.024em] text-[#06162C]">
                    Architectural structure
                  </h2>
                  <p className="mt-3.5 font-sans text-[15.5px] leading-[1.75] text-[#334155]">
                    {caseStudy.approach}
                  </p>
                </div>
              )}

              {/* Section 5: The Solution */}
              {caseStudy.solution && (
                <div className="pt-8 border-t border-[#E8EEF7]">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                    04 / The Solution
                  </span>
                  <h2 className="mt-2 font-sans text-[22px] sm:text-[26px] font-bold tracking-[-0.024em] text-[#06162C]">
                    Interface &amp; workflow execution
                  </h2>
                  <p className="mt-3.5 font-sans text-[15.5px] leading-[1.75] text-[#334155]">
                    {caseStudy.solution}
                  </p>
                </div>
              )}

              {/* Section 6: Key Capabilities */}
              {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
                <div className="pt-8 border-t border-[#E8EEF7]">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                    05 / Key Capabilities
                  </span>
                  <h2 className="mt-2 font-sans text-[22px] sm:text-[26px] font-bold tracking-[-0.024em] text-[#06162C]">
                    Core system functions
                  </h2>
                  <ul className="mt-5 grid grid-cols-1 gap-3">
                    {caseStudy.keyFeatures.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 rounded-xl border border-[#E2EAF4] bg-[#F8FAFD] px-4 py-3.5"
                      >
                        <span className="mt-0.5 font-mono text-[11px] font-semibold text-[#0A5FD7] shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-sans text-[14.5px] leading-[1.6] text-[#1E293B]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar: Technical Details & Honest Demonstration Notice */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              {/* Section 8: Technical Details */}
              <div className="rounded-2xl border border-[#DCE5F2] bg-[#F8FAFD] p-6">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#06162C]">
                  Technical Architecture
                </span>

                {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
                      Core Stack &amp; Patterns
                    </h3>
                    <ul className="mt-2.5 space-y-2">
                      {caseStudy.technologies.map((tech, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 font-sans text-[13.5px] text-[#06162C]"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[#0A5FD7] shrink-0"
                          />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseStudy.scopeItems && caseStudy.scopeItems.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[#E2EAF4]">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
                      Delivered Views &amp; Scope
                    </h3>
                    <ul className="mt-2.5 space-y-2">
                      {caseStudy.scopeItems.map((item, idx) => (
                        <li
                          key={idx}
                          className="font-sans text-[13.5px] text-[#475569]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 9: Honest Results / Scope Disclosure */}
              <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#0A5FD7]">
                  Portfolio Context
                </span>
                <p className="mt-2.5 font-sans text-[13.5px] leading-[1.65] text-[#475569]">
                  {caseStudy.conceptNote}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PROJECT GALLERY WITH FULLSCREEN LIGHTBOX */}
      <section
        aria-labelledby="case-study-gallery-heading"
        className="w-full bg-[#F4F7FC] py-14 sm:py-20 border-b border-[#DCE5F2]"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                06 / Interface Screens
              </span>
              <h2
                id="case-study-gallery-heading"
                className="mt-2 font-sans text-[26px] sm:text-[32px] font-bold tracking-[-0.028em] text-[#06162C]"
              >
                Complete System Walkthrough
              </h2>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#64748B]">
              Click any view for fullscreen inspection
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {galleryItems.map((item, idx) => (
              <figure
                key={item.src}
                ref={(el) => {
                  galleryRefs.current[idx] = el;
                }}
                className="group/gal rounded-2xl border border-[#CEDBE9] bg-white p-3 sm:p-4 shadow-[0_14px_38px_-22px_rgba(6,22,44,0.14)]"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Inspect ${item.label} in fullscreen lightbox`}
                  className="relative block w-full aspect-[16/9] overflow-hidden rounded-xl border border-[#E2EAF4] bg-[#F8FAFD] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 94vw, 560px"
                    className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/gal:scale-[1.02]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-[#06162C]/85 px-2.5 py-1 font-mono text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover/gal:opacity-100"
                  >
                    Expand ↗
                  </span>
                </button>
                <figcaption className="mt-3.5 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-[15px] font-semibold text-[#06162C]">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10.5px] text-[#0A5FD7]">
                      Screen {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-[13.5px] leading-[1.58] text-[#475569]">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — RELATED WORK FROM SAME CATEGORY */}
      {relatedProjects.length > 0 && (
        <section
          aria-labelledby="related-work-heading"
          className="w-full bg-white py-14 sm:py-18 border-b border-[#DCE5F2]"
        >
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0A5FD7]">
                  More in {project.category}
                </span>
                <h2
                  id="related-work-heading"
                  className="mt-1.5 font-sans text-[24px] sm:text-[28px] font-bold tracking-[-0.025em] text-[#06162C]"
                >
                  Related Systems
                </h2>
              </div>
              <Link
                href="/work"
                className="font-sans text-[13.5px] font-semibold text-[#0A5FD7] hover:text-[#06162C] transition-colors"
              >
                Back to full Work Archive →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/work/${rel.slug}`}
                  className="group/rel flex flex-col rounded-2xl border border-[#DCE5F2] bg-[#F8FAFD] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A5FD7]/40 hover:bg-white hover:shadow-[0_18px_40px_-22px_rgba(6,22,44,0.18)]"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-[#E2EAF4] bg-white">
                    <Image
                      src={rel.coverImage}
                      alt={rel.coverAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 370px"
                      className="object-cover object-top transition-transform duration-500 group-hover/rel:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-3.5 px-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#64748B]">
                      {rel.serviceType}
                    </span>
                    <h3 className="mt-1 font-sans text-[16px] font-semibold text-[#06162C] group-hover/rel:text-[#0A5FD7] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-[1.55] text-[#475569] line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 11 & 12 — UNIVERSAL CTA + SEAMLESS FOOTER */}
      <div className="w-full flow-root bg-[#F4F7FC] pt-8 sm:pt-12">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8">
          <SearchCta ctaOverride={WORK_PAGE_CONTENT.cta} useScrubStagger />
        </div>
      </div>

      <Footer />

      {/* FULLSCREEN GALLERY LIGHTBOX MODAL */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — ${activeLightboxItem.label}`}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06162C]/92 backdrop-blur-md p-4 sm:p-8"
        >
          {/* Top Lightbox Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1280px] flex items-center justify-between gap-4 pb-3 text-white"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#93C5FD]">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(galleryItems.length).padStart(2, "0")} ·{" "}
                {project.title}
              </span>
              <p className="font-sans text-[15px] font-semibold text-white">
                {activeLightboxItem.label}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen gallery"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#06162C] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Large Responsive View */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1280px] aspect-[16/9] max-h-[75vh] overflow-hidden rounded-xl border border-white/15 bg-black"
          >
            <Image
              src={activeLightboxItem.src}
              alt={activeLightboxItem.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Bottom Controls & Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1280px] pt-3 flex flex-wrap items-center justify-between gap-3 text-white/90"
          >
            <p className="font-sans text-[13.5px] text-slate-300 max-w-[78ch]">
              {activeLightboxItem.caption}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + galleryItems.length) %
                      galleryItems.length
                  )
                }
                aria-label="Previous interface screen"
                className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 font-sans text-[12.5px] text-white hover:bg-white hover:text-[#06162C] transition-colors cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % galleryItems.length)
                }
                aria-label="Next interface screen"
                className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 font-sans text-[12.5px] text-white hover:bg-white hover:text-[#06162C] transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
