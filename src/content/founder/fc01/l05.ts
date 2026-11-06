import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc01-l05",
  title: "Running several ventures: focus math, staged bets and when to kill or merge",
  summary:
    "Why splitting founder attention costs more than proportionally (compounding and context switching), how to value an hour by its opportunity cost, how staging a bet buys information cheaply, and how to set kill, pause, hand-off and merge criteria before you need them.",
  minutes: 75,
  objectives: [
    "Show with compounding arithmetic why concentrating founder time usually beats splitting it evenly",
    "Estimate the context-switching tax of running several ventures and when parallel work is still rational",
    "Compute the expected value of staging a bet versus committing fully, and the value of the information a stage buys",
    "Write kill, pause, hand-off and merge criteria with metrics and dates for each venture",
    "Answer an investor's 'what else are you working on?' honestly and credibly",
  ],
  concepts: [
    { id: "fc01.focus-cost", name: "Cost of split focus", description: "Splitting founder attention lowers each venture's growth rate, and because growth compounds the loss is more than proportional; context switching adds a further tax.", competency: "fc-fundamentals", related: ["fc01.growth-rate", "fc01.opportunity-cost"] },
    { id: "fc01.opportunity-cost", name: "Opportunity cost of founder time", description: "The value of an hour is what it would produce in its best alternative use; every hour on one venture is an hour not spent on the others.", competency: "fc-fundamentals", related: ["fc01.focus-cost", "fc01.staged-bets"] },
    { id: "fc01.staged-bets", name: "Staged bets", description: "Commit a small amount first to buy information, and the larger amount only if the evidence is good; the staged expected value exceeds the all-in value by the value of that information.", competency: "fc-fundamentals", related: ["fc01.opportunity-cost", "fc01.kill-criteria", "m10.npv"] },
    { id: "fc01.kill-criteria", name: "Kill, pause, hand-off and merge criteria", description: "Pre-agreed, dated, measurable conditions under which a venture is stopped, paused, handed to someone else to lead, or folded into another.", competency: "fc-fundamentals", related: ["fc01.staged-bets", "fc01.pre-mortem"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Focus as a compounding input",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You run Afterwave, Mizan and Suhail at once, with different cofounders and very different clocks: an accelerator decision and enterprise pilots, a public-sector pilot in Kuwait, and a community programme starting in January 2027. Investors will ask what else you do, cofounders will notice where your hours go, and each venture's growth depends on them. This lesson gives you the arithmetic to decide deliberately rather than by whichever inbox is loudest.`,
        },
        {
          kind: "md",
          md: md`### Why splitting time costs more than it seems

Suppose a venture's monthly growth rate is roughly proportional to the founder attention it gets (a simplifying model, but the direction is right for early ventures where the founder does the selling, hiring and deciding):`,
        },
        { kind: "equation", formula: "fc01-focus-growth" },
        {
          kind: "md",
          md: md`Because outcomes compound as $(1+g)^n$, a convex function of $g$, halving attention does much more than halve the outcome. With 15% per month at full focus over 24 months:

| Focus $f$ | Monthly growth | Multiple after 12 months | after 24 months |
|---|---|---|---|
| 1.0 | 15% | 5.35x | 28.6x |
| 0.5 | 7.5% | 2.38x | 5.67x |
| 0.33 | 5% | 1.80x | 3.23x |

Half the attention gives about a fifth of the 24-month outcome. Two ventures at half focus each end at $2\times5.67 = 11.3$ units of starting revenue; one venture at full focus plus one left idle ends at $28.6 + 1 = 29.6$. **Concentration wins whenever growth compounds**, which is why accelerators and seed investors expect founders to work full-time on the company and ask what else they are doing.`,
        },
        {
          kind: "chart",
          chart: "line",
          title: "Revenue multiple vs months at different founder focus (15%/month at full focus)",
          xKey: "month",
          xLabel: "Month",
          yLabel: "Revenue multiple (x)",
          series: [
            { key: "full", label: "Full focus (15%/mo)" },
            { key: "half", label: "Half focus (7.5%/mo)" },
            { key: "third", label: "One-third focus (5%/mo)" },
          ],
          data: [
            { month: 0, full: 1, half: 1, third: 1 },
            { month: 3, full: 1.52, half: 1.24, third: 1.16 },
            { month: 6, full: 2.31, half: 1.54, third: 1.34 },
            { month: 9, full: 3.52, half: 1.92, third: 1.55 },
            { month: 12, full: 5.35, half: 2.38, third: 1.8 },
            { month: 15, full: 8.14, half: 2.96, third: 2.08 },
            { month: 18, full: 12.38, half: 3.68, third: 2.41 },
            { month: 21, full: 18.82, half: 4.57, third: 2.79 },
            { month: 24, full: 28.63, half: 5.67, third: 3.23 },
          ],
          caption: "Model assumption: growth proportional to focus. The gap opens slowly and then fast; most of the cost of split focus shows up in the second year.",
        },
        {
          kind: "md",
          md: md`### The context-switching tax

Switching between projects costs time to reload context: who said what, where the deal stands, what the code or the model does. Gerald Weinberg's widely quoted rule of thumb (Quality Software Management, 1992) estimates the share of time each project gets when one person works on several:`,
        },
        {
          kind: "chart",
          chart: "stacked-bar",
          title: "Weinberg's rule of thumb: time per project and time lost to switching",
          xKey: "projects",
          xLabel: "Number of simultaneous projects",
          yLabel: "% of working time",
          series: [
            { key: "useful", label: "Useful time (all projects)" },
            { key: "lost", label: "Lost to context switching" },
          ],
          data: [
            { projects: "1", useful: 100, lost: 0 },
            { projects: "2", useful: 80, lost: 20 },
            { projects: "3", useful: 60, lost: 40 },
            { projects: "4", useful: 40, lost: 60 },
            { projects: "5", useful: 25, lost: 75 },
          ],
          caption: "Per project: 100%, 40%, 20%, 10%, 5%. A heuristic from experience, not a measured law; your own losses depend on how you batch the work.",
        },
        {
          kind: "md",
          md: md`Combine both effects. Two ventures at nominal half focus actually get about 40% each: at 12% per month full-focus growth, each grows at about 4.8% per month, and over 18 months each reaches $1.048^{18} = 2.33$x; together 4.65 units, against $1.12^{18} + 1 = 8.69$ for full focus on one.

### When running several ventures is still rational

The arithmetic above assumes the bottleneck is your attention. It is not always:

- **External latency.** A public-sector pilot or tender in Kuwait can wait weeks for an approval no amount of founder time will speed up. Filling that waiting time with another venture costs little, provided the waiting venture still gets its critical hours on the days it needs them.
- **Someone else leads.** If a cofounder (for example Omar on Mizan day to day) or volunteer leads (Suhail) carry the venture, your role shrinks to a few high-leverage decisions a week.
- **Shared assets.** Suhail's network of builders, investors and employers can serve as a hiring and distribution channel for the other two; one set of finance, legal and operating habits serves all three.
- **Real options.** A low-cost stage on a second venture keeps an option open while the first one is proving itself (see staged bets below).

The discipline: name one **primary venture** that gets the compounding hours, and run the others in deliberately bounded roles.

### Opportunity cost and expected value

The cost of an hour on venture B is the value it would have created in venture A. For bets with uncertain outcomes use expected value:`,
        },
        { kind: "equation", formula: "fc01-expected-value" },
        {
          kind: "md",
          md: md`### Staging a bet buys information

Instead of committing the whole investment $I_2$ now, spend a small extra amount $I_1$ on a first stage that reveals whether the big commitment is worth making (success with probability $p$), and commit $I_2$ only after success. All-in, $EV = pV - I_2$. Staged:`,
        },
        { kind: "equation", formula: "fc01-staged-bet" },
        {
          kind: "md",
          md: md`The difference is the **value of the information** the first stage buys: you avoid spending $I_2$ in the $1-p$ cases where the venture would fail, at the price of $I_1$ in every case. Staging is worth it when $(1-p)I_2 > I_1$ (ignoring delay). This is the logic of design partners before product, pilots before platforms, and one hackathon before a conference.

### Kill, pause, hand off or merge

Decide the criteria **before** the venture is in trouble, when you can still be objective (sunk-cost bias and identity make it very hard afterwards). Each criterion needs a metric, a threshold and a date.`,
        },
        {
          kind: "matrix",
          title: "Portfolio decisions: evidence trend vs fit with your strengths",
          xAxis: ["Weak fit with your strengths and time", "Strong fit"],
          yAxis: ["Evidence flat or worsening", "Evidence improving"],
          cells: [
            { label: "Hand off", detail: "Working, but not where you add most. Give leadership to a cofounder or partner; keep a board-level role or equity." },
            { label: "Double down", detail: "Improving evidence and your edge: this is the primary venture. Give it the compounding hours." },
            { label: "Kill (or sell)", detail: "No evidence and no edge. Stop on the pre-agreed date; tell people early; keep the learning." },
            { label: "Pause or merge", detail: "Your edge, but not working yet. Time-boxed pause, or fold the useful part into another venture." },
          ],
          caption: "Top-left, top-right, bottom-left, bottom-right. Revisit each quarter using the same evidence you report in monthly updates.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Staging Mizan and pricing your focus",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Staged bet: pilot first or build the full product?",
          given: md`Illustrative numbers. Mizan could build a full soiling-analytics and cleaning-optimisation product now for EUR 300k of cash and founder time. The team estimates a 30% chance that a paying market exists at the needed price; if it does, the business is worth EUR 2.0 m to the founders (present value). Alternative: a pilot costing an extra EUR 50k reveals whether buyers will pay (treat it as conclusive), and the EUR 300k build is committed only if they will.`,
          steps: [
            { md: md`**All-in:** $EV = 0.3\times2.0 - 0.3 = 0.30$ EUR m.` },
            { md: md`**Staged:** $EV = 0.3\times(2.0 - 0.30) - 0.05 = 0.51 - 0.05 = 0.46$ EUR m.` },
            { md: md`**Value of staging (information):** $0.46 - 0.30 = 0.16$ EUR m, which equals $(1-p)I_2 - I_1 = 0.7\times0.30 - 0.05 = 0.16$.` },
            { md: md`**Check the condition:** $(1-p)I_2 = 0.21 > I_1 = 0.05$, so staging wins. It would stop winning only if the pilot cost more than EUR 210k or the delay destroyed much of the value.` },
            { md: md`**Founder time:** the pilot also needs far fewer of your hours than a full build, which matters more than the cash when Afterwave is the primary venture.` },
          ],
          result: md`Staging Mizan is worth about EUR 160k in expected value at these assumptions. It also defines a natural kill or go criterion: the result of the pilot.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "What does splitting focus cost Afterwave?",
          given: md`Model assumption: Afterwave's monthly revenue growth at full founder focus is 12%; it scales with focus. Compare 18 months at full focus with 18 months at half focus (ignoring the context-switching tax first).`,
          steps: [
            { md: md`Full focus: $1.12^{18}$.` },
            { md: md`$= 7.69$x.`, hidden: true, check: { prompt: "Revenue multiple after 18 months at full focus", answer: 7.69, unit: "x", tolerance: { abs: 0.03 } } },
            { md: md`Half focus: $g = 6\%$, so $1.06^{18}$.` },
            { md: md`$= 2.85$x.`, hidden: true, check: { prompt: "Revenue multiple after 18 months at half focus", answer: 2.85, unit: "x", tolerance: { abs: 0.02 } } },
            { md: md`With Weinberg's switching tax, two projects give about 40% each: $g = 4.8\%$ and $1.048^{18} = 2.33$x.` },
          ],
          result: md`Halving focus cuts the 18-month outcome from 7.7x to 2.9x (to 2.3x with switching costs), a loss of 60 to 70%, not 50%. If Afterwave is the venture-scale bet, its compounding hours are the most expensive hours you have.`,
        },
        {
          kind: "question",
          question: {
            id: "fc01-l05-p1",
            type: "numeric",
            prompt: md`Suhail is considering a full conference (Suhail Season) costing USD 240k, with a 25% chance it finds enough sponsors to be worth USD 1.5 m to the venture. Alternatively a first hackathon costing an extra USD 40k reveals whether sponsors will pay, and the USD 240k conference is committed only if they will. What is the expected value of the staged plan, in USD k?`,
            answer: 275,
            tolerance: { abs: 1 },
            unit: "USD k",
            explanation: md`Staged: $0.25\times(1{,}500 - 240) - 40 = 315 - 40 = 275$ USD k. All-in: $0.25\times1{,}500 - 240 = 135$ USD k. Value of staging $= 140 = 0.75\times240 - 40$. Illustrative numbers.`,
            concepts: ["fc01.staged-bets"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "An operating system for a multi-venture founder",
      blocks: [
        {
          kind: "md",
          md: md`### How founders running several companies actually do it

- **One primary venture.** Write it down and tell your cofounders. The primary gets the compounding hours: selling, hiring, fundraising. For a YC application or a seed round this is also what investors need to hear.
- **Bounded roles for the others.** Define what you do in each secondary venture (for example, a weekly decision meeting and specific relationships) and what the cofounder or leads own. Put it in writing, including how equity and vesting reflect the time commitment.
- **Batch by venture, not by task.** Whole days or half-days per venture, not hourly switching. Protect the primary venture's deep-work blocks.
- **Separate entities and IP.** Each venture's work product, data and code belong to its own company, assigned in writing. Investors will diligence this, and it avoids conflicts later.
- **Shared infrastructure, separate books.** One bookkeeping and legal routine, but separate accounts and cap tables. Shared services between ventures are billed or documented.
- **Disclose.** Tell investors and cofounders what else you run and how much time it takes. Discovering it later destroys trust faster than any number.
- **Quarterly portfolio review.** Use the matrix: evidence trend vs fit. Apply the pre-written kill, pause, hand-off and merge criteria.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Multi-venture traps",
          md: md`- **Equal time by default:** splitting hours evenly is the worst allocation when growth compounds.
- **Hiding the other ventures:** investors and cofounders find out; credibility does not recover.
- **No written criteria:** without a kill date, a stalled venture absorbs hours for years (sunk cost).
- **Merging for convenience:** fold ventures together only if customers, team or assets genuinely overlap; otherwise you get a confused story and a messy cap table.
- **Cofounder asymmetry:** a cofounder working full-time beside a part-time CEO needs the arrangement reflected in roles and equity, agreed early.
- **Letting the loudest venture win:** urgency (an event date, a tender deadline) is not importance.`,
        },
        {
          kind: "checklist",
          title: "Write these down for each venture",
          items: [
            "Role: primary or secondary, and your hours per week",
            "Who leads day to day, and which decisions come to you",
            "The next stage's evidence and its date (Lesson 2)",
            "Kill criterion: metric, threshold, date",
            "Pause, hand-off or merge criterion",
            "What you have told investors and cofounders about your other commitments",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask yourself each quarter",
          items: [
            "If I could only work on one venture next quarter, which would it be, and why am I not doing that?",
            "Which venture is blocked by external latency, and can its waiting time be used elsewhere without missing its critical days?",
            "What would I need to see to hand this venture to someone else to lead?",
            "Am I keeping a venture alive because of evidence or because of identity and sunk cost?",
          ],
        },
        { kind: "scenario", scenario: "fc01-s3" },
        {
          kind: "question",
          question: {
            id: "fc01-l05-p2",
            type: "short",
            prompt: md`Write your portfolio memo for the next two quarters (one page). Name the primary venture and why, your weekly hours per venture, who leads each secondary venture day to day, one staged bet with its expected-value logic, and kill, pause, hand-off or merge criteria with metrics and dates for each venture. End with the two-sentence answer you will give when an investor asks "what else are you working on?".`,
            rubric: [
              "Names one primary venture and justifies it with the venture-scale and evidence logic from this module",
              "Gives weekly hours per venture that add up to a realistic total and favour the primary venture",
              "Assigns day-to-day leadership for secondary ventures to named roles without inventing facts (cofounder Omar for Mizan, volunteer leads for Suhail, or stated as to be decided)",
              "Includes one staged bet with an expected-value calculation and a clear go or stop trigger",
              "States measurable kill, pause, hand-off or merge criteria with dates for each venture",
              "Provides an honest, short investor answer that discloses the other ventures and the time commitment",
            ],
            modelAnswer: md`**Portfolio memo, Q1 to Q2 2027 (illustrative where marked)**

**Primary venture: Afterwave.** Highest venture-scale ceiling (Lesson 3 rubric about 3.8), cofounders with direct validation experience, YC W27 decision pending. It gets the compounding work: customers, pilots, fundraising.

| Venture | Role | My hours/week | Day-to-day lead |
|---|---|---|---|
| Afterwave | Primary | 45 | Me (CEO) |
| Mizan | Secondary, staged | 10 (one fixed day) | Omar on pilot execution; I own the KISR relationship and buyer conversations |
| Suhail | Secondary, bounded | 5 | Volunteer leads; I handle sponsor and investor relationships |

**Staged bet:** Mizan pilot before product. Pilot EUR 50k, p(paying market) 0.3, value EUR 2 m (illustrative): staged EV 0.46 m vs all-in 0.30 m. Go trigger: a named buyer agrees in writing to a paid phase at an agreed price.

**Criteria:**
- Afterwave: double down while pilot-to-paid conversion is at least 1 in 3; if no paid contract by 30 Sep 2027, re-examine the segment.
- Mizan: if the data-access agreement is not signed by 31 Mar 2027, pause the pilot and tell the partner; if the pilot ends with no paid phase by 30 Sep 2027, hand off or stop.
- Suhail: if the first hackathon does not cover its costs from sponsors, run the next one only with a committed anchor sponsor; merge newsletter and podcast into one media line if either has fewer than [N] regular readers or listeners by June.

**Investor answer:** "Afterwave is my full-time company; my cofounders and I are all on it. I also cofounded Mizan, an energy analytics venture in Kuwait that a cofounder runs day to day, and I support Suhail, a builder community run by volunteer leads; together they take about one day a week, and they are separate companies with their own IP."`,
            explanation: md`A strong memo makes the choice explicit, matches hours to the compounding logic, uses staging to keep options cheap, and writes criteria that can be checked on a date. The investor answer is short, honest and shows control.`,
            concepts: ["fc01.focus-cost", "fc01.kill-criteria", "fc01.staged-bets", "fc01.opportunity-cost"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["fc01-r11", "fc01-r2"] },
        {
          kind: "feynman",
          prompt: "Explain to a friend who also runs several projects why giving each one equal time is usually the worst choice, and when it is not.",
          keyPoints: [
            "Growth compounds, so outcomes are convex in the growth rate",
            "If growth scales with attention, halving attention cuts the outcome by much more than half",
            "Context switching adds a further tax (Weinberg's rule of thumb)",
            "Exceptions: external waiting time, someone else leading, shared assets, cheap staged options",
            "Name one primary venture and bound the others with written roles and criteria",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc01-l05-q1",
      type: "numeric",
      prompt: md`At full focus a venture grows 10% per month. With growth proportional to focus, what is its 24-month revenue multiple at 50% focus? (2 decimals)`,
      answer: 3.23,
      tolerance: { abs: 0.02 },
      unit: "x",
      explanation: md`$1.05^{24} = 3.23$x, versus $1.10^{24} = 9.85$x at full focus: half the attention, a third of the outcome.`,
      concepts: ["fc01.focus-cost"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc01-l05-q2",
      type: "numeric",
      prompt: md`Staged bet: an extra first stage costs EUR 30k, and the EUR 200k main commitment is made only if it shows success; success probability 0.4; value if successful EUR 1.0 m. What is the expected value of the staged plan (EUR k)?`,
      answer: 290,
      tolerance: { abs: 1 },
      unit: "EUR k",
      explanation: md`$0.4\times(1{,}000 - 200) - 30 = 320 - 30 = 290$ EUR k. All-in: $0.4\times1{,}000 - 200 = 200$. Value of information $= 0.6\times200 - 30 = 90$.`,
      concepts: ["fc01.staged-bets"],
      difficulty: 2,
    },
    {
      id: "fc01-l05-q3",
      type: "mcq",
      prompt: "According to Weinberg's rule of thumb, roughly what share of time does each project get when one person runs three at once?",
      options: ["33%", "25%", "20%", "10%"],
      answer: 2,
      explanation: md`About 20% each, with about 40% lost to switching (100, 40, 20, 10, 5% per project for 1 to 5 projects). A heuristic, not a measurement.`,
      concepts: ["fc01.focus-cost"],
      difficulty: 1,
    },
    {
      id: "fc01-l05-q4",
      type: "multi",
      prompt: "When can running a second venture alongside the primary one be rational? (Select all that apply.)",
      options: [
        "The second venture is waiting on external approvals that founder time cannot speed up",
        "A cofounder leads it day to day and your role is a few decisions a week",
        "You give both exactly equal hours so neither feels neglected",
        "The second venture is a cheap staged option that keeps a large opportunity open",
        "You do not tell investors about it",
      ],
      answer: [0, 1, 3],
      explanation: md`External latency, delegated leadership and cheap options reduce the cost of the second venture. Equal splitting maximises the compounding loss; hiding it destroys trust.`,
      concepts: ["fc01.focus-cost", "fc01.opportunity-cost", "fc01.staged-bets"],
      difficulty: 1,
    },
    {
      id: "fc01-l05-q5",
      type: "decision",
      prompt: md`Two quarters after its kill date, a secondary venture has no paying customer, but you have grown fond of it and a friend says "give it six more months". What do you do?`,
      options: [
        { text: "Give it six more months: it would be a shame to waste the work.", score: 0, feedback: "Sunk cost. The past work is spent either way; the question is the best use of the next six months." },
        { text: "Apply the pre-agreed criterion: stop or hand it off, tell the people involved, and record what was learned; restart only if new evidence (not hope) appears.", score: 1, feedback: "This is why criteria are written in advance, when you can still be objective." },
        { text: "Keep it running quietly with a few hours a week.", score: 0.2, feedback: "Zombie ventures cost more than they appear to: context switching and attention leak from the primary venture." },
      ],
      explanation: md`Kill criteria protect your future hours from your past decisions.`,
      concepts: ["fc01.kill-criteria", "fc01.opportunity-cost"],
      difficulty: 1,
    },
    {
      id: "fc01-l05-q6",
      type: "order",
      prompt: "Order these portfolio actions from most to least founder time typically required.",
      items: [
        "Double down (primary venture)",
        "Pause or merge (time-boxed, your edge but not yet working)",
        "Hand off (someone else leads; board-level role)",
        "Kill (stop, communicate, record the learning)",
      ],
      explanation: md`Doubling down takes the compounding hours; a pause or merge still needs some work to design and restart; a hand-off leaves a governance role; a kill takes a short, clean effort and then frees the time.`,
      concepts: ["fc01.kill-criteria"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc01-l05-f1", front: "Why does halving focus cut the outcome by more than half?", back: md`Outcomes compound as $(1+g)^n$, convex in $g$: 15%/mo for 24 months is 28.6x, 7.5%/mo is 5.7x.`, concepts: ["fc01.focus-cost"] },
    { id: "fc01-l05-f2", front: "Weinberg's switching rule of thumb", back: "Time per project: 1 project 100%, 2 projects 40% each, 3 projects 20% each, 4 projects 10%, 5 projects 5%.", concepts: ["fc01.focus-cost"] },
    { id: "fc01-l05-f3", front: "Staged bet expected value", back: md`$EV_{staged} = p(V - I_2) - I_1$; staging wins when $(1-p)I_2 > I_1$.`, concepts: ["fc01.staged-bets"] },
    { id: "fc01-l05-f4", front: "Opportunity cost of founder time", back: "The value an hour would create in its best alternative use, usually the primary venture.", concepts: ["fc01.opportunity-cost"] },
    { id: "fc01-l05-f5", front: "Four portfolio actions", back: "Double down, hand off, pause or merge, kill: chosen by evidence trend and fit with your strengths.", concepts: ["fc01.kill-criteria"] },
    { id: "fc01-l05-f6", front: "What a kill criterion needs", back: "A metric, a threshold and a date, written before the venture is in trouble.", concepts: ["fc01.kill-criteria"] },
  ],
  scenarios: [
    {
      id: "fc01-s3",
      title: "\"What else are you working on?\"",
      dayInLife: true,
      context: md`You are in an accelerator interview for Afterwave. Your application mentions that you are also involved in Mizan and Suhail. Ismail and Yusuf are in the room. Assume you have already agreed the arrangement described in this lesson's portfolio memo exercise (primary venture, bounded roles, written criteria). The interviewer asks: "What else are you working on, and how much of your time does Afterwave get?"`,
      start: "a",
      concepts: ["fc01.focus-cost", "fc01.kill-criteria", "fc01.opportunity-cost"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            { text: "\"Only Afterwave.\"", score: 0, feedback: "Contradicts what the interviewer can see. A credibility failure in the first ten minutes is very hard to recover from.", next: "c" },
            { text: "\"Afterwave is my full-time company. I cofounded Mizan, which a cofounder runs day to day, and I support Suhail, a community run by volunteer leads. Together they take about a day a week; they are separate companies with separate IP, and we have written criteria for handing off or stopping them.\"", score: 10, feedback: "Honest, specific and shows control: primary venture, bounded roles, separate IP, criteria.", next: "b" },
            { text: "\"All three are equally important to me; I split my time evenly.\"", score: 2, feedback: "Signals the worst allocation for a compounding business, and tells the interviewer the startup gets a third of you.", next: "b" },
          ],
        },
        b: {
          md: md`The interviewer turns to Ismail: "Is that how it feels to you?"`,
          choices: [
            { text: "Ismail answers from a written agreement the three of you made: roles, the CEO's hours, and what happens if the YC decision is positive (other commitments reduced further).", score: 10, feedback: "Cofounder alignment, visible and pre-agreed, is exactly what the question tests." },
            { text: "Ismail hesitates and says you are \"very busy\".", score: 3, feedback: "The interviewer now doubts the team's alignment. Agree the arrangement with cofounders before any interview." },
          ],
        },
        c: {
          md: md`The interviewer says: "Your application mentions two other ventures."`,
          choices: [
            { text: "Correct yourself immediately with the honest, bounded answer and apologise for the confusion.", score: 4, feedback: "Partial recovery; the initial answer will still weigh on the decision." },
          ],
        },
      },
    },
  ],
};

export default lesson;
