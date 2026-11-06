import { md } from "../../schema";

const cheatSheet = md`# SH06 The Arab tech and AI landscape: cheat sheet

## Conventions

- **Dates:** every fact below is as recorded in the course research (compiled 6 Nov 2026). Re-check before publishing.
- **Status words:** announced, financed, under construction, operating (infrastructure); closed, open weights, fully open (models).
- **Confidence:** verified (issuer or provider's own record), reported (secondary), unverified (single weak source or not confirmed).
- **Suhail numbers:** none exist yet; anything about Suhail is illustrative.

## Sovereign AI (L1)

| Country | Entities | Key dated facts |
|---|---|---|
| Saudi Arabia | SDAIA, HUMAIN (PIF) | HUMAIN Chat on ALLaM 34B (Aug 2025); 18,000 Blackwell chips approved; 6 GW plan (Jan 2026, secondary); Riyadh and Dammam sites targeted Q2 2026, **unconfirmed** |
| UAE | G42 and Khazna, MGX, MBZUAI, TII, Inception | Stargate UAE 1 GW (May 2025), first 200 MW due Q3 2026, **under construction** per Epoch AI (Jul 2026); MGX Fund I about USD 49 bn (Jul 2026) |
| Qatar | Qai (QIA), QCRI | Qai and Brookfield USD 20 bn JV (9 Dec 2025); Fanar models |
| Kuwait | Government with Microsoft | Azure AI region, data centre, hub announced 6 Mar 2025; no national open-weight LLM found |

- **Four motives:** diversification, data control, Arabic language and culture, geopolitical position.
- **Stack:** energy and land, data centres, accelerators, models, apps. Gulf strength at the base; chips are the constraint.

## Models and benchmarks (L2)

| Model | Builder, date | Size | Openness |
|---|---|---|---|
| ALLaM-7B-Instruct-preview | SDAIA, 2025 | 7B, 5.2T tokens | Open weights |
| ALLaM 34B | HUMAIN, Aug 2025 | 34B | Reportedly closed |
| Jais 2 | Inception, MBZUAI, Cerebras, 9 Dec 2025 | 70B, about 600B Arabic tokens | Open weights |
| K2 Think | MBZUAI and G42, Sep 2025 (70B ed. Jan 2026) | 32B | Fully open |
| Falcon-H1 Arabic | TII, 5 Jan 2026 | 3B, 7B, 34B; hybrid Mamba-Transformer; 256K | Falcon LLM License |
| Fanar-1-9B | QCRI, 2025 | 9B on Gemma-2, about 1T tokens (410B Arabic) | Open weights; licence unverified |

- **Benchmarks:** OALL v2 (native tasks, public sets), ArabicMMLU (about 14.5K native questions), BALSAM (78 tasks, 52K examples, blind sets), ABBL (contamination checks).
- **Contamination:** translated exposure raised MMLU accuracy by 2.8 to 11.3 points (NeurIPS 2026).
- **Licence inheritance:** fine-tunes carry the base model's terms (Llama, Gemma, Falcon).

## Funding (L3)

| Period | MAGNiTT | Wamda (appears to include debt) |
|---|---|---|
| FY2025 | USD 3.8 bn, 688 deals, +74%; AI 22% (USD 858 m); KSA USD 1.72 bn | USD 7.5 bn, 647 startups, +225%; KSA USD 5 bn; fintech 58% |
| H1 2026 | USD 1.35 bn, 214 deals; -22%, deals -41%; AI about 50% (USD 678 m); UAE 66%; KSA USD 219 m | USD 1.7 bn, 242 rounds, -18%; debt 29% |

- **Rule:** one provider and one period per sentence.
- **Derived:** implied 2024 about USD 2.2 to 2.3 bn (both); MAGNiTT average ticket USD 4.8 m (H1 2025) to 6.3 m (H1 2026); AI about USD 12.7 m vs non-AI 4.2 m per deal (approximate).
- **Not shown:** stage mix, undisclosed rounds, mega-round effects. Q3 2026 update exists: pull it.
- **Funds:** Global Ventures III (USD 150 m+, SVC), Khwarizmi II (USD 70 m+ first close, Feb 2026), F6 Group Riyadh (60 startups, USD 17 m), Plus VC (40 startups planned 2026). STV, BECO, Shorooq: no data, **unverified**.

## Talent (L4)

- **Segments:** producing markets, Gulf hiring markets, research hubs, diaspora.
- **Egypt:** offshoring about USD 5.2 bn 2025, target USD 6 bn 2026; 800K ICT-trained target; about 750K graduates a year; early-career Cairo engineer about E£139K a year (Payscale, 2026).
- **Missing:** emigration, diaspora size, reliable salaries. Do not quote without a primary source.

## Gaps and limits (L5)

- **Play:** cross-border builder network, Arabic-first technical media, diaspora connection, applied evaluation and open data, early-stage visibility.
- **Do not:** compute, frontier models, investing in members, cash accelerators, exclusive state branding.
- **Neutrality rules:** no exclusivity on core programmes, labelled sponsorship, model-agnostic rules, conflicts disclosed.

## Map and claim check (L6)

- **Schema:** entity, type, country, claim, status, source and tier, confidence, last verified, relevance, owner.
- **Five steps:** primary, date, definition and status, independent second source, arithmetic.
- **Tiers:** 1 issuer or primary record; 2 reputable press and trackers; 3 aggregators and posts.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| GPUs from power | $N \approx P_f/(\mathrm{PUE}\,p_g)$ | L1: 200 MW is about 94,000 GPUs at 1.7 kW, PUE 1.25 |
| Training compute | $C \approx 6ND$ | L2 |
| GPU-hours | $H = C/(F_{peak}\,u\,3600)$ | L2: about $1.43\times10^{18}$ FLOP per H100-hour at 40% |
| Score gap | $\Delta = S_{public} - S_{blind}$ | L2 |
| Year-on-year | $g = X_t/X_{t-1} - 1$ | L3 |
| Implied base | $X_{t-1} = X_t/(1+g)$ | L3 |
| Average ticket | $\bar{T} = F/n$ | L3 |
| Share | $s_i = F_i/F$ | L3 |
| Equity only | $E = F(1-\delta)$ | L3 |
| Excluding top rounds | $F_{-k} = F - \sum f_{(j)}$ | L3 |
| CAGR | $g = (X_T/X_0)^{1/T} - 1$ | L4 |
| Gap score | $G = I(1-c)a$ | L5 |
| Review load | $L = \sum N_i t_i/T_i$ | L6 |
`;

export default cheatSheet;
