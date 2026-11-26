"use client";

import React, { useEffect, useRef } from "react";
import { TeamMember, ABOUT_CONTENT } from "@/config/team";
import { TeamMemberCard, TeamCardScrollTargets } from "./TeamMemberCard";
import { initTeamSectionAnimation, ModalFlipOriginRect } from "./animations/aboutAnimations";
import styles from "./about.module.css";

export interface EmployeeSectionProps {
  readonly members: readonly TeamMember[];
  readonly availableImages: Record<string, boolean>;
  readonly onSelectMember: (
    member: TeamMember,
    triggerEl: HTMLElement | null,
    originRect: ModalFlipOriginRect | null
  ) => void;
}

export const EmployeeSection: React.FC<EmployeeSectionProps> = ({
  members,
  availableImages,
  onSelectMember,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardTargetsRef = useRef<TeamCardScrollTargets[]>([]);

  useEffect(() => {
    if (!sectionRef.current || members.length === 0) return;

    const validTargets = cardTargetsRef.current.slice(0, members.length);
    const ctx = initTeamSectionAnimation({
      section: sectionRef.current,
      header: headerRef.current,
      cards: validTargets,
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
      ref={sectionRef}
      aria-labelledby="about-team-heading"
      className="relative w-full bg-[#FFFFFF] pt-8 sm:pt-12 pb-14 sm:pb-20 select-none"
    >
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 md:px-8">
        <div
          aria-hidden="true"
          className="mb-10 sm:mb-14 h-[1px] w-full bg-[#18181B]/10"
        />

        <div
          ref={headerRef}
          className="mb-8 sm:mb-11 flex flex-col items-center text-center will-change-transform"
        >
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#0A5FD7]">
            {ABOUT_CONTENT.sections.employeeEyebrow}
          </span>
          <h2
            id="about-team-heading"
            className={`${styles.editorialSerif} mt-2 text-[28px] sm:text-[36px] md:text-[42px] font-medium tracking-[-0.02em] leading-[1.12] text-[#18181B]`}
          >
            {ABOUT_CONTENT.sections.employeeHeading}
          </h2>
        </div>

        {/* Dynamic Portrait Grid: 4 cols desktop, 3 medium, 2 mobile */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
          {members.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              variant="employee"
              isImageAvailable={Boolean(availableImages[member.image])}
              onSelect={onSelectMember}
              registerScrollTargets={(targets) => {
                cardTargetsRef.current[index] = targets;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
