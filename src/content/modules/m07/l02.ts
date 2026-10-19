import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "m07-l02",
  title: "Site Assessment, Surveys, Hydrology, EIA & Land",
  summary:
    "What you must know about a desert site before you design or tender: topography, geotechnics (pile pull-out tests, corrosive Kuwaiti soils, sabkha, gypsum), flash-flood hydrology, environmental impact assessment and land allocation.",
  minutes: 75,
  objectives: [
    "You can specify a topographic and geotechnical survey scope for a GW-scale PV site and interpret the results",
    "You can estimate pile uplift capacity from skin friction and judge a pile pull-out test campaign",
    "You can explain why sabkha, gypsum and chloride/sulfate-rich soils threaten steel and concrete, and size a sacrificial corrosion allowance",
    "You can estimate a design flood flow with the rational method and know what drainage design should follow",
    "You can map the EIA and land-allocation path and flag what must be confirmed with Kuwaiti authorities",
  ],
  concepts: [
    {
      id: "m07.geotech-investigation",
      name: "Geotechnical investigation",
      description:
        "Boreholes, test pits, CPTs, laboratory tests and field pile load tests that characterise soil strength, chemistry and groundwater for foundation design.",
      competency: "delivery",
      related: ["m07.pile-pullout", "m07.soil-corrosivity"],
    },
    {
      id: "m07.pile-pullout",
      name: "Pile pull-out (uplift) testing",
      description:
        "Field load tests applying axial tension (and lateral/compression) to trial piles to verify capacity and embedment before production piling.",
      competency: "delivery",
    },
    {
      id: "m07.soil-corrosivity",
      name: "Soil corrosivity",
      description:
        "The aggressiveness of soil to buried steel and concrete, driven by chlorides, sulfates, moisture, resistivity and pH; extreme in sabkha.",
      competency: "risk",
    },
    {
      id: "m07.flash-flood-hydrology",
      name: "Flash-flood hydrology",
      description:
        "Estimating runoff from rare intense desert storms across wadis and catchments to design drainage, set equipment elevations and avoid scour.",
      competency: "risk",
    },
    {
      id: "m07.eia-permitting",
      name: "EIA and permitting",
      description:
        "Environmental impact assessment and the sequence of permits and no-objection letters required before construction.",
      competency: "risk",
      related: ["m07.land-allocation"],
    },
    {
      id: "m07.land-allocation",
      name: "Land allocation",
      description:
        "Securing legal right to use the site, clearing competing claims (oil and gas, military, utilities, grazing) and fixing boundaries and corridors.",
      competency: "context",
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "Reading the ground",
      blocks: [
        {
          kind: "md",
          md: md`### Why site data drives cost and risk

On a 1 GW single-axis tracker plant there are roughly **250,000–330,000 piles**, **2+ million modules**, and **thousands of kilometres of cable**. A 30 cm change in required pile embedment, multiplied by 300,000 piles, is 90 km of extra steel. A misjudged flood path can wash out inverter skids worth tens of millions. Under FIDIC Yellow/Silver and EPC-IPP structures, **who carries ground risk** depends on contract wording — but the Employer always carries the consequence of a late or failed plant. The site data package is therefore the cheapest risk mitigation in the project.

### Topographic survey

Modern practice is **drone LiDAR or photogrammetry** with ground control points, delivering a digital terrain model (DTM) at 0.5–1 m grid with roughly ±5 cm vertical accuracy. What it is used for:

- **Tracker slope limits**: single-axis trackers tolerate limited north–south slope along the row (often in the order of 8–15 % depending on OEM and design) and rely on pile reveal adjustment for undulation. Exceeding it means grading, which costs money and disturbs the desert crust (more dust).
- **Earthworks balance** (cut/fill), drainage lines, road gradients.
- **Flood mapping**: the DTM feeds the hydrological model.
- **Inter-row shading and layout** in PVsyst for undulating ground.

### Geotechnical investigation

A typical scope for a GW site:

| Element | Purpose | Typical density (indicative) |
|---|---|---|
| Boreholes (to 10–20 m at substations, 5–8 m in array) | Stratigraphy, SPT, groundwater, samples | Grid of ~1 per 25–50 ha plus every substation/BESS/building |
| Test pits / trial trenches | Visual logging, cementation (gatch/caliche), cable trench diggability | ~1 per 10–25 ha |
| CPT (where soil allows) | Continuous strength profile | Supplement boreholes |
| Electrical resistivity (Wenner) | Earthing design and corrosivity | Grid across site + substations |
| Thermal resistivity | Cable rating (very important in hot dry sand) | Along cable routes |
| Laboratory chemistry | Chlorides, sulfates, pH, carbonates, gypsum content | Each borehole/pit |
| **Pile load tests** | Verify axial tension, compression and lateral capacity of the actual pile section | Tens to a few hundred locations across soil zones |

**Kuwaiti ground** is mostly calcareous desert sand and gravel, often with cemented layers locally called **gatch** (calcrete/gypcrete). Cemented layers are good for capacity but cause **pile refusal**: the driven pile stops short, and pre-drilling is needed, cutting piling productivity by half or worse. Near the coast and in low-lying areas, **sabkha** (salt flats) brings shallow saline groundwater, a salt crust, very high chlorides and sulfates, and soft, collapsible layers. **Gypsum** (calcium sulfate) dissolves when wetted — causing settlement or collapse — and attacks ordinary Portland cement concrete (sulfate attack).`,
        },
        {
          kind: "callout",
          tone: "why",
          title: "Why dry desert sand rates cables so badly",
          md: md`Cable current rating depends on how fast heat leaves the conductor. Moist soil conducts heat well (thermal resistivity ~1.0 K·m/W); **dry desert sand can exceed 2.5–3.0 K·m/W**, and ground temperature at cable depth in a Kuwaiti summer can exceed 35–40 °C. Both cut the allowable current, so the same MV cable carries far less in Shagaya than in Europe. That is why thermal resistivity tests along cable routes and special thermal backfill are not optional.`,
        },
        {
          kind: "md",
          md: md`### Pile uplift capacity

Tracker piles are usually governed by **wind uplift and lateral load**, not by compression. For a driven steel section in granular soil, the ultimate uplift capacity is dominated by skin friction along the embedded length:`,
        },
        { kind: "equation", formula: "m07-pile-uplift" },
        {
          kind: "md",
          md: md`$\bar f_s$ in dense desert sand may be 20–50 kPa; loose surface sand far less; cemented gatch much higher but with refusal risk. Because skin friction is hard to predict for thin open sections, **design is validated by field pull-out tests**, then production piles are specified (embedment per soil zone) with a safety factor (often 2.0 on ultimate, or partial factors under Eurocode 7).

A pre-construction pile test campaign typically includes axial tension, axial compression and lateral tests at several embedments per soil zone, sometimes tested to failure; plus **production proof tests** during construction (a small percentage of installed piles).

### Corrosion of buried steel

Tracker piles are hot-dip galvanised (ISO 1461 coatings of roughly 85–100+ µm on thick sections). Zinc corrodes first and protects the steel; once zinc is consumed, steel corrodes. A simple design check:`,
        },
        { kind: "equation", formula: "m07-sacrificial-steel" },
        {
          kind: "md",
          md: md`Corrosion rates depend on resistivity, chlorides, sulfates, moisture and oxygen. Dry, high-resistivity desert sand is mildly corrosive; **sabkha and wet saline zones can be several times worse**, especially at the **ground-line splash zone** where wet/dry cycling and oxygen concentrate attack. EN 1993-5 publishes loss allowances for steel piles in different soils that designers use as a reference. Mitigations: thicker sections, heavier galvanising, duplex coatings (zinc + epoxy), concrete-encased or screw-pile foundations, or relocating the array away from sabkha.

### Flash-flood hydrology

Kuwait is arid but not flood-free: rare convective storms over a hard desert surface produce sudden runoff along wadis and shallow depressions. For small catchments the **rational method** gives the design peak flow:`,
        },
        { kind: "equation", formula: "m07-rational-method" },
        {
          kind: "md",
          md: md`$C$ for compacted desert surfaces is high (0.4–0.8) because the crust sheds water. The design storm is chosen for a return period (e.g. 1-in-50 or 1-in-100 years for substations and BESS). Outputs drive: diversion bunds and channels, culverts under roads, **minimum equipment plinth heights** (inverter skids, BESS containers, substations), pile embedment against scour, and access during and after storms. Larger catchments need a proper hydrological model (e.g. HEC-HMS/HEC-RAS) using the DTM.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Kuwait flood and EIA specifics — confirm before use",
          md: md`Not in RESEARCH.md and must be confirmed with primary sources: (1) Kuwait's environmental framework is commonly cited as **Environment Protection Law No. 42 of 2014** (as amended) administered by the **Environment Public Authority (EPA)**, which requires an EIA for major projects; the exact EIA category, steps and review durations must be confirmed with the EPA. (2) Kuwait experienced severe flash flooding in **November 2018**, which is often cited in drainage design; obtain official rainfall IDF (intensity–duration–frequency) data from the Kuwait Meteorological Department. (3) Legacy **unexploded ordnance (UXO)** from 1990–91 is a recognised hazard in parts of Kuwait's desert; confirm survey and clearance requirements with the competent authority before intrusive works.`,
        },
        { kind: "sources", refs: ["m07-kuwait-epa", "m07-en-1993-5", "m07-iso-1461"] },
      ],
    },
    {
      layer: "applied",
      title: "Piles, corrosion and floods — numbers",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Uplift capacity and required embedment",
          given: md`Tracker pile: W-section with effective perimeter $p = 0.5$ m (enclosing rectangle). Pull-out tests in Zone 1 back-calculate average skin friction $\bar f_s = 30$ kPa. Proposed embedment 1.8 m. Design (factored) uplift per pile from the tracker OEM: 12 kN. Required safety factor on ultimate: 2.0. Neglect pile weight.`,
          steps: [
            { md: md`Ultimate uplift at 1.8 m: $Q_{ult} = p L \bar f_s = 0.5 \times 1.8 \times 30 = 27$ kN.` },
            { md: md`Allowable: $27/2.0 = 13.5$ kN ≥ 12 kN — OK with 12 % margin.` },
            { md: md`Minimum embedment: $L_{min} = \dfrac{\text{FS}\cdot Q_d}{p \bar f_s} = \dfrac{2.0 \times 12}{0.5 \times 30} = 1.6$ m.` },
            { md: md`Value of the test: at 300,000 piles, each 0.2 m of avoided embedment saves 60 km of steel section. A good test campaign pays for itself many times over.` },
          ],
          result: md`1.8 m is adequate (allowable 13.5 kN vs 12 kN); the theoretical minimum is 1.6 m. The designer will add scour allowance and a tolerance for the loose surface layer, which contributes little friction.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Gypsum zone: embedment and corrosion allowance",
          given: md`In Zone 3 (gypsiferous sand with saline moisture) tests give $\bar f_s = 25$ kPa. Design uplift 15 kN, FS 2.0, $p = 0.5$ m. Galvanising 100 µm; assumed zinc loss 8 µm/yr; steel loss after zinc is gone 25 µm/yr per face; design life 30 years.`,
          steps: [
            {
              md: md`Required embedment $L = \dfrac{2.0 \times 15}{0.5 \times 25}$ = ?`,
              hidden: true,
              check: { prompt: "Required embedment", answer: 2.4, unit: "m", tolerance: { abs: 0.02 } },
            },
            { md: md`Zinc life: $100/8 = 12.5$ years.` },
            {
              md: md`Steel loss per face over the remaining $30 - 12.5 = 17.5$ years: $17.5 \times 25$ = ? µm`,
              hidden: true,
              check: { prompt: "Sacrificial steel thickness per face", answer: 437.5, unit: "µm", tolerance: { rel: 0.01 } },
            },
            { md: md`So the structural check must use a section reduced by ≈ 0.44 mm on each exposed face at end of life (both flanges and web), concentrated near the ground line.` },
          ],
          result: md`Embedment 2.4 m (vs 1.6 m in Zone 1) and ≈ 0.44 mm/face corrosion allowance. Different soil zones need different pile specifications — the geotechnical report must map zones clearly.`,
        },
        {
          kind: "question",
          question: {
            id: "m07-l02-p1",
            type: "numeric",
            prompt: md`A wadi upstream of the BESS yard drains $A = 2.5$ km². Runoff coefficient $C = 0.6$; design rainfall intensity for the time of concentration at a 1-in-100-year return period is $i = 40$ mm/h. Using $Q = C i A / 3.6$, what is the design peak flow in m³/s?`,
            answer: 16.67,
            unit: "m³/s",
            tolerance: { rel: 0.02 },
            explanation: md`$Q = 0.6 \times 40 \times 2.5 / 3.6 = 16.7$ m³/s. The 3.6 converts mm/h·km² to m³/s. That is a substantial flow — enough to scour piles and flood a container yard; the drainage design must divert it around the BESS and the equipment plinths must sit above the design flood level with freeboard.`,
            concepts: ["m07.flash-flood-hydrology"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Running the site package on a real project",
      blocks: [
        {
          kind: "md",
          md: md`### Who does what

- **MEWRE / KAPP (pre-tender)**: commission the baseline site package — topo, geotech, hydrology, EIA scoping — so all bidders price the same ground. Under IPP tenders, a good **site data package** reduces risk premiums in tariffs.
- **Geotechnical contractor**: fieldwork and lab; produces a factual report (data) and an interpretive report (design parameters). Keep these separate in the tender: the Employer may warrant factual data but not interpretation.
- **EPC / developer**: own confirmatory investigation and pile test campaign after award; produces the foundation design.
- **Owner's Engineer**: reviews scope, witnesses tests, checks that design parameters follow from data.
- **Environmental consultant**: EIA, baseline surveys (ecology, archaeology, noise, dust), Environmental and Social Management Plan (ESMP).

### Land allocation

The Shagaya park covers about **84 km²** in Jahra Governorate. For new sites, land in Kuwait's desert interacts with oil and gas concessions (KOC operations and pipelines), military areas, utility corridors, grazing and camping, and municipal planning. RESEARCH.md notes that KPC/KOC have their own 1–2 GW solar plans that compete for land and grid. A PM must get:

1. A formal land allocation (or right-of-use) for the plant **and** corridors (OHL, access road, water supply).
2. **No-objection letters** from oil and gas, defence, civil aviation (glare and obstacle height for OHL towers), telecoms, and existing utilities.
3. Survey-fixed boundary coordinates matching the tender drawings.`,
        },
        { kind: "sources", refs: ["m07-pvmag-shagaya-2021"] },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Too few boreholes, in the wrong place**: geotech budgets cut at feasibility, then the EPC finds gatch refusal or sabkha across 20 % of the site and claims for **unforeseeable physical conditions** (FIDIC 4.12 under Red/Yellow).
- **Chemistry not tested**: no sulfate/chloride data, so concrete mix and pile coating are wrong.
- **Pile tests in summer only, at one embedment**: no failure data, so designers stay conservative and overspend steel.
- **Hydrology from satellite slope only**: no IDF data, no flood map; inverter skids placed in a depression.
- **Land "allocated" verbally**: a pipeline crossing appears during piling; works stop for months awaiting KOC approval.`,
        },
        {
          kind: "checklist",
          title: "PM site-package checklist",
          items: [
            "Topographic DTM delivered with accuracy statement and ground control report",
            "Geotech: borehole grid covers every soil zone, every substation, BESS yard and building",
            "Chemistry: chlorides, sulfates, pH, gypsum content, resistivity reported per location",
            "Thermal resistivity measured along cable routes (dry condition)",
            "Pile test campaign: tension, compression and lateral, multiple embedments, some to failure, per soil zone",
            "Corrosion allowance and coating specified per soil zone; sabkha zones excluded or specially designed",
            "Hydrology: design return period stated; flood map; plinth levels and drainage concept",
            "EIA scoping agreed with the EPA; baseline surveys scheduled before construction",
            "Land allocation document and all no-objection letters on file, with boundary coordinates",
            "UXO risk assessment and clearance certificate where required",
          ],
        },
        {
          kind: "ask",
          title: "Ask the geotechnical consultant / EPC",
          items: [
            "How many pile tests were taken to failure, and how did you derive skin friction per soil zone?",
            "Where did you meet refusal, and what pre-drilling productivity do you assume?",
            "What corrosion rates did you assume for zinc and steel in each zone, and what is the end-of-life section?",
            "What thermal resistivity did you use for cable rating, measured dry or wet?",
            "What design storm and return period sets the inverter/BESS plinth level, and what is the freeboard?",
            "Which existing services (pipelines, OHLs, telecoms) cross the site, and who has issued no-objection letters?",
          ],
        },
        { kind: "scenario", scenario: "m07-s2" },
        {
          kind: "feynman",
          prompt: "Explain to a finance colleague why spending KWD 1–2 m on geotechnical and hydrological surveys before tender can save tens of millions.",
          keyPoints: [
            "Pile count is huge, so small embedment changes scale to large steel quantities",
            "Unknown ground becomes contractor claims (unforeseeable conditions) or risk premiums in bids",
            "Corrosive soils (sabkha, gypsum) shorten foundation life without proper design",
            "Flood paths can destroy equipment; plinth levels and drainage depend on hydrology",
            "Same data for all bidders gives comparable, lower bids",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m07-l02-q1",
      type: "mcq",
      prompt: "What usually governs the design of single-axis tracker piles?",
      options: ["Compression from module weight", "Wind uplift and lateral load", "Seismic shear", "Thermal expansion of torque tubes"],
      answer: 1,
      explanation: md`Modules are light; wind on a large tilted surface creates uplift and overturning moments at the pile head. That is why pull-out and lateral tests are the core of the pile test campaign.`,
      concepts: ["m07.pile-pullout"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "m07-l02-q2",
      type: "numeric",
      prompt: md`Pile perimeter 0.45 m, average skin friction 35 kPa, design uplift 14 kN, FS 2.0. What minimum embedment (m)?`,
      answer: 1.78,
      unit: "m",
      tolerance: { abs: 0.02 },
      explanation: md`$L = \text{FS}\,Q_d/(p\,\bar f_s) = 2.0 \times 14/(0.45 \times 35) = 28/15.75 = 1.78$ m.`,
      concepts: ["m07.pile-pullout"],
      difficulty: 2,
    },
    {
      id: "m07-l02-q3",
      type: "multi",
      prompt: "Which are characteristic problems of sabkha ground for a PV plant? Select all.",
      options: [
        "High chloride and sulfate content attacking steel and concrete",
        "Shallow saline groundwater",
        "Very high cable ampacity due to wet soil",
        "Soft or collapsible layers",
        "Excellent pile capacity everywhere",
      ],
      answer: [0, 1, 3],
      explanation: md`Sabkha brings shallow saline water, salt crusts and weak layers. Wet soil may conduct heat better, but salinity and corrosion dominate the design; "excellent capacity" is not a property of sabkha.`,
      concepts: ["m07.soil-corrosivity", "m07.geotech-investigation"],
      difficulty: 1,
    },
    {
      id: "m07-l02-q4",
      type: "mcq",
      prompt: "Why does gypsum in the soil matter?",
      options: [
        "It increases soil thermal conductivity",
        "It dissolves when wetted (collapse/settlement) and causes sulfate attack on ordinary concrete",
        "It reduces glare from modules",
        "It has no engineering significance",
      ],
      answer: 1,
      explanation: md`Gypsum is soluble calcium sulfate: wetting (rain, cleaning water, leaks) can cause collapse, and sulfates attack ordinary Portland cement, requiring sulfate-resisting mixes and protective measures.`,
      concepts: ["m07.soil-corrosivity"],
      difficulty: 1,
    },
    {
      id: "m07-l02-q5",
      type: "decision",
      prompt: md`During production piling the EPC reports refusal at 1.0 m across a 60 ha area (cemented gatch) and requests a variation for pre-drilling plus a 6-week extension. The pre-tender geotech report showed one borehole in this area with "cemented layers at 0.8–1.5 m". What do you do as Employer's PM?`,
      options: [
        { text: "Approve immediately to avoid delay", score: 0.2, feedback: "The condition was disclosed in the factual data; entitlement is doubtful. Approving without analysis sets a costly precedent." },
        { text: "Reject outright — it's the contractor's risk", score: 0.4, feedback: "Possibly correct, but rejecting without checking contract allocation and the disclosed data risks a dispute you could lose." },
        { text: "Ask the Engineer/OE to assess against the contract's ground-risk clause and the disclosed factual data; meanwhile agree a technical solution (pre-drill or alternate pile) so work continues without prejudice", score: 1, feedback: "Separate the technical fix (keep working) from entitlement (contract analysis). This is how experienced Employers handle ground claims." },
      ],
      explanation: md`Whether refusal is "unforeseeable" depends on the contract (FIDIC 4.12 in Red/Yellow; Silver/EPC usually puts ground risk on the contractor) and what the disclosed data showed. Never let entitlement debates stop the works.`,
      concepts: ["m07.geotech-investigation"],
      difficulty: 3,
    },
    {
      id: "m07-l02-q6",
      type: "short",
      prompt: "List the no-objection letters or clearances a PM should secure for a new desert PV site in Kuwait, and explain why each matters.",
      rubric: [
        "Oil and gas (KOC/KPC) for concessions and pipelines",
        "Defence/military areas",
        "Civil aviation (OHL tower heights, glare)",
        "Existing utilities/telecom crossings",
        "Environmental approval (EPA/EIA)",
        "UXO clearance where required",
      ],
      modelAnswer:
        "Oil and gas operators (pipelines, wells, future field development), defence (restricted zones), civil aviation (obstacle heights of 400 kV towers, glare near flight paths), utilities and telecoms (crossings of buried services), EPA environmental approval after EIA, and UXO clearance for intrusive works. Each one, if missed, can stop piling or cable work mid-construction.",
      explanation: md`Land in Kuwait's desert overlaps oil and gas, defence and utility interests. A missing no-objection letter is a schedule risk that surfaces at the worst time — during construction.`,
      concepts: ["m07.land-allocation", "m07.eia-permitting"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "m07-l02-f1", front: "Pile uplift capacity (skin friction)", back: md`$Q_{ult} = p\,L\,\bar f_s + W_p$`, concepts: ["m07.pile-pullout"] },
    { id: "m07-l02-f2", front: "Rational method", back: md`$Q = C\,i\,A/3.6$ — Q m³/s, i mm/h, A km²`, concepts: ["m07.flash-flood-hydrology"] },
    { id: "m07-l02-f3", front: "What is gatch?", back: "Kuwaiti term for cemented calcareous/gypsiferous soil (calcrete/gypcrete) — strong but causes pile refusal.", concepts: ["m07.geotech-investigation"] },
    { id: "m07-l02-f4", front: "Sabkha", back: "Coastal/low-lying salt flat: shallow saline groundwater, salt crust, high chlorides/sulfates, weak layers.", concepts: ["m07.soil-corrosivity"] },
    { id: "m07-l02-f5", front: "Where does buried steel corrode fastest?", back: "Near the ground line (wet/dry cycling and oxygen), especially in saline soils.", concepts: ["m07.soil-corrosivity"] },
    { id: "m07-l02-f6", front: "Why measure soil thermal resistivity?", back: "Dry desert sand (2.5–3+ K·m/W) sharply reduces buried cable ampacity.", concepts: ["m07.geotech-investigation"] },
    { id: "m07-l02-f7", front: "Factual vs interpretive geotech report in tenders", back: "Employer may warrant factual data; interpretation is the designer's responsibility.", concepts: ["m07.geotech-investigation"] },
    { id: "m07-l02-f8", front: "Approximate pile count for 1 GW tracker plant", back: "~250,000–330,000 piles.", concepts: ["m07.pile-pullout"] },
  ],
  scenarios: [
    {
      id: "m07-s2",
      title: "The wadi on the layout",
      context: md`You are the MEWRE PM reviewing the EPC's 60 % layout for a 500 MW block. The hydrology report arrived late. It shows a shallow wadi crossing the planned BESS yard and two inverter stations. The EPC wants to keep the layout to protect the schedule.`,
      start: "a",
      concepts: ["m07.flash-flood-hydrology", "m07.geotech-investigation"],
      nodes: {
        a: {
          md: md`The EPC proposes raising plinths by 0.3 m "as a precaution" and keeping the BESS where it is. The hydrology report gives a 1-in-100-year flow of 17 m³/s with depths up to 0.6 m in the wadi.`,
          choices: [
            { text: "Accept the 0.3 m raise", next: "b", score: 2, feedback: "0.3 m is below the 0.6 m flood depth before freeboard; the BESS (fire and electrical hazard) sits in a flow path." },
            { text: "Require relocation of the BESS yard out of the flow path and a drainage design for inverter stations with plinths above design flood + freeboard; ask for schedule impact", next: "c", score: 9, feedback: "Hazardous, high-value assets go out of the flood path; lower-value array areas can be managed with drainage and scour protection." },
            { text: "Stop all design until a full new hydrology study is done", next: "b", score: 3, feedback: "The study already gives the answer; stopping everything is disproportionate." },
          ],
        },
        b: {
          md: md`Two years later a winter storm floods the wadi. Two BESS containers are inundated, triggering a fire-safety shutdown of the yard for weeks.`,
          choices: [
            { text: "Commission a root-cause review and relocation study", score: 3, feedback: "Necessary now — but this was foreseeable at design review." },
          ],
        },
        c: {
          md: md`The EPC says relocation costs 3 weeks of design time and moves the BESS 400 m, adding cable cost. It asks whether this is a variation.`,
          choices: [
            { text: "Check the contract: if hydrology was the EPC's design responsibility, no variation; if the Employer's site data was wrong, assess fairly through the Engineer", next: "d", score: 10, feedback: "Entitlement follows the contract, not who asks first." },
            { text: "Promise to pay to keep goodwill", next: "d", score: 4, feedback: "Goodwill payments without entitlement create precedent and audit exposure." },
          ],
        },
        d: {
          md: md`The relocation is agreed and recorded. Design review comments are closed with the revised layout.`,
          choices: [
            { text: "Add 'hydrology before 30 % layout' to the lessons-learned register and future tender scope", score: 10, feedback: "Excellent — feeding lessons back into the next tender is how a ministry gets better." },
          ],
        },
      },
    },
  ],
};

export default lesson;
