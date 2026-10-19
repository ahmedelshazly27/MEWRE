import type { Module } from "../../schema";
import l01 from "./l01";
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
  lessons: [l01],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
  draft: false,
};

export default mod;
