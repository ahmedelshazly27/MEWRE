import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 editorial calendar
  {
    id: "sh05-production-load",
    name: "Weekly production load",
    tex: String.raw`L = \sum_i h_i\, f_i`,
    vars: [
      { sym: "L", meaning: "Production load", unit: "h/week" },
      { sym: "h_i", meaning: "Production hours per item of type i (issue, episode, clip set)", unit: "h/item" },
      { sym: "f_i", meaning: "Items of type i per week (weekly 1, fortnightly 0.5, monthly 12/52)", unit: "items/week" },
    ],
    explanation: md`Measure $h_i$ on the first few items rather than guessing; include research, writing, Arabic edition, QA and sending for an issue, and guest prep, recording, editing and packaging for an episode.`,
    lesson: "sh05-l01",
  },
  {
    id: "sh05-utilisation",
    name: "Volunteer utilisation",
    tex: String.raw`U = \frac{L}{H}`,
    vars: [
      { sym: "U", meaning: "Utilisation of available volunteer hours", unit: "fraction" },
      { sym: "L", meaning: "Production load", unit: "h/week" },
      { sym: "H", meaning: "Volunteer hours reliably available", unit: "h/week" },
    ],
    explanation: md`Plan at $U \le 0.8$. Above that, one absence or a guest cancellation breaks the schedule, and missed issues cost more trust than a lower cadence.`,
    lesson: "sh05-l01",
  },
  // ---------------------------------------------------------------- l02 newsletter
  {
    id: "sh05-net-growth",
    name: "Net list growth per month",
    tex: String.raw`\Delta N = A - c\,N`,
    vars: [
      { sym: "\\Delta N", meaning: "Change in subscribers over the month", unit: "subscribers/month" },
      { sym: "A", meaning: "New confirmed subscribers", unit: "subscribers/month" },
      { sym: "c", meaning: "Monthly churn rate (unsubscribes, hard bounces, complaints, sunset removals)", unit: "1/month" },
      { sym: "N", meaning: "Subscribers at the start of the month", unit: "subscribers" },
    ],
    explanation: md`Churn is proportional to the list, acquisition is not, so growth slows as the list grows even with constant acquisition.`,
    lesson: "sh05-l02",
  },
  {
    id: "sh05-list-steady-state",
    name: "List steady state",
    tex: String.raw`N^* = \frac{A}{c}`,
    vars: [
      { sym: "N^*", meaning: "Steady-state list size", unit: "subscribers" },
      { sym: "A", meaning: "New confirmed subscribers", unit: "subscribers/month" },
      { sym: "c", meaning: "Monthly churn rate", unit: "1/month" },
    ],
    explanation: md`The ceiling where joins equal leaves. Illustrative: 400 a month at 2.5% churn gives 16,000. Halving churn doubles the ceiling.`,
    lesson: "sh05-l02",
  },
  {
    id: "sh05-list-trajectory",
    name: "List size over time",
    tex: String.raw`N_t = N^* + (N_0 - N^*)(1-c)^t`,
    vars: [
      { sym: "N_t", meaning: "Subscribers after t months", unit: "subscribers" },
      { sym: "N_0", meaning: "Subscribers at the start", unit: "subscribers" },
      { sym: "N^*", meaning: "Steady state A/c", unit: "subscribers" },
      { sym: "t", meaning: "Months", unit: "months" },
    ],
    explanation: md`Solution of $N_t = (1-c)N_{t-1} + A$. The gap to the steady state shrinks by $(1-c)$ a month; the time to close half of it is $\ln 0.5/\ln(1-c)$, about 34 months at 2% churn.`,
    lesson: "sh05-l02",
  },
  {
    id: "sh05-non-mpp-open-rate",
    name: "Estimated non-MPP open rate",
    tex: String.raw`o_n \approx \frac{O - m\,D}{(1-m)\,D}`,
    vars: [
      { sym: "o_n", meaning: "Open rate among recipients not using Apple Mail Privacy Protection", unit: "fraction" },
      { sym: "O", meaning: "Unique opens reported", unit: "count" },
      { sym: "m", meaning: "Share of delivered recipients using Apple Mail with MPP", unit: "fraction" },
      { sym: "D", meaning: "Delivered emails", unit: "count" },
    ],
    explanation: md`Assumes every MPP recipient registers an open. The estimate is only as good as $m$; prefer the platform's own machine-open flags when available, and use clicks for decisions.`,
    lesson: "sh05-l02",
  },
  {
    id: "sh05-ctr",
    name: "Click-through rate",
    tex: String.raw`\text{CTR} = \frac{K_u}{D}`,
    vars: [
      { sym: "\\text{CTR}", meaning: "Click-through rate", unit: "fraction or %" },
      { sym: "K_u", meaning: "Unique human clickers (bot and scanner clicks filtered)", unit: "count" },
      { sym: "D", meaning: "Delivered emails", unit: "count" },
    ],
    explanation: md`The headline engagement metric for sponsors. Filter clicks made on every link at once or within seconds of delivery (security scanners).`,
    lesson: "sh05-l02",
  },
  {
    id: "sh05-ctor",
    name: "Click-to-open rate",
    tex: String.raw`\text{CTOR} = \frac{K_u}{O_u}`,
    vars: [
      { sym: "\\text{CTOR}", meaning: "Click-to-open rate", unit: "fraction or %" },
      { sym: "K_u", meaning: "Unique human clickers", unit: "count" },
      { sym: "O_u", meaning: "Unique opens reported", unit: "count" },
    ],
    explanation: md`Measures how compelling the content is to people who opened, but the denominator is inflated by MPP, so CTOR is understated. Compare CTOR only between issues sent to similar audiences.`,
    lesson: "sh05-l02",
  },
  // ---------------------------------------------------------------- l03 podcast
  {
    id: "sh05-guest-invites",
    name: "Guest invitations needed",
    tex: String.raw`n = \frac{E}{p_a\, p_r}`,
    vars: [
      { sym: "n", meaning: "Invitations needed per period", unit: "invitations" },
      { sym: "E", meaning: "Episodes to release per period", unit: "episodes" },
      { sym: "p_a", meaning: "Share of invited guests who accept", unit: "fraction" },
      { sym: "p_r", meaning: "Share of accepted guests recorded and released", unit: "fraction" },
    ],
    explanation: md`Illustrative: 2 episodes a month at 40% acceptance and 90% completion needs 5.6 invitations a month. Add a buffer of recorded episodes for cancellations.`,
    lesson: "sh05-l03",
  },
  {
    id: "sh05-loudness-gain",
    name: "Loudness normalisation gain",
    tex: String.raw`G = L_{\text{target}} - L_{\text{meas}}`,
    vars: [
      { sym: "G", meaning: "Gain to apply", unit: "dB" },
      { sym: "L_{\\text{target}}", meaning: "Target integrated loudness (for example -16 LUFS stereo)", unit: "LUFS" },
      { sym: "L_{\\text{meas}}", meaning: "Measured integrated loudness to ITU-R BS.1770", unit: "LUFS" },
    ],
    explanation: md`1 LU equals 1 dB, so the gain is the difference. After applying it, check true peak: if it exceeds -1 dBTP, use a true-peak limiter and re-measure.`,
    lesson: "sh05-l03",
  },
  {
    id: "sh05-audio-file-size",
    name: "Encoded audio file size",
    tex: String.raw`S = \frac{b\, t}{8}`,
    vars: [
      { sym: "S", meaning: "File size", unit: "bytes" },
      { sym: "b", meaning: "Constant bit rate", unit: "bit/s" },
      { sym: "t", meaning: "Duration", unit: "s" },
    ],
    explanation: md`128 kbps for 50 minutes gives 48 MB; 96 kbps mono gives 36 MB. Smaller files download faster on mobile data, which matters for listeners across the region.`,
    lesson: "sh05-l03",
  },
  // ---------------------------------------------------------------- l04 language
  {
    id: "sh05-hours-per-100-clicks",
    name: "Production hours per 100 clicks",
    tex: String.raw`h_{100} = \frac{100\, H_{\text{issue}}}{\sum_g n_g\, \text{CTR}_g}`,
    vars: [
      { sym: "h_{100}", meaning: "Production hours per 100 unique clicks", unit: "h" },
      { sym: "H_{\\text{issue}}", meaning: "Production hours per issue for the edition model", unit: "h" },
      { sym: "n_g", meaning: "Subscribers in language group g", unit: "subscribers" },
      { sym: "\\text{CTR}_g", meaning: "Click rate of group g under the edition model", unit: "fraction" },
    ],
    explanation: md`Compares bilingual edition models on efficiency. It is a cost measure only: a model that underserves Arabic-first readers can look efficient while failing the mission.`,
    lesson: "sh05-l04",
  },
  // ---------------------------------------------------------------- l05 funnel
  {
    id: "sh05-community-funnel",
    name: "Community funnel recursion",
    tex: String.raw`A_t = (r + k)\,A_{t-1} + R\,c`,
    vars: [
      { sym: "A_t", meaning: "Active members in month t", unit: "members" },
      { sym: "r", meaning: "Monthly retention of active members", unit: "fraction" },
      { sym: "k", meaning: "New members per active member per month from referrals", unit: "1/month" },
      { sym: "R", meaning: "People reached per month", unit: "people/month" },
      { sym: "c", meaning: "Reach to member conversion", unit: "fraction" },
    ],
    explanation: md`The model behind the community-funnel widget. From $A_0 = 0$ the solution is $A_t = A^*(1-(r+k)^t)$.`,
    lesson: "sh05-l05",
  },
  {
    id: "sh05-funnel-steady-state",
    name: "Community funnel steady state",
    tex: String.raw`A^* = \frac{R\,c}{1 - r - k}`,
    vars: [
      { sym: "A^*", meaning: "Steady-state active members (requires r + k < 1)", unit: "members" },
      { sym: "R\\,c", meaning: "New members from content per month", unit: "members/month" },
      { sym: "r", meaning: "Monthly retention", unit: "fraction" },
      { sym: "k", meaning: "Monthly referral rate", unit: "1/month" },
    ],
    explanation: md`Sensitivity to retention is $Rc/(1-r-k)^2$, so near $r + k = 1$ retention and referral gains move the ceiling far more than reach.`,
    lesson: "sh05-l05",
  },
  {
    id: "sh05-viral-coefficient",
    name: "Referral rate (viral coefficient per month)",
    tex: String.raw`k = i \times p_i`,
    vars: [
      { sym: "k", meaning: "New members per active member per month", unit: "1/month" },
      { sym: "i", meaning: "Invitations sent per active member per month", unit: "1/month" },
      { sym: "p_i", meaning: "Share of invitations that become confirmed members", unit: "fraction" },
    ],
    explanation: md`Measure by cohort and count only confirmed members. Values well below 1 are normal: referral amplifies content reach, it does not replace it.`,
    lesson: "sh05-l05",
  },
  // ---------------------------------------------------------------- l06 monetisation
  {
    id: "sh05-cpm-revenue",
    name: "Placement price from CPM",
    tex: String.raw`P = \frac{I}{1000} \times \text{CPM}`,
    vars: [
      { sym: "P", meaning: "Placement price", unit: "USD" },
      { sym: "I", meaning: "Impressions: delivered emails or IAB downloads in a fixed window", unit: "count" },
      { sym: "\\text{CPM}", meaning: "Price per 1,000 impressions", unit: "USD per 1,000" },
    ],
    explanation: md`Illustrative: 5,880 delivered at USD 40 CPM gives USD 235.20. Never price on opens.`,
    lesson: "sh05-l06",
  },
  {
    id: "sh05-effective-cpm",
    name: "Effective CPM of a package",
    tex: String.raw`\text{eCPM} = \frac{P_{\text{pkg}}}{I_{\text{pkg}}/1000}`,
    vars: [
      { sym: "\\text{eCPM}", meaning: "Effective price per 1,000 impressions", unit: "USD per 1,000" },
      { sym: "P_{\\text{pkg}}", meaning: "Package price", unit: "USD" },
      { sym: "I_{\\text{pkg}}", meaning: "Total impressions the package delivers", unit: "count" },
    ],
    explanation: md`Use it to check that a package is neither far above the rate card without a visible reason nor a disguised discount.`,
    lesson: "sh05-l06",
  },
  {
    id: "sh05-annual-media-revenue",
    name: "Annual media revenue",
    tex: String.raw`\text{Rev} = n \times s \times f \times \bar{P}`,
    vars: [
      { sym: "\\text{Rev}", meaning: "Annual revenue from placements", unit: "USD/year" },
      { sym: "n", meaning: "Issues or episodes per year", unit: "items/year" },
      { sym: "s", meaning: "Sellable slots per item", unit: "slots/item" },
      { sym: "f", meaning: "Fill rate (share of slots sold)", unit: "fraction" },
      { sym: "\\bar{P}", meaning: "Average price per slot", unit: "USD" },
    ],
    explanation: md`At launch scale this gives a few thousand USD a year (illustrative: about USD 4,000 for newsletter and podcast combined at 50% fill), which is why Suhail sells packages tied to outcomes.`,
    lesson: "sh05-l06",
  },
];

export default formulas;
