import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw12-l01",
  title: "Who buys: the map of a hardware test organisation",
  summary:
    "Who works in a hardware test and validation organisation, what each role is measured on, who owns which budget line, and the real path by which test tooling gets bought, so you can find the champion, the economic buyer and every veto holder before the first demo.",
  minutes: 70,
  objectives: [
    "You can draw the test and validation organisation of a humanoid startup and of an automotive tier-1 and say what each role is measured on.",
    "You can identify the four budget lines test tooling is paid from and pick the one an Afterwave deal should ride on.",
    "You can estimate how veto holders erode the probability of a yes and decide whom to pre-wire.",
    "You can describe the purchase path for test software (direct, via a hardware bundle, via a framework or preferred-supplier list) and its consequences.",
  ],
  concepts: [
    { id: "aw12.test-org-map", name: "Test organisation map", description: "The roles in a hardware test and validation organisation (test engineers and technicians, test systems engineers, validation leads, lab managers, head of validation, VP engineering, programme managers, quality and functional safety, IT and OT security, procurement, legal), what each is measured on and what each can approve or block.", competency: "aw-business", related: ["fc04.buying-committee", "fc03.buying-committee"] },
    { id: "aw12.budget-lines", name: "Test tooling budget lines", description: "The four places test tooling money comes from: lab capex, engineering tools opex, programme budget, and innovation or digitalisation budget. Each has a different owner, approval threshold, calendar and appetite for software.", competency: "aw-business", related: ["aw12.test-org-map"] },
    { id: "aw12.buying-consensus", name: "Veto holders and consensus probability", description: "Every person who can stop a purchase multiplies down the chance of a yes; counting veto holders early and raising each one's approval probability (pre-wiring) is the main lever on enterprise win rate.", competency: "aw-business", related: ["aw12.test-org-map", "fc04.champion-test"] },
    { id: "aw12.test-systems-champion", name: "Test systems engineer as entry point", description: "The engineer who owns the rig software, DAQ configuration and sequencer feels data and retest pain daily, understands Lockstep and Ripple fastest, and is the natural champion, but rarely owns a budget.", competency: "aw-business", related: ["aw12.test-org-map"] },
    { id: "aw12.tooling-purchase-path", name: "How test tooling gets bought", description: "Test software reaches labs through a direct software purchase, bundled with rig or DAQ capex, through an incumbent's distributor or framework agreement, or as a services line; the path decides who negotiates, the paperwork and how fast it closes.", competency: "aw-business", related: ["aw12.budget-lines", "fc04.paper-process"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Roles, incentives and money in a test organisation",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's first users (test engineers) are not its buyers, and its buyers (heads of validation, VP engineering) rarely see a rig log. IT and OT security can stop a deal that every engineer loves, because Lockstep runs on bench PCs and Enclave runs on their servers. If you cannot name, for each target account, who feels the pain, who pays, from which budget line, and who can say no, you will run long pilots that end with "great, but there is no budget".`,
        },
        {
          kind: "xref",
          to: "fc04-l01",
          note: "Founder Core: the generic buying committee (economic buyer, champion, evaluators, users, procurement, legal, security, blocker) and buyer-defined stages. This lesson maps those roles onto a hardware test organisation.",
        },
        {
          kind: "md",
          md: md`### The people and what they are measured on

A hardware test organisation is built around **rigs** (dynos, HIL benches, environmental chambers, life-test fixtures, whole-system test cells) and the **release gates** they serve. Each role has a different metric, and your message must hit that metric.

| Role | Day job | Measured on | Afterwave pain they feel | Can approve | Can block |
|---|---|---|---|---|---|
| **Test engineer / technician** | Runs test sequences, watches rigs, writes up results | Tests completed, reports on time | Reruns caused by missing or misaligned data; reconstructing what the operator did | Nothing | Adoption (if it adds clicks) |
| **Test systems engineer** (test infrastructure) | Owns rig software, DAQ configuration, sequencer, data storage | Rig uptime, data quality, automation | Data scattered across DAQ files, HMI logs and spreadsheets; no shared clock | Small tools, sometimes | Technical fit |
| **Validation lead / manager** | Plans what to test for each release, signs the test report | Coverage, gate on time, escaped defects | "What do we retest after this firmware change?" every week | Rarely | Method (if they doubt selection) |
| **Lab manager** | Rig scheduling, maintenance, calibration, capex planning | Utilisation, queue length, cost per test hour | Rigs booked by full regressions; queue delays | Lab capex and consumables up to a limit | Install on lab assets |
| **Head of validation / V&V director** | Owns the validation strategy and team | Release quality, programme milestones, headcount | Team size grows with releases; evidence for audits | Department budget | Strategy |
| **VP engineering / CTO** | Owns the engineering budget and the roadmap | Ship dates, field quality, cost | Late releases, field issues, test cost | Larger spend | Everything |
| **Programme manager / chief engineer** | Owns one product programme to start of production | Milestones, programme budget | Gate delays on the critical path | Programme budget | Anything that risks the milestone |
| **Quality / functional safety manager** | Safety case, audits, standards compliance | Audit findings, certification | Traceable evidence of what was retested and why | Rarely | Tools that touch safety evidence |
| **IT / OT security** | Networks, endpoints, servers, vendor risk | Incidents, audit compliance | None: you add risk | Nothing | Installation, network access |
| **Procurement / purchasing** | Supplier selection, contracts, price | Savings, supplier risk, compliance | None | The purchase order | New supplier onboarding |
| **Legal** | Contract terms, IP, data | Risk | None | Signature | Terms |

Three facts follow. First, the people with the pain and the people with the money are different, so the business case (lesson 2) is the bridge. Second, half the table can block and approve nothing, so they need a reason not to block, not a reason to buy. Third, the **test systems engineer** is the natural entry point: they own exactly what Lockstep touches, understand synchronised capture without explanation, and want automation, but they seldom own a budget.

### Where the money comes from

Test tooling is paid from one of four budget lines. Find out which one before you write a proposal: it decides who signs, how much they can sign and when.

| Budget line | Owner | Typical content | Software appetite | Calendar |
|---|---|---|---|---|
| **Lab capex** | Lab manager, head of validation | Rigs, DAQ hardware, chambers, fixtures | Low for subscriptions; high when software is bundled with hardware | Annual capex plan, approved months ahead |
| **Engineering tools opex** | Engineering IT or a tools team, VP engineering | Licences: CAD, simulation, LabVIEW, CANoe, test management | Native home for subscriptions | Annual budget; renewals |
| **Programme budget** | Programme manager | Anything the programme needs to hit its milestones | High if it protects a gate; vanishes after the milestone | Tied to programme phases |
| **Innovation / digitalisation** | CTO office, digital transformation lead | Pilots, proofs of concept | High for pilots, small amounts | Often flexible |

The common trap: a pilot funded from an innovation budget succeeds, and the annual contract has no home because nobody put it in engineering tools opex. Ask in discovery: "If this works, which budget line pays for it next year, and when is that budget set?"

### How test tooling gets bought

1. **Direct software purchase** on the engineering tools line: the cleanest path for a subscription; procurement onboards you as a new supplier.
2. **Bundled with rig or DAQ capex:** the lab buys a test system from an integrator or instrument vendor and the software rides inside the capex line. Fast for the buyer, but you are a line in someone else's quote.
3. **Through an existing framework or distributor:** many labs buy incumbent test software through framework agreements or distributors already on their preferred-supplier list. A new vendor may be told to come through one.
4. **As a service:** an engineering-services purchase order (for example "data infrastructure setup"), sometimes the only fast route for a first pilot.

Founders usually want path 1. Accept path 4 for a pilot if it is the fast route, but write the annual subscription into the conversion clause so the second purchase goes through path 1.`,
        },
        {
          kind: "matrix",
          title: "Influence on the decision vs control of budget",
          xAxis: ["Low budget control", "High budget control"],
          yAxis: ["Low day-to-day pain", "High day-to-day pain"],
          cells: [
            { label: "Champions and users", detail: "Test systems engineer, validation lead, test engineers. Start here; build the business case with them." },
            { label: "Economic buyers with pain", detail: "Head of validation, sometimes lab manager. The person you need in the decision meeting." },
            { label: "Veto holders", detail: "IT and OT security, procurement, legal, quality. Give them what they need early so they do not block." },
            { label: "Distant economic buyers", detail: "VP engineering, programme manager. Reach them with numbers through the champion, not with demos." },
          ],
          caption: "Top row: people who feel the pain. Right column: people who control money. Bottom-left: people who can only say no.",
        },
        {
          kind: "md",
          md: md`### Why every veto holder matters

If each person who can stop the deal approves independently with probability $p_i$, the chance that all of them approve is the product:`,
        },
        { kind: "equation", formula: "aw12-consensus" },
        {
          kind: "md",
          md: md`Four veto holders at 0.85 give 52 %; six give 38 %. Raising each to 0.95 by meeting them before the decision (pre-wiring) takes six veto holders to 74 %. The formula exaggerates because approvals are correlated, but the mechanism is real: the number of people who can say no grows with company size, and each one you meet late is a coin you did not get to load.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Mapping two illustrative accounts",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "A humanoid startup and an automotive tier-1, side by side",
          given: md`Two **illustrative archetypes**, not real prospects. (A) A Series B humanoid company of about 300 people with one robot programme, an actuator test lab and a few whole-robot test cells. (B) The e-drive validation department of an automotive tier-1 supplier. You have a strong test systems engineer as champion in both. Estimate each veto holder's approval probability before pre-wiring at 0.85.`,
          steps: [
            {
              md: md`**Account A veto holders:** head of test (also economic buyer), VP hardware engineering, IT/security (one person), finance. Procurement and legal are the same small team as finance. $k = 4$.

$P_{all} = 0.85^4 = 0.522$, about **52 %**.`,
            },
            {
              md: md`**Account B veto holders:** validation manager, lab manager, head of e-drive validation (economic buyer), cost-centre controller, IT/OT security (the supplier-security process), purchasing (new supplier onboarding), legal. $k = 7$.

$P_{all} = 0.85^7 = 0.321$, about **32 %**.`,
            },
            {
              md: md`**Budget line:** in A, the head of test can fund a pilot from the engineering budget and the annual contract from the same line if the VP agrees. In B, the pilot may come from a digitalisation budget, but the annual contract must enter the engineering tools plan, which is typically set months ahead of the calendar year it covers. Ask when.`,
            },
            {
              md: md`**Purchase path:** A buys direct. B may ask whether you are on the preferred-supplier list; if not, onboarding is a separate track with its own paperwork (lesson 4).`,
            },
          ],
          result: md`With the same champion quality, the tier-1 deal starts at roughly 32 % against 52 % for the startup, mainly because of three extra veto holders. That is the arithmetic behind longer cycles at large companies, and the reason to meet security and purchasing in month one, not month six.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: pre-wire the three hardest veto holders",
          given: md`Account B again. You meet the head of e-drive validation, IT/OT security and purchasing early and raise each of them to 0.95. The other four stay at 0.85.`,
          steps: [
            { md: md`$P_{all} = 0.95^3 \times 0.85^4$.` },
            { md: md`$= 0.857 \times 0.522 = 0.448$, about **45 %**.`, hidden: true, check: { prompt: "P(all approve) after pre-wiring three veto holders (%)", answer: 44.8, unit: "%", tolerance: { abs: 0.3 } } },
            { md: md`Now the champion is weak and the validation manager is only at 0.60 (doubts the selection method). Starting again from 0.85 for everyone else, with $k = 7$: $0.85^6 \times 0.60$.` },
            { md: md`$= 0.377 \times 0.60 = 0.226$, about **23 %**.`, hidden: true, check: { prompt: "P(all approve) with one sceptical validation manager (%)", answer: 22.6, unit: "%", tolerance: { abs: 0.3 } } },
          ],
          result: md`Pre-wiring three people lifts the tier-1 deal from 32 % to 45 %. One sceptical evaluator drags it to 23 %. Find the sceptic early: for Ripple it is usually the validation manager, who signs the test report and will not trust a tool that skips tests without showing why.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Building the map in a real account",
      blocks: [
        {
          kind: "md",
          md: md`### How you actually find these people

- **Start at the test systems engineer or the validation lead.** They are reachable (conference talks, LinkedIn posts about rigs and DAQ, job ads for "test infrastructure engineer"), and they can draw the organisation for you.
- **Read job ads.** A company hiring "HIL test engineer" and "test data engineer" has rigs and a data problem; the ad names the tools (TestStand, CANoe, dSPACE, FlexLogger) and sometimes the reporting line.
- **Ask for the org drawing, literally.** "Who else would need to be comfortable for something like this to be bought?" then "Who signs off a new tool for the bench PCs?" then "Which budget did the last test tool come from?"
- **Write it down** in the CRM as a map: name, role, metric, stance (champion, neutral, sceptic, unknown), approves or blocks, met or not.

### What each role needs from you

| Role | Give them |
|---|---|
| Test engineer | Fewer clicks, not more; capture that starts with the run |
| Test systems engineer | Architecture, data formats, how it reads existing DAQ and sequencer output |
| Validation manager | Why each test was selected or skipped; how misses are prevented |
| Lab manager | Rig-hours released, queue reduction |
| Head of validation | The business case in their numbers; audit evidence |
| VP engineering | Gate time, field quality, cost, in one page |
| IT / OT security | One-page architecture, data flows, security pack |
| Procurement | Supplier documents, price logic, standard terms |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How mapping goes wrong in test organisations",
          md: md`- **Mistaking the user for the buyer.** A delighted test engineer cannot sign anything. Ask the champion test (lesson 4 of Founder Core Sales): do they have power or access to power?
- **Missing OT security.** Rigs often sit on an OT network managed separately from office IT. The office IT person may approve Enclave and still not own the bench PCs.
- **No budget line for year 2.** The pilot was digitalisation money; the subscription has no home.
- **Ignoring quality and functional safety.** If Ripple's output becomes evidence for skipping tests on a safety function, the functional safety manager will want to review the method. Better early than as a blocker.
- **Assuming the startup is simple.** At a 300-person humanoid company the VP engineering may personally approve every tool, and is the hardest person in the building to get time with.`,
        },
        {
          kind: "ask",
          title: "Discovery questions that draw the map",
          items: [
            "Walk me through what happens after a firmware release lands on your rigs: who decides what to run, who runs it, who signs the result?",
            "Which budget did your last test tool or DAQ upgrade come from, and who approved it?",
            "If this works in a pilot, which budget line pays for it next year, and when is that budget set?",
            "Who looks after the bench PCs and the lab network: office IT, an OT team or the test systems group?",
            "Do new software suppliers need to be on a preferred-supplier list, and how long did onboarding take last time?",
            "Who would be most sceptical about a tool that recommends skipping tests?",
          ],
        },
        {
          kind: "scenario",
          scenario: "aw12-s1",
        },
        {
          kind: "question",
          question: {
            id: "aw12-l01-p1",
            type: "short",
            prompt: md`Produce an account map for one **illustrative** target archetype of your choice (a humanoid startup, an automotive tier-1 e-drive department, an industrial drives maker or a battery pack validation lab). Do not name a real company as a prospect. Include: (1) the roles involved with each one's metric and stance; (2) champion, economic buyer and every veto holder; (3) the budget line for the pilot and for the annual contract, and when that budget is set; (4) the purchase path; (5) a consensus probability estimate before and after your pre-wiring plan, with the plan itself.`,
            rubric: [
              "Roles are specific to a hardware test organisation (test systems engineer, validation lead, lab manager, head of validation, IT/OT security, procurement), each with a metric.",
              "Champion, economic buyer and veto holders are distinguished correctly; the champion is not assumed to have budget.",
              "Budget lines for pilot and annual contract are named, with owner and calendar, and the year-2 budget gap is addressed.",
              "Purchase path is stated with its consequence (onboarding, distributor, services PO).",
              "Consensus probability is computed correctly before and after, with a concrete pre-wiring plan (who, when, what they need).",
              "No real company is named as a prospect or customer; numbers are labelled illustrative.",
            ],
            modelAnswer: md`**Archetype (illustrative):** e-drive validation department of an automotive tier-1, about 40 people, 18 rigs (motor dynos, inverter HIL, end-of-line style functional rigs).

**Roles:** test engineers (tests done on time; neutral); test systems engineer (rig uptime and data quality; **champion**); validation manager (gate on time, escapes; **sceptic** about skipping tests); lab manager (utilisation, queue; neutral, approves installs on rigs); head of e-drive validation (release quality, headcount; **economic buyer**); cost-centre controller (budget compliance; veto); IT/OT security (supplier security process; veto); purchasing (new supplier onboarding; veto); legal (terms; veto).

**Budget:** pilot from the digitalisation budget (EUR 30k, illustrative); annual contract must go into the engineering tools plan for next year, which the head of validation submits in early autumn. Action: get the subscription line into that plan during the pilot.

**Path:** direct purchase; purchasing will require supplier onboarding (start in week 1).

**Consensus:** 7 veto holders at 0.85: $0.85^7 = 32\%$. Plan: week 1, architecture call with OT security using the security pack; week 2, supplier onboarding started with purchasing; week 3, method review with the validation manager showing why each test is selected or skipped and a backtest plan; week 4, business case reviewed with the head of validation. Target: those four at 0.95, the other three at 0.85: $0.95^4 \times 0.85^3 = 0.815 \times 0.614 = 0.50$, about 50 %.`,
            explanation: md`The map turns "we have a great champion" into a list of people, metrics and dates, and shows where the deal can die.`,
            concepts: ["aw12.test-org-map", "aw12.budget-lines", "aw12.buying-consensus", "aw12.tooling-purchase-path"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail, in under two minutes, why the test systems engineer is the right first contact but the wrong person to ask for a purchase order, and what you need from them instead.",
          keyPoints: [
            "They own what Lockstep touches (rig software, DAQ, data) and feel the pain daily, so they understand fastest.",
            "They rarely own a budget line; the economic buyer is the head of validation or VP engineering.",
            "Ask them for the org map, the budget line, the security path and the numbers for the business case.",
            "Their role as champion is to carry the business case internally and get you access to the buyer and veto holders.",
          ],
        },
        { kind: "sources", refs: ["aw12-r2", "aw12-r17"] },
      ],
    },
  ],
  quiz: [
    {
      id: "aw12-l01-q1",
      type: "mcq",
      prompt: "In a typical hardware test organisation, who is the most natural champion for a synchronised capture tool such as Lockstep?",
      options: ["The procurement manager", "The test systems engineer who owns rig software and DAQ configuration", "The VP engineering", "The legal counsel"],
      answer: 1,
      explanation: md`The test systems engineer owns exactly what the product touches and feels the data pain daily. The VP is usually the economic buyer, not the champion.`,
      concepts: ["aw12.test-systems-champion"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw12-l01-q2",
      type: "numeric",
      prompt: md`A deal has five veto holders, each approving independently with probability 0.9. What is the probability that all approve (%)?`,
      answer: 59.0,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$0.9^5 = 0.5905$, about 59 %. Adding a sixth at 0.9 drops it to 53 %.`,
      concepts: ["aw12.buying-consensus"],
      difficulty: 1,
    },
    {
      id: "aw12-l01-q3",
      type: "multi",
      prompt: "Which are typical budget lines that test tooling is paid from? (Select all that apply.)",
      options: ["Lab capex", "Engineering tools opex", "Programme budget", "Innovation or digitalisation budget", "The marketing events budget"],
      answer: [0, 1, 2, 3],
      explanation: md`Lab capex, engineering tools opex, programme budget and innovation or digitalisation budget. Subscriptions belong most naturally in engineering tools opex.`,
      concepts: ["aw12.budget-lines"],
      difficulty: 1,
    },
    {
      id: "aw12-l01-q4",
      type: "decision",
      prompt: md`Illustrative. A pilot at a tier-1 is going well. It was funded from a digitalisation budget. The head of validation says next year's engineering tools plan was submitted last month. What do you do?`,
      options: [
        { text: "Keep running the pilot; deal with the budget at the decision meeting.", score: 0.1, feedback: "At the decision meeting there will be no money until the next plan, a year away." },
        { text: "Ask the head of validation now whether the plan can still be amended or a mid-year line requested, and offer a contract structure that fits what is available (for example a reduced first-year scope from the remaining digitalisation money, converting to full scope when the tools line opens).", score: 1, feedback: "Addresses the year-2 budget gap while it can still be solved and keeps the deal alive with a scope that fits." },
        { text: "Offer a large discount so it fits anywhere.", score: 0.3, feedback: "Price is not the problem; the absence of a budget line is. A discount sets a low anchor and may still not fit." },
      ],
      explanation: md`The budget line for the annual contract must be secured during the pilot, on the buyer's calendar.`,
      concepts: ["aw12.budget-lines", "aw12.tooling-purchase-path"],
      difficulty: 2,
    },
    {
      id: "aw12-l01-q5",
      type: "mcq",
      prompt: "Why can OT security block a deal that office IT has approved?",
      options: [
        "OT security always outranks IT",
        "Rigs and bench PCs often sit on a separately managed OT network; approving a server in the data centre does not approve software on bench PCs or new conduits into the lab network",
        "OT security owns procurement",
        "Office IT approvals expire after 30 days",
      ],
      answer: 1,
      explanation: md`Lockstep touches bench PCs and the lab network. Find out who owns them before assuming IT approval covers everything.`,
      concepts: ["aw12.test-org-map"],
      difficulty: 2,
    },
    {
      id: "aw12-l01-q6",
      type: "mcq",
      prompt: "A lab wants to buy Afterwave as part of a new rig purchase from a test system integrator. What is the main consequence?",
      options: [
        "Nothing changes",
        "Afterwave becomes a line inside someone else's capex quote: faster for the buyer, but the integrator controls the relationship and the price, and the subscription may not renew",
        "It is illegal",
        "It makes security review unnecessary",
      ],
      answer: 1,
      explanation: md`Bundling can be fast, but write a direct annual subscription into the terms so renewal does not depend on the next rig purchase.`,
      concepts: ["aw12.tooling-purchase-path"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw12-l01-f1", front: "Natural champion for Lockstep and Ripple", back: "The test systems engineer (rig software, DAQ, data): feels the pain, understands fastest, rarely owns budget.", concepts: ["aw12.test-systems-champion"] },
    { id: "aw12-l01-f2", front: "Four budget lines for test tooling", back: "Lab capex, engineering tools opex, programme budget, innovation or digitalisation budget.", concepts: ["aw12.budget-lines"] },
    { id: "aw12-l01-f3", front: "Consensus probability", back: md`$P_{all} = \prod p_i$; six veto holders at 0.85 give 38 %, at 0.95 give 74 %.`, concepts: ["aw12.buying-consensus"] },
    { id: "aw12-l01-f4", front: "The year-2 budget trap", back: "Pilot funded from innovation money; the annual contract has no line in the engineering tools plan. Secure it during the pilot.", concepts: ["aw12.budget-lines"] },
    { id: "aw12-l01-f5", front: "Four purchase paths for test software", back: "Direct software purchase; bundled with rig or DAQ capex; via framework or distributor; as an engineering-services PO.", concepts: ["aw12.tooling-purchase-path"] },
    { id: "aw12-l01-f6", front: "Usual sceptic for Ripple", back: "The validation manager who signs the test report: wants to see why each test was selected or skipped.", concepts: ["aw12.test-org-map"] },
  ],
  scenarios: [
    {
      id: "aw12-s1",
      title: "The enthusiastic test engineer",
      dayInLife: true,
      context: md`Illustrative. After a meetup talk, a test engineer at a mid-size robotics company messages you: "We need exactly this. Our reruns are killing us. Can you send a quote so I can try it on my rig next week?" You know nothing else about the account.`,
      start: "a",
      concepts: ["aw12.test-org-map", "aw12.test-systems-champion", "aw12.budget-lines"],
      nodes: {
        a: {
          md: md`What do you do first?`,
          choices: [
            { text: "Send a quote and an installer so they can start next week.", score: 2, feedback: "Fast, but you do not know who pays, who owns the bench PC, or whether a quote can be accepted by this person. It will stall at the first approval.", next: "b" },
            { text: "Book a 45-minute call: ask them to walk you through a release on their rig, who decides what to retest, who owns the bench PCs, and which budget the last tool came from.", score: 9, feedback: "Turns enthusiasm into a map and finds the real path.", next: "b" },
            { text: "Ask to be introduced to the VP engineering straight away.", score: 4, feedback: "Skips the person who can give you the map and the numbers, and may annoy them.", next: "b" },
          ],
        },
        b: {
          md: md`On the call you learn: the test systems lead owns the bench PCs; the head of test approved the last DAQ upgrade from lab capex; IT security reviews any new software; there is no line for subscriptions. What next?`,
          choices: [
            { text: "Ask the engineer to introduce you to the test systems lead, and together prepare a one-page note for the head of test with the rerun numbers and a scoped paid pilot, including which budget line the subscription would come from.", score: 10, feedback: "Moves to the person who owns the asset and the person who owns the budget, with a business case and a budget question.", next: "c" },
            { text: "Offer a free trial to get around the budget question.", score: 3, feedback: "A free trial with no budget owner is the pilot purgatory Founder Core warns about.", next: "c" },
          ],
        },
        c: {
          md: md`The head of test likes the note and says: "I can fund a pilot from lab capex if it comes with something physical. Subscriptions are a problem." How do you respond?`,
          choices: [
            { text: "Structure the pilot as a fixed-price engineering-services purchase (installation, capture set-up on two rigs, backtest), and agree now that the annual subscription goes into next year's engineering tools plan, with the head of test submitting it.", score: 10, feedback: "Uses the budget that exists for the pilot and fixes the year-2 home of the subscription." },
            { text: "Insist on a subscription or nothing.", score: 3, feedback: "Principled but loses a fundable first step." },
            { text: "Bundle a cheap server and call it hardware.", score: 2, feedback: "Dressing software as capex to fit a budget rule can backfire in audit and does not solve renewal." },
          ],
        },
      },
    },
  ],
};

export default lesson;
