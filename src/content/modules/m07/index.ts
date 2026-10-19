import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "m07",
  number: 7,
  title: "Project Development Lifecycle",
  titleAr: "دورة حياة تطوير المشاريع",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["delivery"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md``,
};

export default mod;
