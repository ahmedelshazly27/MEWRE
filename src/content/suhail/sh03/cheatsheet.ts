import { md } from "../../schema";

const cheatSheet = md`# SH03 Event economics and sponsorship sales: cheat sheet

## Conventions

- **Status of numbers:** nothing at Suhail has launched; every venture number is **illustrative**.
- **Currency:** USD; KWD 1 = USD 3.25 (assumed); SAR about 3.75 and AED about 3.6725 per USD (pegs).
- **VAT:** state whether budgets include it (Saudi Arabia 15 %, UAE 5 %); confirm treatment with an accountant.

## Event P&L

- **Cost:** fixed (venue, production, prizes, marketing) plus variable per attendee (catering, swag) plus sponsor fulfilment, times contingency.
- **Revenue:** tickets (attendees x paying share x price) plus sponsorship (tier price x number sold).
- **Contribution per attendee:** negative for free events, so break-even attendance is a **ceiling**; positive for paid events, a **floor**.
- **Cost per attendee:** a reporting number; it falls with headcount even when profit falls.
- **Tier margin:** aim for 80 % or more; physical benefits (booths, dinners, video) erode it.

| Illustrative event | Cost (USD) | Revenue (USD) | Result (USD) |
|---|---|---|---|
| Meetup, 60, in-kind venue | 1,298 | 1,000 | minus 298 |
| Hackathon, 120, free | 24,090 | 26,000 | plus 1,910 (ceiling about 163) |
| Suhail Season, 600, 2 days | 281,750 | 290,000 | plus 8,250; float about 108k |

## Budget and cash

- **Line item:** quantity, unit price, source (quote or assumption), owner.
- **Contingency:** 5 to 10 % repeat format; 10 % new venue; 15 to 20 % first conference; never for upgrades.
- **Peak funding need:** most negative cumulative cash; prepayment by top sponsors is the main lever.
- **Cancellation exposure:** non-refundable commitments minus cash you keep on cancelling; sponsor fees are usually refundable.
- **Gate:** pay each deposit only if signed sponsorship reaches a set share of need (for example 70 %) and exposure fits reserves.
- **In-kind:** value at avoided cost, show on both sides, cap per tier; credits for builders are not cash.

## Packages and pricing

- **Sponsor motives:** hiring, developer adoption, brand, deal flow, ecosystem or national mandate.
- **Tiers:** three, perhaps four; capped slots; an anchor; top sponsor at most 25 % of budget (MLH guide).
- **Value test:** $V = \sum q_j a_j$, $r = V/P \ge 2$ on measurable outcomes; $a_j$ from the sponsor.
- **Benefits:** build tiers on high-value, low-cost items (judging seats, tracks, workshops, consented intros).
- **Exclusivity premium:** at least the expected contribution of blocked prospects; prefer narrow exclusivity.
- **Published comparables:** HackPrinceton 1K to 7.5K; AAAI 2.5K to 10K; Builderbase 500+ participants Gold 7.5 to 20K. No Gulf rate card found.

## Selling

- **Accounts to contact:** $\lceil (T/\bar P)/(c_{call} w)\rceil$; warm introductions cut the list by more than half.
- **First call:** motive and metric, alternative cost, budget pocket and date, paper process.
- **Gulf timing:** next year's budgets drafted in Q3 and approved in Q4 for calendar-year companies; other pockets (talent, developer relations, CSR) fund mid-year.
- **Procurement:** vendor registration, PO before invoice, payment terms often 30 to 90 days (ask).
- **Objections:** answer with scope, terms, evidence and consent; discount last.

## Delivery and renewal

- **Report:** within two weeks; denominators and methods; sponsor's metric; cost per outcome; misses and fixes; 30 and 90 day follow-ups.
- **Make-good:** credit at the next event for a missed floor; cash only on cancellation.
- **Renewal:** expected life $1/(1-\rho)$; new sponsors needed per year $n(1-\rho)$.
- **Package:** discount well below $d_{max}$.

## Tickets

- **No-shows:** measure approved vs checked in; free events run high, a price or deposit cuts it.
- **Overbooking:** $\mathbb{E}[N] + 2\sigma_N \le$ capacity, plus confirmation step and waitlist.
- **Two-sided price:** sponsor value per attendee lowers the price; capacity can raise it back.
- **Never** price from average cost per attendee.
- **Saudi Arabia:** ticketed events may need a GEA permit, conferences SCEGA (secondary sources; confirm).

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Total cost | $C = (F + vN + \sum f_i n_i)(1+k)$ | L1 |
| Revenue | $R = Nsp + \sum P_i n_i$ | L1 |
| Contribution per attendee | $m_a = sp - v(1+k)$ | L1 |
| Break-even attendance | $N^{*} = \dfrac{(F + \sum f_i n_i)(1+k) - \sum P_i n_i}{sp - v(1+k)}$ | L1 |
| Tier contribution | $m_i = P_i - f_i(1+k)$ | L1 |
| Cumulative cash, peak need | $B_t = \sum_{\tau\le t}(I_\tau - O_\tau)$, $D_{max} = -\min_t B_t$ | L2 |
| Sponsor value and ratio | $V = \sum q_j a_j$, $r = V/P$ | L3 |
| Cost per qualified lead | $P/L_q$ | L3 |
| Concentration | $h = \max_i P_i / C \le 0.25$ | L3 |
| Accounts to contact | $\lceil (T/\bar P)/(c_{call} w)\rceil$ | L4 |
| Sponsor lifetime value | $m/(1-\rho)$ | L5 |
| Maximum package discount | $1 - (\Pi_{sep} + c_{pkg} + f_{pkg})/L$ | L5 |
| Attendance and spread | $R(1-r)$, $\sqrt{Rr(1-r)}$ | L6 |
| Two-sided ticket price | $p^{*} = (c-u)\,e/(e-1)$ | L6 |
| Net ticket revenue | $p(1-\phi) - \phi_0$ | L6 |
`;

export default cheatSheet;
