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

export interface WorkHeroAnimationTargets {
  section: HTMLElement;
  eyebrow: HTMLElement | null;
  headlineLines: HTMLElement[];
  description: HTMLElement | null;
  exploreLink: HTMLElement | null;
  primaryMask: HTMLElement | null;
  primaryImg: HTMLElement | null;
  secondaryCard: HTMLElement | null;
  caption: HTMLElement | null;
  scrollCue: HTMLElement | null;
}

export function initWorkHeroAnimation(targets: WorkHeroAnimationTargets): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();
    const allEls = [
      targets.eyebrow,
      ...targets.headlineLines,
      targets.description,
      targets.exploreLink,
      targets.primaryMask,
      targets.primaryImg,
      targets.secondaryCard,
      targets.caption,
      targets.scrollCue,
    ].filter(Boolean);

    if (reduced) {
      gsap.set(allEls, {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 12px)",
        clearProps: "transform,clipPath",
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.08,
    });

    if (targets.eyebrow) {
      tl.fromTo(
        targets.eyebrow,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0
      );
    }

    if (targets.headlineLines.length > 0) {
      tl.fromTo(
        targets.headlineLines,
        { autoAlpha: 0, yPercent: 110 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.8,
          stagger: 0.085,
          ease: "power3.out",
        },
        0.1
      );
    }

    if (targets.description) {
      tl.fromTo(
        targets.description,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.65 },
        0.34
      );
    }

    if (targets.exploreLink) {
      tl.fromTo(
        targets.exploreLink,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.46
      );
    }

    if (targets.primaryMask) {
      tl.fromTo(
        targets.primaryMask,
        {
          clipPath: "inset(10% 0% 0% 0% round 12px)",
          autoAlpha: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          autoAlpha: 1,
          duration: 1.05,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
        0.16
      );
    }

    if (targets.primaryImg) {
      tl.fromTo(
        targets.primaryImg,
        { scale: 1.06 },
        { scale: 1, duration: 1.15, ease: "power2.out", clearProps: "transform" },
        0.18
      );
    }

    if (targets.secondaryCard) {
      tl.fromTo(
        targets.secondaryCard,
        {
          clipPath: "inset(14% 0% 0% 0% round 10px)",
          autoAlpha: 0,
          y: 18,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 10px)",
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "clipPath,transform",
        },
        0.44
      );
    }

    if (targets.caption) {
      tl.fromTo(
        targets.caption,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0.68
      );
    }

    if (targets.scrollCue) {
      tl.fromTo(
        targets.scrollCue,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0.74
      );
    }
  }, targets.section);
}

export interface WorkArchiveEntranceTargets {
  section: HTMLElement;
  topBar: HTMLElement | null;
  categoryGroup: HTMLElement | null;
  indexRows: HTMLElement[];
  stageFrame: HTMLElement | null;
  stageDetails: HTMLElement | null;
}

export function initWorkArchiveEntrance(
  targets: WorkArchiveEntranceTargets
): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();
    const allEls = [
      targets.topBar,
      targets.categoryGroup,
      ...targets.indexRows,
      targets.stageFrame,
      targets.stageDetails,
    ].filter(Boolean);

    if (reduced) {
      gsap.set(allEls, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0% round 12px)",
        clearProps: "transform,clipPath",
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: targets.section,
        start: "top 82%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      },
    });

    if (targets.topBar) {
      tl.fromTo(
        targets.topBar,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        0
      );
    }

    if (targets.categoryGroup) {
      tl.fromTo(
        targets.categoryGroup,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.08
      );
    }

    if (targets.indexRows.length > 0) {
      tl.fromTo(
        targets.indexRows.slice(0, 14),
        { autoAlpha: 0, x: -10 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.48,
          stagger: 0.032,
          clearProps: "transform",
        },
        0.16
      );
    }

    if (targets.stageFrame) {
      tl.fromTo(
        targets.stageFrame,
        {
          clipPath: "inset(0% 0% 8% 0% round 12px)",
          autoAlpha: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
        0.14
      );
    }

    if (targets.stageDetails) {
      tl.fromTo(
        targets.stageDetails,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.65, clearProps: "transform" },
        0.28
      );
    }
  }, targets.section);
}

export interface ProjectSwitchTargets {
  headerBadge: HTMLElement | null;
  title: HTMLElement | null;
  mediaFrame: HTMLElement | null;
  mediaImage: HTMLElement | null;
  description: HTMLElement | null;
  metaRow: HTMLElement | null;
  ctaLink: HTMLElement | null;
}

/**
 * Smooth 0.65s transition when switching active project inside the archive.
 * Uses subtle depth and clip-path reveal without any white flash.
 */
export function animateProjectSwitchIn(
  targets: ProjectSwitchTargets
): gsap.core.Timeline {
  const textEls = [
    targets.headerBadge,
    targets.title,
    targets.description,
    targets.metaRow,
    targets.ctaLink,
  ].filter((el): el is HTMLElement => Boolean(el));

  if (prefersReducedMotion()) {
    gsap.set([targets.mediaFrame, targets.mediaImage, ...textEls].filter(Boolean), {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      clearProps: "transform,clipPath",
    });
    return gsap.timeline();
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (targets.mediaFrame) {
    tl.fromTo(
      targets.mediaFrame,
      {
        clipPath: "inset(0% 0% 6% 0% round 12px)",
        opacity: 0.45,
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 12px)",
        opacity: 1,
        duration: 0.68,
        ease: "power3.out",
        clearProps: "clipPath",
      },
      0
    );
  }

  if (targets.mediaImage) {
    tl.fromTo(
      targets.mediaImage,
      { scale: 1.028 },
      { scale: 1, duration: 0.72, ease: "power2.out", clearProps: "transform" },
      0
    );
  }

  if (textEls.length > 0) {
    tl.fromTo(
      textEls,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.52,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "transform",
      },
      0.06
    );
  }

  return tl;
}

export interface CaseStudyEntranceTargets {
  container: HTMLElement;
  heroItems: HTMLElement[];
  heroMedia: HTMLElement | null;
  galleryItems: HTMLElement[];
}

export function initCaseStudyEntrance(
  targets: CaseStudyEntranceTargets
): gsap.Context {
  return gsap.context(() => {
    const reduced = prefersReducedMotion();
    const allEls = [
      ...targets.heroItems,
      targets.heroMedia,
      ...targets.galleryItems,
    ].filter(Boolean);

    if (reduced) {
      gsap.set(allEls, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0% round 12px)",
        clearProps: "transform,clipPath",
      });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.06,
    });

    if (targets.heroItems.length > 0) {
      tl.fromTo(
        targets.heroItems,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          stagger: 0.075,
          clearProps: "transform",
        },
        0
      );
    }

    if (targets.heroMedia) {
      tl.fromTo(
        targets.heroMedia,
        { clipPath: "inset(8% 0% 0% 0% round 12px)", autoAlpha: 0 },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
        0.18
      );
    }

    if (targets.galleryItems.length > 0) {
      targets.galleryItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }
  }, targets.container);
}
