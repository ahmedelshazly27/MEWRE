/**
 * Tracks: independent courses that share one learner store, one review queue and one concept graph.
 * Module ids are globally unique (Track 0 keeps m00..m15; others use a track prefix: fc01, aw01, mz01, sh01),
 * so lessons, questions, cards and concepts can be looked up without knowing the track.
 */
import type { Module } from "./schema";
import { MODULES } from "./index";
import { FOUNDER_MODULES } from "./founder";
import { AFTERWAVE_MODULES } from "./afterwave";
import { MIZAN_MODULES } from "./mizan";
import { SUHAIL_MODULES } from "./suhail";

export type TrackId = "mewre" | "founder" | "afterwave" | "mizan" | "suhail";

export interface Competency {
  label: string;
  /** Relative importance in the track's readiness score. */
  weight: number;
}

export interface Track {
  id: TrackId;
  number: number;
  title: string;
  short: string;
  tagline: string;
  /** Icon name from the nav icon set. */
  icon: string;
  modules: Module[];
  /** Recommended study order of module ids. */
  studyOrder: string[];
  competencies: Record<string, Competency>;
  /** Readiness label, e.g. "Job readiness" or "Founder readiness". */
  readinessLabel: string;
  /** Who the learner is in this track, for the AI tutor. */
  tutorContext: string;
  /** Only Track 0 has an Arabic edition. */
  arabic: boolean;
  /** Phase in which the track's content ships (shown while empty). */
  phase?: number;
}

const LEARNER_BASE =
  "The learner is a founder and operator (MSc Sustainable Energy Technology, former systems engineer in logistics automation, fluent English and Arabic) who learns fastest through real mechanisms, numbers and systems, not business cliches.";

