"use client";

import React, { forwardRef } from "react";
import { FOOTER_SOCIAL_LINKS, SocialLinkItem } from "@/data/footerLinks";

interface SocialIconGlyphProps {
  readonly iconKey: SocialLinkItem["iconKey"];
  readonly className?: string;
}

const SocialIconGlyph: React.FC<SocialIconGlyphProps> = ({
  iconKey,
  className = "h-[22px] w-[22px] sm:h-6 sm:w-6",
}) => {
  const commonProps = {
    className,
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (iconKey) {
    case "linkedin":
      return (
        <svg {...commonProps}>
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
        <svg {...commonProps}>
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...commonProps}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeWidth="2.5" />
        </svg>
      );
  }
};

export interface FooterSocialProps {
  readonly registerSocialRef?: (index: number, el: HTMLElement | null) => void;
}

export const FooterSocial = forwardRef<HTMLDivElement, FooterSocialProps>(
  ({ registerSocialRef }, ref) => {
    return (
      /* Gap: 10px Mobile | 12px Desktop */
      <div ref={ref} className="flex items-center gap-2.5 sm:gap-3">
        {FOOTER_SOCIAL_LINKS.map((social, index) => (
          <a
            key={social.id}
            ref={(el) => {
              if (registerSocialRef) registerSocialRef(index, el);
            }}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Brivya on ${social.name}`}
            /* 
              Dimensions:
              - Button: 48px × 48px (Mobile & Desktop)
              - Icon Glyphs: 22px Mobile | 24px Desktop
            */
            className="group/social relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#102D50]/15 border border-[#102D50]/20 overflow-hidden transition-all duration-[380ms] ease-[cubic-bezier(0.25,1,0.3,1)] hover:scale-[1.08] hover:bg-[#EBF3FF] hover:border-white focus-visible:bg-[#EBF3FF] focus-visible:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5FD7]"
          >
            {/* 1. Default Light Icon (Exits smoothly to the RIGHT on hover) */}
            <span className="absolute inset-0 flex items-center justify-center text-[#102D50] sm:text-white transition-all duration-[380ms] ease-[cubic-bezier(0.25,1,0.3,1)] group-hover/social:translate-x-12 group-hover/social:opacity-0 group-focus-visible/social:translate-x-12 group-focus-visible/social:opacity-0">
              <SocialIconGlyph iconKey={social.iconKey} />
            </span>

            {/* 2. Dark Navy Icon (#102D50) (Enters smoothly from the LEFT into Center on hover) */}
            <span className="absolute inset-0 flex items-center justify-center text-[#102D50] -translate-x-12 opacity-0 transition-all duration-[380ms] ease-[cubic-bezier(0.25,1,0.3,1)] group-hover/social:translate-x-0 group-hover/social:opacity-100 group-focus-visible/social:translate-x-0 group-focus-visible/social:opacity-100">
              <SocialIconGlyph iconKey={social.iconKey} />
            </span>
          </a>
        ))}
      </div>
    );
  }
);

FooterSocial.displayName = "FooterSocial";
export default FooterSocial;