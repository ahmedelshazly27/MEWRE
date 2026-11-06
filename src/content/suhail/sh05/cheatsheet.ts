import { md } from "../../schema";

const cheatSheet = md`# SH05 Media operations: cheat sheet

## Conventions

- **Numbers:** all Suhail figures are **illustrative**; nothing has launched (plan starts January 2027).
- **Impressions:** delivered emails for the newsletter, IAB downloads in a fixed window for The Majlis. Never opens or raw requests.

## Editorial

- **Audience by job:** builders and founders are the core; employers, investors and sponsors follow them.
- **Promise:** who, what, why us, in one sentence; every item must pass it.
- **Pillars:** opportunities, builder story, Arab AI landscape, community, research notes (later).
- **Cadence is capacity:** plan at utilisation at or below about 0.8; consistency beats frequency.
- **Buffer:** two Majlis episodes recorded ahead of release.
- **Independence:** labels at the placement (Sponsored, برعاية), no sponsor preview or veto, conflicts disclosed, rankings and research never for sale, visible corrections.

## Newsletter

| Item | Rule |
|---|---|
| Steady state | $N^* = A/c$; halving churn doubles it |
| Halfway time | $\ln 0.5/\ln(1-c)$; 34 months at 2% churn |
| Opens | Inflated by Apple MPP since iOS 15 (September 2021); not a headline metric |
| Clicks | CTR on delivered, bot and scanner clicks filtered |
| Sunset | No click, reply or visit in about 120 days, re-engage, then remove |

- **SPF** (RFC 7208): allowed senders. **DKIM** (RFC 6376): signature. **DMARC** (RFC 7489): policy plus reports, needs **alignment** with From.
- **DMARC rollout:** p=none with reports, fix senders, quarantine, reject.
- **Gmail and Yahoo since 2024:** SPF, DKIM, DMARC, one-click unsubscribe (RFC 8058), spam rate below 0.3% (aim below 0.1%).
- **Domains:** auth.suhail.build for sign-in mail, news.suhail.build for the newsletter; records exactly as Resend generates them.
- **Signup:** double opt-in with consent records; language, role, country fields.

## The Majlis

| Spec | Value |
|---|---|
| Length | 40 to 60 min, seasons of 8 to 10 |
| Recording | Local WAV 48 kHz, 24 bit per speaker; double-ender for remote |
| Loudness | about -16 LUFS stereo, about -19 LUFS mono, true peak at most -1 dBTP |
| Broadcast reference | EBU R 128: -23 LUFS |
| Encoding | MP3 128 kbps stereo or 64 to 96 kbps mono |
| Download (IAB) | Bots filtered, at least 1 min delivered, IP plus user agent deduplicated over 24 h |

- **Guests:** invitations $= E/(p_a p_r)$; set diversity targets per season.
- **Clips:** one idea, best line first, 30 to 90 s, burned-in subtitles.

## Language

- **Speak naturally, write light MSA:** The Majlis in any dialect or code-switched; newsletter Arabic in light MSA; formal documents in MSA.
- **Never** rewrite a speaker's dialect into MSA in a quote.
- **Launch edition model:** full English plus transcreated Arabic digest; flip primary language when Arabic readers are the majority.
- **RTL:** lang and dir at html level, logical CSS, bdi or dir auto for Latin runs, Arabic font, no letter-spacing or faux italics, mirror arrows not logos.
- **SEO:** separate /ar and /en URLs, hreflang with x-default, no IP redirects, titles in the forms people type.

## Funnel and growth

| Lever | Effect on $A^* = Rc/(1-r-k)$ (base 3,000) |
|---|---|
| Reach +50% | 4,500 |
| Retention 0.85 to 0.90 | 6,000 |
| Referral 0.05 to 0.08 | 4,286 |

- **Order:** retention, then referral, then reach.
- **Referral:** social rewards, confirmed and active referrals only, $k$ by cohort.
- **Attribution:** UTMs plus referral codes plus self-reported source.

## Money and operations

- **Launch-scale CPM revenue:** about USD 4,000 a year (illustrative); sell packages tied to hiring, developer adoption and the Season.
- **Fact check** by someone other than the author; Partnerships never edits editorial.
- **AI drafts, humans verify** quotes against audio, names, numbers, register; no synthetic voice or likeness without written consent; disclose AI media.

## Formulas

| Quantity | Formula | Where |
|---|---|---|
| Production load | $L = \sum_i h_i f_i$ | L1 |
| Utilisation | $U = L/H$ | L1 |
| Net list growth | $\Delta N = A - cN$ | L2 |
| List steady state | $N^* = A/c$ | L2 |
| List trajectory | $N_t = N^* + (N_0 - N^*)(1-c)^t$ | L2 |
| Non-MPP open rate | $o_n \approx (O - mD)/((1-m)D)$ | L2 |
| CTR, CTOR | $K_u/D$, $K_u/O_u$ | L2 |
| Guest invitations | $n = E/(p_a p_r)$ | L3 |
| Loudness gain | $G = L_{\text{target}} - L_{\text{meas}}$ | L3 |
| File size | $S = bt/8$ | L3 |
| Hours per 100 clicks | $h_{100} = 100H/\sum n_g \text{CTR}_g$ | L4 |
| Funnel | $A_t = (r+k)A_{t-1} + Rc$ | L5 |
| Funnel steady state | $A^* = Rc/(1-r-k)$ | L5 |
| Referral rate | $k = i\,p_i$ | L5 |
| Placement price | $P = (I/1000)\,\text{CPM}$ | L6 |
| Effective CPM | $P_{\text{pkg}}/(I_{\text{pkg}}/1000)$ | L6 |
| Annual media revenue | $n\,s\,f\,\bar P$ | L6 |
`;

export default cheatSheet;
