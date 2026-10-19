import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m00-l03",
  title: "Tariffs, Subsidies and the Economics of Renewables in Kuwait",
  summary:
    "Why a 2 fils/kWh residential tariff against a cost of supply several times higher makes every solar kWh a fiscal saving, how to value displaced crude and LNG, and how to frame a renewable business case for the Ministry of Finance rather than for a climate audience.",
  minutes: 70,
  objectives: [
    "You can state Kuwait's electricity tariff structure by customer class and its legal history, flagging what is unverified.",
    "You can compute the unit subsidy and the fiscal subsidy for a given cost of supply and consumption.",
    "You can value the fuel a solar kWh displaces (crude or LNG) in USD/kWh and fils/kWh, and compare it with a plausible solar tariff.",
    "You can distinguish financial transfers inside the state (e.g. KPC's 25 fils/kWh) from true economic savings (fuel not burned, exports gained).",
  ],
  concepts: [
    { id: "m00.tariff-structure", name: "Kuwait electricity tariff structure", description: "2 fils/kWh for citizens' private housing since 1966; post-2016 law rates for apartments, commercial (5 fils) and industrial/agricultural (3 fils); KPC pays ~25 fils.", competency: "finance", related: ["m00.subsidy-burden", "m10.gulf-tariffs"] },
    { id: "m00.subsidy-burden", name: "Subsidy and fiscal burden", description: "The gap between cost of supply (estimates 14–38 fils/kWh) and the tariff, multiplied by consumption, paid from the state budget.", competency: "finance", related: ["m00.displaced-fuel-value"] },
    { id: "m00.displaced-fuel-value", name: "Value of displaced fuel", description: "Heat rate × fuel price: what a renewable kWh saves by not burning crude, fuel oil, gasoil or LNG at the margin.", competency: "finance", related: ["m00.subsidy-burden", "m01.fuel-displacement", "m10.lcoe"] },
    { id: "m00.economic-vs-financial", name: "Economic vs financial value", description: "Intra-state payments (tariffs, KPC transfer price) move money between public pockets; economic value is fuel saved, exports enabled, imports avoided and reliability gained.", competency: "finance", related: ["m00.displaced-fuel-value", "m00.tariff-structure", "m10.npv", "m10.evaluation-discount-rate"] },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "What Kuwaitis pay, and what electricity costs",
      blocks: [
        {
          kind: "md",
          md: md`## The tariff ladder

| Customer | Tariff | Status / source |
|---|---|---|
| Kuwaiti citizens, private housing | **2 fils/kWh** (≈0.7 US cents) | Baseline since **1966** (Baker Institute); exempted from the 2016 increases |
| Apartment buildings (mainly expatriates) | 5 / 10 / 15 fils/kWh for 0–1,000 / 1,000–2,000 / >2,000 kWh per month | 2016 law; applied from **22 August 2017**; a later report says apartments were capped at 5 fils — unconfirmed |
| Commercial | **5 fils/kWh** (instead of the proposed 25) | Scaled back after the 2016 law |
| Industrial and agricultural | **3 fils/kWh** | Scaled back after the 2016 law |
| KPC (oil sector) | **~25 fils/kWh**; KPC uses ~1.7 GW of ~17 GW supply | SolarQuarter, January 2026 |

Note the unit: **1 KWD = 1,000 fils**. We assume **1 KWD ≈ 3.25 USD** throughout this module, so 1 fils ≈ 0.325 US cents.`,
        },
        { kind: "sources", refs: ["m00-baker-tariff", "m00-kt-2016-tariff", "m00-kt-tariff-reduced", "m00-kt-2017-tariff", "m00-sq-2026-01-kpc"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Tariff law number and current schedule",
          md: md`**Claimed:** the 2016 tariff law is often cited as **Law No. 20 of 2016**. **Unknown:** that number is not confirmed; whether the apartment tiers were later reduced to a flat 5 fils is not confirmed; no 2025–2026 tariff change was found. **How to verify:** Kuwait Al-Youm (gazette) search for the April 2016 law; the ministry's customer-tariff page on mew.gov.kw; the latest ministerial decision on tariffs.`,
        },
        {
          kind: "md",
          md: md`## Cost of supply

How much does a delivered kWh cost the state? There is **no current official figure** in the sources, and the estimates conflict:

| Estimate | Value | Source |
|---|---|---|
| Production cost (~2014–15) | ~**38 fils/kWh** | Oxford Business Group, 2015 |
| Cost of supply range | **14–26 fils/kWh** | ERF working paper, 2017 |
| Electricity subsidies (2013) | ~**KD 3.1 bn** | Oxford Business Group |
| Fuel for subsidised power (2022) | > **USD 10 bn** | Baker Institute |

Why the spread? Cost of supply depends heavily on **how fuel is priced**. If crude burned in a power station is valued at its export (opportunity) price, cost of supply is high; if it is valued at a low administered transfer price, it looks cheap. The ERF range and the OBG figure probably reflect different fuel-price years and accounting conventions. For business cases, the **opportunity cost** of fuel is the economically correct choice — Kuwait could have exported that crude or avoided that LNG cargo.`,
        },
        { kind: "sources", refs: ["m00-obg-2015-cost", "m00-erf-2017", "m00-baker-tariff"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Current cost of supply",
          md: md`**Unknown:** the ministry's current average cost of supply (fils/kWh), split into fuel, O&M and capital; current fuel burn in bbl/d. **How to verify:** request it from the ministry's finance/planning department; the Ministry of Finance budget documents (subsidy lines); the Audit Bureau's annual report on MEWRE accounts. Until then, present cost-of-supply sensitivities (14 / 26 / 38 fils), never a single number.`,
        },
        {
          kind: "md",
          md: md`## Subsidy arithmetic

The **unit subsidy** is simply the gap between what a kWh costs and what the customer pays:`,
        },
        { kind: "equation", formula: "m00-unit-subsidy" },
        { kind: "md", md: md`and the **fiscal subsidy** sums this over customer classes:` },
        { kind: "equation", formula: "m00-fiscal-subsidy" },
        {
          kind: "md",
          md: md`At 2 fils against a cost of supply of 14–38 fils, a citizen pays between **5% and 14%** of the cost of their electricity. The FY2026/27 **draft** budget as reported by Kuwait Times (spending KD 26.1 bn, revenue KD 16.3 bn, deficit about KD 9.8 bn) puts **wages and subsidies at about 76% of spending** — draft figures outside the research brief, so confirm the enacted budget before quoting them. Energy subsidies are therefore a first-order fiscal issue — and a deficit makes the Ministry of Finance, which also chairs the PPP Higher Committee, more receptive to anything that reduces them.`,
        },
        { kind: "sources", refs: ["m00-kt-2026-budget"] },
        {
          kind: "md",
          md: md`## The value of a displaced kWh

When a solar plant generates 1 kWh, some thermal unit generates 1 kWh less. The fuel saved is that unit's heat rate times its fuel price:`,
        },
        { kind: "equation", formula: "m00-fuel-value-kwh" },
        {
          kind: "md",
          md: md`Two reference cases (illustrative prices — always state your assumptions):

- **Crude in an old steam unit:** HR = 10.5 MJ/kWh; crude USD 70/bbl ÷ 6.12 GJ/bbl = USD 11.44/GJ → $v = 0.0105 \times 11.44 = $ **USD 0.120/kWh ≈ 37 fils/kWh**.
- **LNG in a CCGT:** HR = 7.5 MJ/kWh; LNG USD 12/MMBtu ÷ 1.055 = USD 11.37/GJ → **USD 0.085/kWh ≈ 26 fils/kWh**.

Compare with what solar costs. Analysts quoted by SolarQuarter estimate solar at **7–8 fils/kWh** in Kuwait (the Zone 1 tariff has **not** been reported). Even at the LNG case, each solar kWh saves roughly 18 fils of fuel net of its own cost; in the crude case about 29 fils. Over a 1,100 MW plant this is tens of millions of KWD per year (worked example below).

The annual energy of a plant follows from its capacity factor:`,
        },
        { kind: "equation", formula: "m00-annual-energy" },
        {
          kind: "callout",
          tone: "why",
          title: "Why renewables matter economically for Kuwait",
          md: md`1. **Fuel is the dominant cost** of the marginal summer kWh, and Kuwait burns liquids and imported LNG at the margin (5.2 Mt LNG Jan–Aug 2025). 2. **Every barrel not burned can be exported** — Kuwait's budget is oil-revenue dependent. 3. **The tariff barely moves**: politically, raising citizens' 2 fils is hard; reducing the cost side is the realistic lever. 4. **Imports and emergency measures are expensive**: the 2025 GCCIA approvals were about KWD 169 m. 5. **Climate commitments** (net zero 2060; NDC) add a second, but secondary, argument. Lead with fiscal and reliability value; mention climate third.`,
        },
        { kind: "sources", refs: ["m00-sq-2026-01-kpc", "m00-argus-2025-09-oilburn", "m00-powerline-2025-07-gccia", "m00-knowesg-2022-netzero", "m00-irena-costs"] },
        {
          kind: "md",
          md: md`## Economic vs financial value — the KPC trap

KPC pays MEWRE about **25 fils/kWh** for its ~1.7 GW. KPC's planned up-to-**2 GW** solar programme is attractive to KPC because it would replace 25-fils grid power with 7–8-fils solar. But from the **state's** point of view, KPC's payment to MEWRE is a transfer between two public entities: if KPC buys less grid power, MEWRE's revenue falls by the same amount. The **national economic gain** is only the fuel no longer burned (plus any capacity and reliability benefit), exactly as for a MEWRE plant.

Rule: in a ministry business case, **value fuel at opportunity cost, treat intra-state tariffs as transfers, and show the fiscal effect separately** (who pays, who saves). The Ministry of Finance will ask.`,
        },
        { kind: "sources", refs: ["m00-sq-2026-01-kpc"] },
        { kind: "widget", widget: "lcoe", props: { capexPerKw: 600, cf: 0.25, wacc: 0.07 }, caption: "Explore what drives a solar LCOE in Kuwait (capex, capacity factor, WACC). Then compare the result with the 26–37 fils/kWh fuel values above (1 fils ≈ 0.325 US cents)." },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Subsidy, fuel value and the solar dividend",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What a summer month of villa cooling costs the state",
          given: md`A Kuwaiti family villa uses 6,000 kWh in August (illustrative). Tariff 2 fils/kWh. Use the mid estimate of cost of supply, 26 fils/kWh (ERF upper bound), and show sensitivity to 14 and 38 fils.`,
          steps: [
            { md: md`Bill: $6{,}000 \times 0.002 = 12$ KWD.` },
            { md: md`Cost at 26 fils: $6{,}000 \times 0.026 = 156$ KWD. Subsidy $s = 26 - 2 = 24$ fils/kWh → $6{,}000 \times 0.024 = 144$ KWD for the month.` },
            { md: md`Sensitivity: at 14 fils the unit subsidy is 12 fils (customer pays 14.3% of cost); at 38 fils it is 36 fils (customer pays 5.3%).` },
            { md: md`National scale (illustrative): 84 TWh at an average tariff of 4 fils and cost of 26 fils → $84\times10^9 \times 0.022 = $ KWD **1.85 bn/yr**. OBG's KD 3.1 bn estimate for 2013 (published alongside its ~38 fils production-cost figure) is the same order of magnitude.` },
          ],
          result: md`The household pays 12 KWD for a month that costs the state about 156 KWD; nationally the subsidy is in the billions of KWD per year. Present it as a range, because the cost of supply is not officially published.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Value of displaced fuel per kWh",
          given: md`Assume crude at USD 70/bbl (6.12 GJ/bbl) burned at HR 10.5 MJ/kWh, and LNG at USD 12/MMBtu (1.055 GJ/MMBtu) burned at HR 7.5 MJ/kWh. 1 KWD = 3.25 USD.`,
          steps: [
            { md: md`Crude price per GJ: $70/6.12 = 11.44$ USD/GJ.` },
            {
              md: md`Crude: $v = 0.0105\ \text{GJ/kWh} \times 11.44 = 0.1201$ USD/kWh $= 0.1201/3.25 \times 1000 = 36.95$ fils/kWh.`,
              hidden: true,
              check: { prompt: "Value of displaced crude in fils/kWh", answer: 36.95, unit: "fils/kWh", tolerance: { rel: 0.01 } },
            },
            {
              md: md`LNG: $12/1.055 = 11.37$ USD/GJ; $v = 0.0075 \times 11.37 = 0.0853$ USD/kWh $= 26.25$ fils/kWh.`,
              hidden: true,
              check: { prompt: "Value of displaced LNG in fils/kWh", answer: 26.25, unit: "fils/kWh", tolerance: { rel: 0.01 } },
            },
            { md: md`At USD 8/MMBtu LNG the value falls to 17.5 fils/kWh — still more than double the 7–8 fils analyst estimate for solar.` },
          ],
          result: md`Roughly 37 fils/kWh (crude, old steam) and 26 fils/kWh (LNG, CCGT). Solar's economic case survives even pessimistic fuel prices.`,
        },
        {
          kind: "question",
          question: {
            id: "m00-l03-p1",
            type: "numeric",
            prompt: md`A 1,100 MWac solar plant runs at a 25% capacity factor (illustrative). It displaces crude valued at 36.95 fils/kWh and is paid an assumed tariff of 8 fils/kWh. What is the **net annual fuel saving to the state** in **million KWD**?`,
            answer: 69.75,
            tolerance: { rel: 0.02 },
            unit: "KWD m",
            explanation: md`$E = 1{,}100 \times 0.25 \times 8{,}760 = 2{,}409{,}000$ MWh $= 2.409\times10^9$ kWh. Net value $= 36.95 - 8 = 28.95$ fils/kWh. Saving $= 2.409\times10^9 \times 0.02895 \approx$ KWD **69.7 m/yr** (gross fuel saved ≈ KWD 89 m, about 4.1 million barrels). The tariff is assumed: the Zone 1 tariff has not been published.`,
            concepts: ["m00.displaced-fuel-value"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Building the business case the Ministry of Finance will accept",
      blocks: [
        {
          kind: "md",
          md: md`Your business cases go to people who think in **budget lines**: the ministry's finance department, the Ministry of Finance, the Higher Committee, the Audit Bureau. A strong Kuwaiti renewable business case has five parts:

1. **Fuel and fiscal saving** — barrels or MMBtu avoided, valued at opportunity cost, net of the PPA payment, as a range across fuel prices.
2. **Reliability value** — MW at the peak hour (lesson 1), avoided imports (GCCIA ~KWD 169 m in 2025) and avoided load-shedding.
3. **Who pays and who saves** — MEWRE pays the PPA; the state treasury gains through fuel/export; KPC/KNPC supply changes. Show the flows.
4. **Risks and sensitivities** — fuel price, capacity factor (soiling, temperature), tariff, COD delay (lesson 5).
5. **Policy fit** — Vision 2035, 15%/2030 and updated targets, net zero 2060 — but as support, not the lead.

Tools you will use: a simple spreadsheet model (energy × value), the developer's PVsyst report for yield, KAPP's financial model outputs (tariff, payment profile), and sensitivity tables. Module m10 covers LCOE and NPV in depth.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Comparing solar tariff with the 2 fils retail tariff** ("solar at 8 fils is four times more expensive than what customers pay") — wrong comparator; compare with cost of supply / fuel value. 2. **Counting KPC's 25 fils as a national saving** — it is a transfer. 3. **Single-point fuel price** — use a range. 4. **Using MWp and a generic 20% CF** — use the project's P50 yield in MWh at the point of connection. 5. **Ignoring the PPA payment** in the "saving" — the state still pays the IPP.`,
        },
        {
          kind: "checklist",
          title: "PM checks for any economic claim",
          items: [
            "Fuel type at the margin stated (crude / HFO / gasoil / LNG) with heat rate and price assumption.",
            "Exchange rate stated (1 KWD ≈ 3.25 USD assumed here).",
            "Energy from the project's P50 yield at the point of connection, not nameplate × generic CF.",
            "PPA payments deducted; tariff marked 'assumed' until KAPP/MEWRE publish it.",
            "Intra-state transfers (KPC tariff, MEWRE revenue) separated from economic savings.",
            "Cost-of-supply sensitivity (14 / 26 / 38 fils) shown, with sources.",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask (finance department, KAPP adviser, developer)",
          items: [
            "What fuel price and heat rate does the ministry use internally for avoided-cost calculations?",
            "What is the levelized tariff and the payment profile (escalation, indexation, currency) in the preferred bid?",
            "What P50/P90 energy at the point of connection underlies the tariff, and with what soiling assumption?",
            "How does the Ministry of Finance account for fuel supplied by KPC to MEWRE — at transfer or export price?",
            "Who bears the cost of curtailment or grid unavailability under the PPA?",
          ],
        },
        { kind: "scenario", scenario: "m00-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a Ministry of Finance budget analyst why a solar PPA at about 8 fils/kWh saves the state money even though citizens pay only 2 fils/kWh.",
          keyPoints: [
            "The comparator is the cost of supply / fuel displaced, not the retail tariff.",
            "A solar kWh avoids burning crude (~37 fils/kWh at USD 70/bbl in an old unit) or LNG (~26 fils/kWh at USD 12/MMBtu in a CCGT).",
            "The 2 fils tariff is unchanged either way; the subsidy shrinks because supply cost falls.",
            "Crude not burned can be exported, raising revenue.",
            "The state still pays the PPA, so the net saving is fuel value minus tariff.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m00-l03-q1",
      type: "mcq",
      prompt: md`What do Kuwaiti citizens in private housing pay for electricity?`,
      options: ["0.2 fils/kWh", "2 fils/kWh", "5 fils/kWh", "25 fils/kWh"],
      answer: 1,
      explanation: md`**2 fils/kWh** (≈0.7 US cents), unchanged since 1966; citizens were exempted from the 2016 increases. 5 fils is the commercial rate; ~25 fils is what KPC pays.`,
      concepts: ["m00.tariff-structure"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m00-l03-q2",
      type: "numeric",
      prompt: md`If cost of supply is 30 fils/kWh and the tariff is 2 fils/kWh, what percentage of cost does the customer pay?`,
      answer: 6.67,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$2/30 = 0.0667 = 6.7\%$. The remaining 28 fils/kWh is the unit subsidy, $s = c - t$.`,
      concepts: ["m00.subsidy-burden"],
      difficulty: 1,
    },
    {
      id: "m00-l03-q3",
      type: "numeric",
      prompt: md`LNG at USD 10/MMBtu is burned in a CCGT at 7.0 MJ/kWh. What is the value of displaced fuel in **fils/kWh**? (1 MMBtu = 1.055 GJ; 1 KWD = 3.25 USD.)`,
      answer: 20.42,
      tolerance: { rel: 0.02 },
      unit: "fils/kWh",
      explanation: md`USD/GJ $= 10/1.055 = 9.479$. $v = 0.007 \times 9.479 = 0.06635$ USD/kWh. In fils: $0.06635/3.25\times1000 = 20.4$ fils/kWh.`,
      concepts: ["m00.displaced-fuel-value"],
      difficulty: 2,
    },
    {
      id: "m00-l03-q4",
      type: "mcq",
      prompt: md`KPC pays MEWRE ~25 fils/kWh. KPC builds 2 GW of solar at 7.5 fils/kWh. From the **state's** economic perspective, the saving is best measured by…`,
      options: [
        "25 − 7.5 = 17.5 fils on every kWh KPC no longer buys",
        "The fuel no longer burned in MEWRE's plants (valued at opportunity cost), minus the cost of the solar energy",
        "Zero, because KPC and MEWRE are both state-owned",
        "The 2 fils residential tariff times KPC's consumption",
      ],
      answer: 1,
      explanation: md`KPC's tariff payments to MEWRE are an intra-state transfer: KPC's gain is MEWRE's revenue loss. The real economic gain is fuel avoided (plus capacity value) net of the solar cost. Option C is wrong because real fuel is saved.`,
      concepts: ["m00.economic-vs-financial"],
      difficulty: 3,
    },
    {
      id: "m00-l03-q5",
      type: "multi",
      prompt: md`Which statements about Kuwait's cost of supply are supported by the sources? (Select all.)`,
      options: [
        "OBG estimated ~38 fils/kWh around 2014–15",
        "An ERF paper gave 14–26 fils/kWh",
        "MEWRE publishes an official 2026 cost of supply of 22 fils/kWh",
        "Fuel for subsidised power cost more than USD 10 bn in 2022 (Baker Institute)",
      ],
      answer: [0, 1, 3],
      explanation: md`No current official cost figure was found — option C is invented. The conflicting estimates reflect different years and fuel-pricing conventions.`,
      concepts: ["m00.subsidy-burden"],
      difficulty: 2,
    },
    {
      id: "m00-l03-q6",
      type: "decision",
      prompt: md`A senior official says in a meeting: "Why pay 8 fils for solar when our citizens pay 2 fils? Solar is four times too expensive." How do you respond?`,
      options: [
        { text: "Agree, and suggest raising the citizen tariff.", score: 0, feedback: "Wrong comparator and politically naïve — tariff reform is not your call, and solar is not 'too expensive'." },
        { text: "Respectfully reframe: the 2 fils is what the customer pays, not what the kWh costs; the relevant comparison is the fuel each solar kWh displaces — roughly 26–37 fils at recent prices — so solar reduces the subsidy. Offer a one-page note with the range and assumptions.", score: 1, feedback: "Correct and constructive: right comparator, a range, and a follow-up document." },
        { text: "Say climate commitments require it regardless of cost.", score: 0.3, feedback: "True in part, but it concedes the false cost premise. Lead with fiscal value." },
        { text: "Stay silent and raise it later by email.", score: 0.4, feedback: "A follow-up is good, but leaving a false premise unchallenged in the room lets it harden." },
      ],
      explanation: md`Retail tariff vs cost of supply is the most common confusion in Gulf energy discussions. Always reframe to cost of supply and fuel displacement, with sourced ranges.`,
      concepts: ["m00.subsidy-burden", "m00.displaced-fuel-value"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m00-l03-f1", front: "Citizen residential tariff and since when", back: "2 fils/kWh (≈0.7 US cents), since 1966.", concepts: ["m00.tariff-structure"] },
    { id: "m00-l03-f2", front: "Commercial and industrial/agricultural tariffs (post-2016)", back: "Commercial 5 fils/kWh; industrial & agricultural 3 fils/kWh.", concepts: ["m00.tariff-structure"] },
    { id: "m00-l03-f3", front: "Apartment tiers under the 2016 law", back: "5 / 10 / 15 fils/kWh for 0–1,000 / 1,000–2,000 / >2,000 kWh/month; applied from 22 Aug 2017 (later cap at 5 fils reported, unconfirmed).", concepts: ["m00.tariff-structure"] },
    { id: "m00-l03-f4", front: "KPC grid tariff", back: "~25 fils/kWh for ~1.7 GW (SolarQuarter 2026) — an intra-state transfer price.", concepts: ["m00.economic-vs-financial"] },
    { id: "m00-l03-f5", front: "Cost-of-supply estimates", back: "~38 fils (OBG ~2015); 14–26 fils (ERF 2017). No current official figure.", concepts: ["m00.subsidy-burden"] },
    { id: "m00-l03-f6", front: "Value of displaced fuel formula", back: md`$v = HR \times p_{\text{fuel}}$ (GJ/kWh × USD/GJ = USD/kWh).`, concepts: ["m00.displaced-fuel-value"] },
    { id: "m00-l03-f7", front: "Displaced crude value at USD 70/bbl, HR 10.5 MJ/kWh", back: "≈ USD 0.12/kWh ≈ 37 fils/kWh.", concepts: ["m00.displaced-fuel-value"] },
    { id: "m00-l03-f8", front: "Analyst estimate of solar cost in Kuwait", back: "7–8 fils/kWh (SolarQuarter, Jan 2026). Zone 1 tariff not reported.", concepts: ["m00.displaced-fuel-value"] },
    { id: "m00-l03-f9", front: "FY2026/27 draft budget headline", back: "Spending KD 26.1 bn, revenue KD 16.3 bn, deficit ~KD 9.8 bn; wages + subsidies ≈ 76% of spending (Kuwait Times report of the draft; verify the enacted figures).", concepts: ["m00.subsidy-burden"] },
  ],
  scenarios: [
    {
      id: "m00-s3",
      title: "One page for the Higher Committee pack",
      context: md`KAPP asks MEWRE for a one-page "economic justification" annex for the Zone 2 (500 MW) award pack going to the Higher Committee. The tariff in the preferred bid is confidential to the evaluation team, but you have been given it. Your Director wants the strongest possible case.`,
      start: "a",
      concepts: ["m00.displaced-fuel-value", "m00.economic-vs-financial"],
      nodes: {
        a: {
          md: md`Which valuation basis do you choose for fuel?`,
          choices: [
            { text: "Opportunity cost (export/import parity) as base case, with a low-price sensitivity.", next: "b", score: 10, feedback: "Economically correct and defensible; the sensitivity shows robustness." },
            { text: "The highest crude price of the last five years, to maximise the saving.", next: "b", score: 3, feedback: "Cherry-picking will be spotted by the Ministry of Finance and undermines trust." },
            { text: "The internal transfer price KPC charges MEWRE for fuel.", next: "b", score: 4, feedback: "Understates the national value. Show it as a fiscal-flow note, not the economic base case." },
          ],
        },
        b: {
          md: md`Your Director suggests adding KPC's 25-fils tariff saving "because KPC might buy power from this plant too".`,
          choices: [
            { text: "Decline politely: that is a transfer between state entities and would double count. Add a short 'fiscal flows' box instead.", next: "c", score: 10, feedback: "Correct — and you gave your Director something better to show." },
            { text: "Add it.", next: "c", score: 1, feedback: "Double counting in a Higher Committee pack is a credibility risk for the ministry." },
          ],
        },
        c: {
          md: md`How do you present the confidential tariff?`,
          choices: [
            { text: "Use it in the calculation but follow KAPP's confidentiality instructions — mark the annex confidential and share only through the formal pack.", score: 10, feedback: "Right: the tariff is procurement-sensitive until award." },
            { text: "Email the annex to colleagues for feedback.", score: 0, feedback: "Leaking a bid tariff before award can compromise the procurement and expose you personally." },
          ],
        },
      },
    },
  ],
};

export default lesson;
