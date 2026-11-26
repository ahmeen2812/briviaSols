/**
 * BRIVYA SOLUTIONS — CENTRAL PROJECT PORTFOLIO CATALOG
 * Single source of truth powering `/work` (Work Hero, Category Navigation,
 * Project Index, Right-Side Presentation) and `/work/[slug]` Case Study pages.
 *
 * Adding or toggling any project entry with `status: "published"` automatically
 * updates categories, counts, project index ordering, and static case-study routes.
 * Categories with zero published projects are automatically hidden from navigation.
 */

export type WorkCategoryId =
  | "web-development"
  | "ai-automation"
  | "cloud-infrastructure"
  | "database-software-systems"
  | "office-addins"
  | "google-addons"
  | "google-ads"
  | "meta-ads";

export interface WorkCategoryDefinition {
  readonly id: WorkCategoryId;
  readonly label: string;
  readonly shortLabel: string;
  readonly serviceHref: string;
}

export interface ProjectGalleryItem {
  readonly src: string;
  readonly label: string;
  readonly caption: string;
  readonly alt: string;
}

export interface ProjectCaseStudy {
  readonly isConceptDemo: boolean;
  readonly conceptNote: string;
  readonly overview: string;
  readonly challenge?: string;
  readonly approach?: string;
  readonly solution?: string;
  readonly keyFeatures?: readonly string[];
  readonly technologies?: readonly string[];
  readonly scopeItems?: readonly string[];
  readonly galleryItems: readonly ProjectGalleryItem[];
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly serviceType: string;
  readonly categoryId: WorkCategoryId;
  readonly category: string;
  readonly summary: string;
  readonly coverImage: string;
  readonly coverAlt: string;
  readonly gallery: readonly string[];
  readonly year: string;
  readonly platform: readonly string[];
  readonly deliverablesLabel: string;
  readonly status: "published" | "draft";
  readonly featured?: boolean;
  readonly caseStudy: ProjectCaseStudy;
}

export interface WorkCategoryWithCount extends WorkCategoryDefinition {
  readonly count: number;
}

const ASSET_BASE = "/images/projects/Service_Portfolio_Website_Samples_2026";

const CONCEPT_DISCLOSURE =
  "Concept & Interface Demonstration — All interface views, names, schedules, logs, and sample telemetry shown are illustrative demonstration data created to represent system capabilities rather than confidential client metrics.";

export const WORK_CATEGORIES: readonly WorkCategoryDefinition[] = [
  {
    id: "web-development",
    label: "Web Development",
    shortLabel: "Web Dev",
    serviceHref: "/services/web-development",
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    shortLabel: "AI & Automation",
    serviceHref: "/services/ai-automation",
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud & Infrastructure",
    shortLabel: "Cloud & Ops",
    serviceHref: "/services/cloud-technology",
  },
  {
    id: "database-software-systems",
    label: "Database & Software Systems",
    shortLabel: "Data & Systems",
    serviceHref: "/services/cloud-technology/database-solutions",
  },
  {
    id: "office-addins",
    label: "Microsoft Office Add-ins",
    shortLabel: "Office Add-ins",
    serviceHref: "/services/office-addins",
  },
  {
    id: "google-addons",
    label: "Google Workspace Add-ons",
    shortLabel: "Workspace Add-ons",
    serviceHref: "/services/google-addons",
  },
  {
    id: "google-ads",
    label: "Google Ads & Performance Marketing",
    shortLabel: "Google Ads",
    serviceHref: "/services/google-ads",
  },
  {
    id: "meta-ads",
    label: "Meta Ads & Social Growth",
    shortLabel: "Meta Ads",
    serviceHref: "/services/meta-ads",
  },
] as const;

export const WORK_PAGE_CONTENT = {
  seo: {
    title: "Selected Work & Technical Case Studies | Brivya Solutions",
    description:
      "Explore interactive system demonstrations, web platforms, AI automation workspaces, cloud infrastructure consoles, and database tooling built by Brivya Solutions.",
  },
  hero: {
    eyebrow: "BRIVYA SOLUTIONS / SELECTED WORK",
    headline: "Where ideas become working systems.",
    description:
      "A considered selection of digital products, connected platforms and intelligent automation systems built to solve real business and technical challenges.",
    ctaLinkLabel: "Explore selected projects",
    scrollHint: "Project Archive",
    featuredCaptionPrimary: "ScoutLine Agent Studio — Directed AI Graph & Execution Traces",
    featuredCaptionSecondary: "Hotel Solenne — Hospitality Digital Flagship",
  },
  archive: {
    headerLeft: "BRIVYA / WORK ARCHIVE",
    headerRight: "SELECTED DEMONSTRATIONS & SYSTEMS",
    categoryLabel: "EXPLORE BY CATEGORY",
    indexLabel: "PROJECT INDEX",
    caseStudyLinkLabel: "View Case Study",
    previousLabel: "Previous Project",
    nextLabel: "Next Project",
  },
  cta: {
    heading: "Let's build something meaningful together.",
    description:
      "Have a product concept, platform architecture or automation workflow in mind? Let's discuss how our engineering and design team can bring it into production.",
    primaryButtonText: "Start a Project",
    secondaryButtonText: "Book a Consultation",
  },
} as const;

interface RawProjectSeed {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly serviceType: string;
  readonly categoryId: WorkCategoryId;
  readonly folder: string;
  readonly screens: readonly [string, string, string, string, string];
  readonly screenLabels: readonly [string, string, string, string, string];
  readonly screenCaptions: readonly [string, string, string, string, string];
  readonly summary: string;
  readonly platform: readonly string[];
  readonly featured?: boolean;
  readonly challenge: string;
  readonly approach: string;
  readonly solution: string;
  readonly keyFeatures: readonly string[];
  readonly technologies: readonly string[];
  readonly scopeItems: readonly string[];
}

const CATEGORY_LABEL_MAP = new Map<WorkCategoryId, string>(
  WORK_CATEGORIES.map((c) => [c.id, c.label])
);

function buildProject(seed: RawProjectSeed): Project {
  const category = CATEGORY_LABEL_MAP.get(seed.categoryId) ?? "Other Work";
  const paths = seed.screens.map((file) => `${ASSET_BASE}/${seed.folder}/${file}`);

  const galleryItems: ProjectGalleryItem[] = paths.map((src, idx) => ({
    src,
    label: seed.screenLabels[idx],
    caption: seed.screenCaptions[idx],
    alt: `${seed.title} — ${seed.screenLabels[idx]} interface screen`,
  }));

  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    serviceType: seed.serviceType,
    categoryId: seed.categoryId,
    category,
    summary: seed.summary,
    coverImage: paths[0],
    coverAlt: `${seed.title} (${seed.serviceType}) primary interface view`,
    gallery: paths,
    year: "2026",
    platform: seed.platform,
    deliverablesLabel: "5 Interface Views · 16:9",
    status: "published",
    featured: seed.featured,
    caseStudy: {
      isConceptDemo: true,
      conceptNote: CONCEPT_DISCLOSURE,
      overview: seed.summary,
      challenge: seed.challenge,
      approach: seed.approach,
      solution: seed.solution,
      keyFeatures: seed.keyFeatures,
      technologies: seed.technologies,
      scopeItems: seed.scopeItems,
      galleryItems,
    },
  };
}

const WEB_SITE_LABELS: readonly [string, string, string, string, string] = [
  "Homepage Flagship",
  "Services Overview",
  "Features & Capabilities",
  "Projects & Portfolio",
  "About & Inquiry",
];

const ECOMMERCE_LABELS: readonly [string, string, string, string, string] = [
  "Storefront Homepage",
  "Product Collection",
  "Product Detail",
  "Shopping Cart",
  "Checkout Flow",
];

const PERF_LABELS: readonly [string, string, string, string, string] = [
  "Lighthouse Audit Summary",
  "Core Web Vitals",
  "Network Waterfall",
  "Asset Optimization",
  "Before vs After Sample",
];

const CHATBOT_LABELS: readonly [string, string, string, string, string] = [
  "Live Chat Inbox",
  "Assistant Configuration",
  "Knowledge Base Indexing",
  "Human Handoff Routing",
  "Conversation Analytics",
];

const AGENT_LABELS: readonly [string, string, string, string, string] = [
  "Agent Graph Workspace",
  "Tools & Permissions",
  "Step-by-Step Execution Trace",
  "Testing & Evaluation",
  "Deployment Monitor",
];

const PROCESS_LABELS: readonly [string, string, string, string, string] = [
  "Visual Workflow Builder",
  "Triggers & Conditions",
  "Approval Tasks Queue",
  "Execution History",
  "Error Handling",
];

const CRM_LABELS: readonly [string, string, string, string, string] = [
  "CRM Overview Dashboard",
  "Contact Records",
  "Deal Pipeline",
  "CRM Automation Rules",
  "Sales Analytics",
];

const MESSAGING_LABELS: readonly [string, string, string, string, string] = [
  "WhatsApp Shared Inbox",
  "Email Campaign Builder",
  "Template Manager",
  "Automation Sequences",
  "Delivery & Consent Analytics",
];

const INTEGRATION_LABELS: readonly [string, string, string, string, string] = [
  "Connected Apps Registry",
  "Schema Field Mapping",
  "Workflow Execution",
  "Sync Run History",
  "Error Diagnostics & Retry",
];

