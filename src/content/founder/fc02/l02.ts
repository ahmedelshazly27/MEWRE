import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc02-l02",
  title: "Customer interviews with The Mom Test",
  summary:
    "How to run discovery conversations that produce facts instead of compliments: Rob Fitzpatrick's three rules, how to deflect compliments, anchor fluff and dig under feature requests, how to end every conversation with a commitment, and ready scripts for a hardware test lead and a PV plant O&M manager.",
  minutes: 75,
  objectives: [
    "You can rewrite opinion and future-tense questions into questions about specific past behaviour.",
    "You can recognise the three kinds of bad data (compliments, fluff, ideas) and steer each back to facts.",
    "You can end a conversation with a concrete ask for time, reputation or money, and classify the answer as advancement or a zombie lead.",
    "You can run and synthesise a batch of interviews and compute an advancement rate.",
  ],
  concepts: [
    {
      id: "fc02.mom-test",
      name: "The Mom Test",
      description:
        "Rob Fitzpatrick's rules for customer conversations that even your mother cannot lie to you in: talk about their life, not your idea; ask about specifics in the past, not opinions about the future; talk less and listen more.",
      competency: "fc-product",
      related: ["fc02.evidence-levels"],
    },
    {
      id: "fc02.bad-data",
      name: "Bad data: compliments, fluff, ideas",
      description:
        "The three things that feel like learning but are not: compliments (\"great idea\"), fluff (generic claims, hypotheticals, future promises) and ideas (feature requests without the motivation behind them).",
      competency: "fc-product",
      related: ["fc02.mom-test"],
    },
    {
      id: "fc02.commitment-advancement",
      name: "Commitment and advancement",
      description:
        "A meeting succeeds if it ends with the customer giving up something they value (time, reputation, money) that moves them to the next step of a buying process. \"Keep me posted\" is a polite no.",
      competency: "fc-product",
      related: ["fc02.evidence-levels", "fc02.mom-test"],
    },
    {
      id: "fc02.interview-synthesis",
      name: "Interview synthesis",
      description:
        "Turning notes into decisions: log facts, quotes, commitments and the evidence rung per conversation, then look for repeated problems, workarounds and costs across the batch before updating the assumption map.",
      competency: "fc-product",
      related: ["fc02.assumption-mapping"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why customers lie to you, and how to stop it",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Your customers are senior engineers and plant operators: polite, busy, and happy to tell a friendly founder that the idea sounds useful. Those compliments are the most expensive data you will ever collect, because they feel like validation and lead straight to months of building. You are also the person on each team who talks to customers most. If your conversations produce facts and commitments, your technical cofounders build the right thing; if they produce compliments, nothing they build will fix that.`,
        },
        {
          kind: "md",
          md: md`### The three rules

Rob Fitzpatrick's *The Mom Test* (2013) starts from one observation: people will lie to you to be nice, and asking "do you think it's a good idea?" invites the lie. The fix is to ask questions that cannot be answered with a lie, because they are about facts the person knows.

1. **Talk about their life instead of your idea.** Their workflow, their last release, their last cleaning cycle. Your idea comes up last, if at all.
2. **Ask about specifics in the past instead of generics or opinions about the future.** "When did this last happen? Walk me through it." beats "Would you use...?" every time.
3. **Talk less and listen more.** If you are talking more than a third of the time, you are pitching.

### Rewriting bad questions

| Bad question (invites a lie) | Why it fails | Better question (asks for facts) |
|---|---|---|
| Do you think a change-impact tool is a good idea? | Asks for an opinion about your idea | How did you decide which tests to rerun after the last firmware release? |
| Would you pay EUR 40k a year for this? | Hypothetical future money | What did you spend on test tooling last year, and who signed it off? |
| Is soiling a big problem for you? | Leading, generic | When did you last change the cleaning schedule, and what triggered it? |
| How often do you have sync problems between DAQ and screen recordings? | Generic frequency invites guessing | Tell me about the last time you had to line up a DAQ trace with what the operator saw. What did you do? |
| What features would you want? | Asks the customer to design | What have you already tried to fix this? Why did it not stick? |
| Would your team adopt this? | Future promise | Who else was involved last time you brought in a new test tool? What happened? |

### Bad data and what to do with it

| Type | Sounds like | Response |
|---|---|---|
| **Compliment** | "Love it, this is exactly what the industry needs." | Deflect and return to facts: "Thanks. How are you handling this today?" |
| **Fluff: generic** | "We usually...", "We always...", "We never..." | Anchor to an instance: "When was the last time? Walk me through it." |
| **Fluff: hypothetical / future** | "We would definitely...", "We might...", "I could see us..." | Ask what they did last time, or ask for a commitment now |
| **Idea / feature request** | "It should export to MATLAB." | Dig: "Why do you want that? What would it let you do? How are you coping without it?" |
| **Emotion** | "This drives me crazy." | Dig into the cost: "Tell me more. What did it cost last time?" |

### Commitment and advancement

Every conversation should end with a request for a next step that costs the customer something. Fitzpatrick names three currencies:

- **Time**: a follow-up session with their data, a site visit, a trial setup on a bench.
- **Reputation**: an introduction to their boss, their IT security lead, a peer at another lab; agreeing to be a public reference.
- **Money**: a paid pilot, a purchase order, a letter of intent with a budget, a deposit.

A meeting where they give nothing is a **zombie lead**: friendly, open-ended, and going nowhere. "Send me some information", "keep me posted" and "let's talk again next quarter" are polite rejections until proven otherwise. The fix is to ask clearly, at the end, for the specific next step, and to accept that a clear "no" is useful data.`,
        },
        {
          kind: "flow",
          title: "Structure of a 30-minute discovery conversation",
          steps: [
            { label: "Frame (2 min)", detail: "Who you are, that you are learning not selling, how long it will take" },
            { label: "Context (5 min)", detail: "Their role, team, setup: benches, plants, tools, who decides what" },
            { label: "Last time (10 min)", detail: "Walk through the last specific instance of the problem, step by step" },
            { label: "Cost and workaround (6 min)", detail: "What it cost in time, money, risk; what they tried; why it did not stick" },
            { label: "Buying process (4 min)", detail: "Who else is involved, how tools get bought and approved, budget source" },
            { label: "Ask (3 min)", detail: "A concrete next step in time, reputation or money; note the answer verbatim" },
          ],
          caption: "Your idea appears, briefly, only in the ask. If the problem is not real for them, you never need to pitch.",
        },
        { kind: "equation", formula: "fc02-advancement-rate" },
        {
          kind: "md",
          md: md`Track the advancement rate per segment. It is a crude metric but it cannot be fooled by politeness, which is its whole point. Per Fitzpatrick, you should know your **three big questions** before each conversation: the three things you most need to learn from this person, drawn from the top-left of your assumption map.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Two scripts and one batch of interviews",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Script A: validation lead at an actuator or drive test lab (Afterwave)",
          given: md`Target: a validation or test systems lead at a company testing drive units, actuators or humanoid joints, with 5 to 30 benches. Three big questions from the assumption map: (1) how they choose regression tests after a firmware change and what it costs; (2) whether test results, firmware versions and rig configuration are stored in a form that can be joined; (3) how a new tool that touches bench PCs and test data gets approved.`,
          steps: [
            {
              md: md`**Frame.** "I'm trying to understand how hardware test teams handle changes to firmware and rigs. I'm not selling anything today; I'd like 30 minutes on how it works for you. Is that still OK?"`,
            },
            {
              md: md`**Context.** "How many benches do you run, and what is on them? What do you use to log DAQ data and test results? Who owns the test plan?"`,
            },
            {
              md: md`**Last time (big question 1).** "Think about the last firmware release candidate that came to your benches. Walk me through what happened from the moment it arrived. How did you decide what to rerun? How long did that take? What did you skip, and how did you feel about skipping it?"`,
            },
            {
              md: md`**Cost and workaround.** "What did that rerun cost you in bench-days? Did anything escape that a rerun would have caught? What have you tried to make test selection faster: scripts, spreadsheets, a tool? Why did it stick or not?"`,
            },
            {
              md: md`**Data reality (big question 2).** "If I asked you to show me, for the last ten firmware versions, which tests ran on which rig configuration with which result, where would you go? Could you show me now?" (Showing a screen moves evidence to rung 2.)`,
            },
            {
              md: md`**Buying process (big question 3).** "Last time a new tool went onto the bench PCs or touched test data, who had to approve it? How long did IT or security take? Whose budget paid?"`,
            },
            {
              md: md`**Ask.** "It sounds like the release reruns are where the time goes. Would you be willing to export one quarter of test results and firmware versions so we can check whether the links between changes and tests can be recovered? We'd come back in two weeks with what we found." A yes with a date is advancement (time). "Interesting, keep me posted" is a zombie.`,
            },
          ],
          result: md`Notice what is absent: no description of Ripple's architecture, no "would you use", no price. The only mention of your solution is inside the ask, where it creates a commitment.`,
        },
        {
          kind: "worked",
          mode: "worked",
          title: "Script B: O&M manager at a desert PV plant (Mizan)",
          given: md`Target: the O&M or plant manager at a utility-scale PV plant in Kuwait or the Gulf (or the O&M contractor's site lead). Three big questions: (1) how cleaning dates are decided today and who can change them; (2) what soiling data they already have (reference cells, soiling stations, SCADA tags) and whether they trust it; (3) how a pilot or new service gets contracted (direct award, research collaboration, tender). Conversations may be in Arabic or English; keep the same structure in both.`,
          steps: [
            { md: md`**Frame.** "We are studying how PV plants in Kuwait decide when to clean. I'm here to learn how you do it, not to sell. About 30 minutes."` },
            { md: md`**Context.** "How is the plant cleaned today: crews, trucks, robots? Water or dry? Who sets the cleaning plan: you, the O&M contractor, the owner?"` },
            { md: md`**Last time.** "Tell me about the last cleaning cycle. When was it, and how was the date chosen? Was there a dust event before it? Did you clean earlier or later than planned? What happened to output after cleaning?"` },
            { md: md`**Cost and workaround.** "What does one full cleaning cost you in crew days and water? Have you ever changed the schedule because of a storm or a performance drop? How did you know it was soiling and not something else (inverter, temperature, curtailment)?"` },
            { md: md`**Data reality.** "Which signals do you record: plant power, irradiance, module temperature, a soiling station? At what interval? Could you show me the screen you look at when output drops?"` },
            { md: md`**Buying process.** "If you wanted to change how cleaning is planned, who would have to agree? Last time the plant brought in a new service or study, how was it contracted, and how long did it take?"` },
            { md: md`**Ask.** "Would you be willing to share one month of power, irradiance and temperature data, so we can show you what our soiling estimate looks like against your cleaning dates? We'd come back with it in three weeks." Or, for reputation: "Who in your organisation would need to see that result for it to change anything? Could you introduce us?"` },
          ],
          result: md`The script is built so that each section tests a specific assumption from Mizan's map: desirability (would they change the schedule), feasibility (data exists), viability (contracting route).`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Synthesising a batch of 16 conversations (illustrative)",
          given: md`Over three weeks you hold 16 discovery conversations with test leads (illustrative). Notes show: 11 described a specific recent regression rerun with a cost (rung 1 or better); 6 showed you a spreadsheet or test log (rung 2); commitments at the end were: 3 agreed a dated data-export session, 1 introduced you to their head of validation, 1 asked for a paid pilot proposal; 6 said "keep me posted"; the rest said no or were not the right person.`,
          steps: [
            { md: md`Advancements: data sessions (time), introduction (reputation), pilot proposal request (money is not yet paid, but it is a concrete step in their buying process). Count them.` },
            {
              md: md`$N_{\text{adv}} = 3 + 1 + 1$.`,
              hidden: true,
              check: { prompt: "Number of advancements", answer: 5, unit: "conversations", tolerance: { abs: 0 } },
            },
            {
              md: md`Advancement rate $a = 5/16$.`,
              hidden: true,
              check: { prompt: "Advancement rate", answer: 31.25, unit: "%", tolerance: { abs: 0.5 } },
            },
            { md: md`Problem frequency: 11 of 16, about 69%, described a specific, costed rerun. The 6 "keep me posted" answers are zombies: do not count them in the pipeline.` },
          ],
          result: md`About 31% advancement and about 69% with a concrete recent instance of the problem is a strong early signal for this segment. Next: run the 3 data sessions to test the feasibility assumption, and write down what you learned from the 6 zombies (often: wrong person, or problem not painful enough in their setup).`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running interviews in the field",
      blocks: [
        {
          kind: "md",
          md: md`### Practicalities

- **Who to talk to.** The person who has the problem (test engineer, plant engineer) and, separately, the person who pays (head of validation, plant owner, O&M contract manager). Their problems differ. For Mizan, KISR researchers are a methodology partner, not the buyer: interview them about research goals, not purchasing.
- **Where to find them.** Warm introductions from your network and your cofounders' (Tesla and Signify alumni networks for Afterwave), conferences and trade shows, LinkedIn with a short, specific, non-salesy note. Ask every interviewee "Who else should I talk to?": that is a small reputation commitment.
- **Keep it casual.** Fitzpatrick's advice: the best discovery conversations do not feel like formal interviews. A 20-minute chat at a trade-show stand following the same structure counts.
- **Notes.** Two people per call where possible (one asks, one writes). Write down verbatim quotes, facts with numbers, and the exact commitment asked and given. Use simple symbols: a mark for pain, for a fact, for a commitment.
- **Recording and AI.** Ask permission before recording. A transcript plus an AI summary is useful, but always reread the transcript for the facts: summaries tend to turn "we might" into "we will".
- **Synthesis.** After each batch of 5 to 10, update the assumption map and the evidence log. Patterns matter, single quotes do not.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Politeness, hierarchy and the soft no",
          md: md`In many business cultures, including much of the Gulf and also many engineering organisations in Europe, people avoid a direct "no" to a guest. Expect more compliments and more "we will see". The defence is the same everywhere: ignore the words and look at what they give up. A government or utility engineer who says "very interesting, send me the proposal" but will not name who reads it, or share a sample of data, has not advanced. Never push for a commitment that would embarrass someone in front of their superior; ask privately, and offer a smaller step.`,
        },
        {
          kind: "checklist",
          title: "Before and after each conversation",
          items: [
            "Three big questions written down, taken from the top-left of the assumption map.",
            "Every question is about their past or present, not your idea or their future.",
            "You talked less than a third of the time.",
            "Every compliment was deflected and every generic answer anchored to a specific instance.",
            "Every feature request was dug into for its motivation.",
            "You asked for a specific next step and wrote down the exact answer.",
            "Notes include the evidence rung, and the evidence log was updated within 24 hours.",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc02-l02-p1",
            type: "short",
            prompt: md`Produce the full script for your next **Afterwave** discovery conversation with a **head of validation at a battery-pack or humanoid-robot company**. Include: (1) your three big questions and the assumption each tests; (2) a two-sentence frame; (3) at least six questions about specific past behaviour; (4) how you will respond if they say "This sounds great, we'd definitely use it"; (5) the commitment you will ask for, a fallback smaller ask, and how you will classify each possible answer.`,
            rubric: [
              "Three big questions are linked to explicit assumptions (desirability, feasibility, viability), including the buying or security-approval process.",
              "At least six questions anchored in specific past events (last release, last tool purchase, last escaped defect) with no hypothetical or opinion questions.",
              "The compliment response deflects politely and returns to facts or a commitment instead of accepting it as validation.",
              "The primary ask costs the customer time, reputation or money and has a date or concrete form; a smaller fallback ask is given.",
              "Answers are classified correctly: \"keep me posted\" or \"send info\" as a zombie, a dated session or introduction as advancement.",
              "The script does not pitch the product before the ask and stays within about 30 minutes.",
            ],
            modelAnswer: md`**Big questions.** (1) Desirability: how much does change-driven retesting cost them per release, in bench-days and schedule? (2) Feasibility: is test history (results, firmware, rig configuration) stored so it can be joined? (3) Viability: how does a tool that touches bench PCs and test data get approved and paid for?

**Frame.** "I'm one of the founders of Afterwave; we're studying how hardware test teams handle firmware and rig changes. I'm here to learn how you do it, not to sell, and I'll keep it to 30 minutes."

**Past-behaviour questions.**
1. "Take the last firmware or BMS software release that reached your benches. What happened from the day it arrived?"
2. "How did you decide which tests to rerun? Who made that call, and how long did it take?"
3. "How many bench-days did that release cost in retesting?"
4. "When did a regression last escape to a later gate or to the field? How was it found, and what did it cost?"
5. "What have you tried to make test selection faster? What happened to it?"
6. "If I asked for the last ten releases with the tests run on each rig configuration and the result, where would that come from? Could you show me?"
7. "The last time a new tool went onto bench PCs or touched test data, who approved it and how long did it take? Whose budget paid?"

**Compliment response.** "Thank you, that's kind. But before I believe it, can I ask how you handle it today? What did the last release cost you?" Then continue with the past-behaviour questions.

**Ask.** Primary (time and reputation): "Would you and one of your test engineers spend two hours with us in the next three weeks, with an export of last quarter's results and firmware versions, so we can show whether change-to-test links can be recovered? Could you also tell me who in IT security would need to be involved?" Fallback (time): "Could you send a ten-row sample of the test log format so we can check feasibility?"

**Classification.** A dated session with data, or a named security contact: advancement. A sample file: small advancement. "Interesting, send me a deck" or "keep me posted": zombie; log it as no evidence and move on. A clear "this isn't a problem for us because..." is useful data, not failure.`,
            explanation: md`The grader checks that every question is about past facts, that compliments are deflected, and that the conversation ends with a concrete commitment that tests a top-left assumption.`,
            concepts: ["fc02.mom-test", "fc02.commitment-advancement", "fc02.bad-data"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "fc02-s1" },
        { kind: "sources", refs: ["fc02-r1"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc02-l02-q1",
      type: "mcq",
      prompt: md`Which question best follows The Mom Test?`,
      options: [
        "Would you use a tool that recommends cleaning dates?",
        "How much would you pay for soiling analytics?",
        "When did you last move a cleaning date, and what made you do it?",
        "Do you think soiling is a big problem in Kuwait?",
      ],
      answer: 2,
      explanation: md`It asks about a specific past event in their life. The others ask for future behaviour, hypothetical money or an opinion.`,
      concepts: ["fc02.mom-test"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc02-l02-q2",
      type: "multi",
      prompt: md`Which end-of-meeting outcomes count as **advancement**? (Select all.)`,
      options: [
        "\"This is great, keep me posted.\"",
        "They book a session next Tuesday with two engineers and a data export.",
        "They introduce you by email to their head of IT security.",
        "\"Send me a deck and I'll forward it around.\"",
        "They ask for a paid pilot proposal and name the budget holder.",
      ],
      answer: [1, 2, 4],
      explanation: md`Advancement costs the customer time, reputation or money and moves them toward a purchase. A deck request with no named reader and "keep me posted" are zombie signals.`,
      concepts: ["fc02.commitment-advancement"],
      difficulty: 1,
    },
    {
      id: "fc02-l02-q3",
      type: "mcq",
      prompt: md`A plant engineer says: "It should send a WhatsApp alert when soiling passes 5%." What is the best response?`,
      options: [
        "Write it down as a requirement for the MVP.",
        "Explain that alerts are on the roadmap.",
        "Ask why they want it: what would they do with the alert, and how do they find out about soiling today?",
        "Ask whether they would pay extra for alerts.",
      ],
      answer: 2,
      explanation: md`A feature request is an idea, not data. Dig under it for the motivation and the current workaround; that is where the real requirement and its value live.`,
      concepts: ["fc02.bad-data"],
      difficulty: 1,
    },
    {
      id: "fc02-l02-q4",
      type: "numeric",
      prompt: md`Of 24 conversations, 4 ended with a dated data session, 2 with an introduction to a decision-maker, and 9 with "keep me posted". What is the advancement rate, in %?`,
      answer: 25,
      tolerance: { abs: 0.5 },
      unit: "%",
      explanation: md`$a = (4+2)/24 = 0.25 = 25\%$. "Keep me posted" does not count.`,
      concepts: ["fc02.commitment-advancement"],
      difficulty: 1,
    },
    {
      id: "fc02-l02-q5",
      type: "order",
      prompt: md`Put the parts of a discovery conversation in order.`,
      items: [
        "Frame: learning, not selling, and the time it will take",
        "Context: their role, team and setup",
        "The last specific time the problem happened",
        "Cost and workarounds tried",
        "Buying and approval process",
        "Ask for a concrete next step",
      ],
      explanation: md`Context first, then the specific past instance (the richest facts), then cost and workaround, then how buying works, and finally the commitment request.`,
      concepts: ["fc02.mom-test", "fc02.commitment-advancement"],
      difficulty: 1,
    },
    {
      id: "fc02-l02-q6",
      type: "decision",
      prompt: md`Mid-interview, the test lead says "We always rerun everything, it's a nightmare." What do you do next?`,
      options: [
        { text: "Say that is exactly what Ripple fixes and describe how it works.", score: 0, feedback: "You switched to pitching and lost the chance to learn the facts." },
        { text: "\"When was the last time? Walk me through that release, and how many bench-days it took.\"", score: 1, feedback: "Anchors the generic \"always\" to a specific past instance with a cost." },
        { text: "\"How much would it be worth to you to fix that?\"", score: 0.3, feedback: "Hypothetical value. Better to get the real cost of the last instance." },
        { text: "Note \"problem validated\" and move to the next question.", score: 0.2, feedback: "A generic emotional statement is fluff until you have a specific instance and cost." },
      ],
      explanation: md`"Always" and "never" are fluff; the response is to anchor on the last specific instance and its cost.`,
      concepts: ["fc02.bad-data", "fc02.mom-test"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "fc02-l02-f1", front: "The Mom Test's three rules", back: "Talk about their life, not your idea. Ask about specifics in the past, not opinions about the future. Talk less, listen more.", concepts: ["fc02.mom-test"] },
    { id: "fc02-l02-f2", front: "Three kinds of bad data", back: "Compliments, fluff (generics, hypotheticals, future promises) and ideas (feature requests).", concepts: ["fc02.bad-data"] },
    { id: "fc02-l02-f3", front: "Three currencies of commitment", back: "Time, reputation, money.", concepts: ["fc02.commitment-advancement"] },
    { id: "fc02-l02-f4", front: "What is a zombie lead?", back: "A friendly contact who never commits anything: \"keep me posted\", \"send info\". Treat as no evidence.", concepts: ["fc02.commitment-advancement"] },
    { id: "fc02-l02-f5", front: "How to handle \"we always...\"", back: "Anchor it: \"When was the last time? Walk me through it.\"", concepts: ["fc02.bad-data"] },
    { id: "fc02-l02-f6", front: "Advancement rate", back: md`$a = N_{\text{adv}} / N_{\text{int}}$: share of conversations ending in a commitment of time, reputation or money.`, concepts: ["fc02.interview-synthesis"] },
  ],
  scenarios: [
    {
      id: "fc02-s1",
      title: "\"I love it, send me a deck\"",
      dayInLife: true,
      context: md`You are 25 minutes into a call with the test systems lead of a European robotics company (illustrative). She has described a painful firmware release last month that cost about 5 bench-days of reruns. You briefly mentioned that Afterwave is working on change impact. She says: "Honestly, this is exactly what we need. Send me a deck and I'll share it with the team."`,
      start: "a",
      concepts: ["fc02.commitment-advancement", "fc02.bad-data"],
      nodes: {
        a: {
          md: md`How do you respond?`,
          choices: [
            { text: "\"Great, I'll send it tonight!\" and end the call.", score: 2, feedback: "You accepted a compliment and a zombie next step. The deck will be forwarded to nobody in particular.", next: "c" },
            { text: "\"Thank you. Before I send anything: who on the team would need to see it for something to happen, and could we get 90 minutes with them and an export of last month's test results?\"", score: 9, feedback: "Converts the compliment into a test: a time and reputation commitment with a concrete form.", next: "b" },
            { text: "Use the remaining 5 minutes to demo the prototype.", score: 4, feedback: "Pitching at the end of a discovery call teaches you little and still leaves no commitment.", next: "c" },
          ],
        },
        b: {
          md: md`She hesitates: "My manager would need to be involved, and exporting data needs approval from IT. Let me check."`,
          choices: [
            { text: "\"Understood. Could you introduce me to your manager this week, and tell me who in IT handles data requests? I can prepare a one-page note on exactly what data we need and how it is handled.\"", score: 10, feedback: "You learned the buying path (manager, IT) and asked for a smaller, concrete reputation commitment, while lowering her effort with the one-pager.", next: "d" },
            { text: "\"No problem, let me know when you hear back.\"", score: 4, feedback: "Polite, but you have just handed control back and created a likely zombie.", next: "c" },
          ],
        },
        c: {
          md: md`Three weeks pass. Two follow-up emails get a friendly "busy with the release, will come back to you".`,
          choices: [
            { text: "Log the contact as rung 0 evidence, write down what you learned, and send one short note asking for a clear yes or no on a specific next step.", score: 6, feedback: "Recovers some value: honest logging stops a zombie inflating your pipeline, and a clear ask may still revive it." },
          ],
        },
        d: {
          md: md`Two days later she introduces you to her manager and names an IT contact. The manager agrees to a call next week.`,
          choices: [
            { text: "Prepare for the manager call with three big questions on budget, approval and success criteria, not a product demo.", score: 10, feedback: "Advancement achieved (reputation). The next conversation tests viability: who pays and what a pilot would need to show." },
          ],
        },
      },
    },
  ],
};

export default lesson;
