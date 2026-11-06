import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh03-l05",
  title: "Delivering and renewing: sponsor reports, make-goods, renewal economics and multi-event deals",
  summary:
    "The second sale is cheaper than the first, and it is made during the first event. This lesson covers fulfilment tracking, the sponsor report with honest metrics and denominators, make-good clauses for missed promises, the arithmetic of renewal (lifetime value doubles when renewal moves from 50 % to 75 %), and how to price multi-event and annual partnerships without giving away more than the certainty is worth.",
  minutes: 65,
  objectives: [
    "Track every promised benefit through delivery and evidence it in a sponsor report",
    "Write a sponsor report with outcome metrics, denominators and methods, delivered within two weeks",
    "Draft make-good terms that protect the sponsor without exposing Suhail to cash refunds",
    "Compute sponsor lifetime value from renewal rate and compare the cost of renewing with the cost of acquiring",
    "Price a multi-event package and compute the maximum discount at which it still beats selling events one by one",
  ],
  concepts: [
    { id: "sh03.fulfilment-tracking", name: "Fulfilment tracking", description: "A benefit-by-benefit log from contract to delivery with owner, date and evidence (photo, link, count), so nothing promised is forgotten and every delivery can be shown in the report.", competency: "sh-events", related: ["sh03.tier-contribution"] },
    { id: "sh03.sponsor-report", name: "Sponsor report", description: "A post-event report, within about two weeks, of outcomes against the sponsor's own metric (activated developers, consented leads, interviews, hires) with denominators, methods and what did not work, followed by 30 and 90 day updates.", competency: "sh-partnerships", related: ["sh03.value-based-sponsor-pricing"] },
    { id: "sh03.make-good", name: "Make-good clause", description: "A contract term that compensates a sponsor for a missed, measurable promise (audience floor, workshop slot) with credit or extra benefits at the next event, rather than cash, except when the event is cancelled.", competency: "sh-partnerships", related: ["sh03.sponsor-report"] },
    { id: "sh03.renewal-economics", name: "Sponsor renewal economics", description: "With renewal probability rho, expected sponsor life is 1/(1 − rho) cycles and lifetime value m/(1 − rho); renewing costs a fraction of acquiring, so renewal rate drives both revenue and volunteer workload.", competency: "sh-partnerships", related: ["fc06.ltv", "fc06.retention"] },
    { id: "sh03.multi-event-package", name: "Multi-event and annual packages", description: "One contract covering several events at a discount; worth it to the organiser when the certain package beats the expected value of selling events separately, net of sales and fulfilment costs.", competency: "sh-partnerships", related: ["sh03.renewal-economics"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "From delivery to renewal",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's Partnerships lead will be a volunteer with limited hours. If every sponsor has to be found again for every event, the sales workload grows with the calendar and the community stalls at a few events a year. If most sponsors renew, the workload shrinks and the calendar can grow. Renewal is decided by what the sponsor's champion can show her boss after the event, which means the report is designed before the event, not written after it.`,
        },
        {
          kind: "flow",
          title: "The renewal loop",
          steps: [
            { label: "Contract", detail: "Benefits, metrics and reporting promise written down; make-good terms agreed" },
            { label: "Fulfilment log", detail: "Each benefit with owner, date and evidence" },
            { label: "Event", detail: "Collect the denominators: approvals, check-ins, teams, consent opt-ins" },
            { label: "Report at 14 days", detail: "Outcomes vs the sponsor's metric, with methods and misses" },
            { label: "Follow-up at 30 and 90 days", detail: "API activation (sponsor's data), interviews and hires" },
            { label: "Renewal conversation", detail: "Within three weeks of the report, before the sponsor's budget cycle" },
          ],
          caption: "The renewal conversation starts from the report; the report starts from the contract.",
        },
        {
          kind: "md",
          md: md`### What goes into a sponsor report

| Section | Content | Common mistake |
|---|---|---|
| **Audience** | Applications, approvals, check-ins (show rate), consented demographics in aggregate (students, professionals, nationals, women, cities) | Reporting registrations as attendance |
| **Benefits delivered** | Each contracted benefit with evidence: photos, links, session counts | Forgetting a benefit, which the sponsor notices |
| **Outcome metric** | The sponsor's own number: projects using its API, sign-ups, activated developers at 30 days (from the sponsor's data), consented CVs, interviews, hires at 90 days | Sign-ups without activation; leads without consent |
| **Cost per outcome** | Package price divided by each outcome, next to the sponsor's alternative cost if they shared it | Leaving the sponsor to do the arithmetic |
| **What did not work** | Misses, causes and fixes for next time | Hiding misses the sponsor will find anyway |
| **Next steps** | Renewal options, dates | No ask |

Report numbers with their denominators and method ("9 of 38 consented developers made at least one API call between day 1 and day 30, per the sponsor's dashboard"). An honest small number with a method is renewable; an inflated number is not.

### Make-goods

Promises that can be measured can be missed. A make-good clause states the floor and the remedy in advance: "If checked-in attendance is below 100, Suhail credits 10 % of the fee against the next event." Credits keep the relationship and the cash; cash refunds are for cancellation only. State audience promises as ranges for a first event, and set the floor at the bottom of the range.

### Renewal economics`,
        },
        { kind: "equation", formula: "sh03-sponsor-ltv" },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative lifetime contribution of a Gold sponsor (USD 13,620 per Season) by renewal rate",
          xKey: "renewal",
          xLabel: "Renewal rate per Season",
          yLabel: "Lifetime contribution, USD",
          series: [{ key: "ltv", label: "Lifetime contribution (undiscounted)" }],
          data: [
            { renewal: "30 %", ltv: 19457 },
            { renewal: "50 %", ltv: 27240 },
            { renewal: "60 %", ltv: 34050 },
            { renewal: "75 %", ltv: 54480 },
            { renewal: "85 %", ltv: 90800 },
          ],
          caption: "The curve is convex: each extra point of renewal is worth more than the last. Undiscounted and illustrative; a real sponsor's tier and price change over time.",
        },
        {
          kind: "md",
          md: md`The same arithmetic sets the workload. To keep 18 sponsors per Season with renewal $\rho$, you must find $18(1-\rho)$ new ones each year: 9 at 50 % renewal, 4.5 at 75 %. If a new sponsor takes about 30 volunteer hours to win and a renewal about 6 (illustrative), moving renewal from 50 % to 75 % cuts annual sales effort from about $9\times30 + 9\times6 = 324$ hours to $4.5\times30 + 13.5\times6 = 216$ hours.

### Multi-event and annual packages

A package (for example six hackathons and the Season) trades a discount for certainty: committed cash, one sales cycle instead of seven, and a sponsor whose metric improves with repeated presence. It is worth it when the package beats selling separately:`,
        },
        { kind: "equation", formula: "sh03-package-discount" },
        {
          kind: "md",
          md: md`The risk moves to delivery: you now owe the sponsor six well-run hackathons. Write the package with per-event benefits, a schedule, and what happens if an event is cancelled or moved (credit to the next one, or a pro rata refund).`,
        },
        { kind: "xref", to: "fc06-l02", note: "Founder Core unit economics: LTV, retention and payback in general; here applied to sponsors." },
      ],
    },
    {
      layer: "applied",
      title: "Reports, renewals and packages in numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "The report for a Silver platform sponsor, and what renewal is worth",
          given: md`Illustrative Suhail hackathon. A Silver sponsor (an AI API provider) paid USD 4,000. Event data: 210 approved, 126 checked in (60 % show rate), 31 teams. 14 projects used the sponsor's API. 38 builders opted in to be contacted by the sponsor. The sponsor's dashboard at day 30 shows 9 of those 38 still making API calls. The sponsor said in discovery that a qualified developer lead from paid channels costs it about USD 150. The Season Gold tier contributes USD 13,620 (Lesson 3).`,
          steps: [
            { md: md`**Depth of use:** $14/31 = 45$ % of teams built on the API.` },
            { md: md`**Cost per consented lead:** $4{,}000/38 = 105$ USD, against the sponsor's 150: a value-to-price ratio on leads of $38\times150/4{,}000 = 1.43$.` },
            { md: md`**Cost per activated developer:** $4{,}000/9 = 444$ USD. Report this even though it is less flattering: it is the number the developer-relations lead will be asked for.` },
            { md: md`**What to change next time (in the report):** the workshop ran at 22:00 when half the room was building; move it to the first two hours, and add an API-specific prize. Both are free.` },
            { md: md`**Renewal value:** if this sponsor later moves up to Season Gold and renews at 75 %, lifetime contribution is $13{,}620/(1-0.75) = 54{,}480$ USD, against $27{,}240$ at 50 %. One honest report is worth more than a year of cold outreach.` },
          ],
          result: md`USD 105 per consented lead and USD 444 per activated developer (illustrative), with a clear fix. The report makes the renewal case in the sponsor's own currency.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: price an annual partnership",
          given: md`Illustrative annual partner: 6 hackathons at Silver (list USD 4,000 each, fulfilment 300 each) plus Season Gold (list USD 15,000, fulfilment 1,200). List total $L = 39{,}000$. Sold separately, you estimate this sponsor would buy each hackathon with probability 0.5 and the Season with probability 0.7, at a sales cost of USD 500 per separate deal (7 deals). Selling the package costs USD 1,000 and its fulfilment is USD 3,000.`,
          steps: [
            { md: md`Expected separate revenue: $6\times4{,}000\times0.5 + 15{,}000\times0.7 = 12{,}000 + 10{,}500 = 22{,}500$. Expected separate fulfilment: $6\times300\times0.5 + 1{,}200\times0.7 = 900 + 840 = 1{,}740$. Sales cost: $7\times500 = 3{,}500$.` },
            { md: md`$\Pi_{sep} = 22{,}500 - 3{,}500 - 1{,}740 = 17{,}260$ USD.`, hidden: true, check: { prompt: "Expected net contribution selling separately (USD)", answer: 17260, tolerance: { abs: 1 }, unit: "USD" } },
            { md: md`$d_{max} = 1 - (17{,}260 + 1{,}000 + 3{,}000)/39{,}000$.` },
            { md: md`$= 1 - 21{,}260/39{,}000 = 0.455$, so **45.5 %**.`, hidden: true, check: { prompt: "Maximum package discount (%)", answer: 45.5, tolerance: { abs: 0.2 }, unit: "%" } },
          ],
          result: md`Any discount below about 45 % beats selling one by one, on these estimates. Offer 15 % (package price USD 33,150, net USD 29,150 after sales and fulfilment) and keep the rest of the margin as payment for the delivery risk. A large d_max means your separate-sale probabilities are low: the package is mostly buying certainty.`,
        },
        {
          kind: "question",
          question: {
            id: "sh03-l05-p1",
            type: "numeric",
            prompt: md`A Silver sponsor contributes USD 5,448 per Season and renews with probability 0.6. What is its expected lifetime contribution in USD (undiscounted)?`,
            answer: 13620,
            tolerance: { abs: 1 },
            unit: "USD",
            explanation: md`$\mathrm{LTV}_s = 5{,}448/(1-0.6) = 5{,}448/0.4 = 13{,}620$ USD: the expected sponsor life is 2.5 Seasons.`,
            concepts: ["sh03.renewal-economics"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Delivering what was sold",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **One fulfilment log per event,** owned by the Partnerships lead, with every benefit from every contract as a row: owner, due date, status, evidence link. Reviewed in the weekly event meeting and on the morning of the event.
- **Data agreements before the event.** If the outcome metric needs the sponsor's data (API activations), agree in the contract that they share the 30-day count. If it needs builders' data (CVs, emails), the consent text is in the registration form, per purpose.
- **Report template reused** across sponsors and events, so year-on-year comparisons are possible.
- **Renewal ask in the report meeting,** with two options (same tier; upgrade or package) and the date the sponsor's next budget is set.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "How renewals are lost",
          md: md`A benefit forgotten on the day (the logo missing from the stage screen); a report sent six weeks later; registrations reported as attendance; leads shared without consent and complained about; no named person at Suhail who owns the relationship between events; a renewal ask made after the sponsor's budget was already set.`,
        },
        { kind: "scenario", scenario: "sh03-s2" },
        {
          kind: "ask",
          title: "Questions for the sponsor in the report meeting",
          items: [
            "Which number in this report will you show internally, and is it the right one?",
            "What would have to be true next time for you to call this your best event of the year?",
            "When is your next budget set, and who else needs to see this report before then?",
            "Would a package across our hackathons and the Season be easier for you to approve than separate events?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh03-l05-p2",
            type: "short",
            prompt: md`Write the sponsor report and renewal proposal for one illustrative sponsor of a Suhail hackathon (choose a hiring or a platform sponsor). Include: (1) audience numbers with denominators (approvals, check-ins, show rate) and consented aggregate demographics; (2) every contracted benefit with its delivery evidence; (3) the outcome metric and cost per outcome against the sponsor's alternative cost; (4) at least one miss, its cause and the fix; (5) any make-good owed under the contract; (6) a renewal proposal with two options, one of them a multi-event package with a discount you justify from the d_max arithmetic.`,
            rubric: [
              "Audience numbers use correct denominators (check-ins vs approvals) and only consented aggregate demographics",
              "Each contracted benefit is listed with evidence",
              "The outcome metric is the sponsor's own, with cost per outcome computed and compared with its alternative cost",
              "At least one miss is reported honestly with a cause and a concrete fix",
              "Make-good is applied correctly per the contract (credit, not cash, unless cancelled)",
              "Renewal proposal has two options, and the package discount is justified with an expected-value comparison and is well below d_max",
            ],
            modelAnswer: md`**Sponsor (illustrative):** a regional software company, Gold hiring package, USD 10,000; contract floor: 100 checked-in builders, 2 judging seats, consented CV book.

**Audience:** 205 approved, 128 checked in (62 % show rate), 32 teams; aggregate from consented fields: 41 % students, 59 % professionals, 34 % women, builders from 6 cities.

**Benefits delivered:** 2 judging seats (photos), 10-minute recruiting talk at dinner (recording link), CV book with 44 consented CVs delivered two weeks before (file log), 3 job posts in the newsletter (links), logo on stage screen and site (photos).

**Outcome:** 11 interviews from the CV book and judging; 1 offer accepted at day 75, 1 in process. Cost per interview $10{,}000/11 = 909$ USD; per hire $10{,}000$ USD against a recruiter fee of about 12,000 (sponsor's figure).

**Miss:** the CV book was shared only 9 days before, not 14, because consent opt-ins were collected late; fix: consent at application, not at approval.

**Make-good:** attendance floor met (128 vs 100): none owed. Late CV book is not a contracted floor; we offer one extra newsletter job post anyway.

**Renewal options:** (A) Gold at the next hackathon, USD 10,000. (B) Annual hiring partner: 4 hackathons at Gold and Season Gold, list $4\times10{,}000 + 15{,}000 = 55{,}000$; we estimate separate purchase probabilities of 0.5 per hackathon and 0.6 for the Season, so $\Pi_{sep} \approx 20{,}000 + 9{,}000 - 2{,}500 - 2{,}300 = 24{,}200$; package costs about 1,000 to sell and 4,400 to fulfil, so $d_{max} = 1 - 29{,}600/55{,}000 = 46$ %. We offer 15 % (USD 46,750), 50 % at signing.`,
            explanation: md`A renewal is earned by honest evidence in the sponsor's own metric, and priced from the organiser's expected-value comparison.`,
            concepts: ["sh03.sponsor-report", "sh03.make-good", "sh03.renewal-economics", "sh03.multi-event-package", "sh03.fulfilment-tracking"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to Suhail's team why raising sponsor renewal from 50 % to 75 % matters more than adding three new sponsors.",
          keyPoints: [
            "Expected sponsor life is 1/(1 − renewal), so lifetime value doubles from 2 to 4 cycles",
            "The relationship is convex: each extra point of renewal is worth more than the last",
            "Renewals cost a fraction of the volunteer hours that new sponsors cost",
            "Fewer new sponsors needed per year frees capacity for more events",
            "Renewal is driven by the report in the sponsor's own metric, designed before the event",
          ],
        },
      ],
    },
  ],
  scenarios: [
    {
      id: "sh03-s2",
      title: "The disappointed platform sponsor",
      context: md`Illustrative. Two weeks after a Suhail hackathon, the developer-relations lead of a Gold platform sponsor (USD 10,000) replies to your report: "Nine active developers after 30 days? We were told to expect 30. I can't renew on this." The contract promised "an expected 20 to 40 builders using the API in their projects" and a 45-minute workshop. 14 projects used the API (about 40 builders); the workshop was cut to 20 minutes because the schedule slipped.`,
      start: "a",
      concepts: ["sh03.make-good", "sh03.sponsor-report"],
      nodes: {
        a: {
          md: md`What is your first response?`,
          choices: [
            { text: "Point out that the contract promised builders using the API, not 30 active developers after 30 days, and that this was met.", next: "b", score: 4, feedback: "Factually right, but it wins the argument and loses the sponsor. Her metric is activation." },
            { text: "Acknowledge the gap between her metric and what was promised, own the workshop cut, and propose a call to look at why activation was low and what would raise it.", next: "c", score: 9, feedback: "Separates what was contracted (met, except the workshop) from what she needs (activation), and moves to diagnosis." },
            { text: "Offer a 50 % cash refund to save the relationship.", next: "d", score: 2, feedback: "Teaches her that complaints produce cash, sets a precedent and costs Suhail money it does not have." },
          ],
        },
        b: {
          md: md`She replies: "Then the contract measured the wrong thing." The renewal window closes in a month.`,
          choices: [
            { text: "Propose a call to agree the right metric and how both sides will measure it next time.", next: "c", score: 7, feedback: "Recovers the relationship; the right metric goes into the next contract." },
            { text: "Let it go and find another platform sponsor.", score: 2, feedback: "Loses a sponsor who has already learned how Suhail works." },
          ],
        },
        c: {
          md: md`On the call she shares that builders who attended the full workshop activate at three times the rate of those who did not. The workshop was the shortfall.`,
          choices: [
            { text: "Apply a make-good for the cut workshop (a full 45-minute workshop plus an online follow-up session at the next event, at no charge), and propose that next time the contract states a 30-day activation target with her data shared, with the workshop in the first two hours.", score: 10, feedback: "Remedies the actual contractual miss with credit, aligns the next contract with her metric and fixes the cause." },
            { text: "Promise 30 active developers next time.", score: 3, feedback: "A guarantee on an outcome you do not control. Commit to inputs (workshop time, track, mentors) and report the outcome honestly." },
          ],
        },
        d: {
          md: md`She accepts the refund, then asks the same for the next event's shortfall.`,
          choices: [
            { text: "Reset: future remedies are credits tied to contracted floors.", score: 4, feedback: "Necessary, but the precedent is set." },
          ],
        },
      },
    },
  ],
  quiz: [
    {
      id: "sh03-l05-q1",
      type: "numeric",
      prompt: md`A sponsor contributes USD 8,000 per year and renews with probability 0.75. What is its expected lifetime contribution in USD (undiscounted)?`,
      answer: 32000,
      tolerance: { abs: 1 },
      unit: "USD",
      explanation: md`$8{,}000/(1-0.75) = 32{,}000$ USD: an expected 4 years.`,
      concepts: ["sh03.renewal-economics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh03-l05-q2",
      type: "mcq",
      prompt: "A sponsor contract promises at least 100 checked-in builders; 85 check in. What is the standard remedy?",
      options: ["A cash refund of 15 %", "A credit against the next event, as written in the make-good clause", "Nothing, because registrations exceeded 100", "Free tickets to an unrelated event"],
      answer: 1,
      explanation: md`Make-goods are credits or extra benefits agreed in advance; cash refunds are for cancellation. Registrations are not check-ins.`,
      concepts: ["sh03.make-good"],
      difficulty: 1,
    },
    {
      id: "sh03-l05-q3",
      type: "multi",
      prompt: "Which belong in a sponsor report? (Select all that apply.)",
      options: [
        "Check-ins with the number approved, so the show rate is visible",
        "The sponsor's outcome metric with its method",
        "A list of every attendee's email address",
        "What did not work and the fix",
        "Cost per outcome next to the sponsor's alternative cost",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Attendee emails are personal data and only consented, per-purpose contacts can be shared; the report uses aggregates.`,
      concepts: ["sh03.sponsor-report"],
      difficulty: 1,
    },
    {
      id: "sh03-l05-q4",
      type: "numeric",
      prompt: md`To keep 20 sponsors a year with a renewal rate of 60 %, how many new sponsors must you win each year?`,
      answer: 8,
      tolerance: { abs: 0.01 },
      unit: "sponsors",
      explanation: md`$20\times(1-0.6) = 8$ new sponsors a year. At 80 % renewal it would be 4.`,
      concepts: ["sh03.renewal-economics"],
      difficulty: 1,
    },
    {
      id: "sh03-l05-q5",
      type: "numeric",
      prompt: md`A package lists at USD 50,000. Selling separately has an expected net contribution of USD 25,000; the package costs USD 1,500 to sell and USD 3,500 to fulfil. What is the maximum discount in %?`,
      answer: 40,
      tolerance: { abs: 0.1 },
      unit: "%",
      explanation: md`$d_{max} = 1 - (25{,}000 + 1{,}500 + 3{,}500)/50{,}000 = 1 - 0.6 = 40$ %.`,
      concepts: ["sh03.multi-event-package"],
      difficulty: 2,
    },
    {
      id: "sh03-l05-q6",
      type: "order",
      prompt: "Order the renewal loop.",
      items: ["Contract with metrics and make-goods", "Fulfilment log", "Event and data collection", "Report within two weeks", "30 and 90 day follow-up", "Renewal conversation"],
      explanation: md`Each step depends on the one before; the report is only as good as the metrics agreed in the contract.`,
      concepts: ["sh03.fulfilment-tracking", "sh03.sponsor-report"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh03-l05-f1", front: "Sponsor lifetime value", back: md`$m/(1-\rho)$; expected life $1/(1-\rho)$ cycles.`, concepts: ["sh03.renewal-economics"] },
    { id: "sh03-l05-f2", front: "New sponsors needed per year", back: md`$n(1-\rho)$ for a roster of $n$ sponsors.`, concepts: ["sh03.renewal-economics"] },
    { id: "sh03-l05-f3", front: "Report deadline", back: "About two weeks after the event, then 30-day (activation) and 90-day (hires) updates.", concepts: ["sh03.sponsor-report"] },
    { id: "sh03-l05-f4", front: "Make-good remedy", back: "Credit or extra benefits at the next event for a missed contracted floor; cash only if the event is cancelled.", concepts: ["sh03.make-good"] },
    { id: "sh03-l05-f5", front: "Maximum package discount", back: md`$d_{max} = 1 - (\Pi_{sep} + c_{pkg} + f_{pkg})/L$; offer far less.`, concepts: ["sh03.multi-event-package"] },
    { id: "sh03-l05-f6", front: "Fulfilment log row", back: "Benefit, sponsor, owner, due date, status, evidence link.", concepts: ["sh03.fulfilment-tracking"] },
  ],
};

export default lesson;
