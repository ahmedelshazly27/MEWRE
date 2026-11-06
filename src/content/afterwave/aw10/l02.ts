import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw10-l02",
  title: "ISO 13849-1 Performance Levels and IEC 61508 / IEC 62061 SIL: the maths",
  summary:
    "How machinery safety integrity is set and proven. ISO 13849-1: the risk graph to PLr, categories B to 4, MTTFd from B10d, diagnostic coverage, common cause failure and the PL determination worked end to end. IEC 61508 and IEC 62061: SIL bands in PFH and PFDavg, the 1oo1 and 1oo2 equations, the beta factor, architectural constraints and how PL and SIL map onto each other.",
  minutes: 90,
  objectives: [
    "Determine a required Performance Level with the ISO 13849-1 risk graph",
    "Compute nop, MTTFd from B10d, channel MTTFd and DCavg, and read the achieved PL from category, MTTFd and DC",
    "State the PFH bands for PL a to e and SIL 1 to 4, and the PFDavg bands for low demand",
    "Compute PFDavg for 1oo1 and 1oo2 architectures and explain why the common cause factor dominates redundancy",
    "Explain architectural constraints (HFT, SFF) and why a good number alone does not earn a SIL",
  ],
  concepts: [
    { id: "aw10.plr-risk-graph", name: "Required Performance Level (PLr)", description: "The integrity a safety function needs under ISO 13849-1, chosen with a risk graph from severity (S1/S2), frequency and duration of exposure (F1/F2) and possibility of avoidance (P1/P2), from PL a to PL e.", competency: "aw-safety", related: ["aw10.rrf"] },
    { id: "aw10.categories", name: "Categories B, 1, 2, 3, 4", description: "ISO 13849-1 designated architectures describing fault behaviour: B and 1 single channel without fault detection, 2 single channel with a test function, 3 redundant and single-fault tolerant, 4 redundant with high diagnostics so faults are detected before they accumulate.", competency: "aw-safety", related: ["aw10.plr-risk-graph"] },
    { id: "aw10.mttfd-dc-ccf", name: "MTTFd, DCavg and CCF", description: "The three quantified inputs to the PL besides category: mean time to dangerous failure per channel, average diagnostic coverage, and the common cause failure score (at least 65 of 100 points for categories 2, 3 and 4).", competency: "aw-safety", related: ["aw10.categories", "aw10.failure-modes"] },
    { id: "aw10.sil-bands", name: "SIL bands (PFH and PFDavg)", description: "IEC 61508 integrity levels: for high demand or continuous mode a dangerous failure rate per hour (SIL 1: 1e-6 to 1e-5 down to SIL 4: 1e-9 to 1e-8), for low demand an average probability of failure on demand (SIL 1: 1e-2 to 1e-1 down to SIL 4: 1e-5 to 1e-4).", competency: "aw-safety", related: ["aw10.rrf", "aw10.plr-risk-graph"] },
    { id: "aw10.beta-factor", name: "Common cause factor (beta)", description: "The fraction of dangerous failures that hit redundant channels together (shared supply, environment, design). It usually dominates the PFD of a redundant system, which is why diversity and separation matter more than adding channels.", competency: "aw-safety", related: ["aw10.mttfd-dc-ccf"] },
    { id: "aw10.architectural-constraints", name: "Architectural constraints", description: "Minimum hardware fault tolerance (HFT) for a given safe failure fraction and component type in IEC 61508 (and the category limits in ISO 13849-1): a low failure-rate calculation cannot by itself claim a high SIL or PL.", competency: "aw-safety", related: ["aw10.sil-bands", "aw10.failure-modes"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Performance Levels and Safety Integrity Levels",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"PL d, Cat 3" and "SIL 2" are the shorthand your buyers use for how much a safety function must be trusted, and they decide how much testing, diagnostics and evidence a product needs. Robot makers quote PL d / Cat 3 for their protective stops; drive vendors quote SIL 3 / PL e for STO; a humanoid team will be asked what PL its fall-mitigation function carries. If you can do the arithmetic you can tell a credible product claim from a brochure, and you can see exactly which numbers Afterwave's bench data could feed (cycle counts, diagnostic test results, fault injection coverage).`,
        },
        {
          kind: "md",
          md: md`### Two standards, one idea

Machinery uses two parallel routes, both harmonised in the EU under the Machinery Directive and expected to carry over to the Machinery Regulation:

- **ISO 13849-1** (safety-related parts of control systems, current edition 2023, 4th edition). Technology-neutral (electrical, hydraulic, pneumatic, mechanical). Integrity is a **Performance Level**, PL a to PL e. The 2023 edition added a clause on software safety requirements and merged validation content from ISO 13849-2.
- **IEC 62061** (functional safety of safety-related control systems for machinery, edition 2021). The machinery sector standard derived from **IEC 61508**, the generic functional safety standard. Integrity is a **Safety Integrity Level**, SIL 1 to 3 for machinery (61508 goes to SIL 4).

Both end in the same quantity for machinery: the average probability of a dangerous failure per hour, **PFH** (written $\text{PFH}_D$ in older ISO 13849-1 text).

| PL | PFH (per hour) | Rough SIL equivalent |
|---|---|---|
| a | $10^{-5}$ to $< 10^{-4}$ | none |
| b | $3 \times 10^{-6}$ to $< 10^{-5}$ | SIL 1 |
| c | $10^{-6}$ to $< 3 \times 10^{-6}$ | SIL 1 |
| d | $10^{-7}$ to $< 10^{-6}$ | SIL 2 |
| e | $10^{-8}$ to $< 10^{-7}$ | SIL 3 |

The SIL equivalence holds on PFH only; each standard also has its own systematic and architectural requirements, so "PL d therefore SIL 2" is a shorthand, not a proof.

### Step 1: the required PL from the risk graph

ISO 13849-1 Annex A scores three parameters:

- **S, severity**: S1 slight (normally reversible) injury; S2 serious (normally irreversible) injury or death.
- **F, frequency and/or duration of exposure**: F1 seldom to less often and/or short exposure; F2 frequent to continuous and/or long. The standard's guidance treats exposure more often than about once per 15 minutes as F2.
- **P, possibility of avoiding the hazard or limiting harm**: P1 possible under specific conditions; P2 scarcely possible.

| | P1 | P2 |
|---|---|---|
| S1 F1 | a | b |
| S1 F2 | b | c |
| S2 F1 | c | d |
| S2 F2 | d | e |`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Edition details to check",
          md: md`The 2023 edition refined the risk-graph guidance (including how to treat a low probability of occurrence of the hazardous event) and the transition period for the 2015 edition is reported inconsistently (sources in the November 2026 research brief give May 2026 and 15 May 2027). Check the edition and the current EU citation before quoting either to a customer.`,
        },
        {
          kind: "md",
          md: md`### Step 2: what the design achieves

The achieved PL depends on four things:

1. **Category** (architecture and fault behaviour):

| Category | Structure | Key requirement | Max PL (typical) |
|---|---|---|---|
| B | Single channel | Basic safety principles | b |
| 1 | Single channel | Well-tried components and principles, MTTFd high | c |
| 2 | Single channel plus test equipment | Function tested at suitable intervals; a fault between tests can lose the function | d |
| 3 | Two channels | A single fault does not lose the function; some faults detected | d (e at the top of the ranges) |
| 4 | Two channels | Single fault tolerant and faults detected in time, no accumulation to loss of function | e |

2. **MTTFd** per channel (mean time to dangerous failure, years): low 3 to below 10, medium 10 to below 30, high 30 to 100. Values above 100 years per channel are capped at 100 (up to 2,500 years for category 4).

3. **DCavg** (average diagnostic coverage): none below 60%, low 60% to below 90%, medium 90% to below 99%, high 99% and above.

4. **CCF** (common cause failure measures): a checklist in Annex F scoring separation, diversity, design, competence, environmental protection. Categories 2, 3 and 4 need at least **65 of 100** points.

The simplified procedure (the bar chart and table in the standard) combines them:

| MTTFd per channel | Cat B (DC none) | Cat 1 (none) | Cat 2 (low) | Cat 2 (medium) | Cat 3 (low) | Cat 3 (medium) | Cat 4 (high) |
|---|---|---|---|---|---|---|---|
| Low | a | not allowed | a | b | b | c | not allowed |
| Medium | b | not allowed | b | c | c | d | not allowed |
| High | not allowed | c | c | d | d | d (e at top) | e |

Tools such as **SISTEMA** (from the German IFA) do the same with the Markov-model PFH values of Annex K and also sum PFH over subsystems (input, logic, output). The PL of the whole function is limited by its weakest subsystem.

### Getting MTTFd from cycle counts

Electromechanical parts (switches, contactors, valves) wear by operation, so their data sheets give $B_{10D}$: the number of cycles until 10% of a population has failed dangerously. Convert with the annual number of operations:`,
        },
        { kind: "equation", formula: "aw10-nop" },
        { kind: "equation", formula: "aw10-mttfd-b10d" },
        { kind: "equation", formula: "aw10-mttfd-channel" },
        { kind: "equation", formula: "aw10-dcavg" },
        {
          kind: "md",
          md: md`$T_{10D} = B_{10D}/n_{op}$ is the time in years until 10% have failed dangerously: the component must be replaced before $T_{10D}$ if that is shorter than the mission time (normally 20 years). Note what this needs: the real number of operations per year. That is a measured quantity on a test bench, not a guess.

### IEC 61508: high demand versus low demand

IEC 61508 separates the **mode of operation**:

- **Low demand**: the function is called at most once per year (a chamber over-temperature trip, an emergency shutdown). Metric: $\text{PFD}_{avg}$, the average probability that it fails when asked.
- **High demand or continuous**: called more than once per year or always active (a door interlock, safely limited speed). Metric: PFH.

| SIL | $\text{PFD}_{avg}$ (low demand) | PFH (high demand, per hour) | RRF (low demand) |
|---|---|---|---|
| 1 | $10^{-2}$ to $< 10^{-1}$ | $10^{-6}$ to $< 10^{-5}$ | above 10 to 100 |
| 2 | $10^{-3}$ to $< 10^{-2}$ | $10^{-7}$ to $< 10^{-6}$ | above 100 to 1,000 |
| 3 | $10^{-4}$ to $< 10^{-3}$ | $10^{-8}$ to $< 10^{-7}$ | above 1,000 to 10,000 |
| 4 | $10^{-5}$ to $< 10^{-4}$ | $10^{-9}$ to $< 10^{-8}$ | above 10,000 to 100,000 |

For a single channel (1oo1) whose dangerous undetected failures are found only by a proof test every $T_1$ hours, and for a 1oo2 pair (either channel can trip) with common cause factor $\beta$, the simplified equations are:`,
        },
        { kind: "equation", formula: "aw10-pfd-1oo1" },
        { kind: "equation", formula: "aw10-pfd-1oo2" },
        {
          kind: "chart",
          chart: "line",
          title: "PFDavg vs proof-test interval, lambda_DU = 5e-7 per hour",
          xKey: "months",
          xLabel: "Proof-test interval T1 (months)",
          yLabel: "PFDavg (x 10^-4)",
          series: [
            { key: "s1oo1", label: "1oo1" },
            { key: "s1oo2b10", label: "1oo2, beta = 10%" },
            { key: "s1oo2b0", label: "1oo2, beta = 0 (unrealistic)" },
          ],
          data: [
            { months: 1, s1oo1: 1.83, s1oo2b10: 0.18, s1oo2b0: 0.0004 },
            { months: 3, s1oo1: 5.48, s1oo2b10: 0.55, s1oo2b0: 0.004 },
            { months: 6, s1oo1: 10.95, s1oo2b10: 1.11, s1oo2b0: 0.016 },
            { months: 12, s1oo1: 21.9, s1oo2b10: 2.25, s1oo2b0: 0.064 },
            { months: 24, s1oo1: 43.8, s1oo2b10: 4.64, s1oo2b0: 0.256 },
            { months: 36, s1oo1: 65.7, s1oo2b10: 7.15, s1oo2b0: 0.576 },
          ],
          caption: "Computed with the simplified equations (730 h per month). With beta = 10% the redundant pair is about 10 times better than one channel, not 300 times: the common-cause term beta x lambda_DU x T1 / 2 is almost the whole result. Longer proof-test intervals raise PFD linearly for 1oo1.",
        },
        {
          kind: "md",
          md: md`### Numbers are not enough: architectural constraints and systematic capability

IEC 61508-2 limits the SIL you may claim from hardware by its **hardware fault tolerance** (HFT: how many faults it survives) and **safe failure fraction**. For complex (type B) components such as microcontrollers:

| SFF | HFT 0 | HFT 1 | HFT 2 |
|---|---|---|---|
| below 60% | not allowed | SIL 1 | SIL 2 |
| 60% to below 90% | SIL 1 | SIL 2 | SIL 3 |
| 90% to below 99% | SIL 2 | SIL 3 | SIL 4 |
| 99% and above | SIL 3 | SIL 4 | SIL 4 |

Simple (type A) components get one level more at each SFF. On top, the software and the development process must reach the matching **systematic capability**. IEC 61508-3 lists techniques with recommendation levels per SIL; artificial intelligence for fault correction and dynamic reconfiguration are marked "not recommended" for SIL 2 and above. That one table row explains why ML-based safety functions need new standards (lesson 4) and, in the EU, notified-body assessment (module aw11).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Determining the PL of a test-station interlock end to end",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Guard door interlock on an actuator end-of-line test station",
          given: md`Illustrative station of the kind a humanoid or drive customer runs. An operator loads one actuator every **120 s**, **16 h per day**, **220 days per year**. Hazard: load motor and coupling. Safety function: door open leads to STO of both drives via two channels. Per channel: interlock switch ($B_{10D} = 2 \times 10^6$, DC 99% by cross-monitoring), contactor ($B_{10D} = 1 \times 10^6$, DC 99% by monitoring mirror contacts), logic (MTTFd 150 years, DC 90%). Both channels are identical. CCF score 75 points.`,
          steps: [
            { md: md`**PLr**: serious irreversible injury (S2), exposure every 2 minutes (F2), drive start is not instantaneous and the operator may withdraw (P1). Risk graph S2 F2 P1 gives **PLr d**.` },
            { md: md`**Operations per year**: $n_{op} = 220 \times 16 \times 3600 / 120 = 105{,}600$ cycles per year.` },
            { md: md`**Switch**: $\text{MTTF}_D = 2 \times 10^6 / (0.1 \times 105{,}600) = 189.4$ years. **Contactor**: $1 \times 10^6 / 10{,}560 = 94.7$ years. **Logic**: 150 years.` },
            { md: md`**Channel MTTFd**: $1/\text{MTTF}_D = 1/189.4 + 1/94.7 + 1/150 = 0.02251$ per year, so $\text{MTTF}_D = 44.4$ years: **high** (30 to 100).` },
            { md: md`**DCavg**: $\dfrac{0.99/189.4 + 0.99/94.7 + 0.90/150}{0.02251} = \dfrac{0.005227 + 0.010454 + 0.006000}{0.02251} = 96.3\%$: **medium** (90 to below 99).` },
            { md: md`**Category**: two channels, single-fault tolerant, faults detected by cross-monitoring, CCF 75 at least 65: **category 3**.` },
            { md: md`**Achieved PL**: category 3, DC medium, MTTFd high gives **PL d** in the simplified table. PL d at least PLr d: the function meets its requirement (subject to the software and systematic requirements, and to validation).` },
            { md: md`**Maintenance consequence**: contactor $T_{10D} = 10^6 / 105{,}600 = 9.5$ years, below the 20-year mission time. The contactors must be replaced at about 9 years, and that must go in the information for use.` },
          ],
          result: md`PL d achieved with MTTFd 44 years and DCavg 96%. Every input except the vendor $B_{10D}$ values is an operating assumption (cycle time, hours, days) that a captured bench history could replace with measured values. If the real cycle is 60 s instead of 120 s, $n_{op}$ doubles, the contactor MTTFd halves to 47 years, the channel MTTFd falls to about 26 years (medium) and the PL d result now sits on the lower edge of what category 3 can give, with less margin in the Annex K PFH. Worse, the contactor $T_{10D}$ halves to 4.7 years, so a maintenance plan written for 9 years leaves worn contactors in service for half their life: a real gap that only measured operating data reveals.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Low demand: is redundancy worth it for the chamber trip?",
          given: md`The battery chamber over-temperature trip from lesson 1 needs SIL 2 ($\text{PFD} \le 2 \times 10^{-3}$). Each channel (sensor, logic, final element) has $\lambda_{DU} = 5 \times 10^{-7}$ per hour. Proof test yearly, $T_1 = 8{,}760$ h. For 1oo2 assume $\beta = 10\%$.`,
          steps: [
            { md: md`$\lambda_{DU} T_1 = 5 \times 10^{-7} \times 8{,}760 = 4.38 \times 10^{-3}$.` },
            {
              md: md`1oo1: $\text{PFD}_{avg} = \lambda_{DU} T_1 / 2 = 2.19 \times 10^{-3}$. Just above the $2 \times 10^{-3}$ target.`,
              hidden: true,
              check: { prompt: "PFDavg 1oo1 (enter in units of 1e-3)", answer: 2.19, unit: "x 1e-3", tolerance: { abs: 0.02 } },
            },
            {
              md: md`1oo2: $(\lambda_{DU} T_1)^2/3 + \beta \lambda_{DU} T_1/2 = 6.4 \times 10^{-6} + 2.19 \times 10^{-4} = 2.25 \times 10^{-4}$.`,
              hidden: true,
              check: { prompt: "PFDavg 1oo2 (enter in units of 1e-4)", answer: 2.25, unit: "x 1e-4", tolerance: { abs: 0.03 } },
            },
            { md: md`Alternative without redundancy: proof test every 6 months, $T_1 = 4{,}380$ h, gives 1oo1 $\text{PFD}_{avg} = 1.1 \times 10^{-3}$: meets the target, but needs HFT and SFF to satisfy the architectural constraints for SIL 2 (type B with HFT 0 needs SFF at least 90%).` },
          ],
          result: md`1oo2 lands in the SIL 3 band for PFD, but 97% of its PFD is the common-cause term. Halving the proof-test interval is the cheaper way to hit SIL 2 if the architecture allows it. The proof test itself is a test campaign with captured evidence, which is a recurring job for the lab.`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l02-p1",
            type: "numeric",
            prompt: md`A safety valve on a hydraulic actuator rig has $B_{10D} = 4 \times 10^7$ cycles and operates 2 times per minute for 8 h per day, 250 days per year. What is its MTTFd in years? (It will be capped at 100 years in the PL calculation; give the uncapped value.)`,
            answer: 1667,
            tolerance: { rel: 0.01 },
            unit: "years",
            explanation: md`$n_{op} = 250 \times 8 \times 60 \times 2 = 240{,}000$ cycles per year. $\text{MTTF}_D = 4 \times 10^7/(0.1 \times 240{,}000) = 1{,}667$ years, capped at 100 for one channel (except category 4, up to 2,500). $T_{10D} = 4 \times 10^7 / 240{,}000 = 167$ years, so no replacement is needed in the mission time.`,
            concepts: ["aw10.mttfd-dc-ccf"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "How PL and SIL are proven in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The documents and the tools

- **Calculation**: SISTEMA (IFA, free) for ISO 13849-1, vendor tools or spreadsheets for IEC 62061. Inputs come from component data sheets ($B_{10D}$, PFH of certified subsystems such as safety relays and drive STO) and from the operating profile.
- **Validation** (ISO 13849-1 clause on validation, formerly ISO 13849-2): a validation plan, analysis (FMEA of the safety-related parts) and tests (function, timing, fault injection, environmental). The test part is evidence that test teams produce.
- **Change control**: any change to safety-related hardware, software or parameters needs an impact analysis and revalidation of the affected functions. IEC 61508-1 calls this modification; ISO 13849-1 requires it as part of validation.

### Where Afterwave fits

Three inputs in this lesson are measurable on the bench and usually assumed instead: **operations per year** (cycle counts from captured signals), **diagnostic coverage** (shown by fault injection runs: how many injected faults were detected), and **reaction time** (trigger to safe state on one clock, the core Lockstep capability). And one process is costly and error-prone: deciding what to revalidate after a change, which is Ripple's job.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Certified parts, uncertified function**: "we used a PL e safety relay" says nothing about the PL of the function, which is limited by the weakest subsystem and the wiring.
- **Optimistic operating profiles**: cycle times taken from a sales brochure, so MTTFd and T10D are wrong and wearing parts are never replaced.
- **Ignoring beta**: a 1oo2 design credited as if channels were independent, with both channels on one power supply and one cable tray.
- **SIL from numbers only**: claiming SIL 3 from a low PFH without the HFT, SFF and systematic capability to support it.`,
        },
        {
          kind: "checklist",
          title: "Check a vendor's PL or SIL claim",
          items: [
            "Which safety function exactly carries the PL or SIL, and what is its safe state and reaction time?",
            "Is the claim for the whole function (input, logic, output) or one component?",
            "What operating profile (cycles per year) was assumed for MTTFd, and is there a replacement interval for wearing parts?",
            "What DC is claimed and how was it shown (analysis only, or fault injection tests)?",
            "Which edition of ISO 13849-1 or IEC 62061 was used, and who assessed it (self-declared, third party)?",
            "What happens to the claim after a firmware update?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw10-l02-p2",
            type: "short",
            prompt: md`Write the **evidence request** Afterwave would send a drive-inverter test lab in a pilot proposal (illustrative): the specific measurements and records from their STO safety function tests that, if captured by Lockstep, would let their safety engineer replace assumed values in the PL calculation and the validation report with measured ones. Explain for each item which input to the PL or validation it supports.`,
            rubric: [
              "Requests cycle or demand counts per year from captured signals and links them to nop, MTTFd and T10D",
              "Requests fault injection runs with detected and undetected outcomes and links them to DC",
              "Requests end-to-end timing (trigger to safe state) on a common clock and links it to the reaction time requirement",
              "Requests configuration identity (firmware version or hash, parameters, rig wiring revision, calibration status) for each run and explains why the evidence is invalid without it",
              "Mentions revalidation after change (which tests rerun after firmware updates) as part of the request",
              "Keeps the safety engineer as the decision owner and does not claim Afterwave determines the PL",
            ],
            modelAnswer: md`**Evidence request for the STO validation pilot (illustrative).**

1. **Demand counts**: every STO activation over 8 weeks from the captured STO request and feedback signals. Supports $n_{op}$ and therefore MTTFd and T10D for the contactor and relay parts, replacing the assumed duty cycle.
2. **Fault injection log**: each injected fault (channel open, channel short, feedback stuck, cross-short between channels), whether the drive detected it, the time to detection and the resulting state. Supports the DC claimed for each block; with zero misses in 299 injections the lab can claim DC of at least 99% at 95% confidence (lesson 6 has the formula).
3. **Reaction time**: STO request edge to motor phase current at zero and to STO feedback, on one clock, at minimum, nominal and maximum speed and load. Supports the specified reaction time and the stopping distance in the risk assessment.
4. **Configuration identity per run**: drive firmware version and hash, safety parameter checksum, rig wiring revision, DAQ calibration certificate number and date. Without it nobody can prove which configuration the evidence applies to, and the run cannot be cited in the validation report.
5. **Change history**: list of firmware and parameter changes in the period and which STO tests were rerun after each, with the reason. Supports the modification and revalidation record; it is the input Ripple uses to propose reruns.

Ownership: the lab's functional safety engineer decides whether the data are adequate and performs the PL calculation; Afterwave captures, links and preserves the records.`,
            explanation: md`Each requested record replaces an assumption in the PL calculation or validation report with a measured value; configuration identity is what makes those values citable.`,
            concepts: ["aw10.mttfd-dc-ccf", "aw10.plr-risk-graph"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf, in four sentences, why adding a second identical channel to a safety function rarely improves it by more than about ten times.",
          keyPoints: [
            "Independent failures of two channels multiply, giving a tiny squared term",
            "Common cause failures (shared supply, environment, design, software) hit both channels at once",
            "The beta factor term scales with a single channel's rate and dominates the total",
            "Diversity, separation and diagnostics reduce beta; identical copies do not",
          ],
        },
        { kind: "sources", refs: ["aw10-r2", "aw10-r3", "aw10-r4", "aw10-r5", "aw10-r12"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw10-l02-q1",
      type: "mcq",
      prompt: "Risk graph: serious irreversible injury, exposure once per shift for 2 minutes, avoidance scarcely possible. What is the PLr?",
      options: ["PL b", "PL c", "PL d", "PL e"],
      answer: 2,
      explanation: md`S2, F1 (seldom, short exposure), P2 gives PL d. If exposure were frequent (F2) with P2 it would be PL e.`,
      concepts: ["aw10.plr-risk-graph"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw10-l02-q2",
      type: "numeric",
      prompt: md`One channel has three blocks with MTTFd of 60, 120 and 200 years. What is the channel MTTFd in years?`,
      answer: 33.3,
      tolerance: { rel: 0.01 },
      unit: "years",
      explanation: md`$1/60 + 1/120 + 1/200 = 0.016667 + 0.008333 + 0.005 = 0.03$ per year, so MTTFd $= 33.3$ years (high, just). Channel MTTFd is always below the weakest block.`,
      concepts: ["aw10.mttfd-dc-ccf"],
      difficulty: 1,
    },
    {
      id: "aw10-l02-q3",
      type: "mcq",
      prompt: "A safety function has PFH = 4 x 10^-8 per hour. Which bands does it fall in?",
      options: ["PL d / SIL 2", "PL e / SIL 3", "PL c / SIL 1", "PL e / SIL 4"],
      answer: 1,
      explanation: md`$10^{-8} \le 4 \times 10^{-8} < 10^{-7}$: PL e and SIL 3 on PFH. Whether the claim stands also depends on category or architectural constraints and systematic capability.`,
      concepts: ["aw10.sil-bands"],
      difficulty: 1,
    },
    {
      id: "aw10-l02-q4",
      type: "numeric",
      prompt: md`1oo2 low-demand system: $\lambda_{DU} = 1 \times 10^{-6}$ per hour per channel, $T_1 = 8{,}760$ h, $\beta = 5\%$. Compute $\text{PFD}_{avg}$ in units of $10^{-4}$.`,
      answer: 2.45,
      tolerance: { rel: 0.02 },
      unit: "x 1e-4",
      explanation: md`$\lambda_{DU} T_1 = 8.76 \times 10^{-3}$. Independent term $(8.76 \times 10^{-3})^2/3 = 2.56 \times 10^{-5}$. Common-cause term $0.05 \times 8.76 \times 10^{-3}/2 = 2.19 \times 10^{-4}$. Total $2.45 \times 10^{-4}$: SIL 3 band, and 90% of it is the common-cause term.`,
      concepts: ["aw10.beta-factor", "aw10.sil-bands"],
      difficulty: 2,
    },
    {
      id: "aw10-l02-q5",
      type: "multi",
      prompt: "Which are required to claim category 3 under ISO 13849-1?",
      options: [
        "A single fault does not lead to loss of the safety function",
        "Some faults are detected (DCavg at least low)",
        "CCF score of at least 65 points",
        "All faults detected before the next demand",
        "MTTFd high in every channel",
      ],
      answer: [0, 1, 2],
      explanation: md`Category 3 is single-fault tolerant with at least low DC and adequate CCF measures. Detection of faults in time so they cannot accumulate is category 4. Category 3 allows MTTFd low to high (it changes the PL reached).`,
      concepts: ["aw10.categories", "aw10.mttfd-dc-ccf"],
      difficulty: 2,
    },
    {
      id: "aw10-l02-q6",
      type: "decision",
      prompt: md`A vendor's calculation shows a single-channel (HFT 0) microcontroller-based safety function with SFF 85% and PFH $5 \times 10^{-8}$, and claims SIL 3. Your cofounder asks if Afterwave should cite it in a joint case study. What do you say?`,
      options: [
        { text: "Yes, the PFH is in the SIL 3 band.", score: 0, feedback: "PFH alone does not earn a SIL. Architectural constraints apply." },
        { text: "No: a type B element with HFT 0 and SFF 60 to 90% is limited to SIL 1 by IEC 61508-2 Route 1H, whatever the PFH. Ask how they justify SIL 3 (another route, or a different architecture) before citing it.", score: 1, feedback: "Correct reading of the architectural constraint table, and the right instinct about reputational risk." },
        { text: "Cite it but mark it as vendor-claimed.", score: 0.3, feedback: "Better than endorsing it, but you would be repeating a claim you can see is likely wrong." },
      ],
      explanation: md`Type B, HFT 0: SFF below 60% not allowed, 60 to below 90% SIL 1, 90 to below 99% SIL 2, 99% and above SIL 3. Numbers and architecture both have to support the SIL.`,
      concepts: ["aw10.architectural-constraints"],
      difficulty: 3,
    },
    {
      id: "aw10-l02-q7",
      type: "mcq",
      prompt: "Why is the chamber over-temperature trip analysed with PFDavg and the door interlock with PFH?",
      options: [
        "The trip is more dangerous",
        "The trip is demanded at most about once per year (low demand); the interlock is demanded many times per day (high demand)",
        "PFDavg is only for software",
        "PFH applies only to IEC 62061",
      ],
      answer: 1,
      explanation: md`IEC 61508 picks the metric by demand rate: low demand (at most once per year) uses the probability of failing on demand; high demand or continuous uses the dangerous failure rate per hour.`,
      concepts: ["aw10.sil-bands"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw10-l02-f1", front: "Risk graph S2 F2 P2", back: "PL e. (S2 F2 P1 and S2 F1 P2 give PL d.)", concepts: ["aw10.plr-risk-graph"] },
    { id: "aw10-l02-f2", front: "PFH band for PL d and SIL 2", back: md`$10^{-7}$ to $< 10^{-6}$ per hour.`, concepts: ["aw10.sil-bands"] },
    { id: "aw10-l02-f3", front: "MTTFd from B10D", back: md`$\text{MTTF}_D = B_{10D}/(0.1\,n_{op})$ years; $n_{op} = d_{op} h_{op} 3600 / t_{cycle}$.`, concepts: ["aw10.mttfd-dc-ccf"] },
    { id: "aw10-l02-f4", front: "MTTFd and DC bands (ISO 13849-1)", back: "MTTFd: low 3 to 10, medium 10 to 30, high 30 to 100 years. DC: none <60, low 60 to 90, medium 90 to 99, high >= 99%.", concepts: ["aw10.mttfd-dc-ccf"] },
    { id: "aw10-l02-f5", front: "Minimum CCF score for categories 2, 3, 4", back: "65 of 100 points (ISO 13849-1 Annex F).", concepts: ["aw10.mttfd-dc-ccf"] },
    { id: "aw10-l02-f6", front: "PFDavg for 1oo1 and 1oo2", back: md`1oo1: $\lambda_{DU}T_1/2$. 1oo2: $(\lambda_{DU}T_1)^2/3 + \beta\lambda_{DU}T_1/2$.`, concepts: ["aw10.beta-factor"] },
    { id: "aw10-l02-f7", front: "Type B, HFT 0, SFF 90 to 99%", back: "SIL 2 maximum (IEC 61508-2 Route 1H).", concepts: ["aw10.architectural-constraints"] },
    { id: "aw10-l02-f8", front: "IEC 61508-3 on AI", back: "Artificial intelligence fault correction and dynamic reconfiguration are 'not recommended' for SIL 2 to 4.", concepts: ["aw10.architectural-constraints"] },
  ],
};

export default lesson;
