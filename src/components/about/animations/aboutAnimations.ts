"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface AboutHeroAnimationTargets {
  section: HTMLElement;
  watermarks: HTMLElement[];
  words: HTMLElement[];
  underline: HTMLElement | null;
  description: HTMLElement | null;
  divider: HTMLElement | null;
  accents: HTMLElement[];
}

export function initAboutHeroAnimation(targets: AboutHeroAnimationTargets): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();

    if (reduced) {
      const allEls = [
        ...targets.watermarks,
        ...targets.words,
        targets.underline,
        targets.description,
        targets.divider,
        ...targets.accents,
      ].filter(Boolean);

      gsap.set(allEls, {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        x: 0,
        scaleX: 1,
        scale: 1,
        clearProps: "transform",
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.12,
    });

    if (targets.watermarks.length > 0) {
      tl.fromTo(
        targets.watermarks,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power2.out" },
        0
      );
    }

    if (targets.words.length > 0) {
      tl.fromTo(
        targets.words,
        { autoAlpha: 0, yPercent: 112 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.85,
          stagger: 0.065,
          ease: "power3.out",
        },
        0.1
      );
    }

    if (targets.underline) {
      tl.fromTo(
        targets.underline,
        { scaleX: 0, autoAlpha: 0 },
        {
          scaleX: 1,
          autoAlpha: 1,
          duration: 0.65,
          transformOrigin: "left center",
          ease: "power3.inOut",
        },
        0.55
      );
    }

    if (targets.description) {
      tl.fromTo(
        targets.description,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.72 },
        0.48
      );
    }

    if (targets.divider) {
      tl.fromTo(
        targets.divider,
        { scaleX: 0, autoAlpha: 0 },
        {
          scaleX: 1,
          autoAlpha: 1,
          duration: 0.7,
          transformOrigin: "left center",
          ease: "power2.out",
        },
        0.62
      );
    }

    if (targets.accents.length > 0) {
      tl.fromTo(
        targets.accents,
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.1 },
        0.4
      );
    }

    // Subtle scroll-linked parallax strictly for decorative background watermarks
    targets.watermarks.forEach((track, idx) => {
      const direction = idx % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        track,
        { xPercent: -3 * direction },
        {
          xPercent: 5 * direction,
          ease: "none",
          scrollTrigger: {
            trigger: targets.section,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        }
      );
    });
  }, targets.section);
}

export interface TeamCardRevealTarget {
  photoFrame: HTMLElement | null;
  caption: HTMLElement | null;
  divider: HTMLElement | null;
}

export interface TeamSectionAnimationTargets {
  section: HTMLElement;
  header: HTMLElement | null;
  cards: TeamCardRevealTarget[];
}

/**
 * Sequential reversible entrance timeline for Leadership & Employee sections:
 * - Heading: 0.85s
 * - Portraits (one-by-one stagger): 1.15s with clipPath + y + scale(0.97 -> 1)
 * - Names/Designations: 0.65s
 * - Thin horizontal dividers: 0.55s
 * Reverses cleanly when scrolling upward and replays when scrolling down again.
 */
export function initTeamSectionAnimation(targets: TeamSectionAnimationTargets): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();
    const photoFrames = targets.cards
      .map((c) => c.photoFrame)
      .filter((el): el is HTMLElement => Boolean(el));
    const captions = targets.cards
      .map((c) => c.caption)
      .filter((el): el is HTMLElement => Boolean(el));
    const dividers = targets.cards
      .map((c) => c.divider)
      .filter((el): el is HTMLElement => Boolean(el));

    if (reduced) {
      gsap.set([targets.header, ...photoFrames, ...captions, ...dividers].filter(Boolean), {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        scaleX: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        clearProps: "transform",
      });
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: targets.section,
        start: isMobile ? "top 88%" : "top 84%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    // 1. Heading reveal (0.85s)
    if (targets.header) {
      tl.fromTo(
        targets.header,
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" },
        0
      );
    }

    // 2. Sequential one-by-one portrait reveals (1.15s each, 0.18s stagger)
    const staggerGap = 0.18;
    photoFrames.forEach((photo, idx) => {
      const startAt = 0.16 + idx * staggerGap;
      tl.fromTo(
        photo,
        {
          autoAlpha: 0,
          y: 30,
          scale: 0.97,
          clipPath: "inset(8% 0% 0% 0% round 6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 6px)",
          duration: 1.15,
          ease: "power3.out",
        },
        startAt
      );
    });

    // 3. Names & designations follow each photo (0.65s)
    captions.forEach((caption, idx) => {
      const startAt = 0.42 + idx * staggerGap;
      tl.fromTo(
        caption,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" },
        startAt
      );
    });

    // 4. Thin horizontal dividers reveal progressively (0.55s)
    dividers.forEach((divider, idx) => {
      const startAt = 0.56 + idx * staggerGap;
      tl.fromTo(
        divider,
        { scaleX: 0, autoAlpha: 0 },
        {
          scaleX: 1,
          autoAlpha: 1,
          transformOrigin: "left center",
          duration: 0.55,
          ease: "power2.out",
        },
        startAt
      );
    });
  }, targets.section);
}

