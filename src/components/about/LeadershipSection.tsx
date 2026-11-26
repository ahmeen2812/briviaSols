"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { TeamMember, ABOUT_CONTENT } from "@/config/team";
import { LeadershipFounderCard } from "./LeadershipFounderCard";
import {
  initLeadershipHeaderReveal,
  ModalFlipOriginRect,
} from "./animations/aboutAnimations";
import styles from "./about.module.css";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface LeadershipSectionProps {
  readonly members: readonly TeamMember[];
  readonly availableImages: Record<string, boolean>;
  readonly onSelectMember: (
    member: TeamMember,
    triggerEl: HTMLElement | null,
    originRect: ModalFlipOriginRect | null
  ) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  members,
  availableImages,
  onSelectMember,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || members.length === 0) return;

    const ctx = initLeadershipHeaderReveal({
      section: sectionRef.current,
      header: headerRef.current,
      divider: dividerRef.current,
    });

    return () => {
      ctx.revert();
    };
  }, [members.length]);

  if (members.length === 0) {
    return null;
  }

  return (
    <section
      id="about-leadership"
      ref={sectionRef}
      aria-labelledby="about-leadership-heading"
      className="relative w-full scroll-mt-24 bg-[#FFFFFF] pt-14 sm:pt-20 pb-12 sm:pb-16 select-none"
    >
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 md:px-8">
        {/* Editorial Section Heading */}
        <div
          ref={headerRef}
          className="mb-9 sm:mb-12 flex flex-col items-center text-center will-change-transform"
        >
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#0A5FD7]">
            {ABOUT_CONTENT.sections.leadershipEyebrow}
          </span>
          <h2
            id="about-leadership-heading"
            className={`${styles.editorialSerif} mt-2 text-[32px] sm:text-[42px] md:text-[48px] font-medium tracking-[-0.02em] leading-[1.1] text-[#18181B]`}
          >
            {ABOUT_CONTENT.sections.leadershipHeading}
          </h2>
          <div
            ref={dividerRef}
            aria-hidden="true"
            className="mt-4 h-[1px] w-16 bg-[#0A5FD7]/35"
          />
        </div>

        {/* Dynamic Leadership Grid (Taller 4:5 uncropped frames, max 3 columns on desktop, centered duo) */}
        <div className="flex flex-wrap justify-center gap-7 sm:gap-9 lg:gap-11">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="w-full sm:w-[calc(50%-1.125rem)] lg:w-[calc(33.333%-1.85rem)] max-w-[420px]"
            >
              <LeadershipFounderCard
                member={member}
                index={index}
                isImageAvailable={Boolean(availableImages[member.image])}
                onSelect={onSelectMember}
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
