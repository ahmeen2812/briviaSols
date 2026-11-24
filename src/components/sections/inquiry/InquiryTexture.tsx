"use client";

import React from "react";

export const InquiryTexture: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full select-none overflow-hidden rounded-[inherit]"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="inquiry-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#0A5FD7" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="0.75" fill="#0A5FD7" />
          </pattern>
          <pattern id="inquiry-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.6" fill="#1675F8" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#inquiry-grid)" />
        <rect x="5%" y="70%" width="120" height="80" fill="url(#inquiry-dots)" />
        <rect x="85%" y="10%" width="100" height="70" fill="url(#inquiry-dots)" />

        {/* Minimal Engineering Corner Brackets */}
        <g stroke="#0A5FD7" strokeWidth="0.8" fill="none">
          {/* Top-Left */}
          <path d="M 18 26 L 18 18 L 26 18" />
          {/* Top-Right */}
          <svg x="100%" y="0" style={{ overflow: "visible" }}>
            <path d="M -26 18 L -18 18 L -18 26" />
          </svg>
          {/* Bottom-Left */}
          <svg x="0" y="100%" style={{ overflow: "visible" }}>
            <path d="M 18 -26 L 18 -18 L 26 -18" />
          </svg>
          {/* Bottom-Right */}
          <svg x="100%" y="100%" style={{ overflow: "visible" }}>
            <path d="M -26 -18 L -18 -18 L -18 -26" />
          </svg>
        </g>
      </svg>
    </div>
  );
};