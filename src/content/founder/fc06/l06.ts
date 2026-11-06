import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc06-l06",
  title: "Pricing economics: elasticity, optimal price, value and discrimination",
  summary:
    "Derive elasticity and the profit-maximising price (Lerner condition), see why the textbook model breaks for zero-marginal-cost software, price B2B products on economic value to the customer, use price discrimination and packaging, and test prices with the sample sizes you will actually have.",
  minutes: 80,
  objectives: [
    "Compute point and arc elasticity and predict the revenue effect of a price change",
    "Derive the Lerner condition and the optimal price under constant-elasticity and linear demand",
    "Build a value-based price from economic value to the customer for an enterprise product",
    "Design first-, second- and third-degree price discrimination with credible fences",
    "Choose a price-testing method that fits your sample size",
  ],
  concepts: [
    { id: "fc06.elasticity", name: "Price elasticity of demand", description: "Percentage change in quantity per percentage change in price; determines whether a price rise increases revenue.", competency: "fc-finance" },
    { id: "fc06.optimal-price", name: "Profit-maximising price (Lerner condition)", description: "At the optimum, margin over price equals minus one over elasticity; under constant elasticity the price is a fixed markup on marginal cost.", competency: "fc-finance", related: ["fc06.elasticity"] },
    { id: "fc06.value-pricing", name: "Value-based pricing (economic value to the customer)", description: "Price set between the next-best alternative's cost and the customer's total economic value, capturing a share of the quantified differential value.", competency: "fc-finance" },
    { id: "fc06.price-discrimination", name: "Price discrimination and packaging", description: "Charging different prices to different customers or for different versions (first, second and third degree), held apart by fences.", competency: "fc-finance", related: ["fc06.optimal-price"] },
    { id: "fc06.price-testing", name: "Price testing", description: "A/B tests where volume allows; willingness-to-pay interviews and staged price lists where it does not.", competency: "fc-finance" },
  ],
  sections: [
    {
      layer: "theory",
      title: "The economics of a price",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You own pricing for every venture. A 10 % price increase with no lost customers goes straight to gross profit and often improves it by more than any cost programme: for a 75 % gross margin product, +10 % price is +13 % gross profit. Afterwave is creating a new category (physical AI test infrastructure) where there is no market price to copy; Mizan sells into tenders where price is scored; Suhail sets ticket and sponsorship prices for a community that is price sensitive. You need the mechanism, not a rule of thumb.`,
        },
        {
          kind: "md",
          md: md`### Elasticity and revenue

Revenue $R = PQ(P)$. Differentiate: $dR/dP = Q + P\,dQ/dP = Q(1+\varepsilon)$, with elasticity defined as:`,
        },
        { kind: "equation", formula: "fc06-elasticity" },
        {
          kind: "md",
          md: md`So a price rise **raises** revenue when demand is inelastic ($-1 < \varepsilon < 0$) and **lowers** it when elastic ($\varepsilon < -1$). With two observations, use the midpoint (arc) formula:`,
        },
        { kind: "equation", formula: "fc06-arc-elasticity" },
        {
          kind: "md",
          md: md`### The profit-maximising price

Profit $\pi = (P - c)\,Q(P)$ with marginal cost $c$. Set the derivative to zero:

$$\frac{d\pi}{dP} = Q + (P-c)\frac{dQ}{dP} = 0 \;\Rightarrow\; \frac{P-c}{P} = -\frac{Q}{P\,dQ/dP} = -\frac{1}{\varepsilon}.$$

This is the **Lerner condition**: the optimal margin equals one over the absolute elasticity.`,
        },
        { kind: "equation", formula: "fc06-lerner" },
        {
          kind: "md",
          md: md`For **constant-elasticity** demand $Q = AP^{\varepsilon}$, $\varepsilon$ is the same at every price and the optimum is a fixed markup on cost:`,
        },
        { kind: "equation", formula: "fc06-markup-constant-elasticity" },
        {
          kind: "md",
          md: md`| Elasticity | Optimal markup $P^*/c$ | Margin $(P^*-c)/P^*$ |
|---|---|---|
| $-1.5$ | 3.0x | 67 % |
| $-2$ | 2.0x | 50 % |
| $-3$ | 1.5x | 33 % |
| $-5$ | 1.25x | 20 % |

**Where the textbook breaks:** software has $c \approx 0$, so the constant-elasticity formula gives $P^* = 0$, which is nonsense. Real demand is not constant-elasticity: it becomes more elastic as price rises towards what customers are willing to pay. With **linear demand** $Q = a - bP$ the optimum is half-way between marginal cost and the choke price $a/b$:`,
        },
        { kind: "equation", formula: "fc06-linear-demand-price" },
        {
          kind: "md",
          md: md`### Value-based pricing for B2B

Enterprise buyers do not have a demand curve you can observe. They compare your price with (a) their **next-best alternative** (a competitor, an in-house tool, doing nothing) and (b) the **value** you create. Economic value to the customer (EVC) is the alternative's cost plus your quantified differential value; your price must sit below EVC, and how much of the differential you capture depends on proof, competition and risk.`,
        },
        { kind: "equation", formula: "fc06-evc" },
        {
          kind: "md",
          md: md`### Price discrimination

Charging different customers different prices raises profit when willingness to pay differs, provided **fences** stop customers from moving to the cheaper offer.

| Degree | Mechanism | Example for your ventures | Fence |
|---|---|---|---|
| **First** | Price each customer at their willingness to pay | Enterprise negotiation for Afterwave Enclave per site | Individual contracts, NDAs |
| **Second** | Customers self-select among versions or volumes | Good-better-best: Lockstep only; Lockstep + Enclave; full platform with Ripple; volume tiers per rig | Feature limits, rig counts, support levels |
| **Third** | Different prices for observable segments | Universities and research labs vs OEM test teams; Suhail student vs professional tickets | Verifiable segment (academic email, student ID) |

Under third-degree discrimination, the Lerner condition applies per segment: the less elastic segment gets the higher price.`,
        },
        {
          kind: "md",
          md: md`### Testing prices

A classic A/B test on conversion needs a sample per arm of:`,
        },
        { kind: "equation", formula: "fc06-ab-sample-size" },
        {
          kind: "md",
          md: md`To tell 4 % conversion from 3 % at 5 % significance and 80 % power: $(1.96+0.84)^2\times(0.0384+0.0291)/0.01^2 \approx 5{,}300$ per arm. Suhail's ticket page might get there over a season; Afterwave's enterprise funnel never will. For low-volume B2B use: **willingness-to-pay interviews** (Van Westendorp's four price questions; Gabor-Granger "would you buy at X?" ladders), **price anchors** in proposals (three options), and **staged list prices** that rise after each signed customer until you start losing deals on price.`,
        },
        { kind: "widget", widget: "pricing-experiment", props: { price: 600, elasticity: -3, unitCost: 400 }, caption: "Move price, elasticity and unit cost: find the profit-maximising price, then compare the sample size an A/B test would need with the traffic you actually have." },
      ],
    },
    {
      layer: "applied",
      title: "Pricing worked through three ventures",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave Ripple: value-based price for a test lab (illustrative numbers only)",
          given: md`Illustrative assumptions, not customer data. A robotics test team runs **10 rigs**, each with about **2,000 bench hours a year** of regression testing. A fully loaded bench hour (rig depreciation, technician, energy, lab space) costs **EUR 150**. Ripple's change-impact selection lets the team skip **30 %** of reruns after a firmware or model change. Alternative: build an in-house selection tool with two engineers (about EUR 250k/yr loaded), delivering perhaps half the benefit after a year.`,
          steps: [
            { md: md`**Differential value (bench time):** $0.30\times 2{,}000\times 10\times 150 =$ **EUR 900k/yr**. Escaped defects avoided would add to this but are harder to prove: leave them out of the base case and use them in the conversation.` },
            { md: md`**Reference value:** the in-house alternative costs about EUR 250k/yr for an inferior outcome; doing nothing costs the full 900k of wasted bench time.` },
            { md: md`**Capture share:** for a new category with limited proof, 15 to 25 % of quantified value is a defensible range: **EUR 135k to 225k/yr**. At EUR 180k the customer's payback is $180/900\times 12 = 2.4$ months.` },
            { md: md`**Check against the alternative:** EUR 180k is below the in-house cost (250k) and delivers more. The buyer's internal business case writes itself: that is what value pricing is for.` },
            { md: md`**Packaging:** price per rig (EUR 18k/rig/yr) scales with value and gives a natural expansion path: more rigs, more labs. A three-option proposal (Lockstep only, Lockstep + Enclave, full with Ripple) anchors the middle option.` },
          ],
          result: md`A price around EUR 180k/yr (EUR 18k per rig) is justified by EUR 900k/yr of quantified value and beats the build-it-yourself option. The work is in getting the customer to agree the inputs (bench hours, cost per hour, rerun share) during the pilot.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Suhail Season tickets: reading elasticity from two price points (illustrative)",
          given: md`Illustrative. Last event at **KWD 10** sold **400** tickets; a comparable event at **KWD 15** sold **300**. Variable cost per attendee (catering, badge) **KWD 4**.`,
          steps: [
            { md: md`Arc elasticity: $\Delta Q/\bar Q = -100/350 = -0.286$; $\Delta P/\bar P = 5/12.5 = 0.400$; $\varepsilon = -0.714$: **inelastic**.` },
            { md: md`Revenue: $10\times 400 = 4{,}000$ vs $15\times 300 = 4{,}500$ KWD (+12.5 %).` },
            { md: md`Contribution: $(10-4)\times 400 = 2{,}400$ vs $(15-4)\times 300 = 3{,}300$ KWD (+37.5 %).` },
            { md: md`**But:** Suhail's goal is the builder ecosystem, and 100 fewer attendees means fewer builders for sponsors and employers. Use third-degree discrimination: KWD 15 professional, KWD 5 student with ID, sponsor-funded free places for hackathon finalists.` },
          ],
          result: md`Demand is inelastic in this range, so the higher price raises revenue and contribution. The mission goal argues for segment pricing rather than one higher price.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Suhail newsletter sponsorships with linear demand (illustrative)",
          given: md`Illustrative estimate from sponsor conversations: packages demanded per year $Q = 60 - 0.02P$ ($P$ in USD). Marginal cost per package (production, reporting) **USD 500**.`,
          steps: [
            { md: md`Choke price $a/b = 60/0.02 = 3{,}000$ USD.` },
            { md: md`$P^* = (3{,}000 + 500)/2 =$ **USD 1,750**.`, hidden: true, check: { prompt: "Optimal price (USD)", answer: 1750, unit: "USD", tolerance: { abs: 1 } } },
            { md: md`$Q^* = 60 - 0.02\times 1{,}750 =$ **25** packages.`, hidden: true, check: { prompt: "Packages sold at the optimum", answer: 25, unit: "packages", tolerance: { abs: 0.1 } } },
            { md: md`Profit $= (1{,}750 - 500)\times 25 = 31{,}250$ USD. Elasticity at the optimum: $\varepsilon = -0.02\times 1{,}750/25 = -1.4$; Lerner check: $(1{,}750-500)/1{,}750 = 0.714 = 1/1.4$.` },
          ],
          result: md`USD 1,750 per package, 25 packages, USD 31,250 contribution. The Lerner condition holds at the optimum, as it must.`,
        },
        {
          kind: "question",
          question: {
            id: "fc06-l06-p1",
            type: "numeric",
            prompt: md`A hardware accessory has marginal cost EUR 20 and constant price elasticity $-2.5$. What is the profit-maximising price? (EUR, 2 decimals)`,
            answer: 33.33,
            tolerance: { abs: 0.02 },
            unit: "EUR",
            explanation: md`$P^* = c\,|\varepsilon|/(|\varepsilon|-1) = 20\times 2.5/1.5 = 33.33$ EUR. Margin $= 13.33/33.33 = 40\,\% = 1/2.5$.`,
            concepts: ["fc06.optimal-price"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting and defending prices",
      blocks: [
        {
          kind: "md",
          md: md`### How pricing is actually done in early B2B

