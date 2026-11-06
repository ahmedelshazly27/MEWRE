import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw03-l06",
  title: "Where agents fit: planning retests and running rigs with human approval",
  summary:
    "Afterwave's product vision has agents that plan retests, run rigs overnight with human approval and write reports, inside the customer's Enclave. This lesson separates that vision from today's products, shows the mechanism (an agent loop over bench memory, Ripple, the rig calendar and the customer's orchestrator), where approval gates go and why (compound reliability, hazard and reversibility), what an agent must never do on a rig, and what competitors announced in 2026.",
  minutes: 75,
  objectives: [
    "State precisely which part of the agent vision is a later product stage and describe it without claiming shipped capability",
    "Describe the loop an overnight retest agent would run and the tools and data it needs",
    "Place approval gates using compound reliability, hazard and reversibility",
    "List the hard boundaries for automation on energised rigs",
    "Write an agent charter for an overnight retest agent at a pilot customer",
  ],
  concepts: [
    { id: "aw03.retest-agent", name: "Overnight retest agent (vision)", description: "A planned Afterwave capability: an agent inside Enclave that reads the day's changes and bench memory, asks Ripple for impacted tests, drafts a ranked night plan within rig capacity, submits it for human approval, hands approved jobs to the customer's orchestrator, monitors and writes the morning report.", competency: "aw-test", related: ["aw03.unattended-operation", "aw03.run-record"] },
    { id: "aw03.approval-gate", name: "Approval gate", description: "A recorded human decision (who, when, which plan version) required before an agent's plan executes; placed where errors are costly, hazardous or irreversible, and designed so one review covers a whole plan with its reasons and risks.", competency: "aw-test", related: ["aw03.retest-agent", "fc10.human-checkpoints"] },
    { id: "aw03.compound-reliability", name: "Compound reliability of agent plans", description: "A plan of n unchecked steps with per-step reliability r succeeds with probability about r^n; verification checkpoints (firmware hash after flash, rig in safe state, plan within capacity) break the chain.", competency: "aw-test", related: ["aw03.approval-gate", "fc10.compound-reliability"] },
    { id: "aw03.automation-boundary", name: "Automation boundary on rigs", description: "Things automation, including agents, never does: bypass or reconfigure the safety chain, change limits or safety parameters, create new sequences that run unattended, or energise rigs that site rules require to be attended.", competency: "aw-test", related: ["aw03.unattended-operation"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From a rerun list to a supervised night",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Investors will ask about agents, and so will customers who have read about Sift Agents or NI's Nigel. You need an answer that is ambitious and exactly true: what Afterwave does now (Lockstep capture, Ripple's change-impact selection), what comes next in the stated order (teams' own models and agents inside Enclave; then agents planning retests and running rigs overnight with human approval), and why the approval design is an engineering argument, not a disclaimer. Overclaiming here costs you the test lead's trust; underclaiming costs you the investor's.`,
        },
        {
          kind: "md",
          md: md`### Where it sits in the product vision

1. **Now:** capture layer (Lockstep) and Ripple.
2. **Next:** teams train local models on bench memory and hand context to their own agents inside **Enclave** (customer servers or an isolated tenant).
3. **Then:** agents plan retests, run rigs overnight **with human approval**, and write reports.
4. **Later:** Afterwave's own instrumented test platforms feeding bench memory from day one.

Stage 3 is the subject of this lesson. It is a direction, not a shipped feature; describe it that way.

### The loop

An agent here is a model in a loop with tools. For an overnight retest the loop would be:

1. **Read changes:** the day's firmware commits, parameter and model updates, rig configuration changes.
2. **Ask Ripple:** which tests are impacted, ranked, with the reason for each.
3. **Read bench memory:** history of those tests (flake rates, pass-on-retry trends, durations, which rigs they run on).
4. **Read capacity:** rig calendar, capabilities, unattended availability (Lesson 3).
5. **Draft the plan:** ranked list fitted to capacity, batched by firmware and setup, with what is deferred and why.
6. **Approval gate:** a named human approves, edits or rejects the plan; the decision is recorded.
7. **Hand off:** approved jobs go to the customer's orchestrator and sequencer through their API; execution stays in their tools.
8. **Monitor:** follow progress; on errors, apply only the recovery actions the charter allows; escalate the rest.
9. **Report:** morning report with verdicts (fail, error, pass-on-retry separated), recordings linked, coverage on the new baseline, and what was not run.

Everything the agent reads and writes stays inside Enclave. That matters for security: an agent with access to private data, exposure to untrusted content (for example text in logs or tickets) and a path to communicate externally is the dangerous combination Founder Core calls the lethal trifecta. Removing external communication is the simplest of the three to enforce on-prem.

### Why approval gates: the arithmetic`,
        },
        { kind: "equation", formula: "aw03-compound-reliability" },
        {
          kind: "md",
          md: md`A night plan is many steps: choose tests, map them to rigs, order them, flash, verify, run, recover, report. At 98 % per unchecked step, 12 steps succeed together 78 % of the time. Two kinds of check fix this:

- **Automated verification** inside the loop (firmware hash matches after flash, rig reports safe state before the next test, plan fits the window). Each breaks the chain.
- **Human approval** where an error is costly, hazardous or irreversible. One well-designed review of the whole plan (diff against the default plan, reasons, rig hours, risk flags) is better than many interruptions.

### What automation never does on a rig

Independent of any agent design, these stay outside software control:

- Bypass, mute or reconfigure the **safety chain** (e-stop, interlocks, safety PLC, light curtains).
- Change **limits** or safety-relevant parameters to make a test pass.
- Run a **new or modified sequence unattended** before it has run attended.
- Energise rigs that **site rules** require to be attended (high-voltage packs, large dynos, robots with free motion).
- **Skip** a test required by a release or safety plan without a human decision recorded against it.`,
        },
        {
          kind: "matrix",
          title: "Where an agent may act, by hazard and reversibility",
          xAxis: ["Reversible (rerun, requeue, report)", "Irreversible or state-changing (flash bootloader, overwrite data, destructive test)"],
          yAxis: ["Low hazard (simulation, SIL, low-voltage HIL)", "High hazard (energised power stage, moving machinery, high-voltage battery)"],
          cells: [
            { label: "Approve the plan, then act", detail: "Energised rig running pre-approved sequences within limits. Human approves the night plan; automation follows it; safety chain independent." },
            { label: "Human only", detail: "Destructive tests, safety parameter changes, anything on energetic rigs that cannot be undone. Agent may draft, never execute." },
            { label: "Agent may act", detail: "Rerun SIL, requeue a HIL job, draft reports. Log everything; human reviews outcomes." },
            { label: "Approve each action", detail: "Low-voltage but state-changing: bootloader reflash, deleting recordings. Explicit approval per action." },
          ],
          caption: "Top row = high hazard. Approval effort should follow this map, not be uniform.",
        },
        {
          kind: "flow",
          title: "Supervised overnight retest (vision, stage 3)",
          steps: [
            { label: "Changes in", detail: "Firmware, parameters, model, rig configuration" },
            { label: "Ripple ranks", detail: "Impacted tests with reasons" },
            { label: "Agent drafts plan", detail: "Fits capacity, batches, flags risks, lists what is deferred" },
            { label: "Human approves", detail: "Recorded: who, when, plan version" },
            { label: "Customer orchestrator runs", detail: "Their sequencer, their safety chain; Lockstep captures" },
            { label: "Agent reports", detail: "Verdicts, recordings, coverage on new baseline, open items" },
          ],
          caption: "Execution stays in the customer's tools. The agent plans, hands off and reports.",
        },
      ],
    },
    {
      layer: "applied",
      title: "What a ranked, approved night is worth",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Ranked vs unranked night plan, and checkpoints",
          given: md`Illustrative night after a firmware change: 60 candidate tests, capacity for 40. From history (hypothetical numbers for the exercise), each test's chance of revealing a regression from this kind of change: 10 tests at 15 %, 20 tests at 5 %, 30 tests at 1 %. A plan has 12 steps per rig; per-step reliability 98 % without checks.`,
          steps: [
            { md: md`**Ranked plan (top 40):** expected revealing tests $= 10 \times 0.15 + 20 \times 0.05 + 10 \times 0.01 = 1.5 + 1.0 + 0.1 = 2.6$.` },
            { md: md`**Unranked plan (any 40 of 60):** expected $= \tfrac{40}{60}(1.5 + 1.0 + 0.3) = 0.667 \times 2.8 = 1.87$.` },
            { md: md`**Gain:** ranking finds about 39 % more regression signals in the same rig hours ($2.6/1.87 = 1.39$).` },
            { md: md`**Reliability without checks:** $0.98^{12} = 0.785$ per rig per night.` },
            { md: md`**With verification after flash, after setup and before each test,** the longest unchecked chain falls to about 4 steps: $0.98^4 = 0.922$. The remaining failures are caught and escalated rather than silently producing bad results.` },
          ],
          result: md`The value of the agent is not autonomy for its own sake: it is ranking with reasons (Ripple) plus a plan a human can approve quickly, executed with checks that make unattended results trustworthy. All probabilities here are hypothetical; in a real pilot they would come from bench memory and be validated against full runs.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Approval time as the cost to minimise",
          given: md`Illustrative: today a test lead spends 60 minutes each evening building the night plan by hand. With a drafted plan, reasons and risk flags, review takes 10 minutes. 220 working evenings a year.`,
          steps: [
            { md: md`Time saved per evening $= 60 - 10 = 50$ min.` },
            { md: md`Per year $= 50 \times 220/60 = 183$ hours.`, hidden: true, check: { prompt: "Hours saved per year", answer: 183.3, unit: "h", tolerance: { abs: 1 } } },
            { md: md`The review must stay meaningful: if the lead approves in 30 seconds without reading, the gate has failed. Design for a short but real review (diff vs a default plan, highlighted deferrals and risk flags).` },
          ],
          result: md`Approval is cheap when the plan is legible, and that is the product design problem: the reasons and the diff, not the automation.`,
        },
        {
          kind: "question",
          question: {
            id: "aw03-l06-p1",
            type: "numeric",
            prompt: md`An agent plan has 20 steps with no verification, each 99 % reliable. What is the probability, in percent, that the whole plan executes correctly?`,
            answer: 81.8,
            tolerance: { abs: 0.2 },
            unit: "%",
            explanation: md`$0.99^{20} = 0.818$. Nearly one plan in five goes wrong somewhere. Verification checkpoints shorten the unchecked chain.`,
            concepts: ["aw03.compound-reliability"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Agents in test labs in 2026",
      blocks: [
        {
          kind: "callout",
          tone: "unverified",
          title: "What others announced in 2026 (from search summaries in the research brief)",
          md: md`- **Sift Agents** (research preview, late Sep 2026): agents investigate telemetry inside the customer's Sift environment and turn findings into reusable rules, with human approval before changes; Sift also has an MCP server.
- **NI Nigel**: AI assistant across LabVIEW+, FlexLogger, TestStand and SystemLink, general availability announced for later in 2026.
- **Vector CANoe** 20 SP2: integrated MCP server and an AI package that generates tests from requirements, runs and fixes them (single secondary source, Aug 2026).
- **dSPACE**: headline about MCP-enabled AI engineering workflows (Aug 2026), body not seen.
- **Nominal** acquired Fid Labs, which connects AI agents to robotics development environments and simulators (date not verified).

None of these was found to do change-impact test selection for rigs, firmware and models. All of this came from search summaries and must be rechecked before use in external material.`,
        },
        {
          kind: "md",
          md: md`### Positioning against this

The incumbents put assistants inside their own tools (write a sequence, configure a logger, generate a CAPL test). Data platforms put agents on telemetry. Afterwave's distinct claim is the **decision** of what to retest after a change, with reasons, built from synchronised bench memory, running inside the customer's environment. Agents running rigs is the later application of that decision, through the customer's existing orchestrator. Do not compete on "we have agents too".

### Who has to say yes

- **Test lead:** approves night plans; needs legible reasons and an easy override.
- **Lab safety officer:** decides what may run unattended; needs to see that the safety chain is untouched and that the agent cannot change limits.
- **IT and security:** need the Enclave deployment model, no external egress, audit logs.
- **Head of validation:** needs evidence the selection does not miss regressions (selected nightly vs full weekly comparison).`,
        },
        { kind: "xref", to: "fc10-l06", note: "Founder Core, agentic workflows and their limits: agent vs workflow, compound reliability, human checkpoints, the lethal trifecta and agent charters in general." },
        {
          kind: "ask",
          title: "Questions before proposing any agent in a pilot",
          items: [
            "Which rigs and sequences does your safety officer allow to run unattended today?",
            "Who approves the night plan now, how long does it take, and what do they check?",
            "Can your orchestrator accept jobs through an API, and can it enforce that only approved plan versions run?",
            "What would an agent need to log for you to trust a morning report?",
            "What is the one action you would never let software take on this rig?",
          ],
        },
        { kind: "scenario", scenario: "aw03-s3" },
        {
          kind: "question",
          question: {
            id: "aw03-l06-p2",
            type: "short",
            prompt: md`**Write an agent charter (one page) for a future overnight retest agent at an illustrative pilot customer with three HIL rigs and one actuator rig.** Include: purpose; what it may read; what it may do without approval, with plan approval, with per-action approval, and never; the approval record; verification checkpoints; stop and escalation conditions; logging and the morning report. State clearly that this describes a planned capability (product stage 3), and keep execution in the customer's orchestrator and sequencer.`,
            rubric: [
              "States it is a planned capability (stage 3 of the vision) and does not claim it exists today",
              "Permissions are tiered by hazard and reversibility: free actions limited to reversible, low-hazard ones (requeue SIL or HIL, draft reports); plan approval for energised but pre-approved sequences; per-action approval for state-changing actions; never for safety chain, limits, new unattended sequences, attended-only rigs",
              "Approval record is specific (who, when, plan version, diff, deferrals) and execution is through the customer's orchestrator",
              "Includes concrete verification checkpoints (firmware hash after flash, safe state before each test, capacity check) and stop and escalation conditions with limits on recovery attempts",
              "Logging and morning report separate fail, error and pass-on-retry, link recordings and state coverage and what was not run",
              "Data stays inside Enclave with no external egress; no invented customer facts",
            ],
            modelAnswer: md`**Agent charter: overnight retest agent (planned capability, product stage 3; draft for discussion with the pilot customer)**

**Purpose.** Each evening, propose a ranked night plan of tests impacted by the day's changes, obtain approval, hand approved jobs to the customer's orchestrator, monitor, and write the morning report.

**May read.** Change logs (firmware, parameters, plant model, rig configuration); Ripple's impacted-test list with reasons; bench memory (test history, flake and retry rates, durations); rig calendar and capabilities. All inside Enclave; no external network access.

**Without approval.** Draft plans and reports; requeue a SIL job; requeue a HIL job that ended in **error** once.

**With plan approval.** Submit the approved plan's jobs on HIL rigs 1 to 3 (low-voltage) using existing, attended-proven sequences and current limits.

**With per-action approval.** Bootloader reflash; deleting or overwriting any recording; any job on the actuator rig.

**Never.** Touch the safety chain or its configuration; change limits or safety parameters; run new or modified sequences unattended; skip a test listed in the release or safety plan; run anything the safety officer has marked attended-only.

**Approval record.** Approver name, time, plan version hash, diff against the default plan, deferred tests with reasons, risk flags shown.

**Checkpoints.** Firmware hash verified after every flash; rig reports safe state before each test; plan fits capacity (window x availability / (test + setup)).

**Stop and escalate.** Two failed recoveries on a rig: park it in safe state and page on-call. Any safety-chain trip: stop all jobs on that rig. Plan deviation beyond 10 % of rig hours: pause and notify.

**Morning report.** Pass, fail, error and pass-on-retry counts; each fail with recording and triggering change; coverage on the new baseline; tests not run and why; every recovery action taken.`,
            explanation: md`Graded against the rubric. A good charter could be signed by the test lead, the safety officer and IT security without edits to the never list.`,
            concepts: ["aw03.retest-agent", "aw03.approval-gate", "aw03.automation-boundary"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Afterwave's agents will ask for human approval, and why that is a strength rather than a limitation.",
          keyPoints: [
            "Rigs are energised physical systems; some actions are hazardous or irreversible",
            "Multi-step plans compound errors (r^n), so checks and one meaningful approval of the plan raise reliability",
            "Approval at the plan level is fast if the plan carries reasons and a diff, so the time saved stays large",
            "Customers' safety officers and test leads will only allow unattended runs under such controls, so it is what makes adoption possible",
            "It is a planned product stage built on Ripple and bench memory, not a current feature",
          ],
        },
        { kind: "sources", refs: ["aw03-r4", "aw03-r5", "aw03-r18", "aw03-r19"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw03-l06-q1",
      type: "mcq",
      prompt: "Which statement about Afterwave's agents is accurate today?",
      options: [
        "Afterwave agents already run customers' rigs autonomously every night",
        "Agents that plan retests and run rigs overnight with human approval are a later stage of the product vision, after capture, Ripple and teams' own models and agents in Enclave",
        "Afterwave does not plan to use agents",
        "Agents replace the customer's sequencer",
      ],
      answer: 1,
      explanation: md`The vision is staged. Describe stage 3 as a direction, and keep execution in the customer's tools.`,
      concepts: ["aw03.retest-agent"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw03-l06-q2",
      type: "numeric",
      prompt: md`A plan's longest unchecked chain is 6 steps at 97 % each. What is the probability, in percent, that the chain completes correctly?`,
      answer: 83.3,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$0.97^6 = 0.833$.`,
      concepts: ["aw03.compound-reliability"],
      difficulty: 1,
    },
    {
      id: "aw03-l06-q3",
      type: "multi",
      prompt: "Which actions are outside what any automation, including an agent, should do on a rig? (Select all that apply.)",
      options: [
        "Mute an interlock to finish a test",
        "Widen a limit so a failing test passes",
        "Requeue a SIL job that ended in error",
        "Run a newly written sequence unattended",
        "Draft the morning report",
      ],
      answer: [0, 1, 3],
      explanation: md`Requeueing SIL and drafting reports are reversible and low hazard. The others touch safety or evidence integrity.`,
      concepts: ["aw03.automation-boundary"],
      difficulty: 1,
    },
    {
      id: "aw03-l06-q4",
      type: "mcq",
      prompt: "Why approve the whole night plan once rather than every action?",
      options: [
        "It is legally required",
        "Frequent interruptions make reviewers rubber-stamp; one legible review of a plan with reasons, a diff and risk flags is both faster and more meaningful, with per-action approval kept for state-changing or hazardous actions",
        "Agents do not make mistakes at the action level",
        "It saves storage",
      ],
      answer: 1,
      explanation: md`Approval effort should follow hazard and reversibility; uniform per-action approval wastes attention where it is not needed.`,
      concepts: ["aw03.approval-gate"],
      difficulty: 2,
    },
    {
      id: "aw03-l06-q5",
      type: "decision",
      prompt: md`An investor asks: "Sift and NI have agents now. Isn't Afterwave late?" What is the best answer?`,
      options: [
        { text: "Our agents are better.", score: 0.1, feedback: "Unsupported and beside the point." },
        { text: "Their agents work inside their own tools (telemetry rules, sequence and logger help). Our core is the decision of what to retest after a firmware, model or rig change, with reasons, from synchronised bench memory inside the customer's environment. Agents running rigs with approval are the later application of that decision. We have not found anyone doing change-impact selection for rigs.", score: 1, feedback: "Distinct, accurate and grounded in the research, while honest that agents are a later stage." },
        { text: "We will not do agents.", score: 0.2, feedback: "Contradicts the stated vision." },
      ],
      explanation: md`Compete on the decision, not on the word agent.`,
      concepts: ["aw03.retest-agent"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw03-l06-f1", front: "Product vision order", back: "1 capture and Ripple; 2 teams' own models and agents in Enclave; 3 agents plan retests and run rigs overnight with human approval; 4 Afterwave's own instrumented test platforms.", concepts: ["aw03.retest-agent"] },
    { id: "aw03-l06-f2", front: "Compound reliability", back: md`$P \approx r^n$: 12 steps at 98 % give 78 %; checkpoints shorten $n$.`, concepts: ["aw03.compound-reliability"] },
    { id: "aw03-l06-f3", front: "Never automated on a rig", back: "Safety chain changes, limit changes, new sequences unattended, attended-only rigs, skipping required tests without a recorded decision.", concepts: ["aw03.automation-boundary"] },
    { id: "aw03-l06-f4", front: "What an approval record holds", back: "Approver, time, plan version hash, diff vs default, deferred tests with reasons, risk flags.", concepts: ["aw03.approval-gate"] },
    { id: "aw03-l06-f5", front: "Where approval effort goes", back: "By hazard and reversibility: free for reversible low-hazard, plan approval for energised pre-approved, per action for state-changing, human only for irreversible high-hazard.", concepts: ["aw03.approval-gate"] },
  ],
  scenarios: [
    {
      id: "aw03-s3",
      title: "Let it run without asking",
      context: md`Month 5 of an illustrative pilot. Ripple's nightly rerun lists have been approved by the test lead for six weeks with few edits. The head of validation says: "This is great. Can we just let the system pick and run the tests at night without anyone approving? My lead is tired of the evening review." Ismail is on the call.`,
      start: "a",
      concepts: ["aw03.approval-gate", "aw03.automation-boundary"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "Yes, we can turn approval off.", score: 1, feedback: "You would be offering a capability the product does not have, on energised rigs, without the safety officer. If anything goes wrong, the pilot and your reputation end.", next: "c" },
            { text: "Ask what the review costs and what edits the lead makes, propose making the review faster (diff vs default, only highlighted deferrals and risk flags), and suggest the safety officer define which rigs and sequences could ever qualify for standing approval.", score: 10, feedback: "Addresses the real pain (review effort) while keeping the decision with the right people.", next: "b" },
            { text: "Refuse: approval is mandatory forever.", score: 4, feedback: "Safe, but it ignores a legitimate request and closes a conversation about what could be pre-approved within strict limits.", next: "b" },
          ],
        },
        b: {
          md: md`The lead says her edits are almost always the same: she moves fault-injection cases on the actuator rig to the weekend. The safety officer agrees HIL rigs 1 to 3 with existing sequences are low risk.`,
          choices: [
            { text: "Encode her standing rule in the default plan (actuator rig fault cases to the weekend), keep a short daily review for HIL that shows only changes from the default, and write the boundaries into the charter. Revisit after a month of data on review time and edits.", score: 10, feedback: "Approval becomes cheap and stays real; the boundary is written and owned by the customer." },
            { text: "Remove approval only for HIL rigs and keep it for the actuator rig.", score: 6, feedback: "Closer, but standing approval without a recorded daily check removes the one human look at a plan built on a model's ranking. A diff-only review keeps the cost near zero." },
          ],
        },
        c: {
          md: md`Two weeks later an unapproved night run reflashes a bootloader on a rig that was reserved for a supplier audit the next morning. Nothing is damaged, but the audit is delayed.`,
          choices: [
            { text: "Own it, restore per-plan approval immediately, write a short incident note with the customer, and propose the diff-only review.", score: 5, feedback: "The right recovery, but trust has been spent that a better first answer would have kept." },
          ],
        },
      },
    },
  ],
};

export default lesson;
