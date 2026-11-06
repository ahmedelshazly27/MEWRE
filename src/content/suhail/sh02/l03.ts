import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh02-l03",
  title: "The participant funnel: registration, acceptance, no-shows and team formation",
  summary:
    "Free events lose a large share of accepted participants on the day. This lesson models the funnel from page view to demo, computes how many people to accept with overbooking and a binomial safety margin, shows how a reconfirmation step changes the arithmetic, and covers selection, team formation, diversity and access so the room you fill is the room you wanted.",
  minutes: 75,
  objectives: [
    "Model the participant funnel from registration to demo and identify where it leaks",
    "Compute the number of acceptances for a seat capacity using expected show rate and a binomial safety margin",
    "Quantify how a reconfirmation step and a waitlist change the overbooking decision",
    "Design a selection process and team formation that produce balanced, complete teams",
    "Plan for diversity and access: cost, travel, gender balance, language, disability and minors",
  ],
  concepts: [
    { id: "sh02.participant-funnel", name: "Participant funnel", description: "The stages from event page view to registration, completed application, acceptance, reconfirmation, check-in, team formation, submission and demo, each with a conversion rate that the organiser measures and improves.", competency: "sh-events", related: ["sh02.show-rate", "sh02.overbooking"] },
    { id: "sh02.show-rate", name: "Show rate (attendance rate)", description: "The share of accepted participants who actually check in. For free events it is often far below 100 %, and it varies with commitment devices such as reconfirmation, deposits and selective acceptance.", competency: "sh-events", related: ["sh02.overbooking"] },
    { id: "sh02.overbooking", name: "Overbooking with a safety margin", description: "Accepting more people than seats so that expected attendance fills the venue, sized so that the probability of exceeding capacity stays below a chosen risk, using the binomial mean and standard deviation.", competency: "sh-events", related: ["sh02.show-rate", "sh02.participant-funnel"] },
    { id: "sh02.team-formation", name: "Team formation", description: "How participants become teams: pre-formed teams, a structured matching session or organiser assignment, with rules on size (often 2 to 5) and skill mix so that teams can actually ship.", competency: "sh-events", related: ["sh02.participant-funnel"] },
    { id: "sh02.access-diversity", name: "Diversity and access", description: "Deliberate design so the room reflects the talent pool: free entry, travel grants, outreach to under-represented groups, a code of conduct, accessible venues, bilingual communication and rules for minors.", competency: "sh-events", related: ["sh02.participant-funnel"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Filling a room with the right people",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Suhail's hackathons are planned to be free for builders, which is good for access and bad for attendance: people who paid nothing lose nothing by not coming. If you accept exactly as many people as you have seats, you will demo to a half-empty room and waste catering. If you overbook carelessly, you will turn people away at a door guarded by a fire-safety limit. The arithmetic in this lesson is what you will use for every event.`,
        },
        {
          kind: "md",
          md: md`### The funnel

Every stage leaks. Measure each conversion from the first event; your own numbers will replace the illustrative ones below within two or three events.

| Stage | Illustrative conversion | Typical leak cause |
|---|---|---|
| Event page view to registration started | 10 to 20 % | Unclear who it is for, long form |
| Registration started to completed application | 60 to 80 % | Form asks too much, no Arabic option |
| Completed to accepted | your choice | Selection (see below) |
| Accepted to reconfirmed (if you ask) | 65 to 85 % | Plans changed, never really committed |
| Accepted to checked in (show rate) | 40 to 70 % for free events | No cost of not coming, weather, a competing event |
| Checked in to submitted project | 75 to 95 % | Team collapsed, scope too big |
| Submitted to demoed | 90 to 100 % | Exhaustion, nerves |

These ranges are illustrative working assumptions for this module, not published benchmarks. The show-rate range for free events is wide and depends strongly on how selective you are and on whether you reconfirm.

### Overbooking: the expected value

If seats for participants are $C$ and the show rate is $s$, the naive acceptance count is $N = C/s$. With 120 seats and $s = 0.55$, $N = 120/0.55 = 218$.

The problem: 218 acceptances give an **expected** attendance of $218 \times 0.55 = 119.9$, so about half the time more than 120 people turn up. A fire-safety capacity is not a target; it is a limit.

### Overbooking: the safety margin

Treat each accepted person as an independent yes/no with probability $s$. Attendance is then binomial with mean $Ns$ and standard deviation $\sqrt{N s (1-s)}$. To keep the probability of exceeding capacity below about 5 %, require the mean plus 1.645 standard deviations to fit:`,
        },
        { kind: "equation", formula: "sh02-overbook" },
        {
          kind: "md",
          md: md`Solve it as a quadratic in $x = \sqrt{N}$: $s x^2 + z\sqrt{s(1-s)}\,x - C = 0$, so $x = \dfrac{-z\sqrt{s(1-s)} + \sqrt{z^2 s(1-s) + 4sC}}{2s}$ and $N = x^2$, rounded **down**.

For $C = 120$, $s = 0.55$, $z = 1.645$: $\sqrt{s(1-s)} = 0.4975$, $z\sqrt{s(1-s)} = 0.818$, $x = (-0.818 + \sqrt{0.669 + 264})/1.10 = (-0.818 + 16.269)/1.10 = 14.046$, $N = 197.3$, so accept **197**. Check: mean $= 108.4$, $\sigma = 6.98$, mean $+ 1.645\sigma = 119.8 \le 120$.

The safety margin costs you about 11 empty seats on an average day. That is the price of not turning people away.

**The independence assumption is optimistic.** Attendance is correlated: a sandstorm, a football final, a public holiday announced late or a competing event moves everyone at once. Correlation widens the real spread, so treat 197 as an upper bound and keep a buffer in the venue (standing room for spectators, overflow tables) rather than squeezing harder.

### Raising the show rate instead

A higher show rate is worth more than clever overbooking, because it shrinks both the mean gap and the uncertainty. Levers:

- **Reconfirmation 72 to 48 hours before:** "Reply YES to keep your seat; unconfirmed seats go to the waitlist." People who reconfirm show at a much higher rate; those who do not can be replaced.
- **Selective acceptance:** an application with a real question ("what will you build, and with whom?") filters out casual sign-ups. Selection itself is a commitment device.
- **Small refundable deposit:** common at some events; it raises show rates but filters out students and lower-income builders. For Suhail's access goals, use it only for oversubscribed flagship events, if at all, and waive it on request.
- **Team registration:** people registered as a team show up for each other.
- **Clear logistics and reminders** in Arabic and English, with the start time, location pin and what to bring.

The combined show rate with reconfirmation is a weighted average:`,
        },
        { kind: "equation", formula: "sh02-show-rate-reconfirm" },
        {
          kind: "chart",
          chart: "bar",
          title: "Illustrative funnel for a 120-seat Suhail hackathon (with reconfirmation)",
          xKey: "stage",
          yLabel: "People",
          series: [{ key: "people", label: "People at stage" }],
          data: [
            { stage: "Registered", people: 520 },
            { stage: "Completed", people: 400 },
            { stage: "Accepted", people: 157 },
            { stage: "Reconfirmed", people: 118 },
            { stage: "Checked in", people: 110 },
            { stage: "Submitted", people: 96 },
            { stage: "Demoed", people: 92 },
          ],
          caption: "Illustrative numbers only. Acceptances are sized with the reconfirmation show rate of 0.70 and the 5 % overflow risk (see the faded example). People counts after check-in are individuals in submitting and demoing teams.",
        },
        {
          kind: "md",
          md: md`### Selection

Approval-gated registration (the {Tech: Europe} pattern) lets you shape the room. Decide the target mix before reading applications:

- **Skill mix:** a team that can ship needs at least one person who can build a back end or model pipeline and one who can make a usable front end; designers and domain experts improve projects but cannot carry them alone. A target such as 60 % engineers, 20 % designers or product, 20 % domain or business (illustrative) avoids a room of pitchers.
- **Experience:** reserve a share for first-time hackers and students; they are the community's future and they return most.
- **Geography and gender:** set targets, track them at application, acceptance and check-in, and fix the stage where the gap opens.
- **Blind first pass:** score the application answers without names to reduce bias, then check the mix.

### Team formation

Three methods, often combined:

1. **Pre-formed teams** apply together. High show rate and fast start; risks a room of closed groups.
2. **Matching session** at kick-off (20 to 40 minutes): people pitch ideas in 30 seconds, then form teams around ideas with skill tags on badges (colour or sticker for back end, front end, design, domain). Works well with a facilitator and a cut-off time.
3. **Online matching before the event:** a Discord channel or a spreadsheet where solo participants post skills and ideas a week before.

Rules: team size 2 to 5 (4 is the sweet spot for 24 hours), a deadline for team registration (for example hour 2), and an organiser who actively places solo participants. The number of teams drives judging time (Lesson 5), so cap it.

### Diversity and access

- **Cost:** free entry, food included, travel grants for builders from other cities or countries for flagship events (budget them per head).
- **Gender balance:** women-majority outreach partners, women mentors and judges visible on the event page, a safe overnight setup (separate rest areas), and a code of conduct with a named, reachable response team.
- **Language:** application, reminders and kick-off in Arabic and English; allow demos in either language and make sure judges understand both or have help.
- **Disability:** step-free venue access, accessible toilets, a quiet room, and an application question asking what support people need.
- **Minors:** if under-18s may join (common at university events), require guardian consent and keep them out of overnight sessions without a guardian; or set 18+ for overnight events.
- **Prayer and dietary needs:** a prayer room, halal food as the default, vegetarian and allergy options flagged at registration (Lesson 6).`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Sizing acceptances for a 120-seat event",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "How many to accept, and what does the margin cost?",
          given: md`Illustrative Suhail 24-hour hackathon. Venue fire-safety limit 150 people; staff, volunteers, mentors, judges and sponsors take 30, so participant seats $C = 120$. Assumed show rate without reconfirmation $s = 0.55$ (illustrative for a free, approval-gated event). Acceptable risk of exceeding seats: about 5 % ($z = 1.645$). 400 completed applications.`,
          steps: [
            { md: md`**Naive:** $N = C/s = 120/0.55 = 218$. Expected attendance $= 119.9$: over capacity roughly half the time.` },
            { md: md`**With safety margin:** $\sqrt{s(1-s)} = \sqrt{0.2475} = 0.4975$; $z\sqrt{s(1-s)} = 0.818$. $x = (-0.818 + \sqrt{0.818^2 + 4(0.55)(120)})/(2 \times 0.55) = (-0.818 + 16.269)/1.10 = 14.046$; $N = 14.046^2 = 197.3$, accept **197**.` },
            { md: md`**Check:** $\mu = 197 \times 0.55 = 108.4$; $\sigma = \sqrt{197 \times 0.2475} = 6.98$; $\mu + 1.645\sigma = 108.4 + 11.5 = 119.8 \le 120$. With 198, the check gives 120.4: over.` },
            { md: md`**Cost of the margin:** about $120 - 108 = 12$ empty seats on an average day, about 10 % of capacity. Catering: order for expected attendance plus staff plus about 10 %, not for 197.` },
          ],
          result: md`Accept 197 of 400 (49 %). Expect about 108 participants; the probability of more than 120 is about 5 %, under the independence assumption. Keep spare floor space because real attendance is correlated.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Now add a reconfirmation step",
          given: md`Same event. You email all accepted participants 72 hours before: illustratively, 75 % reconfirm. Reconfirmed people show at 90 %; non-confirmers at 10 % (some turn up anyway). Seats $C = 120$, $z = 1.645$.`,
          steps: [
            { md: md`Combined show rate: $s = r s_r + (1-r) s_n = 0.75(0.90) + 0.25(0.10)$.` },
            { md: md`$= 0.675 + 0.025 =$ **0.70**.`, hidden: true, check: { prompt: "Combined show rate (fraction)", answer: 0.7, tolerance: { abs: 0.005 } } },
            { md: md`Safety-margin acceptances: $\sqrt{s(1-s)} = \sqrt{0.21} = 0.458$; $z\sqrt{s(1-s)} = 0.754$; $x = (-0.754 + \sqrt{0.569 + 4(0.70)(120)})/1.40$.` },
            { md: md`$= (-0.754 + 18.346)/1.40 = 12.566$; $N = 157.9$, accept **157**. Check: $\mu = 109.9$, $\sigma = 5.74$, $\mu + 1.645\sigma = 119.3$.`, hidden: true, check: { prompt: "Acceptances with reconfirmation (round down)", answer: 157, tolerance: { abs: 1 } } },
          ],
          result: md`Accept 157 instead of 197: 40 fewer acceptances for the same expected attendance (about 110) and a tighter spread ($\sigma$ 5.7 instead of 7.0). The 40 freed acceptances can go to a waitlist that fills seats released by non-confirmers, so fewer good applicants are rejected outright.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running registration in practice",
      blocks: [
        {
          kind: "md",
          md: md`### How it is done

- **Tools:** a Luma event page with approval-gated registration and custom questions; an export to a spreadsheet for scoring; email and WhatsApp reminders; a Discord server for team matching and announcements. Check-in by QR code from Luma or a printed list.
- **Timeline (illustrative for a 24-hour event):** page live 6 weeks before; applications close 2 weeks before; acceptances sent 10 days before in two waves (first wave at the safety-margin number, second wave from the waitlist after reconfirmation); reconfirmation request 72 hours before; final reminder with logistics 24 hours before; walk-ins accepted at the door only after a set time (for example 30 minutes after doors open) if seats remain.
- **Data protection:** collect only what you use. State what will be shared with sponsors (nothing without opt-in), how long you keep it, and who to contact. Saudi Arabia, the UAE, Egypt and other countries in the region have personal data protection laws; check the one that applies to the event's location and to Suhail's entity.
- **After each event:** record every funnel conversion in one sheet. After three events you will have your own show rate by city and format, and the guesswork in this lesson disappears.

### What goes wrong

- **Accepting everyone** because rejection feels unkind. The room fills with people who will not ship, and the show rate collapses because acceptance meant nothing.
- **One acceptance wave.** You cannot react to the reconfirmation numbers.
- **Teams formed by friendship only.** Four designers or four back-end engineers rarely ship a demo.
- **Gender or nationality gaps fixed only at the door.** By then they are fixed in the application pool; fix outreach instead.`,
        },
        {
          kind: "checklist",
          title: "Registration form: minimum useful questions",
          items: [
            "Name, email, phone (for WhatsApp reminders), city and country",
            "Role and main skills (tick boxes: back end, front end, ML, design, product, domain)",
            "Experience level and number of previous hackathons",
            "Team status: have a team (names), looking for one, or prefer to be matched",
            "One real question: what would you like to build, and why does it matter to someone?",
            "GitHub, portfolio or LinkedIn (optional)",
            "Dietary needs, accessibility needs, T-shirt size",
            "Separate opt-in: share my CV and profile with hiring sponsors",
            "Agreement to the code of conduct and participant terms",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "Fire-safety capacity is not negotiable",
          md: md`The venue's certified occupancy includes staff, volunteers, mentors, judges, sponsors and caterers, not just participants. If people turn up beyond it, you turn them away politely with a coffee voucher and a priority place at the next event. A packed room that breaches the limit can close the event and end the venue relationship.`,
        },
        {
          kind: "question",
          question: {
            id: "sh02-l03-p1",
            type: "short",
            prompt: md`**Produce the registration and acceptance plan for a Suhail hackathon** at a venue with a certified occupancy of 180 people. Include: (1) how many seats go to participants and why; (2) your assumed show rate with and without reconfirmation, and the acceptance numbers for each at about 5 % overflow risk, with working; (3) the timeline from page launch to doors; (4) selection criteria and target mix; (5) your team-formation method and team-size rule; (6) three access measures.`,
            rubric: [
              "Participant seats deduct staff, volunteers, mentors, judges, sponsors and caterers from occupancy, with an explicit count",
              "Acceptance numbers use the binomial safety-margin formula correctly (or an equivalent), with working, rounded down, and the reconfirmation show rate computed as a weighted average",
              "Timeline includes two acceptance waves, a reconfirmation step and a waitlist rule",
              "Selection criteria and a target mix (skills, experience, gender or geography) are stated and measurable",
              "Team formation method and size rule are concrete; access measures are specific (cost, language, safety, disability or minors)",
            ],
            modelAnswer: md`**1. Seats:** occupancy 180. Staff and volunteers 14, mentors 8, judges 6, sponsor representatives 6, caterers and security 6: 40. Participant seats $C = 140$.

**2. Acceptances (illustrative show rates):** without reconfirmation $s = 0.55$: $z\sqrt{s(1-s)} = 0.818$; $x = (-0.818 + \sqrt{0.669 + 4(0.55)(140)})/1.10 = (-0.818 + 17.569)/1.10 = 15.228$; $N = 231.9$, accept 231 (check $127.1 + 1.645 \times 7.56 = 139.5$). With reconfirmation ($r = 0.75$, $s_r = 0.9$, $s_n = 0.1$): $s = 0.70$; $x = (-0.754 + \sqrt{0.569 + 392})/1.40 = (-0.754 + 19.813)/1.40 = 13.614$; $N = 185.3$, accept 185 (check $129.5 + 1.645 \times 6.23 = 139.8$). I use the reconfirmation plan.

**3. Timeline:** page live at T minus 6 weeks; applications close T minus 2 weeks; wave 1 of 185 acceptances at T minus 10 days; reconfirmation at T minus 72 h; unconfirmed seats released to a ranked waitlist at T minus 48 h (wave 2, accepted at the reconfirmed show rate); final logistics message T minus 24 h; walk-ins only from 30 minutes after doors if the count allows.

**4. Selection:** blind first pass on the "what would you build" answer (1 to 5), then a mix check: about 60 % engineers, 20 % design or product, 20 % domain; at least 25 % first-time hackers; women at least 30 % of acceptances with outreach through women-in-tech groups to reach it; no more than 50 % from one university or company.

**5. Teams:** pre-formed teams of 2 to 5 allowed; solo participants matched in a 30-minute session at kick-off with skill-coloured badges; organiser places remaining solos by hour 2; maximum 36 teams.

**6. Access:** free entry with meals; application and kick-off in Arabic and English; a separate women's rest area overnight and a named code-of-conduct team reachable by phone; step-free venue confirmed; prayer room on site.`,
            explanation: md`Graded against the rubric. Check your arithmetic: the safety-margin acceptances must pass the mean plus 1.645 sigma test at the seat count.`,
            concepts: ["sh02.overbooking", "sh02.show-rate", "sh02.participant-funnel", "sh02.team-formation", "sh02.access-diversity"],
            difficulty: 3,
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to the venue manager why you accepted 157 people for 120 seats and why that is safe.",
          keyPoints: [
            "Free events have show rates well below 100 %, so accepting exactly the seat count leaves the room part-empty",
            "Attendance is roughly binomial: the expected number is acceptances times show rate, with a known spread",
            "Acceptances are sized so that the expected number plus a safety margin (about 1.645 standard deviations) fits the seats",
            "Reconfirmation raises the show rate and narrows the spread; unconfirmed seats go to a waitlist",
            "The certified occupancy includes staff and guests, and there is a plan for turning people away if needed",
          ],
        },
        { kind: "sources", refs: ["sh02-r1", "sh02-r2", "sh02-r7"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh02-l03-q1",
      type: "numeric",
      prompt: md`A venue has 90 participant seats and you expect a show rate of 0.60. What is the naive acceptance count $N = C/s$?`,
      answer: 150,
      tolerance: { abs: 0.5 },
      explanation: md`$N = 90/0.60 = 150$. At this number attendance exceeds 90 about half the time, so the safety-margin number is lower.`,
      concepts: ["sh02.overbooking"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh02-l03-q2",
      type: "numeric",
      prompt: md`You accept 200 people with show rate 0.5. What is the standard deviation of attendance under the binomial model?`,
      answer: 7.07,
      tolerance: { abs: 0.05 },
      unit: "people",
      explanation: md`$\sigma = \sqrt{N s(1-s)} = \sqrt{200 \times 0.5 \times 0.5} = \sqrt{50} = 7.07$.`,
      concepts: ["sh02.overbooking", "sh02.show-rate"],
      difficulty: 2,
    },
    {
      id: "sh02-l03-q3",
      type: "numeric",
      prompt: md`80 % of accepted people reconfirm. Reconfirmed people show at 92 %; non-confirmers at 15 %. What is the combined show rate? (fraction)`,
      answer: 0.766,
      tolerance: { abs: 0.002 },
      explanation: md`$s = 0.8(0.92) + 0.2(0.15) = 0.736 + 0.030 = 0.766$.`,
      concepts: ["sh02.show-rate"],
      difficulty: 2,
    },
    {
      id: "sh02-l03-q4",
      type: "mcq",
      prompt: "Why is the binomial safety margin likely to understate the real risk of overflow?",
      options: [
        "Because show rates are always above 90 %",
        "Because attendance decisions are correlated (weather, holidays, competing events), which widens the real spread",
        "Because the binomial distribution has no variance",
        "Because staff do not count toward capacity",
      ],
      answer: 1,
      explanation: md`The binomial model assumes independent decisions. Shared shocks move many people at once, so keep spare floor space.`,
      concepts: ["sh02.overbooking"],
      difficulty: 2,
    },
    {
      id: "sh02-l03-q5",
      type: "order",
      prompt: "Put the registration timeline in order.",
      items: [
        "Event page live with approval-gated registration",
        "Applications close and are scored",
        "First acceptance wave",
        "Reconfirmation request 72 hours before",
        "Waitlist wave for unconfirmed seats",
        "Final logistics reminder 24 hours before",
      ],
      explanation: md`Two waves around a reconfirmation step let you react to real commitment rather than guess.`,
      concepts: ["sh02.participant-funnel"],
      difficulty: 1,
    },
    {
      id: "sh02-l03-q6",
      type: "decision",
      prompt: md`Applications for a flagship event are 85 % men. Acceptance is in five days. What is the most effective response?`,
      options: [
        { text: "Accept every woman who applied regardless of the application.", score: 0.4, feedback: "Improves the number this time but treats selection inconsistently and does not fix the pipeline." },
        { text: "Apply the same criteria with a stated target mix, extend applications by a few days with targeted outreach through women-in-tech groups and women mentors, and fix outreach for the next event.", score: 1, feedback: "Addresses the stage where the gap opens (the application pool) while keeping selection fair." },
        { text: "Do nothing: the pool is what it is.", score: 0.1, feedback: "The pool reflects your outreach, not the talent available." },
      ],
      explanation: md`Measure the gap at each funnel stage and fix the stage where it opens; most gaps open at outreach.`,
      concepts: ["sh02.access-diversity", "sh02.participant-funnel"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh02-l03-f1", front: "Naive acceptances", back: "$N = C/s$: fills the room on average but overflows about half the time.", concepts: ["sh02.overbooking"] },
    { id: "sh02-l03-f2", front: "Safety-margin acceptances", back: "Largest $N$ with $Ns + z\\sqrt{Ns(1-s)} \\le C$; $z = 1.645$ for about 5 % overflow risk.", concepts: ["sh02.overbooking"] },
    { id: "sh02-l03-f3", front: "Combined show rate with reconfirmation", back: "$s = r s_r + (1-r) s_n$. Illustrative: 0.75(0.9) + 0.25(0.1) = 0.70.", concepts: ["sh02.show-rate"] },
    { id: "sh02-l03-f4", front: "Commitment devices that raise show rate", back: "Reconfirmation, selective applications, team registration, clear reminders; deposits work but hurt access.", concepts: ["sh02.show-rate"] },
    { id: "sh02-l03-f5", front: "Team formation methods", back: "Pre-formed teams, kick-off matching session with skill badges, online matching before the event; size 2 to 5, 4 ideal for 24 h.", concepts: ["sh02.team-formation"] },
    { id: "sh02-l03-f6", front: "Certified occupancy includes...", back: "Everyone in the room: participants, staff, volunteers, mentors, judges, sponsors, caterers, security.", concepts: ["sh02.participant-funnel"] },
  ],
};

export default lesson;
