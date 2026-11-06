import { md } from "../../schema";

const cheatSheet = md`# FC10 AI-native founder: cheat sheet

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Spot-check detection | $P_d = 1-(1-p)^n$ | L1: what a clean sample proves |
| Sample size | $n = \lceil \ln(1-C)/\ln(1-p) \rceil$ | L1: rows to check |
| Outbound funnel | $M = N\,\delta\,r\,q$ | L2: meetings from sends |
| Spam complaint rate | $s = N_c/N_i$ | L2: keep below 0.1 %, never 0.3 % |
| Cost per meeting | $C_M = (C_d + C_t + h\,w)/M$ | L2 |
| Bottom-up SAM | $\text{SAM} = N_a \cdot \text{ACV}$ | L3 |
| Error of a product | $\sigma_y/y \approx \sqrt{\sum (\sigma_{x_i}/x_i)^2}$ (worst case: add) | L3 |
| Tool break-even | $T_{be} = C_b/(f(t_0-t_1) - C_m)$ | L4 |
| Verify rule | verify if $c_v < q\,p\,L$ | L5 |
| Template gain | $G = k(t_0 - t_1) - t_b$ | L5 |
| Compound reliability | $P = \prod p_i = p^n$ | L6 |
| Agent token growth | $T_{tot} = nT_0 + \Delta\,n(n+1)/2$ | L6 |

## Key numbers

| Quantity | Value |
|---|---|
| Rows to check, 95 % confidence, 10 % error rate | 29 |
| Same, 5 % / 2 % error rate | 59 / 149 |
| Gmail spam rate: recommended / ceiling | below 0.1 % / never 0.3 % |
| Gmail bulk-sender threshold | about 5,000 messages a day |
| Reliability of 20 steps at 95 % | 36 % |
| Reliability of 10 steps at 98 % | 82 % |

## Research (L1)

- **Memory fails on:** funding rounds, customers, prices, dates, recent launches.
- **Grounding still fails on:** citation laundering, secondary drift, stale sources, over-generalising, absence as evidence.
- **Pipeline:** decision, source plan, claim ledger, synthesis from ledger ids, citation check in a fresh context, decision memo.
- **Ledger columns:** id, claim, URL, date, verbatim quote, source type, confidence.
- **Absence:** write "not found in sources searched", never "does not exist".
- **External rows:** check every one; internal tables: sample; one fabrication found means check all.

## Outreach and CRM (L2)

- **Authentication:** SPF (who may send), DKIM (signature), DMARC (alignment plus policy and reports).
- **Bulk senders (Gmail, Yahoo, since February 2024):** SPF, DKIM, DMARC, one-click unsubscribe, low complaints.
- **Sending:** authenticated secondary domain, gradual warm-up, a few dozen per mailbox per day, plain text, opt-out line.
- **Automate:** account research, enrichment with sources, drafts, dedup, proposed CRM updates.
- **Human only:** replies, negotiations, first message to enterprise champions, government buyers.
- **Never automate LinkedIn:** no bots, extensions, scheduled requests or scraping. AI drafts, you send.
- **GDPR:** Art. 6(1)(f) legitimate interests, Art. 14 tell them the source, Art. 21 absolute objection; check national email rules.

## Decks, models, specs (L3)

- **Brief:** audience and decision, facts sheet, forbidden list, format, constraints; [MISSING] instead of invention.
- **Loop:** outline, draft, red-team from a hostile role, revise, human facts check.
- **Model audit:** hard-codes, time base, signs, unsupported revenue, reconciliation, sensitivity.
- **Base case:** signed revenue only.
- **Spec review:** ambiguity, untestable items, conflicts, edge cases, assumptions; no new features.

## Internal tools (L4)

| Data \ Effect | Read-only, local or internal | Writes, sends or public |
|---|---|---|
| Own or public | Build alone | Build, engineer reviews |
| Customer, personal, financial, credentials | Build alone with care | Engineers own it |

- **Repo:** private, .gitignore first, secrets in .env, CLAUDE.md rules, plan first, test vectors.
- **Leaked key:** rotate first, then audit logs, then purge history.

## Verification and library (L5)

- **Number routine:** trace, recompute outside chat, units, magnitude, ratios from endpoints, cross-foot and prior period.
- **Traps:** fake citations, article numbers, dates, invented quotes, dropped negations, sycophancy, context bleed, translation.
- **Library:** one context file per venture; each template has inputs, output, owner, version, verification step; failures.md.

## Agents (L6)

- **Default:** a workflow; an agent only when the path is unknown.
- **Lethal trifecta:** private data + untrusted content + external communication; remove one leg by design.
- **Charter:** goal, tool allowlist, data scope, forbidden actions, checkpoints that stop, stop conditions, budget, owner.
- **Never autonomous:** send, pay, sign, delete, post, LinkedIn.
`;

export default cheatSheet;
