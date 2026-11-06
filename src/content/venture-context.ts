/**
 * Facts an AI assistant may use when the learner drafts a real document for one of the ventures, and the checks
 * that keep the result honest. Client-light (no content imports): used by the "Do it with AI" panel and the
 * exercise workshop in the tutor. Only facts from docs/FOUNDER_BRIEF.md and docs/VENTURE_BRIEF.md belong here.
 */

export type VentureId = "afterwave" | "mizan" | "suhail" | "mewre" | "general";

export interface VentureContext {
  id: VentureId;
  name: string;
  /** Facts the assistant may rely on. Everything else must come from the learner or be marked an assumption. */
  facts: string[];
  /** Venture-specific checks on top of the general ones. */
  checks: string[];
}

export const VENTURES: Record<VentureId, VentureContext> = {
  afterwave: {
    id: "afterwave",
    name: "Afterwave",
    facts: [
      "Afterwave builds physical AI test infrastructure: it captures hardware and software data at the test bench and uses it to tell engineers what to retest.",
      "Products: Lockstep (capture app recording rig signals via data acquisition and on-screen actions on one clock); Afterwave Enclave (private environment where captured data, trained models and agents run, on customer servers or an isolated tenant); Ripple (change-impact engine: after a firmware, model or rig change, which tests to rerun and why). 'Bench memory' is the accumulated test data.",
      "Vision, in order: capture layer and Ripple; local models and agents inside Enclave; agents that plan retests, run rigs overnight with human approval and write reports; later, Afterwave's own instrumented test platforms (for example a generalised actuator test platform).",
      "Positioning: physical and embodied AI, not generic test automation. Regulatory entry point: EU Machinery Regulation 2023/1230, applying from 20 January 2027. Long term: safety evidence infrastructure, then a risk layer insurers can use.",
      "Team: the learner (CEO, go-to-market), Ismail Elmasry (ex-Tesla drive unit validation, now test systems at Signify), Yusuf Keklik (ex-Tesla drive inverter test and reliability). Applied to YC W27; considering Zurich.",
      "Target customers: hardware test teams in robotics, humanoids, drives and motors, batteries, powertrains and autonomous machines.",
      "No customers, pilots, revenue or partners exist yet unless the learner provides them.",
    ],
    checks: [
      "Enclave and Ripple capabilities are written as requirements or roadmap unless the engineering cofounders confirmed they exist today",
      "Standards and regulation (Machinery Regulation, ISO 13849, IEC 61508, ISO 26262, AI Act) checked against the primary text or a dated source",
    ],
  },
  mizan: {
    id: "mizan",
    name: "Mizan",
    facts: [
      "Mizan is an energy engineering company in Kuwait and the Gulf, product-focused on PV soiling analytics, cleaning optimisation and plant control functions such as stow and tracker control under dust, wind and extreme heat.",
      "Cofounder who may be named: Omar Abu Harb.",
      "Live thread: a soiling analytics pilot in Kuwait, target site Shagaya Phase I (operated by KISR), with KISR researchers (Mohammad Al-Khayat and co-authors of the 2020 Shagaya PV performance paper: Al-Rasheedi, Gueymard, Al-Khayat, Ismail, Lee, Al-Duaj, Renewable and Sustainable Energy Reviews 133 (2020) 110139) as methodology partner. The pilot is targeted or in preparation, not signed or running.",
      "KISR confirmed there is no standard method for turning operational data into cleaning decisions. The baseline is temperature-corrected performance ratio to IEC 61724. The 2018 to 2019 cleaning arm failure at Shagaya is a natural experiment for validation.",
      "Distribution thread: bringing software and turnkey hardware (controls, PPC/EMS, BESS, cleaning robots, possibly Chinese integrators) to Kuwait. SwishOS (Swish Solar) was discussed as a soiling analytics partner; nothing is agreed.",
      "Planned open-source research tools: Kuwait dust and soiling atlas, Kuwait electricity dataset, Kuwait energy systems toolkit.",
    ],
    checks: [
      "The Shagaya pilot is described as targeted or in preparation, never as signed, running or validated by KISR",
      "KISR, MEWRE, SwishOS and any other organisation are named only in ways they have agreed to; no implied endorsement",
      "Kuwaiti law, procurement and PPA terms marked to verify with counsel or the official source",
    ],
  },
  suhail: {
    id: "suhail",
    name: "Suhail",
    facts: [
      "Suhail (سهيل) is a builder ecosystem for the Arab world: hackathons, events, a newsletter, the Suhail Season conference, The Majlis podcast, connecting builders with investors and employers, and a planned research arm for open-weight models, datasets and benchmarks for the Arab world.",
      "Domain suhail.build; site on Vercel with its own Supabase and Resend.",
      "Team of leads (Partnerships, Events and Programming, Editorial, Head of Engineering, Finance Lead), unpaid until revenue. The plan starts January 2027. Modelled partly on {Tech: Europe}.",
      "Nothing has launched yet: no members, sponsors, events or numbers exist.",
    ],
    checks: [
      "No members, sponsors, partners, events or audience numbers presented as real; all figures labelled as plans or assumptions",
      "Permits, tax and data-protection rules for the chosen country marked to verify",
    ],
  },
  mewre: {
    id: "mewre",
    name: "MEWRE",
    facts: [
      "The learner is preparing to be a renewable-energy Project Manager at Kuwait's Ministry of Electricity, Water and Renewable Energy (MEWRE): Shagaya Renewable Energy Park and new utility-scale PV and BESS IPPs.",
    ],
    checks: [
      "No real ministry documents, bidder data or personal information pasted into an AI tool unless the tool is approved for that classification",
      "Kuwait facts (projects, capacities, laws, tariffs) checked against KAPP, MEWRE, CAPT or the official gazette",
    ],
  },
  general: {
    id: "general",
    name: "your venture",
    facts: ["Pick the venture this exercise is for (Afterwave, Mizan or Suhail) and paste its facts, or use a fictional company."],
    checks: [],
  },
};
