import { md } from "../../schema";

const cheatSheet = md`# FC02 Product management: cheat sheet

## Discovery

- **Four risks (Cagan):** value, viability, feasibility, usability. Seed-stage B2B dies mostly on the first two.
- **Problem statement:** who, trigger, current workaround, quantified cost, evidence with its rung. No solution in it.
- **Swap test:** if a competitor's name fits your problem statement, it describes the customer, which is correct.
- **Assumption map:** importance versus evidence. Test the critical, low-evidence quadrant first.
- **Opportunity solution tree:** outcome, opportunities, solutions, assumption tests.

| Rung | Evidence | Strength |
|---|---|---|
| 0 | Compliment, future-tense opinion | Near zero |
| 1 | Stated past behaviour | Weak to moderate |
| 2 | Observed behaviour, artefacts | Moderate |
| 3 | Time commitment | Moderate to strong |
| 4 | Reputation commitment (introductions) | Strong |
| 5 | Money, signed pilot | Strongest |

## Interviews (The Mom Test)

- **Rule 1:** talk about their life, not your idea.
- **Rule 2:** specifics in the past, not generics or opinions about the future.
- **Rule 3:** talk less than a third of the time.
- **Compliment:** deflect, return to facts.
- **Fluff ("we always", "we would"):** anchor on the last specific instance.
- **Feature request:** dig for the motivation and the current workaround.
- **Currencies of commitment:** time, reputation, money.
- **Zombie lead:** "keep me posted", "send a deck". Counts as no evidence.
- **Three big questions:** written before each call, from the top-left of the assumption map.

## Jobs to be done

- **Job:** progress a person is trying to make in a particular circumstance.
- **Dimensions:** functional, emotional, social. B2B buyers decide in the last two.
- **Job story:** When [situation], I want to [motivation], so I can [outcome].
- **Competition:** defined by the job: doing nothing, spreadsheets, scripts, in-house tools first.
- **Forces:** push + pull versus anxiety + habit. Cheapest lever is usually anxiety (shadow mode, on-prem, references, exit).

## Specs

- **PRD (you):** problem, users and jobs, one primary metric plus guardrail, non-goals, appetite, prioritised testable requirements, acceptance criteria, constraints, open questions.
- **Design doc (technical lead):** architecture, alternatives, risks, estimate, test plan.
- **Testable requirement:** quantity, unit, condition, method. Replace every adjective.
- **Acceptance criteria:** Given / When / Then.
- **Timing limits:** 60 fps gives 16.7 ms frames; 10 kHz DAQ gives 0.1 ms samples.

## Prioritisation

- **RICE:** for many small items. Misleads with few, unequal accounts or deadlines.
- **Cost of delay:** EUR per week; ranges are enough.
- **CD3 order:** descending CoD divided by duration minimises total delay cost (exchange argument).
- **Now-next-later:** horizons of decreasing certainty, items phrased as outcomes, no dates beyond now.
- **Good no:** acknowledge the problem, decision and reason, what would change it, alternative.

## MVP and pilots

- **MVP:** least-effort full build-measure-learn loop on the riskiest assumption.
- **Concierge:** manual, customer knows. **Wizard of Oz:** looks automated, people behind it; be honest with enterprise and government buyers.
- **Pilot criteria:** baseline, buyer-owned, few, tied to a decision, achievable in the time box.
- **Pilot agreement:** scope, responsibilities, criteria, fee and conversion terms, data handling, exit date.
- **Purgatory causes:** no economic buyer, criteria set at readout, free and open-ended, scope creep.

## Analytics

- **Activation:** first core value, with a window (e.g. 14 days).
- **Active:** doing the core action, not logging in.
- **Curves:** decay to zero means no fit; flattening means a retained core; later cohorts higher means improving.
- **North Star:** customer value, leads revenue, moves in weeks; with input metrics. Revenue is lagging.
- **On-prem telemetry:** aggregate reports inside the deployment, opt-in minimal events, check-ins. Never hidden telemetry.

## Working with the technical cofounder

- **Decision rights:** CEO approves what and why and customer commitments; technical lead approves how, estimates, release readiness; one-way doors are joint and written.
- **Doors:** two-way doors fast by the owner; one-way doors slow, written, joint.
- **Debt quadrant:** deliberate or inadvertent, prudent or reckless.
- **Estimates:** ranges or three points; commit at about $E + \sigma$; negotiate scope against appetite, never the estimate.
- **Rituals:** weekly sync, demo per cycle, planning and retro per cycle, monthly debt review, monthly founder check-in.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Risk exposure | $RE = P_{\text{false}} \times C_{\text{wrong}}$ | Rank assumptions (l01) |
| Advancement rate | $a = N_{\text{adv}}/N_{\text{int}}$ | Interview health (l02) |
| Switching condition | $F_{\text{push}} + F_{\text{pull}} > F_{\text{anxiety}} + F_{\text{habit}}$ | JTBD forces (l03) |
| Sample interval | $\Delta t = 1/f_s$ | Timing requirements (l04) |
| Data volume | $V = n_{\text{ch}} f_s b T$ | Sizing requirements (l04) |
| RICE | $R \times I \times C / E$ | Many small items (l05) |
| Cost of delay | $\text{CoD} = \Delta V/\Delta t$ | Urgency in EUR/week (l05) |
| CD3 | $\text{CoD}_i / D_i$ | Sequencing (l05) |
| Total delay cost | $TC = \sum \text{CoD}_i T_i$ | Compare sequences (l05) |
| WSJF (SAFe) | $(\text{UBV} + \text{TC} + \text{RR/OE})/\text{size}$ | Relative points (l05) |
| Soiling value | $V = E_{\text{yr}} \Delta L \, p$ | Pilot sizing (l06) |
| Activation | $A = N_{\text{activated}}/N_{\text{signed up}}$ | Onboarding (l07) |
| Retention | $R_c(t) = \text{Active}_c(t)/N_c$ | Cohorts (l07) |
| NRR | $(\text{MRR}_0 + \text{Exp} - \text{Contr} - \text{Churn})/\text{MRR}_0$ | Revenue retention (l07) |
| Debt break-even | $t_{\text{be}} = S/i$ | Take or repay debt (l08) |
| PERT | $E = (O + 4M + P)/6$, $\sigma = (P - O)/6$ | Estimates (l08) |

## Worked numbers (illustrative)

| Case | Result |
|---|---|
| CD3 example: A (10, 4), B (6, 1), C (3, 2) in kEUR/week and weeks | Order B, A, C: 77 kEUR; intuitive A, B, C: 91 kEUR |
| Soiling gain 1.5 points at USD 0.02/kWh, 1,700 kWh/kW | 11.15 MW: about USD 5.7k/yr; 1,100 MW: about USD 561k/yr |
| Debt: save 15 days, 0.5 day x 6 changes per month | Break-even 5 months |
| PERT 3 / 5 / 14 weeks | E 6.17, sigma 1.83, commit about 8 weeks |
`;

export default cheatSheet;
