import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m13-l03",
  title: "Presenting to Senior Officials",
  summary:
    "The pyramid principle, the three-slide rule, the four numbers leaders care about (MW, KWD, date, risk), handling questions without overcommitting, and how to deliver bad news so that trust goes up, not down.",
  minutes: 55,
  objectives: [
    "You can structure a briefing as a pyramid: governing thought, three supporting points, evidence",
    "You can build a three-slide briefing (answer, why, asks) with everything else in an appendix",
    "You can translate technical status into MW, KWD, dates and risk — including PPA exposure",
    "You can handle hostile or unexpected questions without guessing numbers or committing the ministry",
    "You can present bad news early using cause–impact–plan–ask",
  ],
  concepts: [
    {
      id: "m13.pyramid-principle",
      name: "Pyramid principle",
      description:
        "Start with the governing thought (the answer); support it with a small number of grouped, non-overlapping arguments; support each with evidence.",
      competency: "leadership",
      related: ["m13.bluf"],
    },
    {
      id: "m13.three-slide-rule",
      name: "Three-slide rule",
      description:
        "A senior briefing should fit on three slides — the answer/decision, the evidence, the asks/next steps — with detail in an appendix.",
      competency: "leadership",
      related: ["m13.pyramid-principle"],
    },
    {
      id: "m13.leader-numbers",
      name: "Numbers leaders care about",
      description:
        "Megawatts (and share of peak), cost in KWD (and share of budget/contingency), dates (and slip), and risk (probability, impact, owner) — expressed with ranges and confidence.",
      competency: "leadership",
      related: ["m00.delay-cost", "m10.contingency-drawdown", "m01.capacity-factor"],
    },
    {
      id: "m13.question-handling",
      name: "Handling questions",
      description:
        "Listen fully, answer the question asked in one or two sentences, never guess a number, commit to a dated follow-up, and never contradict your superior in front of external parties.",
      competency: "leadership",
      related: ["m15.leadership-briefing"],
    },
    {
      id: "m13.bad-news",
      name: "Presenting bad news",
      description:
        "Early, owned, quantified with range, with a recovery plan and a clear ask: cause → impact → plan → ask.",
      competency: "leadership",
      related: ["m13.leader-numbers", "m08.rag-reporting", "m08.early-warning"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Why senior briefings fail, and the structure that fixes them",
      blocks: [
        {
          kind: "md",
          md: md`A briefing to an Undersecretary or Minister is short (often 10–15 minutes including interruptions), interrupted (phones, aides, the next delegation waiting), and high-stakes (the official will repeat your words to the Minister, to the Council of Ministers or to the National Assembly). Engineers fail here in a predictable way: they present **the work** rather than **the answer**. Twenty slides of methodology, and the decision appears on slide 18 — by which time the official has left for the next meeting.

### The pyramid principle

Barbara Minto's pyramid principle formalises BLUF for spoken and written argument:

1. **Governing thought** at the top — the single sentence you want the official to remember and repeat. "The 1,100 MW plant can connect on time if we approve the second 400 kV bay this month."
2. **Key line** — three (rarely more than four) supporting points that together justify the governing thought, each answering the question the governing thought raises ("why?" or "how?").
3. **Evidence** under each point — data, studies, precedent.

The supporting points must be **MECE**: mutually exclusive (no overlap) and collectively exhaustive (no gap) with respect to the question. Overlap makes the argument look padded; gaps invite the one question you cannot answer.

A useful opener is **SCQ**: *Situation* (what the official already accepts), *Complication* (what changed), *Question* (what that raises) — and then the answer. "The IPP is scheduled to connect in Q2. The substation bay is 10 weeks late. Can we still connect on time? Yes, if…"`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why three points, not seven",
          md: md`Working memory holds only a handful of items, and a listener — unlike a reader — cannot go back. Three grouped arguments can be retained and repeated by the official to *their* superior. Seven ungrouped facts are forgotten by the time the official leaves the room. Grouping is not simplification; it is doing the synthesis so the listener does not have to.`,
        },
        {
          kind: "md",
          md: md`### The three-slide rule

| Slide | Title (a full sentence, not a label) | Content |
|---|---|---|
| 1 — The answer | "Approve the second 400 kV bay to protect the Q2 connection date" | Decision required, deadline, recommendation, 3–4 headline numbers |
| 2 — Why | "Without it, a 10-week delay exposes MEWRE to about KD 0.8 m of deemed-energy payments" | The three supporting points with one chart or table |
| 3 — Asks and next steps | "We need three actions by 15 March" | Who does what by when; what you need from the official |
| Appendix | — | Grid study, schedule, cost breakdown, risk register — used only to answer questions |

Two techniques make the slides work:

- **Action titles.** Each slide title is a complete sentence stating the conclusion of that slide. If the official reads only the three titles, they have the whole argument.
- **One message per visual.** A chart should show one comparison: forecast vs required date, cost vs contingency, risk before vs after mitigation.

Many senior officials in Kuwait prefer Arabic or bilingual slides for internal briefings. A practical pattern: **Arabic action title, numbers in a bilingual table**, technical appendix in English if the specialists use English documents.

### The numbers leaders care about

Senior officials do not lack intelligence; they lack time and context. Translate technical status into four quantities:

| Dimension | Technical way to say it | Leader way to say it |
|---|---|---|
| **MW** | "Inverter blocks 12–18 not commissioned" | "350 MW of the 1,100 MW will be late; that is about 2% of the summer peak" |
| **KWD** | "VO-07 valued at KD 2.4 m" | "KD 2.4 m — 4% of the contract, 80% of the remaining contingency" |
| **Date** | "Critical path float −70 days" | "Grid connection forecast 14 May against 5 March: 10 weeks late, range 8–13 weeks" |
| **Risk** | "Risk R-14 scored 16 on 5×5 matrix" | "One risk could add another month: GIS delivery. Owner: contractor. We will know by 1 April" |

Always give **ranges and confidence** for forecasts ("8–13 weeks, most likely 10"), and **compare to something the leader already knows**: the summer peak (17,540 MW in 2026 per MEWRE), the contract value, the contingency, the previous forecast.`,
        },
        { kind: "equation", formula: "m13-energy-exposure" },
        {
          kind: "md",
          md: md`This equation turns a delay into money — the single most persuasive translation for a senior official. For a PV plant, the capacity factor over the delay period depends on the season (higher in summer); for a first estimate use the annual average and say so.`,
        },
        { kind: "sources", refs: ["m13-minto", "m13-kt-peak-2026"] },
      ],
    },
    {
      layer: "applied",
      title: "Translating status into leader numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "What does a 10-week grid delay mean for the ministry?",
          given: md`A 500 MW (AC) PV IPP is ready, but MEWRE's connecting substation is forecast **10 weeks (70 days)** late. Assume an annual-average capacity factor of **24%**. The PPA tariff is not public; for illustration assume **4 fils/kWh = KD 4/MWh** and that the PPA requires MEWRE to pay for deemed energy when the plant cannot export because of an offtaker-side grid delay (check the actual PPA). For the system view, assume a cost of supply from thermal generation of about **20 fils/kWh** (published estimates range 14–26 fils/kWh and conflict; no current official figure).`,
          steps: [
            {
              md: md`**Annual energy.** $E = P \cdot CF \cdot 8760 = 500 \times 0.24 \times 8760 = 1{,}051{,}200$ MWh/yr.`,
            },
            {
              md: md`**Energy in the delay window.** $1{,}051{,}200 \times 70/365 = 201{,}600$ MWh.`,
            },
            {
              md: md`**Contractual exposure (deemed energy).** $201{,}600 \text{ MWh} \times \text{KD } 4/\text{MWh} = \text{KD } 806{,}400 \approx$ **KD 0.8 m** paid for energy that is never received.`,
            },
            {
              md: md`**System cost.** The same energy must be generated by thermal plant at about KD 20/MWh: $201{,}600 \times 20 = \text{KD } 4.03$ m of fuel-heavy generation that solar would have displaced.`,
            },
            {
              md: md`**Leader sentence.** "A 10-week grid delay would cost the ministry about KD 0.8 m in deemed-energy payments for power we would not receive, and about KD 4 m of additional thermal generation — and 500 MW less during the summer peak."`,
            },
          ],
          result: md`About **KD 0.8 m contractual exposure** plus about **KD 4 m system cost**, stated with assumptions. Note the caveats explicitly in the appendix: the tariff and deemed-energy terms are illustrative; summer capacity factors are higher than the annual average, so a summer delay costs more.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Presenting a variation against contingency",
          given: md`An EPC contract worth **KD 60 m** has a contingency of **5%**. A proposed variation (VO-07) is **KD 2.4 m**. Nothing has yet been drawn from contingency.`,
          steps: [
            { md: md`Contingency $= 0.05 \times 60 = \text{KD } 3.0$ m.` },
            { md: md`Variation as share of contract: $2.4/60 = 4\%$.` },
            {
              md: md`Share of contingency consumed: $2.4/3.0 = 80\%$.`,
              hidden: true,
              check: { prompt: "Share of contingency consumed by VO-07 (%)", answer: 80, unit: "%", tolerance: { abs: 0.5 } },
            },
            {
              md: md`Contingency remaining: $3.0 - 2.4 = \text{KD } 0.6$ m.`,
              hidden: true,
              check: { prompt: "Contingency remaining (KD million)", answer: 0.6, unit: "KD m", tolerance: { abs: 0.01 } },
            },
          ],
          result: md`The leader sentence is not "VO-07 is KD 2.4 m" but "**VO-07 uses 80% of our contingency, leaving KD 0.6 m for the remaining 14 months of construction**". That framing invites the right question: is this variation worth more than the protection it consumes?`,
        },
        {
          kind: "question",
          question: {
            id: "m13-l03-p1",
            type: "numeric",
            prompt: md`A 1,100 MW (AC) PV plant is expected to deliver **85%** of its AC rating at the hour of the summer peak. What percentage of Kuwait's summer-2026 peak load of **17,540 MW** (MEWRE figure) would it supply at that hour?`,
            answer: 5.33,
            unit: "%",
            tolerance: { abs: 0.05 },
            explanation: md`Output at peak hour $= 1100 \times 0.85 = 935$ MW. Share $= 935/17540 = 5.33\%$. "One plant covers about one-twentieth of the national peak" is a sentence a minister can repeat. (In practice, the national peak often occurs in mid-afternoon when PV output is still high; the evening shoulder is where BESS matters.)`,
            concepts: ["m13.leader-numbers"],
            difficulty: 1,
          },
        },
        {
          kind: "md",
          md: md`### Rewriting a slide — before and after

**Before** (title: "Substation Progress"): a Gantt chart with 140 activities, a table of 12 equipment deliveries, and the note "some delays observed".

**After** (title: "The 400 kV bay is 10 weeks late; approving acceleration recovers 7 weeks for KD 1.1 m"):

| | Forecast | Required | Gap |
|---|---|---|---|
| Bay energisation | 14 May | 5 March | 10 weeks (range 8–13) |
| With acceleration | 26 March | 5 March | 3 weeks |
| Cost of acceleration | KD 1.1 m | contingency KD 2.5 m | 44% of contingency |
| Deemed-energy exposure avoided | ≈ KD 0.56 m | — | 7 of 10 weeks |

One line beneath: "Decision needed by 12 March to secure air-freight slots." The Gantt chart goes to the appendix.`,
        },
        {
          kind: "widget",
          widget: "risk-matrix",
          caption: "Practise presenting risk: place three project risks, then state each as probability, impact in KWD or days, owner, and the date you will know more.",
        },
      ],
    },
    {
      layer: "field",
      title: "In the room: questions, bad news and protocol",
      blocks: [
        {
          kind: "md",
          md: md`### Before the briefing

- **Pre-brief your chain.** Your director and Assistant Undersecretary should see the slides first; they may want to present slide 1 themselves. In ministry culture, the senior person often presents and the PM supports with detail.
- **Know who is in the room.** Aides, advisers, other sectors. Find out each attendee's concern in advance (Module lesson m13-l01's stakeholder map).
- **Prepare the appendix as an answer bank.** For each likely question, one appendix slide.
- **Print.** Many senior officials prefer paper. Bring copies with page numbers so people can refer to them.
- **Rehearse the first 60 seconds.** If you are cut off after one minute, the governing thought and the ask must already have been said.

### Handling questions

1. **Listen to the end.** Senior officials often reframe questions mid-sentence. Do not start answering the first half.
2. **Answer first, then explain.** "Yes — if the second bay is approved this month. The reason is…" (BLUF again).
3. **Never guess a number.** "I will confirm the exact figure by Thursday" is respected; a wrong number repeated to the Minister is not forgotten.
4. **Separate fact, estimate and opinion.** "The contractor has reported…", "We estimate…", "My view is…".
5. **Hostile questions.** Acknowledge the concern, give the fact, move to the plan. "You are right that this was late. The cause was X; we have done Y; the remaining risk is Z."
6. **Protect your superior.** If your superior states a number that is out of date, do not correct them in front of the contractor or another agency. Pass a note, or correct it afterwards in writing.
7. **Do not commit the ministry.** If an external party asks for a date or a concession, the answer is "We will respond formally" — commitments are made in signed letters.

### Presenting bad news

Bad news does not damage trust; **surprise** does. The structure:

| Step | Content | Example |
|---|---|---|
| **Cause** | What happened, factually, without blame | "The GIS manufacturer's factory test failed on two bays." |
| **Impact** | MW, KWD, date, with range | "Energisation moves 6–9 weeks; 500 MW cannot export; exposure ≈ KD 0.5–0.7 m." |
| **Plan** | What is already being done, by whom | "Contractor re-testing on 20 April; we have asked for a temporary connection study." |
| **Ask** | What you need from the official | "Approval to request KAPP to notify the IPP formally, and a decision on the temporary connection by 30 April." |

Deliver it **as soon as you are reasonably sure**, not when you have a perfect plan. A partial plan with a dated next step is better than a perfect plan delivered after the official has heard the news from the IPP developer or a newspaper.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **The answer on slide 18.** The official leaves at slide 6.
- **Label titles** ("Schedule", "Cost") instead of conclusions.
- **Point estimates presented as certainties** — "COD 5 March" — then a slip, then lost credibility. Give ranges.
- **Watermelon reporting** — green outside, red inside: dashboards that stay green until the month before a milestone is missed.
- **Blaming the contractor in front of officials** — it sounds like an excuse and invites "and what did *you* do?".
- **Contradicting a superior in front of external parties.**`,
        },
        {
          kind: "checklist",
          title: "Briefing checklist",
          items: [
            "Governing thought written as one sentence the official can repeat",
            "Three slides with action titles; everything else in a numbered appendix",
            "Numbers expressed as MW (and share of peak), KWD (and share of budget/contingency), dates (and slip with range), risk (owner and date you will know more)",
            "Assumptions and sources stated in the appendix",
            "Chain pre-briefed; agreed who presents what",
            "Likely questions listed with appendix slide for each",
            "Clear ask: decision, by when",
            "Printed copies; Arabic action titles if the audience prefers",
          ],
        },
        {
          kind: "ask",
          title: "Questions to ask your OE or contractor before you brief upward",
          items: [
            "What is the range (best/most likely/worst) of the forecast, and what drives the worst case?",
            "What is already being done, and what decision from MEWRE would change the outcome?",
            "When will we know more — what is the next hard data point (test, delivery, inspection)?",
            "Which of these numbers might change before the meeting?",
          ],
        },
        { kind: "scenario", scenario: "m13-s4" },
        {
          kind: "feynman",
          prompt:
            "Explain how you would present a 10-week grid-connection delay to the Undersecretary in under three minutes.",
          keyPoints: [
            "Governing thought first: what is late, by how much, and what decision fixes it",
            "Translate into MW, KWD exposure (deemed energy), date with range, and risk",
            "Cause–impact–plan–ask without blame",
            "Do not commit to dates externally; commit to a dated follow-up",
            "Three slides with action titles; detail in appendix",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m13-l03-q1",
      type: "mcq",
      prompt: "Which is the best action title for slide 1 of a briefing on a grid delay?",
      options: [
        "Substation Progress Update",
        "Schedule Analysis — March",
        "Approve the second 400 kV bay this month to protect the Q2 connection date",
        "Issues and Challenges",
      ],
      answer: 2,
      explanation: md`An action title states the conclusion and the ask. If the official reads only the titles, they get the argument.`,
      concepts: ["m13.three-slide-rule", "m13.pyramid-principle"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m13-l03-q2",
      type: "order",
      prompt: "Order the steps for presenting bad news.",
      items: ["Cause (what happened, factually)", "Impact (MW, KWD, date, with range)", "Plan (what is being done, by whom)", "Ask (decision needed, by when)"],
      explanation: md`Cause–impact–plan–ask. Leaders need to understand what happened and what it means before they can judge the plan; ending with the ask turns bad news into a decision.`,
      concepts: ["m13.bad-news"],
      difficulty: 1,
    },
    {
      id: "m13-l03-q3",
      type: "numeric",
      prompt: "A 300 MW PV plant (annual-average capacity factor 25%) cannot export for 6 weeks (42 days) because of an offtaker-side delay. Assuming deemed energy at KD 4/MWh, what is the exposure in KD thousands?",
      answer: 302.4,
      unit: "KD thousand",
      tolerance: { rel: 0.01 },
      explanation: md`$E = 300 \times 0.25 \times 24 \times 42 = 75{,}600$ MWh. Exposure $= 75{,}600 \times 4 = \text{KD } 302{,}400 \approx 302$ thousand. (Using $8760 \times 42/365$ hours gives the same: 1,008 h.)`,
      concepts: ["m13.leader-numbers"],
      difficulty: 2,
    },
    {
      id: "m13-l03-q4",
      type: "decision",
      prompt: md`You are the PM, briefing the Undersecretary with KAPP and the IPP developer present. The Undersecretary says "the substation will be ready in March" — but yesterday's forecast moved it to May. What do you do?`,
      options: [
        { text: "Correct him immediately in the meeting so the record is accurate", score: 0.2, feedback: "Accuracy matters, but contradicting your superior in front of external parties damages him and the ministry's position." },
        { text: "Pass him a discreet note with the updated forecast; afterwards ensure the minutes or a follow-up letter state the correct position", score: 1, feedback: "Protects your superior and the record. He can choose to adjust his statement himself." },
        { text: "Say nothing, ever", score: 0, feedback: "The developer may rely on the March statement; the error must be corrected — discreetly and promptly." },
        { text: "Email the developer after the meeting with the May date", score: 0.3, feedback: "You would be correcting your superior externally without his knowledge, and outside the formal channel." },
      ],
      explanation: md`Protocol and accuracy both matter: correct privately and promptly, then fix the written record through the right channel.`,
      concepts: ["m13.question-handling"],
      difficulty: 2,
    },
    {
      id: "m13-l03-q5",
      type: "multi",
      prompt: "Which are good practices when answering questions from senior officials? (Select all that apply.)",
      options: [
        "Answer first, then explain",
        "Give a best-guess number if you don't know, to look prepared",
        "Separate fact, estimate and opinion",
        "Commit to a dated follow-up when you don't have the figure",
        "Agree to a counterparty's requested date on the spot to show goodwill",
      ],
      answer: [0, 2, 3],
      explanation: md`Guessed numbers are repeated upward and become your liability; commitments to counterparties are made in signed letters, not in meetings.`,
      concepts: ["m13.question-handling"],
      difficulty: 1,
    },
    {
      id: "m13-l03-q6",
      type: "short",
      prompt: "Write the governing thought and three MECE supporting points for a briefing recommending that MEWRE require 4-hour BESS alongside the next PV IPP.",
      rubric: [
        "Governing thought is a single sentence with a clear recommendation",
        "Three supporting points that do not overlap",
        "Points jointly cover the key questions (need, value/cost, feasibility/risk)",
        "Uses leader numbers or placeholders (MW, KWD, dates)",
        "Links to Kuwait context (evening peak / reliability)",
      ],
      modelAnswer:
        "Governing thought: 'Require 4-hour BESS with the next PV IPP so its output covers the evening peak, at an estimated [x] fils/kWh increase in the blended tariff.' Supporting points: (1) Need — after sunset, demand stays near the summer peak while PV output falls to zero, and reliable capacity (~17 GW) is below peak (~17.5 GW); (2) Value — [ ] MW of firm evening capacity defers [ ] MW of thermal capacity and reduces import and liquid-fuel costs by about KD [ ] m/yr; (3) Feasibility — Gulf IPPs have procured PV+BESS competitively, and MEWRE is already pursuing a 1–1.5 GW BESS programme, so the technical requirements and grid studies can be reused.",
      explanation: md`Need, value and feasibility is a classic MECE key line for an investment recommendation; each point answers "why?" about the governing thought.`,
      concepts: ["m13.pyramid-principle", "m13.leader-numbers"],
      difficulty: 3,
    },
  ],
  flashcards: [
    { id: "m13-l03-f1", front: "Pyramid principle — three levels", back: "Governing thought → key line (3 MECE supporting points) → evidence." },
    { id: "m13-l03-f2", front: "MECE", back: "Mutually exclusive, collectively exhaustive: no overlaps, no gaps." },
    { id: "m13-l03-f3", front: "SCQ opener", back: "Situation (accepted) → Complication (what changed) → Question (what it raises) → then the answer." },
    { id: "m13-l03-f4", front: "Three-slide rule", back: "1. Answer/decision\n2. Why (evidence)\n3. Asks/next steps\n\nAppendix for everything else." },
    { id: "m13-l03-f5", front: "Four leader numbers", back: "- **MW** (share of peak)\n- **KWD** (share of budget/contingency)\n- **Date** (slip, range)\n- **Risk** (owner, when you'll know)" },
    { id: "m13-l03-f6", front: "Bad-news structure", back: "Cause → Impact → Plan → Ask. Early beats perfect; surprise destroys trust." },
    { id: "m13-l03-f7", front: "Energy exposure of a delay", back: md`$X = P \cdot CF \cdot t \cdot \tau$ (MW × CF × hours × KD/MWh).` },
    { id: "m13-l03-f8", front: "Action title", back: "A slide title written as a full-sentence conclusion, not a topic label." },
  ],
  scenarios: [
    {
      id: "m13-s4",
      title: "The forecast changed overnight",
      dayInLife: true,
      context: md`You are due to brief the Undersecretary at 10:00 on the PV IPP's grid connection. At 07:30 the OE emails: the transformer for the connecting bay failed its factory acceptance test. Energisation, previously forecast 2 weeks late, may now be **8–12 weeks** late. Your slides show "2 weeks".`,
      start: "a",
      concepts: ["m13.bad-news", "m13.leader-numbers", "m13.question-handling"],
      nodes: {
        a: {
          md: md`What do you do before 10:00?`,
          choices: [
            { text: "Call your Assistant Undersecretary now, explain the change, and rebuild slide 1 around cause–impact–plan–ask", next: "b", score: 10, feedback: "Your superior must hear it from you before the Undersecretary does, and the briefing must reflect what you know now." },
            { text: "Present the existing slides and mention the test result at the end as 'emerging'", next: "c", score: 2, feedback: "You would be knowingly presenting outdated numbers as the headline — a credibility disaster when the truth emerges." },
            { text: "Ask to postpone the briefing until the impact is fully assessed", next: "d", score: 5, feedback: "Defensible if the meeting is purely routine — but the Undersecretary may hear the news elsewhere first. Better to brief with a range." },
          ],
        },
        b: {
          md: md`In the briefing, the Undersecretary asks: "Exactly when will it be ready?"`,
          choices: [
            { text: "'Between 8 and 12 weeks late; the re-test on the 20th will narrow that. I will report the confirmed date by the 25th.'", next: "e", score: 10, feedback: "Honest range, the next data point, and a dated commitment." },
            { text: "'10 weeks.'", next: "e", score: 4, feedback: "A false-precision point estimate that may need to be walked back." },
          ],
        },
        c: {
          md: md`Two days later, the IPP developer writes to KAPP citing the failed test. The Undersecretary asks why he was told "2 weeks".`,
          choices: [{ text: "Explain and apologise", score: 1, feedback: "The lost trust will cost you on every future briefing." }],
        },
        d: {
          md: md`The office agrees to postpone by two days. That afternoon, the developer's CEO calls the Undersecretary.`,
          choices: [{ text: "Provide an urgent written note", next: "e", score: 4, feedback: "You are now reacting. A range-based briefing at 10:00 would have kept the ministry ahead." }],
        },
        e: {
          md: md`The Undersecretary asks what he should tell KAPP and the developer.`,
          choices: [
            { text: "Recommend a short formal letter to KAPP giving the facts and the date of the next update — no commitment to a new date yet; offer a draft today", score: 10, feedback: "Formal, factual, non-committal on the date, and you make the next step effortless." },
            { text: "Suggest he calls the CEO and promises a new date", score: 3, feedback: "A verbal promise from the Undersecretary on an uncertain date creates exposure." },
          ],
        },
      },
    },
  ],
};

export default lesson;
