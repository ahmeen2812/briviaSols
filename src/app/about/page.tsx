import type { Metadata } from "next";
import { ABOUT_CONTENT, teamMembers } from "@/config/team";
import { AboutPageClient } from "@/components/about/AboutPageClient";
import { resolveAvailablePublicImages } from "@/lib/teamMedia";

export const metadata: Metadata = {
  title: ABOUT_CONTENT.seo.title,
  description: ABOUT_CONTENT.seo.description,
};

export default function AboutPage() {
  const imagePaths = [
    ...teamMembers.map((member) => member.image),
    ABOUT_CONTENT.collective.image,
  ];
  const availableImages = resolveAvailablePublicImages(imagePaths);

  return <AboutPageClient availableImages={availableImages} />;
}
