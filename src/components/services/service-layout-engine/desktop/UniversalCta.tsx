"use client";

import React from "react";
import Link from "next/link";
import { UniversalServicePageConfig } from "../types";

interface UniversalCtaProps {
  config: UniversalServicePageConfig["cta"];
}

export const UniversalCta: React.FC<UniversalCtaProps> = ({ config }) => {
  return (
    <section className="relative w-full rounded-3xl border border-[#07366D]/30 bg-gradient-to-br from-[#061B3A] via-[#072B5E] to-[#0A5FD7] p-10 md:p-14 text-white shadow-xl select-none mb-16 overflow-hidden">
      <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center">
        <h2 className="font-sans text-[30px] sm:text-[38px] font-extrabold tracking-tight leading-tight mb-4">
          {config.heading}
        </h2>
        <p className="font-sans text-[16px] text-white/80 leading-relaxed max-w-[620px] mb-8 font-normal">
          {config.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/start-project"
            className="rounded-full bg-white text-[#06162C] font-sans text-sm font-semibold px-8 py-3.5 shadow-md hover:bg-[#F4F7FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {config.primaryButtonText}
          </Link>
          <Link
            href="/start-project"
            className="rounded-full border border-white/40 text-white font-sans text-sm font-semibold px-8 py-3.5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {config.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
};
