import type { Metadata } from "next";
import {
  WORK_PAGE_CONTENT,
  getPublishedProjects,
  getAvailableWorkCategories,
  getFeaturedHeroProjects,
} from "@/data/projects";
import { WorkPageClient } from "@/components/work";

export const metadata: Metadata = {
  title: WORK_PAGE_CONTENT.seo.title,
  description: WORK_PAGE_CONTENT.seo.description,
  openGraph: {
    title: WORK_PAGE_CONTENT.seo.title,
    description: WORK_PAGE_CONTENT.seo.description,
    type: "website",
  },
};

export default function WorkPage() {
  const allPublishedProjects = getPublishedProjects();
  const availableCategories = getAvailableWorkCategories();
  const featured = getFeaturedHeroProjects();

  const heroPrimaryProject =
    featured.find((p) => p.id === "scoutine-agent-studio") ??
    featured[0] ??
    allPublishedProjects[0];

  const heroSecondaryProject =
    featured.find((p) => p.id === "hotel-solenne") ??
    featured.find((p) => p.id !== heroPrimaryProject.id) ??
    allPublishedProjects[1] ??
    heroPrimaryProject;

  return (
    <WorkPageClient
      allPublishedProjects={allPublishedProjects}
      availableCategories={availableCategories}
      heroPrimaryProject={heroPrimaryProject}
      heroSecondaryProject={heroSecondaryProject}
    />
  );
}
