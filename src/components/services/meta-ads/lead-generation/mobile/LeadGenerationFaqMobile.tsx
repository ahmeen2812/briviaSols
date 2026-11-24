import React from "react";
import { LEAD_GENERATION_CONTENT } from "@/config/services/metaAds/leadGeneration";
import { TemplateFaqMobile } from "@/components/services/template/mobile/TemplateFaqMobile";

export const LeadGenerationFaqMobile: React.FC = () => {
  return <TemplateFaqMobile data={LEAD_GENERATION_CONTENT.faq} />;
};