/**
 * Staggers social icon buttons smoothly upward when hovering a team portrait (0.38s).
 */
export function animateCardSocialIcons(icons: HTMLElement[], visible: boolean): void {
  if (icons.length === 0) return;

  gsap.killTweensOf(icons);

  if (prefersReducedMotion()) {
    gsap.set(icons, { autoAlpha: visible ? 1 : 0, y: 0 });
    return;
  }

  if (visible) {
    gsap.fromTo(
      icons,
      { autoAlpha: 0, y: 12, scale: 0.9 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.38,
        stagger: 0.06,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  } else {
    gsap.to(icons, {
      autoAlpha: 0,
      y: 8,
      scale: 0.94,
      duration: 0.22,
      stagger: 0.025,
      ease: "power2.in",
      overwrite: "auto",
    });
  }
}

export interface CollectiveSectionTargets {
  section: HTMLElement;
  mediaFrame: HTMLElement | null;
  mediaInner: HTMLElement | null;
  watermark: HTMLElement | null;
  contentItems: HTMLElement[];
}

/**
 * Collective photograph reversible entrance (1.25s mask + subtle scale) & closing headings,
 * plus independent scrubbed watermark motion.
 */
export function initCollectiveSectionAnimation(targets: CollectiveSectionTargets): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(
        [targets.mediaFrame, targets.mediaInner, ...targets.contentItems].filter(Boolean),
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          clearProps: "transform",
        }
      );
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: targets.section,
        start: isMobile ? "top 86%" : "top 82%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    if (targets.mediaFrame) {
      tl.fromTo(
        targets.mediaFrame,
        {
          autoAlpha: 0,
          clipPath: "inset(8% 3% 8% 3% round 16px)",
          y: 30,
        },
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          y: 0,
          duration: 1.25,
          ease: "power3.out",
        },
        0
      );
    }

    if (targets.mediaInner) {
      tl.fromTo(
        targets.mediaInner,
        { scale: 1.07 },
        { scale: 1, duration: 1.35, ease: "power2.out" },
        0
      );
    }

    targets.contentItems.forEach((item, idx) => {
      tl.fromTo(
        item,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" },
        0.38 + idx * 0.14
      );
    });

    // Separate scrub parallax strictly for decorative watermark track (no conflicting toggleActions)
    if (targets.watermark) {
      gsap.fromTo(
        targets.watermark,
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: targets.section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        }
      );
    }
  }, targets.section);
}

export interface AboutCtaScrubTargets {
  container: HTMLElement;
  heading: HTMLElement | null;
  description: HTMLElement | null;
  primaryButton: HTMLElement | null;
  secondaryButton: HTMLElement | null;
}

/**
 * Final CTA reversible entrance sequence:
 * Container -> Heading -> Description -> Button 1 -> Button 2.
 */
export function initAboutCtaScrubAnimation(targets: AboutCtaScrubTargets): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();
    const all = [
      targets.container,
      targets.heading,
      targets.description,
      targets.primaryButton,
      targets.secondaryButton,
    ].filter(Boolean);

    if (reduced) {
      gsap.set(all, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: targets.container,
        start: isMobile ? "top 90%" : "top 86%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      targets.container,
      { autoAlpha: 0, y: 28, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
      0
    );

    if (targets.heading) {
      tl.fromTo(
        targets.heading,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.14
      );
    }

    if (targets.description) {
      tl.fromTo(
        targets.description,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.28
      );
    }

    if (targets.primaryButton) {
      tl.fromTo(
        targets.primaryButton,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.4
      );
    }

    if (targets.secondaryButton) {
      tl.fromTo(
        targets.secondaryButton,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.52
      );
    }
  }, targets.container);
}

export interface ModalFlipOriginRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ModalAnimationTargets {
  backdrop: HTMLElement | null;
  panel: HTMLElement | null;
  media: HTMLElement | null;
  contentItems: HTMLElement[];
  originRect?: ModalFlipOriginRect | null;
}

