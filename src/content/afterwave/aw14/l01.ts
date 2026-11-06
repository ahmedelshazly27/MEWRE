import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "aw14-l01",
  title: "Pricing infrastructure software: value metrics, on-prem vs hosted, and a price build for Lockstep and Ripple",
  summary:
    "How to choose the unit Afterwave charges for (rig, seat, data volume, platform fee, analysed change), how on-prem and isolated-tenant deployment change cost to serve and therefore price, and a full illustrative price build for a drives and motors test lab with Lockstep, Enclave and Ripple.",
  minutes: 80,
  objectives: [
    "Compare per-rig, per-seat, per-data-volume, platform-fee and per-change value metrics for test infrastructure and pick one with reasons",
    "Build an annual contract value from a platform fee plus per-rig modules and check it against quantified customer value",
    "Compute gross margin for on-prem and hosted (isolated tenant) deployments and set a hosted uplift",
    "Structure a paid pilot, multi-year discount and price list that a procurement team can process",
  ],
  concepts: [
    { id: "aw14.value-metric", name: "Value metric", description: "The unit the price scales with (rig, seat, GB, analysed change). A good one grows with the customer's value, is easy to count and audit, and does not punish the behaviour the product needs (capturing more data).", competency: "aw-business", related: ["fc06.value-pricing"] },
    { id: "aw14.price-build", name: "Price build (platform fee plus per-rig modules)", description: "ACV = platform fee + rigs x (per-rig module prices), checked against quantified value (capture ratio) and the customer's payback.", competency: "aw-business", related: ["aw14.value-metric", "fc06.value-pricing"] },
    { id: "aw14.cost-to-serve", name: "Cost to serve: on-prem vs hosted", description: "On-prem shifts infrastructure cost to the customer but adds deployment, version support and security review effort; an isolated hosted tenant adds infrastructure cost. Gross margin = (price - cost to serve) / price.", competency: "aw-business", related: ["fc06.contribution-margin"] },
    { id: "aw14.paid-pilot", name: "Paid pilot with credit", description: "A fixed-fee, time-boxed pilot with agreed success metrics whose fee is credited against the first year if the customer converts.", competency: "aw-business", related: ["fc08.pilot-contract"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "What to charge for, and what it costs to deliver",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will quote Afterwave's first prices yourself, probably in a pilot proposal before you have a price list. The unit you choose (per rig, per seat, per terabyte) is hard to change once three customers have signed it, and it decides whether revenue grows as the customer adds rigs and bench memory or stalls. Founder Core gave you value pricing and elasticity; this lesson applies them to an on-prem infrastructure product sold to hardware test teams.`,
        },
        { kind: "xref", to: "fc06-l06", note: "Founder Core: elasticity, the profit-maximising price, value-based pricing and price discrimination. This lesson assumes them." },
        {
          kind: "md",
          md: md`### The value metric decides how revenue grows

A **value metric** is the unit the price scales with. For test infrastructure the candidates are:

| Value metric | Grows with customer value? | Easy to count and audit? | Behaviour it encourages | Fit for Afterwave |
|---|---|---|---|---|
| **Per rig (test station)** | Yes: value is bench hours saved, which scale with rigs | Yes: rigs are assets with IDs and a Lockstep install each | Connect every rig | **Primary metric** for Lockstep and Ripple |
| **Per seat (named user)** | Weakly: a lab of 20 rigs may have 5 test engineers; agents will replace some seat activity | Yes | Share logins, restrict access | Poor; at most for viewer licences |
| **Per data volume (GB or TB captured)** | Cost-aligned, not value-aligned | Yes | **Capture less**, which starves bench memory and Ripple | Avoid as a primary metric; use only as a fair-use cap on hosted storage |
| **Platform fee (per site or Enclave instance)** | Covers fixed cost to serve | Yes | Neutral | Yes, as a floor that pays for deployment and support |
| **Per analysed change (Ripple run)** | Yes, directly | Yes | Can make teams hesitate to run analysis | Possible later as an overage; risky as the only metric |

The rule from Founder Core still holds: price on the metric that moves with **value to the customer**, not with **your cost**. For Afterwave the value is rig hours not wasted on unnecessary reruns and defects not escaped, so the rig is the natural unit. The platform fee covers what does not scale with rigs: the Enclave deployment, security review, upgrades.

### The price build

An annual contract value (ACV) for a mixed platform-plus-module offer:`,
        },
        { kind: "equation", formula: "aw14-acv-build" },
        {
          kind: "md",
          md: md`Two checks keep the build honest. First, the **capture ratio**: what share of the quantified annual value $V$ the customer pays.`,
        },
        { kind: "equation", formula: "aw14-capture-ratio" },
        {
          kind: "md",
          md: md`For a new category with limited proof, 10 to 25 % is defensible; above 30 % the buyer's business case gets thin. Second, the **customer payback** in months, $12\,ACV/V$, which is what a test director puts in his internal request.

### On-prem vs hosted: same product, different cost to serve

Afterwave Enclave runs either **on customer servers** (on-prem, often air-gapped or behind a strict firewall) or in an **isolated hosted tenant** that Afterwave operates. The customer's value is the same; your cost to serve is not.`,
        },
        { kind: "equation", formula: "aw14-gross-margin" },
        {
          kind: "md",
          md: md`| Cost item | On-prem | Isolated hosted tenant |
|---|---|---|
| Compute, storage, GPUs for local models | Customer pays (their servers) | **Afterwave pays**, recharged in price |
| Deployment and integration | High: site visit, DAQ and network integration, security review | Medium: network link, identity, data import |
| Upgrades | Many versions in the field; each customer upgrades on its own schedule | One version, continuous delivery |
| Support | Remote sessions through the customer's access rules; slower diagnosis | Direct observability |
| Security review | Long but one-off per site | Long, plus ongoing audits (for example ISO 27001 or SOC 2 asked by the customer) |

Consequences for pricing:

- **Charge a one-off deployment fee** for on-prem (or bundle it into a three-year term) so year 1 is not loss-making.
- **Price hosted with an uplift** that covers infrastructure, so gross margin is similar on both, rather than the same list price with a lower margin.
- **On-prem is usually sold as a term licence with mandatory support and upgrades** (annual subscription), not a perpetual licence, so revenue stays recurring.`,
        },
        {
          kind: "widget",
          widget: "pricing-experiment",
          props: { price: 10000, elasticity: 1.4, unitCost: 1500 },
          caption: "Illustrative per-rig annual price for Lockstep plus Ripple (EUR 10k), cost to serve per rig EUR 1.5k. Move elasticity to see how sensitive the profit-maximising price is; in early B2B you do not know the elasticity, which is why you anchor on value and test with proposals, not A/B pages.",
        },
      ],
    },
    {
      layer: "applied",
      title: "A price build for a drives and motors test lab",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Lockstep + Enclave + Ripple for a 24-rig lab (illustrative numbers only)",
          given: md`Illustrative, not customer data. A drives and motors validation lab runs **24 rigs** (dynos and inverter test stands), each about **1,800 bench hours** a year. A fully loaded bench hour costs **EUR 120**. In the pilot, Ripple's rerun lists cut unnecessary reruns after firmware changes by **25 %** of bench time (to be measured, not assumed, in a real pilot). Draft price list: platform fee (Enclave instance, bench memory, admin) **EUR 40k/yr**; Lockstep **EUR 6k per rig per year**; Ripple **EUR 4k per rig per year**. On-prem cost to serve: one-off deployment **25 engineer-days at EUR 1,000**; support and upgrades **EUR 35k/yr**. A hosted isolated tenant would add **EUR 30k/yr** of infrastructure.`,
          steps: [
            { md: md`**ACV:** $F + n(p_L + p_R) = 40 + 24\times(6 + 4) = 40 + 240 =$ **EUR 280k/yr**. Effective price per rig $= 280/24 =$ EUR 11.7k.` },
            { md: md`**Quantified value:** $V = 24\times1{,}800\times0.25\times120 = 10{,}800\ \text{h}\times120 =$ **EUR 1.296m/yr** of bench time freed.` },
            { md: md`**Capture ratio:** $k = 280/1{,}296 = 21.6\%$, inside the 10 to 25 % band. **Payback:** $12\times280/1{,}296 = 2.6$ months.` },
            { md: md`**On-prem gross margin (recurring):** $(280 - 35)/280 = 87.5\%$. Year 1 also carries EUR 25k of deployment: charge it as a one-off fee or year 1 margin falls to $(280 - 35 - 25)/280 = 78.6\%$.` },
            { md: md`**Hosted at the same price:** $(280 - 35 - 30)/280 = 76.8\%$. To keep 87.5 %, solve $(P - 65)/P = 0.875$: $P = 65/0.125 =$ EUR 520k, which is unrealistic. A practical answer: add the infrastructure at cost plus a margin (for example EUR 40k), giving $P = 320$ and margin $(320 - 65)/320 = 79.7\%$, and say so openly.` },
          ],
          result: md`The lab's ACV is **EUR 280k on-prem** (EUR 320k hosted with a visible infrastructure line), about 22 % of the bench time it frees, with a payback under three months. Note what drives value: rigs, hours and rerun share. Those three numbers are what the pilot must measure with the customer.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Three-year deal with a discount",
          given: md`Same lab (illustrative). Procurement asks for a **15 %** discount in exchange for a three-year commitment, paid annually. The deployment fee of EUR 25k is waived.`,
          steps: [
            { md: md`Discounted ACV $= 280\times(1 - 0.15)$.` },
            { md: md`= **EUR 238k/yr**.`, hidden: true, check: { prompt: "Discounted ACV (EUR k/yr)", answer: 238, unit: "EUR k", tolerance: { abs: 0.5 } } },
            { md: md`Total contract value over three years, net of the waived deployment cost: $3\times238 - 25$.` },
            { md: md`= **EUR 689k**.`, hidden: true, check: { prompt: "Three-year value net of waived deployment (EUR k)", answer: 689, unit: "EUR k", tolerance: { abs: 1 } } },
            { md: md`Capture ratio at the discounted price $= 238/1{,}296$ = **18.4 %**.`, hidden: true, check: { prompt: "Capture ratio after discount (%)", answer: 18.4, unit: "%", tolerance: { abs: 0.2 } } },
          ],
          result: md`A 15 % discount for a three-year commitment is a reasonable trade at seed stage: it buys revenue certainty that investors value. Trade discount only for something (term, upfront payment, a reference, a case study), never to close faster on its own.`,
        },
        {
          kind: "widget",
          widget: "unit-economics",
          props: { price: 23000, grossMargin: 0.85, cac: 150000, churn: 0.01, cash: 1500000, burn: 110000 },
          caption: "Illustrative: EUR 280k ACV is about EUR 23k a month. With a long enterprise sale (CAC here EUR 150k including founder time and pilot cost) and low churn, check CAC payback and LTV/CAC.",
        },
        {
          kind: "question",
          question: {
            id: "aw14-l01-p1",
            type: "numeric",
            prompt: md`Illustrative: a battery test lab with **12 rigs** buys a platform fee of EUR 40k plus Lockstep (EUR 6k per rig) and Ripple (EUR 4k per rig). What is the ACV (EUR k)?`,
            answer: 160,
            tolerance: { abs: 0.5 },
            unit: "EUR k",
            explanation: md`$40 + 12\times(6+4) = 160$ EUR k. Effective per-rig price $160/12 = 13.3$ EUR k: the platform fee weighs more on small labs, which is intended (fixed cost to serve).`,
            concepts: ["aw14.price-build"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting and defending the first prices",
      blocks: [
        {
          kind: "md",
          md: md`### How the first prices actually get set

- **Before any price list:** quote a **paid pilot**: fixed fee (illustrative EUR 20k to 50k for 8 to 12 weeks on 2 to 4 rigs), written success metrics (rerun reduction measured against the lab's own baseline, capture uptime, time to first Ripple list), and the fee **credited against year 1** if they convert. Free pilots attract tourists and never reach procurement.
- **The economic buyer** is usually the head of validation or test engineering; the budget may sit in test equipment (capex) rather than software (opex). Ask early which budget line pays; a per-rig price maps neatly onto a capex-minded buyer's rig count.
- **Procurement** will want a price list, a quote with line items, a licence agreement, and the security questionnaire. A clean structure (platform fee, per-rig modules, deployment, optional hosted infrastructure) gets through faster than a single opaque number.
- **Discount authority:** decide in advance the maximum discount you will give and what you get for it (multi-year term, upfront payment, reference, logo, case study).
- **Price increases:** write an annual indexation clause (for example CPI-linked or a fixed 3 to 5 %) into the first contracts.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Pricing per GB because cloud tools do:** it taxes capture, the very behaviour bench memory and Ripple need.
- **Same price on-prem and hosted:** hosted margin quietly falls by the infrastructure bill, which grows with every model you train for the customer.
- **Perpetual licences to please procurement:** one-off revenue that investors will not count as ARR.
- **Pilot without a baseline:** if the lab's rerun hours before Ripple were never measured, the pilot cannot prove value and the price has nothing to stand on.
- **Services dressed as product:** heavy custom DAQ integration billed inside the subscription lowers gross margin and hides the cost to serve; bill it separately.`,
        },
        {
          kind: "ask",
          title: "Questions for the test director before you quote",
          items: [
            "How many rigs, and how many bench hours does each run in a typical month?",
            "What does a bench hour cost you fully loaded, and who has that number?",
            "After a firmware or model change, how do you decide what to rerun today, and how long does a full regression take?",
            "Can software run on your network, or must it be on servers you own, air-gapped?",
            "Which budget pays for this: test equipment, software, or a programme?",
            "What would you need to see at the end of a pilot to buy for all rigs?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "aw14-l01-p2",
            type: "short",
            prompt: md`Write Afterwave's **first price sheet** (one page) for a prospect that runs on-prem: value metric and why, platform fee and per-rig module prices, deployment fee, hosted uplift, paid pilot terms with credit, multi-year discount policy, and a worked example ACV for a 16-rig lab with its capture ratio under stated illustrative assumptions.`,
            rubric: [
              "Chooses the rig as the primary value metric and explains why seats and data volume are worse for this product",
              "Separates a platform fee from per-rig module prices, and a one-off deployment fee from the subscription",
              "States a hosted (isolated tenant) uplift tied to infrastructure cost rather than the same list price",
              "Defines a paid pilot: fixed fee, duration, rigs, written success metrics, credit against year 1",
              "Gives a discount policy that trades discount for term, upfront payment or references",
              "Computes ACV for 16 rigs and a capture ratio with labelled illustrative value assumptions, arithmetic correct",
            ],
            modelAnswer: md`**Afterwave price sheet (draft, illustrative prices)**

**Value metric:** per connected rig. Value is rig hours freed and escaped defects avoided, which scale with rigs. Seats would penalise sharing and agents; data volume would penalise capture.

| Line | Price |
|---|---|
| Platform fee (Enclave instance, bench memory, admin, updates) | EUR 40k/yr |
| Lockstep capture | EUR 6k per rig per yr |
| Ripple change impact | EUR 4k per rig per yr |
| On-prem deployment (one-off) | EUR 25k |
| Hosted isolated tenant | + infrastructure at cost + 25 % (quoted per customer) |

**Pilot:** EUR 30k fixed, 10 weeks, up to 3 rigs; success metrics: rerun bench hours vs the lab's 4-week baseline, capture uptime above 99 %, first Ripple list within 4 weeks. Fee credited against year 1 if signed within 60 days of the pilot report.

**Discounts:** up to 10 % for a two-year term, 15 % for three years or annual upfront payment, a further 5 % for a public case study. Nothing for speed alone. 4 % annual indexation.

**Example, 16 rigs:** $ACV = 40 + 16\times10 = 200$ EUR k. Assume 1,800 h per rig, EUR 120 per bench hour, 25 % rerun reduction: $V = 16\times1{,}800\times0.25\times120 = 864$ EUR k. Capture ratio $200/864 = 23\%$; payback 2.8 months.`,
            explanation: md`A good first price sheet is simple enough for procurement, scales with the customer's value, separates services from subscription and makes the pilot a paid step towards the contract.`,
            concepts: ["aw14.value-metric", "aw14.price-build", "aw14.paid-pilot", "aw14.cost-to-serve"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["aw14-r14"] },
        { kind: "xref", to: "fc08.pilot-contract", note: "Founder Core: the pilot contract itself (scope, IP, data, liability)." },
      ],
    },
  ],
  quiz: [
    {
      id: "aw14-l01-q1",
      type: "mcq",
      prompt: "Why is data volume (GB captured) a poor primary value metric for Lockstep and Ripple?",
      options: [
        "It is hard to measure",
        "It aligns price with Afterwave's storage cost and discourages the customer from capturing the data that bench memory and Ripple need",
        "Customers prefer per-seat pricing",
        "It cannot be used on-prem",
      ],
      answer: 1,
      explanation: md`A metric should grow with customer value and not punish the behaviour the product depends on. Volume pricing makes every extra channel or test a cost decision for the customer.`,
      concepts: ["aw14.value-metric"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "aw14-l01-q2",
      type: "numeric",
      prompt: md`Illustrative: ACV EUR 150k, quantified annual value EUR 900k. What is the capture ratio (%)?`,
      answer: 16.7,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$k = 150/900 = 16.7\%$. Payback $12\times150/900 = 2$ months.`,
      concepts: ["aw14.price-build"],
      difficulty: 1,
    },
    {
      id: "aw14-l01-q3",
      type: "numeric",
      prompt: md`A hosted tenant is priced at EUR 200k/yr. Support and upgrades cost EUR 30k/yr and infrastructure EUR 25k/yr. What is the gross margin (%)?`,
      answer: 72.5,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$(200 - 30 - 25)/200 = 145/200 = 72.5\%$.`,
      concepts: ["aw14.cost-to-serve"],
      difficulty: 1,
    },
    {
      id: "aw14-l01-q4",
      type: "multi",
      prompt: "Which are good reasons for a platform fee on top of per-rig prices? (Select all.)",
      options: [
        "It covers fixed cost to serve (deployment, security review, upgrades) that does not scale with rigs",
        "It protects margin on small labs",
        "It makes per-rig prices meaningless",
        "It gives a floor that keeps revenue stable if a customer disconnects some rigs",
      ],
      answer: [0, 1, 3],
      explanation: md`The platform fee pays for what is fixed per site; per-rig prices carry the value scaling.`,
      concepts: ["aw14.price-build", "aw14.cost-to-serve"],
      difficulty: 2,
    },
    {
      id: "aw14-l01-q5",
      type: "decision",
      prompt: md`A humanoid company asks for a free 3-month pilot on 2 rigs, "then we'll talk about price". What do you do?`,
      options: [
        { text: "Accept: any logo helps.", score: 0.2, feedback: "Free pilots rarely reach procurement and give you no signal on willingness to pay." },
        { text: "Offer a fixed-fee pilot (for example EUR 25k for 10 weeks), written success metrics against their own baseline, fee credited to year 1 on conversion, and the year 1 price range in the proposal.", score: 1, feedback: "A paid, measured pilot tests both value and the buying process, and anchors the price before the pilot." },
        { text: "Refuse any pilot and ask for an annual contract.", score: 0.3, feedback: "Too early: a new category needs proof on their rigs." },
      ],
      explanation: md`The paid pilot with credit is the standard bridge from interest to contract in enterprise infrastructure.`,
      concepts: ["aw14.paid-pilot"],
      difficulty: 2,
    },
    {
      id: "aw14-l01-q6",
      type: "mcq",
      prompt: "Procurement prefers a perpetual on-prem licence. What is the main problem for Afterwave?",
      options: [
        "Perpetual licences are illegal in the EU",
        "It is one-off revenue that investors will not count as ARR, and it weakens the funding for upgrades and support",
        "It requires a hosted tenant",
        "It makes the platform fee impossible",
      ],
      answer: 1,
      explanation: md`Sell on-prem as an annual term licence with mandatory support and upgrades, so revenue stays recurring.`,
      concepts: ["aw14.cost-to-serve"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "aw14-l01-f1", front: "Afterwave's primary value metric", back: "Per connected rig: value (bench hours freed, defects caught) scales with rigs; platform fee covers fixed cost per site.", concepts: ["aw14.value-metric"] },
    { id: "aw14-l01-f2", front: "ACV build", back: "$ACV = F + n\\sum_j p_j$: platform fee plus rigs times per-rig module prices.", concepts: ["aw14.price-build"] },
    { id: "aw14-l01-f3", front: "Capture ratio band for a new category", back: "About 10 to 25 % of quantified annual value; payback in months = 12 ACV / V.", concepts: ["aw14.price-build"] },
    { id: "aw14-l01-f4", front: "On-prem vs hosted cost to serve", back: "On-prem: customer pays infrastructure, you pay deployment and multi-version support. Hosted: you pay infrastructure, so price an uplift.", concepts: ["aw14.cost-to-serve"] },
    { id: "aw14-l01-f5", front: "Paid pilot terms", back: "Fixed fee, fixed weeks and rigs, written metrics against the lab's baseline, fee credited to year 1 on conversion.", concepts: ["aw14.paid-pilot"] },
    { id: "aw14-l01-f6", front: "Why not per seat?", back: "Few engineers run many rigs; seats discourage sharing and agents; revenue would not grow with rig count.", concepts: ["aw14.value-metric"] },
  ],
};

export default lesson;
