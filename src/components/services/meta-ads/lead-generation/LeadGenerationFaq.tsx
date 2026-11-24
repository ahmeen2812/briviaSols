import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateFaqDesktop } from "@/components/services/template/desktop/TemplateFaqDesktop";

export const LeadGenerationFaq: React.FC = () => {
  return <TemplateFaqDesktop data={LEAD_GENERATION_CONTENT.faq} />;
};
