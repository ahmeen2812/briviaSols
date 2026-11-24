"use client";

import React from "react";
import Link from "next/link";
import { UniversalServicePageConfig } from "../types";

interface UniversalMobileCtaProps {
  config: UniversalServicePageConfig["cta"];
}

export const UniversalMobileCta: React.FC<UniversalMobileCtaProps> = ({ config }) => {
  return (
    <section className="relative w-full rounded-2xl bg-gradient-to-br from-[#061B3A] via-[#072B5E] to-[#0A5FD7] p-6 text-white text-center select-none mb-12">
      <h3 className="font-sans text-[22px] font-extrabold tracking-tight mb-2">
        {config.heading}
      </h3>
      <p className="font-sans text-[13.5px] text-white/80 leading-relaxed mb-6">
        {config.description}
      </p>
      <div className="flex flex-col gap-3">
        <Link
          href="/start-project"
          className="rounded-full bg-white text-[#06162C] font-sans text-xs font-semibold py-3 shadow-md"
        >
          {config.primaryButtonText}
        </Link>
        <Link
          href="/start-project"
          className="rounded-full border border-white/40 text-white font-sans text-xs font-semibold py-3"
        >
          {config.secondaryButtonText}
        </Link>
      </div>
    </section>
  );
};
