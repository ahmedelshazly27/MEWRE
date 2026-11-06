import { md } from "../../schema";

const cheatSheet = md`# FC03 Go-to-market: cheat sheet

## Conventions

- **Numbers:** all Afterwave, Mizan and Suhail numbers are **illustrative**, not traction.
- **Currency:** EUR unless stated; ACV = annual contract value; GM = gross margin.
- **Order of work:** positioning, ICP, messaging, motion, launch. Each uses the previous one.

## Positioning (Dunford)

- **Definition:** how your product is the best at something a defined market cares a lot about.
- **Components, in order:** competitive alternatives, unique attributes, value (and proof), best-fit customers, market category (+ optional trend).
- **Real competitor:** the status quo. For Ripple: rerun everything, or a senior engineer decides.
- **Unique attribute test:** demonstrable fact the alternatives lack; adjectives fail.
- **Category:** triggers competitors, criteria and price expectations; choose the frame where your criteria win.
- **Strategies:** head to head; big fish, small pond; create a new game.
- **Ripple frame:** change-impact analysis for hardware and physical AI test (big fish, small pond).
- **Statement:** For [target] who [need], [product] is a [category] that [benefit]. Unlike [alternative], it [differentiation].

## ICP and segmentation

- **ICP unit:** the account (often one test lab), not a person.
- **Four layers:** firmographics, technographics, buying triggers, pain intensity, plus disqualifiers.
- **Afterwave triggers:** new programme, release cadence jump, ML in a safety function, EU Machinery Regulation from 20 January 2027, new head of validation, funding.
- **Bands:** pursue at 70 or more, nurture 50 to 69, ignore below 50.
- **Weights encode strategy:** recalibrate after every 10 closed deals.
- **Beachhead (Moore):** severe pain, peers reference each other, whole product deliverable.

| Archetype (illustrative) | Score |
|---|---|
| Humanoid actuator lab | 83 |
| E-drive validation lab | 81 (84 with access weighted 0.20) |
| Battery cell lab | 60 |
| University robotics lab | 40 |

## Messaging

- **Message house:** roof = core message; three pillars = value themes; foundation = proof.
- **Value ladder:** feature, capability, user benefit, business outcome, strategic outcome.
- **Buying committee:** economic buyer, technical evaluator, users, security/IT, procurement/legal, champion.
- **Value capture:** a new vendor prices at about 10 to 20 % of quantified value.
- **Never claim:** "makes you compliant". Say: documented rationale that supports safety and conformity evidence.

## Motions

| Motion | ACV (illustrative) | CAC | Payback at 80 % GM |
|---|---|---|---|
| Self-serve PLG | EUR 2k | EUR 0.6k | 4.5 months |
| Product-led sales | EUR 12k | EUR 8k | 10 months |
| Inside sales | EUR 25k | EUR 15k | 9 months |
| Partner-led (net) | EUR 60k | EUR 30k | 7.5 months |
| Field sales | EUR 100k | EUR 120k | 18 months |

- **Afterwave:** founder-led, paid pilots, then field sales; partners later; PLG elements as lead generation only.
- **Mizan:** tender-driven public buyers; often a local partner; cycles tied to budget years.
- **Heuristics:** LTV/CAC of 3 or more; payback under 12 months (SMB), 18 to 24 tolerated (enterprise).
- **First AE:** after 5 to 10 paying customers, written stages, measured cycle and win rate, security pack, cash for ramp plus one cycle.

## Launch

| Tier | Changes | Lead time | Assets |
|---|---|---|---|
| 1 | What you sell or to whom | 8 to 12 weeks | Full set incl. technical paper and security pack |
| 2 | Major capability | 3 to 6 weeks | Post, emails, demo update, sales note |
| 3 | Incremental | Days | Release notes |

- **Sequence:** readiness, design-partner proof, assets and embargoed briefings, launch day, 30/60/90-day follow-through.
- **Go/no-go:** demo on real data, written permission for every reference, calendars blocked.
- **Ripple illustrative targets:** 900 contacts, 72 replies, 36 meetings, 14 qualified opportunities, EUR 1.44 m pipeline, EUR 0.29 m expected bookings.

## Category

- **Why creation is slow:** adds problem recognition, solution awareness and budget creation to every deal.
- **Works when:** real shift, felt but unnamed pain, years of capital, an evangelist, a budget to re-point.
- **Most "creators":** entered a budget line first (Salesforce, Snowflake), widened the frame later.
- **Afterwave decision:** own the change-impact subcategory; "physical AI test infrastructure" is the investor and hiring vision.
- **Revisit when:** buyers use the term unprompted, job titles and conference tracks carry it, competitors adopt it.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Cost of status quo | $C_{sq} = N_r H_{full} c_h$ | L2 pain intensity |
| ICP score | $S = (100/s_{\max})\sum w_i s_i$ | L2 ranking |
| Soiling loss value | $V_s = P_{nom} Y L_s p$ | L2 Mizan pain |
| Rig-time value | $V = N_r (H_{full} - H_{sel}) c_h$ | L3 value ladder |
| Value-based ACV | $ACV = \alpha V$ | L3 price link |
| CAC | $CAC = S_{SM}/N_{new}$ | L4 |
| Wins per AE | $W = (12n/t_c)\,w$ | L4 Little's law |
| CAC payback | $P = CAC/(ACV \cdot GM/12)$ | L4 |
| Minimum ACV | $ACV_{\min} = 12\,CAC/(GM \cdot P^{*})$ | L4 motion check |
| LTV | $LTV = ACV \cdot GM/c$ | L4 |
| Partner net ACV | $ACV_{net} = ACV_{list}(1-m_p)$ | L4 |
| Launch pipeline | $\Pi = N r_e r_m r_q ACV$ | L5 targets |
| Expected bookings | $B = \Pi w$ | L5 |
| Education cost | $C_{edu} = \Delta t_c B_m$ | L6 category |
`;

export default cheatSheet;
