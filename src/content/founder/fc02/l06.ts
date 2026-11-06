import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l06",
  title: "MVP scoping and pilots",
  summary:
    "An MVP is the cheapest test of your riskiest assumption, not a small version 1. How to pick the assumption, choose the MVP type (concierge, Wizard of Oz, fake door, single feature, pilot), and design B2B pilots with written success criteria, a conversion path and an exit, so they end in a contract instead of pilot purgatory.",
  minutes: 80,
  objectives: [
    "You can identify the riskiest assumption and choose the cheapest MVP type that tests it.",
    "You can explain concierge and Wizard-of-Oz MVPs and when each is honest and appropriate.",
    "You can write pilot success criteria that are measurable, agreed with the buyer in advance, and tied to a conversion decision.",
    "You can size whether a pilot result matters commercially using the customer's own value equation.",
  ],
  concepts: [
    {
      id: "fc02.mvp",
      name: "Minimum viable product",
      description:
        "Eric Ries: the version of a product that allows a full turn of the build-measure-learn loop with the least effort. Its purpose is validated learning about the riskiest assumption, not a first release with fewer features.",
      competency: "fc-product",
      related: ["fc02.assumption-mapping", "fc02.risk-exposure"],
    },
    {
      id: "fc02.concierge-woz",
      name: "Concierge and Wizard-of-Oz MVPs",
      description:
        "Concierge: you deliver the value manually and the customer knows it. Wizard of Oz: the customer interacts with what looks like the product while people do the work behind it. Both test desirability before automation is built.",
      competency: "fc-product",
      related: ["fc02.mvp"],
    },
    {
      id: "fc02.pilot-success-criteria",
      name: "Pilot success criteria",
      description:
        "Measurable conditions, agreed in writing with the buyer before the pilot starts, that determine whether the pilot succeeded and what happens next (contract, price, scope). The main defence against pilot purgatory.",
      competency: "fc-product",
      related: ["fc02.acceptance-criteria", "fc02.commitment-advancement"],
    },
    {
      id: "fc02.pilot-purgatory",
      name: "Pilot purgatory",
      description:
        "A pilot that never converts: extended, expanded or left running for free because success was never defined, the economic buyer was never involved, or there was no agreed next step.",
      competency: "fc-product",
      related: ["fc02.pilot-success-criteria"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "The smallest thing that tests the biggest risk",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Both Afterwave and Mizan are pilot-led businesses: enterprise test labs and plants do not buy software from a website; they run a pilot first. A well-designed pilot is your best sales asset (a reference, a case study, a contract); a badly designed one consumes months of your cofounders' time and ends with "very interesting, let's extend it". You own the pilot design: the scope, the success criteria, the commercial terms and the conversion path.`,
        },
        {
          kind: "md",
          md: md`### What an MVP is (and is not)

Eric Ries (*The Lean Startup*, 2011) defines the MVP as the version of a product that allows a full turn of the **build, measure, learn** loop with the least effort. The key word is **learn**: the MVP exists to test an assumption, so you design it backwards from the assumption.

1. Take the top-left of your assumption map (lesson 1), ranked by risk exposure.
2. Write the test: "We believe [assumption]. We will know it is true when [measurable signal] from [whom] by [date]."
3. Choose the **cheapest artefact** that can produce that signal. Often it is not software.

Many practitioners now call this a **riskiest assumption test** to stress that the goal is the test, not the product.

### MVP types

| Type | What it is | Tests | Afterwave / Mizan example |
|---|---|---|---|
| **Concierge** | You deliver the outcome by hand; the customer knows it is manual | Desirability, willingness to pay, what "good" looks like | Ismail and Yusuf manually analyse one lab's change log and test history and hand over a ranked "rerun these and why" list for one release |
| **Wizard of Oz** | Customer uses an interface that looks automated; people do the work behind it | Desirability and usability of the interaction | Mizan's "explain the drop" view is a static report Omar compiles daily while the analytics are still semi-manual |
| **Fake door / smoke test** | Offer something that does not exist yet and measure who asks for it | Demand at a stated price | A pricing page or one-pager offering an "evidence export for the Machinery Regulation" and counting requests from existing contacts |
| **Single feature** | One feature, built properly, nothing else | Core value and technical feasibility | Lockstep alignment on one bench, no other features |
| **Piecemeal** | Stitch existing tools together | Workflow value before building | Existing DAQ export plus a notebook plus a shared drive |
| **Pilot (B2B)** | Time-boxed deployment at a customer with agreed criteria | Value in their environment, viability (security, procurement), conversion | One lab, one bench, 8 weeks; one plant, 12 weeks |

Paul Graham's essay *Do Things That Don't Scale* (2013) makes the same argument from the founder side: the manual work early on teaches you what to automate, and it wins the first customers.

**Honesty rule.** A Wizard-of-Oz MVP must not misrepresent what the customer is buying where it matters to them. For enterprise and government buyers, tell them what is automated and what is not, especially where data handling is involved. The test still works, because you are measuring whether they use and value the output.`,
        },
        {
          kind: "flow",
          title: "B2B pilot lifecycle",
          steps: [
            { label: "Qualify", detail: "Real problem, economic buyer identified, budget source, security or procurement path known" },
            { label: "Scope", detail: "One site or bench, one job, fixed duration, data and access listed" },
            { label: "Success criteria", detail: "Measurable, agreed in writing by the buyer, with the baseline" },
            { label: "Commercials", detail: "Pilot fee (or a clear reason it is free), conversion terms and price if criteria are met" },
            { label: "Run", detail: "Weekly check-ins, a shared tracker, issues logged; no scope added without trade-off" },
            { label: "Readout", detail: "Results against criteria, presented to the economic buyer" },
            { label: "Decide", detail: "Convert, or end with a documented reason; never an open-ended extension" },
          ],
          caption: "Most pilot failures are designed in at the qualify and success-criteria steps, long before any software runs.",
        },
        {
          kind: "md",
          md: md`### What makes success criteria good

1. **Measured against a baseline** taken before the pilot (bench-days per release today; soiling loss and cleaning dates today).
2. **Owned by the buyer**: they wrote or signed them, so meeting them obliges a decision.
3. **Few**: one primary outcome, one or two supporting, one guardrail.
4. **Tied to a decision**: "If criteria 1 and 2 are met, we proceed to an annual licence for N benches at EUR X."
5. **Achievable in the time box**, given realistic data and access delays.

### Is the result worth anything? Size it first

Before agreeing criteria, check that success would matter to the buyer using **their** value equation. For a soiling pilot:`,
        },
        { kind: "equation", formula: "fc02-soiling-value" },
        {
          kind: "md",
          md: md`If the answer at pilot scale is small, the pilot is a **validation** step (methodology, credibility, reference) and its criteria should be about accuracy and operational use, with the commercial case argued at the scale where value is large. That is a legitimate pilot, as long as both sides know it.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Designing the Mizan soiling pilot",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Success criteria for a Shagaya Phase I soiling pilot (illustrative)",
          given: md`Mizan is targeting a soiling analytics pilot at Shagaya Phase I's PV plant (about 11 MW, reported in a 2020 study as cleaned monthly with water), operated by KISR, with KISR researchers as methodology partner. Riskiest assumptions (from lesson 1): data access, then estimate accuracy, then whether the operator would change cleaning timing. **Pilot design is illustrative, not an agreed plan.**`,
          steps: [
            {
              md: md`**Choose the MVP type.** A full product is unnecessary. A 12-week pilot in shadow mode: Mizan produces a daily soiling estimate and a weekly "would we have cleaned?" note, while the plant keeps its normal schedule. This tests accuracy and usefulness without asking the operator to take operational risk (the anxiety force from lesson 3).`,
            },
            {
              md: md`**Baseline.** Agree the period: the 12 months of data before the pilot, cleaning dates and any reference soiling measurement. Without a baseline, no criterion can be judged.`,
            },
            {
              md: md`**Success criteria (draft for the partners to edit and sign).**

| # | Criterion | Measure | Target |
|---|---|---|---|
| S1 (primary) | Estimate accuracy | Daily soiling loss estimate versus reference measurement (soiling station or clean/soiled reference pair) | Within 1.5 percentage points on at least 80% of valid days |
| S2 | Cleaning detection | Cleaning events identified from operational data alone | All logged cleanings detected within 1 day |
| S3 | Operational usefulness | Number of weekly notes the O&M team reviews and rates useful | At least 8 of 12 |
| G1 (guardrail) | No operational burden | Extra staff time required from the plant | Under 2 hours per week |`,
            },
            {
              md: md`**Decision path.** If S1 and S2 are met: (a) co-author a methodology note with KISR researchers; (b) propose a second phase where cleaning dates are moved on Mizan's recommendation for part of the plant, with a measured comparison against the rest. If S1 fails: publish what was learned and decide with KISR whether a reference sensor is needed.`,
            },
          ],
          result: md`The pilot is designed to produce three things buyers of large plants care about: a validated accuracy number, a credible methodology partner, and evidence that operators use the output. Commercial value is argued at scale (next example), not at 11 MW.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What is a 1.5-point soiling reduction worth? (illustrative)",
          given: md`Use $V = E_{\text{yr}} \times \Delta L \times p$. Illustrative assumptions: specific yield 1,700 kWh per kW per year for both plants; reduction in average soiling loss $\Delta L = 1.5$ percentage points; value of energy to the owner $p$ = USD 0.02/kWh (the order of recent Gulf solar PPA tariffs). Compare the 11.15 MW Shagaya PV plant with a 1,100 MW plant (the size of Shagaya Phase III Zone 1). Ignore changes in cleaning cost.`,
          steps: [
            {
              md: md`Annual energy of the 11.15 MW plant: $E = 11{,}150\ \text{kW} \times 1{,}700$ kWh/kW.`,
              hidden: true,
              check: { prompt: "Annual energy, 11.15 MW plant", answer: 18.955, unit: "GWh", tolerance: { abs: 0.01 } },
            },
            {
              md: md`Value at 11.15 MW: $V = 18.955 \times 10^6 \times 0.015 \times 0.02$.`,
              hidden: true,
              check: { prompt: "Annual value, 11.15 MW plant", answer: 5686.5, unit: "USD/yr", tolerance: { abs: 5 } },
            },
            {
              md: md`Value at 1,100 MW: $V = 1{,}100{,}000 \times 1{,}700 \times 0.015 \times 0.02$.`,
              hidden: true,
              check: { prompt: "Annual value, 1,100 MW plant", answer: 561000, unit: "USD/yr", tolerance: { abs: 500 } },
            },
          ],
          result: md`About USD 5.7k a year at 11 MW versus about USD 561k a year at 1,100 MW (before cleaning-cost changes). The pilot will never pay for itself at the pilot site; its value is the validated method that sells at GW scale. Write the criteria accordingly and say so openly to partners.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running pilots that convert",
      blocks: [
        {
          kind: "md",
          md: md`### The pilot agreement

Put it on one or two pages, signed by someone with budget authority:

- **Scope**: site or benches, products and features in and out, duration with start and end dates.
- **Responsibilities**: what the customer provides (data, access, a named champion, IT contact, hours per week), what you provide.
- **Success criteria**: the table, with baseline and measurement method.
- **Commercials**: pilot fee, or a clear reason it is free (for example, a research collaboration with publication rights); and the **conversion terms**: "if criteria are met, the customer intends to proceed to [scope] at [price]".
- **Data**: ownership, where it is stored (on-prem in Enclave, in-country), retention and deletion at the end, publication rights.
- **Exit**: what happens if criteria are not met, and when the pilot ends.

**Paid pilots** filter for real buyers: even a modest fee requires a budget holder to approve it, which tests viability. A common practice is to credit the pilot fee against the first year's licence if they convert.

### Public and government buyers

For Mizan, many buyers (utilities, ministries, research bodies) contract through public procurement rules. A research collaboration with KISR, a pilot below a direct-contracting threshold and a full tender are different routes with different timelines. Find out which applies before designing commercials, and never split a requirement to stay under a threshold.`,
        },
        { kind: "xref", to: "m11.capt-role", note: "Kuwait public procurement thresholds and CAPT's role (Track 0, m11): check which route a government pilot falls under." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How pilots end in purgatory",
          md: md`**No economic buyer.** The champion loves it, but the person with budget was never in the room. Ask in qualification: "Who signs the contract if this works?"

**Criteria written after the fact.** You will be judged on criteria the customer invents at the readout. Agree them before kickoff.

**Free and open-ended.** Nothing costs the customer anything, so nothing forces a decision.

**Scope creep.** "Can it also do X?" Every addition moves the end date and dilutes the result. Log requests for phase two.

**Too big to start.** A pilot across 20 benches or a whole plant takes months to set up. One bench or one block is enough to test the assumption.`,
        },
        {
          kind: "checklist",
          title: "Before you agree to a pilot",
          items: [
            "The riskiest assumption it tests is written down.",
            "The economic buyer is named and has seen the success criteria.",
            "Baseline data exists or will be collected before the pilot starts.",
            "At most three success criteria plus one guardrail, each measurable.",
            "Conversion terms (scope and price if successful) are written down.",
            "Data ownership, location and deletion are agreed.",
            "There is an end date and a readout meeting in the calendar.",
            "Your cofounders have confirmed the effort fits the appetite.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l06-p1",
            type: "short",
            prompt: md`Write a **one-page pilot proposal for Afterwave** with a hardware test lab (actuator, drive or battery). It should cover: the riskiest assumption being tested; MVP type and scope (benches, products, duration); baseline; two or three success criteria plus a guardrail, each with measure and target; customer and Afterwave responsibilities; commercials (pilot fee or rationale for none, and conversion terms); data handling (Enclave, on-prem, deletion); and the exit. Use illustrative numbers, labelled.`,
            rubric: [
              "Names one riskiest assumption and a scope that tests it cheaply (one or two benches, fixed weeks), consistent with the products' roles.",
              "Success criteria are measurable against a stated baseline, owned by the buyer, few in number, with a guardrail.",
              "Responsibilities on both sides are concrete (named champion, IT contact, data exports, hours per week).",
              "Commercials include a pilot fee or explicit rationale and clear conversion terms (scope and price if criteria are met).",
              "Data handling addresses on-prem or Enclave deployment, ownership and deletion; an exit and end date are stated.",
            ],
            modelAnswer: md`**Riskiest assumption.** Lab history (test results, firmware versions, rig configurations) is rich enough for Ripple's recommendations to match a full rerun's findings at a fraction of the bench time.

**MVP type and scope.** Pilot, shadow mode. Two benches, 10 weeks, Lockstep capture on both benches and Ripple ranking for every firmware release candidate in the period (expected 3). Ripple recommends; the lab still runs its normal regression. Out of scope: automated test skipping, integrations beyond the lab's existing DAQ file export.

**Baseline (illustrative).** Last two quarters: average 4.0 bench-days of regression per release candidate; 1 regression found in a later gate.

**Success criteria (to be agreed and signed by the head of validation).**
| # | Measure | Target |
|---|---|---|
| S1 | Share of failures found by the full rerun that were in Ripple's recommended set | At least 95% across the pilot's releases |
| S2 | Bench time of the recommended set versus full rerun | At most 40% of full-rerun bench time |
| S3 | Engineers rating the "why" explanations useful in the weekly check | At least 2 of 3 engineers by week 6 |
| G1 | No disturbance to existing DAQ acquisition | Zero dropped samples attributable to Lockstep |

**Responsibilities.** Lab: a named champion (test systems lead), an IT contact, read access to test results and firmware version history, 2 hours per week for check-ins. Afterwave: installation inside Enclave on a lab server, weekly results note, all analysis work.

**Commercials (illustrative).** Pilot fee EUR 15k, credited against the first-year licence on conversion. If S1 and S2 are met, the lab intends to proceed to an annual licence for 10 benches at EUR 6k per bench per year, decision within 3 weeks of the readout.

**Data.** All data stays on the lab's server inside Enclave; no outbound connections; the lab owns all captured data and results; Afterwave deletes its copy of any exports within 30 days of the pilot end unless the lab agrees otherwise in writing.

**Exit.** Pilot ends on a fixed date with a readout to the head of validation. If criteria are not met, both sides document why and the pilot closes; any extension requires new written criteria.`,
            explanation: md`Graders look for a pilot that tests one assumption cheaply, has buyer-owned measurable criteria against a baseline, and ends in a decision rather than an extension.`,
            concepts: ["fc02.pilot-success-criteria", "fc02.mvp", "fc02.pilot-purgatory"],
            difficulty: 3,
          },
        },
        { kind: "scenario", scenario: "fc02-s2" },
        { kind: "sources", refs: ["fc02-r14", "fc02-r15"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l06-q1",
      type: "mcq",
      prompt: md`What is the purpose of an MVP in Ries' definition?`,
      options: [
        "A first release with the most important features.",
        "The least-effort version that allows a full build-measure-learn loop to test an assumption.",
        "A demo for investors.",
        "A cheaper product for price-sensitive customers.",
      ],
      answer: 1,
      explanation: md`The MVP is designed backwards from the assumption it tests. It can be a manual service, a fake door or a pilot, not necessarily software.`,
      concepts: ["fc02.mvp"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l06-q2",
      type: "mcq",
      prompt: md`Ismail and Yusuf manually analyse a lab's change history and hand over a ranked rerun list, and the lab knows it is manual. This is a:`,
      options: ["Wizard-of-Oz MVP", "Concierge MVP", "Fake door test", "Single-feature MVP"],
      answer: 1,
      explanation: md`Concierge: the value is delivered by hand and the customer knows it. In Wizard of Oz the customer sees what looks like an automated product.`,
      concepts: ["fc02.concierge-woz"],
      difficulty: 1,
    },
    {
      id: "fc02-l06-q3",
      type: "numeric",
      prompt: md`A 50 MW plant yields 1,800 kWh per kW per year. A pilot reduces soiling loss by 1 percentage point. Energy is worth USD 0.02/kWh. What is the annual value in USD?`,
      answer: 18000,
      tolerance: { abs: 50 },
      unit: "USD/yr",
      explanation: md`$E = 50{,}000 \times 1{,}800 = 90 \times 10^6$ kWh; $V = 90 \times 10^6 \times 0.01 \times 0.02 = 18{,}000$ USD/yr.`,
      concepts: ["fc02.pilot-success-criteria"],
      difficulty: 2,
    },
    {
      id: "fc02-l06-q4",
      type: "multi",
      prompt: md`Which are causes of pilot purgatory? (Select all.)`,
      options: [
        "Success criteria agreed only at the readout.",
        "No economic buyer involved.",
        "A paid pilot credited against the first licence.",
        "Open-ended free pilot.",
        "A fixed end date with a readout meeting booked.",
      ],
      answer: [0, 1, 3],
      explanation: md`Late criteria, no buyer and free open-ended terms remove the forcing function. A paid, credited pilot and a fixed end date are defences.`,
      concepts: ["fc02.pilot-purgatory"],
      difficulty: 1,
    },
    {
      id: "fc02-l06-q5",
      type: "decision",
      prompt: md`A lab offers a pilot across 20 benches, free, "to see what it can do". Your team can support 2 benches properly. What do you propose?`,
      options: [
        { text: "Accept 20 benches: more data and more visibility.", score: 0.1, feedback: "Months of setup, unclear criteria and no commitment: classic purgatory." },
        { text: "Propose 2 benches for 10 weeks with written success criteria, a modest fee credited on conversion, and conversion terms for the wider rollout if criteria are met.", score: 1, feedback: "Right size, a forcing function and a path to the 20 benches." },
        { text: "Decline: free pilots are always bad.", score: 0.3, feedback: "Too rigid; the opportunity is real and can be reshaped." },
        { text: "Accept 20 benches free but only support 2 actively.", score: 0.2, feedback: "Sets up 18 benches to disappoint." },
      ],
      explanation: md`Shrink the scope to what tests the assumption well, and add the commitment that forces a decision.`,
      concepts: ["fc02.pilot-success-criteria", "fc02.pilot-purgatory"],
      difficulty: 2,
    },
    {
      id: "fc02-l06-q6",
      type: "order",
      prompt: md`Order the B2B pilot lifecycle.`,
      items: ["Qualify", "Scope", "Success criteria", "Commercials", "Run", "Readout", "Decide"],
      explanation: md`Qualify the buyer and route first; scope and criteria before commercials; run, read out to the economic buyer, decide.`,
      concepts: ["fc02.pilot-success-criteria"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc02-l06-f1", front: "MVP (Ries)", back: "The least-effort version that allows a full build-measure-learn loop. Designed backwards from the riskiest assumption.", concepts: ["fc02.mvp"] },
    { id: "fc02-l06-f2", front: "Concierge vs Wizard of Oz", back: "Concierge: manual and the customer knows. Wizard of Oz: looks automated, people behind the curtain.", concepts: ["fc02.concierge-woz"] },
    { id: "fc02-l06-f3", front: "Five properties of good pilot criteria", back: "Against a baseline, owned by the buyer, few, tied to a decision, achievable in the time box.", concepts: ["fc02.pilot-success-criteria"] },
    { id: "fc02-l06-f4", front: "Pilot purgatory", back: "A pilot that never converts: no criteria, no economic buyer, free and open-ended, scope creep.", concepts: ["fc02.pilot-purgatory"] },
    { id: "fc02-l06-f5", front: "Value of reduced soiling", back: md`$V = E_{\text{yr}} \times \Delta L \times p$. Roughly 100 times larger at 1,100 MW than at 11 MW.`, concepts: ["fc02.pilot-success-criteria"] },
    { id: "fc02-l06-f6", front: "Why charge for a pilot?", back: "A fee needs a budget holder's approval, which tests viability and forces a decision. Credit it against the first licence.", concepts: ["fc02.pilot-purgatory"] },
  ],
  scenarios: [
    {
      id: "fc02-s2",
      title: "\"Can we extend the pilot another three months?\"",
      context: md`Week 9 of a 10-week Afterwave pilot at a drive-unit lab (illustrative). Results are good: Ripple's recommended sets caught every failure the full reruns found on the three releases, at about 35% of the bench time. The test systems lead, your champion, calls: "Everyone likes it. Can we extend for three months, add four more benches and try it on the inverter rigs too? Budget is tight until next year."`,
      start: "a",
      concepts: ["fc02.pilot-purgatory", "fc02.pilot-success-criteria"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Agree: good relationship, more data, bigger reference.", score: 2, feedback: "An open-ended free extension with more scope is the definition of purgatory.", next: "c" },
            { text: "Thank them, then point to the agreed criteria: both were met. Ask for the readout with the head of validation, as planned, to decide on the conversion terms.", score: 9, feedback: "Uses the signed criteria as the forcing function and brings in the economic buyer.", next: "b" },
            { text: "Threaten to remove the software at week 10 unless they sign.", score: 3, feedback: "Right instinct on the deadline, wrong tone; it damages the champion relationship.", next: "b" },
          ],
        },
        b: {
          md: md`At the readout the head of validation agrees the criteria were met, but says the licence budget is not available until next fiscal year, four months away.`,
          choices: [
            { text: "Propose a bridge: a signed licence agreement now with a start date at the new fiscal year, and continued use on the two pilot benches meanwhile for a small bridge fee or as part of the first-year price.", score: 10, feedback: "Converts the decision now and solves the budget timing without giving away the expansion.", next: "d" },
            { text: "Leave it running for free until the budget arrives.", score: 4, feedback: "You keep goodwill but lose the decision; four months later priorities may have changed." },
            { text: "Offer a 50% discount to sign this quarter.", score: 4, feedback: "May work, but it sets the price anchor for every future renewal and the problem was timing, not price." },
          ],
        },
        c: {
          md: md`Three months later, the extended pilot runs on six benches. The champion has moved teams, and the new lead asks what the success criteria were.`,
          choices: [
            { text: "Restart: agree new written criteria and conversion terms with the new lead and the head of validation, with a fixed end date.", score: 5, feedback: "Recovers, at the cost of three months and the original momentum." },
          ],
        },
        d: {
          md: md`The licence is signed with a start date at the new fiscal year, covering 10 benches, with the inverter rigs as a priced option.`,
          choices: [
            { text: "Ask the lab for permission to be named as a reference and agree a short case study.", score: 10, feedback: "Converts pilot success into the next pilot's anxiety reducer (a reference)." },
          ],
        },
      },
    },
  ],
};

export default lesson;
