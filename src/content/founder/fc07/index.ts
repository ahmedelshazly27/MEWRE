import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import l07 from "./l07";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "fc07",
  number: 7,
  title: "Fundraising",
  titleAr: "جمع التمويل",
  summary:
    "How venture capital actually works (fund structure, 2 and 20, the power law and the fund-returner test), what each stage must prove and how rounds dilute, the full capital map from YC, a16z speedrun, Hub71 and Antler to WBSO, Innovatiekrediet, the EIC Accelerator and Gulf funds, the pitch as an argument with Afterwave as the worked deck, data rooms and investor updates, running a compressed round, and reading term sheets for economics and control.",
  whyItMatters:
    "You own fundraising in every venture you run: Afterwave's first institutional round (with YC W27 pending and Zurich under consideration), Mizan's first Gulf capital, and Suhail's sponsor and partner funding. Choosing the wrong capital for a venture's shape, raising for the wrong milestones, or signing a term sheet you have not computed costs more than any single month of execution. This module gives you the investor's arithmetic so you can pick the right investors, size the round, run the process and negotiate the terms that matter.",
  competencies: ["fc-fundraising"],
  prerequisites: [],
  estimatedHours: 9,
  lessons: [l01, l02, l03, l04, l05, l06, l07],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
