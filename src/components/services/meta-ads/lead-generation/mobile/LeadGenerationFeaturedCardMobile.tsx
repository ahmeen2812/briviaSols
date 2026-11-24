import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateFeaturedCardMobile } from "@/components/services/template/mobile/TemplateFeaturedCardMobile";

export const LeadGenerationFeaturedCardMobile: React.FC = () => {
  return <TemplateFeaturedCardMobile data={LEAD_GENERATION_CONTENT.mainFeaturedCard} />;
};
