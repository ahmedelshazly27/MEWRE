import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc11-l03",
  title: "The defence: investor Q&A, the pitch check and the final package",
  summary:
    "How investors interrogate a seed package (the risk lens and the fund-returner test), a structure for answering hard questions, three graded Q&A decision trees (competition, commitment across ventures, why now), a Feynman pitch check and the final integrative exercise that pulls the whole package onto one page.",
  minutes: 75,
  objectives: [
    "You can map any investor question to the risk it probes and to the artifact that answers it.",
    "You can compute the exit value a seed investment needs to return the fund and use it to frame the market-size answer.",
    "You can answer a hard question with answer, evidence, implication, and handle what you do not know without bluffing.",
    "You can defend your venture on competition, team commitment across ventures and why now.",
    "You can present the whole package on one page: thesis, numbers, cap table, top questions and closed gaps.",
  ],
  concepts: [
    {
      id: "fc11.investor-risk-lens",
      name: "Investor risk lens",
      description:
        "Every investor question probes one of five risks: market, product or technical, team, go-to-market, financing. Naming the risk tells you which evidence and which artifact answers it.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.fund-returner",
      name: "Fund-returner test",
      description:
        "The exit value at which one investment repays the whole fund: fund size divided by ownership at exit. It is the hidden question behind market-size and competition questions.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.answer-structure",
      name: "Answer, evidence, implication",
      description:
        "Answer the question in the first sentence, give one specific piece of evidence, then state what it means for the investment. When you do not know: say so, say how you will find out and by when.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.competition-answer",
      name: "Competition answer",
      description:
        "Name the real alternatives (incumbents, adjacent platforms, in-house tools, doing nothing), the axis on which you win, why that edge compounds, and what would prove you wrong.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.founder-commitment",
      name: "Founder commitment across ventures",
      description:
        "The decided and documented allocation of a founder's time, roles, governance and IP between ventures, so that the funded company has a full-time CEO and conflicts are handled by rule, not by goodwill.",
      competency: "fc-fundraising",
    },
    {
      id: "fc11.why-now",
      name: "Why now",
      description:
        "A dated, specific change that makes the company possible or necessary today, ideally more than one, so the thesis does not collapse if one driver slips.",
      competency: "fc-fundraising",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "How investors interrogate a package",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`The package gets you the meeting; the answers get you the term sheet. Three questions will come in every one of your Afterwave meetings, in some form: "what about Nominal and the others?", "you run three companies, how committed are you?" and "why now and not five years ago?". As the founder who owns fundraising, you will answer them alone, in real time, with a partner judging how you think more than what you say. Rehearse them here until the answers are structured, true and short.`,
        },
        {
          kind: "md",
          md: md`### Every question probes a risk

Seed investors are buying the retirement of risk. Each question in a meeting probes one of five risks, and the useful habit is to name the risk to yourself before you answer.

| Risk | Typical question | The artifact that answers it |
|---|---|---|
| **Market** | How big can this get? Who pays, and how much? | Bottom-up market, ACV in the model |
| **Product or technical** | Does it work on real benches? What is hard to copy? | Demo, design-partner results, architecture in the data room |
| **Team** | Why you? Are you all full-time? What if you disagree? | Team slide, founders' agreement, vesting, references |
| **Go-to-market** | How do you find buyers, and how long does it take? | GTM slide, pipeline, sales-cycle assumption in the model |
| **Financing** | What does this round buy, and will the next one be easy? | Round thesis, milestone, cap table after the A |

### The hidden question: can this return my fund?

Venture fund returns follow a power law. A handful of investments produce most of the returns, so a seed partner must believe each investment could, if it works, repay the entire fund on its own.`,
        },
        { kind: "equation", formula: "fc11-fund-returner" },
        {
          kind: "md",
          md: md`This is why "the market is EUR 120 m a year" can be a weak answer even when it is true: if the investor needs a EUR 700 m exit, a EUR 120 m serviceable market leaves no room. The answer is not a bigger top-down number; it is the **expansion path**, with the first segment as the beachhead.

### A structure for hard answers

**Answer** the question directly in the first sentence. **Evidence**: one specific, checkable fact. **Implication**: what it means for the investment, bridging back to the thesis. Then stop. If they want more, they will ask.

When you do not know: "I don't know yet. Here is how we will find out, and by when." That answer scores higher than a confident guess, because diligence will find the guess. Never argue with the investor's premise before you have answered; never disparage a competitor; never claim "no competition".`,
        },
        {
          kind: "matrix",
          title: "How to answer, by risk severity and the evidence you have",
          xAxis: ["Little evidence yet", "Strong evidence"],
          yAxis: ["Minor risk", "Fatal risk if true"],
          cells: [
            { label: "Concede and convert", detail: "Say it is open, show how this round retires it: it becomes the milestone" },
            { label: "Lead with the proof", detail: "Your strongest answer; give the evidence first and offer the document" },
            { label: "Short, honest, move on", detail: "One sentence on what you know and what you will learn" },
            { label: "One line", detail: "Do not over-answer a question that is not a deal breaker" },
          ],
          caption: "Top row: questions that decide the deal. Spend your preparation time there.",
        },
        { kind: "sources", refs: ["fc11-r3", "fc11-r4"] },
      ],
    },
    {
      layer: "applied",
      title: "Worked answers and the fund-returner test",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Coldline (fictional): the market question, really a fund-returner question",
          given: md`**Fictional.** A seed fund of EUR 80 m buys 20 % of Coldline. It expects about 25 % dilution at the Series A and 20 % at the Series B, without following on. Coldline's SAM is EUR 120 m/yr (lesson 2). Assume software companies of this kind sell at about 6x ARR (illustrative; multiples move with the market).`,
          steps: [
            { md: md`Ownership at exit: $s_{\text{exit}} = 0.20 \times 0.75 \times 0.80 = 0.12$.` },
            { md: md`Exit needed to return the fund: $V_{\text{exit}} = 80 / 0.12 = 667$ m EUR.` },
            { md: md`ARR needed at 6x: $667 / 6 \approx 111$ m EUR, which is about 93 % of the EUR 120 m SAM. No company takes 93 % of its serviceable market.` },
            { md: md`**The answer:** "Cold storage is the beachhead: EUR 120 m a year in the EU. The same compressor models apply in food processing and pharmaceutical cold chains, which roughly triple the account base, and we can see the path because two current customers run processing plants. The A-round milestone includes the first processing site." Answer, evidence, implication.` },
          ],
          result: md`The partner's real question was "can this return my fund?". A founder who answers with the beachhead and a credible, evidenced expansion path passes; one who repeats the EUR 120 m number has just shown the deal cannot work.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Afterwave (illustrative): what exit does a seed lead need?",
          given: md`**Illustrative only.** A EUR 150 m seed fund buys 15 % of Afterwave and expects dilution of 20 % at the A and 15 % at the B without following on.`,
          steps: [
            {
              md: md`$s_{\text{exit}} = 0.15 \times 0.80 \times 0.85 = 0.102$.`,
              hidden: true,
              check: { prompt: "Ownership at exit", answer: 10.2, unit: "%", tolerance: { abs: 0.05 } },
            },
            {
              md: md`$V_{\text{exit}} = 150 / 0.102 \approx 1{,}471$ m EUR.`,
              hidden: true,
              check: { prompt: "Exit value needed to return the fund", answer: 1471, unit: "EUR m", tolerance: { rel: 0.01 } },
            },
            { md: md`That is a EUR 1.5 bn outcome, a company of the scale that recent adjacent rounds in hardware test data suggest investors believe possible (Nominal was valued at USD 1 bn in March 2026). The market answer must therefore start from hardware test teams in physical AI and show the path to "the test and validation layer for physical AI", including Afterwave's own instrumented test platforms later.` },
          ],
          result: md`Knowing the number before the meeting changes how you answer "how big can this get?": you answer the fund-returner question the partner is actually asking.`,
        },
      ],
    },
    {
      layer: "field",
      title: "The defence in practice",
      blocks: [
        {
          kind: "md",
          md: md`### How Q&A really works

- **First meeting:** the partner spends 10 minutes on the deck and 20 on questions. They are testing how you think under pressure, whether you know your numbers cold, and whether you are honest about what you do not know.
- **Partner meeting:** other partners ask the questions your champion could not answer. Your champion will often tell you beforehand which ones; ask.
- **After each meeting:** write the questions down within the hour, add them to a running **Q&A document** (data room folder 0), and send any promised follow-up within 24 hours. A question that comes up three times is a gap in the deck.
- **Reference checks:** investors will call people you did not list. Assume they will speak to former colleagues and customers.

Work through the three scenarios below. Each is a decision tree scored on the quality of your choices.`,
        },
        { kind: "scenario", scenario: "fc11-s1" },
        { kind: "scenario", scenario: "fc11-s2" },
        { kind: "scenario", scenario: "fc11-s3" },
        {
          kind: "callout",
          tone: "unverified",
          title: "The why-now facts, with their status",
          md: md`The EU Machinery Regulation (EU) 2023/1230 applies generally from **20 January 2027** (Official Journal). The research notes record, from secondary sources, that the 2026 Digital Omnibus on AI moves AI Act high-risk requirements for machinery into future delegated acts under the Machinery Regulation (timing tied to 2 August 2028), that industry asked to postpone the cybersecurity provisions, and that no harmonised standard yet covers AI or self-evolving safety functions. Check each against EUR-Lex before you say it to an investor, and say "my understanding as of" with the date.`,
        },
        { kind: "sources", refs: ["fc11-r7", "fc11-r8"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How founders lose the room in Q&A",
          md: md`**Over-answering**: a 4-minute answer to a 1-line question signals you cannot prioritise. **Bluffing**: a confident wrong number is found in diligence and taints everything else. **Disparaging competitors**: the partner may know them, and it signals you do not understand why customers buy them. **Arguing the premise first**: answer, then correct the premise if you must. **"We have no competition"**: means either no market or no homework.`,
        },
        {
          kind: "feynman",
          prompt:
            "Pitch check: pitch your chosen venture in 90 seconds to a seed partner who has never heard of it. Cover the problem, why now, what you have built, the evidence so far (only what is true), why this team, and the round thesis. Then say the one risk you would worry about if you were the investor and how this round retires it.",
          keyPoints: [
            "Opens with a one-line description a partner could repeat: what, for whom.",
            "States a specific, costly problem for a named buyer.",
            "Gives a dated why-now, not a generic trend.",
            "States evidence precisely and labels pilots, LOIs and conversations for what they are.",
            "Explains why this team has an unfair insight or access.",
            "Ends with the round thesis: amount, milestone, months, instrument.",
            "Names the biggest risk honestly and connects it to the milestone.",
          ],
        },
        {
          kind: "checklist",
          title: "Defence preparation",
          items: [
            "I have written the 15 questions I least want to be asked, mapped each to a risk, and drafted an answer, evidence and implication for each.",
            "I can say the six summary numbers of my model without looking.",
            "I know the exit value my target lead needs to return its fund, and my market answer addresses it.",
            "My competition answer names real alternatives, including in-house tools and doing nothing.",
            "My commitment answer is a decision already taken and written down, not a promise made in the room.",
            "My why-now has more than one driver, with dates and sources.",
            "I have a running Q&A document and a 24-hour follow-up rule.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc11-l03-p1",
            type: "short",
            prompt: md`**Final integrative exercise: the package on one page.** For your chosen venture, write the one-page summary a partner would want before an investment committee: (1) round thesis; (2) the six-number model summary; (3) the cap table after the round and after an illustrative Series A; (4) the exit needed to return your target lead's fund and your expansion path; (5) the five hardest questions you expect, each with answer, evidence and implication, including competition, commitment across ventures and why now; (6) the data room gaps you have closed and the ones still open, with dates. Every number must reconcile with your earlier artifacts.`,
            rubric: [
              "Round thesis, model summary and cap table are mutually consistent (same raise, milestone, burn, pool and dilution).",
              "Fund-returner arithmetic is correct and the market answer addresses it with a credible expansion path.",
              "Five hard questions are answered in answer-evidence-implication form; competition names real alternatives and the winning axis; why-now is dated and has more than one driver.",
              "Commitment across ventures is answered with a concrete, documented allocation of time, roles, governance and IP, without naming or describing any undisclosed cofounder.",
              "Data room gaps listed honestly with owners and dates; no invented traction, customers, revenue or partners; illustrative numbers labelled.",
              "Fits on one page: dense, structured, no filler.",
            ],
            modelAnswer: md`**Afterwave, illustrative.**
(1) **Thesis:** EUR 3.0 m priced seed buys the conversion of paid pilots into annual contracts and a Series A reference base in 20 months.
(2) **Model:** raise EUR 3.0 m; runway 26 months at EUR 120k average burn; milestone month 20; ARR about EUR 0.7 m from 6 annual contracts (illustrative drivers); burn multiple not meaningful at month 0, target below 3 by months 15 to 20; CAC estimate EUR 60k, payback about 9 months on illustrative ACV, sample size zero.
(3) **Cap table:** founders about 67 % after the seed (YC SAFEs converted if applicable, 8 % pool in the pre-money), new money 20 %; after an illustrative 20 % Series A with 5 % pool, founders about 50 %.
(4) **Fund-returner:** a EUR 150 m lead at 15 %, diluted to about 10 %, needs about a EUR 1.5 bn exit. Path: hardware test teams in robotics and humanoids, then drives, batteries and powertrains, then Afterwave's own instrumented test platforms; bench memory compounds across all of them.
(5) **Hard questions.** Competition: "Nominal, Sift and Foxglove store and visualise test data; NI and Vector run tests; none advertises change impact for physical benches as of our November 2026 research. Ripple decides what to rerun; it can sit on top of their data. If a platform adds it, our edge is bench memory inside Enclave and on-prem deployment." Commitment (the structure must be decided for real before outreach; this is an illustration of its form): "From close, I am full-time CEO of Afterwave. Mizan's day-to-day lead and my board-level role there are set in a written role split with my cofounder Omar Abu Harb; Suhail runs on volunteer leads with a fixed, limited time box for me; the arrangement, a conflicts rule and IP separation are in the founders' agreement and disclosed to you." Why now: "The Machinery Regulation applies from 20 January 2027 and ML-based safety functions need notified-body assessment; independently, AI models and firmware in physical systems now change weekly, so rerun-everything no longer scales." Team: "Ismail Elmasry and Yusuf Keklik validated Tesla drive units and inverters; the date each goes full-time is in writing" (only say this once it is agreed; until then, give the honest status and the date it will be settled). Next round: "The milestone is what A-round funds in this category ask for; we will test that with two A-funds before we close the seed."
(6) **Data room:** closed: model, cap table, regulation brief, competitor table (dated). Open: founders' agreement with vesting and IP assignments (owner: CEO, before outreach); security pack (owner: CTO, 3 weeks); two references (CEO, 4 weeks).`,
            explanation: md`The capstone's real test is consistency under pressure: the same numbers, the same thesis and the same honest gaps, whichever question the investor starts from.`,
            concepts: ["fc11.answer-structure", "fc11.fund-returner", "fc11.competition-answer", "fc11.founder-commitment", "fc11.why-now", "fc11.package-bar"],
            difficulty: 3,
          },
        },
      ],
    },
  ],
  scenarios: [
    {
      id: "fc11-s1",
      title: "The investor asks about competition",
      dayInLife: true,
      context: md`First meeting with a seed partner about Afterwave. The demo went well. The partner leans back: "Nominal raised at a USD 1 bn valuation in March and already has an edge app at the bench. Why won't they just build Ripple?"`,
      start: "a",
      concepts: ["fc11.competition-answer", "fc11.answer-structure"],
      nodes: {
        a: {
          md: md`You have about 60 seconds. What is your answer?`,
          choices: [
            {
              text: "Acknowledge Nominal directly, separate the jobs (they store and serve test data; Ripple decides which tests to rerun after a change and why), state that none of the test-data platforms advertises change impact for physical benches as of your dated research, and explain that Ripple can run on top of their data while bench memory inside Enclave compounds per customer",
              next: "b",
              score: 10,
              feedback: "Answer, evidence, implication. You respected the competitor, defined the axis you win on and turned a threat into a possible integration.",
            },
            {
              text: "Say Nominal is a defence company and will never come into robotics",
              next: "b",
              score: 2,
              feedback: "Your own research says Nominal is pushing into automotive and robotics. A partner who knows that now doubts your other claims.",
            },
            {
              text: "Say you have no real competitors because nobody does change impact for benches",
              next: "b",
              score: 3,
              feedback: "The narrow claim may be true, but 'no competitors' sounds like no homework. Alternatives include in-house scripts, NI and Vector tools, and rerunning everything.",
            },
            {
              text: "Spend three minutes on Ripple's dependency graph and algorithms",
              next: "b",
              score: 4,
              feedback: "Technical depth without the commercial point. The partner asked about defensibility, not architecture.",
            },
          ],
        },
        b: {
          md: md`The partner follows up: "Fine. But your customers have test-tools teams. Why won't a big robotics company just build this in-house?"`,
          choices: [
            {
              text: "Agree that the largest OEMs may build in-house, explain that today test selection on hardware benches is mostly manual and judgement-based (published industrial research), that maintaining the dependency model across firmware, models and rigs is a product not a script, and that your first segment is teams without a platform organisation; offer the design-partner conversation as evidence",
              next: "c",
              score: 10,
              feedback: "Conceding the top of the market and defining the segment where you win is more credible than claiming everyone.",
            },
            {
              text: "Say in-house tools are always worse than a product",
              next: "c",
              score: 3,
              feedback: "A generalisation investors have heard often. Give the mechanism: maintenance cost, breadth across rigs, and what the customer gives up by building.",
            },
            {
              text: "Say you will sell to the big OEMs first to prevent them building it",
              next: "c",
              score: 5,
              feedback: "Possibly true but it lengthens the sales cycle and contradicts a seed milestone built on faster mid-size teams. Make sure the GTM slide agrees with what you say here.",
            },
          ],
        },
        c: {
          md: md`Last question on this topic: "What would make you wrong?"`,
          choices: [
            {
              text: "Name the falsifiable risk: if a test-data platform ships credible change impact within 12 months and customers prefer one vendor, Afterwave's wedge narrows; say how you will know (design-partner choices, win/loss notes) and what you would do (integrate and compete on bench memory and on-prem Enclave)",
              score: 10,
              feedback: "Investors trust founders who know what would falsify their thesis and how they would respond.",
            },
            {
              text: "Say nothing could make you wrong because the team is exceptional",
              score: 1,
              feedback: "Confidence without self-awareness. This is the answer that gets a polite pass.",
            },
            {
              text: "Say you would pivot to test-as-a-service",
              score: 5,
              feedback: "Showing an option is fine, but the question asked for the risk and the signal, not a new company.",
            },
          ],
        },
      },
    },
    {
      id: "fc11-s2",
      title: "The investor asks about commitment across ventures",
      dayInLife: true,
      context: md`Partner meeting for Afterwave. A partner who has read your profile: "You are also running Mizan in Kuwait and Suhail. How much of your time does Afterwave actually get?"`,
      start: "a",
      concepts: ["fc11.founder-commitment", "fc11.answer-structure"],
      nodes: {
        a: {
          md: md`How do you answer?`,
          choices: [
            {
              text: "Answer directly with a decision already taken: from close you are full-time CEO of Afterwave; state who leads Mizan day to day and under what written role split, that Suhail runs on volunteer leads with a fixed time box for you, and that the arrangement, conflicts rule and IP separation are in the founders' agreement and will be disclosed in the documents",
              next: "b",
              score: 10,
              feedback: "A decided, documented structure answers the question and removes it as a risk. The investor can write it into the term sheet if they want.",
            },
            {
              text: "Say you give 100 % to each venture",
              next: "b",
              score: 1,
              feedback: "Arithmetically impossible and the partner knows it. It signals you have not thought about the risk they are worried about.",
            },
            {
              text: "Explain the synergies between the three ventures at length",
              next: "b",
              score: 3,
              feedback: "Synergy may exist, but it is not an answer to 'how much time'. Answer first; mention synergy only if asked.",
            },
            {
              text: "Offer to step back from the other ventures if the investor insists",
              next: "b",
              score: 5,
              feedback: "Better than evasion, but it shows the decision was not made before the meeting. Make it before you raise.",
            },
          ],
        },
        b: {
          md: md`Follow-up: "And your two cofounders: one is still employed at Signify. Are they full-time when we close?"`,
          choices: [
            {
              text: "State the agreed fact and its documentation: the date each cofounder goes full-time (a condition of closing if that is the agreement), their vesting, and their IP assignment; if it is not yet agreed, say so and say when it will be",
              next: "c",
              score: 10,
              feedback: "Investors fund full-time teams. A precise, documented answer, or an honest 'not yet, by this date', both keep trust.",
            },
            {
              text: "Say they will join once the round closes, without a date or agreement",
              next: "c",
              score: 4,
              feedback: "A common answer and a common reason for a pass: the investor hears 'they are waiting to see if we raise'.",
            },
            {
              text: "Say their current jobs are an advantage because they stay close to customers",
              next: "c",
              score: 2,
              feedback: "It may be true for discovery, but it dodges the commitment question and raises IP and conflict questions with the employer.",
            },
          ],
        },
        c: {
          md: md`Final probe: "What happens if Mizan wins a big tender next year and needs you in Kuwait?"`,
          choices: [
            {
              text: "Point to the pre-agreed rule: Mizan's commercial lead handles delivery, your role there is board-level with a fixed time cap, and any change to your Afterwave commitment requires board consent under the founders' agreement",
              score: 10,
              feedback: "A rule decided in advance turns a hypothetical conflict into governance. That is what the investor is buying.",
            },
            {
              text: "Say you would decide at the time based on what is best",
              score: 3,
              feedback: "Honest but exactly the uncertainty the investor fears. Decide the rule before the meeting.",
            },
            {
              text: "Promise Mizan will never win a tender that needs you",
              score: 1,
              feedback: "You cannot promise that, and it suggests you would sabotage one company for another.",
            },
          ],
        },
      },
    },
    {
      id: "fc11-s3",
      title: "The investor asks why now",
      context: md`First meeting for Afterwave. The partner: "Your why-now is the EU Machinery Regulation. Regulations slip. If it is delayed or watered down, does your business still exist? And why couldn't this company have been built five years ago?"`,
      start: "a",
      concepts: ["fc11.why-now", "fc11.answer-structure"],
      nodes: {
        a: {
          md: md`Answer the first part: does the business survive if the regulation slips?`,
          choices: [
            {
              text: "Yes: state that the regulation is an accelerant and an entry point, not the foundation; the underlying driver is that AI models and firmware in physical systems now change frequently, so rerunning every test after every change does not scale; then give the regulatory facts precisely, with dates and what is still uncertain",
              next: "b",
              score: 10,
              feedback: "A why-now with more than one driver survives a slip. Precision about what is law and what is still moving earns trust.",
            },
            {
              text: "Say the regulation will definitely not be delayed",
              next: "b",
              score: 2,
              feedback: "An overclaim: industry has lobbied for postponements and parts of the AI obligations move to later delegated acts. The partner may know this.",
            },
            {
              text: "Concede that without the regulation demand is uncertain",
              next: "b",
              score: 4,
              feedback: "Honest, but it makes the whole company a bet on one law. If you believe there is underlying demand, say why.",
            },
          ],
        },
        b: {
          md: md`"And why not five years ago?"`,
          choices: [
            {
              text: "Name what changed recently and specifically: physical AI systems leaving labs for factory deployments, model and firmware update cadence moving from yearly to weekly, regulation bringing ML in safety functions into conformity assessment, and investor-funded test data platforms proving the budget exists; each with a date or source",
              score: 10,
              feedback: "Specific, dated changes that compound. That is a why-now.",
            },
            {
              text: "Say AI is a huge trend and everyone is investing in it",
              score: 2,
              feedback: "Generic. A why-now must explain why this company in particular is possible or necessary now.",
            },
            {
              text: "Say the team only now has the right experience",
              score: 4,
              feedback: "That is a why-us, not a why-now. Both matter; answer the question asked.",
            },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "fc11-l03-q1",
      type: "numeric",
      prompt: md`A EUR 100 m fund buys 20 % at seed. Later rounds dilute it by 20 % and then 25 % without follow-on. What exit value, in EUR m, returns the whole fund from this investment?`,
      answer: 833.3,
      unit: "EUR m",
      tolerance: { rel: 0.01 },
      explanation: md`$s_{\text{exit}} = 0.20 \times 0.80 \times 0.75 = 0.12$; $V_{\text{exit}} = 100 / 0.12 = 833$ m EUR.`,
      concepts: ["fc11.fund-returner"],
      difficulty: 2,
    },
    {
      id: "fc11-l03-q2",
      type: "mcq",
      prompt: md`"Are your cofounders full-time?" probes which risk?`,
      options: ["Market risk", "Team risk", "Go-to-market risk", "Financing risk"],
      answer: 1,
      explanation: md`It is a team-risk question, answered by the founders' agreement, vesting and dated commitments, not by the deck.`,
      concepts: ["fc11.investor-risk-lens"],
      difficulty: 1,
    },
    {
      id: "fc11-l03-q3",
      type: "order",
      prompt: md`Put the parts of a strong answer to a hard question in order.`,
      items: ["Answer the question directly", "Give one specific piece of evidence", "State what it means for the investment", "Stop and let them ask more"],
      explanation: md`Answer first so the investor hears that you understood the question; evidence makes it checkable; implication connects it to the thesis; stopping avoids over-answering.`,
      concepts: ["fc11.answer-structure"],
      difficulty: 1,
    },
    {
      id: "fc11-l03-q4",
      type: "decision",
      prompt: md`An investor asks for your gross margin on on-prem deployments. You have not measured it yet. What do you say?`,
      options: [
        { text: "Quote 80 %, the usual software benchmark", score: 0, feedback: "A guess presented as a fact. Diligence will find it, and every other number becomes suspect." },
        { text: "Say you have not measured it yet, give your estimate with its basis (support hours per deployment, infrastructure cost), and say when you will have measured data", score: 1, feedback: "Honest, specific, and it shows you know the mechanism." },
        { text: "Change the subject to ARR growth", score: 0.1, feedback: "Investors notice evasion more than gaps." },
        { text: "Say margin does not matter at seed", score: 0.2, feedback: "It matters a great deal for on-prem infrastructure, where support costs can sink margins." },
      ],
      explanation: md`"I don't know yet; here is how we will find out and by when" is a strong answer. Bluffing is the weak one.`,
      concepts: ["fc11.answer-structure"],
      difficulty: 1,
    },
    {
      id: "fc11-l03-q5",
      type: "multi",
      prompt: md`Which belong in a strong competition answer? Select all that apply.`,
      options: [
        "Named alternatives, including in-house tools and doing nothing",
        "The axis on which you win and why that edge compounds",
        "What would prove you wrong and how you would know",
        "A claim that there is no competition",
        "Criticism of the competitor's team",
      ],
      answer: [0, 1, 2],
      explanation: md`Respectful, specific and falsifiable. "No competition" signals no homework; disparaging competitors signals you do not understand why customers buy them.`,
      concepts: ["fc11.competition-answer"],
      difficulty: 1,
    },
    {
      id: "fc11-l03-q6",
      type: "mcq",
      prompt: md`Which why-now is strongest?`,
      options: [
        "AI is the biggest technology shift of our lifetime.",
        "A regulation applies from a fixed date, and independently the update cadence of models and firmware in the target systems has moved from yearly to weekly, so the old testing practice no longer scales.",
        "Our team has just finished building the product.",
        "Investors are excited about physical AI.",
      ],
      answer: 1,
      explanation: md`Two dated, specific, independent drivers: the thesis survives if one slips. The others are generic trends, a why-us, or investor sentiment.`,
      concepts: ["fc11.why-now"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc11-l03-f1", front: "The five risks behind investor questions", back: "Market, product or technical, team, go-to-market, financing.", concepts: ["fc11.investor-risk-lens"] },
    { id: "fc11-l03-f2", front: "Fund-returner formula", back: md`$V_{\text{exit}} = F / s_{\text{exit}}$, with $s_{\text{exit}}$ the seed stake after later dilution.`, concepts: ["fc11.fund-returner"] },
    { id: "fc11-l03-f3", front: "Answer structure", back: "Answer, evidence, implication, stop. If you don't know: say so, how you will find out, by when.", concepts: ["fc11.answer-structure"] },
    { id: "fc11-l03-f4", front: "Strong competition answer", back: "Real alternatives (including in-house and doing nothing), winning axis, why it compounds, what would prove you wrong.", concepts: ["fc11.competition-answer"] },
    { id: "fc11-l03-f5", front: "Commitment across ventures: the bar", back: "A decision already taken and documented: full-time CEO of the funded company, who leads the others, time caps, conflicts rule, IP separation, disclosure.", concepts: ["fc11.founder-commitment"] },
    { id: "fc11-l03-f6", front: "Why-now test", back: "Specific, dated change(s) that make the company possible or necessary now; at least two independent drivers so it survives a slip.", concepts: ["fc11.why-now"] },
  ],
};

export default lesson;
