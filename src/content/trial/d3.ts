import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 3 · Kuwait's power system and solar PV (Modules 0 and 2). */
export const D3: Explainer[] = [
  // ------------------------------------------------------------------ 1
  {
    id: "x-kuwait-power-system",
    day: 3,
    title: "Kuwait's power system in ten minutes",
    minutes: 12,
    module: "m00",
    hook: "Every memo, briefing and business case you touch at MEWRE starts from a handful of system numbers: the summer peak, what the fleet can really deliver, what it burns and what customers pay. Know these numbers and their sources and you can follow any conversation in the Undersecretary's office from week one.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Picture a taxi company in Kuwait City that owns **21 taxis**. On the busiest afternoon of the year it needs about **17.5** on the road. Sounds comfortable.

But on that afternoon some taxis have broken down, some are in the garage for their scheduled service, and in 50 °C heat the old ones crawl. Count what is actually usable and you have about **17**. Some customers are left on the pavement.

Two more twists:

- The taxis burn fuel the owner could otherwise **sell abroad** at a good price.
- Passengers pay a fixed fare of **2 fils** for a trip that costs the company somewhere between 14 and 38 fils.

So any helper that carries passengers on the busy afternoon *without burning fuel* is worth a lot to the owner. That helper is solar.

Where the analogy breaks: electricity cannot queue like passengers. If supply falls short, frequency drops (Day 2) and the control centre must cut some areas off (**load-shedding**).`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Demand and the peak.** Kuwait's load is dominated by **air conditioning**. The system's worst hour is a July or August afternoon at 48 to 50 °C. MEWRE reported summer peaks of 17,640 MW (2024), 17,610 MW (2025) and **17,540 MW (2026)**. New connections still add about 1 GW of load a year; demand-side measures have been holding the peak flat.

**Installed vs available capacity.** **Installed** (nameplate) capacity is what the plants are rated at: about **21 GW** (Rystad). **Available** capacity is what can actually run at the peak hour: about **17 GW**. The gap of roughly 4 GW (about one fifth of the fleet) has three causes:

- **Forced outages**: trips, like the 300 MW Az-Zour South steam turbine in June 2024.
- **Planned maintenance** that runs into the early heat (April 2025).
- **Temperature derating**: a gas turbine loses roughly 0.5 to 0.7 % of output per °C above 15 °C, so 17 to 25 % at 50 °C (generic engineering value).

**Reserve margin** is the spare capacity at the peak, as a share of the peak:

$RM = (C_{avail} - P_{peak}) / P_{peak}$

Hot-climate utilities typically plan for +10 to 20 % on *available* capacity. In June 2025 MEES reported a 16.98 GW peak against 16.275 GW available: $RM \approx -4.2\%$. A negative margin means cuts, emergency imports through the GCC interconnector (GCCIA) or appeals to save power. That is what happened in 2024 and 2025.`,
      },
      {
        kind: "flow",
        title: "Why the summer margin disappears",
        steps: [
          { label: "48 to 50 °C afternoon", detail: "Air conditioning pushes demand to the year's peak (17,540 MW in 2026)" },
          { label: "Gas turbines derate", detail: "The same heat costs about 0.5 to 0.7 % of output per °C above 15 °C" },
          { label: "Outages and maintenance", detail: "Forced trips and maintenance running into the heat remove more units" },
          { label: "Available ≈ 17 GW", detail: "Out of about 21 GW installed" },
          { label: "Margin thin or negative", detail: "June 2025: 16.98 GW peak vs 16.275 GW available, RM ≈ -4.2 %" },
          { label: "Imports, appeals, cuts", detail: "GCCIA imports, calls to save power or load-shedding (2024 and 2025)" },
        ],
        caption: "Heat pushes demand up and pushes available supply down in the same hour: that double hit is why the margin vanishes.",
      },
      {
        kind: "chart",
        chart: "bar",
        title: "Capacity vs peak demand (GW)",
        xKey: "item",
        yLabel: "GW",
        series: [{ key: "gw", label: "GW" }],
        data: [
          { item: "Installed (Rystad)", gw: 21 },
          { item: "Reliably available (Rystad)", gw: 17 },
          { item: "Peak 2026 (MEWRE)", gw: 17.54 },
          { item: "Available Jun 2025 (MEES)", gw: 16.275 },
          { item: "Peak Jun 2025 (MEES)", gw: 16.98 },
        ],
        caption: "Installed capacity looks comfortable; capacity available at the peak hour does not. Sources and bases differ, which is exactly why every figure carries its label.",
      },
      {
        kind: "md",
        md: md`**Fuel.** Kuwait generates roughly **62 % from gas and 36 % from oil** (crude, fuel oil and gasoil burned directly), with about 2 % renewables. Its own gas is mostly associated gas from oil fields, so summer is topped up with **imported LNG** (5.2 Mt in January to August 2025) and liquid fuels. The marginal summer kWh comes from the oldest, least efficient units burning the most expensive fuel.

**Tariffs.** Kuwaiti citizens in private housing pay **2 fils/kWh**, unchanged since 1966 (1 KWD = 1,000 fils). The cost of supply is not officially published; estimates run from **14 to 38 fils/kWh**. The state budget pays the gap.

**Why every solar MWh saves money.** Each solar kWh means a thermal unit burns less fuel. Valued at what that fuel could earn or would cost on world markets, that is about **37 fils/kWh** for crude in an old steam unit (at USD 70/bbl) and about **26 fils/kWh** for LNG in a combined-cycle plant (at USD 12/MMBtu). Analysts estimate solar in Kuwait at **7 to 8 fils/kWh**. The difference is the saving, and the crude not burned can be exported.`,
      },
      {
        kind: "chart",
        chart: "bar",
        title: "What a kWh costs, what customers pay, what solar saves (fils/kWh)",
        xKey: "item",
        yLabel: "fils/kWh",
        series: [{ key: "fils", label: "fils/kWh" }],
        data: [
          { item: "Citizen tariff", fils: 2 },
          { item: "Solar (analyst est., upper)", fils: 8 },
          { item: "Cost of supply (low est.)", fils: 14 },
          { item: "Displaced LNG", fils: 26 },
          { item: "Displaced crude", fils: 37 },
          { item: "Cost of supply (high est.)", fils: 38 },
        ],
        caption: "Compare solar with the fuel it displaces, not with the 2-fils tariff. Fuel values use illustrative prices (USD 70/bbl crude, USD 12/MMBtu LNG) and 1 KWD ≈ 3.25 USD.",
      },
      {
        kind: "md",
        md: md`### Why it matters at MEWRE

- Ministers respond to "this plant cuts the summer shortfall by X MW and saves Y barrels", not to "Z MWp".
- PV helps the afternoon peak but gives less than nameplate at 50 °C and nothing after sunset, when cooling load is still high. Always ask how many **MWac** a project delivers at the peak hour. That is why the ministry paired the PV programme with a planned 1 to 1.5 GW / 4 to 6 GWh battery storage (BESS) programme.
- With a margin this thin, grid tie-in outages between April and October will almost certainly be refused. Plan energisation for November to March.`,
      },
      { kind: "widget", widget: "load-curve", props: { season: "summer", pvMW: 1600 }, caption: "Indicative summer day with 1,600 MW of PV (Zones 1 and 2). PV shaves the afternoon, but load stays high after sunset, so the net peak moves toward the evening and falls by far less than 1,600 MW. Switch to winter: the peak comes after sunset and PV does not touch it at all." },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Summer peak**: 17,540 MW in 2026 (MEWRE basis via Kuwait Times; medium-high). MEES reported a 17.71 GW monthly record in July 2025 on a different basis (medium). Always state the basis.
- **Capacity**: ~21 GW installed, ~17 GW reliably available at peak, ~14 GW gas-fired (Rystad, 2025; medium).
- **Mix**: ~62 % gas, ~36 % oil, ~2 % renewables (Ember via Inzonex; medium-low). Solar fleet about 102 MW at end-2024 (MEWRE).
- **Tariff**: 2 fils/kWh for citizens since 1966. **Cost of supply**: 14 to 38 fils/kWh, no official figure, so always show a range.
- **Displaced fuel**: ≈ 37 fils/kWh (crude) or ≈ 26 fils/kWh (LNG) vs solar ≈ 7 to 8 fils/kWh (analyst estimate; the Zone 1 tariff has not been reported).`,
      },
    ],
    say: [
      "Which basis is this peak on: the ministry's seasonal figure or a MEES monthly record, net or gross?",
      "What does the plant deliver in MWac at 16:00 on an August day at 50 °C, not in MWp?",
      "Is that reserve margin computed on installed or on available capacity?",
      "Which fuel and heat rate are we assuming at the margin, and at what price?",
      "Every month this plant is late, we burn more crude or LNG: what is that worth per day?",
    ],
    trap: "Comparing the solar tariff with the 2-fils retail tariff (\"solar at 8 fils costs four times what customers pay\"). The right comparison is the cost of supply or the fuel the solar kWh displaces, about 26 to 37 fils/kWh. Likewise, a reserve margin computed on 21 GW installed looks healthy; on about 17 GW available it was negative in 2025.",
    check: [
      {
        id: "x-kuwait-power-system-c1",
        type: "mcq",
        prompt: md`Rystad puts Kuwait's installed generating capacity at about 21 GW. Roughly how much is **reliably available** at the summer peak hour?`,
        options: ["About 21 GW", "About 19 GW", "About 17 GW", "About 14 GW"],
        answer: 2,
        explanation: md`About **17 GW**. Forced outages, planned maintenance and high-temperature derating remove about 4 GW at the peak. 14 GW is the gas-fired part of the fleet, not the available capacity.`,
        concepts: ["m00.available-capacity"],
        difficulty: 1,
      },
      {
        id: "x-kuwait-power-system-c2",
        type: "numeric",
        prompt: md`June 2025 (MEES): peak demand 16.98 GW, available capacity 16.275 GW. What was the reserve margin in **percent**? (Negative if a deficit.)`,
        answer: -4.15,
        tolerance: { abs: 0.1 },
        unit: "%",
        explanation: md`$RM = (16.275 - 16.98) / 16.98 = -0.705 / 16.98 \approx -4.15\%$. About 705 MW had to be imported, saved or shed.`,
        concepts: ["m00.reserve-margin"],
        difficulty: 2,
      },
      {
        id: "x-kuwait-power-system-c3",
        type: "mcq",
        prompt: md`A colleague says: "Solar at 8 fils/kWh is a bad deal, because citizens only pay 2 fils." What is the best reply?`,
        options: [
          "Compare solar with the fuel it displaces (about 26 to 37 fils/kWh) or the cost of supply, not with the subsidised tariff",
          "Agree: solar only makes sense once tariffs rise",
          "Solar is free once built, so the tariff does not matter",
          "Count KPC's 25 fils/kWh payment as the national saving instead",
        ],
        answer: 0,
        explanation: md`The 2-fils tariff is a subsidised price, not a cost. The economic value of a solar kWh is the fuel not burned, valued at its export or import price. KPC's 25 fils is a transfer between two public bodies, not a national saving.`,
        concepts: ["m00.displaced-fuel-value", "m00.economic-vs-financial"],
        difficulty: 1,
      },
    ],
    deeper: ["m00-l01", "m00-l03"],
  },

  // ------------------------------------------------------------------ 2
  {
    id: "x-who-decides",
    day: 3,
    title: "Who decides what: MEWRE, KAPP, KISR and the approval chain",
    minutes: 13,
    module: "m00",
    hook: "As a MEWRE PM you will rarely be blocked by engineering. You will be paced by a chain of institutions, each with the legal right to say \"not yet\". Knowing who holds each gate, and what file they need, is the fastest way to move a project.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a large company buying a very expensive machine.

- The **production department** needs the machine and writes the requirement.
- **Procurement** runs the tender and picks a supplier.
- The **board** approves the purchase.
- **Legal** checks the contract wording.
- **Internal audit** checks the money and the procedure before anyone signs.

Each of them can send the file back with comments, and each return costs a full review cycle.

Kuwait's public sector works the same way, with one difference: the "departments" are separate institutions with their own laws, and their signatories are personally accountable. Officials are rarely punished for delay but can be for an irregular approval, so incomplete files get returned.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**MEWRE wears four hats.**

1. **Policy owner**: renewable targets and strategy.
2. **System operator and transmission owner**: dispatch, the 400/132 kV network, connecting new plants.
3. **Offtaker**: it buys the power, under a **30-year PPA** (power purchase agreement) for solar IPPs and a **25-year ECWPA** for gas-fired power and water plants (IWPPs).
4. **Direct procurer** of grid and EPC works through public tenders, for example the Shagaya to Al-Wafra 400 kV line (KD 48.6 m, March 2026).

**KAPP**, the Kuwait Authority for Partnership Projects (PPP Law 116/2014; Executive Regulations Decree 78/2015), runs the procurement of **PPP and IPP projects**: feasibility, RFQ, RFP, evaluation. For a solar IPP, **KAPP procures and MEWRE is the offtaker**. KAPP is attached to the Minister of Finance; on IWPPs it also becomes a shareholder (60 % in Az-Zour North 2&3).

**The Higher Committee for PPP**, chaired by the **Minister of Finance**, approves the project, the procurement stages and the selected investor.

**CAPT**, the Central Agency for Public Tenders (Public Tenders Law 49/2016), governs conventional public tenders above KD 75,000: the grid works, consultancy and O&M contracts MEWRE buys itself.`,
      },
      {
        kind: "md",
        md: md`**Two tracks, side by side.** Every file you touch sits on one of them, and the track decides which gates apply.

| | PPP / IPP track | Conventional tender track |
|---|---|---|
| Who runs the procurement | KAPP | MEWRE, under CAPT rules |
| Law | PPP Law 116/2014 | Public Tenders Law 49/2016 |
| Typical projects | Solar IPPs (Shagaya Phase III), IWPPs | Grid works (Shagaya to Al-Wafra 400 kV line), consultancy, O&M |
| Gatekeeper | Higher Committee for PPP (project, then investor) | CAPT (tenders above KD 75,000) |
| Before signature | State Audit Bureau prior review | State Audit Bureau prior review |
| MEWRE's hat | Offtaker (30-year PPA) | Direct buyer |`,
      },
      {
        kind: "md",
        md: md`**The State Audit Bureau** (Law 30/1964) carries out **prior review** of contracts before signature. Nothing signs without it: even the 2025 emergency GCCIA power imports needed its conditional approval.

**The Fatwa and Legislation Department** reviews the legal terms of contracts, PPAs included, and gives the government legal opinions. You reach it through the ministry's legal affairs department.

**The Council of Ministers** is the top executive decision maker. Since **10 May 2024** the National Assembly is suspended and laws are issued by decree-law, so the bottleneck is cabinet agendas rather than parliament.

**Also on the map:** the **Ministry of Finance** prepares the budget (fiscal year 1 April to 31 March) and funds ministry capital projects. **KISR**, the Kuwait Institute for Scientific Research, built Shagaya Phase I with the ministry and runs solar measurement stations at five inland sites: your source of ground-truth sunlight data. The **EPA** (Environment Public Authority) handles environmental approvals; the **Supreme Council for Planning and Development** owns Kuwait Vision 2035.`,
      },
      { kind: "widget", widget: "institution-map", caption: "Click each institution for its role. Then trace a solar IPP: MEWRE requests, KAPP procures, the Higher Committee approves, the Audit Bureau reviews, MEWRE signs the PPA." },
      {
        kind: "flow",
        title: "Approval chain of a KAPP solar IPP",
        steps: [
          { label: "1. MEWRE request", detail: "The public entity asks for the project" },
          { label: "2. KAPP feasibility", detail: "Feasibility study by KAPP and its advisers" },
          { label: "3. Higher Committee", detail: "Approves the project" },
          { label: "4. RFQ", detail: "Prequalification of bidders" },
          { label: "5. RFP", detail: "Technical, then financial bid opening" },
          { label: "6. Preferred bidder", detail: "KAPP evaluation and recommendation" },
          { label: "7. Higher Committee", detail: "Approves the selected investor" },
          { label: "8. State Audit Bureau", detail: "Prior review before signature" },
          { label: "9. PPA signing", detail: "MEWRE signs as offtaker" },
          { label: "10. Financial close", detail: "Lenders commit, construction starts" },
        ],
        caption: "Two Higher Committee gates (project and investor), then the Audit Bureau before signature. Synthesised from IJGlobal and MEED coverage; Fatwa's exact place in the sequence is not confirmed.",
      },
      {
        kind: "md",
        md: md`### Where you sit, and the one formula that matters

You sit inside MEWRE, on the renewable-energy side (the exact unit names in the org chart are unverified: get the current chart and the delegation-of-authority matrix on day one). You report up through an Assistant Undersecretary to the Undersecretary. You do not approve contracts yourself. You **prepare files that pass the gates** and you **track every referral** (إحالة) from desk to desk in a register.

Day to day you talk to: the KAPP project team (technical and offtaker positions during procurement), MEWRE Transmission and the control centre (connection, outages), legal affairs (and through them Fatwa), the finance and budget department, the Audit Bureau liaison, CAPT for ministry tenders, and KISR for data.

Each gate takes a review time $t$ and returns the file with probability $p$. On average a step then takes

$E[T] = t / (1 - p)$

A 6-week review with a 40 % chance of return takes 10 weeks on average; at 50 % it doubles. Your biggest lever is **lowering p with complete, pre-cleared files**, not chasing the reviewer to shorten t.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Expected time at one gate with a 6-week review",
        xKey: "p",
        xLabel: "Chance the file is returned (p)",
        yLabel: "Expected weeks",
        series: [{ key: "weeks", label: "Expected weeks" }],
        data: [
          { p: "0 %", weeks: 6 },
          { p: "10 %", weeks: 6.7 },
          { p: "20 %", weeks: 7.5 },
          { p: "30 %", weeks: 8.6 },
          { p: "40 %", weeks: 10 },
          { p: "50 %", weeks: 12 },
          { p: "60 %", weeks: 15 },
        ],
        caption: "E[T] = 6 / (1 - p). The curve bends upward: each extra point of return risk costs more weeks than the last, so a complete file is worth more than a faster reviewer.",
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **KAPP**: PPP Law 116/2014 and Decree 78/2015. Do not confuse it with FDI Law 116/2013 (KDIPA): same number, different year.
- **CAPT**: tenders above KD 75,000 (Law 49/2016). Law 94/2026 (gazetted 27 Sep 2026, effective about three months later) allows direct contracting up to KD 1 m per financial year without CAPT approval (single law-firm source: verify).
- **Audit Bureau** prior review: reported threshold KD 100,000 and above (low-to-medium confidence; may have been amended).
- **Contract terms**: PPA 30 years (solar IPP); ECWPA 25 years (IWPP). Fiscal year 1 April to 31 March.
- **Benchmark**: Zone 1 went from RFQ (January 2024) to a reported preferred bidder (about August 2026) in roughly 31 months, with the Higher Committee, Audit Bureau and PPA still to come.`,
      },
    ],
    say: [
      "Which approvals are pending on this file today, with whom, since when, and what observations were raised?",
      "Is this a KAPP PPP track or a CAPT tender track? That decides which gates apply.",
      "What did the Audit Bureau observe on the last similar contract, and is every point closed in our file?",
      "Who on MEWRE's side has the authority to agree the offtaker positions in the PPA mark-up?",
      "A press report of a 'selected' bidder is not a Higher Committee approval or a signed PPA: what is the formal status?",
    ],
    trap: "Thinking KAPP speaks for MEWRE, or that CAPT runs IPP tenders. KAPP procures PPP projects under the PPP Law, CAPT governs conventional ministry tenders, and MEWRE as offtaker must state its own positions in writing. And never go around the chain to the Audit Bureau or Fatwa directly: go through the ministry liaison and legal affairs.",
    check: [
      {
        id: "x-who-decides-c1",
        type: "mcq",
        prompt: md`For a Shagaya Phase III solar IPP, which statement is correct?`,
        options: [
          "KAPP runs the procurement and MEWRE is the offtaker under a 30-year PPA",
          "MEWRE runs the RFP and KAPP signs the PPA",
          "CAPT runs the procurement because the value exceeds KD 75,000",
          "The Council of Ministers selects the developer directly",
        ],
        answer: 0,
        explanation: md`KAPP procures under PPP Law 116/2014, the Higher Committee for PPP approves, and MEWRE signs the 30-year PPA as offtaker. CAPT governs conventional public tenders, not PPP procurement.`,
        concepts: ["m00.kapp-higher-committee", "m00.mewre-role"],
        difficulty: 1,
      },
      {
        id: "x-who-decides-c2",
        type: "numeric",
        prompt: md`Audit Bureau prior review of your contract normally takes 8 weeks, and files like yours are returned for rework half the time (p = 0.5). Using $E[T] = t/(1-p)$, what is the expected duration in weeks?`,
        answer: 16,
        tolerance: { abs: 0.1 },
        unit: "weeks",
        explanation: md`$E[T] = 8 / (1 - 0.5) = 16$ weeks. A 50 % return probability doubles the step. Cutting p to 0.2 with a complete file brings it down to 10 weeks.`,
        concepts: ["m00.decision-chain"],
        difficulty: 2,
      },
      {
        id: "x-who-decides-c3",
        type: "decision",
        prompt: md`The Audit Bureau returns your Owner's Engineer consultancy contract with five observations. Three concern documents you had sent separately by email. What do you do?`,
        options: [
          { text: "Call the Audit Bureau examiner directly and explain the documents were emailed.", score: 0.2, feedback: "Bypassing the ministry liaison is poor form, and emails are not part of the formal file. The file is what counts." },
          { text: "Answer all five observations point by point through the ministry liaison, put the missing documents in the official file, and add them to your pre-submission checklist.", score: 1, feedback: "Correct: formal, complete, and it lowers the return probability on future files." },
          { text: "Ask the Undersecretary to pressure the Bureau.", score: 0.1, feedback: "Pressure on a control body rarely helps and can backfire. The observations are legitimate if documents were missing from the file." },
          { text: "Resubmit only the three missing documents and argue the other two observations later.", score: 0.4, feedback: "A partial response invites another full review cycle. Address everything in one submission." },
        ],
        explanation: md`Every return is a full review cycle. Respond formally and completely through the proper channel, then fix the process that caused the return.`,
        concepts: ["m00.control-bodies", "m00.decision-chain"],
        difficulty: 2,
      },
    ],
    deeper: ["m00-l02", "m00-l05"],
  },

  // ------------------------------------------------------------------ 3
  {
    id: "x-kuwait-pipeline",
    day: 3,
    title: "The renewable pipeline: Shagaya, Dibdibah, Al-Khairan and the targets",
    minutes: 13,
    module: "m00",
    hook: "In your first weeks someone will ask \"where are we on Shagaya?\" The honest answer has three parts for every project: the last confirmed milestone, its date, and how sure we are. This is the register as Track 0 holds it (as of October 2026).",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think about buying a car.

- You **want** one (a target).
- You **ask dealers to show interest** and shortlist them (RFQ, prequalification).
- They send **priced offers** (RFP bids).
- The dealer **tells a friend you have chosen them** (a preferred bidder reported in the trade press).
- You **sign the contract** (the PPA), the bank pays (financial close) and the car is **delivered** (COD, commercial operation date).

Only a signed contract is a car you will get, and only delivery is a car you can drive.

Kuwait's pipeline is reported mostly through trade press (MEED, Zawya, AGBI, SolarQuarter) long before, or instead of, official announcements. So for every project you must say which step it has actually reached, and how sure you are. Track 0 uses three labels: **High** = signed or official; **Medium** = trade press or secondary sources; **Low** = a single weak source or a framework only.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**The targets.**

- **15 % renewable electricity by 2030**: the official target since 2012.
- **30 % by 2030, 40 % by 2040, 50 % by 2050**: stated by a MEWRE official in 2025. Formal cabinet adoption is not confirmed.
- **Carbon neutrality by 2060** for the country; **net zero 2050** for the oil and gas sector. Outlets that write "Kuwait net zero 2050" are wrong about the national pledge.

**Where we are.** About **102 MW** of solar at end-2024 (MEWRE). Rystad forecasts about 3.3 GW of renewables by 2030 (about 7 % of generation) and expects 15 % to be reached around 2035.`,
      },
      {
        kind: "chart",
        chart: "bar",
        title: "Renewable share of electricity: targets vs reality (%)",
        xKey: "item",
        yLabel: "% of generation",
        series: [{ key: "pct", label: "% of generation" }],
        data: [
          { item: "Today (Ember, medium-low)", pct: 2 },
          { item: "2030 Rystad forecast", pct: 7 },
          { item: "2030 official target", pct: 15 },
          { item: "2030 stated by MEWRE", pct: 30 },
          { item: "2040 stated by MEWRE", pct: 40 },
          { item: "2050 stated by MEWRE", pct: 50 },
        ],
        caption: "For 2030 alone there are three numbers: about 7 % forecast, 15 % official, 30 % stated (adoption unverified). Always say which target you mean.",
      },
      {
        kind: "md",
        md: md`**Shagaya Phase I**, the KISR pilot (70 MW, Jahra Governorate): **50 MW parabolic-trough CSP with 10 hours of molten-salt storage**, **10 MW PV** and **10 MW wind**, operating since 2017 to 2019. The wind farm did very well (capacity factor 45.2 % in year 1, 42.1 % in year 2). **No CSP operating data have been published since 2019.**

**Shagaya Phase III**: utility PV IPPs procured by KAPP, each with a 30-year PPA with MEWRE. It grew out of **Al-Dibdibah**: KNPC tendered a ~1.5 GW solar project for the oil sector (seven bids, April 2019); the cabinet cancelled that tender (COVID-19, market impact) and the scope was folded into "Al Dibdibah Power and Al Shagaya Renewable Energy Phase III" as KAPP IPPs.

- **Zone 1, 1,100 MW PV plus a 400 kV substation**: Masdar with Fouad AlGhanim & Sons was **reported** selected by MEED around August 2026. It still needs Higher Committee and Audit Bureau approval and a signed PPA. **The tariff has not been reported.**
- **Zone 2, 500 MW PV**: bids opened 26 July 2026. MEED reports three bids; Zawya and Al-Rai report two.
- **Shagaya to Al-Wafra 400 kV line**, MEWRE's own contract: awarded to Power Grid Company (Kuwait), KD 48.6 m, March 2026. If it is late, the plants are stranded.`,
      },
      {
        kind: "flow",
        title: "Shagaya Phase III Zone 1: how far it has got",
        steps: [
          { label: "RFQ", detail: "January 2024; six prequalified" },
          { label: "RFP", detail: "About June 2025; deadline extended" },
          { label: "Bids", detail: "15 January 2026; three consortia" },
          { label: "Financial bids opened", detail: "About July 2026" },
          { label: "Preferred bidder reported", detail: "About August 2026 (MEED; medium confidence)" },
          { label: "Still to come", detail: "Higher Committee, Audit Bureau, PPA signing, financial close: none publicly confirmed" },
        ],
        caption: "The project is between step 6 and step 7 of the approval chain. Anything past the press report is not yet a fact.",
      },
      {
        kind: "md",
        md: md`**The China government-to-government (G2G) track.** On 17 March 2025 MEWRE signed a framework agreement with China's National Energy Administration covering Shagaya Phases 3 and 4 and Abdaliya solar (3.5 GW, expandable to 5 GW). In May 2025 Kuwait said a Chinese state company (SPIC) had been awarded Phases 3 and 4, reaching 4,800 MW by 2028. Whether a definitive contract exists, and whether it **overlaps** Zones 1 and 2 or is additional, is **unknown**.

**Al-Khairan is not solar.** Al-Khairan Phase 1 is a **1,800 MW gas-fired IWPP** (two bids on 1 June 2026). No 1,800 MW Al-Khairan solar project was found. The other big thermal project, Az-Zour North 2&3, signed its 25-year ECWPA on 3 February 2026.

**Storage.** A **1 to 1.5 GW / 4 to 6 GWh battery (BESS)** programme was announced in November 2025, with the first 500 MW targeted for summer 2027.`,
      },
      {
        kind: "md",
        md: md`**The register in tiers.** The same projects, sorted by how real they are:

| Tier | Projects (Track 0 confidence) |
|---|---|
| Operating | Shagaya Phase I, 70 MW (high); about 102 MW of solar in total at end-2024 (MEWRE) |
| Signed or awarded | Shagaya to Al-Wafra 400 kV line, MEWRE contract, March 2026; Az-Zour North 2&3 ECWPA, February 2026 (gas, not renewable) |
| Preferred bidder (press only) | Zone 1, 1,100 MW PV, reported August 2026 (medium) |
| Bidding | Zone 2, 500 MW PV (medium); Al-Khairan Phase 1, 1,800 MW (gas, high) |
| Announced or framework | China G2G, 3.5 to 5 GW (low to medium); BESS, 1 to 1.5 GW / 4 to 6 GWh (medium-low) |`,
      },
      {
        kind: "md",
        md: md`### Testing a target in one line

An energy-share target applies to **energy** (TWh), not capacity. The PV capacity it needs is

$P_{RE} = \sigma \, E_{tot} / (CF \times 8760)$

where $\sigma$ is the share, $E_{tot}$ the total annual generation and $CF$ the PV capacity factor. With Track 0's illustrative 84 TWh/yr and CF 0.25: 15 % needs about **5.75 GW**, 30 % about **11.5 GW**. The KAPP pipeline (Phase I + Zones 1 and 2 = 1,670 MW) gives only about 4 % of generation.`,
      },
      {
        kind: "chart",
        chart: "bar",
        title: "Solar capacity: where we are vs what the targets need (MW)",
        xKey: "item",
        yLabel: "MW",
        series: [{ key: "mw", label: "MW" }],
        data: [
          { item: "Solar end-2024 (MEWRE)", mw: 102 },
          { item: "Ph I + Zones 1, 2", mw: 1670 },
          { item: "Plus G2G claim (unverified)", mw: 6470 },
          { item: "Needed for 15 %", mw: 5753 },
          { item: "Needed for 30 %", mw: 11507 },
        ],
        caption: "Illustrative: 84 TWh/yr total generation and a 25 % PV capacity factor (Track 0 assumptions; Phase I counted as PV-equivalent). 15 % by 2030 is reachable only if the unverified G2G track is real, additional and on time.",
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Targets**: 15 % by 2030 (official since 2012); 30/40/50 % by 2030/2040/2050 (stated by MEWRE, adoption unverified); net zero 2060 national, 2050 oil and gas.
- **Shagaya Phase I**: 70 MW = 50 CSP + 10 PV + 10 wind (high); CSP performance after 2019 unknown (low).
- **Zone 1**: 1,100 MW, preferred bidder reported August 2026, tariff unknown (medium). **Zone 2**: 500 MW, two or three bids July 2026 (medium, sources conflict).
- **G2G**: 3.5 to 5 GW framework (March 2025); 4,800 MW by 2028 claimed (low to medium). Never call it "contracted" without a signed agreement.
- **Al-Khairan Phase 1**: 1,800 MW gas IWPP, two bids June 2026 (high). **BESS**: 1 to 1.5 GW / 4 to 6 GWh, first 500 MW summer 2027 (medium-low).`,
      },
    ],
    say: [
      "What is the last confirmed milestone on Zone 1 from an official source, and what is still press-only?",
      "Is the 1,100 MW in MWac at the grid connection or in MWp?",
      "Does the G2G capacity overlap Zones 1 and 2, or is it additional? Is there a signed implementation agreement?",
      "When is the Shagaya to Al-Wafra 400 kV line due, and does it match the IPP's commercial operation date?",
      "Do we have Shagaya Phase I CSP generation data since 2019?",
    ],
    trap: "Adding every number you read into one pipeline total. A framework agreement (the G2G track), a press-reported preferred bidder (Zone 1) and a signed ECWPA (Az-Zour North 2&3) are three very different levels of certainty, and Al-Khairan's 1,800 MW is a gas plant, not solar. Report capacity in tiers: operating, signed, awarded, bidding, announced.",
    check: [
      {
        id: "x-kuwait-pipeline-c1",
        type: "mcq",
        prompt: md`A draft briefing note lists "Al-Khairan 1,800 MW solar". According to Track 0, what is correct?`,
        options: [
          "Al-Khairan Phase 1 is a 1,800 MW gas-fired IWPP; no 1,800 MW Al-Khairan solar project was found",
          "It is Shagaya Phase III Zone 1 under another name",
          "It is the China G2G solar project",
          "It is the national BESS programme",
        ],
        answer: 0,
        explanation: md`The 1,800 MW at Al-Khairan is a thermal IWPP (two bids on 1 June 2026, high confidence). Mixing it into the solar pipeline is a classic error that a register with a confidence column prevents.`,
        concepts: ["m00.pipeline-confidence"],
        difficulty: 1,
      },
      {
        id: "x-kuwait-pipeline-c2",
        type: "numeric",
        prompt: md`Assume total generation of 84 TWh/yr and a PV capacity factor of 0.25. How much PV capacity (MW) is needed to supply **15 %** of the energy?`,
        answer: 5753,
        tolerance: { rel: 0.02 },
        unit: "MW",
        explanation: md`$P = 0.15 \times 84{,}000{,}000\ \text{MWh} / (0.25 \times 8760\ \text{h}) = 12{,}600{,}000 / 2{,}190 \approx 5{,}753$ MW. The tendered KAPP pipeline is 1,670 MW, about 4 % of generation.`,
        concepts: ["m00.target-to-capacity"],
        difficulty: 2,
      },
      {
        id: "x-kuwait-pipeline-c3",
        type: "mcq",
        prompt: md`What is the best one-line status of Shagaya Phase III Zone 1 (1,100 MW) as of October 2026?`,
        options: [
          "Preferred bidder (Masdar + Fouad AlGhanim) reported by MEED; Higher Committee, Audit Bureau and PPA still to come; tariff not reported",
          "PPA signed and financial close reached in 2026",
          "Operating since 2025",
          "Cancelled and folded into the China G2G track",
        ],
        answer: 0,
        explanation: md`The selection is a single trade-press report (medium confidence). Until the Higher Committee and Audit Bureau approve and the PPA is signed, it is not an award.`,
        concepts: ["m00.shagaya-phase3", "m00.pipeline-confidence"],
        difficulty: 1,
      },
    ],
    deeper: ["m00-l04", "m00-l05"],
  },

  // ------------------------------------------------------------------ 4
  {
    id: "x-solar-resource",
    day: 3,
    title: "Sunlight as fuel: GHI, DNI and Kuwait's sun",
    minutes: 12,
    module: "m02",
    hook: "Every PV yield report, every bid tariff and MEWRE's own energy forecast start from one input: how much sunlight lands on the site. When a consultant says \"GHI 2,050\", you need to know what it means, how sure it is, and why an error here outweighs almost any engineering choice downstream.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of rain.

- **How hard it is raining** right now is a rate (millimetres per hour).
- **How much water has collected in a bucket** over a day or a year is a total (millimetres).

Sunlight works the same way. **Irradiance** is the rate: watts per square metre (W/m²), the power of the sunshine at this moment. **Irradiation** is the total: kilowatt-hours per square metre (kWh/m²) over a day or a year, the energy. A clear Kuwaiti noon gives roughly 1,000 W/m²; a whole year adds up to roughly 2,000 kWh/m².

Now picture car headlights in fog. Some light comes **straight from the lamp** in a beam; the rest is **scattered** by the fog and seems to glow from everywhere. Sunlight through Kuwait's dusty air is like that: a direct beam from the sun's disc plus a glow from the whole sky. The dustier the air, the weaker the beam and the brighter the glow.`,
      },
      {
        kind: "chart",
        chart: "area",
        title: "GHI through an illustrative clear June day at Shagaya (W/m²)",
        xKey: "hour",
        xLabel: "Local time",
        yLabel: "W/m²",
        series: [{ key: "ghi", label: "GHI (W/m²)" }],
        data: [
          { hour: "04:00", ghi: 0 },
          { hour: "05:00", ghi: 0 },
          { hour: "06:00", ghi: 122 },
          { hour: "07:00", ghi: 311 },
          { hour: "08:00", ghi: 516 },
          { hour: "09:00", ghi: 709 },
          { hour: "10:00", ghi: 864 },
          { hour: "11:00", ghi: 965 },
          { hour: "12:00", ghi: 1000 },
          { hour: "13:00", ghi: 965 },
          { hour: "14:00", ghi: 864 },
          { hour: "15:00", ghi: 709 },
          { hour: "16:00", ghi: 516 },
          { hour: "17:00", ghi: 311 },
          { hour: "18:00", ghi: 122 },
          { hour: "19:00", ghi: 0 },
          { hour: "20:00", ghi: 0 },
        ],
        caption: "The height of the curve at any moment is irradiance (W/m², the rate: how hard it is raining). The shaded area is irradiation (kWh/m², the bucket): about 8 kWh/m² for this 14-hour day. Shape only, not measured data.",
      },
      {
        kind: "md",
        md: md`### What is actually happening

Above the atmosphere sunlight arrives at about **1,361 W/m²** (the solar constant). Air, water vapour and dust absorb and scatter part of it on the way down. At the ground we measure three components:

- **DNI, direct normal irradiance**: the beam from the sun's disc, on a surface facing the sun squarely. Measured with a pyrheliometer on a sun tracker.
- **DHI, diffuse horizontal irradiance**: scattered skylight on a flat surface, with the sun's disc blocked out.
- **GHI, global horizontal irradiance**: everything landing on a flat surface, beam plus diffuse. The headline resource number, measured with a pyranometer.

They are linked by geometry, because the beam hits a flat surface at a slant:

$GHI = DNI \cos\theta_z + DHI$

where $\theta_z$ is the sun's angle from straight overhead. A station that measures all three can check itself: if the equation does not close within about 5 %, a sensor is dusty or misaligned.

**PV works from GHI.** More precisely, from everything that reaches the tilted or tracking module: beam, diffuse and light reflected off the ground. A flat panel does not care where the light comes from.

**CSP needs DNI.** Mirrors can only focus a parallel beam onto a receiver, the way a magnifying glass can focus sunshine but not the glow of an overcast sky. Diffuse light is useless to CSP, so dust hurts CSP far more than PV.`,
      },
      {
        kind: "flow",
        title: "From the top of the atmosphere to the panel",
        steps: [
          { label: "Top of atmosphere", detail: "About 1,361 W/m²" },
          { label: "Air, water vapour, dust", detail: "Absorb part of the light and scatter part of it" },
          { label: "Direct beam: DNI", detail: "Straight from the sun's disc; dust weakens it" },
          { label: "Scattered skylight: DHI", detail: "Glow from the whole sky; dust brightens it" },
          { label: "GHI on flat ground", detail: "GHI = DNI cos θz + DHI" },
          { label: "Who uses what", detail: "PV: beam, diffuse and ground reflection. CSP mirrors: the beam (DNI) only" },
        ],
        caption: "Dust moves light from the DNI box to the DHI box. PV barely notices; CSP loses it.",
      },
      {
        kind: "md",
        md: md`**The sun's path.** Shagaya is at about 29.3°N. At solar noon the sun stands about **84° high in June, 61° at the equinoxes and 37° in December**. In summer it rises north of east (about 27° north of east on 21 June), sets north of west, and days last about 14 hours. A fixed south-facing panel wastes those summer mornings and evenings; a **single-axis tracker** turning east to west catches them. On a tracker the irradiation on the modules is about 1.22 to 1.28 times GHI.`,
      },
      { kind: "widget", widget: "sun-path", props: { latitude: 29.3, dayOfYear: 172 }, caption: "21 June at 29.3°N: the sun rises north of east. Move the day to 355 (December) and watch the noon height drop to about 37°. Compare tracker and fixed-tilt irradiance." },
      {
        kind: "md",
        md: md`**Kuwait's heat and dust.** GHI peaks in May to July. DNI is held down in late spring and summer by dust and haze (the shamal season), so the beam is weakest relative to GHI when the sun is strongest. Summer afternoons above 45 °C are routine; the record is **53.9 °C at Mitribah on 21 July 2016**. Heat lowers PV output (next explainer) and dust coats the modules (soiling).`,
      },
      { kind: "widget", widget: "kuwait-climate", props: { metric: "ghi" }, caption: "Daily averages by month, in kWh/m² per day (indicative, not bankable). In June GHI is about 8 but DNI below 6: dust holds the beam down exactly when the sun and the heat peak." },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Irradiance**: about 1,000 W/m² at a clear noon (also the STC test level for modules); 1,361 W/m² above the atmosphere.
