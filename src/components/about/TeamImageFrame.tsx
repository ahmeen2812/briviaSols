"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getMemberInitials } from "@/config/team";
import styles from "./about.module.css";

export interface TeamImageFrameProps {
  readonly src: string;
  readonly alt: string;
  readonly variant: "portrait" | "collective";
  readonly fitMode?: "contain" | "cover";
  readonly objectPosition?: string;
  readonly memberName?: string;
  readonly isAvailable?: boolean;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly className?: string;
  readonly imageClassName?: string;
}

/**
 * Editorial photographic frame supporting distinct fitting modes:
 * - `contain`: displays complete original photographs without face/body cropping (for cards).
 * - `cover`: fills panel cleanly with configurable `objectPosition` (for modal & collective image).
 */
export const TeamImageFrame: React.FC<TeamImageFrameProps> = ({
  src,
  alt,
  variant,
  fitMode = "contain",
  objectPosition = "50% 20%",
  memberName = "Brivya Solutions",
  isAvailable = true,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px",
  className = "",
  imageClassName = "",
}) => {
  const [hasLoadError, setHasLoadError] = useState(false);
  const shouldRenderImage = Boolean(src && isAvailable && !hasLoadError);

  if (shouldRenderImage) {
    const fitClass =
      fitMode === "contain" ? "object-contain object-center" : "object-cover";

    return (
      <div
        className={`relative w-full h-full overflow-hidden ${
          fitMode === "contain" ? "bg-[#F4F6FA]" : "bg-[#EFECE6]"
        } ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setHasLoadError(true)}
          style={fitMode === "cover" ? { objectPosition } : undefined}
          className={`${fitClass} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${imageClassName}`}
        />
      </div>
    );
  }

  const initials = getMemberInitials(memberName);

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#F4F5F7] via-[#ECEEF3] to-[#E4E8F0] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.7),transparent_65%)]"
      />

      <div
        aria-hidden="true"
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${imageClassName}`}
      >
        {variant === "portrait" ? (
          <span
            className={`${styles.editorialSerif} text-[40px] sm:text-[48px] font-normal italic tracking-wide text-[#18181B]/[0.24]`}
          >
            {initials}
          </span>
        ) : (
          <div className="flex flex-col items-center">
            <span
              className={`${styles.editorialSerif} text-[28px] sm:text-[38px] font-normal italic tracking-tight text-[#18181B]/[0.42]`}
            >
              Brivya Collective
            </span>
            <span className="mt-2 font-sans text-[12px] tracking-[0.06em] text-[#52525B]/75">
              Collective Team Photograph
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
