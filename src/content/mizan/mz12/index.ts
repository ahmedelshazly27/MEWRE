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
  id: "mz12",
  number: 12,
  title: "Distribution, partners and the business model",
  titleAr: "التوزيع والشراكات ونموذج العمل",
  summary:
    "How Mizan makes money across built software, partnered products and resold hardware: the build, partner or resell decision with its economics (margin, control, speed, risk) applied to soiling analytics, PPC/EMS, BESS and cleaning robots; Kuwaiti agency and distribution agreements (agency law concepts, Law 1 of 2024, the Law 94 of 2026 agent ban in public contracting, exclusivity, minimums, termination); working with Chinese integrators and international vendors (due diligence, certification, warranties, after-sales, landed cost, letters of credit and cash exposure); partnering with an analytics vendor such as SwishOS versus building in-house; and two operating constraints: public claims discipline (the evidence ladder, consent for partner names, and keeping confidential plant data out of public files), and open-source research tools as a credibility engine.",
  whyItMatters:
    "Mizan is a product company and a distribution business at once, and every vendor, partner and investor will test which one it really is. The choices in this module decide where Mizan's margin and defensibility come from, whether a single hardware deal can drain its cash, whether it may sell to a ministry at all after the 2026 procurement changes, and whether a partnership accelerates the company or hands its core to a competitor. You negotiate all of these yourself, usually before counsel is in the room.",
  competencies: ["mz-business"],
  prerequisites: ["mz04", "mz05"],
  estimatedHours: 6.5,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
