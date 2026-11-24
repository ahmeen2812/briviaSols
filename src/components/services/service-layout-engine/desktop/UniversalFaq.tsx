"use client";

import React, { useState } from "react";
import { UniversalServicePageConfig } from "../types";

interface UniversalFaqProps {
  config: UniversalServicePageConfig["faq"];
}

export const UniversalFaq: React.FC<UniversalFaqProps> = ({ config }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full max-w-[1040px] mx-auto mb-20 select-none">
      <div className="mb-10 text-center">
        <span className="font-mono text-[11px] font-bold text-[#0A5FD7] uppercase tracking-wider block mb-2">
          Frequently Asked Questions
        </span>
        <h2 className="font-sans text-[32px] font-extrabold text-[#06162C] tracking-tight">
          {config.heading}
        </h2>
      </div>

      <div className="space-y-4">
        {config.items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-[rgba(137,152,173,0.25)] bg-white/70 backdrop-blur-xs transition-colors duration-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1675F8]"
              >
                <span className="font-sans text-[17px] font-semibold text-[#06162C]">
                  {item.question}
                </span>
                <span className={`font-mono text-lg text-[#0A5FD7] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-[15px] leading-relaxed text-[#475569] font-normal border-t border-[rgba(137,152,173,0.15)]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
