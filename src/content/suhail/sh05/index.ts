import type { Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import l06 from "./l06";
import formulas from "./formulas";
import references from "./references";
import glossary from "./glossary";
import exam from "./exam";
import cheatSheet from "./cheatsheet";

const mod: Module = {
  id: "sh05",
  number: 5,
  title: "Media operations: newsletter, podcast, bilingual content",
  titleAr: "العمليات الإعلامية: النشرة البريدية والبودكاست والمحتوى ثنائي اللغة",
  summary:
    "How Suhail runs its newsletter and The Majlis podcast with a volunteer team: editorial strategy, a calendar sized to volunteer hours and independence from sponsors; newsletter growth maths (acquisition, churn, steady state), metrics after Apple Mail Privacy Protection, and deliverability with SPF, DKIM, DMARC on suhail.build and Resend; podcast format, guest pipeline, recording chain, loudness targets and IAB download measurement; dialects, MSA, English, code-switching, RTL and Arabic SEO; the content-to-community funnel with retention and referral levers; and sponsorship CPM maths, packages, sponsor reports and AI-assisted production with human review.",
  whyItMatters:
    "Between events, the newsletter and The Majlis are how builders across the Arab world meet Suhail and keep coming back, and how sponsors judge whether Suhail has an audience worth paying for. With unpaid leads and nothing launched yet, you have to set a cadence the team can sustain, report numbers a sponsor can verify, and keep editorial and research credibility out of reach of sponsors. Getting the language right, in dialect, MSA and English, is part of the product, not a translation step at the end.",
  competencies: ["sh-media"],
  prerequisites: ["fc05"],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
