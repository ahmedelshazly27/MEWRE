import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw10-l06",
  title: "Safety evidence as a business: from bench memory to the evidence layer",
  summary:
    "What test data a safety case and a conformity assessment actually need, the properties that turn captured bench data into admissible evidence (configuration identity, synchronisation, calibration, integrity, provenance, retention), the statistics of what bench data can and cannot demonstrate, and how this becomes Afterwave's business: Ripple and evidence packs today, living safety cases next, and the long-term idea of a risk layer insurers could use, clearly separated as vision.",
  minutes: 75,
  objectives: [
    "List the test evidence a machinery or robot safety case needs and map each item to the claim it supports",
    "Specify the properties captured bench data must have to count as safety evidence",
    "Compute what failure rate a fleet of rigs can demonstrate, and how many fault injections a diagnostic coverage claim needs",
    "Explain the business sequence from capture and Ripple to evidence infrastructure, and what must be true for an insurer risk layer",
    "Write a safety-evidence narrative for investors that separates what exists, what pilots will prove and what is vision",
  ],
  concepts: [
    { id: "aw10.evidence-requirements", name: "Safety evidence requirements", description: "The test data a safety case needs: safety-function validation (function, timing, stopping), fault injection for diagnostics, operating-profile data (cycles, demands), environmental and endurance results, coverage of triggering conditions, proof tests, and regression after every change.", competency: "aw-safety", related: ["aw10.evidence-credibility", "aw10.safety-case"] },
    { id: "aw10.admissible-evidence", name: "Properties of admissible bench evidence", description: "Configuration identity, a common time base, calibration traceability, integrity protection, provenance and retention: without them a recorded run is data, not evidence.", competency: "aw-safety", related: ["aw10.evidence-requirements", "aw10.tool-confidence"] },
    { id: "aw10.demonstration-limits", name: "What bench data can demonstrate", description: "Finite test hours bound failure rates only to roughly 3 divided by the exposure (95%, zero failures); bench data are most valuable for diagnostics coverage, timing, operating profiles, condition coverage and change impact, not for proving rare-event rates alone.", competency: "aw-safety", related: ["aw10.demonstration-statistics"] },
    { id: "aw10.evidence-layer", name: "Evidence layer (business)", description: "Afterwave's long-term positioning: infrastructure that makes physical-AI safety evidence complete, traceable and current, starting from test efficiency (Ripple) and growing into living safety cases.", competency: "aw-business", related: ["aw10.living-safety-case", "fc01.unfair-advantage"] },
    { id: "aw10.insurer-risk-layer", name: "Insurer risk layer (vision)", description: "The long-term idea that structured, trustworthy evidence of how physical-AI systems are tested and changed could inform insurers' underwriting where loss history is thin. A hypothesis with prerequisites, not a current product.", competency: "aw-business", related: ["aw10.evidence-layer"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What evidence is needed, and what it must look like",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Safety evidence infrastructure, then a risk layer insurers can use" is the long arc of Afterwave's story. Investors will probe it, and safety engineers will test whether you understand it. This lesson gives you the technical spine: exactly which data a safety case consumes, what makes captured data admissible, what statistics can and cannot claim, and an honest sequence from what you can sell in a first pilot to what is a ten-year vision. Get the boundaries right and the story becomes more credible, not less.`,
        },
        {
          kind: "md",
          md: md`### The test evidence a safety case consumes

| Evidence | Supports which claim | Standard hook |
|---|---|---|
| Safety-function validation tests (function, trigger to safe state timing, at speed and load range) | SF achieves its specified behaviour and reaction time | ISO 13849-1 validation; IEC 62061 validation; ISO 10218-2 |
| Stopping time and distance | Guard and separation distances are adequate | ISO 10218-1, ISO 13855 |
| Fault injection results (fault, detected or not, time to detect, resulting state) | Diagnostic coverage claimed in PL or SIL calculation | ISO 13849-1 DC; IEC 61508-2; ISO 26262-5 |
| Operating profile (cycles, demands per year, duty) | MTTFd from $B_{10D}$, T10D replacement intervals, demand mode | ISO 13849-1 Annex C |
| Contact force and pressure measurements | PFL application within body-region limits | ISO 10218-2 (formerly ISO/TS 15066) |
| Environmental, EMC and endurance tests | Function holds across the specified environment and life | ISO 13849-1, IEC 61326-3-1 |
| Triggering-condition coverage for perception and ML | Performance limitations are identified and acceptable | ISO 21448, ISO/PAS 8800 |
| Proof-test records | PFDavg assumptions hold ($T_1$ really achieved) | IEC 61508, IEC 61511 |
| Regression after every change, with impact analysis | Evidence is current for the deployed configuration | IEC 61508-1 modification; ISO 26262-8 change management |
| Field and post-market data | Assumptions (demand rates, failure rates, ODD) remain valid | Machinery Regulation post-market duties; AI Act Art. 72 via future delegated acts |

### From data to evidence

A recorded run becomes evidence only if a sceptical assessor can trust it. Six properties:

1. **Configuration identity**: hardware revision and serial, firmware and model hashes, safety parameter checksums, rig wiring and fixture revision, test procedure version. Without it, relevance and currency cannot be shown.
2. **Common time base**: trigger, control signals and physical response on one clock with known uncertainty. A 50 ms reaction-time claim needs timing far better than 50 ms (Lockstep's job).
3. **Calibration traceability**: every instrument's calibration status at the time of the run, traceable to an accredited lab (ISO/IEC 17025).
4. **Integrity**: raw data and results protected against undetected change (hashes, append-only logs, signed records), with any processing step recorded.
5. **Provenance and independence**: who ran it, who reviewed it, which tools processed it and their qualification status.
6. **Retention and retrieval**: kept for the life of the product and beyond (the Machinery Regulation requires the technical documentation to be kept for at least 10 years after the machine is placed on the market) and findable by claim.

### The flow Afterwave is building towards`,
        },
        {
          kind: "flow",
          title: "Bench memory to safety evidence",
          steps: [
            { label: "Capture (Lockstep)", detail: "DAQ signals and on-screen actions on one clock; calibration state of each channel" },
            { label: "Bind configuration", detail: "Firmware and model hashes, parameters, rig and fixture revision, procedure version" },
            { label: "Protect and store (Enclave)", detail: "Integrity-protected raw data and results on customer servers or an isolated tenant" },
            { label: "Link to requirements and claims", detail: "Each run mapped to the safety requirement and safety-case goal it supports" },
            { label: "Change impact (Ripple)", detail: "After any change, which evidence is stale and which tests to rerun, with reasons" },
            { label: "Evidence pack", detail: "Export for the validation report, technical file or safety case; reviewed and signed by the customer" },
          ],
          caption: "Steps 1 to 3 and 5 are the near-term product. Step 4 and the evidence pack make bench memory directly usable in safety cases. The customer's safety engineer always owns the conclusions.",
        },
        {
          kind: "md",
          md: md`### What bench data can and cannot prove

Bench hours are finite. With $r$ observed failures in $T$ hours, the one-sided upper confidence bound on a constant failure rate is:`,
        },
        { kind: "equation", formula: "aw10-chi2-demo" },
        {
          kind: "chart",
          chart: "line",
          title: "Failure rate a test fleet can demonstrate at 95% confidence",
          xKey: "hours",
          xLabel: "Accumulated test hours",
          yLabel: "Upper bound (failures per million hours)",
          series: [
            { key: "r0", label: "0 failures observed" },
            { key: "r2", label: "2 failures observed" },
          ],
          data: [
            { hours: "10k", r0: 299.6, r2: 629.6 },
            { hours: "30k", r0: 99.9, r2: 209.9 },
            { hours: "100k", r0: 30.0, r2: 63.0 },
            { hours: "300k", r0: 10.0, r2: 21.0 },
            { hours: "1M", r0: 3.0, r2: 6.3 },
            { hours: "3M", r0: 1.0, r2: 2.1 },
          ],
          caption: "PL d needs a function PFH below 1 per million hours and PL e below 0.1. Even three million failure-free hours only reach the PL d boundary. Bench data therefore support rare-event claims indirectly: through component data, diagnostics coverage and architecture, not by direct demonstration.",
        },
        {
          kind: "md",
          md: md`Where bench data are decisive is in the inputs: **diagnostic coverage** shown by fault injection, **timing**, **operating profiles**, **condition coverage** and **change impact**. For a coverage claim from fault injection with zero misses in $n$ independent, representative injections, the confidence that true coverage exceeds DC is $1 - \text{DC}^n$, so:`,
        },
        { kind: "equation", formula: "aw10-fault-injection-n" },
        {
          kind: "md",
          md: md`To claim DC of at least 99% at 95% confidence you need $n = \ln 0.05/\ln 0.99 = 298.1$, so **299** injections with no miss; for 90% only 29. Representativeness is the hard part: the injected faults must reflect the real fault distribution, which is an engineering argument, not a statistical one.

### The insurer risk layer: what it is and what it is not

**Vision, not product.** The idea: insurers price risk from loss history. Physical AI (humanoids, mobile manipulators, autonomous machines) has little loss history and changes faster than history accumulates. If structured, trustworthy evidence of how a system was tested, how it changed and how its safety functions performed were available, it could inform underwriting, the way telematics data reshaped motor insurance. Afterwave would then be a source of risk signal, not only a test tool.

What would have to be true, and is not yet:

- **Trust**: insurers discount vendor-generated numbers; the evidence would need independence (third-party review, tamper-evident records) and a track record linking evidence metrics to losses.
- **Aggregation without breaking privacy**: Enclave exists because customers will not let raw test data leave; any cross-customer signal needs consented, aggregated or federated metrics and contract terms that allow it.
- **Standard metrics**: comparable measures across companies (stop-time drift, fault detection rates, regression completeness), which do not exist yet.
- **Demand**: insurers or brokers actually wanting it; there are insurers that already offer AI performance cover (Munich Re's aiSure is often cited), but whether any would use test-bench evidence is unknown.

There are no insurer partners, pilots or conversations to report. Present it as the long-term direction that the near-term product earns the right to pursue.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Insurance market facts",
          md: md`The existence and scope of specific AI insurance products (for example Munich Re aiSure) comes from general knowledge and was not checked in the November 2026 research brief. Verify on the insurer's site before naming any product in investor or customer material.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing evidence and its value",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What a customer's rig fleet can and cannot prove",
          given: md`Illustrative: a robotics customer runs **40 actuator rigs**, **16 h per day**, **250 days per year**, logging every safety-function demand. Over a year they see **no** dangerous failures of the brake-control function, then in year two **2**.`,
          steps: [
            { md: md`Exposure per year: $T = 40 \times 16 \times 250 = 160{,}000$ h.` },
            { md: md`Year one, zero failures: $\lambda_{95} = \chi^2_{0.95,2}/(2T) = 5.99/320{,}000 = 1.87 \times 10^{-5}$ per hour (equivalently $3.0/T$).` },
            { md: md`Year two, two failures in that year's 160,000 h: $\chi^2_{0.95,6} = 12.59$, so $\lambda_{95} = 12.59/320{,}000 = 3.93 \times 10^{-5}$ per hour.` },
            { md: md`To show $10^{-6}$ per hour with zero failures needs $3.0 \times 10^6$ h, which is **18.7 years** of this fleet. Not feasible as direct proof.` },
            { md: md`What the fleet **can** deliver: measured demand counts (MTTFd inputs), 299-injection fault campaigns for DC claims, stop-time distributions and drift across firmware versions, and complete regression records. These change the PL calculation and the case's currency far more than raw hours do.` },
          ],
          result: md`Fleet hours bound the rate at about $2 \times 10^{-5}$ per hour, two orders of magnitude short of PL d. The evidence value lies in better inputs and current, traceable regression, which is what Afterwave should sell.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "The near-term value: regression effort after firmware releases",
          given: md`Illustrative test lab: 20 drive firmware releases per year; a full safety-function regression takes 3 rig-days; fully loaded cost per rig-day (rig, technician, engineer review) EUR 2,500. With change-impact analysis, assume on average 35% of the regression is needed per release, with an always-run list for safety-critical tests included in that 35%.`,
          steps: [
            { md: md`Full regression load: $20 \times 3 = 60$ rig-days per year.` },
            {
              md: md`With Ripple: $0.35 \times 60 = 21$ rig-days per year.`,
              hidden: true,
              check: { prompt: "Rig-days per year with change impact", answer: 21, unit: "rig-days", tolerance: { abs: 0.1 } },
            },
            {
              md: md`Saving: $(60 - 21) \times 2{,}500 = 97{,}500$ EUR per year.`,
              hidden: true,
              check: { prompt: "Annual saving", answer: 97500, unit: "EUR", tolerance: { rel: 0.01 } },
            },
            { md: md`The second effect is harder to price and often larger: labs that cannot afford full regression today rerun by memory, so some stale evidence ships. Ripple turns that into a logged, justified selection, raising evidence currency while cutting cost.` },
          ],
          result: md`Illustratively about EUR 100k per year of rig time for one lab, plus better evidence currency. The efficiency case funds the pilot; the evidence-quality case is the expansion story. (Pricing the share of value captured is covered in Founder Core.)`,
        },
        {
          kind: "question",
          question: {
            id: "aw10-l06-p1",
            type: "numeric",
            prompt: md`How many representative fault injections with zero missed detections are needed to claim diagnostic coverage of at least 95% at 90% confidence? (Round up.)`,
            answer: 45,
            tolerance: { abs: 0 },
            unit: "injections",
            explanation: md`$n = \ln(1 - 0.9)/\ln(0.95) = -2.3026/-0.05129 = 44.9$, so 45 injections. For 99% coverage at 95% confidence it would be 299.`,
            concepts: ["aw10.demonstration-limits"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Selling evidence without overselling it",
      blocks: [
        {
          kind: "md",
          md: md`### The sequence, as a product roadmap

1. **Now: capture and Ripple.** Sell test efficiency and traceability to test leads: fewer rig-days per release, every run tied to configuration, regression choices logged. Safety evidence is a benefit, not the headline.
2. **Next: evidence packs and safety-case linking.** Map runs to safety requirements and safety-case goals; export validation evidence; flag stale evidence after changes. Buyer widens to the functional safety manager. The 20 January 2027 application date of the Machinery Regulation, with notified-body assessment for ML-based safety components, is a timing argument here (module aw11).
3. **Later: living safety cases inside Enclave.** Teams' own agents and models plan retests and keep the case current, with human approval.
4. **Vision: risk signal for insurers.** Only after trust, independence, standard metrics and data rights exist.
5. **In parallel, later: Afterwave's own instrumented test platforms**, which produce evidence-grade data from day one (calibrated, configuration-bound, synchronised).

### Data rights and trust

Evidence infrastructure lives or dies on the customer's trust that their data stays theirs. Contract terms must say who owns captured data, what Afterwave may compute from it and whether any aggregated metric may leave Enclave. Assume none may, until a customer explicitly agrees.`,
        },
        { kind: "xref", to: "fc08.data-rights", note: "Data and training rights clauses: write the evidence-layer ambitions into pilot contracts only as opt-in, never as a default." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **Claiming certification**: "Afterwave makes you compliant." It does not; assessors and manufacturers decide. Say "complete, traceable, current evidence".
- **Leading with the insurer story** to a test lead, who hears "you want my data".
- **Treating hours as proof**: quoting fleet hours as a safety number invites a statistics lecture from the first safety engineer.
- **Ignoring tool classification**: an evidence system that is not designed to be classified and qualified will stall in automotive and high-integrity reviews.`,
        },
        { kind: "scenario", scenario: "aw10-s2" },
        {
          kind: "question",
          question: {
            id: "aw10-l06-p2",
            type: "short",
            prompt: md`Write the **safety-evidence paragraph** (150 to 250 words) for Afterwave's seed narrative or a YC interview answer to "Why does this become a big company?". It must separate what the product does now, what pilots are meant to prove, and the long-term vision (evidence layer and insurer risk layer), with no invented customers, numbers or partners.`,
            rubric: [
              "Describes the near-term product precisely (Lockstep capture on one clock, Ripple change impact, Enclave privacy) and the buyer it serves",
              "Explains concretely why safety evidence becomes valuable (standards and regulation require validation and revalidation after change; humanoid standards are drafts; ML safety components need notified bodies from January 2027)",
              "States what pilots must prove as testable hypotheses, not achievements",
              "Presents the insurer risk layer explicitly as vision with its prerequisites",
              "Contains no fabricated traction, partners, customers or market numbers, and no compliance or certification claim",
              "Is within the word range and readable by a non-specialist investor",
            ],
            modelAnswer: md`Every physical-AI team has to prove its machines are safe, and has to prove it again every time firmware, a model or a rig changes. Today that proof is assembled by hand from test runs that are hard to tie to the configuration they ran on. Afterwave captures rig signals and operator actions on one clock (Lockstep), keeps the data inside the customer's own environment (Enclave), and after every change tells engineers which tests to rerun and why (Ripple). The first value is fewer wasted rig-days per release. The second is evidence that is complete, traceable and current, which safety standards already demand and which becomes harder from 20 January 2027, when the EU Machinery Regulation sends ML-based safety components to notified bodies, while the humanoid safety standard is still a draft. Our pilots are designed to test two hypotheses: that change-impact selection cuts regression effort without missing a failure, and that safety engineers will cite our evidence packs in their validation reports. If both hold, bench memory becomes the evidence layer for physical AI. Longer term, and only with customers' consent, trustworthy evidence of how machines are tested and changed could help insurers price risks they cannot price today. That is a direction, not something we have built.`,
            explanation: md`Investors reward a vision that is clearly separated from what exists and grounded in a mechanism; fabricated traction or certification claims destroy credibility.`,
            concepts: ["aw10.evidence-layer", "aw10.insurer-risk-layer", "aw10.evidence-requirements"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a YC partner, in under a minute, why Afterwave's data could matter to safety assessors but cannot by itself prove a robot is safe.",
          keyPoints: [
            "Safety claims at PL d or e mean dangerous failure rates around one in a million hours or less, which no test fleet can demonstrate directly",
            "Bench data improve the inputs (diagnostic coverage, timing, operating profile) and show coverage of conditions",
            "Its biggest value is currency: proving that evidence matches the deployed configuration after every change",
            "Assessors and manufacturers make the safety decision; Afterwave makes the evidence trustworthy",
          ],
        },
        { kind: "xref", to: "fc01.unfair-advantage", note: "Accumulated, configuration-bound bench memory is the candidate proprietary-data advantage; test it against that lesson's criteria." },
        { kind: "sources", refs: ["aw10-r19", "aw10-r20", "aw10-r23", "aw10-r26"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw10-l06-q1",
      type: "numeric",
      prompt: md`A test fleet accumulates 600,000 hours with zero dangerous failures. What upper bound on the failure rate (per hour) can be claimed at 95% confidence? Give the answer in units of $10^{-6}$ per hour.`,
      answer: 4.99,
      tolerance: { rel: 0.02 },
      unit: "x 1e-6 /h",
      explanation: md`$\lambda_{95} = -\ln 0.05/T = 2.996/600{,}000 = 4.99 \times 10^{-6}$ per hour: still in PL b territory. Hours alone cannot demonstrate PL d or e.`,
      concepts: ["aw10.demonstration-limits"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "aw10-l06-q2",
      type: "multi",
      prompt: "Which properties must captured bench data have to serve as safety evidence?",
      options: [
        "Configuration identity (firmware and model hashes, parameters, rig revision)",
        "Calibration status of instruments at the time of the run",
        "Integrity protection of raw data and results",
        "A dashboard visualisation",
        "Provenance: who ran it, which tools processed it",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Configuration, calibration, integrity and provenance are what let an assessor trust and place the evidence. A dashboard is convenient but not an evidence property.`,
      concepts: ["aw10.admissible-evidence"],
      difficulty: 1,
    },
    {
      id: "aw10-l06-q3",
      type: "mcq",
      prompt: "Where do bench data add the most to a PL d safety case?",
      options: [
        "Directly demonstrating PFH below 1e-6 per hour from hours run",
        "Measured inputs (demand counts, DC from fault injection, reaction times) and keeping evidence current after changes",
        "Replacing the risk assessment",
        "Replacing the notified body",
      ],
      answer: 1,
      explanation: md`Direct demonstration needs millions of failure-free hours. Measured inputs and currency are where bench data change the case.`,
      concepts: ["aw10.demonstration-limits", "aw10.evidence-requirements"],
      difficulty: 1,
    },
    {
      id: "aw10-l06-q4",
      type: "decision",
      prompt: md`In a first discovery call with a drive-test lab lead, how do you introduce the safety evidence angle?`,
      options: [
        { text: "Open with the insurer risk layer vision to show ambition.", score: 0, feedback: "A test lead hears 'you want my data for someone else'. Wrong audience, wrong order." },
        { text: "Open with their regression pain after firmware releases, then show that the same capture and change-impact records make their validation evidence traceable and current.", score: 1, feedback: "Starts with the buyer's problem and shows safety evidence as a direct benefit of the same product." },
        { text: "Say Afterwave will make their drives compliant with the Machinery Regulation.", score: 0, feedback: "An overclaim that safety-literate buyers will reject immediately." },
      ],
      explanation: md`Near-term value (efficiency, traceability) earns the right to the evidence story; the insurer layer is for investors, framed as vision.`,
      concepts: ["aw10.evidence-layer", "aw10.insurer-risk-layer"],
      difficulty: 2,
    },
    {
      id: "aw10-l06-q5",
      type: "mcq",
      prompt: "Which prerequisite for an insurer risk layer conflicts most directly with Afterwave Enclave's design?",
      options: [
        "Standard metrics",
        "Cross-customer aggregation of risk signals",
        "Integrity-protected records",
        "Calibration traceability",
      ],
      answer: 1,
      explanation: md`Enclave keeps data inside the customer's environment. Any cross-customer signal needs consent and aggregated or federated metrics written into contracts.`,
      concepts: ["aw10.insurer-risk-layer"],
      difficulty: 2,
    },
    {
      id: "aw10-l06-q6",
      type: "numeric",
      prompt: md`How many fault injections with no missed detection are needed to claim DC of at least 99% at 95% confidence? (Round up.)`,
      answer: 299,
      tolerance: { abs: 0 },
      unit: "injections",
      explanation: md`$n = \ln 0.05/\ln 0.99 = -2.9957/-0.01005 = 298.1$, so 299.`,
      concepts: ["aw10.demonstration-limits"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw10-l06-f1", front: "Six properties of admissible bench evidence", back: "Configuration identity, common time base, calibration traceability, integrity, provenance and independence, retention and retrieval.", concepts: ["aw10.admissible-evidence"] },
    { id: "aw10-l06-f2", front: "Upper bound with r failures in T hours", back: md`$\lambda_C = \chi^2_{C,\,2r+2}/(2T)$; zero failures at 95%: about $3/T$.`, concepts: ["aw10.demonstration-limits"] },
    { id: "aw10-l06-f3", front: "Fault injections for a DC claim (zero misses)", back: md`$n = \ln(1-C)/\ln(\text{DC})$: 299 for 99% at 95%; 29 for 90% at 95%.`, concepts: ["aw10.demonstration-limits"] },
    { id: "aw10-l06-f4", front: "Afterwave evidence sequence", back: "Capture and Ripple (efficiency, traceability) then evidence packs and safety-case linking, then living safety cases in Enclave, then (vision) insurer risk signal.", concepts: ["aw10.evidence-layer"] },
    { id: "aw10-l06-f5", front: "Prerequisites for an insurer risk layer", back: "Trust and independence, consented aggregation, standard metrics, proven link to losses, insurer demand. None exist yet.", concepts: ["aw10.insurer-risk-layer"] },
    { id: "aw10-l06-f6", front: "Machinery Regulation documentation retention", back: "Technical documentation kept for at least 10 years after the machine is placed on the market.", concepts: ["aw10.admissible-evidence"] },
  ],
  scenarios: [
    {
      id: "aw10-s2",
      title: "The investor asks about the insurance story",
      context: md`Illustrative. A YC partner in an interview: "Your deck says long-term you become a risk layer for insurers. Is that real or slideware?" You have about a minute.`,
      start: "a",
      concepts: ["aw10.insurer-risk-layer", "aw10.evidence-layer", "aw10.demonstration-limits"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "It is real: insurers are very interested and this is a huge market.", next: "b", score: 1, feedback: "You have no insurer conversations to back that. An experienced investor will ask who, and the answer ends the credibility of the rest." },
            { text: "It is a direction, not a product: today we sell regression efficiency and traceable evidence to test teams; that same evidence is what safety cases consume; if it becomes trusted and standardised across customers, it is the kind of signal insurers lack for physical AI. We are not building that now.", next: "c", score: 9, feedback: "Honest, mechanistic, and it shows the near-term wedge earns the long-term option." },
          ],
        },
        b: {
          md: md`"Which insurers have you spoken to?"`,
          choices: [
            { text: "Admit none yet and reframe it as a long-term hypothesis.", score: 4, feedback: "The correction helps, but you spent credibility you will need for the rest of the interview." },
          ],
        },
        c: {
          md: md`"Why would an insurer ever trust data from a vendor its customer pays?"`,
          choices: [
            { text: "They should not, by default. It would need tamper-evident records, configuration-bound evidence, independent review, and a track record linking evidence metrics to losses. That is why it is years out, and why our records are built for assessors first.", score: 10, feedback: "You name the real objection and the prerequisites. That is what makes a vision credible." },
            { text: "Because our AI is unbiased.", score: 0, feedback: "Not an answer to a trust and incentives question." },
          ],
        },
      },
    },
  ],
};

export default lesson;
