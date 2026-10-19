import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "m12",
  number: 12,
  title: "Operations & Performance",
  titleAr: "التشغيل والأداء",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["operations"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md``,
};

export default mod;
