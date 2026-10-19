import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m10",
  number: 10,
  title: "Financial Management",
  titleAr: "الإدارة المالية",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["finance"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
  draft: false,
};

export default mod;
