import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "aw14",
  number: 14,
  title: "Pricing, YC and company setup",
  titleAr: "التسعير وواي كومبينيتور وتأسيس الشركة",
  summary:
    "The commercial and corporate decisions specific to Afterwave: pricing on-prem infrastructure software per rig with a platform fee, pricing instrumented test platforms and test-as-a-service from landed cost and utilisation, the YC deal and US venture expectations for a hardware-adjacent AI infrastructure company, the Netherlands vs Zurich vs Delaware structure decision with its grants, and the investor narrative with a dated why-now and a milestone plan that sizes the seed.",
  whyItMatters:
    "As Afterwave's CEO you will write the first price sheet, answer YC partners, choose where the company and the team sit, and tell the fundraising story, mostly before any adviser is on retainer. Each decision is hard to reverse: a value metric signed by three customers, a Swiss AG incorporated before a YC flip, a deck that overstates the Machinery Regulation. This module gives you the numbers and the mechanisms to get them right the first time, building on Founder Core rather than repeating it.",
  competencies: ["aw-business"],
  prerequisites: ["fc06", "fc07", "fc08"],
  estimatedHours: 6.5,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
