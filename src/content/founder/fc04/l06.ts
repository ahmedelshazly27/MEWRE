import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l06",
  title: "Pilots and proofs of concept that convert",
  summary:
    "A pilot is a short, scoped contract whose only purpose is a yes-or-no purchase decision. Charge for it, write measurable success criteria with the buyer before it starts, agree the conversion terms up front, and get the security review and on-prem deployment questions answered before the clock starts.",
  minutes: 80,
  objectives: [
    "You can argue for a paid pilot and compute the expected value of paid and free pilots, including the break-even conversion rate.",
    "You can write measurable, buyer-owned success criteria and a tight scope.",
    "You can draft a conversion clause that turns pilot success into a contract without a new negotiation.",
    "You can prepare for an enterprise security review and an on-prem deployment.",
  ],
  concepts: [
    { id: "fc04.paid-pilot", name: "Paid pilot", description: "A time-boxed, scoped engagement the buyer pays for (often credited against the first year), which tests commitment, gets the deal through procurement once, and protects the team's time.", competency: "fc-sales", related: ["fc04.success-criteria", "fc04.conversion-clause"] },
    { id: "fc04.success-criteria", name: "Pilot success criteria", description: "Measurable, buyer-agreed conditions (metric, threshold, method, data, date, who judges) that, if met, mean the buyer proceeds to purchase.", competency: "fc-sales", related: ["fc04.paid-pilot", "fc04.meddpicc"] },
    { id: "fc04.conversion-clause", name: "Conversion clause", description: "Pilot contract terms fixing what happens on success: pre-agreed annual price and scope, start date, credit of the pilot fee, decision meeting date and owners.", competency: "fc-sales", related: ["fc04.paid-pilot"] },
    { id: "fc04.security-review", name: "Enterprise security review", description: "The buyer's assessment of a vendor's security: questionnaire (SIG, CAIQ or custom), evidence (SOC 2 report, ISO/IEC 27001 certificate, penetration test), architecture and data-flow review, and a data processing agreement.", competency: "fc-sales", related: ["fc04.paper-process"] },
    { id: "fc04.on-prem-deployment", name: "On-prem and isolated deployment", description: "Running the product on the customer's servers or an isolated tenant: hardware and software prerequisites, network isolation, offline updates, support access policy and who operates it.", competency: "fc-sales", related: ["fc04.security-review"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What a pilot is for, and what it costs you",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave sells into test labs that will want to see Lockstep and Ripple on their own rigs and data, inside their security perimeter (Enclave on their servers). Mizan's first live thread is a soiling-analytics pilot targeting Shagaya Phase I with KISR researchers as methodology partner. Pilots are where early-stage B2B companies either convert their first customers or burn months of engineering time on unpaid science projects. The difference is decided before the pilot starts.`,
        },
        {
          kind: "md",
          md: md`### The only purpose of a pilot

A pilot (or proof of concept, POC) exists to let the buyer make a **purchase decision** with acceptable risk. It is not a free trial, not a research project and not a way to delay saying no. Everything in its design follows from that:

- **Scope:** the smallest set that answers the buyer's decision criteria (lesson 4). Two rigs, one product line, eight weeks; not "the whole lab".
- **Success criteria:** written, measurable, agreed by the champion and known to the economic buyer before the start.
- **Decision:** a dated meeting at the end, with the economic buyer, to decide on the pre-agreed contract.

### Paid or free?

Charging for a pilot does four things: it tests that a budget owner exists (a free pilot can be approved by anyone), it takes the deal through vendor onboarding and procurement once (the conversion contract then reuses the paperwork), it makes the buyer allocate their own people, and it pays for part of your delivery. Common practice is a fee that covers a meaningful share of the delivery cost, credited against the first-year contract if the buyer converts within a set window.

The economics:`,
        },
        { kind: "equation", formula: "fc04-pilot-ev" },
        {
          kind: "md",
          md: md`Setting $EV = 0$ for a free pilot ($F = 0$) gives the break-even conversion probability $p_c^* = C_d / (\mathrm{ACV}\cdot GM\cdot n)$. If your honest estimate of conversion is below it, the free pilot destroys value even before counting founder time. Conversion probabilities for paid vs free pilots are rarely published reliably; use your own history and stay conservative. The difference in commitment is the mechanism, not a benchmark number.

### Success criteria that decide

Each criterion needs six parts: **metric, threshold, measurement method, data set, date, and who judges.**

| Weak | Strong (illustrative) |
|---|---|
| "Ripple reduces testing time" | "On 5 historical firmware changes chosen by the buyer, Ripple's selected set catches 100 % of the failures found by the full regression, using at most 25 % of the full rig-hours; judged by the validation manager by 15 May." |
| "Lockstep captures data reliably" | "Over 4 weeks on 2 rigs, Lockstep records all configured DAQ channels and HMI events with timestamp alignment within the agreed tolerance, with zero data loss in the buyer's audit sample." |
| "The soiling model is accurate" (Mizan) | "Over 8 weeks of the dust season, the estimated soiling ratio is within an agreed tolerance of the reference soiling measurement, using a method agreed with the methodology partner (for example a method from IEC 61724-1:2021)." |

Write the criteria with the buyer; if they will not commit to criteria, they will not commit to a purchase.

### The conversion clause

Put the purchase decision into the pilot agreement: the annual price and scope that apply on success, the start date (for example, the first of the month after the decision meeting), the credit of the pilot fee if signed within 30 days, the date of the decision meeting and its attendees, and what happens if criteria are not met (end, or one defined extension). Then success leads to a signature, not a new negotiation in which you have just spent your leverage.`,
        },
        {
          kind: "matrix",
          title: "Pilot types",
          xAxis: ["Vague or no success criteria", "Written, measurable criteria"],
          yAxis: ["Free", "Paid"],
          cells: [
            { label: "Paid science project", detail: "Money but no decision rule. Ends in 'interesting, let's extend'." },
            { label: "Real pilot", detail: "Budget owner exists, criteria agreed, conversion terms fixed. Aim here." },
            { label: "Free consulting", detail: "No commitment and no decision rule. Decline or reshape." },
            { label: "Acceptable exception", detail: "Only with a short scope, conversion clause, executive sponsor and a strategic reason (lighthouse logo, data access)." },
          ],
          caption: "Push every pilot request toward the top-right before agreeing to start.",
        },
        {
          kind: "flow",
          title: "Pilot lifecycle",
          steps: [
            { label: "Scope and criteria", detail: "Written with the champion" },
            { label: "Security review", detail: "Questionnaire, architecture, DPA" },
            { label: "Pilot agreement", detail: "Fee, conversion clause, dates" },
            { label: "Install", detail: "On-prem or isolated tenant" },
            { label: "Run and review weekly", detail: "Against the criteria" },
            { label: "Decision meeting", detail: "Economic buyer, criteria scorecard" },
            { label: "Annual contract", detail: "Pre-agreed terms" },
          ],
          caption: "Start the security review in parallel with scoping, not after: it is often the longest step.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Pilot economics",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Paid vs free pilot for an Afterwave prospect",
          given: md`Illustrative assumptions: delivery cost $C_d$ = EUR 30k (engineering partner time, travel, on-prem installation); annual contract on conversion ACV = EUR 80k at 75 % gross margin, expected 3 years. Paid pilot: fee EUR 25k, assumed conversion 60 %. Free pilot: assumed conversion 25 %. (The conversion rates are planning assumptions, not data.)`,
          steps: [
            { md: md`**Value of a converted customer (gross profit):** $\mathrm{ACV}\cdot GM\cdot n = 80\times0.75\times3 = 180$ EUR k.` },
            { md: md`**Paid pilot:** $EV = 25 - 30 + 0.60\times180 = -5 + 108 = 103$ EUR k.` },
            { md: md`**Free pilot:** $EV = 0 - 30 + 0.25\times180 = -30 + 45 = 15$ EUR k.` },
            { md: md`**Per unit of team time:** if each pilot takes about 10 weeks of combined founder and engineering time, the paid pilot returns about EUR 10.3k per week of team time and the free pilot about EUR 1.5k.` },
          ],
          result: md`Under these assumptions the paid pilot is worth about seven times the free one. Even if paid conversion were only 40 %, $EV = -5 + 72 = 67$ EUR k, still far ahead. The fee is less about revenue than about selecting buyers who will decide.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: break-even conversion for a free pilot",
          given: md`Same delivery cost (EUR 30k) and contract value (EUR 80k ACV, 75 % margin, 3 years). No fee.`,
          steps: [
            { md: md`Break-even: $p_c^* = C_d/(\mathrm{ACV}\cdot GM\cdot n) = 30/180$.` },
            { md: md`$p_c^* = 0.167$, i.e. **16.7 %**.`, hidden: true, check: { prompt: "Break-even conversion probability (%)", answer: 16.7, unit: "%", tolerance: { abs: 0.2 } } },
            { md: md`Now the delivery cost doubles to EUR 60k because the buyer needs a custom DAQ integration. New break-even: $60/180$.` },
            { md: md`= **33.3 %**.`, hidden: true, check: { prompt: "New break-even conversion (%)", answer: 33.3, unit: "%", tolerance: { abs: 0.3 } } },
          ],
          result: md`Scope creep raises the bar for a free pilot fast. Custom integration work is exactly what a pilot fee should cover.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Security reviews, on-prem and the pilot agreement",
      blocks: [
        {
          kind: "md",
          md: md`### The enterprise security review

Expect it in every Afterwave deal: you will be handling test data, firmware and possibly models that the buyer considers core IP.

| Item | What it is | Early-stage reality |
|---|---|---|
| **Questionnaire** | Shared Assessments SIG, CSA CAIQ, or the buyer's own list (often 100 to 300 questions) | Keep a maintained answer library; answer precisely, never "N/A" without a reason |
| **SOC 2 report** | AICPA attestation on controls; Type I (design at a date) or Type II (operation over a period, often 6 to 12 months) | You will not have Type II at seed; say when you will, and show controls and policies now |
| **ISO/IEC 27001** | Certified information security management system | Common ask from European industrials; a credible roadmap helps |
| **Penetration test** | Third-party test of the product and infrastructure | One recent report with fixes closed goes a long way |
| **Architecture and data flows** | Where data is stored, processed and transmitted; who can access it | For Enclave: data and models stay on the customer's servers or isolated tenant. This is your strongest answer; make it a one-page diagram |
| **Data processing agreement** | Required under GDPR Art. 28 where you process personal data on the buyer's behalf | Test data is mostly not personal, but logs and user accounts are |

**Timing:** ask in discovery how the last tool passed security, and send your security pack (architecture note, policies, answer library, pen test summary) at S3. A security review started after a verbal yes routinely adds weeks to months.

### On-prem and isolated deployment

- **Prerequisites document:** server specification, operating system, container runtime, GPU if needed, storage per rig-month of data, network ports.
- **Isolation:** no outbound connection by default; if telemetry or licence checks need a connection, say exactly what is sent.
- **Updates:** signed offline bundles and a documented update procedure the customer's IT can run.
- **Support access:** how you get access when something breaks (screen share under their control, a time-limited account), agreed in writing.
- **Who operates it:** the customer's IT, your team remotely, or both. Write it in the pilot agreement.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How pilots fail to convert",
          md: md`- **Criteria written after the start,** or never. Every result becomes debatable.
- **The champion runs the pilot alone.** The economic buyer first hears of it at the end and asks for "more data".
- **Scope creep:** "while you are here, could it also..." Each addition moves the end date and the criteria. Log requests for the annual contract instead.
- **Security review started last.** The pilot succeeds and then waits three months for approval.
- **No conversion terms.** Success opens a negotiation in which you have already shown your hand.
- **Pilot purgatory:** repeated extensions. Allow one defined extension, then decide.`,
        },
        {
          kind: "checklist",
          title: "Pilot agreement contents",
          items: [
            "Scope: rigs or sites, product modules, data sets, duration",
            "Success criteria: metric, threshold, method, data, date, who judges",
            "Responsibilities on both sides: data access, IT support, named people and hours",
            "Fee, payment terms and credit against the annual contract",
            "Conversion clause: annual price and scope on success, start date, decision meeting date and attendees",
            "Data, IP and confidentiality: who owns captured data, models trained on it, and the product improvements",
            "Security and deployment: architecture, access, updates, removal of data at the end",
            "End or extension rule if criteria are not met",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask before agreeing a pilot",
          items: [
            "If the pilot meets these criteria, what happens next, and who decides?",
            "Who will attend the decision meeting on the end date?",
            "Is there budget for the annual contract this year, or does it need a new budget line?",
            "How long did security review take for your last tool, and can we start it now?",
            "Which of your people will be available for the pilot, and for how many hours a week?",
          ],
        },
        { kind: "scenario", scenario: "fc04-s2" },
        {
          kind: "question",
          question: {
            id: "fc04-l06-p1",
            type: "short",
            prompt: md`Draft the pilot proposal for either an Afterwave on-prem pilot (Lockstep and Ripple on a prospect's rigs) or the Mizan soiling-analytics pilot (illustrative terms only; do not state any agreement with KISR or any operator that does not exist). Include: (1) scope; (2) three to five success criteria, each with metric, threshold, method, data, date and judge; (3) the fee and its expected-value justification using the pilot EV formula; (4) the conversion clause; (5) the security and deployment plan; (6) the decision meeting.`,
            rubric: [
              "Scope is tight and time-boxed (named rigs or plant area, modules, duration).",
              "Success criteria each include metric, threshold, method, data, date and who judges, and connect to the buyer's decision criteria.",
              "Fee is stated and justified with a correct EV or break-even calculation, with assumptions labelled.",
              "Conversion clause fixes annual price and scope, start date, fee credit window and decision meeting.",
              "Security and deployment plan covers data location, access, updates and the review timeline, started before the pilot.",
              "Respects venture facts: no invented agreements, customers or results; Mizan pilot described as targeted, with KISR as methodology partner only.",
            ],
            modelAnswer: md`**Afterwave pilot proposal (illustrative), drive-unit validation lab.**

**Scope:** Lockstep on 2 rigs, Ripple on the drive-inverter firmware regression suite; Enclave on one customer server; 10 weeks from installation.

**Success criteria:** (1) Lockstep records all configured DAQ channels and HMI events on 2 rigs for 4 weeks with zero data loss in a 20-run audit sample; judged by the test systems engineer, week 6. (2) On 5 historical firmware changes chosen by the buyer, Ripple's selected set catches 100 % of failures found by the full regression; judged by the validation manager, week 8. (3) Selected sets use at most 25 % of full rig-hours on those changes; same judge and date. (4) Two new releases during the pilot run with selection in parallel to a full run; no regression missed; week 10.

**Fee:** EUR 25k, credited against year 1 if signed within 30 days of the decision meeting. Justification: delivery cost about EUR 30k; with ACV EUR 80k, 75 % margin, 3 years, a free pilot breaks even only above 16.7 % conversion, and the fee confirms a budget owner and runs onboarding once.

**Conversion clause:** on meeting criteria 1 to 4, the parties sign the annual subscription for up to 6 rigs at EUR 80k/yr starting the first of the following month; one extension of 4 weeks if a criterion is missed for a reason outside Afterwave's control.

**Security and deployment:** security pack sent at proposal: architecture note (no data leaves the server, no outbound connection), policies, questionnaire answers, pen test summary; offline signed updates; support access by customer-controlled screen share; data deleted or handed over at the end.

**Decision meeting:** week 11 with the VP Engineering, validation manager and procurement; criteria scorecard prepared jointly.`,
            explanation: md`Strong proposals make success and its consequence unambiguous before any installation.`,
            concepts: ["fc04.paid-pilot", "fc04.success-criteria", "fc04.conversion-clause", "fc04.security-review", "fc04.on-prem-deployment"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["fc04-r11", "fc04-r12", "fc04-r13", "fc04-r14", "fc04-r17", "fc04-r18"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l06-q1",
      type: "numeric",
      prompt: md`Pilot fee EUR 20k, delivery cost EUR 35k, conversion probability 50 %, ACV EUR 60k at 80 % margin for 3 years. What is the pilot's expected value (EUR k)?`,
      answer: 57,
      tolerance: { abs: 0.1 },
      unit: "EUR k",
      explanation: md`$EV = 20 - 35 + 0.5\times60\times0.8\times3 = -15 + 72 = 57$ EUR k.`,
      concepts: ["fc04.paid-pilot"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l06-q2",
      type: "multi",
      prompt: "Which are parts of a well-formed success criterion? (Select all that apply.)",
      options: ["Metric", "Threshold", "Measurement method and data set", "Date and who judges", "The vendor's product roadmap"],
      answer: [0, 1, 2, 3],
      explanation: md`Metric, threshold, method, data, date and judge. The roadmap belongs elsewhere.`,
      concepts: ["fc04.success-criteria"],
      difficulty: 1,
    },
    {
      id: "fc04-l06-q3",
      type: "mcq",
      prompt: "What is the main purpose of a conversion clause?",
      options: [
        "To make the pilot free",
        "To fix in advance what contract follows if the success criteria are met, so success leads to signature rather than a new negotiation",
        "To allow unlimited extensions",
        "To transfer IP to the customer",
      ],
      answer: 1,
      explanation: md`It preserves your leverage: price, scope and start date are agreed while the buyer still wants the pilot.`,
      concepts: ["fc04.conversion-clause"],
      difficulty: 1,
    },
    {
      id: "fc04-l06-q4",
      type: "mcq",
      prompt: "What is the difference between a SOC 2 Type I and Type II report?",
      options: [
        "Type I covers security only; Type II covers privacy only",
        "Type I assesses the design of controls at a point in time; Type II assesses their operating effectiveness over a period",
        "Type II is the European version",
        "There is no difference",
      ],
      answer: 1,
      explanation: md`Type II needs an observation period (often 6 to 12 months), which is why a seed-stage company usually offers a roadmap, policies and a pen test instead.`,
      concepts: ["fc04.security-review"],
      difficulty: 2,
    },
    {
      id: "fc04-l06-q5",
      type: "decision",
      prompt: md`A prospect asks for a free 6-month POC "to see what the product can do", with no success criteria, and says budget will be discussed afterwards. What do you do?`,
      options: [
        { text: "Accept: any pilot is a foot in the door.", score: 0.1, feedback: "Six months of free work with no decision rule is the classic pilot purgatory." },
        { text: "Propose an 8 to 10 week paid pilot with written criteria and a conversion clause, and ask who would decide on the annual contract; offer a shorter free technical session if they need to check feasibility first.", score: 1, feedback: "Reshapes the request into a decision, and tests whether a budget owner exists, while offering a low-cost first step." },
        { text: "Decline politely and move on.", score: 0.4, feedback: "May be right eventually, but try reshaping first: the interest may be real." },
      ],
      explanation: md`Push every request toward a paid, scoped, criteria-based pilot. If the buyer refuses all commitment, disqualify.`,
      concepts: ["fc04.paid-pilot", "fc04.success-criteria"],
      difficulty: 2,
    },
    {
      id: "fc04-l06-q6",
      type: "order",
      prompt: "Order the pilot lifecycle.",
      items: ["Agree scope and success criteria", "Start security review", "Sign pilot agreement with conversion clause", "Install", "Run with weekly reviews", "Decision meeting with the economic buyer"],
      explanation: md`Criteria first, security in parallel and early, agreement before installation, decision at a fixed date.`,
      concepts: ["fc04.paid-pilot", "fc04.security-review"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l06-f1", front: "Pilot expected value", back: md`$EV = F - C_d + p_c\cdot\mathrm{ACV}\cdot GM\cdot n$`, concepts: ["fc04.paid-pilot"] },
    { id: "fc04-l06-f2", front: "Break-even conversion for a free pilot", back: md`$p_c^* = C_d/(\mathrm{ACV}\cdot GM\cdot n)$; EUR 30k cost vs EUR 180k gross profit gives 16.7 %.`, concepts: ["fc04.paid-pilot"] },
    { id: "fc04-l06-f3", front: "Six parts of a success criterion", back: "Metric, threshold, method, data, date, who judges.", concepts: ["fc04.success-criteria"] },
    { id: "fc04-l06-f4", front: "Conversion clause contents", back: "Annual price and scope on success, start date, fee credit window, decision meeting date and attendees, extension rule.", concepts: ["fc04.conversion-clause"] },
    { id: "fc04-l06-f5", front: "Security pack to send at S3", back: "Architecture and data-flow note, policies, questionnaire answer library, pen test summary, DPA template, certification roadmap.", concepts: ["fc04.security-review"] },
    { id: "fc04-l06-f6", front: "On-prem deployment must define", back: "Prerequisites, network isolation, offline signed updates, support access policy, who operates it.", concepts: ["fc04.on-prem-deployment"] },
  ],
  scenarios: [
    {
      id: "fc04-s2",
      title: "The security team asks for SOC 2 Type II",
      context: md`Illustrative. Afterwave's pilot with a robotics company is agreed in principle. The buyer's information security team sends a 240-question questionnaire and writes: "Please also provide your SOC 2 Type II report. We do not onboard vendors without one." You do not have one.`,
      start: "a",
      concepts: ["fc04.security-review", "fc04.on-prem-deployment", "fc04.paper-process"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Reply that you are SOC 2 compliant.", score: 0, feedback: "Without an audit report this is false, and it will be discovered. Never do this." },
            { text: "Ask your champion to arrange a 30-minute call with the security lead to walk through the architecture, and send the questionnaire answers with an honest statement of your certification roadmap.", score: 9, feedback: "Moves from a document requirement to a risk conversation, where your on-prem architecture is the strongest argument.", next: "b" },
            { text: "Ask the champion to get security to make an exception.", score: 4, feedback: "Sometimes works, but bypassing security without addressing their risk makes them a blocker later.", next: "b" },
          ],
        },
        b: {
          md: md`On the call, the security lead says: "My concern is that our test data and firmware leave our network."`,
          choices: [
            { text: "Show the one-page architecture: Enclave runs on their server, no outbound connections by default, offline signed updates, support only via a customer-controlled session; offer to have their team verify network behaviour during installation.", score: 10, feedback: "Addresses the actual risk with verifiable design. Many security teams accept compensating controls for a scoped on-prem pilot.", next: "c" },
            { text: "Promise to start a SOC 2 audit next month.", score: 4, feedback: "A roadmap helps, but it does not answer the data-exfiltration concern.", next: "c" },
          ],
        },
        c: {
          md: md`Security agrees to approve a 10-week on-prem pilot with conditions: a pen test report within 6 months and a SOC 2 Type I before any cloud deployment. How do you record this?`,
          choices: [
            { text: "Add the conditions to the mutual action plan and the pilot agreement, put the pen test and SOC 2 Type I on the company roadmap with dates and budget, and add the questionnaire answers to your answer library.", score: 10, feedback: "Turns one deal's security review into a reusable asset and a tracked commitment." },
            { text: "Note it in your head and move on.", score: 2, feedback: "Conditions you forget become reasons to terminate later." },
          ],
        },
      },
    },
  ],
};

export default lesson;
