"use client";

import React, { useState } from "react";
import { UniversalServicePageConfig } from "../types";

interface UniversalMobileFaqProps {
  config: UniversalServicePageConfig["faq"];
}

export const UniversalMobileFaq: React.FC<UniversalMobileFaqProps> = ({ config }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative w-full select-none mb-10">
      <h3 className="font-sans text-[22px] font-extrabold text-[#06162C] mb-4">
        {config.heading}
      </h3>
      <div className="space-y-3">
        {config.items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="rounded-xl border border-[rgba(137,152,173,0.25)] bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-sans text-[15px] font-semibold text-[#06162C]">{item.question}</span>
                <span className="font-mono text-base text-[#0A5FD7]">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-[13.5px] leading-relaxed text-[#475569] border-t border-[rgba(137,152,173,0.15)]">
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
