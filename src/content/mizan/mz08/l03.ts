import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz08-l03",
  title: "Chinese integrators and turnkey supply: tiers, warranties, due diligence, fire and desert",
  summary:
    "How to tell a bankable integrator from a container assembler, what a BESS warranty and LTSA really promise and exclude, the due-diligence questions to ask before you attach Mizan's name, the fire-safety evidence a Gulf buyer will demand, and how 50 °C ambient changes PCS counts and auxiliary energy.",
  minutes: 55,
  objectives: [
    "You can sort BESS suppliers into tiers and say what each tier means for warranty strength and bankability",
    "You can read a capacity warranty and find the throughput cap and the operating conditions that void it",
    "You can run a due-diligence call with an integrator using a fixed question list",
    "You can recompute PCS units and auxiliary energy at 50 °C and show a buyer the effect",
  ],
  concepts: [
    {
      id: "mz08.integrator-tiers",
      name: "Supplier tiers",
      description:
        "Vertically integrated cell makers with own systems; large integrators and inverter makers buying cells; smaller assemblers integrating bought cells and PCS. Warranty value tracks the balance sheet and the control of the cell.",
      competency: "mz-grid",
      related: ["m05.supply-chain", "mz08.value-chain"],
    },
    {
      id: "mz08.warranty-structure",
      name: "Warranty and LTSA structure",
      description:
        "Product warranty (defects, 2 to 5 years); capacity-retention warranty bounded by years and throughput with operating-condition exclusions; LTSA capacity and availability guarantees with capped liquidated damages; security (bonds, parent guarantee).",
      competency: "mz-grid",
      related: ["m05.warranty", "m05.ltsa-guarantee", "m09.bess-ltsa"],
    },
    {
      id: "mz08.integrator-dd",
      name: "Integrator due diligence",
      description:
        "References at scale in hot climates, cell traceability and change-of-cell clauses, certifications and fire test reports, financial strength and local service, data access for warranty claims.",
      competency: "mz-business",
      related: ["mz08.integrator-tiers", "m05.supply-chain"],
    },
    {
      id: "mz08.fire-evidence",
      name: "Fire-safety evidence pack",
      description:
        "UL 9540 listing, UL 9540A propagation test reports (cell, module, unit and ideally large-scale), NFPA 855 compliance, gas detection and explosion control, emergency response plan agreed with the fire authority.",
      competency: "mz-grid",
      related: ["m05.bess-codes", "m05.thermal-runaway", "m05.explosion-control"],
    },
    {
      id: "mz08.desert-derating",
      name: "Desert derating and auxiliaries",
      description:
        "PCS derate above about 40 to 45 °C, so more units are needed at 50 °C; chillers run all day, so auxiliaries take several percent of throughput; dust loads filters and condenser coils.",
      competency: "mz-grid",
      related: ["m05.desert-hvac", "m04.high-temp-derating"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Who supplies what, and what their promises are worth",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`If Mizan represents or services an integrator in Kuwait, every failure of that integrator's product carries Mizan's name in front of MEWRE and KISR, the same people whose trust the soiling pilot needs. Choosing whom to stand next to is a product decision, not just a commercial one. The test is simple: would you be comfortable defending this warranty and this fire test report in front of a ministry engineer?`,
        },
        {
          kind: "xref",
          to: "m05-l05",
          note: "Track 0 m05-l05 covers thermal runaway, the code stack (NFPA 855, UL 9540, UL 9540A, IEC 62933), suppression strategies, desert HVAC and FAT/SAT in depth. This lesson only gives what a seller must check.",
        },
        {
          kind: "md",
          md: md`## Supplier tiers

| Tier | Who | Controls the cell? | Warranty strength | Typical risk |
|---|---|---|---|---|
| **A: vertically integrated** | Large LFP cell makers selling their own DC blocks | Yes | Strong: backed by the cell maker's balance sheet | Less flexible on PCS, EMS and local terms |
| **B: large integrators** | Inverter makers and major integrators buying cells from tier A makers | No, but long-term supply deals | Good if back-to-back with the cell maker | Cell substitution between projects; warranty gaps between cell and system |
| **C: assemblers** | Smaller firms integrating bought cells, PCS and HVAC | No | Weak: warranty only as good as a small company | Insolvency within the warranty term, unclear cell origin |

Most utility BESS sold in the Gulf today uses Chinese LFP cells, whoever the brand on the container is. The product is converging on **liquid-cooled 20-ft DC blocks of about 5 to 6+ MWh** built from 280 to 314 Ah prismatic cells (and newer 500+ Ah cells), at up to 1,500 V DC (Track 0 m05-l01).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Tier placement of named companies",
          md: md`Which named companies sit in which tier, and their current product specifications, change every year. Research firms publish bankability lists for storage suppliers; check the current edition and the integrator's own datasheets and test reports rather than relying on this lesson or on marketing.`,
        },
        {
          kind: "md",
          md: md`## What a warranty actually promises

A BESS supply package usually carries four promises. Read each for its **cap** and its **conditions**.

1. **Product warranty** (defects in materials and workmanship): 2 to 5 years. Repair or replace.
2. **Capacity-retention warranty**: for example "at least 70 % of BOL capacity after 20 years or 7,300 equivalent full cycles, whichever comes first". The throughput cap is the real limit.
3. **LTSA guarantees** (if bought): POI capacity every year (the supplier augments to meet it), availability (for example 97 to 98 %), and RTE at the annual test, each with liquidated damages capped at a share of the annual fee or contract price.
4. **Security**: performance bond, warranty bond, parent company guarantee.

**Conditions that void or reduce the capacity warranty:** average cell temperature above a limit (often around 25 to 30 °C), C-rate above the contracted value, long rests at high SoC, more cycles than the cap, operation outside the BMS limits, missing or incomplete operating data, and maintenance by non-authorised parties.`,
        },
        { kind: "equation", formula: "mz08-warranty-life" },
        {
          kind: "md",
          md: md`## Desert derating in two numbers

**PCS:** most units hold rated MVA up to about 40 to 45 °C and then derate. At Kuwait's 50 °C design ambient you need more units than the headline rating suggests.`,
        },
        { kind: "equation", formula: "mz08-pcs-derating" },
        {
          kind: "md",
          md: md`**Auxiliaries:** to hold cells near 25 °C when the air is 50 °C and the sun heats the container, the chillers run all day, charging or not.`,
        },
        { kind: "equation", formula: "mz08-aux-share" },
        {
          kind: "chart",
          chart: "line",
          title: "Illustrative PCS derating curve (4.4 MVA unit, 1.5 %/°C above 40 °C)",
          xKey: "t",
          xLabel: "Ambient (°C)",
          yLabel: "Available MVA",
          series: [{ key: "mva", label: "Available apparent power" }],
          data: [
            { t: "30", mva: 4.4 },
            { t: "35", mva: 4.4 },
            { t: "40", mva: 4.4 },
            { t: "45", mva: 4.07 },
            { t: "50", mva: 3.74 },
            { t: "55", mva: 3.41 },
          ],
          caption: "Illustrative straight-line derating. Real datasheet curves are often stepped; use the curve the vendor certifies.",
        },
        { kind: "sources", refs: ["mz08-r6", "mz08-r7", "mz08-r8"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "What 50 °C and a warranty cap do to a bid",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "PCS count and auxiliaries for the 100 MW / 300 MWh plant",
          given: md`Lesson 1 plant: about 109 MVA of PCS needed at the POI requirement, 75 containers of 5 MWh, 300 MWh delivered a day. Illustrative PCS unit: 4.4 MVA up to 40 °C, derating 1.5 %/°C above. Illustrative average auxiliary load in summer: 12 kW per container over 24 h.`,
          steps: [
            { md: md`**Units at headline rating:** $109/4.4 = 24.8$, so 25 units. This is what a careless quote shows.` },
            { md: md`**Available MVA per unit at 50 °C:** $4.4 \times [1 - 0.015 \times (50 - 40)] = 4.4 \times 0.85 = 3.74$ MVA.` },
            { md: md`**Units at 50 °C:** $109/3.74 = 29.1$, so **30 units**: five more than the headline count, 20 % more PCS.` },
            { md: md`**Average auxiliary load:** $75 \times 12 = 900$ kW $= 0.9$ MW.` },
            { md: md`**Daily auxiliary energy:** $0.9 \times 24 = 21.6$ MWh, a share $a = 21.6/300 = 7.2\%$ of the energy delivered.` },
          ],
          result: md`A bid priced on 25 PCS units and a DC round trip without auxiliaries will not deliver 100 MW at 50 °C and will consume about 7 % more energy than it admits. Comparing bids on the same boundary (POI, 50 °C, auxiliaries in) removes this advantage from the careless bidder.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "How long does the warranty really last?",
          given: md`Capacity warranty: 70 % retention for 20 years or 7,300 EFC, whichever comes first. The buyer plans one evening cycle a day plus frequency response worth 0.2 EFC a day.`,
          steps: [
            { md: md`Cycles per year: $1.2 \times 365 = 438$ EFC.` },
            {
              md: md`Years to the throughput cap: $7{,}300/438 = 16.7$ years, so $n_w = \min(20, 16.7) = 16.7$ years.`,
              hidden: true,
              check: { prompt: "Years the capacity warranty covers", answer: 16.67, unit: "years", tolerance: { rel: 0.01 } },
            },
            {
              md: md`EFC cap needed for full 20-year cover at this dispatch: $438 \times 20 = 8{,}760$ EFC.`,
              hidden: true,
              check: { prompt: "EFC cap needed for 20 years", answer: 8760, unit: "EFC", tolerance: { rel: 0.01 } },
            },
          ],
          result: md`The "20-year" warranty covers under 17 years for this dispatch. Ask for an 8,760 EFC cap, price the uncovered years, or limit stacked services.`,
        },
        {
          kind: "question",
          question: {
            id: "mz08-l03-p1",
            type: "numeric",
            prompt: md`A PCS unit is rated 3.6 MVA up to 45 °C and derates 2 %/°C above that. How many units are needed for 220 MVA at 50 °C? (Round up.)`,
            answer: 68,
            tolerance: { abs: 0 },
            unit: "units",
            explanation: md`$3.6 \times [1 - 0.02 \times 5] = 3.24$ MVA. $220/3.24 = 67.9$, so 68 units (at 3.6 MVA it would be 62).`,
            concepts: ["mz08.desert-derating"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Due diligence before you attach Mizan's name",
      blocks: [
        {
          kind: "ask",
          title: "Integrator due-diligence call: the questions",
          items: [
            "Which cell maker and cell model, from which factory? Will you commit to that cell in the contract, with a change-of-cell clause requiring buyer approval?",
            "Show three operating references above 100 MWh, at least one in a hot desert climate, with contacts we may call and operating years.",
            "Provide the UL 9540 listing and the UL 9540A reports at cell, module and unit level for this exact product, and any large-scale fire test showing no propagation to adjacent units.",
            "What is the capacity warranty: retention, years, EFC cap, temperature and C-rate conditions, data obligations? Is it back-to-back with the cell maker?",
            "What PCS derating curve, HVAC design ambient and N+1 redundancy apply at 50 °C, and what is the RTE at the POI with auxiliaries at that ambient?",
            "Who provides LTSA, augmentation and spares in Kuwait, with what response times, and what does the owner get if you leave the market?",
            "What data (cell-level voltages and temperatures, BMS logs) does the owner get, in what format, and can a third party analyse it without voiding the warranty?",
            "Financials: audited accounts, parent company guarantee, bonding capacity.",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong with low-price turnkey bids",
          md: md`1. **Cell substitution** after award: the bid names a tier A cell, the delivery uses another. 2. **Fire tests on a different product** (older container, different cell). 3. **Warranty conditions that the climate breaks**: an average cell temperature limit the HVAC cannot hold in August. 4. **No local service**: a 72-hour flight for each fault at summer peak. 5. **Closed data**: the owner cannot verify capacity fade or prove a warranty claim. 6. **Thin company**: the warranty outlives the warrantor.`,
        },
        {
          kind: "md",
          md: md`**Fire-safety evidence a Gulf buyer will ask for** (Track 0 m05-l05 for detail): UL 9540 system listing; UL 9540A reports at cell, module and unit level and, increasingly, large-scale fire test results; NFPA 855 compliance for spacing, explosion control and detection; gas detection with exhaust ventilation or deflagration venting; and a site emergency response plan agreed with the local fire authority. A supplier who cannot produce these for the exact product offered is not a supplier Mizan should represent.

**Desert-specific checks:** HVAC sized N+1 at 50 to 55 °C with solar gain; sand-trap louvres and filters with a cleaning interval in the O&M plan; condenser coils that will foul with dust (the same dust Mizan studies on PV); PCS curve at 50 °C; storage and shipping of containers at low SoC through summer ports.`,
        },
        { kind: "scenario", scenario: "mz08-s1" },
        {
          kind: "question",
          question: {
            id: "mz08-l03-p2",
            type: "short",
            prompt: md`You have finished a due-diligence call with an integrator that wants Mizan as its Kuwait partner. Write the half-page go / no-go note to your cofounder Omar Abu Harb, with the evidence you still need. Use illustrative findings.`,
            rubric: [
              "Classifies the supplier by tier and states what that means for warranty strength",
              "Checks the capacity warranty cap against the expected dispatch and flags temperature and data conditions",
              "Checks fire-safety evidence for the exact product (UL 9540, UL 9540A levels, NFPA 855) and desert design (PCS at 50 °C, HVAC N+1, auxiliaries at POI)",
              "Considers reputational risk to Mizan's core soiling business and the relationship with MEWRE and KISR",
              "Gives a clear recommendation with conditions and a dated list of missing evidence",
            ],
            modelAnswer: md`**Integrator X: go with conditions (illustrative).** X is a tier B integrator: it makes its own PCS and buys cells from a tier A maker under a multi-year supply deal; the cell model is named in the offer, and X accepts a change-of-cell clause requiring buyer approval. Capacity warranty: 70 % at 20 years or 7,300 EFC, back-to-back with the cell maker, average cell temperature limit 28 °C, full BMS data to the owner. At one cycle a day plus some frequency response (about 1.2 EFC/day) the cap covers only about 16.7 years: we should push for 8,760 EFC or price the gap. Fire: UL 9540 listing and UL 9540A cell, module and unit reports provided for the offered container; no large-scale fire test yet. Desert: PCS derates from 45 °C and their own count uses the 50 °C value; HVAC N+1 at 52 °C; RTE at the POI with auxiliaries 85.5 % at 45 °C, not yet at 50 °C. Three Gulf references, one with two summers of operation. Reputation: acceptable if the missing items arrive; a fire or a capacity shortfall would hurt us with MEWRE and KISR, so we sign only a non-exclusive service and integration agreement first. **Missing by [date + 3 weeks]:** a large-scale fire test or a plan for one, RTE at 50 °C, a reference call with the desert site, audited accounts and a parent guarantee. **Recommendation:** proceed to an NDA and a non-exclusive term sheet; no exclusivity or public announcement until the evidence is in.`,
            explanation: md`A strong note ties every finding to a risk, keeps Mizan's core business in view and makes the decision conditional on dated evidence.`,
            concepts: ["mz08.integrator-dd", "mz08.warranty-structure", "mz08.fire-evidence"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz08-l03-q1",
      type: "mcq",
      prompt: md`Why is a tier C assembler's 20-year capacity warranty weaker than a tier A cell maker's, even if the wording is identical?`,
      options: [
        "Tier C cells are always worse",
        "The warranty is only as good as the warrantor's balance sheet and its control of the cell over 20 years",
        "Tier C warranties are illegal in Kuwait",
        "Tier A warranties have no conditions",
      ],
      answer: 1,
      explanation: md`A warranty is a promise to pay later. A small company that does not make the cell may not exist, or may not be able to replace that cell, in year 12.`,
      concepts: ["mz08.integrator-tiers", "mz08.warranty-structure"],
      difficulty: 1,
    },
    {
      id: "mz08-l03-q2",
      type: "numeric",
      prompt: md`A warranty covers 15 years or 6,000 EFC. Planned dispatch is 1.1 EFC a day. How many years does it actually cover?`,
      answer: 14.94,
      tolerance: { rel: 0.01 },
      unit: "years",
      explanation: md`$6{,}000/(1.1 \times 365) = 6{,}000/401.5 = 14.9$ years, just under the 15-year term.`,
      concepts: ["mz08.warranty-structure"],
      difficulty: 2,
    },
    {
      id: "mz08-l03-q3",
      type: "multi",
      prompt: md`Which conditions commonly reduce or void a BESS capacity warranty? (Select all.)`,
      options: [
        "Average cell temperature above the contracted limit",
        "Exceeding the EFC throughput cap",
        "Operating at the contracted C-rate",
        "Missing operating data",
        "Maintenance by non-authorised parties",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Operating within the contracted C-rate is compliant. The others are standard exclusions.`,
      concepts: ["mz08.warranty-structure"],
      difficulty: 2,
    },
    {
      id: "mz08-l03-q4",
      type: "numeric",
      prompt: md`Average auxiliary load is 1.2 MW over 24 h and the plant delivers 400 MWh a day. What is the auxiliary share in %?`,
      answer: 7.2,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$1.2 \times 24 = 28.8$ MWh; $28.8/400 = 7.2\%$.`,
      concepts: ["mz08.desert-derating"],
      difficulty: 1,
    },
    {
      id: "mz08-l03-q5",
      type: "mcq",
      prompt: md`An integrator provides UL 9540A reports, but for an older container with a different cell. What do you conclude?`,
      options: [
        "Sufficient; the test method is the same",
        "Not sufficient: propagation behaviour depends on the cell and the unit design; ask for reports on the exact product offered",
        "UL 9540A does not matter in the Gulf",
        "Only the cell-level report matters",
      ],
      answer: 1,
      explanation: md`Fire-propagation evidence is product-specific. A different cell or enclosure can behave very differently.`,
      concepts: ["mz08.fire-evidence"],
      difficulty: 2,
    },
    {
      id: "mz08-l03-q6",
      type: "decision",
      prompt: md`A tier C assembler offers Mizan exclusive Kuwait rights and a 6 % commission. It has no desert references and no unit-level fire test. What do you do?`,
      options: [
        { text: "Sign: exclusivity and commission are attractive", score: 0, feedback: "Mizan's name would stand behind unproven fire and desert performance." },
        { text: "Decline for now; tell them what evidence would reopen the conversation and keep talking to tier A and B suppliers", score: 1, feedback: "Protects Mizan's reputation and leaves a door open on clear terms." },
        { text: "Sign non-exclusively and hope a bid comes", score: 0.3, feedback: "Even a non-exclusive tie puts Mizan's name next to the product." },
        { text: "Ask for a higher commission to cover the risk", score: 0, feedback: "Money does not fix a fire risk or a reputational one." },
      ],
      explanation: md`Choose suppliers you can defend in front of MEWRE and KISR.`,
      concepts: ["mz08.integrator-dd", "mz08.integrator-tiers"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz08-l03-f1", front: "Three supplier tiers", back: "A: cell maker with own systems; B: integrator buying cells; C: assembler. Warranty strength falls from A to C.", concepts: ["mz08.integrator-tiers"] },
    { id: "mz08-l03-f2", front: "Four promises in a BESS supply package", back: "Product warranty; capacity-retention warranty (years or EFC); LTSA capacity, availability and RTE guarantees; security (bonds, parent guarantee)", concepts: ["mz08.warranty-structure"] },
    { id: "mz08-l03-f3", front: "Real life of a 20-year / 7,300 EFC warranty at 1.2 EFC/day", back: "About 16.7 years", concepts: ["mz08.warranty-structure"] },
    { id: "mz08-l03-f4", front: "Fire-safety evidence pack", back: "UL 9540 listing, UL 9540A at cell, module, unit (and large-scale) level for the exact product, NFPA 855 compliance, gas detection and explosion control, emergency response plan", concepts: ["mz08.fire-evidence"] },
    { id: "mz08-l03-f5", front: "PCS units at 50 °C vs headline (illustrative)", back: "4.4 MVA derating 1.5 %/°C above 40 °C gives 3.74 MVA: 30 units instead of 25 for 109 MVA", concepts: ["mz08.desert-derating"] },
    { id: "mz08-l03-f6", front: "The first due-diligence question", back: "Which cell, from which factory, and will you commit to it with a change-of-cell clause?", concepts: ["mz08.integrator-dd"] },
  ],
  scenarios: [
    {
      id: "mz08-s1",
      title: "The cheapest bid in the room",
      context: md`An EPC bidding an illustrative 100 MW / 400 MWh Gulf BESS has asked Mizan to recommend a battery supplier, as its local technical partner. Two integrators are left. Integrator P (tier B) is 14 % more expensive per kWh DC. Integrator Q (tier C) is cheapest.`,
      start: "a",
      concepts: ["mz08.integrator-dd", "mz08.desert-derating", "mz08.warranty-structure"],
      nodes: {
        a: {
          md: md`The EPC's commercial manager says: "Q is 14 % cheaper. Unless you give me a reason, we go with Q."`,
          choices: [
            { text: "Ask for one hour to normalise both bids to the POI at 50 °C with auxiliaries, and compare warranty caps and fire evidence", next: "b", score: 10, feedback: "Turns the argument from price per DC kWh into cost per delivered MWh and risk." },
            { text: "Say Q is a small company and should not be trusted", next: "c", score: 3, feedback: "Probably true but not evidence. The commercial manager needs numbers." },
            { text: "Agree: price wins tenders", next: "c", score: 1, feedback: "Price per DC kWh is the wrong comparison, and Mizan's reputation rides on the choice." },
          ],
        },
        b: {
          md: md`Your normalisation shows Q priced 25 PCS units at headline rating (30 needed at 50 °C), quoted DC RTE without auxiliaries, and has a 6,000 EFC cap. Corrected, Q is 3 % cheaper than P per POI MWh delivered over 15 years, with no unit-level fire test.`,
          choices: [
            { text: "Recommend P, presenting the normalised table and the fire-evidence gap, and offer Q a path to requalify", score: 10, feedback: "A 3 % saving does not pay for missing fire evidence and a short warranty." },
            { text: "Recommend Q because it is still cheaper", score: 3, feedback: "The EPC would carry fire and warranty risk for 3 %." },
            { text: "Leave the choice to the EPC without a recommendation", score: 5, feedback: "Safe for Mizan short term, but the EPC asked for your judgement." },
          ],
        },
        c: {
          md: md`The EPC selects Q. Two months later the owner's engineer asks for UL 9540A unit-level reports and the PCS count at 50 °C.`,
          choices: [
            { text: "Help the EPC request the evidence from Q and recompute the PCS count; propose P as the fallback", score: 6, feedback: "Recovers some ground, but the problem should have been caught earlier." },
            { text: "Stay out of it", score: 1, feedback: "Mizan's name is already attached as the local technical partner." },
          ],
        },
      },
    },
  ],
};

export default lesson;