const SEEDS: readonly RawProjectSeed[] = [
  // ===========================================================================
  // PILLAR 01 — WEB DEVELOPMENT (18 Projects across Categories 01, 02, 03, 04, 05, 07)
  // ===========================================================================
  {
    id: "hotel-solenne",
    slug: "hotel-solenne-hospitality-website",
    title: "Hotel Solenne",
    serviceType: "Custom Website Development",
    categoryId: "web-development",
    folder: "01_Custom_Website_Development/01_Boutique_Hotel_Website",
    screens: [
      "01_Homepage.png",
      "02_Services_Overview.png",
      "03_Features_Capabilities.png",
      "04_Projects_Portfolio.png",
      "05_About_Contact.png",
    ],
    screenLabels: WEB_SITE_LABELS,
    screenCaptions: [
      "Editorial hospitality arrival pairing stone property photography with an inline reservation availability bar.",
      "Dedicated suite and coastal retreat services layout structuring rooms, spa facilities, and seasonal offerings.",
      "Structured property capability highlights detailing dining, wellness, and curated guest experiences.",
      "Architectural gallery showcasing property interiors, terraced courtyards, and suite layouts.",
      "Direct concierge inquiry and property location guide structured for frictionless stay inquiries.",
    ],
    summary:
      "A bespoke hospitality digital flagship built to showcase architectural suites, wellness spaces, and streamlined direct room availability inquiries.",
    platform: ["Web Flagship", "Desktop & Responsive UI"],
    featured: true,
    challenge:
      "Luxury hospitality websites frequently bury availability checks beneath heavy video embeds or over-engineered booking funnels that dilute editorial atmosphere.",
    approach:
      "Pairs calm serif display typography and warm architectural imagery with an anchored date, guest count, and suite preference availability strip above the fold.",
    solution:
      "Five structured page views guiding visitors from initial property atmosphere through rooms, dining, visual galleries, and direct concierge inquiries.",
    keyFeatures: [
      "Inline check-in, check-out, guest, and suite availability bar",
      "Structured three-column architectural, dining, and wellness breakdown",
      "Editorial multi-page narrative spanning suites, facilities, and direct booking inquiries",
    ],
    technologies: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Responsive Typography"],
    scopeItems: ["Brand & Digital Art Direction", "5-Page Architecture", "Direct Inquiry Experience"],
  },
  {
    id: "northshore-dental-studio",
    slug: "northshore-dental-studio-website",
    title: "Northshore Dental Studio",
    serviceType: "Custom Website Development",
    categoryId: "web-development",
    folder: "01_Custom_Website_Development/02_Dental_Clinic_Website",
    screens: [
      "01_Homepage.png",
      "02_Services_Overview.png",
      "03_Features_Capabilities.png",
      "04_Projects_Portfolio.png",
      "05_About_Contact.png",
    ],
    screenLabels: WEB_SITE_LABELS,
    screenCaptions: [
      "Reassuring patient-first hero with clear preventative, restorative, and cosmetic appointment orientation.",
      "Clinical service catalog organizing general care, diagnostics, and hygiene treatments clearly.",
      "Patient technology and clinical standards overview highlighting comfort and imaging clarity.",
      "Clinic interior and smile care environment showcases tailored for patient trust.",
      "Accessible clinic hours, directions, and new-patient appointment contact details.",
    ],
    summary:
      "A clean, trust-focused clinical website organizing dental treatments, modern care capabilities, and accessible appointment booking information.",
    platform: ["Web Flagship", "Patient Portal UI"],
    challenge:
      "Medical and dental practice sites often overwhelm patients with clinical jargon and cluttered booking widgets.",
    approach:
      "Organizes treatment disciplines cleanly with calm visual hierarchy, straightforward procedural summaries, and unmistakable contact access.",
    solution:
      "Cohesive five-view clinic website covering treatment overview, clinical capabilities, practice tour, and new-patient inquiries.",
    keyFeatures: [
      "Clear categorization across preventative, restorative, and aesthetic treatments",
      "Transparent equipment and comfort standards showcase",
      "Streamlined patient contact and clinic hours layout",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Accessible Semantics"],
    scopeItems: ["Clinic UX Architecture", "Service Taxonomy UI", "Patient Contact Flow"],
  },
  {
    id: "oakridge-builders",
    slug: "oakridge-builders-renovation-website",
    title: "Oakridge Builders",
    serviceType: "Custom Website Development",
    categoryId: "web-development",
    folder: "01_Custom_Website_Development/03_Home_Renovation_Website",
    screens: [
      "01_Homepage.png",
      "02_Services_Overview.png",
      "03_Features_Capabilities.png",
      "04_Projects_Portfolio.png",
      "05_About_Contact.png",
    ],
    screenLabels: WEB_SITE_LABELS,
    screenCaptions: [
      "Architectural renovation homepage featuring completed craftsmanship photography and consultation positioning.",
      "Service scope overview detailing structural extensions, kitchen remodeling, and custom joinery.",
      "Construction process breakdown covering permitting, scheduling transparency, and site supervision.",
      "Before-and-after architectural project showcase curated by project scope and material finish.",
      "Structured homeowner consultation intake with project timeline and scope fields.",
    ],
    summary:
      "A craftsmanship-led website concept for a residential remodeling and architectural construction practice focused on project clarity and consultation intake.",
    platform: ["Web Flagship", "Portfolio Showcase"],
    challenge:
      "Prospective homeowners struggle to evaluate construction reliability, project process transparency, and finish quality online.",
    approach:
      "Establishes credibility early through completed residence imagery, structured build phases, and direct architectural scope breakdowns.",
    solution:
      "A five-screen digital presence covering remodeling services, build methodology, completed project showcases, and project estimation requests.",
    keyFeatures: [
      "Architectural project portfolio organized by scope and finish",
      "Transparent step-by-step construction process documentation",
      "Qualified homeowner consultation inquiry layout",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Responsive Image Pipeline"],
    scopeItems: ["Portfolio Presentation", "Build Process Documentation", "Consultation Funnel"],
  },
  {
    id: "bookwell-web-app",
    slug: "bookwell-appointment-marketplace",
    title: "Bookwell Web Application",
    serviceType: "Full-Stack Web Applications",
    categoryId: "web-development",
    folder: "02_Full_Stack_Web_Applications/01_Appointment_Booking_Marketplace",
    screens: [
      "01_Homepage.png",
      "02_Services_Overview.png",
      "03_Features_Capabilities.png",
      "04_Projects_Portfolio.png",
      "05_About_Contact.png",
    ],
    screenLabels: [
      "Marketplace Discovery",
      "Provider Directory",
      "Scheduling Capabilities",
      "Featured Providers",
      "Partner & Contact",
    ],
    screenCaptions: [
      "Appointment marketplace landing experience enabling service search, slot discovery, and category filtering.",
      "Multi-specialty service provider directory comparing real-time calendar openings and service durations.",
      "Booking lifecycle capabilities spanning automated reminders, rescheduling rules, and calendar sync.",
      "Curated showcase of verified service studios and appointment workflows.",
      "Provider onboarding inquiry and platform support entry point.",
    ],
    summary:
      "An appointment booking marketplace application connecting multi-location service providers with real-time slot discovery and calendar management.",
    platform: ["Full-Stack Web App", "Scheduling Platform"],
    challenge:
      "Service marketplaces need to surface live practitioner availability across dozens of specialties without making booking steps feel heavy.",
    approach:
      "Designs clear card hierarchy for practitioner availability, duration pricing, and direct slot reservation across desktop and mobile.",
    solution:
      "End-to-end web application prototype supporting discovery, provider profiles, scheduling rules, and onboarding inquiries.",
    keyFeatures: [
      "Specialty-based service discovery and real-time slot selection UI",
      "Provider directory with transparent session duration and service tags",
      "Automated scheduling policy and partner onboarding overview",
    ],
    technologies: ["React", "TypeScript", "Relational Scheduling Schema", "REST API"],
    scopeItems: ["Marketplace UX", "Calendar Slot Model", "Provider Directory"],
  },
  {
    id: "dispatchgrid-web-app",
    slug: "dispatchgrid-fleet-operations-platform",
    title: "DispatchGrid Web Application",
    serviceType: "Full-Stack Web Applications",
    categoryId: "web-development",
    folder: "02_Full_Stack_Web_Applications/02_Fleet_Field_Service_Platform",
    screens: [
      "01_Homepage.png",
      "02_Services_Overview.png",
      "03_Features_Capabilities.png",
      "04_Projects_Portfolio.png",
      "05_About_Contact.png",
    ],
    screenLabels: [
      "Operations Overview",
      "Fleet Modules",
      "Dispatch & Routing",
      "Deployment Examples",
      "Operations Inquiry",
    ],
    screenCaptions: [
      "Field-service and fleet coordination landing view introducing live crew scheduling and job status tracking.",
      "Modular overview covering territory assignment, van inventory readiness, and customer notifications.",
      "Capability breakdown detailing conflict detection, SLA alerts, and technician mobile handoff.",
      "Operational use-case views across regional maintenance and delivery fleets.",
      "Enterprise fleet consultation and technical scoping contact view.",
    ],
    summary:
      "A multi-crew field service and fleet dispatch web platform structuring route assignment, SLA alerts, and technician job handoff.",
    platform: ["Full-Stack Web App", "Operations Portal"],
    challenge:
      "Field operations teams juggling phone updates and static spreadsheets lose visibility into technician arrival windows and open job backlogs.",
    approach:
      "Models dispatch operations around live job queues, territory assignments, and structured mobile field completion.",
    solution:
      "Complete five-screen web application overview demonstrating crew routing modules, status pipelines, and operational integrations.",
    keyFeatures: [
      "Territory and shift-aware technician scheduling workflows",
      "Live job milestone transitions synchronized with field devices",
      "SLA window visibility and escalation queue overview",
    ],
    technologies: ["Next.js", "TypeScript", "Geolocation Workflows", "Event Queues"],
    scopeItems: ["Dispatch Console Architecture", "Crew Routing Flows", "Operations Portal"],
  },
  {
    id: "scholaris-campus-portal",
    slug: "scholaris-education-management-portal",
    title: "Scholaris Campus Portal",
    serviceType: "Full-Stack Web Applications",
    categoryId: "web-development",
    folder: "02_Full_Stack_Web_Applications/03_Education_Management_Portal",
    screens: [
      "01_Homepage.png",
      "02_Services_Overview.png",
      "03_Features_Capabilities.png",
      "04_Projects_Portfolio.png",
      "05_About_Contact.png",
    ],
    screenLabels: [
      "Campus Portal Home",
      "Academic Modules",
      "Role Capabilities",
      "Cohort Deployments",
      "Admissions & Support",
    ],
    screenCaptions: [
      "Academic administration portal entry orienting faculty, students, and registrar staff.",
      "Structured modules spanning course enrollment, attendance tracking, and syllabus delivery.",
      "Role-based permission overview balancing student submissions, grading, and registrar records.",
      "Departmental rollout examples showcasing cohort management and term timetables.",
      "Institutional inquiry and academic onboarding guide.",
    ],
    summary:
      "An academic management web portal concept unifying course enrollment, term scheduling, and role-based student and faculty workflows.",
    platform: ["Full-Stack Web App", "Education Portal"],
    challenge:
      "Educational institutions often run disconnected systems for enrollment, syllabus materials, attendance, and registrar reporting.",
    approach:
      "Structures all academic workflows behind clear role separation while preserving fast term navigation for coordinators.",
    solution:
      "Integrated academic portal design detailing enrollment workflows, grading permissions, and institutional cohort structure.",
    keyFeatures: [
      "Unified student, faculty, and registrar workflow architecture",
      "Term timetable, attendance, and coursework submission tracking",
      "Department-scoped access controls and academic records structure",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Role-Based Access Control"],
    scopeItems: ["Academic Information Architecture", "Enrollment Workflows", "Portal UI"],
  },
  {
    id: "ledgerflow-billing-saas",
    slug: "ledgerflow-subscription-billing-saas",
    title: "LedgerFlow Billing Console",
    serviceType: "SaaS Product Development",
    categoryId: "web-development",
    folder: "03_SaaS_Product_Development/01_Subscription_Billing_SaaS",
    screens: [
      "01_Billing_Dashboard.png",
      "02_Subscriptions_List.png",
      "03_Invoices_Ledger.png",
      "04_Plans_Catalog.png",
      "05_Billing_Settings.png",
    ],
    screenLabels: [
      "Billing Overview",
      "Subscriptions List",
      "Invoices & Ledger",
      "Plans & Pricing Catalog",
      "Billing Settings",
    ],
    screenCaptions: [
      "Subscription & revenue overview tracking active plans, open invoices, failed payments, and recent settlement ledger rows.",
      "Searchable customer subscriptions directory displaying billing cycles, seat tiers, and renewal dates.",
      "Double-entry invoice and payment ledger isolating settled ACH transfers, open Net-30 invoices, and scheduled retries.",
      "Plan catalog configuration supporting metered enterprise, growth seat-based, and starter team billing structures.",
      "Automated dunning rules, payment method defaults, and webhook delivery preferences.",
    ],
    summary:
      "A multi-tenant subscription and B2B invoice management SaaS console covering recurring revenue visibility, ledger tracking, and automated payment retries.",
    platform: ["Multi-Tenant SaaS", "Web Console"],
    challenge:
      "B2B SaaS finance teams need simultaneous clarity on automated card retries, Net-30 wire invoices, and per-seat plan changes without stitching multiple tools.",
    approach:
      "Separates high-level revenue telemetry cleanly from transactional invoice ledgers, plan versioning, and dunning automation controls.",
    solution:
      "A cohesive five-view billing workspace with overview KPIs, subscriber directories, invoice ledgers, pricing plans, and billing policy configuration.",
    keyFeatures: [
      "Unified visibility into ACH, card, and Net-30 wire settlements",
      "Dedicated ledger view with payment status and smart retry tracking",
      "Multi-tier seat and usage plan catalog management",
    ],
    technologies: ["React", "TypeScript", "Double-Entry Billing Model", "Payment Webhooks"],
    scopeItems: ["SaaS Product Design", "Subscription Ledger UI", "Dunning & Plan Catalog"],
  },
  {
    id: "cadence-sprint-workspace",
    slug: "cadence-project-collaboration-saas",
    title: "Cadence Sprint Workspace",
    serviceType: "SaaS Product Development",
    categoryId: "web-development",
    folder: "03_SaaS_Product_Development/02_Project_Collaboration_SaaS",
    screens: [
      "01_Cycle_Dashboard.png",
      "02_Backlog_Issues.png",
      "03_Project_Timeline.png",
      "04_Team_Workload.png",
      "05_Workspace_Settings.png",
    ],
    screenLabels: [
      "Cycle Dashboard",
      "Backlog & Issues",
      "Project Timeline",
      "Team Workload",
      "Workspace Settings",
    ],
    screenCaptions: [
      "Sprint cycle overview tracking active milestone velocity, blocked tasks, and review queue items.",
      "Dense backlog triage table structured for keyboard-friendly filtering, priority assignment, and cycle scoping.",
      "Horizontal roadmap view aligning cross-functional deliverables against engineering sprint windows.",
      "Team capacity breakdown balancing assigned points across product, design, and engineering contributors.",
      "Workspace configuration for cycle cadence, triage rules, and notification permissions.",
    ],
    summary:
      "An engineering and product sprint collaboration workspace combining triage backlogs, delivery timelines, and balanced workload visibility.",
    platform: ["SaaS Application", "Product Management UI"],
    challenge:
      "Product teams often outgrow noisy boards where cycle priorities, blockers, and long-horizon milestones drift out of sync.",
    approach:
      "Focuses the interface on crisp typographic hierarchy across cycle health, triage lists, timeline dependencies, and team capacity.",
    solution:
      "Five focused application screens engineered for sprint planning, issue triaging, milestone scheduling, and workload balancing.",
    keyFeatures: [
      "Cycle overview paired with structured backlog prioritization",
      "Cross-team roadmap timeline and workload allocation views",
      "Configurable sprint defaults and repository workflow rules",
    ],
    technologies: ["React", "TypeScript", "Optimistic UI State", "Keyboard Navigation"],
    scopeItems: ["SaaS UI Architecture", "Sprint Planning Workflows", "Workspace Controls"],
  },
  {
    id: "kindred-hris-application",
    slug: "kindred-hr-workforce-saas",
    title: "Kindred HRIS Application",
    serviceType: "SaaS Product Development",
    categoryId: "web-development",
    folder: "03_SaaS_Product_Development/03_HR_Workforce_SaaS",
    screens: [
      "01_HR_Dashboard.png",
      "02_Employee_Directory.png",
      "03_Onboarding_Tracker.png",
      "04_Leave_Attendance.png",
      "05_Payroll_Overview.png",
    ],
    screenLabels: [
      "HR Overview Dashboard",
      "Employee Directory",
      "Onboarding Tracker",
      "Leave & Attendance",
      "Payroll Overview",
    ],
    screenCaptions: [
      "People operations summary tracking active headcount, pending approvals, and upcoming onboarding cohorts.",
      "Filterable organization directory organizing teams, reporting lines, and employment classification.",
      "Step-by-step new-hire onboarding checklist coordinating IT provisioning, compliance forms, and manager tasks.",
      "Team leave calendar and attendance approval queue built for clear coverage planning.",
      "Pre-payroll verification screen summarizing pay run status, adjustments, and approvals.",
    ],
    summary:
      "A workforce and people-operations SaaS interface uniting employee directories, structured onboarding checklists, leave approvals, and payroll readiness.",
    platform: ["SaaS Application", "Internal Ops Console"],
    challenge:
      "People operations teams lose hours chasing onboarding tasks, PTO conflicts, and payroll adjustments across fragmented spreadsheets.",
    approach:
      "Centralizes recurring HR workflows into predictable status queues with clear ownership across HR, IT, and department leads.",
    solution:
      "Five-module HRIS interface covering workforce overview, organization directory, onboarding pipelines, time-off approvals, and payroll review.",
    keyFeatures: [
      "Cross-department new-hire onboarding checklist engine",
      "Leave calendar paired with manager approval routing",
      "Structured pre-run payroll review and verification ledger",
    ],
    technologies: ["Next.js", "TypeScript", "Role-Scoped Access", "Workflow State Machine"],
    scopeItems: ["Workforce Product UI", "Onboarding Tracker", "Payroll Verification View"],
  },
  {
    id: "atelier-kova-store",
    slug: "atelier-kova-fashion-ecommerce",
    title: "Atelier Kova Online Store",
    serviceType: "E-Commerce Development",
    categoryId: "web-development",
    folder: "04_Ecommerce_Development/01_Premium_Fashion_Store",
    screens: [
      "01_Store_Homepage.png",
      "02_Product_Collection.png",
      "03_Product_Detail.png",
      "04_Shopping_Cart.png",
      "05_Checkout.png",
    ],
    screenLabels: ECOMMERCE_LABELS,
    screenCaptions: [
      "Minimalist seasonal lookbook arrival highlighting natural wool outerwear with generous negative space.",
      "Filterable product catalog presenting garment silhouettes, fabric weights, and quick variant previews.",
      "Structured garment detail view offering color swatch toggles, size matrix, fabric composition, and sticky bag action.",
      "Slide-over and dedicated bag review screen displaying line-item quantity adjustments and shipping thresholds.",
      "Distraction-free checkout flow separating shipping verification, delivery tiers, and payment completion.",
    ],
    summary:
      "An editorial ready-to-wear commerce storefront engineered around tactile lookbook pacing, variant clarity, and frictionless checkout.",
    platform: ["Headless Commerce", "Responsive Storefront"],
    challenge:
      "Apparel brands often sacrifice conversion usability for editorial lookbook styling, leaving sizing and checkout clarity behind.",
    approach:
      "Balances museum-quiet serif headlines and photography on landing screens with crisp, unmistakable swatch, size, and bag interactions downstream.",
    solution:
      "Complete five-step commerce flow from seasonal collection discovery through product variants, cart review, and multi-step checkout.",
    keyFeatures: [
      "Interactive color swatch and garment size selector state",
      "Clean five-stage purchase funnel from collection to checkout",
      "Restrained editorial layout tailored to outerwear and apparel photography",
    ],
    technologies: ["Next.js", "Headless Storefront Architecture", "Tailwind CSS", "Cart State"],
    scopeItems: ["Storefront Design", "Variant & Bag UX", "Checkout Funnel"],
  },
  {
    id: "vela-botanicals-store",
    slug: "vela-botanicals-skincare-ecommerce",
    title: "Vela Botanicals Online Store",
    serviceType: "E-Commerce Development",
    categoryId: "web-development",
    folder: "04_Ecommerce_Development/02_Beauty_Skincare_Store",
    screens: [
      "01_Store_Homepage.png",
      "02_Product_Collection.png",
      "03_Product_Detail.png",
      "04_Shopping_Cart.png",
      "05_Checkout.png",
    ],
    screenLabels: ECOMMERCE_LABELS,
    screenCaptions: [
      "Calm botanical skincare storefront introducing formulation philosophy and seasonal ritual collections.",
      "Filterable regimen collection structured by skin type, routine step, and formulation volume.",
      "Product formulation breakdown highlighting key botanical actives, application cadence, and bottle size options.",
      "Shopping bag interface surfacing replenishment frequency options and order summary clarity.",
      "Clean single-column checkout experience built for fast mobile and desktop completion.",
    ],
    summary:
      "A modern botanical skincare storefront designed to present formulation transparency, routine layering, and smooth repeat checkout.",
    platform: ["Headless Commerce", "Direct-to-Consumer Web"],
    challenge:
      "Skincare shoppers frequently hesitate at checkout when active ingredients, skin-type suitability, and size options feel hidden.",
    approach:
      "Brings formulation clarity, step-in-routine guidance, and clean cart feedback forward without visual clutter.",
    solution:
      "Complete five-screen D2C storefront spanning formulation storytelling, filtered collection browsing, detailed product pages, bag, and checkout.",
    keyFeatures: [
      "Ingredient and skin-type filtering across regimen categories",
      "Clean formulation detail layout with volume variant controls",
      "Streamlined cart summary and distraction-free checkout",
    ],
    technologies: ["Next.js", "TypeScript", "E-Commerce UI System", "Optimized Media"],
    scopeItems: ["Brand Storefront UI", "Collection Filtering", "Checkout UX"],
  },
  {
    id: "kestrel-audio-store",
    slug: "kestrel-audio-electronics-ecommerce",
    title: "Kestrel Audio Online Store",
    serviceType: "E-Commerce Development",
    categoryId: "web-development",
    folder: "04_Ecommerce_Development/03_Electronics_Technology_Store",
    screens: [
      "01_Store_Homepage.png",
      "02_Product_Collection.png",
      "03_Product_Detail.png",
      "04_Shopping_Cart.png",
      "05_Checkout.png",
    ],
    screenLabels: ECOMMERCE_LABELS,
    screenCaptions: [
      "Precision consumer hardware storefront spotlighting acoustic engineering and flagship listening equipment.",
      "Product lineup grid comparing studio monitors, DAC amplifiers, and wireless reference headphones.",
      "Technical hardware specification page pairing industrial design views with acoustic specs and finish selection.",
      "Cart management interface confirming accessory compatibility, warranty coverage, and shipping estimates.",
      "Structured hardware checkout supporting express shipping selection and invoice billing options.",
    ],
    summary:
      "A technical consumer audio storefront designed to balance industrial hardware presentation with detailed acoustic specifications and conversion flow.",
    platform: ["Headless Commerce", "Hardware Storefront"],
    challenge:
      "Consumer electronics buyers compare technical specs across models and need confidence around accessories and warranty coverage before purchasing.",
    approach:
      "Structures hardware collections around clear visual finish toggles, readable spec tables, and friction-free bag inspection.",
    solution:
      "Five-stage hardware retail experience covering flagship launch landing, model comparison catalog, spec-rich PDP, cart, and checkout.",
    keyFeatures: [
      "Spec-forward product detail architecture with finish selectors",
      "Model comparison clarity across listening categories",
      "Express shipping and warranty awareness in bag and checkout",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Structured Spec Schemas"],
    scopeItems: ["Hardware Storefront", "Technical PDP Architecture", "Checkout Funnel"],
  },
  {
    id: "payrail-api-console",
    slug: "payrail-payment-api-platform",
    title: "PayRail Developer API Console",
    serviceType: "API Development & Integration",
    categoryId: "web-development",
    folder: "05_API_Development_Integration/01_Payment_API_Platform",
    screens: [
      "01_API_Workspace.png",
      "02_Endpoint_Explorer.png",
      "03_Auth_Headers.png",
      "04_Webhook_Config.png",
      "05_API_Logs.png",
    ],
    screenLabels: [
      "Interactive Request Builder",
      "Endpoint Explorer",
      "Auth & Keys Management",
      "Webhook Subscriptions",
      "API Request & Response Logs",
    ],
    screenCaptions: [
      "Dark-mode developer workspace displaying live JSON request payloads alongside formatted HTTP 201 response timing.",
      "Endpoint reference index spanning payment intents, refunds, customer tokens, and settlement webhooks.",
      "Scoped API key and HMAC bearer authentication header console with sandbox test rotation controls.",
      "Webhook endpoint builder configuring retry backoff schedules and subscribed payment event types.",
      "Chronological HTTP trace log isolating request latency, payload status codes, and idempotency keys.",
    ],
    summary:
      "A Stripe-caliber developer API sandbox console allowing engineering teams to construct payment intent requests, manage webhook signatures, and inspect live HTTP logs.",
    platform: ["Developer Portal", "REST API Sandbox"],
    challenge:
      "Integrating payment and settlement APIs slows down when developers must jump between static documentation, local scripts, and separate log viewers.",
    approach:
      "Unifies request construction, bearer auth inspection, webhook routing, and response latency traces inside a single dark-mode workbench.",
    solution:
      "Interactive five-screen API developer portal tailored for testing payment endpoints, configuring webhooks, and auditing payload traces.",
    keyFeatures: [
      "Side-by-side JSON request body and formatted response inspector",
      "Endpoint collection sidebar covering intents, refunds, and webhooks",
      "Scoped key rotation and real-time HTTP delivery telemetry",
    ],
    technologies: ["REST API Architecture", "JSON Schema Validation", "HMAC Webhooks", "TypeScript"],
    scopeItems: ["Developer Experience (DX)", "Interactive Sandbox UI", "Webhook Diagnostics"],
  },
  {
    id: "freightlink-api-studio",
    slug: "freightlink-shipping-logistics-api",
    title: "FreightLink API Studio",
    serviceType: "API Development & Integration",
    categoryId: "web-development",
    folder: "05_API_Development_Integration/02_Shipping_Logistics_API_Platform",
    screens: [
      "01_API_Workspace.png",
      "02_Carrier_Integrations.png",
      "03_Tracking_Events.png",
      "04_Webhook_Config.png",
      "05_API_Logs.png",
    ],
    screenLabels: [
      "Logistics API Workspace",
      "Carrier Integrations",
      "Tracking Events Stream",
      "Webhook Subscriptions",
      "API Diagnostics Logs",
    ],
    screenCaptions: [
      "Unified shipping API testing workspace validating multi-carrier label generation and rate quote payloads.",
      "Carrier adapter directory normalizing customs forms, rate quotes, and manifest rules across freight providers.",
      "Normalized shipment event timeline translating carrier-specific scan codes into consistent milestone states.",
      "Dispatch webhook configuration routing transit exceptions and proof-of-delivery updates downstream.",
      "Carrier API request audit trail flagging timeout retries and schema validation errors.",
    ],
    summary:
      "A logistics and carrier aggregation API studio normalizing shipping rate quotes, multi-carrier labels, and normalized tracking webhooks.",
    platform: ["API Platform", "Logistics Middleware"],
    challenge:
      "Multi-carrier logistics teams face incompatible XML/JSON schemas, inconsistent tracking event names, and brittle timeout handling across freight partners.",
    approach:
      "Normalizes carrier connections, label requests, and transit event streams behind a single developer console.",
    solution:
      "Five-module API workbench covering request simulation, carrier adapters, event normalization, webhooks, and diagnostic request logs.",
    keyFeatures: [
      "Normalized JSON schema across heterogeneous freight carriers",
      "Real-time tracking event translation and webhook fan-out",
      "Carrier API health monitoring and failed payload inspection",
    ],
    technologies: ["REST Middleware", "Adapter Pattern", "Webhook Retries", "TypeScript"],
    scopeItems: ["Carrier Normalization API", "Webhook Dispatch", "Developer Console"],
  },
  {
    id: "syncbridge-developer-portal",
    slug: "syncbridge-business-data-integration",
    title: "SyncBridge Developer Portal",
    serviceType: "API Development & Integration",
    categoryId: "web-development",
    folder: "05_API_Development_Integration/03_Business_Data_Integration_Platform",
    screens: [
      "01_API_Workspace.png",
      "02_OAuth_Connections.png",
      "03_Field_Mapping.png",
      "04_Sync_Jobs.png",
      "05_Error_Logs.png",
    ],
    screenLabels: [
      "Unified Integration API",
      "OAuth Connections",
      "Field Mapping Studio",
      "Scheduled Sync Jobs",
      "Sync Error Logs",
    ],
    screenCaptions: [
      "Developer API playground querying normalized CRM, accounting, and ERP business records.",
      "Multi-tenant OAuth token lifecycle console monitoring scoped external app grants and refresh health.",
      "Interactive schema transform screen mapping third-party object attributes into canonical internal fields.",
      "Incremental sync scheduler showing batch watermarks, throughput, and next execution windows.",
      "Structured payload error console pinpointing schema drift and per-record retry status.",
    ],
    summary:
      "A business data integration developer portal streamlining OAuth token management, custom field mapping, incremental sync jobs, and error recovery.",
    platform: ["Integration Middleware", "API Portal"],
    challenge:
      "B2B SaaS products building multiple third-party ERP and CRM integrations spend months maintaining OAuth refresh loops and custom customer field maps.",
    approach:
      "Encapsulates OAuth credential storage, declarative schema mapping, and incremental sync checkpoints in a clean developer interface.",
    solution:
      "Five-part developer portal presenting unified API testing, OAuth health, schema mapping, sync execution history, and error triage.",
    keyFeatures: [
      "Managed OAuth token lifecycle and tenant scope inspection",
      "Declarative field mapping between external and canonical schemas",
      "Incremental sync execution tracking and granular error replay",
    ],
    technologies: ["OAuth 2.0 Flows", "REST / GraphQL", "Schema Transforms", "TypeScript"],
    scopeItems: ["Integration Control Plane", "OAuth Token Management", "Field Mapping UI"],
  },
  {
    id: "perflab-ecommerce-audit",
    slug: "perflab-ecommerce-speed-optimization",
    title: "PerfLab E-Com Lighthouse & CWV Audit",
    serviceType: "Website Performance Optimization",
    categoryId: "web-development",
    folder: "07_Website_Performance_Optimization/01_Ecommerce_Speed_Optimization",
    screens: [
      "01_Lighthouse_Audit.png",
      "02_Core_Web_Vitals.png",
      "03_Network_Waterfall.png",
      "04_Asset_Optimization.png",
      "05_Before_After_Sample.png",
    ],
    screenLabels: PERF_LABELS,
    screenCaptions: [
      "Audit summary workstation displaying Performance, Accessibility, Best Practices, and SEO gauges alongside Core Web Vitals thresholds.",
      "Deep Core Web Vitals breakdown analyzing LCP, INP, CLS, and server TTFB distributions across storefront templates.",
      "Critical-path network waterfall isolating render-blocking scripts, font loading stalls, and main-thread long tasks.",
      "Media, JavaScript bundle, and third-party tag optimization checklist prioritizing weight reductions.",
      "Controlled before-and-after sample comparison demonstrating layout stability and critical rendering improvements.",
    ],
    summary:
      "An e-commerce web performance diagnostics suite highlighting Lighthouse vitals, render-blocking waterfalls, asset compression targets, and before/after sample benchmarks.",
    platform: ["Web Performance Suite", "Diagnostics Console"],
    challenge:
      "High-SKU storefronts frequently suffer slow Largest Contentful Paint and layout shift regressions caused by unoptimized media and third-party scripts.",
    approach:
      "Maps Core Web Vitals bottlenecks directly to critical-path network requests, bundle payloads, and actionable remediation checklists.",
    solution:
      "Five-view optimization workbench documenting Lighthouse gauges, CWV thresholds, request waterfalls, asset audits, and sample regression tracking.",
    keyFeatures: [
      "Core Web Vitals threshold comparison table (LCP, INP, CLS, TTFB)",
      "Critical-path network waterfall and main-thread bottleneck isolation",
      "Asset weight audit and sample before/after diagnostic comparison",
    ],
    technologies: ["Lighthouse Telemetry", "Core Web Vitals", "Bundle Splitting", "Next/Image Pipeline"],
    scopeItems: ["Performance Telemetry UI", "Critical Path Diagnostics", "Asset Audit Workflow"],
  },
  {
    id: "vitalspress-publishing-audit",
    slug: "vitalspress-publishing-performance",
    title: "VitalsPress Publishing Performance Audit",
    serviceType: "Website Performance Optimization",
    categoryId: "web-development",
    folder: "07_Website_Performance_Optimization/02_Media_Publishing_Performance",
    screens: [
      "01_Lighthouse_Audit.png",
      "02_Core_Web_Vitals.png",
      "03_Network_Waterfall.png",
      "04_Asset_Optimization.png",
      "05_Before_After_Sample.png",
    ],
    screenLabels: PERF_LABELS,
    screenCaptions: [
      "Editorial publishing performance summary evaluating article template Lighthouse health and CWV pass margins.",
      "Article-type Core Web Vitals inspection surfacing INP delays from heavy embed and comment scripts.",
      "Network execution timeline identifying async script deferrals and edge cache hit ratios.",
      "Font subsetting, responsive hero image sizing, and script hydration deferral audit log.",
      "Baseline vs. optimized template comparison illustrating clean reading experience stabilization.",
    ],
    summary:
      "A content-publishing performance workstation isolating ad-script contention, font blocking, and article-page Core Web Vitals across high-volume layouts.",
    platform: ["Web Performance Suite", "Publishing Telemetry"],
    challenge:
      "Digital publications rely on rich embeds and analytics scripts that can severely degrade Interaction to Next Paint and Cumulative Layout Shift.",
    approach:
      "Audits script scheduling, font preloading, and reserved media aspect boxes to stabilize reader experience.",
    solution:
      "Structured five-screen performance console tailored for editorial templates, CDN caching headers, and script hydration tuning.",
    keyFeatures: [
      "Editorial template CWV inspection across article and index views",
      "Third-party embed and main-thread execution waterfall",
      "Reserved-space CLS and font-loading remediation tracking",
    ],
    technologies: ["Edge Caching", "Resource Hints", "Core Web Vitals", "TypeScript"],
    scopeItems: ["Publishing Speed Audit", "Script Deferral Strategy", "CWV Monitoring"],
  },
  {
    id: "coremetric-enterprise-audit",
    slug: "coremetric-enterprise-performance-consultancy",
    title: "CoreMetric Enterprise RUM & CWV Audit",
    serviceType: "Website Performance Optimization",
    categoryId: "web-development",
    folder: "07_Website_Performance_Optimization/03_Enterprise_Performance_Consultancy",
    screens: [
      "01_Lighthouse_Audit.png",
      "02_Core_Web_Vitals.png",
      "03_Network_Waterfall.png",
      "04_Asset_Optimization.png",
      "05_Before_After_Sample.png",
    ],
    screenLabels: PERF_LABELS,
    screenCaptions: [
      "Enterprise web platform audit summary aggregating lab Lighthouse scores alongside real-user threshold targets.",
      "Segmented Core Web Vitals inspection comparing mobile 4G and desktop route responsiveness.",
      "Distributed origin-to-edge request waterfall breaking down DNS, TLS, TTFB, and asset decode latency.",
      "Monorepo bundle and dependency tree-shaking diagnostics highlighting shared chunk bloat.",
      "Release-over-release sample validation verifying zero performance budget regressions.",
    ],
    summary:
      "An enterprise Real User Monitoring and engineering performance workbench designed to enforce web vitals budgets across complex multi-team applications.",
    platform: ["Enterprise Diagnostics", "RUM Telemetry Console"],
    challenge:
      "Large engineering organizations lack a unified view connecting CI Lighthouse checks to real-user latency breakdowns and dependency bloat.",
    approach:
      "Pairs strict performance budget thresholds with route-level waterfall diagnostics and chunk-level asset analysis.",
    solution:
      "Five-screen consultancy workbench built for sustained Core Web Vitals governance and pre-release regression checks.",
    keyFeatures: [
      "Route-level Core Web Vitals governance against target thresholds",
      "Origin TTFB and distributed asset timing waterfall",
      "Sample release comparison for engineering budget enforcement",
    ],
    technologies: ["RUM Instrumentation", "CI Performance Budgets", "Edge CDN", "TypeScript"],
    scopeItems: ["Performance Governance UI", "RUM Breakdown", "Budget Enforcement"],
  },

  // ===========================================================================
  // PILLAR 02 — AI & AUTOMATION (21 Projects across Categories 08..14)
  // ===========================================================================
  {
    id: "loom-concierge-assistant",
    slug: "loom-concierge-shopping-assistant",
    title: "Loom Concierge Live Inbox & Config",
    serviceType: "AI Chatbots & Assistants",
    categoryId: "ai-automation",
    folder: "08_AI_Chatbots_Assistants/01_Ecommerce_Shopping_Assistant",
    screens: [
      "01_Live_Chat_Inbox.png",
      "02_Assistant_Config.png",
      "03_Knowledge_Base.png",
      "04_Human_Handoff.png",
      "05_Chat_Analytics.png",
    ],
    screenLabels: CHATBOT_LABELS,
    screenCaptions: [
      "Three-column live assistant inbox unifying open customer threads, AI product recommendations, and live cart context.",
      "Assistant tone, storefront guardrails, and escalation trigger controls scoped to product discovery.",
      "Synced SKU catalog and policy document index grounding responses in verified stock availability.",
      "Human-handoff routing panel transferring gift-wrap or custom requests seamlessly to studio specialists.",
      "Conversation resolution, handoff rate, and topic volume dashboard.",
    ],
    summary:
      "An e-commerce conversational concierge platform pairing live cart-aware AI assistance with grounded SKU knowledge bases and one-click specialist handoff.",
    platform: ["AI Assistant Console", "Live Support Inbox"],
    challenge:
      "Storefront chatbots frustrate shoppers when they invent out-of-stock SKUs or trap nuanced customer inquiries inside dead-end loops.",
    approach:
      "Grounds assistant replies strictly against live catalog inventory while exposing cart context and instant human takeover right in the thread.",
    solution:
      "Complete five-screen assistant operations console spanning live inbox triage, prompt guardrails, knowledge indexing, escalation rules, and analytics.",
    keyFeatures: [
      "Real-time customer cart context panel inside live support inbox",
      "Explicit human takeover handoff preserving full conversation state",
      "Catalog-grounded knowledge base syncing SKUs and policy docs",
    ],
    technologies: ["LLM Retrieval (RAG)", "Live WebSockets", "Human-in-the-Loop Routing", "TypeScript"],
    scopeItems: ["Conversational Commerce UI", "Knowledge Grounding", "Specialist Handoff Flow"],
  },
  {
    id: "clearview-desk-assistant",
    slug: "clearview-healthcare-appointment-assistant",
    title: "Clearview Desk Non-Diagnostic Assistant",
    serviceType: "AI Chatbots & Assistants",
    categoryId: "ai-automation",
    folder: "08_AI_Chatbots_Assistants/02_Healthcare_Appointment_Assistant",
    screens: [
      "01_Live_Chat_Inbox.png",
      "02_Assistant_Config.png",
      "03_Knowledge_Base.png",
      "04_Human_Handoff.png",
      "05_Chat_Analytics.png",
    ],
    screenLabels: CHATBOT_LABELS,
    screenCaptions: [
      "Front-desk scheduling inbox handling non-diagnostic clinic inquiries, hours, and preparation instructions.",
      "Strict non-diagnostic boundary configuration blocking clinical advice and routing symptom queries to staff.",
      "Approved clinic FAQ, insurance acceptance, and pre-visit preparation knowledge repository.",
      "Priority clinical staff escalation rules triggered automatically for urgent or sensitive patient messages.",
      "Inquiry resolution and booking-assist volume metrics for clinic front-desk planning.",
    ],
    summary:
      "A strictly scoped non-diagnostic patient scheduling and FAQ assistant built with hard clinical guardrails and immediate front-desk escalation.",
    platform: ["Healthcare Desk UI", "Scoped AI Assistant"],
    challenge:
      "Healthcare scheduling desks receive high volumes of repetitive logistics questions, yet general-purpose chatbots pose unacceptable clinical compliance risks.",
    approach:
      "Enforces strict non-diagnostic policy boundaries at the guardrail layer, routing any clinical or symptom language straight to trained coordinators.",
    solution:
      "Five-screen clinic desk assistant featuring monitored conversation threads, boundary rules, vetted clinic docs, priority escalation, and triage telemetry.",
    keyFeatures: [
      "Hard non-diagnostic topic guardrails with automatic escalation",
      "Verified clinic logistics, insurance, and pre-visit FAQ retrieval",
      "Real-time front-desk staff takeover queue",
    ],
    technologies: ["Scoped RAG Guardrails", "Deterministic Routing", "Audit Logging", "TypeScript"],
    scopeItems: ["Patient Desk UX", "Safety Guardrail UI", "Front-Desk Escalation"],
  },
  {
    id: "harborview-property-concierge",
    slug: "harborview-real-estate-ai-assistant",
    title: "Harborview Property Concierge Desk",
    serviceType: "AI Chatbots & Assistants",
    categoryId: "ai-automation",
    folder: "08_AI_Chatbots_Assistants/03_Real_Estate_AI_Assistant",
    screens: [
      "01_Live_Chat_Inbox.png",
      "02_Assistant_Config.png",
      "03_Knowledge_Base.png",
      "04_Human_Handoff.png",
      "05_Chat_Analytics.png",
    ],
    screenLabels: CHATBOT_LABELS,
    screenCaptions: [
      "Leasing and buyer inquiry inbox qualifying budget preferences, move-in timelines, and viewing availability.",
      "Assistant qualification rules capturing property interest criteria while handing off contract specifics to agents.",
      "Structured listing brochure, neighborhood amenity, and floorplan specification repository.",
      "Broker handoff workflow pairing qualified prospect context with scheduled property tour slots.",
      "Lead qualification cadence and inquiry topic distribution analytics.",
    ],
    summary:
      "A real estate inquiry concierge organizing listing answers, viewing qualification, and seamless broker handoff from first message to tour scheduling.",
    platform: ["Property Concierge App", "Lead Qualification UI"],
    challenge:
      "Prospective tenants and buyers inquire outside office hours with floorplan and availability questions that go cold before agents reply.",
    approach:
      "Answers property specs instantaneously from verified listing data and hands qualified tour candidates directly to listing agents.",
    solution:
      "Five-module concierge workspace covering live conversations, qualification rules, listing docs, broker handoff, and response analytics.",
    keyFeatures: [
      "Listing-grounded floorplan, lease term, and neighborhood answers",
      "Structured qualification capture ahead of broker takeover",
      "Tour handoff readiness panel within live chat threads",
    ],
    technologies: ["RAG Retrieval", "Calendar Slot Sync", "CRM Lead Capture", "TypeScript"],
    scopeItems: ["Property Inquiry Desk", "Qualification Logic", "Broker Handoff UI"],
  },
  {
    id: "scoutine-agent-studio",
    slug: "scoutine-ai-sales-research-agent",
    title: "ScoutLine Agent Studio (Graph + Traces)",
    serviceType: "AI Agent Development",
    categoryId: "ai-automation",
    folder: "09_AI_Agent_Development/01_AI_Sales_Research_Agent",
    screens: [
      "01_Agent_Graph_Workspace.png",
      "02_Tools_Permissions.png",
      "03_Execution_Trace.png",
      "04_Testing_Evaluation.png",
      "05_Deployment_Monitor.png",
    ],
    screenLabels: AGENT_LABELS,
    screenCaptions: [
      "Directed state graph workspace mapping LeadIntake -> WebResearch -> FitScorer -> HumanApproval -> CRMWrite alongside live JSON checkpoint policy.",
      "Least-privilege tool permissions matrix gating external web fetches and CRM mutation scopes.",
      "Step-by-step run trace inspecting latency per node, cited sources, proposed CRM diffs, and interrupt gates.",
      "Evaluation harness benchmarking citation coverage and schema conformance across representative account fixtures.",
      "Production agent runtime monitor tracking paused approval queues, thread checkpoints, and tool error rates.",
    ],
    summary:
      "A stateful LangGraph-style AI sales research agent studio combining visual state graphs, human-approval interrupt gates, tool permissions, and step-by-step trace replay.",
    platform: ["AI Agent Studio", "Stateful Graph Runtime"],
    featured: true,
    challenge:
      "Autonomous CRM agents risk writing unverified claims or hallucinated company fields directly into production sales databases.",
    approach:
      "Enforces Pydantic-validated state schemas, mandatory source citation checks, and a persistent PostgreSQL HumanApproval checkpoint gate prior to any CRM mutation.",
    solution:
      "Five-screen engineering workbench providing graph visualization, least-privilege tool scoping, step-by-step checkpoint trace replay, regression evals, and deployment health.",
    keyFeatures: [
      "Visual directed state graph with persisted thread checkpoint inspection",
      "Explicit `interrupt_before` human approval gate before external CRM writes",
      "Step-by-step trace replay showing tool calls, latency, and proposed diffs",
    ],
    technologies: ["Stateful Agent Graph", "PostgreSQL Checkpoints", "JSON Schema Guardrails", "TypeScript"],
    scopeItems: ["Agent Graph IDE", "Approval Gate Engineering", "Trace & Eval Workbench"],
  },
  {
    id: "verifyledger-invoice-agent",
    slug: "verifyledger-ai-invoice-processing-agent",
    title: "VerifyLedger Agent Studio (3-Way Match)",
    serviceType: "AI Agent Development",
    categoryId: "ai-automation",
    folder: "09_AI_Agent_Development/02_AI_Invoice_Processing_Agent",
    screens: [
      "01_Agent_Graph_Workspace.png",
      "02_Tools_Permissions.png",
      "03_Execution_Trace.png",
      "04_Testing_Evaluation.png",
      "05_Deployment_Monitor.png",
    ],
    screenLabels: AGENT_LABELS,
    screenCaptions: [
      "Accounts-payable agent graph linking PDF extraction, PO lookup, 3-way line matching, and controller approval gates.",
      "Scoped ERP read/write permission controls separating ledger read-only checks from payable posting.",
      "Execution trace surfacing variance checks, tax calculation verification, and flagged exception pauses.",
      "Golden dataset invoice evaluation suite verifying line-item extraction accuracy across multi-page layouts.",
      "Live batch queue telemetry monitoring awaiting-signoff invoices and exception throughput.",
    ],
    summary:
      "An accounts-payable AI verification agent performing three-way PO, receipt, and invoice reconciliation with mandatory controller exception gates.",
    platform: ["Finance AI Agent", "Verification Console"],
    challenge:
      "Manual three-way invoice matching across purchase orders and receiving logs creates AP bottlenecks, yet unverified auto-posting invites costly ledger errors.",
    approach:
      "Combines structured extraction with deterministic arithmetic checks and automatic escalation checkpoints on quantity or price variances.",
    solution:
      "Full five-screen agent workbench covering AP workflow topology, ERP permission gating, trace auditing, invoice benchmarks, and live exception queues.",
    keyFeatures: [
      "Deterministic 3-way match verification against PO and receipt records",
      "Exception-triggered controller approval pause gates",
      "Line-item extraction benchmarks and traceable audit logs",
    ],
    technologies: ["Document Parsing", "Deterministic Validation", "Checkpoint Queue", "TypeScript"],
    scopeItems: ["3-Way Match Agent", "Variance Guardrails", "Traceability UI"],
  },
  {
    id: "resolvedesk-support-agent",
    slug: "resolvedesk-ai-customer-support-agent",
    title: "ResolveDesk Agent Studio (Action Gates)",
    serviceType: "AI Agent Development",
    categoryId: "ai-automation",
    folder: "09_AI_Agent_Development/03_AI_Customer_Support_Agent",
    screens: [
      "01_Agent_Graph_Workspace.png",
      "02_Tools_Permissions.png",
      "03_Execution_Trace.png",
      "04_Testing_Evaluation.png",
      "05_Deployment_Monitor.png",
    ],
    screenLabels: AGENT_LABELS,
    screenCaptions: [
      "Support automation state graph routing ticket classification, account lookup, draft resolution, and refund approval gates.",
      "Granular permission table constraining refund thresholds and billing adjustments behind tiered review rules.",
      "Detailed run trace capturing ticket context retrieval, policy evaluation, and draft reply inspection.",
      "Support policy compliance evaluation benchmark testing edge-case escalations and tone alignment.",
      "Live agent queue monitor tracking SLA adherence, escalated tickets, and checkpoint latency.",
    ],
    summary:
      "A customer support resolution agent architecture pairing automated account diagnostics with strict action gates for refunds and account modifications.",
    platform: ["Support AI Studio", "Action-Gated Agent"],
    challenge:
      "Support automation agents need access to billing and order histories to be genuinely helpful, without ever issuing unauthorized refunds or policy exceptions.",
    approach:
      "Isolates read-only diagnostics from state-changing actions using policy-bound confirmation gates and human sign-off thresholds.",
    solution:
      "Five-screen engineering interface providing visual state flow, tool authorization rules, traceable execution runs, policy testing, and SLA telemetry.",
    keyFeatures: [
      "Policy-enforced action gates governing refunds and account mutations",
      "Auditable step-by-step ticket diagnostic execution trace",
      "Policy regression evaluation harness ahead of deployment",
    ],
    technologies: ["State Machine Graph", "Policy Action Gates", "Trace Replay", "TypeScript"],
    scopeItems: ["Support Agent Architecture", "Refund Action Guardrails", "Trace Telemetry"],
  },
  {
    id: "clearbooks-workflow-builder",
    slug: "clearbooks-invoice-approval-automation",
    title: "ClearBooks Visual Workflow Builder",
    serviceType: "Business Process Automation",
    categoryId: "ai-automation",
    folder: "10_Business_Process_Automation/01_Finance_Invoice_Approval_Automation",
    screens: [
      "01_Workflow_Builder.png",
      "02_Triggers_Conditions.png",
      "03_Approval_Tasks.png",
      "04_Execution_History.png",
      "05_Error_Handling.png",
    ],
    screenLabels: PROCESS_LABELS,
    screenCaptions: [
      "Visual AP approval canvas connecting Invoice Received -> Budget Verify -> Tiered Sign-Off -> Queue ACH Batch with live node expressions.",
      "Conditional routing matrix configuring dollar thresholds, department owners, and 24-hour SLA escalation timers.",
      "Dedicated approver inbox displaying pending controller reviews alongside cost-center variance checks.",
      "Immutable workflow execution ledger recording approver IDs, timestamps, and ERP export confirmations.",
      "Structured exception queue isolating duplicate invoice numbers or missing vendor tax records for resolution.",
    ],
    summary:
      "A visual finance approval automation canvas routing incoming vendor invoices through budget checks, tiered sign-offs, and ERP payment queues.",
    platform: ["Workflow Automation", "Finance Ops App"],
    challenge:
      "Email-based invoice approvals lack SLA enforcement, audit trails, and automated threshold routing between department heads and finance controllers.",
    approach:
      "Renders multi-stage financial logic transparently as an inspectable flow graph paired with clear condition expressions and immutable audit timestamps.",
    solution:
      "Five-screen process automation suite spanning visual flow authoring, conditional rules, approver queues, run history, and exception recovery.",
    keyFeatures: [
      "Readable condition expressions (`amount > 5000 ? controller : dept_head`)",
      "Automated SLA escalation timers and immutable approver audit logs",
      "Dedicated exception queue with one-click retry after correction",
    ],
    technologies: ["Visual DAG Engine", "SLA Timers", "Immutable Audit Log", "TypeScript"],
    scopeItems: ["Visual Process Canvas", "Approval Queue UI", "Exception Recovery"],
  },
  {
    id: "dayone-onboarding-engine",
    slug: "dayone-employee-onboarding-automation",
    title: "DayOne Onboarding Flow Engine",
    serviceType: "Business Process Automation",
    categoryId: "ai-automation",
    folder: "10_Business_Process_Automation/02_Employee_Onboarding_Automation",
    screens: [
      "01_Workflow_Builder.png",
      "02_Triggers_Conditions.png",
      "03_Approval_Tasks.png",
      "04_Execution_History.png",
      "05_Error_Handling.png",
    ],
    screenLabels: PROCESS_LABELS,
    screenCaptions: [
      "Cross-team onboarding graph coordinating signed offer triggers, SSO account provisioning, hardware shipping, and buddy assignment.",
      "Role- and location-based branching rules tailoring security groups and equipment checklists automatically.",
      "Pending task queue assigning clear deadlines across IT admins, payroll specialists, and hiring managers.",
      "Chronological hire readiness log verifying completed provisioning steps prior to start date.",
      "Provisioning error console flagging failed directory invites or vendor portal timeouts.",
    ],
    summary:
      "An automated new-hire orchestration workflow connecting offer acceptance to identity provisioning, device dispatch, and start-date readiness checks.",
    platform: ["Process Engine", "People & IT Automation"],
    challenge:
      "New-hire onboarding requires tight coordination across HR, IT, and managers; missed manual handoffs leave employees without workspace access on day one.",
    approach:
      "Automates sequential and parallel provisioning branches from HRIS trigger events while tracking every blocking task openly.",
    solution:
      "Five-screen orchestration console spanning flow modeling, department branching, task queues, readiness history, and provisioning error alerts.",
    keyFeatures: [
      "Role-conditional IT group and hardware provisioning logic",
      "Clear cross-team task ownership before employee start dates",
      "Auditable completion log and directory sync error handling",
    ],
    technologies: ["Event-Driven Workflows", "Identity Webhooks", "SLA Tracking", "TypeScript"],
    scopeItems: ["Onboarding Graph", "Role Provisioning Rules", "Readiness Console"],
  },
  {
    id: "supplygate-procurement-builder",
    slug: "supplygate-procurement-po-automation",
    title: "SupplyGate Procurement Process Builder",
    serviceType: "Business Process Automation",
    categoryId: "ai-automation",
    folder: "10_Business_Process_Automation/03_Procurement_PO_Automation",
    screens: [
      "01_Workflow_Builder.png",
      "02_Triggers_Conditions.png",
      "03_Approval_Tasks.png",
      "04_Execution_History.png",
      "05_Error_Handling.png",
    ],
    screenLabels: PROCESS_LABELS,
    screenCaptions: [
      "Procurement orchestration canvas linking requisition intake, vendor compliance checks, PO issuance, and budget lock.",
      "Threshold and vendor-tier routing rules automating legal or infosec sign-offs when triggered.",
      "Buyer and finance requisition review queue keeping spend approvals moving without spreadsheet bottlenecks.",
      "Audit history recording PO revision stamps, vendor confirmation acknowledgments, and ERP sync IDs.",
      "Blocked requisition monitor flagging expired vendor certificates or mismatched cost centers.",
    ],
    summary:
      "A procurement and purchase-order automation builder standardizing requisition intake, security/compliance sign-offs, and ERP PO issuance.",
    platform: ["Process Automation", "Procurement Platform"],
    challenge:
      "Procurement teams struggle to enforce security and budget reviews consistently before commitments are signed with external suppliers.",
    approach:
      "Embeds compliance gates and cost-center validation directly inside visual PO approval routes.",
    solution:
      "Five-screen procurement workflow platform covering process authoring, spend rules, sign-off queues, audit trails, and blocker resolution.",
    keyFeatures: [
      "Spend-tier and vendor-risk conditional review branching",
      "Centralized buyer and legal/finance sign-off queues",
      "End-to-end PO audit history and compliance exception alerts",
    ],
    technologies: ["Rule Engine", "Procurement State Graph", "Audit Persistence", "TypeScript"],
    scopeItems: ["Procurement Canvas", "Spend Approval Rules", "Compliance Gates"],
  },
  {
    id: "pipelinecraft-b2b-crm",
    slug: "pipelinecraft-b2b-sales-crm",
    title: "PipelineCraft B2B CRM Application",
    serviceType: "CRM Automation",
    categoryId: "ai-automation",
    folder: "11_CRM_Automation/01_B2B_Sales_CRM",
    screens: [
      "01_CRM_Dashboard.png",
      "02_Contact_Records.png",
      "03_Deal_Pipeline.png",
      "04_CRM_Automation.png",
      "05_Sales_Analytics.png",
    ],
    screenLabels: CRM_LABELS,
    screenCaptions: [
      "Revenue workspace summarizing stage progression, follow-up SLA alerts, and active deal hygiene.",
      "Account and buying-committee contact view consolidating role tags, touchpoints, and enrichment fields.",
      "Kanban and list deal pipeline enforcing exit criteria before deals advance across qualification stages.",
      "No-code CRM automation rules auto-creating follow-up tasks and Slack notifications on stage changes.",
      "Stage conversion and cycle velocity analytics designed for clean pipeline forecasting.",
    ],
    summary:
      "A B2B revenue CRM workspace combining account relationship context, stage-gated deal pipelines, and automated follow-up task orchestration.",
    platform: ["CRM Application", "Sales Automation"],
    challenge:
      "Growing B2B sales teams face stale pipelines and inconsistent follow-ups when stage updates depend entirely on manual rep upkeep.",
    approach:
      "Pairs clean contact timelines and pipeline boards with automatic activity triggers and stage hygiene rules.",
    solution:
      "Five-screen CRM system unifying executive dashboard, account contacts, pipeline progression, workflow automation rules, and forecasting views.",
    keyFeatures: [
      "Account-centric contact hierarchy with multi-stakeholder visibility",
      "Automated task assignment and stale-deal escalation workflows",
      "Stage conversion and cycle duration breakdown",
    ],
    technologies: ["Next.js", "TypeScript", "Event Trigger Rules", "Relational CRM Schema"],
    scopeItems: ["CRM Workspace Design", "Pipeline Automation Rules", "Forecasting Views"],
  },
  {
    id: "estatepulse-realestate-crm",
    slug: "estatepulse-real-estate-crm",
    title: "EstatePulse Real Estate CRM",
    serviceType: "CRM Automation",
    categoryId: "ai-automation",
    folder: "11_CRM_Automation/02_Real_Estate_CRM",
    screens: [
      "01_CRM_Dashboard.png",
      "02_Contact_Records.png",
      "03_Deal_Pipeline.png",
      "04_CRM_Automation.png",
      "05_Sales_Analytics.png",
    ],
    screenLabels: CRM_LABELS,
    screenCaptions: [
      "Brokerage operations dashboard tracking active buyer mandates, upcoming property tours, and offer milestones.",
      "Buyer and landlord profile directory indexing budget bands, neighborhood criteria, and viewing history.",
      "Transaction pipeline tracking leads from initial inquiry through scheduled viewings, offers, and escrow closing.",
      "Automated follow-up cadences triggered after property viewings and listing price updates.",
      "Brokerage closing velocity and inquiry-source attribution analytics.",
    ],
    summary:
      "A property brokerage CRM built around buyer/tenant matching, tour scheduling milestones, and post-viewing follow-up automation.",
    platform: ["Real Estate CRM", "Brokerage Automation"],
    challenge:
      "Property agencies manage hundreds of active inquiries simultaneously and lose deals when post-viewing follow-ups and buyer preferences slip.",
    approach:
      "Connects property preference profiles directly to viewing stages and time-triggered agent follow-up reminders.",
    solution:
      "Five-view real estate CRM covering daily agent overview, buyer directories, escrow pipelines, automated nudges, and channel performance.",
    keyFeatures: [
      "Buyer criteria matching against active property inventory",
      "Post-tour automated check-in sequences and task reminders",
      "Clear stage tracking from inquiry through offer and closing",
    ],
    technologies: ["React", "TypeScript", "Scheduled Automations", "Messaging Hooks"],
    scopeItems: ["Brokerage CRM UI", "Viewing Pipeline", "Follow-up Automation"],
  },
  {
    id: "retainos-cs-crm",
    slug: "retainos-saas-customer-success-crm",
    title: "RetainOS Customer Success CRM",
    serviceType: "CRM Automation",
    categoryId: "ai-automation",
    folder: "11_CRM_Automation/03_SaaS_Customer_Success_CRM",
    screens: [
      "01_CRM_Dashboard.png",
      "02_Contact_Records.png",
      "03_Deal_Pipeline.png",
      "04_CRM_Automation.png",
      "05_Sales_Analytics.png",
    ],
    screenLabels: CRM_LABELS,
    screenCaptions: [
      "Customer success console highlighting upcoming renewals, adoption health signals, and executive sponsor check-ins.",
      "Account stakeholder map tracking onboarding champions, technical admins, and billing decision-makers.",
      "Onboarding-to-renewal lifecycle board managing QBR readiness, expansion opportunities, and risk mitigation.",
      "Playbook automation launching check-in workflows 90 days ahead of annual contract renewals.",
      "Cohort retention, expansion pipeline, and health-score trend tracking.",
    ],
    summary:
      "A post-sales SaaS customer success CRM structuring onboarding milestones, renewal playbooks, and account health workflows.",
    platform: ["Customer Success CRM", "Lifecycle Automation"],
    challenge:
      "Customer success teams often discover adoption drops too close to contract renewal deadlines due to scattered usage and stakeholder notes.",
    approach:
      "Drives proactive outreach using health-signal triggers, structured QBR milestones, and automated 90-day renewal playbooks.",
    solution:
      "Five-screen post-sales platform spanning account health overview, stakeholder directories, renewal pipelines, playbook triggers, and retention analytics.",
    keyFeatures: [
      "Stakeholder mapping across technical and executive sponsors",
      "Automated renewal countdown and health-drop playbooks",
      "Unified onboarding-to-expansion lifecycle visibility",
    ],
    technologies: ["React", "TypeScript", "Playbook Triggers", "Cohort Analytics UI"],
    scopeItems: ["CS Operations CRM", "Renewal Playbooks", "Retention Telemetry"],
  },
  {
    id: "cartpulse-messaging-app",
    slug: "cartpulse-ecommerce-messaging-automation",
    title: "CartPulse WhatsApp & Email App",
    serviceType: "WhatsApp & Email Automation",
    categoryId: "ai-automation",
    folder: "12_WhatsApp_Email_Automation/01_Ecommerce_Messaging_Automation",
    screens: [
      "01_WhatsApp_Inbox.png",
      "02_Email_Campaign_Builder.png",
      "03_Template_Manager.png",
      "04_Automation_Sequences.png",
      "05_Delivery_Consent_Analytics.png",
    ],
    screenLabels: MESSAGING_LABELS,
    screenCaptions: [
      "Opt-in verified WhatsApp Business shared inbox handling live delivery window updates and customer gate-code replies inside the 24h window.",
      "Visual email campaign composer structuring abandoned-cart recovery and post-purchase care sequences.",
      "Approved Meta/WhatsApp utility template library enforcing variable placeholders and category review rules.",
      "Cross-channel orchestration splitting WhatsApp delivery notifications from long-form email education drips.",
      "Consent audit dashboard tracking opt-in verification timestamps, STOP opt-outs, and delivery diagnostics.",
    ],
    summary:
      "An opt-in verified WhatsApp and email customer messaging suite uniting shared inbox replies, approved utility templates, and consent-safe automation sequences.",
    platform: ["Messaging Platform", "WhatsApp Business + Email"],
    challenge:
      "E-commerce brands automating WhatsApp and email risk deliverability penalties or compliance issues without strict opt-in logging and template enforcement.",
    approach:
      "Builds explicit opt-in verification, 24-hour service window indicators, approved template governance, and instant STOP handling into every thread.",
    solution:
      "Five-screen messaging hub combining WhatsApp shared inbox, email builder, template governance, cross-channel drips, and consent analytics.",
    keyFeatures: [
      "Opt-in logged WhatsApp thread view with 24h service window status",
      "Pre-approved template governance and STOP keyword compliance",
      "Coordinated WhatsApp utility and email campaign workflows",
    ],
    technologies: ["WhatsApp Business API", "Transactional Email", "Consent Ledger", "TypeScript"],
    scopeItems: ["Omnichannel Inbox UI", "Template Governance", "Consent-Safe Flows"],
  },
  {
    id: "remindwell-messaging-console",
    slug: "remindwell-appointment-reminder-automation",
    title: "RemindWell Messaging Console",
    serviceType: "WhatsApp & Email Automation",
    categoryId: "ai-automation",
    folder: "12_WhatsApp_Email_Automation/02_Appointment_Reminder_Automation",
    screens: [
      "01_WhatsApp_Inbox.png",
      "02_Email_Campaign_Builder.png",
      "03_Template_Manager.png",
      "04_Automation_Sequences.png",
      "05_Delivery_Consent_Analytics.png",
    ],
    screenLabels: MESSAGING_LABELS,
    screenCaptions: [
      "Front-desk messaging inbox confirming upcoming appointment times and handling patient/client rescheduling requests.",
      "Pre-appointment preparation email builder delivering parking, intake form links, and check-in checklists.",
      "Standardized reminder template registry supporting 48h confirmation, 2h arrival, and follow-up check-in formats.",
      "Multi-step reminder cadence switching automatically between email prep guides and timely WhatsApp confirmations.",
      "Confirmation response tracking and opt-out governance ledger.",
    ],
    summary:
      "An automated appointment reminder and preparation messaging console reducing no-shows through coordinated WhatsApp confirmations and email prep guides.",
    platform: ["Appointment Messaging", "Operations Console"],
    challenge:
      "Service clinics and advisory offices face costly missed appointments when reminder calls are manual and intake instructions arrive too late.",
    approach:
      "Schedules multi-checkpoint reminders aligned to calendar timestamps while allowing effortless two-way reschedule replies.",
    solution:
      "Five-screen messaging console spanning two-way reply inbox, prep email builder, template library, cadence sequences, and delivery consent logs.",
    keyFeatures: [
      "Coordinated 48h and same-day WhatsApp & email reminder cadences",
      "Structured prep checklist delivery ahead of scheduled slots",
      "Audited patient/client opt-in and reply handling",
    ],
    technologies: ["Calendar Webhooks", "WhatsApp Utility Templates", "Email Automation", "TypeScript"],
    scopeItems: ["Reminder Cadence UI", "Two-Way Reschedule Inbox", "Consent Logs"],
  },
  {
    id: "cadencereach-nurturing-console",
    slug: "cadencereach-b2b-lead-nurturing",
    title: "CadenceReach Nurturing Console",
    serviceType: "WhatsApp & Email Automation",
    categoryId: "ai-automation",
    folder: "12_WhatsApp_Email_Automation/03_B2B_Lead_Nurturing_Automation",
    screens: [
      "01_WhatsApp_Inbox.png",
      "02_Email_Campaign_Builder.png",
      "03_Template_Manager.png",
      "04_Automation_Sequences.png",
      "05_Delivery_Consent_Analytics.png",
    ],
    screenLabels: MESSAGING_LABELS,
    screenCaptions: [
      "B2B response inbox consolidating warm prospect replies routed back to assigned account specialists.",
      "Personalized B2B outreach email builder with clean plain-text formatting and reply-detection pause rules.",
      "Compliant outreach snippet and opt-in WhatsApp follow-up template library.",
      "Automated follow-up sequences pausing immediately on prospect reply or calendar booking.",
      "Domain sender health, opt-out compliance, and reply engagement breakdown.",
    ],
    summary:
      "A B2B follow-up and educational nurturing platform coordinating reply-aware email sequences and opted-in WhatsApp updates.",
    platform: ["Outreach Automation", "B2B Messaging"],
    challenge:
      "Automated follow-up sequences damage brand trust when they keep sending scheduled emails after a prospect has already replied or booked a call.",
    approach:
      "Integrates automatic reply-detection, booking stop-triggers, and strict sender reputation/opt-out guardrails.",
    solution:
      "Five-view nurturing suite spanning reply inbox, campaign authoring, templates, reply-gated sequences, and compliance analytics.",
    keyFeatures: [
      "Automatic sequence pause on inbound reply or meeting booking",
      "Domain health and consent compliance visibility",
      "Unified account specialist reply inbox",
    ],
    technologies: ["Reply Webhooks", "Email Deliverability Rules", "Sequence Engine", "TypeScript"],
    scopeItems: ["B2B Nurture Studio", "Reply-Stop Automation", "Compliance Console"],
  },
  {
    id: "commercemesh-integration",
    slug: "commercemesh-ecommerce-operations-integration",
    title: "CommerceMesh Integration Platform",
    serviceType: "Workflow Integration",
    categoryId: "ai-automation",
    folder: "13_Workflow_Integration/01_Ecommerce_Operations_Integration",
    screens: [
      "01_Connected_Apps.png",
      "02_Field_Mapping.png",
      "03_Workflow_Execution.png",
      "04_Run_History.png",
      "05_Error_Logs.png",
    ],
    screenLabels: INTEGRATION_LABELS,
    screenCaptions: [
      "Connected retail ecosystem overview linking storefront orders, warehouse 3PL, ERP accounting, and fulfillment alerts.",
      "Visual field mapping screen transforming storefront order JSON payloads into warehouse and ledger line items.",
      "Real-time integration pipeline monitoring order split, inventory decrement, and shipment sync execution.",
      "Chronological batch and webhook execution history with throughput and status summaries.",
      "Isolated dead-letter error inspection console enabling targeted payload fixes and safe replays.",
    ],
    summary:
      "An operational commerce middleware hub synchronizing storefront orders, warehouse 3PL fulfillment, and ERP inventory ledgers reliably.",
    platform: ["Workflow Middleware", "Retail Ops Integration"],
    challenge:
      "Scaling online retailers suffer overselling and manual reconciliation when storefront orders, warehouse picking, and ERP ledgers sync poorly.",
    approach:
      "Provides deterministic field mapping, idempotent order ingestion, and inspectable retry queues across connected platforms.",
    solution:
      "Five-screen integration workbench covering connected retail apps, field transforms, live run inspection, execution history, and error replay.",
    keyFeatures: [
      "Declarative mapping between storefront, 3PL, and accounting schemas",
      "Idempotent sync runs preventing duplicate invoice or shipment entries",
      "Quarantined error replay without halting healthy order throughput",
    ],
    technologies: ["Webhook Pipelines", "Idempotency Keys", "Schema Mapping", "TypeScript"],
    scopeItems: ["Commerce Integration Hub", "Payload Mapping", "Dead-Letter Replay UI"],
  },
  {
    id: "funnelsync-integration",
    slug: "funnelsync-marketing-sales-integration",
    title: "FunnelSync Integration Platform",
    serviceType: "Workflow Integration",
    categoryId: "ai-automation",
    folder: "13_Workflow_Integration/02_Marketing_Sales_Integration",
    screens: [
      "01_Connected_Apps.png",
      "02_Field_Mapping.png",
      "03_Workflow_Execution.png",
      "04_Run_History.png",
      "05_Error_Logs.png",
    ],
    screenLabels: INTEGRATION_LABELS,
    screenCaptions: [
      "Marketing-to-sales app registry connecting ad lead forms, web intake, enrichment APIs, and CRM deal pipelines.",
      "Attribution and lead field normalization mapping UTM parameters and qualification answers into CRM fields.",
      "Live enrichment and territory routing flow dispatching qualified leads to account owners cleanly.",
      "Complete sync execution audit ledger verifying zero dropped web form or ad-lead captures.",
      "Error log diagnostics surfacing API rate-limit retries and duplicate record merge protections.",
    ],
    summary:
      "A RevOps integration layer normalizing web intake, ad lead forms, enrichment lookups, and attribution parameters cleanly into CRM systems.",
    platform: ["RevOps Middleware", "Lead Sync Engine"],
    challenge:
      "Broken UTM mapping, duplicate lead creation, and silent webhook failures distort marketing attribution and delay sales response times.",
    approach:
      "Centralizes deduplication keys, UTM field hygiene, and rate-limited CRM upserts inside an auditable pipeline.",
    solution:
      "Five-module integration portal providing app connection health, UTM/CRM field transforms, routing execution, run audits, and retry diagnostics.",
    keyFeatures: [
      "Attribution UTM preservation and schema normalization",
      "Duplicate-safe CRM upsert execution history",
      "Rate-limit aware retry queues and alert logs",
    ],
    technologies: ["Webhook Ingestion", "Deduplication Logic", "CRM API Sync", "TypeScript"],
    scopeItems: ["RevOps Integration UI", "UTM & Field Mapping", "Lead Sync Diagnostics"],
  },
  {
    id: "bridgequeue-integration",
    slug: "bridgequeue-support-engineering-integration",
    title: "BridgeQueue Integration Platform",
    serviceType: "Workflow Integration",
    categoryId: "ai-automation",
    folder: "13_Workflow_Integration/03_Support_Engineering_Integration",
    screens: [
      "01_Connected_Apps.png",
      "02_Field_Mapping.png",
      "03_Workflow_Execution.png",
      "04_Run_History.png",
      "05_Error_Logs.png",
    ],
    screenLabels: INTEGRATION_LABELS,
    screenCaptions: [
      "Bidirectional connector registry bridging customer support desks, issue trackers, and incident channels.",
      "Status and priority field mapping translating engineering sprint states into customer-safe ticket updates.",
      "Automated escalation flow linking customer bug reports directly to engineering backlog issues with live sync.",
      "Bidirectional comment and status sync execution history ensuring no escalated report loses context.",
      "Diagnostic log highlighting permission mismatches or deleted issue link exceptions.",
    ],
    summary:
      "A bidirectional support-to-engineering sync platform keeping escalated customer bug tickets aligned with live engineering sprint statuses.",
    platform: ["Workflow Middleware", "Support-Eng Bridge"],
    challenge:
      "Support agents repeatedly ping engineers in chat for bug status updates when helpdesks and issue trackers remain disconnected.",
    approach:
      "Mirrors safe status transitions and release notes automatically between engineering trackers and support queues while filtering internal noise.",
    solution:
      "Five-screen integration studio governing app connections, status mapping, escalation sync runs, audit history, and link error resolution.",
    keyFeatures: [
      "Bidirectional status synchronization between helpdesk and backlog",
      "Visibility-safe filtering separating internal engineering notes from customer replies",
      "Automatic resolution notification triggers on release merge",
    ],
    technologies: ["Bidirectional Webhooks", "State Translation", "Audit Logs", "TypeScript"],
    scopeItems: ["Escalation Bridge UI", "Status Mapping Rules", "Sync Diagnostics"],
  },
  {
    id: "clauseextract-document-ai",
    slug: "clauseextract-document-intelligence-platform",
    title: "ClauseExtract Document AI Workbench",
    serviceType: "Custom AI Solutions",
    categoryId: "ai-automation",
    folder: "14_Custom_AI_Solutions/01_Document_Intelligence_Platform",
    screens: [
      "01_Document_Extraction.png",
      "02_Extracted_Table.png",
      "03_Human_Review.png",
      "04_Model_Evaluation.png",
      "05_JSON_Export.png",
    ],
    screenLabels: [
      "Source & Extraction Split",
      "Extracted Structured Fields",
      "Human Review Queue",
      "Extraction Accuracy Evaluation",
      "Schema-Validated JSON Export",
    ],
    screenCaptions: [
      "Synchronized PDF source viewer highlighting exact page-6 legal clauses beside extracted counterparty, notice window, and liability confidence rows.",
      "Multi-document structured table comparing parsed commercial lease obligations across uploaded batches.",
      "Flagged low-confidence review workspace routing ambiguous clauses straight to legal ops reviewers.",
      "Benchmark suite validating extraction recall and precision across diverse commercial contract formats.",
      "Clean, schema-validated JSON payload export ready for downstream CLM or ERP ingestion.",
    ],
    summary:
      "A human-in-the-loop document intelligence workbench linking visual PDF span citations directly to extracted structured contract fields and confidence gates.",
    platform: ["Document AI App", "Review Workbench"],
    challenge:
      "Teams processing complex PDFs and commercial leases cannot trust black-box LLM summaries without verifying exact source page quotes.",
    approach:
      "Pairs inline highlighted PDF evidence citations beside structured fields with explicit review flags on low-confidence extractions.",
    solution:
      "Five-screen document AI workbench covering split source viewer, batch table review, human sign-off queue, eval benchmarks, and typed JSON exports.",
    keyFeatures: [
      "Page-level source span highlighting synchronized with extracted values",
      "Automatic `Review Flag` routing on below-threshold confidence fields",
      "Schema-enforced JSON export pipeline for CLM/ERP integration",
    ],
    technologies: ["Document OCR & Layout Parsing", "Structured Output Schemas", "Review UI", "TypeScript"],
    scopeItems: ["Document Extraction Split View", "Confidence Flagging", "JSON Export Schema"],
  },
  {
    id: "optiline-vision-qa",
    slug: "optiline-visual-quality-inspection-ai",
    title: "OptiLine Vision Optical QA Station",
    serviceType: "Custom AI Solutions",
    categoryId: "ai-automation",
    folder: "14_Custom_AI_Solutions/02_Visual_Quality_Inspection_AI",
    screens: [
      "01_Live_Inspection.png",
      "02_Defect_Queue.png",
      "03_Part_Analysis.png",
      "04_Shift_Report.png",
      "05_Model_Config.png",
    ],
    screenLabels: [
      "Live Inspection Station",
      "Flagged Defect Queue",
      "Part Surface Analysis",
      "Shift QA Summary",
      "Vision Model Thresholds",
    ],
    screenCaptions: [
      "Real-time optical camera station view overlaying bounding-box surface anomaly inspections with pass/hold verdicts.",
      "Operator review queue isolating borderline surface scratches and alignment tolerances for manual verification.",
      "High-magnification part inspection breakdown comparing current tolerances against CAD reference baselines.",
      "Shift-by-shift defect classification breakdown tracking recurring tooling wear patterns.",
      "Sensitivity threshold tuning panel balancing false-reject rate against strict defect capture.",
    ],
    summary:
      "A computer-vision quality assurance console built for manufacturing inspection lines, pairing live anomaly overlays with operator hold queues.",
    platform: ["Vision AI Console", "Industrial QA UI"],
    challenge:
      "High-speed assembly lines struggle with inspector fatigue on hairline defects while pure automated rejects risk costly false-positive scrap.",
    approach:
      "Presents high-contrast defect bounding regions and borderline confidence bands to line operators for rapid confirmation.",
    solution:
      "Five-view vision QA workbench covering live station feed UI, defect triage queue, part magnifier, shift summaries, and model sensitivity controls.",
    keyFeatures: [
      "Bounded surface-anomaly overlays with operator hold/pass controls",
      "Borderline defect review queue minimizing false-positive scrap",
      "Shift defect taxonomy and threshold calibration workspace",
    ],
    technologies: ["Computer Vision Inference UI", "Anomaly Bounding Boxes", "Edge Telemetry", "TypeScript"],
    scopeItems: ["Optical QA Station UI", "Operator Hold Queue", "Model Threshold Tuning"],
  },
  {
    id: "meridian-demand-forecasting",
    slug: "meridian-retail-demand-forecasting-ai",
    title: "Meridian Retail Demand Forecasting App",
    serviceType: "Custom AI Solutions",
    categoryId: "ai-automation",
    folder: "14_Custom_AI_Solutions/03_Retail_Demand_Forecasting_AI",
    screens: [
      "01_Forecast_Dashboard.png",
      "02_SKU_Stock_Planner.png",
      "03_Backtest_Evaluation.png",
      "04_Warehouse_Split.png",
      "05_PO_Export.png",
    ],
    screenLabels: [
      "Forecast Overview Dashboard",
      "SKU Stock Planner",
      "Backtest Model Evaluation",
      "Regional Warehouse Split",
      "Purchase Order Draft Export",
    ],
    screenCaptions: [
      "Demand planning dashboard plotting historical sell-through against seasonal confidence intervals.",
      "SKU-level reorder planner calculating safety stock horizons and supplier lead-time buffers.",
      "Rolling backtest evaluation view auditing forecast error margins across holiday and baseline periods.",
      "Multi-warehouse allocation optimizer balancing regional demand distribution prior to shipment.",
      "Approved replenishment quantities formatted directly into supplier purchase order exports.",
    ],
    summary:
      "A retail demand planning and inventory forecasting application turning historical sell-through and backtested intervals into warehouse replenishment drafts.",
    platform: ["Forecasting App", "Supply Chain AI UI"],
    challenge:
      "Retail buyers using static spreadsheet averages frequently over-order slow seasonal SKUs while running out of core replenishment stock.",
    approach:
      "Surfaces transparent backtest error intervals alongside supplier lead times so planners control final reorder overrides.",
    solution:
      "Five-screen demand planning suite spanning forecast curves, SKU reorder planning, backtest validation, warehouse allocation, and PO export.",
    keyFeatures: [
      "Transparent backtest error tracking alongside seasonal projections",
      "Lead-time-aware SKU safety stock planning table",
      "Regional warehouse allocation and structured PO export",
    ],
    technologies: ["Time-Series Forecasting UI", "Inventory Replenishment Model", "TypeScript", "Data Tables"],
    scopeItems: ["Demand Forecasting UI", "Backtest Transparency", "Warehouse Allocation"],
  },

  // ===========================================================================
  // PILLAR 03 — CLOUD & INFRASTRUCTURE (9 Projects across Categories 15, 16, 18)
  // ===========================================================================
  {
    id: "stratacloud-console",
    slug: "stratacloud-infrastructure-console",
    title: "StrataCloud Infrastructure Console",
    serviceType: "Cloud Development",
    categoryId: "cloud-infrastructure",
    folder: "15_Cloud_Development/01_Cloud_Native_App_Development",
    screens: [
      "01_Cloud_Resources.png",
      "02_Deployment_Envs.png",
      "03_Infrastructure_IaC.png",
      "04_Service_Architecture.png",
      "05_Cloud_Monitoring.png",
    ],
    screenLabels: [
      "Cloud Resource Inventory",
      "Deployment Environments",
      "Terraform IaC State",
      "Service Topology Architecture",
      "Cloud Observability & Budget",
    ],
    screenCaptions: [
      "Regional us-east-1 resource inventory listing container tasks, multi-AZ Postgres clusters, Redis cache, and TLS 1.3 edge CDN rules.",
      "Staging and production deployment matrix verifying immutable image digests and multi-AZ rollout health.",
      "Infrastructure-as-Code diff viewer auditing Terraform plan changes before state application.",
      "Clean service dependency map illustrating storefront, API tasks, primary database, and read-replica paths.",
      "Monthly budget status and service resource utilization panel designed for FinOps clarity.",
    ],
    summary:
      "A cloud-native infrastructure control plane presenting multi-AZ container workloads, managed databases, Terraform IaC diffs, and regional observability.",
    platform: ["Cloud Console", "Multi-AZ Infrastructure UI"],
    featured: true,
    challenge:
      "Engineering teams operating cloud-native stacks need immediate visibility linking deployed app services to underlying Terraform states and monthly spend.",
    approach:
      "Presents crisp resource health rows, environment parity checks, and clean topology diagrams on a bright high-contrast operational canvas.",
    solution:
      "Five-screen cloud platform console unifying resource inventory, deployment promotion, Terraform state inspection, service topology, and FinOps alerts.",
    keyFeatures: [
      "Unified view of ECS containers, multi-AZ Postgres, Redis, and Edge CDN",
      "Inspectable Terraform IaC plan state and service topology map",
      "Environment health and monthly budget status tracking",
    ],
    technologies: ["Container Orchestration", "Managed Postgres & Redis", "Terraform IaC", "TLS 1.3 Edge CDN"],
    scopeItems: ["Cloud Control Plane UI", "IaC Plan Inspection", "Multi-AZ Observability"],
  },
  {
    id: "harborshift-migration-console",
    slug: "harborshift-cloud-migration-modernization",
    title: "HarborShift Migration Console",
    serviceType: "Cloud Development",
    categoryId: "cloud-infrastructure",
    folder: "15_Cloud_Development/02_Cloud_Migration_Modernization",
    screens: [
      "01_Migration_Dashboard.png",
      "02_Workload_Discovery.png",
      "03_CDC_Replication.png",
      "04_Landing_Zone.png",
      "05_Cutover_Runbook.png",
    ],
    screenLabels: [
      "Phased Wave Planner",
      "Workload Discovery Matrix",
      "CDC Database Replication",
      "Target Landing Zone",
      "Dry-Run Cutover Runbook",
    ],
    screenCaptions: [
      "Wave-by-wave cloud migration tracker displaying parity verification, CDC sync status, and scheduled cutover windows.",
      "Discovered legacy workload catalog mapping replatform vs. container refactor strategies per service.",
      "Change-data-capture (CDC) replication stream monitoring row checksums and lag ahead of cutover.",
      "Target VPC landing zone layout verifying private subnets, IAM boundaries, and egress policies.",
      "Rehearsed zero-rollback cutover checklist coordinating DNS TTL drop and validation gates.",
    ],
    summary:
      "A structured cloud migration command center tracking wave readiness, CDC database checksums, target landing zones, and rehearsed cutover runbooks.",
    platform: ["Cloud Migration Hub", "Infrastructure Modernization"],
    challenge:
      "On-premise and legacy VPS migrations risk extended downtime and silent data drift without phased wave tracking and continuous parity verification.",
    approach:
      "Structures migrations into verifiable waves with live CDC checksum verification, isolated landing-zone readiness, and dry-run cutover checklists.",
    solution:
      "Five-screen migration hub guiding platform engineers from discovery and CDC sync checks through DNS cutover verification.",
    keyFeatures: [
      "Wave-by-wave workload classification (replatform, containerize, refactor)",
      "Live CDC replication parity and checksum validation status",
      "Rehearsed dry-run cutover runbook with explicit rollback gates",
    ],
    technologies: ["CDC Replication", "Container Modernization", "Landing Zone VPC", "DNS Cutover"],
    scopeItems: ["Migration Wave Console", "Parity Check Tracking", "Cutover Runbook UI"],
  },
  {
    id: "launchgrid-startup-cloud",
    slug: "launchgrid-scalable-startup-cloud",
    title: "LaunchGrid Startup Cloud Console",
    serviceType: "Cloud Development",
    categoryId: "cloud-infrastructure",
    folder: "15_Cloud_Development/03_Scalable_Startup_Cloud_Platform",
    screens: [
      "01_Environments.png",
      "02_Autoscaling.png",
      "03_Deploy_Logs.png",
      "04_Env_Secrets.png",
      "05_Cost_FinOps.png",
    ],
    screenLabels: [
      "Preview & Prod Environments",
      "Autoscaling Policies",
      "Live Deploy Logs",
      "Environment Secrets Vault",
      "Cloud Cost & FinOps",
    ],
    screenCaptions: [
      "Environment overview managing ephemeral PR previews, staging branches, and production scaling groups.",
      "Horizontal CPU/request autoscaling configuration setting safe min/max replica guardrails.",
      "Streaming container build and zero-downtime health-check logs.",
      "Encrypted environment secret store scoping runtime keys strictly per deployment stage.",
      "Per-service monthly cloud cost breakdown surfacing idle staging resources for easy rightsizing.",
    ],
    summary:
      "A developer-focused startup cloud console unifying preview environments, bounded autoscaling rules, secret scopes, and FinOps cost clarity.",
    platform: ["PaaS / Cloud Console", "Startup Infrastructure"],
    challenge:
      "Lean product teams need AWS-grade reliability and ephemeral PR previews without drowning in raw IAM consoles or runaway cloud bills.",
    approach:
      "Exposes guardrailed autoscaling limits, stage-scoped encrypted secrets, and per-service spend attribution cleanly.",
    solution:
      "Five-screen platform console spanning environment management, autoscaling, deployment logs, secret scoping, and FinOps guardrails.",
    keyFeatures: [
      "Bounded replica autoscaling protecting against unexpected spend spikes",
      "Stage-isolated encrypted environment variable and secret store",
      "Clear per-service monthly spend visibility",
    ],
    technologies: ["Autoscaling Policies", "Container Builds", "Encrypted Secrets", "FinOps Telemetry"],
    scopeItems: ["Startup PaaS Console", "Autoscaling & Secrets UI", "Spend Guardrails"],
  },
  {
    id: "kernelops-server-panel",
    slug: "kernelops-managed-linux-vps-panel",
    title: "KernelOps Linux Server Panel & SSH",
    serviceType: "Server Setup & Management",
    categoryId: "cloud-infrastructure",
    folder: "16_Server_Setup_Management/01_Managed_Linux_VPS_Services",
    screens: [
      "01_Server_Inventory.png",
      "02_SSH_Terminal.png",
      "03_Resource_Monitor.png",
      "04_Firewall_Nginx.png",
      "05_Backup_Schedules.png",
    ],
    screenLabels: [
      "Linux Host Inventory",
      "Browser SSH Terminal",
      "CPU / RAM / Disk Monitor",
      "Firewall & Nginx Config",
      "Automated Snapshot Backups",
    ],
    screenCaptions: [
      "Dark operations inventory listing Ubuntu 24.04 LTS and Debian 12 nodes with private IPs, CPU/RAM utilization, UFW status, and patch hygiene.",
      "Audited key-only SSH session console inspecting systemd service states and live journal logs.",
      "Host resource telemetry plotting load average, memory headroom, and block disk I/O.",
      "UFW firewall port rules and Nginx reverse-proxy SSL termination configuration overview.",
      "Encrypted off-host daily snapshot schedules and retention policy checks.",
    ],
    summary:
      "A hardened Linux VPS operations panel consolidating Ubuntu/Debian fleet inventory, audited SSH sessions, UFW/Nginx rules, and snapshot schedules.",
    platform: ["Linux Ops Panel", "VPS Fleet Management"],
    challenge:
      "Managing production VPS nodes manually over ad-hoc terminals obscures security patch posture, firewall consistency, and backup health.",
    approach:
      "Surfaces kernel security updates, key-only SSH status, firewall policy, and Nginx proxy configs from a dark sysadmin workspace.",
    solution:
      "Five-view Linux infrastructure console spanning node inventory, audited SSH console, host telemetry, firewall/Nginx rules, and backup schedules.",
    keyFeatures: [
      "Ubuntu 24.04 LTS & Debian 12 fleet inventory with live patch posture",
      "Enforced key-only SSH & UFW firewall verification state",
      "Nginx reverse-proxy config & encrypted snapshot schedules",
    ],
    technologies: ["Ubuntu 24.04 LTS", "Nginx Reverse Proxy", "UFW & Key-Only SSH", "Systemd"],
    scopeItems: ["VPS Fleet Dashboard", "Firewall & Proxy Governance", "Backup Schedules"],
  },
  {
    id: "releaseforge-cicd-plane",
    slug: "releaseforge-devops-deployment-management",
    title: "ReleaseForge CI/CD Control Plane",
    serviceType: "Server Setup & Management",
    categoryId: "cloud-infrastructure",
    folder: "16_Server_Setup_Management/02_DevOps_Deployment_Management",
    screens: [
      "01_CICD_Pipelines.png",
      "02_Build_Deploy_Logs.png",
      "03_Environment_Matrix.png",
      "04_Container_Registry.png",
      "05_Rollback_Controls.png",
    ],
    screenLabels: [
      "CI/CD Pipeline Runs",
      "Build & Deploy Logs",
      "Environment Version Matrix",
      "Container Image Registry",
      "Instant Rollback Controls",
    ],
    screenCaptions: [
      "Pipeline status board coordinating TypeScript checks, container builds, security scans, and staged rollout steps.",
      "Streaming step logs isolating build cache hits, test durations, and readiness probe confirmations.",
      "Cross-environment commit matrix showing exact SHA digests live in dev, staging, and production.",
      "Immutable container artifact registry listing SBOM scan status and layer sizes.",
      "One-click previous-digest rollback interface engineered for fast recovery.",
    ],
    summary:
      "A CI/CD release orchestration plane connecting automated test gates, immutable container digests, environment matrices, and rapid rollback controls.",
    platform: ["DevOps Control Plane", "Release Engineering"],
    challenge:
      "Deployment pipelines turn risky when teams cannot immediately verify which commit digest is running per environment or roll back cleanly.",
    approach:
      "Ties every release to immutable container SHA digests, pre-deploy checks, and one-step traffic rollback.",
    solution:
      "Five-screen release plane covering pipeline runs, streaming build logs, environment SHA matrix, container registry, and rollback actions.",
    keyFeatures: [
      "Immutable commit-to-container SHA mapping across environments",
      "Automated test, lint, and container SBOM gates ahead of deploy",
      "Instant previous-digest traffic rollback workflow",
    ],
    technologies: ["Docker Containers", "CI/CD Pipelines", "Immutable SHA Digests", "Zero-Downtime Rollouts"],
    scopeItems: ["Release Pipeline UI", "Artifact Registry View", "Rollback Controls"],
  },
  {
    id: "vaultkeep-dr-console",
    slug: "vaultkeep-backup-disaster-recovery",
    title: "VaultKeep DR & Restore Console",
    serviceType: "Server Setup & Management",
    categoryId: "cloud-infrastructure",
    folder: "16_Server_Setup_Management/03_Backup_Disaster_Recovery_Services",
    screens: [
      "01_Vault_Overview.png",
      "02_Backup_Schedules.png",
      "03_Recovery_Targets.png",
      "04_DR_Drill_Terminal.png",
      "05_Audit_History.png",
    ],
    screenLabels: [
      "Immutable Vault Overview",
      "Backup Retention Schedules",
      "RPO / RTO Recovery Targets",
      "Verified DR Drill Terminal",
      "Restore Audit History",
    ],
    screenCaptions: [
      "Off-site backup vault dashboard tracking encrypted volume snapshots, cross-region replication, and object lock state.",
      "Automated hourly WAL and daily volume snapshot retention matrices across production workloads.",
      "Explicit RPO and RTO target posture panel highlighting compliant vs. lagging recovery tiers.",
      "Automated disaster-recovery sandbox restore terminal verifying checksums and boot integrity.",
      "Immutable log of historical backup verifications and test restore drills.",
    ],
    summary:
      "A backup and disaster-recovery verification console tracking encrypted snapshots, RPO/RTO posture, and automated sandbox restore drills.",
    platform: ["DR Operations Console", "Reliability Tooling"],
    challenge:
      "Untested backups frequently fail during real outages due to broken encryption keys, missing WAL segments, or corrupted snapshot chains.",
    approach:
      "Treats automated restore drills as first-class operational telemetry alongside immutable cross-region storage.",
    solution:
      "Five-screen DR console covering snapshot vaults, retention schedules, RPO/RTO targets, automated restore verification logs, and compliance history.",
    keyFeatures: [
      "Cross-region object-locked backup vault visibility",
      "Scheduled sandbox restore drills verifying snapshot boot integrity",
      "Clear RPO and RTO target posture tracking per service tier",
    ],
    technologies: ["Encrypted Snapshots", "WAL Archiving", "Cross-Region Replication", "Restore Verification"],
    scopeItems: ["Backup Vault UI", "DR Drill Telemetry", "Compliance Audit Trail"],
  },
  {
    id: "aegisapp-security-console",
    slug: "aegisapp-web-application-security",
    title: "AegisApp Security & WAF Console",
    serviceType: "Security & Performance Optimization",
    categoryId: "cloud-infrastructure",
    folder: "18_Security_Performance_Optimization/01_Web_Application_Security",
    screens: [
      "01_Security_Posture.png",
      "02_Vulnerability_Findings.png",
      "03_WAF_Rules.png",
      "04_Auth_Audit_Logs.png",
      "05_Remediation_Tracker.png",
    ],
    screenLabels: [
      "AppSec Posture Dashboard",
      "Vulnerability Findings",
      "WAF & Rate Limit Rules",
      "Auth Audit Logs",
      "Remediation Tracker",
    ],
    screenCaptions: [
      "Application security summary isolating critical/high findings, 24 managed WAF rules, enforced TLS/HSTS headers, and domain control checks.",
      "Prioritized security findings table linking BOLA/authz checks and SBOM package advisories directly to owning teams.",
      "Managed OWASP core ruleset and API endpoint rate-limiting configuration panel.",
      "Authentication and OIDC cookie-flag audit trail spotting anomalous token bursts.",
      "Engineering remediation queue tracking SLA patch verification cleanly to closure.",
    ],
    summary:
      "An application security posture and WAF operations console unifying OWASP rulesets, API authorization checks, SBOM advisories, and remediation SLAs.",
    platform: ["AppSec Console", "WAF & Auth Governance"],
    challenge:
      "Web teams receive scattered security scanner alerts without clear prioritization against active WAF rules, auth policies, and package remediations.",
    approach:
      "Connects codebase dependency SBOM advisories, API authorization checks, and live WAF rules inside one prioritized control surface.",
    solution:
      "Five-screen AppSec console spanning executive posture summary, vulnerability triage, WAF/rate-limiting, auth audits, and remediation tracking.",
    keyFeatures: [
      "OIDC/Argon2id auth posture paired with OWASP WAF rule visibility",
      "Dependency SBOM & API BOLA authorization check tracking",
      "Team-assigned vulnerability remediation SLA workflow",
    ],
    technologies: ["OWASP WAF Rules", "TLS / HSTS / CSP Headers", "OIDC Audit Logs", "SBOM Scanning"],
    scopeItems: ["AppSec Dashboard", "WAF Rule Governance", "Remediation Tracker"],
  },
  {
    id: "bastioncloud-cspm-console",
    slug: "bastioncloud-infrastructure-security",
    title: "BastionCloud CSPM & IAM Console",
    serviceType: "Security & Performance Optimization",
    categoryId: "cloud-infrastructure",
    folder: "18_Security_Performance_Optimization/02_Cloud_Infrastructure_Security",
    screens: [
      "01_Cloud_Posture.png",
      "02_IAM_Access.png",
      "03_Storage_VPC.png",
      "04_CloudTrail_Logs.png",
      "05_Compliance_Checks.png",
    ],
    screenLabels: [
      "Cloud Security Posture",
      "IAM Least-Privilege Audit",
      "Storage & VPC Isolation",
      "CloudTrail Event Logs",
      "Baseline Compliance Checks",
    ],
    screenCaptions: [
      "Cloud security posture overview auditing account-wide MFA enforcement, public exposure checks, and encryption defaults.",
      "IAM role and policy analyzer flagging overly broad wildcard permissions and unused access keys.",
      "Storage bucket and VPC security group inspector verifying private database isolation and block-public-access rules.",
      "Searchable API control-plane audit trail tracking IAM policy mutations and root console alerts.",
      "Continuous benchmark control table verifying CIS and baseline cloud hardening rules.",
    ],
    summary:
      "A cloud security posture management (CSPM) and IAM governance workspace flagging wildcard permissions, public bucket drift, and VPC isolation gaps.",
    platform: ["CSPM Console", "Cloud IAM Security"],
    challenge:
      "Rapid cloud iteration often introduces permission creep, forgotten access keys, or overly permissive security-group rules across staging and production accounts.",
    approach:
      "Audits IAM policies, VPC boundaries, and storage encryption continuously against least-privilege cloud baselines.",
    solution:
      "Five-screen CSPM workbench spanning cloud posture, IAM least-privilege analyzer, VPC/storage checks, audit logs, and compliance readiness.",
    keyFeatures: [
      "Wildcard IAM policy and stale key detection",
      "Public storage & security-group ingress drift inspection",
      "Control-plane CloudTrail event auditing",
    ],
    technologies: ["Cloud IAM Analysis", "VPC Isolation Rules", "Audit Event Streams", "Encryption Posture"],
    scopeItems: ["CSPM Overview UI", "IAM Least-Privilege Audit", "Compliance Controls"],
  },
  {
    id: "uptimeforge-sre-console",
    slug: "uptimeforge-application-reliability-performance",
    title: "UptimeForge SRE & APM Console",
    serviceType: "Security & Performance Optimization",
    categoryId: "cloud-infrastructure",
    folder: "18_Security_Performance_Optimization/03_Application_Reliability_Performance",
    screens: [
      "01_SLO_Dashboard.png",
      "02_Trace_Waterfall.png",
      "03_Error_Monitoring.png",
      "04_Load_Testing.png",
      "05_Alert_Policies.png",
    ],
    screenLabels: [
      "SLO & Error Budget Dashboard",
      "Distributed Trace Waterfall",
      "Exception & Error Grouping",
      "Synthetic Load Testing",
      "Alert & Escalation Policies",
    ],
    screenCaptions: [
      "Service-level objective monitor tracking availability targets, p95 latency bounds, and remaining monthly error budgets.",
      "End-to-end distributed span waterfall isolating slow database queries and external API hops.",
      "Grouped application exception stream surfacing stack traces, affected release SHAs, and regression counts.",
      "Controlled load-testing summary checking saturation points ahead of high-traffic product releases.",
      "Burn-rate alert rule console reducing on-call page fatigue with multi-window threshold checks.",
    ],
    summary:
      "An SRE and APM reliability workstation connecting service error budgets, distributed trace waterfalls, grouped runtime exceptions, and burn-rate alerting.",
    platform: ["SRE / APM Console", "Observability Platform"],
    challenge:
      "Noisy single-metric threshold alerts wake engineers unnecessarily while slow distributed traces leave root causes opaque during incidents.",
    approach:
      "Centers incident response on multi-window SLO error budgets linked directly to trace waterfalls and release-tagged exceptions.",
    solution:
      "Five-screen observability console spanning SLO budgets, distributed traces, error grouping, load validation, and burn-rate alerting.",
    keyFeatures: [
      "Error budget & p95 latency tracking across core API services",
      "Distributed span waterfall isolating downstream DB/API stalls",
      "Release-tagged error grouping and multi-window burn-rate alerts",
    ],
    technologies: ["OpenTelemetry Tracing", "SLO Error Budgets", "Structured Logging", "Load Validation"],
    scopeItems: ["SRE Posture Dashboard", "Trace Waterfall UI", "Alert Governance"],
  },

  // ===========================================================================
  // PILLAR 04 — DATABASE & SOFTWARE SYSTEMS (9 Projects across Categories 06, 17, 19)
  // ===========================================================================
  {
    id: "tenantcore-backend-console",
    slug: "tenantcore-multi-tenant-booking-backend",
    title: "TenantCore Backend Ops Console",
    serviceType: "Database & Backend Systems",
    categoryId: "database-software-systems",
    folder: "06_Database_Backend_Systems/01_Multi_Tenant_Booking_Backend",
    screens: [
      "01_Backend_Services.png",
      "02_API_Routes.png",
      "03_Auth_RBAC.png",
      "04_Job_Queues.png",
      "05_Service_Logs.png",
    ],
    screenLabels: [
      "Backend Services Topology",
      "API Route Contracts",
      "Tenant Auth & RBAC",
      "Async Job Queues",
      "Structured Service Logs",
    ],
    screenCaptions: [
      "Multi-tenant backend overview monitoring tenant-isolated services, worker health, and connection pool balance.",
      "REST route contract registry enforcing tenant-scoped validation middleware and rate quotas.",
      "Row-level tenant isolation and role permission inspector guaranteeing strict cross-tenant boundaries.",
      "Background worker queue telemetry tracking reminder dispatches, PDF receipts, and dead-letter retries.",
      "Correlated JSON service request logs filtered by tenant slug and trace ID.",
    ],
    summary:
      "A multi-tenant scheduling and reservation backend console enforcing tenant-isolated database scopes, RBAC contracts, and resilient background queues.",
    platform: ["Backend Ops Console", "Multi-Tenant Architecture"],
    challenge:
      "Multi-tenant SaaS backends face severe risks from accidental cross-tenant data leakage and noisy-neighbor background job contention.",
    approach:
      "Enforces strict tenant context propagation through API routes, database policies, and isolated async worker queues.",
    solution:
      "Five-screen backend governance console inspecting active tenant services, route contracts, RBAC isolation, job queues, and structured trace logs.",
    keyFeatures: [
      "Tenant-isolated row-level policy enforcement and RBAC audit",
      "Rate-limited API route registry and schema contracts",
      "Background job queue visibility and correlation-ID logging",
    ],
    technologies: ["Node.js / TypeScript", "PostgreSQL RLS", "Redis Job Queues", "RBAC"],
    scopeItems: ["Multi-Tenant Isolation", "API Contract Registry", "Worker Queue Console"],
  },
  {
    id: "stockkernel-order-engine",
    slug: "stockkernel-inventory-order-backend",
    title: "StockKernel Order Engine Console",
    serviceType: "Database & Backend Systems",
    categoryId: "database-software-systems",
    folder: "06_Database_Backend_Systems/02_Inventory_Order_Backend",
    screens: [
      "01_Backend_Overview.png",
      "02_Order_Pipeline.png",
      "03_Warehouse_Sync.png",
      "04_Outbox_Queue.png",
      "05_System_Health.png",
    ],
    screenLabels: [
      "Order Engine Overview",
      "Transactional Order Pipeline",
      "Warehouse Stock Sync",
      "Transactional Outbox Queue",
      "Inventory System Health",
    ],
    screenCaptions: [
      "Core order engine summary displaying inventory reservation locks, fulfillment velocity, and outbox queue lag.",
      "Atomic state-machine pipeline transitioning orders cleanly from reservation hold to settlement and pick-list generation.",
      "Multi-warehouse stock allocation ledger reconciling physical SKU counts against storefront reserves.",
      "Transactional outbox relay guaranteeing at-least-once event publication when stock levels commit.",
      "Database lock contention and backend worker saturation telemetry.",
    ],
    summary:
      "A transactional inventory and order orchestration backend built around atomic stock locks, multi-warehouse allocation, and outbox event guarantees.",
    platform: ["Order Backend Console", "Transactional Engine"],
    challenge:
      "Concurrent flash-sale checkouts easily cause oversold SKU stock or orphaned webhook events when DB writes and event publishing run separately.",
    approach:
      "Uses transactional outbox guarantees and row-level inventory reservation holds before order confirmation commits.",
    solution:
      "Five-screen order-engine backend interface spanning engine summary, state pipeline, warehouse sync, transactional outbox queue, and lock telemetry.",
    keyFeatures: [
      "Atomic stock reservation locks preventing concurrent overselling",
      "Transactional outbox pattern guaranteeing reliable event delivery",
      "Warehouse allocation reconciliation and state-machine traceability",
    ],
    technologies: ["PostgreSQL Transactions", "Transactional Outbox", "State Machines", "TypeScript"],
    scopeItems: ["Order State Engine", "Reservation Concurrency", "Outbox Monitoring"],
  },
  {
    id: "streamvault-event-platform",
    slug: "streamvault-realtime-data-processing",
    title: "StreamVault Event Processing Console",
    serviceType: "Database & Backend Systems",
    categoryId: "database-software-systems",
    folder: "06_Database_Backend_Systems/03_Realtime_Data_Processing_Platform",
    screens: [
      "01_Stream_Topology.png",
      "02_Topics_Queues.png",
      "03_Schema_Registry.png",
      "04_Consumer_Groups.png",
      "05_Dead_Letter_Queue.png",
    ],
    screenLabels: [
      "Event Stream Topology",
      "Partitioned Topics & Queues",
      "Versioned Schema Registry",
      "Consumer Group Lag",
      "Dead-Letter Queue Recovery",
    ],
    screenCaptions: [
      "Real-time event pipeline map illustrating event producers, partitioned brokers, stream processors, and warehouse sinks.",
      "Partition throughput and retention configuration console governing domain event topics.",
      "Versioned Avro/JSON schema contract registry blocking breaking producer payload deployments.",
      "Consumer group partition offset monitor detecting lag spikes early before backlog builds.",
      "Poison-pill message quarantine and controlled replay console.",
    ],
    summary:
      "A real-time event streaming platform console governing partitioned topics, backward-compatible schema contracts, consumer lag, and dead-letter replay.",
    platform: ["Event Streaming UI", "Backend Data Pipeline"],
    challenge:
      "Distributed event-driven systems silently break downstream analytics and services when unvalidated producer changes corrupt topic schemas.",
    approach:
      "Enforces a versioned schema registry ahead of broker ingestion and isolates malformed payloads into structured dead-letter replay queues.",
    solution:
      "Five-screen streaming operations UI covering event topology, topic partitions, schema contracts, consumer lag tracking, and DLQ inspection.",
    keyFeatures: [
      "Enforced schema compatibility checks protecting downstream consumers",
      "Per-partition consumer group lag monitoring",
      "Quarantined dead-letter payload inspection and selective replay",
    ],
    technologies: ["Event Streams & Topics", "Schema Registry", "Partitioned Consumers", "DLQ Replay"],
    scopeItems: ["Stream Topology UI", "Schema Contract Governance", "Lag & DLQ Tooling"],
  },
  {
    id: "schemacraft-postgresql-ide",
    slug: "schemacraft-database-architecture-migration",
    title: "SchemaCraft PostgreSQL IDE & SQL Editor",
    serviceType: "Database Solutions",
    categoryId: "database-software-systems",
    folder: "17_Database_Solutions/01_Database_Architecture_Migration",
    screens: [
      "01_Database_Overview.png",
      "02_Schema_Browser.png",
      "03_SQL_Query_Editor.png",
      "04_Migration_CDC.png",
      "05_Constraints_ER.png",
    ],
    screenLabels: [
      "PostgreSQL Cluster Overview",
      "Schema & Index Browser",
      "Interactive SQL Query Editor",
      "Zero-Downtime Migrations & CDC",
      "Constraints & ER Integrity",
    ],
    screenCaptions: [
      "Production PostgreSQL 16.4 cluster overview tracking PgBouncer connection pooling, replication lag, and primary database storage.",
      "Hierarchical table, primary/foreign key, and `tstzrange` exclusion index browser.",
      "Syntax-highlighted SQL query worksheet inspecting `partition_audit.sql` beside structured result rows.",
      "Expand-and-contract schema migration tracker monitoring dual-write triggers and zero-lock DDL steps.",
      "Entity-relationship and constraint integrity inspector verifying foreign keys, check rules, and exclusion bounds.",
    ],
    summary:
      "A dark-mode PostgreSQL 16 administration IDE unifying PgBouncer cluster health, schema inspection, an interactive SQL editor, and safe expand-contract migrations.",
    platform: ["PostgreSQL IDE", "Database Engineering"],
    challenge:
      "Schema migrations on live multi-tenant tables easily trigger lock contention or break production writes without expand-and-contract discipline.",
    approach:
      "Brings index inspection, PgBouncer pool visibility, SQL query execution, and non-blocking migration checklists into a focused engineering IDE.",
    solution:
      "Five-screen PostgreSQL engineering workbench covering cluster overview, object tree, live SQL worksheet, zero-lock migrations, and constraint checks.",
    keyFeatures: [
      "PostgreSQL 16.4 & PgBouncer connection pool telemetry",
      "Built-in SQL query worksheet with schema-aware table browser",
      "Expand-and-contract zero-lock migration & constraint audits",
    ],
    technologies: ["PostgreSQL 16", "PgBouncer Pooling", "SQL Editor", "Exclusion & FK Constraints"],
    scopeItems: ["Database IDE Design", "SQL Worksheet UI", "Migration Safety Console"],
  },
  {
    id: "querytune-performance-studio",
    slug: "querytune-database-performance-reliability",
    title: "QueryTune DB Performance & EXPLAIN Studio",
    serviceType: "Database Solutions",
    categoryId: "database-software-systems",
    folder: "17_Database_Solutions/02_Database_Performance_Reliability",
    screens: [
      "01_Slow_Query_Monitor.png",
      "02_Explain_Analyze.png",
      "03_Index_Advisor.png",
      "04_Replication_Pool.png",
      "05_Backups_WAL.png",
    ],
    screenLabels: [
      "Slow Query Digest",
      "EXPLAIN ANALYZE Plan Tree",
      "Index Advisor",
      "Replication & Connection Pool",
      "PITR Backups & WAL Archive",
    ],
    screenCaptions: [
      "pg_stat_statements slow query digest isolating sequential scans and high-I/O query templates.",
      "Visual EXPLAIN ANALYZE cost tree pinpointing nested-loop bottlenecks, buffer hits, and sort spills.",
      "Concurrent `CREATE INDEX CONCURRENTLY` recommendation advisor weighting write overhead against read gains.",
      "Primary-replica lag and connection pool saturation monitor guarding transactional throughput.",
      "Point-in-time recovery (PITR) WAL segment archival and vacuum bloat status panel.",
    ],
    summary:
      "A database performance tuning studio translating pg_stat_statements digests and EXPLAIN ANALYZE plans into safe concurrent index recommendations.",
    platform: ["DB Performance Studio", "Query Diagnostics"],
    challenge:
      "Database slowdowns frequently stem from subtle sequential scans or stale query plans buried inside raw EXPLAIN text output.",
    approach:
      "Visualizes query execution plan trees alongside concurrent indexing guidance and replica connection pool telemetry.",
    solution:
      "Five-screen DB reliability console spanning slow-query digests, EXPLAIN trees, index recommendations, replication pools, and WAL PITR tracking.",
    keyFeatures: [
      "Slow-query fingerprint ranking by total execution time and buffers read",
      "Readable EXPLAIN ANALYZE node inspection and sequential-scan flags",
      "Lock-safe `CONCURRENTLY` index and PITR WAL monitoring",
    ],
    technologies: ["PostgreSQL Telemetry", "EXPLAIN ANALYZE", "pg_stat_statements", "WAL Archiving"],
    scopeItems: ["Query Tuning Studio", "Plan Visualization", "WAL & Replica Health"],
  },
  {
    id: "northstar-warehouse-studio",
    slug: "northstar-data-warehouse-analytics-platform",
    title: "Northstar Data Warehouse & dbt Studio",
    serviceType: "Database Solutions",
    categoryId: "database-software-systems",
    folder: "17_Database_Solutions/03_Data_Warehouse_Analytics_Platform",
    screens: [
      "01_Warehouse_Tables.png",
      "02_ELT_Pipelines.png",
      "03_dbt_SQL_Editor.png",
      "04_Analytics_Query.png",
      "05_BI_Semantic_Layer.png",
    ],
    screenLabels: [
      "Warehouse Schemas & Marts",
      "ELT Ingestion Pipelines",
      "dbt SQL Transform Editor",
      "Ad-Hoc Analytics Query",
      "Governed BI Semantic Layer",
    ],
    screenCaptions: [
      "Structured bronze, silver, and gold warehouse table catalog showing freshness SLAs and row volume status.",
      "Incremental ELT pipeline monitor syncing operational database snapshots and billing ledgers.",
      "dbt model SQL editor running automated `not_null` and referential schema tests alongside lineage views.",
      "High-speed analytical query workbench validating cohort metrics against governed fact tables.",
      "Centralized metric definition layer ensuring finance, marketing, and product share single KPI logic.",
    ],
    summary:
      "An analytics engineering and dbt warehouse workbench unifying ELT ingestion freshness, SQL model lineage, automated tests, and governed BI metrics.",
    platform: ["Data Warehouse IDE", "Analytics Engineering"],
    challenge:
      "Business departments often report conflicting revenue numbers because dashboards query inconsistent raw tables rather than tested semantic models.",
    approach:
      "Separates raw ELT ingestion from tested dbt transformation layers and a single governed metric dictionary.",
    solution:
      "Five-screen analytics platform spanning warehouse catalog, ELT schedules, dbt SQL modeling, query validation, and BI metric governance.",
    keyFeatures: [
      "Medallion warehouse tier visibility with source freshness checks",
      "Tested dbt SQL transformation workflow and model lineage",
      "Governed KPI semantic layer preventing metric drift",
    ],
    technologies: ["SQL Data Modeling", "dbt Transforms", "ELT Pipelines", "Semantic Metric Layer"],
    scopeItems: ["Warehouse Catalog UI", "dbt Model Workbench", "Semantic KPI Layer"],
  },
  {
    id: "routecraft-field-mobile-app",
    slug: "routecraft-field-service-mobile-app",
    title: "RouteCraft Field Mobile App (5 Screens)",
    serviceType: "Application Development",
    categoryId: "database-software-systems",
    folder: "19_Application_Development/01_Field_Service_Mobile_App",
    screens: [
      "01_Onboarding_Login.png",
      "02_Main_Dashboard.png",
      "03_Core_Job_Execution.png",
      "04_Customer_Signoff.png",
      "05_Profile_Settings.png",
    ],
    screenLabels: [
      "Technician Sign-In",
      "Daily Route & Jobs Dashboard",
      "Active Job Inspection",
      "Customer Digital Sign-Off",
      "Van Profile & Offline Sync",
    ],
    screenCaptions: [
      "Streamlined technician sign-in and shift readiness check pairing van assignment confirmation.",
      "Ordered daily stop list displaying arrival windows, site equipment notes, priority alerts, and one-tap route status transitions.",
      "On-site equipment checklist, serial barcode logging, and parts replacement capture tailored for single-hand mobile operation.",
      "Digital customer sign-off and photo proof-of-completion screen triggering instant office invoicing.",
      "Offline cache sync health and shift preference settings for basement or low-signal job sites.",
    ],
    summary:
      "A five-screen field-service mobile application interface designed for HVAC and maintenance technicians executing daily stops, checklists, and customer sign-offs.",
    platform: ["iOS & Android Mobile UI", "Field Operations App"],
    challenge:
      "Field technicians working in mechanical rooms and basements need legible, thumb-friendly screens that tolerate spotty cellular connectivity.",
    approach:
      "Uses clean high-contrast typography, ordered stop queues, one-tap status transitions, and explicit offline sync state.",
    solution:
      "Five-screen mobile companion covering technician login, daily dispatch dashboard, job checklist capture, digital customer sign-off, and sync settings.",
    keyFeatures: [
      "Ordered daily route queue with En Route / Arrived one-tap status",
      "Priority call-out pinning synchronized with dispatch boards",
      "Offline-resilient job checklists and digital customer sign-off",
    ],
    technologies: ["React Native / Mobile UI", "Offline Queue Sync", "Digital Signature Capture", "TypeScript"],
    scopeItems: ["Mobile Field UX", "5-Screen App Flow", "Dispatch Synchronization"],
  },
  {
    id: "lumina-learn-mobile-app",
    slug: "lumina-education-learning-mobile-app",
    title: "Lumina Learn Mobile App (5 Screens)",
    serviceType: "Application Development",
    categoryId: "database-software-systems",
    folder: "19_Application_Development/02_Education_Learning_App",
    screens: [
      "01_Onboarding_Login.png",
      "02_Main_Dashboard.png",
      "03_Lesson_Player.png",
      "04_Assignment_Detail.png",
      "05_Profile_Settings.png",
    ],
    screenLabels: [
      "Student Sign-In",
      "Learning Hub Dashboard",
      "Interactive Lesson Player",
      "Assignment & Feedback",
      "Learner Profile & Reminders",
    ],
    screenCaptions: [
      "Calm student onboarding and cohort sign-in screen tailored for mobile focus.",
      "Daily study dashboard highlighting active modules, upcoming due dates, and continuation shortcuts.",
      "Distraction-free lesson reader and media player preserving transcript bookmarks and pace controls.",
      "Clear assignment rubric breakdown displaying submission status, instructor comments, and attachments.",
      "Notification cadence and offline lesson download settings.",
    ],
    summary:
      "A mobile learning application interface structured for clear daily study focus, clean lesson playback, and transparent assignment feedback.",
    platform: ["iOS & Android Mobile UI", "EdTech App"],
    challenge:
      "Mobile education apps often clutter small viewports with distracting badges instead of supporting deep reading and due-date clarity.",
    approach:
      "Focuses each viewport cleanly on one primary learner task—resuming modules, reading lessons, or reviewing instructor feedback.",
    solution:
      "Five-screen mobile learning application covering cohort sign-in, study dashboard, lesson player, assignment feedback, and study preferences.",
    keyFeatures: [
      "Focused resume-learning dashboard and upcoming deadline cues",
      "Structured lesson reader and media transcript playback UI",
      "Rubric-clear assignment status and instructor feedback view",
    ],
    technologies: ["React Native / Mobile UI", "Offline Media Caching", "Progress Sync", "TypeScript"],
    scopeItems: ["Mobile Learning UX", "5-Screen Course Flow", "Assignment Interface"],
  },
  {
    id: "parcelgrid-driver-app",
    slug: "parcelgrid-delivery-logistics-mobile-app",
    title: "ParcelGrid Driver Mobile App (5 Screens)",
    serviceType: "Application Development",
    categoryId: "database-software-systems",
    folder: "19_Application_Development/03_Delivery_Logistics_App",
    screens: [
      "01_Onboarding_Login.png",
      "02_Route_Dashboard.png",
      "03_Barcode_Scanner.png",
      "04_Proof_Of_Delivery.png",
      "05_Profile_Settings.png",
    ],
    screenLabels: [
      "Driver Shift Login",
      "Route & Stop Manifest",
      "Parcel Barcode Scanner",
      "Proof of Delivery Capture",
      "Vehicle & Sync Settings",
    ],
    screenCaptions: [
      "Fast courier vehicle inspection and manifest check-in ahead of route departure.",
      "Turn-ordered delivery manifest displaying parcel counts, gate access notes, and time-sensitive windows.",
      "High-speed barcode scan verification screen matching loaded parcels to drop-off locations.",
      "Photographic proof-of-delivery and recipient signature screen logging timestamped drop-off confirmation.",
      "Shift status, route alert volume, and vehicle pairing settings.",
    ],
    summary:
      "A five-screen courier and last-mile logistics driver mobile app guiding parcel scanning, turn-ordered manifests, and proof-of-delivery capture.",
    platform: ["iOS & Android Mobile UI", "Logistics Driver App"],
    challenge:
      "Last-mile drivers executing dozens of timed stops need instant barcode confirmation and zero-friction proof-of-delivery capture.",
    approach:
      "Eliminates nested menus in favor of high-visibility parcel verification, gate notes, and one-hand POD confirmation.",
    solution:
      "Five-screen driver companion spanning shift check-in, stop manifest, barcode validation, photographic POD, and offline route telemetry.",
    keyFeatures: [
      "Turn-ordered stop manifest with access/gate code prominence",
      "Instant barcode verification reducing mis-delivered parcels",
      "Timestamped photo and signature proof-of-delivery flow",
    ],
    technologies: ["Mobile Camera Scanner UI", "Geofenced POD", "Offline Retry Sync", "TypeScript"],
    scopeItems: ["Driver Mobile UX", "Barcode & POD Screens", "Last-Mile Manifest Flow"],
  },
];

export const projects: readonly Project[] = SEEDS.map(buildProject);

export function getPublishedProjects(): readonly Project[] {
  return projects.filter((p) => p.status === "published");
}

export function getAvailableWorkCategories(): readonly WorkCategoryWithCount[] {
  const published = getPublishedProjects();
  return WORK_CATEGORIES.map((category) => ({
    ...category,
    count: published.filter((p) => p.categoryId === category.id).length,
  })).filter((category) => category.count > 0);
}

export function getProjectsByCategory(categoryId: "all" | WorkCategoryId): readonly Project[] {
  const published = getPublishedProjects();
  if (categoryId === "all") return published;
  return published.filter((p) => p.categoryId === categoryId);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): readonly Project[] {
  return getPublishedProjects()
    .filter((p) => p.categoryId === project.categoryId && p.id !== project.id)
    .slice(0, limit);
}

export function getFeaturedHeroProjects(): readonly Project[] {
  const featured = getPublishedProjects().filter((p) => p.featured);
  return featured.length > 0 ? featured : getPublishedProjects().slice(0, 3);
}
