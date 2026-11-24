import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateFeaturedCardDesktop } from "@/components/services/template/desktop/TemplateFeaturedCardDesktop";

export const LeadGenerationFeaturedCard: React.FC = () => {
  return <TemplateFeaturedCardDesktop data={LEAD_GENERATION_CONTENT.mainFeaturedCard} />;
};
