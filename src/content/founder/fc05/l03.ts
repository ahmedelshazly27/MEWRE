import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc05-l03",
  title: "Developer and engineer marketing, open source and community",
  summary:
    "Engineers buy by trying: documentation as the main marketing surface, time to first value as the key metric, open source as a distribution channel (what to open, which licence, how open core works), and communities of practice that build trust no campaign can buy, for Afterwave's test engineers and for Suhail's builders.",
  minutes: 65,
  objectives: [
    "You can explain why documentation and a working quickstart outperform campaigns with engineer buyers",
    "You can compute an activation funnel and the effect of shortening time to first value",
    "You can decide what to open-source and choose between permissive, copyleft and source-available licences",
    "You can design a community of practice with a domain, a community and a shared practice, and measure its health",
  ],
  concepts: [
    { id: "fc05.docs-as-marketing", name: "Documentation as marketing", description: "For engineer buyers the docs are the product page: they show what the product does, how it works and how good the team is. Structured by Diátaxis into tutorials, how-to guides, reference and explanation.", competency: "fc-marketing", related: ["fc05.engineer-trust"] },
    { id: "fc05.time-to-first-value", name: "Time to first value (TTFV)", description: "Elapsed time from first contact (install, sign-up) to the first moment the user gets a real result. The main driver of activation rate in developer and engineer adoption.", competency: "fc-marketing", related: ["fc05.docs-as-marketing"] },
    { id: "fc05.open-source-distribution", name: "Open source as distribution", description: "Releasing a useful, non-differentiating component under an open licence so engineers adopt it freely and meet the company; open core keeps the differentiating engine or enterprise features proprietary.", competency: "fc-marketing" },
    { id: "fc05.community-of-practice", name: "Community of practice", description: "A group with a shared domain of interest, relationships of mutual help and a shared practice (methods, tools, stories). Members' value comes from each other, not from the host company.", competency: "fc-marketing" },
    { id: "fc05.engineer-trust", name: "Engineer trust signals", description: "What engineers check before trusting a vendor: honest docs with limits, responsive issue handling, real code and examples, founders who answer technical questions themselves, no marketing language in technical places.", competency: "fc-marketing", related: ["fc05.proof-ladder"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "How engineers discover, evaluate and adopt",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A test engineer who finds a Lockstep data reader on a package index, gets a synchronised rig and screen capture plotted in ten minutes, and tells their lead about it, is worth more than a hundred email opens. Suhail's whole proposition is a community of builders, so community design is its product, not its marketing. And with Mizan, the plant data engineers at an operator or at KISR will judge the method by its documentation before any manager signs anything.`,
        },
        {
          kind: "md",
          md: md`### The engineer's path is try first, talk later

Engineers distrust claims and trust their own tests. Their path to a vendor conversation runs through things they can inspect: docs, code, examples, a free tier or open component, and other engineers' opinions. The marketing surface is therefore the **documentation and the first hour of use**.

The activation funnel makes this measurable:`,
        },
        { kind: "equation", formula: "fc05-activation-rate" },
        {
          kind: "flow",
          title: "Engineer adoption funnel for an open component",
          steps: [
            { label: "Discover", detail: "Search, a colleague, a talk, a GitHub link in a post." },
            { label: "Read docs", detail: "Does it solve my problem, does it look maintained, are limits stated?" },
            { label: "Start quickstart", detail: "Install, load the sample capture." },
            { label: "First value", detail: "A synchronised plot of rig signals and screen events on one clock, on their own data." },
            { label: "Team use", detail: "Shared with colleagues, used in a real test campaign." },
            { label: "Sales conversation", detail: "\"We need this on our servers with change impact\": Enclave and Ripple." },
          ],
          caption: "Each arrow loses people. Time to first value controls the 'start' to 'first value' arrow, which is usually the steepest.",
        },
        {
          kind: "md",
          md: md`### Docs as marketing: the Diátaxis structure

Good technical documentation separates four kinds of writing that serve different needs (Diátaxis):

| Kind | Reader's need | Afterwave example |
|---|---|---|
| **Tutorial** | "Teach me, I am new" | Your first synchronised capture in ten minutes, with sample data |
| **How-to guide** | "Help me do this specific task" | Import an NI TDMS or ASAM MDF file and align it with a screen recording |
| **Reference** | "Tell me exactly what this does" | API and file format specification, timestamp semantics, clock drift handling |
| **Explanation** | "Help me understand why" | Why one clock matters for physical AI training data |

Mixing them (a tutorial that stops to explain theory, a reference that tries to teach) is the most common reason docs feel bad. The explanation pages double as top-of-funnel content.

### Open source as distribution

Open-sourcing a component gives you distribution engineers trust, because they can read the code and use it without asking permission. It works when the component is **useful on its own, cheap to maintain and not where your defensibility lies**.`,
        },
        {
          kind: "matrix",
          title: "What to open-source",
          xAxis: ["Not differentiating", "Differentiating"],
          yAxis: ["Low adoption value", "High adoption value"],
          cells: [
            { label: "Open it", detail: "File readers, SDK, rig adapters, data format converters. Useful alone, spreads your name, attracts contributors. Afterwave: a Lockstep capture reader." },
            { label: "Open the interface, keep the engine", detail: "Open core: publish the format or API, keep the core proprietary. Afterwave: open change-impact definition format, proprietary Ripple engine." },
            { label: "Use existing open source", detail: "Generic plumbing (plotting, storage) where you add nothing. Contribute upstream, do not fork." },
            { label: "Keep proprietary", detail: "The parts customers pay for: Enclave deployment and security, Ripple models, bench memory analytics." },
          ],
          caption: "Opening something in the top-right without a clear line between open and paid is how companies end up competing with their own free version.",
        },
        {
          kind: "md",
          md: md`### Licences in one table

| Family | Examples | What it means for you |
|---|---|---|
| **Permissive** | MIT, Apache-2.0, BSD | Anyone can use, modify and embed, including in closed products. Maximum adoption. Apache-2.0 adds an explicit patent grant, which enterprise legal teams like. |
| **Weak copyleft** | MPL-2.0, LGPL | Changes to your files must be shared; the rest of their product can stay closed. |
| **Strong copyleft** | GPL-3.0, AGPL-3.0 | Derivative works must be released under the same licence; AGPL extends this to software offered over a network. Many enterprises restrict its use internally. |
| **Source-available** | BSL, SSPL, Elastic License | Code visible, but use restricted (often no competing hosted service). Not open source under the OSI definition; some engineers react badly to the label being blurred. |

For an adoption component, choose a **permissive licence, usually Apache-2.0**. Never call a source-available licence "open source".

### Communities of practice

A **community of practice** has three elements: a shared **domain** (for example: testing robots that learn), a **community** of people who help each other, and a shared **practice** (methods, tools, war stories). The test of a healthy community is that members get value from **each other**, so the host is not the only one answering. Participation is very unequal: the classic 90-9-1 heuristic says most members only read, a few contribute occasionally and a tiny share create most of the content. Design for it: make reading valuable, make the first contribution easy, and recognise the few who carry it.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "The activation funnel for an Afterwave open component",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "From docs visitors to sales conversations",
          given: md`Illustrative. Afterwave publishes an open-source capture reader (Apache-2.0) with a tutorial. Per month: 2,000 docs visitors; 15% start the quickstart; 40% of starters reach first value (plot on their own data) with a median time to first value of 45 minutes; 25% of successful users work at target companies; 20% of those reach a conversation with the founders within three months.`,
          steps: [
            { md: md`**Starters:** $2{,}000 \times 0.15 = 300$ per month.` },
            { md: md`**First value:** $300 \times 0.40 = 120$, so activation rate $a = 120/300 = 40\%$.` },
            { md: md`**At target companies:** $120 \times 0.25 = 30$.` },
            { md: md`**Conversations:** $30 \times 0.20 = 6$ per month, about 72 a year, each with an engineer who has already used your code.` },
            { md: md`**Where to work:** the 40% activation stage. A 45-minute first run usually means a dependency install, a hardware requirement or missing sample data. Fixing it is cheaper than doubling traffic.` },
          ],
          result: md`Six warm conversations a month from one open component and good docs. The cheapest lever is time to first value.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Cutting time to first value from 45 to 10 minutes",
          given: md`Illustrative. The team ships a sample capture in the package, a one-line install and a hosted notebook. Activation rises from 40% to 60%. Everything else in the funnel above is unchanged.`,
          steps: [
            { md: md`Starters stay at 300 per month.` },
            { md: md`First value $= 300 \times 0.60$.` },
            { md: md`= **180** users per month.`, hidden: true, check: { prompt: "Users reaching first value per month", answer: 180, tolerance: { abs: 0.5 } } },
            { md: md`At target companies: $180 \times 0.25 = 45$; conversations $= 45 \times 0.20$.` },
            { md: md`= **9** conversations per month, up from 6: +50% with no extra traffic.`, hidden: true, check: { prompt: "Conversations per month", answer: 9, tolerance: { abs: 0.1 } } },
          ],
          result: md`Because the funnel is multiplicative, a 50% improvement in one stage is a 50% improvement in output. A week of engineering on the quickstart can be worth more than a quarter of promotion.`,
        },
        {
          kind: "md",
          md: md`### Suhail: a community of practice, not an audience

For Suhail the community is the product. Illustrative design for an Arab builders community:

| Element | Design choice |
|---|---|
| **Domain** | Building AI products and research in and for the Arab world (Arabic models, datasets, deployment in the region) |
| **Community** | Builders, researchers and engineers; investors and employers present but not dominant |
| **Practice** | Monthly build nights, hackathons, a newsletter that features members' work, a shared list of Arabic datasets and benchmarks |
| **Health metrics** | Share of questions answered by members (not volunteers), returning attendees, member-led sessions, projects started at events that continue afterwards |

The trap is turning it into a marketing list for sponsors. Sponsors pay for access to a community that is valuable without them; if members feel sold to, the asset that sponsors pay for disappears.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running developer marketing and community with a tiny team",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it

At seed stage, developer relations is the founders plus one engineer partner a few hours a week. Founders answering GitHub issues and community questions themselves is a strong trust signal; a dedicated developer advocate comes later, ideally someone already active in the community.

### Tools

- **Code and issues:** GitHub (README, LICENSE, CONTRIBUTING, issue templates, a public roadmap or changelog).
- **Docs:** a docs-as-code site built from the repository so docs ship with code.
- **Community:** Discord or Slack for chat, GitHub Discussions for durable Q&A that search engines can index, Luma for events.
- **Measurement:** package downloads (noisy, inflated by CI), activation from an opt-in "it worked" step, issues opened and closed, time to first response, contributors.

### Engineer trust signals to get right from day one

1. A README that states what it does, what it does not do and a 10-minute path to first value.
2. Issues answered within two working days, even if the answer is "not planned".
3. Honest limits in the docs (supported DAQ formats, clock drift assumptions, known bugs).
4. No marketing language in docs or READMEs.
5. A clear statement of what is open and what is paid, so nobody feels baited.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Open-sourcing to look good, then abandoning it.** A repository with stale issues is negative marketing. Only open what you will maintain.
- **Wrong licence for the goal.** AGPL on an adoption component blocks the enterprises you want; a later licence change from open source to source-available angers the community you built.
- **Vanity metrics.** GitHub stars can be bought or come from a single viral post. Track activation and conversations, not stars.
- **Hardware in the quickstart.** If first value needs a DAQ card, most evaluators stop. Ship sample data.
- **Community as broadcast channel.** Posting only announcements turns a community into a mailing list that people mute.`,
        },
        { kind: "sources", refs: ["fc05-r11", "fc05-r12", "fc05-r13", "fc05-r14", "fc05-r15"] },
        {
          kind: "checklist",
          title: "Launch checklist for an open component",
          items: [
            "Component is useful alone and not where defensibility lies",
            "Licence chosen deliberately (Apache-2.0 by default for adoption) and a clear open vs paid line written down",
            "Tutorial reaches first value in 10 minutes with bundled sample data",
            "Docs organised as tutorial, how-to, reference, explanation",
            "Owner named for issues, with a two-working-day response target",
            "Activation measured, not just downloads or stars",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask five engineers who tried the component",
          items: [
            "Where did you get stuck, and for how long?",
            "What did you expect it to do that it did not?",
            "Who else on your team would care about this?",
            "What would you need before running this on real test data at work?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc05-l03-p1",
            type: "short",
            prompt: md`Produce an open-source and documentation plan for **Afterwave**: (1) which component you open, why, and under which licence; (2) the line between open and paid in one paragraph; (3) a Diátaxis docs outline with at least two pages per kind; (4) a time-to-first-value target and how you will measure activation; (5) a 90-day community plan for test engineers with two health metrics. Do not invent users or traction.`,
            rubric: [
              "Opened component is useful alone and non-differentiating (reader, SDK, adapters), with a reasoned licence choice (Apache-2.0 or similar permissive) and no confusion with source-available",
              "Open vs paid line keeps Enclave, Ripple engine and enterprise features proprietary and is stated plainly",
              "Docs outline correctly separates tutorial, how-to, reference and explanation with concrete page titles",
              "TTFV target in minutes, bundled sample data, and an activation measurement method (opt-in step or telemetry with consent)",
              "Community plan has a domain, a practice and members helping members, with health metrics beyond member count",
              "No invented users, numbers or partners",
            ],
            modelAnswer: md`**1. Component:** an open-source Python reader and plotting toolkit for Lockstep captures (rig signals plus screen events on one clock), with importers for common DAQ formats. It is useful alone, it spreads the capture format, and it is not where defensibility lies. Licence: Apache-2.0 for adoption and its explicit patent grant.

**2. Open vs paid:** the capture format, reader and importers are open and free forever. Running captures, models and agents inside a customer's environment (Enclave), change-impact analysis (Ripple) and enterprise features (access control, audit, support) are paid. We will not move features from open to paid.

**3. Docs (Diátaxis):** Tutorials: "Your first synchronised capture in 10 minutes"; "Plot a motor test with screen events". How-to: "Import a TDMS file"; "Align a screen recording with a CAN log"; "Export to Parquet". Reference: capture file format spec; Python API; timestamp and clock-drift semantics. Explanation: "Why one clock matters for physical AI data"; "How Lockstep handles clock drift and latency".

**4. TTFV:** target under 10 minutes from install to plot, using bundled sample data and a hosted notebook. Activation measured by an opt-in "it worked" step at the end of the tutorial plus anonymous, opt-in usage pings, disclosed in the README.

**5. 90-day community:** domain: testing machines that learn. Practice: a monthly online test-engineering session where a member presents a rig problem, GitHub Discussions for Q&A, a shared library of test patterns. Health metrics: share of questions answered by non-Afterwave members; number of returning session attendees; first-time contributors.`,
            explanation: md`A strong answer opens something genuinely useful, draws the open versus paid line clearly enough that nobody feels baited, and measures activation rather than stars.`,
            concepts: ["fc05.open-source-distribution", "fc05.docs-as-marketing", "fc05.time-to-first-value", "fc05.community-of-practice"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to an investor why Afterwave would give away a capture reader for free, and why that does not undermine the business.",
          keyPoints: [
            "Engineers adopt what they can try without permission; open code is trusted distribution",
            "The open component is useful alone but not where defensibility lies",
            "Paid value is in Enclave, Ripple and enterprise features, with a clear and stable line",
            "Activation and warm conversations are measurable outcomes",
            "Permissive licence maximises adoption in enterprises",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc05-l03-q1",
      type: "mcq",
      prompt: "Which licence family maximises adoption of an SDK by enterprise engineering teams?",
      options: ["Strong copyleft (AGPL-3.0)", "Permissive (Apache-2.0 or MIT)", "Source-available (BSL)", "No licence, just public code"],
      answer: 1,
      explanation: md`Permissive licences let teams embed the code without legal friction; Apache-2.0 adds a patent grant. Code with no licence is legally "all rights reserved" and many companies cannot use it.`,
      concepts: ["fc05.open-source-distribution"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc05-l03-q2",
      type: "numeric",
      prompt: md`500 engineers start a quickstart in a month and 175 reach first value. What is the activation rate? (%)`,
      answer: 35,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$a = 175/500 = 0.35 = 35\%$.`,
      concepts: ["fc05.time-to-first-value"],
      difficulty: 1,
    },
    {
      id: "fc05-l03-q3",
      type: "order",
      prompt: "Match the reader's need to the Diátaxis kind, in this order of needs: 'teach me, I am new'; 'help me do this task'; 'tell me exactly what this does'; 'help me understand why'.",
      items: ["Tutorial", "How-to guide", "Reference", "Explanation"],
      explanation: md`Learning, doing a task, looking up facts and understanding are different needs; mixing them is the most common docs failure.`,
      concepts: ["fc05.docs-as-marketing"],
      difficulty: 1,
    },
    {
      id: "fc05-l03-q4",
      type: "multi",
      prompt: "Which are signs of a healthy community of practice? (Select all that apply.)",
      options: [
        "Members answer each other's questions",
        "Total member count keeps rising",
        "People return to sessions and present their own work",
        "Projects started at events continue afterwards",
        "The host posts announcements daily",
      ],
      answer: [0, 2, 3],
      explanation: md`Member count can grow while the community dies. Value from member to member, returning participation and continuing projects show a real practice.`,
      concepts: ["fc05.community-of-practice"],
      difficulty: 2,
    },
    {
      id: "fc05-l03-q5",
      type: "decision",
      prompt: md`Your engineer partner wants to open-source Ripple's change-impact engine to "get stars fast". What do you decide?`,
      options: [
        { text: "Do it; stars attract investors.", score: 0, feedback: "Stars are a vanity metric and the engine is where defensibility lies. You would fund a competitor's roadmap." },
        { text: "Open the change-impact definition format and a reader, keep the engine proprietary, and measure activation instead of stars.", score: 1, feedback: "Open core done right: the interface spreads, the engine stays paid." },
        { text: "Open nothing; open source is a distraction.", score: 0.3, feedback: "Safe but forgoes a strong distribution channel to engineers." },
      ],
      explanation: md`Use the open-source matrix: high adoption value and differentiating means open the interface, keep the engine.`,
      concepts: ["fc05.open-source-distribution"],
      difficulty: 2,
    },
    {
      id: "fc05-l03-q6",
      type: "mcq",
      prompt: "Which change most likely raises activation for a hardware data tool?",
      options: [
        "A bigger launch post",
        "Bundling sample capture data so first value needs no DAQ hardware",
        "Adding a sign-up form before download",
        "A new logo",
      ],
      answer: 1,
      explanation: md`Removing the hardware dependency from the first run shortens time to first value, the steepest stage of the funnel.`,
      concepts: ["fc05.time-to-first-value"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc05-l03-f1", front: "Activation rate", back: md`$a = N_{\text{success}}/N_{\text{start}}$; main driver is time to first value.`, concepts: ["fc05.time-to-first-value"] },
    { id: "fc05-l03-f2", front: "Diátaxis: four kinds of docs", back: "Tutorial, how-to guide, reference, explanation.", concepts: ["fc05.docs-as-marketing"] },
    { id: "fc05-l03-f3", front: "What to open-source", back: "Useful alone, cheap to maintain, not where defensibility lies (readers, SDKs, adapters).", concepts: ["fc05.open-source-distribution"] },
    { id: "fc05-l03-f4", front: "Default licence for an adoption component", back: "Apache-2.0: permissive with an explicit patent grant.", concepts: ["fc05.open-source-distribution"] },
    { id: "fc05-l03-f5", front: "Is BSL or SSPL open source?", back: "No: source-available. Not OSI-approved; do not call it open source.", concepts: ["fc05.open-source-distribution"] },
    { id: "fc05-l03-f6", front: "Three elements of a community of practice", back: "Domain, community, practice.", concepts: ["fc05.community-of-practice"] },
    { id: "fc05-l03-f7", front: "90-9-1 heuristic", back: "Most members read, a few contribute sometimes, a tiny share create most content. Design for readers and recognise the creators.", concepts: ["fc05.community-of-practice"] },
  ],
};

export default lesson;
