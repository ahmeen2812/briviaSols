"use client";

import React, { useRef, forwardRef } from "react";
import { TeamMember, getActiveSocialLinks } from "@/config/team";
import { TeamImageFrame } from "./TeamImageFrame";
import { SocialLinksRow } from "./SocialLinksRow";
import { animateCardSocialIcons, ModalFlipOriginRect } from "./animations/aboutAnimations";

export interface TeamCardScrollTargets {
  photoFrame: HTMLElement | null;
  caption: HTMLElement | null;
  divider: HTMLElement | null;
}

export interface TeamMemberCardProps {
  readonly member: TeamMember;
  readonly variant: "leadership" | "employee";
  readonly isImageAvailable: boolean;
  readonly onSelect: (
    member: TeamMember,
    triggerEl: HTMLElement | null,
    originRect: ModalFlipOriginRect | null
  ) => void;
  readonly registerScrollTargets?: (targets: TeamCardScrollTargets) => void;
  readonly priority?: boolean;
}

export const TeamMemberCard = forwardRef<HTMLElement, TeamMemberCardProps>(
  (
    { member, variant, isImageAvailable, onSelect, registerScrollTargets, priority = false },
    ref
  ) => {
    const portraitBoxRef = useRef<HTMLDivElement | null>(null);
    const captionRef = useRef<HTMLDivElement | null>(null);
    const dividerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const activeSocials = getActiveSocialLinks(member.socials);
    const hasSocials = activeSocials.length > 0;
    const isLeadership = variant === "leadership";

    const notifyTargets = () => {
      if (registerScrollTargets) {
        registerScrollTargets({
          photoFrame: portraitBoxRef.current,
          caption: captionRef.current,
          divider: dividerRef.current,
        });
      }
    };

    const handleTriggerClick = () => {
      const rect = portraitBoxRef.current?.getBoundingClientRect();
      const originRect: ModalFlipOriginRect | null = rect
        ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
        : null;
      onSelect(member, triggerRef.current, originRect);
    };

    const handleMouseEnter = () => {
      if (!hasSocials) return;
      const validIcons = socialIconRefs.current.filter(
        (el): el is HTMLAnchorElement => Boolean(el)
      );
      animateCardSocialIcons(validIcons, true);
    };

    const handleMouseLeave = () => {
      if (!hasSocials) return;
      const validIcons = socialIconRefs.current.filter(
        (el): el is HTMLAnchorElement => Boolean(el)
      );
      animateCardSocialIcons(validIcons, false);
    };

    return (
      <article
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group/card relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 will-change-transform"
      >
        {/* Taller 4:5 Portrait Frame with object-fit: contain so full photos remain uncropped */}
        <div
          ref={(el) => {
            portraitBoxRef.current = el;
            notifyTargets();
          }}
          className="relative w-full aspect-[4/5] overflow-hidden rounded-[6px] bg-[#F4F6FA] will-change-transform"
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={handleTriggerClick}
            aria-label={`Open full profile for ${member.name}, ${member.role}`}
            className="block w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] focus-visible:ring-inset active:scale-[0.99] transition-transform duration-200"
          >
            <TeamImageFrame
              src={member.image}
              alt={member.imageAlt}
              variant="portrait"
              fitMode="contain"
              memberName={member.name}
              isAvailable={isImageAvailable}
              priority={priority}
              sizes={
                isLeadership
                  ? "(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 420px"
                  : "(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 310px"
              }
              imageClassName="group-hover/card:scale-[1.035] transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            {/* Restrained Dark Overlay Reveal on Hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06162C]/65 via-[#06162C]/15 to-transparent opacity-0 transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100 group-focus-within/card:opacity-100"
            />
          </button>

          {/* Desktop Hover/Focus Staggered Social Overlay Icons */}
          {hasSocials && (
            <div className="hidden md:flex pointer-events-none absolute inset-x-0 bottom-3.5 z-20 justify-center px-3 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-focus-within/card:opacity-100">
              <div className="pointer-events-auto">
                <SocialLinksRow
                  memberName={member.name}
                  socials={member.socials}
                  variant="overlay"
                  registerIconRef={(idx, el) => {
                    socialIconRefs.current[idx] = el;
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Clean Unboxed Editorial Caption */}
        <div
          ref={(el) => {
            captionRef.current = el;
            notifyTargets();
          }}
          className="pt-3.5 pb-1 will-change-transform"
        >
          <button
            type="button"
            onClick={handleTriggerClick}
            aria-label={`View profile for ${member.name}`}
            className="w-full text-left flex items-start justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7] rounded-xs"
          >
            <div className="min-w-0 flex-1">
              <h3
                className={`font-sans font-semibold tracking-[-0.018em] text-[#18181B] transition-colors duration-200 group-hover/card:text-[#0A5FD7] truncate ${
                  isLeadership
                    ? "text-[17.5px] sm:text-[19px] leading-[1.28]"
                    : "text-[15px] sm:text-[16px] leading-[1.3]"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`mt-0.5 font-sans text-[#52525B] leading-[1.45] line-clamp-2 ${
                  isLeadership ? "text-[13px] sm:text-[13.5px]" : "text-[12px] sm:text-[12.5px]"
                }`}
              >
                {member.role}
              </p>
            </div>

            {/* Subtle Profile-View Micro Indicator */}
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#71717A] transition-colors duration-200 group-hover/card:text-[#0A5FD7] shrink-0"
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

          {/* Touch-friendly Mobile Social Row */}
          {hasSocials && (
            <div className="md:hidden mt-2.5">
              <SocialLinksRow
                memberName={member.name}
                socials={member.socials}
                variant="modal"
                className="gap-2"
              />
            </div>
          )}

          {/* Thin Horizontal Bottom Separator */}
          <div
            ref={(el) => {
              dividerRef.current = el;
              notifyTargets();
            }}
            aria-hidden="true"
            className="mt-3.5 h-[1px] w-full bg-[#18181B]/14 origin-left transition-colors duration-300 group-hover/card:bg-[#0A5FD7]/50 will-change-transform"
          />
        </div>
      </article>
    );
  }
);

TeamMemberCard.displayName = "TeamMemberCard";
