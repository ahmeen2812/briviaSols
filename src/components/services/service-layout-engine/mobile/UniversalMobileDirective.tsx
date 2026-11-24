"use client";

import React from "react";
import { UniversalServicePageConfig } from "../types";

interface UniversalMobileDirectiveProps {
  config: UniversalServicePageConfig["directiveConsole"];
}

export const UniversalMobileDirective: React.FC<UniversalMobileDirectiveProps> = ({ config }) => {
  return (
    <section className="relative w-full rounded-2xl border border-[#BACFE6] bg-[#FFFFFF] p-6 shadow-sm select-none">
      <span className="font-mono text-[10px] font-bold text-[#0A5FD7] uppercase tracking-wider block mb-2">
        {config.tag}
      </span>
      <h2 className="font-sans text-[22px] font-extrabold text-[#06162C] leading-snug tracking-tight mb-4">
        {config.heading}
      </h2>
      <div className="space-y-3">
        {config.paragraphs.map((p, idx) => (
          <p key={idx} className="font-sans text-[14px] leading-relaxed text-[#475569]">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
};
