"use client";

import React from "react";
import { SocialPlatformKey, TeamSocialLinks, getActiveSocialLinks } from "@/config/team";

interface SocialLinksRowProps {
  readonly memberName: string;
  readonly socials: TeamSocialLinks;
  readonly variant?: "overlay" | "modal";
  readonly centered?: boolean;
  readonly registerIconRef?: (index: number, el: HTMLAnchorElement | null) => void;
  readonly className?: string;
}

const PLATFORM_LABELS: Record<SocialPlatformKey, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
  instagram: "Instagram",
  fiverr: "Fiverr",
  upwork: "Upwork",
  portfolio: "Portfolio Website",
  behance: "Behance",
  dribbble: "Dribbble",
};

const SocialPlatformGlyph: React.FC<{ platform: SocialPlatformKey; className?: string }> = ({
  platform,
  className = "h-4 w-4",
}) => {
  switch (platform) {
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <g transform="translate(2, 2) scale(0.833333)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </g>
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "fiverr":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.35 4.8c-2.25 0-3.75 1.38-3.75 3.62V9.8H6.8v2.65h1.8V19h3.15v-6.55h2.25V9.8h-2.25V8.65c0-.72.42-1.15 1.18-1.15h1.12V4.8h-1.7z" />
          <rect x="14.75" y="9.8" width="3.1" height="9.2" />
          <circle cx="16.3" cy="6.4" r="1.65" />
        </svg>
      );
    case "upwork":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <g transform="translate(1.2, 1.8) scale(0.9)">
            <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
          </g>
        </svg>
      );
    case "portfolio":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19" />
          <path d="M12 2.5a14.5 14.5 0 0 1 0 19a14.5 14.5 0 0 1 0-19z" />
        </svg>
      );
    case "behance":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <g transform="translate(1.5, 1.5) scale(0.875)">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
          </g>
        </svg>
      );
    case "dribbble":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 12 3.475zm-3.633.803a53.896 53.896 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 0 1-2.19-5.705zM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 0 1 1.823 6.475 8.4 8.4 0 0 1-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715z" />
        </svg>
      );
  }
};

export const SocialLinksRow: React.FC<SocialLinksRowProps> = ({
  memberName,
  socials,
  variant = "overlay",
  centered = false,
  registerIconRef,
  className = "",
}) => {
  const activeLinks = getActiveSocialLinks(socials);

  if (activeLinks.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap items-center ${
        centered ? "justify-center gap-3 w-full mx-auto" : "gap-2.5"
      } ${className}`}
      aria-label={`${memberName} social profiles`}
      onClick={(e) => e.stopPropagation()}
    >
      {activeLinks.map((item, idx) => {
        const platformTitle = PLATFORM_LABELS[item.platform];
        const isOverlay = variant === "overlay";

        return (
          <a
            key={item.platform}
            ref={(el) => {
              if (registerIconRef) registerIconRef(idx, el);
            }}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${memberName} on ${platformTitle}`}
            title={platformTitle}
            onClick={(e) => e.stopPropagation()}
            className={
              isOverlay
                ? /* Dark surface inverting cleanly to light surface + dark icon on hover/focus */
                  "flex h-9 w-9 items-center justify-center rounded-full bg-[#06162C]/85 text-white border border-white/25 backdrop-blur-md shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:text-[#06162C] hover:border-white hover:scale-105 hover:-translate-y-0.5 focus-visible:bg-white focus-visible:text-[#06162C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                : /* Light surface inverting cleanly to dark surface + light icon on hover/focus */
                  "flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F7FC] text-[#06162C] border border-[#DCE6F4] shadow-2xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#06162C] hover:text-white hover:border-[#06162C] hover:scale-105 hover:-translate-y-0.5 focus-visible:bg-[#06162C] focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
            }
          >
            <SocialPlatformGlyph
              platform={item.platform}
              className={isOverlay ? "h-4 w-4" : "h-[18px] w-[18px]"}
            />
          </a>
        );
      })}
    </div>
  );
};
