"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { TeamMember, getActiveSocialLinks } from "@/config/team";
import { TeamImageFrame } from "./TeamImageFrame";
import { SocialLinksRow } from "./SocialLinksRow";
import {
  animateProfileModalOpen,
  animateProfileModalClose,
  ModalFlipOriginRect,
} from "./animations/aboutAnimations";
import styles from "./about.module.css";

export interface TeamMemberModalProps {
  readonly member: TeamMember | null;
  readonly isImageAvailable: boolean;
  readonly originRect: ModalFlipOriginRect | null;
  readonly onClose: () => void;
}

/**
 * Highlights relevant professional & technical phrases naturally inside
 * multi-paragraph biography text without separate skill boxes or badges.
 */
function renderBioWithHighlights(
  text: string,
  highlights: readonly string[]
): React.ReactNode {
  if (!highlights || highlights.length === 0) return text;

  const escaped = highlights
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (escaped.length === 0) return text;

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const segments = text.split(regex);

  return segments.map((part, idx) => {
    const matched = highlights.some((term) => term.toLowerCase() === part.toLowerCase());
    if (matched) {
      return (
        <strong key={`${part}-${idx}`} className="font-semibold text-[#0A5FD7]">
          {part}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  isImageAvailable,
  originRect,
  onClose,
}) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const isClosingRef = useRef(false);

  const handleCloseWithAnimation = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    animateProfileModalClose(
      {
        backdrop: backdropRef.current,
        panel: panelRef.current,
        originRect,
      },
      () => {
        isClosingRef.current = false;
        onClose();
      }
    );
  }, [onClose, originRect]);

  useEffect(() => {
    if (!member) return;

    isClosingRef.current = false;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const validContent = contentRefs.current.filter((el): el is HTMLElement => Boolean(el));
    const openTl = animateProfileModalOpen({
      backdrop: backdropRef.current,
      panel: panelRef.current,
      media: mediaRef.current,
      contentItems: validContent,
      originRect,
    });

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 45);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseWithAnimation();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !panelRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !panelRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      if (openTl) openTl.kill();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [member, originRect, handleCloseWithAnimation]);

  if (!member || typeof document === "undefined") {
    return null;
  }

  const hasSocials = getActiveSocialLinks(member.socials).length > 0;

  const modalMarkup = (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-6 md:p-8 overflow-x-hidden"
      role="presentation"
    >
      {/* Blurred Darkened Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleCloseWithAnimation}
        aria-hidden="true"
        className="fixed inset-0 bg-[#06162C]/65 backdrop-blur-md"
      />

      {/* Expanding 2-Column Profile Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-modal-name"
        aria-describedby="team-modal-bio"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[960px] sm:max-h-[88vh] flex flex-col md:grid md:grid-cols-12 rounded-none sm:rounded-2xl bg-white border-0 sm:border sm:border-[#E5E7EB] shadow-[0_36px_96px_-18px_rgba(6,22,44,0.48)] overflow-y-auto md:overflow-hidden"
      >
        {/* Top-Right Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleCloseWithAnimation}
          aria-label={`Close profile for ${member.name}`}
          className="fixed sm:absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/95 text-[#18181B] border border-slate-200 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-[#18181B] hover:text-white hover:border-[#18181B] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
        >
          <svg
            className="h-4.5 w-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT COLUMN: Inset framed cover portrait ONLY (No social icons here) */}
        <div className="md:col-span-5 relative w-full shrink-0 aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-full md:min-h-[540px] bg-[#F6F8FB] p-3 sm:p-3.5 md:p-4 border-b md:border-b-0 md:border-r border-[#EEF2F7]">
          <div className="relative w-full h-full rounded-xl border border-[#DCE5F2] bg-white overflow-hidden shadow-[0_8px_24px_-12px_rgba(6,22,44,0.12)]">
            <div ref={mediaRef} className="w-full h-full will-change-transform">
              <TeamImageFrame
                src={member.image}
                alt={member.imageAlt}
                variant="portrait"
                fitMode="cover"
                objectPosition={member.imagePosition || "50% 22%"}
                memberName={member.name}
                isAvailable={isImageAvailable}
                priority
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            {/* Subtle Architectural Corner Accents */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 rounded-tl-[4px] border-t border-l border-[#0A5FD7]/25"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 rounded-tr-[4px] border-t border-r border-[#0A5FD7]/25"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 rounded-bl-[4px] border-b border-l border-[#0A5FD7]/25"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 rounded-br-[4px] border-b border-r border-[#0A5FD7]/25"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Independently Scrollable Biography + Centered Bottom Social Footer */}
        <div className="md:col-span-7 flex flex-col justify-between md:max-h-[88vh] md:overflow-hidden bg-white">
          <div className="md:flex-1 md:overflow-y-auto px-6 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6 md:px-10 md:pt-10 md:pb-6">
            {/* Name */}
            <h2
              id="team-modal-name"
              ref={(el) => {
                contentRefs.current[0] = el;
              }}
              className={`${styles.editorialSerif} text-[32px] sm:text-[38px] md:text-[42px] font-medium tracking-[-0.02em] leading-[1.06] text-[#18181B] pr-10`}
            >
              {member.name}
            </h2>

            {/* Designation & Experience */}
            <div
              ref={(el) => {
                contentRefs.current[1] = el;
              }}
              className="mt-2 pr-8"
            >
              <p className="font-sans text-[14.5px] sm:text-[15.5px] font-semibold text-[#0A5FD7]">
                {member.role}
              </p>
              {member.experience && (
                <p className="mt-0.5 font-sans text-[13px] sm:text-[13.5px] text-[#52525B]">
                  {member.experience}
                </p>
              )}
            </div>

            {/* Subtle Horizontal Divider */}
            <div
              ref={(el) => {
                contentRefs.current[2] = el;
              }}
              aria-hidden="true"
              className="my-5 sm:my-6 h-[1px] w-full bg-[#18181B]/10"
            />

            {/* Complete Readable Multi-Paragraph Biography with Inline Highlights */}
            <div
              id="team-modal-bio"
              ref={(el) => {
                contentRefs.current[3] = el;
              }}
              className="space-y-4 font-sans text-[14.5px] sm:text-[15px] leading-[1.72] text-[#3F3F46] font-normal"
            >
              {member.bio.map((paragraph, idx) => (
                <p key={idx}>{renderBioWithHighlights(paragraph, member.highlightTerms)}</p>
              ))}
            </div>
          </div>

          {/* Centered Horizontal Social Icon Row at Bottom of Information Panel */}
          {hasSocials && (
            <div
              ref={(el) => {
                contentRefs.current[4] = el;
              }}
              className="shrink-0 border-t border-[#18181B]/10 px-6 py-4 sm:px-8 sm:py-5 md:px-10 flex items-center justify-center bg-white"
            >
              <SocialLinksRow
                memberName={member.name}
                socials={member.socials}
                variant="modal"
                centered
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalMarkup, document.body);
};
