"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  Project,
  WorkCategoryId,
  WorkCategoryWithCount,
  WORK_PAGE_CONTENT,
  getProjectsByCategory,
} from "@/data/projects";
import { useIsomorphicLayoutEffect } from "@/components/shared/useIsomorphicLayoutEffect";
import { initWorkArchiveEntrance } from "./animations/workAnimations";
import { CategoryNav } from "./CategoryNav";
import { ProjectIndexList } from "./ProjectIndexList";
import { ProjectPresentation } from "./ProjectPresentation";

export interface WorkArchiveProps {
  readonly allPublishedProjects: readonly Project[];
  readonly availableCategories: readonly WorkCategoryWithCount[];
}

export const WorkArchive: React.FC<WorkArchiveProps> = ({
  allPublishedProjects,
  availableCategories,
}) => {
  const [activeCategory, setActiveCategory] = useState<"all" | WorkCategoryId>("all");
  const [activeProjectId, setActiveProjectId] = useState<string>(
    allPublishedProjects[0]?.id ?? ""
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const categoryGroupRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const presentationRefs = useRef<{
    mediaFrame: HTMLElement | null;
    details: HTMLElement | null;
  }>({ mediaFrame: null, details: null });

  const filteredProjects = useMemo(
    () => getProjectsByCategory(activeCategory),
    [activeCategory]
  );

  const activeIndex = useMemo(() => {
    const idx = filteredProjects.findIndex((p) => p.id === activeProjectId);
    return idx >= 0 ? idx : 0;
  }, [filteredProjects, activeProjectId]);

  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0];

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || filteredProjects.length === 0) return;

    const validRows = rowRefs.current.filter(
      (el): el is HTMLButtonElement => Boolean(el)
    );

    const ctx = initWorkArchiveEntrance({
      section: sectionRef.current,
      topBar: topBarRef.current,
      categoryGroup: categoryGroupRef.current,
      indexRows: validRows,
      stageFrame: presentationRefs.current.mediaFrame,
      stageDetails: presentationRefs.current.details,
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSelectCategory = useCallback((categoryId: "all" | WorkCategoryId) => {
    const nextList = getProjectsByCategory(categoryId);
    setActiveCategory(categoryId);
    setActiveProjectId(nextList[0]?.id ?? "");
  }, []);

  const handleSelectProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
  }, []);

  const handlePrevious = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    const prevIdx =
      (activeIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveProjectId(filteredProjects[prevIdx].id);
  }, [activeIndex, filteredProjects]);

  const handleNext = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    const nextIdx = (activeIndex + 1) % filteredProjects.length;
    setActiveProjectId(filteredProjects[nextIdx].id);
  }, [activeIndex, filteredProjects]);

  const registerEntranceRefs = useCallback(
    (refs: { mediaFrame: HTMLElement | null; details: HTMLElement | null }) => {
      presentationRefs.current = refs;
    },
    []
  );

  if (!activeProject) {
    return null;
  }

  return (
    <section
      id="work-archive"
      ref={sectionRef}
      aria-labelledby="work-archive-heading"
      className="relative w-full scroll-mt-24 bg-[#F4F7FC] py-12 sm:py-16 lg:py-20 select-none"
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8">
        <h2 id="work-archive-heading" className="sr-only">
          Interactive Project Archive
        </h2>

        {/* Studio Window Container (overflow-x-clip preserves desktop CSS sticky behavior) */}
        <div className="rounded-2xl border border-[#CEDBE9] bg-white shadow-[0_20px_60px_-28px_rgba(6,22,44,0.14)] overflow-x-clip">
          {/* Studio Header Bar */}
          <div
            ref={topBarRef}
            className="flex flex-wrap items-center justify-between gap-2 bg-[#F8FAFD] px-5 sm:px-7 py-3.5 border-b border-[#DCE5F2] rounded-t-2xl will-change-transform"
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#06162C]">
              {WORK_PAGE_CONTENT.archive.headerLeft}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#64748B]">
              {WORK_PAGE_CONTENT.archive.headerRight} · {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "System" : "Systems"}
            </span>
          </div>

          {/* 2-Column Split Archive (Sticky Left Navigation + Right Visual Showcase) */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-start">
            {/* LEFT COLUMN: Category Navigation & Numbered Project Index */}
            <aside className="md:col-span-5 lg:col-span-4 md:sticky md:top-24 md:max-h-[calc(100vh-7.5rem)] flex flex-col gap-5 bg-white p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#DCE5F2] md:rounded-bl-2xl">
              <div ref={categoryGroupRef} className="will-change-transform">
                <CategoryNav
                  categories={availableCategories}
                  totalCount={allPublishedProjects.length}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                />
              </div>

              <div className="h-[1px] w-full bg-[#E2EAF4] shrink-0" aria-hidden="true" />

              <ProjectIndexList
                projects={filteredProjects}
                activeProjectId={activeProject.id}
                onSelectProject={handleSelectProject}
                registerRowRef={(idx, el) => {
                  rowRefs.current[idx] = el;
                }}
              />
            </aside>

            {/* RIGHT COLUMN: Main Project Presentation */}
            <div className="md:col-span-7 lg:col-span-8 md:rounded-br-2xl overflow-hidden">
              <ProjectPresentation
                project={activeProject}
                projectIndex={activeIndex}
                totalInView={filteredProjects.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                registerEntranceRefs={registerEntranceRefs}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
