import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "fc11",
  number: 11,
  title: "Capstone: seed round package",
  titleAr: "المشروع الختامي: حزمة جولة التمويل التأسيسية",
  summary:
    "Build a complete seed round package for one of your ventures (Afterwave, Mizan or Suhail): a driver-based financial model, a deck narrative, a cap table and round design, an investor list with an outreach plan and a data room index, all telling one consistent story. A fully worked package for a fictional company sets the standard; investor Q&A decision trees, a pitch check and an integrative exam test the defence.",
  whyItMatters:
    "You own fundraising in every venture you run, and the next serious investor conversation for Afterwave will ask for a model, a deck, a cap table and a data room within days. Founders who arrive with all five artifacts reconciled raise faster and on better terms, and answer the hard questions (competition, commitment across ventures, why now) from decisions already taken rather than improvising. Building the package once, properly, turns every later raise into an update.",
  competencies: ["fc-fundraising"],
  prerequisites: ["fc06", "fc07", "fc08"],
  estimatedHours: 6,
  lessons: [l01, l02, l03],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# Seed round package: capstone cheat sheet

## The five artifacts

| Artifact | Answers | Bar |
|---|---|---|
| Financial model | How much, what for, when do you run out? | Driver-based, monthly 24 months, assumptions sourced, raise derived |
| Deck narrative | Why big, why now, why you, why believe it? | 10 to 14 slides, one claim and one proof each, ask = round thesis |
| Cap table and round design | What do I get, what will the A look like? | Fully diluted before and after, SAFEs converted, pool from hiring plan |
| Investor list and outreach | Will this close in 8 to 10 weeks? | 50 to 100 qualified names, tiered, funnel gives 2 or more term sheets |
| Data room index | Can I verify it in a week? | A document behind every claim; IP and founders' agreement signed |

## Rules of the package

- **One story:** ask = model raise = cap table new money; hiring plan = pool = use of funds; milestone = model month.
- **Round thesis:** EUR X buys milestone Y in Z months on instrument W.
- **Milestone:** verifiable evidence for the next round, not an activity.
- **Honesty:** never present pilots, LOIs or conversations as revenue; label every estimate "illustrative".
- **Money fits model:** VC only for a business that can return a fund.

## Key formulas

| Quantity | Formula | Where |
|---|---|---|
| Raise size | $R = \bar B \cdot M (1+b) - C_0$ | Model, lesson 1 |
| Runway | $T = C / \bar B$ | Model, lesson 1 |
| Post-money | $V_{\text{post}} = V_{\text{pre}} + I$ | Cap table |
| Investor stake | $s = I / V_{\text{post}}$ | Cap table |
| Price per share | $p = V_{\text{pre}} / N_{\text{pre}}$ | Priced round |
| Post-money SAFE stake | $s = I_{\text{SAFE}} / V_{\text{cap,post}}$ | SAFE conversion |
| Dilution | $f' = f (1 - s_{\text{inv}} - s_{\text{pool}})$ | Every round |
| Effective pre-money | $V_{\text{pre}} - s_{\text{pool}} V_{\text{post}}$ | Pool shuffle |
| Burn multiple | net burn / net new ARR | Model summary |
| LTV, payback | $\text{ACV}\, g / c$; $\text{CAC} / (\text{ACV}\, g / 12)$ | Unit economics |
| Bottom-up SAM | $N_{\text{accounts}} \times \text{ACV}$ | Market slide |
| Investor funnel | $N_0 = \text{TS} / \prod r_k$ | Outreach plan |
| Fund-returner | $V_{\text{exit}} = F / s_{\text{exit}}$ | Market and competition answers |

## Benchmarks (market practice, not rules)

| Metric | Typical seed bar |
|---|---|
| Runway after round | 18 to 24 months |
| Dilution at seed | 15 to 25 % |
| Founders after seed | well above 50 % |
| Burn multiple | below 1 excellent, 1 to 2 good, above 3 explain |
| LTV/CAC | above 3 (cap lifetime at 5 to 7 years) |
| CAC payback | under 12 months SMB, under about 24 enterprise |
| Term sheets to aim for | at least 2 |

## Worked numbers (fictional Coldline)

- **Raise:** $115 \times 18 \times 1.25 - 300 = 2{,}288$ k EUR, rounded to EUR 2.5 m; runway 24 months.
- **SAFE:** EUR 500k at EUR 5 m cap = 10 % before new money; converts at EUR 0.45/share.
- **Seed:** EUR 2.5 m at EUR 10 m pre, 10 % pool in pre: price EUR 0.7875, founders 56.7 %, effective pre EUR 8.75 m.
- **Funnel:** $2 / (0.35 \times 0.30 \times 0.25) = 76$ names, build 80.
- **Fund-returner:** EUR 80 m fund, 20 % diluted to 12 %, needs a EUR 667 m exit.

## Process

1. **Week 0:** package reconciled, light data room ready, intro requests sent.
2. **Week 1:** B-tier first meetings.
3. **Weeks 2 to 3:** A-tier first meetings.
4. **Weeks 3 to 5:** partner meetings.
5. **Weeks 5 to 7:** term sheets, choose lead.
6. **Weeks 7 to 12:** diligence and closing.
- **No partner meetings by week 4:** stop, debrief, fix, restart; do not drip.

## Data room folders

- **1 Corporate:** articles, registry, resolutions, founders' agreement.
- **2 Cap table:** fully diluted table, SAFEs or loans, option plan, vesting.
- **3 Financials:** model, bank statements, management accounts.
- **4 Commercial:** contracts, pilots with success criteria, pipeline, references.
- **5 Product and security:** architecture, roadmap, security pack, demo.
- **6 Team:** bios, org chart, agreements, hiring plan.
- **7 IP and legal:** assignments from everyone, licences, DPAs, disputes.
- **8 Market:** bottom-up workbook, dated competitor table.

## The defence

- **Name the risk first:** market, product, team, GTM, financing.
- **Answer, evidence, implication, stop.**
- **Do not know:** say so, how you will find out, by when.
- **Competition:** real alternatives incl. in-house and doing nothing; the winning axis; what would prove you wrong.
- **Commitment across ventures:** decided and documented before the meeting: full-time CEO of the funded company, leads and time caps for the others, conflicts rule, IP separation.
- **Why now:** two or more dated, independent drivers.
- **Never:** "no competition", bluffing, disparaging competitors, over-answering.`,
};

export default mod;
