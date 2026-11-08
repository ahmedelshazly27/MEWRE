import type { Block, Question } from "../schema";

/**
 * A plain-language explainer for the trial week: intuition first, then only the numbers and words a MEWRE PM
 * actually uses. 8 to 15 minutes each. Theory stays in the full Track 0 lessons (`deeper`).
 */
export interface Explainer {
  /** "x-reactive-power" */
  id: string;
  /** Topic group the explainer was written for (1 to 7). The 4-day plan in index.ts decides when it is studied. */
  day: number;
  title: string;
  minutes: number;
  /** Track 0 module this belongs to (m00..m15). */
  module: string;
  /** One or two sentences: why this matters to you in the first weeks at MEWRE. */
  hook: string;
  /**
   * The explainer itself: everyday analogy first, then the mechanism in plain words, at least one visual
   * (widget, diagram, chart, flow or matrix), then a short "numbers you will hear" callout. No derivations.
   */
  blocks: Block[];
  /** Phrases and questions you can use in a meeting (3 to 5). */
  say: string[];
  /** The classic confusion or mistake, and the correct version. */
  trap: string;
  /** Three quick questions tagged with existing Track 0 concept ids, so they feed mastery and review. */
  check: Question[];
  /** Track 0 lesson ids to go deeper after the trial. */
  deeper: string[];
}

export interface TrialDay {
  day: number;
  title: string;
  /** What you can do at the end of the day. */
  goal: string;
  /** Explainer ids in the day's main path, in study order (fits the daily budget). */
  core: string[];
  /** Explainer ids to do if time allows, or after the trial starts. */
  optional: string[];
  /** Ends with the final exam. */
  exam?: boolean;
  /** Track 0 modules whose must-know concepts you self-test that day. */
  modules: string[];
  /** Playbook section ids to read that day. */
  playbook: string[];
}
