"use client";

import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Project,
  WorkCategoryWithCount,
  WORK_PAGE_CONTENT,
} from "@/data/projects";
import { WorkHero } from "./WorkHero";
import { WorkArchive } from "./WorkArchive";
import { SearchCta } from "@/components/services/google-ads/search/SearchCta";
import { Footer } from "@/components/footer";

export interface WorkPageClientProps {
  readonly allPublishedProjects: readonly Project[];
  readonly availableCategories: readonly WorkCategoryWithCount[];
  readonly heroPrimaryProject: Project;
  readonly heroSecondaryProject: Project;
}

export const WorkPageClient: React.FC<WorkPageClientProps> = ({
  allPublishedProjects,
  availableCategories,
  heroPrimaryProject,
  heroSecondaryProject,
}) => {
  useEffect(() => {
    const refreshTriggers = () => ScrollTrigger.refresh();
    const timer = setTimeout(refreshTriggers, 240);

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

  return (
    <div className="relative w-full overflow-x-clip bg-[#F4F7FC]">
      {/* 1. Dedicated Editorial Work Hero */}
      <WorkHero
        primaryProject={heroPrimaryProject}
        secondaryProject={heroSecondaryProject}
      />

      {/* 2. Interactive 2-Column Category & Project Archive */}
      <WorkArchive
        allPublishedProjects={allPublishedProjects}
        availableCategories={availableCategories}
      />

      {/* 3. Reused Universal Service CTA Section (Seamless #F4F7FC transition into Footer) */}
      <div className="w-full flow-root bg-[#F4F7FC] pt-4 sm:pt-6">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8">
          <SearchCta ctaOverride={WORK_PAGE_CONTENT.cta} useScrubStagger />
        </div>
      </div>

      {/* 4. Reused Universal Site Footer */}
      <Footer />
    </div>
  );
};
