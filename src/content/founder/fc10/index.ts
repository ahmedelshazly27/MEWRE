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
  id: "fc10",
  number: 10,
  title: "AI-native founder",
  titleAr: "المؤسس المعتمد على الذكاء الاصطناعي",
  summary:
    "How a founder running several ventures uses Claude and Claude Code without losing credibility: source-grounded research with claim ledgers and citation checks; outreach and CRM with the deliverability mechanics and a hard line on LinkedIn automation; decks, financial models and specs from structured briefs with audits; internal tools built safely; verification economics and a cross-venture prompt library; and agentic workflows with their limits (compounding error, cost growth, the lethal trifecta). Concrete templates in every lesson.",
  whyItMatters:
    "You own go-to-market, fundraising, finance and operations for Afterwave, Mizan and Suhail at the same time, and AI is the only way one person covers that much ground. The same tools can invent a funding round on a competitor slide, burn a sending domain, leak a key or forward an investor list to a stranger. This module gives you the workflows, templates and checks that keep the speed and remove those failure modes, and the vocabulary to answer a customer's security reviewer when Afterwave sells agents of its own.",
  competencies: ["fc-ai"],
  prerequisites: ["m14"],
  estimatedHours: 8,
  lessons: [l01, l02, l03, l04, l05, l06],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet,
};

export default mod;