export const TRACKS: Track[] = [
  {
    id: "mewre",
    number: 0,
    title: "MEWRE Project Manager",
    short: "MEWRE PM",
    tagline: "Renewable-energy project management at Kuwait's Ministry of Electricity, Water and Renewable Energy.",
    icon: "sun",
    modules: MODULES,
    studyOrder: ["m00", "m01", "m08", "m09", "m10", "m07", "m02", "m05", "m06", "m11", "m13", "m14", "m12", "m03", "m04", "m15"],
    competencies: {
      controls: { label: "Schedule & cost control", weight: 1.5 },
      contracts: { label: "Contracts & commercial", weight: 1.4 },
      delivery: { label: "Project lifecycle & delivery", weight: 1.3 },
      context: { label: "Kuwait sector & institutions", weight: 1.2 },
      finance: { label: "Finance & economics", weight: 1.2 },
      procurement: { label: "Public procurement", weight: 1.1 },
      solar: { label: "Solar PV & CSP technology", weight: 1.1 },
      leadership: { label: "Leadership & communication", weight: 1.1 },
      risk: { label: "Risk, quality & HSE", weight: 1.0 },
      grid: { label: "Grid integration", weight: 1.0 },
      engineering: { label: "Power engineering fundamentals", weight: 0.9 },
      "wind-storage": { label: "Wind & energy storage", weight: 0.9 },
      operations: { label: "Operations & asset performance", weight: 0.8 },
      ai: { label: "AI-native project management", weight: 0.8 },
    },
    readinessLabel: "Job readiness",
    tutorContext:
      "The learner is a System Energy Engineer with a strong systems-thinking and controls background, preparing to become a renewable-energy Project Manager at Kuwait's Ministry of Electricity, Water and Renewable Energy (MEWRE): Shagaya Renewable Energy Park and new utility-scale PV + BESS IPPs. Fluent in English and Arabic.",
    arabic: true,
  },
  {
    id: "founder",
    number: 1,
    title: "Founder Core",
    short: "Founder Core",
    tagline: "Running a venture-scale startup: product, go-to-market, sales, finance, fundraising, equity, operations.",
    icon: "rocket",
    modules: FOUNDER_MODULES,
    studyOrder: FOUNDER_MODULES.map((m) => m.id),
    competencies: {
      "fc-fundamentals": { label: "Startup fundamentals", weight: 1.0 },
      "fc-product": { label: "Product management", weight: 1.2 },
      "fc-gtm": { label: "Go-to-market", weight: 1.3 },
      "fc-sales": { label: "Sales", weight: 1.4 },
      "fc-marketing": { label: "Marketing & brand", weight: 0.9 },
      "fc-finance": { label: "Finance & economics", weight: 1.2 },
      "fc-fundraising": { label: "Fundraising", weight: 1.3 },
      "fc-legal": { label: "Equity & legal", weight: 1.1 },
      "fc-ops": { label: "Operating the company", weight: 1.0 },
      "fc-ai": { label: "AI-native founder", weight: 0.9 },
    },
    readinessLabel: "Founder readiness",
    tutorContext: `${LEARNER_BASE} They run several early ventures and own everything except the technical build: go-to-market, sales, product management, strategy, pricing, partnerships, fundraising, finance, legal structuring, hiring and operations. Engineering partners build the product.`,
    arabic: false,
    phase: 2,
  },
  {
    id: "afterwave",
    number: 2,
    title: "Afterwave",
    short: "Afterwave",
    tagline: "Physical AI test infrastructure: bench memory, change impact, private models and agents at the test bench.",
    icon: "wave",
    modules: AFTERWAVE_MODULES,
    studyOrder: AFTERWAVE_MODULES.map((m) => m.id),
    competencies: {
      "aw-test": { label: "Hardware test engineering", weight: 1.3 },
      "aw-data": { label: "Bench data & DAQ", weight: 1.2 },
      "aw-impact": { label: "Change impact & test selection", weight: 1.3 },
      "aw-physical-ai": { label: "Robotics & physical AI", weight: 1.0 },
      "aw-ml": { label: "ML & agents on bench data", weight: 1.0 },
      "aw-platforms": { label: "Test platform engineering", weight: 0.9 },
      "aw-safety": { label: "Functional safety & regulation", weight: 1.1 },
      "aw-business": { label: "Selling test infrastructure", weight: 1.3 },
    },
    readinessLabel: "CEO readiness",
    tutorContext: `${LEARNER_BASE} They are CEO (go-to-market) of Afterwave, a physical AI test infrastructure company: Lockstep (capture of rig signals and on-screen actions on one clock), Afterwave Enclave (private environment for captured data, local models and agents), Ripple (change-impact engine: which tests to rerun after firmware, model or rig changes), and later Afterwave's own instrumented hardware test platforms. Cofounders are ex-Tesla validation and test engineers.`,
    arabic: false,
    phase: 3,
  },
  {
    id: "mizan",
    number: 3,
    title: "Mizan",
    short: "Mizan",
    tagline: "PV soiling analytics, cleaning optimisation and tracker/stow control for desert plants in Kuwait and the Gulf.",
    icon: "dust",
    modules: MIZAN_MODULES,
    studyOrder: MIZAN_MODULES.map((m) => m.id),
    competencies: {
      "mz-soiling": { label: "Soiling science & measurement", weight: 1.3 },
      "mz-cleaning": { label: "Cleaning optimisation economics", weight: 1.2 },
      "mz-control": { label: "Tracker, stow & plant control", weight: 1.1 },
      "mz-data": { label: "Plant data & analytics", weight: 1.1 },
      "mz-grid": { label: "Grid, PPC & BESS", weight: 0.8 },
      "mz-validation": { label: "Validation & research partnership", weight: 1.0 },
      "mz-business": { label: "Selling in Kuwait & the Gulf", weight: 1.3 },
    },
    readinessLabel: "Founder readiness",
    tutorContext: `${LEARNER_BASE} They are building Mizan, an energy company in Kuwait and the Gulf focused on PV soiling analytics, cleaning optimisation and plant control functions such as stow and tracker control under dust, wind and extreme heat, starting with a soiling analytics pilot with KISR at Shagaya Phase I.`,
    arabic: false,
    phase: 4,
  },
  {
    id: "suhail",
    number: 4,
    title: "Suhail",
    short: "Suhail",
    tagline: "A builder ecosystem for the Arab world: hackathons, media, Suhail Season, investors and an open research arm.",
    icon: "star",
    modules: SUHAIL_MODULES,
    studyOrder: SUHAIL_MODULES.map((m) => m.id),
    competencies: {
      "sh-community": { label: "Community & ecosystem design", weight: 1.3 },
      "sh-events": { label: "Hackathons & events", weight: 1.2 },
      "sh-partnerships": { label: "Partnerships & sponsorship", weight: 1.3 },
      "sh-media": { label: "Media operations", weight: 1.0 },
      "sh-landscape": { label: "Arab tech & AI landscape", weight: 1.0 },
      "sh-org": { label: "Structure & volunteer teams", weight: 0.9 },
      "sh-research": { label: "Open-weight AI research", weight: 1.0 },
    },
    readinessLabel: "Founder readiness",
    tutorContext: `${LEARNER_BASE} They are building Suhail (سهيل), a builder ecosystem for the Arab world: hackathons, events, a newsletter, the Suhail Season conference, The Majlis podcast, connections to investors and employers, and a planned research arm for open-weight models, datasets and benchmarks for the Arab world.`,
    arabic: false,
    phase: 5,
  },
];

export const TRACK_IDS = TRACKS.map((t) => t.id);
export const getTrack = (id: string) => TRACKS.find((t) => t.id === id);

const MODULE_TRACK = new Map<string, TrackId>(TRACKS.flatMap((t) => t.modules.map((m) => [m.id, t.id] as const)));
export const trackOfModule = (moduleId: string): TrackId => MODULE_TRACK.get(moduleId) ?? "mewre";

/** All modules across tracks, Track 0 first. */
export const ALL_MODULES: Module[] = TRACKS.flatMap((t) => t.modules);
