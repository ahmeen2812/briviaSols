import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateOfficialResourcesDesktop } from "@/components/services/template/desktop/TemplateOfficialResourcesDesktop";

export const LeadGenerationOfficialResources: React.FC = () => {
  return <TemplateOfficialResourcesDesktop data={LEAD_GENERATION_CONTENT.officialResources} />;
};
