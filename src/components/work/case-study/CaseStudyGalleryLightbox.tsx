"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ProjectGalleryItem } from "@/data/projects";

export interface CaseStudyGalleryLightboxProps {
  readonly items: readonly ProjectGalleryItem[];
  readonly projectTitle: string;
}

export const CaseStudyGalleryLightbox: React.FC<CaseStudyGalleryLightboxProps> = ({
  items,
  projectTitle,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isOpen = selectedIndex !== null;
  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    const prevIdx = selectedIndex;
    setSelectedIndex(null);
    if (prevIdx !== null && triggerRefs.current[prevIdx]) {
      requestAnimationFrame(() => triggerRefs.current[prevIdx]?.focus());
    }
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + items.length) % items.length
    );
  }, [items.length, selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % items.length
    );
  }, [items.length, selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  return (
    <div className="w-full">
      {/* Thumbnail Grid: 5 High-Resolution Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {items.map((item, idx) => (
          <div
            key={item.src}
            className="group/item flex flex-col rounded-xl border border-[#DCE5F2] bg-white p-3 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-[#0A5FD7]/40"
          >
            <button
              ref={(el) => {
                triggerRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => handleOpen(idx)}
              aria-label={`View ${item.label} in fullscreen lightbox`}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#0B1220] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-[1.025]"
              />

              {/* Hover Zoom Micro Indicator */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#06162C]/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[11px] font-medium text-[#06162C] shadow-sm backdrop-blur-xs">
                  <span>View Fullscreen</span>
                  <span aria-hidden="true">⤢</span>
                </span>
              </div>
            </button>

            <div className="mt-3 px-1 pb-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#0A5FD7]">
                  View {String(idx + 1).padStart(2, "0")} · {item.label}
                </span>
              </div>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#475569]">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX PORTAL DIALOG */}
      {isOpen && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} fullscreen image viewer`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#06162C]/92 backdrop-blur-md p-3 sm:p-6 lg:p-8"
          onClick={handleClose}
        >
          {/* Top Bar: Title, Counter & Close Button */}
          <div
            className="absolute top-3 inset-x-3 sm:top-5 sm:inset-x-6 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 bg-[#06162C]/80 px-4 py-2 rounded-full border border-white/15 text-white backdrop-blur-sm">
              <span className="font-sans text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-[400px]">
                {projectTitle}
              </span>
              <span className="text-white/40">·</span>
              <span className="font-mono text-xs text-[#60A5FA]">
                {selectedIndex + 1} / {items.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close fullscreen lightbox"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous screenshot"
            className="absolute left-2 sm:left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span aria-hidden="true" className="text-xl">
              ←
            </span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next screenshot"
            className="absolute right-2 sm:right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </button>

          {/* Center Image Container */}
          <div
            className="relative w-full max-w-[1280px] max-h-[82vh] aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1280px"
              className="object-contain"
            />
          </div>

          {/* Bottom Caption Pill */}
          <div
            className="absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-8 flex justify-center z-20 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-auto max-w-[800px] bg-[#06162C]/85 px-4 sm:px-6 py-2.5 rounded-xl border border-white/15 text-center text-white backdrop-blur-sm">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#60A5FA] font-semibold block">
                {currentItem.label}
              </span>
              <p className="mt-0.5 font-sans text-xs sm:text-[13.5px] text-slate-200">
                {currentItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