1. **Quantify value with the customer** during discovery and the pilot: agree the inputs (hours, failure costs, energy lost to soiling) in writing.
2. **Set a list price** with a published structure (per rig, per MW, per site) and three options. Discounts come off list, so the list must be credible.
3. **Raise list price after each win** until deals stall on price, not on value.
4. **Discount for something:** multi-year commitment, upfront payment, reference rights, case study. Never discount for nothing.
5. **Write price increases into contracts:** an annual escalator (for example CPI or a fixed 3 to 5 %) is easier than renegotiation.

For public tenders (Mizan in Kuwait), price is usually scored against a technical score; the lowest compliant bid often wins. Price discrimination is limited by procurement rules: your price structure must be transparent and your options must map to the tender's lots.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Cost-plus pricing for software.** Your cost tells you the floor, not the price.
- **Pricing the pilot like the product.** A free pilot signals low value and doubles CAC; a paid pilot credited against year 1 does neither.
- **Per-user pricing for a per-rig value.** Charge on the unit that scales with the customer's value (rigs, MW, sites), not on what is easy to count.
- **Unfenced discounts.** An academic price without verification becomes everyone's price.
- **Ignoring the buyer's budget cycle.** A price that needs board approval loses a quarter; a price under the department's signing limit can close this month.`,
        },
        {
          kind: "ask",
          title: "Questions to ask in a pricing discovery call",
          items: [
            "How many bench hours (or MWh, or attendees) does this affect each year, and what does an hour cost you fully loaded?",
            "What would you do if we did not exist: build, buy a competitor, or keep the current process?",
            "Who signs at what amount, and when is next year's budget set?",
            "Which unit would you expect to pay by: per rig, per site, per test campaign?",
            "What would make this a no-brainer at the price we discussed?",
          ],
        },
        { kind: "sources", refs: ["fc06-r9", "fc06-r10"] },
        { kind: "scenario", scenario: "fc06-s2" },
        {
          kind: "question",
          question: {
            id: "fc06-l06-p2",
            type: "short",
            prompt: md`Produce a **pricing page and price rationale** for Afterwave (or Mizan) aimed at the first five customers. Include: the pricing unit and why it tracks value; three packaged options with list prices; the value calculation that justifies the middle option (illustrative inputs, clearly labelled); the pilot price and how it is credited; your discount policy (what you trade a discount for); and one fence for any segment price.`,
            rubric: [
              "Pricing unit scales with customer value (rigs, labs, MW, sites) and the reason is explained",
              "Three options with clear differentiation and list prices; the middle option is designed to be the anchor",
              "Value calculation is arithmetic-correct, uses labelled illustrative inputs, and yields a customer payback or value multiple",
              "Paid pilot with a crediting mechanism and a clear conversion path",
              "Discount policy trades price for something of value (term, upfront, references) and sets limits",
              "Segment pricing, if any, has a verifiable fence",
            ],
            modelAnswer: md`**Mizan soiling analytics: pricing for first customers (illustrative).** **Unit:** per MWp per year, because avoided soiling loss scales with plant size. **Options:** (1) **Monitor**: soiling loss estimate from plant data, monthly report: KWD 60/MWp/yr. (2) **Optimise** (anchor): Monitor + cleaning schedule optimisation + weekly alerts: KWD 120/MWp/yr. (3) **Control**: Optimise + stow and tracker logic under dust and wind, integration with plant control: KWD 200/MWp/yr, plus integration fee. **Value of Optimise for a 200 MWp plant (illustrative):** specific yield 2,000 kWh/kWp gives 400 GWh/yr; if optimised cleaning recovers 1.5 % of energy, that is 6 GWh; valued at an illustrative KWD 0.005/kWh (check the plant's PPA or cost of supply) that is KWD 30k/yr; cleaning cost avoided by fewer unnecessary cycles adds KWD 10k: total about KWD 40k/yr. Price $= 120\times 200 =$ KWD 24k/yr: value multiple 1.7x, payback about 7 months. **Pilot:** 3 months for KWD 6k, credited in full against year 1 if signed within 60 days of pilot end; success criteria agreed in writing with the operator and, where relevant, with KISR as methodology partner. **Discounts:** up to 10 % for a 3-year term, 5 % for annual upfront payment, 10 % for a public case study; never more than 20 % combined. **Segment fence:** research institutions get the Monitor option at 50 % for non-commercial use, verified by a signed research-use clause.`,
            explanation: md`Graded against the rubric. A good pricing page makes the buyer's internal business case for them.`,
            concepts: ["fc06.value-pricing", "fc06.price-discrimination"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Yusuf why the profit-maximising price satisfies (P - c)/P = -1/elasticity, and why Afterwave should not use that formula directly to set Ripple's price.",
          keyPoints: [
            "Profit is margin times quantity; raising price gains margin on remaining units and loses units",
            "At the optimum the marginal gain equals the marginal loss, which rearranges to the Lerner condition",
            "Elastic demand means low optimal margin, inelastic demand means you should raise price",
            "With near-zero marginal cost and no observable demand curve, enterprise software is priced on economic value to the customer instead",
            "Value pricing captures a share of the quantified differential value, below the customer's alternative",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc06-l06-q1",
      type: "numeric",
      prompt: md`Price rises from EUR 40 to EUR 50 and units sold fall from 1,000 to 900. Arc elasticity? (2 decimals)`,
      answer: -0.47,
      tolerance: { abs: 0.01 },
      explanation: md`$\Delta Q/\bar Q = -100/950 = -0.105$; $\Delta P/\bar P = 10/45 = 0.222$; $\varepsilon = -0.474$. Inelastic: revenue rises from 40,000 to 45,000.`,
      concepts: ["fc06.elasticity"],
      difficulty: 2,
      diagnostic: true,
    },
    {
      id: "fc06-l06-q2",
      type: "mcq",
      prompt: "Demand is inelastic at the current price. What should a profit-maximising seller do?",
      options: [
        "Lower the price to sell more",
        "Raise the price: revenue rises and costs fall with lower volume",
        "Keep the price, since inelastic means optimal",
        "Nothing can be concluded",
      ],
      answer: 1,
      explanation: md`With $|\varepsilon| < 1$, $dR/dP = Q(1+\varepsilon) > 0$, and fewer units cost less to serve. A firm never maximises profit in the inelastic region.`,
      concepts: ["fc06.elasticity", "fc06.optimal-price"],
      difficulty: 1,
    },
    {
      id: "fc06-l06-q3",
      type: "numeric",
      prompt: md`Constant elasticity $-4$, marginal cost KWD 300. Optimal price? (KWD)`,
      answer: 400,
      tolerance: { abs: 0.5 },
      unit: "KWD",
      explanation: md`$P^* = 300\times 4/3 = 400$; margin 25 % $= 1/4$.`,
      concepts: ["fc06.optimal-price"],
      difficulty: 1,
    },
    {
      id: "fc06-l06-q4",
      type: "multi",
      prompt: "Which are examples of second-degree price discrimination? (Select all.)",
      options: [
        "Good-better-best packages that customers choose between",
        "Volume tiers per rig",
        "A student price verified by ID",
        "Individually negotiated enterprise contracts",
        "Early-bird tickets that expire on a date",
      ],
      answer: [0, 1, 4],
      explanation: md`Second degree: customers self-select among versions, quantities or timing. Student pricing is third degree (observable segment); individual negotiation approximates first degree.`,
      concepts: ["fc06.price-discrimination"],
      difficulty: 2,
    },
    {
      id: "fc06-l06-q5",
      type: "numeric",
      prompt: md`You want to detect a drop in conversion from 5 % to 4 % with 5 % two-sided significance and 80 % power. Approximate sample size per arm? (use $z$ sum 2.80)`,
      answer: 6735,
      tolerance: { rel: 0.03 },
      unit: "visitors",
      explanation: md`$n = 2.80^2\times(0.05\times 0.95 + 0.04\times 0.96)/0.01^2 = 7.84\times 0.0859/0.0001 = 6{,}735$ with $z = 2.80$; with the exact $z = 2.8016$, $n \approx 6{,}743$. Either way about 6,700 per arm: far beyond any enterprise funnel.`,
      concepts: ["fc06.price-testing"],
      difficulty: 3,
    },
    {
      id: "fc06-l06-q6",
      type: "decision",
      prompt: md`A robotics customer accepts the value case (EUR 900k/yr of bench time saved) but asks for Ripple at EUR 60k instead of EUR 180k "because your software costs you almost nothing to run". How do you respond?`,
      options: [
        { text: "Agree: margin is still 90 %.", score: 0, feedback: "You give away two thirds of the price and teach the market that your price is cost-based." },
        { text: "Hold the value logic, offer a trade: a lower first-year price in exchange for a 3-year term, upfront payment or a public case study, and start at fewer rigs with a price per rig.", score: 1, feedback: "Correct: price on value, discount only for something of value, and preserve the per-rig expansion path." },
        { text: "Refuse any change and walk away.", score: 0.3, feedback: "Holding price is right, but a structured trade usually wins the deal without breaking the price." },
      ],
      explanation: md`Cost is the floor, not the price. Trade concessions for term, cash or references.`,
      concepts: ["fc06.value-pricing"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc06-l06-f1", front: "Revenue effect of price", back: md`$dR/dP = Q(1+\varepsilon)$: raise price if inelastic, lower if elastic.`, concepts: ["fc06.elasticity"] },
    { id: "fc06-l06-f2", front: "Lerner condition", back: md`$(P^*-c)/P^* = -1/\varepsilon$`, concepts: ["fc06.optimal-price"] },
    { id: "fc06-l06-f3", front: "Optimal price, constant elasticity", back: md`$P^* = c\,|\varepsilon|/(|\varepsilon|-1)$; elasticity -2 gives a 2x markup.`, concepts: ["fc06.optimal-price"] },
    { id: "fc06-l06-f4", front: "Optimal price, linear demand Q = a - bP", back: md`$P^* = (a/b + c)/2$: halfway between cost and the choke price.`, concepts: ["fc06.optimal-price"] },
    { id: "fc06-l06-f5", front: "EVC", back: "Next-best alternative's cost plus your quantified differential value; price below it and capture a share.", concepts: ["fc06.value-pricing"] },
    { id: "fc06-l06-f6", front: "Three degrees of price discrimination", back: "First: each customer's WTP. Second: self-selection among versions or volumes. Third: different prices for observable segments.", concepts: ["fc06.price-discrimination"] },
    { id: "fc06-l06-f7", front: "Sample size to tell 4 % from 3 % conversion", back: "About 5,300 per arm (5 % significance, 80 % power).", concepts: ["fc06.price-testing"] },
  ],
  scenarios: [
    {
      id: "fc06-s2",
      title: "The procurement officer says: 'Your price is 30 % above budget'",
      context: md`Illustrative situation. After a successful pilot at a European drive and motor manufacturer, the test lab lead wants Afterwave Enclave + Ripple for 8 rigs at list EUR 144k/yr (EUR 18k per rig). Procurement calls: "We have EUR 110k in this year's budget. Your price is 30 % above it. Competitors offer test automation for much less."`,
      start: "a",
      concepts: ["fc06.value-pricing", "fc06.price-discrimination"],
      nodes: {
        a: {
          md: md`What is your first move?`,
          choices: [
            { text: "Ask which competitor and what they would deliver, and restate the value the lab lead signed off in the pilot report (bench hours saved, cost per hour).", next: "b", score: 9, feedback: "Moves the conversation from price to value and tests whether the comparison is like-for-like (generic test automation is not change-impact analysis on physical rigs)." },
            { text: "Offer 30 % off to close this quarter.", next: "c", score: 1, feedback: "You confirm the price was padded and set the reference price for every renewal." },
            { text: "Escalate to the lab lead to pressure procurement.", next: "b", score: 5, feedback: "Sometimes needed, but procurement then feels bypassed. Work with them first, with the lab lead's numbers." },
          ],
        },
        b: {
          md: md`Procurement accepts the value case but the budget really is EUR 110k this year. What do you propose?`,
          choices: [
            { text: "Start with 6 rigs at list (EUR 108k) this year, with a contractual right to add 2 rigs at the same per-rig price next budget year, and a 5 % discount for a 2-year term paid annually upfront.", score: 10, feedback: "Fits the budget without cutting the unit price, protects the expansion path and trades the discount for term and cash." },
            { text: "8 rigs for EUR 110k this year, list price from year 2.", score: 6, feedback: "Wins the deal, but a 24 % first-year discount sets an anchor; year-2 'list price' increases are often resisted. Tie it to a written escalation and a case study at least." },
          ],
        },
        c: {
          md: md`Procurement accepts EUR 101k. Next week, two other prospects ask for "the same 30 % discount you gave in Germany".`,
          choices: [
            { text: "Hold list price with new prospects, say plainly that the German price was a one-off you will not repeat, and from now on discount only against documented terms.", score: 4, feedback: "The honest recovery, but you will keep paying for that discount: references talk. Next time, trade every concession for term, cash or a case study." },
          ],
        },
      },
    },
  ],
};

export default lesson;
