import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc04-l02",
  title: "Discovery calls: finding and quantifying the pain",
  summary:
    "Discovery is where deals are won. Use SPIN questioning to move from the buyer's situation to the consequences of their problem, quantify pain in their own numbers, find the dated reason to act now, and leave every call with written notes the buyer has confirmed.",
  minutes: 75,
  objectives: [
    "You can explain the four SPIN question types and why implication and need-payoff questions matter most in large sales.",
    "You can run a 30 to 45 minute discovery call with a hardware validation lead from a written script.",
    "You can convert answers into an annual cost of the problem with the buyer's own inputs.",
    "You can separate pain, impact and urgency, and recognise a deal with no compelling event.",
  ],
  concepts: [
    { id: "fc04.spin", name: "SPIN questioning", description: "Situation, Problem, Implication and Need-payoff questions (Rackham): from facts, to difficulties, to their consequences, to the value of solving them, so the buyer states the value in their own words.", competency: "fc-sales", related: ["fc04.pain-impact-urgency"] },
    { id: "fc04.pain-impact-urgency", name: "Pain, impact, urgency", description: "Pain is what is broken; impact is its quantified cost and who carries it; urgency is the dated reason it must be fixed now (a compelling event). All three are needed for a deal to move.", competency: "fc-sales", related: ["fc04.spin", "fc04.quantified-pain"] },
    { id: "fc04.quantified-pain", name: "Quantified pain", description: "The annual cost of the problem computed from the buyer's own figures (volumes, hours, rates, incident costs); the basis of the business case and of value-based price.", competency: "fc-sales", related: ["fc04.pain-impact-urgency"] },
    { id: "fc04.discovery-structure", name: "Discovery call structure", description: "Agenda and permission, context, problems, implications, process and people, next step; the buyer talks most of the time and confirms a written summary afterwards.", competency: "fc-sales", related: ["fc04.spin", "fc04.sales-stages"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "SPIN, and the difference between pain and urgency",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Afterwave's buyers are engineers. They will not respond to adjectives, and they will happily spend an hour talking about their rigs without ever telling you what it costs them. If you leave discovery without a number and a date, you will demo into a vacuum, price by guessing, and forecast hope. Discovery done well gives you the business case, the price anchor and the decision path in one conversation.`,
        },
        {
          kind: "md",
          md: md`### SPIN: four question types

Neil Rackham's research for Huthwaite (published as *SPIN Selling*, 1988) analysed thousands of sales calls and found that in **large, complex sales** the questions that correlate with success are not the ones inexperienced sellers ask most. The four types:

| Type | Purpose | Hardware test example | Overuse risk |
|---|---|---|---|
| **Situation** | Establish facts | "How many rigs run regression, and how often does firmware change?" | Boring for the buyer; do your homework first and ask few |
| **Problem** | Surface difficulties | "What happens when a firmware change lands on Friday?" | Fine, but problems alone do not create urgency |
| **Implication** | Expand the consequences | "When a full rerun takes five days, what does that do to the release date? Who notices?" | The most powerful and the hardest; prepare them in advance |
| **Need-payoff** | Let the buyer state the value | "If you knew which 15 % of tests a change could affect, what would that be worth to the team?" | Ask only after implications are clear |

The mechanism: a buyer acts when the **perceived cost of the problem exceeds the perceived cost and risk of change**. Situation and problem questions establish that a problem exists. Implication questions make its cost large and concrete. Need-payoff questions get the buyer to say the value aloud, which is far more persuasive to them (and to their boss) than you saying it.

### Pain, impact, urgency

Many deals die with real pain because one of three things is missing:

1. **Pain:** what is broken, in the buyer's words. "We rerun everything after every change because we cannot tell what is affected."
2. **Impact:** the quantified cost and who carries it. Hours, escaped defects, delays, headcount, audit findings.
3. **Urgency (compelling event):** a dated reason why this must be solved now rather than next year. A start-of-production date, a customer audit, a new regulation (for machinery sold in the EU, Regulation (EU) 2023/1230 applies from 20 January 2027), a reorganisation, a budget cycle.

Pain without urgency produces "let's talk next quarter". Urgency without quantified impact produces a small, rushed deal at a low price. The impact number is built from the buyer's own inputs:`,
        },
        { kind: "equation", formula: "fc04-cost-of-pain" },
        {
          kind: "matrix",
          title: "Where does this account sit?",
          xAxis: ["Low urgency", "High urgency"],
          yAxis: ["Low quantified pain", "High quantified pain"],
          cells: [
            { label: "Nurture to an event", detail: "Real cost, no deadline. Stay close; find or wait for a compelling event (SOP date, audit, regulation)." },
            { label: "Work it now", detail: "Pain quantified and a dated reason to act. Prioritise founder time here." },
            { label: "Disqualify politely", detail: "Neither cost nor deadline. Keep in a newsletter list, not the pipeline." },
            { label: "Small, fast deal", detail: "A deadline but little cost. Can be a paid pilot; do not over-invest or discount." },
          ],
          caption: "Plot every discovered account. Founder time goes to the top-right; top-left gets periodic, useful contact.",
        },
        {
          kind: "md",
          md: md`### The structure of a good discovery call

1. **Agenda and permission (2 min):** purpose, time, what happens at the end ("if it looks like a fit we agree a next step; if not, I will say so").
2. **Context (5 min):** their team, rigs, change rate. Researched beforehand where possible.
3. **Problems (8 min):** where time is lost, what breaks, what they have tried.
4. **Implications (10 min):** consequences in time, money, risk, people; get numbers.
5. **Process and people (5 min):** who else cares, how tools get bought, timing.
6. **Next step (5 min):** a dated buyer action; summarise and confirm by email the same day.

The buyer should talk most of the time. Your best output from the call is a **written summary the buyer confirms**: their problem, their numbers, their date. That email is the S2 exit criterion from lesson 1.`,
        },
        {
          kind: "flow",
          title: "A 35-minute discovery call",
          steps: [
            { label: "Agenda (2 min)", detail: "Purpose, time, outcome" },
            { label: "Context (5 min)", detail: "Team, rigs, change rate" },
            { label: "Problems (8 min)", detail: "Where it breaks" },
            { label: "Implications (10 min)", detail: "Cost, delay, risk, in numbers" },
            { label: "Process (5 min)", detail: "Who decides, how, when" },
            { label: "Next step (5 min)", detail: "Dated buyer action, summary email" },
          ],
          caption: "Spend the most time on implications; that is where the business case comes from.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Turning a discovery call into a number",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Annual cost of change pain at a drive-unit validation team",
          given: md`Illustrative discovery answers from a prospect (not a customer): 24 firmware or calibration releases a year; each triggers a full regression costing about 160 engineer-hours (setup, monitoring, analysis); the validation lead estimates 60 % of that effort tests things the change could not have affected; loaded engineering cost EUR 90/h. Two escaped defects a year reached customer vehicles, average cost about EUR 150,000 each (field rework, analysis, travel). Rig contention delayed the programme about 3 weeks last year; the programme manager values a week of delay at EUR 40,000.`,
          steps: [
            { md: md`**Wasted regression effort:** $N_r h_r f_u = 24\times160\times0.60 = 2{,}304$ h/yr; at EUR 90/h that is $2{,}304\times90 =$ **EUR 207,360/yr**.` },
            { md: md`**Escaped defects:** $N_e c_e = 2\times150{,}000 =$ **EUR 300,000/yr**. Be careful: only claim the share a better selection or traceability could plausibly have prevented; ask the buyer.` },
            { md: md`**Delay:** $D c_d = 3\times40{,}000 =$ **EUR 120,000/yr**.` },
            { md: md`**Total:** $C_{pain} = 207{,}360 + 300{,}000 + 120{,}000 =$ **EUR 627,360/yr**, about EUR 0.63 m/yr.` },
            { md: md`**Sanity check:** 2,304 h is about 1.4 full-time engineers (at about 1,650 productive hours each). That is a number a VP recognises: "you are paying for one and a half engineers to rerun tests that cannot fail".` },
          ],
          result: md`About EUR 0.63 m/yr of quantified pain, of which the hours term is the most defensible and the defect term the most emotive. Write it back to the buyer as their numbers ("you told me 24 releases, 160 hours, 60 %"), ask them to correct it, and keep the confirmed version. It becomes the business case (lesson 4, Metrics) and the ceiling for value-based price (lesson 7).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a smaller battery test lab",
          given: md`Illustrative: 12 releases a year, 220 engineer-hours per full regression, 50 % judged unnecessary, EUR 85/h loaded. One escaped defect a year at about EUR 200,000. No delay cost claimed.`,
          steps: [
            { md: md`Wasted effort: $12\times220\times0.50\times85$.` },
            { md: md`= **EUR 112,200/yr** (1,320 h).`, hidden: true, check: { prompt: "Wasted regression effort (EUR/yr)", answer: 112200, unit: "EUR/yr", tolerance: { abs: 50 } } },
            { md: md`Add one escaped defect.` },
            { md: md`$C_{pain} = 112{,}200 + 200{,}000 =$ **EUR 312,200/yr**.`, hidden: true, check: { prompt: "Total annual cost of pain (EUR/yr)", answer: 312200, unit: "EUR/yr", tolerance: { abs: 100 } } },
          ],
          result: md`Two thirds of this case rests on one defect a year. If the buyer cannot connect that defect to untested change interactions, the defensible business case is EUR 112k, and your price must fit inside that.`,
        },
      ],
    },
    {
      layer: "field",
      title: "The script, the notes and the follow-up",
      blocks: [
        {
          kind: "md",
          md: md`### A discovery script for a hardware validation lead (Afterwave)

Prepare before the call: their products, recent launches or recalls, job posts for test engineers (a hiring signal), the person's background. Then:

| Block | Question (adapt, do not read) | What you are listening for |
|---|---|---|
| Agenda | "I have 35 minutes in my calendar. I would like to understand how change flows through your test lab; at the end, if it makes sense, we can agree what next. OK?" | Permission, time |
| Situation | "Walk me through what happens from a firmware change to a signed-off release." | Steps, tools, handoffs, rigs, data formats (MDF, TDMS, CSV) |
| Situation | "How many rigs, and how many changes a month hit them?" | $N_r$, scale |
| Problem | "Where does that process lose the most time?" | The pain in their words |
| Problem | "How do you decide which tests to rerun after a change?" | Rerun everything, tribal knowledge, spreadsheets |
| Implication | "When you rerun everything, how long is a release blocked? What does that do to the programme date?" | Delay weeks, $c_d$ |
| Implication | "Tell me about the last issue that got past the lab. What did it cost, and could anyone have known which test would have caught it?" | $N_e$, $c_e$, emotion |
| Implication | "How much engineer time goes into reruns that, in hindsight, could not have failed?" | $h_r$, $f_u$ |
| Need-payoff | "If you could show, for each change, which tests are affected and why, what would change for your team?" | Value in their words |
| Urgency | "Is anything coming up that makes this more pressing: a start of production, an audit, the Machinery Regulation, a new product line?" | Dated compelling event |
| Process | "If you wanted to fix this, who else would be involved? How did your last test tool get bought?" | Economic buyer, procurement, security |
| Next step | "Would it be useful to look at two of your recent changes with your test systems engineer next week? Tuesday or Thursday?" | Dated buyer action |

### A notes template (paste into the CRM after every call)

| Field | Content |
|---|---|
| Account, person, role, date | |
| Their words for the problem | A verbatim quote |
| Numbers | Releases/yr, hours/regression, unnecessary share, hourly rate, escapes/yr, cost/escape, delay |
| Cost of pain (draft) | Computed, marked "to confirm" |
| Compelling event and date | Or "none found" |
| People mentioned | Name, role, attitude (champion, neutral, blocker) |
| Process | Budget owner, procurement route, security review, timing |
| Current alternative | Rerun everything, in-house scripts, a competitor, hire |
| Next step | Owner, date |
| Red flags | Anything that suggests no deal |`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong in discovery",
          md: md`- **Pitching in minute five.** The moment you start presenting, the buyer stops telling you things. Hold the demo for the next meeting.
- **Accepting adjectives.** "Reruns are painful" is not a number. Ask "how many hours last month?"
- **Leading the witness.** "Wouldn't it be great if..." gets polite agreement and no information. Ask open questions and tolerate silence.
- **Your numbers, not theirs.** A cost of pain built from your assumptions will be dismissed by the economic buyer. Every input must have come from someone in the account.
- **No summary email.** Without a confirmed written summary, memory drifts and the champion has nothing to forward.`,
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The same method at Mizan",
          md: md`For a PV plant operator or O&M contractor the inputs change, the method does not: plant size, current cleaning interval and cost per cleaning, measured or estimated soiling loss, energy price or tariff, water constraints, and the dated event (summer dust season, a contract renewal, a performance guarantee test). Ask the plant how they measure soiling today before you assume they do.`,
        },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI after the call",
          md: md`With the buyer's consent to record, a transcript plus your notes template lets an AI assistant draft the summary email, extract the numbers into the cost-of-pain formula and flag missing fields (no economic buyer named, no date). You still check every number against what was said, and you never send a summary containing figures the buyer did not give.`,
        },
        {
          kind: "question",
          question: {
            id: "fc04-l02-p1",
            type: "short",
            prompt: md`Write the discovery call plan for a real target persona at Afterwave (for example a validation manager at a humanoid robotics company) or Mizan (for example the O&M manager of a utility-scale PV plant). Include: (1) a 30 to 45 minute agenda with timings; (2) at least two questions of each SPIN type, written for that persona; (3) the inputs you need for the cost-of-pain formula and which question produces each; (4) the compelling events you will probe for; (5) the summary email you would send after the call, with placeholders for their numbers.`,
            rubric: [
              "Agenda gives the most time to problems and implications and ends with a dated next step.",
              "SPIN questions are of the correct type, open, specific to the persona, and not leading.",
              "Cost-of-pain inputs are complete (volumes, hours or losses, rate, incidents, delay) and each is mapped to a question.",
              "Compelling events are concrete and dated where possible (SOP date, Machinery Regulation 20 January 2027, dust season, contract renewal, audit).",
              "Summary email restates the problem in the buyer's words, the numbers as theirs to confirm, the people and process, and the agreed next step.",
              "No invented customers, data or traction; numbers are placeholders or labelled illustrative.",
            ],
            modelAnswer: md`**Persona:** validation manager, humanoid robotics company (Afterwave).

**Agenda (35 min):** 2 agenda; 5 context; 8 problems; 10 implications; 5 process; 5 next step.

**Situation:** "Walk me through a joint-actuator firmware change from commit to sign-off." "How many rigs and how many changes a month?" **Problem:** "Where does that process lose the most time?" "How do you choose what to rerun?" **Implication:** "When a full rerun blocks the rigs for days, what happens to the integration schedule?" "Tell me about the last issue that reached the integration floor: what did it cost?" **Need-payoff:** "If each change came with a list of affected tests and the reason, what would your team do with the recovered rig time?" "How would that change the conversation with your VP before a release?"

**Inputs:** releases/yr (situation Q2); hours per regression and unnecessary share (implication on reruns); hourly rate (ask, or finance); escapes/yr and cost (implication Q2); delay weeks and value (implication Q1, programme manager).

**Compelling events:** pilot deployment date at a customer site; EU Machinery Regulation applying from 20 January 2027 for machinery placed on the EU market; next funding milestone tied to reliability; annual tool budget cycle.

**Summary email:** "Thanks for the time today. What I heard: (1) every change triggers a full rerun because affected tests cannot be identified; (2) about [N] releases a year, [H] engineer-hours each, of which you estimate [F] % could not have failed; (3) the last escape cost about [C]; (4) [event] on [date] makes this pressing. People: [test systems engineer] for data formats, [VP] owns the budget. Next step: review two recent changes with [engineer] on [date]. Please correct anything I got wrong."`,
            explanation: md`The strongest plans are written for one persona, spend their time on implications, and produce a confirmed number and date.`,
            concepts: ["fc04.spin", "fc04.quantified-pain", "fc04.discovery-structure", "fc04.pain-impact-urgency"],
            difficulty: 2,
          },
        },
        { kind: "sources", refs: ["fc04-r1", "fc04-r3", "fc04-r15"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc04-l02-q1",
      type: "mcq",
      prompt: md`"When a full rerun blocks the rigs for five days, what does that do to the release date, and who notices?" is which SPIN type?`,
      options: ["Situation", "Problem", "Implication", "Need-payoff"],
      answer: 2,
      explanation: md`It expands the consequences of a known problem (delay, who is affected). That is an implication question.`,
      concepts: ["fc04.spin"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc04-l02-q2",
      type: "numeric",
      prompt: md`A team does 18 releases a year, 120 engineer-hours per full regression, of which 50 % is judged unnecessary, at EUR 80/h. What is the annual cost of the unnecessary reruns (EUR)?`,
      answer: 86400,
      tolerance: { abs: 10 },
      unit: "EUR/yr",
      explanation: md`$18\times120\times0.5\times80 = 86{,}400$ EUR/yr (1,080 h).`,
      concepts: ["fc04.quantified-pain"],
      difficulty: 1,
    },
    {
      id: "fc04-l02-q3",
      type: "multi",
      prompt: "Which are compelling events? (Select all that apply.)",
      options: [
        "A start-of-production date in five months that the test lab must support",
        "The buyer says the product looks interesting",
        "A new regulation that applies to products the buyer places on the market from a known date",
        "An internal audit finding that requires a corrective action by year end",
        "The seller's quarter ends next week",
      ],
      answer: [0, 2, 3],
      explanation: md`A compelling event is the buyer's dated reason to act. Interest is not an event, and your quarter end is your problem, not theirs.`,
      concepts: ["fc04.pain-impact-urgency"],
      difficulty: 1,
    },
    {
      id: "fc04-l02-q4",
      type: "decision",
      prompt: md`Ten minutes into discovery, the validation lead asks: "Can you just show me the product?" What do you do?`,
      options: [
        { text: "Share your screen and run the standard demo.", score: 0.2, feedback: "You will demo features against unknown pain and lose the discovery you need for the business case." },
        { text: "Say you will gladly show it, and that to show the relevant part you need ten minutes to understand two of their recent changes; then offer a tailored demo next week with their test systems engineer.", score: 1, feedback: "You respect the request, keep control and earn a second meeting with another stakeholder." },
        { text: "Refuse and continue with your questions.", score: 0.3, feedback: "Rigid. Acknowledge the request and explain why a few more questions make the demo useful to them." },
      ],
      explanation: md`A demo is only as good as the discovery behind it. If time is short, a two-minute outcome glimpse plus a scheduled tailored demo is a good compromise.`,
      concepts: ["fc04.discovery-structure"],
      difficulty: 2,
    },
    {
      id: "fc04-l02-q5",
      type: "order",
      prompt: "Order the blocks of a discovery call.",
      items: ["Agenda and permission", "Context (situation)", "Problems", "Implications", "Process and people", "Dated next step and summary"],
      explanation: md`Facts first (briefly), then problems, then their consequences, then how a decision would be made, then the next step.`,
      concepts: ["fc04.discovery-structure"],
      difficulty: 1,
    },
    {
      id: "fc04-l02-q6",
      type: "mcq",
      prompt: "Why should the cost-of-pain inputs come from the buyer rather than from your own benchmarks?",
      options: [
        "Benchmarks are always wrong",
        "The economic buyer trusts numbers from their own team and will dismiss a vendor's assumptions",
        "It saves you time",
        "It is required by procurement rules",
      ],
      answer: 1,
      explanation: md`Ownership of the numbers is what makes the business case persuasive internally. You can use benchmarks to prompt ("teams we talk to estimate 40 to 60 %, what is it here?"), but the confirmed figure must be theirs.`,
      concepts: ["fc04.quantified-pain"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc04-l02-f1", front: "SPIN", back: "Situation, Problem, Implication, Need-payoff (Rackham). Implication and need-payoff questions matter most in large sales.", concepts: ["fc04.spin"] },
    { id: "fc04-l02-f2", front: "Pain vs impact vs urgency", back: "Pain: what is broken. Impact: what it costs and who carries it. Urgency: the dated reason to fix it now.", concepts: ["fc04.pain-impact-urgency"] },
    { id: "fc04-l02-f3", front: "Cost-of-pain formula (test lab)", back: md`$C_{pain} = N_r h_r f_u w + N_e c_e + D c_d$`, concepts: ["fc04.quantified-pain"] },
    { id: "fc04-l02-f4", front: "Exit evidence for discovery complete", back: "A written summary of problem, numbers, people and date that the buyer has confirmed.", concepts: ["fc04.discovery-structure"] },
    { id: "fc04-l02-f5", front: "High pain, no urgency: what do you do?", back: "Nurture: stay useful and close, and look for or wait for a compelling event. Do not forecast it.", concepts: ["fc04.pain-impact-urgency"] },
    { id: "fc04-l02-f6", front: "2,304 engineer-hours a year is about", back: "1.4 full-time engineers (at about 1,650 productive hours each): say it that way to a VP.", concepts: ["fc04.quantified-pain"] },
  ],
};

export default lesson;
