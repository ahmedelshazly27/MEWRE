import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz12-l01",
  title: "Build, partner or resell: a decision framework with economics, applied to Mizan's four product lines",
  summary:
    "The three ways to put a product in front of a Gulf buyer (build it, partner with its maker, or resell it) and the four variables that decide between them: margin, control, speed and risk. The break-even volume between building and partnering, the cost of arriving late, risk-adjusted value, and the result applied to soiling analytics, PPC/EMS, BESS and cleaning robots.",
  minutes: 75,
  objectives: [
    "You can define build, partner (integrate, white-label, co-develop) and resell (distribute, act as agent, refer) and say what each gives up.",
    "You can compute gross margin, contribution per MW, the build-versus-partner break-even volume and the cost of a delay.",
    "You can name the control points that decide who owns the customer and the data.",
    "You can place soiling analytics, PPC/EMS, BESS and cleaning robots on a build, partner or resell map and defend the choice.",
    "You can write a one-page build, partner or resell memo for one Mizan product line.",
  ],
  concepts: [
    {
      id: "mz12.build-partner-resell",
      name: "Build, partner or resell",
      description:
        "Three sourcing modes for each product line. Build: Mizan owns the IP, carries the fixed cost and keeps most of the margin. Partner: a vendor's product is integrated, co-branded or white-labelled under a revenue share. Resell: Mizan buys and resells (distributor) or earns a commission (agent) on someone else's product. Margin and control fall, and speed rises, from build to resell.",
      competency: "mz-business",
      related: ["fc03.partner-economics", "fc03.gtm-motion"],
    },
    {
      id: "mz12.control-points",
      name: "Control points",
      description:
        "The few assets that decide who captures value in a line: the customer relationship and contract, the plant data and its history, the decision logic (the IP), the brand on the screen, and the service people on site. Partner on anything except the control points you need for your strategy.",
      competency: "mz-business",
      related: ["mz12.build-partner-resell", "fc08.data-rights"],
    },
    {
      id: "mz12.breakeven-volume",
      name: "Build versus partner break-even volume",
      description:
        "Volume at which building and partnering give equal profit: Q* = (F_b - F_p) / (u_b - u_p), with F the annual fixed cost and u the contribution per unit under each mode. Below Q* partnering earns more; above it building does.",
      competency: "mz-business",
      related: ["mz12.build-partner-resell", "fc06.contribution-margin"],
    },
    {
      id: "mz12.delay-cost",
      name: "Cost of arriving late",
      description:
        "Contribution forgone while a build is not ready: L = u Q t_d, plus the harder-to-price loss of the reference customer and the evidence that a first deployment creates. Speed is the main reason to partner first.",
      competency: "mz-business",
      related: ["mz12.breakeven-volume"],
    },
    {
      id: "mz12.line-roles",
      name: "Role per product line",
      description:
        "Mizan's lines need different modes: build the soiling analytics and stow coupling (the differentiator); partner on PPC/EMS (grid-code critical, mature vendors); resell or integrate BESS and cleaning robots (capital-heavy hardware) while owning the service and the data layer around them.",
      competency: "mz-business",
      related: ["mz12.build-partner-resell", "mz05.vendor-white-space"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Three modes, four variables",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's thesis has two halves: a product company in soiling analytics and plant control, and a distribution business bringing software and turnkey hardware (controls, PPC/EMS, BESS, cleaning robots, possibly from Chinese integrators) to Kuwait. Those halves pull in different directions. Every line you build costs engineering time you do not have; every line you resell earns thin margins and can make investors file Mizan under "trading company". You will be asked to justify each choice by investors, by KISR and by every vendor who wants you as its channel, so you need the economics, not a preference.`,
        },
        {
          kind: "xref",
          to: "fc03-l04",
          note: "Founder Core covers channels and partner economics in general (resellers trade margin for access and lower CAC). This lesson adds the build side and applies both to Mizan's lines.",
        },
        {
          kind: "md",
          md: md`### The three modes and their sub-forms

| Mode | Sub-form | What Mizan owns | What Mizan gives up | Typical Mizan gross margin (illustrative ranges) |
|---|---|---|---|---|
| **Build** | In-house product | IP, roadmap, data model, brand, customer | Fixed engineering cost, time, technical risk | 70 to 90 % on software once built |
| **Partner** | Integrate a vendor component in a Mizan product | Customer, integration, brand | Part of the margin, dependency on the vendor roadmap | 40 to 70 % |
| | White-label (vendor product under Mizan's brand) | Customer, brand, front-line support | Roadmap, often the data pipeline | 30 to 60 % |
| | Co-develop (joint feature, shared IP) | Shared IP, customer | Freedom to switch, negotiation effort | Depends on the split |
| **Resell** | Distributor or value-added reseller (buys and resells) | Customer contract, local service | Roadmap, IP, most of the margin; carries stock and credit risk | 10 to 30 % on hardware, 20 to 40 % on software |
| | Commercial agent (commission on vendor sales) | A commission and a relationship | The contract (vendor signs with the customer) | 3 to 10 % commission |
| | Referral | A fee | Almost everything | One-off fee |

The ranges are rules of thumb for discussion, not market data: every vendor negotiation sets its own numbers.

### The four variables

1. **Margin.** Gross margin $GM = (P - C)/P$. Software you built has low marginal cost; resold hardware carries the vendor's price as cost of goods.
2. **Control.** Who owns the customer contract, the plant data, the decision logic, the brand on the screen and the people on site (the control points below).
3. **Speed.** Months until the first paying deployment. A partner's product exists today; your build may take a year, and in a market with few large tenders a year can mean a missed cycle.
4. **Risk.** Technical risk (will the build work?), counterparty risk (will the partner survive, stay, or go direct?), warranty and liability risk (whose name is on the failure?) and regulatory risk (is the mode even allowed in public procurement? see lesson 2).`,
        },
        { kind: "equation", formula: "mz12-gross-margin" },
        {
          kind: "md",
          md: md`### The break-even volume between building and partnering

Write the annual profit of a line under each mode as contribution times volume minus fixed cost: $\Pi = uQ - F$, where $u = P - c$ is contribution per unit (per MW per year for a software subscription) and $F$ is the annual fixed cost of that mode (an engineering team for a build, an account manager for a partnership). Setting $\Pi_b = \Pi_p$:`,
        },
        { kind: "equation", formula: "mz12-build-breakeven" },
        {
          kind: "md",
          md: md`Read it like an engineer: building swaps a high fixed cost for a high unit contribution. Below $Q^*$ the partner's lower fixed cost wins; above it your higher contribution wins. Two corrections make it honest:

- **Delay.** A build that is not ready earns nothing. The contribution forgone while you wait is:`,
        },
        { kind: "equation", formula: "mz12-delay-cost" },
        {
          kind: "md",
          md: md`- **Probability of success.** A build may not work, or may work later than planned. Compare modes on risk-adjusted value:`,
        },
        { kind: "equation", formula: "mz12-risk-adjusted-value" },
        {
          kind: "md",
          md: md`### Control points: what you never give away

Partnering is safe when you keep the control points your strategy needs and give away the rest.

| Control point | Why it matters | Mizan's default |
|---|---|---|
| Customer contract | Whoever signs the contract owns renewal, upsell and the procurement record | Keep: Mizan signs with the owner or O&M contractor |
| Plant data and history | Soiling inference improves with years of site data; the history is a moat (mz03) | Keep access and history in Mizan's platform, with the owner's licence (fc08-l07) |
| Decision logic (IP) | The cleaning trigger and stow coupling are the product | Build |
| Brand on the screen | Decides who the operator calls and credits | Mizan brand where possible |
| People on site | Field service builds trust and local content | Mizan or a Mizan subcontractor |

### Applying it to Mizan's four lines`,
        },
        {
          kind: "matrix",
          title: "Where each line sits",
          xAxis: ["Mizan has little edge", "Mizan has a real edge"],
          yAxis: ["Not a control point", "Strategic control point"],
          cells: [
            { label: "Partner with tight terms", detail: "PPC/EMS: grid-code critical and close to the plant control layer, but mature vendors exist. Integrate a certified controller; build the supervisory functions above it (stow, cleaning-aware setpoints)." },
            { label: "Build", detail: "Soiling analytics, the cleaning decision and the stow coupling. KISR methodology partnership, Kuwait dust data, IEC 61724 baseline. This is the company." },
            { label: "Resell or integrate", detail: "BESS hardware and cleaning robots: capital-heavy, made at scale by others (often Chinese). Earn on integration, service and the data layer; avoid stock risk." },
            { label: "Open or license", detail: "Kuwait dust and soiling atlas, electricity dataset, energy systems toolkit: give away to build credibility and pull (lesson 5)." },
          ],
          caption: "Vertical: does the asset decide who captures value? Horizontal: does Mizan have a defensible edge in making it?",
        },
        {
          kind: "md",
          md: md`| Line | Recommended mode | Margin | Control | Speed | Main risk |
|---|---|---|---|---|---|
| **Soiling analytics and cleaning optimisation** | Build the core; consider a partner (for example SwishOS) only to accelerate or cover gaps (lesson 4) | High once built | Full | Slow (methodology, validation with KISR) | Technical: no standard method exists, as KISR confirmed |
| **Stow and tracker control functions** | Build the logic, partner with the tracker vendor for access (mz05-l05) | High | Shared with vendor | Slow (vendor non-objection, paired trial) | Warranty and liability |
| **PPC/EMS** | Partner: integrate or resell a certified controller, add Mizan supervisory functions | Medium | Shared | Fast | Grid-code compliance and the vendor's support quality |
| **BESS** | Resell or act as local integrator for an established integrator; own commissioning support, EMS integration and O&M | Low on hardware, medium on service | Low on hardware | Fast to quote, slow to deliver | Warranty backstop, fire safety, cash tied up (lesson 3) |
| **Cleaning robots** | Distribute (buy and resell) or act as integrator, plus a cleaning-optimisation service | Low on hardware, medium on service and analytics | Medium if Mizan runs the fleet | Fast | Vendor after-sales, spares, desert reliability |

**The strategic rule.** Hardware resale funds and opens doors; the built software is what the company is valued on. Keep the two visible in the accounts (separate gross margins), and make every resold system feed data into the Mizan platform, so each hardware deal strengthens the software line instead of distracting from it.`,
        },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { price: 1500, grossMargin: 0.85, cac: 25000, churn: 0.01 },
          caption: "Illustrative: a built analytics subscription at 85 % gross margin. Drop the gross margin to 0.45 (white-labelled partner product) and to 0.15 (resold hardware) and watch LTV and payback move. Same customer, three businesses.",
        },
        { kind: "sources", refs: ["mz12-r1", "mz12-r9", "mz12-r10"] },
      ],
    },
    {
      layer: "applied",
      title: "Running the numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Soiling analytics: build in-house or partner first?",
          given: md`All numbers illustrative. Mizan prices soiling analytics at $P$ = USD 1,500 per MWp per year to owners and O&M contractors.
- **Build:** a small data team, cloud and maintenance cost $F_b$ = USD 400,000 per year; variable cost (compute, support) $c_b$ = USD 100 per MWp per year; ready in 12 months.
- **Partner:** the partner takes 50 % of the price (USD 750); Mizan's local onboarding and support cost USD 150 per MWp per year; fixed cost (share of an account manager) $F_p$ = USD 80,000 per year; ready in 2 months.
- Pipeline: 300 MWp under contract in year 1 if Mizan can deliver from month 2.`,
          steps: [
            { md: md`**Contribution per MWp.** Build: $u_b = 1{,}500 - 100 = 1{,}400$. Partner: $u_p = 1{,}500 - 750 - 150 = 600$ USD per MWp per year.` },
            { md: md`**Break-even volume.** $Q^* = (400{,}000 - 80{,}000)/(1{,}400 - 600) = 320{,}000/800 = 400$ MWp.` },
            { md: md`**Year-1 comparison at 300 MWp.** Partner: $600 \times 300 - 80{,}000 =$ USD 100,000. Build, if it were ready on day 1: $1{,}400 \times 300 - 400{,}000 =$ USD 20,000. Below $Q^*$ the partner wins even before delay.` },
            { md: md`**Delay.** The build is ready after 12 months, so year-1 build revenue is near zero and the full fixed cost is spent: about USD -400,000. Forgone contribution against the partner path: $L = u_p Q t_d = 600 \times 300 \times 10/12 =$ USD 150,000 (10 months of the partner's earning window).` },
            { md: md`**Year 3 at 1,000 MWp (Gulf expansion).** Build: $1{,}400 \times 1{,}000 - 400{,}000 =$ USD 1.0 m. Partner: $600 \times 1{,}000 - 80{,}000 =$ USD 520,000. Above $Q^*$ the build earns almost twice as much.` },
            { md: md`**Gross margins.** Build at 1,000 MWp: $(1{,}500 - 100)/1{,}500 = 93\%$ before fixed costs. Partner: $(1{,}500 - 900)/1{,}500 = 40\%$.` },
          ],
          result: md`The economics say: partner (or resell) to win the first deployments and learn fast, build the core in parallel, and switch once the contracted base passes about 400 MWp. That only works if the partnership leaves Mizan the customer contract and the plant data history, and allows a clean exit (lesson 4). Investors will value the company on the built line, so the plan must show the switch.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Cleaning robots: what one resale deal is really worth",
          given: md`Illustrative. A 100 MW tracker plant. Robot density taken from Noor Abu Dhabi (1,430 robots for 1.18 GW, research brief), about 1.21 robots per MW, so 121 robots. Mizan buys at a landed cost of USD 4,000 per robot and sells installed at USD 5,000. Installation and commissioning cost Mizan USD 300 per robot; Mizan reserves 3 % of the selling price for warranty work it may not recover from the vendor.`,
          steps: [
            {
              md: md`**Gross profit per robot.** $5{,}000 - 4{,}000 - 300 - 0.03 \times 5{,}000 = 5{,}000 - 4{,}000 - 300 - 150 =$ USD 550.`,
              hidden: true,
              check: { prompt: "Gross profit per robot (USD)", answer: 550, tolerance: { abs: 1 } },
            },
            {
              md: md`**Gross margin.** $550/5{,}000 = 11\%$.`,
              hidden: true,
              check: { prompt: "Gross margin (%)", answer: 11, tolerance: { abs: 0.1 } },
            },
            {
              md: md`**Deal gross profit.** $121 \times 550 =$ USD 66,550 on revenue of USD 605,000.`,
              hidden: true,
              check: { prompt: "Gross profit for the plant (USD)", answer: 66550, tolerance: { abs: 50 } },
            },
            {
              md: md`**What changes the picture.** A 5-year fleet O&M and cleaning-optimisation contract at an illustrative USD 1,200 per MW per year at 50 % margin adds $1{,}200 \times 100 \times 0.5 \times 5 =$ USD 300,000 of gross profit, more than four times the hardware profit, and puts Mizan's software on the plant.`,
            },
          ],
          result: md`Hardware resale alone is an 11 % business with stock, warranty and cash risk. Its value to Mizan is the door it opens: the service contract and the data. Price and negotiate the hardware deal as the entry ticket to the recurring line.`,
        },
        {
          kind: "question",
          question: {
            id: "mz12-l01-p1",
            type: "numeric",
            prompt: md`A PPC/EMS line: building costs USD 600,000 per year in fixed cost with contribution USD 900 per MW per year; partnering costs USD 100,000 per year with contribution USD 400 per MW per year. What is the break-even volume in MW?`,
            answer: 1000,
            tolerance: { abs: 1 },
            unit: "MW",
            explanation: md`$Q^* = (600{,}000 - 100{,}000)/(900 - 400) = 500{,}000/500 = 1{,}000$ MW. Kuwait's operating and near-term hybrid fleet that would buy a third-party PPC is far below that, which is one reason to partner on PPC/EMS.`,
            concepts: ["mz12.breakeven-volume"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Making the call in practice",
      blocks: [
        {
          kind: "xref",
          to: "fc06-l03",
          note: "Founder Core covers hardware gross margin, inventory and the cash conversion cycle. Resold BESS and robots bring all of those into Mizan's accounts.",
        },
        {
          kind: "xref",
          to: "mz05-l05",
          note: "The stow and tracker control line is a build-with-vendor-access case; its product ladder and vendor risks are in mz05.",
        },
        {
          kind: "md",
          md: md`**Who decides and with what.** You and Omar Abu Harb make the call per line, with a one-page memo per decision: the mode, the four variables, the break-even volume, the control points kept, the exit route and the trigger to revisit (for example "switch from partner to build when contracted base passes 400 MWp or the partner refuses data portability").

**What investors ask.** "Are you a software company or a trading company?" Answer with the split: built software is the company and gets the valuation; hardware and partner revenue is the distribution engine that buys access and data. Report gross margin per line, never blended.

**What vendors ask.** "Will you be our exclusive distributor?" Before answering, know which mode the line needs. Exclusivity is worth something only for lines where you resell; for lines you will build, an exclusive distribution deal with a competitor becomes a conflict.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Blended margins.** Hardware revenue makes the top line look big and the gross margin look like a contractor's; investors discount the whole company.
- **Partnering away a control point.** A white-label deal where the partner holds the plant data and the customer login: after two years you own a brand and nothing else.
- **Building what is commodity.** Writing your own PPC to "own the stack" burns a year and a grid-code certification you did not need.
- **Distributor drift.** Resale deals arrive faster than software deals, so the team drifts into trading. Set a cap on founder time spent on resale.
- **Ignoring the exit.** No termination, transition or data-portability terms, so switching from partner to build is a lawsuit instead of a project.`,
        },
        {
          kind: "checklist",
          title: "Before choosing a mode for a line",
          items: [
            "Gross margin and contribution per unit computed under each mode",
            "Break-even volume compared with a realistic 3-year contracted base",
            "Delay cost of the build path estimated in months and money",
            "Control points listed, with which ones the mode keeps",
            "Exit route defined: what happens to customers, data and support if the partner relationship ends",
            "Public procurement check: is this mode (agent, distributor, prime) allowed for the buyer? (lesson 2)",
          ],
        },
        {
          kind: "ask",
          title: "Ask yourself and your cofounder",
          items: [
            "Is this line part of what we want to be valued for in five years, or a way to get there?",
            "If the partner went direct to our customers tomorrow, what would we still own?",
            "What is the smallest build that keeps the control point, while the partner covers the rest?",
            "Which of our lines does this vendor also compete with?",
          ],
        },
        { kind: "scenario", scenario: "mz12-s1" },
        {
          kind: "question",
          question: {
            id: "mz12-l01-p2",
            type: "short",
            prompt: md`Write a one-page build, partner or resell memo for **one** Mizan line (soiling analytics, PPC/EMS, BESS or cleaning robots). Use labelled illustrative numbers. It should be something you could hand to Omar Abu Harb and an investor.`,
            explanation: md`A good memo makes the mode decision with numbers (margin, contribution, break-even, delay) and with strategy (control points kept, exit route, trigger to revisit), without inventing traction.`,
            rubric: [
              "States the recommended mode (with sub-form) and the alternative modes considered",
              "Quantifies margin and contribution per unit and computes a break-even volume or equivalent comparison with labelled illustrative numbers",
              "Addresses speed (delay cost or time to first deployment) and the main risks (technical, counterparty, warranty, regulatory)",
              "Names the control points kept and those given away",
              "Defines the exit route and a trigger to revisit the decision",
              "Does not invent customers, partners or traction for Mizan",
            ],
            modelAnswer: md`**Line: cleaning robots for Kuwait utility PV. Recommendation: distribute (buy and resell) one robot vendor's products as a value-added reseller, bundled with a Mizan fleet O&M and cleaning-optimisation service; do not build robots.** Alternatives considered: build (no edge, years of hardware development: rejected), commercial agent on commission (fast, but the vendor holds the contract and Mizan never gets the service or data: rejected), referral (rejected). **Economics (illustrative).** 100 MW tracker plant, about 121 robots (Noor Abu Dhabi density). Landed cost USD 4,000, price installed USD 5,000, installation USD 300, warranty reserve 3 %: USD 550 gross profit per robot, 11 % margin, USD 66,550 per plant. Bundled 5-year O&M and optimisation at USD 1,200 per MW per year at 50 % margin: USD 300,000 gross profit. The service is the business; hardware is the entry ticket. **Speed.** Vendor products exist; first quote in weeks, delivery 4 to 6 months after order. **Risks.** Desert reliability and after-sales (mitigate: reference visits at Gulf plants, spares stock on consignment, vendor engineer on call), warranty backstop if the vendor fails (vendor parent guarantee or bank guarantee), cash tied up (LC terms, lesson 3), and procurement rules if the buyer is a public entity (Mizan bids as the contracting party, not as an agent, and confirms with counsel). **Control points kept.** Customer contract, fleet data feed into the Mizan platform, field service team. Given away: robot IP and roadmap. **Exit and trigger.** Non-exclusive or performance-based exclusivity with a 12-month notice and transition clause; spares and software support guaranteed 7 years after last sale. Revisit if field availability falls below the contracted level for two quarters, or if the vendor sells direct in Kuwait.`,
            concepts: ["mz12.build-partner-resell", "mz12.breakeven-volume", "mz12.control-points", "mz12.line-roles"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz12-l01-q1",
      type: "mcq",
      prompt: md`Which statement about the break-even volume $Q^* = (F_b - F_p)/(u_b - u_p)$ is correct?`,
      options: [
        "Below Q* building is more profitable than partnering",
        "Below Q* partnering is more profitable, because its fixed cost is lower",
        "Q* does not depend on the partner's revenue share",
        "Q* already includes the cost of the build's delay",
      ],
      answer: 1,
      explanation: md`Building swaps a high fixed cost for a higher unit contribution, so it wins only above $Q^*$. The partner's share lowers $u_p$ and so moves $Q^*$. Delay is a separate correction.`,
      concepts: ["mz12.breakeven-volume"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz12-l01-q2",
      type: "numeric",
      prompt: md`A white-labelled analytics product sells at USD 1,500 per MW per year. The partner takes USD 750 and Mizan's local support costs USD 150. What is Mizan's gross margin in percent?`,
      answer: 40,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$GM = (1{,}500 - 900)/1{,}500 = 40\%$.`,
      concepts: ["mz12.build-partner-resell"],
      difficulty: 1,
    },
    {
      id: "mz12-l01-q3",
      type: "multi",
      prompt: md`Which are control points Mizan should keep even when it partners on a line?`,
      options: [
        "The customer contract",
        "Access to the plant data history",
        "The vendor's manufacturing know-how",
        "The decision logic for cleaning and stow",
        "The vendor's brand",
      ],
      answer: [0, 1, 3],
      explanation: md`Contract, data history and decision logic decide who captures value. Manufacturing know-how and the vendor's brand are what partnering buys, not what Mizan needs to own.`,
      concepts: ["mz12.control-points"],
      difficulty: 2,
    },
    {
      id: "mz12-l01-q4",
      type: "numeric",
      prompt: md`A build will be ready 9 months later than a partner solution. The partner path would earn USD 600 per MW per year on 200 MW during that time. What contribution is forgone (USD)?`,
      answer: 90000,
      tolerance: { abs: 100 },
      unit: "USD",
      explanation: md`$L = u Q t_d = 600 \times 200 \times 9/12 =$ USD 90,000, before counting the lost reference customer.`,
      concepts: ["mz12.delay-cost"],
      difficulty: 2,
    },
    {
      id: "mz12-l01-q5",
      type: "mcq",
      prompt: md`Which mode best fits PPC/EMS for Mizan at its current stage?`,
      options: [
        "Build a controller in-house to own the full stack",
        "Partner: integrate a certified controller and build supervisory functions above it",
        "Refer the customer to a vendor for a one-off fee",
        "Avoid the line entirely",
      ],
      answer: 1,
      explanation: md`PPC/EMS is grid-code critical with mature vendors, so building the controller is slow and risky with no edge. Integrating a certified one keeps Mizan in the control layer and lets it add stow and cleaning-aware functions.`,
      concepts: ["mz12.line-roles"],
      difficulty: 2,
    },
    {
      id: "mz12-l01-q6",
      type: "decision",
      prompt: md`An investor says: "Most of your projected revenue is resold robots and BESS. You look like a trading company." What do you answer?`,
      options: [
        { text: "Agree and lower the valuation ask.", score: 0.1, feedback: "Concedes the framing without showing the structure of the business." },
        { text: "Split the plan: built software (analytics, cleaning and stow decisions) at high gross margin is the company; resale is a distribution engine that opens plants and feeds data into the platform. Show gross margin per line and the attach rate of software to hardware.", score: 1, feedback: "Right: separate the lines, show which one carries the value and how resale feeds it." },
        { text: "Say hardware margins in Kuwait are much higher than elsewhere.", score: 0.2, feedback: "Unsupported, and it misses the point about what the company is valued on." },
      ],
      explanation: md`Investors value gross margin and defensibility. Showing the lines separately, with resale as an acquisition channel for the software, answers the question.`,
      concepts: ["mz12.build-partner-resell", "mz12.line-roles"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz12-l01-f1", front: "Three sourcing modes", back: "Build (own IP, high fixed cost, high margin), partner (integrate, white-label, co-develop), resell (distributor, agent, referral). Margin and control fall, speed rises, from build to resell.", concepts: ["mz12.build-partner-resell"] },
    { id: "mz12-l01-f2", front: "Build vs partner break-even", back: md`$Q^* = (F_b - F_p)/(u_b - u_p)$. Below it partner, above it build.`, concepts: ["mz12.breakeven-volume"] },
    { id: "mz12-l01-f3", front: "Delay cost", back: md`$L = uQt_d$: contribution forgone while the build is not ready, plus the lost first reference.`, concepts: ["mz12.delay-cost"] },
    { id: "mz12-l01-f4", front: "Five control points", back: "Customer contract, plant data history, decision logic, brand on the screen, people on site.", concepts: ["mz12.control-points"] },
    { id: "mz12-l01-f5", front: "Mizan line roles", back: "Build soiling analytics and stow coupling; partner on PPC/EMS; resell or integrate BESS and robots and own the service and data layer.", concepts: ["mz12.line-roles"] },
    { id: "mz12-l01-f6", front: "Why report margin per line", back: "Blended margins make a software company look like a trading company; investors value the built line.", concepts: ["mz12.line-roles"] },
  ],
  scenarios: [
    {
      id: "mz12-s1",
      title: "The robot vendor offers exclusivity",
      context: md`Illustrative. A cleaning-robot manufacturer with Gulf references offers Mizan exclusive distribution for Kuwait. Its terms: a minimum of 300 robots in year 1, Mizan buys at a 22 % discount off list, the vendor keeps the fleet software and cloud, and Mizan may not sell "competing cleaning products or services". No Kuwait plant has committed to robots yet.`,
      start: "a",
      concepts: ["mz12.build-partner-resell", "mz12.control-points", "mz12.line-roles"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Sign quickly: exclusivity is valuable and the vendor might go to a competitor.", next: "b", score: 1, feedback: "A 300-robot minimum with no committed plant is a stock and cash bet, and the non-compete may cover Mizan's own cleaning optimisation." },
            { text: "Map the terms against the control points: the non-compete clause could block Mizan's cleaning-optimisation software, and the vendor keeping the fleet data removes a control point. Counter before discussing minimums.", next: "c", score: 9, feedback: "Right: the clause that matters most is not the discount but what it does to the built line." },
            { text: "Decline: hardware is a distraction.", next: "b", score: 4, feedback: "Possibly right in the end, but it throws away a door-opener without testing whether the terms can be fixed." },
          ],
        },
        b: {
          md: md`Six months later, the consequences of that move are clear. Which lesson do you write in your decision journal?`,
          choices: [
            { text: "Test every partner term against what we build and the control points before talking price.", score: 6, feedback: "The general rule: margin is negotiable later; a clause that blocks your core product is not." },
            { text: "Never sign distribution deals.", score: 2, feedback: "Too broad: resale can be a useful channel on the right terms." },
          ],
        },
        c: {
          md: md`You propose: non-exclusive for 12 months converting to exclusive once Mizan reaches a robot threshold; minimums tied to signed plant orders; Mizan's analytics and optimisation explicitly excluded from the non-compete; fleet telemetry available to Mizan through an API under the plant owner's licence. The vendor accepts everything except the data API, which "is our IP". What now?`,
          choices: [
            { text: "Accept without the API.", score: 4, feedback: "Without fleet data, Mizan cannot close the loop between soiling inference and robot schedules. That was the reason to carry the line." },
            { text: "Narrow the ask: Mizan does not need the vendor's code, only read access to cleaning events, robot status and faults per row, and write access for schedules, which the plant owner already has a right to. Offer an NDA and an integration test on one block.", score: 10, feedback: "Separates the vendor's IP (its software) from the data the plant generates, which is what Mizan needs." },
            { text: "Threaten to switch vendor.", score: 3, feedback: "Premature: you have not yet found what they object to." },
          ],
        },
      },
    },
  ],
};

export default lesson;
