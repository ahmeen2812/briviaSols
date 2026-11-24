"use client";

import React from "react";
import { UniversalServicePageConfig } from "../types";

interface UniversalMobileEcosystemGridProps {
  config?: UniversalServicePageConfig["officialEcosystem"];
}

export const UniversalMobileEcosystemGrid: React.FC<UniversalMobileEcosystemGridProps> = ({ config }) => {
  if (!config) return null;
  return (
    <section className="relative w-full space-y-3 select-none">
      <div className="mb-2">
        <span className="font-mono text-[10px] font-bold text-[#0A5FD7] uppercase tracking-wider block mb-1">
          {config.tag}
        </span>
        <h3 className="font-sans text-[20px] font-extrabold text-[#06162C]">
          {config.heading}
        </h3>
      </div>
      <div className="space-y-3">
        {config.items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-[rgba(137,152,173,0.2)] bg-white p-4"
          >
            <h4 className="font-sans text-[15px] font-bold text-[#06162C]">{item.title}</h4>
            <p className="font-sans text-[12.5px] text-[#475569] mt-1 leading-relaxed">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};
