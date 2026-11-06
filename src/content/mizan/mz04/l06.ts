import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz04-l06",
  title: "Selling the cleaning decision: credible savings, M&V and sharing gains",
  summary:
    "How to present cleaning savings so that an O&M engineer, an IPP CFO and a MEWRE official all believe them: an agreed weather-corrected baseline, paired control blocks, detectable effect sizes, verified net savings and gain-sharing structures that survive a dusty or a rainy year.",
  minutes: 65,
  objectives: [
    "You can define a savings baseline that removes weather and season, using temperature-corrected PR",
    "You can design a paired-block M&V test and compute how many days it needs to detect a given saving",
    "You can compute verified net savings and a gain-sharing fee, at the buyer's value of energy",
    "You can frame the same result for an IPP, an O&M contractor, MEWRE and KISR",
  ],
  concepts: [
    {
      id: "mz04.savings-baseline",
      name: "Adjusted savings baseline",
      description: "Savings are measured against what the plant would have produced under the old policy in the same weather, using a temperature-corrected PR (IEC 61724, NREL weather-corrected PR) and corrections for outages and curtailment, agreed before the change.",
      competency: "mz-cleaning",
      related: ["m12.performance-ratio", "m02.performance-ratio"],
    },
    {
      id: "mz04.mv-design",
      name: "Paired-block M&V design",
      description: "Run the new cleaning policy on treatment blocks and keep matched neighbouring control blocks on the old policy; the difference cancels weather and season, unlike a before-after comparison.",
      competency: "mz-cleaning",
      related: ["mz04.savings-baseline"],
    },
    {
      id: "mz04.detectable-effect",
      name: "Minimum detectable saving",
      description: "n = ((z + z)σ/δ)²: the noise of daily block differences and the size of the saving set how long a test must run; autocorrelation means more days than the formula.",
      competency: "mz-cleaning",
    },
    {
      id: "mz04.gain-sharing",
      name: "Gain-sharing on verified savings",
      description: "The provider earns a share α of verified net savings (energy value recovered minus extra cleaning cost), usually with a fixed fee floor and a cap; the value of energy in the contract decides who the natural buyer is.",
      competency: "mz-cleaning",
      related: ["fc04.value-based-pricing", "fc04.paid-pilot"],
    },
    {
      id: "mz04.audience-framing",
      name: "Framing savings by audience",
      description: "IPP: revenue and O&M in USD; O&M contractor: cost per cycle and bonuses; MEWRE: fuel and KWD net of tariff; KISR: validated, publishable method. Same numbers, different value of energy and units.",
      competency: "mz-cleaning",
      related: ["mz04.value-of-soiled-mwh"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Why most savings claims are not believed",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every buyer of a cleaning optimisation has heard "save 5 % of your energy" before. What wins the Shagaya pilot, an IPP contract or a MEWRE framework is not a bigger number but a number measured in a way the buyer agreed to in advance. You own the commercial side: you write the M&V clause, price it, and defend it in the room. This lesson is the toolkit.`,
        },
        {
          kind: "md",
          md: md`## The counterfactual problem

A saving is a difference between what happened and what **would have happened** under the old policy. The second number is never observed. Three classic ways to fake it, all common in sales decks:

1. **Before-after:** "PR rose 3 points after we started." But the after-period had different weather, temperatures and dust; spring and autumn PR differ by more than that.
2. **Cherry-picking:** showing the best block or the best month.
3. **Regression to the mean:** starting right after an exceptionally dusty period, when anything looks like an improvement.

## Step 1: an adjusted baseline

Use a performance metric that removes weather: the **temperature-corrected PR** (IEC 61724-1 monitoring; NREL weather-corrected PR corrects to an annual-average cell temperature). Exclude or correct periods of outage, curtailment and clipping. Then soiling loss is estimated against that corrected expectation (soiling stations, or SRR extraction from operational data). Agree all of this, in writing, **before** the change: the IPMVP framework used for energy-efficiency contracts is a good template for the structure (baseline period, adjustments, measurement boundary, reporting).`,
        },
        { kind: "xref", to: "m12-l01", note: "Track 0: monitoring, PR, availability and data quality. The baseline here is built on that monitoring system." },
        {
          kind: "widget",
          widget: "pr-correction",
          caption: "See how basic PR swings with the season while weather-corrected PR stays flat, and how the soiling sawtooth appears in the corrected series. A savings claim must be made on the corrected series.",
        },
        {
          kind: "md",
          md: md`## Step 2: paired control blocks

The strongest design available on an operating plant: split it into matched pairs of blocks (same inverter type, orientation, age, similar historical performance and dust exposure). Run the new cleaning policy on one block of each pair and the old policy on the other, for at least one season. Weather, temperature, aerosols and grid events hit both blocks of a pair alike, so the **difference** isolates the cleaning effect. Rotate which block is treated if the season allows, to remove block bias.

## Step 3: how long to run`,
        },
        { kind: "equation", formula: "mz04-sample-size" },
        {
          kind: "md",
          md: md`With $\sigma = 2$ points of daily difference noise and a target saving $\delta = 1$ point, $n = (2.80 \times 2/1)^2 \approx 32$ independent days. Soiling persists from day to day, so daily differences are autocorrelated: plan for a full season, not a month. If the expected saving is 0.5 points, the test needs four times as long; that is a reason **not** to sell small improvements.

## Step 4: verified net savings and who pays`,
        },
        { kind: "equation", formula: "mz04-verified-savings" },
        { kind: "equation", formula: "mz04-gain-share" },
        {
          kind: "flow",
          title: "From pilot to contract",
          steps: [
            { label: "Agree baseline", detail: "Corrected PR, exclusions, soiling method, value of energy" },
            { label: "Paired test", detail: "Treatment and control blocks for a season" },
            { label: "Verify", detail: "Net savings with confidence interval, reviewed by the client (and KISR for Shagaya)" },
            { label: "Scale", detail: "Plant-wide policy; control blocks shrink to a small monitoring set" },
            { label: "Share gains", detail: "Fixed fee plus share of verified savings, annual true-up" },
          ],
        },
        { kind: "sources", refs: ["mz04-r4", "mz04-r5", "mz04-r6", "mz04-r7", "mz04-r24", "mz04-r3"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Verified savings and the fee",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One season of paired blocks, scaled to the plant",
          given: md`Illustrative 500 MWp plant, $E = 10^6$ MWh/yr. Over a season the control blocks averaged 5.8 % soiling loss (old monthly calendar) and the treatment blocks 3.6 % (event-driven policy), both against corrected PR. Scaled to a year, the new policy needs USD 150,000 more cleaning. Gain share $\alpha = 30$ %.`,
          steps: [
            { md: md`Loss reduction $= 5.8 - 3.6 = 2.2$ points, so $0.022 \times 10^6 = 22{,}000$ MWh/yr recovered.` },
            { md: md`At the IPP's USD 15/MWh: $S = 22{,}000 \times 15 - 150{,}000 = 330{,}000 - 150{,}000 =$ USD 180,000/yr; fee $= 0.3 \times 180{,}000 =$ USD 54,000/yr.` },
            { md: md`At the national USD 85/MWh: $S = 22{,}000 \times 85 - 150{,}000 =$ USD 1.72 m/yr (about KWD 0.53 m); the same 30 % would be USD 0.52 m/yr.` },
          ],
          result: md`The identical engineering result is worth ten times more to the state than to the IPP. Selling to the IPP alone, the fee barely covers a pilot; the natural buyers are MEWRE, state-owned plants and mechanisms that pay the IPP part of the state's gain (lesson 2).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Can the test detect it?",
          given: md`The daily treatment-minus-control difference has $\sigma = 3$ points. You want 95 % confidence ($z = 1.96$) and 80 % power ($z = 0.84$).`,
          steps: [
            {
              md: md`For $\delta = 2.2$ points: $n = (2.80 \times 3/2.2)^2 = (3.818)^2 = 14.6$, so about 15 independent days.`,
              hidden: true,
              check: { prompt: "Independent days needed for a 2.2-point saving", answer: 14.6, unit: "days", tolerance: { rel: 0.03 } },
            },
            {
              md: md`For $\delta = 0.5$ points: $n = (2.80 \times 3/0.5)^2 = 16.8^2 = 282$ days.`,
              hidden: true,
              check: { prompt: "Independent days needed for a 0.5-point saving", answer: 282, unit: "days", tolerance: { rel: 0.03 } },
            },
          ],
          result: md`A 2.2-point saving is detectable within a season even allowing for autocorrelation; a 0.5-point saving would need most of a year of independent days, longer in practice. Size the offer to what the test can prove.`,
        },
        {
          kind: "question",
          question: {
            id: "mz04-l06-p1",
            type: "numeric",
            prompt: md`Verified energy recovered 15,000 MWh/yr, extra cleaning cost USD 90,000/yr, contract value of energy USD 20/MWh, provider share 25 %. What is the provider's fee in USD/yr?`,
            answer: 52500,
            tolerance: { rel: 0.01 },
            unit: "USD/yr",
            explanation: md`$S = 15{,}000 \times 20 - 90{,}000 = 210{,}000$; fee $= 0.25 \times 210{,}000 =$ USD 52,500/yr. The share applies to **net** savings: gross energy value would overpay the provider for cleanings the owner paid for.`,
            concepts: ["mz04.gain-sharing"],
            difficulty: 1,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "In the room",
      blocks: [
        {
          kind: "md",
          md: md`**One result, four framings.**

| Audience | Lead with | Value of energy | Units | Proof they want |
|---|---|---|---|---|
| IPP CFO, asset manager | Net revenue gain, effect on DSCR | Tariff | USD/yr | Paired-block test, third-party review |
| O&M contractor | Fewer wasted cycles, bonus earned | Cost per cycle, PR bonus | USD per cycle | Work-order and soiling-ratio logs |
| MEWRE planning, finance | Fuel saved net of tariff | Displaced fuel at opportunity cost, as a range | KWD, barrels or MMBtu | Agreed protocol, audit trail for the Audit Bureau |
| KISR | Validated, publishable method | National | Papers, KWD | Open methods, uncertainty, co-authorship |

**Pricing structures** (illustrative ranges must be tested): a fixed platform fee per MWp per year (covers cost in a rainy year), plus a share of verified net savings with a cap; or a paid pilot with a pre-agreed conversion to the full contract if the paired test meets its success criteria. Public buyers in Kuwait usually buy through tenders with fixed scopes, so gain-sharing may need to be expressed as performance-based payment within a tendered scope.`,
        },
        { kind: "xref", to: "fc04-l06", note: "Founder Core: pilots and proofs of concept that convert (paid pilots, success criteria, conversion clauses). The paired-block test is Mizan's success criterion." },
        { kind: "xref", to: "fc04-l07", note: "Founder Core: value-based pricing, packaging and negotiation." },
        { kind: "xref", to: "m11-l01", note: "Track 0: the Public Tenders Law and CAPT, which constrain how a ministry or KISR can buy a performance-based service." },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Before-after claims** in a deck: the first engineer in the room will ask about weather. 2. **Baseline agreed after the results**: every party then argues for the baseline that suits it. 3. **Gross instead of net savings.** 4. **No confidence interval**: a point estimate invites a fight in a bad year. 5. **Unclean "clean" reference sensors** making soiling look smaller. 6. **Selling a saving smaller than the test can detect.** 7. **Quoting the IPP tariff to MEWRE**, or fuel value to the IPP.`,
        },
        {
          kind: "checklist",
          title: "M&V protocol contents",
          items: [
            "Measurement boundary: which blocks, inverters and meters",
            "Baseline metric (temperature-corrected PR) and soiling method (stations, SRR), with versions",
            "Exclusions: outages, curtailment, clipping, sensor faults, and how they are filled",
            "Pairing and rotation of treatment and control blocks; test duration from the sample-size calculation",
            "Value of energy and cleaning-cost accounting agreed in advance",
            "Reporting: monthly interim, seasonal verified result with confidence interval, independent reviewer",
          ],
        },
        { kind: "scenario", scenario: "mz04-s3" },
        {
          kind: "feynman",
          prompt: "Explain to a MEWRE finance official, in plain words, why Mizan insists on keeping part of the plant on the old cleaning schedule during the pilot, and why that makes the savings figure more valuable to him.",
          keyPoints: [
            "A saving compares what happened with what would have happened, and the second can never be observed directly",
            "Weather, dust and temperature change all the time, so comparing before and after mixes them with the effect of cleaning",
            "Keeping matched blocks on the old schedule lets both experience the same weather, so the difference is due to cleaning",
            "The result comes with a confidence interval and a method agreed in advance, which can stand up to audit",
            "A credible smaller number is worth more than an impressive one nobody can verify",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz04-l06-p2",
            type: "short",
            prompt: md`Write the "Measurement, verification and commercial terms" section (about one page) of Mizan's proposal for the targeted Shagaya Phase I soiling analytics pilot with KISR. Include the baseline, the test design and duration, how savings are computed and in which value of energy, and a pricing structure that works for a public research body.`,
            rubric: [
              "Baseline: temperature-corrected PR to IEC 61724 (NREL weather-corrected PR), exclusions, soiling method, agreed before the change",
              "Paired treatment and control blocks for at least a season, with a sample-size argument and acknowledgement of autocorrelation",
              "Net savings formula, valued at the national displaced-fuel value as a range in KWD (state-owned plant), with a confidence interval",
              "Pricing appropriate for a public body (fixed-scope paid pilot or research collaboration, performance element only if procurement allows), no invented prices presented as fact",
              "Joint publication and data handling with KISR as methodology partner; pilot described as targeted or in preparation",
              "Success criteria and what happens next (conversion to an operational service or a broader MEWRE engagement)",
            ],
            modelAnswer: md`**Measurement, verification and commercial terms (draft for the targeted Shagaya Phase I pilot).** *Baseline.* Performance is measured as temperature-corrected PR following IEC 61724-1 and the NREL weather-corrected PR method, computed per inverter block. Outages, curtailment and sensor faults are excluded by rules fixed before the test. Soiling loss is estimated against corrected PR with the SRR method and checked against reference devices; KISR reviews and co-signs the baseline before any cleaning change. *Design.* Blocks are paired by technology (thin-film and poly-Si sections), orientation and historical PR. In each pair one block follows the event-driven policy (trigger rule, storm postponement, dew-aware wet cleaning) and one keeps the current monthly calendar. With daily difference noise around 2 to 3 points, a 2-point effect needs roughly 15 to 32 independent days; because soiling is autocorrelated, the test runs a full dust season and rotates blocks where possible. Historical data, including the 2018 to 2019 cleaning-arm outage if KISR confirms it, are used to validate the soiling-extraction method. *Savings.* Net savings $S = (\bar L_{\text{control}} - \bar L_{\text{treatment}})\,E\,v - \Delta C_{\text{cleaning}}$, valued at the displaced-fuel value because the plant is state-owned: shown as a range (LNG in a CCGT about 26 fils/kWh to crude in a steam unit about 37 fils/kWh) in KWD, with a 90 % confidence interval. *Commercial terms.* A fixed-scope, fixed-fee pilot (or a research collaboration, whichever KISR's procurement rules allow) covering setup, analysis and reporting; no gain-share in the pilot. If the test meets the agreed success criterion (a statistically significant net saving at the agreed confidence), the parties propose an operational service to MEWRE with a fixed platform fee plus a capped performance payment tied to verified fuel savings, procured under the applicable tender rules. *Publication.* Methods and results are published jointly with KISR researchers; raw data stay with KISR under an agreed data-handling note.`,
            explanation: md`The section must make the savings auditable (baseline, pairing, uncertainty), use the right value of energy for a state-owned plant, respect public procurement, and position KISR as a co-author rather than a customer being sold to.`,
            concepts: ["mz04.savings-baseline", "mz04.mv-design", "mz04.gain-sharing", "mz04.audience-framing"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz04-l06-q1",
      type: "mcq",
      prompt: md`Why is a before-after comparison a weak way to prove cleaning savings?`,
      options: [
        "It needs too many sensors",
        "Weather, temperature and dust differ between the periods, so their effects are mixed with the cleaning effect",
        "It cannot be computed with PR",
        "IEC 61724 forbids it",
      ],
      answer: 1,
      explanation: md`Seasonal PR swings and dust events can exceed the effect being claimed; paired blocks in the same period cancel them.`,
      concepts: ["mz04.mv-design"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz04-l06-q2",
      type: "numeric",
      prompt: md`Daily difference noise σ = 2.5 points, target saving 1.5 points, 95 % confidence and 80 % power (z sum 2.80). How many independent days are needed?`,
      answer: 21.8,
      tolerance: { rel: 0.03 },
      unit: "days",
      explanation: md`$n = (2.80 \times 2.5/1.5)^2 = 4.667^2 = 21.8$. Plan for more calendar days because of autocorrelation.`,
      concepts: ["mz04.detectable-effect"],
      difficulty: 2,
    },
    {
      id: "mz04-l06-q3",
      type: "multi",
      prompt: md`Which belong in an M&V protocol agreed before a cleaning change? (Select all.)`,
      options: [
        "Baseline metric and correction method",
        "Exclusion rules for outages and curtailment",
        "Value of energy for computing savings",
        "The provider's preferred result",
        "Pairing of treatment and control blocks",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Everything that could be argued afterwards must be fixed in advance.`,
      concepts: ["mz04.savings-baseline", "mz04.mv-design"],
      difficulty: 1,
    },
    {
      id: "mz04-l06-q4",
      type: "mcq",
      prompt: md`A gain-share is applied to which quantity?`,
      options: ["Gross energy value recovered", "Verified net savings: energy value recovered minus extra cleaning cost", "Total cleaning spend", "The plant's revenue"],
      answer: 1,
      explanation: md`The owner pays for the extra cleanings; sharing gross value would pay the provider for the owner's own spend.`,
      concepts: ["mz04.gain-sharing"],
      difficulty: 1,
    },
    {
      id: "mz04-l06-q5",
      type: "numeric",
      prompt: md`The same verified result (20,000 MWh/yr recovered, USD 100,000/yr extra cleaning) is valued at USD 15/MWh by an IPP and USD 85/MWh by the state. What is the ratio of the state's net savings to the IPP's?`,
      answer: 8,
      tolerance: { rel: 0.01 },
      explanation: md`IPP: $300{,}000 - 100{,}000 = 200{,}000$. State: $1{,}700{,}000 - 100{,}000 = 1{,}600{,}000$. Ratio 8. This is why the value of energy in the contract decides who the natural buyer is.`,
      concepts: ["mz04.gain-sharing", "mz04.audience-framing"],
      difficulty: 2,
    },
    {
      id: "mz04-l06-q6",
      type: "decision",
      prompt: md`An IPP offers to run your new cleaning policy plant-wide immediately and judge it by comparing this year's PR with last year's. What do you answer?`,
      options: [
        { text: "Accept: plant-wide gives the biggest saving", score: 0.2, feedback: "Year-on-year PR mixes weather, degradation and dust differences; the result will be disputed either way." },
        { text: "Propose paired control blocks on the old policy for one season with a corrected-PR baseline agreed now, then scale", score: 1, feedback: "Costs a little saving for a season and buys a result both sides will accept." },
        { text: "Decline to proceed without a year of extra sensors", score: 0.3, feedback: "Better measurement helps, but blocking the pilot loses the opportunity; paired blocks work with existing data." },
      ],
      explanation: md`A credible counterfactual matters more than the size of the first year's saving.`,
      concepts: ["mz04.mv-design", "mz04.savings-baseline"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz04-l06-f1", front: "Savings baseline", back: "Temperature-corrected PR (IEC 61724, NREL weather-corrected PR) with agreed exclusions, fixed before the change.", concepts: ["mz04.savings-baseline"] },
    { id: "mz04-l06-f2", front: "Paired-block design", back: "Matched treatment and control blocks in the same period: weather cancels in the difference.", concepts: ["mz04.mv-design"] },
    { id: "mz04-l06-f3", front: "Days to detect a saving", back: md`$n = ((z_{1-\alpha/2} + z_{1-\beta})\sigma/\delta)^2$; σ = 2, δ = 1 gives about 32.`, concepts: ["mz04.detectable-effect"] },
    { id: "mz04-l06-f4", front: "Verified net savings", back: md`$S = \Delta\bar L\,E\,p - \Delta C_{\text{cleaning}}$`, concepts: ["mz04.gain-sharing"] },
    { id: "mz04-l06-f5", front: "Gain-share fee", back: md`$F = \alpha\max(S, 0)$, usually with a fixed fee floor and a cap.`, concepts: ["mz04.gain-sharing"] },
    { id: "mz04-l06-f6", front: "Same result, IPP vs state (illustrative)", back: "22,000 MWh recovered, USD 150k extra cleaning: USD 0.18 m/yr to the IPP, USD 1.72 m/yr to the state.", concepts: ["mz04.audience-framing"] },
  ],
  scenarios: [
    {
      id: "mz04-s3",
      title: "The sceptical engineer",
      context: md`You present the pilot concept to a MEWRE renewable engineer and a KISR researcher. Your slide says "event-driven cleaning recovers about 2 points of soiling loss (illustrative)".`,
      start: "a",
      concepts: ["mz04.mv-design", "mz04.savings-baseline", "mz04.audience-framing"],
      nodes: {
        a: {
          md: md`The engineer says: "Every vendor shows me a number like that. Last year was dustier than this year; how would I know it is your cleaning?"`,
          choices: [
            { text: "Explain the paired-block design and offer to agree the corrected-PR baseline and exclusions with KISR before anything changes", next: "b", score: 10, feedback: "Answers the counterfactual question directly and gives him control of the method." },
            { text: "Show a before-after chart from another country", next: "c", score: 2, feedback: "Exactly the evidence he just dismissed." },
          ],
        },
        b: {
          md: md`The KISR researcher asks: "How long will the test run, and what if the effect is smaller than you think?"`,
          choices: [
            { text: "Give the sample-size logic: a 2-point effect needs a few weeks of independent days, so one dust season with margin; if the effect is under about half a point we will say so and it is not worth selling", score: 10, feedback: "Honest about detectability; credibility with a researcher is the asset." },
            { text: "Promise the effect will be at least 2 points", score: 2, feedback: "You cannot promise a result before measuring the site." },
          ],
        },
        c: {
          md: md`The engineer is unconvinced and asks for something specific to Kuwait.`,
          choices: [
            { text: "Propose the paired test at Shagaya with KISR as methodology partner", score: 7, feedback: "Recovers by offering a local, verifiable test." },
            { text: "Cite global soiling loss estimates", score: 2, feedback: "Global averages say nothing about this plant's saving." },
          ],
        },
      },
    },
  ],
};

export default lesson;
