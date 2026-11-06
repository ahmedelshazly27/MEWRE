import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc09-l02",
  title: "Early team design and equity compensation",
  summary:
    "Design the first ten roles around your own bottlenecks, decide employee versus contractor versus volunteer, size option grants by role and stage, and do the salary versus equity arithmetic honestly, including dilution, strike price and the probability of an exit.",
  minutes: 80,
  objectives: [
    "Sequence the first ten hires for a venture from the bottlenecks in the founders' own work",
    "Explain how employee options work: fully diluted percentage, strike, vesting, cliff, leaver terms",
    "Size a grant by role and stage and compute its paper value and its retention through later rounds",
    "Compute the expected value of an equity grant and the break-even grant that compensates a salary cut",
    "Structure contractor and volunteer arrangements so IP, tax status and expectations are clear",
  ],
  concepts: [
    { id: "fc09.first-ten-hires", name: "First ten hires", description: "Sequencing early roles by the bottleneck they remove from the founders, with contractors for uncertain or part-time needs and employees for core, repeated work.", competency: "fc-ops", related: ["fc09.scorecard"] },
    { id: "fc09.option-grant", name: "Employee option grant", description: "A right to buy a number of shares at a fixed strike price, vesting over time (typically 4 years with a 1-year cliff), sized as a percentage of fully diluted shares.", competency: "fc-ops" },
    { id: "fc09.vesting-cliff", name: "Vesting and cliff", description: "Equity is earned over time; the cliff (often 12 months) means nothing vests if the person leaves earlier, after which vesting is monthly or quarterly.", competency: "fc-ops", related: ["fc09.option-grant"] },
    { id: "fc09.salary-equity-tradeoff", name: "Salary versus equity trade-off", description: "Comparing a certain salary reduction with the probability-weighted, dilution-adjusted value of an option grant net of strike cost.", competency: "fc-ops", related: ["fc09.option-grant", "fc09.expected-value"] },
    { id: "fc09.dilution-retention", name: "Dilution and retention of a grant", description: "Each new round issues shares, so a grant's percentage is multiplied by (1 minus the dilution) of every subsequent round.", competency: "fc-ops", related: ["fc09.option-grant"] },
    { id: "fc09.contractor-volunteer", name: "Contractor and volunteer arrangements", description: "Non-employee work governed by written terms covering scope, IP assignment, confidentiality, payment or allowance, and the facts that decide employment status.", competency: "fc-ops", related: ["fc09.first-ten-hires"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Who to hire first, and how equity really pays",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Every early offer you make is a trade between cash you do not have and equity whose value you cannot promise. Afterwave will compete for test and validation engineers against companies that pay in cash; Mizan hires in Kuwait, where employment rules and expectations differ from the Netherlands; Suhail runs on volunteer leads until revenue. Getting the arithmetic and the paperwork right protects the cap table, the IP, and your credibility with the first people who trusted you.`,
        },
        {
          kind: "md",
          md: md`### Designing the first ten

The first ten hires should remove the founders' bottlenecks, in the order the bottlenecks bind. Ask three questions for each candidate role:

1. **What breaks first if nobody does this?** (Pilots stall, data is not cleaned, events are not run.)
2. **Is the need continuous and core, or uncertain and part-time?** Core and continuous: employee. Uncertain, specialist or part-time: contractor first, with a written scope.
3. **Can a founder still do it for six more months without losing the company's main constraint?** If yes, wait.

An illustrative sequence for a B2B hardware-adjacent software company like Afterwave (not its actual plan):

| # | Role | Trigger to hire | Form |
|---|---|---|---|
| 1 | Solutions engineer | Two pilots running in parallel | Employee |
| 2 | Software engineer (capture, integrations) | Engineering partners at capacity | Employee |
| 3 | Security and compliance support | First on-prem security reviews | Contractor |
| 4 | Software engineer (Ripple, change impact) | Product roadmap needs a second stream | Employee |
| 5 | Account executive | Founder-led sales repeatable for 3 to 5 deals | Employee |
| 6 | Data and ML engineer (Enclave) | Bench memory large enough to train on | Employee |
| 7 | Finance and admin | Payroll, grants, audit preparation | Part-time contractor |
| 8 to 10 | Second solutions engineer, product designer, customer success | Customer count and renewals | Employees |

Notice what is absent: no "head of" titles before there is anything to head, and no marketing hire before the message is proven in founder-led sales.

### How an option grant works

An **option** is the right to buy shares at a fixed **strike price**. A grant is quoted as a number of options and, more usefully, as a percentage of **fully diluted** shares (all shares plus all options and the unallocated pool). It **vests** over time: the market standard is 4 years with a **1-year cliff** (25% at month 12, then monthly). The holder pays the strike only when exercising, normally around an exit. **Leaver** clauses (good leaver, bad leaver) decide what happens to vested options when someone leaves; in European plans they matter as much as the vesting schedule.

Three numbers describe a grant:`,
        },
        { kind: "equation", formula: "fc09-grant-paper-value" },
        { kind: "equation", formula: "fc09-dilution-retention" },
        { kind: "equation", formula: "fc09-equity-ev" },
        {
          kind: "md",
          md: md`Setting the expected value equal to the salary forgone over the vesting period gives the **break-even grant**:`,
        },
        { kind: "equation", formula: "fc09-breakeven-grant" },
        {
          kind: "md",
          md: md`Two cautions keep this honest. First, $P_{\text{exit}}$ is small and the distribution is extreme: the most likely outcome for an early option grant is zero, so a risk-averse candidate rationally values it below its expected value. Second, **liquidation preferences**: in a modest exit, preferred investors are paid back first and common shares (where options sit) can receive nothing even when the headline price looks good.

### Grant sizing by role and stage

Practitioner guides (the Holloway Guide to Equity Compensation, Index Ventures' work on European option plans, and aggregated cap-table data from providers such as Carta) converge on rough ranges for seed-stage companies:

| Hire | Typical role | Rough grant (fully diluted) |
|---|---|---|
| 1 to 2 | Founding engineer or first key hire | 0.5 to 2.0% |
| 3 to 5 | Early engineers, solutions engineers | 0.3 to 1.0% |
| 6 to 10 | Specialists, first sales hire | 0.15 to 0.5% |
| Senior executive at seed or Series A | VP engineering, VP sales | 1.0 to 2.0% |

The **option pool** is sized from the hiring plan, not from a convention: add the grants you plan to make before the next round and a buffer. Investors usually ask for the pool to be created or topped up before their money comes in (the "option pool shuffle"), so it dilutes the existing holders, not them; this is covered with the cap-table mechanics in the Equity and legal module.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Grant ranges are heuristics, not market data",
          md: md`The table above is a synthesis of practitioner guidance for US and European seed-stage companies, not a measured benchmark. European grants have historically been smaller than US grants for the same role. Before making offers, check current benchmark data (for example Carta or Index Ventures' published guidance) for your geography, stage and role.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "A 0.80% grant through three later rounds (illustrative dilution)",
          xKey: "stage",
          xLabel: "After round",
          yLabel: "Fully diluted ownership (%)",
          series: [{ key: "pct", label: "Grant ownership" }],
          data: [
            { stage: "At grant", pct: 0.8 },
            { stage: "Seed (20%)", pct: 0.64 },
            { stage: "Series A (20%)", pct: 0.512 },
            { stage: "Series B (15%)", pct: 0.435 },
          ],
          caption: "Retention factor 0.8 x 0.8 x 0.85 = 0.544. A candidate who values the grant at today's percentage times an exit value is overstating it by almost half.",
        },
        { kind: "widget", widget: "cap-table", props: { poolPct: 12 }, caption: "Create a 12% pool, add a seed SAFE and a Series A, and watch what happens to an employee grant and to the founders when the pool is topped up pre-money." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing an offer at Afterwave",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is EUR 70,000 plus 0.80% a fair trade for a EUR 90,000 market salary?",
          given: md`Illustrative numbers. A candidate's market salary is EUR 90,000; Afterwave offers EUR 70,000 plus options over 0.80% of fully diluted shares, 4-year vesting, 1-year cliff. Assume later dilution of 20% (seed), 20% (Series A) and 15% (Series B). Strike price corresponds to a company value of EUR 6 m at grant. An exit at EUR 400 m has, in your honest estimate, an 8% probability; ignore smaller exits (preferences would wipe out most common value there).`,
          steps: [
            { md: md`**Salary forgone over vesting:** $\Delta S \cdot T = 20{,}000 \times 4 = 80{,}000$ EUR.` },
            { md: md`**Retention:** $\rho = 0.80 \times 0.80 \times 0.85 = 0.544$, so 0.80% becomes $0.80\% \times 0.544 = 0.435\%$ at exit.` },
            { md: md`**Gross value in the success case:** $g\,\rho\,V_{\text{exit}} = 0.008 \times 0.544 \times 400\text{ m} = 1.741$ m EUR.` },
            { md: md`**Strike cost:** $g\,V_K = 0.008 \times 6\text{ m} = 48{,}000$ EUR (the number of shares does not change with dilution, so the strike bill does not either).` },
            { md: md`**Expected value:** $EV = 0.08 \times (1{,}740{,}800 - 48{,}000) = 135{,}424$ EUR, before tax.` },
            { md: md`**Break-even grant:** $g^* = 80{,}000 / [0.08 \times (0.544 \times 400\text{ m} - 6\text{ m})] = 80{,}000/16.93\text{ m} = 0.47\%$.` },
          ],
          result: md`At these assumptions the 0.80% grant has an expected value of about EUR 135,000 against EUR 80,000 of salary forgone, and the break-even grant is 0.47%. But 92% of the time it is worth roughly nothing. Show the candidate the calculation with your assumptions labelled, and let them change $P_{\text{exit}}$; never present the success case as the expected case.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What the candidate will compare: paper value per year",
          given: md`Illustrative. The candidate's adviser values grants at the latest post-money valuation, which is EUR 12 m. Grant 0.80%, 4-year vesting. Salary gap EUR 20,000 per year.`,
          steps: [
            { md: md`**Paper value:** $G = g\,V_{\text{post}} = 0.008 \times 12{,}000{,}000$.` },
            { md: md`$G = 96{,}000$ EUR.`, hidden: true, check: { prompt: "Paper value of the grant (EUR)", answer: 96000, unit: "EUR", tolerance: { abs: 10 } } },
            { md: md`**Per vesting year:** $G/T = 96{,}000/4$.` },
            { md: md`$= 24{,}000$ EUR per year, slightly above the EUR 20,000 salary gap.`, hidden: true, check: { prompt: "Paper value vesting per year (EUR/yr)", answer: 24000, unit: "EUR/yr", tolerance: { abs: 10 } } },
          ],
          result: md`Paper value at the preferred price (EUR 24,000 per year) overstates what common options are worth: preferred shares carry preferences, and the option holder still pays the strike. It is a useful anchor in an offer conversation only when you say what it is.`,
        },
        {
          kind: "question",
          question: {
            id: "fc09-l02-p1",
            type: "numeric",
            prompt: md`An early Mizan hire receives 1.0% fully diluted. Later rounds dilute by 25%, 20% and 15%. What percentage does the grant represent after the third round? (percent, 3 decimals)`,
            answer: 0.51,
            tolerance: { abs: 0.002 },
            unit: "%",
            explanation: md`$\rho = 0.75 \times 0.80 \times 0.85 = 0.51$, so $1.0\% \times 0.51 = 0.510\%$. Almost half the percentage is gone, which is normal and fine if each round raised the company's value by more than it diluted.`,
            concepts: ["fc09.dilution-retention"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Offers, contractors and volunteers in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Making the offer

Put the whole package in writing: salary, grant (number of options **and** fully diluted percentage on the date of the offer), strike or how it will be set, vesting and cliff, leaver terms, exercise window after leaving, and the plan documents to be signed. Offer a choice where you can afford it (for example two salary and equity mixes), which lets the candidate reveal their risk appetite instead of you guessing it.

**Netherlands.** Employee equity is often held through a **STAK** (stichting administratiekantoor), a foundation that holds the shares and issues depositary receipts, which separates economic rights from voting. Under current rules options are generally taxed as wage when the shares become tradable, or at exercise if the holder elects; a new regime intended to apply from 1 January 2027 would tax only 65% of the gain and defer tax until the shares are sold, covering options granted from 17 April 2025. Confirm the final law with a Dutch tax adviser before relying on it.

**Kuwait.** Mizan hires in Kuwait sit under the private-sector labour law (Law No. 6 of 2010) and the residence and work-permit system; equity plans for a Kuwaiti company are far less standardised. Take local legal advice before promising options to anyone there.

### Contractors

Use contractors for uncertain, specialist or part-time needs: security questionnaires for an on-prem review, a Kuwait-based plant-data integrator, a designer for Suhail Season. The contract must cover scope and deliverables, payment, confidentiality and, above all, **IP assignment**: in many jurisdictions copyright in an employee's work belongs to the employer by law, but a contractor keeps it unless the contract assigns it. Employment status is decided by the facts, not the label: in the Netherlands, authority (who directs the work), wages and personal performance together point to employment, and the tax authority resumed enforcement against false self-employment from 2025.

### Volunteers

Suhail runs on volunteer leads until there is revenue. Treat them as a team, with less paperwork but the same clarity: a short volunteer agreement (role, time commitment, what they get in return, confidentiality, use of their name and image, IP in what they create), a named point of contact, and a review every quarter. What volunteers get is real but non-cash: responsibility, credit, network access, a reference letter, and first consideration for paid roles when the plan starts in January 2027.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Dutch volunteer allowance limits change yearly",
          md: md`Dutch rules allow a tax-free volunteer allowance up to a monthly and annual cap (around EUR 210 per month and EUR 2,100 per year in recent years). The caps are indexed and conditions apply; check the Belastingdienst page for the current year before paying any volunteer allowance.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Informal equity promises.** "You'll get some equity when we raise" in a chat message can become a claim, and it poisons trust when the number turns out small. Promise nothing you have not put in a board-approved grant.
- **No IP assignment.** A contractor who wrote part of the capture pipeline, or a volunteer who designed the Suhail brand, may own it. Fix it before due diligence finds it.
- **Grants without a pool or plan.** Options granted outside a properly adopted plan create tax and legal problems later.
- **Quoting percentages without "fully diluted" and a date.** 1% of issued shares and 1% fully diluted are different numbers.
- **Selling the success case.** Candidates who were told the equity would make them rich become the most bitter leavers.`,
        },
        { kind: "sources", refs: ["fc09-r5", "fc09-r6", "fc09-r7", "fc09-r8"] },
        {
          kind: "checklist",
          title: "Before the first offer",
          items: [
            "Hiring plan to the next round with grant ranges per role, summed into a pool size",
            "Option plan adopted (and STAK set up if using one); board approval process for grants",
            "Offer template with salary, options, fully diluted percentage and date, strike, vesting, cliff, leaver terms",
            "Written equity explainer for candidates showing dilution, strike and a range of exit probabilities",
            "Contractor template with IP assignment and confidentiality",
            "Volunteer agreement template for Suhail leads",
          ],
        },
        {
          kind: "ask",
          title: "Questions for your lawyer and tax adviser",
          items: [
            "How are options taxed for an employee in the Netherlands today, and what changes if the 2027 regime is enacted?",
            "Should employee equity sit in a STAK, and how do leaver provisions work with depositary receipts?",
            "Does this contractor arrangement risk being treated as employment, and what would change that?",
            "What can a Kuwaiti entity offer as long-term incentive to local staff, and what does the labour law require on end-of-service benefits?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc09-l02-p2",
            type: "short",
            prompt: md`Produce an **offer package** for one early hire in one of your ventures (you choose the role). Include: (1) why this role is the right next hire (the bottleneck it removes); (2) salary and option grant with fully diluted percentage, vesting and cliff; (3) the expected-value calculation you would show the candidate, with every assumption labelled illustrative, and the break-even grant; (4) the one paragraph you would say about the risk; (5) for Suhail, or as an add-on, a five-point volunteer-lead arrangement.`,
            rubric: [
              "Role is justified by a specific founder bottleneck and a trigger, not by a generic org chart",
              "Grant is stated as options and fully diluted percentage, with 4-year vesting, a cliff and leaver terms mentioned",
              "Expected-value calculation includes dilution through later rounds, strike cost and an explicit exit probability, with correct arithmetic",
              "Break-even grant is computed and compared with the offered grant",
              "Risk statement is honest: the most likely outcome is zero, and liquidation preferences are mentioned",
              "Volunteer or contractor terms cover role, time, what the person gets, confidentiality and IP",
            ],
            modelAnswer: md`**Role: Afterwave solutions engineer.** Bottleneck: the CEO and engineering partners are spending two to three days per pilot on installation and customer support, which caps us at one pilot at a time. Trigger: a second pilot starting in parallel (illustrative).

**Package (illustrative).** EUR 70,000 base; 80,000 options representing 0.80% of 10,000,000 fully diluted shares at the offer date; 4-year vesting, 12-month cliff, monthly thereafter; good-leaver keeps vested options with a 12-month exercise window, bad-leaver forfeits; strike set at the current fair value of common shares as agreed with our tax adviser. Alternative package offered: EUR 80,000 and 0.50%.

**Expected value we show.** Market salary EUR 90,000, so forgone salary $= 20{,}000 \times 4 = 80{,}000$. Dilution assumed 20%, 20%, 15%: $\rho = 0.544$, grant at exit 0.435%. Exit at EUR 400 m with probability 8% (illustrative, please change it). Strike cost $0.008 \times 6\text{ m} = 48{,}000$. $EV = 0.08 \times (0.008 \times 0.544 \times 400\text{ m} - 48{,}000) = 135{,}424$ EUR. Break-even grant $g^* = 80{,}000/(0.08 \times (217.6\text{ m} - 6\text{ m})) = 0.47\%$. At 4% exit probability the EV halves to about EUR 68,000 and the break-even grant doubles to 0.95%.

**Risk paragraph.** "Most startups do not reach an exit that makes options valuable, and in a small exit investors are repaid first, so common shares can get nothing. Please treat the salary as your pay and the options as a lottery ticket with good odds for a lottery, not as income. If that does not work for you, take the higher-salary package."

**Suhail volunteer lead (five points).** (1) Role: lead for the first 2027 hackathon, about 6 hours a week from January to the event. (2) Return: named credit on all materials, introductions to sponsors and investors, a reference letter, first consideration for paid roles once revenue starts. (3) Confidentiality for sponsor and participant data. (4) Anything created for Suhail (designs, content, code) is assigned to Suhail; the volunteer may show it in their portfolio. (5) Quarterly check-in; either side can end the arrangement with two weeks' notice. No equity is promised.`,
            explanation: md`The strongest answers make every assumption visible and changeable, and give the candidate a genuine choice of mixes. A grant explained this way is valued more, not less, because it is credible.`,
            concepts: ["fc09.salary-equity-tradeoff", "fc09.option-grant", "fc09.dilution-retention", "fc09.contractor-volunteer", "fc09.first-ten-hires"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a candidate with no startup experience what 0.8% in options actually means and why it is not the same as 0.8% of the price you might one day sell for.",
          keyPoints: [
            "Options are a right to buy shares at a strike price, earned over 4 years with a 1-year cliff",
            "The percentage is of fully diluted shares and shrinks with each later round",
            "The holder pays the strike at exercise, so the value is the gain above the strike",
            "Liquidation preferences mean common shares can get little or nothing in a modest exit",
            "The value must be weighted by the probability of an exit, which is low; the likeliest outcome is zero",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc09-l02-q1",
      type: "numeric",
      prompt: md`A 0.6% grant is diluted by 20% at seed and 20% at Series A. What is it after Series A? (percent, 3 decimals)`,
      answer: 0.384,
      tolerance: { abs: 0.001 },
      unit: "%",
      explanation: md`$0.6\% \times 0.8 \times 0.8 = 0.384\%$. Dilution compounds multiplicatively, not additively (it is not $0.6\% \times 0.6$).`,
      concepts: ["fc09.dilution-retention"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc09-l02-q2",
      type: "mcq",
      prompt: "A 4-year grant with a 1-year cliff. The employee leaves after 11 months. How much has vested?",
      options: ["Nothing", "11/48 of the grant", "25% of the grant", "It depends on the strike price"],
      answer: 0,
      explanation: md`Before the cliff nothing vests. At month 12, 25% vests at once; after that, vesting is usually monthly.`,
      concepts: ["fc09.vesting-cliff"],
      difficulty: 1,
    },
    {
      id: "fc09-l02-q3",
      type: "numeric",
      prompt: md`Salary cut EUR 15,000/yr over 4 years. Retention $\rho = 0.5$, exit value EUR 300 m with probability 10%, strike-implied value $V_K$ = EUR 5 m. What break-even grant compensates the cut? (percent, 2 decimals)`,
      answer: 0.41,
      tolerance: { abs: 0.01 },
      unit: "%",
      explanation: md`$g^* = 60{,}000 / [0.10 \times (0.5 \times 300\text{ m} - 5\text{ m})] = 60{,}000/14.5\text{ m} = 0.414\%$.`,
      concepts: ["fc09.salary-equity-tradeoff"],
      difficulty: 2,
    },
    {
      id: "fc09-l02-q4",
      type: "multi",
      prompt: "Which should be in writing before a contractor starts on Afterwave's capture software? (Select all that apply.)",
      options: [
        "Assignment of IP in the work to the company",
        "Confidentiality obligations",
        "Scope, deliverables and payment",
        "A promise of equity if the company raises",
        "The facts of the arrangement that support contractor (not employee) status",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`Without assignment, a contractor can own what they wrote. Equity promises outside an adopted plan create claims; if equity is part of the deal, grant it properly.`,
      concepts: ["fc09.contractor-volunteer"],
      difficulty: 1,
    },
    {
      id: "fc09-l02-q5",
      type: "decision",
      prompt: md`An excellent candidate asks you: "What will my options be worth?" You have a model with an 8% chance of a large exit. What do you answer?`,
      options: [
        { text: "Show the success case: 0.8% of EUR 400 m is EUR 3.2 m.", score: 0, feedback: "Ignores dilution, strike, preferences and probability; it sets up a bitter leaver." },
        { text: "Walk through dilution, strike and the exit probability, show the expected value and the range including zero, and offer two salary and equity mixes.", score: 1, feedback: "Honest, quantified and lets the candidate express their risk appetite." },
        { text: "Say it is impossible to know and move on.", score: 0.2, feedback: "True but unhelpful; candidates then fill the gap with their own, usually inflated, numbers." },
      ],
      explanation: md`The credible answer is the expected-value calculation with every assumption visible, plus a choice of mixes.`,
      concepts: ["fc09.salary-equity-tradeoff", "fc09.option-grant"],
      difficulty: 2,
    },
    {
      id: "fc09-l02-q6",
      type: "mcq",
      prompt: "When should a role be filled by a contractor rather than an employee at an early-stage company?",
      options: [
        "When the work is core and continuous",
        "When the need is uncertain, specialist or part-time, with a clear written scope",
        "Whenever it saves employer social charges",
        "When the person will be directed day to day like the rest of the team",
      ],
      answer: 1,
      explanation: md`Contractors fit uncertain or specialist needs. If you direct the work like an employee's, the arrangement may be treated as employment regardless of the label.`,
      concepts: ["fc09.first-ten-hires", "fc09.contractor-volunteer"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc09-l02-f1", front: "Standard vesting", back: "4 years, 1-year cliff (25% at month 12), then monthly.", concepts: ["fc09.vesting-cliff"] },
    { id: "fc09-l02-f2", front: "Retention through rounds", back: md`$\rho = \prod (1 - d_i)$; e.g. 20%, 20%, 15% gives 0.544.`, concepts: ["fc09.dilution-retention"] },
    { id: "fc09-l02-f3", front: "Expected value of a grant", back: md`$EV = P_{\text{exit}}\,(g\rho V_{\text{exit}} - g V_K)$`, concepts: ["fc09.salary-equity-tradeoff"] },
    { id: "fc09-l02-f4", front: "Break-even grant", back: md`$g^* = \Delta S\, T / [P_{\text{exit}}(\rho V_{\text{exit}} - V_K)]$`, concepts: ["fc09.salary-equity-tradeoff"] },
    { id: "fc09-l02-f5", front: "STAK", back: "Dutch foundation that holds shares and issues depositary receipts to employees; separates economic and voting rights.", concepts: ["fc09.option-grant"] },
    { id: "fc09-l02-f6", front: "The contractor clause you must never miss", back: "IP assignment: without it, the contractor may own the work.", concepts: ["fc09.contractor-volunteer"] },
    { id: "fc09-l02-f7", front: "How to size the option pool", back: "Sum the planned grants to the next round, plus a buffer; not a fixed convention.", concepts: ["fc09.option-grant", "fc09.first-ten-hires"] },
  ],
};

export default lesson;
