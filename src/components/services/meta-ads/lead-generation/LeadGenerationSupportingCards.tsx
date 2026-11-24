import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateSupportingCardsDesktop } from "@/components/services/template/desktop/TemplateSupportingCardsDesktop";

export const LeadGenerationSupportingCards: React.FC = () => {
  return <TemplateSupportingCardsDesktop data={LEAD_GENERATION_CONTENT.supportingCards} />;
};
