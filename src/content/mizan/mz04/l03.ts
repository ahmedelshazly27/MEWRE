import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz04-l03",
  title: "Cleaning technologies and their cost structures",
  summary:
    "Manual wet, semi-automated and robotic dry cleaning differ less in cost per year than in the shape of their costs: variable per cycle versus fixed capex. That shape decides how the square-root rule applies, which technology wins at which value of energy, and what water and logistics mean in the Kuwaiti desert.",
  minutes: 65,
  objectives: [
    "You can describe the main cleaning technologies used on Gulf utility PV and where each is deployed",
    "You can separate fixed and variable cleaning costs and explain why near-zero marginal cost pushes robots to daily cycles",
    "You can compare technologies on annualised cost at a given value of energy and compute a break-even robot capex",
    "You can list the water, logistics and module-warranty questions that decide a desert cleaning choice",
  ],
  concepts: [
    {
      id: "mz04.cleaning-technologies",
      name: "Cleaning technology families",
      description: "Manual wet (crews, water bowsers), semi-automated (tractor-mounted brushes, dry or low-water), robotic dry (row-mounted autonomous robots, daily) and portable semi-autonomous robots moved between rows.",
      competency: "mz-cleaning",
      related: ["m02.cleaning-strategy", "m12.cleaning-economics"],
    },
    {
      id: "mz04.cost-structure",
      name: "Fixed vs variable cleaning cost",
      description: "Manual cleaning is mostly variable cost per cycle; robots are mostly fixed capex with near-zero marginal cost per cycle. The square-root rule optimises frequency for the first; for the second the decision is whether to buy the fleet.",
      competency: "mz-cleaning",
      related: ["m10.capex-breakdown", "m10.opex-breakdown"],
    },
    {
      id: "mz04.robot-breakeven",
      name: "Break-even robot capex",
      description: "The fleet capex at which annualised robot cost (capex × CRF + O&M + residual loss) equals the manual optimum; it rises with the value of energy, so robots win more easily for the state than for a low-tariff IPP.",
      competency: "mz-cleaning",
      related: ["m10.crf"],
    },
    {
      id: "mz04.water-logistics",
      name: "Water and desert logistics",
      description: "Wet cleaning needs roughly 0.5 to 2 L of demineralised water per m² of glass per pass, trucked to remote sites; at 500 MWp that is thousands of m³ per pass, which drives cost and makes dry methods attractive in Kuwait.",
      competency: "mz-cleaning",
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Four ways to clean a desert plant",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Mizan's distribution thread is bringing turnkey hardware, including cleaning robots, to Kuwait, and its analytics product recommends when and how to clean. Both depend on understanding what each technology really costs, in what shape, and when it wins. Clients will compare a robot quote with their crew contract; you must be able to turn both into one annual number at the right value of energy, in front of them.`,
        },
        { kind: "xref", to: "m02-l05", note: "Track 0: soiling physics, desert design, cleaning methods and anti-soiling options from the plant designer's side." },
        {
          kind: "md",
          md: md`## The technology families

| Family | How it works | Typical frequency | Water | Gulf examples (research brief, snippet-level) |
|---|---|---|---|---|
| **Manual wet** | Crews with brushes or low-pressure lances, water from bowsers | Weekly to monthly | Yes, demineralised, roughly 0.5 to 2 L/m² per pass | Shagaya PV: monthly water cleaning (RSER 2020) |
| **Semi-automated** | Tractor or vehicle-mounted rotating brush driven along rows, dry or low-water | Every few days to fortnightly | None or little | Al Kharsaah, Qatar (800 MWp): every module once every 4 days |
| **Robotic dry, row-mounted** | Autonomous robot per row or row group, PV-charged battery, microfibre or brush, docks at row end; may transfer between rows | Daily (often at night) | None | Noor Abu Dhabi (1.18 GW): 1,430 waterless robots; Al Ajban (UAE): about 3,000 SUNPURE robots, daily |
| **Portable semi-autonomous** | Robot carried or driven between rows by a small crew (SolarCleano type) | Weekly to fortnightly | None or little | Marketed in 90+ countries (vendor claim) |

Vendors in the region include **Ecoppia** (waterless, fixed and tracker-mounted), **NOMADD** (Saudi, KAUST spin-off, waterless), **SUNPURE** (China, large Gulf orders), **Airtouch** (Israel, mostly India), **SolarCleano** (Luxembourg, portable) and Chinese suppliers such as LEAPTING. New GW-scale Gulf plants mostly install waterless robots on trackers; small legacy plants such as Shagaya Phase I still use water and trucks.

## The shape of the costs

The square-root rule assumed a cost $C$ per cycle and nothing else. Real technologies have two parts:

- **Variable cost per cycle** $C_v$: labour, water, fuel, consumables. Large for manual, moderate for semi-automated, close to zero for robots (electricity is from their own panel; brush wear scales slowly with cycles).
- **Fixed cost per year**: annualised capex $K \cdot \mathrm{CRF}$ plus fixed O&M $O$. Near zero for manual (crews are hired per job), moderate for tractors, dominant for robots.

Only the variable part enters the square-root rule. When $C_v \to 0$, $T^* = \sqrt{2C_v/(pE_ds)} \to 0$: clean as often as the machine allows, which for row robots is daily. The economic question changes from **how often** to **whether to buy the fleet**:`,
        },
        { kind: "equation", formula: "mz04-robot-annual-cost" },
        {
          kind: "md",
          md: md`Robots also change the loss term. With daily cycles the linear part is tiny ($s \times 1/2 = 0.2$ % at 0.4 %/day), but dry brushing does not remove dew-cemented dust, so a residual $r_0$ remains and may need occasional wet cleaning (lesson 4). The comparison is therefore:

$$J_{\text{manual}}^{*} = \sqrt{2\cdot365\,C_v\,pEs} + pE\,r_{0,\text{wet}} \quad\text{vs}\quad J_{\text{robot}} = K\,\mathrm{CRF} + O + pE\left(\tfrac{s}{2} + r_{0,\text{dry}}\right)$$

and the break-even capex follows directly:`,
        },
        { kind: "equation", formula: "mz04-breakeven-capex" },
        {
          kind: "matrix",
          title: "Which technology the economics favour",
          xAxis: ["Low value of energy (IPP tariff)", "High value of energy (state fuel value)"],
          yAxis: ["Low marginal cost per cycle (robots)", "High marginal cost per cycle (manual wet)"],
          cells: [
            { label: "Manual or semi-automated, monthly to fortnightly", detail: "Cheap energy does not justify many expensive cycles; the square-root rule applies cleanly." },
            { label: "Manual, but often; or switch technology", detail: "High value pushes the interval short; manual costs explode and robots start to win." },
            { label: "Robots only if capex is low", detail: "Daily cycles recover little extra value; the fleet must be cheap (large Chinese orders, low financing cost)." },
            { label: "Robots, daily", detail: "Each recovered MWh is worth a lot and the marginal cycle is nearly free." },
          ],
          caption: "Top row: high marginal cost per cycle; bottom row: low. Gulf IPPs buy robots despite low tariffs, which tells you their capex, labour, water and soiling numbers differ from the base case below.",
        },
        {
          kind: "md",
          md: md`## What the published numbers say (and do not)

- A Middle East test reported in PV-Tech: two robots cleaned 4.5 MW for about USD 18,000/yr against about USD 30,000/yr for manual truck cleaning, about **USD 4.0k vs 6.7k per MW per year**. Vendor-related, year not confirmed.
- UAE-type high-soiling plants are cleaned about **40 to 45 times a year**. If the test plant's manual crews cleaned that often, manual cost was about USD 150 to 170 per MW per cycle, which is the basis of the illustrative $C_v$ = USD 150/MWp used in this module.
- A 2026 vendor-oriented estimate quotes manual crews at about USD 40k/MW/yr, waterless robots about USD 4k and wet robots USD 8 to 15k: ten times the test's manual figure. Treat it as marketing until checked.
- **No published per-cleaning USD/MWp figure for Gulf IPPs** was found. Ilse et al. (2019) give regional cost ranges that should be extracted before use.
- Fleet density: Noor Abu Dhabi has about 0.83 MW per robot (1,180 MW / 1,430 robots, my arithmetic).`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Cost data are thin",
          md: md`Every cleaning cost in this lesson is either a snippet-level figure from the research brief (PV-Tech test, vendor estimates) or labelled illustrative. Before quoting any number to a client, get at least two current vendor quotes for robots delivered to Kuwait and one O&M contractor's per-cycle rate for manual wet cleaning, including water haulage.`,
        },
        { kind: "sources", refs: ["mz04-r14", "mz04-r15", "mz04-r13", "mz04-r16", "mz04-r17", "mz04-r18", "mz04-r19", "mz04-r20", "mz04-r21", "mz04-r1"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Manual, semi-automated or robots for 500 MWp",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Annual cost of three technologies at two values of energy",
          given: md`Lesson 1 plant (illustrative): $E = 10^6$ MWh/yr, $s = 0.4$ %/day. Discount rate 8 %, life 10 years, so $\mathrm{CRF} = 0.149$.
- **Manual wet:** $C_v$ = USD 75,000 per cycle, residual about 0.
- **Semi-automated:** $C_v$ = USD 40,000 per cycle, tractor fleet USD 1.5 m (annualised USD 0.224 m), residual 0.5 %.
- **Robots:** capex USD 25,000/MWp (USD 12.5 m, annualised USD 1.863 m), O&M USD 1,000/MWp/yr (USD 0.5 m), daily cycles, residual 1.0 %.
All costs illustrative. Values of energy: USD 15/MWh (IPP) and USD 85/MWh (national, LNG).`,
          steps: [
            { md: md`**Manual:** $J^* = \sqrt{2 \cdot 365 \cdot 75{,}000 \cdot p \cdot 10^6 \cdot 0.004}$ gives USD 1.81 m at $p = 15$ and USD 4.31 m at $p = 85$ (intervals 30.2 and 12.7 days).` },
            { md: md`**Semi-automated:** square-root part $\sqrt{2 \cdot 365 \cdot 40{,}000 \cdot p \cdot 10^6 \cdot 0.004}$ = USD 1.32 m ($p = 15$, interval 22 days) or 3.15 m ($p = 85$, interval 9 days); plus capex 0.224 m; plus residual $p \times 10^6 \times 0.005$ = 0.075 m or 0.425 m. Totals: **USD 1.62 m** and **USD 3.80 m**.` },
            { md: md`**Robots:** fixed $1.863 + 0.5 = 2.363$ m; loss $p \times 10^6 \times (0.002 + 0.010)$ = 0.18 m or 1.02 m. Totals: **USD 2.54 m** and **USD 3.38 m**.` },
            { md: md`Ranking at USD 15/MWh: semi-automated 1.62 < manual 1.81 < robots 2.54. At USD 85/MWh: robots 3.38 < semi-automated 3.80 < manual 4.31.` },
          ],
          result: md`The cheapest technology flips with the value of energy. At an IPP tariff the robots in this example lose by USD 0.7 m a year; at the state's fuel value they win by USD 0.9 m over manual. The residual matters: the robots' 1 % cemented residue costs USD 1.02 m/yr at fuel value, more than their O&M.`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Annual cost by technology and value of energy (illustrative 500 MWp)",
          xKey: "case",
          yLabel: "USD m per year",
          series: [
            { key: "cleaning", label: "Cleaning (variable + annualised capex + O&M)" },
            { key: "loss", label: "Soiling loss (incl. residual)" },
          ],
          data: [
            { case: "Manual @15", cleaning: 0.91, loss: 0.91 },
            { case: "Semi-auto @15", cleaning: 0.89, loss: 0.74 },
            { case: "Robots @15", cleaning: 2.36, loss: 0.18 },
            { case: "Manual @85", cleaning: 2.16, loss: 2.16 },
            { case: "Semi-auto @85", cleaning: 1.80, loss: 2.0 },
            { case: "Robots @85", cleaning: 2.36, loss: 1.02 },
          ],
          caption: "Robots convert a variable cost into a fixed one and nearly remove the soiling term; whether that pays depends on the value of the energy they recover.",
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Break-even robot capex",
          given: md`Same assumptions. Find the robot capex per MWp at which robots exactly match manual cleaning, at $p$ = USD 15/MWh and at $p$ = USD 85/MWh.`,
          steps: [
            { md: md`At $p = 15$: numerator $= J^*_{\text{manual}} - O - pE\bar L_{\text{robot}} = 1.812 - 0.5 - 0.18 = 1.132$ USD m/yr.` },
            {
              md: md`$K_{\text{be}} = 1.132/0.149 = 7.60$ USD m, or $7.60 \times 10^6/500 = 15{,}200$ USD/MWp.`,
              hidden: true,
              check: { prompt: "Break-even robot capex at USD 15/MWh", answer: 15200, unit: "USD/MWp", tolerance: { rel: 0.02 } },
            },
            {
              md: md`At $p = 85$: numerator $= 4.315 - 0.5 - 85 \times 10^6 \times 0.012 = 4.315 - 0.5 - 1.02 = 2.795$ m; $K_{\text{be}} = 2.795/0.149 = 18.75$ m, or 37,500 USD/MWp.`,
              hidden: true,
              check: { prompt: "Break-even robot capex at USD 85/MWh", answer: 37500, unit: "USD/MWp", tolerance: { rel: 0.02 } },
            },
          ],
          result: md`For the IPP, robots must cost under about USD 15k/MWp to beat manual crews in this example; for the state, up to about USD 37k/MWp. A vendor quote between the two is a robot the state should want and the IPP should refuse: the incentive gap of lesson 2 again, now in capex.`,
        },
        {
          kind: "question",
          question: {
            id: "mz04-l03-p1",
            type: "numeric",
            prompt: md`Manual wet cleaning uses 1 L of demineralised water per m² of glass per pass. The 500 MWp plant has modules of 22 % efficiency (so about 4,545 m² of glass per MWp). How many m³ of water does it use per year if it cleans at the national optimum of 12.7 days?`,
            answer: 65300,
            tolerance: { rel: 0.03 },
            unit: "m³/yr",
            explanation: md`Glass area $= 500 \times 4{,}545 = 2.27 \times 10^6$ m², so 2,273 m³ per pass. Passes per year $= 365/12.7 = 28.7$. Water $= 2{,}273 \times 28.7 \approx 65{,}300$ m³/yr, all demineralised and trucked to site. At the IPP's monthly optimum it would be about 27,500 m³/yr. Water logistics alone push high-frequency cleaning towards dry methods.`,
            concepts: ["mz04.water-logistics"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Specifying and buying cleaning in Kuwait",
      blocks: [
        {
          kind: "md",
          md: md`**Desert realities that change the numbers.**

- **Water:** wet cleaning needs demineralised water (tap or brackish water leaves mineral spots that soil faster). In Kuwait that means desalinated, polished water hauled by tanker to remote sites. Water cost, tanker availability and a water-quality spec belong in the cost per cycle.
- **Heat:** module glass reaches very high temperatures in summer. Cleaning hot glass with cooler water risks thermal stress, and crews face heat-stress limits, so wet cleaning moves to night or early morning. Robots also run at night, but their batteries and motors live in that heat.
- **Dew and cementation:** winter and spring nights bring dew that cements dust. Dry robots then smear rather than remove, and the residual climbs until a wet clean (lesson 4).
- **Sand:** windblown sand abrades brushes, bearings and drive wheels; robot ingress protection and duty cycle in sand are first-order reliability questions (lesson 5).
- **Trackers:** row robots must cross at a known tracker angle and park safely in stow. Some tracker vendors market robot integration (GameChange) or sized tracker rows around robots (Ideematec at Al Kharsaah). Retrofitting robots to fixed-tilt rows with gaps and breaks is harder than designing for them.
- **Module warranty:** dry brushing can abrade anti-reflective coatings. Ask the module manufacturer for written approval of the cleaning method and brush, or the warranty may be at risk.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Comparing a robot quote (capex) with a crew contract (opex)** without annualising. 2. **Comparing at the wrong value of energy**: an IPP and the state can rationally reach opposite answers. 3. **Ignoring residual dust** for dry methods and water haulage for wet methods. 4. **Assuming robot life equals plant life**: brushes, batteries and drives wear out in heat and sand. 5. **Quoting vendor marketing numbers** (USD 40k/MW/yr manual) as market data.`,
        },
        {
          kind: "checklist",
          title: "Technology evaluation grid (what to ask every bidder)",
          items: [
            "All-in cost per cycle (manual, semi-auto) or capex per MWp delivered, installed and commissioned in Kuwait (robots)",
            "Annual O&M per MWp: brushes, batteries, drives, spares, supervision, software licence",
            "Measured soiling ratio the day after cleaning, on dusty and on dew-cemented days",
            "Water per pass and its quality spec, or confirmation of fully dry operation",
            "Module manufacturer approval of the method and brush in writing",
            "Tracker interface: crossing angle, stow behaviour, row transfer, gaps",
            "Operating temperature range and sand ingress protection, with references from Gulf sites",
            "Fleet availability guarantee, mean time to repair, local spares and fallback cleaning",
          ],
        },
        {
          kind: "ask",
          title: "Questions for a robot vendor",
          items: [
            "Which Gulf sites run your robots today, for how long, and can we speak to their O&M managers?",
            "What happens to cleaning quality after a dew night, and what wet-cleaning frequency do you recommend alongside your robots?",
            "What is your measured fleet availability in the hottest month, and what fails first?",
            "Is your price for robots only, or including docks, transfer units, communications, software and commissioning?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "mz04-l03-p2",
            type: "short",
            prompt: md`A Kuwaiti EPC asks Mizan, as a prospective distributor, whether to specify robots or manual cleaning for a new 300 MWp tracker plant that will sell power under a low-tariff PPA. Write your recommendation note (one page): the decision rule you apply, the inputs you need, an illustrative calculation, and what you would tell them about the state's view.`,
            rubric: [
              "Annualises robot capex with a CRF and compares with the manual optimum from the square-root rule, at the IPP's value of energy",
              "Includes residual dust for dry methods and water and haulage for wet methods",
              "Computes or states a break-even capex per MWp and compares it with a quote, numbers labelled illustrative",
              "Points out that at the state's fuel value the break-even capex is much higher, and what that implies for the offtaker or a bonus mechanism",
              "Lists the non-price checks: module warranty approval, tracker interface, heat and sand reliability, availability guarantee and fallback",
              "Is honest about thin cost data and asks for real quotes rather than citing vendor marketing",
            ],
            modelAnswer: md`**Recommendation: cleaning technology for a 300 MWp tracker plant (illustrative).** Decision rule: choose the option with the lowest annual cost of cleaning plus soiling loss at the owner's value of energy. Manual: $J^* = \sqrt{2\cdot365\,C_v\,pEs}$ plus any residual. Robots: capex × CRF + O&M + loss at daily cycles plus dry residual. Inputs needed: measured soiling rate by season (we can estimate from nearby data until the plant runs), manual cost per pass including water haulage, robot capex delivered in Kuwait and O&M, residual after dry and wet cleaning, discount rate, PPA tariff. Illustrative: 300 MWp, 600,000 MWh/yr, 0.4 %/day, manual USD 45,000 per pass, tariff USD 15/MWh: manual optimum about 30 days, about USD 1.09 m/yr. Robots at O&M USD 1k/MWp/yr and 1.2 % average loss cost 0.30 + 0.11 = USD 0.41 m/yr before capex, so at CRF 0.149 they break even at about USD 4.6 m, or USD 15k/MWp. A quote below that favours robots for the IPP; above it, specify semi-automated or manual, and design rows and tracker stow so robots can be retrofitted. The state's view: at about USD 85/MWh of displaced fuel the break-even rises to roughly USD 37k/MWp, so a robot the IPP rejects may still be worth it to MEWRE, which is an argument for a soiling bonus in the PPA. Non-price checks: module maker's written approval of the brush, tracker crossing and stow interface, operating temperature and sand protection, availability guarantee with a manual fallback. Cost data in the public domain are thin: we will get two Kuwait-delivered robot quotes and one O&M per-pass rate before finalising.`,
            explanation: md`A strong note converts both options to one annual number, uses the right value of energy for the decision maker, flags the state's different answer, and puts the non-price risks next to the economics.`,
            concepts: ["mz04.cost-structure", "mz04.robot-breakeven", "mz04.cleaning-technologies"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz04-l03-q1",
      type: "mcq",
      prompt: md`Why do row-mounted robots usually clean daily, while manual crews clean weekly to monthly?`,
      options: [
        "Robots are less effective, so they must clean more often",
        "The marginal cost of a robot cycle is close to zero, so the square-root rule drives the interval to the machine's minimum",
        "Daily cleaning is required by IEC 61724-1",
        "Robots cannot be programmed for other intervals",
      ],
      answer: 1,
      explanation: md`With $C_v \to 0$, $T^* = \sqrt{2C_v/(pE_ds)} \to 0$. The economics of robots are decided by the capex, not by the cycle cost.`,
      concepts: ["mz04.cost-structure"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz04-l03-q2",
      type: "numeric",
      prompt: md`A robot fleet costs USD 6 m with a 10-year life at 8 % (CRF 0.149). What is its annualised capex in USD m/yr?`,
      answer: 0.894,
      tolerance: { rel: 0.01 },
      unit: "USD m/yr",
      explanation: md`$6 \times 0.149 = 0.894$ USD m/yr. Add O&M and residual soiling loss before comparing with the manual optimum.`,
      concepts: ["mz04.robot-breakeven"],
      difficulty: 1,
    },
    {
      id: "mz04-l03-q3",
      type: "multi",
      prompt: md`Which belong in the all-in cost per cycle of manual wet cleaning at a remote Kuwaiti site? (Select all.)`,
      options: [
        "Crew labour and supervision",
        "Demineralised water and tanker haulage",
        "Module breakage and damage during cleaning",
        "The PPA tariff",
        "Vehicle fuel and equipment hire",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`The tariff is the value of energy, not a cleaning cost. Leaving out water haulage and breakage is the most common underestimate.`,
      concepts: ["mz04.cost-structure", "mz04.water-logistics"],
      difficulty: 1,
    },
    {
      id: "mz04-l03-q4",
      type: "mcq",
      prompt: md`In the illustrative 500 MWp comparison, robots lose to manual at USD 15/MWh but win at USD 85/MWh. What is the main reason?`,
      options: [
        "Robot capex depends on the tariff",
        "The value of the energy robots recover grows with p, while their cost is fixed",
        "Manual cleaning is not allowed at high values of energy",
        "Residual dust disappears at high p",
      ],
      answer: 1,
      explanation: md`Robots nearly eliminate the soiling term; that term is worth more the higher $p$ is, while the fleet cost does not change.`,
      concepts: ["mz04.robot-breakeven"],
      difficulty: 2,
    },
    {
      id: "mz04-l03-q5",
      type: "numeric",
      prompt: md`Noor Abu Dhabi reports 1,430 robots for a 1.18 GW plant. About how many MW does one robot serve?`,
      answer: 0.825,
      tolerance: { rel: 0.02 },
      unit: "MW/robot",
      explanation: md`$1{,}180/1{,}430 = 0.825$ MW per robot. Useful for sizing a fleet from a plant's MW, though row length and layout decide the real count.`,
      concepts: ["mz04.cleaning-technologies"],
      difficulty: 1,
    },
    {
      id: "mz04-l03-q6",
      type: "decision",
      prompt: md`A vendor quotes robots at USD 22k/MWp for an IPP plant where your break-even is USD 15k/MWp at the tariff and USD 37k/MWp at the state's fuel value. What do you advise the IPP?`,
      options: [
        { text: "Buy the robots: they pay at the state's value", score: 0.2, feedback: "The IPP does not earn the state's value; at its tariff the robots lose money." },
        { text: "Decline at this price, and propose to MEWRE a soiling-recovery bonus or a capex contribution that closes the gap", score: 1, feedback: "Correct for the IPP, and it turns the incentive gap into a commercial proposal the state can evaluate." },
        { text: "Decline and drop the subject", score: 0.5, feedback: "Right for the IPP alone, but leaves national value on the table." },
        { text: "Negotiate the price down to USD 21k/MWp and buy", score: 0.3, feedback: "Still above the IPP's break-even." },
      ],
      explanation: md`A quote between the two break-evens is the clearest sign that a mechanism sharing the state's gain is needed.`,
      concepts: ["mz04.robot-breakeven", "mz04.incentive-gap"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "mz04-l03-f1", front: "Four cleaning technology families", back: "Manual wet; semi-automated (tractor brush); robotic dry row-mounted (daily); portable semi-autonomous robots.", concepts: ["mz04.cleaning-technologies"] },
    { id: "mz04-l03-f2", front: "Why robots clean daily", back: "Near-zero marginal cost per cycle: the square-root rule drives T to the machine minimum; the decision becomes buy or not.", concepts: ["mz04.cost-structure"] },
    { id: "mz04-l03-f3", front: "Annual robot cost", back: md`$K\cdot\mathrm{CRF} + O + pE(s/2 + r_0)$`, concepts: ["mz04.robot-breakeven"] },
    { id: "mz04-l03-f4", front: "Published robot vs manual cost (PV-Tech test)", back: "About USD 4.0k vs 6.7k per MW per year on 4.5 MW; vendor-related, year unconfirmed.", concepts: ["mz04.cost-structure"] },
    { id: "mz04-l03-f5", front: "Water for wet cleaning", back: "About 0.5 to 2 L/m² per pass, demineralised; 500 MWp ≈ 2,300 m³ per pass at 1 L/m².", concepts: ["mz04.water-logistics"] },
    { id: "mz04-l03-f6", front: "Gulf cleaning practice examples", back: "Noor Abu Dhabi 1,430 dry robots; Al Ajban about 3,000 SUNPURE robots daily; Al Kharsaah semi-automated every 4 days; Shagaya PV monthly water.", concepts: ["mz04.cleaning-technologies"] },
  ],
};

export default lesson;
