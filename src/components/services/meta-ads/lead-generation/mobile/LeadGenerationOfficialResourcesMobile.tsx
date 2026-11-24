import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateOfficialResourcesMobile } from "@/components/services/template/mobile/TemplateOfficialResourcesMobile";

export const LeadGenerationOfficialResourcesMobile: React.FC = () => {
  return <TemplateOfficialResourcesMobile data={LEAD_GENERATION_CONTENT.officialResources} />;
};
