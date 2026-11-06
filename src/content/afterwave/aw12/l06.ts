import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw12-l06",
  title: "Founder-led selling with technical cofounders",
  summary:
    "How a commercial CEO and two test engineering cofounders sell together: using Ismail's and Yusuf's validation and reliability backgrounds credibly and within their confidentiality obligations, who leads which conversation, how much technical time deals consume, and how to recruit design partners and build references in an industry where logos are rarely public.",
  minutes: 70,
  objectives: [
    "You can map each cofounder's background to the segments and conversations where it is credible, and state what must never be claimed or shared.",
    "You can split roles across a deal (process and business case vs technical deep dives) and run a joint call.",
    "You can compute technical cofounder sales load and set a cap that protects the build.",
    "You can design a design-partner programme (number, terms, give and get) and a reference ladder suited to confidential test organisations.",
  ],
  concepts: [
    { id: "aw12.credibility-mapping", name: "Credibility mapping", description: "Matching each founder's verifiable experience (drive unit validation, inverter test and reliability, test systems engineering) to the segments and conversations where it earns trust, while claiming only what is true and public.", competency: "aw-business", related: ["fc04.founder-led-sales", "fc03.founder-led-sales"] },
    { id: "aw12.confidentiality-boundary", name: "Former and current employer boundary", description: "Founders may say where they worked and what kind of work they did; they may not share an employer's confidential methods, data or results, imply endorsement, or work on Afterwave in ways their current employment contract prohibits.", competency: "aw-business", related: ["aw12.credibility-mapping"] },
    { id: "aw12.deal-role-split", name: "Deal role split", description: "The CEO owns the process, the map, the business case and the commercial terms; a technical cofounder owns deep dives, pilot scoping and method questions; one person leads each call and the other supports.", competency: "aw-business", related: ["fc02.decision-rights"] },
    { id: "aw12.cofounder-load", name: "Technical cofounder sales load", description: "Weekly technical hours that active deals consume, divided by technical cofounder capacity; pilots dominate, so cap the load and sequence pilots.", competency: "aw-business", related: ["aw12.deal-role-split"] },
    { id: "aw12.design-partner", name: "Design partner", description: "An early customer who pays (often discounted) for early access and roadmap influence and gives structured feedback, data access for the pilot and a reference; 3 to 5 chosen to represent the beachhead.", competency: "aw-business", related: ["fc04.paid-pilot", "aw12.segment-sequence"] },
    { id: "aw12.reference-ladder", name: "Reference ladder", description: "The escalating forms of reference a customer can give: private reference call, anonymised case study, named quote, logo, public case study, joint talk. Test organisations often allow only the lower rungs, so negotiate them in the contract.", competency: "aw-business", related: ["aw12.design-partner"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Selling as a commercial founder with two test engineers",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your buyers are engineers who distrust salespeople and trust peers who have run rigs. Ismail (ex-Tesla drive unit validation, now test systems at Signify) and Yusuf (ex-Tesla drive inverter test and reliability) are those peers. Used well, they shorten discovery, win deep dives and make validation managers believe a selection method. Used badly, they are pulled out of the build into every call, or they say something about a former employer that ends a deal or starts a legal problem. You own the sales process; their credibility is an asset you deploy deliberately.`,
        },
        {
          kind: "xref",
          to: "fc04-l01",
          note: "Founder Core Sales: why founders run the first deals and write the playbook before hiring sellers. This lesson is about selling as a team with technical cofounders in test organisations.",
        },
        {
          kind: "md",
          md: md`### Where each background is credible

| Background (as stated in the venture context) | Credible with | Conversations it wins |
|---|---|---|
| **Ismail:** drive unit validation (ex-Tesla); test systems at Signify now | Validation managers, test systems engineers in drives, e-drive, actuators; test infrastructure teams in large industrials | Release gates and what to retest; rig software and data infrastructure; how test tooling is adopted inside a large organisation |
| **Yusuf:** drive inverter test and reliability (ex-Tesla) | Power electronics and inverter test teams, reliability engineers, HIL teams | Inverter and power-stage test, reliability and life testing, failure analysis, how firmware changes interact with hardware |
| **You:** CEO, GTM; systems engineer in logistics automation; MSc sustainable energy technology | Heads of validation, VP engineering, procurement | Business case, process, terms, why now (regulation), the company |

**Rule:** state facts ("Yusuf spent several years on inverter test and reliability at Tesla"), then let the expertise show in questions. The credibility comes from the quality of the questions, not from the logo.

### The boundary

- **Allowed:** where they worked, their role, the kind of problems they worked on, general engineering knowledge and public information.
- **Not allowed:** a former employer's confidential test methods, data, results, tools, internal names or numbers; anything that implies the former employer uses or endorses Afterwave; recruiting or approaching contacts in ways their agreements restrict.
- **Current employment:** where a cofounder is still employed (the venture context describes Ismail as now at Signify), check the employment contract for outside-activity, IP-assignment and non-compete or conflict clauses before he takes customer calls, writes product code or approaches companies in his employer's sector. Afterwave's IP must be clean.

### Role split in a deal

| Stage | Lead | Support | Output |
|---|---|---|---|
| First meeting | CEO | none, or cofounder for 15 minutes if the buyer is a test engineer | Map, pain, next step |
| Discovery | CEO | Cofounder asks the technical implication questions | Numbers for the business case |
| Technical deep dive | Cofounder | CEO takes notes and owns open items | Written answers, architecture fit |
| Method review with the validation manager | Cofounder | CEO | Agreement on miss-rate criterion and backtest |
| Pilot scoping | Cofounder (technical), CEO (commercial) | each other | Pilot design and agreement |
| Security review | CEO runs it, cofounder answers architecture questions | | Approved plan |
| Decision meeting and negotiation | CEO | Cofounder presents results | Signed contract |

Before every joint call, agree who leads, the one goal of the call, and who answers price and roadmap questions (always the CEO, so engineers are never cornered into commitments).

### How much technical time deals consume`,
        },
        { kind: "equation", formula: "aw12-cofounder-load" },
        {
          kind: "md",
          md: md`An early deal needs an hour or two of technical time a week; a running pilot can need a full day. Two pilots at once can take a quarter of both technical cofounders' time. Agree a cap (for example 20 %) and sequence pilots against it.

### Design partners and references

**Design partners** are not free pilots with a nicer name. They are 3 to 5 early customers who:

- **give:** a paid (often discounted) contract, data access for the pilot, a named engineer for feedback, a reference at an agreed rung of the ladder;
- **get:** early access, roadmap influence through a regular review, a price lock or discount for a period, direct access to the founders.

Choose them to represent the beachhead (lesson 5), not because they are friendly.

**References** in test organisations are hard: firmware, test data and failures are confidential, and many companies forbid vendor logos. Plan the **reference ladder** and put the rung into the contract:`,
        },
        {
          kind: "flow",
          title: "Reference ladder",
          steps: [
            { label: "Private reference call", detail: "Their engineer talks to your prospect" },
            { label: "Anonymised case study", detail: "Segment, numbers, no name" },
            { label: "Named quote", detail: "Approved by their communications" },
            { label: "Logo", detail: "On site and decks" },
            { label: "Public case study or joint talk", detail: "Conference, webinar" },
          ],
          caption: "Most test organisations will give the first two rungs; negotiate them in the design-partner agreement, not after.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Load and design-partner arithmetic",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Technical cofounder load with two pilots running",
          given: md`**Illustrative.** Five deals in early stages needing about 1.5 technical hours a week each; two pilots running at about 8 hours a week each. Two technical cofounders at 45 working hours a week. Agreed cap: 20 %.`,
          steps: [
            { md: md`**Hours:** $\sum h_j = 5 \times 1.5 + 2 \times 8 = 7.5 + 16 = 23.5$ h/week.` },
            { md: md`**Load:** $u = 23.5/(2 \times 45) = 23.5/90 = 0.261$, i.e. **26 %**, above the 20 % cap.` },
            { md: md`**With one pilot:** $(7.5 + 8)/90 = 0.172$, i.e. **17 %**, inside the cap.` },
            { md: md`**Actions:** stagger the second pilot to start when the first enters gated mode; move routine pilot support (data import, weekly report) to a scripted process or a future solutions engineer; keep cofounders for deep dives and method reviews. If either cofounder has fewer hours available (for example while still employed), recompute $u$ with the real capacity.` },
          ],
          result: md`Two simultaneous pilots break the cap; one does not. Pilot sequencing, not the number of early deals, is what protects the build.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: is the design-partner discount worth it?",
          given: md`**Illustrative.** List price EUR 100k a year. Three design partners at 50 % off for year 1. You expect their references (private calls and anonymised case studies) to raise your win rate from 0.20 to 0.30 on EUR 2.0 m of qualified pipeline over the following year.`,
          steps: [
            { md: md`Revenue given up in year 1: $3 \times 0.5 \times 100{,}000$.` },
            { md: md`= **EUR 150,000**.`, hidden: true, check: { prompt: "Year-1 revenue given up (EUR)", answer: 150000, unit: "EUR", tolerance: { abs: 1 } } },
            { md: md`Extra expected bookings: $(0.30 - 0.20) \times 2{,}000{,}000$.` },
            { md: md`= **EUR 200,000** of extra expected bookings a year.`, hidden: true, check: { prompt: "Extra expected bookings (EUR)", answer: 200000, unit: "EUR", tolerance: { abs: 1 } } },
          ],
          result: md`Under these assumptions the discount pays back within a year, and the references keep compounding. The calculation only works if the reference rung is in the contract; a discount without a reference obligation buys nothing.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running joint calls, design partners and references",
      blocks: [
        {
          kind: "checklist",
          title: "Before every joint call",
          items: [
            "One goal for the call, written down",
            "Who leads, who supports, who answers price and roadmap (CEO)",
            "Account map and what this person is measured on",
            "Three technical implication questions the cofounder will ask",
            "Boundary reminder: no former-employer specifics; general knowledge and public information only",
            "Who sends the follow-up, with open items and owners, within 24 hours",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How founder-led selling with technical cofounders goes wrong",
          md: md`- **"At Tesla we did it like this."** Shares confidential practice or sounds like name-dropping. Say "in drive unit validation, a common problem is..." instead.
- **Engineer cornered on price or roadmap.** The buyer asks the cofounder "could it also do X by June?"; the answer becomes a commitment. Route these to the CEO.
- **Cofounders in every call.** The build slips; pilots suffer. Use the load formula.
- **Design partners who are just friendly.** They do not represent the beachhead and their feedback steers the product sideways.
- **References negotiated after success.** By then the buyer's communications team says no. Put the rung in the agreement.
- **Ignoring current employment terms.** An unclear IP position at a cofounder's employer can surface in due diligence.`,
        },
        {
          kind: "checklist",
          title: "Design-partner agreement terms",
          items: [
            "Paid subscription with discount and its duration; price after the discount period",
            "Scope (rigs, programme), pilot design and success criteria (lesson 3)",
            "Feedback cadence: monthly product review with a named engineer",
            "Data access and ownership; models trained on their data stay in their Enclave",
            "Reference obligation at a named rung (for example two private reference calls a year and an anonymised case study)",
            "Roadmap influence without exclusivity; no custom features owned by the partner",
            "Confidentiality both ways; what Afterwave may say publicly",
          ],
        },
        {
          kind: "xref",
          to: "fc08-l07",
          note: "Founder Core Legal: IP assignment, NDAs and pilot agreements, including what founders must assign to the company and how to handle prior employment.",
        },
        {
          kind: "xref",
          to: "fc02-l08",
          note: "Founder Core Product: decision rights and working rhythm with a technical cofounder who owns the build; the same rhythm decides how much of their time sales can take.",
        },
        { kind: "scenario", scenario: "aw12-s3" },
        {
          kind: "question",
          question: {
            id: "aw12-l06-p1",
            type: "short",
            prompt: md`Write Afterwave's founder-led selling playbook page (one page) for the next two quarters. Include: (1) a credibility map for Ismail, Yusuf and yourself, with the segments and conversations each leads; (2) the boundary rules for former and current employers; (3) the role split by deal stage; (4) a technical load calculation with your cap and pilot sequencing rule; (5) a design-partner programme (number, selection criteria, give and get, reference rung). Use only the stated venture facts; no invented customers.`,
            rubric: [
              "Credibility map uses only the stated backgrounds (drive unit validation, test systems at Signify, inverter test and reliability) and maps them to specific segments and conversations.",
              "Boundary rules cover confidential methods and data, implied endorsement, and checking current employment terms (outside activity, IP, conflicts).",
              "Role split assigns process, business case and commercial questions to the CEO, deep dives and method reviews to cofounders, by stage.",
              "Load is computed with the formula against a stated cap, with a concrete pilot sequencing rule.",
              "Design-partner programme states number, selection criteria tied to the beachhead, give and get, and a contracted reference rung.",
              "No invented customers, endorsements or results; numbers labelled illustrative.",
            ],
            modelAnswer: md`**Founder-led selling playbook (illustrative numbers).**

**Credibility map:** Ismail leads validation-method conversations and test systems deep dives (release gates, what to retest, rig data infrastructure) in actuator labs, drives makers and e-drive departments. Yusuf leads power-stage and inverter deep dives, reliability and life-test discussions, and HIL questions. I lead first meetings, discovery, business case, security and procurement, and all price and roadmap questions.

**Boundary:** we state where we worked and our roles; we never describe a former employer's methods, data, tools or results, never imply a former employer uses or endorses Afterwave. Ismail's current employment terms (outside activity, IP assignment, conflicts) are reviewed with counsel before he joins customer calls or approaches companies in his employer's sector; until then he works on product questions only, outside working hours as his contract allows.

**Role split:** first meeting, CEO; discovery, CEO with cofounder implication questions; deep dive and method review, cofounder leads; pilot scoping, joint; security review, CEO with cofounder on architecture; decision and negotiation, CEO with cofounder presenting results.

**Load:** cap 20 % of technical capacity. Illustrative: 4 early deals at 1.5 h and 1 pilot at 8 h give $14/90 = 16\%$. Rule: never two pilots in install or backtest at once; a second pilot starts only when the first is in gated mode.

**Design partners:** 3 humanoid or robotics actuator labs (beachhead), chosen for weekly firmware releases, 12+ months of digital history and an economic buyer with a budget line. Give: paid subscription at 40 % off for 12 months, monthly product review with a named engineer, data access, two private reference calls a year and one anonymised case study. Get: early access, roadmap review, price lock for year 2, founder access.`,
            explanation: md`The playbook deploys scarce technical credibility deliberately, protects the build, and makes references a contracted output.`,
            concepts: ["aw12.credibility-mapping", "aw12.confidentiality-boundary", "aw12.deal-role-split", "aw12.cofounder-load", "aw12.design-partner", "aw12.reference-ladder"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf, before his first customer deep dive, how to use his background so it builds trust and never creates a problem.",
          keyPoints: [
            "State the fact of his experience once; let the quality of his questions carry the credibility.",
            "Talk about common problems in inverter test and reliability, not about a former employer's methods, data or results.",
            "Never imply a former employer uses or endorses Afterwave.",
            "Route price, roadmap and commitment questions to the CEO.",
            "Record open items and send written answers after the call.",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "aw12-l06-q1",
      type: "numeric",
      prompt: md`Six early deals at 1.5 h/week each and one pilot at 10 h/week. Two technical cofounders at 45 h/week. What is the sales load $u$ (%)?`,
      answer: 21.1,
      tolerance: { abs: 0.2 },
      unit: "%",
      explanation: md`$\sum h = 9 + 10 = 19$; $u = 19/90 = 0.211$, i.e. 21.1 %, just above a 20 % cap.`,
      concepts: ["aw12.cofounder-load"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw12-l06-q2",
      type: "mcq",
      prompt: "A prospect asks Yusuf: 'How did Tesla qualify inverter firmware?' What is the right answer?",
      options: [
        "Describe the process in detail to build credibility",
        "Say he cannot discuss a former employer's internal methods, then discuss common approaches in inverter test and ask how the prospect does it today",
        "Refuse to talk about inverters",
        "Say Tesla uses Afterwave",
      ],
      answer: 1,
      explanation: md`Respect the confidentiality boundary, then turn it into discovery. Buyers respect a founder who protects a former employer's confidences: it signals he will protect theirs.`,
      concepts: ["aw12.confidentiality-boundary"],
      difficulty: 1,
    },
    {
      id: "aw12-l06-q3",
      type: "multi",
      prompt: "What should a design partner give Afterwave? (Select all that apply.)",
      options: [
        "A paid, possibly discounted, contract",
        "Data access for the pilot and a named engineer for feedback",
        "A reference at a contracted rung of the ladder",
        "Exclusive ownership of features built for them",
      ],
      answer: [0, 1, 2],
      explanation: md`Design partners pay, engage and refer. Partner-owned features fragment the product.`,
      concepts: ["aw12.design-partner"],
      difficulty: 1,
    },
    {
      id: "aw12-l06-q4",
      type: "order",
      prompt: "Order the reference ladder from the easiest for a test organisation to give to the hardest.",
      items: ["Private reference call", "Anonymised case study", "Named quote", "Logo", "Public case study or joint talk"],
      explanation: md`Most test organisations give the first two; negotiate the rung in the agreement.`,
      concepts: ["aw12.reference-ladder"],
      difficulty: 1,
    },
    {
      id: "aw12-l06-q5",
      type: "decision",
      prompt: md`Illustrative. In a deep dive, the prospect's test systems lead asks Ismail: "Could Ripple support our in-house sequencer by June, and would you give us a discount for being early?"`,
      options: [
        { text: "Ismail commits to June and a 30 % discount to keep momentum.", score: 0, feedback: "An engineer cornered into roadmap and price commitments creates obligations the company may not meet." },
        { text: "Ismail answers the technical part (what integration with their sequencer requires and how long it would take to scope) and hands the date and price to the CEO, who records it as an open item with a written answer by Friday.", score: 1, feedback: "Uses Ismail's credibility on the technical question and keeps commercial commitments with the CEO." },
        { text: "Ismail says he cannot answer anything.", score: 0.3, feedback: "Wastes the credibility you brought him for." },
      ],
      explanation: md`Technical questions to the cofounder; price, roadmap and commitments to the CEO, in writing.`,
      concepts: ["aw12.deal-role-split"],
      difficulty: 2,
    },
    {
      id: "aw12-l06-q6",
      type: "mcq",
      prompt: "Why must a cofounder who is still employed elsewhere check his employment contract before taking Afterwave customer calls?",
      options: [
        "It is a formality with no consequences",
        "Outside-activity, IP-assignment and conflict clauses can restrict the work or give the employer a claim on IP, which investors will examine in due diligence",
        "Because customers will ask for it",
        "Because it changes the price",
      ],
      answer: 1,
      explanation: md`Clean IP and permitted activity are preconditions for selling and for fundraising.`,
      concepts: ["aw12.confidentiality-boundary"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "aw12-l06-f1", front: "Credibility mapping", back: "Ismail: validation method and test systems. Yusuf: inverter test and reliability. CEO: process, business case, terms. State the fact once; let the questions show the expertise.", concepts: ["aw12.credibility-mapping"] },
    { id: "aw12-l06-f2", front: "The boundary", back: "Say where you worked and the kind of work; never a former employer's methods, data or results, never implied endorsement; check current employment terms.", concepts: ["aw12.confidentiality-boundary"] },
    { id: "aw12-l06-f3", front: "Who answers price and roadmap?", back: "Always the CEO, in writing; cofounders answer technical questions.", concepts: ["aw12.deal-role-split"] },
    { id: "aw12-l06-f4", front: "Cofounder load", back: md`$u = \sum h_j/(N_c H_w)$; 5 early deals and 2 pilots give 26 %; cap about 20 %; sequence pilots.`, concepts: ["aw12.cofounder-load"] },
    { id: "aw12-l06-f5", front: "Design partner give and get", back: "Give: paid contract, data access, named engineer, contracted reference. Get: early access, roadmap review, discount or price lock, founder access.", concepts: ["aw12.design-partner"] },
    { id: "aw12-l06-f6", front: "Reference ladder", back: "Private call, anonymised case study, named quote, logo, public case study or talk. Negotiate the rung up front.", concepts: ["aw12.reference-ladder"] },
  ],
  scenarios: [
    {
      id: "aw12-s3",
      title: "The deep dive that turns to a former employer",
      context: md`Illustrative. Yusuf is leading a technical deep dive with the inverter test team of an e-drive supplier. Twenty minutes in, their reliability lead says: "You did inverter reliability at Tesla. What was their thermal cycling profile and how many cycles did they run before releasing firmware?"`,
      start: "a",
      concepts: ["aw12.confidentiality-boundary", "aw12.credibility-mapping", "aw12.deal-role-split"],
      nodes: {
        a: {
          md: md`How should Yusuf respond?`,
          choices: [
            { text: "Give the numbers he remembers: it will impress them.", score: 0, feedback: "Discloses a former employer's confidential information, exposes Yusuf and Afterwave, and tells the buyer their data would not be safe either." },
            { text: "Say he cannot share a former employer's internal test profiles, then explain the general considerations (failure mechanisms, acceleration models, what drives cycle counts) and ask how they set their own profile today.", score: 10, feedback: "Protects the boundary, shows real expertise and turns the question into discovery.", next: "b" },
            { text: "Change the subject.", score: 3, feedback: "Avoids the risk but loses a chance to show expertise and learn.", next: "b" },
          ],
        },
        b: {
          md: md`The reliability lead nods: "Fair. Our problem is that every firmware change restarts a two-week thermal cycling run." You are on the call. What do you do?`,
          choices: [
            { text: "Let Yusuf explore the technical implications (which firmware changes can affect thermal behaviour, how often a restart was unnecessary), and note the numbers for the business case; after the call, send a written summary with the open items and propose a backtest on their change history.", score: 10, feedback: "Cofounder leads the technical exploration; CEO captures the business case and owns the follow-up." },
            { text: "Jump in with pricing for a pilot.", score: 2, feedback: "Premature; you interrupt the most valuable part of the call." },
          ],
        },
      },
    },
  ],
};

export default lesson;
