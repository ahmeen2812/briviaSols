"use client";

import React from "react";
import { UniversalServicePageConfig } from "../types";

interface UniversalMobileAlternatingCardsProps {
  config: UniversalServicePageConfig["supportingArchitecture"];
}

export const UniversalMobileAlternatingCards: React.FC<UniversalMobileAlternatingCardsProps> = ({ config }) => {
  return (
    <section className="relative w-full flex flex-col space-y-4 select-none">
      <div className="mb-2">
        <span className="font-mono text-[10px] font-bold text-[#0A5FD7] uppercase tracking-wider block mb-1">
          Architecture Ecosystem Matrix
        </span>
        <h2 className="font-sans text-[22px] font-extrabold text-[#06162C] leading-snug tracking-tight">
          {config.heading}
        </h2>
        <p className="mt-1 font-sans text-[13.5px] text-[#475569] leading-relaxed">
          {config.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {config.items.map((item) => (
          <div
            key={item.index}
            className="rounded-2xl border border-[#BACFE6] bg-[#FFFFFF] p-5 shadow-xs"
          >
            <span className="font-mono text-[10px] font-bold text-[#0A5FD7] block mb-1">
              MODULE // {item.index}
            </span>
            <h3 className="font-sans text-[17px] font-bold text-[#06162C] mb-2">
              {item.title}
            </h3>
            <p className="font-sans text-[13.5px] text-[#475569] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
