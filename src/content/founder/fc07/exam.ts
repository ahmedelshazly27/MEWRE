import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "fc07-x1",
    type: "numeric",
    prompt: md`A EUR 60m fund with 20 % carry targets 2.5x net to LPs. The partner wants one company to be able to produce 40 % of the required gross proceeds, and expects the fund to own 8 % of it at exit. What exit value (EUR m) must that company be able to reach?`,
    answer: 862.5,
    tolerance: { rel: 0.01 },
    unit: "EUR m",
    explanation: md`Required proceeds $P = 60 + (2.5 - 1)\times 60/0.8 = 172.5$ EUR m. 40 % of that is 69 EUR m. Exit value $= 69/0.08 = 862.5$ EUR m. Fund size, net target, carry and dilution together set the bar a single company has to clear.`,
    concepts: ["fc07.fund-economics", "fc07.fund-returner"],
    difficulty: 3,
  },
  {
    id: "fc07-x2",
    type: "numeric",
    prompt: md`Before its seed, a company has YC's 7 % post-money SAFE and a USD 400k post-money SAFE at an USD 8m cap. The priced seed sells 20 % to new investors and creates a 10 % pool in the pre-money. What do the founders own after the seed (%)? Ignore the MFN SAFE.`,
    answer: 61.6,
    tolerance: { abs: 0.1 },
    unit: "%",
    explanation: md`SAFE holders before the round: $7\% + 0.4/8 = 12\%$; founders 88 %. The seed dilutes all by $1 - 0.2 - 0.1 = 0.7$: founders $88\times 0.7 = 61.6\%$.`,
    concepts: ["fc07.safe-mechanics", "fc07.option-pool-shuffle", "fc07.pre-post-money"],
    difficulty: 2,
  },
  {
    id: "fc07-x3",
    type: "numeric",
    prompt: md`Two seed offers for EUR 4m: A at EUR 16m pre with a 15 % post-money pool in the pre-money; B at EUR 14m pre with an 8 % post-money pool in the pre-money. What do founders own under the better offer (%)? (No existing pool or SAFEs.)`,
    answer: 69.8,
    tolerance: { abs: 0.1 },
    unit: "%",
    explanation: md`A: post 20, investors 20 %, pool 15 %, founders 65 % (effective pre EUR 13m). B: post 18, investors 22.2 %, pool 8 %, founders 69.8 % (effective pre $14 - 1.44 = 12.56$ EUR m). B gives founders more ownership even though its effective pre-money is lower, because less of the company goes to unallocated options; whether that is better depends on whether 8 % covers the hiring plan.`,
    concepts: ["fc07.option-pool-shuffle"],
    difficulty: 2,
  },
  {
    id: "fc07-x4",
    type: "numeric",
    prompt: md`After a seed you have EUR 2.4m and a steady net burn of EUR 120k/month. A Series A takes about 6 months from launch to cash and you want a 3-month safety buffer. By which month after today must you launch the A process at the latest?`,
    answer: 11,
    tolerance: { abs: 0.1 },
    unit: "month",
    explanation: md`Runway $= 2{,}400/120 = 20$ months. Launch by $20 - 6 - 3 = 11$ months from now. In practice start preparing (deck, data room, warm paths) two months earlier.`,
    concepts: ["fc07.startup-metrics", "fc07.round-sizing"],
    difficulty: 2,
  },
  {
    id: "fc07-x5",
    type: "numeric",
    prompt: md`Using the 2026 WBSO parameters, what is a starter's benefit (EUR) on an S&O cost base of EUR 500,000?`,
    answer: 212947,
    tolerance: { abs: 50 },
    unit: "EUR",
    explanation: md`$0.50\times 391{,}020 + 0.16\times(500{,}000 - 391{,}020) = 195{,}510 + 17{,}437 = 212{,}947$ EUR. At a EUR 20m post-money that is equivalent to about 1.1 % of the company not sold.`,
    concepts: ["fc07.non-dilutive"],
    difficulty: 2,
  },
  {
    id: "fc07-x6",
    type: "decision",
    prompt: md`Afterwave is considering moving all engineering to Zurich next year while also hoping to join YC. The Dutch BV currently employs the R&D engineers and has WBSO starter status. What is the best structuring advice to give yourself?`,
    options: [
      { text: "Model both options: a Delaware parent (for YC) with the Dutch BV keeping R&D staff on its payroll preserves WBSO and Innovatiekrediet eligibility; a Swiss move needs Swiss instruments checked first. Decide on talent, customers and investors, with the non-dilutive impact quantified.", score: 1, feedback: "Separates the holding structure from where R&D staff are employed and quantifies the non-dilutive cost of each choice." },
      { text: "Move to Zurich; non-dilutive money is small compared with a seed round.", score: 0.3, feedback: "Possibly right in the end, but it ignores EUR 100k+ per year without measuring it." },
      { text: "Stay Dutch only and decline YC if accepted, to keep WBSO.", score: 0.2, feedback: "A Delaware flip does not require giving up the Dutch R&D employer." },
    ],
    explanation: md`WBSO depends on the Dutch withholding agent employing the R&D staff, not on where the parent is incorporated. YC requires a US (Delaware), Cayman or Singapore parent. Jurisdiction choices should be made with the capital stack quantified.`,
    concepts: ["fc07.capital-stacking", "fc07.non-dilutive", "fc07.accelerator-terms"],
    difficulty: 3,
  },
  {
    id: "fc07-x7",
    type: "multi",
    prompt: "A partner says Afterwave's market slide is 'unconvincing'. Which changes address the underlying problem? (Select all that apply.)",
    options: [
      "Replace the top-down test and measurement total with accounts by segment times a defensible ACV",
      "Show the expansion path (more test organisations per OEM, more rigs, test platforms) with numbers",
      "Increase the claimed market share from 1 % to 5 %",
      "Check the result against the fund-returner bar and say what share it implies",
      "Add more analyst logos to the slide",
    ],
    answer: [0, 1, 3],
    explanation: md`Bottom-up sizing, an explicit expansion path and a check against what the fund needs make the slide an argument. Changing the share or adding logos does not.`,
    concepts: ["fc07.bottom-up-market", "fc07.fund-returner"],
    difficulty: 2,
  },
  {
    id: "fc07-x8",
    type: "numeric",
    prompt: md`An investor holds 20 % with a 1x participating preference on EUR 3m (no cap). The company sells for EUR 18m. How much more (EUR m) do the other holders receive than they would if the preference were non-participating?`,
    answer: 2.4,
    tolerance: { abs: 0.01 },
    unit: "EUR m",
    explanation: md`Participating: investor $3 + 0.2\times 15 = 6$ EUR m; others 12. Non-participating: as converted $0.2\times 18 = 3.6 > 3$, so the investor converts and takes 3.6; others 14.4. Difference $= 14.4 - 12 = 2.4$ EUR m, which equals $(1 - 0.2)\times 3$: participation costs the other holders their pro rata share of the preference amount.`,
    concepts: ["fc07.liquidation-preference"],
    difficulty: 3,
  },
  {
    id: "fc07-x9",
    type: "order",
    prompt: "Order these steps of a well-run seed process.",
    items: [
      "Map warm paths and prepare deck, data room and metrics",
      "Launch: intros land within a few days",
      "Compressed first meetings over two to three weeks",
      "Partner meetings and reference calls",
      "Compare term sheets on effective terms and sign one",
      "Confirmatory diligence, documents and closing",
    ],
    explanation: md`Preparation before launch, compressed first meetings so interest overlaps, then partner decisions, term sheets compared on effective pre-money and control, then closing within the no-shop.`,
    concepts: ["fc07.round-momentum", "fc07.closing"],
    difficulty: 1,
  },
  {
    id: "fc07-x10",
    type: "short",
    prompt: md`Write Mizan's **first-raise capital strategy** (half a page): state what kind of business Mizan is from an investor's point of view, which capital sources fit and in which order, which do not and why (use fund maths), what evidence the Shagaya pilot must produce before any priced round, and what you would put in a monthly update to the first investors. Do not invent traction or partners beyond the venture context.`,
    rubric: [
      "Characterises Mizan accurately (Gulf energy analytics, plant control and distribution; public and utility buyers; tendering) and its likely outcome range",
      "Uses fund-returner logic to explain why large VC funds are a poor first fit, without dismissing venture capital forever",
      "Orders suitable sources (paid pilot, strategic or family-office angels, regional programmes or funds, grants where eligible) with reasons and realistic timing",
      "Names concrete pilot evidence (validated soiling-loss estimates against KISR methodology, cleaning savings, operator adoption) needed before a priced round",
      "Specifies update metrics and asks appropriate to Mizan's stage",
      "No invented traction; does not name the stealth cofounder",
    ],
    modelAnswer: md`**What Mizan is to an investor:** a Gulf energy software and services company (soiling analytics, cleaning optimisation, plant control) selling to utilities, EPCs, O&M contractors and government bodies through tenders, with a distribution line for software and turnkey hardware. Sales cycles are long and public; early outcomes are more likely in the tens of millions than billions unless plant control and regional expansion scale.

**Why not large VC first:** a USD 150m fund owning 7 % at exit needs a USD 2.1bn outcome; Mizan cannot credibly show that before the pilot. A small regional fund (for example USD 40m at 10 % exit ownership needs USD 400m) is a closer fit later.

**Order:** (1) The Shagaya Phase I soiling analytics pilot with KISR as methodology partner: paid if possible, and the evidence engine. (2) Angels from Gulf energy and family offices who open doors to operators and EPCs. (3) Regional programmes and funds (UAE and Saudi funds backed by funds of funds such as SVC and Jada) once the pilot shows results, accepting likely local-presence expectations. (4) Working capital or supplier credit for distribution deals, not equity.

**Pilot evidence before a priced round:** soiling-loss estimates validated against KISR's methodology; a cleaning schedule that measurably cuts losses or cleaning cost; operator use of the tool in decisions; a reference willing to speak.

**Monthly update:** cash, net burn, runway; pilot milestones against plan; validation results to date; tender and pipeline status by buyer type; asks such as introductions to O&M contractors in Kuwait and the UAE.`,
    explanation: md`The answer integrates the module: fund maths decides fit, stage evidence decides timing, capital stacking decides order, and the update keeps early investors informed and useful.`,
    concepts: ["fc07.fund-returner", "fc07.capital-stacking", "fc07.gulf-capital", "fc07.investor-update"],
    difficulty: 3,
  },
];

export default exam;
