import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "fc08-x1",
    type: "numeric",
    prompt: md`A company with 10,000,000 fully diluted shares (all founders) takes the YC standard deal (USD 125k for 7 % on a post-money SAFE, USD 375k uncapped MFN SAFE). It then raises a seed of USD 4 m at USD 16 m pre-money, with SAFE conversions included in the pre-money and no pool change. What do the founders own after the seed? (%, 1 decimal)`,
    answer: 72.5,
    tolerance: { abs: 0.1 },
    unit: "%",
    explanation: md`MFN share of pre-money capitalization $= 375/16{,}000 = 2.344\%$. Founders before new money $= 1 - 0.07 - 0.02344 = 90.656\%$. Seed $d = 4/20 = 20\%$. Founders after: $90.656\%\times0.8 = 72.5\%$.`,
    concepts: ["fc08.post-money-safe", "fc08.dilution"],
    difficulty: 3,
  },
  {
    id: "fc08-x2",
    type: "numeric",
    prompt: md`Before a EUR 3 m round at EUR 9 m pre-money, post-money SAFE holders are entitled to 10 % of the company capitalization (which, per their SAFEs, excludes the new money and the round's pool increase). The term sheet requires a 15 % post-money pool created from zero inside the pre-money. What fully diluted percentage do the founders hold after the round? (%)`,
    answer: 54,
    tolerance: { abs: 0.2 },
    unit: "%",
    explanation: md`Investor $d = 3/12 = 25\%$, pool 15 %, so founders plus SAFEs hold 60 %. SAFEs are 10 % of (founders + SAFEs), so founders are $0.9\times60\% = 54\%$. The pool and the SAFEs both land on the founders: they would hold $0.9\times75\% = 67.5\%$ without the pool shuffle.`,
    concepts: ["fc08.option-pool-shuffle", "fc08.post-money-safe"],
    difficulty: 3,
  },
  {
    id: "fc08-x3",
    type: "numeric",
    prompt: md`Series A invested EUR 10 m (25 %) and seed EUR 3 m (15 %), both 1x non-participating and **pari passu**. The company sells for EUR 11 m. How much does the seed receive? (EUR m, 2 decimals)`,
    answer: 2.54,
    tolerance: { abs: 0.01 },
    unit: "EUR m",
    explanation: md`Total preferences EUR 13 m exceed the EUR 11 m proceeds, and converting would give each much less (25 % or 15 % of 11 m), so both take the preference. Pari passu, they share the pot in proportion to their preferences: seed $3/13\times11 = 2.54$, Series A 8.46, common 0. If the Series A were senior it would take 10 and the seed only 1.`,
    concepts: ["fc08.liquidation-preference"],
    difficulty: 2,
  },
  {
    id: "fc08-x4",
    type: "numeric",
    prompt: md`Series A invested EUR 6 m at EUR 3.00 per share (2,000,000 shares) with broad-based weighted average protection. The company has 8,000,000 fully diluted shares and raises EUR 2 m at EUR 2.00 per share. Into how many shares does the Series A now convert?`,
    answer: 2076923,
    tolerance: { rel: 0.001 },
    unit: "shares",
    explanation: md`$B = 2{,}000{,}000/3 = 666{,}667$; $C = 1{,}000{,}000$. $CP_2 = 3\times8.6667/9 = 2.8889$. Shares $= 6{,}000{,}000/2.8889 = 2{,}076{,}923$ (+76,923). Full ratchet would give 3,000,000.`,
    concepts: ["fc08.anti-dilution"],
    difficulty: 2,
  },
  {
    id: "fc08-x5",
    type: "numeric",
    prompt: md`A founder holds 4,000,000 shares on 48-month monthly vesting with a 12-month cliff and 25 % single-trigger acceleration of unvested shares. The company is acquired at month 18. How many shares are vested immediately after closing?`,
    answer: 2125000,
    tolerance: { abs: 1 },
    unit: "shares",
    explanation: md`Vested $= 4{,}000{,}000\times18/48 = 1{,}500{,}000$; unvested 2,500,000; accelerated $0.25\times2{,}500{,}000 = 625{,}000$; total 2,125,000. The acquirer will price the reduced retention into its offer.`,
    concepts: ["fc08.vesting-cliff", "fc08.acceleration"],
    difficulty: 2,
  },
  {
    id: "fc08-x6",
    type: "decision",
    prompt: md`Afterwave (a Dutch BV with founder holding BVs and three Dutch angels on a convertible loan) is accepted into YC. YC funds US (Delaware), Cayman or Singapore companies. What is the best sequence?`,
    options: [
      { text: "Sign YC's SAFEs with the Dutch BV and sort out structure later.", score: 0.1, feedback: "YC's standard SAFEs are for an eligible parent company; signing with the BV creates exactly the mismatch the flip is meant to avoid." },
      { text: "Scope the flip with Dutch tax and US counsel, get the angels' consent to convert their loan into the Delaware parent, flip 1:1, keep or license the IP from the BV as advised, then sign YC's SAFEs with the parent and file 83(b) elections where relevant.", score: 1, feedback: "Correct: structure, consents and IP first; then the instruments that depend on them." },
      { text: "Dissolve the BV and start a fresh Delaware company.", score: 0.2, feedback: "Throws away contracts, employees and IP ownership, and can itself be taxable; a flip keeps the BV as a subsidiary." },
    ],
    explanation: md`A flip is a transaction with tax, consent and IP dimensions. Investors' instruments should be signed with the entity they will own. Confirm YC's eligible jurisdictions at the time.`,
    concepts: ["fc08.delaware-flip", "fc08.83b-election"],
    difficulty: 2,
  },
  {
    id: "fc08-x7",
    type: "decision",
    prompt: md`For Mizan's Kuwaiti operations, a contact proposes a company in which a Kuwaiti friend holds 51 % on paper, with a side letter giving all profits and control to Mizan's founders. What do you do?`,
    options: [
      { text: "Accept: it is common practice.", score: 0, feedback: "Side arrangements shifting the economics away from the 51 % holder are legally risky and may be unenforceable; you would be exposed to the nominee and to the law." },
      { text: "Ask Kuwaiti counsel to assess the KDIPA licence route (up to 100 % foreign outside the negative list), a branch without a local agent where the activity allows it, and an agency or distribution agreement, and confirm the current Companies Law position before choosing.", score: 1, feedback: "Right: use the legal routes and confirm what the 2024 and later reforms actually changed." },
      { text: "Avoid Kuwait entirely.", score: 0.2, feedback: "Gives up the market without checking the legal routes that exist." },
    ],
    explanation: md`The default 51 % rule, the KDIPA route and the 2024 branch reform come from law-firm summaries; confirm them and the negative list with Kuwaiti counsel. Never build a structure on a nominee side letter.`,
    concepts: ["fc08.kuwait-ownership"],
    difficulty: 2,
  },
  {
    id: "fc08-x8",
    type: "multi",
    prompt: "Which of these would a seed investor's lawyer typically flag as a problem in diligence? (Select all.)",
    options: [
      "A cofounder still employed elsewhere whose employment contract claims IP made outside working hours, with no waiver",
      "Founders' shares subject to 4-year vesting with a 1-year cliff",
      "Code written by a freelancer under a contract with no IP assignment",
      "A pilot contract assigning all IP 'created in connection with the services' to the customer",
      "A STAK holding employees' shares",
      "An email promising an advisor 1 % that is not on the cap table",
    ],
    answer: [0, 2, 3, 5],
    explanation: md`Vesting and a STAK are signs of good hygiene. IP gaps (employer claims, unassigned contractor work, customer IP grabs) and unrecorded equity promises are the classic diligence findings.`,
    concepts: ["fc08.ip-assignment", "fc08.cap-table", "fc08.pilot-contract"],
    difficulty: 2,
  },
  {
    id: "fc08-x9",
    type: "mcq",
    prompt: "Two seed term sheets raise EUR 3 m: A at EUR 10 m pre, 1x non-participating; B at EUR 12 m pre, 1x participating uncapped. Ignoring the pool, for which exits does A leave more for the existing holders?",
    options: ["All exits", "Exits below about EUR 78 m", "Exits above about EUR 78 m", "Only exits below EUR 13 m"],
    answer: 1,
    explanation: md`Above the A investor's conversion point (EUR 13 m) A leaves $0.769E$; B leaves $0.8(E-3)$. They are equal at $E = 2.4/0.0308 \approx 78$. Below 13 m A's preference binds and A still leaves more (e.g. 7.0 vs 5.6 at EUR 10 m).`,
    concepts: ["fc08.participation", "fc08.liquidation-preference"],
    difficulty: 3,
  },
  {
    id: "fc08-x10",
    type: "order",
    prompt: "Order these steps for setting up a new Dutch venture so it is investable.",
    items: [
      "Agree founder split, vesting and leaver terms in a founders' term sheet",
      "Set up personal holding BVs",
      "Incorporate the operating BV by notarial deed and issue founder shares",
      "Sign IP assignments from every founder and contractor",
      "Create the option pool or STAK and start the cap table and register",
    ],
    explanation: md`Terms first, holdings before shares are issued (to avoid a taxable transfer later), then incorporation, then IP into the company that now exists, then the equity infrastructure for employees and investors.`,
    concepts: ["fc08.nl-entities", "fc08.vesting-cliff", "fc08.ip-assignment"],
    difficulty: 2,
  },
  {
    id: "fc08-x11",
    type: "short",
    prompt: md`Write the **legal and equity readiness checklist** you would complete before opening Afterwave's seed data room (illustrative). Group it into cap table, founder equity, entity, IP and customer contracts, and for each group name the document that proves it and one number or fact you must be able to state from memory.`,
    rubric: [
      "Cap table group: fully diluted table reconciled to the register and deeds, with all SAFEs and promises; states the founders' fully diluted %",
      "Founder equity group: vesting and leaver terms signed, 83(b) where relevant; states vesting start and schedule",
      "Entity group: structure chart (holding BVs, operating BV, STAK or Delaware parent) and any flip plan",
      "IP group: assignments from every founder, employee and contractor, and employer waivers where needed",
      "Customer contracts group: pilot agreements with IP, data and liability terms summarised; states the liability cap and data/training position",
    ],
    modelAnswer: md`**Cap table:** master FD table reconciled share for share to the shareholders' register and notarial deeds; SAFE and loan ledger; no unrecorded promises. *Know:* founders 72 % FD post-SAFE (illustrative), pool 8 %.

**Founder equity:** signed founders' agreement, shareholders' agreement with leaver clauses, vesting schedules; 83(b) copies if a US parent exists. *Know:* 48 months monthly, 12-month cliff, vesting start dates per founder.

**Entity:** structure chart: three holding BVs, Afterwave BV, STAK; articles; KVK extract; flip plan if YC or a US lead is in play. *Know:* which entity investors buy into.

**IP:** IP assignment deeds from each founder (including pre-incorporation work), employment contracts, contractor agreements with assignment, employer waiver for any cofounder still employed elsewhere. *Know:* that every contributor is covered, by name.

**Customer contracts:** each pilot's agreement with a one-line summary of scope, fee, IP, data and training rights, liability cap and SLA. *Know:* the largest liability exposure (e.g. 1x fees, 3x super-cap for data) and which customers allow aggregated learning.`,
    explanation: md`Diligence goes faster when each claim in the deck has a document behind it and the founder can state the key numbers without looking them up.`,
    concepts: ["fc08.cap-table", "fc08.ip-assignment", "fc08.pilot-contract", "fc08.vesting-cliff"],
    difficulty: 2,
  },
];

export default exam;
