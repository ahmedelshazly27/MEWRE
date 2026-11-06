import { md, type Question } from "../../schema";

const exam: Question[] = [
  {
    id: "sh02-x1",
    type: "numeric",
    prompt: md`Venue occupancy is 160. Staff, volunteers, mentors, judges, sponsors and caterers total 40. The expected show rate is 0.60 and you accept a 5 % overflow risk ($z = 1.645$). What is the largest number of acceptances?`,
    answer: 181,
    tolerance: { abs: 1 },
    unit: "people",
    explanation: md`$C = 120$. $\sqrt{s(1-s)} = \sqrt{0.24} = 0.490$; $z\sqrt{s(1-s)} = 0.806$. $x = (-0.806 + \sqrt{0.650 + 4(0.6)(120)})/1.2 = (-0.806 + 16.990)/1.2 = 13.487$; $N = 181.9$, rounded down to **181**. Check: $181 \times 0.6 = 108.6$, $\sigma = \sqrt{181 \times 0.24} = 6.59$, $108.6 + 10.84 = 119.4 \le 120$; with 182: $109.2 + 10.87 = 120.07$, over. The naive $120/0.6 = 200$ would overflow about half the time.`,
    concepts: ["sh02.overbooking", "sh02.show-rate"],
    difficulty: 3,
  },
  {
    id: "sh02-x2",
    type: "numeric",
    prompt: md`An illustrative event has 140 people on site, 2 Mbps average per person, headroom 1.5, and you need to move 25 teams' 6 GB model downloads. With 500 Mbps available for downloads, how many minutes does the bulk download take?`,
    answer: 40,
    tolerance: { abs: 0.5 },
    unit: "min",
    explanation: md`Uplink for normal use: $140 \times 2 \times 1.5 = 420$ Mbps. Bulk: $D = 150$ GB; $t = 8 \times 150/0.5 = 2{,}400$ s $= 40$ min. Unless the line is well above 1 Gbps, the bulk download blocks normal use: provide hosted endpoints or a local cache.`,
    concepts: ["sh02.network-capacity"],
    difficulty: 2,
  },
  {
    id: "sh02-x3",
    type: "numeric",
    prompt: md`Kuwait supply 240 V, 16 A circuits, continuous-load factor 0.8, 100 W per participant seat, no diversity per circuit. What is the maximum number of whole seats per circuit?`,
    answer: 30,
    tolerance: { abs: 0 },
    unit: "seats",
    explanation: md`$P = 240 \times 16 \times 0.8 = 3{,}072$ W; $3{,}072/100 = 30.7$, so 30 seats. In practice group 24 to 25 per circuit for margin.`,
    concepts: ["sh02.power-capacity"],
    difficulty: 2,
  },
  {
    id: "sh02-x4",
    type: "decision",
    prompt: md`Two weeks before Suhail's first hackathon, the largest sponsor (40 % of the budget) asks that its API be mandatory for every team "to make the sponsorship worth it". What do you do?`,
    options: [
      { text: "Agree: the event cannot run without this sponsor.", score: 0.2, feedback: "Forces token integrations, narrows who can win, and confirms the concentration problem: one sponsor now shapes the event." },
      { text: "Offer a stronger sponsor track (bigger prize, load-bearing criteria, mentors on the floor, generous credits) and a showcase in the sponsor report, keep the main challenge open, and start reducing concentration for the next event.", score: 1, feedback: "Serves the sponsor's real goal (depth of use) without distorting the event, and fixes the structural risk." },
      { text: "Drop the sponsor.", score: 0.3, feedback: "Overreaction two weeks out; the request can be redirected into a design that works for everyone." },
    ],
    explanation: md`Sponsor goals are best met through load-bearing tracks, credits and mentors; MLH's guidance to cap the top tier at about 25 % exists to avoid exactly this leverage.`,
    concepts: ["sh02.sponsor-track", "sh02.three-sided-exchange"],
    difficulty: 2,
  },
  {
    id: "sh02-x5",
    type: "numeric",
    prompt: md`Rubric weights: technical 0.35, usefulness 0.25, originality 0.15, Arabic constraint 0.15, demo 0.10. A team scores 4, 5, 3, 4, 3. What is its weighted score?`,
    answer: 4,
    tolerance: { abs: 0.01 },
    explanation: md`$0.35 \times 4 + 0.25 \times 5 + 0.15 \times 3 + 0.15 \times 4 + 0.10 \times 3 = 1.40 + 1.25 + 0.45 + 0.60 + 0.30 = 4.00$.`,
    concepts: ["sh02.judging-rubric"],
    difficulty: 1,
  },
  {
    id: "sh02-x6",
    type: "numeric",
    prompt: md`Panel A: mean 3.1, standard deviation 0.5. Panel B: mean 3.9, standard deviation 0.7. Team P (panel A) scores 3.9; team Q (panel B) scores 4.6. What is P's z-score minus Q's z-score?`,
    answer: 0.6,
    tolerance: { abs: 0.01 },
    explanation: md`$z_P = (3.9 - 3.1)/0.5 = 1.6$; $z_Q = (4.6 - 3.9)/0.7 = 1.0$; difference $0.6$. P is stronger relative to its panel even though its raw score is lower, assuming random assignment.`,
    concepts: ["sh02.score-normalisation"],
    difficulty: 2,
  },
  {
    id: "sh02-x7",
    type: "numeric",
    prompt: md`Suhail's events bring $R c = 80$ new members a month. Retention is 0.78 and referral 0.04. By how many members does the steady state rise if retention improves to 0.83?`,
    answer: 171,
    tolerance: { abs: 2 },
    unit: "members",
    explanation: md`Before: $80/(1 - 0.78 - 0.04) = 80/0.18 = 444$. After: $80/(1 - 0.83 - 0.04) = 80/0.13 = 615$. Increase about **171** members (38 %) from five points of retention.`,
    concepts: ["sh02.community-steady-state"],
    difficulty: 2,
  },
  {
    id: "sh02-x8",
    type: "decision",
    prompt: md`You plan Suhail's first Riyadh hackathon as a free, invite-only, overnight event. A volunteer says permits are only needed for ticketed events, so you can skip them. What do you do?`,
    options: [
      { text: "Skip permits: it is free and invite-only.", score: 0.1, feedback: "The research brief explicitly lists this question as unverified. An overnight event with 150 people closed by authorities would be far worse than a delay." },
      { text: "Ask the venue and a licensed host partner in writing which permits apply (GEA, SCEGA or other), consider having the licensed partner as the organiser of record, and hold the public date until it is confirmed.", score: 1, feedback: "Treats the unknown as an unknown and uses the usual route (a licensed host) to close it." },
      { text: "Move the event to an online format to avoid the question.", score: 0.4, feedback: "Avoids the risk but gives up the goal of an in-person flagship; useful only as a fallback." },
    ],
    explanation: md`Secondary sources say public or ticketed events need a GEA permit; hackathon-specific rules were not found. Confirm, do not assume.`,
    concepts: ["sh02.permit-path", "sh02.regional-partners"],
    difficulty: 2,
  },
  {
    id: "sh02-x9",
    type: "multi",
    prompt: "Which design choices raise the share of teams that ship and demo a working product? (Select all that apply.)",
    options: [
      "A rubric that weights technical execution highly and is shared at kick-off",
      "A mentor scope-cutting round on the morning of day two",
      "One very large grand prize",
      "Team formation with skill badges and a team deadline",
      "Problem statements tested by a volunteer engineer in 3 to 4 hours with the provided data",
    ],
    answer: [0, 1, 3, 4],
    explanation: md`Shipping is driven by incentives (rubric), scope control (mentors, tested problems) and balanced teams. A single large prize mainly changes who enters.`,
    concepts: ["sh02.judging-rubric", "sh02.team-formation", "sh02.theme-design", "sh02.run-of-show"],
    difficulty: 2,
  },
  {
    id: "sh02-x10",
    type: "short",
    prompt: md`**Integrative:** Suhail will run a 24-hour AI hackathon in Kuwait in spring 2027 with 100 participant seats, an imagined AI API sponsor and an imagined hiring sponsor. In at most one page, give: the date and why; the acceptance number with working; the network and power headline spec; the rubric weights; the two sponsors' headline metrics; and the 60-day retention target. All numbers illustrative.`,
    rubric: [
      "Date avoids Ramadan, Eid and exams, uses the Friday to Saturday weekend and starts after the Friday midday prayer",
      "Acceptance number uses the binomial safety-margin method (with or without reconfirmation) and passes the check",
      "Network (uplink, access points, large-download plan, backup) and power (circuit capacity, seats per circuit, separate circuits) are computed correctly",
      "Rubric weights sum to 1 and favour working products; sponsor metrics are outcome metrics agreed in advance (activation, cost per hire)",
      "Retention target is numeric and justified with the steady-state model; nothing is presented as real traction",
    ],
    modelAnswer: md`**Date:** Friday 23 April 2027, 16:00 to Saturday 18:00: after Eid al-Fitr (expected early March, approximate), before May exams, Eid al-Adha (expected mid-May) and summer; kick-off after the Friday midday prayer.

**Acceptances:** reconfirmation plan, $s = 0.75(0.9) + 0.25(0.1) = 0.70$, $C = 100$: $x = (-0.754 + \sqrt{0.569 + 280})/1.40 = 11.426$, $N = 130.5$, accept 130 (check $91.0 + 1.645 \times 5.22 = 99.6$).

**Network:** 125 people on site, $125 \times 2 \times 1.5 = 375$ Mbps, so 1 Gbps symmetric; 300 devices, 10 access points plus a spare; hosted model endpoints and a local cache; two 5G backups. **Power:** 240 V, 16 A, 0.8: 3,072 W per circuit; 20 seats per circuit, 5 participant circuits; separate circuits for coffee (2), catering, AV, network rack on UPS, one spare.

**Rubric:** technical 0.30, usefulness 0.25, originality 0.20, Arabic constraint 0.15, demo 0.10, anchored and shared at kick-off.

**Sponsors:** API sponsor: developers active at 30 days from the sponsor's data, and load-bearing projects; hiring sponsor: opted-in candidates, interviews and cost per hire at 90 days against its recruiter-fee alternative.

**Retention:** 50 % of attendees active at 60 days. With $Rc = 100$, $f = 0.05$, raising retention from 0.80 to 0.85 lifts $M^*$ from about 667 to 1,000: follow-up is the cheapest growth lever.`,
    explanation: md`Graded against the rubric. This is the core of the capstone plan for a first Suhail hackathon.`,
    concepts: ["sh02.regional-calendar", "sh02.overbooking", "sh02.network-capacity", "sh02.power-capacity", "sh02.judging-rubric", "sh02.sponsor-outcome-metrics", "sh02.community-steady-state"],
    difficulty: 3,
  },
];

export default exam;
