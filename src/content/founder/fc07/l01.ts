import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc07-l01",
  title: "How Venture Capital Works: Fund Economics and the Power Law",
  summary:
    "A VC fund is a 10-year partnership with its own investors, fees and return target. Rebuild the fund maths (2 and 20, LP net multiple, ownership at exit) and you can predict which companies a VC can back, how big your outcome must look, and why most say no.",
  minutes: 70,
  objectives: [
    "Explain the LP/GP structure, fund life, management fee and carried interest of a venture fund",
    "Compute the gross proceeds a fund needs to return a target net multiple to its LPs",
    "Compute the exit value a single company needs to return the fund, from entry ownership and dilution",
    "Explain the power law and use it to predict why a given VC passes on a given company",
    "Read a fund's size and strategy and decide whether it is the right target for Afterwave, Mizan or Suhail",
  ],
  concepts: [
    { id: "fc07.fund-structure", name: "Venture fund structure (LP/GP)", description: "Limited partners commit capital to a closed-end fund run by a general partner over a roughly 10-year life: investment period, follow-on reserves, harvesting.", competency: "fc-fundraising" },
    { id: "fc07.fund-economics", name: "Fund economics: 2 and 20", description: "Management fee (about 2 % of commitments per year) pays the firm; carried interest (about 20 % of profits) pays the partners only once LPs have their capital back.", competency: "fc-fundraising", related: ["fc07.fund-structure"] },
    { id: "fc07.power-law", name: "Power-law returns", description: "Venture outcomes are so skewed that one or two companies produce most of a fund's proceeds; the rest of the portfolio barely matters to the result.", competency: "fc-fundraising", related: ["fc07.fund-returner"] },
    { id: "fc07.fund-returner", name: "Fund-returner test", description: "Each investment must plausibly exit at a value where the fund's diluted stake alone pays back the whole fund: exit value at least fund size divided by exit ownership.", competency: "fc-fundraising", related: ["fc07.power-law", "m10.irr"] },
    { id: "fc07.why-vcs-say-no", name: "Why VCs say no", description: "Most passes follow from fund maths and partner capacity (outcome too small for the fund, wrong stage or check size, conflicts, too early), not from a verdict on the founder.", competency: "fc-fundraising", related: ["fc07.fund-returner"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "The fund behind the partner: structure, fees, carry and the power law",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You will pitch Afterwave to partners who each answer to a fund with a size, a return target and a clock. If you can do their maths, you know before the meeting whether "Afterwave can be a EUR 1bn+ company" is a claim you must prove or a box already ticked, which funds are structurally wrong for Mizan's first raise, and why Suhail should not be pitched to VCs at all until it has a venture-shaped revenue engine. Pitching the right fund with the right size of story is most of the work.`,
        },
        {
          kind: "md",
          md: md`### Who owns what

A venture fund is usually a **limited partnership** with a fixed life (typically 10 years plus one or two one-year extensions).

- **Limited partners (LPs)** commit the money: pension funds, university endowments, foundations, insurance companies, funds of funds, family offices and, in the Gulf, sovereign and state-linked vehicles (Saudi Venture Capital, Jada, Mubadala and similar). LPs have no say in individual deals; their liability is limited to their commitment.
- **The general partner (GP)** is the management company and its partners. They pick companies, sit on boards and report to LPs. They commit a small share of the fund themselves (often 1 to 2 %).
- **Commitments are drawn down over time** (capital calls) as deals happen. The **investment period** for new companies is usually the first 3 to 5 years; the rest of the life funds follow-ons and waits for exits.
- **Reserves:** a seed fund typically keeps 40 to 60 % of investable capital for follow-on investments in its winners, so the first cheque is much smaller than the fund suggests.

Consequence for you: a partner at a 4-year-old fund may have no new-company budget left; a partner at a fund in year 1 is hunting. Ask "which fund are you investing from and how far into it are you?"

### 2 and 20

The firm earns money in two ways:`,
        },
        { kind: "equation", formula: "fc07-mgmt-fee" },
        { kind: "equation", formula: "fc07-carry" },
        {
          kind: "md",
          md: md`The management fee (around 2 % of commitments per year, often stepping down after the investment period) pays salaries and office. It does not depend on performance, which is why it is taken out of the capital that could have been invested: on a 10-year fund at 2 %, about 20 % of commitments never reach a startup.

**Carried interest** (typically 20 %, some top firms 25 to 30 %) is the partners' share of profits. In the LP-friendly **whole-fund (European) waterfall**, LPs first get back all contributed capital (including the fees), then profits split 80/20. Many European funds backed by public LPs such as the European Investment Fund also have a **hurdle** (a preferred return of about 8 % a year) before carry starts; most US venture funds do not.

What LPs measure: **TVPI** (total value to paid-in: distributions plus remaining value, divided by paid-in), **DPI** (distributions only: cash actually returned) and the fund **IRR**. A venture LP typically wants at least about 3x net TVPI over a decade to justify illiquidity and risk.

### From the LP's target to the fund's required proceeds

Set the LP net multiple $M_{\text{net}}$ equal to what LPs receive divided by what they paid in, and solve for the gross proceeds $P$ the portfolio must produce:`,
        },
        { kind: "equation", formula: "fc07-lp-net-multiple" },
        { kind: "equation", formula: "fc07-required-proceeds" },
        {
          kind: "md",
          md: md`For a EUR 80m fund at 20 % carry and a 3x net target: $P = 80 + 2\times 80/0.8 = 280$ EUR m. Only about EUR 64m is invested after fees, so the portfolio has to turn invested capital into $280/64 = 4.4\times$ gross.

### Ownership at exit and the fund-returner test

A VC's stake shrinks at every later round. If the fund enters with $o_0$ and does not fully follow on:`,
        },
        { kind: "equation", formula: "fc07-ownership-dilution" },
        { kind: "equation", formula: "fc07-fund-returner" },
        {
          kind: "md",
          md: md`Entry at 12.5 %, then Series A, B and C at 20 %, 20 % and 10 % dilution: $o_{\text{exit}} = 0.125\times 0.8\times 0.8\times 0.9 = 7.2\%$. To return the EUR 80m fund from that one company: $V \ge 80/0.072 = 1.11$ EUR bn.

That is the **fund-returner test**: at the moment of investing, a partner must be able to tell a credible story in which *this* company alone pays back the fund. It is not a forecast that it will happen; it is a filter on what could happen.

### The power law

Venture returns are not normally distributed. Published industry analyses consistently find that a large share of investments return less than the capital put in and that a small share (single-digit percent of deals) produce most of all proceeds. The consequence is arithmetic, not psychology:

- **Losses are capped at 1x; wins are not.** A company that fails costs the cheque; a company that exits at EUR 2.5bn returns 2 to 3 times the whole fund.
- **The median outcome is irrelevant to the fund.** A "solid" EUR 150m acquisition returns $0.072\times 150 = 10.8$ EUR m, 0.14x of the fund. Even if it were certain, it cannot move the fund's result.
- **Missing the winner is worse than backing a loser.** So VCs optimise for the size of the upside and tolerate high failure rates.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative EUR 80m seed fund: where the proceeds come from",
          xKey: "bucket",
          xLabel: "Portfolio outcome bucket (32 companies, 7.2 % ownership at exit)",
          yLabel: "Proceeds to the fund (EUR m)",
          series: [{ key: "proceeds", label: "Proceeds to fund (EUR m)" }],
          data: [
            { bucket: "1 company, EUR 1.5bn exit", proceeds: 108 },
            { bucket: "2 companies, EUR 400m", proceeds: 57.6 },
            { bucket: "4 companies, EUR 100m", proceeds: 28.8 },
            { bucket: "8 companies, EUR 25m", proceeds: 14.4 },
            { bucket: "17 companies, failed", proceeds: 0 },
          ],
          caption: "Illustrative portfolio. Total EUR 208.8m: 2.6x gross on commitments and about 2.3x net to LPs. One company produces 52 % of proceeds; to reach 3x net, the top company would need to exit near EUR 2.5bn.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Outcome distribution statistics",
          md: md`Figures such as "about two thirds of venture financings return less than 1x" and "about 6 % of deals produce about 60 % of returns" circulate widely (attributed to Correlation Ventures and Horsley Bridge data sets). They are directionally consistent across sources, but the exact percentages depend on vintage and sample and were not checked against the original data for this course. Use them as "roughly" numbers and never put them on a slide without a source.`,
        },
        {
          kind: "flow",
          title: "Life of a 10-year venture fund",
          steps: [
            { label: "Fundraise (year 0)", detail: "GP raises commitments from LPs; first and final close" },
            { label: "Investment period (years 1 to 4)", detail: "New companies; capital calls; most of the J-curve dip from fees and write-downs" },
            { label: "Follow-on (years 3 to 7)", detail: "Reserves go into winners to defend ownership" },
            { label: "Harvest (years 6 to 10+)", detail: "Exits and secondaries; DPI rises; carry is paid once LPs are whole" },
            { label: "Next fund", detail: "GP raises Fund N+1 on the paper marks (TVPI) of Fund N" },
          ],
          caption: "The clock matters: a fund late in its life needs exits within a few years and has little appetite for a new seed-stage hardware-heavy company.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Doing the partner's maths before the meeting",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Can a EUR 80m seed fund back Afterwave?",
          given: md`Illustrative: a European seed fund of EUR 80m, 2 % fee for 10 years, 20 % carry, target 3x net to LPs. It writes initial cheques of about EUR 1m for 12.5 % and keeps half its investable capital for follow-ons. Expected dilution after its entry: 20 % at Series A, 20 % at B, 10 % at C.`,
          steps: [
            { md: md`**Fees:** $F = 0.02\times 80\times 10 = 16$ EUR m. Investable capital $= 80 - 16 = 64$ EUR m, of which 32 for initial cheques: about **32 companies** at EUR 1m each.` },
            { md: md`**Proceeds needed for 3x net:** $P = 80 + (3-1)\times 80/(1-0.2) = 280$ EUR m (4.4x gross on the 64 invested).` },
            { md: md`**Exit ownership:** $o_{\text{exit}} = 0.125\times 0.8\times 0.8\times 0.9 = 0.072$ (7.2 %).` },
            { md: md`**Fund-returner exit:** $V = 80/0.072 = 1{,}111$ EUR m. The partner needs a credible path to an Afterwave exit of roughly **EUR 1.1bn or more**.` },
            { md: md`**What that means for the story:** at an illustrative exit multiple of 10x revenue for high-growth infrastructure software, EUR 1.1bn implies about EUR 110m of annual recurring revenue at exit. At an illustrative average contract of EUR 150k per test organisation, that is about 730 customer organisations, or fewer, larger enterprise accounts plus the later test-platform business.` },
            { md: md`**The check:** is there a credible path to hundreds of enterprise test organisations across robotics, humanoids, drives, batteries and powertrains, in the US and EU? If yes, Afterwave passes the filter for this fund. Mizan's first raise (a Kuwait-and-Gulf energy analytics business selling through tenders) would struggle to show the same path, which says "different investor", not "bad company".` },
          ],
          result: md`For this fund Afterwave must credibly reach about **EUR 1.1bn** in value, roughly **EUR 110m ARR** at a 10x multiple. Build the market and expansion slides (Lesson 4) so a partner can draw that path in their investment memo without you saying "billion" first.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Carry and LP net multiple on a EUR 50m fund",
          given: md`Illustrative: EUR 50m fund (all paid in, fees included), whole-fund waterfall, 20 % carry, no hurdle. Over its life the portfolio returns EUR 175m of gross proceeds.`,
          steps: [
            { md: md`Profit above contributed capital $= 175 - 50 = 125$ EUR m.` },
            { md: md`Carry to the GP $= 0.2\times 125$.` },
            { md: md`= **EUR 25m**.`, hidden: true, check: { prompt: "Carried interest (EUR m)", answer: 25, unit: "EUR m", tolerance: { abs: 0.1 } } },
            { md: md`LPs receive $50 + 0.8\times 125 = 150$ EUR m.` },
            { md: md`LP net multiple $= 150/50$ = **3.0x**.`, hidden: true, check: { prompt: "LP net multiple (x)", answer: 3, unit: "x", tolerance: { abs: 0.01 } } },
          ],
          result: md`A 3.5x gross fund is a 3.0x net fund. The gap between gross and net is why partners need outcomes bigger than "good".`,
        },
        {
          kind: "question",
          question: {
            id: "fc07-l01-p1",
            type: "numeric",
            prompt: md`A USD 150m fund takes 10 % at seed and expects 30 % total dilution before exit (it does not follow on). What exit value (USD m) does a company need for this fund's stake alone to return the fund?`,
            answer: 2142.9,
            tolerance: { rel: 0.01 },
            unit: "USD m",
            explanation: md`$o_{\text{exit}} = 0.10\times(1-0.30) = 0.07$. $V = 150/0.07 = 2{,}142.9$ USD m, about USD 2.1bn. Bigger funds need bigger outcomes: the same company can be a great fit for a USD 40m fund and a pass for a USD 150m fund.`,
            concepts: ["fc07.fund-returner"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Reading funds in practice and decoding a pass",
      blocks: [
        {
          kind: "md",
          md: md`### Who actually decides

- **Associate / principal:** sources and screens; usually cannot say yes alone. Useful as a champion, not a decision maker.
- **Partner:** owns the deal, writes the investment memo, takes the board seat. Their personal capacity (often 8 to 12 boards) is a real constraint.
- **Investment committee / partners' meeting:** approves. Your partner has to sell you to colleagues using your numbers; give them a memo-ready story.

### Matching the fund to the venture

| Question | Where to find it | Why it matters |
|---|---|---|
| Fund size and vintage | Firm website, press releases, Crunchbase or Dealroom, ask directly | Sets the fund-returner exit and how hungry they are |
| Initial cheque and target ownership | Ask: "what is your typical first cheque and ownership?" | Tells you if your round can be led by them |
| Stage and sector focus | Portfolio list | A fund with no hardware or industrial software portfolio will struggle with Afterwave's sales cycle |
| Reserves and follow-on behaviour | Ask: "how do you think about follow-ons?" | A seed investor who never follows on is a weak signal at Series A |
| Conflicts | Portfolio list (Nominal, Sift, Foxglove investors and similar) | An investor in a direct competitor may take the meeting to learn |
| LP base | Press, fund announcements | Gulf state-linked LPs often bring local-presence or co-investment expectations |

### Decoding "no"

Most passes are structural. Translate before you take it personally:

- "Too early for us" usually means the risk you are asking them to underwrite (product, market) is not one their fund model is built to take.
- "Not a fit for the fund" often means the fund-returner story does not work at their size.
- "Keep us posted" is a soft no; treat it as a no and put them on your update list.
- A real no with a reason ("we don't believe hardware test teams buy software") is gold: it is a market objection you will hear again.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Pitching a big fund for a small round:** a USD 500m fund writing a USD 500k seed cheque treats it as an option; if it does not follow on, the market reads it as a negative signal.
- **Treating Suhail as a VC case:** a volunteer-led community with sponsorship revenue does not pass any fund-returner test and should not try. Its capital is sponsors, grants and partners (Lesson 3).
- **Telling the partner the outcome size instead of showing it:** "this is a billion-dollar market" without a bottom-up build triggers scepticism.`,
        },
        {
          kind: "ask",
          title: "Questions to ask every VC in the first meeting",
          items: [
            "Which fund would this come from, what size is it and how far through the investment period are you?",
            "What is your typical first cheque and target ownership at this stage?",
            "Do you lead rounds, and how often do you follow on in your winners?",
            "Who else at the firm needs to meet us before a decision, and what does your process look like week by week?",
            "Do you have any portfolio companies that overlap with hardware test data or test automation?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc07-l01-p2",
            type: "short",
            prompt: md`Produce a **one-page fund-fit screen** for Afterwave's first institutional round. Pick two real or realistic fund profiles (one roughly EUR 50 to 100m European seed fund, one roughly USD 300m+ US multi-stage fund). For each, compute the fund-returner exit value from stated assumptions, state what Afterwave would need to show to pass it, and name the one structural risk that could make them pass. End with which you would approach first and why.`,
            rubric: [
              "States assumptions for each fund explicitly (size, entry ownership, dilution to exit) and labels them illustrative",
              "Computes the fund-returner exit correctly for both, using V = C / o_exit",
              "Translates each exit value into an implied revenue or customer count with a stated multiple and ACV",
              "Names a structural pass risk per fund (cheque size vs round, stage, conflicts, sector experience, fund vintage)",
              "Makes a clear recommendation tied to Afterwave's stage and sales cycle, not to brand names",
              "Does not invent Afterwave traction or customers",
            ],
            modelAnswer: md`**Fund A (illustrative):** EUR 70m European seed fund, EUR 1m first cheque for about 12 %, dilution to exit 20/20/10 % → $o_{\text{exit}} = 0.12\times 0.8\times 0.8\times 0.9 = 6.9\%$. Fund-returner exit $= 70/0.069 \approx$ EUR 1.0bn, about EUR 100m ARR at 10x, roughly 650 test organisations at EUR 150k ACV. To pass: show that hardware test teams across robotics, drives, batteries and powertrains are a large enough buyer set, that Lockstep plus Enclave land in one team and expand, and that Ripple creates a reason to spread across programmes. Pass risk: no industrial or hardware software in portfolio, so long enterprise sales cycles and on-prem security reviews scare them.

**Fund B (illustrative):** USD 400m US multi-stage fund, USD 2m seed cheque for 10 %, dilution 20/15/10 % → $o_{\text{exit}} = 0.10\times 0.8\times 0.85\times 0.9 = 6.1\%$. Fund-returner exit $= 400/0.061 \approx$ USD 6.5bn, about USD 650m ARR at 10x. To pass: a credible platform story (bench memory as a data asset, Ripple as the change-impact layer, later instrumented test platforms) and evidence that physical AI teams adopt quickly. Pass risk: seed cheque is an option for them; if they do not lead the Series A it becomes a negative signal; they may also hold a competitor.

**Recommendation:** approach Fund A first as a potential lead: its fund-returner bar is reachable with the EU/US hardware test market, it can own a meaningful stake and its partner has capacity. Use Fund B only as a participant or at Series A when there is evidence of expansion.`,
            explanation: md`The screen works because it uses the partner's own arithmetic: fund size divided by exit ownership gives the outcome they must believe in. Translating that into ARR and customer counts shows whether the story is credible for Afterwave's buyers, and the structural risk tells you what to pre-empt in the first meeting.`,
            concepts: ["fc07.fund-returner", "fc07.why-vcs-say-no", "fc07.fund-structure"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Omar Abu Harb, in under two minutes, why a VC might pass on Mizan even if they believe it will be a profitable EUR 60m company.",
          keyPoints: [
            "VC funds must return a multiple of the fund to their LPs after fees and carry",
            "Ownership is diluted by later rounds, so the fund's stake at exit is small (single-digit percent)",
            "Fund size divided by exit ownership gives the exit value needed for one company to return the fund",
            "A EUR 60m outcome returns a small fraction of the fund, so it cannot move results even if certain",
            "That is a mismatch of capital type, not a judgement of the business; other capital (strategic, regional, debt, grants) fits better",
          ],
        },
        { kind: "xref", to: "m10.irr", note: "Fund IRR and TVPI use the same discounting logic as project IRR in Track 0 Module 10." },
        { kind: "sources", refs: ["fc07-r1", "fc07-r2", "fc07-r3"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc07-l01-q1",
      type: "mcq",
      prompt: "In a venture fund, who decides which startups get funded?",
      options: ["The limited partners, by vote on each deal", "The general partner (the fund's partners)", "The largest LP", "The fund administrator"],
      answer: 1,
      explanation: md`LPs commit capital and have no say on individual deals; the GP's partners decide, usually through a partners' meeting or investment committee.`,
      concepts: ["fc07.fund-structure"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc07-l01-q2",
      type: "numeric",
      prompt: md`A EUR 120m fund charges 2 % a year on commitments for 10 years. How much (EUR m) is left to invest?`,
      answer: 96,
      tolerance: { abs: 0.5 },
      unit: "EUR m",
      explanation: md`Fees $= 0.02\times 120\times 10 = 24$ EUR m; investable $= 120 - 24 = 96$ EUR m (ignoring recycling of early proceeds).`,
      concepts: ["fc07.fund-economics"],
      difficulty: 1,
    },
    {
      id: "fc07-l01-q3",
      type: "numeric",
      prompt: md`A EUR 100m fund with 20 % carry targets 3x net to LPs. What gross proceeds (EUR m) must the portfolio return?`,
      answer: 350,
      tolerance: { abs: 1 },
      unit: "EUR m",
      explanation: md`$P = C + (M_{\text{net}}-1)C/(1-c) = 100 + 2\times 100/0.8 = 350$ EUR m. Check: profit 250, carry 50, LPs get 100 + 200 = 300 = 3x.`,
      concepts: ["fc07.fund-economics"],
      difficulty: 2,
    },
    {
      id: "fc07-l01-q4",
      type: "multi",
      prompt: "Which statements follow from the power law in venture returns? (Select all that apply.)",
      options: [
        "A fund's result is driven by its one or two best companies",
        "Avoiding failures is the main way a VC improves returns",
        "A very likely EUR 100m exit can be less attractive to a large fund than a 5 % chance of a EUR 3bn exit",
        "VCs should diversify across hundreds of companies to get the median outcome",
        "Missing a big winner costs a fund more than backing a company that fails",
      ],
      answer: [0, 2, 4],
      explanation: md`Losses are capped at 1x, gains are not; the top outcome dominates. Avoiding failure does little if it also means avoiding the tail. The median is irrelevant to the fund; what matters is exposure to the tail.`,
      concepts: ["fc07.power-law"],
      difficulty: 2,
    },
    {
      id: "fc07-l01-q5",
      type: "numeric",
      prompt: md`A fund enters at 15 % ownership and is diluted 20 % at Series A and 15 % at Series B, then exits. What is its ownership at exit (%)?`,
      answer: 10.2,
      tolerance: { abs: 0.05 },
      unit: "%",
      explanation: md`$o = 15\%\times 0.8\times 0.85 = 10.2\%$. Dilutions multiply; they do not add.`,
      concepts: ["fc07.fund-returner"],
      difficulty: 1,
    },
    {
      id: "fc07-l01-q6",
      type: "decision",
      prompt: md`A partner at a large US fund says: "We love the team, but this feels like a great EUR 200m business." You are raising Afterwave's seed. What is the best response?`,
      options: [
        { text: "Argue that the market is actually worth billions and you will prove it.", score: 0.3, feedback: "Assertion without a mechanism rarely changes a fund-maths objection." },
        { text: "Ask what they would need to see to believe in a larger outcome, show the expansion path (Lockstep to Enclave to Ripple to test platforms) with a bottom-up build, and keep smaller-fund leads moving in parallel.", score: 1, feedback: "Turns the objection into a specific evidence request and does not let one fund's model stall the round." },
        { text: "Offer a lower valuation so their ownership is higher.", score: 0.2, feedback: "Ownership helps a little, but the gap is outcome size, not price; you give away value without fixing the objection." },
      ],
      explanation: md`The objection is about the fund-returner test. Either show a credible path to the size their fund needs, or recognise a structural mismatch and focus on funds whose size fits.`,
      concepts: ["fc07.why-vcs-say-no", "fc07.fund-returner"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc07-l01-f1", front: "LP vs GP", back: "LPs commit capital and have no deal say; the GP (the fund's partners) picks companies, sits on boards and earns fees and carry.", concepts: ["fc07.fund-structure"] },
    { id: "fc07-l01-f2", front: "2 and 20", back: "About 2 % of commitments per year as management fee; about 20 % of profits as carried interest once LPs have their capital back.", concepts: ["fc07.fund-economics"] },
    { id: "fc07-l01-f3", front: "Gross proceeds needed for a net multiple", back: md`$P = C + (M_{\text{net}}-1)C/(1-c)$; EUR 80m at 3x net, 20 % carry: EUR 280m.`, concepts: ["fc07.fund-economics"] },
    { id: "fc07-l01-f4", front: "Fund-returner exit value", back: md`$V = C/o_{\text{exit}}$; EUR 80m fund at 7.2 % exit ownership: about EUR 1.1bn.`, concepts: ["fc07.fund-returner"] },
    { id: "fc07-l01-f5", front: "Why the median outcome does not matter to a VC", back: "Losses are capped at 1x and wins are not, so one or two companies drive the fund; a certain mid-size exit cannot move the result.", concepts: ["fc07.power-law"] },
    { id: "fc07-l01-f6", front: "TVPI vs DPI", back: "TVPI counts distributions plus unrealised value; DPI counts only cash actually returned to LPs.", concepts: ["fc07.fund-economics"] },
    { id: "fc07-l01-f7", front: "'Keep us posted'", back: "A soft no. Log it as a pass, add them to the update list, move on.", concepts: ["fc07.why-vcs-say-no"] },
  ],
};

export default lesson;
