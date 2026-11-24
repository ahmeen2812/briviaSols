import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateCtaDesktop } from "@/components/services/template/desktop/TemplateCtaDesktop";

export const LeadGenerationCta: React.FC = () => {
  return <TemplateCtaDesktop data={LEAD_GENERATION_CONTENT.cta} />;
};
