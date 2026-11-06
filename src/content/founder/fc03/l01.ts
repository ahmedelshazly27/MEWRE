import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc03-l01",
  title: "Positioning with April Dunford's Method",
  summary:
    "Positioning is the context you set so a buyer instantly understands what your product is, who it is for and why it beats what they do today. Learn Dunford's five components and ten-step process, build a full positioning for Afterwave Ripple, and see why the market category you choose sets the buyer's evaluation criteria.",
  minutes: 80,
  objectives: [
    "Define positioning and explain why it comes before messaging, pricing and channel choice",
    "Work through Dunford's five components in the right order: alternatives, unique attributes, value, best-fit customers, market category",
    "Build a complete positioning for Afterwave Ripple and test it against the alternatives a hardware test team actually uses",
    "Choose a market frame of reference by asking which buyer assumptions it triggers",
    "Run a positioning workshop with engineering partners and capture the output in a shareable canvas",
  ],
  concepts: [
    { id: "fc03.positioning", name: "Positioning", description: "The context a product is placed in so that target customers understand what it is, why it is better than their alternatives and why they should care; the input to messaging, pricing and sales narrative.", competency: "fc-gtm" },
    { id: "fc03.competitive-alternatives", name: "Competitive alternatives", description: "What best-fit customers would do if your product did not exist, including doing nothing, manual processes, spreadsheets, internal tools and named vendors.", competency: "fc-gtm", related: ["fc03.positioning"] },
    { id: "fc03.unique-attributes", name: "Unique attributes", description: "Capabilities, features, delivery model or expertise that you have and the alternatives lack; must be factual and provable.", competency: "fc-gtm", related: ["fc03.competitive-alternatives"] },
    { id: "fc03.value-themes", name: "Value and value themes", description: "The benefit each unique attribute delivers to the customer, grouped into two or three themes and backed by proof.", competency: "fc-gtm", related: ["fc03.unique-attributes"] },
    { id: "fc03.best-fit-customer", name: "Best-fit customer", description: "The characteristics that make a customer care a lot about your value: the segment that buys fastest, churns least and refers others.", competency: "fc-gtm", related: ["fc03.value-themes"] },
    { id: "fc03.market-category", name: "Market category (frame of reference)", description: "The market you tell buyers you compete in; it triggers assumptions about competitors, features, price and evaluation criteria.", competency: "fc-gtm", related: ["fc03.positioning"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What positioning is and how Dunford's method works",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave sells three things (Lockstep, Enclave, Ripple) into hardware test teams who have never bought "physical AI test infrastructure" before. If a test lead hears "test automation", he compares you to NI TestStand and a Python script and asks why you cost more. If he hears "data platform", he compares you to Nominal and Sift, who have raised far more money. Positioning decides which comparison happens in the buyer's head in the first 30 seconds, and you are the person on the team who owns it. Your engineering partners build the product; you decide what it is understood to be.`,
        },
        {
          kind: "md",
          md: md`### Positioning is context, not a slogan

April Dunford (*Obviously Awesome*, 2019) defines positioning as **the act of deliberately defining how your product is the best at something that a defined market cares a lot about**. The mechanism is human: buyers cannot evaluate a new product from first principles, so they place it in a category they already know and import that category's assumptions (who the competitors are, what features matter, what it should cost). Positioning is choosing that context on purpose.

Everything downstream reads from it:

| Downstream decision | What it takes from positioning |
|---|---|
| Messaging | Which value themes lead, in which words |
| Pricing | Which alternatives anchor the price |
| Sales narrative | Which status quo you argue against |
| ICP and targeting | Which segment cares a lot |
| Roadmap | Which attributes to deepen rather than which features to copy |

### The five components (plus one optional)

Dunford's components are **dependent**, so their order matters:

1. **Competitive alternatives**: what customers would do if you did not exist. Usually the real competitor is "do it the way we do now" (manual process, spreadsheets, rerun everything), not a startup.
2. **Unique attributes**: what you have that the alternatives do not. Facts, not adjectives.
3. **Value (and proof)**: what each attribute enables for the customer. "So what?" applied until you reach a benefit the buyer cares about.
4. **Best-fit customer characteristics**: who cares a lot about that value. Observable traits, not personas.
5. **Market category**: the frame of reference that makes your value obvious to that customer.
6. *Optional:* **relevant trends**: a shift that makes the value more urgent now. Use carefully: a trend layered on weak positioning is noise.

The chain is causal: alternatives define what counts as unique; unique attributes generate value; value determines who cares; who cares, and what they already know, determines the category. Start at the category ("we are an AI platform") and the chain runs backwards: you end up claiming value nobody can verify.

### Why the category is a lever with a mathematical flavour

Think of a buyer's evaluation as a weighted score: $\text{score} = \sum_k \omega_k\, q_k$ where $q_k$ is your quality on criterion $k$ and $\omega_k$ the weight the buyer assigns. You can improve $q_k$ (build product) or you can change which criteria and weights the buyer uses. The category sets the $\omega_k$. Called "test automation", the heavy weights land on breadth of instrument drivers and sequencing, where NI and Keysight have decades of lead. Called "change-impact analysis for hardware test", the heavy weights land on which tests to rerun and why, where incumbents (per the market research, November 2026) advertise nothing comparable. Same product, different winner.`,
        },
        {
          kind: "flow",
          title: "Dunford's ten-step positioning process",
          steps: [
            { label: "1. Customers who love you", detail: "Study the best-fit customers you already have (or design partners); ignore the lukewarm ones" },
            { label: "2. Positioning team", detail: "CEO, product, engineering leads, sales: positioning is cross-functional" },
            { label: "3. Let go of baggage", detail: "Agree the product may not be what it was originally built to be" },
            { label: "4. Competitive alternatives", detail: "What would they do if you vanished?" },
            { label: "5. Unique attributes", detail: "What you have that alternatives lack" },
            { label: "6. Value themes", detail: "Map attributes to value; cluster into 2-3 themes" },
            { label: "7. Who cares a lot", detail: "Characteristics of the best-fit segment" },
            { label: "8. Market frame of reference", detail: "Category that puts your strengths at the centre" },
            { label: "9. Layer on a trend", detail: "Optional, and only if it is real" },
            { label: "10. Capture and share", detail: "Positioning canvas used by sales, marketing and product" },
          ],
          caption: "Steps 4 to 8 are the five components in dependency order. Step 1 is why positioning is hard before you have customers: use design partners and discovery calls instead.",
        },
        {
          kind: "matrix",
          title: "Three category strategies (Dunford)",
          xAxis: ["Existing category has a clear leader", "Category is open or forming"],
          yAxis: ["You fit an existing category", "No existing category fits"],
          cells: [
            { label: "Create a new game", detail: "Name a new category; you must teach the problem and the solution. Expensive (Lesson 6)." },
            { label: "Create a new game, with tailwind", detail: "Others are already teaching the market; you may be able to name the frame." },
            { label: "Big fish, small pond", detail: "Win a subsegment of the category where the leader's product is a poor fit." },
            { label: "Head to head", detail: "Compete on the category's own criteria. Viable only while no leader has locked in the buyer's expectations." },
          ],
          caption: "Top row = no existing category fits; bottom row = you fit one. Most early B2B startups should be bottom-left: a well-defined subsegment of a known category.",
        },
      ],
    },
    {
      layer: "applied",
      title: "A full worked positioning for Afterwave Ripple",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Positioning Ripple, the change-impact engine",
          given: md`Product (as defined by the team): **Ripple** answers "after a firmware, model or rig change, which tests do we rerun and why". It reads bench memory (test data captured with Lockstep on one clock) and runs inside **Afterwave Enclave** on the customer's servers or an isolated tenant. Team credibility: two cofounders from Tesla drive-unit and drive-inverter validation. Market evidence: the November 2026 research brief found no vendor offering change-impact or regression test selection for physical rigs as a core feature; the closest analogues are code-level change-based testing (VectorCAST) and requirements-level "suspect links" (Jama, Polarion, DOORS). An industrial study with OMICRON found hardware-dependent system tests are mostly selected by tester judgment. There are **no customers yet**: everything below is a hypothesis to test in discovery.`,
          steps: [
            {
              md: md`**Step A: competitive alternatives** (what a drive or actuator test team does today after a firmware change):

| Alternative | Who uses it | Why it persists | Weakness |
|---|---|---|---|
| Rerun the full regression | Teams with spare rig time or high fear | Safe, simple to defend | Burns rig-hours and calendar days per release |
| Senior engineer picks a subset by judgment | Most teams (the OMICRON finding) | Fast, uses tribal knowledge | Not repeatable, not documented, leaves with the engineer |
| Test management tool (Xray, TestRail) tags | Teams with Jira discipline | Already paid for | Selection is manual or tag-based, no signal awareness |
| Requirements suspect links (Jama, Polarion, DOORS) | Regulated programmes | Required for traceability anyway | Flags tests when a *requirement* changes, not when firmware or a rig changes |
| Code-level change-based testing (VectorCAST) | Embedded software teams | Mature for unit tests | Stops at code; knows nothing about rigs, fixtures or signals |
| Build an internal script | Teams with a strong test-systems engineer | Fits exactly | Maintenance burden, single point of failure |

The two that matter most are **"rerun everything"** and **"the senior engineer decides"**. Your pitch must beat those, not Nominal.`,
            },
            {
              md: md`**Step B: unique attributes** (things true of Ripple and not of the alternatives, stated as facts to be proven in the product):

1. Selection uses **three change sources together**: firmware or model diff, rig configuration (sensors, fixtures, calibration), and past results in bench memory.
2. Every selected or skipped test carries a **written rationale** (which change, which dependency, which past signal).
3. Runs **inside the customer boundary** (Enclave): no test data leaves their servers.
4. Reads signal-level data aligned to one clock (Lockstep), not only pass/fail records.
5. Built by people who ran drive-unit validation at scale (expertise is a legitimate attribute).`,
            },
            {
              md: md`**Step C: value**, by asking "so what?" of each attribute and clustering:

| Attribute | So what? | Value theme |
|---|---|---|
| 1, 4 | Rerun the tests the change can actually affect | **Faster release gates without guessing** |
| 2 | Anyone can see why a test was skipped | **Defensible evidence** (internal safety review, audit, notified body) |
| 3 | Security review is a known path, not a blocker | **Fits how hardware companies handle data** |
| 5 | The model reflects how real rigs fail | Proof point supporting all themes |

Proof available at seed stage: the team's track record, a reproducible demo on a public or synthetic dataset, and (later) design-partner results with permission. Do not claim numbers you have not measured.`,
            },
            {
              md: md`**Step D: best-fit customers** (who cares a lot). Characteristics, all observable:
- Firmware or model releases at least monthly that require bench regression.
- Expensive or scarce rigs (dynos, actuator test stands, HIL with power hardware) where a full regression takes days.
- A safety case or audit trail matters (ML in safety functions, functional-safety programmes, the EU Machinery Regulation from 20 January 2027).
- Test data must stay on-prem.
- Segments that match: electric drives and motors, humanoid and robot actuators, powertrains. Batteries fit less well (fewer, longer tests, less firmware churn).`,
            },
            {
              md: md`**Step E: market category.** Candidate frames and the assumptions each triggers:

| Frame | Buyer compares you to | Criteria the buyer brings | Verdict |
|---|---|---|---|
| "Test automation" | NI TestStand, Keysight PathWave, scripts | Instrument drivers, sequencing, price per seat | Wrong: Ripple does not sequence tests |
| "Hardware test data platform" | Nominal, Sift, Marple | Ingest, visualisation, scale | Wrong frame: Ripple looks like a feature of a USD 1 bn company |
| "Regression test selection" | Software tools (code-level) | Code coverage | Too narrow and software-coded |
| **"Change-impact analysis for physical AI and hardware test"** | Senior engineer judgment, full regression | Which tests, why, how much rig time saved, evidence | **Chosen**: puts unique attributes at the centre |

Strategy: **big fish, small pond** inside the broader hardware test infrastructure market that Nominal and Sift are educating with their own money.`,
            },
            {
              md: md`**Step F: trend (optional):** "physical AI moves model updates into machines; from 20 January 2027 ML-based safety functions in machinery fall under notified-body assessment (Machinery Regulation Annex I Part A)". This is real (see the research brief) but it supports theme 2; it is not the category.`,
            },
          ],
          result: md`**Positioning statement (Moore-style template):** For hardware test teams in drives, robotics and physical AI who must re-validate after every firmware, model or rig change, **Ripple is a change-impact engine for hardware test** that tells you which tests to rerun and why, using your own bench data on your own servers. Unlike rerunning the full regression or relying on a senior engineer's judgment, Ripple makes the selection repeatable and documented, so release gates get faster and the evidence holds up in a safety review.`,
        },
        {
          kind: "question",
          question: {
            id: "fc03-l01-p1",
            type: "mcq",
            prompt: md`A test director at an e-drive supplier says: "So you're like Nominal?" Given the Ripple positioning above, what is the best response?`,
            options: [
              "\"Yes, but cheaper.\"",
              "\"No. Today, after a firmware change, your team either reruns everything or a senior engineer picks a subset. Ripple replaces that decision with a documented one. It can sit next to whatever data platform you use.\"",
              "\"We are an AI-native platform for the future of physical AI.\"",
              "\"Nominal is a defence company, so it is not relevant to you.\"",
            ],
            answer: 1,
            explanation: md`Reframe against the **real competitive alternative** (full regression or engineer judgment), state the unique value, and decline the wrong category without attacking a well-funded company. "Cheaper Nominal" accepts a frame where you lose; buzzwords give no frame at all.`,
            concepts: ["fc03.market-category", "fc03.competitive-alternatives"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running positioning in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does it and with what

- **Owner:** the CEO in a seed company (you), until a product marketing lead exists. Positioning cannot be delegated to an agency: they do not hear the discovery calls.
- **Team:** you, the two technical cofounders, anyone who has done a demo. Engineers usually know the unique attributes best; you usually know the alternatives best.
- **Inputs:** 10 to 20 discovery-call notes, lost-deal reasons, the competitor table, security review questions you have received.
- **Format:** a half-day workshop, sticky notes or a shared doc, ending in a **positioning canvas** (one page: alternatives, attributes, value themes with proof, best-fit characteristics, category, trend).
- **Cadence:** revisit after every 10 lost or stalled deals, a new segment, or a big product change. Positioning drifts when the product changes but the story does not.

### What goes wrong`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Five classic positioning failures",
          md: md`- **Category first:** "we are an AI platform for physical AI". Buyers cannot infer competitors, price or value from it.
- **Alternatives = startups:** listing Nominal and Sift but not "rerun everything". Your sales calls then argue against the wrong opponent.
- **Adjectives as attributes:** "fast, intuitive, scalable". If a competitor can say it too, it is not unique.
- **Everyone is best-fit:** "any hardware company". The best-fit list should exclude most of the market.
- **Unproven value numbers:** "cuts test time by 70 %" with no measurement. Hardware engineers stop listening at the first unsupported number, and security reviewers write it down.`,
        },
        {
          kind: "checklist",
          title: "Positioning canvas: done when",
          items: [
            "Every alternative is something a real prospect said they do today (with call notes)",
            "Every unique attribute is demonstrable in the current product or clearly marked as roadmap",
            "Each value theme has at least one proof point you can show, not just assert",
            "Best-fit characteristics are observable from outside (job posts, release cadence, rig types, regulatory exposure)",
            "The category triggers criteria where you are strongest, and you can name the two or three products it makes buyers compare you to",
            "Your engineering partners agree with every attribute claim",
          ],
        },
        {
          kind: "ask",
          title: "Discovery questions that feed positioning",
          items: [
            "Walk me through the last firmware change: what did you rerun, who decided, how long did it take?",
            "If we did not exist, what would you do about this next quarter?",
            "When a test was skipped and something escaped, how did you find out, and what did it cost?",
            "Who has to sign off before data from the bench can go to any external system?",
            "What would you call a tool that did this? (Listen for the category in the buyer's own words.)",
          ],
        },
        { kind: "scenario", scenario: "fc03-s1" },
        {
          kind: "question",
          question: {
            id: "fc03-l01-p2",
            type: "short",
            prompt: md`**Produce the positioning canvas for Afterwave Lockstep** (the capture app that records rig signals via data acquisition and on-screen actions on one clock). Give: (1) at least four competitive alternatives with the weakness of each, (2) three to five unique attributes, (3) two or three value themes with the proof you could show at seed stage, (4) best-fit customer characteristics, (5) your chosen market category with one rejected alternative frame and why, and (6) a one-sentence positioning statement. Do not invent customers or results.`,
            rubric: [
              "Alternatives include the status quo (e.g. DAQ vendor software plus screen recording, manual timestamp alignment, spreadsheets or notebooks) and not only named vendors; each has a specific weakness",
              "Unique attributes are factual and specific to Lockstep (rig signals and on-screen actions on one clock, feeds bench memory/Enclave/Ripple), not adjectives",
              "Value themes follow from the attributes and are backed by proof that exists at seed stage (demo, team expertise, reproducible example), with no fabricated metrics",
              "Best-fit characteristics are observable and exclude part of the market (e.g. teams debugging intermittent failures where the operator's action and the signal must be correlated)",
              "Category choice is justified by the buyer assumptions it triggers; at least one rejected frame (e.g. 'DAQ software' or 'data logger') with the reason",
              "Positioning statement names segment, category, key benefit and primary alternative",
            ],
            modelAnswer: md`**1. Alternatives.** (a) DAQ vendor software (FlexLogger, Dewesoft or similar) for signals plus a separate screen recording: two clocks, aligned by hand afterwards, error-prone and slow. (b) Engineer's notebook or spreadsheet of "what I clicked when": incomplete, unsearchable. (c) Test executive logs (TestStand reports): pass/fail and steps, but not the raw signal around the event. (d) Robotics loggers (ROS bags, MCAP with Foxglove or Rerun): strong for robot topics, not for lab DAQ and operator UI actions. (e) Internal scripts: fit, but break with every new rig.

**2. Unique attributes.** Records DAQ signals and on-screen actions on **one clock**; captures at the bench without changing the existing test software; writes into bench memory that Ripple and Enclave use; runs on-prem.

**3. Value themes.** *Find the cause of intermittent failures faster* (the operator action and the signal are on the same timeline; proof: a demo replaying a fault with the click visible next to the current spike). *Make every test reusable evidence* (captures become searchable bench memory; proof: query demo). *Start the change-impact loop* (Lockstep is the data source Ripple needs; proof: architecture walkthrough).

**4. Best-fit.** Validation teams running semi-manual tests through vendor GUIs on high-value rigs (drives, actuators, powertrains) who lose days on "cannot reproduce" issues and must keep data on-prem. Not a fit: fully automated production end-of-line testers.

**5. Category.** "Synchronized test capture for hardware validation". Rejected: "DAQ software", because buyers would compare channel counts and sample rates against NI and Dewesoft, which Lockstep does not try to beat.

**6. Statement.** For hardware validation teams who lose days aligning rig signals with what the operator did, Lockstep is a synchronized test capture tool that records both on one clock and turns every run into searchable bench memory, unlike DAQ software plus a screen recording that leaves the alignment to an engineer.`,
            explanation: md`Graded against the rubric. The common failure is to start with the category ("AI data platform") or to list only startups as alternatives. The real opponent for Lockstep is two tools and an engineer aligning timestamps by hand.`,
            concepts: ["fc03.positioning", "fc03.competitive-alternatives", "fc03.unique-attributes", "fc03.market-category"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Ismail and Yusuf, in plain words, why you want to stop calling Afterwave 'test automation' even though the product does automate part of testing.",
          keyPoints: [
            "Positioning sets the context buyers use to evaluate us; the category imports competitors and criteria",
            "'Test automation' makes buyers compare us to NI TestStand and scripts, on criteria where we are weakest",
            "Our real competitive alternative is full regression or a senior engineer's judgment",
            "Our unique attributes (change-impact across firmware, rig and bench data; documented rationale; on-prem) sit at the centre of a change-impact frame",
            "The frame must be one the buyer already understands, so it is a subsegment of hardware test, not a brand-new word",
          ],
        },
        { kind: "sources", refs: ["fc03-r1", "fc03-r3", "fc03-r9", "fc03-r10"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc03-l01-q1",
      type: "order",
      prompt: "Put Dunford's five positioning components in the order you should work through them.",
      items: ["Competitive alternatives", "Unique attributes", "Value (and proof)", "Best-fit customer characteristics", "Market category"],
      explanation: md`Each component depends on the previous one: what is unique depends on the alternatives; value comes from the unique attributes; who cares depends on the value; the category is chosen so those customers see the value. Choosing the category first is the most common error.`,
      concepts: ["fc03.positioning"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc03-l01-q2",
      type: "mcq",
      prompt: "For most early B2B products, the most important competitive alternative is usually:",
      options: [
        "The best-funded startup in the space",
        "The status quo: how customers solve the problem today (manual work, spreadsheets, doing nothing, an internal tool)",
        "The largest incumbent vendor",
        "Open-source software",
      ],
      answer: 1,
      explanation: md`Deals are mostly lost to "no decision" or "we'll keep doing it our way". If your story argues against a startup the buyer has never evaluated, you are fighting the wrong opponent.`,
      concepts: ["fc03.competitive-alternatives"],
      difficulty: 1,
    },
    {
      id: "fc03-l01-q3",
      type: "multi",
      prompt: "Which of these are valid unique attributes for a positioning canvas? (Select all that apply.)",
      options: [
        "Runs entirely inside the customer's own servers",
        "Easy to use and intuitive",
        "Every skipped test carries a written rationale linked to the change that caused it",
        "Founders previously ran drive-unit validation at a large EV maker",
        "Next-generation AI",
      ],
      answer: [0, 2, 3],
      explanation: md`Attributes are facts the alternatives do not share, and expertise counts. "Easy to use" and "next-generation AI" are adjectives any competitor can claim.`,
      concepts: ["fc03.unique-attributes"],
      difficulty: 1,
    },
    {
      id: "fc03-l01-q4",
      type: "mcq",
      prompt: "Why does the market category matter so much?",
      options: [
        "It decides the logo and colours",
        "It is required for trademark registration",
        "It triggers the buyer's assumptions about competitors, features, price and evaluation criteria",
        "Investors require one category per company",
      ],
      answer: 2,
      explanation: md`The category is a shortcut: once a buyer files you under "test automation" he knows (or thinks he knows) what you compete with and what you should cost. Choose the frame whose criteria you win on.`,
      concepts: ["fc03.market-category"],
      difficulty: 1,
    },
    {
      id: "fc03-l01-q5",
      type: "decision",
      prompt: md`Your engineering partners want the website headline "The AI platform for physical AI". Discovery calls show test leads describe the pain as "we rerun too much after every firmware drop, and nobody can say why we skipped what we skipped". What do you do?`,
      options: [
        { text: "Keep the AI headline; investors like it and it signals ambition.", score: 0.1, feedback: "Signals ambition to investors but gives buyers no frame. Investors also prefer a crisp wedge." },
        { text: "Run a short positioning session: alternatives from the calls, attributes, value; then a headline in the buyer's language around which tests to rerun and why.", score: 1, feedback: "Right: the buyer's own words reveal the frame and the value; the team agrees the claims together." },
        { text: "A/B test five headlines on LinkedIn ads and pick the highest click-through.", score: 0.3, feedback: "Clicks from a broad audience measure curiosity, not fit. Use tests after positioning, not instead of it." },
      ],
      explanation: md`Positioning comes from best-fit customers' language and the real alternatives, then messaging follows. Headline testing is useful later to choose between words, not to find the frame.`,
      concepts: ["fc03.positioning", "fc03.market-category"],
      difficulty: 2,
    },
    {
      id: "fc03-l01-q6",
      type: "mcq",
      prompt: "Which category strategy does Dunford recommend most often for an early startup whose product is clearly better for one subsegment of an established category?",
      options: ["Head to head", "Big fish, small pond", "Create a new game", "Rebrand the incumbent's category"],
      answer: 1,
      explanation: md`Big fish, small pond: win a subsegment where the leader's product fits poorly and your strengths dominate. Head to head requires winning on the leader's criteria; creating a new game is expensive.`,
      concepts: ["fc03.market-category"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc03-l01-f1", front: "Positioning (Dunford)", back: "Defining how your product is the best at something a defined market cares a lot about: the context buyers use to understand it.", concepts: ["fc03.positioning"] },
    { id: "fc03-l01-f2", front: "Five positioning components, in order", back: "Competitive alternatives, unique attributes, value (and proof), best-fit customer characteristics, market category (+ optional trend).", concepts: ["fc03.positioning"] },
    { id: "fc03-l01-f3", front: "Ripple's real competitive alternatives", back: "Rerun the full regression, or a senior engineer chooses a subset by judgment.", concepts: ["fc03.competitive-alternatives"] },
    { id: "fc03-l01-f4", front: "Test for a unique attribute", back: "Is it a fact you can demonstrate, and do the alternatives lack it? Adjectives fail the test.", concepts: ["fc03.unique-attributes"] },
    { id: "fc03-l01-f5", front: "What a market category does", back: "Triggers buyer assumptions: who you compete with, what features matter, what you should cost.", concepts: ["fc03.market-category"] },
    { id: "fc03-l01-f6", front: "Dunford's three category strategies", back: "Head to head; big fish, small pond; create a new game.", concepts: ["fc03.market-category"] },
    { id: "fc03-l01-f7", front: "Positioning statement template (Moore-style)", back: "For [target] who [need], [product] is a [category] that [key benefit]. Unlike [primary alternative], it [key differentiation].", concepts: ["fc03.positioning"] },
  ],
  scenarios: [
    {
      id: "fc03-s1",
      title: "\"What category are you in?\"",
      dayInLife: true,
      context: md`You are in a 20-minute partner meeting with a seed investor in Zurich. Ten minutes in, she says: "I've seen Nominal and Sift. Help me understand what category you're in, and why you don't get crushed."`,
      start: "a",
      concepts: ["fc03.market-category", "fc03.competitive-alternatives", "fc03.positioning"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"We're building the operating system for physical AI.\"", score: 2, feedback: "Big, vague and unfalsifiable. She will hear 'no wedge'.", next: "b" },
            { text: "\"Nominal and Sift store and visualise test data. We answer a different question: after a firmware, model or rig change, which tests to rerun and why. Today teams rerun everything or a senior engineer guesses. That decision is our category: change-impact analysis for hardware test.\"", score: 9, feedback: "Clear frame, real alternative, honest about adjacent players, and a wedge she can evaluate.", next: "c" },
            { text: "\"We're like Nominal, but for Europe and on-prem.\"", score: 4, feedback: "Accepts a frame where you are a smaller copy. 'Europe and on-prem' is a feature Nominal already advertises.", next: "b" },
          ],
        },
        b: {
          md: md`She pushes: "So what does a customer buy first, and what would they do without you?"`,
          choices: [
            { text: "Switch to the change-impact frame: describe the last-firmware-change story and the two alternatives (full regression, engineer judgment).", score: 7, feedback: "Good recovery: you reach the real alternative, but you spent credibility getting there.", next: "c" },
            { text: "List all three products and every feature.", score: 2, feedback: "A feature list is not a category. She still cannot place you." },
          ],
        },
        c: {
          md: md`She asks: "Isn't change-impact just a feature Nominal will add?"`,
          choices: [
            { text: "\"Possibly over time. Our edge is that the hard part is the dependency model across firmware, rig configuration and past signals, built by people who ran drive validation at Tesla, and it runs inside the customer's boundary. We'd rather be the best at this decision than a smaller data platform. If a data platform becomes the place this data lives, we integrate with it.\"", score: 10, feedback: "Honest, specific about the defensible part, and shows you chose big fish, small pond deliberately." },
            { text: "\"No, they could never build it.\"", score: 2, feedback: "Not credible: a USD 1 bn company can build features. Investors test whether you know where your defensibility really lies." },
          ],
        },
      },
    },
  ],
};

export default lesson;
