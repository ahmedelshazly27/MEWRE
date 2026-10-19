import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import references from "./references";
import formulas from "./formulas";

const mod: Module = {
  id: "m00",
  number: 0,
  title: "Kuwait Energy Landscape",
  titleAr: "مشهد الطاقة في الكويت",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["context"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
  draft: false,
};

export default mod;
