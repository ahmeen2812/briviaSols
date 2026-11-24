"use client";

import React from "react";
import { UniversalServicePageConfig } from "../types";

interface UniversalEcosystemGridProps {
  config?: UniversalServicePageConfig["officialEcosystem"];
}

export const UniversalEcosystemGrid: React.FC<UniversalEcosystemGridProps> = ({ config }) => {
  if (!config) return null;
  return (
    <section className="relative w-full mb-16 select-none">
      <div className="max-w-[840px] mb-8">
        <span className="font-mono text-[11px] font-bold text-[#0A5FD7] uppercase tracking-wider block mb-2">
          {config.tag}
        </span>
        <h2 className="font-sans text-[30px] font-extrabold text-[#06162C] tracking-tight">
          {config.heading}
        </h2>
        <p className="mt-2 font-sans text-[15px] text-[#475569] leading-relaxed">
          {config.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-[rgba(137,152,173,0.2)] bg-white/60 p-5 hover:border-[#1675F8]/40 hover:bg-white transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="font-sans text-[16px] font-bold text-[#06162C] mb-1">
                {item.title}
              </h3>
              <p className="font-sans text-[13px] text-[#475569] leading-relaxed">
                {item.description}
              </p>
            </div>
            <span className="font-mono text-[11px] text-[#0A5FD7] mt-4 block">Official Resource ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
};
