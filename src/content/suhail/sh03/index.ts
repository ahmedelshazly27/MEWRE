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
  id: "sh03",
  number: 3,
  title: "Event economics and sponsorship sales",
  titleAr: "اقتصاديات الفعاليات وبيع الرعايات",
  summary:
    "The money side of Suhail's events: event P&Ls with fixed, variable and fulfilment costs, contingency and break-even attendance (a ceiling for free events); line-item budgets for a meetup, a hackathon and the Suhail Season, cash curves, deposits, cancellation exposure and in-kind valuation; sponsorship tiers priced from the sponsor's own cost per outcome, benefit cost and exclusivity; selling sponsorship through target lists, funnel arithmetic, discovery, objections, Gulf budget and procurement cycles and weighted forecasts; sponsor reports, make-goods, renewal economics and multi-event packages; and ticket pricing with no-shows, overbooking, two-sided pricing, tiers and subsidies.",
  whyItMatters:
    "Suhail has no members, sponsors or events yet, and its leads are unpaid until there is revenue, so the first events must pay for themselves and must not consume cash the team does not have. Sponsorship will be most of that revenue, sold by volunteers to Gulf companies whose budgets are set months ahead. This module gives you the arithmetic to set a budget, a registration cap and a deposit gate, to price and sell packages in the sponsor's own numbers, and to earn the renewals that keep the volunteer workload manageable.",
  competencies: ["sh-events", "sh-partnerships"],
  prerequisites: [],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
