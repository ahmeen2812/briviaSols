import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateCtaMobile } from "@/components/services/template/mobile/TemplateCtaMobile";

export const LeadGenerationCtaMobile: React.FC = () => {
  return <TemplateCtaMobile data={LEAD_GENERATION_CONTENT.cta} />;
};