export function animateProfileModalOpen(targets: ModalAnimationTargets): gsap.core.Timeline | null {
  if (prefersReducedMotion()) {
    gsap.set(
      [targets.backdrop, targets.panel, targets.media, ...targets.contentItems].filter(Boolean),
      { autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: "transform" }
    );
    return null;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (targets.backdrop) {
    tl.fromTo(targets.backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0);
  }

  if (targets.panel) {
    const panelRect = targets.panel.getBoundingClientRect();
    let fromVars: gsap.TweenVars = { autoAlpha: 0.4, scale: 0.9, y: 24 };

    if (targets.originRect && panelRect.width > 0 && panelRect.height > 0) {
      const originCx = targets.originRect.left + targets.originRect.width / 2;
      const originCy = targets.originRect.top + targets.originRect.height / 2;
      const targetCx = panelRect.left + panelRect.width / 2;
      const targetCy = panelRect.top + panelRect.height / 2;
      const initialScale = Math.max(
        0.35,
        Math.min(0.85, targets.originRect.width / panelRect.width)
      );

      fromVars = {
        autoAlpha: 0.35,
        x: originCx - targetCx,
        y: originCy - targetCy,
        scale: initialScale,
      };
    }

    tl.fromTo(
      targets.panel,
      fromVars,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.48,
        ease: "power3.out",
        clearProps: "transform",
      },
      0.02
    );
  }

  if (targets.media) {
    tl.fromTo(
      targets.media,
      { autoAlpha: 0.75, scale: 1.05 },
      { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" },
      0.12
    );
  }

  if (targets.contentItems.length > 0) {
    tl.fromTo(
      targets.contentItems,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.05, ease: "power3.out" },
      0.18
    );
  }

  return tl;
}

export function animateProfileModalClose(
  targets: Pick<ModalAnimationTargets, "backdrop" | "panel" | "originRect">,
  onComplete: () => void
): gsap.core.Timeline {
  if (prefersReducedMotion()) {
    onComplete();
    return gsap.timeline();
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.in" },
    onComplete,
  });

  if (targets.panel) {
    let toVars: gsap.TweenVars = { autoAlpha: 0, scale: 0.94, y: 14, duration: 0.24 };

    if (targets.originRect) {
      const panelRect = targets.panel.getBoundingClientRect();
      if (panelRect.width > 0) {
        const originCx = targets.originRect.left + targets.originRect.width / 2;
        const originCy = targets.originRect.top + targets.originRect.height / 2;
        const targetCx = panelRect.left + panelRect.width / 2;
        const targetCy = panelRect.top + panelRect.height / 2;
        toVars = {
          autoAlpha: 0,
          x: (originCx - targetCx) * 0.45,
          y: (originCy - targetCy) * 0.45,
          scale: 0.82,
          duration: 0.26,
        };
      }
    }

    tl.to(targets.panel, toVars, 0);
  }

  if (targets.backdrop) {
    tl.to(targets.backdrop, { autoAlpha: 0, duration: 0.26 }, 0.04);
  }

  return tl;
}

export interface LeadershipHeaderTargets {
  section: HTMLElement;
  header: HTMLElement | null;
  divider?: HTMLElement | null;
}

export function initLeadershipHeaderReveal(targets: LeadershipHeaderTargets): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();
    const els = [targets.header, targets.divider].filter(Boolean);

    if (reduced) {
      gsap.set(els, { autoAlpha: 1, y: 0, scaleX: 1, clearProps: "transform" });
      return;
    }

    const triggerEl = targets.header ?? targets.section;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 84%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    if (targets.header) {
      tl.fromTo(
        targets.header,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.85 },
        0
      );
    }

    if (targets.divider) {
      tl.fromTo(
        targets.divider,
        { autoAlpha: 0, scaleX: 0 },
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.7,
          transformOrigin: "center center",
          ease: "power3.inOut",
        },
        0.18
      );
    }
  }, targets.section);
}

export interface LeadershipFounderAnimationTargets {
  card: HTMLElement;
  direction: "ltr" | "rtl";
  delaySec?: number;
  maskWrapper: HTMLElement;
  innerImg: HTMLElement | null;
  outerFrame: HTMLElement | null;
  corners: HTMLElement[];
  lightSweep: HTMLElement | null;
  nameEl: HTMLElement | null;
  roleEl: HTMLElement | null;
  accentLine: HTMLElement | null;
  experienceEl: HTMLElement | null;
  socialIcons: HTMLElement[];
  bottomDivider: HTMLElement | null;
}

