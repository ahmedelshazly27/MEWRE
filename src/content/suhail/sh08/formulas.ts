import { md, type Formula } from "../../schema";

const formulas: Formula[] = [
  // ---------------------------------------------------------------- l01 motivation and retention
  {
    id: "sh08-retention-survival",
    name: "Share of a volunteer team still active after t months",
    tex: String.raw`\frac{N(t)}{N_0} = r^{t}, \qquad R_a = r^{12}`,
    vars: [
      { sym: "N_0", meaning: "People active at the start", unit: "people" },
      { sym: "N(t)", meaning: "Of those, people still active after t months", unit: "people" },
      { sym: "r", meaning: "Monthly retention: probability an active volunteer is still active a month later", unit: "dimensionless, 0 to 1" },
      { sym: "t", meaning: "Elapsed time", unit: "month" },
      { sym: "R_a", meaning: "Annual retention of one person", unit: "dimensionless, 0 to 1" },
    ],
    explanation: md`Assumes a constant monthly hazard, which is a simplification (early months are usually riskier). Useful to see how small monthly losses compound: $0.95^{12} = 0.54$, $0.90^{12} = 0.28$.`,
    lesson: "sh08-l01",
  },
  {
    id: "sh08-expected-tenure",
    name: "Expected tenure at constant monthly retention",
    tex: String.raw`T = \frac{1}{1 - r}`,
    vars: [
      { sym: "T", meaning: "Expected number of months a volunteer stays (mean of a geometric distribution)", unit: "month" },
      { sym: "r", meaning: "Monthly retention", unit: "dimensionless, 0 to 1" },
    ],
    explanation: md`At $r = 0.95$, $T = 20$ months; at $r = 0.90$, $T = 10$ months; at $r = 0.97$, about 33 months. Halving monthly attrition doubles expected tenure.`,
    lesson: "sh08-l01",
  },
  {
    id: "sh08-seat-turnover",
    name: "Recruits needed per year to keep L seats filled",
    tex: String.raw`H = 12\,L\,(1 - r)`,
    vars: [
      { sym: "H", meaning: "Expected recruits per year", unit: "people/yr" },
      { sym: "L", meaning: "Number of seats kept filled (vacancies refilled straight away)", unit: "seats" },
      { sym: "r", meaning: "Monthly retention", unit: "dimensionless, 0 to 1" },
    ],
    explanation: md`Each filled seat loses its holder with probability $1 - r$ every month. Five seats at $r = 0.95$ need about 3 recruits a year; at $r = 0.97$, about 1.8. Without refilling, expected leavers from the original team are $L(1 - r^{12})$, which is lower because replacements can leave too.`,
    lesson: "sh08-l01",
  },
  // ---------------------------------------------------------------- l02 roles and cadence
  {
    id: "sh08-coordination-links",
    name: "Pairwise communication channels in a team",
    tex: String.raw`K = \frac{n(n - 1)}{2}`,
    vars: [
      { sym: "K", meaning: "Number of possible pairwise channels", unit: "channels" },
      { sym: "n", meaning: "People who coordinate", unit: "people" },
    ],
    explanation: md`Brooks's observation in *The Mythical Man-Month*: coordination grows roughly with the square of team size. Six people have 15 channels, ten have 45. Charters with named interfaces and a shared written record keep the active channels near the real dependencies.`,
    lesson: "sh08-l02",
  },
  {
    id: "sh08-overlap-window",
    name: "Live overlap window across time zones",
    tex: String.raw`O = \max\!\left(0,\ \min_i e_i - \max_i s_i\right)`,
    vars: [
      { sym: "O", meaning: "Hours in which everyone is available at once", unit: "h" },
      { sym: "s_i", meaning: "Start of person i's availability, converted to UTC", unit: "h (UTC clock time)" },
      { sym: "e_i", meaning: "End of person i's availability, converted to UTC", unit: "h (UTC clock time)" },
    ],
    explanation: md`Convert every window to UTC first, remembering that European summer time and Egypt's summer time shift by an hour while Kuwait, Saudi Arabia and the UAE do not. Evening-only volunteers across Europe and the Gulf often have zero natural overlap.`,
    lesson: "sh08-l02",
  },
  // ---------------------------------------------------------------- l03 capacity
  {
    id: "sh08-effective-capacity",
    name: "Effective weekly capacity of a volunteer team",
    tex: String.raw`C = \sum_i a_i\,h_i`,
    vars: [
      { sym: "C", meaning: "Effective capacity", unit: "h/week" },
      { sym: "h_i", meaning: "Hours per week pledged by person i", unit: "h/week" },
      { sym: "a_i", meaning: "Availability factor: share of pledged hours actually delivered", unit: "dimensionless, 0 to 1" },
    ],
    explanation: md`Start with $a = 0.6$ to $0.8$ as an assumption and replace it with the measured ratio of logged to pledged hours after the first month. Illustrative Suhail Q1 2027: 30 pledged hours at $a = 0.7$ give 21 h/week.`,
    lesson: "sh08-l03",
  },
  {
    id: "sh08-load-factor",
    name: "Load factor",
    tex: String.raw`\lambda = \frac{D}{C}`,
    vars: [
      { sym: "\\lambda", meaning: "Load factor (utilisation of effective capacity)", unit: "dimensionless" },
      { sym: "D", meaning: "Hours of work per week the plan requires, including invisible work", unit: "h/week" },
      { sym: "C", meaning: "Effective capacity", unit: "h/week" },
    ],
    explanation: md`Above 1 the backlog grows by $D - C$ hours every week. Target 0.7 to 0.8 for a volunteer team because capacity varies so much week to week.`,
    lesson: "sh08-l03",
  },
  {
    id: "sh08-wait-multiplier",
    name: "Waiting time multiplier at utilisation u (M/M/1 queue)",
    tex: String.raw`\frac{W_q}{S} = \frac{u}{1 - u}`,
    vars: [
      { sym: "W_q", meaning: "Mean time a task waits before work on it starts", unit: "same unit as S (for example days)" },
      { sym: "S", meaning: "Mean time to do the task once started (service time)", unit: "days" },
      { sym: "u", meaning: "Utilisation (load factor below 1)", unit: "dimensionless, 0 to 1" },
    ],
    explanation: md`For a single queue with random arrivals and service times. At $u = 0.8$ the multiplier is 4, at 0.9 it is 9, at 0.95 it is 19. Kingman's approximation multiplies this by a variability term, which is large for volunteer capacity, so real waits are worse.`,
    lesson: "sh08-l03",
  },
  {
    id: "sh08-stall-probability",
    name: "Probability that a workstream stalls (bus test)",
    tex: String.raw`P_{\text{week}} = p^{k}, \qquad P_{\text{quarter}} = 1 - \left(1 - p^{k}\right)^{n}`,
    vars: [
      { sym: "p", meaning: "Probability that one able person is unavailable in a given week", unit: "dimensionless, 0 to 1" },
      { sym: "k", meaning: "Number of people able to do the work (with access and a procedure)", unit: "people" },
      { sym: "n", meaning: "Weeks in the period", unit: "weeks" },
      { sym: "P_{\\text{week}}", meaning: "Probability the workstream stalls in a given week", unit: "dimensionless" },
      { sym: "P_{\\text{quarter}}", meaning: "Probability of at least one stalled week in the period", unit: "dimensionless" },
    ],
    explanation: md`Assumes independent absences, which is optimistic (shared holidays, Ramadan, the same employer's crunch). With $p = 0.15$ over 12 weeks: 86% with one owner, 24% with a trained backup.`,
    lesson: "sh08-l03",
  },
  // ---------------------------------------------------------------- l04 recruiting
  {
    id: "sh08-pipeline-yield",
    name: "Applicants needed at the top of a volunteer pipeline",
    tex: String.raw`N_{\text{top}} = \frac{N}{\prod_{i} c_i}`,
    vars: [
      { sym: "N_{\\text{top}}", meaning: "Applications or sign-ups needed", unit: "people" },
      { sym: "N", meaning: "New active volunteers needed at the end of the pipeline", unit: "people" },
      { sym: "c_i", meaning: "Conversion rate of stage i (for example call, trial, completed trial, accepted offer)", unit: "dimensionless, 0 to 1" },
    ],
    explanation: md`Round up. Illustrative lead pipeline: $0.5 \times 0.5 \times 0.6 \times 0.7 = 0.105$, so about 10 applications per lead. Conversion rates are assumptions until you have measured your own.`,
    lesson: "sh08-l04",
  },
  // ---------------------------------------------------------------- l05 paid transition
  {
    id: "sh08-coverage-ratio",
    name: "Coverage ratio for opening a paid role",
    tex: String.raw`\kappa = \frac{12\,\bar{G}}{C_{\text{role}}}, \qquad \bar{G}^{*} = \frac{\kappa^{*}\,C_{\text{role}}}{12}`,
    vars: [
      { sym: "\\kappa", meaning: "Coverage ratio", unit: "dimensionless" },
      { sym: "\\bar{G}", meaning: "Trailing average monthly gross margin (revenue minus direct costs of the events and content it funds), for example over 6 months", unit: "USD/month" },
      { sym: "C_{\\text{role}}", meaning: "Fully loaded annual cost of the role", unit: "USD/yr" },
      { sym: "\\kappa^{*}", meaning: "Policy threshold (for example 1.5)", unit: "dimensionless" },
      { sym: "\\bar{G}^{*}", meaning: "Monthly margin needed to meet the threshold", unit: "USD/month" },
    ],
    explanation: md`Pair it with a reserve test (cash of at least several months of the role). Illustrative: USD 4,000/month against a USD 30,000/yr role gives $\kappa = 1.6$; the 1.5 threshold needs USD 3,750/month.`,
    lesson: "sh08-l05",
  },
  {
    id: "sh08-volunteer-shadow-value",
    name: "Shadow value of volunteer hours",
    tex: String.raw`V = w \sum_i h_i \, n_w`,
    vars: [
      { sym: "V", meaning: "Annual value of the hours at the replacement rate", unit: "USD/yr" },
      { sym: "w", meaning: "Replacement (market) hourly rate assumed", unit: "USD/h" },
      { sym: "h_i", meaning: "Weekly hours of person i (pledged, or delivered if multiplied by the availability factor)", unit: "h/week" },
      { sym: "n_w", meaning: "Working weeks per year", unit: "weeks/yr" },
    ],
    explanation: md`Makes the hidden subsidy visible. Illustrative: 25 h/week for 46 weeks at USD 30/h is USD 34,500 a year pledged. Use delivered hours (times the availability factor) when comparing with a paid role.`,
    lesson: "sh08-l05",
  },
  {
    id: "sh08-dynamic-equity",
    name: "Dynamic equity split (Slicing Pie)",
    tex: String.raw`s_i = \frac{S_i}{\sum_j S_j}, \qquad S_i = 2\,w_i H_i + 4\,K_i`,
    vars: [
      { sym: "s_i", meaning: "Share of person i", unit: "dimensionless, 0 to 1" },
      { sym: "S_i", meaning: "Slices of person i", unit: "USD-equivalent slices" },
      { sym: "w_i", meaning: "Market hourly rate of person i, minus anything actually paid", unit: "USD/h" },
      { sym: "H_i", meaning: "Unpaid hours contributed", unit: "h" },
      { sym: "K_i", meaning: "Cash contributed", unit: "USD" },
    ],
    explanation: md`Moyer's weights: non-cash contributions 2x, cash 4x (other contributions such as equipment or ideas have their own rules in the book). Only meaningful inside a properly formed company with a written agreement; for Suhail's sponsor-funded community activities the default is no equity.`,
    lesson: "sh08-l05",
  },
  // ---------------------------------------------------------------- l06 tools
  {
    id: "sh08-littles-law",
    name: "Little's law",
    tex: String.raw`W = \frac{L}{X}`,
    vars: [
      { sym: "W", meaning: "Average lead time from start to done", unit: "weeks" },
      { sym: "L", meaning: "Average number of items in progress", unit: "items" },
      { sym: "X", meaning: "Average throughput (items finished per week)", unit: "items/week" },
    ],
    explanation: md`Holds for any stable system averaged over time (Little, 1961). With throughput fixed by volunteer hours, a WIP limit is the only free lever on lead time: 12 items at 2 a week is 6 weeks; 4 items is 2 weeks.`,
    lesson: "sh08-l06",
  },
];

export default formulas;
