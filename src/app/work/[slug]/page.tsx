import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/projects";
import { CaseStudyView } from "@/components/work";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getPublishedProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Brivya Solutions",
    };
  }

  return {
    title: `${project.title} — Case Study | Brivya Solutions`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Brivya Solutions Work`,
      description: project.summary,
      images: [
        {
          url: project.coverImage,
          width: 1920,
          height: 1080,
          alt: project.coverAlt,
        },
      ],
    },
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project, 3);

  return <CaseStudyView project={project} relatedProjects={relatedProjects} />;
}
