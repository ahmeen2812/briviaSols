/**
 * BRIVYA SOLUTIONS — CANONICAL TEAM & ABOUT PAGE CONFIGURATION
 *
 * Single source of truth for all six team members, derived leadership/employee
 * collections, biographies, focal points, and 9-platform social configurations.
 *
 * WORKFLOW:
 * - Add or edit members inside `teamMembers`.
 * - `leadershipMembers` and `employeeMembers` automatically update everywhere.
 * - Toggle `enabled: true | false` and update `url` under each member's `socials`.
 * - Adjust expanded modal framing per portrait with `imagePosition` (e.g., "50% 22%").
 * - Replace `isPlaceholder: true` demo employee copy with actual profiles when onboarding.
 */

export type TeamCategory = "leadership" | "employee";

export type SocialPlatformKey =
  | "linkedin"
  | "github"
  | "x"
  | "instagram"
  | "fiverr"
  | "upwork"
  | "portfolio"
  | "behance"
  | "dribbble";

export interface TeamSocialItem {
  readonly enabled: boolean;
  readonly url: string;
}

export type TeamSocialLinks = Record<SocialPlatformKey, TeamSocialItem>;

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly category: TeamCategory;
  readonly isPlaceholder: boolean;
  readonly image: string;
  readonly imageAlt: string;
  readonly imagePosition: string;
  readonly experience: string;
  readonly shortBio: string;
  readonly bio: readonly string[];
  readonly highlightTerms: readonly string[];
  readonly socials: TeamSocialLinks;
  readonly displayOrder: number;
}

export interface AboutHeroConfig {
  readonly headlineLine1: string;
  readonly headlineAccentPrefix: string;
  readonly headlineAccentWord: string;
  readonly description: string;
  readonly watermarkLines: readonly [string, string, string];
}

export interface AboutCollectiveConfig {
  readonly eyebrow: string;
  readonly headline: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly watermarkWords: readonly string[];
}

export interface AboutSectionHeadings {
  readonly leadershipEyebrow: string;
  readonly leadershipHeading: string;
  readonly employeeEyebrow: string;
  readonly employeeHeading: string;
}

export interface AboutCtaConfig {
  readonly heading: string;
  readonly description: string;
  readonly primaryButtonText: string;
  readonly secondaryButtonText: string;
}

export interface AboutPageContentConfig {
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
  readonly hero: AboutHeroConfig;
  readonly sections: AboutSectionHeadings;
  readonly collective: AboutCollectiveConfig;
  readonly cta: AboutCtaConfig;
}

export const ABOUT_CONTENT: AboutPageContentConfig = {
  seo: {
    title: "About | Brivya Solutions",
    description:
      "Brivya Solutions brings together different perspectives, skills, and ideas to create meaningful digital experiences and technology-driven solutions.",
  },
  hero: {
    headlineLine1: "Great work is never",
    headlineAccentPrefix: "built",
    headlineAccentWord: "alone.",
    description:
      "Brivya Solutions brings together different perspectives, skills and ideas to create meaningful digital experiences and technology-driven solutions. We believe exceptional work comes from collaboration, thoughtful execution and a shared ambition to build something valuable.",
    watermarkLines: [
      "Different perspectives, shared craft",
      "Engineering, media & automation",
      "Collective execution & ambition",
    ],
  },
  sections: {
    leadershipEyebrow: "LEADERSHIP",
    leadershipHeading: "The founders shaping our direction.",
    employeeEyebrow: "TEAM MEMBERS",
    employeeHeading: "Specialists across disciplines.",
  },
  collective: {
    eyebrow: "THE COLLECTIVE",
    headline: "Different minds. Shared ambition. Meaningful work.",
    description:
      "Every product we ship, campaign we scale, and workflow we automate reflects the discipline of people who care deeply about getting the details right.",
    image: "/images/team/team-group.jpg",
    imageAlt: "The Brivya Solutions collective team",
    watermarkWords: ["Collective", "Craft", "Ambition"],
  },
  cta: {
    heading: "Let's build something meaningful together.",
    description:
      "Have an idea, a challenge or a project in mind? Let's discuss how the right people, technology and strategy can help bring it to life.",
    primaryButtonText: "Start a Project",
    secondaryButtonText: "Book a Consultation",
  },
} as const;

/**
 * MASTER TEAM MEMBERS ARRAY (6 Records)
 * All UI cards, hover social overlays, expanded modals, and counts derive from this array.
 */
