import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";

const mod: Module = {
  id: "m02",
  number: 2,
  title: "Solar PV",
  titleAr: "الطاقة الشمسية الكهروضوئية",
  summary: "Content in preparation.",
  whyItMatters: "",
  competencies: ["solar"],
  prerequisites: [],
  estimatedHours: 0,
  lessons: [l01, l02, l03, l04, l05],
  exam: [],
  glossary: [],
  formulas: formulas.filter((f) => ["m02-l01", "m02-l02", "m02-l03", "m02-l04", "m02-l05"].includes(f.lesson)),
  references,
  cheatSheet: "",
};

export default mod;
