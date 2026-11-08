import { md } from "../schema";
import type { Explainer } from "./schema";

/** Day 6 · Contracts, money, procurement: FIDIC, claims, securities and LDs, IPPs, NPV/LCOE, project finance, Kuwait tendering (Modules 9 to 11). */
export const D6: Explainer[] = [
  {
    id: "x-contract-strategies-fidic",
    day: 6,
    title: "Contract strategies and the FIDIC books",
    minutes: 12,
    module: "m09",
    hook: "Almost every contract you will touch at MEWRE is built on a FIDIC book with Kuwaiti particular conditions, and the first question in any meeting is \"who designs, and who carries the risk?\". Know the three main books and the three roles and you can read any contract's first page with confidence.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You want a new house. You have three ways to get it:

- **Design-bid-build.** You pay an architect to draw every detail, then invite builders to bid on the drawings. The builder builds what is drawn. If the drawings are wrong, that is **your** problem.
- **Design-build.** You write a brief ("four bedrooms, energy class A, ready in 14 months") and one builder designs and builds it. Design errors are now the **builder's** problem.
- **Turnkey.** You agree a fixed price and a handover date, and you only come back to collect the keys. The builder carries almost everything, including surprises in the ground, and charges you for that comfort.

The more risk you push to the builder, the higher the price and the less you get to interfere. Where the house analogy breaks: on a turnkey power plant you still write a detailed performance specification, and you still test the plant hard before you accept it.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

A **contracting strategy** answers three questions: who designs, how many contracts (and who manages the gaps between them), and who finances and owns the asset. **FIDIC** (the International Federation of Consulting Engineers) publishes standard forms that match each answer. The 2017 editions are the ones you will meet:

- **Red Book** (Construction): the Employer designs, the Contractor builds. Paid by **measured quantities** (Bill of Quantities times rates). This is design-bid-build.
- **Yellow Book** (Plant and Design-Build): the Contractor designs to the **Employer's Requirements** and is paid a **lump sum**. This is design-build.
- **Silver Book** (EPC/Turnkey): the Contractor designs, procures and builds, for a **fixed lump sum**, and carries most of the risk, including **unforeseeable ground conditions**. This is EPC/turnkey, and the base of most IPP construction contracts.

Each book has **General Conditions** (the standard text) and **Particular Conditions** (Part A: contract data; Part B: the Employer's amendments). Always read Part B before quoting a clause.

Three roles to keep straight:

- **Employer**: the owner who pays. On MEWRE's own substations or BESS, MEWRE is the Employer. On an IPP, the project company (SPV) is the Employer under its EPC contract; MEWRE is the **offtaker** under the PPA.
- **Contractor**: builds (and on Yellow and Silver, designs). Subcontractors have no contract with the Employer.
- **Engineer** (Red and Yellow): a professional firm appointed and paid by the Employer that instructs, certifies payments and, under **Sub-Clause 3.7**, agrees or determines claims **neutrally**. On Silver there is no Engineer: an **Employer's Representative** acts for the Employer.

A fourth body, the **DAAB** (Dispute Avoidance/Adjudication Board), is appointed jointly to help avoid and decide disputes.`,
      },
      { kind: "diagram", diagram: "fidic-parties", caption: "Who has a contract with whom: the Engineer is paid by the Employer but must determine claims neutrally, the DAAB is appointed jointly, and subcontractors sit only behind the Contractor." },
      {
        kind: "md",
        md: md`### Why it matters at MEWRE

The guiding rule is: put a risk with the party that can **control** it; if nobody controls it, with the party that can **bear** it most cheaply. Pushing a risk onto someone who can do neither does not remove it. It comes back as a **risk premium** in the price ($RP = k \cdot EV$, with $k$ typically 1.5 for well-understood risks up to 3 or more for risks the contractor cannot control), plus a dispute when the event happens.

Two habits that cause trouble: MEWRE staff making the Engineer's determinations themselves on a Red or Yellow contract (it breaks the neutrality the contract promises), and reviewing every drawing on a Silver contract (it quietly turns turnkey into a hybrid and invites claims).`,
      },
      { kind: "widget", widget: "risk-allocation", caption: "Click across a row: the same risk (ground, design, change in law, grid delay) moves from Employer to Contractor as you go from Red to Silver to an IPP EPC." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **FIDIC 2017** editions (reprinted with amendments in 2022): Red, Yellow, Silver are the main three; Gold (design-build-operate), White (consultant services, used for the Owner's Engineer), Green (short form).
- **Ground risk (Sub-Clause 4.12)**: Employer on Red and Yellow (time and cost); Contractor on Silver ("Unforeseeable Difficulties", price not adjusted).
- **Risk premium**: $RP = k \cdot EV$, $k$ about 1.5 to 3+. A risk with a 20 % chance of costing KWD 5 m (EV = KWD 1 m) can add KWD 1.5 to 3 m to a price.
- **IPP chain**: MEWRE (offtaker) to SPV to EPC and O&M contractors, with the EPC usually on a Silver base, lump sum and date-certain.
- **MEWRE contracts**: often FIDIC-based with Kuwaiti particular conditions (Track 0, m11).`,
      },
    ],
    say: [
      "Which FIDIC book is this based on, and what does Part B change in the risk allocation?",
      "Who carries ground risk here, and what site data did we give bidders to price it?",
      "On this Silver contract, are we reviewing drawings for compliance only, or are we approving design? We should be clear, because approval shifts risk back to us.",
      "Who is the Engineer, and how do we protect the neutrality of the 3.7 determinations?",
      "On the IPP, our leverage is the PPA and the grid connection, not the EPC: what does the PPA say about this risk?",
    ],
    trap: "Thinking turnkey means \"no risk for us\". A Silver contract transfers risk at a price, and the Employer still carries what it controls: its grid connection, permits, late decisions and any changes. And on an IPP, MEWRE is not the Employer at all; it cannot instruct the EPC contractor and acts only through the PPA.",
    check: [
      {
        id: "x-contract-strategies-fidic-c1",
        type: "mcq",
        prompt: md`MEWRE's consultant has fully designed a 132 kV substation extension and wants bidders to price a Bill of Quantities. Which FIDIC book fits?`,
        options: ["Red Book (Construction)", "Yellow Book (Plant and Design-Build)", "Silver Book (EPC/Turnkey)", "White Book (Client/Consultant)"],
        answer: 0,
        explanation: md`Employer design plus measured quantities is the Red Book: design-bid-build, administered by an Engineer. Yellow and Silver both put design on the Contractor; White is for consultant appointments.`,
        concepts: ["m09.fidic-suite", "m09.contracting-strategy"],
        difficulty: 1,
      },
      {
        id: "x-contract-strategies-fidic-c2",
        type: "mcq",
        prompt: md`On a FIDIC Red Book contract where MEWRE is the Employer, a contractor's claim needs a determination under Sub-Clause 3.7. Who should make it?`,
        options: [
          "The Engineer, acting neutrally, after consulting both Parties",
          "MEWRE's project manager, because MEWRE pays",
          "The DAAB, immediately",
          "The Contractor's own planner",
        ],
        answer: 0,
        explanation: md`Under 3.7 the Engineer "shall not be deemed to act for the Employer" and must determine fairly. If MEWRE staff decide it themselves, the contractor gains a procedural argument. The DAAB comes in only after a Notice of Dissatisfaction.`,
        concepts: ["m09.engineer-vs-er"],
        difficulty: 1,
      },
      {
        id: "x-contract-strategies-fidic-c3",
        type: "numeric",
        prompt: md`A contractor estimates a 25 % chance that a grid-delay risk costs it KWD 4 m. It cannot control the risk and uses a loading factor $k = 2$. What risk premium (KWD m) does it add to its price if the contract makes it carry this risk?`,
        answer: 2,
        tolerance: { abs: 0.05 },
        unit: "KWD m",
        explanation: md`$EV = 0.25 \times 4 = 1$ KWD m; $RP = k \cdot EV = 2 \times 1 = 2$ KWD m. If MEWRE kept the risk (it controls the grid), it would pay on average only the KWD 1 m expected cost.`,
        concepts: ["m09.risk-allocation"],
        difficulty: 2,
      },
    ],
    deeper: ["m09-l01", "m09-l02"],
  },
  {
    id: "x-claims-variations",
    day: 6,
    title: "Variations, claims and extensions of time",
    minutes: 13,
    module: "m09",
    hook: "Most money and most arguments on a construction contract come from change: an instruction, a late drawing, a sandstorm, a late grid connection. Under FIDIC 2017 these run on strict clocks, and a missed 28-day notice can cost MEWRE a valid claim or hand a contractor an unchallenged one.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

You hired a kitchen fitter at a fixed price for a fixed date. Halfway through you ask for an extra island. That is a **variation**: your instruction, so you pay for it and the fitter may need more days.

Then the building's lift breaks for a week (the landlord's fault, not the fitter's) and materials cannot come up. The fitter tells you **in writing, the same week**, that this will delay them and cost money. That is a **claim**, with a **notice**. If they mention it only at the final invoice three months later, you would rightly say: "Why didn't you tell me then? I could have done something."

FIDIC turns this common sense into deadlines that bind both sides.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

- A **Variation** is an instructed change to the Works (Clause 13). It is valued in order: **contract rates**, then **rates derived** from them, then **Cost Plus Profit** (FIDIC 2017 default profit 5 %). Omitted work is credited to the Employer.
- A **Claim** is a request for more time or money (or, from the Employer, delay damages or a longer defects period) under some clause. It runs through **Clause 20**:
  - **Notice of Claim** within **28 days** of becoming aware of the event. Miss it and the claim is **time-barred** (lost), for the Contractor **and** for the Employer.
  - **Fully detailed Claim** with its legal basis within **84 days**, or the Notice lapses.
  - The **Engineer** then agrees or determines it under **3.7** (42 days to try to agree, then 42 days to determine).
- An **Extension of Time (EOT)** moves the completion date (Sub-Clause 8.5) when an Employer-risk event or a Variation **delays completion**. That is a critical-path question: if the delayed activity had float, the EOT is only the delay beyond the float: $EOT = \max(0, d - TF)$. An EOT also protects the Employer: it keeps the delay damages clause enforceable.
- **Climatic conditions**: only **exceptionally** adverse weather counts, judged against the site's climate data. Seasonal shamal sandstorms are foreseeable in Kuwait. Climate gives **time, not money**, and Silver gives nothing for it.

**Delay analysis in one paragraph.** To prove how much an event delayed completion, planners insert it into the programme and measure the shift in the end date. The method preferred during the project is **Time Impact Analysis (TIA)**: add the event to the **updated** programme current at that time, not to the original baseline. After the event, analysts use windows or as-built methods. When an Employer delay and a Contractor delay overlap (**concurrent delay**), the usual approach (SCL Protocol) is **time but not money**: an EOT, but no extra cost for that period, unless the contract says otherwise.

**Disputes.** If a Party disagrees with a determination it gives a **Notice of Dissatisfaction (NOD)** within 28 days and refers the dispute to the standing **DAAB**. The DAAB decides within 84 days and its decision is **binding at once**: both sides comply, even while one goes on to arbitration.`,
      },
      {
        kind: "flow",
        title: "A FIDIC 2017 claim, from event to arbitration",
        steps: [
          { label: "Event", detail: "Late drawing, Employer delay, unforeseeable ground, change in law" },
          { label: "Notice of Claim", detail: "Within 28 days of awareness, or time-barred" },
          { label: "Fully detailed Claim", detail: "Within 84 days, with legal basis and records" },
          { label: "Engineer agrees or determines (3.7)", detail: "42 days to agree, then 42 days to determine" },
          { label: "NOD", detail: "Within 28 days, or the determination is final and binding" },
          { label: "DAAB decision", detail: "Refer within 42 days of NOD; decision in 84 days; binding at once" },
          { label: "Amicable settlement, then arbitration", detail: "NOD on the DAAB decision within 28 days; 28 days to settle; ICC arbitration by default" },
        ],
        caption: "Every arrow has a clock. Keep a notices register and most disputes never reach the last two boxes.",
      },
      {
        kind: "callout",
        tone: "unverified",
        title: "Kuwait dispute route: check with legal",
        md: md`Track 0 could not confirm whether MEWRE's own contracts keep a DAAB, go to arbitration, or go to Kuwaiti courts or a ministry procedure, nor which Kuwaiti statutes apply. Ask legal affairs and read the Particular Conditions of each contract before relying on the FIDIC default route.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **28 days**: Notice of Claim (time-bar); NOD on a determination or DAAB decision.
- **84 days**: fully detailed Claim; DAAB decision.
- **42 + 42 days**: Engineer's agreement period, then determination (3.7).
- **5 %**: default profit in Cost Plus Profit for variations (FIDIC 2017).
- **EOT** $= \max(0, d - TF)$: delay to the activity minus its total float.`,
      },
    ],
    say: [
      "Has a Notice of Claim been given under 20.2.1, and when did the 28 days start?",
      "Is this EOT analysed on the updated programme at the time of the event, or on the original baseline?",
      "Was this activity on the critical path, and how much float did it have?",
      "Are the time-related costs priced in the variation rates as well as in the prolongation claim? That would be a double count.",
      "We intend to deduct delay damages: have we served our own Notice of Claim?",
    ],
    trap: "Thinking every delay means an EOT and money. An EOT is due only if the event is at the Employer's risk, notices were given in time, and completion (not just one activity) is delayed beyond the float. And money does not always follow time: exceptional weather and concurrent delay usually give time only.",
    check: [
      {
        id: "x-claims-variations-c1",
        type: "mcq",
        prompt: md`Under FIDIC 2017, a contractor becomes aware of an Employer-caused delay on 1 March but gives its first written Notice of Claim on 15 April. What is the likely consequence?`,
        options: [
          "The claim is time-barred: the Notice was more than 28 days after awareness",
          "Nothing: notices can be given at any time before final account",
          "The claim is automatically accepted because the Engineer did not reply",
          "The Contractor gets time but not money",
        ],
        answer: 0,
        explanation: md`Sub-Clause 20.2.1 requires a Notice within 28 days of awareness; 1 March to 15 April is 45 days. The 2017 books apply the same bar to the Employer's own claims, including delay damages.`,
        concepts: ["m09.claims-time-bar"],
        difficulty: 1,
      },
      {
        id: "x-claims-variations-c2",
        type: "numeric",
        prompt: md`A late MEWRE approval delays a cable-laying activity by 30 days. On the updated programme that activity had 12 days of total float. How many days of EOT are due?`,
        answer: 18,
        tolerance: { abs: 0 },
        unit: "days",
        explanation: md`$EOT = \max(0, d - TF) = \max(0, 30 - 12) = 18$ days. The first 12 days were absorbed by float and did not delay completion.`,
        concepts: ["m09.programme-eot", "m09.delay-analysis"],
        difficulty: 1,
      },
      {
        id: "x-claims-variations-c3",
        type: "mcq",
        prompt: md`The DAAB decides that MEWRE must pay a contractor KWD 1.2 m. MEWRE disagrees and gives a Notice of Dissatisfaction in time. Under FIDIC 2017, what happens to the payment?`,
        options: [
          "MEWRE must comply now; the NOD only preserves the right to arbitrate",
          "Payment is suspended until arbitration ends",
          "The decision is void once an NOD is given",
          "The Engineer re-determines the amount",
        ],
        answer: 0,
        explanation: md`A DAAB decision is binding at once and must be complied with; an NOD within 28 days lets the Party take the dispute to arbitration later. Failing to comply can itself be referred to arbitration.`,
        concepts: ["m09.daab-arbitration"],
        difficulty: 2,
      },
    ],
    deeper: ["m09-l02", "m09-l07"],
  },
  {
    id: "x-bonds-lds",
    day: 6,
    title: "Bonds, guarantees and liquidated damages",
    minutes: 12,
    module: "m09",
    hook: "Bonds and liquidated damages are how MEWRE gets paid when a contractor fails, without first winning a two-year dispute. You will track bond expiries, check advance recoveries in payment certificates and, one day, have to decide whether to call a bond or deduct LDs.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

When you rent a flat you pay a **deposit**. You do not have to prove anything in court to keep part of it if the tenant wrecks the kitchen; the money is already in your hands. A **bank guarantee** is a deposit held by a bank instead of by you.

Now imagine the lease says: "for every day you stay past the end date, you pay KWD 50". Nobody argues afterwards about what the extra day really cost; the number was agreed up front. That is a **liquidated damage** (LD).

Where it breaks: an on-demand bond is easier to call than a deposit is to keep, and the Employer can still be liable later if it called without being entitled.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Securities** turn a contractor's promise into a claim on a creditworthy bank or parent company:

- **Performance security** (performance bond): commonly **10 %** of the contract price, delivered within 28 days of the Letter of Acceptance (FIDIC 2017, 4.2), kept until the **Performance Certificate**. Covers contractor default.
- **Advance payment guarantee (APG)**: equal to the advance (commonly 10 to 20 % of the price). The advance is recovered from each payment certificate (FIDIC default: **25 %** of each IPC once certified payments exceed 10 % of the price), and the APG reduces as it is recovered.
- **Retention**: money held back from each payment, for example **10 % of each IPC up to 5 %** of the price; **half released at Taking-Over**, half at the end of the defects period.
- Most Gulf bank guarantees are **on-demand**: the bank pays a compliant written demand without checking whether the contractor really defaulted. The contract still says the Employer may claim only what it is **entitled** to, and must indemnify the contractor for an unjustified call.

**Liquidated damages** are fixed sums for a specified breach, instead of proving the actual loss:

- **Delay LDs** (FIDIC "Delay Damages", 8.8): a daily rate for every day after the Time for Completion **as extended by any EOT**, until Taking-Over. They are the sole remedy for delay (except termination).
- **Performance LDs**: if the plant fails its guaranteed capacity or performance ratio at the tests, the contractor "buys down" the shortfall with a lump sum reflecting the lost energy over the plant's life. Below a **minimum performance level**, money is not enough: the contractor must fix it, or the Employer can reject the Works.
- **Caps**: each LD type is capped, and once the delay cap is reached most contracts let the Employer terminate.

A worked example: a 100 MW PV EPC at KWD 20 m. Delay LDs at **0.1 % of the price per day** = KWD 20,000/day, capped at **10 %** = KWD 2 m. The plant is taken over 45 days after the extended completion date: LDs = $45 \times 20{,}000 =$ KWD 900,000, below the cap. At 100 days the cap is reached; every day after that costs the contractor nothing more in LDs.`,
      },
      {
        kind: "chart",
        chart: "line",
        title: "Delay LDs on a KWD 20 m EPC (0.1 % per day, 10 % cap)",
        xKey: "days",
        xLabel: "Days late after EOT",
        yLabel: "Cumulative delay LDs (KWD m)",
        series: [
          { key: "capped", label: "LDs payable (capped at 10 %)" },
          { key: "uncapped", label: "Without a cap" },
        ],
        data: [
          { days: 0, capped: 0, uncapped: 0 },
          { days: 25, capped: 0.5, uncapped: 0.5 },
          { days: 50, capped: 1.0, uncapped: 1.0 },
          { days: 75, capped: 1.5, uncapped: 1.5 },
          { days: 100, capped: 2.0, uncapped: 2.0 },
          { days: 125, capped: 2.0, uncapped: 2.5 },
          { days: 150, capped: 2.0, uncapped: 3.0 },
        ],
        caption: "Notice the flat line after day 100: once the cap is hit, LDs stop motivating the contractor, which is why the cap is usually also a termination trigger.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Performance security**: about 10 % of the contract price. Kuwait public tenders: final guarantee of at least 10 % of contract value (Law 49/2016 Art. 65, as reported by a single academic source: confirm the article).
- **Retention**: e.g. 10 % per IPC up to 5 % of price; half at Taking-Over, half after the defects period. **Advance recovery**: 25 % of each IPC (FIDIC default).
- **Delay LD rate**: about **0.03 to 0.1 % of the contract price per day** for PV EPCs.
- **Caps**: delay LDs 10 to 20 %, performance LDs 10 to 15 %, aggregate 20 to 30 %, overall liability often 100 % of the price.
- **Kuwaiti law** on agreed damages (whether a court may reduce them) is not verified in Track 0: ask legal affairs before setting or enforcing LD rates.`,
      },
    ],
    say: [
      "When does each bond expire, and is it at least 28 days after the expected Performance Certificate?",
      "Before we call this bond, what exact amount are we entitled to under the contract, and is it documented?",
      "How was the delay LD rate derived? We should keep the calculation on file to show it is a genuine pre-estimate.",
      "Are delay LDs applied after the EOT we have granted, and have we served our Notice of Claim?",
      "What happens when the delay cap is reached: do we have a termination right?",
    ],
    trap: "Thinking higher LDs are always better for MEWRE. A rate far above the real loss makes every bidder add contingency to its price and invites a court to reduce it; a rate far below it lets a contractor rationally pay LDs rather than accelerate. The goal is an LD close to the genuine loss, with a sensible cap and a termination right.",
    check: [
      {
        id: "x-bonds-lds-c1",
        type: "numeric",
        prompt: md`An EPC contract worth KWD 20 m has delay LDs of 0.1 % of the price per day, capped at 10 % of the price. The plant is taken over 130 days after the extended completion date. What delay LDs (KWD m) are payable?`,
        answer: 2,
        tolerance: { abs: 0.01 },
        unit: "KWD m",
        explanation: md`Daily rate $= 0.001 \times 20 = 0.02$ KWD m. Uncapped: $130 \times 0.02 = 2.6$ KWD m. Cap $= 0.10 \times 20 = 2$ KWD m. Payable $= \min(2.6, 2) = 2$ KWD m.`,
        concepts: ["m09.delay-lds", "m09.ld-cap"],
        difficulty: 1,
      },
      {
        id: "x-bonds-lds-c2",
        type: "mcq",
        prompt: md`What does an advance payment guarantee protect MEWRE against?`,
        options: [
          "The contractor failing to repay the advance, for example if the contract ends before it is recovered",
          "Defects found after Taking-Over",
          "The plant failing its performance ratio test",
          "A bidder withdrawing its bid",
        ],
        answer: 0,
        explanation: md`The APG equals the advance and reduces as the advance is recovered from payment certificates. Defects are covered by retention and the performance security; bid withdrawal by the bid bond; underperformance by performance LDs.`,
        concepts: ["m09.advance-payment-guarantee"],
        difficulty: 1,
      },
      {
        id: "x-bonds-lds-c3",
        type: "decision",
        prompt: md`You are the PM. A contractor is 40 days late on a MEWRE substation, with an EOT claim for 25 of those days still undetermined. A colleague wants to call the full 10 % performance bond today "to send a message". What do you do?`,
        options: [
          { text: "Ask the Engineer to determine the EOT, serve MEWRE's Notice of Claim for delay damages, and recover the entitled LDs through payment certificates; keep the bond for a real default.", score: 1, feedback: "Right: claim only what MEWRE is entitled to, through the contract's procedure." },
          { text: "Call the full bond now; it is on-demand so the bank must pay.", score: 0, feedback: "The bank may pay, but MEWRE can claim only amounts it is entitled to and must indemnify the contractor for an unjustified call." },
          { text: "Deduct 40 days of LDs from the next payment without any notice.", score: 0.3, feedback: "Ignores the pending EOT and the 2017 requirement for the Employer to give its own Notice of Claim." },
          { text: "Do nothing until the end of the project.", score: 0.2, feedback: "Lets notices and time-bars run against MEWRE." },
        ],
        explanation: md`On-demand does not mean unconditional entitlement. Decide the EOT first, then apply delay damages for the days beyond it through the claim procedure.`,
        concepts: ["m09.on-demand-guarantee", "m09.performance-security", "m09.delay-lds"],
        difficulty: 2,
      },
    ],
    deeper: ["m09-l03", "m09-l04"],
  },
  {
    id: "x-ipp-ppa",
    day: 6,
    title: "IPPs and PPAs: when a private company builds and sells power",
    minutes: 14,
    module: "m09",
    hook: "Kuwait's large solar plants, such as Shagaya Phase III Zones 1 and 2, are procured as IPPs by KAPP, with MEWRE signing a 30-year PPA as the buyer. As a renewable PM you sit on the offtaker side: you will not build these plants, but MEWRE pays for them, connects them and lives with their contracts for decades.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

A town needs a bakery but does not want to run one. It signs a 30-year deal with a baker: "Build the bakery with your own money, and we will buy all your bread at a fixed price per loaf." The baker borrows most of the money from a bank. The bank lends only because the town's purchase contract guarantees a steady income.

If the town closes the road to the bakery for a week, the bread goes stale. The deal says the town still pays for that week's bread. That is the logic of an IPP and its PPA.

Where it breaks: electricity cannot wait on a shelf, so the payment rules for energy that was not taken matter far more than for bread.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

An **Independent Power Producer (IPP)** is a privately financed company that builds and runs a plant and sells its output to a public buyer.

- **SPV** (special purpose vehicle, the project company): a new company created only for this plant. It owns the plant and signs all the contracts.
- **Sponsors**: the developers who put in **equity** and own the SPV (in Kuwait, alongside the state, see below).
- **Lenders**: banks that provide most of the money, typically **70 to 80 %** of capex, repaid only from the SPV's revenue (**non-recourse project finance**). They read every PPA clause asking "does this protect the debt?".
- **Offtaker**: the buyer. In Kuwait, **MEWRE**.
- **PPA** (Power Purchase Agreement): the 30-year sales contract. It sets the **tariff** (price per kWh), the commercial operation date (COD), grid connection, dispatch, metering, and termination.
- **EPC and O&M contractors**: the SPV hires them to build and operate, on terms back-to-back with the PPA.

Key payment ideas:

- **Energy-only tariff**: one price per MWh delivered. The norm for solar; the SPV carries sunshine, soiling and performance risk.
- **Take-or-pay / must-take**: the offtaker must accept all the energy delivered (or pay for a minimum).
- **Deemed energy**: if the plant could have generated but did not because of the offtaker's side (grid outage, curtailment beyond an annual allowance, late grid connection), the offtaker **pays as if the energy had been delivered**. MEWRE controls the grid, so it carries that risk; otherwise bidders would price it into 30 years of tariff.`,
      },
      { kind: "diagram", diagram: "ppp-structure", caption: "Follow the money: MEWRE pays the tariff to the SPV, which pays its EPC and O&M contractors, services the lenders and then pays dividends to sponsors and shareholders. KAPP procures and holds the state's shares." },
      {
        kind: "md",
        md: md`### Why it matters at MEWRE

KAPP runs the competition, but **MEWRE carries the 30-year obligations**: paying, connecting, dispatching and absorbing interface risk. For Shagaya Phase III Zone 1, the developer builds the 400 kV substation, while the Shagaya to Al-Wafra 400 kV line is MEWRE's own contract. If MEWRE's line is late, the PPA may deem the plant complete and MEWRE pays deemed energy, or COD is extended, depending on the PPA wording. Every RFP clause on grid delay, curtailment and deemed energy is a contingent liability on the ministry's budget.

Worked example (from Track 0, with an **assumed** tariff of 8 fils/kWh because the real one is not published): a MEWRE-side 400 kV outage prevents 18,000 MWh. Deemed payment $= 18{,}000 \times 1{,}000 \times 0.008 =$ KWD 144,000, for energy the ministry never received, and it still burns the fuel that energy would have displaced.`,
      },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **KAPP**: Kuwait Authority for Partnership Projects, set up by **PPP Law 116/2014** (Executive Regulations **Decree 78/2015**), attached to the Minister of Finance; the **Higher Committee** (chaired by the Minister of Finance) approves projects and the selected investor. (Sourced, Track 0 m09/m11.)
