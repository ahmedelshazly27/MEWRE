import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz13-l02",
  title: "Defend it to KISR researchers: objections, sensor doubts and publication terms",
  summary:
    "How a research partner reviews a study, and how to defend the Shagaya design without overclaiming: the threats-to-validity lens, why the inferred soiling ratio is robust to a temperature-coefficient error and where it is not, how irradiance-sensor drift and sensor soiling bias PR and what protects against them, and how to negotiate data ownership, authorship and publication rights with a public research institute. Three graded decision trees, a Feynman check and a written reply to the methodology review.",
  minutes: 75,
  objectives: [
    "You can classify any methodological objection by the validity it threatens (construct, internal, statistical conclusion, external) and answer with evidence or a test.",
    "You can quantify how an error in the temperature coefficient or in cell temperature biases corrected PR and the inferred soiling rate, and explain why constant biases cancel in the soiling ratio.",
    "You can explain how pyranometer drift and sensor soiling bias PR in opposite directions to module soiling, and specify the protections (cleaning, calibration, redundancy, satellite cross-check).",
    "You can negotiate data, authorship and publication terms that keep KISR's scientific leadership and Mizan's freedom to operate, instead of conceding or refusing exclusivity.",
  ],
  concepts: [
    {
      id: "mz13.validity-threats",
      name: "Threats-to-validity lens",
      description:
        "Reviewers test four validities: construct (does the metric measure soiling?), internal (is the effect caused by what we claim?), statistical conclusion (is it distinguishable from noise?) and external (does it transfer to other plants?). Every objection maps to one.",
      competency: "mz-validation",
      related: ["mz03.confounders", "mz03.identifiability"],
    },
    {
      id: "mz13.temperature-sensitivity",
      name: "Temperature-correction sensitivity",
      description:
        "An error in the temperature coefficient biases corrected PR by about the coefficient error times the distance from the reference temperature; constant offsets cancel in the soiling ratio, so only temperature changes within a cleaning interval bias the soiling rate.",
      competency: "mz-validation",
      related: ["mz13.corrected-pr-baseline", "mz02.cell-temperature-models"],
    },
    {
      id: "mz13.sensor-drift",
      name: "Irradiance sensor drift and soiling",
      description:
        "A pyranometer or reference cell that drifts or gets dirty reads low, which makes PR read high and hides module soiling; slow drift mimics degradation, sensor soiling mimics a lower soiling rate.",
      competency: "mz-validation",
      related: ["mz03.sensor-soiling", "mz02.clean-reference", "mz02.station-maintenance"],
    },
    {
      id: "mz13.publication-terms",
      name: "Data, authorship and publication terms",
      description:
        "The agreement that keeps data ownership with the plant owner, gives the research partner scientific leadership (lead authorship, first publication within a time limit, review of commercial claims) and keeps Mizan's software IP and right to refer to published results.",
      competency: "mz-validation",
      related: ["mz02.data-access"],
    },
    {
      id: "mz13.partner-value-exchange",
      name: "Research partner value exchange",
      description:
        "What each side gets from the study: KISR publications, a Kuwait method and national relevance; Mizan a validated method, credibility and a reference site; the plant owner better cleaning decisions. A durable agreement gives each side what it values most at the least cost to the others.",
      competency: "mz-validation",
      related: ["mz04.audience-framing"],
    },
  ],
  sections: [
    // ============================================================ THEORY
    {
      layer: "theory",
      title: "How researchers attack a study, and the physics of the answers",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`KISR researchers will review the Shagaya design before they put their names on it, and they know the plant better than anyone at Mizan. Their objections are not obstacles: each one, answered properly, becomes a sentence in the methods section that makes the result stronger and Mizan's claims more credible to MEWRE and to Gulf IPPs later. You will often be the person in the room. You need to know which objections are fatal, which are answered by physics you can state in two lines, and which are answered by a test you add to the protocol.`,
        },
        {
          kind: "md",
          md: md`### Every objection threatens one kind of validity

| Validity | The reviewer's question | Typical Shagaya objection | Answer type |
|---|---|---|---|
| **Construct** | Does your metric measure soiling? | "Your corrected PR still contains temperature, so your soiling is heat." | Physics plus a residual test |
| **Internal** | Is the effect caused by what you say? | "During the cleaning-arm failure an inverter was also down." | Logs, filters, a control section |
| **Statistical conclusion** | Is it larger than the noise? | "Your 0.3 %/day rate has a confidence interval wider than the effect." | Uncertainty, slope precision, sample size |
| **External** | Does it transfer? | "This is an 11 MW fixed plant; Phase III will be GW-scale trackers." | Scope statement, what transfers and what must be re-validated |

Name the validity to yourself before answering. It tells you whether you need an argument, a number or a new test, and stops you answering a construct objection with a commercial reply.

### Objection 1: "your temperature correction creates the soiling signal"

The objection deserves a precise answer. Let the true coefficient be $\gamma$ and the one you used $\gamma'$. The corrected PR you compute differs from the true one by:`,
        },
        { kind: "equation", formula: "mz13-gamma-bias" },
        {
          kind: "md",
          md: md`With $\gamma = -0.40$ %/°C, $\gamma' = -0.35$ %/°C and a July cell temperature 13 °C above the reference, the bias is about $-0.65$ %: corrected PR is slightly too low in summer and slightly too high in winter. That is a **smooth seasonal bias of under 1 %**.

Soiling is a different shape: a **sawtooth** that falls between cleanings and jumps back at each cleaning. The inferred soiling ratio divides corrected PR by its own post-cleaning level, so any bias that is constant over a cleaning interval cancels. Only the change in temperature **within** an interval leaks into the soiling rate:`,
        },
        { kind: "equation", formula: "mz13-rate-leak" },
        {
          kind: "chart",
          chart: "bar",
          title: "Bias in corrected PR from a 0.05 %/°C coefficient error, by month (illustrative)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Bias in corrected PR (%)",
          series: [{ key: "bias", label: "Bias (%)" }],
          data: [
            { month: "Jan", bias: 0.88 },
            { month: "Feb", bias: 0.75 },
            { month: "Mar", bias: 0.47 },
            { month: "Apr", bias: 0.14 },
            { month: "May", bias: -0.27 },
            { month: "Jun", bias: -0.59 },
            { month: "Jul", bias: -0.69 },
            { month: "Aug", bias: -0.64 },
            { month: "Sep", bias: -0.37 },
            { month: "Oct", bias: 0.04 },
            { month: "Nov", bias: 0.47 },
            { month: "Dec", bias: 0.79 },
          ],
          caption: "Synthetic: true coefficient -0.40 %/°C, used -0.35 %/°C, monthly irradiance-weighted cell temperature 30 to 62 °C, reference 48.8 °C. The bias is smooth and below 1 %. A soiling sawtooth of 0.3 %/day over a 30-day interval is a 9-point swing with a reset at each cleaning: the two signals have different shapes, which is what makes them separable.",
        },
        {
          kind: "md",
          md: md`**Where the objection is right.** The leak grows when the cell temperature changes fast within an interval (spring and autumn), when intervals are long (exactly the cleaning-arm failure), and when the two technologies are corrected with one coefficient: thin-film modules typically have a smaller magnitude of power temperature coefficient than poly-Si. The defence is therefore not "temperature does not matter" but three commitments: per-section coefficients, a residual test (corrected PR on post-cleaning days must not correlate with cell temperature; that is H1), and a sensitivity case with a coefficient measured from the plant's own clean days.

### Objection 2: "your irradiance sensors drift and get dirty"

PR divides energy by measured irradiance. If the sensor reads low by a fraction $\varepsilon$, PR reads high by about the same fraction:`,
        },
        { kind: "equation", formula: "mz13-irradiance-bias" },
        {
          kind: "md",
          md: md`Two mechanisms, two signatures:

- **Calibration drift** is slow (a fraction of a percent per year for a well-maintained thermopile pyranometer; check the class and the calibration certificate). It looks like degradation, not like soiling, and barely moves a 30-day soiling slope.
- **Sensor soiling** is fast. A pyranometer that soils at 0.1 %/day while the modules soil at 0.3 %/day makes the modules appear to soil at 0.2 %/day. A sensor that is never cleaned can hide most of the soiling, and if the sensors were also left uncleaned during the cleaning-arm failure, the natural experiment will underestimate the effect.

Protections, all of which go into the protocol: daily or scheduled sensor cleaning with a log; at least two independent irradiance measurements per section (pyranometer and matched reference cell, or two pyranometers); recalibration before the measurement year; and a cross-check against satellite-derived irradiance on clear days, which does not soil.

### Objection 3: "KISR needs exclusive publication rights"

This is not a methodology objection; it is a value-exchange question, and it is reasonable from a research institute whose output is publications. Separate what each side actually needs:

| Interest | KISR | Mizan | Plant owner |
|---|---|---|---|
| Data | Access for research, protection of national data | Access for the study, not ownership | Ownership, confidentiality, consent |
| Science | Lead or co-lead authorship, first publication, academic freedom | Co-authorship by contribution, method published openly | Results that help the plant |
| Commercial | No endorsement of a vendor without evidence | Software IP, right to cite published results, freedom to sell elsewhere | Fair terms if it later procures the service |

Exclusive rights over **the scientific publication of the study's results** can be given at little cost to Mizan, with a time limit. Exclusive rights over **the method or the software**, or a veto over Mizan citing published results, cannot: they would stop Mizan selling to any other plant.`,
        },
        {
          kind: "matrix",
          title: "Which objections to prepare for first",
          xAxis: ["Easy to answer or test", "Hard to answer or test"],
          yAxis: ["Minor if true", "Fatal if true"],
          cells: [
            { label: "Answer crisply, add the test", detail: "Temperature coefficient error: physics, per-section coefficients, residual test" },
            { label: "Design around it now", detail: "Sensors uncleaned during the failure: may limit H3; need redundancy and satellite cross-check" },
            { label: "One sentence", detail: "Different time zones of SCADA and met station: align clocks in the audit" },
            { label: "Scope it honestly", detail: "Transfer to GW-scale trackers: state as out of scope, plan re-validation" },
          ],
          caption: "Top row decides whether KISR signs. Prepare those answers with numbers before the meeting.",
        },
        { kind: "xref", to: "fc11-l03", note: "The answer structure (answer, evidence, implication, stop) works with researchers as with investors; the evidence just has to be more precise." },
        { kind: "sources", refs: ["mz13-r1", "mz13-r2", "mz13-r6", "mz13-r9", "mz13-r10", "mz13-r14"] },
      ],
    },
    // ============================================================ APPLIED
    {
      layer: "applied",
      title: "Putting numbers on the objections",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How much soiling can a wrong coefficient create?",
          given: md`**Illustrative.** Thin-film section corrected with the poly-Si coefficient by mistake: used $\gamma' = -0.40$ %/°C, true $\gamma = -0.30$ %/°C (assumed for the example; take the real values from the datasheets). Spring cleaning interval of 30 days during which the irradiance-weighted daily cell temperature rises from 44 °C to 52 °C. Reference temperature 49 °C. Inferred soiling rate over the interval: 0.30 %/day.`,
          steps: [
            { md: md`Coefficient error $\gamma - \gamma' = -0.30 - (-0.40) = +0.10$ %/°C.` },
            { md: md`Bias at the start ($T - T_{ref} = -5$ °C): $+0.10 \times (-5) = -0.5$ %. At the end ($+3$ °C): $+0.10 \times 3 = +0.3$ %. Corrected PR is pushed up by 0.8 % across the interval.` },
            { md: md`**Leak into the soiling rate:** $0.8 / 30 = 0.027$ %/day, in the direction of hiding soiling (corrected PR rises while the modules get dirtier). True rate about $0.30 + 0.027 = 0.33$ %/day.` },
            { md: md`**In summer** the cell temperature changes by perhaps 1 °C within an interval: leak $0.10 \times 1 / 30 = 0.003$ %/day, negligible.` },
          ],
          result: md`Even a large coefficient error (0.10 %/°C, the wrong technology) shifts the spring soiling rate by about 9 % of its value and the summer rate by about 1 %. It cannot create a soiling sawtooth. The defence: per-section coefficients and the H1 residual test, stated with these numbers.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A dirty pyranometer during the cleaning-arm failure",
          given: md`**Illustrative.** During a 60-day window of the failure, the modules soiled at 0.28 %/day. The section's pyranometer was not cleaned either and soiled at 0.10 %/day. Clean-start PR 0.80.`,
          steps: [
            {
              md: md`Apparent soiling rate seen in PR: $0.28 - 0.10 = 0.18$ %/day.`,
              hidden: true,
              check: { prompt: "Apparent soiling rate in PR (%/day)", answer: 0.18, unit: "%/day", tolerance: { abs: 0.005 } },
            },
            {
              md: md`Apparent loss at day 60: $0.18 \times 60 = 10.8$ %, against a true loss of $0.28 \times 60 = 16.8$ %. The natural experiment would underestimate the effect by 6 points, about 36 %.`,
              hidden: true,
              check: { prompt: "True soiling loss at day 60 (%)", answer: 16.8, unit: "%", tolerance: { abs: 0.1 } },
            },
            { md: md`**Fix.** Use an irradiance source that does not soil for the failure period: satellite-derived POA irradiance on clear days, or a redundant sensor with a cleaning record. Report both estimates and the sensitivity to the sensor assumption.` },
          ],
          result: md`A dirty sensor hides more than a third of the soiling here. KISR's sensor-maintenance records for 2018 to 2019 are therefore as important as the cleaning log, and the analysis must not rely on the plant pyranometer alone for that period.`,
        },
      ],
    },
    // ============================================================ FIELD
    {
      layer: "field",
      title: "The review meeting and the reply",
      blocks: [
        {
          kind: "md",
          md: md`### How a methodology review with a research institute works

- **Format.** Usually a presentation to the researchers who will co-author, followed by written comments. Expect them to know the plant's history, sensors and problems better than you; listen for facts you did not have.
- **Your role.** Present the design, take every objection seriously, answer what you can with numbers, and turn the rest into tests or scope statements. Do not argue authority; argue evidence.
- **The written reply.** A table: objection, validity threatened, response, change to the protocol (if any). Researchers read it like a reviewer response letter, and it becomes part of the study record.
- **Governance and publication.** Before signature, KISR's legal or contracts office and possibly MEWRE will review data and publication terms. Agree the principles with the researchers first, so the lawyers are drafting an agreed position.
- **Public-sector context.** If the study is later followed by a procured service, procurement rules apply to that, not to the research collaboration; keep the two clearly separate so the collaboration does not look like a pre-selection.`,
        },
        { kind: "xref", to: "m11-l01", note: "Kuwait's public procurement framework: any later paid service at a public plant goes through it, which is why the research agreement must not read as a vendor pre-selection." },
        { kind: "scenario", scenario: "mz13-s1" },
        { kind: "scenario", scenario: "mz13-s2" },
        { kind: "scenario", scenario: "mz13-s3" },
        {
          kind: "callout",
          tone: "pm",
          title: "What to bring to the review",
          md: md`The draft protocol; the H1 to H4 thresholds with the uncertainty behind each; the temperature-sensitivity and sensor-soiling numbers from this lesson worked for Shagaya's two technologies; the data request; a one-page draft of data and publication principles; and a list of the facts you need from them (failure dates, sensor records). Bring questions, not only answers.`,
        },
        {
          kind: "feynman",
          prompt:
            "A KISR researcher says: 'Your soiling estimate is just temperature error.' Explain in your own words, as you would at the whiteboard in two minutes, why the soiling ratio inferred from temperature-corrected PR is robust to an error in the temperature coefficient, when it is not, and what tests in the protocol would show the reviewer you are right or wrong.",
          keyPoints: [
            "A coefficient error gives a smooth seasonal bias proportional to the distance from the reference temperature, typically under 1 % for realistic errors.",
            "Soiling is a sawtooth with resets at cleanings; the inferred SR divides by the post-cleaning level, so biases constant over an interval cancel.",
            "Only the temperature change within a cleaning interval leaks into the soiling rate: rate error is the coefficient error times the temperature change divided by the interval length.",
            "The leak is largest in spring and autumn, for long intervals (the cleaning-arm failure) and when one coefficient is used for two technologies.",
            "Protections: per-section coefficients, the H1 residual test (no correlation with cell temperature on post-cleaning days), a sensitivity case with a coefficient measured on clean days.",
            "Concedes what the objection gets right instead of dismissing it.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz13-l02-p1",
            type: "short",
            prompt: md`**Exercise: the reply to KISR's methodology review.** KISR's researchers send three written comments on your draft protocol: (1) "Using datasheet temperature coefficients and back-of-module sensors makes your soiling estimate a temperature artefact." (2) "Our pyranometers were last calibrated years ago and were cleaned irregularly, especially in 2018 to 2019." (3) "KISR requires exclusive publication rights and the data may not leave KISR." Write the reply: for each comment, the validity or interest at stake, your response with numbers where possible, and the change you propose to the protocol or agreement. End with the three facts you need from KISR.`,
            rubric: [
              "Comment 1 answered with the sensitivity physics (smooth bias, cancellation in SR, leak only from within-interval temperature change, with a number) and concedes the valid part; proposes per-section coefficients, a residual test and a measured-coefficient sensitivity case.",
              "Comment 2 explains that drift mimics degradation while sensor soiling hides module soiling (with a number), and proposes recalibration before the measurement year, redundant sensors, a cleaning log and a satellite cross-check for the history, including the failure period.",
              "Comment 3 separates scientific publication from method, software and data ownership; offers lead or first publication with a time limit and on-premises or controlled data access if needed; keeps Mizan's software IP and right to cite published results; does not simply refuse or concede.",
              "Format is a professional reply (objection, response, protocol change), respectful of KISR's expertise, and describes the pilot as targeted, not signed.",
              "Ends with specific facts needed: failure dates and extent, sensor calibration and cleaning records, and data ownership or consent route.",
            ],
            modelAnswer: md`**Reply to KISR comments on protocol v0.9 (Shagaya Phase I PV soiling study, in preparation)**

**1. Temperature artefact (construct validity).** We agree that temperature errors must be excluded. A coefficient error $\Delta\gamma$ biases corrected PR by about $\Delta\gamma (T_{cell} - T_{ref})$: with 0.05 %/°C, under 1 % in any month, smooth through the year. The inferred SR is relative to each post-cleaning level, so constant biases cancel; only temperature change within an interval leaks into the rate, about $\Delta\gamma\, \Delta T / T$: 0.003 %/day in summer, up to about 0.03 %/day in spring if the wrong technology's coefficient were used. Changes: separate coefficients for thin-film and poly-Si from datasheets; a sensitivity case with coefficients measured on the plant's clean days; back-of-module to cell temperature conversion stated; H1 residual test (no significant correlation of post-cleaning corrected PR with cell temperature).

**2. Pyranometers (internal validity).** Slow calibration drift looks like degradation and barely affects a 30-day slope. Sensor soiling is the real risk: a sensor soiling at 0.1 %/day makes 0.28 %/day module soiling look like 0.18 %/day, hiding about a third of it. Changes: recalibration and a cleaning log before the measurement year; a second independent irradiance sensor per section; for the history, including 2018 to 2019, a cross-check against satellite-derived irradiance on clear days, with both estimates reported.

**3. Publication and data (partnership terms).** We propose: KISR leads the scientific publication of the study results and has first-publication rights for up to N months after the study ends (to agree); joint authorship by contribution; all hypotheses reported. Data remain the owner's property; if data may not leave KISR, analysis runs on a KISR-controlled machine or environment. Mizan retains its software and may cite published results; the method description is published openly. Neither side may imply endorsement without the other's review.

**Facts we need from KISR:** (a) dates, affected section and any substitute cleaning for the cleaning-arm failure; (b) calibration and cleaning records of irradiance and temperature sensors since 2017; (c) who owns the data today and whose consent sharing requires.`,
            explanation: md`A good reply concedes what is right, quantifies what is not, and converts every objection into a protocol change. Researchers sign designs that have absorbed their objections.`,
            concepts: ["mz13.temperature-sensitivity", "mz13.sensor-drift", "mz13.publication-terms", "mz13.validity-threats"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "m13-l05", note: "Negotiation and influence with public bodies: interests before positions, which is exactly the move in the publication-rights conversation." },
      ],
    },
  ],
  scenarios: [
    {
      id: "mz13-s1",
      title: "The KISR researcher pushes back on your temperature correction",
      dayInLife: true,
      context: md`Methodology review at KISR. You have presented the H1 to H4 design. A senior researcher who co-authored the 2020 Shagaya paper says: "You use one datasheet coefficient and back-of-module sensors. Our thin-film and poly-Si sections behave differently in heat. I think your soiling sawtooth is mostly a temperature artefact."`,
      start: "a",
      concepts: ["mz13.temperature-sensitivity", "mz13.validity-threats"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            {
              text: "Agree that the two technologies need separate coefficients, then explain the shape argument with a number: a coefficient error gives a smooth seasonal bias under about 1 %, the inferred SR is relative to each post-cleaning level so constant bias cancels, and only within-interval temperature change leaks into the rate (a few hundredths of a %/day); propose per-section coefficients, the H1 residual test and a measured-coefficient sensitivity case",
              next: "b",
              score: 10,
              feedback: "You conceded the valid point, quantified the rest and turned the objection into tests. This is how researchers want to be answered.",
            },
            {
              text: "Say the NREL method is the industry standard, so temperature is handled",
              next: "b",
              score: 3,
              feedback: "An appeal to authority. The researcher's point was about your inputs (one coefficient, back-of-module temperature), which the method's name does not address.",
            },
            {
              text: "Say temperature effects are negligible in soiling analysis",
              next: "b",
              score: 1,
              feedback: "False in Kuwait, where basic PR swings by many points with the seasons. You have just lost credibility on everything else.",
            },
            {
              text: "Offer to drop the temperature correction and use basic PR instead",
              next: "b",
              score: 0,
              feedback: "That makes the artefact real. The correction is the baseline the study is built on.",
            },
          ],
        },
        b: {
          md: md`The researcher follows up: "Then why use plant data at all? Put a soiling station on each section and measure the soiling ratio directly."`,
          choices: [
            {
              text: "Agree stations are the reference and are in the plan, then explain the study's purpose: stations measure a point, are maintenance-sensitive and are absent at most existing plants; the question KISR confirmed is open is whether operational data alone can drive cleaning decisions, and the stations are how we test that (H2)",
              next: "c",
              score: 10,
              feedback: "You reframed the station as the yardstick for the plant-data method, which is the actual research question.",
            },
            {
              text: "Say stations are too expensive for Gulf plants",
              next: "c",
              score: 4,
              feedback: "Cost is part of it, but the stronger answer is representativeness and the research question; and it sounds like you want to avoid the reference that could prove you wrong.",
            },
            {
              text: "Say Mizan's product does not need stations, so they are unnecessary in the study",
              next: "c",
              score: 1,
              feedback: "Exactly the commercial leak into method that reviewers fear. Without an independent reference, H2 cannot be tested.",
            },
          ],
        },
        c: {
          md: md`"Fine. Show me on our data that the correction works before we sign anything."`,
          choices: [
            {
              text: "Propose a small, defined first step: with the data owner's consent, run H1 on a few months of historical data under a short confidentiality letter, share the residual plots and the code configuration, and agree the result decides whether to continue",
              score: 10,
              feedback: "A bounded, low-risk proof step that builds trust and respects data ownership. It also gives you the first fact for the protocol.",
            },
            {
              text: "Ask for all the historical data first and promise results later",
              score: 3,
              feedback: "Asking for everything before showing anything is how data requests stall in public institutions.",
            },
            {
              text: "Show the widget results on synthetic data instead",
              score: 4,
              feedback: "Useful to explain the idea, but the researcher asked about their plant. Synthetic data cannot answer a construct objection on real sensors.",
            },
          ],
        },
      },
    },
    {
      id: "mz13-s2",
      title: "The researcher asks about irradiance sensor drift",
      context: md`Second review session. A KISR engineer who maintains the met stations says: "Our pyranometers were last calibrated in 2019 and were cleaned when someone had time. In 2018 to 2019, during the cleaning-arm failure, I doubt anyone cleaned them. How can you trust any PR from that period?"`,
      start: "a",
      concepts: ["mz13.sensor-drift", "mz13.validity-threats"],
      nodes: {
        a: {
          md: md`What do you say?`,
          choices: [
            {
              text: "Thank them, separate the two effects (slow drift looks like degradation and barely moves a 30-day slope; sensor soiling makes PR read high and hides module soiling, for example 0.28 %/day appearing as 0.18 %/day), and propose a satellite-irradiance cross-check on clear days for the history, plus recalibration, redundancy and a cleaning log for the measurement year",
              next: "b",
              score: 10,
              feedback: "Precise physics, an honest admission that this threatens H3, and a concrete mitigation. The engineer has just become your ally.",
            },
            {
              text: "Say sensor errors are small compared with soiling",
              next: "b",
              score: 2,
              feedback: "A dirty sensor can hide a third or more of the soiling. Dismissing the person who knows the sensors is a mistake twice over.",
            },
            {
              text: "Suggest excluding 2018 to 2019 entirely",
              next: "b",
              score: 4,
              feedback: "Safe but wasteful: the failure period is the natural experiment. Try to rescue it with an independent irradiance source before giving it up.",
            },
          ],
        },
        b: {
          md: md`"Satellite irradiance has its own errors, especially in dust. Won't that just move the problem?"`,
          choices: [
            {
              text: "Agree it has errors, especially with high aerosol load, so use it only on clear, low-dust days and only for the trend of the sensor-to-satellite ratio (which reveals sensor soiling and drift), not for absolute irradiance; report the history results with both irradiance sources and treat H3 as conditional on this check",
              score: 10,
              feedback: "Using the satellite only where it is reliable and only for a ratio trend is the right design, and making H3 conditional is honest.",
            },
            {
              text: "Say commercial satellite data is accurate enough everywhere",
              score: 2,
              feedback: "Not in a dusty atmosphere. Overclaiming a data source in front of the people who run the met station undermines the study.",
            },
            {
              text: "Propose buying a new sensor and analysing only future data",
              score: 5,
              feedback: "Needed for the measurement year, but it gives up on the history and the natural experiment without trying the ratio method.",
            },
          ],
        },
      },
    },
    {
      id: "mz13-s3",
      title: "KISR wants exclusive publication rights",
      dayInLife: true,
      context: md`The methodology is nearly agreed. KISR's research manager says: "KISR must have exclusive publication rights on everything from this study. The data cannot leave KISR. And Mizan cannot mention Shagaya in its marketing."`,
      start: "a",
      concepts: ["mz13.publication-terms", "mz13.partner-value-exchange"],
      nodes: {
        a: {
          md: md`How do you respond to the publication request?`,
          choices: [
            {
              text: "Ask what KISR needs to protect, then separate the items: offer KISR the lead on scientific publication of the study's results with first-publication rights for a fixed period, joint authorship by contribution and all results reported; explain that exclusive rights over the method or software would stop Mizan operating, so those stay with their owners",
              next: "b",
              score: 10,
              feedback: "Interests before positions. You gave KISR what a research institute values most at little cost to Mizan, and protected what Mizan cannot give.",
            },
            {
              text: "Accept everything to get the pilot signed",
              next: "b",
              score: 2,
              feedback: "You may have given away the right to use your own method elsewhere and to cite the result. A pilot that cannot be referenced is worth little to Mizan.",
            },
            {
              text: "Refuse: Mizan must be free to publish",
              next: "b",
              score: 2,
              feedback: "A position against a position. Publication leadership is a reasonable request from a research institute and costs Mizan little if it is time-limited.",
            },
          ],
        },
        b: {
          md: md`"And the data cannot leave KISR."`,
          choices: [
            {
              text: "Accept the principle and propose a way to work within it: analysis runs on a KISR-controlled machine or environment with Mizan's code, outputs reviewed before export, data ownership and consent stated in the agreement",
              next: "c",
              score: 10,
              feedback: "Bringing the code to the data is a standard and respectful answer, and it removes a blocker instead of fighting it.",
            },
            {
              text: "Say the analysis is impossible without a copy of the data",
              next: "c",
              score: 2,
              feedback: "Untrue, and it signals that Mizan cares more about the data than the study.",
            },
            {
              text: "Suggest Mizan buys the data from MEWRE instead",
              next: "c",
              score: 1,
              feedback: "Going around the partner who brought you in damages the relationship, and it may not be possible anyway.",
            },
          ],
        },
        c: {
          md: md`"Finally, no mention of Shagaya in your marketing."`,
          choices: [
            {
              text: "Propose a rule instead of a ban: before publication, no public mention beyond 'a study in preparation with KISR' if KISR agrees even to that; after publication, Mizan may cite the published results accurately, with KISR reviewing any material that names KISR or Shagaya, and never implying endorsement",
              score: 10,
              feedback: "A review right protects KISR's reputation and keeps Mizan's ability to reference peer-reviewed results, which is the main commercial value of the study.",
            },
            {
              text: "Agree to never mention it",
              score: 3,
              feedback: "Then the study cannot support any sale, even after it is published. Ask what KISR is worried about: usually misrepresentation, which a review right solves.",
            },
            {
              text: "Say Mizan will describe it as the 'KISR-validated soiling platform'",
              score: 0,
              feedback: "An endorsement claim KISR has not made. This is exactly why they asked for a ban.",
            },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "mz13-l02-q1",
      type: "numeric",
      prompt: md`True temperature coefficient $-0.40$ %/°C, used $-0.35$ %/°C. On a day 15 °C hotter than the reference temperature, what is the approximate bias in corrected PR, in %?`,
      answer: -0.75,
      unit: "%",
      tolerance: { abs: 0.05 },
      explanation: md`Bias $\approx (\gamma - \gamma')(T - T_{ref}) = (-0.40 + 0.35) \times 15 = -0.75$ %. Exactly: $(1 - 0.060)/(1 - 0.0525) - 1 = -0.79$ %. Corrected PR is slightly too low on hot days.`,
      concepts: ["mz13.temperature-sensitivity"],
      difficulty: 2,
    },
    {
      id: "mz13-l02-q2",
      type: "numeric",
      prompt: md`Coefficient error 0.05 %/°C. Over a 30-day cleaning interval the irradiance-weighted cell temperature rises by 6 °C. How much does this error shift the inferred soiling rate, in %/day?`,
      answer: 0.01,
      unit: "%/day",
      tolerance: { abs: 0.001 },
      explanation: md`$\Delta r \approx \Delta\gamma\, \Delta T / T = 0.05 \times 6 / 30 = 0.010$ %/day, about 3 % of a 0.3 %/day rate.`,
      concepts: ["mz13.temperature-sensitivity"],
      difficulty: 2,
    },
    {
      id: "mz13-l02-q3",
      type: "numeric",
      prompt: md`Modules soil at 0.35 %/day; the uncleaned plane-of-array pyranometer soils at 0.12 %/day. What soiling rate will PR show, in %/day?`,
      answer: 0.23,
      unit: "%/day",
      tolerance: { abs: 0.005 },
      explanation: md`The dirty sensor reads low, so PR reads high: apparent rate $= 0.35 - 0.12 = 0.23$ %/day. A third of the soiling is hidden.`,
      concepts: ["mz13.sensor-drift"],
      difficulty: 1,
    },
    {
      id: "mz13-l02-q4",
      type: "mcq",
      prompt: md`"This is an 11 MW fixed-tilt plant; your results will not apply to GW-scale tracker plants." Which validity does this objection threaten?`,
      options: ["Construct validity", "Internal validity", "Statistical conclusion validity", "External validity"],
      answer: 3,
      explanation: md`It is about transfer to other plants: external validity. The answer is a scope statement plus a plan to re-validate on a tracker plant, not a defence of the Shagaya result.`,
      concepts: ["mz13.validity-threats"],
      difficulty: 1,
    },
    {
      id: "mz13-l02-q5",
      type: "multi",
      prompt: md`Which terms can Mizan offer KISR at low cost to itself? Select all that apply.`,
      options: [
        "Lead on the scientific publication of the study's results, with first-publication rights for a fixed period",
        "Exclusive rights to the soiling inference software",
        "Analysis run on a KISR-controlled environment so the data does not leave KISR",
        "Review of any Mizan material that names KISR or Shagaya",
        "A permanent ban on Mizan citing the published results",
      ],
      answer: [0, 2, 3],
      explanation: md`Publication leadership, bringing code to data and a review right protect KISR's interests. Software exclusivity and a permanent citation ban would stop Mizan operating and remove the commercial value of the study.`,
      concepts: ["mz13.publication-terms", "mz13.partner-value-exchange"],
      difficulty: 2,
    },
    {
      id: "mz13-l02-q6",
      type: "decision",
      prompt: md`A researcher points out that the inverter in section A was offline for 9 days during the cleaning-arm failure window, which your draft analysis did not filter. What do you do?`,
      options: [
        { text: "Thank them, filter the outage days using the alarm and maintenance log, rerun the natural-experiment analysis, and report the effect of the correction in the methods", score: 1, feedback: "An internal-validity threat answered with data. Reporting the correction strengthens the paper." },
        { text: "Argue that 9 days out of 60 do not matter", score: 0.1, feedback: "An outage looks exactly like a large loss; unfiltered it inflates the DiD effect." },
        { text: "Drop section A from the study", score: 0.3, feedback: "Overreaction: filtering the outage days keeps the natural experiment." },
      ],
      explanation: md`Most internal-validity objections are answered by logs and filters, and the change is documented rather than hidden.`,
      concepts: ["mz13.validity-threats"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "mz13-l02-f1", front: "The four validities", back: "Construct (does the metric measure soiling?), internal (is the cause what we claim?), statistical conclusion (above noise?), external (does it transfer?).", concepts: ["mz13.validity-threats"] },
    { id: "mz13-l02-f2", front: "Coefficient error bias in corrected PR", back: md`$\approx (\gamma - \gamma')(T_{cell} - T_{ref})$: smooth, seasonal, under about 1 % for 0.05 %/°C.`, concepts: ["mz13.temperature-sensitivity"] },
    { id: "mz13-l02-f3", front: "Why constant biases cancel in SR", back: "SR divides corrected PR by its own post-cleaning level; only changes within a cleaning interval leak into the soiling rate.", concepts: ["mz13.temperature-sensitivity"] },
    { id: "mz13-l02-f4", front: "Sensor soiling vs calibration drift", back: "Drift is slow and looks like degradation. Sensor soiling is fast and hides module soiling: apparent rate = module rate minus sensor rate.", concepts: ["mz13.sensor-drift"] },
    { id: "mz13-l02-f5", front: "Protecting PR from sensor errors", back: "Sensor cleaning log, recalibration, redundant independent sensors, clear-day satellite cross-check of the sensor-to-satellite ratio.", concepts: ["mz13.sensor-drift"] },
    { id: "mz13-l02-f6", front: "Publication terms that work", back: "KISR leads the scientific paper with time-limited first publication; joint authorship by contribution; data stays with its owner; Mizan keeps its software and may cite published results with KISR review.", concepts: ["mz13.publication-terms"] },
  ],
};

export default lesson;
