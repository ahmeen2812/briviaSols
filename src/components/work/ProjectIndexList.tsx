"use client";

import React, { useEffect, useRef } from "react";
import { Project, WORK_PAGE_CONTENT } from "@/data/projects";

export interface ProjectIndexListProps {
  readonly projects: readonly Project[];
  readonly activeProjectId: string;
  readonly onSelectProject: (projectId: string) => void;
  readonly registerRowRef?: (index: number, el: HTMLButtonElement | null) => void;
}

export const ProjectIndexList: React.FC<ProjectIndexListProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  registerRowRef,
}) => {
  const navRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const hasMountedRef = useRef(false);

  // Scroll only the internal index list container (never the page window) on user-driven switches
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const navEl = navRef.current;
    const activeEl = rowRefs.current.get(activeProjectId);
    if (!navEl || !activeEl) return;

    const itemTop = activeEl.offsetTop;
    const itemBottom = itemTop + activeEl.offsetHeight;
    const viewTop = navEl.scrollTop;
    const viewBottom = viewTop + navEl.clientHeight;

    if (itemTop < viewTop) {
      navEl.scrollTo({ top: itemTop, behavior: "smooth" });
    } else if (itemBottom > viewBottom) {
      navEl.scrollTo({ top: itemBottom - navEl.clientHeight, behavior: "smooth" });
    }
  }, [activeProjectId]);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
          {WORK_PAGE_CONTENT.archive.indexLabel}
        </span>
        <span className="font-mono text-[10.5px] text-[#64748B]">
          {String(projects.length).padStart(2, "0")} Items
        </span>
      </div>

      {/* Bounded Scrollable Project Index List */}
      <nav
        ref={navRef}
        aria-label="Project Index"
        className="relative max-h-[210px] md:max-h-none md:flex-1 md:min-h-0 overflow-y-auto pr-1 divide-y divide-[#EEF2F7] border border-[#E5ECF5] md:border-0 rounded-xl md:rounded-none bg-white md:bg-transparent"
      >
        {projects.map((project, index) => {
          const isActive = project.id === activeProjectId;
          const displayNumber = String(index + 1).padStart(2, "0");

          return (
            <button
              key={project.id}
              ref={(el) => {
                if (el) rowRefs.current.set(project.id, el);
                else rowRefs.current.delete(project.id);
                if (registerRowRef) registerRowRef(index, el);
              }}
              type="button"
              onClick={() => onSelectProject(project.id)}
              aria-current={isActive ? "true" : undefined}
              className={`group/item relative w-full flex items-center gap-3 pl-3.5 pr-2.5 py-2.5 text-left transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] focus-visible:ring-inset ${
                isActive
                  ? "bg-[#F4F8FF]"
                  : "hover:bg-[#F8FAFD]"
              }`}
            >
              {/* Thin Brivya-Blue Left Vertical Active Indicator */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-[#0A5FD7] transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-50 group-hover/item:opacity-35 group-hover/item:scale-y-75"
                }`}
              />

              <span
                className={`font-mono text-[11px] shrink-0 transition-colors duration-200 ${
                  isActive
                    ? "text-[#0A5FD7] font-semibold"
                    : "text-[#94A3B8] group-hover/item:text-[#64748B]"
                }`}
              >
                {displayNumber}
              </span>

              <div className="min-w-0 flex-1">
                <span
                  className={`block font-sans text-[13.5px] leading-snug truncate transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#06162C]"
                      : "font-medium text-[#475569] group-hover/item:text-[#06162C]"
                  }`}
                >
                  {project.title}
                </span>
                <span className="block font-sans text-[11px] text-[#64748B] truncate">
                  {project.serviceType}
                </span>
              </div>

              <span
                aria-hidden="true"
                className={`text-[12px] shrink-0 transition-all duration-200 ${
                  isActive
                    ? "text-[#0A5FD7] opacity-100 translate-x-0"
                    : "text-[#94A3B8] opacity-0 -translate-x-1 group-hover/item:opacity-60 group-hover/item:translate-x-0"
                }`}
              >
                →
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
