import { md } from "../../schema";

const cheatSheet = md`# FC05 Marketing & brand: cheat sheet

## Conventions

- **Numbers:** all venture numbers are **illustrative**, not traction.
- **Founder time:** priced at a loaded EUR 100/h (EUR 600 per person-day) unless stated.
- **Exchange rate:** 1 KWD = 3.25 USD (assumed).

## Brand

- **Brand is risk reduction:** will it work, will they last, will I look foolish.
- **Platform:** category, audience (with trigger), problem, promise, proof points, voice.
- **Proof ladder:** claim, mechanism, own evidence with method, third-party validation.
- **Most dangerous claim:** specific but unverifiable (fake precision).
- **Voice:** do and do-not rules plus banned words, not adjectives.
- **Names:** ownable (trademark, domain), sayable, safe in Arabic and English, distinctive; screen in EUIPO, WIPO, USPTO.
- **Engineering veto:** a partner signs off every technical claim; keep a claims register.

## Content and attribution

| Stage | Buyer question | Assets |
|---|---|---|
| Problem-aware | Why is this hard? | Posts, talks, regulatory primers |
| Solution-aware | How could it be solved? | Whitepaper, method note, webinar |
| Vendor evaluation | Does yours work? | Benchmark, app note, docs, demo on their data |
| Justification | Can I defend it? | Case study, security pack, ROI model |

- **Whitepaper test:** still useful with the product name deleted.
- **Benchmark:** method fixed in advance, fair tuning, disclosure, losing cases shown, licence terms checked.
- **Case study:** publicity clause in the pilot contract, agreed metrics, anonymised fallback.
- **U-shaped:** 40% first, 40% lead creation, 20% middle; always compare several models plus self-reported attribution.

## Developer marketing and community

- **Docs are the product page:** tutorial, how-to, reference, explanation (Diátaxis).
- **Main lever:** time to first value; ship sample data, no hardware in the quickstart.
- **Open source what is** useful alone and not where defensibility lies; Apache-2.0 for adoption.
- **Source-available** (BSL, SSPL) is not open source.
- **Community of practice:** domain, community, practice; health = members helping members.

## Events and PR

| Option (illustrative) | Full cost | Qualified | CPQL |
|---|---|---|---|
| Booth, 18 m² | EUR 28,500 | 18 | EUR 1,583 |
| Talk plus hosted dinner | EUR 9,100 | 9 | EUR 1,011 |
| Walking pass, pre-booked meetings | EUR 3,400 | 6 | EUR 567 |
| Mizan breakfast, Kuwait City | KWD 1,600 | 8 | KWD 200 |

- **Follow-up:** personal, within 48 hours, with one relevant asset.
- **News test:** new, significant to that outlet, concrete, timely, verifiable.
- **Release:** headline, dateline, lede, facts and quotes, boilerplate, media contact.
- **Embargo:** ask first, send after a yes; state time and time zone.
- **Partners announce on their terms:** nothing about KISR, a ministry or a customer without written approval.

## LinkedIn and bilingual communication

- **Cadence:** two to four posts a week for months; daily replies and comments on buyers' posts.
- **Outcome metric:** qualified conversations; illustrative quarter: ER 2.5%, EUR 600 per conversation.
- **Never automate** connections, messages, likes or scraping (User Agreement, GDPR, trust).
- **AI:** drafting and checking only; a human sends every message.

| Setting | Register |
|---|---|
| Letters, tenders, press releases, website | MSA |
| Panels, ministry and KISR meetings | Educated spoken Arabic |
| Podcast, hosting, voice notes | Gulf or Kuwaiti dialect |
| Founder and community posts | Light MSA, occasional dialect |

- **Pitfalls:** "pilot" is مشروع تجريبي; "soiling" is اتساخ, not تلوث; product names stay in Latin script.
- **Honorifics:** معالي (ministers), سعادة (senior officials), الدكتور or الدكتورة (researchers).
- **Layout:** check rendered RTL text with Latin names, numbers and % on a phone.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Conversion rate | $p = c/n$ | L01 message tests |
| Relative lift | $(p_B - p_A)/p_A$ | L01 |
| Two-proportion z | $z = (p_B - p_A)/\sqrt{\hat p(1-\hat p)(1/n_A + 1/n_B)}$ | L01, significant if $\lvert z\rvert \ge 1.96$ |
| Funnel | $N_{\text{won}} = N_0 \prod r_i$ | L02, L03 |
| Linear attribution | $a_j = V/n$ | L02 |
| U-shaped attribution | $0.4V$, $0.4V$, $0.2V/(n-2)$ | L02 |
| Content ROI | $(P_{\text{attr}}\,w\,g - C)/C$ | L02 |
| Activation rate | $a = N_{\text{success}}/N_{\text{start}}$ | L03 |
| Event cost | $A c_A + C_{\text{build}} + C_{\text{travel}} + N_s d\, c_{\text{day}} + C_{\text{promo}}$ | L04 |
| CPQL | $C_{\text{event}}/N_q$ | L04 |
| Pipeline and bookings | $P = N_q r_{\text{opp}} \text{ACV}$, $B = Pw$ | L04 |
| Engagement rate | $(R + K + S)/I$ | L05 |
| Cost per conversation | $(h c_h + C_{\text{tools}})/N_{\text{conv}}$ | L05 |
`;

export default cheatSheet;
