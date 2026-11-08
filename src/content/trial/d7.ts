import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 7 · Operations, the ministry and AI at work (Modules 12 to 14), before the rehearsal. */
export const D7: Explainer[] = [
  // ------------------------------------------------------------------ 1. O&M KPIs
  {
    id: "x-om-kpis",
    day: 7,
    title: "Running a plant: availability, PR and what the monitoring tells you",
    minutes: 11,
    module: "m12",
    hook: "Once a Shagaya plant reaches commercial operation, MEWRE stops building and starts buying its energy for 25 to 30 years. The monthly KPI report is where you see whether you are getting what you pay for, and where the plant operator can quietly hide losses if you do not know how to read it.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a delivery fleet. The boss asks two questions every month:

- **Were the vans on the road?** A van in the workshop delivers nothing. That is **availability**.
- **When they were on the road, did they deliver what the traffic allowed?** A van that crawls along with the handbrake half on is "available" but still underperforms. That is the **performance ratio (PR)**.

You would not compare January with July without allowing for traffic. In the same way you never judge a solar plant on raw energy: a cloudy, dusty or very hot month produces less. You compare **actual energy with the energy expected for the weather that actually happened**.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

The plant's **monitoring system (SCADA)** logs irradiance on the modules, module and air temperature, inverter and meter energy and every alarm, typically every few minutes. From that you build a handful of KPIs (the definitions come from **IEC 61724-1**):

- **Specific yield** $Y_f$: kWh delivered per kWp installed. The best single number to compare plants.
- **Reference yield** $Y_r$: the sunshine on the modules, in "hours of 1 kW/m²".
- **Performance ratio**: $PR = Y_f / Y_r$. It captures everything between sunlight on the glass and energy at the meter: heat, dust, cables, inverters, downtime, curtailment.
- **Temperature-corrected PR** strips out the summer heat effect, so a falling trend means a sick plant, not a hot month.
- **Availability**: the share of the time (or of the possible energy) the plant could generate. **Time-based** counts hours. **Energy-based** weights each outage by the energy it lost, so an inverter down at noon in July counts far more than one down at 7 am in January. Contracts should use energy-based availability.
- **Exclusions**: grid curtailment ordered by the National Control Centre, declared force majeure, agreed night maintenance. Each must be **evidenced** (NCC logs, set-point records), never just declared.

**Data first.** Every normalised KPI divides by irradiance. In Kuwait, dust on the sensor dome is the main source of error: a sensor reading 3 % low makes PR look 3 % better and hides underperformance. Ask for sensor cleaning and calibration logs before you believe any PR.

**Root cause analysis in one paragraph.** When energy is below expected, work top-down: validate the data, compare the plant with the weather-adjusted model, remove the evidenced exclusions, compare blocks and inverters with each other (one outlier means a local fault; a uniform shortfall means a plant-wide cause such as soiling, a sensor or degradation), drill down to strings and trackers, check in the field (drone thermography, IV curves), then find the root cause with **5 Whys** or a **fishbone** diagram, fix it and confirm the energy came back. Each loss has a **signature**: a flat top at inverter rating on a cool clear day is clipping (designed); a plateau at a set-point during an NCC instruction is curtailment; a slow decline that recovers after cleaning or rain is soiling.`,
      },
      {
        kind: "widget",
        widget: "pr-correction",
        caption: "Watch basic PR sag every summer from heat alone, while the temperature-corrected PR stays flat and shows the real problem: the soiling sawtooth between cleanings.",
      },
      {
        kind: "md",
        md: md`### What a good monthly O&M report shows

Senior officials need four answers: **Are we delivering? Why not? What is being done? What do you need from me?** A good report is 1 to 2 pages plus an annex:

- **Headline**: energy vs weather-adjusted expected and vs P50, and the contribution at summer peak hours.
- **KPIs**: PR raw and temperature-corrected, energy-based availability, curtailment, BESS availability and efficiency.
- **Losses**: top 5 in MWh, each with an owner and an action.
- **Incidents**: safety, equipment failures, grid events.
- **Contract**: availability LDs, curtailment and deemed-energy claims, warranty claims.
- **Decisions needed**: for example approval of a spares budget.

Definitions must match the PPA and O&M contract, and a KPI basis must never change silently.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Annual PR** of a desert tracker plant: about **0.78 to 0.83**, lower in summer (heat), higher in winter.
- **Availability guarantee**: energy-based **99 % per year** is common; real plants run above 99 %.
- **Specific yield** for Kuwaiti bifacial tracker plants: roughly **2,000 to 2,300 kWh/kWp/yr** (indicative; the long-term Shagaya resource is not yet verified).
- **Capacity factor**: about **30 to 34 % on AC**, 23 to 26 % on DC. Always say which.
- **Inverter sum vs revenue meter**: normally differ by about **1.5 to 2.5 %** (cable and transformer losses). Data completeness should be **at least 98 %**.`,
      },
    ],
    say: [
      "Is this PR raw or temperature-corrected, with or without curtailment, and against which irradiance sensors?",
      "When were those sensors last cleaned and calibrated, and do they agree with the satellite data?",
      "Is availability energy-based over daylight hours, and what is the evidence for each excluded event?",
      "Which inverters and blocks are in the bottom 10 % by specific yield, and what did the field check find?",
      "What are the top five losses in MWh this month, who owns each, and when will we see the recovery?",
    ],
    trap: "Reading a high PR or a high availability as good news without checking the basis. A dirty irradiance sensor inflates PR, and time-based availability counted over 24 hours (nights always look \"available\") or with undocumented exclusions inflates availability. Always ask for the definition, the raw figure and the evidence before praising or penalising anyone.",
    check: [
      {
        id: "x-om-kpis-c1",
        type: "numeric",
        prompt: md`A 100 MWp plant exports **16,000 MWh** in a month. The cleaned irradiance sensors measured **200 kWh/m²** on the module plane. What is the performance ratio?`,
        answer: 0.8,
        tolerance: { abs: 0.01 },
        unit: "ratio",
        explanation: md`$Y_f = 16{,}000{,}000\ \text{kWh} / 100{,}000\ \text{kWp} = 160$ kWh/kWp. $Y_r = 200 / 1 = 200$ h. $PR = 160 / 200 = 0.80$.`,
        concepts: ["m12.performance-ratio"],
        difficulty: 1,
      },
      {
        id: "x-om-kpis-c2",
        type: "mcq",
        prompt: md`In August the contractor reports PR **0.86**, higher than in winter, and the irradiance sensors read below the satellite estimate. What is the most likely explanation?`,
        options: [
          "Dirty or drifting sensors are under-reading irradiance, which inflates PR",
          "The plant performs better in the heat",
          "Curtailment raised the PR",
          "The modules have finished degrading",
        ],
        answer: 0,
        explanation: md`Heat lowers PR, so a summer PR above winter is a physics red flag. A sensor reading low shrinks the reference yield, so PR = Yf/Yr goes up and underperformance disappears. Check the cleaning and calibration logs.`,
        concepts: ["m12.data-quality", "m12.performance-ratio"],
        difficulty: 2,
      },
      {
        id: "x-om-kpis-c3",
        type: "mcq",
        prompt: md`Two plants each lose 30 inverter-hours in a month. Plant A's outages are at midday in July; Plant B's are at dawn in January. Which availability measure shows Plant A as worse?`,
        options: ["Energy-based availability", "Time-based availability", "Both show them equal", "Neither: availability ignores outages"],
        answer: 0,
        explanation: md`Time-based availability counts hours, so both look the same. Energy-based availability weights each outage by the energy lost, and midday July loses far more. That is why contracts should specify energy-based availability.`,
        concepts: ["m12.availability"],
        difficulty: 1,
      },
    ],
    deeper: ["m12-l01", "m12-l02", "m12-l05"],
  },

  // ------------------------------------------------------------------ 2. O&M contracts and warranty
  {
    id: "x-om-contracts-warranty",
    day: 7,
    title: "O&M contracts, spares, cleaning and warranty claims",
    minutes: 12,
    module: "m12",
    hook: "Most value lost over a plant's life is lost quietly in operations: slow repairs, missing spares, dust left on the glass, warranty claims never filed. The O&M contract and the warranties are the tools that make someone pay for those losses, and you will be asked whether they are strong enough.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a car you will drive for 30 years in the desert.

- The **service contract** says who changes the filters, how fast a breakdown is fixed, and what the garage pays you if the car sits in the workshop too long.
- The **spare parts** decide whether a breakdown costs a day or two months.
- **Washing** costs money every time, but a dirty windscreen costs you something every day. There is a sweet spot.
- The **manufacturer's warranty** pays for a faulty part, but only if you kept the service records and claimed in time. It never pays for the trips you missed while the car was broken.

A solar plant works the same way, at a scale of millions of modules and thousands of inverters.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**O&M scope.** An O&M contract (or the IPP's own O&M under the PPA) covers: monitoring and control room, **preventive maintenance** (calendar based: filters, torque checks, transformer oil, pre-summer HVAC service), **corrective maintenance** (fix on failure), **condition-based maintenance** (act on a measured trend such as filter pressure drop or transformer gas analysis), cleaning, spares, security, reporting, and a **CMMS** (the maintenance database: work orders, failures, spares, warranty records). The owner must have access to the CMMS and SCADA; without it, availability and warranty claims cannot be audited.

**Availability guarantee and LDs.** The contractor guarantees, say, 99 % energy-based availability. Below that, it pays **liquidated damages (LDs)**: usually the shortfall energy times the tariff times a multiplier, capped at a share of the annual fee. With Gulf solar tariffs this low, energy-valued LDs are small, so good contracts add bonus/malus bands or higher multipliers to keep the incentive real.

**Spares.** Failures during the resupply lead time follow a Poisson pattern with mean $\mu = N \lambda L$ (fleet size times annual failure rate times lead time in years). Stocking only the average gives roughly a 63 % chance of not running out: a stock-out more than one time in three. Stock for 95 to 99 %. **Strategic** spares (main transformer) are shared or covered by an OEM agreement; **critical** spares (inverter power modules, tracker controllers, BESS modules) sit on site.

**Cleaning in dust.** Soiling loss grows each day after a cleaning; each cleaning costs money. The optimum is where daily cleaning cost equals daily lost-energy value. The catch for MEWRE: the **value of energy differs by stakeholder**. The IPP values it at its low tariff; the ministry values it at avoided fuel and peak reliability. So the IPP's best interval is longer than the ministry's, and the PPA or O&M regime (PR guarantee, cleaning standard) must close that gap. In winter, **dew cements dust** onto the glass, so dry robots alone are not enough.

**Warranties and degradation.** Modules lose power over time: a first-year drop, then a slow linear decline (field median around **0.5 %/yr**, higher in hot climates). The **power warranty** promises a minimum, for example at most 1 % loss in year 1 and 0.4 %/yr after. A claim needs: notice within the time limit, serial numbers, a random sample, flash tests at an **ISO/IEC 17025** lab corrected to STC, proof of correct O&M, and chain of custody. Watch the **measurement tolerance** (often 3 %): does it only decide eligibility, or is it subtracted from what you are paid? And remember warranties exclude **consequential loss**: the lost energy is never refunded.`,
      },
      {
        kind: "widget",
        widget: "degradation",
        props: { rate: 0.8 },
        caption: "At 0.8 %/yr (hot-climate degradation) the expected curve falls further below the dashed warranty line every year. Set the expected first-year loss to 1 % and the rate to 0.4 %/yr to see a plant that just meets its warranty. Either way, a claim needs baseline flash tests and clean monitoring data to prove it.",
      },
      {
        kind: "md",
        md: md`### A worked claim in four lines

A batch of 120,000 modules of 600 Wp, in year 6, with the warranty above:

- Warranted power: $1 - 0.01 - 0.004 \times 5 = 97.0$ %.
- Valid if measured below 97.0 − 3.0 = 94.0 %. The lab sample averages **93.2 %**: claim valid.
- Refund of the full 3.8 % shortfall at USD 0.11/Wp: about **USD 301 k**. If only the part beyond the tolerance (0.8 %) is paid: about **USD 63 k**.
- The energy lost over the remaining 24 years is worth around **USD 2 m** (at an illustrative USD 14/MWh). So push for **replacement** when degradation is progressive, and negotiate the tolerance wording at procurement.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Availability guarantee**: energy-based **≥ 99 %/yr**; LDs capped at a share of the annual O&M fee (20 % in the Track 0 example).
- **Module power warranty** (n-type): about **1 % in year 1, then 0.4 %/yr**, so **≥ 87.4 % at year 30**. Older PERC: 2 % then 0.55 %/yr. Product warranty 12 to 15 years; inverters 5 to 10 years, extendable.
- **Cleaning interval** for a 1 GW plant (illustrative inputs, USD 130 k per wet cleaning cycle, 0.4 %/day soiling): about **25 days** at a USD 14/MWh tariff, about **12 days** at a USD 55/MWh avoided-fuel value.
- **Kuwait soiling** (Track 0 sources): about **17 % loss after 6 days** in one dust event; **8.7 to 15.1 %** losses with monthly cleaning, depending on season.
- **Inverter replacement** around year 12 to 15; staffing about 50 to 80 technical staff per GW, plus cleaning and security crews.`,
      },
    ],
    say: [
      "Is the availability guarantee energy-based, which exclusions are allowed, and is the LD large enough to change the contractor's behaviour?",
      "What service level is the critical spares stock sized for, and what is the lead time for a main transformer?",
      "Which cleaning interval does the contract require, and was it optimised at the tariff or at the ministry's value of energy?",
      "Do we have baseline flash tests and serial numbers, so that a degradation claim can actually be proven?",
      "In the module warranty, is the measurement tolerance used only for eligibility, or deducted from the remedy?",
    ],
    trap: "Assuming a warranty claim makes the owner whole. Warranties exclude lost energy, and a tolerance deducted from the remedy can cut the payout by three quarters. The real protection is in the O&M and procurement terms: replacement as the remedy for progressive defects, owner access to the data, and an availability and performance regime that makes the operator care about every MWh.",
    check: [
      {
        id: "x-om-contracts-warranty-c1",
        type: "numeric",
        prompt: md`A module power warranty allows **1 %** loss in year 1, then **0.4 %/yr**. What is the warranted power in **year 10**, as % of nameplate?`,
        answer: 95.4,
        tolerance: { abs: 0.05 },
        unit: "%",
        explanation: md`$100 - 1 - 0.4 \times 9 = 95.4$ %. Year 1 takes the first-year loss; years 2 to 10 add nine annual steps.`,
        concepts: ["m12.warranty-claim", "m12.degradation"],
        difficulty: 1,
      },
      {
        id: "x-om-contracts-warranty-c2",
        type: "mcq",
        prompt: md`The IPP cleans every 25 days, which is optimal at its tariff. Why might MEWRE want cleaning more often?`,
        options: [
          "MEWRE values the lost energy at avoided fuel and peak reliability, which is higher than the tariff, so its optimal interval is shorter",
          "Cleaning more often always reduces total cost",
          "Frequent cleaning extends the module warranty",
          "The IPP pays for cleaning out of the tariff, so it costs MEWRE nothing",
        ],
        answer: 0,
        explanation: md`The optimal interval is $T^* = \sqrt{2C/(pE_d s)}$: a higher energy value $p$ shortens it. At USD 55/MWh the same plant should be cleaned about every 12 days instead of 25. The contract has to bridge that gap.`,
        concepts: ["m12.cleaning-economics"],
        difficulty: 2,
      },
      {
        id: "x-om-contracts-warranty-c3",
        type: "mcq",
        prompt: md`During the 8-week resupply lead time, about **10** inverter failures are expected on average. The contractor proposes stocking **10** spare power modules. What is your view?`,
        options: [
          "Too few: stocking the mean gives only about a 63 % chance of not running out; size for 95 to 99 %",
          "Exactly right: stock equals expected failures",
          "Too many: half of them will never be used",
          "Irrelevant: inverter failures are covered by warranty",
        ],
        answer: 0,
        explanation: md`Failures in the lead time are random (Poisson). With a mean of about 9.6, stocking 10 runs out more than one time in three; about 15 are needed for 95 %. A warranty replaces the part eventually but does not shorten the outage.`,
        concepts: ["m12.spares-strategy"],
        difficulty: 2,
      },
    ],
    deeper: ["m12-l04", "m12-l03", "m12-l05"],
  },

  // ------------------------------------------------------------------ 3. How the ministry works
  {
    id: "x-how-the-ministry-works",
    day: 7,
    title: "How a ministry works, and writing for it",
    minutes: 12,
    module: "m13",
    hook: "At MEWRE the critical path of a renewable project usually runs through memos, signatures and committees, not engineering. A PM who writes a one-page memo the Undersecretary can approve in two minutes moves projects that technically stronger but institutionally naive managers cannot.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Picture a relay race where the baton is a **piece of paper**. Each runner (section head, director, Assistant Undersecretary, Undersecretary) reads it, writes a short note on it and passes it on. Nothing counts until the baton crosses the line with a signature. A great idea said in a corridor is a runner without a baton.

The structure feels slow to an engineer from the private sector. It is built for **accountability, not speed**: public money, assets committed for 25 to 30 years, and every decision open to later review by the State Audit Bureau, the National Assembly and the courts. Once you see that, you stop fighting the system and start writing paper that moves through it fast.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**The chain.** Minister (الوزير), reached through the **Undersecretary** (وكيل الوزارة), who runs the ministry day to day and signs significant letters and memos. Below are **Assistant Undersecretaries** (الوكيل المساعد), each heading a sector; yours is your real internal client and budget owner. Then department directors, controllers and section heads, who review, draft and execute. A renewable IPP touches several sectors at once (planning, transmission, renewables, finance, legal); your job is to turn many partial authorities into one decision.

**Formal vs practical authority.** Formal authority is a signature under the **delegation of authority** (تفويض الصلاحيات). Practical authority belongs to the **drafters** (whoever writes the memo frames the options), the **gatekeepers** (office managers, committee secretaries, legal and financial reviewers) and trusted advisers.

**The annotation is the decision.** Each level writes a تأشيرة on the memo: موافق (approved), للعرض (for presentation upward), لاتخاذ اللازم (take the necessary action). A verbal "go ahead" in a meeting is agreement in principle only.

**Decision culture, four forces**: consensus across sectors (one silent sector can stall a file without ever saying no); **precedent** ("what did we do last time?"); **audit consciousness**; and **trust** (a memo from a PM the Undersecretary trusts is read first). For novel decisions, bring external legitimacy: a standard, a consultant's report, a GCC precedent.

**Writing for seniors: BLUF** (bottom line up front). The first paragraph says what decision is needed, by when, and what you recommend. If the reader stops there and writes موافق, the memo worked. Everything below is for the reviewers and the file.

**Formal letters** in Arabic follow a fixed frame: reference number and date, addressee with title (السيد/ ... المحترم), subject, تحية طيبة وبعد،،،, a reference to prior correspondence by number and date, numbered points, a clear request with a deadline, the closing formula, signature, attachments and copies. Copy exact forms from your sector's recent outgoing letters. Firmness comes from facts and clause references, never adjectives.`,
      },
      {
        kind: "flow",
        title: "The one-page decision memo (about 450 words)",
        steps: [
          { label: "Decision required", detail: "The ask, the deadline, your recommendation (2 to 4 lines). Seniors read this first, often only this." },
          { label: "Issue", detail: "The problem in 1 or 2 sentences, with the number that matters" },
          { label: "Background", detail: "Only the facts needed to judge, with reference numbers and dates" },
          { label: "Options", detail: "2 to 4 genuine options, always including do-nothing, each with cost, time, risk" },
          { label: "Recommendation", detail: "Which option, and the decisive reason" },
          { label: "Risks", detail: "Top 2 or 3 and how they are handled" },
          { label: "Decision line", detail: "Boxes the signatory can tick or annotate" },
          { label: "Attachments", detail: "Analysis, consultant summary, and the next letter drafted and ready to sign" },
        ],
        caption: "Notice the order: conclusion first, evidence after. It is the reverse of an engineering report, which follows the order you discovered things.",
      },
      {
        kind: "bilingual",
        title: "A BLUF opening, as it appears on the memo",
        en: md`**To:** The Undersecretary
**Through:** The Assistant Undersecretary, [Sector]
**Subject:** Approval to extend the Owner's Engineer contract No. [ ]

**1. Decision required (by [date])**
Approve a 6-month extension of the Owner's Engineer contract, estimated at KD 450,000, and its submission to the State Audit Bureau for prior review. Recommended.`,
        ar: md`**إلى:** السيد/ وكيل الوزارة المحترم
**عن طريق:** السيد/ الوكيل المساعد لقطاع [ ] المحترم
**الموضوع:** طلب الموافقة على تمديد عقد مهندس المالك رقم [ ]

تحية طيبة وبعد،،،

**أولاً: المطلوب (قبل تاريخ [ ])**
نأمل التكرم بالموافقة على تمديد عقد خدمات مهندس المالك لمدة ستة أشهر بقيمة تقديرية قدرها (450,000) د.ك، وإحالته إلى ديوان المحاسبة للرقابة المسبقة. ونوصي بالموافقة.`,
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **Reading speed** for dense official text: about **200 words/min**. A 450-word memo takes about 2 minutes; a 1,400-word one about 7, and gets skimmed or deferred.
- **State Audit Bureau prior review**: contracts of **KD 100,000 and above**, as reported by a minister (verify against the current law and practice).
- **Law No. 94 of 2026** (gazetted 27 September 2026, effective about three months later): direct contracting without CAPT approval up to **KD 1,000,000 per financial year**; local and commission agents banned.
- **Approval chain**: the Track 0 example for a KD 450,000 extension takes about **46 working days**, including 20 for Audit Bureau review and 8 for one round of queries. Budget for it: the paper chain is usually the critical path.`,
      },
    ],
    say: [
      "Which sectors must concur before this goes up, and has each of them seen the draft?",
      "Who signs this under the current delegation of authority, and is there a precedent we can cite?",
      "Here is the one-page memo with the decision in the first paragraph and the letter attached, ready for signature.",
      "Thank you for the agreement in principle; I will send the memo today so we have it on file.",
    ],
    trap: "Treating a nod in a meeting as a decision, or writing the memo like an engineering report (background first, conclusion on page three). Nothing counts until the annotated memo is on file, and a senior who cannot find the ask in the first paragraph sends it back \"for clarification\", which costs a week.",
    check: [
      {
        id: "x-how-the-ministry-works-c1",
        type: "mcq",
        prompt: md`In a meeting, the Assistant Undersecretary says "fine, go ahead" to your proposal. What do you have?`,
        options: [
          "Agreement in principle: the decision exists only when the annotated memo is signed and filed",
          "A binding decision you can act on immediately",
          "A decision, provided you write the minutes yourself",
          "Nothing at all: verbal views are never relevant",
        ],
        answer: 0,
        explanation: md`Officials carry personal accountability for what they sign, so the rational pattern is to agree in principle in the room and decide on paper after Legal and Finance have commented. Send the complete memo quickly so "later" is short.`,
        concepts: ["m13.authority-flow", "m13.decision-culture"],
        difficulty: 1,
      },
      {
        id: "x-how-the-ministry-works-c2",
        type: "mcq",
        prompt: md`What must the **first paragraph** of a decision memo to the Undersecretary contain?`,
        options: [
          "The decision required, the deadline and your recommendation",
          "The project background since tender",
          "A summary of the consultant's report",
          "A list of everyone who attended the related meetings",
        ],
        answer: 0,
        explanation: md`Bottom line up front: if the senior reads only that paragraph and annotates موافق, the memo has done its job. Background and analysis go below or in attachments.`,
        concepts: ["m13.bluf", "m13.decision-memo"],
        difficulty: 1,
      },
      {
        id: "x-how-the-ministry-works-c3",
        type: "numeric",
        prompt: md`At about **200 words per minute**, how many minutes does a senior official need to read a **1,400-word** memo carefully?`,
        answer: 7,
        tolerance: { abs: 0.1 },
        unit: "min",
        explanation: md`$t = W/v = 1{,}400/200 = 7$ minutes. A one-page memo of about 450 words takes about 2 minutes, which is the time seniors actually give.`,
        concepts: ["m13.plain-language", "m13.decision-memo"],
        difficulty: 1,
      },
    ],
    deeper: ["m13-l01", "m13-l02"],
  },

  // ------------------------------------------------------------------ 4. Meetings, presenting, negotiating
  {
    id: "x-meetings-presenting-negotiating",
    day: 7,
    title: "Meetings, presenting to seniors and negotiating with contractors",
    minutes: 12,
    module: "m13",
    hook: "In your first weeks you will sit in progress meetings, brief your superiors and face contractors asking for time and money. Each of these leaves a record and builds or spends trust, so a few disciplined habits matter more than eloquence.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

- **A meeting is a factory.** Its product is decisions and owned actions. Reading status aloud is raw material that should arrive before the meeting.
- **A briefing to a senior is a newspaper**: the headline first, then the story, then the detail for whoever wants it.
- **A negotiation is selling a house**: you know what you will do if this buyer walks away (your fallback), and that decides the lowest price you will accept. Shouting about the price matters far less than knowing your fallback and theirs.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Running meetings and minutes.** Standard progress agenda: safety first, previous actions (only the overdue or blocked ones), progress vs programme, engineering and procurement, quality, risks, commercial, decisions required, new actions. Before closing, **read back** each action with its owner and date. Approved minutes are **evidence**: tribunals weigh what was recorded at the time. If the contractor records "the delay is due to late access", do not delete it; record the Employer's answer: "The Employer does not accept this statement; the matter will be addressed through the contractual procedure." And **minutes are not Notices**: a claim or instruction still needs the formal Notice the contract requires.

**Managing consultants (the Owner's Engineer).** They know more than you about their work and their incentives differ from the ministry's (the **principal-agent** problem). Control them with a clear scope and authority matrix, a KPI scorecard (look at the components, not only the total), and above all your own **verification** of samples of their work. Consultants advise and prepare; officials decide and sign.

**Presenting to seniors.** Decision first. Open with Situation, Complication, Question, then the answer. Three slides: the answer, why, the asks; detail in the appendix. Translate numbers into things the leader already knows: MW as a share of the summer peak, KD as a share of the contingency, a delay as a range ("8 to 13 weeks, most likely 10"). Bad news: cause, impact, plan, ask, and early beats perfect: never let your superior be surprised. Never guess a number in a question; commit to a dated follow-up. Never contradict your superior in front of external parties.

**Negotiation basics.** Your **BATNA** (best alternative to a negotiated agreement) is what happens if talks fail: for a claim, the Engineer's determination, then the dispute board and arbitration. It sets your **reservation price** (walk-away point). The overlap between both sides' reservation prices is the **ZOPA** (zone of possible agreement). Then negotiate on **interests, not positions**: the contractor's position is "KD 3.2 m and 120 days", its interests are cash flow, avoiding delay damages and its reputation. Trade currencies: time, money, milestones, guarantees. With public money, a settlement must rest on **entitlement and substantiated quantum** under the contract, not on splitting the difference. In the Gulf, relationship and **face** (ماء الوجه) matter: give the counterpart a dignified way to concede, such as an objective criterion or a senior-to-senior close.`,
      },
      {
        kind: "matrix",
        title: "Five ways to handle a conflict (Thomas-Kilmann)",
        xAxis: ["Low concern for their outcome", "High concern for their outcome"],
        yAxis: ["Low concern for your outcome", "High concern for your outcome"],
        cells: [
          { label: "Compete", detail: "Safety, integrity, clear contractual rights. Overused: damaged relationships." },
          { label: "Collaborate", detail: "Recovery plans, high stakes with a relationship that matters. Slow, needs time." },
          { label: "Avoid", detail: "Trivial issues, or a cooling-off period. Overused: problems grow unseen." },
          { label: "Accommodate", detail: "You were wrong, or a small point that earns goodwill. Overused: sets a precedent." },
        ],
        caption: "Compromise sits in the middle, and splitting the difference without justification is dangerous with public money. Good PMs switch modes deliberately.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Minutes** issued within **3 working days**; comments within **5 working days** after issue (typical procedure; check yours).
- **Summer-2026 peak load: 17,540 MW** (MEWRE figure). Use it as the yardstick: a 1,100 MW PV plant delivering 85 % at the peak hour gives about 935 MW, about **5.3 %** of the peak.
- **ZOPA** for a claim when both sides expect the same award $EV$: from $EV - C_{contractor}$ to $EV + C_{employer}$, where $C$ is each side's dispute cost. In the Track 0 example: KD 1.46 m to 2.01 m on a KD 3.2 m claim.
- **Meeting cost** $C = N \cdot h \cdot r$ (attendees times hours times hourly rate): worth computing before you make a meeting weekly.`,
      },
    ],
    say: [
      "The decision we need today is this; here is why, and here is what I need from you.",
      "The Employer does not accept this statement; it will be addressed through the contractual procedure. Please minute that.",
      "Before we close, let me read back the actions: owner and date for each.",
      "Help me understand what matters most to you here: cash flow, the dates, or the delay damages?",
      "We can only settle on what the contract entitles you to; show us the records that support the quantum.",
    ],
    trap: "Treating negotiation as haggling toward the middle, or treating minutes as a formality. Splitting the difference cannot be defended to the Audit Bureau, and an unchallenged contractor statement in approved minutes becomes evidence against the ministry. Settle on entitlement within the ZOPA, and rebut on the record.",
    check: [
      {
        id: "x-meetings-presenting-negotiating-c1",
        type: "numeric",
        prompt: md`Legal and the Owner's Engineer expect a dispute board to award about **KD 1.0 m** on a claim. Going to dispute would cost the ministry **KD 0.2 m** and the contractor **KD 0.3 m**. What is the most the ministry should rationally pay to settle (its reservation price), in KD m?`,
        answer: 1.2,
        tolerance: { abs: 0.01 },
        unit: "KD m",
        explanation: md`$RP_E = EV + C_E = 1.0 + 0.2 = 1.2$ KD m. The contractor's floor is $1.0 - 0.3 = 0.7$, so the ZOPA is KD 0.7 to 1.2 m. The settlement must still be justified by entitlement under the contract.`,
        concepts: ["m13.batna-zopa"],
        difficulty: 2,
      },
      {
        id: "x-meetings-presenting-negotiating-c2",
        type: "mcq",
        prompt: md`Draft minutes record: "The Contractor stated that the delay is due to late site access by the Employer." You disagree. What do you do?`,
        options: [
          "Keep the statement and add the Employer's rebuttal on the record, then handle the matter through the contractual procedure",
          "Delete the statement from the minutes",
          "Ignore it: minutes have no contractual weight",
          "Accept it to keep the relationship good",
        ],
        answer: 0,
        explanation: md`Minutes are contemporaneous evidence. Erasing statements looks bad and rarely works; an unchallenged statement can later be read as acceptance. Rebut it with references, and remember minutes do not replace Notices.`,
        concepts: ["m13.minutes-action-log", "m13.progress-meeting"],
        difficulty: 1,
      },
      {
        id: "x-meetings-presenting-negotiating-c3",
        type: "mcq",
        prompt: md`You must tell the Assistant Undersecretary that grid connection will slip. Which opening is best?`,
        options: [
          "\"Connection will slip 8 to 13 weeks, most likely 10, because the GIS delivery is late; here is the recovery plan and the decision I need from you.\"",
          "A full history of the substation contract, ending with the delay on the last slide",
          "Wait until the recovery plan is certain before saying anything",
          "\"There may be some minor schedule challenges we are looking into.\"",
        ],
        answer: 0,
        explanation: md`Decision first, with a range: cause, impact, plan, ask. Early beats perfect; vague wording or a late surprise costs trust.`,
        concepts: ["m13.bad-news", "m13.pyramid-principle"],
        difficulty: 1,
      },
    ],
    deeper: ["m13-l03", "m13-l04", "m13-l05"],
  },

  // ------------------------------------------------------------------ 5. AI at work safely
  {
    id: "x-ai-at-work-safely",
    day: 7,
    title: "Using AI tools at MEWRE without getting burned",
    minutes: 11,
    module: "m14",
    hook: "AI can turn a thousand-page tender into a structured table in an hour and draft a bilingual letter in minutes. Used carelessly, it puts an invented clause number in a memo to the Undersecretary or a confidential bid into a consumer chatbot, and both land on you.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a brilliant, very fast new intern who has read a huge amount but never worked at MEWRE.

- Give them a document and ask for a summary, a table of obligations or a first draft: excellent work, quickly.
- Ask them from memory "what does Article 12 of the new tenders law say?": a confident, fluent answer that may be invented.
- You would never hand them a sealed bid to take home. And you would never sign their draft without reading it.

That is an **LLM** (large language model): superb at transforming text you give it, unreliable as a source of facts you do not.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

An LLM predicts the next word-piece (**token**) from probabilities, again and again. Its output is **plausible, not verified**. When it lacks a fact it does not stop: it produces something that sounds right. That is **hallucination**, and it concentrates in exactly what matters in official work: **numbers, dates, clause and article numbers, laws, citations and names**. Each model also has a **knowledge cutoff**: it will not know Law No. 94 of 2026 unless you give it the text.

**Good at** (with your documents supplied): summarising, extracting clauses and dates into tables, comparing a bid with the requirements, drafting letters, memos and minutes in English and Arabic, generating risks and questions, writing code to analyse data.
**Weak at**: facts not in the context, arithmetic over many numbers (let it write code, and let the code calculate), exact citations unless it quotes verbatim, and judgements that need accountability (award, acceptance, determination). **AI produces evidence; the committee and the signatory decide.**

**Reviewing contracts with AI**: tell it to use **only the attached text**, quote verbatim with clause and page, write NOT FOUND when something is absent, and not to fill gaps from "standard FIDIC". Then verify: every high-severity row and every row with legal effect (time bars, LDs) in full, plus a **random sample** of the rest to estimate the error rate.

**Drafting with AI**: you write a **facts sheet** (numbers, dates, references), the AI drafts, you critique and revise. Never take reference numbers, Hijri dates, figures or clause numbers from the model. Copy defined Arabic terms (صاحب العمل، المهندس، المقاول) from your contract.

**Confidentiality.** Classify before you paste. **Never put ministry documents, bidder data, evaluations, claims positions or personal information (Civil IDs, salaries) into an unapproved tool**, consumer accounts included. Anonymising is harder than removing names: "the 1,100 MW Kuwaiti PV IPP whose preferred bidder was just selected" identifies the project without a single name. If the uniqueness is the point, use an approved tool or none.`,
      },
      {
        kind: "matrix",
        title: "Before you paste: two questions",
        xAxis: ["Public or internal, non-sensitive", "Confidential or restricted"],
        yAxis: ["Low stakes output", "Output with legal or financial effect"],
        cells: [
          { label: "Use it, verify everything", detail: "Summarising a published law or grid code you supply. Check every number and citation against the source." },
          { label: "Approved tool only, or none", detail: "Bid evaluation, claims positions, draft decisions. Full human check; the committee decides. SCADA and protection settings: never external." },
          { label: "Go ahead, light check", detail: "Rewording a press release, a generic template, explaining a concept." },
          { label: "Approved tool, or anonymise properly", detail: "Meeting notes with names, internal procedures. Check that nobody could re-identify the project." },
        ],
        caption: "The top right is where careers end: confidential data and an output that carries the ministry's authority. Ministry policy overrides this generic guide.",
      },
      {
        kind: "callout",
        tone: "unverified",
        title: "MEWRE's own rules: get them in week one",
        md: md`Kuwait's CITRA is reported to have issued data classification, privacy and cloud policies for government entities, and MEWRE may have its own information-security and AI guidance. None of these were verified in Track 0. Ask IT or information security for the current policy and the list of approved tools before using AI on any ministry data.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Tokens**: about **1.3 per English word**; Arabic usually more (plan on about 2 per word, then measure).
- **Four data tiers** (generic): public, internal, confidential, secret/restricted. Bids, negotiations, claims and personal data are confidential.
- **Sampling**: error rate = errors ÷ rows checked; expected hidden errors = rate × unchecked rows. 1 error in 20 sampled out of 80 means about **3** more in the other 60.
- **Time saving** $S = 1 - T_{AI}/T_{manual}$ is real only if the review is real.`,
      },
    ],
    say: [
      "Is this tool approved for confidential data under ministry policy, or only for public material?",
      "The AI draft is a starting point; every figure, date and clause reference has been checked against the source.",
      "Use only the attached documents, quote the clause verbatim, and write NOT FOUND if it is not there.",
      "We checked a random sample of the extracted rows and every row with legal effect; here is the error rate.",
      "The AI produced the comparison table; the evaluation committee did the scoring.",
    ],
    trap: "Believing a fluent, confident answer is a correct one, or that removing names makes a document safe to paste. LLMs invent clause numbers and figures with the same confidence as real ones, and context alone can identify a project. Verify every fact that carries authority against the source, and keep confidential data in approved tools only.",
    check: [
      {
        id: "x-ai-at-work-safely-c1",
        type: "numeric",
        prompt: md`An AI extracted **80** obligations from a contract. You check a random sample of **20** and find **1** error. How many errors do you expect in the **60** rows you have not checked?`,
        answer: 3,
        tolerance: { abs: 0.1 },
        unit: "errors",
        explanation: md`Error rate $1/20 = 5$ %; $60 \times 0.05 = 3$ expected errors. For a table of time bars and LDs that is unacceptable: check every row, because one wrong time bar can forfeit a claim.`,
        concepts: ["m14.verification-sampling"],
        difficulty: 1,
      },
      {
        id: "x-ai-at-work-safely-c2",
        type: "mcq",
        prompt: md`It is Thursday evening and the approved AI tool is down. Your office wants a comparison of three bids by Sunday. What do you do?`,
        options: [
          "Do not use a personal account; offer a manual summary of the key points by Sunday and the full AI-assisted comparison on the approved tool on Monday",
          "Use your personal chatbot account, since it is only a summary",
          "Remove the bidders' names and paste the bids into a free tool",
          "Ask the bidders to summarise their own bids",
        ],
        answer: 0,
        explanation: md`Bids in a live procurement are confidential; urgency does not change the classification. Removing names is not enough, because the project and values identify them. Offer a realistic alternative instead.`,
        concepts: ["m14.data-classification", "m14.enterprise-vs-consumer"],
        difficulty: 1,
      },
      {
        id: "x-ai-at-work-safely-c3",
        type: "mcq",
        prompt: md`An AI-drafted memo cites a specific article number of a recent Kuwaiti law as the legal basis for a direct award. You have not read that article yourself. What is the right check?`,
        options: [
          "Open the official text of the law and confirm the article and its wording yourself",
          "Ask the same AI whether it is sure",
          "Accept it: the model cited a specific article, so it must have read the law",
          "Delete the reference and keep the conclusion",
        ],
        answer: 0,
        explanation: md`Article numbers and laws are hallucination hotspots, and a recent law may be after the model's cutoff. Asking the same model again only repeats its guess; the primary source is the only real check.`,
        concepts: ["m14.hallucination", "m14.verification-habits"],
        difficulty: 1,
      },
    ],
    deeper: ["m14-l01", "m14-l02", "m14-l06"],
  },
];
