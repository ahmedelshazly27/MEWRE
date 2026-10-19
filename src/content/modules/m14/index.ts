import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m14",
  number: 14,
  title: "AI-Native Project Management",
  titleAr: "إدارة المشاريع بالذكاء الاصطناعي",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["ai"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02],
  exam: [],
  glossary: [],
  formulas,
  references,
  cheatSheet: "",
};

export default mod;