export function initLeadershipFounderTimeline(
  targets: LeadershipFounderAnimationTargets
): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(targets.maskWrapper, {
        clipPath: "inset(0% 0% 0% 0% round 6px)",
        autoAlpha: 1,
        filter: "blur(0px)",
        clearProps: "filter",
      });
      if (targets.innerImg) {
        gsap.set(targets.innerImg, { scale: 1, autoAlpha: 1, clearProps: "transform" });
      }
      if (targets.outerFrame) {
        gsap.set(targets.outerFrame, {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0% round 8px)",
        });
      }
      if (targets.corners.length > 0) {
        gsap.set(targets.corners, { autoAlpha: 1, scale: 1 });
      }
      if (targets.lightSweep) {
        gsap.set(targets.lightSweep, { autoAlpha: 0 });
      }
      const textEls = [
        targets.nameEl,
        targets.roleEl,
        targets.accentLine,
        targets.experienceEl,
        ...targets.socialIcons,
        targets.bottomDivider,
      ].filter(Boolean);
      gsap.set(textEls, {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        scaleX: 1,
        clearProps: "transform",
      });
      return;
    }

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 640;
    const baseOffset = isDesktop ? targets.delaySec ?? 0 : 0;

    // Stage 1 initial directional mask & subtle blur/scale setup
    const fromClip =
      targets.direction === "ltr"
        ? "inset(0% 100% 0% 0% round 6px)"
        : "inset(0% 0% 0% 100% round 6px)";
    const toClip = "inset(0% 0% 0% 0% round 6px)";

    const frameFromClip =
      targets.direction === "ltr"
        ? "inset(0% 100% 100% 0% round 8px)"
        : "inset(0% 0% 100% 100% round 8px)";
    const frameToClip = "inset(0% 0% 0% 0% round 8px)";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: targets.card,
        start: isDesktop ? "top 78%" : "top 84%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    // Stage 1 — Directional photograph mask reveal + clarity focus settle (1.25s)
    tl.fromTo(
      targets.maskWrapper,
      {
        clipPath: fromClip,
        autoAlpha: 0.92,
        filter: "blur(5px)",
      },
      {
        clipPath: toClip,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1.32,
        ease: "power3.inOut",
      },
      baseOffset
    );

    if (targets.innerImg) {
      tl.fromTo(
        targets.innerImg,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.25,
          ease: "power2.out",
          clearProps: "transform",
        },
        baseOffset + 0.04
      );
    }

    // Stage 2 — Outer architectural frame border drawing, corner ticks & light sheen sweep
    if (targets.outerFrame) {
      tl.fromTo(
        targets.outerFrame,
        { clipPath: frameFromClip, autoAlpha: 0 },
        {
          clipPath: frameToClip,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power2.inOut",
        },
        baseOffset + 0.16
      );
    }

    if (targets.corners.length > 0) {
      tl.fromTo(
        targets.corners,
        { autoAlpha: 0, scale: 0.55 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
        },
        baseOffset + 0.34
      );
    }

    if (targets.lightSweep) {
      tl.fromTo(
        targets.lightSweep,
        {
          xPercent: targets.direction === "ltr" ? -125 : 125,
          autoAlpha: 0,
        },
        {
          keyframes: [
            { autoAlpha: 0.45, duration: 0.45 },
            { autoAlpha: 0, duration: 0.6 },
          ],
          xPercent: targets.direction === "ltr" ? 135 : -135,
          duration: 1.05,
          ease: "power2.inOut",
        },
        baseOffset + 0.25
      );
    }

    // Stage 3 — Founder Name upward masked typography reveal
    if (targets.nameEl) {
      tl.fromTo(
        targets.nameEl,
        { autoAlpha: 0, yPercent: 108 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.78,
          ease: "power3.out",
        },
        baseOffset + 0.56
      );
    }

    // Stage 4 — Designation + horizontal blue accent line expansion + experience line
    if (targets.roleEl) {
      tl.fromTo(
        targets.roleEl,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          ease: "power3.out",
        },
        baseOffset + 0.72
      );
    }

    if (targets.accentLine) {
      tl.fromTo(
        targets.accentLine,
        { autoAlpha: 0, scaleX: 0 },
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.56,
          transformOrigin: targets.direction === "ltr" ? "left center" : "right center",
          ease: "power3.inOut",
        },
        baseOffset + 0.78
      );
    }

    if (targets.experienceEl) {
      tl.fromTo(
        targets.experienceEl,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          ease: "power2.out",
        },
        baseOffset + 0.86
      );
    }

    // Stage 5 — Centered enabled social icons stagger + subtle bottom divider
    if (targets.socialIcons.length > 0) {
      tl.fromTo(
        targets.socialIcons,
        { autoAlpha: 0, y: 12, scale: 0.88 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          stagger: 0.085,
          ease: "back.out(1.4)",
        },
        baseOffset + 0.96
      );
    }

    if (targets.bottomDivider) {
      tl.fromTo(
        targets.bottomDivider,
        { autoAlpha: 0, scaleX: 0 },
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.65,
          transformOrigin: "center center",
          ease: "power3.inOut",
        },
        baseOffset + 0.92
      );
    }
  }, targets.card);
}
