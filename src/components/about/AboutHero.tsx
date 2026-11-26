"use client";

import React, { useEffect, useRef } from "react";
import { ABOUT_CONTENT } from "@/config/team";
import { initAboutHeroAnimation } from "./animations/aboutAnimations";
import styles from "./about.module.css";

export const AboutHero: React.FC = () => {
  const {
    headlineLine1,
    headlineAccentPrefix,
    headlineAccentWord,
    description,
    watermarkLines,
  } = ABOUT_CONTENT.hero;

  const line1Words = headlineLine1.split(" ");
  const line2PrefixWords = headlineAccentPrefix.split(" ");

  const sectionRef = useRef<HTMLElement | null>(null);
  const watermarkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const accentRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = initAboutHeroAnimation({
      section: sectionRef.current,
      watermarks: watermarkRefs.current.filter((el): el is HTMLDivElement => Boolean(el)),
      words: wordRefs.current.filter((el): el is HTMLSpanElement => Boolean(el)),
      underline: underlineRef.current,
      description: descRef.current,
      divider: dividerRef.current,
      accents: accentRefs.current.filter((el): el is HTMLSpanElement => Boolean(el)),
    });

    return () => {
      ctx.revert();
    };
  }, []);

  let wordIdx = 0;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-heading"
      /*
        Full initial viewport framing:
        - -mt-28 sm:-mt-32 pulls background seamlessly under layout <main pt-28 sm:pt-32>
        - min-h-[100svh] ensures ONLY the hero appears inside the first browser screen
      */
      className="relative w-full min-h-[100svh] -mt-28 sm:-mt-32 pt-28 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6] to-[#FFFFFF] select-none"
    >
      {/* Oversized Subtle Italic Serif Background Watermark Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col justify-between py-24 sm:py-28 overflow-hidden"
      >
        {watermarkLines.map((line, index) => (
          <div
            key={line}
            ref={(el) => {
              watermarkRefs.current[index] = el;
            }}
            className={`${styles.editorialSerif} italic whitespace-nowrap text-[84px] sm:text-[138px] md:text-[176px] lg:text-[215px] font-normal tracking-[-0.025em] leading-[0.9] text-[#18181B]/[0.042] will-change-transform ${
              index === 1 ? "-ml-24 sm:-ml-36" : index === 2 ? "ml-10 sm:ml-24" : "-ml-10"
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Subtle Minimal Geometric Accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto max-w-[1360px]">
        <span
          ref={(el) => {
            accentRefs.current[0] = el;
          }}
          className="hidden sm:block absolute left-[10%] top-[44%] h-2 w-2 rounded-full bg-[#0A5FD7]/35"
        />
        <span
          ref={(el) => {
            accentRefs.current[1] = el;
          }}
          className="hidden sm:block absolute right-[12%] top-[36%] h-3 w-3 rounded-full border border-[#0A5FD7]/35"
        />
        <span
          ref={(el) => {
            accentRefs.current[2] = el;
          }}
          className="hidden md:block absolute left-[22%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-[#18181B]/20"
        />
      </div>

      {/* Centered Editorial Composition */}
      <div className="relative z-10 mx-auto w-full max-w-[920px] px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Main Editorial Serif Headline */}
        <h1
          id="about-hero-heading"
          className={`${styles.editorialSerif} text-[48px] min-[390px]:text-[54px] sm:text-[72px] md:text-[86px] lg:text-[98px] font-medium tracking-[-0.02em] leading-[1.03] text-[#18181B]`}
        >
          {/* Line 1: Great work is never */}
          <span className="block">
            {line1Words.map((word, idx) => {
              const currentIdx = wordIdx++;
              const isSoftTone = word.toLowerCase() === "never";
              return (
                <React.Fragment key={`l1-${word}-${idx}`}>
                  <span className="inline-block overflow-hidden align-top pb-1">
                    <span
                      ref={(el) => {
                        wordRefs.current[currentIdx] = el;
                      }}
                      className={`inline-block will-change-transform ${
                        isSoftTone ? "italic font-normal text-[#18181B]/65" : ""
                      }`}
                    >
                      {word}
                    </span>
                  </span>
                  {idx < line1Words.length - 1 ? " " : ""}
                </React.Fragment>
              );
            })}
          </span>{" "}

          {/* Line 2: built alone. */}
          <span className="block mt-1">
            {line2PrefixWords.map((word, idx) => {
              const currentIdx = wordIdx++;
              return (
                <React.Fragment key={`l2-${word}-${idx}`}>
                  <span className="inline-block overflow-hidden align-top pb-1">
                    <span
                      ref={(el) => {
                        wordRefs.current[currentIdx] = el;
                      }}
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </span>
                  </span>{" "}
                </React.Fragment>
              );
            })}
            <span className="inline-block overflow-hidden align-top pb-2">
              <span
                ref={(el) => {
                  wordRefs.current[wordIdx++] = el;
                }}
                className="relative inline-block will-change-transform"
              >
                {headlineAccentWord}
                {/* Subtle Brivya blue underline beneath "alone" */}
                <span
                  ref={underlineRef}
                  aria-hidden="true"
                  className="absolute left-0 right-1 bottom-1 sm:bottom-1.5 h-[2.5px] sm:h-[3px] rounded-full bg-[#0A5FD7] origin-left"
                />
              </span>
            </span>
          </span>
        </h1>

        {/* Supporting Centered Paragraph */}
        <p
          ref={descRef}
          className="mt-7 sm:mt-9 max-w-[600px] font-sans text-[14.5px] sm:text-[16.5px] leading-[1.72] text-[#52525B] font-normal tracking-[-0.005em] will-change-transform"
        >
          {description}
        </p>

        {/* Thin Horizontal Decorative Divider Below Introduction */}
        <div
          ref={dividerRef}
          aria-hidden="true"
          className="mt-8 sm:mt-10 h-[1px] w-16 sm:w-24 bg-[#18181B]/25 origin-left will-change-transform"
        />
      </div>
    </section>
  );
};
