import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l07",
  title: "Product analytics",
  summary:
    "How to know whether the product is working once people use it: define the activation event, read retention cohort curves (and what a flattening curve means), choose a North Star metric with its input metrics, compute net revenue retention, and write an instrumentation plan that respects on-prem and air-gapped customers.",
  minutes: 70,
  objectives: [
    "You can define an activation event and compute an activation rate with a stated window.",
    "You can build a retention cohort table, plot the curves and say whether a cohort shows a retained core.",
    "You can choose a North Star metric and two to four input metrics for a B2B product, and reject vanity metrics.",
    "You can write an instrumentation plan (events, properties, identifiers, owners) that works when customer data cannot leave their servers.",
  ],
  concepts: [
    {
      id: "fc02.activation",
      name: "Activation",
      description:
        "The first moment a new user or account experiences the product's core value (the activation event), measured as the share of a cohort that reaches it within a stated window.",
      competency: "fc-product",
    },
    {
      id: "fc02.retention-cohort",
      name: "Retention cohorts",
      description:
        "Grouping users or accounts by start period and tracking the share still doing the core action in each later period. A curve that flattens above zero indicates a retained core; one that decays to zero does not.",
      competency: "fc-product",
      related: ["fc02.activation"],
    },
    {
      id: "fc02.north-star",
      name: "North Star metric",
      description:
        "One metric that best captures the value the product delivers to customers and leads revenue, broken down into a few input metrics that teams can move directly.",
      competency: "fc-product",
      related: ["fc02.retention-cohort"],
    },
    {
      id: "fc02.instrumentation-plan",
      name: "Instrumentation plan",
      description:
        "A written specification of the events, properties and identifiers the product records, why each is needed, where it is captured, who owns it and how privacy and deployment constraints are respected.",
      competency: "fc-product",
      related: ["fc02.prd", "fc02.north-star"],
    },
    {
      id: "fc02.nrr",
      name: "Net revenue retention",
      description:
        "Recurring revenue from a fixed set of customers at the end of a period, including expansion and net of contraction and churn, divided by their revenue at the start.",
      competency: "fc-product",
      related: ["fc02.retention-cohort"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Activation, retention and the one metric",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`After the first pilots convert, the questions change from "do they want it?" to "do they keep using it, and does usage grow?". Investors will ask for retention and net revenue retention; your cofounders need to know which part of the product to improve; and you need early warning when an account is quietly dying. Afterwave and Mizan add a complication most analytics guides ignore: customer data may never leave their servers, so you must design measurement that works on-prem.`,
        },
        {
          kind: "md",
          md: md`### Activation

Choose one **activation event**: the earliest action that shows the customer got the core value, not just that they installed something.

| Product | Weak activation event | Better activation event |
|---|---|---|
| Lockstep | App installed on a bench PC | First capture with DAQ and screen aligned, opened by an engineer within 14 days of install |
| Ripple | Change log connected | First release candidate where an engineer viewed the recommended set and its reasons |
| Mizan dashboard | Account created | First week in which the O&M team opened the loss breakdown after a drop |`,
        },
        { kind: "equation", formula: "fc02-activation-rate" },
        {
          kind: "md",
          md: md`Always state the window ("within 14 days"); without it the number only grows. Time to activation is equally useful: if half of installs take more than three weeks to reach first value, onboarding is the problem, not the product.

### Retention cohorts

A **cohort** is a group that started in the same period (pilot benches that went live in the same quarter, accounts activated in the same month). Retention at period $t$:`,
        },
        { kind: "equation", formula: "fc02-retention-rate" },
        {
          kind: "md",
          md: md`"Active" must mean doing the **core action**, not logging in: for Lockstep, at least one aligned capture reviewed that week; for Mizan, the loss breakdown opened or a note acted on.

How to read the curves:

- **Decay to zero**: the product is tried and abandoned. No product-market fit for that cohort, whatever the sign-up numbers say.
- **Flattening above zero**: a retained core. The level where it flattens is the key number; the higher it is, the stronger the fit.
- **Later cohorts above earlier ones**: the product or onboarding is improving.
- **Rising tail ("smile")**: users who left are coming back or usage is expanding within accounts; strong signal.

In early B2B the unit matters. With five customer accounts, account-level retention is anecdote; **bench-level** or **user-level** retention inside accounts gives enough points to see the shape, while account-level revenue retention tells the commercial story.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Weekly bench retention by pilot cohort (illustrative)",
          xKey: "week",
          xLabel: "Weeks since go-live",
          yLabel: "Benches active (% of cohort)",
          series: [
            { key: "c1", label: "Cohort 1 (20 benches)" },
            { key: "c2", label: "Cohort 2 (25 benches)" },
            { key: "c3", label: "Cohort 3 (15 benches)" },
          ],
          data: [
            { week: "0", c1: 100, c2: 100, c3: 100 },
            { week: "1", c1: 80, c2: 88, c3: 73.3 },
            { week: "2", c1: 65, c2: 80, c3: 53.3 },
            { week: "4", c1: 50, c2: 72, c3: 33.3 },
            { week: "8", c1: 40, c2: 68, c3: 20 },
            { week: "12", c1: 40, c2: 68, c3: 6.7 },
          ],
          caption: "Cohort 1 flattens at 40% and cohort 2 at 68% after onboarding changes: retained cores. Cohort 3 (a different segment) decays towards zero. Same product, different fit. All numbers illustrative.",
        },
        {
          kind: "md",
          md: md`### North Star metric

The **North Star** framework (popularised by Amplitude's *North Star Playbook* and growth practitioners such as Sean Ellis) picks one metric that:

1. Expresses the **value customers get**, not the value you capture.
2. **Leads revenue**: if it grows, revenue follows.
3. Is **measurable** and moves within weeks, not years.

It is then broken into **input metrics** that teams can move directly. A sketch for each venture (candidates to test, not decisions):

| Venture | Candidate North Star | Input metrics |
|---|---|---|
| Afterwave | Release candidates per week validated with Ripple's recommended set | Benches live; activation rate; share of releases where the recommendation was used; capture reliability |
| Mizan | MW of plant capacity where cleaning decisions used Mizan's estimate in the month | Sites connected; data completeness; weekly active O&M users; notes acted on |

Revenue is a lagging outcome, not a North Star. Page views, installs and registered users are **vanity metrics**: they rise without customers getting value.

### Net revenue retention

For subscription B2B, the revenue view of retention:`,
        },
        { kind: "equation", formula: "fc02-nrr" },
        {
          kind: "md",
          md: md`Above 100% means expansion from existing customers outweighs contraction and churn; the base grows without any new customer. Land-and-expand pricing (per bench for Afterwave, per MW or per site for Mizan) is designed to push NRR above 100%.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Reading the numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Building the cohort table (illustrative)",
          given: md`Three cohorts of Lockstep pilot benches (illustrative). Active means at least one aligned capture reviewed that week.

| Cohort | Size | W1 | W2 | W4 | W8 | W12 |
|---|---|---|---|---|---|---|
| 1 | 20 | 16 | 13 | 10 | 8 | 8 |
| 2 | 25 | 22 | 20 | 18 | 17 | 17 |
| 3 | 15 | 11 | 8 | 5 | 3 | 1 |`,
          steps: [
            { md: md`**Cohort 1.** $R(1) = 16/20 = 80\%$, $R(2) = 65\%$, $R(4) = 50\%$, $R(8) = R(12) = 8/20 = 40\%$. Flat from week 8: a retained core of 40% of benches.` },
            { md: md`**Cohort 2.** $R(12) = 17/25 = 68\%$. Flattening earlier and higher. If onboarding changed between cohorts 1 and 2 (for example, a setup session with the engineers), that change is the likely cause; check before claiming it.` },
            { md: md`**Cohort 3.** $R(12) = 1/15 \approx 6.7\%$, still falling. Look at who they are: if cohort 3 was a different segment (say, a lab whose benches are rarely reconfigured, so faults are rare), the product may fit that segment poorly. That is a positioning decision, not just a product fix.` },
          ],
          result: md`The cohort view separates three stories that a single "average weekly active benches" number would blur: a core that stays, an improvement between cohorts, and a segment that does not fit.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Activation and NRR (illustrative)",
          given: md`In a quarter, Lockstep was installed on 18 new benches; 12 had a first aligned capture reviewed within 14 days. Separately, Afterwave's paying customers started the year at EUR 40k monthly recurring revenue. Over 12 months: expansion EUR 8k, contraction EUR 2k, churn EUR 4k (all monthly recurring).`,
          steps: [
            {
              md: md`Activation rate: $A = 12/18$.`,
              hidden: true,
              check: { prompt: "Activation rate", answer: 66.7, unit: "%", tolerance: { abs: 0.2 } },
            },
            {
              md: md`NRR: $(40 + 8 - 2 - 4)/40$.`,
              hidden: true,
              check: { prompt: "Net revenue retention", answer: 105, unit: "%", tolerance: { abs: 0.2 } },
            },
            { md: md`Gross revenue retention (no expansion): $(40 - 2 - 4)/40 = 85\%$. The gap between 85% and 105% shows the business relies on expansion to offset losses; worth knowing which accounts churned and why.` },
          ],
          result: md`About 67% activation within 14 days and 105% NRR. Next questions: what stopped the other 6 benches activating, and what drove the churn?`,
        },
      ],
    },
    {
      layer: "field",
      title: "Instrumentation in practice",
      blocks: [
        {
          kind: "md",
          md: md`### The instrumentation plan

Write it alongside the PRD, before the feature is built. One row per event:

| Event (object_action) | Fires when | Key properties | Why we need it | Captured where |
|---|---|---|---|---|
| capture_started | Engineer starts a Lockstep capture | bench_id, channel_count, sample_rate | Usage volume per bench | Client |
| capture_aligned | Alignment completes | bench_id, duration_s, alignment_offset_ms | Activation, reliability | Server (Enclave) |
| timeline_opened | Engineer opens an aligned timeline | bench_id, user_role | Activation, core action | Client |
| recommendation_viewed | Engineer views a Ripple recommended set | release_id, set_size, full_suite_size | North Star input | Server |

Rules that save pain later:

- **Name events object_action** consistently and keep a single dictionary of names and properties.
- **Identifiers**: account, site or lab, bench, user. Decide which is the unit of analysis before building.
- **Measure the core action**, not clicks. Ten well-chosen events beat two hundred automatic ones.
- **Own it**: one person (often you) owns the dictionary; engineering owns implementation.

### On-prem and air-gapped customers

Enclave runs on customer servers or an isolated tenant; Mizan may run on a plant network. Usage telemetry leaving the site may be forbidden. Options, in order of preference:

1. **Aggregate usage reports** generated inside the deployment (counts per week, no content), reviewed and sent by the customer, or shown in an admin page they screen-share at check-ins.
2. **Opt-in telemetry** with a documented, minimal schema (event names and counts only, no test data), agreed in the security review.
3. **Qualitative signals**: weekly check-ins, support tickets, champion interviews.

Put this in the pilot agreement. Never add hidden telemetry to an on-prem product: discovering it would end the relationship and possibly the company's reputation in the segment.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Analytics mistakes at seed stage",
          md: md`**Vanity metrics in the investor update.** Installs and registered users rise while retention falls. Report activation and cohort retention.

**Averages instead of cohorts.** "Weekly active benches up 30%" can hide every cohort decaying while new pilots pile in.

**Over-reading small numbers.** With 15 benches, one bench is 6.7 percentage points. Show counts next to percentages and talk to the customer before concluding.

**Instrumenting after launch.** If activation is not instrumented when the pilot starts, you cannot measure the pilot.`,
        },
        {
          kind: "question",
          question: {
            id: "fc02-l07-p1",
            type: "short",
            prompt: md`Produce an **analytics plan for Mizan's soiling dashboard** in its first year with paying plant customers. Include: (1) the activation event and window; (2) a definition of "active" for retention, the unit of analysis and the cohort definition; (3) a North Star metric with three input metrics, and two vanity metrics you will not report; (4) an instrumentation table of at least five events (name, trigger, key properties, purpose); (5) how you will collect usage where data cannot leave the plant network; (6) the three numbers you would put in a monthly investor update.`,
            rubric: [
              "Activation event reflects core value (a cleaning or explanation decision informed by the dashboard), with an explicit time window.",
              "Active is defined by the core action, with a suitable unit (site or user rather than raw logins) and a clear cohort definition.",
              "North Star expresses customer value and leads revenue, with input metrics the team can move; vanity metrics correctly identified.",
              "At least five events with object_action names, triggers, properties and a stated purpose linked to activation, retention or the North Star.",
              "A credible approach for on-prem or restricted networks (aggregate reports, opt-in minimal telemetry, check-ins) with no hidden data collection.",
              "Investor-update metrics are cohort- or retention-based rather than cumulative totals.",
            ],
            modelAnswer: md`**Activation.** A site is activated when the O&M team opens the loss breakdown after an output drop and logs a decision or explanation (clean, defer, report to owner) within 21 days of data connection.

**Retention.** Unit: site (with user-level detail inside it). Active in a week: the loss breakdown was opened at least once and at least one note was viewed. Cohorts: sites by month of data connection. Revenue view: NRR on the per-MW subscription.

**North Star.** MW of capacity where cleaning decisions used Mizan's estimate in the month. Inputs: (1) sites with data completeness above 95% for the week; (2) weekly active O&M users per site; (3) share of weekly notes acted on. Vanity metrics not reported: total dashboard page views; number of registered user accounts.

**Instrumentation.**
| Event | Trigger | Key properties | Purpose |
|---|---|---|---|
| data_batch_ingested | Daily SCADA export processed | site_id, rows, completeness_pct | Data health input metric |
| estimate_published | Daily soiling estimate ready | site_id, soiling_pct, publish_time | Reliability, timeliness requirement |
| breakdown_opened | User opens the loss breakdown | site_id, user_role, days_since_drop | Activation, retention |
| note_viewed | Weekly cleaning note opened | site_id, note_id, language | Retention, Arabic/English usage |
| decision_logged | User records clean, defer or explain | site_id, decision_type, mw_affected | North Star, activation |
| cleaning_logged | Cleaning event recorded or detected | site_id, block_id, source | Accuracy validation |

**Restricted networks.** The application generates a weekly aggregate usage report inside the plant network (event counts per site and week, no plant data), reviewed and sent by the customer contact; minimal opt-in telemetry of event counts only where the security review allows; monthly check-ins with the O&M manager for qualitative signal. Written into each customer agreement.

**Investor update.** (1) North Star: MW under Mizan-informed decisions this month, with trend. (2) Site retention by connection cohort (counts and %). (3) NRR (trailing 12 months), once there are 12 months of revenue; before then, expansion in MW per site.`,
            explanation: md`Graders look for value-based definitions, cohort thinking, a usable event dictionary and honest handling of restricted networks.`,
            concepts: ["fc02.activation", "fc02.retention-cohort", "fc02.north-star", "fc02.instrumentation-plan"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Afterwave's weekly active benches rose 30% last quarter but you are worried, using cohort retention.",
          keyPoints: [
            "A total or average can rise because new benches are added, even if each cohort decays.",
            "Cohort curves show what happens to benches after they start; a curve decaying to zero means no retained core.",
            "The flattening level of a cohort's curve is the measure of fit, and later cohorts should be at or above earlier ones.",
            "The response is to find which segment or onboarding step causes the decay, not to add more pilots.",
          ],
        },
        { kind: "sources", refs: ["fc02-r16"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l07-q1",
      type: "mcq",
      prompt: md`Which is the best activation event for Lockstep?`,
      options: [
        "The app is installed on a bench PC.",
        "An engineer logs in for the first time.",
        "The first aligned capture is opened by an engineer within 14 days of install.",
        "The customer signs the pilot agreement.",
      ],
      answer: 2,
      explanation: md`Activation is first experience of core value, with a window. Installation and login are steps on the way; signing is a commercial event.`,
      concepts: ["fc02.activation"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l07-q2",
      type: "numeric",
      prompt: md`A cohort of 30 benches has 12 active in week 8. What is week-8 retention, in %?`,
      answer: 40,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$R(8) = 12/30 = 40\%$.`,
      concepts: ["fc02.retention-cohort"],
      difficulty: 1,
    },
    {
      id: "fc02-l07-q3",
      type: "mcq",
      prompt: md`A cohort's retention curve flattens at 35% from week 6 onward. What does this most likely mean?`,
      options: [
        "The product has failed for this cohort.",
        "There is a retained core of about 35% that keeps getting value.",
        "Tracking broke at week 6.",
        "Retention will reach 100% eventually.",
      ],
      answer: 1,
      explanation: md`A flat tail above zero is the signature of a retained core. Decay to zero would indicate no fit.`,
      concepts: ["fc02.retention-cohort"],
      difficulty: 1,
    },
    {
      id: "fc02-l07-q4",
      type: "numeric",
      prompt: md`Start-of-year MRR from existing customers: EUR 50k. Over the year: expansion EUR 15k, contraction EUR 3k, churn EUR 7k. What is NRR, in %?`,
      answer: 110,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$\text{NRR} = (50 + 15 - 3 - 7)/50 = 55/50 = 110\%$.`,
      concepts: ["fc02.nrr"],
      difficulty: 2,
    },
    {
      id: "fc02-l07-q5",
      type: "multi",
      prompt: md`Which are **vanity metrics** for Afterwave? (Select all.)`,
      options: [
        "Total app installs to date.",
        "Week-8 retention of benches by cohort.",
        "Number of registered user accounts.",
        "Release candidates validated with Ripple's recommended set per week.",
        "Website page views.",
      ],
      answer: [0, 2, 4],
      explanation: md`Cumulative installs, registered accounts and page views rise without customers getting value. Cohort retention and validated releases measure value.`,
      concepts: ["fc02.north-star"],
      difficulty: 1,
    },
    {
      id: "fc02-l07-q6",
      type: "decision",
      prompt: md`A pilot lab's IT team forbids any outbound connection from the Enclave deployment. How do you measure usage?`,
      options: [
        { text: "Add lightweight telemetry anyway; it is only event counts.", score: 0, feedback: "Hidden telemetry violates the agreement and would destroy trust in the segment." },
        { text: "Generate an aggregate weekly usage report inside Enclave that the lab reviews and shares, plus weekly check-ins; document it in the pilot agreement.", score: 1, feedback: "Measures what you need while respecting the constraint and making it transparent." },
        { text: "Skip measurement for on-prem customers.", score: 0.2, feedback: "You would lose activation and retention data for exactly the customers you most need to understand." },
        { text: "Ask the lab to allow full telemetry in exchange for a discount.", score: 0.4, feedback: "May be acceptable to some, but it fights the security posture that made Enclave attractive." },
      ],
      explanation: md`Design measurement that works within the deployment model, and make it visible to the customer.`,
      concepts: ["fc02.instrumentation-plan"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc02-l07-f1", front: "Activation rate", back: md`$A = N_{\text{activated}}/N_{\text{signed up}}$ within a stated window. The activation event is the first experience of core value.`, concepts: ["fc02.activation"] },
    { id: "fc02-l07-f2", front: "Retention curve shapes", back: "Decay to zero: no fit. Flattening above zero: retained core. Later cohorts higher: improving. Rising tail: expansion or reactivation.", concepts: ["fc02.retention-cohort"] },
    { id: "fc02-l07-f3", front: "North Star metric criteria", back: "Expresses customer value, leads revenue, measurable and movable within weeks; broken into input metrics.", concepts: ["fc02.north-star"] },
    { id: "fc02-l07-f4", front: "NRR formula", back: md`$(\text{MRR}_0 + \text{Exp} - \text{Contr} - \text{Churn})/\text{MRR}_0$. Above 100%: the base grows without new customers.`, concepts: ["fc02.nrr"] },
    { id: "fc02-l07-f5", front: "Event naming convention", back: "object_action (capture_aligned, breakdown_opened), one shared dictionary of names and properties.", concepts: ["fc02.instrumentation-plan"] },
    { id: "fc02-l07-f6", front: "Usage measurement when data cannot leave the site", back: "Aggregate reports generated inside the deployment and shared by the customer, opt-in minimal telemetry, check-ins. Never hidden telemetry.", concepts: ["fc02.instrumentation-plan"] },
  ],
};

export default lesson;
