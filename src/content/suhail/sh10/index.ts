import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import l04 from "./l04";
import l05 from "./l05";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "sh10",
  number: 10,
  title: "Capstone: the first hackathon and sponsorship round",
  titleAr: "المشروع الختامي: أول هاكاثون وأول جولة رعاية",
  summary:
    "Plan Suhail's first hackathon end to end as six artifacts that reconcile: the concept with a metric tree for builders, sponsors and Suhail; the budget and P&L with break-even, contingency and a cash gate; the sponsorship package, target list and pipeline forecast; the run-of-show and a team plan for unpaid leads; the risk register and a permit plan for the chosen city; and the post-event report that feeds the next sponsorship round and the community funnel. A fully worked illustrative plan for Riyadh sets the standard; the integrative exam is the Suhail capstone score.",
  whyItMatters:
    "Nothing at Suhail has launched, so the first hackathon is the evidence every later sponsor, volunteer and partner will judge, and it must be run by leads who are unpaid until there is revenue. A plan whose headcount, budget, sponsor tiers, pipeline, risks and report all agree is what lets you run it without reserves and without betting the team's money. Building it once, properly, turns every later event and the Suhail Season conference into an edit of these artifacts.",
  competencies: ["sh-events", "sh-partnerships", "sh-community", "sh-org"],
  prerequisites: ["sh01", "sh02", "sh03", "sh04", "sh07", "sh08", "fc04", "fc06"],
  estimatedHours: 7,
  lessons: [l01, l02, l03, l04, l05],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# First hackathon and sponsorship round: capstone cheat sheet

## The six artifacts

| # | Artifact | Decision it forces |
|---|---|---|
| 1 | Concept and metric tree | City, format, date, capacity; what success means for builders, sponsors, Suhail |
| 2 | Budget and P&L | Spend, sponsor revenue needed, break-even, contingency, cash gate |
| 3 | Sponsorship package, target list, pipeline | Tiers and prices, who to call, whether money arrives before the gate |
| 4 | Run-of-show and team plan | Owners, dates, real volunteer hours |
| 5 | Risk register and permits | Expected cost vs contingency, who holds the permit |
| 6 | Post-event report and next round | Outcomes vs promises, renewals, community follow-through |

- **One-plan test:** headcount, sponsor revenue, contingency vs EMV, benefits vs run-of-show lines, metric tree vs report, gate vs vendor terms vs pipeline timing all agree.
- **Honesty:** nothing has launched; every number is a target, an assumption or illustrative, and says so.

## Key formulas

| Quantity | Formula | Where |
|---|---|---|
| Attendance funnel | $N_{\text{app}} = N_{\text{site}} / (a s)$ | Lesson 1 |
| Weighted score | $S = \sum w_j x_j$ | Lesson 1 |
| Event costs | $C = (1+c)(F + vN + \sum f_k n_k)$ | Lesson 2 |
| Profit | $\Pi = N\sigma p_t + \sum p_k n_k - C$ | Lesson 2 |
| Break-even capacity | $N^* = (R/(1+c) - F - \sum f_k n_k)/v$ | Lesson 2 |
| Marginal cost per builder | $v(1+c)$ | Lesson 2 |
| Concentration | $p_{\max}/C \le 0.25$ | Lesson 3 |
| Cost per outcome | $u = p / O$ | Lesson 3 |
| Weighted pipeline | $W = \sum n_i v_i \pi_i$ | Lesson 3 |
| Target list | $N_0 = \lceil n / \prod r_k \rceil$ | Lesson 3 |
| Risk EMV | $\sum p_i I_i$ | Lesson 4 |
| Volunteer hours | $H = \rho W \sum h_i$ | Lesson 4 |
| Steady state | $A^* = Rc/(1 - r - k)$ | Lesson 5 |
| Pulse decay | $A_t = P(r+k)^t$ | Lesson 5 |

## Worked plan: Suhail Hack Riyadh 01 (all illustrative)

- **Concept:** Fri 23 to Sat 24 April 2027, daytime, licensed host's hall, 120 seats, theme Arabic-first AI agents.
- **Funnel:** 120 / 0.65 = 185 acceptances; / 0.40 = 463 applications; about 15,400 reached.
- **City score:** Riyadh 3.55, Dubai 3.45, Cairo 3.40, Kuwait City 3.05; permit-heavy weights put Cairo first.

| Budget line (USD) | Amount |
|---|---|
| Venue (cash; hall in-kind) | 2,000 |
| Catering 45 x 120 | 5,400 |
| Prizes (cash) | 6,000 |
| Production | 6,000 |
| Marketing | 1,000 |
| Fulfilment | 2,200 |
| Contingency 10 % | 2,260 |
| **Costs** | **24,860** |
| **Sponsors (6,000 + 4 x 3,500 + 4 x 1,500)** | **26,000** |
| **Surplus** | **1,140** |

- **Break-even capacity:** 143 builders; hall (120) binds; USD 49.50 per extra seat.
- **One Partner walks:** -2,030 planned, +230 if contingency unused.
- **Cash gate:** Fri 12 March 2027 (T-6 weeks).
- **Pipeline at T-10:** unweighted 89,500 (3.4 times), weighted 20,150 (77.5 %); target list 60 names.
- **Team:** 5 leads x 6 h x 12 weeks x 0.75 = 270 h vs 360 needed; founder 96 h; 13 event-day volunteers.
- **Register EMV:** 2,120 vs contingency 2,260.
- **Hypothetical outcome:** 112 on site, surplus 2,800, headline adoption 55 % vs 60 %, about USD 97 per activated builder.
- **Community:** 340 opt-ins leave about 158 after 6 months; steady state 1,333 at 85 % retention, 2,286 at 90 %.

## Sponsorship rules

- **Three tiers**, top tier at most about 25 % of the budget (MLH guidance).
- **Price from outcomes:** cost per activated builder, per opted-in profile.
- **Anchors (not Gulf pricing):** HackPrinceton S25 USD 1k to 7.5k; AAAI 2025 USD 2.5k, 5k, 10k.
- **Read the pipeline weighted and dated**, against the gate.
- **Non-negotiables:** payment tied to the gate; opt-in data only (PDPL); builders keep IP; independent judging majority; category exclusivity only.
- **In-kind** is recognised, never counted as cash.

## Execution rules

- **One Accountable lead per workstream, plus a backup** from T-6 weeks.
- **Never volunteers:** security, first aid, licensed roles; never a lead's own money.
- **Calendar:** Ramadan 2027 from about 8 February, Eid al-Fitr about 10 March, Eid al-Adha about 16 May (moon sighting); Saudi weekend Fri and Sat; Jumu'ah and prayer breaks.
- **Saudi permits (secondary, unverified for hackathons):** GEA for public or ticketed events; SCEGA for conferences and exhibitions; MISA and CR for foreign organisers. Licensed host confirms in writing by T-8 weeks.
- **Safeguarding:** code of conduct, two responders, 18-plus, photo consent, published judging rubric, conflicts declared.

## After the event

- **Report within 14 days** against the unchanged metric tree; misses with cause and fix.
- **Result** = planned surplus + unused contingency.
- **Renewal offer with a date** in every sponsor report; renewals priced on evidence.
- **Retention beats spikes:** monthly rhythm (demo nights, newsletter, contributor roles).`,
};

export default mod;
