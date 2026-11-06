import { md } from "../../schema";

const cheatSheet = md`# SH02 Hackathon design and operations: cheat sheet

## Conventions

- **Numbers:** every Suhail number is **illustrative**; nothing has launched yet.
- **Currency:** USD unless stated.
- **Order of work:** goal statement, challenge pack, funnel, operations, judging and follow-up, regional checks.

## Goals and formats

- **Three parties:** builders (learning, prizes, jobs), sponsors (adoption, hiring, brand, scouting), organiser (community, content, revenue).
- **Sponsor metrics:** cost per activated developer and cost per hire, with counting agreed in the contract.
- **Duration** from the depth of project needed; **size** from venue and mentor staffing.
- **{Tech: Europe} pattern:** free, approval-gated (e.g. 90 cap), 2 to 3 events a month, partner credits, sponsor prizes, Luma and Discord.
- **MLH pattern:** league of member events, one playbook and code of conduct; three tiers, top tier at most 25 % of budget.

## Challenge design

- **Problem statement:** a user, a constraint, a data source; tested buildable in 3 to 4 hours.
- **Sponsor track:** load-bearing test (would it work without the product?).
- **Prizes:** expected cash per builder is small; no single prize larger than the rest combined; one prize first-timers can win.
- **Rubric:** weights sum to 1, anchors for 1, 3 and 5, shared at kick-off.
- **Fresh build:** repository after kick-off, specifics revealed at kick-off, declared prior code, commit history check, judge question.
- **IP default:** teams own their work; state any assignment before registration.

## Funnel

| Item | Value (illustrative) |
|---|---|
| Show rate, free event | 0.40 to 0.70 |
| Reconfirmation | $s = 0.75(0.9) + 0.25(0.1) = 0.70$ |
| Acceptances for 120 seats, $s = 0.55$ | naive 218, safety margin 197 |
| Acceptances for 120 seats, $s = 0.70$ | safety margin 157 |
| Team size | 2 to 5, 4 ideal for 24 h |

- **Occupancy** includes everyone in the room.
- **Two acceptance waves** around reconfirmation, then a waitlist.

## Operations

| Item | Value (illustrative) |
|---|---|
| Uplink | $N \times 2$ Mbps $\times 1.5$; 150 people: 450 Mbps, buy 1 Gbps |
| Access points | 2 to 3 devices per person, about 30 clients per access point |
| Bulk download | 30 teams x 8 GB at 400 Mbps = 80 min |
| Circuit, 16 A at 230 V, 0.8 | 2,944 W (240 V: 3,072 W) |
| Load per seat | 100 W; 20 to 24 seats per circuit |
| Water | about 3 L per person per day |
| Volunteers | about 1 per 10 by day, 1 per 20 overnight, plus a lead |

- **Separate circuits:** kettles and coffee, catering, AV, network rack on UPS.
- **Safety:** code of conduct with named responders, first aid per shift, fire wardens, lit separate rest areas, incident log, insurance.

## Judging and after

- **Judging time:** $T = (n/p)(t_d + t_q + t_c)$; 30 teams, 6 min, 3 panels: 60 min.
- **Calibration:** rubric walkthrough and sample projects before round 1; conflicts declared.
- **Normalise:** $z = (s - \mu)/\sigma$ per panel with random assignment; finalists decided by all judges.
- **Announce:** sponsor tracks, categories, overall; feedback to every team within a week; pay prizes on schedule.
- **Sponsor report:** agreed metrics, audience in aggregate, product use, hiring, content, builder feedback, renewal.
- **Follow-up:** same night, 48 h email, 7 days feedback and survey, 14 days newsletter and Majlis, 30 days sponsor report, 60 and 90 days retention and hiring.

## Region

- **Saudi permits (secondary):** GEA permit per event for public or ticketed events; SCEGA for conferences and exhibitions; MISA licence and CR for foreign organisers; hackathon rule unverified.
- **Other countries:** not researched; ask venue, authority and a lawyer; use a licensed host.
- **Weekend:** Friday to Saturday in most of the region; Saturday to Sunday in the UAE.
- **Calendar:** avoid Ramadan (about early February to early March 2027, approximate), the Eids, exams and June to September in the Gulf.
- **Run-of-show:** start Friday after the midday prayer; publish prayer times; prayer room.
- **Bilingual:** Arabic and English, dialects allowed, bilingual judges.
- **Overnight:** separate lockable rest areas, women staff every shift, transport, day-only option.
- **Reach:** online qualifier plus funded final; travel grant about USD 540 per head (illustrative).

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Cost per activated developer | $c_{act} = F_s/N_{act}$ | L1 |
| Cost per hire | $c_{hire} = F_s/N_{hire}$ | L1 |
| Prize EV per builder | $EV = \sum p_k P_k / n_{team}$ | L2 |
| Rubric score | $S = \sum w_k s_k$ | L2 |
| Safety-margin acceptances | $Ns + z\sqrt{Ns(1-s)} \le C$ | L3 |
| Show rate with reconfirmation | $s = r s_r + (1-r) s_n$ | L3 |
| Uplink | $B = N \bar r k_h$ | L4 |
| Bulk download time | $t = 8D/B_d$ | L4 |
| Circuit power | $P = V I_r k_c$ | L4 |
| Circuits | $n = \lceil N p D / P \rceil$ | L4 |
| Judging time | $T = (n/p)(t_d+t_q+t_c)$ | L5 |
| Z-score | $z = (s-\mu)/\sigma$ | L5 |
| Community steady state | $M^* = Rc/(1-r-f)$ | L5 |
`;

export default cheatSheet;
