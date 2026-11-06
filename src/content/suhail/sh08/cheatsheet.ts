import { md } from "../../schema";

const cheatSheet = md`# SH08 Running a volunteer-led team: cheat sheet

## Conventions

- **Numbers:** every Suhail number here is **illustrative**; nothing has launched.
- **Team:** five unpaid leads (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance Lead) plus the founder, from January 2027.
- **Unpaid until revenue:** a written trigger decides when that changes.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Share still active | $N(t)/N_0 = r^t$, annual $r^{12}$ | Retention (L1) |
| Expected tenure | $T = 1/(1-r)$ | Retention (L1) |
| Recruits per year | $H = 12L(1-r)$ | Seat planning (L1) |
| Channels | $K = n(n-1)/2$ | Team size (L2) |
| Overlap | $O = \max(0, \min e_i - \max s_i)$ in UTC | Live slot (L2) |
| Effective capacity | $C = \sum a_i h_i$ | Quarter plan (L3) |
| Load factor | $\lambda = D/C$ | Quarter plan (L3) |
| Wait multiplier | $u/(1-u)$ | Why plan below 0.8 (L3) |
| Stall probability | $p^k$; quarter $1 - (1-p^k)^n$ | Bus test (L3) |
| Pipeline | $N_{\text{top}} = N/\prod c_i$ | Recruiting (L4) |
| Coverage ratio | $\kappa = 12\bar{G}/C_{\text{role}}$ | Paid trigger (L5) |
| Shadow value | $V = w \sum h_i n_w$ | Paid vs volunteer (L5) |
| Dynamic split | $s_i = S_i/\sum S_j$, $S = 2wH + 4K$ | Equity, if ever (L5) |
| Little's law | $W = L/X$ | WIP limits (L6) |

## Motivation (L1)

- **VFI functions:** values, understanding, social, career, protective, enhancement. Match the role to the top two.
- **SDT needs:** autonomy, competence, relatedness.
- **Crowding out:** small payments can lower effort below unpaid; reimburse expenses, avoid token stipends.
- **Ladder:** core lead (5 to 8 h, 6-month term), contributor (2 to 4 h), event helper, alumni.

| Monthly retention | Annual | Tenure | Recruits for 5 seats |
|---|---|---|---|
| 0.90 | 28% | 10 months | 6.0 a year |
| 0.95 | 54% | 20 months | 3.0 a year |
| 0.97 | 69% | 33 months | 1.8 a year |

## Roles and decisions (L2)

- **Charter:** mission, owned outcomes, decides alone, needs approval, budget line, interfaces, hours and term, backup.
- **DACI:** Driver, one Approver, Contributors, Informed. Never two Approvers.
- **Thresholds:** reversible and low impact, lead decides; reversible and high, lazy consensus 48 to 72 h; irreversible and high, written proposal and a single Approver.
- **Freeman:** structureless groups grow hidden elites; write authority down.
- **Weekends:** Kuwait, Saudi Arabia, Egypt Fri to Sat; UAE and Netherlands Sat to Sun. Shared day off: **Saturday**. Deadlines on **Thursday**.
- **Evening-only overlap** across Europe and the Gulf is often zero; negotiate one weekly hour.

## Capacity (L3)

- **Availability factor:** assume 0.6 to 0.8 until measured.
- **Target load:** 0.7 to 0.8. Waits are 4x task time at 0.8, 9x at 0.9, 19x at 0.95.
- **Cut order:** no external promise yet; frequency; scope (keep the date); never sponsor commitments.
- **Bus test:** a backup has access, a procedure and one supervised run.

| Illustrative Q1 2027 | Value |
|---|---|
| Pledged | 30 h/week |
| Effective (a = 0.7) | 21 h/week |
| Draft demand | 30 h/week, load 1.43 |
| After cut list | 16.5 h/week, load 0.79 |
| Newsletter stall risk, 1 owner vs backup (p = 0.2) | 93% vs 39% per quarter |

## Recruiting and exits (L4)

- **Pipeline:** helpers become contributors become leads; about 10 applications per lead at 0.105 yield.
- **Trial project:** real, 3 to 4 h, not critical, criteria first.
- **Onboarding:** charter and access day 0, buddy, **first win by day 14**, check-in day 30.
- **Recognition:** specific, public, soon, tied to impact; no hours leaderboards.
- **Performance exit:** evidence, private live talk, lower rung or 4-week reset, then thanks and handover.
- **Conduct exit:** code-of-conduct process, immediate access removal, record, no public thanks.

## Paid transition (L5)

- **Trigger:** $\kappa \ge 1.5$ on trailing 6-month margin **and** 6 months of the role in cash (policy choice).
- **First paid role:** recurring, deadline-bound, invisible work that protects revenue (operations and sponsor fulfilment). Not the founder first.
- **Fairness:** publish policy before revenue; distinct charter; open process, current leads first; no back pay promises.
- **Equity:** default none for sponsor-funded community; formal vesting equity only in a properly formed spin-out.
- **Legal:** unpaid work for a for-profit entity is fragile in many jurisdictions; take advice before January 2027.

## Tools and rituals (L6)

- **Handbook rule:** not in the handbook, not a rule; decisions from chat go to the log the same day.
- **Board:** Backlog, Next, In progress (WIP 2 per lead), Review, Done.
- **Rituals:** thank-you round weekly; written updates Monday; 30-minute review in the overlap; demo monthly; post-mortem within 14 days; quarterly capacity review; 6-monthly term review.
- **Access:** Suhail-owned accounts with two owners, named logins, least privilege, 2FA, password manager, register reviewed quarterly, same-day offboarding.
`;

export default cheatSheet;
