import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc03-l03",
  title: "Messaging: Message House, Value Ladder and the Buying Committee",
  summary:
    "Messaging turns positioning into words for specific people. Build a message house (one core message, three pillars, proof), climb the value ladder from feature to business outcome, quantify the rung that can be quantified, and say different true things to the test engineer, the VP of engineering and the security reviewer.",
  minutes: 70,
  objectives: [
    "Build a message house from a positioning canvas",
    "Climb the value ladder from feature to capability, user benefit, business outcome and strategic outcome",
    "Quantify the business-outcome rung with the customer's own numbers and link it to price",
    "Map the enterprise buying committee and tailor the message to technical, economic and security buyers",
    "Test messages in discovery and outbound instead of debating them internally",
  ],
  concepts: [
    { id: "fc03.message-house", name: "Message house", description: "One-page messaging structure: a core message (roof), three supporting pillars (value themes) and proof points (foundation); the source for website, deck, emails and demos.", competency: "fc-gtm", related: ["fc03.value-themes", "fc03.positioning"] },
    { id: "fc03.value-ladder", name: "Value ladder", description: "Chain from feature to capability, user benefit, business outcome and strategic outcome; each audience is addressed at its own rung, with the rungs below as proof.", competency: "fc-gtm", related: ["fc03.message-house"] },
    { id: "fc03.buying-committee", name: "Buying committee", description: "The people who influence an enterprise purchase: economic buyer, technical evaluator, users, security and IT, procurement and legal, and a champion who sells internally.", competency: "fc-gtm", related: ["fc03.value-ladder"] },
    { id: "fc03.value-quantification", name: "Value quantification", description: "Turning a business outcome into money using the customer's inputs (e.g. rig-hours released times cost per rig-hour), and linking price to a share of that value.", competency: "fc-gtm", related: ["fc03.pain-intensity", "fc03.value-ladder"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From positioning to words people act on",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`An Afterwave deal involves at least three people who want different things: a test systems lead who wants to know whether Lockstep reads his DAQ, a VP of engineering who wants release dates and fewer escapes, and an InfoSec reviewer who wants to know exactly what leaves the building (nothing, if Enclave works as designed). Ismail and Yusuf will naturally speak to the first. Your job is to make sure the second and third hear something that makes them say yes, and that all three hear the same underlying story.`,
        },
        {
          kind: "md",
          md: md`### Positioning vs messaging

**Positioning** is the strategy (alternatives, attributes, value, segment, category): internal, stable, one page. **Messaging** is how you say it: external, audience-specific, tested and rewritten often. If two salespeople describe the product differently, you have a messaging problem; if two founders disagree on who it is for, you have a positioning problem. Fix positioning first.

### The message house

| Part | Content | Ripple example |
|---|---|---|
| **Roof: core message** | One sentence a buyer could repeat | "Know which tests to rerun after every change, and why." |
| **Pillar 1** | Value theme 1 | Faster release gates without guessing |
| **Pillar 2** | Value theme 2 | Evidence that holds up in a safety review |
| **Pillar 3** | Value theme 3 | Runs inside your boundary (Enclave) |
| **Foundation: proof** | Facts behind each pillar | Demo on a reproducible dataset; documented rationale per test; on-prem architecture; team's drive-validation track record |

Three pillars, not seven: a buyer remembers three things. Each pillar needs proof the buyer can check, or it is a claim.

### The value ladder

Every feature can be climbed to an outcome by asking "so what?":`,
        },
        {
          kind: "flow",
          title: "Value ladder for Ripple (one chain)",
          steps: [
            { label: "Feature", detail: "Dependency model linking firmware commits, model versions, rig configuration and past signals to tests" },
            { label: "Capability", detail: "Given a change, outputs the affected tests with a rationale for each selected and skipped test" },
            { label: "User benefit", detail: "Test engineer runs about a third of the suite instead of all of it, and can justify the choice" },
            { label: "Business outcome", detail: "Release gate shortens from days to about a day; rig capacity released; fewer untested-change escapes" },
            { label: "Strategic outcome", detail: "Ship model and firmware updates at the pace physical AI requires, with an evidence trail for safety and conformity work" },
          ],
          caption: "Speak to each audience at its rung, and keep the rungs below ready as proof. Engineers distrust a pitch that starts at the top; executives ignore one that stays at the bottom.",
        },
        {
          kind: "md",
          md: md`### The buying committee in a hardware-test sale

| Role | Typical title | Rung they care about | What kills the deal |
|---|---|---|---|
| **Economic buyer** | VP engineering, head of validation, CTO | Business and strategic outcome: release dates, rig capex avoided, risk | No quantified outcome, unclear cost of doing nothing |
| **Technical evaluator** | Test systems lead | Capability: formats, DAQ, integration effort, accuracy of selection | Integration looks like a six-month project |
| **Users** | Test engineers, technicians | User benefit: less rerun drudgery, fewer 2 a.m. surprises | "Another tool that slows me down" |
| **Security / IT** | InfoSec, IT architecture | Data flows, deployment model, access control, update path | Anything leaving the network unexpectedly |
| **Champion** | Often the test systems lead | Personal win: credibility, career | You gave him nothing he can repeat internally |
| **Procurement / legal** | Purchasing | Terms, liability, vendor risk of a startup | No security pack, no reference, odd contract terms |

### Quantifying the business outcome

The rung that converts an economic buyer is usually money or time. For Ripple the money term is the rig time released:`,
        },
        { kind: "equation", formula: "fc03-value" },
        {
          kind: "md",
          md: md`and the price you can defend is a share of it:`,
        },
        { kind: "equation", formula: "fc03-value-capture" },
        {
          kind: "md",
          md: md`A new vendor typically needs $\alpha$ around 0.1 to 0.2: the buyer sees a 5x to 10x return on paper, which covers his perceived risk of betting on a startup. Two rules: use **the customer's** inputs (his release count, his rig-hour cost), and show the formula, so the engineer can attack the inputs instead of dismissing the output.

Dunford's *Sales Pitch* (2023) adds the narrative order for a first meeting: a market insight (what has changed), the alternatives and why they fall short now, what an ideal approach would look like, then your product, proof, and objections. The message house supplies the content; the narrative supplies the sequence.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Quantifying Ripple's value for two labs",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Value and defensible ACV for an illustrative humanoid actuator lab",
          given: md`Illustrative inputs (from a hypothetical discovery call, not a real customer): 12 rigs, 48 regression-triggering releases a year, full regression 300 rig-hours run on 5 rigs in parallel, cost EUR 110 per rig-hour. Hypothesis to be measured in a pilot: Ripple selects 35 % of the suite (105 rig-hours) with no loss of defect detection.`,
          steps: [
            { md: md`**Rig-hours released per release:** $H_{full} - H_{sel} = 300 - 105 = 195$ rig-h.` },
            { md: md`**Annual value:** $V = 48 \times 195 \times 110 = \text{EUR } 1{,}029{,}600$ per year (9,360 rig-hours, about 16 % of the 60,000 available rig-hours of a 12-rig lab at 5,000 h each).` },
            { md: md`**Calendar time** (often worth more than the money): gate duration $300/5 = 60$ h becomes $105/5 = 21$ h, so a 2.5-day gate becomes less than a day. Over the year: $48 \times 39 = 1{,}872$ hours (78 days) of release-gate waiting removed.` },
            { md: md`**Defensible ACV:** at $\alpha = 0.10$, $ACV = 0.10 \times 1{,}029{,}600 \approx \text{EUR } 103{,}000$. At $\alpha = 0.15$ it would be about EUR 154,000. Calendar-time and evidence value are left out of the price argument on purpose: they make the case robust rather than inflated.` },
            {
              md: md`**The ladder in the buyer's words:**

| Audience | Message |
|---|---|
| Test engineer | "After a firmware drop you run the 35 % of the suite the change can touch, and the tool tells you why it skipped the rest." |
| Test systems lead | "It reads your existing captures and rig configuration; nothing changes in your sequencer." |
| VP engineering | "Your release gate goes from two and a half days to under one, and you free about EUR 1 m a year of rig time, using your own numbers." |
| InfoSec | "It runs on your servers or an isolated tenant. No test data leaves your network." |`,
            },
          ],
          result: md`Value about EUR 1.03 m/yr in rig time alone; an ACV near EUR 100k is defensible at a 10x value multiple. Every number must be re-derived with the customer's inputs and the 35 % selection rate measured in a pilot before it is quoted.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A smaller lab: does the value support the sales motion?",
          given: md`Illustrative: 8 rigs, 24 releases a year, full regression 160 rig-hours, selection at 40 % (64 rig-hours), EUR 90 per rig-hour. You want $\alpha = 0.15$.`,
          steps: [
            { md: md`Rig-hours released per release: $160 - 64 = 96$ rig-h.` },
            { md: md`Annual value $V = 24 \times 96 \times 90 =$ **EUR 207,360**.`, hidden: true, check: { prompt: "Annual value V (EUR)", answer: 207360, unit: "EUR/yr", tolerance: { rel: 0.005 } } },
            { md: md`Defensible ACV $= 0.15 \times 207{,}360 =$ **EUR 31,104**.`, hidden: true, check: { prompt: "Defensible ACV (EUR)", answer: 31104, unit: "EUR/yr", tolerance: { rel: 0.005 } } },
            { md: md`Lesson 4 shows a field-sales motion with CAC about EUR 120k needs an ACV of at least EUR 100k for an 18-month payback. This lab cannot pay for the motion that would be needed to sell it.` },
          ],
          result: md`Value quantification is also a **qualification** tool: an account whose quantified value cannot support your motion's minimum ACV is either served by a cheaper motion (partner, self-serve module) or not served yet.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Writing, testing and using messaging",
      blocks: [
        {
          kind: "md",
          md: md`### Who, what, how

- **Owner:** the CEO writes the first message house; engineers review every capability claim; later a product marketer maintains it.
- **Documents that flow from it:** website hero and three sections (one per pillar), first-meeting deck (Sales Pitch order), one-pager per persona, outbound email templates, demo script, **security pack** (architecture diagram, data-flow description, deployment and update model, answers to a standard security questionnaire), objection-handling sheet.
- **Testing:** messaging is tested, not debated. In discovery, read the core message aloud and ask the prospect to say back what the product does; if he says "a data platform", the roof is wrong. In outbound, change one element at a time (subject line or opening pillar) and compare reply rates on at least 100 contacts per variant. Win/loss interviews tell you which pillar actually closed the deal.
- **Language:** use the buyer's words from call notes ("rerun", "release gate", "bench time"), not yours ("change-impact graph").`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Messaging errors in deep-tech B2B",
          md: md`- **Feature-speak to the economic buyer:** "dependency graph over MDF channels" means nothing to a VP who owns a release date.
- **Outcome-speak to the engineer without mechanism:** "cut test time 65 %" with no explanation reads as marketing and costs you the technical evaluator.
- **Compliance claims:** never say "Ripple makes you compliant with the Machinery Regulation". Conformity is the manufacturer's responsibility and is assessed on the machine. Say what is true: Ripple produces a documented rationale for test selection that can feed the technical file and safety reviews.
- **Unmeasured numbers:** quote the formula with the buyer's inputs until a pilot has measured the selection rate.
- **Seven pillars:** if everything is a pillar, nothing is remembered.`,
        },
        { kind: "xref", to: "m13-l03", note: "Presenting to senior officials: the bottom-line-first structure is the same one an economic buyer needs from you." },
        {
          kind: "ask",
          title: "Questions that test whether the message landed",
          items: [
            "In your own words, what would this do for your team?",
            "Who else would need to hear this, and what would they ask first?",
            "Which part of what I said would your VP care about? Which part would InfoSec worry about?",
            "What number would you need to see to put this in next year's budget?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc03-l03-p1",
            type: "short",
            prompt: md`**Produce a message house for the Afterwave platform (Lockstep + Enclave + Ripple)** aimed at a humanoid robotics company. Give: (1) the core message, (2) three pillars with two proof points each that could exist at seed stage, (3) a value-ladder table with one row per buying-committee role (test engineer, test systems lead, VP engineering, InfoSec), and (4) two 80 to 120 word cold emails, one to the test systems lead and one to the VP engineering, each ending with a specific ask. Use illustrative numbers only, and make no compliance or results claims you cannot prove.`,
            rubric: [
              "Core message is one sentence in buyer language, consistent with the positioning (change-impact and bench memory for physical AI test, not generic 'AI platform')",
              "Three distinct pillars, each with checkable proof available at seed stage (demo, architecture, team expertise, reproducible dataset), no fabricated customer results",
              "Value-ladder table addresses each role at its own rung (capability for the systems lead, outcome for the VP, data flows for InfoSec)",
              "Technical email leads with mechanism and integration; executive email leads with release-gate time or rig capacity in money, using a formula or the buyer's inputs",
              "No claim that the product makes the customer compliant with the Machinery Regulation; any regulatory reference is accurate (applies from 20 January 2027) and framed as evidence support",
              "Each email ends with a specific, low-friction ask (e.g. 30-minute walkthrough of their last firmware regression)",
            ],
            modelAnswer: md`**Core message:** "After every firmware, model or rig change, know which tests to rerun and why, from your own bench data, on your own servers."

**Pillars and proof.** (1) *Faster release gates without guessing*: demo of Ripple selecting tests on a reproducible dataset; the rationale view per test. (2) *Every test becomes evidence*: Lockstep capture of DAQ signals and operator actions on one clock; searchable bench memory demo. (3) *Your data never leaves*: Enclave deployment diagram (on customer servers or isolated tenant); founders' background in drive-unit validation at Tesla.

**Value ladder.**

| Role | Message |
|---|---|
| Test engineer | Run the tests the change can affect; see why the rest were skipped. |
| Test systems lead | Works from your existing DAQ captures and rig configuration; no change to your sequencer. |
| VP engineering | Shorter release gates and released rig capacity: 48 releases x 195 rig-hours x EUR 110 is about EUR 1 m a year at illustrative inputs; we compute it with yours. |
| InfoSec | Deployed inside your network; no outbound test data; standard questionnaire answered in the security pack. |

**Email to the test systems lead:** "Subject: your last actuator firmware regression. Hi [name], when a firmware build lands, most actuator labs either rerun the whole suite or a senior engineer picks a subset. We are ex-Tesla drive validation engineers building Ripple, which reads your existing rig captures and configuration and proposes which tests the change can actually touch, with a written reason for each skip. It runs on your servers. Could we spend 30 minutes walking through your last regression to see whether the selection would have held up?"

**Email to the VP engineering:** "Subject: release gate time on actuator firmware. Hi [name], physical AI teams are shipping firmware and model updates monthly on the same rig fleet, and full regressions turn into multi-day gates. Ripple, from Afterwave, selects the tests a change can affect and documents why, using your own bench data inside your network. At illustrative numbers (48 releases a year, 300 rig-hours each, about 65 % avoidable) that is roughly EUR 1 m of rig time and a gate under one day. Would a 20-minute call to run the numbers with your inputs be useful?"`,
            explanation: md`Graded against the rubric. The test of a good message house: hand it to someone who has never seen the product and ask them to write the homepage. If their homepage matches yours, the house works.`,
            concepts: ["fc03.message-house", "fc03.value-ladder", "fc03.buying-committee"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf why the same Ripple demo should be introduced differently to a test systems lead and to a VP of engineering, without changing a single fact.",
          keyPoints: [
            "Each member of the buying committee cares about a different rung of the value ladder",
            "The systems lead needs capability and integration effort; the VP needs release-gate time, cost and risk",
            "The facts are the same; only the entry rung and the proof order change",
            "The business outcome is quantified with the customer's own inputs so the engineer can check it",
            "InfoSec and procurement have veto power and need their own message (data flows, security pack)",
          ],
        },
        { kind: "sources", refs: ["fc03-r2", "fc03-r1", "fc03-r9"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc03-l03-q1",
      type: "mcq",
      prompt: "In a message house, what goes in the foundation?",
      options: ["The company mission", "Proof points that support each pillar", "The pricing table", "Competitor names"],
      answer: 1,
      explanation: md`Roof = core message; pillars = value themes; foundation = proof (demos, data, architecture, references, team expertise). Pillars without proof are claims.`,
      concepts: ["fc03.message-house"],
      difficulty: 1,
    },
    {
      id: "fc03-l03-q2",
      type: "order",
      prompt: "Order the rungs of the value ladder from bottom to top.",
      items: ["Feature", "Capability", "User benefit", "Business outcome", "Strategic outcome"],
      explanation: md`Ask "so what?" at each rung. Feature (what it is) to capability (what it does) to user benefit (what the user gains) to business outcome (money, time, risk) to strategic outcome (what it lets the company become).`,
      concepts: ["fc03.value-ladder"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc03-l03-q3",
      type: "numeric",
      prompt: md`A lab has 36 regression-triggering releases a year, full regression 200 rig-hours, selected subset 70 rig-hours, EUR 100 per rig-hour. What is the annual rig-time value $V$? (EUR)`,
      answer: 468000,
      tolerance: { rel: 0.005 },
      unit: "EUR/yr",
      explanation: md`$V = 36 \times (200-70) \times 100 = 36 \times 130 \times 100 = \text{EUR } 468{,}000$.`,
      concepts: ["fc03.value-quantification"],
      difficulty: 1,
    },
    {
      id: "fc03-l03-q4",
      type: "mcq",
      prompt: "Which message is best aimed at the economic buyer?",
      options: [
        "\"Our dependency graph indexes MDF channels at 10 kHz.\"",
        "\"Your release gate goes from 2.5 days to under one, and about EUR 1 m of rig time is released a year, using your inputs.\"",
        "\"We use cutting-edge AI.\"",
        "\"Our UI has dark mode.\"",
      ],
      answer: 1,
      explanation: md`The economic buyer acts on business outcomes (time, money, risk) expressed with his own inputs. The first option is for the technical evaluator; the others say nothing.`,
      concepts: ["fc03.buying-committee", "fc03.value-ladder"],
      difficulty: 1,
    },
    {
      id: "fc03-l03-q5",
      type: "decision",
      prompt: md`A prospect's VP asks: "So if we buy Ripple, are we covered for the EU Machinery Regulation?" What do you answer?`,
      options: [
        { text: "\"Yes, Ripple makes you compliant.\"", score: 0, feedback: "False and dangerous: conformity is assessed on the machine and is the manufacturer's responsibility. This sentence can end up in a contract dispute." },
        { text: "\"No. Conformity is your responsibility and is assessed on the machine. What Ripple gives you is a documented rationale for which tests were run after each change, which your safety and conformity work can use as evidence.\"", score: 1, feedback: "Accurate, and still positions the real value (evidence) in the regulatory context." },
        { text: "\"Regulation isn't really our area.\"", score: 0.3, feedback: "Honest but throws away a real value theme. The evidence trail is relevant." },
      ],
      explanation: md`Regulatory context is a strong trend for the message, but only true claims survive procurement and legal review.`,
      concepts: ["fc03.message-house", "fc03.buying-committee"],
      difficulty: 2,
    },
    {
      id: "fc03-l03-q6",
      type: "multi",
      prompt: "Which are good ways to test messaging at seed stage? (Select all that apply.)",
      options: [
        "Ask prospects to repeat back in their own words what the product does",
        "Vote on the tagline in the founders' chat",
        "Compare reply rates of two outbound variants differing in one element, on at least 100 contacts each",
        "Ask won and lost prospects which point mattered most",
      ],
      answer: [0, 2, 3],
      explanation: md`Messaging is tested with buyers, not decided by founder preference.`,
      concepts: ["fc03.message-house"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc03-l03-f1", front: "Positioning vs messaging", back: "Positioning = strategy (internal, stable). Messaging = how you say it to each audience (external, tested, changes often).", concepts: ["fc03.message-house"] },
    { id: "fc03-l03-f2", front: "Message house structure", back: "Roof: core message. Three pillars: value themes. Foundation: proof points.", concepts: ["fc03.message-house"] },
    { id: "fc03-l03-f3", front: "Value ladder rungs", back: "Feature, capability, user benefit, business outcome, strategic outcome.", concepts: ["fc03.value-ladder"] },
    { id: "fc03-l03-f4", front: "Ripple value formula", back: md`$V = N_r (H_{full} - H_{sel}) c_h$`, concepts: ["fc03.value-quantification"] },
    { id: "fc03-l03-f5", front: "Value capture share for a new vendor", back: md`$\alpha \approx 0.1$ to $0.2$ of quantified value: a 5x to 10x paper return to cover startup risk.`, concepts: ["fc03.value-quantification"] },
    { id: "fc03-l03-f6", front: "Six roles in an enterprise buying committee", back: "Economic buyer, technical evaluator, users, security/IT, procurement/legal, champion.", concepts: ["fc03.buying-committee"] },
    { id: "fc03-l03-f7", front: "Never say about Ripple and the Machinery Regulation", back: "\"It makes you compliant.\" Say: it provides a documented rationale for test selection that supports safety and conformity evidence.", concepts: ["fc03.buying-committee"] },
  ],
};

export default lesson;
