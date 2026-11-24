import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateSupportingCardsMobile } from "@/components/services/template/mobile/TemplateSupportingCardsMobile";

export const LeadGenerationSupportingCardsMobile: React.FC = () => {
  return <TemplateSupportingCardsMobile data={LEAD_GENERATION_CONTENT.supportingCards} />;
};
