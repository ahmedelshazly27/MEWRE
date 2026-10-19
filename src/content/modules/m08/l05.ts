import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m08-l05",
  title: "Risk Management: Registers, P–I Matrices, Monte Carlo and Kuwait-Specific Risks",
  summary:
    "From a living risk register to quantitative schedule and cost risk: P–I scoring, EMV, PERT, Monte Carlo, P50/P80 contingency, risk ownership — applied to the risks that actually bite on Kuwaiti PV/BESS projects (heat, sandstorms, approvals, customs, FX, grid interfaces).",
  minutes: 85,
  objectives: [
    "You can write risk statements in cause–event–effect form, score them on a P–I matrix and assign owners and responses.",
    "You can compute EMV for a risk register and PERT mean/σ for a path, and estimate P50/P80 durations.",
    "You can explain what Monte Carlo schedule and cost risk analysis does, why merge bias and correlation matter, and how to set P80 contingency.",
    "You can identify and plan for Kuwait-specific risks, separating verified facts from assumptions that must be checked.",
  ],
  concepts: [
    { id: "m08.risk-register", name: "Risk register & risk statements", description: "Living record of risks with cause–event–effect statements, scores, owners, responses, triggers and status.", competency: "risk", related: ["m09.risk-allocation"] },
    { id: "m08.pi-matrix", name: "Probability–impact matrix", description: "Ordinal 5×5 scoring used to triage risks into response priorities; not a quantity.", competency: "risk", related: ["m08.risk-register"] },
    { id: "m08.emv", name: "Expected monetary value", description: "Sum of probability × impact over discrete risks; first-cut contingency.", competency: "risk", related: ["m08.risk-register"] },
    { id: "m08.monte-carlo", name: "Monte Carlo risk analysis", description: "Simulating schedule/cost thousands of times from ranged estimates and risk events to produce a probability distribution (P50, P80, P90).", competency: "risk", related: ["m08.cpm", "m08.emv", "m11.pert-approvals"] },
    { id: "m08.contingency", name: "Contingency vs management reserve", description: "Contingency covers identified risks (known-unknowns) within the baseline; management reserve covers unknown-unknowns and sits outside it.", competency: "risk", related: ["m08.monte-carlo", "m10.estimate-contingency", "m10.contingency-drawdown"] },
    { id: "m08.kuwait-risks", name: "Kuwait-specific project risks", description: "Extreme heat and summer work restrictions, shamal dust storms, layered approvals, customs clearance, FX on USD-priced equipment, MEWRE-side grid interfaces.", competency: "risk", related: ["m08.risk-register", "m00.approval-timelines"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From lists of worries to probability distributions",
      blocks: [
        {
          kind: "md",
          md: md`ISO 31000 defines risk as the **effect of uncertainty on objectives** — positive (opportunity) or negative (threat). A project's risk process is: **identify → analyse (qualitative, then quantitative for the top risks) → plan responses → implement → monitor**, continuously.

### The risk statement

Write every risk as **cause → event → effect**: "Because the 400 kV line route crosses an oil-sector corridor (cause), right-of-way approval may take longer than planned (event), delaying energisation of the IPP and exposing MEWRE to PPA compensation (effect)." Vague entries ("grid delay") cannot be owned, quantified or closed.

### Qualitative scoring`,
        },
        { kind: "equation", formula: "risk-score" },
        {
          kind: "md",
          md: md`Typical scales for a USD 500–800 m PV/BESS project:

| Rating | Probability | Cost impact | Schedule impact (to COD) | HSE |
|---|---|---|---|---|
| 1 Very low | < 10 % | < USD 0.5 m | < 1 week | First aid |
| 2 Low | 10–30 % | 0.5–2 m | 1–4 weeks | Medical treatment |
| 3 Medium | 30–50 % | 2–8 m | 1–3 months | Lost-time injury |
| 4 High | 50–70 % | 8–25 m | 3–6 months | Permanent disability |
| 5 Very high | > 70 % | > 25 m | > 6 months | Fatality |

Impact = the **worst** of the dimensions. Scores 15–25 red (response plan and steering committee visibility), 8–12 amber (owner manages), 1–6 green (monitor). An HSE impact of 5 should be treated as red regardless of probability.

### Responses

Threats: **avoid** (change the plan to remove the risk), **transfer** (contract, insurance, bond — transfers financial impact, not the event), **mitigate** (reduce P or I), **accept** (actively with contingency, or passively), **escalate** (outside the project's authority). Opportunities: **exploit, share, enhance, accept**. Every risk has one **risk owner** (accountable, has authority over the response) and possibly several **action owners**.

### Quantitative: EMV`,
        },
        { kind: "equation", formula: "risk-emv" },
        {
          kind: "md",
          md: md`### Ranged estimates: PERT and triangular`,
        },
        { kind: "equation", formula: "pert-mean" },
        { kind: "equation", formula: "pert-sd" },
        { kind: "equation", formula: "triangular-mean" },
        { kind: "equation", formula: "path-sum-variance" },
        { kind: "equation", formula: "percentile-normal" },
        {
          kind: "md",
          md: md`### Monte Carlo schedule and cost risk analysis

Analytical PERT works for one path. Real networks have **merge points**, **risk events** (discrete, with probability), **correlation**, and **calendars**. Monte Carlo handles all of them by brute force:

1. Replace each key duration/cost with a distribution (triangular or beta-PERT from min/most likely/max workshops).
2. Add **risk events** as probabilistic branches (e.g., 35 % chance of 4–10 weeks customs hold on transformers).
3. Define **correlations** (all field productivity is driven by the same summer heat).
4. Run 1,000–10,000 iterations, each a full CPM calculation with sampled values.
5. Read the cumulative distribution: **P50** (median), **P80**, **P90**; and the **criticality index** (share of iterations in which each activity is critical) and sensitivity ("tornado").

**Merge bias**: two parallel independent paths each with P50 of 40 weeks; the probability that **both** finish by week 40 is $0.5 \times 0.5 = 25\,\%$. The deterministic CPM date at a merge is always optimistic. On a PV project, the commissioning start merges modules, trackers, inverters, cabling and MEWRE's grid connection — five paths.

### Contingency and reserve

- **Contingency**: for identified risks and estimating uncertainty; part of the cost/schedule baseline; controlled by the PM/project board. Typically set as **P80 − base estimate** for owners; contractors price nearer P50.
- **Management reserve**: for unknown-unknowns; outside the baseline; controlled by senior management (and, in the public sector, often requiring a separate budget approval).`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why owners fund to P80, not P50",
          md: md`A P50 budget is overrun half the time by definition, and overruns are larger than underruns (right-skewed distributions). For a ministry, a second budget request through Finance and the Audit Bureau costs months and credibility. P80 balances the cost of tying up funds against the cost of going back for more. First-of-a-kind or high-uncertainty scopes (e.g., the first utility BESS in a country) may justify P90.`,
        },
        { kind: "sources", refs: ["m08-iso-31000", "m08-aace-rp", "m08-gao-cost", "m08-pmi-pmbok7"] },
      ],
    },
    {
      layer: "applied",
      title: "Quantifying risk on a Kuwaiti PV project",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "EMV of the top risks on a 500 MW PV EPC (Employer's view)",
          given: md`Owner's risk register extract (USD m, cost impact to the Employer's total project budget):

| ID | Risk (short) | P | Impact |
|---|---|---|---|
| R1 | MEWRE 400 kV line/bay late → compensation to contractor/IPP | 0.40 | 6.0 |
| R2 | FX/price adjustment on USD-priced equipment in Employer's budget lines | 0.30 | 5.0 |
| R3 | Shamal sandstorm damage/productivity loss on Employer-risk items | 0.50 | 1.2 |
| R4 | Customs clearance delay on Employer-supplied metering/SCADA items | 0.35 | 2.0 |
| R5 | Summer heat productivity loss on Employer's own works | 0.90 | 1.5 |
| O1 | Opportunity: lower freight rates on Employer-supplied items | 0.20 | −1.0 |`,
          steps: [
            { md: md`$EMV_{R1} = 0.40 \times 6.0 = 2.40$; $R2 = 1.50$; $R3 = 0.60$; $R4 = 0.70$; $R5 = 1.35$; $O1 = -0.20$.` },
            { md: md`$EMV = 2.40 + 1.50 + 0.60 + 0.70 + 1.35 - 0.20 = 6.35$ m.` },
            { md: md`Interpretation: about USD 6.4 m is the **mean** risk cost. Note that R5 at P = 0.90 is not really a "risk" — it is near-certain and should be **in the base estimate** (heat-adjusted productivity), not in contingency. Moving it leaves risk EMV of 5.0 m.` },
            { md: md`R1 dominates and is **within MEWRE's control**: it deserves a mitigation budget (e.g., early right-of-way work, OE resources on the line contractor) because 40 % × 6 m = 2.4 m expected loss far exceeds most mitigation costs.` },
          ],
          result: md`EMV ≈ USD 6.35 m (5.0 m once the near-certain heat effect moves into the base). EMV is a mean — a P80 contingency will be higher; use Monte Carlo to set it.`,
        },
        { kind: "widget", widget: "risk-matrix", caption: "Place R1–R5 on the 5×5 matrix using the lesson's scales and decide the response for each." },
        {
          kind: "worked",
          mode: "faded",
          title: "PERT P80 for the tracker path",
          given: md`Critical path segment (weeks; optimistic a, most likely m, pessimistic b): tracker supply (16, 20, 30); tracker installation (12, 14, 20); module installation (10, 12, 18). Assume independence and a normal approximation for the sum.`,
          steps: [
            { md: md`Means: $t_e = (16 + 80 + 30)/6 = 21.0$; $(12 + 56 + 20)/6 = 14.667$; $(10 + 48 + 18)/6 = 12.667$.` },
            {
              md: md`Path mean: $21.0 + 14.667 + 12.667 = 48.33$ weeks — 2.33 weeks above the sum of most-likely values (46).`,
              hidden: true,
              check: { prompt: "Path mean duration", answer: 48.33, unit: "weeks", tolerance: { abs: 0.05 } },
            },
            { md: md`σ per activity: $(30-16)/6 = 2.333$; $(20-12)/6 = 1.333$; $(18-10)/6 = 1.333$. Path $\sigma = \sqrt{5.444 + 1.778 + 1.778} = \sqrt{9} = 3.0$.` },
            {
              md: md`$P80 = 48.33 + 0.842 \times 3.0 = 50.86$ weeks.`,
              hidden: true,
              check: { prompt: "P80 path duration", answer: 50.86, unit: "weeks", tolerance: { abs: 0.05 } },
            },
            { md: md`Probability of achieving the "most likely" 46 weeks: $z = (46 - 48.33)/3 = -0.78$ → about **22 %**.` },
          ],
          result: md`The deterministic 46-week plan has only ≈ 22 % chance of being met; P80 is ≈ 50.9 weeks, so about 4.9 weeks of schedule contingency are needed on this segment alone — before merge bias and correlation, which push the true P80 later still.`,
        },
        { kind: "widget", widget: "monte-carlo", caption: "Enter the three activities above as triangular estimates, run the simulation and compare its P80 with the PERT approximation." },
        {
          kind: "question",
          question: {
            id: "m08-l05-p1",
            type: "numeric",
            prompt: md`A Monte Carlo cost risk analysis on a PV EPC with base estimate USD 280 m gives an approximately normal outcome with mean USD 291 m and σ USD 8 m. What contingency (USD m) is needed to budget at P80?`,
            answer: 17.7,
            unit: "USD m",
            tolerance: { abs: 0.2 },
            explanation: md`$P80 = 291 + 0.842 \times 8 = 297.7$ m. Contingency $= 297.7 - 280 = 17.7$ m (6.3 % of base). At P90: $291 + 1.282 \times 8 = 301.3$ → 21.3 m. The jump from mean to base (11 m) is the systematic underestimate in the base; the rest buys confidence.`,
            concepts: ["m08.contingency", "m08.monte-carlo"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running risk on real projects — and what is different in Kuwait",
      blocks: [
        {
          kind: "md",
          md: md`### The register that actually gets used

| Field | Example |
|---|---|
| ID / WBS | R1 / 2.1 (400 kV line) |
| Statement | Because… may… resulting in… |
| Category | Interface / grid |
| Owner | Head of Transmission Projects (named person) |
| P, I, score (inherent) | 3, 4, 12 |
| Response & actions | Early ROW workshop with oil sector; OE resident on line contractor; weekly tower-foundation tracking |
| Action owners, due dates | … |
| Residual P, I, score | 2, 4, 8 |
| Trigger / early-warning indicator | < 30 towers founded by month 6 |
| Quantification | 3-point impact (4/8/16 weeks) for Monte Carlo |
| Status / last review | Open / 2026-10-12 |

Review the top 10 risks **weekly** in the PM team, the full register **monthly**, and red risks at **every steering committee**. Close risks when the window passes (e.g., "transformer FAT failure" after FAT).

### Kuwait-specific risk catalogue

| Risk | What we know | Typical response |
|---|---|---|
| **Extreme heat** | Kuwait recorded 53.9 °C at Mitribah (21 July 2016, WMO-verified). Summer ambient 45–50 °C is normal. | Heat-adjusted productivity in base estimate; night shifts for some tasks; equipment derating; heat-stress programme (lesson 7) |
| **Summer midday outdoor work restriction** | Not in project research file — see callout | Separate P6 calendar; resequence heavy outdoor work to Oct–May |
| **Approvals chain** | KAPP → Higher Committee → State Audit Bureau, with Fatwa and Legislation reviewing legal terms; Audit Bureau prior review reported for contracts ≥ KD 100,000 (verify). Zone 1 award slipped from June to about August 2026 at this stage. | Model approvals as activities with ranged durations; submission packs complete first time |
| **Procurement law change** | Law 94/2026 amends the Public Tenders Law (gazetted 27 September 2026, effective about December 2026), incl. a KD 1 m direct-contracting threshold and tighter local-content rules | Check which regime applies to each MEWRE package |
| **Customs** | Zone 2 RFP reportedly allows customs-duty exemption up to 10 % for 10 years (exact wording unverified) | Clarify exemption mechanics before bid; customs broker in plan; buffer on long-lead imports |
| **Grid interface** | MEWRE procures grid works separately (e.g., Shagaya–Wafra 400 kV, awarded March 2026); late grid strands the IPP | Interface register, float protection, early warning (lesson 6, 8) |
| **Two procurement tracks** | KAPP IPPs and China G2G (SPIC/NEA) both target Shagaya; relation of capacities unclear | Land/grid capacity reconciliation risk at steering level |
| **FX** | Major equipment priced in USD (modules, trackers, inverters, BESS) — see callout on KWD | Currency of contract, price-adjustment clauses, budget at a stated rate |
| **Shamal / dust storms** | General climatology — see callout | Wind-load design, lifting limits, stop-work criteria, cleaning, soiling allowances |`,
        },
        { kind: "sources", refs: ["m08-wmo-mitribah", "m08-audit-bureau-law", "m08-kapp-ppp-law", "m08-tamimi-tenders-2026", "m08-solarquarter-zone2", "m08-megaproject-400kv", "m08-meed-zone1"] },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait risk inputs that must be verified before use",
          md: md`These are commonly reported but are **not** in the project's verified research file:
1. **Midday outdoor work ban** — reported as an annual ministerial decision banning outdoor work around 11:00–16:00 from June to August. Confirm current hours, dates, exemptions and penalties from the Public Authority for Manpower.
2. **KWD exchange-rate regime** — the dinar is generally described as pegged to an undisclosed currency basket, so USD/KWD moves are small but not zero. Confirm with the Central Bank of Kuwait and state the budget rate (this course assumes 1 KWD ≈ 3.25 USD).
3. **Shamal season** — the strong north-westerly summer wind, peaking roughly June–July, with frequent dust storms. Obtain site-specific wind and dust-event statistics (e.g., KISR stations) for design and stop-work planning.
4. **Customs clearance durations** at Shuwaikh/Shuaiba ports for project cargo — obtain from the contractor's freight forwarder and recent projects.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Risk management failure modes",
          md: md`- **Register as compliance artefact**: updated the night before the audit.
- **Owners who are departments**, not people.
- **Summing P×I scores** or using them to set contingency.
- **Risks that are certainties** (summer heat) sitting in contingency instead of the base estimate.
- **No triggers**: risks are noticed only after they become issues.
- **Optimism in three-point ranges**: workshops anchor on the base; ask "what would make this take twice as long?" to get honest pessimistic values.
- **Ignoring correlation**: Monte Carlo with independent field activities underestimates P80.`,
        },
        {
          kind: "checklist",
          title: "PM risk checklist",
          items: [
            "Every top-20 risk has a cause–event–effect statement, a named owner, a response, a trigger and a review date.",
            "Near-certain effects (summer heat productivity) are in the base estimate and calendars.",
            "Quantitative schedule risk analysis done at baseline and at major changes; P50/P80 reported.",
            "Contingency set at P80 − base, with a drawdown log; management reserve separately approved.",
            "MEWRE-controlled risks (grid, approvals, land) have mitigation budgets and visibility at the steering committee.",
            "Kuwait-specific assumptions (work restrictions, customs, FX) verified and recorded with source.",
          ],
        },
        {
          kind: "ask",
          title: "Ask the contractor",
          items: [
            "What productivity derating for June–August is in your programme, and what calendar models the midday restriction?",
            "What are your stop-work wind speeds for crane lifts and tracker installation, and how many sandstorm days did you allow?",
            "Which equipment is priced in USD, and which price-adjustment clauses apply?",
            "What is your P80 completion date from your own schedule risk analysis, and which activities have the highest criticality index?",
            "What customs clearance duration did you assume for transformers and BESS containers?",
          ],
        },
        {
          kind: "feynman",
          prompt: "Explain to a steering committee why the deterministic schedule date has only about a 20 % chance of being met, and what P80 means.",
          keyPoints: [
            "Estimates are skewed: things go wrong more than right",
            "Most-likely values summed underestimate the mean",
            "Merge bias at parallel path convergence",
            "P80 = date met in 80 % of simulated outcomes",
            "Contingency = P80 − deterministic plan",
          ],
        },
        { kind: "scenario", scenario: "m08-s5" },
      ],
    },
  ],
  quiz: [
    {
      id: "m08-l05-q1",
      type: "numeric",
      prompt: md`An activity has a = 8, m = 10, b = 18 weeks. What is its PERT mean?`,
      answer: 11,
      unit: "weeks",
      tolerance: { abs: 0.01 },
      explanation: md`$(8 + 4 \times 10 + 18)/6 = 66/6 = 11$ weeks; σ = (18 − 8)/6 = 1.67 weeks. The right skew pulls the mean a week beyond the most likely.`,
      concepts: ["m08.monte-carlo"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m08-l05-q2",
      type: "numeric",
      prompt: md`Three independent risks: P = 0.2, impact KWD 1.5 m; P = 0.5, impact KWD 0.4 m; P = 0.1, impact KWD 6.0 m. What is the total EMV (KWD m)?`,
      answer: 1.1,
      unit: "KWD m",
      tolerance: { abs: 0.005 },
      explanation: md`$0.3 + 0.2 + 0.6 = 1.1$ m. Note the low-probability, high-impact risk contributes most — and if it occurs, 1.1 m contingency covers less than a fifth of it. EMV is a portfolio mean, not protection against any single event.`,
      concepts: ["m08.emv"],
      difficulty: 1,
    },
    {
      id: "m08-l05-q3",
      type: "mcq",
      prompt: "Two independent parallel paths each have a 50 % chance of finishing by week 40. What is the probability that the merge (both complete) is reached by week 40?",
      options: ["50 %", "25 %", "75 %", "100 %"],
      answer: 1,
      explanation: md`$0.5 \times 0.5 = 0.25$. This **merge bias** is why deterministic CPM dates are optimistic, and why Monte Carlo is needed for networks with many converging paths (commissioning on a PV project).`,
      concepts: ["m08.monte-carlo"],
      difficulty: 2,
    },
    {
      id: "m08-l05-q4",
      type: "multi",
      prompt: "Which statements about contingency and management reserve are correct?",
      options: [
        "Contingency covers identified risks and is part of the cost baseline",
        "Management reserve covers unknown-unknowns and sits outside the baseline",
        "Contingency should equal the sum of P×I scores",
        "Owners commonly set contingency to reach P80 confidence",
        "Management reserve is controlled by the contractor",
      ],
      answer: [0, 1, 3],
      explanation: md`P×I scores are ordinal and cannot be summed into money. Management reserve is held by senior management of the owner, not the contractor.`,
      concepts: ["m08.contingency"],
      difficulty: 2,
    },
    {
      id: "m08-l05-q5",
      type: "short",
      prompt: "Rewrite the register entry 'Customs delays' as a proper risk statement for a BESS project, with an owner and a trigger.",
      rubric: [
        "Cause–event–effect structure",
        "Specific item (e.g., BESS containers/transformers) and route",
        "Effect on schedule/cost quantified or linked to a milestone",
        "Named owner role with authority",
        "Observable trigger/early warning indicator",
      ],
      modelAnswer: "Because BESS containers are classified as lithium-ion dangerous goods and the customs-exemption procedure for the project is not yet defined (cause), clearance at the Kuwaiti port may take 4–8 weeks instead of 1 (event), delaying BESS installation and COD by up to 6 weeks (effect). Owner: EPC logistics manager (with MEWRE contracts lead for the exemption letter). Trigger: exemption letter not issued 8 weeks before first shipment ETA, or first container dwell time > 10 days.",
      explanation: md`A good statement makes the risk ownable and measurable; the trigger converts the register from a list into an early-warning system.`,
      concepts: ["m08.risk-register", "m08.kuwait-risks"],
      difficulty: 2,
    },
    {
      id: "m08-l05-q6",
      type: "decision",
      prompt: md`At a risk workshop the contractor rates "summer heat reduces productivity" as P = 5, I = 3 and wants it covered by contingency. You are MEWRE's PM.`,
      options: [
        { text: "Treat it as a certainty: require heat-adjusted productivity and summer calendars in the base programme and estimate; keep only the uncertainty around the derating in risk.", score: 1, feedback: "Correct: near-certain effects belong in the base. Contingency is for uncertain events." },
        { text: "Agree; add it to the contingency.", score: 0.3, feedback: "This makes the baseline unachievable by design and consumes contingency on something everyone knew." },
        { text: "Delete it — everybody knows it is hot.", score: 0.1, feedback: "Knowing is not planning. It must be in the base." },
      ],
      explanation: md`The distinction between known conditions (base) and uncertain events (risk) is essential for honest baselines.`,
      concepts: ["m08.risk-register", "m08.kuwait-risks", "m08.contingency"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m08-l05-f1", front: "Risk statement structure", back: "Cause → event → effect." },
    { id: "m08-l05-f2", front: "Threat responses", back: "Avoid, transfer, mitigate, accept (plus escalate)." },
    { id: "m08-l05-f3", front: "Opportunity responses", back: "Exploit, share, enhance, accept (plus escalate)." },
    { id: "m08-l05-f4", front: "PERT mean and σ", back: md`$t_e = (a+4m+b)/6$; $\sigma = (b-a)/6$.` },
    { id: "m08-l05-f5", front: "How do you combine σ along a path?", back: "Add variances (σ²), then take the square root — assuming independence." },
    { id: "m08-l05-f6", front: "z-values for P80 and P90", back: "0.842 and 1.282." },
    { id: "m08-l05-f7", front: "Merge bias", back: "Probability all parallel paths finish on time = product of their probabilities → CPM dates at merges are optimistic." },
    { id: "m08-l05-f8", front: "Contingency vs management reserve", back: "Contingency: known risks, in baseline, PM/board-controlled. Reserve: unknown-unknowns, outside baseline, senior management." },
    { id: "m08-l05-f9", front: "Kuwait's verified record temperature", back: "53.9 °C at Mitribah, 21 July 2016 (WMO)." },
  ],
  scenarios: [
    {
      id: "m08-s5",
      title: "The P50 budget request",
      context: md`You are preparing MEWRE's budget request for the grid-connection scope of a new 1.1 GW IPP. The base estimate is KWD 62 m. Your Monte Carlo gives P50 = KWD 66 m and P80 = KWD 71 m. The finance department wants to submit KWD 62 m "to look efficient".`,
      start: "a",
      concepts: ["m08.contingency", "m08.monte-carlo"],
      nodes: {
        a: {
          md: md`What do you recommend?`,
          choices: [
            { text: "Submit KWD 71 m (P80): base KWD 62 m plus KWD 9 m risk contingency, with the risk drivers listed and a drawdown control process.", next: "b", score: 10, feedback: "Transparent and defensible. Listing the drivers shows the contingency is evidence-based, not padding." },
            { text: "Submit KWD 62 m and plan to request more later if needed.", next: "c", score: 2, feedback: "Base has only a small chance of being enough (P50 is 66 m). A second request through Finance and the Audit Bureau costs months." },
            { text: "Submit KWD 80 m to be safe.", next: "c", score: 3, feedback: "Unjustified padding erodes credibility and ties up public funds; it also invites the scope to expand to fill it." },
          ],
        },
        b: {
          md: md`Finance pushes back: "KWD 9 m of contingency looks like padding to the Audit Bureau."`,
          choices: [
            { text: "Show the top risk drivers (ROW approval, outage windows at Wafra, transformer lead time), their quantification, and propose holding contingency centrally with drawdown approval by the steering committee.", score: 10, feedback: "Governance over contingency answers the padding concern." },
            { text: "Remove contingency and hide it inside line-item rates.", score: 1, feedback: "Hidden contingency is untraceable, gets spent anyway, and is exactly what auditors criticise." },
          ],
        },
        c: {
          md: md`Eighteen months later, ROW delays and a transformer price rise push the forecast to KWD 69 m. You must request a budget increase.`,
          choices: [
            { text: "Prepare the request with the original risk analysis showing P80 was 71 m, and propose stronger contingency governance next time.", score: 5, feedback: "Honest recovery; the lesson is learned at a cost of months." },
            { text: "Defer some scope (e.g., the spare bay) to stay within budget without telling the committee.", score: 1, feedback: "Silent de-scoping is a governance breach and stores up problems." },
          ],
        },
      },
    },
  ],
};

export default lesson;
