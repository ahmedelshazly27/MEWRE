import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import glossary from "./glossary";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m08",
  number: 8,
  title: "Project Management & Controls",
  titleAr: "إدارة المشاريع والتحكم",
  summary: "TBD",
  whyItMatters: "TBD",
  competencies: ["controls", "risk", "delivery"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam: [],
  glossary,
  formulas,
  references,
  cheatSheet: "",
};

export default mod;
