import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh06-l03",
  title: "MENA venture capital 2025 to 2026: what the numbers show and what they do not",
  summary:
    "The MENA funding cycle from a record 2025 to a sharp H1 2026 contraction, read through two data providers (MAGNiTT and Wamda) whose methods differ; the arithmetic that reconciles them (implied bases, equity-only totals, average tickets, shares); where the money went (UAE, Saudi Arabia, AI, fintech); the funds and programmes that surfaced in the research; and the limits of the data, so Suhail can quote funding numbers to sponsors and readers without misleading anyone.",
  minutes: 80,
  objectives: [
    "State the FY2025 and H1 2026 MENA totals from MAGNiTT and Wamda with dates, and explain why they differ",
    "Compute implied prior-period values, equity-only totals, average tickets and shares from a report's headline numbers",
    "Explain what the shift to fewer, larger rounds and to AI means for early-stage builders",
    "Name the funds and programmes recorded in the research and the limits of that list",
    "Write a correctly sourced funding section for a Suhail sponsor deck or newsletter",
  ],
  concepts: [
    { id: "sh06.provider-methodology", name: "Data-provider methodology", description: "Funding totals depend on what a provider counts: equity only or including debt, disclosed rounds only, which countries, startups or deals, and when a round is dated. MAGNiTT and Wamda give very different 2025 totals for the same region.", competency: "sh-landscape", related: ["sh06.implied-base", "sh06.funding-concentration"] },
    { id: "sh06.implied-base", name: "Implied base", description: "The prior-period value recovered from a reported total and its growth rate, X divided by 1 plus g. It shows whether two providers disagree on the base, the current period, or both.", competency: "sh-landscape", related: ["sh06.provider-methodology"] },
    { id: "sh06.funding-concentration", name: "Funding concentration", description: "When average ticket size rises while deal count falls, money is going to fewer, larger rounds (often AI or late stage) and early-stage access tightens even if the total looks stable.", competency: "sh-landscape", related: ["sh06.provider-methodology", "sh06.ai-funding-share"] },
    { id: "sh06.ai-funding-share", name: "AI share of MENA funding", description: "AI rose from about 22% of MENA funding in FY2025 (USD 858 m) to about half in H1 2026 (USD 678 m) from roughly a quarter of deals (MAGNiTT): large AI rounds, not many AI startups.", competency: "sh-landscape", related: ["sh06.funding-concentration"] },
    { id: "sh06.fund-landscape", name: "MENA fund landscape", description: "State funds of funds (Saudi Venture Capital, Jada) behind many regional VCs, regional seed and Series A funds, accelerators (F6 Group, Sanabil 500), and sovereign-scale AI vehicles (MGX, Qai) that rarely write early cheques.", competency: "sh-landscape", related: ["fc07.gulf-capital"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Two providers, one region, very different totals",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Investors are one side of Suhail's market: they sponsor, judge, attend Suhail Season and want deal flow. Builders want to know whether there is money for them. Every sponsor deck, newsletter and panel will quote a funding number. If you quote Wamda's USD 7.5 bn next to MAGNiTT's AI share, or call H1 2026 a boom, an investor in the room will correct you. Getting this right is cheap; getting it wrong costs credibility with the people Suhail most needs.`,
        },
        {
          kind: "md",
          md: md`### The headline numbers (as recorded in the course research)

| Period | MAGNiTT | Wamda |
|---|---|---|
| **FY2025** | **USD 3.8 bn across 688 deals**, +74% YoY. AI 22% (USD 858 m). KSA led the Middle East with USD 1.72 bn | **USD 7.5 bn raised by 647 startups**, +225% YoY. KSA USD 5 bn across 211 deals; fintech USD 4.4 bn (58%) |
| **H1 2026** | **USD 1.35 bn across 214 deals**; funding -22% YoY, deals -41%. AI USD 678 m (about 50%) from about a quarter of deals. UAE USD 895 m (66%); KSA USD 219 m across 72 deals | **USD 1.7 bn across 242 rounds**, -18% YoY; debt 29% of the total |
| **Other** | Q3 2026 MENA update published (not read for this course) | |

Separately, Saudi Q1 2026 funding fell 62% YoY (Mubasher, secondary).

The two providers agree on the direction (a strong 2025, a weaker H1 2026) and disagree sharply on the level. Wamda appears to include debt; its H1 2026 report states debt was 29%. MAGNiTT reports deals; Wamda's FY2025 figure counts startups.

### Reconcile before you quote

Three pieces of arithmetic make the comparison honest.`,
        },
        { kind: "equation", formula: "sh06-implied-prior" },
        {
          kind: "md",
          md: md`**Implied 2024 base.** MAGNiTT: $3.8/1.74 = 2.18$ bn. Wamda: $7.5/3.25 = 2.31$ bn. The providers roughly **agree on 2024** and **diverge on 2025** by about USD 3.7 bn. The Saudi figures differ by $5.0 - 1.72 = 3.3$ bn, so most of the gap is Saudi: consistent with a few large Saudi rounds (fintech, possibly debt-financed) counted by Wamda and not by MAGNiTT. That is an inference from the arithmetic, not something either report states.`,
        },
        { kind: "equation", formula: "sh06-equity-only" },
        {
          kind: "md",
          md: md`**Equity-only H1 2026.** Wamda $1.7\times(1-0.29) = 1.21$ bn, now *below* MAGNiTT's USD 1.35 bn. So debt is not the only difference: coverage of countries, which rounds count as disclosed, and dating also differ. Conclusion: never mix the two series in one sentence or one chart line.`,
        },
        { kind: "equation", formula: "sh06-avg-ticket" },
        {
          kind: "md",
          md: md`**Average ticket (MAGNiTT).** H1 2025 implied: $1.73/0.363 \approx 4.8$ m (from $214/0.59 \approx 363$ deals). FY2025: $3{,}800/688 = 5.5$ m. H1 2026: $1{,}350/214 = 6.3$ m. Deals fell 41% but the average ticket rose about a third: **fewer, larger rounds**. For Suhail's builders that means early-stage money was scarcer in H1 2026 than the total suggests.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "MENA venture funding by provider, full years (USD bn)",
          xKey: "period",
          xLabel: "Period",
          yLabel: "USD bn",
          series: [
            { key: "magnitt", label: "MAGNiTT" },
            { key: "wamda", label: "Wamda (appears to include debt)" },
          ],
          data: [
            { period: "2024 (implied from YoY)", magnitt: 2.18, wamda: 2.31 },
            { period: "FY2025 (reported)", magnitt: 3.8, wamda: 7.5 },
          ],
          caption: "Sources: MAGNiTT FY2025 MENA VC report; Wamda, Jan 2026. 2024 values are derived as X/(1+g) from the reported growth (+74%, +225%), not reported directly. The providers nearly agree on 2024 and split on 2025.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "MENA venture funding by provider, first halves (USD bn)",
          xKey: "period",
          xLabel: "Period",
          yLabel: "USD bn",
          series: [
            { key: "magnitt", label: "MAGNiTT" },
            { key: "wamda", label: "Wamda total (incl. debt)" },
          ],
          data: [
            { period: "H1 2025 (implied)", magnitt: 1.73, wamda: 2.07 },
            { period: "H1 2026 (reported)", magnitt: 1.35, wamda: 1.7 },
          ],
          caption: "Sources: MAGNiTT H1 2026 review (Jul 2026); Wamda H1 2026 (Jul 2026). H1 2025 values are derived from the reported -22% and -18%, not reported directly. Wamda's H1 2026 total excluding its 29% debt is about USD 1.21 bn (derived), below MAGNiTT: debt is not the only methodological difference. Wamda's H1 2025 debt share is not in the sources.",
        },
        {
          kind: "md",
          md: md`### Where the money went`,
        },
        { kind: "equation", formula: "sh06-share" },
        {
          kind: "chart",
          chart: "bar",
          title: "H1 2026 MENA funding by country (MAGNiTT, USD m)",
          xKey: "country",
          xLabel: "Country",
          yLabel: "USD m",
          series: [{ key: "usd", label: "USD m" }],
          data: [
            { country: "UAE", usd: 895 },
            { country: "Saudi Arabia", usd: 219 },
            { country: "Rest of MENA (derived)", usd: 236 },
          ],
          caption: "Source: MAGNiTT H1 2026 review. Rest of MENA is the remainder of the USD 1.35 bn total, not a reported figure, and its split by country (Egypt, Qatar, Kuwait and others) is not in the course sources. UAE share 66%; Saudi Arabia 16% after leading 2025.",
        },
        {
          kind: "chart",
          chart: "bar",
          title: "AI share of MENA venture funding (MAGNiTT, percent)",
          xKey: "period",
          xLabel: "Period",
          yLabel: "Share of funding (%)",
          series: [{ key: "share", label: "AI share (%)" }],
          data: [
            { period: "FY2025 (USD 858 m)", share: 22 },
            { period: "H1 2026 (USD 678 m)", share: 50 },
          ],
          caption: "Source: MAGNiTT FY2025 AI report; MAGNiTT H1 2026 AI note ('half of funding from just a quarter of all deals'). The share doubled while AI dollars per half-year were similar (USD 858 m for all of 2025 vs USD 678 m in H1 2026): AI grew and everything else shrank.",
        },
        {
          kind: "md",
          md: md`### What the numbers do not show

- **Stage mix.** The course sources give no breakdown by pre-seed, seed, Series A and later. You cannot say from them whether seed funding rose or fell. Pull the provider's stage table before saying anything about early stage.
- **Undisclosed rounds.** Many small regional rounds are never announced; all totals undercount the earliest stage.
- **Mega-round effects.** A handful of large rounds can make a year. Recompute without the largest rounds:`,
        },
        { kind: "equation", formula: "sh06-ex-top" },
        {
          kind: "md",
          md: md`- **Founder location vs company location.** A company headquartered in Abu Dhabi with engineering in Cairo counts as UAE.
- **Dating.** A round can be dated at announcement, close or filing; this moves deals across halves.

### The funds that surfaced (course research)

| Fund or programme | What is recorded | Status |
|---|---|---|
| **Global Ventures III** | More than USD 150 m, backed by Saudi Venture Capital (SVC) | SPA, about 1 Jan 2025 |
| **Khwarizmi Ventures Fund II** | First close USD 70 m+ (SAR 270 m), targeting more than USD 100 m, GCC focus | Feb 2026 |
| **Plus VC** | Plans to back 40 startups in 2026, Saudi focus | Mubasher, early 2026 |
| **F6 Group** (formerly Flat6Labs) | Separating F6 Ventures from the accelerator; 6th Riyadh seed programme backed 60 startups with USD 17 m, co-funded by SVC, Jada Fund of Funds and Riyadh Valley | Jan 2026 |
| **Sanabil 500** | Sanabil (PIF) accelerator run with 500 Global | Secondary profile |
| **Raed Ventures** | Riyadh, founded 2015; 56 portfolio companies as of Apr 2026 | Unverified |
| **Algebra Ventures** | Egypt; Fund I first close USD 40 m in Dec 2016; no later fund found here | Wamda, 2016 |
| **MGX**, **Qai** | USD 49 bn Fund I; USD 20 bn JV with Brookfield | AI infrastructure scale, not early-stage |

The F6 programme gives one rare early-stage price point: $17/60 \approx$ USD 0.28 m per startup on average.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Gaps in the fund data",
          md: md`No 2025 to 2026 fund-close data surfaced for STV, BECO or Shorooq (Shorooq's roughly USD 500 m AUM is from a LinkedIn post). Raed's portfolio count is from a secondary profile. Hub71's current package (reported as AED 250K in-kind plus AED 250K cash for equity on a SAFE, possibly AED 750K in total) could not be confirmed on hub71.com. The MAGNiTT Q3 2026 update exists but its figures were not read. Treat all of these as unverified until checked with the fund or the report.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Doing the reconciliation yourself",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Is 2025 a record year, and by how much?",
          given: md`MAGNiTT FY2025: USD 3.8 bn, 688 deals, +74%. Wamda FY2025: USD 7.5 bn, 647 startups, +225%; KSA USD 5 bn. MAGNiTT KSA FY2025: USD 1.72 bn.`,
          steps: [
            { md: md`**Implied 2024:** MAGNiTT $3.8/1.74 = 2.18$ bn; Wamda $7.5/3.25 = 2.31$ bn. Difference: USD 0.13 bn (6%).` },
            { md: md`**2025 gap:** $7.5 - 3.8 = 3.7$ bn. **Saudi gap:** $5.0 - 1.72 = 3.28$ bn, about 89% of the total gap.` },
            { md: md`**Average per unit:** MAGNiTT USD $3{,}800/688 = 5.5$ m per deal; Wamda USD $7{,}500/647 = 11.6$ m per startup. Wamda's unit (startups) and scope (apparently including debt) both raise its average.` },
            { md: md`**Sentence for the newsletter:** "MENA startups raised USD 3.8 bn across 688 deals in 2025, up 74% (MAGNiTT); Wamda, whose count appears to include debt, reports USD 7.5 bn, with most of the difference in Saudi Arabia."` },
          ],
          result: md`2025 was a strong year on both measures, but "record USD 7.5 bn" is one provider's broad count. One source per sentence, with its definition, is the rule.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "H1 2026: how much did early-stage access tighten?",
          given: md`MAGNiTT H1 2026: USD 1,350 m, 214 deals; -22% funding and -41% deals YoY. AI: USD 678 m from about a quarter of deals.`,
          steps: [
            { md: md`Implied H1 2025 deals: $214/(1-0.41)$.` },
            { md: md`$\approx 363$ deals.`, hidden: true, check: { prompt: "Implied H1 2025 deals", answer: 363, unit: "deals", tolerance: { abs: 2 } } },
            { md: md`AI deals at a quarter: $0.25\times214 = 53.5$; AI average ticket: $678/53.5$.` },
            { md: md`$\approx 12.7$ m per AI deal.`, hidden: true, check: { prompt: "Average AI ticket (USD m)", answer: 12.7, unit: "USD m", tolerance: { abs: 0.2 } } },
            { md: md`Non-AI average: $(1{,}350-678)/(214-53.5)$.` },
            { md: md`$= 672/160.5 \approx 4.2$ m, about a third of the AI average.`, hidden: true, check: { prompt: "Average non-AI ticket (USD m)", answer: 4.19, unit: "USD m", tolerance: { abs: 0.05 } } },
          ],
          result: md`About 150 fewer deals than a year earlier, and AI rounds averaging roughly three times non-AI rounds. "A quarter of deals" is MAGNiTT's rounded wording, so these averages are approximate. The message for Suhail's builders: money exists, but it is concentrated in larger AI rounds; the pre-seed gap is real.`,
        },
        {
          kind: "question",
          question: {
            id: "sh06-l03-p1",
            type: "numeric",
            prompt: md`MAGNiTT H1 2026: Saudi Arabia raised USD 219 m across 72 deals. What is the average Saudi ticket in USD m?`,
            answer: 3.04,
            tolerance: { abs: 0.03 },
            unit: "USD m",
            explanation: md`$219/72 = 3.04$ m, below the MENA average of 6.3 m: Saudi H1 2026 rounds were smaller as well as fewer, after a strong 2025.`,
            concepts: ["sh06.funding-concentration"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Quoting funding data in Suhail's materials",
      blocks: [
        {
          kind: "md",
          md: md`### House rules for funding numbers

| Rule | Example |
|---|---|
| One provider per sentence, named | "USD 1.35 bn across 214 deals in H1 2026 (MAGNiTT)" |
| Period and date always | "H1 2026", not "this year" |
| Say what is counted | "Wamda, whose total appears to include debt (29% in H1 2026)" |
| Absolute and share together | "AI took about half (USD 678 m)" |
| Growth with its base | "+74% on about USD 2.2 bn" |
| Derived numbers labelled | "about USD 4.2 m average non-AI ticket (our calculation)" |
| Re-check before each publication | Pull the latest quarterly update (Q3 2026 exists) |

### Who uses these numbers and how

- **VCs** quote the provider that suits their story; ask which and why.
- **Government programmes** quote national totals; they may include grants or government co-investment.
- **Data providers** sell full reports; the free summaries are what press repeat.
- **Suhail** should keep a small funding sheet (source, period, total, deals, AI share, top countries, date pulled) and update it each half-year.`,
        },
        {
          kind: "callout",
          tone: "pm",
          title: "What this means for Suhail's investor side",
          md: md`Investor sponsorship budgets follow the cycle. After a 22% fall in H1 2026 (MAGNiTT), expect investor sponsors to want measurable deal flow (curated demo days, introductions to pre-vetted teams) rather than logo placement. Pitch outcomes, not visibility, and do not let a sponsor deck depend on investor money alone.`,
        },
        { kind: "scenario", scenario: "sh06-s1" },
        {
          kind: "question",
          question: {
            id: "sh06-l03-p2",
            type: "short",
            prompt: md`Write the "State of MENA funding" slide notes (about 250 words) for the Suhail Season sponsor deck, aimed at a VC partner deciding whether to sponsor the investor track. Use both providers correctly, include at least two derived numbers with their arithmetic, state what the data does not show, and finish with what it implies for what Suhail offers investors.`,
            rubric: [
              "Quotes MAGNiTT and Wamda figures correctly, with periods and dates, never mixed in one claim",
              "Explains the methodology difference (debt, deals vs startups) briefly",
              "Includes at least two correctly computed derived numbers (implied base, average ticket, equity-only, share) labelled as derived",
              "States at least two limits (stage mix missing, undisclosed rounds, mega rounds, Q3 2026 not yet included)",
              "Draws a practical implication for the investor offer (curated deal flow, early-stage gap), with no invented Suhail traction",
            ],
            modelAnswer: md`**State of MENA funding (as of November 2026)**

**2025 was strong.** MAGNiTT counts USD 3.8 bn across 688 deals, +74% on an implied USD 2.2 bn in 2024. Wamda reports USD 7.5 bn from 647 startups; its count appears to include debt, and most of the gap between the two is Saudi (USD 5 bn vs MAGNiTT's USD 1.72 bn).

**H1 2026 contracted and concentrated.** MAGNiTT: USD 1.35 bn across 214 deals, funding -22% and deals -41% year on year. The average ticket rose from about USD 4.8 m (implied H1 2025) to USD 6.3 m (our calculation). AI took about half (USD 678 m) from roughly a quarter of deals, so AI rounds averaged about USD 12.7 m against USD 4.2 m for the rest (approximate). The UAE took 66% (USD 895 m); Saudi Arabia USD 219 m across 72 deals. Wamda: USD 1.7 bn across 242 rounds, 29% of it debt.

**What the data does not show.** No stage breakdown in the summaries we used, so we cannot say how seed fared; small rounds go undisclosed; a few large AI rounds drive the totals. MAGNiTT's Q3 2026 update is out and should be checked before the event.

**Implication.** Capital is flowing to fewer, larger, later rounds. The scarce thing is a pipeline of credible early teams, especially outside the UAE. Suhail's investor track would offer curated introductions to builders from its hackathons, with consented profiles and follow-up tracking, not logo placement. (No numbers for Suhail exist yet; first-season targets would be set with the sponsor.)`,
            explanation: md`Graders check correct attribution, the arithmetic, honest limits and an implication that does not invent Suhail traction.`,
            concepts: ["sh06.provider-methodology", "sh06.funding-concentration", "sh06.ai-funding-share"],
            difficulty: 3,
          },
        },
        { kind: "xref", to: "fc07-l03", note: "The capital sources map (angels, VCs, accelerators, grants, Gulf funds) from a founder raising money; this lesson reads the same market as an ecosystem builder." },
        { kind: "xref", to: "fc06-l08", note: "Rates and funding cycles: why MENA funding moves with global conditions and what that does to sponsor budgets." },
        { kind: "xref", to: "fc01-l03", note: "Bottom-up market sizing: the same discipline (count the units, name the source) applied to a market rather than a funding total." },
        { kind: "sources", refs: ["sh06-r32", "sh06-r33", "sh06-r34", "sh06-r35", "sh06-r36", "sh06-r37", "sh06-r38", "sh06-r39", "sh06-r40", "sh06-r41", "sh06-r42", "sh06-r43", "sh06-r44"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh06-l03-q1",
      type: "numeric",
      prompt: md`Wamda reports USD 7.5 bn for FY2025 at +225% YoY. What 2024 base (USD bn) does that imply?`,
      answer: 2.31,
      tolerance: { abs: 0.02 },
      unit: "USD bn",
      explanation: md`$7.5/(1+2.25) = 7.5/3.25 = 2.31$ bn, close to MAGNiTT's implied USD 2.18 bn.`,
      concepts: ["sh06.implied-base"],
      difficulty: 1,
    },
    {
      id: "sh06-l03-q2",
      type: "mcq",
      prompt: "Why must you not write 'MENA startups raised USD 7.5 bn in 2025, with AI taking 22%'?",
      options: [
        "Because both numbers are wrong",
        "Because it mixes Wamda's total with MAGNiTT's AI share; the providers count differently",
        "Because AI took 50% in 2025",
        "Because the total was USD 3.8 bn according to both providers",
      ],
      answer: 1,
      explanation: md`USD 7.5 bn is Wamda (appears to include debt); 22% is MAGNiTT's share of its own USD 3.8 bn. A share only applies to its own total.`,
      concepts: ["sh06.provider-methodology"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh06-l03-q3",
      type: "numeric",
      prompt: md`Wamda H1 2026: USD 1.7 bn with 29% debt. What is the equity-only amount in USD bn?`,
      answer: 1.21,
      tolerance: { abs: 0.01 },
      unit: "USD bn",
      explanation: md`$1.7\times0.71 = 1.207$ bn, below MAGNiTT's USD 1.35 bn, so coverage differences remain after removing debt.`,
      concepts: ["sh06.provider-methodology"],
      difficulty: 1,
    },
    {
      id: "sh06-l03-q4",
      type: "multi",
      prompt: "Which statements about H1 2026 follow from MAGNiTT's numbers? (Select all that apply.)",
      options: [
        "The average ticket rose while the deal count fell",
        "The UAE took about two thirds of funding",
        "Seed-stage funding grew",
        "AI took about half of funding from about a quarter of deals",
        "Saudi Arabia led MENA funding",
      ],
      answer: [0, 1, 3],
      explanation: md`Average ticket went from about USD 4.8 m to 6.3 m as deals fell 41%; UAE 66%; AI about 50% from about 25% of deals. The sources have no stage split, and Saudi Arabia took only USD 219 m.`,
      concepts: ["sh06.funding-concentration", "sh06.ai-funding-share"],
      difficulty: 2,
    },
    {
      id: "sh06-l03-q5",
      type: "numeric",
      prompt: md`F6 Group's sixth Riyadh seed programme backed 60 startups with USD 17 m (Jan 2026). What is the average per startup, in USD thousands?`,
      answer: 283,
      tolerance: { abs: 2 },
      unit: "USD k",
      explanation: md`$17{,}000/60 = 283$ thousand. A rare early-stage price point in the data, far below MENA's average round.`,
      concepts: ["sh06.fund-landscape"],
      difficulty: 1,
    },
    {
      id: "sh06-l03-q6",
      type: "mcq",
      prompt: "Which of these is an AI infrastructure investment vehicle rather than an early-stage VC?",
      options: ["Khwarizmi Ventures", "Plus VC", "MGX", "Algebra Ventures"],
      answer: 2,
      explanation: md`MGX (about USD 49 bn Fund I) invests in OpenAI, data centres and similar; the others are regional early-stage funds.`,
      concepts: ["sh06.fund-landscape"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh06-l03-f1", front: "MAGNiTT FY2025 MENA", back: "USD 3.8 bn across 688 deals, +74% YoY; AI 22% (USD 858 m); KSA USD 1.72 bn.", concepts: ["sh06.provider-methodology"] },
    { id: "sh06-l03-f2", front: "Wamda FY2025 MENA", back: "USD 7.5 bn raised by 647 startups, +225%; KSA USD 5 bn; fintech USD 4.4 bn (58%); appears to include debt.", concepts: ["sh06.provider-methodology"] },
    { id: "sh06-l03-f3", front: "MAGNiTT H1 2026 MENA", back: "USD 1.35 bn across 214 deals; -22% funding, -41% deals; AI about 50%; UAE 66% (USD 895 m); KSA USD 219 m, 72 deals.", concepts: ["sh06.funding-concentration"] },
    { id: "sh06-l03-f4", front: "Wamda H1 2026 MENA", back: "USD 1.7 bn across 242 rounds, -18%; debt 29%, so about USD 1.21 bn equity.", concepts: ["sh06.provider-methodology"] },
    { id: "sh06-l03-f5", front: "Implied base", back: md`$X_{t-1} = X_t/(1+g)$: both providers imply about USD 2.2 to 2.3 bn for 2024.`, concepts: ["sh06.implied-base"] },
    { id: "sh06-l03-f6", front: "Signature of concentration", back: "Average ticket rising while deal count falls: USD 4.8 m to 6.3 m as deals fell 41% (MAGNiTT H1 2025 to H1 2026).", concepts: ["sh06.funding-concentration"] },
    { id: "sh06-l03-f7", front: "What the funding summaries do not show", back: "Stage mix, undisclosed small rounds, the effect of a few mega rounds, founder location vs HQ, dating rules.", concepts: ["sh06.provider-methodology"] },
  ],
  scenarios: [
    {
      id: "sh06-s1",
      title: "The newsletter headline: 'record funding, AI takes over'",
      context: md`It is Monday and the Editorial lead's draft for Suhail's newsletter opens: "MENA startups smashed records with USD 7.5 bn in 2025, and AI now takes half of all funding. It has never been easier to raise." A VC sponsor's partner will read it, and so will 30 hackathon finalists looking for pre-seed money (illustrative audience).`,
      start: "a",
      concepts: ["sh06.provider-methodology", "sh06.funding-concentration", "sh06.ai-funding-share"],
      nodes: {
        a: {
          md: md`What do you do with the headline?`,
          choices: [
            { text: "Approve it: it is upbeat and the numbers are real.", score: 1, feedback: "The numbers come from two providers and two periods (Wamda FY2025, MAGNiTT H1 2026), and the conclusion is the opposite of what H1 2026 shows. The VC reader will notice.", next: "b" },
            { text: "Rewrite: '2025 was strong (USD 3.8 bn, MAGNiTT; USD 7.5 bn on Wamda's broader count). H1 2026 fell 22% with 41% fewer deals, and AI took half of the money from a quarter of the deals.'", score: 10, feedback: "One source per claim, the right periods, and the real story: concentration.", next: "c" },
            { text: "Drop funding from the newsletter entirely.", score: 4, feedback: "Avoids error but loses a topic your readers care about.", next: "c" },
          ],
        },
        b: {
          md: md`The sponsor partner replies to the newsletter: "Your numbers mix Wamda and MAGNiTT, and H1 2026 was down. Who checks these?"`,
          choices: [
            { text: "Publish a correction in the next issue with the right figures and add a funding-numbers rule to the editorial checklist.", score: 8, feedback: "Recovers credibility; the checklist stops it happening again.", next: "c" },
            { text: "Reply privately that it was a small error.", score: 3, feedback: "Thirty finalists still read that raising is easy.", next: "c" },
          ],
        },
        c: {
          md: md`A finalist asks you after the issue: "So should I raise now or wait?"`,
          choices: [
            { text: "Explain what the data shows (fewer, larger rounds, AI concentration, UAE-heavy) and what it does not (no stage split), and point them to early-stage programmes and investors who attend Suhail events, without advising on timing.", score: 10, feedback: "Useful, honest and within Suhail's role as a convenor, not an adviser or investor." },
            { text: "Tell them it is a bad time and to wait a year.", score: 3, feedback: "The aggregate data cannot tell one team when to raise; it depends on their traction and investors." },
          ],
        },
      },
    },
  ],
};

export default lesson;