- **Solar PPA term**: **30 years** with MEWRE as offtaker; Zone 1 is **1,100 MW**, Zone 2 **500 MW**. (Sourced.)
- **Shareholding** for PPPs above KD 60 m: 50 % IPO to Kuwaiti citizens, 6 to 24 % public entities, at least 26 % private (secondary legal guide; sources conflict, verify). In practice on IWPPs: developer **40 %**, state via KAPP **60 %**; KAPP warehouses the IPO shares until operation.
- **Not confirmed** in Track 0: PPA currency, government support, termination regime and the exact deemed-energy terms. Read the signed documents.
- **Lenders**: typically 70 to 80 % of capex as non-recourse debt (international practice).`,
      },
    ],
    say: [
      "Under this PPA, what triggers deemed energy, and what is the annual curtailment allowance before MEWRE pays?",
      "Who builds which part of the grid connection, and what happens to COD and payments if our part is late?",
      "Which ministry-side conditions precedent (land, grid, permits) must we deliver before financial close, and who tracks them?",
      "Is the PPA term counted from COD or from a fixed date?",
      "Where do the lenders' requirements conflict with our positions on termination or step-in, and who is resolving that?",
    ],
    trap: "Thinking the PPA is KAPP's document and MEWRE just pays the bills. KAPP procures, but MEWRE signs as offtaker and carries the grid, dispatch and curtailment obligations for 30 years. Promising grid dates MEWRE does not control is the fastest way to pay for energy it never receives.",
    check: [
      {
        id: "x-ipp-ppa-c1",
        type: "mcq",
        prompt: md`Who is the offtaker in a Kuwaiti solar IPP such as Shagaya Phase III Zone 1?`,
        options: ["MEWRE", "KAPP", "The SPV's lenders", "The EPC contractor"],
        answer: 0,
        explanation: md`MEWRE signs the 30-year PPA and buys the output. KAPP procures the project and holds the state's shares; lenders finance the SPV; the EPC contractor builds for the SPV.`,
        concepts: ["m09.kuwait-ppp-model", "m11.offtaker-role"],
        difficulty: 1,
      },
      {
        id: "x-ipp-ppa-c2",
        type: "numeric",
        prompt: md`A MEWRE transmission outage, outside the PPA allowances, prevents 25,000 MWh that the plant could have exported. With an assumed tariff of 8 fils/kWh, what deemed-energy payment (KWD) does MEWRE owe?`,
        answer: 200000,
        tolerance: { abs: 100 },
        unit: "KWD",
        explanation: md`$25{,}000 \text{ MWh} \times 1{,}000 \text{ kWh/MWh} \times 0.008 \text{ KWD/kWh} = 200{,}000$ KWD. (8 fils = 0.008 KWD. The tariff is an assumption; the real one is not published.)`,
        concepts: ["m09.deemed-energy"],
        difficulty: 1,
      },
      {
        id: "x-ipp-ppa-c3",
        type: "mcq",
        prompt: md`Why does a solar PPA usually make the offtaker, not the SPV, carry the risk of grid unavailability?`,
        options: [
          "MEWRE controls the grid; if the SPV carried the risk it would add a premium to 30 years of tariff and lenders would lend less",
          "Because solar plants cannot measure their own output",
          "Because the SPV owns the transmission lines",
          "Because lenders are paid by MEWRE directly",
        ],
        answer: 0,
        explanation: md`Risk goes to the party that controls it. The SPV cannot prevent a 400 kV outage or a curtailment order, so deemed energy keeps the tariff low and the debt bankable, at the price of MEWRE having to deliver its grid works on time.`,
        concepts: ["m09.ppa-tariff", "m09.deemed-energy", "m10.project-finance"],
        difficulty: 2,
      },
    ],
    deeper: ["m09-l05", "m11-l03"],
  },
  {
    id: "x-npv-irr-lcoe",
    day: 6,
    title: "Money over time: NPV, IRR and LCOE",
    minutes: 14,
    module: "m10",
    hook: "Consultants, bidders and the Ministry of Finance will throw NPV, IRR and LCOE at you from the first week, and every tariff MEWRE signs is a 30-year stream of payments. If you can say what drives these numbers, you can challenge a business case instead of just receiving it.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Would you rather have KWD 1,000 today or KWD 1,000 in ten years? Today, obviously: you could put it in a savings account and have more in ten years. So money in the future is worth **less** than money now.

Going the other way: how much would you need to put in the bank today to have KWD 1,000 in ten years? At 6.2 % a year, about KWD 548. That KWD 548 is the **present value** of KWD 1,000 received in year 10. Turning future money into today's money is called **discounting**, the savings account in reverse.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

- **Time value of money**: a dinar today beats a dinar later because it can earn a return. The **discount rate** $r$ is that return (for a project, usually its cost of capital, the **WACC**).
- **Discount factor** for year $t$: $1/(1+r)^t$. At 6.2 %: year 10 is 0.548, year 20 is 0.300, year 30 is 0.165. A payment in year 30 counts for only a sixth of its face value today.
- **NPV** (net present value): add up every cash flow (capex out, revenues in, costs out), each multiplied by its discount factor. **NPV > 0** means the project earns more than the discount rate; between options, pick the highest NPV.
- **IRR** (internal rate of return): the discount rate at which NPV equals zero. It is the project's "interest rate". Easy to communicate, but it ignores the size of the project and can mislead when cash flows change sign more than once. Use NPV to decide, IRR to communicate.
- **LCOE** (levelised cost of electricity): the constant price per MWh that would exactly pay back all lifetime costs (capex, opex) at the discount rate. Formally, discounted lifetime costs divided by **discounted** lifetime energy:

$$\mathrm{LCOE} = \frac{\sum (I_t + O_t)(1+r)^{-t}}{\sum E_t (1+r)^{-t}}$$

Think of it as the plant's "cost price" per MWh over its life. A bidder's tariff must sit at or above its own LCOE (plus the return its equity wants), or it loses money.

**What drives LCOE for desert PV** (Track 0 base case, 1,100 MW plant, ranked by swing): **energy yield** (±10 % moves LCOE by 0.356 US¢/kWh), then **capex** and **WACC** (±10 % capex or ±1 point WACC: 0.288 each), then **opex**, then **degradation**. Solar has no fuel, so it is a capital business: the cost of money matters as much as the cost of modules.`,
      },
      { kind: "widget", widget: "lcoe", props: { capexPerKw: 510, cf: 0.31, wacc: 0.062 }, caption: "Start near the Track 0 base case (about USD 510/kWac, 31 % capacity factor, 6.2 % WACC). Move WACC by one point, then capacity factor by three points: see which moves LCOE more." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Track 0 base case** (illustrative, not Kuwait bid data): 1,100 MWac PV, capex USD 560 m, 3,003 GWh/yr, WACC 6.2 %: **LCOE about 1.76 US¢/kWh** (about 5.4 fils/kWh at 1 US¢ = 3.08 fils).
- **Gulf record tariffs** (reported, verify): MBR 5 about 1.69 (2019), Al Dhafra about 1.35 (2020), Sudair about 1.24 and Al Shuaibah about 1.04 US¢/kWh (2021). Kuwait's Zone 1 tariff is not published.
- **Discount factors at 6.2 %**: year 10 = 0.548, year 20 = 0.300, year 30 = 0.165.
- **Quick screening LCOE** $\approx (I_0 \times \mathrm{CRF} + O)/E$; CRF(6.2 %, 30 yr) = 0.0742. It ignores degradation and opex growth and understates by about 7 % in the base case.
- **Base case returns**: project IRR 6.45 %, equity IRR 8.97 % (with 80 % debt).`,
      },
    ],
    say: [
      "Is this LCOE real or nominal, in AC or DC terms, and at what price date?",
      "Which discount rate did you use, and how does the answer change at plus or minus one point?",
      "What energy yield is behind this, P50 or P90, and what degradation?",
      "Does the capex include the grid connection and owner's costs, or are they outside the boundary?",
      "Show me the tornado: which three assumptions move this number most?",
    ],
    trap: "Comparing a tariff or LCOE without checking its basis. A real LCOE and a nominal tariff, or a P50 yield and a P90 yield, can differ by 10 to 20 % on the same plant. Another classic: dividing discounted costs by undiscounted energy, which makes LCOE look far too low. Both costs and energy must be discounted.",
    check: [
      {
        id: "x-npv-irr-lcoe-c1",
        type: "numeric",
        prompt: md`What is the present value (KWD thousand) of KWD 1,000,000 received in year 10, at a discount rate of 6.2 %?`,
        answer: 548,
        tolerance: { abs: 3 },
        unit: "KWD thousand",
        explanation: md`$PV = 1{,}000{,}000 / 1.062^{10} = 1{,}000{,}000 / 1.825 \approx 548{,}000$ KWD, i.e. 548 thousand. The discount factor at year 10 is 0.548.`,
        concepts: ["m10.time-value", "m10.npv"],
        difficulty: 1,
      },
      {
        id: "x-npv-irr-lcoe-c2",
        type: "mcq",
        prompt: md`A consultant says a project's IRR is 9 %. What does that mean?`,
        options: [
          "The discount rate at which the project's NPV is exactly zero is 9 %",
          "The project's NPV is 9 % of capex",
          "The project returns 9 % of its cost every year in cash",
          "The project's LCOE is 9 % below the tariff",
        ],
        answer: 0,
        explanation: md`IRR is the rate that makes NPV = 0. If the cost of capital is below 9 %, NPV is positive. It says nothing about size, so between options NPV is the better decision rule.`,
        concepts: ["m10.irr"],
        difficulty: 1,
      },
      {
        id: "x-npv-irr-lcoe-c3",
        type: "numeric",
        prompt: md`Screening estimate: a PV plant costs USD 100 m, the capital recovery factor is 0.08, opex is USD 2 m/yr and it produces 500 GWh/yr. Using LCOE $\approx (I_0 \times \mathrm{CRF} + O)/E$, what is the LCOE in US¢/kWh?`,
        answer: 2,
        tolerance: { abs: 0.02 },
        unit: "US¢/kWh",
        explanation: md`Annual cost $= 100 \times 0.08 + 2 = 10$ USD m. $10 \text{ USD m} / 500 \text{ GWh} = 0.02$ USD/kWh $= 2.0$ US¢/kWh. Quick check: USD m divided by GWh gives USD/kWh.`,
        concepts: ["m10.lcoe", "m10.crf"],
        difficulty: 2,
      },
    ],
    deeper: ["m10-l01", "m10-l02"],
  },
  {
    id: "x-project-finance-tariff-bids",
    day: 6,
    title: "Project finance and how tariff bids are compared",
    minutes: 14,
    module: "m10",
    hook: "When KAPP opens the financial envelopes of a solar IPP, MEWRE's offtaker team helps judge which bid is truly cheapest and whether it is deliverable. The lowest first-year tariff is not always the lowest bid, and a tariff the lenders cannot finance is not a bargain.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Buying a house with a mortgage: you put in 20 % of your own money (**equity**) and the bank lends 80 % (**debt**). The bank looks at your salary and asks: "after your living costs, how many times over can you cover the monthly payment?" If your spare cash is 1.25 times the payment, the bank is comfortable. If a bad month would leave you short, it lends less.

In project finance the "salary" is the plant's electricity revenue, and the bank plans for a **bad sunshine year**, not an average one.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

- **Project finance**: the SPV borrows against its own future cash flows and contracts, with little or no recourse to the sponsors. Typical Gulf solar: about **80 % debt, 20 % equity**. Debt is cheaper than equity, so more debt means a lower tariff.
- **CFADS** (cash flow available for debt service): revenue minus opex and tax.
- **DSCR** (debt service cover ratio) $= \text{CFADS} / \text{debt service}$ (interest plus principal) in each period. Lenders size debt so the DSCR stays above a target, for example **1.25x on P50** energy, and test a downside at about **1.0 to 1.10x on P90**.
- **Why P90**: P50 is the yield exceeded in half of years; **P90** is the yield exceeded in 90 % of years. Lenders are paid first but never share the upside, so they care about the bad years. In the Track 0 base case a single P90 year (7 % less energy) drops the DSCR from 1.287x to 1.183x: below a 1.20x **lock-up** (dividends are blocked) but above the 1.05x default level.

**Comparing tariff bids.** Bids can be flat or escalating. A low first-year tariff that rises 1.5 % a year can cost more over 30 years than a higher flat one. The fair yardstick is the **levelised tariff**: the flat tariff with the same present value of payments for the same energy, using a discount rate published in the RFP **before** bids are opened.

Track 0 example (hypothetical bids, 30 years, constant energy, 7 % discount rate):

| Bid | Year-1 tariff (fils/kWh) | Escalation | Levelised (fils/kWh) |
|---|---|---|---|
| A | 4.20 | 0 %/yr | 4.200 |
| B | 3.90 | 1.5 %/yr | 4.541 |
| C | 4.00 | 0.5 %/yr | 4.203 |

The lowest headline (B) is the most expensive.

**Technical scoring.** KAPP opens **technical envelopes first**; only bidders who pass have their price opened (two-envelope). For consultancy, a weighted score (**QCBS**) combines technical and financial scores, and the weights must be fixed before opening: moving from 70/30 to 80/20 can flip the winner. Finally, test an unusually **low bid**: a tariff below credible cost risks failure to reach financial close, delay, quality cuts or renegotiation.`,
      },
      { kind: "widget", widget: "tariff-eval", caption: "Enter a flat bid and an escalating bid with a lower first-year price, then raise the discount rate: watch the escalating bid look cheaper as the rate rises, and see how technical weighting changes the ranking." },
      {
        kind: "callout",
        tone: "tip",
        title: "Numbers you will hear",
        md: md`- **Gearing**: about 75 to 85 % debt for Gulf solar; Track 0 base case 80 % (USD 448 m debt, 112 m equity on 560 m).
- **DSCR**: sizing about **1.25x on P50**, about **1.0 to 1.10x on P90**; lock-up 1.10 to 1.20x; default about 1.05x.
- **Levelised tariff**: $LT = \sum T_t E_t (1+d)^{-t} / \sum E_t (1+d)^{-t}$; a higher discount rate $d$ favours back-loaded (escalating) bids.
- **Track 0 bid example**: a bid 20 % below the median levelised tariff gave a 1.70 % equity IRR at base costs, a red flag for deliverability (illustrative numbers).`,
      },
    ],
    say: [
      "Which discount rate, energy profile and indexation will we use to levelise, and are they in the RFP before bids come in?",
      "What sizing DSCR and gearing did your lenders commit to, on P50 and on P90, and which constraint binds?",
      "Is the tariff unconditional, or subject to lender or board approvals not listed in the RFP?",
      "This bid is well below the others: show us the capex, yield and financing that make it work.",
      "Are the technical weights and pass marks fixed before the financial envelopes are opened?",
    ],
    trap: "Ranking bids by their year-1 tariff. An escalating bid with a lower starting price can cost MEWRE more over 30 years; only the levelised tariff, at a discount rate fixed before opening, compares bids fairly. And the cheapest bid is not a win if the lenders will not finance it.",
    check: [
      {
        id: "x-project-finance-tariff-bids-c1",
        type: "numeric",
        prompt: md`In a year, an SPV has CFADS of USD 50 m and debt service (interest plus principal) of USD 40 m. What is its DSCR?`,
        answer: 1.25,
        tolerance: { abs: 0.005 },
        unit: "x",
        explanation: md`$DSCR = 50 / 40 = 1.25$x: cash covers the debt payment 1.25 times, a typical P50 sizing target.`,
        concepts: ["m10.cover-ratios"],
        difficulty: 1,
      },
      {
        id: "x-project-finance-tariff-bids-c2",
        type: "mcq",
        prompt: md`Why do lenders test a solar IPP's debt on P90 energy as well as P50?`,
        options: [
          "They are repaid first but get no upside, so they must be sure debt is covered in bad sunshine years",
          "P90 is the average yield over 30 years",
          "P90 is required by FIDIC",
          "P90 gives a higher tariff",
        ],
        answer: 0,
        explanation: md`P90 is the yield exceeded in 90 % of years. Lenders size so debt service is still covered (about 1.0 to 1.10x) in such a year. A curtailment year without deemed-energy payment looks to lenders just like a P90 year.`,
        concepts: ["m10.debt-sculpting", "m10.project-finance"],
        difficulty: 1,
      },
      {
        id: "x-project-finance-tariff-bids-c3",
        type: "mcq",
        prompt: md`Bid A is flat at 4.20 fils/kWh for 30 years. Bid B starts at 3.90 fils/kWh and escalates 1.5 %/yr. At a 7 % discount rate with constant energy, which is cheaper for MEWRE?`,
        options: [
          "Bid A: B's levelised tariff is about 4.54 fils/kWh",
          "Bid B: it has the lower first-year tariff",
          "They are equal because the escalation is small",
          "It cannot be known without technical scores",
        ],
        answer: 0,
        explanation: md`Levelising B over 30 years at 7 % gives about 4.541 fils/kWh, above A's flat 4.20. The lowest headline was the most expensive bid.`,
        concepts: ["m10.levelized-tariff", "m11.levelized-tariff"],
        difficulty: 2,
      },
    ],
    deeper: ["m10-l04", "m10-l05", "m11-l02"],
  },
  {
    id: "x-kuwait-procurement",
    day: 6,
    title: "How Kuwait tenders a project",
    minutes: 15,
    module: "m11",
    hook: "Before anything gets built, it has to get through CAPT or KAPP, the State Audit Bureau and a series of committees, and this is where most Kuwaiti project time is lost. Know which route a purchase takes and what each gate needs, and you can plan approvals instead of waiting on them.",
    blocks: [
      {
        kind: "md",
        md: md`### The picture first

Think of a household where one person knows what the family needs (the cook) and another holds the purse (the treasurer). The cook writes the shopping list and checks the quality of what arrives. The treasurer runs the purchase so that no shop is favoured. An auditor checks the receipts before big purchases are paid. It is slower than the cook just buying, but it is harder to cheat.

In Kuwait, MEWRE is the cook, **CAPT** (or **KAPP** for partnership projects) is the treasurer, and the **State Audit Bureau** is the auditor.`,
      },
      {
        kind: "md",
        md: md`### What is actually happening

**Conventional tenders (CAPT).** The **Public Tenders Law 49/2016** created the **Central Agency for Public Tenders (CAPT)** regime. CAPT oversees tenders above **KD 75,000** (Art. 19). The split of work:

- **MEWRE** (your sector) writes the need, budget certificate, specifications, Bill of Quantities and evaluation criteria, and runs the **technical evaluation**.
- **CAPT** owns the procedure: issues the tender, answers clarifications through addenda, receives bids with a **bid bond**, opens them publicly, and makes the award decision. The usual rule is the **lowest price once technical compliance is established**.
- The **State Audit Bureau** gives **prior approval** before signature for contracts above a reported **KD 100,000** (Law 30/1964). Signing without it is a violation.
- The winner provides a **final guarantee** of at least 10 % of contract value.

**Law 94/2026** (gazetted 27 September 2026, effective about three months later, so around 27 December 2026) lets ministries contract directly up to **KD 1 m per financial year for the same items**, bans local and commission agents, and adds local content: at least **30 % of products** from the Industrial Guide and **30 % of works subcontracted** locally. It does **not** remove Audit Bureau review, and splitting a need into smaller orders to stay below the limit is still a violation. During your trial week the old KD 75,000 rule still applies.

**Partnership projects (KAPP).** IPPs go through **KAPP** under PPP Law 116/2014, not CAPT: MEWRE request, KAPP feasibility, Higher Committee approval, RFQ, RFP (technical envelopes first, then financial), preferred bidder, Higher Committee again, Audit Bureau, PPA signing, financial close. The **Fatwa and Legislation Department** reviews legal terms (its exact stage is not confirmed).

**Delays, and how PMs handle them.** Track 0's evidence: bid-deadline extensions are the norm (Zone 1 RFP: 14 Sep 2025 to 15 Jan 2026), post-bid approvals take months, and the 400 kV line took about 11 months from lowest bid to award, and went to a higher bidder. Experienced PMs: map the committee calendar (Ramadan, summer leave), pre-clear files with legal affairs and the Audit Bureau liaison, prepare the next gate in parallel, use standard documents, track bid-validity expiry, and escalate with a cost-of-delay number. They never start work before approval.`,
      },
      {
        kind: "flow",
        title: "A MEWRE tender through CAPT (above the threshold)",
        steps: [
          { label: "Need and budget certificate", detail: "MEWRE sector, with cost estimate and annual aggregate for the same items" },
          { label: "Tender documents", detail: "MEWRE writes specs, BOQ, conditions (often FIDIC-based), evaluation criteria" },
          { label: "CAPT issues the tender", detail: "Clarifications answered in writing to all bidders; addenda" },
          { label: "Bids and public opening", detail: "Sealed bids with bid bond; prices read out" },
          { label: "Technical evaluation", detail: "MEWRE committee, often with the Owner's Engineer" },
          { label: "CAPT award decision", detail: "Lowest technically compliant price, after preferences" },
          { label: "State Audit Bureau prior review", detail: "Reported threshold KD 100,000; may approve with conditions" },
          { label: "Contract and final guarantee", detail: "At least 10 % of contract value (reported)" },
        ],
        caption: "Each box is a place where a file can be returned with observations; most delay comes from returns and missed committee dates, not from the work itself.",
      },
      { kind: "widget", widget: "institution-map", caption: "Click each body to see who approves what: MEWRE needs and evaluates, CAPT or KAPP procures, the Higher Committee, Audit Bureau and Fatwa approve or review." },
      {
        kind: "callout",
        tone: "kuwait",
        title: "Numbers you will hear",
        md: md`- **CAPT threshold**: KD 75,000 (Law 49/2016 Art. 19; medium to high confidence).
- **Law 94/2026**: direct contracting up to **KD 1 m per financial year** for the same items, effective about 27 Dec 2026; 30 % local products, 30 % local subcontracting; agents banned (medium confidence: single law firm plus cabinet-stage coverage; read the Arabic text).
- **Audit Bureau prior review**: contracts above **KD 100,000** (reported by a minister, unverified); one period counted **28 contracts worth KD 63 m** signed without approval.
- **Final guarantee**: at least 10 % of contract value (Art. 65, single academic source). Bid guarantee percentage: unknown.
- **Approval scheduling**: use three-point estimates; $P80 \approx \mu + 0.84\sigma$.`,
      },
    ],
    say: [
      "Which regime does this purchase fall under, CAPT, direct, or KAPP, and is the legal basis recorded in the file?",
      "What is the annual total for the same items this financial year? We must not split it.",
      "Which version of the tenders law applies, given the announcement date?",
      "When is the next Higher Committee or Audit Bureau cut-off, and what would make them return the file?",
      "When do the bids' validity periods expire compared with our P80 approval date?",
    ],
    trap: "Thinking the new KD 1 m limit means small projects skip all oversight. It removes only the CAPT step, per financial year for the same items; Audit Bureau review and internal approvals still apply, splitting is still a violation, and it is not in force until about 27 December 2026. Another trap: assuming KAPP projects follow CAPT rules; they follow the PPP law and their own RFPs.",
    check: [
      {
        id: "x-kuwait-procurement-c1",
        type: "mcq",
        prompt: md`Which body procures a solar IPP such as Shagaya Phase III Zone 2?`,
        options: ["KAPP, under PPP Law 116/2014", "CAPT, under Law 49/2016", "The State Audit Bureau", "MEWRE directly, as a direct order"],
        answer: 0,
        explanation: md`PPPs are procured by KAPP with Higher Committee approvals, a different regime from CAPT tenders. The Audit Bureau reviews before PPA signing but does not procure.`,
        concepts: ["m11.kapp-stages", "m11.procurement-regimes"],
        difficulty: 1,
      },
      {
        id: "x-kuwait-procurement-c2",
        type: "numeric",
        prompt: md`After Law 94/2026 takes effect, MEWRE has already placed direct orders this financial year for the same PV spare parts of KD 300,000 and KD 450,000. What is the largest further direct order for the same parts (KD) it can place without CAPT?`,
        answer: 250000,
        tolerance: { abs: 1 },
        unit: "KD",
        explanation: md`$1{,}000{,}000 - (300{,}000 + 450{,}000) = 250{,}000$ KD. Anything above goes through CAPT. Orders above the reported KD 100,000 may still need Audit Bureau prior review.`,
        concepts: ["m11.anti-splitting", "m11.capt-role"],
        difficulty: 1,
      },
      {
        id: "x-kuwait-procurement-c3",
        type: "decision",
        prompt: md`You are the PM. A KD 4 m grid contract has been awarded by CAPT, and the contractor offers to mobilise next week "to save time" while the Audit Bureau review is still pending. What do you do?`,
        options: [
          { text: "Decline: no work or commitment before Audit Bureau approval. Pre-clear the file with the liaison, answer observations fast, and prepare mobilisation documents in parallel.", score: 1, feedback: "Right: lawful, and you still recover time by working the next gate in parallel." },
          { text: "Accept and regularise the contract later.", score: 0, feedback: "Contracting without prior approval is a violation; Track 0 cites 28 such cases worth KD 63 m in one period." },
          { text: "Let the contractor mobilise at its own risk without any written instruction.", score: 0.2, feedback: "Still a commitment in substance, and it exposes MEWRE to claims." },
          { text: "Re-tender to avoid the Audit Bureau.", score: 0, feedback: "Re-tendering does not avoid prior review and costs months." },
        ],
        explanation: md`Prior review is mandatory above the reported threshold. The PM's lever is speed through preparation and follow-up, not skipping the gate.`,
        concepts: ["m11.audit-prior-review", "m11.delay-countermeasures"],
        difficulty: 2,
      },
    ],
    deeper: ["m11-l01", "m11-l03", "m11-l05"],
  },
];
