import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh02-l04",
  title: "Operations: venue, power and network capacity, food, safety, volunteers and run-of-show",
  summary:
    "A hackathon is a small, temporary data centre full of tired people. This lesson sizes the two things that fail most often (network and power) from first principles, then covers venue selection, catering quantities, safety and code of conduct, the volunteer plan and the minute-by-minute run-of-show, with an illustrative budget in the event P&L model.",
  minutes: 85,
  objectives: [
    "Specify venue requirements for a 24-hour hackathon, including occupancy, overnight access and layout",
    "Size uplink bandwidth and access points from participants, devices and usage, and plan for large downloads",
    "Size power circuits from per-seat load, diversity and circuit rating, and lay them out so nothing trips",
    "Plan catering quantities, safety arrangements and a code of conduct with a response team",
    "Write a volunteer plan and a run-of-show for a 24-hour event, and read its budget in the event P&L",
  ],
  concepts: [
    { id: "sh02.venue-requirements", name: "Venue requirements", description: "Certified occupancy, overnight access and security, a main hall with tables and power, breakout and quiet rooms, a stage with AV for demos, a food area separate from laptops, a rest area, prayer room, accessible toilets and transport access.", competency: "sh-events", related: ["sh02.power-capacity", "sh02.network-capacity"] },
    { id: "sh02.network-capacity", name: "Network capacity planning", description: "Uplink sized from participants times average per-person rate times headroom; access points sized from concurrent devices per access point; large downloads (model weights, container images) handled by caching or pre-loading; a second uplink as backup.", competency: "sh-events", related: ["sh02.venue-requirements"] },
    { id: "sh02.power-capacity", name: "Power capacity planning", description: "Circuits sized from per-seat load and the usable power of one circuit (voltage times rated current times a continuous-load factor), laid out so each circuit serves a fixed group of seats; catering and AV on separate circuits.", competency: "sh-events", related: ["sh02.venue-requirements"] },
    { id: "sh02.run-of-show", name: "Run-of-show", description: "The minute-by-minute schedule of the event with owner, location and cue for every item, from doors to wrap-up, including meals, check-ins, prayer breaks, submission deadline and demos.", competency: "sh-events", related: ["sh02.volunteer-plan"] },
    { id: "sh02.volunteer-plan", name: "Volunteer plan", description: "Roles, shifts and ratios for volunteers (registration, food, tech support, mentors coordination, safety and code of conduct, media, judging logistics), with a named lead per shift and a briefing.", competency: "sh-events", related: ["sh02.run-of-show"] },
    { id: "sh02.code-of-conduct", name: "Code of conduct and safety", description: "Published behaviour rules with a reporting channel and a named response team, plus physical safety: first aid, fire wardens, overnight arrangements, food safety, electrical safety and an incident log.", competency: "sh-events", related: ["sh02.volunteer-plan"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Sizing the event like a small data centre",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You are a systems engineer; this is the lesson where that shows. Builders forgive cold pizza. They do not forgive wifi that dies at 1 am or a circuit that trips every time a team plugs in a monitor. Suhail's reputation with builders and sponsors will be set by the first two or three events, and the infrastructure failures are predictable and preventable with arithmetic you already know.`,
        },
        {
          kind: "md",
          md: md`### Venue requirements

| Requirement | Why | What to ask |
|---|---|---|
| **Certified occupancy** above your total headcount | Fire safety; it is a hard limit | "What is the certified capacity of this room, in writing?" |
| **Overnight access and security** | 24-hour events | "Who is on site overnight? Can doors be locked to non-attendees?" |
| **Main hall** with tables of 4 to 8 and power at every table | Teams sit together | Floor plan with socket locations |
| **Stage and AV** (projector or screen, HDMI and USB-C adapters, microphones, a stable demo laptop) | Kick-off and demos | "Can we test the projector with a laptop the day before?" |
| **Breakout rooms** | Mentoring, judging in parallel, quiet calls | Number and size |
| **Rest area** (separate for women and men overnight in most Gulf venues) | Safety and comfort | Lighting, distance from main hall |
| **Prayer room** (musalla) and ablution facilities | Most participants will pray; prayer times fall during the event | Location, capacity |
| **Food area** away from laptops | Spills and cleaning | Can the caterer access it? |
| **Accessible toilets, step-free access** | Access | Route from entrance to hall |
| **Transport** | In Gulf heat nobody walks; late-night taxis | Parking, ride-hailing pick-up point |

University campuses, coworking spaces, corporate offices and innovation hubs are the usual partners because they own the space and often donate it in exchange for branding and access to talent.

### Network capacity

Two numbers matter: **uplink bandwidth** (the pipe to the internet) and **access point capacity** (how many devices the wifi can serve at once).

Uplink, sized from average use with headroom:`,
        },
        { kind: "equation", formula: "sh02-uplink" },
        {
          kind: "md",
          md: md`What sets $\bar r$: an AI hackathon is mostly API calls (small) and git pushes, punctuated by large downloads: Python packages, container images, and above all **model weights**, which run from hundreds of megabytes to tens of gigabytes. An illustrative planning value of 2 Mbps average per person, with headroom $k_h = 1.5$, gives for 150 people $150 \times 2 \times 1.5 = 450$ Mbps. Specify a 1 Gbps symmetric line so uploads (video submissions, pushes) do not starve.

**Large downloads break the average.** If 30 teams each pull 8 GB of model weights in the first hour, that is 240 GB $= 1{,}920$ Gb. At 400 Mbps available for downloads: $1{,}920 / 0.4 = 4{,}800$ s $= 80$ minutes of a saturated link, during which nobody else can work. Use the download-time formula:`,
        },
        { kind: "equation", formula: "sh02-download-time" },
        {
          kind: "md",
          md: md`Mitigations: provide hosted model endpoints or cloud GPU credits from sponsors so weights stay in the cloud; pre-load common models and images onto a local file server or USB drives; run a local package cache; announce "download before you come" with a list.

**Access points.** Devices are typically 2 to 3 per participant (laptop, phone, sometimes a tablet or a second laptop). Consumer routers handle a few dozen clients; enterprise high-density planning works with roughly 25 to 50 active clients per access point, depending on the hardware and channel plan (illustrative planning range; confirm with the venue's IT team or vendor). For 150 people with 2.4 devices each, 360 devices at 30 per access point need **12 access points**, spread through the room, on non-overlapping 5 GHz channels, with a separate SSID for staff and demos.

**Backup:** a second uplink from a different provider, or two or three 5G routers with data plans, kept ready for the demo stage at minimum. The demo laptop should work offline if the product allows it.

### Power capacity

The usable power of one circuit:`,
        },
        { kind: "equation", formula: "sh02-circuit-power" },
        {
          kind: "md",
          md: md`$k_c$ is a continuous-load factor: a common planning practice (from the US National Electrical Code; installation rules differ by country) is to load a circuit continuously to no more than 80 % of its rating. For a 16 A circuit at 230 V: $P_{circ} = 230 \times 16 \times 0.8 = 2{,}944$ W. At Kuwait's 240 V, 3,072 W. Many Gulf buildings use UK-style BS 1363 sockets on ring or radial circuits; ask the venue electrician which outlets share a circuit and what each is rated.

**Load per seat.** A laptop charger is rated 45 to 140 W; it draws close to its rating when the battery is low and the machine is under load, much less when charged. Phones add 5 to 25 W; an external monitor 20 to 40 W. A planning value of **100 W per seat** is a reasonable conservative figure. With a diversity factor $D$ (not everyone at peak at once) of 0.7, average load is about 70 W per seat.

Number of circuits for participants:`,
        },
        { kind: "equation", formula: "sh02-circuits" },
        {
          kind: "md",
          md: md`Two ways to use it. **Diversified** (whole room on a shared set of circuits): 120 seats $\times$ 100 W $\times$ 0.7 $= 8.4$ kW, $8.4 / 2.944 = 2.85$, so 3 circuits. **Per circuit undiversified** (each circuit serves a fixed group of seats and must survive all of them charging at once at kick-off and after the overnight lull): 2,944 W / 100 W per seat = 29 seats per circuit at most; at 24 seats per circuit, 120 seats need **5 circuits**. Small groups have little diversity, so lay out by the undiversified rule.

**Separate circuits** for: coffee machines and kettles (2 to 3 kW each: one per circuit), catering hot boxes, AV and the stage, and the network rack (ideally on a UPS). A kettle on a participant circuit is the most common cause of a trip at 2 am.

**Electrical safety:** no daisy-chained power strips; use strips with overload protection; tape or cover cables across walkways; label each strip with its circuit.

### Food and water

- **Quantities:** order for expected attendance (Lesson 3), not acceptances, plus staff, volunteers and judges, plus about 10 %. A 24-hour event needs roughly three meals, one late-night snack round, breakfast-style food at dawn, and continuous coffee, tea, water and fruit.
- **Water:** in Gulf heat and air conditioning, about 3 litres per person per day is a sensible planning figure.
- **Defaults for the region:** halal food from a licensed caterer, vegetarian and vegan options, allergies labelled, no alcohol. Dates and Arabic coffee at kick-off are a small, appreciated touch.
- **Food safety:** hot food held hot, cold food cold; nothing left out for hours overnight; a caterer, not volunteers, handles cooked food.

### Safety and code of conduct

- **Code of conduct:** published at registration, read out at kick-off, with a reporting channel (phone number, email, named people wearing a visible colour) and a response process. MLH's code of conduct is a widely used model.
- **First aid:** a trained first-aider on every shift, a kit, the nearest hospital and emergency numbers on the staff sheet.
- **Fire:** exits clear, wardens named, headcount at check-in so you know who is in the building.
- **Overnight:** rest areas separated and lit, no one leaves alone late at night without transport, a staff member awake and on the floor at all times.
- **Incident log:** every incident written down with time, people and action.
- **Insurance:** public liability insurance through the venue or your own policy; check what the venue requires.
- **Photos:** a visible way to opt out (for example a lanyard colour), and consent for the event photos you will publish.

### Volunteers

An illustrative staffing rule: about one volunteer per 10 participants during the day shift and one per 20 overnight, plus a shift lead who makes decisions. Roles: registration and check-in; food and venue; tech support (network, power, adapters); mentor coordination; safety and code of conduct; media (photos, social posts); judging logistics. Brief every volunteer 1 hour before doors with the run-of-show, the escalation chain and the code-of-conduct process. Feed them first.`,
        },
        { kind: "widget", widget: "event-pnl", caption: "Set attendees, sponsor tiers, venue, catering, prizes, production and contingency. Try the operations budget from the worked example: what does the event cost per attendee, and how much of it must sponsors cover? Sponsorship sales are treated in depth in the next module." },
      ],
    },
    {
      layer: "applied",
      title: "Specifying network and power for a 150-person event",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Network and power spec for an illustrative 24-hour AI hackathon",
          given: md`Illustrative Suhail event: 120 participant seats, 30 staff, mentors, judges and sponsors (150 people). Design for capacity, not for expected attendance. Planning values: 2 Mbps average per person, headroom 1.5, 2.4 devices per person, 30 clients per access point, 100 W per participant seat, 16 A circuits at 230 V, continuous-load factor 0.8, 24 seats per circuit.`,
          steps: [
            { md: md`**Uplink:** $B = N \bar r k_h = 150 \times 2 \times 1.5 = 450$ Mbps. Specify **1 Gbps symmetric** with a 5G backup for the stage.` },
            { md: md`**Access points:** devices $= 150 \times 2.4 = 360$; $360 / 30 = 12$ access points, plus one spare.` },
            { md: md`**Model-download stress test:** 30 teams $\times$ 8 GB $= 240$ GB $= 1{,}920$ Gb. At 400 Mbps: $t = 1{,}920 / 0.4 = 4{,}800$ s $= 80$ min. Decision: sponsor-hosted model endpoints and a local file server with the five most-used models pre-loaded; "download before you come" list in the reminder email.` },
            { md: md`**Circuit capacity:** $P_{circ} = 230 \times 16 \times 0.8 = 2{,}944$ W.` },
            { md: md`**Participant circuits:** undiversified per circuit, 24 seats $\times$ 100 W $= 2{,}400$ W $\le 2{,}944$ W (82 % of usable). $120 / 24 = 5$ circuits. Diversified check for the whole room: $120 \times 100 \times 0.7 = 8.4$ kW over 5 circuits $= 1.68$ kW each, comfortable.` },
            { md: md`**Other circuits:** 2 for coffee and kettles, 1 for catering hot boxes, 1 for stage and AV, 1 for the network rack on a UPS, 1 spare: **11 circuits in total**. Ask the venue electrician to map which sockets belong to which.` },
          ],
          result: md`1 Gbps uplink with 5G backup, 13 access points, a local model cache, and 11 separately mapped 16 A circuits (5 for participants). The cost of this spec is mostly a network rental and an electrician's afternoon; the cost of skipping it is the event.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Your turn: a 60-person evening sprint in Kuwait",
          given: md`60 participants plus 10 staff. 1.5 Mbps average per person, headroom 1.5. 100 W per participant seat. Kuwait supply 240 V, 16 A circuits, factor 0.8, seats grouped 20 per circuit.`,
          steps: [
            { md: md`Uplink: $70 \times 1.5 \times 1.5$.` },
            { md: md`$=$ **157.5 Mbps**; a 300 Mbps line with headroom is enough for an evening without large downloads.`, hidden: true, check: { prompt: "Required uplink (Mbps)", answer: 157.5, tolerance: { abs: 0.5 }, unit: "Mbps" } },
            { md: md`Usable power per circuit at 240 V: $240 \times 16 \times 0.8$.` },
            { md: md`$=$ **3,072 W**. Twenty seats at 100 W $= 2{,}000$ W per circuit, well within it, so 60 seats need **3 participant circuits**.`, hidden: true, check: { prompt: "Usable power per circuit (W)", answer: 3072, tolerance: { abs: 1 }, unit: "W" } },
          ],
          result: md`About 160 Mbps and 3 participant circuits, plus a separate circuit for coffee. Small events fail on the same two things as big ones, just with fewer witnesses.`,
        },
      ],
    },
    {
      layer: "field",
      title: "The run-of-show and the night itself",
      blocks: [
        {
          kind: "md",
          md: md`### Illustrative run-of-show: 24-hour hackathon in the Gulf (Friday to Saturday)

Starting on Friday afternoon, after the midday Friday prayer, fits the Gulf weekend (Lesson 6). Prayer times shift with date and city; put them in the run-of-show for the actual date and never schedule an announcement or a deadline on top of one.

| Time | Item | Owner | Notes |
|---|---|---|---|
| Fri 14:00 | Volunteer briefing, network and power test | Shift lead, tech lead | Every circuit, every access point, the projector |
| 15:00 | Doors, check-in, badges with skill colours | Registration | QR from Luma; headcount for fire safety |
| 16:00 | Kick-off: welcome, code of conduct, challenge pack, one 10-minute sponsor slot | Events lead | Problem statements and datasets revealed now |
| 16:40 | Team matching session | Facilitator | Teams registered and repositories submitted by 18:30 |
| 17:00 | Build starts | All | Mentors on the floor |
| 18:30 | Team and repository deadline | Judging logistics | Late teams placed by organiser |
| 20:00 | Dinner | Food | Separate area |
| 22:00 | Mentor check-in round 1 | Mentor coordinator | Every team: scope realistic? |
| 00:30 | Late snack | Food | |
| 01:00 | Night shift starts | Night shift lead | Rest areas open; one staff member always on the floor |
| 06:00 | Breakfast | Food | |
| 09:00 | Mentor round 2: "what will you demo?" | Mentor coordinator | Push teams to cut scope |
| 12:30 | Lunch | Food | |
| 14:00 | Submission deadline (hard) | Judging logistics | Repository, 2-minute video, write-up |
| 14:15 | Judging round 1 in parallel rooms | Judging logistics | Lesson 5 |
| 16:00 | Finalist demos on stage | Events lead | |
| 17:00 | Deliberation; community talk or Majlis live recording | Head judge | |
| 17:30 | Winners announced, photos | Events lead | |
| 18:00 | Close, clean-up | All | Lost property, venue walk-through |

### What goes wrong at night

- **The network goes down** (see the scenario below). Have the backup tested, and the provider's emergency number on paper.
- **Morale collapses at 3 to 5 am.** Mentors who are awake, music, a short walk-through of each team's plan, and food help more than speeches.
- **Scope creep.** Teams that are still adding features at 11 am do not demo. The 09:00 mentor round exists to cut scope.
- **Exhausted staff.** Shift leads must sleep; plan the night shift with people who did not work the setup.`,
        },
        {
          kind: "checklist",
          title: "Day-before checklist",
          items: [
            "Occupancy certificate and venue contact for overnight issues, on paper",
            "Network: uplink speed test, every access point online, staff SSID, backup 5G routers charged and tested",
            "Power: circuit map, strips labelled per circuit, kettles and coffee on their own circuits",
            "AV: projector or screen tested with HDMI and USB-C, microphones, a demo laptop, adapters box",
            "Food: caterer confirmed with headcount, delivery times, dietary labels, water quantity",
            "Safety: first-aider per shift, kit, emergency numbers, fire exits clear, rest areas set up",
            "Code of conduct printed, response team named and wearing a visible colour",
            "Challenge pack, datasets and API credits tested on the venue network",
            "Run-of-show printed for every volunteer, with prayer times for the date",
          ],
        },
        { kind: "scenario", scenario: "sh02-s1" },
        { kind: "xref", to: "m08.heat-stress", note: "Heat-stress limits and controls from the Track 0 HSE lesson: relevant for outdoor queues, transport waits and any summer event in the Gulf." },
        {
          kind: "question",
          question: {
            id: "sh02-l04-p1",
            type: "short",
            prompt: md`**Write the operations spec you would send to a candidate venue** for a Suhail 24-hour hackathon with 100 participant seats and 25 other people. Include: (1) the venue requirements list; (2) network spec with working (uplink, access points, plan for large downloads, backup); (3) power spec with working (per-seat load, circuit capacity, number and grouping of circuits, separate circuits); (4) catering quantities; (5) safety arrangements; (6) a volunteer plan by shift.`,
            rubric: [
              "Venue requirements include certified occupancy with total headcount, overnight access and security, rest areas, prayer room, AV, accessibility and transport",
              "Network spec computes uplink from people, average rate and headroom, and access points from devices per access point, with a concrete large-download mitigation and a backup",
              "Power spec computes usable circuit power (V x A x factor) correctly, groups seats per circuit with an undiversified check, and separates catering and AV",
              "Catering is sized from expected attendance plus staff plus a margin, with water and regional defaults (halal, allergies)",
              "Safety and volunteer plan name roles, shifts, first aid, code-of-conduct response and an incident log",
            ],
            modelAnswer: md`**1. Venue:** certified occupancy at least 140 (we will have 125 people at most); access from Friday 13:00 to Saturday 19:00 with overnight security; main hall for 100 at tables of 4 to 6 with sockets mapped; stage with screen, HDMI and USB-C, two microphones; 3 breakout rooms for judging; separate rest areas for women and men; prayer room and ablution; food area away from laptops; step-free access and accessible toilets; parking and a ride-hailing pick-up point.

**2. Network:** $125 \times 2 \times 1.5 = 375$ Mbps, so a 1 Gbps symmetric line. Devices $125 \times 2.4 = 300$; at 30 per access point, 10 access points plus a spare, 5 GHz, separate staff SSID. Large downloads: 25 teams $\times$ 8 GB $= 200$ GB $= 1{,}600$ Gb, 67 minutes at 400 Mbps, so sponsor-hosted model endpoints and a local cache with common models; download list in the reminder. Backup: two 5G routers with data, one reserved for the stage.

**3. Power:** 100 W per seat; 16 A at 230 V and factor 0.8 gives 2,944 W per circuit; 20 seats per circuit (2,000 W), so 5 participant circuits. Separate circuits: 2 for coffee and kettles, 1 catering, 1 AV, 1 network rack on UPS, 1 spare. No daisy chains; strips labelled by circuit.

**4. Catering:** expected participants about 91 (Lesson 3 method: 130 acceptances at a 0.70 show rate) plus 25 staff $= 116$, plus 10 % $\approx 128$ portions per meal: dinner, late snack, breakfast, lunch; coffee, tea, fruit throughout; water $116 \times 3 = 348$ litres. Halal, vegetarian options, allergens labelled, licensed caterer.

**5. Safety:** code of conduct published and read at kick-off with a phone number and two named responders per shift; first-aider per shift and kit; fire wardens and headcount; one staff member awake on the floor overnight; transport for anyone leaving after 22:00; incident log; venue's liability insurance confirmed.

**6. Volunteers:** day shift (14:00 to 01:00 and 06:00 to 19:00) 10 volunteers: 2 registration, 2 food and venue, 2 tech support, 1 mentor coordinator, 1 safety, 1 media, 1 judging logistics, plus a shift lead. Night shift (01:00 to 06:00) 5 plus a lead. Briefing 1 hour before doors.`,
            explanation: md`Graded against the rubric. The key test is whether a venue manager and an electrician could act on your spec without phoning you, and whether your arithmetic survives a kettle on the wrong circuit.`,
            concepts: ["sh02.venue-requirements", "sh02.network-capacity", "sh02.power-capacity", "sh02.volunteer-plan", "sh02.code-of-conduct"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh02-r1", "sh02-r5", "sh02-r8"] },
      ],
    },
  ],
  quiz: [
    {
      id: "sh02-l04-q1",
      type: "numeric",
      prompt: md`What is the usable continuous power of a 16 A circuit at 230 V with a continuous-load factor of 0.8? (W)`,
      answer: 2944,
      tolerance: { abs: 1 },
      unit: "W",
      explanation: md`$P = V I k_c = 230 \times 16 \times 0.8 = 2{,}944$ W.`,
      concepts: ["sh02.power-capacity"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh02-l04-q2",
      type: "numeric",
      prompt: md`200 people, 2 Mbps average each, headroom factor 1.5. What uplink do you need? (Mbps)`,
      answer: 600,
      tolerance: { abs: 1 },
      unit: "Mbps",
      explanation: md`$B = 200 \times 2 \times 1.5 = 600$ Mbps. Specify 1 Gbps and plan separately for large downloads.`,
      concepts: ["sh02.network-capacity"],
      difficulty: 1,
    },
    {
      id: "sh02-l04-q3",
      type: "numeric",
      prompt: md`20 teams each download 5 GB of model weights at the start. With 500 Mbps available, how many minutes does the link stay saturated?`,
      answer: 26.7,
      tolerance: { abs: 0.3 },
      unit: "min",
      explanation: md`$20 \times 5 = 100$ GB $= 800$ Gb; $t = 800/0.5 = 1{,}600$ s $= 26.7$ min. Mitigate with hosted endpoints or a local cache.`,
      concepts: ["sh02.network-capacity"],
      difficulty: 2,
    },
    {
      id: "sh02-l04-q4",
      type: "mcq",
      prompt: "Why lay out participant power per circuit with the undiversified load (every seat at 100 W) rather than the diversified average?",
      options: [
        "Because diversity factors are illegal",
        "Because small groups of seats have little diversity: at kick-off and after the overnight lull, most laptops in a group charge at once",
        "Because laptops always draw their rated power",
        "Because it reduces the number of circuits",
      ],
      answer: 1,
      explanation: md`Diversity averages out across many loads, not across 20 seats on one circuit at the moment everyone plugs in.`,
      concepts: ["sh02.power-capacity"],
      difficulty: 2,
    },
    {
      id: "sh02-l04-q5",
      type: "multi",
      prompt: "Which items should be on circuits separate from participant seats? (Select all that apply.)",
      options: ["Coffee machines and kettles", "The network rack", "Stage and AV", "Participants' phone chargers", "Catering hot boxes"],
      answer: [0, 1, 2, 4],
      explanation: md`High-power or critical loads get their own circuits; the network rack ideally on a UPS. Phone chargers belong with the seats.`,
      concepts: ["sh02.power-capacity"],
      difficulty: 1,
    },
    {
      id: "sh02-l04-q6",
      type: "multi",
      prompt: "Which belong in a hackathon code-of-conduct setup? (Select all that apply.)",
      options: [
        "Published rules agreed at registration",
        "A reporting channel and named responders",
        "An incident log",
        "Rules kept secret so they cannot be gamed",
        "Read-out at kick-off",
      ],
      answer: [0, 1, 2, 4],
      explanation: md`A code of conduct works only if everyone knows it and knows who to call; the response must be recorded.`,
      concepts: ["sh02.code-of-conduct"],
      difficulty: 1,
    },
    {
      id: "sh02-l04-q7",
      type: "order",
      prompt: "Order these run-of-show items for a 24-hour event.",
      items: ["Volunteer briefing and infrastructure test", "Doors and check-in", "Kick-off and challenge reveal", "Team and repository deadline", "Mentor scope-cutting round", "Submission deadline", "Finalist demos"],
      explanation: md`Infrastructure is tested before doors; the challenge is revealed at kick-off; scope is cut before the hard submission deadline.`,
      concepts: ["sh02.run-of-show"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh02-l04-f1", front: "Usable power per circuit", back: "$P = V I k_c$; 16 A at 230 V and 0.8: 2,944 W; at 240 V: 3,072 W.", concepts: ["sh02.power-capacity"] },
    { id: "sh02-l04-f2", front: "Planning load per seat", back: "About 100 W (laptop charger, phone, maybe a monitor); about 20 to 29 seats per 16 A circuit.", concepts: ["sh02.power-capacity"] },
    { id: "sh02-l04-f3", front: "Uplink sizing", back: "$B = N \\bar r k_h$; e.g. 150 people x 2 Mbps x 1.5 = 450 Mbps, so 1 Gbps symmetric plus a backup.", concepts: ["sh02.network-capacity"] },
    { id: "sh02-l04-f4", front: "The download that kills the wifi", back: "Model weights: 30 teams x 8 GB = 1,920 Gb = 80 min at 400 Mbps. Use hosted endpoints, a local cache, a download-before-you-come list.", concepts: ["sh02.network-capacity"] },
    { id: "sh02-l04-f5", front: "Access points", back: "2 to 3 devices per person, roughly 25 to 50 active clients per enterprise access point (confirm with vendor).", concepts: ["sh02.network-capacity"] },
    { id: "sh02-l04-f6", front: "Volunteer ratio (illustrative)", back: "About 1 per 10 participants by day, 1 per 20 overnight, plus a shift lead; brief 1 hour before doors.", concepts: ["sh02.volunteer-plan"] },
  ],
  scenarios: [
    {
      id: "sh02-s1",
      title: "The internet goes down at 01:30",
      dayInLife: true,
      context: md`Illustrative Suhail 24-hour hackathon, 110 builders on site. At 01:30 the venue's fibre line drops. The venue's IT contact does not answer. Teams are mid-build and many depend on cloud APIs. Submission is at 14:00.`,
      start: "a",
      concepts: ["sh02.network-capacity", "sh02.run-of-show", "sh02.volunteer-plan"],
      nodes: {
        a: {
          md: md`What do you do in the first ten minutes?`,
          choices: [
            { text: "Switch the access points to the tested 5G backup routers, announce on Discord (via mobile data) and the microphone what happened and that the deadline stands for now, and ask teams to pause large downloads.", score: 10, feedback: "Restores a degraded service fast, tells people what is going on, and protects the backup's limited capacity.", next: "b" },
            { text: "Wait for the venue's IT contact to call back before doing anything.", score: 2, feedback: "Every minute without information costs morale; you had a backup for exactly this.", next: "c" },
            { text: "Announce that the submission deadline moves two hours later.", score: 4, feedback: "Premature: you do not yet know how long the outage lasts, and moving the deadline compresses judging and demos.", next: "b" },
          ],
        },
        b: {
          md: md`The backup carries traffic but is slow. By 03:00 the fibre is still down. The provider's emergency line says a technician can come at 07:00.`,
          choices: [
            { text: "Book the technician, keep the backup on, prioritise the stage router for the morning, and decide at 09:00 whether to move the deadline by the length of the outage, then tell teams and judges together.", score: 10, feedback: "A decision point with data, a fair rule (extension equals lost time), and judges kept in the loop." },
            { text: "Tell teams to go home and continue remotely.", score: 1, feedback: "Breaks the event, safety plan and judging. Remote work cannot be checked for fair play either." },
          ],
        },
        c: {
          md: md`At 02:15 there is still no word. Teams are frustrated; some are packing up.`,
          choices: [
            { text: "Activate the backup now, apologise for the delay, explain the plan and the 09:00 decision point on the deadline.", score: 6, feedback: "Recovers the situation, but 45 minutes of silence cost trust. Next time, the backup is switched on by the tech volunteer without waiting." },
          ],
        },
      },
    },
  ],
};

export default lesson;
