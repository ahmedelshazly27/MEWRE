import { md, type Module } from "../../schema";
import l01 from "./l01";
import l02 from "./l02";
import l03 from "./l03";
import { formulas } from "./formulas";
import { references } from "./references";
import { glossary } from "./glossary";
import { exam } from "./exam";

const mod: Module = {
  id: "aw15",
  number: 15,
  title: "Capstone: first pilot and the first test platform",
  titleAr: "المشروع الختامي: أول تجربة تجريبية وأول منصة اختبار",
  summary:
    "Build everything between a cold list and Afterwave's first signed paid pilot (ICP logic, outbound sequence, discovery plan, pilot proposal with paired success criteria and pricing, security review pack, pilot term sheet), the Ripple demo narrative with its technical deep dive and one-page leave-behind, and a go/no-go memo on Afterwave's first hardware test platform using platform economics and decision analysis. Customer and investor scenarios test the defence; the integrative exam is the Afterwave capstone score.",
  whyItMatters:
    "Afterwave's next six months will be judged on whether a hardware test team pays to run Lockstep, Enclave and Ripple on a real rig, and its biggest pre-Series A temptation is building its own test platform before demand is contracted. This capstone makes you produce, once and consistently, the documents that get the first pilot signed, the demo that survives a principal engineer, and the memo that says when hardware is worth its capex. Every later pilot and every investor conversation about the platform becomes an edit of these artifacts.",
  competencies: ["aw-business"],
  prerequisites: ["aw05", "aw09", "aw12", "aw13", "aw14", "fc04", "fc11"],
  estimatedHours: 5,
  lessons: [l01, l02, l03],
  exam,
  glossary,
  formulas,
  references,
  cheatSheet: md`# First pilot and first test platform: capstone cheat sheet

## The pilot path

| # | Artifact | Gate | Runs on whose calendar |
|---|---|---|---|
| 1 | ICP list logic | 100 to 200 scored accounts, named head of test, a trigger | Yours |
| 2 | Outbound sequence | First meetings with the right role | Yours |
| 3 | Discovery call plan | Pain in their numbers; data walkthrough agreed | Shared |
| 4 | Pilot proposal | Scope, success pair and price accepted in writing | Shared |
| 5 | Security review pack | Security approves on-prem or isolated tenant | Theirs (start early) |
| 6 | Term sheet and contract | Signed paid pilot with conversion clause | Theirs |

## Pilot design rules

- **Shadow mode:** Ripple recommends, the normal full regression runs and scores it.
- **Success pair:** recall on replayed history and live shadow, plus rig-hours saved; each with threshold, data, method, date, judge.
- **Safety floor:** safety-tagged tests always run, outside the trade-off.
- **Advisory:** Ripple does not change what runs during the pilot.
- **Price from their numbers:** annual licence at 10 to 30 % of value; pilot fee credited against year one.
- **Non-negotiable:** written conversion price and date; liability cap.
- **Data terms:** customer owns captured data, bench memory and trained models inside Enclave; Afterwave owns software and general methods; nothing outside Enclave without consent.
- **Security pack:** architecture, data flows, no egress, SSO and roles, signed offline updates, logged support access, SBOM, personal data in screen capture, honest certification roadmap.

## The Ripple demo

1. **Change:** one concrete firmware, model or rig change.
2. **Stakes:** full suite in rig-hours and wall-clock.
3. **Answer:** ranked tests with a reason each; safety tests pinned.
4. **Proof:** threshold curve, one-clock beat, replayed recall (say which number is estimated).
5. **Ask:** 12-week shadow-mode pilot.

| Default demo (firmware change, 71 rig-hours) | Rig-hours | Expected recall |
|---|---|---|
| Threshold 0.35 | 6 | 77 % |
| Threshold 0.30 | 11 | 94 % |
| Threshold 0.20 | 65 | 100 % |

- **Deep dive:** answer, show, limit.
- **Never:** present expected recall as measured; claim compliance; promise zero misses; disparage a competitor.

## Platform decision

- **Build only on contracted demand** (take-or-pay or deposits) and where the data materially improves Ripple or Enclave.
- **Stage it:** buy information if its cost is well below EVPI and it is fast.
- **Dedicated rig:** take-or-pay, capex recovered over the contract term.
- **Free capture by a competitor:** interoperate, price the decision layer and bench memory.
- **Non-financial risks:** focus, rig machine safety and possible CE obligations, device damage and liability, accreditation, obsolescence, data double counting.

## Key formulas

| Quantity | Formula | Where |
|---|---|---|
| Accounts needed | $N_0 = \lceil P / \prod c_k \rceil$ | Lesson 1 |
| Recall on history | $R = \sum \lvert F_j \cap S_j \rvert / \sum \lvert F_j \rvert$ | Lesson 1 |
| Pilot EV | $F - C_d + p_c \, \mathrm{ACV} \, GM \, n$ | Lesson 1 |
| Impact score | $s_t = 1 - \prod (1 - w_{t,i})$ | Lesson 2 |
| Expected recall | $\sum_{\text{sel}} s_t f_t / \sum s_t f_t$ | Lesson 2 |
| Clock misalignment | $\Delta\theta + \Delta\rho \cdot 10^{-6} \cdot \tau$ | Lesson 2 |
| Breakeven utilisation | $u^* = (F + K/L) / ((p - v) H_a)$ | Lesson 3 |
| Payback | $K / ((p - v) u H_a - F)$ | Lesson 3 |
| Expected value | $\sum p_s V(a, s)$ | Lesson 3 |
| EVPI | $\sum p_s \max_a V - \max_a \mathrm{EV}$ | Lesson 3 |
| Dedicated rig fee | $(K - S)/T_c + F + v h_c$ | Lesson 3 |

## Worked numbers (all illustrative)

- **Funnel:** 3 pilots at 2 % end to end need 150 accounts; about 90 with warm paths.
- **Pricing:** $24 \times 60 \times 110 = 158.4$k EUR value; licence EUR 48k; pilot EUR 20k credited; pilot EV 33.2k EUR.
- **Drift:** 50 ppm for one hour is 0.18 s, 180 samples at 1 kHz.
- **Platform:** USD 600k, 7,008 h, USD 120 per hour contribution, USD 150k fixed: breakeven 32 %; payback 2.2 years at 50 %, 10 years at 25 %.
- **Tree:** EV(go now) 140.6k, EV(staged) 203.3k, EVPI 122.7k USD.
- **Dedicated rig:** 450k break-even, 540k with 20 % margin, USD 216 per used hour.`,
};

export default mod;
