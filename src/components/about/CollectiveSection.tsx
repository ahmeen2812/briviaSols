"use client";

import React, { useEffect, useRef } from "react";
import { ABOUT_CONTENT } from "@/config/team";
import { TeamImageFrame } from "./TeamImageFrame";
import { initCollectiveSectionAnimation } from "./animations/aboutAnimations";
import styles from "./about.module.css";

export interface CollectiveSectionProps {
  readonly isImageAvailable: boolean;
}

export const CollectiveSection: React.FC<CollectiveSectionProps> = ({ isImageAvailable }) => {
  const { eyebrow, headline, description, image, imageAlt, watermarkWords } =
    ABOUT_CONTENT.collective;

  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaFrameRef = useRef<HTMLDivElement | null>(null);
  const mediaInnerRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const validContent = contentRefs.current.filter((el): el is HTMLElement => Boolean(el));
    const ctx = initCollectiveSectionAnimation({
      section: sectionRef.current,
      mediaFrame: mediaFrameRef.current,
      mediaInner: mediaInnerRef.current,
      watermark: watermarkRef.current,
      contentItems: validContent,
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-collective-heading"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAFBFD] to-[#F4F7FC] pt-4 sm:pt-8 pb-12 sm:pb-16 select-none"
    >
      {/* Oversized Subtle Italic Background Watermark Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 overflow-hidden"
      >
        <div
          ref={watermarkRef}
          className={`${styles.editorialSerif} italic whitespace-nowrap text-[84px] sm:text-[138px] md:text-[176px] font-normal tracking-[-0.025em] leading-none text-[#18181B]/[0.036] will-change-transform`}
        >
          {watermarkWords.join(" · ")} · {watermarkWords[0]}
        </div>
      </div>

      {/* Full-Width Collective Team Photograph */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8">
        <div
          ref={mediaFrameRef}
          className="relative w-full aspect-[16/10] sm:aspect-[2/1] rounded-2xl border border-[#18181B]/10 bg-[#EFECE6] shadow-[0_24px_60px_-18px_rgba(6,22,44,0.12)] overflow-hidden will-change-transform"
        >
          <div ref={mediaInnerRef} className="w-full h-full will-change-transform">
            <TeamImageFrame
              src={image}
              alt={imageAlt}
              variant="collective"
              fitMode="cover"
              objectPosition="50% 35%"
              isAvailable={isImageAvailable}
              sizes="(max-width: 768px) 96vw, (max-width: 1400px) 92vw, 1360px"
            />
          </div>
        </div>
      </div>

      {/* Editorial Closing Statement */}
      <div className="relative z-10 mx-auto w-full max-w-[820px] px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-2 sm:pb-4 flex flex-col items-center text-center">
        <span
          ref={(el) => {
            contentRefs.current[0] = el;
          }}
          className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#0A5FD7] will-change-transform"
        >
          {eyebrow}
        </span>

        <h2
          id="about-collective-heading"
          ref={(el) => {
            contentRefs.current[1] = el;
          }}
          className={`${styles.editorialSerif} mt-3 sm:mt-4 text-[34px] sm:text-[46px] md:text-[56px] font-medium tracking-[-0.02em] leading-[1.08] text-[#18181B] will-change-transform`}
        >
          {headline}
        </h2>

        <p
          ref={(el) => {
            contentRefs.current[2] = el;
          }}
          className="mt-4 max-w-[600px] font-sans text-[14.5px] sm:text-[16px] leading-[1.68] text-[#52525B] font-normal will-change-transform"
        >
          {description}
        </p>
      </div>
    </section>
  );
};
