import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "mz04-l02",
  title: "What a soiled MWh is worth in Kuwait: tariff vs displaced fuel",
  summary:
    "The same dust loss is worth a low PPA tariff to the IPP, fuel minus tariff to the offtaker and the full displaced-fuel value to the state. Each party's optimal interval differs by a factor of two or more, which creates a gap that contracts, side payments and Mizan's product can close.",
  minutes: 60,
  objectives: [
    "You can state the value of a soiled MWh to the IPP, the offtaker and the national economy, and why they differ",
    "You can compute each party's optimal cleaning interval and the national gain from aligning them",
    "You can size the range of side payments that makes both the IPP and the state better off",
    "You can frame a cleaning case in KWD of fuel saved for MEWRE without double counting transfers",
  ],
  concepts: [
    {
      id: "mz04.value-of-soiled-mwh",
      name: "Value of a soiled MWh",
      description: "IPP: the tariff t. Offtaker: v − t (it burns fuel worth v but stops paying t). National: v, the displaced-fuel value at opportunity cost. Zero during curtailment.",
      competency: "mz-cleaning",
      related: ["m00.displaced-fuel-value", "m00.economic-vs-financial", "m09.ppa-tariff"],
    },
    {
      id: "mz04.stakeholder-optimum",
      name: "Stakeholder-specific cleaning optimum",
      description: "Because T* ∝ 1/√p, a party valuing energy at the fuel value (about USD 85/MWh) wants to clean about 2.4 times as often as an IPP paid about USD 15/MWh.",
      competency: "mz-cleaning",
      related: ["mz04.square-root-rule", "m12.cleaning-economics"],
    },
    {
      id: "mz04.incentive-gap",
      name: "Cleaning incentive gap and side payments",
      description: "The IPP bears all cleaning cost but captures only the tariff; the state captures the fuel saving. Any payment between the IPP's net cost and the state's net gain from cleaning more makes both better off.",
      competency: "mz-cleaning",
      related: ["m09.pr-guarantee", "m09.om-scope"],
    },
    {
      id: "mz04.state-owned-value",
      name: "State-owned plants value energy at fuel",
      description: "A plant owned by the state with no PPA (such as Shagaya Phase I, owned by MEWRE and operated by KISR) should be cleaned to the national optimum, since no tariff stands between dust and fuel.",
      competency: "mz-cleaning",
      related: ["m00.displaced-fuel-value"],
    },
  ],
  sections: [
    // ------------------------------------------------------------------ THEORY
    {
      layer: "theory",
      title: "Three prices for one MWh",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The value of energy $p$ is the input that moves the cleaning optimum most, and in Kuwait it differs by a factor of five or more depending on who you ask. If Mizan sells to an IPP at its tariff, the case is thin; if Mizan frames the same dust loss in fuel saved for MEWRE or for a state-owned plant, it is several times larger. Knowing which value applies to which buyer, and why, is the difference between a weak and a strong commercial story.`,
        },
        {
          kind: "xref",
          to: "m00-l03",
          note: "Track 0: Kuwait tariffs, cost of supply, the value of displaced fuel (heat rate × fuel price, about 26 fils/kWh for LNG in a CCGT and 37 fils/kWh for crude in an old steam unit) and economic vs financial value. Not repeated here.",
        },
        {
          kind: "md",
          md: md`## What happens when dust takes a MWh

When soiling cuts a solar plant's output by one MWh, demand does not fall. The system operator makes that MWh with the **marginal thermal unit** (or, at summer peaks with a thin reserve margin, with imports or by shedding load). Three parties see three different numbers:

- **The IPP** sells energy at the PPA tariff $t$ per MWh. It loses $t$ and pays for every cleaning.
- **The offtaker** (MEWRE, buying under the PPA) no longer pays $t$ for that MWh but must generate it from fuel worth $v$. Its net loss is $v - t$.
- **The national economy**, counting both sides as one (or treating the tariff as a transfer), loses the fuel: $v$.`,
        },
        { kind: "equation", formula: "mz04-value-viewpoints" },
        {
          kind: "md",
          md: md`## Kuwaiti orders of magnitude (1 KWD = 3.25 USD)

| Value | fils/kWh | USD/MWh | Basis |
|---|---|---|---|
| Illustrative Gulf PV IPP tariff | about 4.6 | 15 | Labelled illustrative; Shagaya Zone 1 tariff not published |
| Analyst estimate of solar cost in Kuwait | 7 to 8 | 23 to 26 | Quoted in Track 0 m00 |
| Displaced LNG in a CCGT | about 26 | about 85 | 7.5 MJ/kWh, LNG USD 12/MMBtu (m00 example) |
| Displaced crude in an old steam unit | about 37 | about 120 | 10.5 MJ/kWh, crude USD 70/bbl (m00 example) |

The state's value of a MWh is five to eight times the IPP's. Since $T^* \propto 1/\sqrt{p}$, the state's optimum interval is $\sqrt{85/15} = 2.4$ to $\sqrt{120/15} = 2.8$ times shorter.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Optimal interval and minimum cost vs value of energy (illustrative 500 MWp plant)",
          xKey: "value",
          xLabel: "Value of energy (USD/MWh)",
          yLabel: "Days / USD m per year",
          series: [
            { key: "interval", label: "Optimal interval (days)" },
            { key: "cost", label: "Minimum annual cost (USD m)" },
          ],
          data: [
            { value: "15 (IPP tariff)", interval: 30.2, cost: 1.81 },
            { value: "25 (solar cost)", interval: 23.4, cost: 2.34 },
            { value: "70 (offtaker)", interval: 14.0, cost: 3.92 },
            { value: "85 (LNG CCGT)", interval: 12.7, cost: 4.31 },
            { value: "120 (crude steam)", interval: 10.7, cost: 5.13 },
          ],
          caption: "Plant of lesson 1: 1,000 GWh/yr clean, 0.4 %/day, USD 75,000 per manual cycle. The 'offtaker' bar uses v − t = 85 − 15.",
        },
        {
          kind: "md",
          md: md`## Why nobody cleans to the national optimum

Under a standard energy-only PPA the IPP decides cleaning, pays all of it and keeps only $t$ per recovered MWh. It rationally cleans at its own optimum (about monthly in the example). The offtaker would gladly see more cleaning (it saves $v - t$ per recovered MWh) but pays none of the cost. This is a textbook **externality**: the decision maker does not capture most of the benefit.

Two refinements:

1. **Curtailment and deemed energy.** If the plant is curtailed (grid constraint, low demand), the soiled MWh would not have been delivered anyway: its value to everyone is zero in those hours. A PPA that pays deemed energy for offtaker-caused curtailment usually computes it from available capacity, and soiling is the IPP's risk, so dust can also reduce deemed payments. Check the actual PPA.
2. **Timing.** Kuwait's dust peaks in the hot season, when demand peaks and the marginal unit is the least efficient. The national value of a summer MWh is higher than the annual average, which pushes the state's optimum even shorter in exactly the months when soiling is worst.

## The state-owned case

**Shagaya Phase I** (70 MW: 50 MW CSP, 10 MW wind, 10 MW PV reported as 11.15 MW) was built by KISR and transferred to MEW, now MEWRE; KISR operates it. There is no IPP and no tariff between dust and fuel: its correct $p$ is the national value. The RSER 2020 paper reports monthly water cleaning at the PV plant. Monthly is close to what a low-value IPP would choose; at fuel value the arithmetic points to roughly fortnightly cleaning if per-MWp cleaning costs are similar. That is a **hypothesis for the pilot**, not a finding: a 10 MW research plant has different cleaning costs and constraints.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "PPA terms to confirm",
          md: md`Whether Kuwait's KAPP PV PPAs (Shagaya Phase III Zone 1 and Zone 2) contain any performance-ratio guarantee, soiling clause, cleaning standard or deemed-energy definition that touches soiling is not in the research brief. Read the actual PPA or the RFP's draft PPA before claiming how cleaning incentives work on a specific Kuwaiti IPP.`,
        },
        {
          kind: "widget",
          widget: "soiling",
          caption: "Keep the lesson 1 plant and change only the energy value: 15 (IPP), 70 (offtaker net), 85 (national, LNG) and 120 (national, crude). Note the interval at each value and how the total cost rises with the square root of value.",
        },
        { kind: "sources", refs: ["mz04-r2", "mz04-r1"] },
      ],
    },
    // ------------------------------------------------------------------ APPLIED
    {
      layer: "applied",
      title: "Three optima and the gain from aligning them",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "IPP, offtaker and national optimum on the same plant",
          given: md`Lesson 1 plant (illustrative): $E = 1{,}000{,}000$ MWh/yr, $E_d = 2{,}739.7$ MWh/day, $s = 0.004$/day, $C$ = USD 75,000 per cycle. Tariff $t$ = USD 15/MWh (illustrative), displaced-fuel value $v$ = USD 85/MWh (LNG in a CCGT).`,
          steps: [
            { md: md`IPP, $p = 15$: $T^* = 30.2$ days, average loss 6.04 % (lesson 1).` },
            { md: md`Offtaker, $p = v - t = 70$: $T^* = \sqrt{2 \times 75{,}000/(70 \times 2{,}739.7 \times 0.004)} = 14.0$ days.` },
            { md: md`National, $p = 85$: $T^* = \sqrt{2 \times 75{,}000/(85 \times 2{,}739.7 \times 0.004)} = 12.7$ days, average loss 2.54 %.` },
            { md: md`National cost at the IPP's choice: cleaning USD 0.906 m + loss $0.0604 \times 10^6 \times 85 =$ USD 5.135 m $=$ USD 6.04 m/yr. At the national optimum: $J^* = \sqrt{2 \cdot 365 \cdot 75{,}000 \cdot 85 \cdot 10^6 \cdot 0.004} =$ USD 4.31 m/yr.` },
            { md: md`Deadweight loss of misalignment: $6.04 - 4.31 =$ **USD 1.73 m/yr** (about KWD 0.53 m), on a 500 MWp plant.` },
          ],
          result: md`The IPP's private optimum is about monthly; the state's is about every 13 days. Leaving cleaning to the IPP's incentives wastes about USD 1.7 m a year of national value on this one plant: fuel burned to replace dust losses that would have been cheaper to clean away.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Who wins and who loses if the IPP cleans every 12.7 days",
          given: md`Same plant. Suppose the IPP is asked to move from 30.2 to 12.7 days.`,
          steps: [
            { md: md`Energy recovered: $E\,s\,(30.2 - 12.7)/2 = 10^6 \times 0.004 \times 17.5/2 = 35{,}000$ MWh/yr (exactly 35,036 with unrounded intervals).` },
            {
              md: md`IPP: extra cleaning $365 \times 75{,}000/12.69 - 0.906 = 2.157 - 0.906 = 1.251$ m; extra revenue $35{,}036 \times 15 = 0.526$ m. Net cost to the IPP $= 1.251 - 0.526 = 0.725$ USD m/yr.`,
              hidden: true,
              check: { prompt: "Net annual cost to the IPP of cleaning at the national optimum", answer: 0.725, unit: "USD m/yr", tolerance: { rel: 0.02 } },
            },
            {
              md: md`Offtaker: fuel saved $35{,}036 \times 85 = 2.978$ m minus extra tariff paid $0.526$ m $= 2.453$ USD m/yr.`,
              hidden: true,
              check: { prompt: "Net annual gain to the offtaker", answer: 2.453, unit: "USD m/yr", tolerance: { rel: 0.02 } },
            },
            { md: md`Check: national gain $= 2.453 - 0.725 = 1.73$ m, the deadweight loss found above.` },
          ],
          result: md`Any annual payment from the offtaker to the IPP between USD 0.73 m and 2.45 m (about KWD 0.22 m to 0.75 m) leaves both better off. A payment of USD 1.2 m, for example, gives the IPP +0.47 m and the state +1.25 m a year. The hard part is not the arithmetic but verifying that the extra cleaning happened and recovered the energy (lesson 6).`,
        },
        {
          kind: "question",
          question: {
            id: "mz04-l02-p1",
            type: "numeric",
            prompt: md`Same plant, but the marginal fuel is crude in an old steam unit, $v$ = USD 120/MWh, and the tariff is USD 15/MWh. What is the **offtaker's** optimal cleaning interval in days?`,
            answer: 11.42,
            tolerance: { rel: 0.02 },
            unit: "days",
            explanation: md`Offtaker value $p = v - t = 105$ USD/MWh. $T^* = \sqrt{2 \times 75{,}000/(105 \times 2{,}739.7 \times 0.004)} = \sqrt{150{,}000/1{,}150.7} = \sqrt{130.4} = 11.4$ days. The national optimum ($p = 120$) is 10.7 days.`,
            concepts: ["mz04.value-of-soiled-mwh", "mz04.stakeholder-optimum"],
            difficulty: 2,
          },
        },
      ],
    },
    // ------------------------------------------------------------------ FIELD
    {
      layer: "field",
      title: "Selling the same dust to different buyers",
      blocks: [
        {
          kind: "md",
          md: md`**Who values what, and how to frame it.**

| Buyer | Value of a soiled MWh | Frame | Currency |
|---|---|---|---|
| IPP asset manager, CFO | Tariff $t$, minus curtailed hours | Revenue recovered minus extra O&M, effect on equity IRR and DSCR | USD |
| O&M contractor (fixed-price cleaning scope) | Its cost per cycle; energy only through PR or availability bonuses | Cost per cycle avoided, bonuses earned | USD |
| MEWRE planning and finance | $v - t$ on IPP plants; $v$ on state plants | Fuel saved, barrels or MMBtu, KWD | KWD |
| KISR (Shagaya Phase I operator) | $v$ (state-owned) and research value | Validated method, publishable result, fuel saved | KWD and papers |

**Contract levers that move the IPP towards the national optimum** (generic options; whether Kuwaiti PPAs allow them must be checked):

1. **A minimum cleaning standard** in the PPA or O&M scope: frequency or a soiling-ratio threshold. Simple, but it prescribes method instead of outcome.
2. **A soiling-indexed bonus**: the offtaker pays a share of verified fuel savings above a baseline. Aligns incentives, needs trusted M&V.
3. **A temperature-corrected PR guarantee** at the offtaker's level of value. Captures soiling indirectly, together with every other loss.
4. **The offtaker buys cleaning directly** on state-owned plants: no externality at all.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`1. **Adding the tariff to the fuel value** ("the state saves 85 + 15"): the tariff is a payment, not a saving. 2. **Using the retail tariff** (2 fils/kWh for homes) as the value of energy: it is a subsidised price, not a cost. 3. **Ignoring curtailment**: cleaning before a curtailed period recovers nothing. 4. **Presenting a USD-per-MWh number to MEWRE**: give fuel saved and KWD, with a range of fuel prices. 5. **Claiming Shagaya should clean fortnightly** before measuring its soiling rate and costs: it is a hypothesis.`,
        },
        { kind: "xref", to: "m09-l05", note: "Track 0: PPA structure in Kuwait's IPP model (tariff, deemed energy, change in law). Read it before proposing any soiling clause." },
        { kind: "scenario", scenario: "mz04-s1" },
        {
          kind: "question",
          question: {
            id: "mz04-l02-p2",
            type: "short",
            prompt: md`Write the half-page "value of cleaning" paragraph Mizan would put in a concept note to MEWRE's renewable energy sector, for a 500 MWp IPP plant (illustrative numbers). It must state whose value of energy you use, the result in KWD and fuel, the side-payment logic, and what must be verified.`,
            rubric: [
              "Uses the offtaker or national value (fuel at opportunity cost), not the IPP tariff or the retail tariff, and says why",
              "Treats the PPA tariff as a transfer: net state gain is fuel saved minus extra tariff paid",
              "Gives correct illustrative numbers in KWD (and fuel or MWh), clearly labelled illustrative, with a fuel-price range",
              "Explains why the IPP will not clean more on its own (it bears the cost, keeps only the tariff) and proposes a mechanism (bonus, standard, PR guarantee)",
              "States what must be verified: soiling rate on site, cleaning cost, PPA terms, curtailment, M&V of savings",
            ],
            modelAnswer: md`**Value of cleaning (illustrative 500 MWp IPP).** A MWh lost to dust is replaced by thermal generation. At the margin that costs the state about 26 fils/kWh in LNG burned in a CCGT and about 37 fils/kWh in crude burned in an older steam unit (Track 0 values; 1 KWD = 3.25 USD). The IPP, paid an assumed tariff of about 4.6 fils/kWh (USD 15/MWh, illustrative, since the Zone 1 tariff is unpublished), rationally cleans about monthly and accepts about 6 % average soiling loss. At the state's fuel value the optimum is about every 13 days and the average loss about 2.5 %. Cleaning to the state's optimum recovers about 35,000 MWh/yr: about 2.98 m USD (KWD 0.92 m) of LNG not burned. Net of the extra tariff MEWRE pays for that energy, the state gains about KWD 0.75 m/yr; the IPP's extra cleaning costs it, net of extra revenue, about KWD 0.22 m/yr. A soiling-indexed bonus between those two numbers leaves both better off. At crude prices the gain is larger. **To verify before any commitment:** the plant's measured soiling rate by season, the all-in cost per cleaning cycle, the PPA's curtailment and deemed-energy terms, and an agreed M&V method for recovered energy (weather-corrected PR baseline with paired control blocks).`,
            explanation: md`The strong answer picks the buyer's value of energy, keeps transfers out of the saving, quantifies both sides of the side payment and is honest about what is still assumed.`,
            concepts: ["mz04.value-of-soiled-mwh", "mz04.incentive-gap"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "mz04-l02-q1",
      type: "mcq",
      prompt: md`Under an energy-only PPA, what is the offtaker's net loss when dust removes one MWh of solar output?`,
      options: [md`The tariff $t$`, md`The fuel value $v$`, md`$v - t$`, md`$v + t$`],
      answer: 2,
      explanation: md`The offtaker burns fuel worth $v$ to replace the MWh but no longer pays the tariff $t$ for it. The national economy, counting the IPP too, loses $v$.`,
      concepts: ["mz04.value-of-soiled-mwh"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "mz04-l02-q2",
      type: "numeric",
      prompt: md`The IPP's optimal interval is 30 days at USD 15/MWh. All else equal, what is the optimal interval at a national value of USD 96/MWh?`,
      answer: 11.86,
      tolerance: { rel: 0.02 },
      unit: "days",
      explanation: md`$T^* \propto 1/\sqrt{p}$: $30 \times \sqrt{15/96} = 30 \times 0.395 = 11.9$ days.`,
      concepts: ["mz04.stakeholder-optimum"],
      difficulty: 2,
    },
    {
      id: "mz04-l02-q3",
      type: "multi",
      prompt: md`Which reduce the value of recovering a soiled MWh to (near) zero? (Select all.)`,
      options: [
        "The plant is curtailed by the grid operator during those hours",
        "It is a summer peak afternoon",
        "The plant would have been clipping at the inverter limit anyway (DC/AC ratio above 1)",
        "The marginal unit is an old oil-fired steam plant",
      ],
      answer: [0, 2],
      explanation: md`Energy that would not have been delivered (curtailment, or DC power above the inverter's AC limit) has no value, so soiling in those hours costs nothing. Summer peaks and oil-fired margins raise the value.`,
      concepts: ["mz04.value-of-soiled-mwh"],
      difficulty: 2,
    },
    {
      id: "mz04-l02-q4",
      type: "mcq",
      prompt: md`Why does an IPP under an energy-only PPA clean less often than the state would like?`,
      options: [
        "IPPs are not allowed to clean more than monthly",
        "It pays the full cleaning cost but captures only the tariff, while the fuel saving accrues to the state",
        "Cleaning reduces availability",
        "The tariff is higher than the fuel value",
      ],
      answer: 1,
      explanation: md`A classic externality: the decision maker bears the cost and only a small part of the benefit.`,
      concepts: ["mz04.incentive-gap"],
      difficulty: 1,
    },
    {
      id: "mz04-l02-q5",
      type: "numeric",
      prompt: md`Moving to the national optimum costs the IPP USD 0.6 m/yr net and gives the offtaker USD 2.0 m/yr net. What is the national (combined) gain in USD m/yr?`,
      answer: 1.4,
      tolerance: { abs: 0.01 },
      unit: "USD m/yr",
      explanation: md`$2.0 - 0.6 = 1.4$. Any side payment between 0.6 and 2.0 makes both parties better off; the payment itself does not change the national gain.`,
      concepts: ["mz04.incentive-gap"],
      difficulty: 1,
    },
    {
      id: "mz04-l02-q6",
      type: "decision",
      prompt: md`You present a cleaning optimisation to MEWRE for a state-owned plant. Which value of energy do you use as the base case?`,
      options: [
        { text: "The residential tariff, 2 fils/kWh", score: 0, feedback: "A subsidised retail price, not the cost of the energy replaced." },
        { text: "A recent Gulf IPP tariff, about USD 15/MWh", score: 0.3, feedback: "Relevant to an IPP's own decision, but on a state plant there is no tariff between dust and fuel." },
        { text: "Displaced fuel at opportunity cost, as a range (LNG CCGT to crude steam), in KWD and fuel units", score: 1, feedback: "Correct economic value for the state, shown as a range because the marginal unit and fuel price vary." },
        { text: "Fuel value plus the IPP tariff", score: 0, feedback: "Double counting: the tariff is a payment, and on a state plant it does not exist." },
      ],
      explanation: md`For the state, value fuel at opportunity cost and show sensitivity to the marginal unit and fuel price.`,
      concepts: ["mz04.state-owned-value", "mz04.value-of-soiled-mwh"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "mz04-l02-f1", front: "Value of a soiled MWh: IPP / offtaker / nation", back: md`$t$ / $v - t$ / $v$`, concepts: ["mz04.value-of-soiled-mwh"] },
    { id: "mz04-l02-f2", front: "Kuwaiti displaced-fuel value (Track 0 examples)", back: "About 26 fils/kWh (LNG, CCGT) to 37 fils/kWh (crude, old steam): USD 85 to 120/MWh at 3.25 USD/KWD.", concepts: ["mz04.value-of-soiled-mwh"] },
    { id: "mz04-l02-f3", front: "IPP vs national optimum interval ratio", back: md`$\sqrt{v/t}$: about 2.4 at USD 85 vs 15.`, concepts: ["mz04.stakeholder-optimum"] },
    { id: "mz04-l02-f4", front: "Side-payment range for more cleaning", back: "Between the IPP's net cost of extra cleaning and the offtaker's net gain; illustrative 500 MWp: USD 0.73 to 2.45 m/yr.", concepts: ["mz04.incentive-gap"] },
    { id: "mz04-l02-f5", front: "Value of soiling loss during curtailment", back: "Zero: the energy would not have been delivered anyway.", concepts: ["mz04.value-of-soiled-mwh"] },
    { id: "mz04-l02-f6", front: "Right value of energy for Shagaya Phase I (state-owned)", back: "The national displaced-fuel value: no PPA tariff stands between dust and fuel.", concepts: ["mz04.state-owned-value"] },
  ],
  scenarios: [
    {
      id: "mz04-s1",
      title: "The IPP that will not clean more",
      context: md`You meet the asset manager of an illustrative 500 MWp Gulf PV IPP with a MEWRE planning engineer in the room. The IPP cleans monthly. Your analysis says the national optimum is about every 13 days.`,
      start: "a",
      concepts: ["mz04.incentive-gap", "mz04.value-of-soiled-mwh"],
      nodes: {
        a: {
          md: md`The asset manager says: "Your own numbers show cleaning every 13 days loses us about USD 0.7 m a year. Why would we do that?"`,
          choices: [
            { text: "Agree that at your tariff monthly is right for you, then show the MEWRE engineer the state's net gain and propose a shared-savings bonus", next: "b", score: 10, feedback: "Honest about the IPP's incentive and moves the conversation to the party that captures the value." },
            { text: "Argue that more cleaning is always better for the plant", next: "c", score: 2, feedback: "False and the asset manager knows it: his optimum is about monthly." },
            { text: "Suggest MEWRE should mandate fortnightly cleaning by letter", next: "c", score: 4, feedback: "Changing a signed PPA unilaterally invites change-in-law or variation claims; a voluntary mechanism is faster." },
          ],
        },
        b: {
          md: md`The MEWRE engineer asks: "If we pay a bonus, how do we know the cleaning recovered the energy and was not going to happen anyway?"`,
          choices: [
            { text: "Propose an M&V protocol: weather-corrected PR baseline, paired control blocks on the old schedule for the first season, savings paid only when verified", score: 10, feedback: "This is the question that decides the deal; the answer is a protocol agreed before any money moves." },
            { text: "Say Mizan's model is accurate enough to trust", score: 3, feedback: "A model is not verification. A public buyer will need an auditable method." },
            { text: "Offer to pay back the bonus if savings are not seen", score: 5, feedback: "Generous but undefined: you still need a definition of 'seen'." },
          ],
        },
        c: {
          md: md`The meeting cools. The asset manager says he will consider it. The MEWRE engineer asks for a written note on how the state's benefit was computed.`,
          choices: [
            { text: "Send a note in KWD and fuel, separating the IPP's view from the state's, with the side-payment range", score: 7, feedback: "Recovers the thread by putting the right value in front of the right buyer." },
            { text: "Send the slide deck again", score: 1, feedback: "The deck already failed to answer his question." },
          ],
        },
      },
    },
  ],
};

export default lesson;
