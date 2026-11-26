"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ABOUT_CONTENT,
  TeamMember,
  leadershipMembers,
  employeeMembers,
} from "@/config/team";
import { AboutHero } from "./AboutHero";
import { LeadershipSection } from "./LeadershipSection";
import { EmployeeSection } from "./EmployeeSection";
import { CollectiveSection } from "./CollectiveSection";
import { TeamMemberModal } from "./TeamMemberModal";
import { ModalFlipOriginRect } from "./animations/aboutAnimations";
import { SearchCta } from "@/components/services/google-ads/search/SearchCta";
import { Footer } from "@/components/footer";

export interface AboutPageClientProps {
  readonly availableImages: Record<string, boolean>;
}

export const AboutPageClient: React.FC<AboutPageClientProps> = ({ availableImages }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalOriginRect, setModalOriginRect] = useState<ModalFlipOriginRect | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Recalculate ScrollTrigger coordinates cleanly post-hydration, font load, image load & resize
  useEffect(() => {
    const refreshTriggers = () => ScrollTrigger.refresh();
    const timer = setTimeout(refreshTriggers, 250);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refreshTriggers).catch(() => {});
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshTriggers, 180);
    };

    window.addEventListener("load", refreshTriggers, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("load", refreshTriggers);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectMember = useCallback(
    (
      member: TeamMember,
      triggerEl: HTMLElement | null,
      originRect: ModalFlipOriginRect | null
    ) => {
      returnFocusRef.current = triggerEl;
      setModalOriginRect(originRect);
      setSelectedMember(member);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setSelectedMember(null);
    setModalOriginRect(null);
    const triggerEl = returnFocusRef.current;
    if (triggerEl && typeof triggerEl.focus === "function") {
      requestAnimationFrame(() => triggerEl.focus());
    }
  }, []);

  return (
    <div className="relative w-full overflow-x-clip bg-[#FFFFFF]">
      {/* 1. About Hero */}
      <AboutHero />

      {/* 2. Leadership Team Section */}
      <LeadershipSection
        members={leadershipMembers}
        availableImages={availableImages}
        onSelectMember={handleSelectMember}
      />

      {/* 3. Employee Team Section */}
      <EmployeeSection
        members={employeeMembers}
        availableImages={availableImages}
        onSelectMember={handleSelectMember}
      />

      {/* 4 & 5. Collective Team Photograph + Editorial Closing Content */}
      <CollectiveSection
        isImageAvailable={Boolean(availableImages[ABOUT_CONTENT.collective.image])}
      />

      {/* 6. Reused Full Service-Style CTA Section (Seamless #F4F7FC backdrop into Footer) */}
      <div className="w-full flow-root bg-[#F4F7FC] pt-4 sm:pt-6">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8">
          <SearchCta ctaOverride={ABOUT_CONTENT.cta} useScrubStagger />
        </div>
      </div>

      {/* 7. Existing Global Footer */}
      <Footer />

      {/* Expanding FLIP Profile Modal */}
      <TeamMemberModal
        member={selectedMember}
        isImageAvailable={selectedMember ? Boolean(availableImages[selectedMember.image]) : false}
        originRect={modalOriginRect}
        onClose={handleCloseModal}
      />
    </div>
  );
};