export const teamMembers: readonly TeamMember[] = [
  // ===========================================================================
  // 01 — AHMED TOQEER R (Leadership)
  // ===========================================================================
  {
    id: "ahmed-toqeer-r",
    name: "Ahmed Toqeer R",
    role: "Founder & Chief Executive Officer (CEO)",
    category: "leadership",
    isPlaceholder: false,

    image: "/images/team/ahmed-toqeer-r.jpg",
    imageAlt: "Ahmed Toqeer R, Founder & Chief Executive Officer (CEO) at Brivya Solutions",
    imagePosition: "50% 25%",

    experience: "Nearly 5 years in software development",
    shortBio:
      "Full-stack MERN engineer leading technical direction, AI automation systems, and digital product development.",

    bio: [
      "Ahmed Toqeer R is the Founder and CEO of Brivya Solutions, with nearly five years of hands-on experience in software development and digital product engineering.",
      "He specialises in full-stack development and the MERN stack, with additional expertise in AI agents, intelligent automation, Google Workspace add-ons and Microsoft Word add-ins. He enjoys turning complex technical requirements into practical, reliable digital solutions.",
      "At Brivya Solutions, Ahmed leads technical direction and product development, focusing on thoughtful engineering, quality execution and building technology that creates lasting value.",
    ],

    highlightTerms: [
      "full-stack development",
      "MERN stack",
      "AI agents",
      "intelligent automation",
      "Google Workspace add-ons",
      "Microsoft Word add-ins",
      "technical direction",
    ],

    socials: {
      // TODO: Replace temporary test URLs with Ahmed Toqeer R's actual social profiles
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/brivya-ahmed-toqeer-placeholder/",
      },
      github: {
        enabled: true,
        url: "https://github.com/brivya-ahmed-toqeer-placeholder",
      },
      x: {
        enabled: true,
        url: "https://x.com/brivya_ahmed_placeholder",
      },
      instagram: { enabled: false, url: "" },
      fiverr: { enabled: false, url: "" },
      upwork: { enabled: false, url: "" },
      portfolio: { enabled: false, url: "" },
      behance: { enabled: false, url: "" },
      dribbble: { enabled: false, url: "" },
    },
    displayOrder: 1,
  },

  // ===========================================================================
  // 02 — AQSA IMRAN (Leadership)
  // ===========================================================================
  {
    id: "aqsa-imran",
    name: "Aqsa Imran",
    role: "Co-Founder & Chief Operating Officer (COO)",
    category: "leadership",
    isPlaceholder: false,

    image: "/images/team/aqsa-imran.jpg",
    imageAlt: "Aqsa Imran, Co-Founder & Chief Operating Officer (COO) at Brivya Solutions",
    imagePosition: "50% 20%",

    experience: "3+ years in digital advertising",
    shortBio:
      "Paid media specialist directing Google Ads, Meta Ads strategy, campaign management, and studio operations.",

    bio: [
      "Aqsa Imran is the Co-Founder and Chief Operating Officer of Brivya Solutions, bringing more than three years of experience in digital advertising and campaign management.",
      "She specialises in Google Ads and Meta Ads, working across campaign strategy, audience targeting, account management, budget planning, and ongoing optimisation.",
      "At Brivya Solutions, she leads operational coordination and helps shape advertising strategy so client campaigns stay structured, focused, and aligned with clear business goals.",
    ],

    highlightTerms: [
      "Google Ads",
      "Meta Ads",
      "digital advertising",
      "campaign strategy",
      "audience targeting",
      "ongoing optimisation",
      "advertising strategy",
      "operational coordination",
    ],

    socials: {
      // TODO: Replace temporary test URLs with Aqsa Imran's actual social profiles
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/brivya-aqsa-imran-placeholder/",
      },
      github: {
        enabled: true,
        url: "https://github.com/brivya-aqsa-imran-placeholder",
      },
      x: {
        enabled: true,
        url: "https://x.com/brivya_aqsa_placeholder",
      },
      instagram: { enabled: false, url: "" },
      fiverr: { enabled: false, url: "" },
      upwork: { enabled: false, url: "" },
      portfolio: { enabled: false, url: "" },
      behance: { enabled: false, url: "" },
      dribbble: { enabled: false, url: "" },
    },
    displayOrder: 2,
  },

  // ===========================================================================
  // 03 — TEAM MEMBER 01 (Temporary Demonstration Employee Record)
  // ===========================================================================
  {
    id: "team-member-01",
    name: "Team Member 01",
    role: "Frontend Developer",
    category: "employee",
    isPlaceholder: true,

    image: "/images/team/team-member-01.jpg",
    imageAlt: "Team Member 01, Frontend Developer (Demonstration Profile)",
    imagePosition: "50% 25%",

    experience: "Demonstration profile — role details editable in team.ts",
    shortBio:
      "Demonstration Frontend Developer profile showcasing responsive web interfaces and component architecture.",

    bio: [
      "This demonstration profile illustrates how an engineering specialist entry appears within the dynamic Brivya team directory.",
      "In a completed profile, this section highlights responsibilities across modern React interfaces, accessible design systems, responsive layouts, and motion choreography.",
      "Replace this demonstration copy, role, experience, photograph, and social URLs in src/config/team.ts when adding an actual team member.",
    ],

    highlightTerms: [
      "modern React interfaces",
      "accessible design systems",
      "responsive layouts",
      "motion choreography",
    ],

    socials: {
      // TODO: Replace temporary placeholder URLs with actual profile links
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/brivya-member-01-placeholder/",
      },
      github: {
        enabled: true,
        url: "https://github.com/brivya-member-01-placeholder",
      },
      x: {
        enabled: true,
        url: "https://x.com/brivya_member01_placeholder",
      },
      instagram: { enabled: false, url: "" },
      fiverr: { enabled: false, url: "" },
      upwork: { enabled: false, url: "" },
      portfolio: { enabled: false, url: "" },
      behance: { enabled: false, url: "" },
      dribbble: { enabled: false, url: "" },
    },
    displayOrder: 1,
  },

  // ===========================================================================
  // 04 — TEAM MEMBER 02 (Temporary Demonstration Employee Record)
  // ===========================================================================
  {
    id: "team-member-02",
    name: "Team Member 02",
    role: "UI/UX Designer",
    category: "employee",
    isPlaceholder: true,

    image: "/images/team/team-member-02.jpg",
    imageAlt: "Team Member 02, UI/UX Designer (Demonstration Profile)",
    imagePosition: "50% 20%",

    experience: "Demonstration profile — role details editable in team.ts",
    shortBio:
      "Demonstration UI/UX Designer profile showcasing visual systems, prototyping, and editorial user journeys.",

    bio: [
      "This demonstration profile shows how a product and interface designer appears inside the Brivya team directory.",
      "Sample focus areas include user flow architecture, typography hierarchy, interactive prototyping, and close visual collaboration with frontend engineers.",
      "Update this placeholder profile, portrait image, and social links directly inside src/config/team.ts when onboarding your actual designer.",
    ],

    highlightTerms: [
      "user flow architecture",
      "typography hierarchy",
      "interactive prototyping",
    ],

    socials: {
      // TODO: Replace temporary placeholder URLs with actual profile links
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/brivya-member-02-placeholder/",
      },
      github: {
        enabled: true,
        url: "https://github.com/brivya-member-02-placeholder",
      },
      x: {
        enabled: true,
        url: "https://x.com/brivya_member02_placeholder",
      },
      instagram: { enabled: false, url: "" },
      fiverr: { enabled: false, url: "" },
      upwork: { enabled: false, url: "" },
      portfolio: { enabled: false, url: "" },
      behance: { enabled: false, url: "" },
      dribbble: { enabled: false, url: "" },
    },
    displayOrder: 2,
  },

  // ===========================================================================
  // 05 — TEAM MEMBER 03 (Temporary Demonstration Employee Record)
  // ===========================================================================
  {
    id: "team-member-03",
    name: "Team Member 03",
    role: "Digital Marketing Specialist",
    category: "employee",
    isPlaceholder: true,

    image: "/images/team/team-member-03.jpg",
    imageAlt: "Team Member 03, Digital Marketing Specialist (Demonstration Profile)",
    imagePosition: "50% 20%",

    experience: "Demonstration profile — role details editable in team.ts",
    shortBio:
      "Demonstration Digital Marketing Specialist profile covering campaign execution, analytics, and audience growth.",

    bio: [
      "This demonstration profile illustrates how a performance marketing team member is presented in the expanded profile view.",
      "Typical areas highlighted in this slot cover paid search setup, social creative testing, audience segmentation, and structured reporting.",
      "Replace this demonstration copy, portrait photo, and placeholder links inside src/config/team.ts once real team details are ready.",
    ],

    highlightTerms: [
      "paid search setup",
      "social creative testing",
      "audience segmentation",
      "structured reporting",
    ],

    socials: {
      // TODO: Replace temporary placeholder URLs with actual profile links
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/brivya-member-03-placeholder/",
      },
      github: {
        enabled: true,
        url: "https://github.com/brivya-member-03-placeholder",
      },
      x: {
        enabled: true,
        url: "https://x.com/brivya_member03_placeholder",
      },
      instagram: { enabled: false, url: "" },
      fiverr: { enabled: false, url: "" },
      upwork: { enabled: false, url: "" },
      portfolio: { enabled: false, url: "" },
      behance: { enabled: false, url: "" },
      dribbble: { enabled: false, url: "" },
    },
    displayOrder: 3,
  },

  // ===========================================================================
  // 06 — TEAM MEMBER 04 (Temporary Demonstration Employee Record)
  // ===========================================================================
  {
    id: "team-member-04",
    name: "Team Member 04",
    role: "AI & Automation Specialist",
    category: "employee",
    isPlaceholder: true,

    image: "/images/team/team-member-04.jpg",
    imageAlt: "Team Member 04, AI & Automation Specialist (Demonstration Profile)",
    imagePosition: "50% 25%",

    experience: "Demonstration profile — role details editable in team.ts",
    shortBio:
      "Demonstration AI & Automation Specialist profile showcasing workflow integration and intelligent tooling.",

    bio: [
      "This demonstration profile represents an automation and AI specialist within the Brivya Solutions team grid.",
      "Sample focus areas include API integration pipelines, automated CRM workflows, LLM-assisted business utilities, and reliable operational tooling.",
      "Replace this demonstration record, role, experience, image, and URLs in src/config/team.ts when adding the actual team member.",
    ],

    highlightTerms: [
      "API integration pipelines",
      "automated CRM workflows",
      "LLM-assisted business utilities",
    ],

    socials: {
      // TODO: Replace temporary placeholder URLs with actual profile links
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/brivya-member-04-placeholder/",
      },
      github: {
        enabled: true,
        url: "https://github.com/brivya-member-04-placeholder",
      },
      x: {
        enabled: true,
        url: "https://x.com/brivya_member04_placeholder",
      },
      instagram: { enabled: false, url: "" },
      fiverr: { enabled: false, url: "" },
      upwork: { enabled: false, url: "" },
      portfolio: { enabled: false, url: "" },
      behance: { enabled: false, url: "" },
      dribbble: { enabled: false, url: "" },
    },
    displayOrder: 4,
  },
];

