import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh05-l03",
  title: "The Majlis podcast: format, guests, recording chain and measurement",
  summary:
    "The Majlis is Suhail's long-form conversation with Arab builders. This lesson designs the format and season structure, sizes the guest pipeline, explains the recording chain from microphone to RSS feed (dynamic vs condenser microphones, double-ender remote recording, loudness in LUFS to ITU-R BS.1770, true peak, encoding and file size), and how podcasts are measured: IAB Tech Lab download rules, what platform consumption data adds, and how clips carry the show onto social channels.",
  minutes: 85,
  objectives: [
    "You can define a podcast format, season structure and run of show that a volunteer team can repeat",
    "You can size a guest pipeline from acceptance and completion rates",
    "You can specify a recording chain and a mastering target (integrated loudness, true peak) and compute the gain and file size",
    "You can explain how an IAB-compliant download is counted and why downloads are not listeners",
    "You can plan clips that bring listeners from social platforms to full episodes",
  ],
  concepts: [
    { id: "sh05.podcast-format", name: "Podcast format and seasons", description: "The repeatable shape of an episode (length, segments, host roles, language) and of a season (a fixed number of episodes with a theme), which makes production predictable and gives listeners a reason to binge.", competency: "sh-media", related: ["sh05.editorial-calendar"] },
    { id: "sh05.guest-pipeline", name: "Guest pipeline", description: "A staged list from long list to recorded episode; invitations needed equal episodes divided by acceptance rate times completion rate. Keep a buffer of recorded episodes ahead of release.", competency: "sh-media", related: ["sh05.podcast-format"] },
    { id: "sh05.recording-chain", name: "Recording chain", description: "Microphone, preamp or interface, local recording per speaker (double-ender for remote guests), editing, processing, loudness normalisation, encoding, hosting and RSS distribution. The weakest link (usually the room or the guest's microphone) sets the quality.", competency: "sh-media", related: ["sh05.loudness"] },
    { id: "sh05.loudness", name: "Loudness (LUFS) and true peak", description: "Integrated loudness measured to ITU-R BS.1770 in LUFS (LKFS). A common podcast target is about -16 LUFS integrated for stereo with true peak no higher than -1 dBTP; EBU R 128 broadcast uses -23 LUFS.", competency: "sh-media", related: ["sh05.recording-chain"] },
    { id: "sh05.iab-download", name: "IAB podcast download", description: "Under the IAB Tech Lab Podcast Measurement Technical Guidelines, a download counts when a unique request (IP address plus user agent, deduplicated over 24 hours) retrieves at least one minute of audio, after filtering known bots. Downloads are not plays or listeners.", competency: "sh-media", related: ["sh05.click-metrics"] },
    { id: "sh05.clips", name: "Clips", description: "Short vertical excerpts (about 30 to 90 seconds) with burned-in subtitles, cut around one idea and a strong first line, used to bring social audiences to the full episode.", competency: "sh-media", related: ["sh05.podcast-format"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Format, guests and the signal chain",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`A podcast is the most expensive thing Suhail media will make per minute of output, and the most personal: a listener spends an hour with a builder's voice. It is how Suhail shows that Arab builders exist and are worth hearing, how future guests and sponsors judge the brand, and the raw material for clips on every social channel. You will not edit the audio, but you must set the format, defend the cadence, specify quality and read the numbers sponsors will ask for.`,
        },
        {
          kind: "md",
          md: md`### Format

A **majlis** is the room where people sit, talk and are heard: the name promises an unhurried conversation, not a press interview. A format that matches it (illustrative, to be piloted):

| Element | Choice | Why |
|---|---|---|
| Length | 40 to 60 minutes | Long enough for how something was built; short enough to edit in a volunteer evening |
| Host | One host, a co-host for some episodes | One voice listeners return to |
| Language | Guest's natural speech: Gulf, Egyptian, Levantine, Maghrebi dialects or English, code-switching allowed | Authenticity; see Lesson 4 for subtitles and show notes |
| Segments | Cold open (best 30 s), origin, what they built and how, the hard part, the Arab-world angle, what they need (hires, users, funding) | The "what they need" segment turns the episode into a community action |
| Video | Two-camera video for YouTube and clips if the budget allows; audio-first otherwise | Clips drive discovery on social platforms |
| Seasons | 8 to 10 episodes per season, with a theme | Volunteers can commit to a season; a break between seasons is planned, not a failure |

### The guest pipeline

Guests come from Suhail's events, the newsletter's builder stories and nominations. Size the pipeline like a sales funnel:`,
        },
        { kind: "equation", formula: "sh05-guest-invites" },
        {
          kind: "md",
          md: md`With 2 episodes a month, an acceptance rate of 40% and 90% of accepted guests actually recorded and released, you need $2/(0.4 \times 0.9) = 5.6$ invitations a month. Track stages (long list, invited, accepted, prep call done, recorded, edited, released) in the same CRM or board the team uses for sponsors.

Diversity of the guest list is part of the editorial promise: across a season, cover several countries, women and men builders, students and senior engineers, research and product. Write the target into the season plan; otherwise the list drifts to the host's own network.

### The recording chain`,
        },
        {
          kind: "flow",
          title: "From voice to listener",
          steps: [
            { label: "Microphone", detail: "Dynamic cardioid close to the mouth (about 5 to 10 cm) rejects room sound; condensers capture more detail and more room. In untreated rooms, dynamic wins." },
            { label: "Interface or recorder", detail: "XLR microphone into an audio interface or recorder; set gain so speech peaks around -12 to -6 dBFS, never clipping. USB microphones are acceptable for guests." },
            { label: "Local recording per speaker", detail: "WAV at 48 kHz and 24 bit, one track per speaker. Remote guests: a double-ender (each side records locally and uploads), not the call audio." },
            { label: "Edit", detail: "Remove false starts and long tangents, keep the guest's voice and dialect intact; never cut in a way that changes meaning." },
            { label: "Process", detail: "High-pass filter around 80 Hz, gentle noise reduction, EQ, compression, de-essing." },
            { label: "Loudness and limiter", detail: "Normalise integrated loudness to target (for example -16 LUFS stereo), true-peak limiter at -1 dBTP." },
            { label: "Encode and publish", detail: "MP3 (for example 128 kbps stereo or 64 to 96 kbps mono for speech), ID3 tags, chapters; upload to a podcast host that generates the RSS feed for Apple Podcasts, Spotify and others; video to YouTube." },
          ],
          caption: "The room and the guest's microphone limit quality more than any plugin. Fix the source before the processing.",
        },
        {
          kind: "md",
          md: md`### Loudness, in units

Perceived loudness is measured with the **ITU-R BS.1770** algorithm (K-weighting and gating), reported in **LUFS** (loudness units relative to full scale; LKFS is the same unit). A difference of 1 LU equals 1 dB. **True peak** (dBTP) estimates the peak between samples after reconstruction, which matters because MP3 encoding can push peaks higher.

| Context | Integrated loudness target | Peak |
|---|---|---|
| Broadcast, EBU R 128 | -23 LUFS | -1 dBTP |
| Common podcast practice (stereo) | about -16 LUFS | -1 dBTP |
| Common podcast practice (mono) | about -19 LUFS (perceived equal to -16 stereo) | -1 dBTP |

Apple's published podcast audio guidance has used -16 LKFS with a 1 dB tolerance and a true peak not above -1 dB; check the current spec before mastering.`,
        },
        { kind: "equation", formula: "sh05-loudness-gain" },
        { kind: "equation", formula: "sh05-audio-file-size" },
        {
          kind: "md",
          md: md`### Measurement: downloads are not listeners

A podcast app fetches the audio file from the host. Hosts count those requests. To make counts comparable across hosts, the **IAB Tech Lab Podcast Measurement Technical Guidelines** (version 2 onward) define a download roughly as follows:

- Filter known bots and crawlers, and requests that are not from podcast players.
- Count a download only if at least **one minute** of audio content was delivered (or the whole file if shorter); partial byte-range requests from the same client are combined.
- Deduplicate by **IP address plus user agent within a 24-hour window**.

A download still says nothing about whether anyone pressed play. **Consumption data** from Apple Podcasts Connect and Spotify's creator dashboard (followers, plays, average listen duration, drop-off curve) fill that gap for their own apps. YouTube Analytics gives views and retention for video. For sponsors, the industry convention is **downloads per episode within a fixed window** (for example 30 days), from an IAB-certified host.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Platform changes move download counts",
          md: md`Download numbers depend on app behaviour, not only on listeners: changes to automatic downloads in major apps (for example Apple's changes around iOS 17 in 2023 were widely reported to reduce downloads for many shows) can move counts without any change in audience. The current version of the IAB guidelines and its exact thresholds should be checked at IAB Tech Lab before quoting them in a media kit.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Mastering an episode and counting it honestly",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Mastering a 50-minute episode",
          given: md`Illustrative edited stereo mix: integrated loudness $L_{\text{meas}} = -21.3$ LUFS, true peak $-3.8$ dBTP. Target $-16$ LUFS integrated, true peak at most $-1$ dBTP. Duration $t = 50$ min $= 3{,}000$ s.`,
          steps: [
            { md: md`**Gain needed:** $G = L_{\text{target}} - L_{\text{meas}} = -16 - (-21.3) = +5.3$ dB.` },
            { md: md`**Peak after plain gain:** $-3.8 + 5.3 = +1.5$ dBTP. Above 0, it would clip; above $-1$ it fails the target. A true-peak limiter at $-1$ dBTP is required, taking about 2.5 dB off the highest peaks (laughter, plosives).` },
            { md: md`**Re-measure** after limiting: integrated loudness may fall slightly; adjust gain by a few tenths and limit again until $-16 \pm 1$ LUFS and $\le -1$ dBTP.` },
            { md: md`**File size at 128 kbps stereo:** $S = b\,t/8 = 128{,}000 \times 3{,}000/8 = 48{,}000{,}000$ bytes $= 48$ MB.` },
            { md: md`**At 96 kbps mono:** $96{,}000 \times 3{,}000/8 = 36$ MB, a quarter smaller, with no audible loss for speech. Mono speech is usually mastered about 3 LU lower (about -19 LUFS).` },
          ],
          result: md`+5.3 dB of gain with a -1 dBTP true-peak limiter, then 48 MB at 128 kbps stereo or 36 MB at 96 kbps mono. Put the target and the measurement in the episode checklist so any volunteer can master to the same standard.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "From host log requests to IAB downloads",
          given: md`Illustrative first-30-day log for one episode: 4,200 requests. Known bots and non-player agents: 300. After deduplicating by IP plus user agent over 24 hours, 2,600 unique requests remain. Of these, 200 delivered less than one minute of audio.`,
          steps: [
            { md: md`After bot filtering: $4{,}200 - 300 = 3{,}900$ requests.` },
            { md: md`After 24-hour deduplication: 2,600.` },
            { md: md`After the one-minute rule: $2{,}600 - 200$.` },
            { md: md`$= 2{,}400$ IAB downloads.`, hidden: true, check: { prompt: "IAB downloads in 30 days", answer: 2400, tolerance: { abs: 1 } } },
            { md: md`Share of raw requests that count: $2{,}400/4{,}200$.` },
            { md: md`$= 57\%$.`, hidden: true, check: { prompt: "Counted share of raw requests (%)", answer: 57.1, unit: "%", tolerance: { abs: 0.3 } } },
          ],
          result: md`Quote **2,400 downloads in 30 days (IAB method, host named)**, never the 4,200 raw requests. A sponsor comparing shows will use the IAB number.`,
        },
        {
          kind: "question",
          question: {
            id: "sh05-l03-p1",
            type: "numeric",
            prompt: md`Illustrative. The Majlis plans 3 episodes a month. 35% of invited guests accept and 85% of those who accept are recorded and released. How many invitations are needed per month? (1 decimal)`,
            answer: 10.1,
            tolerance: { abs: 0.1 },
            unit: "invitations",
            explanation: md`$n = E/(p_a p_r) = 3/(0.35 \times 0.85) = 3/0.2975 = 10.1$ invitations a month, about one every three days. That is a real workload: it is often the reason a podcast cadence fails, not editing.`,
            concepts: ["sh05.guest-pipeline"],
            difficulty: 2,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Producing The Majlis with volunteers",
      blocks: [
        {
          kind: "md",
          md: md`### The episode checklist

| Stage | Owner | Output |
|---|---|---|
| Invite | Host or podcast lead | Invitation in the guest's preferred language, with format, length, language freedom and consent terms |
| Prep call (15 min) | Host | Topics, sensitive areas to avoid, pronunciation of names, guest's microphone check |
| Record | Host plus producer | Local WAV tracks, backup recording, signed recording consent (including clips and translation) |
| Edit | Editor volunteer | Edited mix, no meaning-changing cuts |
| Master | Editor | -16 LUFS integrated, -1 dBTP, MP3 encoded, tagged |
| Package | Editorial | Title, bilingual show notes, chapters, transcript, three to five clips |
| Guest review | Host | Guest sees the clips and show notes (not a veto on the edit, unless agreed for factual errors) |
| Publish | Podcast lead | RSS release, YouTube, newsletter slot, social posts |

### Clips

Clips are the podcast's distribution. Cut each around **one idea**, open on the strongest sentence (no "so, um" introductions), 30 to 90 seconds, vertical 9:16 for short-video platforms, square or 16:9 for LinkedIn and X, with **burned-in subtitles** because most short video is watched muted. For dialect-heavy speech, subtitle in clear Arabic that readers across the region can follow, with an English line where the audience is mixed (Lesson 4).`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Recording the call audio** instead of local tracks, so the episode sounds like a phone line. **A condenser microphone in an echoing room.** **No consent form** covering clips, translation and future AI-assisted processing. **Launching with one episode**, instead of a trailer plus three episodes, so new listeners have nothing to continue with. **Quoting raw requests or "impressions"** as downloads. **Editing a guest's dialect into MSA** in the transcript and show notes, which misrepresents them.`,
        },
        {
          kind: "ask",
          title: "Questions to ask before choosing a podcast host or tool",
          items: [
            "Is the host's download measurement certified against the IAB Tech Lab guidelines?",
            "Can we export raw logs or per-episode downloads by 7, 30 and 90 days?",
            "Does it support chapters, transcripts and Arabic metadata (titles and descriptions in Arabic script) correctly in the RSS feed?",
            "Does the remote recording tool record each participant locally and upload, and does it cope with weak connections?",
            "Who owns the recordings and can we move the feed (a 301 redirect of the RSS) if we change host?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh05-l03-p2",
            type: "short",
            prompt: md`**Produce it.** Write the **Season 1 plan for The Majlis**: format and run of show, language policy, season length and release cadence (with a production-load check), guest pipeline maths and diversity targets for the guest list, the technical spec (microphones, recording method, loudness and peak targets, encoding), measurement you will report, and the clip plan per episode. Use illustrative numbers and invent no guests.`,
            rubric: [
              "A repeatable format with segments, length and a 'what they need' or community-action segment",
              "Language policy that allows dialect and code-switching, with subtitle and show-note handling",
              "Cadence justified by production hours against volunteer capacity, and a recording buffer",
              "Guest invitations computed from acceptance and completion rates, with diversity targets across countries and backgrounds",
              "Technical spec: local per-speaker recording or double-ender, loudness target in LUFS with true peak, encoding",
              "Measurement: IAB downloads in a fixed window plus platform consumption data; clip plan with formats and subtitles",
            ],
            modelAnswer: md`**Format.** 45 to 55 min. Cold open (30 s), origin, what they built and how, the hard part, the Arab-world angle, what they need (hires, users, funding, data). One host.

**Language.** Guests speak as they naturally do: any dialect, English, or a mix. Show notes and transcript in Arabic and English; clip subtitles in clear Arabic plus English. No rewriting dialect into MSA in quotes.

**Season.** 8 episodes plus a trailer, fortnightly, launched as trailer plus 3 episodes. Load: 14 h per episode at 0.5 per week = 7 h/week against 9 h/week of podcast volunteer time, $U = 0.78$. Two episodes recorded ahead.

**Guests.** 11 episodes needed (8 plus 3 to cover cancellations and a buffer); at 40% acceptance and 90% completion, $11/0.36 \approx 31$ invitations over the season. Targets: at least four countries, at least three women builders, at least two students or early-career engineers, research and product both represented.

**Spec.** Dynamic cardioid microphones in studio; remote guests on a double-ender recording locally at 48 kHz, 24 bit WAV. Master to -16 LUFS integrated (stereo) or -19 (mono), true peak at most -1 dBTP; MP3 128 kbps stereo or 96 kbps mono; chapters and ID3 tags.

**Measurement.** IAB downloads per episode at 7 and 30 days from a certified host; Apple and Spotify followers and average listen duration; YouTube views and retention; newsletter clicks to episodes.

**Clips.** Three to five per episode, 30 to 90 s, vertical for short-video platforms, square for LinkedIn and X, burned-in bilingual subtitles, one idea each, posted over the fortnight.`,
            explanation: md`A good season plan is repeatable: a fixed format, a cadence checked against volunteer hours with a buffer, a guest pipeline sized from acceptance and completion rates, a technical spec any editor can meet, and measurement a sponsor can compare across shows.`,
            concepts: ["sh05.podcast-format", "sh05.guest-pipeline", "sh05.recording-chain", "sh05.loudness", "sh05.iab-download", "sh05.clips"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh05-r11", "sh05-r12", "sh05-r13", "sh05-r14"] },
        {
          kind: "feynman",
          prompt: "A sponsor asks: 'You say 2,400 downloads per episode. How many people listened?' Explain what the number means and what you can and cannot claim.",
          keyPoints: [
            "A download is a deduplicated request (IP plus user agent over 24 h) that retrieved at least a minute of audio, after bot filtering",
            "It is not a play or a unique listener; automatic downloads count, and one listener can download on two devices",
            "Platform data (Apple, Spotify, YouTube) show plays and listen duration for their apps",
            "Quote downloads in a fixed window from an IAB-certified host, and listen duration where available",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh05-l03-q1",
      type: "numeric",
      prompt: md`An edited mix measures -19.5 LUFS integrated. What gain brings it to a -16 LUFS target before limiting? (dB)`,
      answer: 3.5,
      tolerance: { abs: 0.05 },
      unit: "dB",
      explanation: md`$G = -16 - (-19.5) = +3.5$ dB, since 1 LU equals 1 dB. Then check true peak and limit at -1 dBTP if needed.`,
      concepts: ["sh05.loudness"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh05-l03-q2",
      type: "numeric",
      prompt: md`What is the file size of a 60-minute episode encoded at 96 kbps? (MB, with 1 MB = 10^6 bytes)`,
      answer: 43.2,
      tolerance: { abs: 0.1 },
      unit: "MB",
      explanation: md`$S = 96{,}000 \times 3{,}600/8 = 43{,}200{,}000$ bytes $= 43.2$ MB.`,
      concepts: ["sh05.recording-chain"],
      difficulty: 1,
    },
    {
      id: "sh05-l03-q3",
      type: "mcq",
      prompt: md`Which counts as one download under the IAB Tech Lab guidelines?`,
      options: [
        "Every HTTP request for the file",
        "A request from a podcast player that retrieved at least one minute of audio, deduplicated by IP plus user agent over 24 hours, after bot filtering",
        "A completed play to the end of the episode",
        "A unique listener per month",
      ],
      answer: 1,
      explanation: md`The guidelines define a filtered, deduplicated, minimum-content request. They do not measure plays or people; for that you need platform consumption data.`,
      concepts: ["sh05.iab-download"],
      difficulty: 1,
    },
    {
      id: "sh05-l03-q4",
      type: "multi",
      prompt: md`A remote guest will join from a home office. Which choices improve the recording most?`,
      options: [
        "Record each side locally (double-ender) and upload the tracks",
        "Use the video-call audio as the master recording",
        "Ask the guest to use a headset or dynamic microphone close to the mouth, with headphones",
        "Choose a quiet, soft-furnished room",
        "Raise the input gain until the meter hits 0 dBFS",
      ],
      answer: [0, 2, 3],
      explanation: md`Local tracks avoid call compression and dropouts; close miking and a soft room fix the source. Gain to 0 dBFS clips; aim for peaks around -12 to -6 dBFS.`,
      concepts: ["sh05.recording-chain"],
      difficulty: 2,
    },
    {
      id: "sh05-l03-q5",
      type: "decision",
      prompt: md`The podcast volunteer can edit one episode a fortnight. The host has five strong guests ready and wants to release weekly for a launch burst. What do you do?`,
      options: [
        { text: "Release weekly for five weeks, then see", score: 0.3, feedback: "Burns the buffer and leaves a gap right after launch, when new listeners are deciding whether to follow." },
        { text: "Record all five now, launch with trailer plus three episodes on day one, then release fortnightly from the buffer", score: 1, feedback: "Gives new listeners something to binge while keeping a cadence the editor can sustain." },
        { text: "Delay launch until ten episodes are recorded", score: 0.5, feedback: "A buffer is good but ten is more than needed and delays learning." },
      ],
      explanation: md`Launch with depth, then release at the rate production can sustain. The recording buffer absorbs cancellations.`,
      concepts: ["sh05.podcast-format", "sh05.guest-pipeline"],
      difficulty: 2,
    },
    {
      id: "sh05-l03-q6",
      type: "mcq",
      prompt: md`Why is true peak measured rather than only sample peak?`,
      options: [
        "Because LUFS cannot be measured without it",
        "Because the reconstructed waveform (and MP3 decoding) can exceed the highest sample value, causing clipping on playback",
        "Because Apple requires 0 dBTP",
        "Because mono files have no sample peaks",
      ],
      answer: 1,
      explanation: md`Inter-sample peaks appear when the digital signal is converted back to analogue or after lossy encoding. Limiting to -1 dBTP leaves headroom for that.`,
      concepts: ["sh05.loudness"],
      difficulty: 2,
    },
  ],
  flashcards: [
    { id: "sh05-l03-f1", front: "Common podcast loudness target", back: "About -16 LUFS integrated (stereo), about -19 LUFS mono, true peak at most -1 dBTP. Broadcast EBU R 128: -23 LUFS.", concepts: ["sh05.loudness"] },
    { id: "sh05-l03-f2", front: "Loudness measurement standard", back: "ITU-R BS.1770 (K-weighting and gating); unit LUFS or LKFS; 1 LU = 1 dB.", concepts: ["sh05.loudness"] },
    { id: "sh05-l03-f3", front: "Double-ender", back: "Each participant records locally and uploads the track; avoids call compression and dropouts.", concepts: ["sh05.recording-chain"] },
    { id: "sh05-l03-f4", front: "IAB download, three rules", back: "Filter bots; at least one minute of audio delivered; deduplicate by IP plus user agent over 24 hours.", concepts: ["sh05.iab-download"] },
    { id: "sh05-l03-f5", front: "Guest invitations needed", back: md`$n = E/(p_a p_r)$: episodes over acceptance times completion.`, concepts: ["sh05.guest-pipeline"] },
    { id: "sh05-l03-f6", front: "Audio file size", back: md`$S = b\,t/8$ bytes; 128 kbps for 50 min is 48 MB.`, concepts: ["sh05.recording-chain"] },
    { id: "sh05-l03-f7", front: "A good clip", back: "One idea, strongest line first, 30 to 90 s, vertical for short video, burned-in subtitles.", concepts: ["sh05.clips"] },
  ],
};

export default lesson;
