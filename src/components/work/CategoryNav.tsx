"use client";

import React from "react";
import { WorkCategoryId, WorkCategoryWithCount, WORK_PAGE_CONTENT } from "@/data/projects";

export interface CategoryNavProps {
  readonly categories: readonly WorkCategoryWithCount[];
  readonly totalCount: number;
  readonly activeCategory: "all" | WorkCategoryId;
  readonly onSelectCategory: (categoryId: "all" | WorkCategoryId) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  totalCount,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div aria-label="Filter projects by category">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
          {WORK_PAGE_CONTENT.archive.categoryLabel}
        </span>
      </div>

      {/* MOBILE (< md): Clean Horizontally Scrollable Category Bar */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12.5px] font-medium border transition-colors cursor-pointer ${
            activeCategory === "all"
              ? "bg-[#06162C] text-white border-[#06162C]"
              : "bg-white text-[#475569] border-[#DCE5F2] hover:border-[#0A5FD7]/40 hover:text-[#06162C]"
          }`}
        >
          <span>All Projects</span>
          <span
            className={`font-mono text-[10.5px] ${
              activeCategory === "all" ? "text-white/80" : "text-[#64748B]"
            }`}
          >
            {totalCount}
          </span>
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12.5px] font-medium border transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#06162C] text-white border-[#06162C]"
                  : "bg-white text-[#475569] border-[#DCE5F2] hover:border-[#0A5FD7]/40 hover:text-[#06162C]"
              }`}
            >
              <span>{cat.shortLabel}</span>
              <span
                className={`font-mono text-[10.5px] ${
                  isActive ? "text-white/80" : "text-[#64748B]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* DESKTOP & TABLET (md+): Editorial Vertical Navigation List */}
      <div className="hidden md:flex flex-col gap-1">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left font-sans text-[13.5px] transition-all duration-200 cursor-pointer border ${
            activeCategory === "all"
              ? "bg-[#EEF4FD] text-[#06162C] font-semibold border-[#0A5FD7]/25"
              : "bg-transparent text-[#475569] border-transparent hover:bg-[#F8FAFD] hover:text-[#06162C]"
          }`}
        >
          <span className="flex items-center gap-2 min-w-0">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                activeCategory === "all" ? "bg-[#0A5FD7]" : "bg-[#CBD5E1]"
              }`}
            />
            <span className="truncate">All Projects</span>
          </span>
          <span
            className={`font-mono text-[11px] shrink-0 ${
              activeCategory === "all" ? "text-[#0A5FD7] font-semibold" : "text-[#64748B]"
            }`}
          >
            {totalCount}
          </span>
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left font-sans text-[13.5px] transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-[#EEF4FD] text-[#06162C] font-semibold border-[#0A5FD7]/25"
                  : "bg-transparent text-[#475569] border-transparent hover:bg-[#F8FAFD] hover:text-[#06162C]"
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                    isActive ? "bg-[#0A5FD7]" : "bg-[#CBD5E1]"
                  }`}
                />
                <span className="truncate">{cat.label}</span>
              </span>
              <span
                className={`font-mono text-[11px] shrink-0 ${
                  isActive ? "text-[#0A5FD7] font-semibold" : "text-[#64748B]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
