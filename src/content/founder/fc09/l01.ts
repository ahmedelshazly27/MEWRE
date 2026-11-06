import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc09-l01",
  title: "Hiring and interviewing: scorecards, structured interviews, work samples and the cost of a bad hire",
  summary:
    "Treat a hire as a measurement problem: define outcomes in a scorecard, use the selection methods with the highest predictive validity (structured interviews, work samples), check references properly, and put a number on what a bad hire costs so you know how much process is worth paying for.",
  minutes: 75,
  objectives: [
    "Write a role scorecard with a mission, 3 to 5 measurable outcomes and the competencies that predict them",
    "Rank selection methods by predictive validity and explain why combining a structured interview with a work sample beats a conversational interview",
    "Compute the cost of a bad hire from its components and the expected value of a better hiring process",
    "Design an interview loop, a work sample and a reference-check script for an early hire",
  ],
  concepts: [
    { id: "fc09.scorecard", name: "Role scorecard", description: "A one-page definition of a role as a mission, 3 to 5 measurable outcomes for the first 12 months and the competencies that predict those outcomes; the yardstick every interviewer scores against.", competency: "fc-ops" },
    { id: "fc09.structured-interview", name: "Structured interview", description: "Same questions, in the same order, for every candidate, scored independently against anchored rating scales before interviewers discuss; roughly doubles predictive validity over a free conversation.", competency: "fc-ops", related: ["fc09.scorecard"] },
    { id: "fc09.work-sample", name: "Work sample test", description: "A paid, time-boxed slice of the real job (a pilot plan, a customer email, a data analysis) scored against criteria written in advance.", competency: "fc-ops", related: ["fc09.scorecard"] },
    { id: "fc09.predictive-validity", name: "Predictive validity of selection methods", description: "Correlation between a selection method's score and later job performance; squared, it is the share of performance variance the method explains.", competency: "fc-ops" },
    { id: "fc09.bad-hire-cost", name: "Cost of a bad hire", description: "Loaded pay until exit, settlement, rehiring cost, founder time and the opportunity cost of delayed output; for an early hire usually more than one year of base salary.", competency: "fc-ops", related: ["fc09.scorecard"] },
    { id: "fc09.reference-check", name: "Reference checks and backchannels", description: "Structured calls with former managers and peers, including people the candidate did not name, asking for specific evidence against the scorecard outcomes.", competency: "fc-ops", related: ["fc09.scorecard"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Hiring as a measurement problem",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`In each venture you own everything except the technical build, so the first people you hire will carry pieces of your job: running Afterwave pilots on customer benches, managing Mizan's plant data relationships in Kuwait, running Suhail events with volunteer leads. With a team of three to ten, one wrong hire is 10 to 30% of your capacity pointed the wrong way for months, and it is your time, the scarcest resource across three ventures, that pays to undo it.`,
        },
        {
          kind: "md",
          md: md`### The mechanism: an interview is a noisy instrument

You are trying to predict a future quantity (job performance over the next 12 to 24 months) from a few hours of observation. Every selection method is an instrument with a **validity coefficient** $r$: the correlation between the score it gives and the performance that follows. As an engineer you know what $r$ means: $r^2$ is the share of the variance it explains.

Decades of industrial-organisational psychology have measured these coefficients. The classic meta-analysis (Schmidt and Hunter, 1998) and the 2022 re-analysis by Sackett and colleagues (which corrected an over-correction for range restriction and revised most values down) agree on the ranking that matters for you:

- **Structured interviews** and **work samples** are among the best single predictors.
- **Unstructured, conversational interviews** are much weaker: they measure rapport and confidence, which correlate with how much you enjoyed the hour, not with output.
- **Years of experience** and **education** carry little information once you have seen real work.
- **Reference checks** are modestly predictive, and only when you ask for evidence, not adjectives.

Even the best method leaves most of the variance unexplained ($0.51^2 = 0.26$). Two consequences follow. First, **combine** independent methods: a structured interview plus a work sample plus references measure different things, so their errors partly cancel. Second, **decide outcomes before you meet anyone**, or the instrument has no scale.`,
        },
        { kind: "equation", formula: "fc09-variance-explained" },
        {
          kind: "chart",
          chart: "bar",
          title: "Predictive validity of selection methods (corrected correlation with job performance)",
          xKey: "method",
          xLabel: "Selection method",
          yLabel: "Validity r",
          series: [
            { key: "sh1998", label: "Schmidt and Hunter 1998" },
            { key: "s2022", label: "Sackett et al. 2022" },
          ],
          data: [
            { method: "Structured interview", sh1998: 0.51, s2022: 0.42 },
            { method: "Job knowledge test", sh1998: 0.48, s2022: 0.4 },
            { method: "Work sample", sh1998: 0.54, s2022: 0.33 },
            { method: "General mental ability", sh1998: 0.51, s2022: 0.31 },
            { method: "Integrity test", sh1998: 0.41, s2022: 0.31 },
            { method: "Unstructured interview", sh1998: 0.38, s2022: 0.19 },
          ],
          caption: "The ranking moved between the two analyses (work samples fell, structured interviews now lead), but structured beats unstructured by a wide margin in both. Reference checks (0.26) and years of experience (0.18) in the 1998 analysis are weaker still.",
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Check the exact coefficients before quoting them",
          md: md`The 1998 values are the widely reproduced Schmidt and Hunter figures. The 2022 values are as recalled from Sackett, Zhang, Berry and Lievens (Journal of Applied Psychology, 2022) and should be checked against the paper before you quote them to anyone. The ranking argument in this lesson does not depend on the second decimal.`,
        },
        {
          kind: "md",
          md: md`### The scorecard: define the scale before measuring

A scorecard (the method popularised by Smart and Street in *Who*) has three parts:

| Part | What it contains | Test of a good one |
|---|---|---|
| **Mission** | One or two sentences: why the role exists | A stranger could say what the person is for |
| **Outcomes** | 3 to 5 results for the first 12 months, each with a number and a date | You could score each one yes or no on the anniversary |
| **Competencies** | 4 to 8 behaviours that predict those outcomes (e.g. "writes clearly to customers", "debugs a DAQ setup without supervision") | Each one maps to at least one outcome and one interview question |

Interview questions are then derived from the scorecard, not invented on the day. Each competency gets one or two **past-behaviour questions** ("Tell me about the last time you had to get a test rig working at a customer site with missing documentation. What did you do first?") and an **anchored rating scale**: what a 1, 3 and 5 answer sound like, written before the first interview.

### The cost of a bad hire

The usual internet figure ("a bad hire costs 30% of salary") has no traceable source. Build your own from the mechanism:`,
        },
        { kind: "equation", formula: "fc09-bad-hire-cost" },
        {
          kind: "md",
          md: md`For an early-stage company the last term dominates more often than founders admit: a missed quarter of pilots, a lost champion, a delayed round. And once you have $C_{\text{bad}}$, the value of a better process follows directly:`,
        },
        { kind: "equation", formula: "fc09-hiring-process-value" },
        {
          kind: "flow",
          title: "An early-stage hiring loop (about 3 to 5 weeks)",
          steps: [
            { label: "Scorecard", detail: "Mission, outcomes, competencies; agreed with cofounders before the job post" },
            { label: "Sourcing", detail: "Referrals and direct outreach first; job post written from the scorecard" },
            { label: "Screen (30 min)", detail: "Motivation, compensation range, logistics, two must-have competencies" },
            { label: "Structured interview (60 to 90 min)", detail: "Past-behaviour questions per competency, scored independently on anchored scales" },
            { label: "Paid work sample (2 to 4 h)", detail: "A real slice of the job, scored against criteria written in advance" },
            { label: "References and backchannels", detail: "3 to 5 calls, at least one not supplied by the candidate" },
            { label: "Debrief and decision", detail: "Scores submitted before discussion; decide against the scorecard, not against the other candidates" },
          ],
          caption: "Each stage measures something the previous one did not. Independent scoring before the debrief stops the most senior or most confident voice from setting everyone's rating.",
        },
      ],
    },
    {
      layer: "applied",
      title: "Afterwave's first solutions engineer: the cost of getting it wrong",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What a bad first solutions engineer would cost Afterwave",
          given: md`Illustrative numbers. Afterwave hires a solutions engineer to install Lockstep at customer test benches, run pilots and translate rig problems back to the engineering team. Base salary EUR 80,000; loading factor 1.3 for employer social charges, pension, equipment and travel. If the hire is wrong, you notice at month 5 and the exit takes one more month. Settlement EUR 5,000. Rehiring through a recruiter costs 20% of base. Founder time lost to supervising, managing out and re-interviewing: 60 hours valued at EUR 150/h. One pilot (illustrative value EUR 40,000) is lost because it was badly run.`,
          steps: [
            { md: md`**Loaded monthly cost:** $c_m = 80{,}000 \times 1.3 / 12 = 8{,}667$ EUR/month.` },
            { md: md`**Pay until exit:** $c_m(t_d + t_x) = 8{,}667 \times (5 + 1) = 52{,}000$ EUR.` },
            { md: md`**Settlement and rehire:** $S = 5{,}000$ EUR; $R = 0.20 \times 80{,}000 = 16{,}000$ EUR.` },
            { md: md`**Founder time:** $M = 60 \times 150 = 9{,}000$ EUR. This is a shadow price: the real cost is what those 60 hours would have produced in sales or fundraising.` },
            { md: md`**Opportunity cost:** $O = 40{,}000$ EUR for the lost pilot (and this ignores the reference value of that customer for the next three deals).` },
            { md: md`**Total:** $C_{\text{bad}} = 52{,}000 + 5{,}000 + 16{,}000 + 9{,}000 + 40{,}000 = 122{,}000$ EUR, about **1.5 times base salary**, before any effect on fundraising.` },
          ],
          result: md`A bad first hire costs about EUR 122,000 (illustrative), roughly 1.5 times base salary. Two-thirds of that is pay you could not stop quickly and output you lost, which is why detection time $t_d$ is the lever: a 90-day plan with written outcomes cuts it from 5 months to 3.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Is a structured loop with a paid work sample worth it?",
          given: md`Illustrative. With a conversational process you estimate a 35% chance the hire turns out wrong; with a scorecard, structured interview and paid work sample, 20%. The extra process costs: three finalists paid EUR 500 each for the work sample, plus 20 more founder hours at EUR 150/h. Use $C_{\text{bad}} = 122{,}000$ EUR from above.`,
          steps: [
            { md: md`**Extra process cost:** $\Delta C_{\text{proc}} = 3 \times 500 + 20 \times 150$.` },
            { md: md`$\Delta C_{\text{proc}} = 1{,}500 + 3{,}000 = 4{,}500$ EUR.`, hidden: true, check: { prompt: "Extra process cost (EUR)", answer: 4500, unit: "EUR", tolerance: { abs: 1 } } },
            { md: md`**Expected cost avoided:** $(p_0 - p_1)\,C_{\text{bad}} = (0.35 - 0.20) \times 122{,}000$.` },
            { md: md`$= 18{,}300$ EUR, so the net value is $18{,}300 - 4{,}500 = 13{,}800$ EUR per hire.`, hidden: true, check: { prompt: "Net expected value of the better process (EUR)", answer: 13800, unit: "EUR", tolerance: { abs: 50 } } },
          ],
          result: md`The structured loop is worth about EUR 13,800 per hire in expectation, three times what it costs. The break-even improvement is only $4{,}500/122{,}000 = 3.7$ percentage points of bad-hire probability; you would need to believe the process does almost nothing to skip it.`,
        },
        {
          kind: "question",
          question: {
            id: "fc09-l01-p1",
            type: "numeric",
            prompt: md`Mizan hires a field data analyst in Kuwait at KWD 1,200/month base. Loading factor 1.25. A wrong hire is detected at month 4 and exits after a further 2 months (notice and handover). Settlement KWD 1,000, rehiring cost KWD 2,400, founder time KWD 1,800, and the opportunity cost is a 3-month slip on a pilot report you value at KWD 3,000. What is $C_{\text{bad}}$ in KWD? (Illustrative numbers.)`,
            answer: 17200,
            tolerance: { abs: 20 },
            unit: "KWD",
            explanation: md`$c_m = 1{,}200 \times 1.25 = 1{,}500$ KWD/month; pay until exit $= 1{,}500 \times (4 + 2) = 9{,}000$. Add $S + R + M + O = 1{,}000 + 2{,}400 + 1{,}800 + 3{,}000 = 8{,}200$. Total $= 17{,}200$ KWD, about 14 months of base salary. Long notice periods and slow detection push the first term up; write the 90-day outcomes so $t_d$ is short.`,
            concepts: ["fc09.bad-hire-cost"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the loop in practice",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what in a team of three

You own the process (scorecard, sourcing, closing). Your engineering partners own the technical bar: for an Afterwave solutions engineer, Ismail or Yusuf should design and score the rig-debugging part of the work sample, because they know what good looks like on a drive or inverter test bench. Use a shared sheet or a lightweight applicant tracking system; the tool matters less than independent scores captured before the debrief.

### Work samples that work

- **A slice of the real job**, not a puzzle: "Here is a log from a motor test rig where torque and current drift apart after 40 minutes. Write the email to the customer's test lead explaining what you would check and what you need from them."
- **Time-boxed and paid** (2 to 4 hours). Paying signals respect and removes the bias towards candidates who can afford unpaid work.
- **Criteria written first.** Three to five criteria with what a strong answer contains, scored by two people independently.

### Reference checks that carry information

Ask for evidence against outcomes, on the phone, not by email. The question that does the most work: "On a scale of 1 to 10, how would you rate their performance in that role?", followed by "What would it have taken to make it a 10?" A hesitant 7 with a vague answer is information. Call at least one **backchannel**: someone who worked with the candidate but was not named by them, and tell the candidate in advance that you do this.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How early hiring goes wrong",
          md: md`- **Hiring for the CV, not the outcome.** A big-company title (ex-Tesla, ex-Siemens) tells you about the system they worked inside, not whether they produce without it.
- **Hiring a friend because it is fast.** The cost of a bad hire is the same, and the exit costs more.
- **Debriefing before scoring.** The first strong opinion anchors the room. Collect written scores first.
- **No 90-day plan.** Without written outcomes, you discover a bad hire at month 9 instead of month 3, which multiplies the biggest term in the cost equation.
- **Illegal or loaded questions.** Do not ask about age, marital status, pregnancy, religion or nationality in an interview, in the Netherlands or anywhere else; it is discriminatory and it measures nothing useful.`,
        },
        { kind: "sources", refs: ["fc09-r1", "fc09-r2", "fc09-r3", "fc09-r4"] },
        {
          kind: "checklist",
          title: "Before you open a role",
          items: [
            "Scorecard written: mission, 3 to 5 dated outcomes with numbers, 4 to 8 competencies",
            "Cofounders agree on the scorecard and on who has the final say",
            "Interview questions mapped to competencies, with 1/3/5 anchors written",
            "Work sample designed, time-boxed, paid, with scoring criteria",
            "Compensation range and equity range agreed (Lesson 2) before the first screen",
            "90-day plan drafted so a new hire is measurable from day one",
          ],
        },
        {
          kind: "ask",
          title: "Reference-check questions",
          items: [
            "In what context did you work together, and for how long?",
            "What were their two or three biggest results in that role? How do you know?",
            "Rate their performance from 1 to 10. What would have made it a 10?",
            "How did they handle a customer or colleague who was clearly wrong?",
            "Would you hire them again for a role like this one? Why or why not?",
          ],
        },
        { kind: "scenario", scenario: "fc09-s1" },
        {
          kind: "question",
          question: {
            id: "fc09-l01-p2",
            type: "short",
            prompt: md`Write the hiring package for Afterwave's first **solutions engineer** (installs Lockstep at customer test benches, runs pilots, feeds rig problems back to engineering). Produce: (1) a scorecard with mission, 3 to 5 measurable 12-month outcomes and 4 to 6 competencies; (2) two structured interview questions with what a strong (5) and a weak (1) answer sound like; (3) a paid work sample with its scoring criteria; (4) two reference-check questions you will ask. Use illustrative numbers where needed and label them.`,
            rubric: [
              "Mission is one or two sentences that say why the role exists in Afterwave's business, not a list of tasks",
              "Outcomes are 3 to 5, each with a number and a date, and could be scored yes or no after 12 months",
              "Competencies map to the outcomes and include at least one technical (rig, DAQ, test systems) and one customer-facing behaviour",
              "Interview questions ask about past behaviour, with written 1 and 5 anchors that are specific enough for two interviewers to score alike",
              "Work sample is a realistic slice of the job, time-boxed, paid, with 3 to 5 criteria written in advance",
              "Reference questions ask for evidence and ratings, and the plan includes at least one backchannel",
            ],
            modelAnswer: md`**Mission.** Turn Afterwave pilots into paying deployments by getting Lockstep capturing clean, synchronised rig and screen data at customer benches within days, and by making every customer problem legible to our engineering team.

**12-month outcomes (illustrative targets).**
1. 4 pilot installations completed, each capturing synchronised data within 5 working days of arrival on site, by month 9.
2. 2 of those pilots convert to paid contracts by month 12, with the solutions engineer named as a reason by the customer's test lead.
3. A written installation playbook that lets a second engineer complete an install without help, by month 6.
4. Every customer-reported issue logged with reproduction data within 48 hours, measured monthly.

**Competencies.** Debugs DAQ and rig setups without supervision; writes clear, short customer emails; earns trust with senior test engineers; works through on-prem security constraints patiently; prioritises under ambiguity; reports bad news early.

**Interview question 1.** "Tell me about the last time a test setup you were responsible for gave data you did not trust. What did you do, in what order?" *5:* names the signals, the clock or synchronisation check, the hypothesis order, what they told the customer and when, and what they changed afterwards. *1:* generic ("I investigated and fixed it"), no order, blames others.

**Interview question 2.** "Describe a time a customer's IT or security team blocked your installation. How did it end?" *5:* understood the security requirement, proposed a concrete option (offline install, isolated tenant, documentation), kept the business sponsor informed, closed it. *1:* escalated by complaining, or worked around security.

**Work sample (3 hours, paid EUR 500).** Candidate receives a 40-minute log from a motor test rig where torque and phase current drift apart, plus a short customer email. Deliverables: a one-page diagnosis plan and a reply email to the customer's test lead. Criteria (scored 1 to 5 by Ismail and by the CEO independently): correct first checks (clock alignment, sensor calibration, sampling rates); clear hypothesis order; asks the customer for exactly the information needed; email is short, honest about unknowns and proposes a next step with a date.

**References.** "Rate their performance from 1 to 10; what would have made it a 10?" and "Tell me about a customer installation that went badly and what they did." One backchannel call with a former peer not on their list, announced to the candidate in advance.`,
            explanation: md`A strong package is internally consistent: every competency traces to an outcome, every interview question and work-sample criterion traces to a competency, and the anchors are specific enough that Ismail and you would give the same answer the same score. Outcomes with numbers and dates also become the 90-day and 12-month review, which shortens detection time if the hire is wrong.`,
            concepts: ["fc09.scorecard", "fc09.structured-interview", "fc09.work-sample", "fc09.reference-check"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to your engineering cofounders why a relaxed one-hour chat with a candidate is a poor basis for a hiring decision, and what you want to do instead.",
          keyPoints: [
            "An interview is an instrument with a measurable validity; unstructured conversations have low validity because they measure rapport",
            "Structured interviews and work samples predict performance much better; combining independent methods reduces error",
            "Outcomes and rating anchors must be written before meeting candidates, or there is no scale",
            "Independent scoring before the debrief prevents anchoring on the loudest opinion",
            "The cost of a bad hire is large enough (often more than a year's salary) that a few extra hours of process are cheap",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc09-l01-q1",
      type: "mcq",
      prompt: "Which change to a hiring process most improves its ability to predict job performance?",
      options: [
        "Adding a fourth conversational interview with another cofounder",
        "Replacing free conversation with the same past-behaviour questions for every candidate, scored on anchored scales before the debrief",
        "Requiring a degree from a top university",
        "Asking candidates for their greatest weakness",
      ],
      answer: 1,
      explanation: md`Structure (same questions, anchored scales, independent scoring) is what raises validity. More unstructured interviews add correlated noise; education and stock questions carry little information.`,
      concepts: ["fc09.structured-interview", "fc09.predictive-validity"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc09-l01-q2",
      type: "numeric",
      prompt: md`A selection method has validity $r = 0.42$. What share of the variance in job performance does it explain? (percent, 1 decimal)`,
      answer: 17.6,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$r^2 = 0.42^2 = 0.1764$, so about 17.6%. Even the best single method leaves most variance unexplained, which is why you combine independent methods and keep a probation period with written outcomes.`,
      concepts: ["fc09.predictive-validity"],
      difficulty: 1,
    },
    {
      id: "fc09-l01-q3",
      type: "multi",
      prompt: "Which belong in a role scorecard? (Select all that apply.)",
      options: [
        "A one or two sentence mission for the role",
        "3 to 5 outcomes for the first 12 months, each with a number and a date",
        "Competencies that predict those outcomes",
        "The candidate's years of experience",
        "A list of daily tasks copied from a competitor's job post",
      ],
      answer: [0, 1, 2],
      explanation: md`Mission, outcomes and competencies define what success is. Years of experience is a weak proxy, and task lists describe activity, not results.`,
      concepts: ["fc09.scorecard"],
      difficulty: 1,
    },
    {
      id: "fc09-l01-q4",
      type: "numeric",
      prompt: md`A bad hire costs EUR 100,000. A better process costs EUR 6,000 more per hire. By how many percentage points must it reduce the probability of a bad hire to break even?`,
      answer: 6,
      tolerance: { abs: 0.05 },
      unit: "percentage points",
      explanation: md`Break-even when $(p_0 - p_1) \times 100{,}000 = 6{,}000$, so $p_0 - p_1 = 0.06$, i.e. 6 percentage points.`,
      concepts: ["fc09.bad-hire-cost"],
      difficulty: 2,
    },
    {
      id: "fc09-l01-q5",
      type: "order",
      prompt: "Order the steps of a well-run early-stage hiring loop.",
      items: [
        "Write and agree the scorecard",
        "Source through referrals and outreach",
        "Screen call",
        "Structured interview",
        "Paid work sample",
        "Reference and backchannel calls",
        "Independent scores, then debrief and decide",
      ],
      explanation: md`The scorecard comes first because it defines the scale. References come late because they are most useful to test a specific hypothesis about a finalist. Scores are recorded before the debrief to avoid anchoring.`,
      concepts: ["fc09.scorecard", "fc09.structured-interview", "fc09.reference-check"],
      difficulty: 1,
    },
    {
      id: "fc09-l01-q6",
      type: "decision",
      prompt: md`Your favourite candidate for a Mizan role interviewed brilliantly, but the work sample was weak (2 of 5 from both scorers) and one reference hesitated. Your cofounder says "we need someone now". What do you do?`,
      options: [
        { text: "Hire: the interview was strong and the market is tight.", score: 0, feedback: "You are overriding your two most predictive signals with your least predictive one, under time pressure." },
        { text: "Do not hire on this evidence; ask one follow-up question of the hesitant reference, and if it confirms the weakness, keep searching while covering the gap with a contractor.", score: 1, feedback: "Right: the work sample is closest to the real job. A contractor bridges the gap at a fraction of the cost of a bad hire." },
        { text: "Hire on a 6-month probation and see how it goes.", score: 0.3, feedback: "Probation limits the exit cost but not the months of lost output or the founder time spent managing it." },
      ],
      explanation: md`When methods disagree, weight them by validity. A weak work sample plus a hesitant reference outweighs a charming interview. The cost of waiting (a contractor for a few weeks) is small against $C_{\text{bad}}$.`,
      concepts: ["fc09.work-sample", "fc09.predictive-validity", "fc09.bad-hire-cost"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc09-l01-f1", front: "Three parts of a scorecard", back: "Mission, 3 to 5 measurable 12-month outcomes, competencies that predict them.", concepts: ["fc09.scorecard"] },
    { id: "fc09-l01-f2", front: "Strongest single predictors of job performance", back: "Structured interviews and work samples (and job knowledge tests); unstructured interviews are much weaker.", concepts: ["fc09.predictive-validity"] },
    { id: "fc09-l01-f3", front: "Cost of a bad hire (formula)", back: md`$C_{\text{bad}} = c_m(t_d + t_x) + S + R + M + O$`, concepts: ["fc09.bad-hire-cost"] },
    { id: "fc09-l01-f4", front: "Biggest lever on the cost of a bad hire", back: "Detection time: written 90-day outcomes let you see a wrong hire at month 3, not month 9.", concepts: ["fc09.bad-hire-cost"] },
    { id: "fc09-l01-f5", front: "Best reference-check question", back: "Rate them 1 to 10 in that role; what would have made it a 10?", concepts: ["fc09.reference-check"] },
    { id: "fc09-l01-f6", front: "Why score before the debrief?", back: "The first confident opinion anchors everyone else; independent scores keep the errors independent.", concepts: ["fc09.structured-interview"] },
  ],
  scenarios: [
    {
      id: "fc09-s1",
      title: "The reference who goes quiet",
      context: md`You are closing Afterwave's first solutions engineer. The candidate interviewed well and scored 4 of 5 on the work sample. The first reference, their former manager, was positive. On the second call, a former peer pauses for a long time when you ask for a 1 to 10 rating.`,
      start: "a",
      concepts: ["fc09.reference-check", "fc09.scorecard"],
      nodes: {
        a: {
          md: md`The peer finally says: "Let's say a 6. They're very good technically." What do you do next?`,
          choices: [
            { text: "Thank them and end the call: the manager was positive, and peers can be jealous.", score: 1, feedback: "You just discarded the most informative moment of the whole process.", next: "c" },
            { text: "Ask: \"What would have made it a 10?\" and then wait in silence.", score: 9, feedback: "The follow-up turns a vague number into specific evidence. Silence does the rest.", next: "b" },
            { text: "Ask directly: \"Is there something I should be worried about?\"", score: 5, feedback: "Reasonable, but it invites a polite no. A rating gap question is easier to answer honestly.", next: "b" },
          ],
        },
        b: {
          md: md`The peer says: "They go quiet when things go wrong at a customer. Twice we only found out about a failed install from the customer." This maps directly to your competency "reports bad news early".`,
          choices: [
            { text: "Call a third, backchannel reference and raise the issue with the candidate directly: \"Tell me about a customer install that went wrong and how you communicated it.\"", score: 10, feedback: "Test the hypothesis with an independent source and with the candidate. Decide on evidence against the scorecard." },
            { text: "Reject immediately.", score: 5, feedback: "Possibly right, but one reference is one data point; a quick independent check is cheap compared with losing a strong candidate." },
            { text: "Hire and plan to coach it.", score: 2, feedback: "Hiding problems from customers is costly in enterprise pilots and hard to coach; you would be betting the first pilots on it.", next: "c" },
          ],
        },
        c: {
          md: md`Four months later, a robotics customer's test lead emails you: the pilot data has been unusable for three weeks and nobody told them. The champion is now cautious about renewing.`,
          choices: [
            { text: "Call the customer yourself today, own the failure, agree a recovery plan with dates, and start a structured conversation with the hire against the written outcomes.", score: 6, feedback: "Damage limitation. The reference call had shown you this exact risk." },
          ],
        },
      },
    },
  ],
};

export default lesson;
