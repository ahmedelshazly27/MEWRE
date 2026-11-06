import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "sh08",
  number: 8,
  title: "Running a volunteer-led team",
  titleAr: "إدارة فريق يقوده متطوعون",
  summary:
    "How to run Suhail on unpaid leads until there is revenue: what volunteers get in return and the arithmetic of retention; lead charters, single owners, DACI decision rights and an async-first cadence across Gulf and European time zones and weekends; capacity plans built on delivered rather than pledged hours, with a safe load, a cut list and the bus test; recruiting with trial projects, onboarding to a first win, recognition and kind exits; a written trigger and fairness policy for the first paid role and an honest position on equity; and the handbook, board, rituals and access register that hold it all together.",
  whyItMatters:
    "Suhail's plan starts in January 2027 with five unpaid leads (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance Lead) while your main hours go to Afterwave. Volunteers leave quietly when a role does not serve their motives or asks for more hours than they have, and every departure costs you a recruit and a stalled workstream. This module gives you the design, the numbers and the written policies to keep the team delivering without you in every decision, and to move to paid roles without breaking trust.",
  competencies: ["sh-org"],
  prerequisites: [],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