/**
 * Derived category collections exported directly from the canonical master array.
 */
export const leadershipMembers: readonly TeamMember[] = teamMembers
  .filter((member) => member.category === "leadership")
  .sort((a, b) => a.displayOrder - b.displayOrder);

export const employeeMembers: readonly TeamMember[] = teamMembers
  .filter((member) => member.category === "employee")
  .sort((a, b) => a.displayOrder - b.displayOrder);

export function getLeadershipMembers(members: readonly TeamMember[] = teamMembers): TeamMember[] {
  return members
    .filter((member) => member.category === "leadership")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getEmployeeMembers(members: readonly TeamMember[] = teamMembers): TeamMember[] {
  return members
    .filter((member) => member.category === "employee")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function isValidSocialUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export const SOCIAL_PLATFORM_ORDER: readonly SocialPlatformKey[] = [
  "linkedin",
  "github",
  "x",
  "instagram",
  "fiverr",
  "upwork",
  "portfolio",
  "behance",
  "dribbble",
] as const;

export interface ActiveSocialLink {
  readonly platform: SocialPlatformKey;
  readonly url: string;
}

/**
 * Strict Social Link Resolution:
 * - `enabled: true` AND valid http(s) URL -> visible & clickable link.
 * - `enabled: false` OR empty/invalid URL -> hidden completely (zero greyed-out/broken icons).
 */
export function getActiveSocialLinks(socials: TeamSocialLinks): ActiveSocialLink[] {
  return SOCIAL_PLATFORM_ORDER.filter((platform) => {
    const entry = socials[platform];
    return Boolean(entry?.enabled && isValidSocialUrl(entry.url));
  }).map((platform) => ({
    platform,
    url: socials[platform].url.trim(),
  }));
}

export function getMemberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "BS";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
