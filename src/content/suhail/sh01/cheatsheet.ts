import { md } from "../../schema";

const cheatSheet = md`## Ecosystem and network value

- **Actors:** builders, employers, investors, universities, governments; the hub (Suhail) convenes them and owns none of the value.
- **Survival rule:** every actor's get exceeds its give, in its own currency; the hub's work per member must fall as it grows.
- **Loop closes at outcomes:** hires, deals, matches, grants. Events without outcomes are media with event costs.
- **Use active members, never list size,** in every network-value statement.
- **Sponsor value:** reachable qualified builders $= q \times a \times N_B$.

| Model | Value | Doubling active members |
|---|---|---|
| Metcalfe | $k\,n(n-1)/2$ | about 4x (upper bound) |
| Odlyzko-Tilly | $k\,n \ln n$ | about 2.2x at a few hundred |
| Bounded ties | $\tfrac{k}{2} n \min(n-1, m)$ | 2x above $m+1$ |

## Reference communities

| Model | Mechanism | Lesson for Suhail |
|---|---|---|
| Y Combinator | Batch, demo day, alumni network (Bookface); USD 125K for 7 % plus USD 375K uncapped MFN SAFE | Network compounds; demo day needs competing investors |
| {Tech: Europe} | 2 to 3 free, approval-gated AI hackathons a month, sponsor prizes, partner credits, newsletter, conference, Luma and Discord | Closest template; revenue model unpublished |
| On Deck | Paid fellowships; ODX (USD 125K for 7 %) wound down 2022 | Venture money forces growth that outruns curation |
| Founders Inc | Open events feed a pre-seed programme (self-reported up to USD 250K for 4 to 7 %) | Community as fund top-of-funnel |
| Antler | Residency for individuals; invests at team formation | Cofounder matching is the scarce service |
| Indie Hackers | Revenue-transparency content; Stripe bought 2017 (about USD 8K a month), founders bought back 2023 | Ownership shapes the community |

- **Implied valuation:** $I/p$; YC fixed part USD 1.79M post-money.

## Design

- **Tiers by contribution:** audience, member (proof of work), builder alumni, core, leads; every tier has a written criterion.
- **Rituals:** fixed cadence, low cost, something to show, a member role. Weekly newsletter, biweekly build night, monthly hackathon and Majlis episode, quarterly build season, annual Suhail Season.
- **Ladder:** lurker, participant, contributor, collaborator, organiser, lead; each rung needs a trigger, a small first ask and recognition.
- **Add rituals only when a community organiser can own them.**

## Trust and quality

- **Filter precision:** with a weak pool, recruit better before screening harder.
- **Judge proof of work,** not prestige.
- **Code of conduct:** scope includes sponsor staff; two responders; acknowledge within 24 h, decide within 7 days; ladder correction, warning, temporary ban, permanent ban.
- **Data:** sponsor sharing only by opt-in, per purpose, recorded.
- **Dilution:** watch the newcomer ratio; staged intake, buddies, small groups, visible norms.

## Measuring health

- **Active:** check-in, post or reply, newsletter click, project submission, in the month. Check-ins, not registrations; clicks, not opens.
- **Read MAU with growth accounting:** retained, new, resurrected, churned.
- **Repeat rate with first-timers:** low means one-offs; very high with flat totals means closing in.
- **NPS:** report with n and 95 % interval; compare only with yourself; trust behaviour more.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Possible pairs | $n(n-1)/2$ | l01 |
| Odlyzko-Tilly | $k\,n\ln n$ | l01 |
| Sponsor reach | $\beta q a N_B$ | l01 |
| Implied valuation | $I/p$ | l02 |
| Funnel | $A_t = (r+k)A_{t-1} + Rc$ | l03 |
| Steady state | $Rc/(1-r-k)$ | l03 |
| Approach | $A^*[1-(r+k)^t]$ | l03 |
| Time to fraction f | $\ln(1-f)/\ln(r+k)$ | l03 |
| Member lifetime | $1/(1-r)$ | l03 |
| Filter precision | $s\pi/(s\pi + f(1-\pi))$ | l04 |
| Moderators | $\lceil A p \rho \tau / T_m \rceil$ | l04 |
| Newcomer ratio | $N_\text{new}/C$ | l04 |
| Contribution rate | $C/A$ | l05 |
| Stickiness | WAU/MAU | l05 |
| Quick ratio | $(N + Z)/X$ | l05 |
| Repeat rate | $N_\text{ret}/N_\text{att}$ | l05 |
| NPS | $100(P - D)$ | l05 |
| NPS SE | $100\sqrt{(P + D - (P-D)^2)/n}$ | l05 |
| Weighted score | $\sum w_i x_i$ | l06 |

| Funnel example (illustrative) | Value |
|---|---|
| 20,000 reach, 1.5 %, r 0.80, k 0.05 | Steady state 2,000 |
| Same, month 12 | 1,716 |
| Months to 90 % at r + k = 0.85 | 14.2 |
| r 0.80 to 0.85 | Same ceiling gain as 50 % more reach |

## Arab context

| City | Role |
|---|---|
| Riyadh | Largest capital and government programmes; permits (GEA, SCEGA) |
| Dubai | Regional HQs, easiest logistics, crowded calendar |
| Abu Dhabi | MBZUAI, TII, G42 and Inception, Hub71, MGX |
| Doha | QCRI and HBKU (Fanar), QIA, Qai |
| Kuwait City | Close-knit, diwaniya culture, home base |
| Cairo | Deepest talent pool, about 750K graduates a year |
| Amman | Strong developers and Arabic content talent |
| Beirut | Educated, multilingual, much of it in the diaspora |

- **Weekends:** Friday and Saturday in KSA, Kuwait, Qatar, Egypt, Jordan; Saturday and Sunday in the UAE. Saturday is the safe hackathon day.
- **Ramadan 2027:** expected about 8 Feb to 9 Mar; late-evening and suhoor formats. Main season October to May.
- **Language:** English for code, MSA for formal, dialect for podcast and community; bilingual by default.
- **Transplant:** adopt gated hackathons and sponsor prizes; adapt Discord (WhatsApp) and Luma (plus personal invites); replace bar networking with majlis hospitality.
`;

export default cheatSheet;