- **Kuwait GHI ≈ 1,900 to 2,100 kWh/m² per year**: unverified (secondary market report). Official Shagaya GHI and DNI were not retrieved: pull the Global Solar Atlas and request KISR station data.
- **KISR (EuroSun 2014, five Kuwaiti sites)**: satellite GHI agrees reasonably after site adaptation; **satellite DNI diverges significantly** because of aerosols.
- **Tracker** plane-of-array irradiation ≈ 1.22 to 1.28 × GHI. Noon sun at Shagaya ≈ 84° (June), 61° (equinox), 37° (December).
- **Record heat**: 53.9 °C, Mitribah, 21 July 2016 (WMO-verified).`,
      },
    ],
    say: [
      "Which resource dataset and version did you use, and how was it site-adapted to KISR or on-site ground data?",
      "Is the DNI/DHI split in your hourly file measured, or derived from a model?",
      "What POA/GHI ratio does your model give, and does a second transposition model agree?",
      "How many months of on-site data do you have, and how did you treat dust-storm days and cleaning gaps?",
      "For CSP: what ground-measured DNI do you have? Satellite DNI is known to diverge in Kuwait.",
    ],
    trap: "Mixing irradiance and irradiation: 1,000 W/m² is a rate at one moment, 2,000 kWh/m² is a yearly total. And a high GHI does not make a good CSP site: CSP lives on DNI, and Kuwait's dust cuts DNI much more than GHI.",
    check: [
      {
        id: "x-solar-resource-c1",
        type: "mcq",
        prompt: md`Which statement is correct?`,
        options: [
          "PV uses both direct and diffuse light; CSP mirrors can only concentrate the direct beam (DNI)",
          "CSP uses GHI; PV needs DNI",
          "Both PV and CSP use only DNI",
          "Diffuse light is useless to PV",
        ],
        answer: 0,
        explanation: md`Mirrors focus only parallel rays, so CSP depends on DNI. PV converts whatever light reaches the cell, beam or diffuse, which is why GHI (and plane-of-array irradiance) is the PV resource number.`,
        concepts: ["m02.irradiance-components"],
        difficulty: 1,
      },
      {
        id: "x-solar-resource-c2",
        type: "numeric",
        prompt: md`A pyranometer reads a steady 800 W/m² for 3 hours. How much irradiation has the surface received, in kWh/m²?`,
        answer: 2.4,
        tolerance: { abs: 0.05 },
        unit: "kWh/m²",
        explanation: md`Energy = rate × time: $0.8\ \text{kW/m}^2 \times 3\ \text{h} = 2.4$ kWh/m². W/m² is irradiance (a rate); kWh/m² is irradiation (a total).`,
        concepts: ["m02.irradiance-components"],
        difficulty: 1,
      },
      {
        id: "x-solar-resource-c3",
        type: "mcq",
        prompt: md`A CSP bidder's yield for Shagaya rests only on satellite DNI. What does Track 0 tell you?`,
        options: [
          "KISR found satellite DNI diverges significantly from Kuwaiti ground data because of aerosols: ask for ground-measured, site-adapted DNI",
          "Satellite DNI is always more accurate than ground stations in deserts",
          "DNI does not matter for CSP; GHI is enough",
          "Official Shagaya DNI is published and verified, so no check is needed",
        ],
        answer: 0,
        explanation: md`KISR's EuroSun 2014 comparison at five sites found GHI acceptable after site adaptation but DNI estimates diverging significantly. No official Shagaya DNI was retrieved, so ground data are essential, above all for CSP.`,
        concepts: ["m02.solar-resource-data", "m02.kuwait-solar-resource"],
        difficulty: 2,
      },
    ],
    deeper: ["m02-l01"],
  },

  // ------------------------------------------------------------------ 5
  {
    id: "x-pv-how-it-works",
    day: 3,
    title: "How a solar cell makes electricity",
    minutes: 13,
    module: "m02",
    hook: "Bidders will quote module wattages, temperature coefficients and bifacial gains at you from the first tender meeting. In Kuwait, how a module behaves at 70 °C matters more than its rating at 25 °C, and one curve shows you why.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

A solar cell is a pump driven by light. Think of a garden hose connected to that pump.

- **Nozzle wide open**: lots of water flows, but there is no pressure. That is **short circuit**: maximum current ($I_{sc}$), zero voltage.
- **Thumb fully over the end**: full pressure, nothing flows. That is **open circuit**: maximum voltage ($V_{oc}$), zero current.
- Useful work needs both flow and pressure. Somewhere in between is the setting that gives the most power: the **maximum power point**.

More sunlight drives the pump harder: more flow (current). Heat makes the pump leakier: the pressure (voltage) it can hold drops.

Where the analogy breaks: in a real cell the current stays almost constant as voltage rises, then falls off steeply near $V_{oc}$ (the "knee" of the curve). The maximum power point sits just at that knee.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Photons free electrons.** A silicon cell is a large, thin diode. Light arrives as packets of energy (**photons**). A photon with enough energy (more than silicon's **band gap** of 1.12 eV, which means wavelengths below about 1,100 nm) knocks an electron loose. The cell is made of two layers, **p-type** and **n-type** silicon. Where they meet, the **p-n junction**, a built-in electric field sweeps the freed electrons to one side. Connect a load and they flow round the circuit: the **photocurrent**. Photon energy above the band gap ends up as heat, one reason commercial cells convert only about 23 to 26 % of the light (modules about 22 to 23 %).

**The output is DC.** Current flows one way only. A string of modules gives up to 1,500 V DC, and the **inverter** turns it into grid AC (next explainer).`,
      },
      {
        kind: "flow",
        title: "From a photon to grid power",
        steps: [
          { label: "Photon arrives", detail: "Needs more than 1.12 eV (wavelength below about 1,100 nm)" },
          { label: "Electron knocked loose", detail: "Any energy above the band gap becomes heat" },
          { label: "p-n junction field", detail: "Sweeps the freed electrons to one side" },
          { label: "Load connected", detail: "Electrons flow round the circuit: the DC photocurrent" },
          { label: "Strings in series", detail: "Voltages add, up to 1,500 V DC" },
          { label: "Inverter", detail: "Turns DC into three-phase grid AC" },
        ],
        caption: "Light in, one-way current out. Everything before the inverter is DC.",
      },
      {
        kind: "md",
        md: md`**The I-V curve** shows every combination of current and voltage the module can deliver:

- $I_{sc}$ is proportional to sunlight: half the irradiance, half the current.
- $V_{oc}$ barely changes with sunlight but **falls as the cell heats up**.
- At the **maximum power point** (MPP), $V_{mp}$ is about 80 to 84 % of $V_{oc}$ and $I_{mp}$ about 94 to 96 % of $I_{sc}$. The inverter's **MPPT** (maximum power point tracker) hunts for this point all day.
- **Watts-peak (Wp)** on the datasheet are measured at **STC**: 1,000 W/m², 25 °C cell temperature and a standard spectrum (AM1.5). The field is rarely like that.`,
      },
      { kind: "diagram", diagram: "iv-curve", caption: "The hose picture on one curve: Isc is the nozzle wide open, Voc the thumb fully over the end, and the MPP sits at the knee, where current times voltage is largest." },
      {
        kind: "md",
        md: md`**Heat is the enemy.** Every °C of cell temperature above 25 °C costs power, set by the **temperature coefficient** $\gamma$ (in %/°C):

$P = P_{STC} \times \frac{G}{1000} \times [1 + \gamma (T_c - 25)]$

On a Kuwaiti summer afternoon at 50 °C ambient the cell runs at about **70 to 75 °C**. A TOPCon module ($\gamma$ = -0.30 %/°C) at 1,000 W/m² and 72 °C gives $1 - 0.0030 \times 47 \approx 0.86$, so about **86 % of its rating** even in full sun.`,
      },
      { kind: "widget", widget: "iv-curve", props: { irradiance: 1000, temperature: 72 }, caption: "Set to a Kuwaiti summer afternoon (1,000 W/m², cell 72 °C). Slide the temperature back to 25 °C: voltage and power recover, current barely changes. Then drop irradiance to 500 W/m²: current halves, voltage hardly moves." },
      {
        kind: "md",
        md: md`**Module types.**

- **PERC** (p-type): the older workhorse, $\gamma$ about -0.35 %/°C.
- **TOPCon** (n-type): now mainstream, $\gamma$ about -0.30 %/°C.
- **HJT** (heterojunction, n-type): best in heat, $\gamma$ about -0.25 %/°C.

Better passivation of the cell surfaces gives higher voltage and a smaller heat loss, which is why n-type modules dominate Gulf tenders.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Output vs cell temperature at 1,000 W/m² (% of STC rating)",
        xKey: "cell",
        xLabel: "Cell temperature (°C)",
        yLabel: "% of rating",
        series: [
          { key: "perc", label: "PERC (-0.35 %/°C)" },
          { key: "topcon", label: "TOPCon (-0.30 %/°C)" },
          { key: "hjt", label: "HJT (-0.25 %/°C)" },
        ],
        data: [
          { cell: 25, perc: 100, topcon: 100, hjt: 100 },
          { cell: 30, perc: 98.3, topcon: 98.5, hjt: 98.8 },
          { cell: 35, perc: 96.5, topcon: 97, hjt: 97.5 },
          { cell: 40, perc: 94.8, topcon: 95.5, hjt: 96.3 },
          { cell: 45, perc: 93, topcon: 94, hjt: 95 },
          { cell: 50, perc: 91.3, topcon: 92.5, hjt: 93.8 },
          { cell: 55, perc: 89.5, topcon: 91, hjt: 92.5 },
          { cell: 60, perc: 87.8, topcon: 89.5, hjt: 91.3 },
          { cell: 65, perc: 86, topcon: 88, hjt: 90 },
          { cell: 70, perc: 84.3, topcon: 86.5, hjt: 88.8 },
          { cell: 75, perc: 82.5, topcon: 85, hjt: 87.5 },
        ],
        caption: "The lines fan out as the cell heats up. At the 70 to 75 °C of a Kuwaiti summer afternoon, HJT keeps about 4 to 5 points more output than PERC, every sunny day.",
      },
      {
        kind: "md",
        md: md`**Bifacial modules** have a glass rear and also collect light reflected from the ground. Over light desert sand (**albedo**, the share of light reflected, about 0.25 to 0.4) on trackers, they produce about **5 to 9 %** more energy. **Bifaciality** (rear efficiency relative to front) is about 0.70 for PERC, 0.80 for TOPCon and 0.85 to 0.90 for HJT.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **STC**: 1,000 W/m², 25 °C cell, AM1.5. Utility modules ≈ 580 to 720 Wp, ≈ 50 V each, efficiency ≈ 22 to 23 %.
- **Temperature coefficient of power**: PERC ≈ -0.35, TOPCon ≈ -0.30, HJT ≈ -0.25 %/°C.
- **Kuwait summer**: cell ≈ 70 to 75 °C at 50 °C ambient, so a TOPCon module delivers ≈ 82 to 87 % of nameplate in full sun.
- **Fill factor** $P_{mp}/(V_{oc} I_{sc})$ ≈ 0.79: how "square" the I-V curve is.
- **Bifacial gain** ≈ 5 to 9 % on trackers over sand (albedo 0.25 to 0.4).`,
      },
    ],
    say: [
      "What temperature coefficient and which cell-temperature model did you assume at 50 °C ambient?",
      "Is the module PERC, TOPCon or HJT, and is the supplied bill of materials the one that was reliability-tested?",
      "What bifaciality, albedo and rear-shading loss sit behind your bifacial gain? Was the albedo measured on site?",
      "What does the module deliver at 1,000 W/m² and 70 °C, not at STC?",
    ],
    trap: "Assuming a 600 Wp module gives 600 W in Kuwait's full sun. Wp is a laboratory rating at 25 °C; with the cell at 70 to 75 °C it delivers roughly 85 % of that. And remember the directions: more sun means more current (not much more voltage); more heat means less voltage.",
    check: [
      {
        id: "x-pv-how-it-works-c1",
        type: "numeric",
        prompt: md`A 600 Wp TOPCon module ($\gamma$ = -0.30 %/°C) is in full sun (1,000 W/m²) with a cell temperature of 70 °C. Roughly what power (W) does it produce?`,
        answer: 519,
        tolerance: { abs: 3 },
        unit: "W",
        explanation: md`$P = 600 \times 1 \times [1 - 0.0030 \times (70 - 25)] = 600 \times 0.865 = 519$ W. Heat alone takes about 13.5 % off the nameplate.`,
        concepts: ["m02.temperature-coefficient"],
        difficulty: 2,
      },
      {
        id: "x-pv-how-it-works-c2",
        type: "mcq",
        prompt: md`Irradiance falls from 1,000 to 500 W/m² while the cell temperature stays the same. What happens to the I-V curve?`,
        options: [
          "Current roughly halves; voltage drops only slightly",
          "Voltage halves; current stays the same",
          "Both current and voltage halve",
          "Nothing changes until irradiance falls below 200 W/m²",
        ],
        answer: 0,
        explanation: md`$I_{sc}$ is proportional to irradiance, while $V_{oc}$ grows only logarithmically with it. Power therefore falls roughly in proportion to irradiance.`,
        concepts: ["m02.iv-parameters"],
        difficulty: 1,
      },
      {
        id: "x-pv-how-it-works-c3",
        type: "decision",
        prompt: md`A bidder claims a **15 % bifacial gain** for a tracker plant on Kuwaiti sand using TOPCon modules. What do you do?`,
        options: [
          { text: "Accept it: bifacial modules are proven technology.", score: 0.1, feedback: "Bifacial technology is proven, but the gain depends on albedo, height, rear shading and bifaciality. 15 % is well above the typical 5 to 9 %." },
          { text: "Ask for the bifaciality, albedo (measured or assumed), rear-shading and rear-mismatch assumptions, and compare the result with the typical 5 to 9 % for trackers over sand.", score: 1, feedback: "Correct: you test the claim against its inputs and a benchmark instead of accepting or rejecting it blind." },
          { text: "Reject the bid for overstating its yield.", score: 0.2, feedback: "Too early. Ask for the assumptions first; the bid may still be competitive with a realistic gain." },
          { text: "Ignore bifacial gain for every bidder in the evaluation.", score: 0.3, feedback: "That hides a real, valuable gain of 5 to 9 % and does not resolve the inflated claim." },
        ],
        explanation: md`Bifacial gain over desert sand on trackers is typically 5 to 9 % (TOPCon bifaciality about 0.80, albedo 0.25 to 0.4). Larger claims need justified inputs, ideally measured albedo.`,
        concepts: ["m02.bifacial-gain"],
        difficulty: 2,
      },
    ],
    deeper: ["m02-l02", "m02-l03"],
  },

  // ------------------------------------------------------------------ 6
  {
    id: "x-pv-plant-anatomy",
    day: 3,
    title: "A utility PV plant from module to grid",
    minutes: 13,
    module: "m02",
    hook: "When you open a Zone 1-type design submittal you will see single-line diagrams, inverter blocks, DC/AC ratios and tracker layouts. This is the map: what each box does, which ratings matter and where a PM asks questions.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a river system. Thousands of small springs feed little streams; streams join into creeks, creeks into a river, and the river reaches the sea through a wide estuary.

- **Modules** are the springs. Wired one after another in **series** they form a **string**: like batteries stacked in a torch, the voltages add.
- Strings wired side by side in **parallel** add their currents, in a combiner box or directly at an inverter.
- The **inverter** is a currency exchange counter: DC comes in, grid-quality AC goes out.
- **Transformers** raise the voltage step by step (33 kV, then 132 or 400 kV) so the power can travel far with little loss: the river widening into the estuary.

One more idea, the most debated one: designers deliberately install **more DC (modules) than AC (inverters)**. Picture an exchange counter sized for a normal busy hour rather than the single busiest minute of the year. At the very peak a few customers are turned away (**clipping**), but the counter is busy all day and you paid for a smaller one.`,
      },
      { kind: "diagram", diagram: "pv-plant", caption: "The river on one drawing: modules (springs) join into strings, strings meet at combiners, the inverter changes DC into AC, then the MV and HV transformers widen the flow toward the grid." },
      {
        kind: "md",
        md: md`### What is actually happening

**The power path.**

1. **Modules**: about 580 to 720 Wp and about 50 V each.
2. **Strings** of 27 to 30 modules in series, up to **1,500 V DC**, about 15 to 20 kWp each. The coldest morning sets the maximum length (voltage rises in the cold); the hottest afternoon sets the minimum (voltage must stay inside the inverter's MPPT window).
3. **Combiner boxes** parallel the strings with fuses (central design), or strings land directly on **string inverters**.
4. **Inverters** convert DC to three-phase AC.
   - **Central**: 3 to 5 MVA per unit on a skid. Lowest cost per watt at GW scale, but one fault takes 3 to 5 MW down.
   - **String**: 250 to 350 kW each, spread across the field. More MPPT inputs (less mismatch); a fault costs about 0.3 MW and the unit is swapped in hours.
   Both are bankable. In Kuwait the choice turns on heat derating (full power typically up to 35 to 45 °C ambient, then down to about 80 to 90 % at 50 °C, OEM-specific), dust filters and in-country service.
5. **MV skid**: inverter(s) plus a step-up transformer to **33 kV** plus a ring main unit (RMU, the MV switchgear), about 4 to 7 MVA per block.
6. **33 kV collector cables**, buried, loop back to the **collector substation**.
7. The **HV transformer** steps up to 132 or 400 kV at the **point of interconnection**. Zone 1's scope includes a **400 kV substation**; the Shagaya to Al-Wafra 400 kV line is a separate MEWRE contract, a classic interface risk.`,
      },
      { kind: "widget", widget: "pv-sld", caption: "Click each box from module to grid: role, typical rating and the PM checks. Notice where DC becomes AC and where the voltage steps up." },
      {
        kind: "md",
        md: md`**Central or string, at a glance.**

| | Central inverter | String inverter |
|---|---|---|
| Unit size | 3 to 5 MVA on a skid | 250 to 350 kW, spread across the field |
| Cost per watt at GW scale | Lowest | Higher |
| Output lost when one unit fails | 3 to 5 MW | About 0.3 MW |
| After a fault | Repaired in place | Swapped in hours |
| MPPT inputs | Fewer | More (less mismatch) |
| Kuwait questions (both) | Heat derating, dust filters, in-country service | Heat derating, dust filters, in-country service |

**DC/AC ratio.**

$\text{DC/AC} = P_{DC,STC} / P_{AC,rated}$

that is, module nameplate (MWp) divided by inverter AC rating (MWac). Typical values are **1.15 to 1.40**. Real DC output rarely reaches nameplate (heat, dust and wiring keep it to about 80 to 90 % at best), so a 1:1 inverter would rarely run at full output. At 1.30 the clipped energy is about 3 % on a clear day and 0.5 to 3 % over a year. Since the grid connection is contracted in MWac, a little clipping is the price of using that connection for more hours.`,
      },
      { kind: "widget", widget: "dc-ac-ratio", props: { ratio: 1.3 }, caption: "Clear-sky day at DC/AC 1.3: the flat top is clipped energy. Push the ratio to 1.5 and back to 1.1 to see the trade between clipped energy and inverter cost." },
      {
        kind: "md",
        md: md`**Trackers vs fixed tilt.** A **single-axis tracker** turns rows from east to west (about ±52° to ±60°) on a north-south axis. At 29°N, with the summer sun rising north of east, it gains about **15 to 25 %** more energy than fixed tilt, for a few US cents per Wp more. At low sun it **backtracks** (rotates back toward flat) so rows do not shade each other, and in high wind it **stows**. The ground coverage ratio (GCR, module width divided by row spacing) is typically 0.28 to 0.40.`,
      },
      { kind: "widget", widget: "sun-path", props: { latitude: 29.3, dayOfYear: 172 }, caption: "21 June at Shagaya: compare the tracker and fixed-tilt irradiance curves. The tracker's extra energy sits in the morning and late afternoon, when the sun is north of east or west. A clear June day shows a gain well above the annual 15 to 25 %; move to December (day 355) and the gain disappears, because a south-facing fixed tilt suits the low winter sun. The year averages the two." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **MWp vs MWac**: MWp is DC module nameplate; MWac is inverter or grid export capacity. 1,000 MWac at DC/AC 1.3 means 1,300 MWp. Quote capacity at the peak hour in MWac.
- **Strings**: 27 to 30 modules at 1,500 V DC. **Inverters**: string 250 to 350 kW, central 3 to 5 MVA; MV blocks 4 to 7 MVA at 33 kV.
- **DC/AC** 1.15 to 1.40; annual clipping 0.5 to 3 %.
- **Trackers**: +15 to 25 % energy vs fixed tilt; GCR 0.28 to 0.40.
- **Inverter heat derating**: full power to 35 to 45 °C ambient, about 80 to 90 % at 50 °C (check the OEM curve).`,
      },
    ],
    say: [
      "What is the plant's guaranteed export in MWac at the point of connection at 50 °C ambient?",
      "What DC/AC ratio did you choose, what annual clipping does the model show, and why is that the optimum?",
      "Which inverter derating curve did you use at 50 and 55 °C, and is it in the yield model?",
      "Central or string inverters: what spares and OEM service are in Kuwait, and what availability is guaranteed?",
      "At what wind speed do the trackers stow, and what do they do if they lose communications?",
    ],
    trap: "Treating MWp and MWac as the same thing. A 1,300 MWp array on 1,000 MWac of inverters can never export more than about 1,000 MW. Clipping is a deliberate design choice, not a defect, as long as it was modelled and optimised.",
    check: [
      {
        id: "x-pv-plant-anatomy-c1",
        type: "numeric",
        prompt: md`A 500 MWac plant is designed with a DC/AC ratio of 1.3. How much module capacity (MWp) is installed?`,
        answer: 650,
        tolerance: { abs: 1 },
        unit: "MWp",
        explanation: md`$P_{DC} = 1.3 \times 500 = 650$ MWp. The extra 150 MWp raises output in the mornings, evenings and hazy hours; at midday on clear days the inverters clip at 500 MWac.`,
        concepts: ["m02.dc-ac-ratio"],
        difficulty: 1,
      },
      {
        id: "x-pv-plant-anatomy-c2",
        type: "mcq",
        prompt: md`Which is a real advantage of string inverters over central inverters?`,
        options: [
          "A single failure takes only about 0.3 MW offline and the unit can be swapped in hours",
          "They always have the lowest cost per watt at GW scale",
          "They are not affected by dust or heat",
          "They remove the need for MV transformers",
        ],
        answer: 0,
        explanation: md`String inverters (250 to 350 kW) limit the impact of a fault and are replaced rather than repaired. Central inverters are usually cheapest per watt at GW scale, but one fault costs 3 to 5 MW. Both need MV transformers and both suffer heat derating.`,
        concepts: ["m02.inverter-architecture"],
        difficulty: 1,
      },
      {
        id: "x-pv-plant-anatomy-c3",
        type: "mcq",
        prompt: md`Why do single-axis trackers gain about 15 to 25 % energy over fixed tilt in Kuwait?`,
        options: [
          "In summer the sun rises north of east and sets north of west; a tracker turning east to west faces the morning and evening sun that a fixed south-facing array wastes",
          "They point the modules north in summer",
          "They cool the cells by about 25 °C",
          "They stop dust settling on the modules",
        ],
        answer: 0,
        explanation: md`At 29°N the long summer days and north-of-east sunrise favour tracking. The extra energy arrives in the morning and late afternoon, which also fits Kuwait's long afternoon load.`,
        concepts: ["m02.tracker-vs-fixed"],
        difficulty: 1,
      },
    ],
    deeper: ["m02-l04", "m02-l05"],
  },

  // ------------------------------------------------------------------ 7
  {
    id: "x-pv-losses-yield",
    day: 3,
    title: "Where the MWh go: losses, PR and P50/P90",
    minutes: 14,
    module: "m02",
    hook: "The yield report sets the tariff bidders offer, how much debt the plant can carry and the energy MEWRE plans around for 30 years. You do not need to run PVsyst, but you must be able to read its loss diagram and say why a number looks too good.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of your salary.

- Your **gross salary** is the sunlight landing on the site.
- Each line on the payslip takes a little: social security, a loan instalment, insurance. Each is small; together they matter.
- **Take-home pay** is the energy that reaches the grid.

The **performance ratio** is take-home pay divided by what you would have received with no deductions. It tells you how well the plant turns the sunlight it actually got into energy, whatever the weather that year.

Now the bonus. You expect roughly the usual amount, but it varies. **P50** is the figure you have a 50:50 chance of beating. **P90** is the figure you are 90 % sure to beat. A bank lending you money looks at P90, not P50.

Where the analogy breaks: payslip deductions are subtracted from the gross; plant losses multiply, each a percentage of what is left. At these sizes the difference is small, but that is how the yield model works.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A yield model (usually **PVsyst**) runs hour by hour through a typical year and draws a **loss waterfall** from sunlight to grid energy. Typical values for a tracker plant with bifacial TOPCon modules in a Kuwait-like climate (illustrative):

- **Gains first**: tracking raises the irradiation on the modules by about 22 to 28 % over GHI; the bifacial rear adds about 5 to 8 %.
- **Temperature: about 7 to 10 %**, the largest single loss in Kuwait.
- **Soiling** (dust on the glass): about 2 to 5 % with a good cleaning regime. It rises fast if cleaning slips: Kuwaiti test studies saw 8.7 to 15.1 % with only monthly cleaning.
- **Angle of incidence (IAM)**: 1.5 to 2.5 %. **Shading and backtracking**: 0.5 to 1.5 %.
- **Mismatch**: 0.7 to 1.5 %. Modules in a string are never identical, and the weakest drags the rest.
- **DC cables** 1 to 1.5 %; **inverter efficiency** 1.2 to 2 %; **clipping** 0.5 to 3 %; **AC cables and transformers** 1 to 2 %; **unavailability** 0.5 to 1.5 %.`,
      },
      { kind: "widget", widget: "loss-waterfall", caption: "Defaults are a Kuwait-like tracker plant. Set GHI to 2,050 kWh/m², then raise temperature to 10 % and soiling to 5 %: watch the PR and specific yield fall." },
      { kind: "widget", widget: "soiling", caption: "Soiling on its own: the sawtooth is dust building up day by day and dropping to zero at each cleaning. Raise the soiling rate (a shamal week) and see the optimal cleaning interval shorten and the lost energy grow." },
      {
        kind: "md",
        md: md`**Performance ratio (PR)**:

$PR = Y_f / Y_r$

The **final yield** $Y_f$ is the kWh exported per kWp installed. The **reference yield** $Y_r$ is the irradiation on the module plane in kWh/m² divided by 1 kW/m²: the number of hours of "full STC sun". Kuwait tracker plants: PR about **0.78 to 0.84** on a front-side basis. Bifacial gain inflates PR, so always check which definition is used.

**Specific yield** (kWh per kWp per year) is the number bidders compete on. Plausible for Kuwait trackers: about **2,000 to 2,300 kWh/kWp**. Claims of 2,300 to 2,500 are optimistic and unverified for Shagaya.

**P50 and P90.** Every input is uncertain: the long-term sunlight estimate (4 to 6 % without site data, 2.5 to 3.5 % with 12 months of site-adapted data), the model, soiling, availability and year-to-year weather (2.5 to 4 %). Combining the mid-range values of Track 0's table gives a total of about 6 % with good site data and 7 to 8 % without. Assuming a normal distribution, **P90 sits 1.28 standard deviations below P50**: at 6 % uncertainty, about 7.7 % below.`,
      },
      { kind: "widget", widget: "p50-p90", props: { p50: 2400, sigma: 6 }, caption: "An illustrative plant with P50 = 2,400 GWh/yr. Move σ from 4 % to 8 % and watch P90 drift away from P50: that gap is lost debt capacity." },
      {
        kind: "md",
        md: md`**Why lenders care.** Debt is sized so that cash flow in a **P90 (or P99) year** still covers debt service with a margin (the DSCR covenant, for example 1.20 to 1.30×). Lower uncertainty means a higher P90, more debt, less equity and a **lower tariff for MEWRE**. That is why a ground measurement station installed a year before the tender pays for itself.`,
      },
      {
        kind: "flow",
        title: "How a ground station lowers MEWRE's tariff",
        steps: [
          { label: "Site data before the tender", detail: "12 months of site-adapted measurements" },
          { label: "Resource uncertainty falls", detail: "From 4 to 6 % to 2.5 to 3.5 %" },
          { label: "P90 moves up toward P50", detail: "Total uncertainty about 6 % instead of 7 to 8 %" },
          { label: "More debt", detail: "Same DSCR covenant (1.20 to 1.30×) on a higher P90 cash flow" },
          { label: "Less equity", detail: "Cheaper money funds more of the plant" },
          { label: "Lower tariff", detail: "Bidders can offer MEWRE a lower price" },
        ],
        caption: "Each box causes the next. The station is cheap; the tariff it lowers runs for 30 years.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Losses**: temperature 7 to 10 % (largest); soiling 2 to 5 % (insist on site data); inverter 1.2 to 2 %; clipping 0.5 to 3 %.
- **PR**, Kuwait trackers ≈ 0.78 to 0.84 (front-side). **Specific yield** ≈ 2,000 to 2,300 kWh/kWp plausible; 2,300 to 2,500 optimistic (unverified).
- **Exceedance**: $P_{90} = P_{50}(1 - 1.282\,\sigma)$; P99 uses 2.326. 1-year P90 for liquidity reserves, 10-year P90 for debt sizing.
- **DSCR** covenants ≈ 1.20 to 1.30× on P90 or P99 cash flow.
- **Sanity check**: specific yield ≈ GHI × (POA/GHI) × PR, e.g. 2,100 × 1.25 × 0.82 ≈ 2,150 kWh/kWp.`,
      },
    ],
    say: [
      "Which PR definition is this: front-side or including rear irradiance, temperature-corrected or not?",
      "Which soiling profile did you assume month by month, and what cleaning frequency and water source does it imply?",
      "Show me the uncertainty table: which components, and is the year-to-year term for 1 year or 10 years?",
      "Your specific yield is 2,450 kWh/kWp: which GHI, POA/GHI ratio and PR get you there?",
      "On which P-value and DSCR did the lenders size the debt?",
    ],
    trap: "Thinking P90 is a pessimistic scenario someone picked. It is a statistical level computed from the uncertainty: a 90 % chance that the year's energy beats it. And a high PR is not automatically good news: bifacial gain or a generous irradiance basis can inflate it.",
    check: [
      {
        id: "x-pv-losses-yield-c1",
        type: "numeric",
        prompt: md`A plant's P50 is 1,000 GWh/yr with a combined uncertainty of 7 % (1σ). Using z = 1.282, what is the P90 in GWh/yr?`,
        answer: 910.3,
        tolerance: { abs: 2 },
        unit: "GWh",
        explanation: md`$P_{90} = 1{,}000 \times (1 - 1.282 \times 0.07) = 1{,}000 \times 0.9103 = 910.3$ GWh/yr. Cutting the uncertainty to 5 % would raise P90 to about 936 GWh/yr, and with it the debt the plant can carry.`,
        concepts: ["m02.p50-p90"],
        difficulty: 2,
      },
      {
        id: "x-pv-losses-yield-c2",
        type: "mcq",
        prompt: md`In a PV yield report for a Kuwaiti site, which single loss is usually the largest?`,
        options: ["Temperature (about 7 to 10 %)", "Inverter efficiency", "DC cable losses", "Module mismatch"],
        answer: 0,
        explanation: md`With cells at 70 to 75 °C on summer afternoons, the temperature loss is about 7 to 10 % of annual energy. Inverter, DC cable and mismatch losses are each around 1 to 2 %.`,
        concepts: ["m02.loss-tree"],
        difficulty: 1,
      },
      {
        id: "x-pv-losses-yield-c3",
        type: "decision",
        prompt: md`For the same Shagaya site and tracker design, bid A claims 2,480 kWh/kWp and bid B claims 2,150 kWh/kWp. What is your move?`,
        options: [
          { text: "Rank A higher: more energy per kWp means a better plant.", score: 0, feedback: "The claim may simply rest on optimistic inputs. Energy that never arrives still has to be paid for in a stressed project company." },
          { text: "Ask both for their yield reports and check GHI, POA/GHI, PR, soiling and the uncertainty table against an independent check; flag A as optimistic until justified.", score: 1, feedback: "Correct. 2,480 is above the plausible 2,000 to 2,300 band for Kuwait trackers; the inputs will show why." },
          { text: "Average the two figures for both bids.", score: 0.2, feedback: "That hides the problem instead of finding it." },
          { text: "Disqualify bid A immediately.", score: 0.3, feedback: "Premature. First find which assumption drives the gap; it may be fixable through clarification." },
        ],
        explanation: md`Check the claim with specific yield ≈ GHI × (POA/GHI) × PR. Reaching 2,480 needs GHI near 2,300 kWh/m² or an unusually high PR, neither verified for Shagaya.`,
        concepts: ["m02.yield-review", "m02.performance-ratio"],
        difficulty: 2,
      },
    ],
    deeper: ["m02-l06", "m02-l05"],
  },
];
