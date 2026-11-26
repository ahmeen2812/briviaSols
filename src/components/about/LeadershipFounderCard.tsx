"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { TeamMember, getActiveSocialLinks } from "@/config/team";
import { TeamImageFrame } from "./TeamImageFrame";
import { SocialLinksRow } from "./SocialLinksRow";
import {
  initLeadershipFounderTimeline,
  ModalFlipOriginRect,
} from "./animations/aboutAnimations";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface LeadershipFounderCardProps {
  readonly member: TeamMember;
  readonly index: number;
  readonly isImageAvailable: boolean;
  readonly onSelect: (
    member: TeamMember,
    triggerEl: HTMLElement | null,
    originRect: ModalFlipOriginRect | null
  ) => void;
  readonly priority?: boolean;
}

export const LeadershipFounderCard: React.FC<LeadershipFounderCardProps> = ({
  member,
  index,
  isImageAvailable,
  onSelect,
  priority = false,
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const maskWrapperRef = useRef<HTMLDivElement | null>(null);
  const innerImgRef = useRef<HTMLDivElement | null>(null);
  const outerFrameRef = useRef<HTMLDivElement | null>(null);
  const cornerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lightSweepRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const roleRef = useRef<HTMLParagraphElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLParagraphElement | null>(null);
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomDividerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeSocials = getActiveSocialLinks(member.socials);
  const hasSocials = activeSocials.length > 0;
  const direction: "ltr" | "rtl" = index % 2 === 0 ? "ltr" : "rtl";

  useIsomorphicLayoutEffect(() => {
    if (!cardRef.current || !maskWrapperRef.current) return;

    const validCorners = cornerRefs.current.filter(
      (el): el is HTMLSpanElement => Boolean(el)
    );
    const validSocials = socialIconRefs.current
      .slice(0, activeSocials.length)
      .filter((el): el is HTMLAnchorElement => Boolean(el));

    const ctx = initLeadershipFounderTimeline({
      card: cardRef.current,
      direction,
      delaySec: (index % 2) * 0.14,
      maskWrapper: maskWrapperRef.current,
      innerImg: innerImgRef.current,
      outerFrame: outerFrameRef.current,
      corners: validCorners,
      lightSweep: lightSweepRef.current,
      nameEl: nameRef.current,
      roleEl: roleRef.current,
      accentLine: accentLineRef.current,
      experienceEl: experienceRef.current,
      socialIcons: validSocials,
      bottomDivider: bottomDividerRef.current,
    });

    return () => {
      ctx.revert();
    };
  }, [direction, index, activeSocials.length]);

  const handleTriggerClick = () => {
    const rect = maskWrapperRef.current?.getBoundingClientRect();
    const originRect: ModalFlipOriginRect | null = rect
      ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
      : null;
    onSelect(member, triggerRef.current, originRect);
  };

  return (
    <article
      ref={cardRef}
      data-founder-card={member.id}
      data-reveal-direction={direction}
      className="group/card relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 will-change-transform"
    >
      {/* Architectural Outer Frame Wrapper */}
      <div className="relative p-1.5 sm:p-2">
        {/* Stage 2: Subtle outer hairline frame */}
        <div
          ref={outerFrameRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[8px] border border-[#DCE5F2] transition-colors duration-300 group-hover/card:border-[#0A5FD7]/35"
        />

        {/* Stage 2: Subtle architectural corner ticks */}
        <span
          ref={(el) => {
            cornerRefs.current[0] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-3 w-3 rounded-tl-[8px] border-t-[1.5px] border-l-[1.5px] border-[#0A5FD7]/45"
        />
        <span
          ref={(el) => {
            cornerRefs.current[1] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-3 w-3 rounded-tr-[8px] border-t-[1.5px] border-r-[1.5px] border-[#0A5FD7]/45"
        />
        <span
          ref={(el) => {
            cornerRefs.current[2] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 rounded-bl-[8px] border-b-[1.5px] border-l-[1.5px] border-[#0A5FD7]/45"
        />
        <span
          ref={(el) => {
            cornerRefs.current[3] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 rounded-br-[8px] border-b-[1.5px] border-r-[1.5px] border-[#0A5FD7]/45"
        />

        {/* Stage 1: Directional clip-path mask wrapper holding 4:5 uncropped portrait */}
        <div
          ref={maskWrapperRef}
          className="relative w-full aspect-[4/5] overflow-hidden rounded-[6px] bg-[#F4F6FA] will-change-[clip-path,filter,opacity]"
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={handleTriggerClick}
            aria-label={`Open full profile for ${member.name}, ${member.role}`}
            className="relative block w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] focus-visible:ring-inset active:scale-[0.99] transition-transform duration-200"
          >
            <div ref={innerImgRef} className="w-full h-full will-change-transform">
              <TeamImageFrame
                src={member.image}
                alt={member.imageAlt}
                variant="portrait"
                fitMode="contain"
                memberName={member.name}
                isAvailable={isImageAvailable}
                priority={priority}
                sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 420px"
                imageClassName="group-hover/card:scale-[1.03] transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>

            {/* Subtle Hover Contrast Veil */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06162C]/55 via-[#06162C]/10 to-transparent opacity-0 transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 group-focus-within/card:opacity-100"
            />
          </button>

          {/* Stage 2: Subtle editorial light sweep passing once across the portrait */}
          <div
            ref={lightSweepRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -inset-x-10 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
          />
        </div>
      </div>

      {/* Editorial Caption Sequence (Stages 3–5) */}
      <div className="pt-4 pb-1 px-1">
        <button
          type="button"
          onClick={handleTriggerClick}
          aria-label={`View profile for ${member.name}`}
          className="w-full text-left flex items-start justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] rounded-xs"
        >
          <div className="min-w-0 flex-1">
            {/* Stage 3: Upward Masked Founder Name */}
            <div className="overflow-hidden">
              <h3
                ref={nameRef}
                className="font-sans text-[18px] sm:text-[19.5px] font-semibold tracking-[-0.018em] leading-[1.28] text-[#18181B] transition-colors duration-200 group-hover/card:text-[#0A5FD7] truncate will-change-transform"
              >
                {member.name}
              </h3>
            </div>

            {/* Stage 4a: Designation */}
            <p
              ref={roleRef}
              className="mt-0.5 font-sans text-[13px] sm:text-[13.5px] text-[#52525B] leading-[1.45] line-clamp-2 will-change-transform"
            >
              {member.role}
            </p>
          </div>

          {/* Subtle Profile-View Micro Indicator */}
          <span
            aria-hidden="true"
            className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#71717A] transition-colors duration-200 group-hover/card:text-[#0A5FD7] shrink-0"
          >
            <span className="hidden sm:inline">View</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </span>
        </button>

        {/* Stage 4b: Expanding Horizontal Blue Accent Bar & Experience */}
        <div className="mt-2.5 flex items-center gap-3">
          <div
            ref={accentLineRef}
            aria-hidden="true"
            className="h-[2px] w-8 rounded-full bg-[#0A5FD7] shrink-0 will-change-transform"
          />
          {member.experience && (
            <p
              ref={experienceRef}
              className="font-sans text-[12px] sm:text-[12.5px] font-medium text-[#71717A] leading-tight truncate will-change-transform"
            >
              {member.experience}
            </p>
          )}
        </div>

        {/* Stage 5: Horizontally Centered Enabled Social Links */}
        {hasSocials && (
          <div className="mt-3.5 pt-3 border-t border-[#18181B]/8 flex justify-center">
            <SocialLinksRow
              memberName={member.name}
              socials={member.socials}
              variant="modal"
              centered
              registerIconRef={(idx, el) => {
                socialIconRefs.current[idx] = el;
              }}
            />
          </div>
        )}

        {/* Subtle Bottom Hairline Separator */}
        <div
          ref={bottomDividerRef}
          aria-hidden="true"
          className="mt-3.5 h-[1px] w-full bg-[#18181B]/14 transition-colors duration-300 group-hover/card:bg-[#0A5FD7]/50 will-change-transform"
        />
      </div>
    </article>
  );
};

LeadershipFounderCard.displayName = "LeadershipFounderCard";
