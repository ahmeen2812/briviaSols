"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UniversalServicePageConfig } from "../types";

interface UniversalMobileHeroProps {
  config: UniversalServicePageConfig["hero"];
}

export const UniversalMobileHero: React.FC<UniversalMobileHeroProps> = ({ config }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full pt-2 pb-8 select-none overflow-x-clip">
      <div className="flex flex-col space-y-6">
        <div>
          <span className="font-mono text-[10px] font-bold text-[#0A5FD7] uppercase tracking-wider block mb-2">
            {config.serviceTitle}
          </span>
          <h1 className="font-sans text-[28px] sm:text-[34px] font-extrabold text-[#07366D] leading-[1.12] tracking-tight">
            {config.heading}
          </h1>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#475569]">
            {config.description}
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] max-w-[340px] mx-auto flex items-center justify-center">
          {!imageError ? (
            <Image
              src={config.imagePath}
              alt={config.imageAlt}
              fill
              sizes="340px"
              className="object-contain"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-slate-100 rounded-2xl border border-slate-300">
              <span className="font-mono text-[10px] text-slate-500">Image: {config.imagePath}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
