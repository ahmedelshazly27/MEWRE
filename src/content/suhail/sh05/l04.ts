import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "sh05-l04",
  title: "Language: dialects, MSA, English, code-switching, RTL and Arabic SEO",
  summary:
    "Suhail speaks to builders from Morocco to Oman, most of whom read English technical material and speak a dialect at home. This lesson sets Suhail's language policy by channel (dialects, MSA, English, code-switching, Arabizi), compares bilingual edition models on cost and reach, explains translation versus transcreation as a production workflow, the mechanics of right-to-left layout on the web and in email (direction, bidirectional text, logical CSS properties, Arabic typography), and the basics of Arabic search: separate URLs with hreflang, orthographic variants and dialect keywords.",
  minutes: 80,
  objectives: [
    "You can choose a register (dialect, MSA, English, mixed) for each Suhail channel and justify it by audience and purpose",
    "You can compare bilingual edition models by production hours and readers served, and pick one for launch",
    "You can specify a translation and transcreation workflow with glossary, reviewer and sign-off",
    "You can brief an engineer on RTL requirements for suhail.build and the newsletter template",
    "You can apply Arabic SEO basics: language URLs, hreflang, orthographic variants and keyword research in dialect and MSA",
  ],
  concepts: [
    { id: "sh05.dialect-landscape", name: "Arabic dialect landscape", description: "Spoken Arabic varies by region (Gulf, Iraqi, Levantine, Egyptian, Sudanese, Yemeni, Maghrebi). Mutual intelligibility is high within the Mashriq, lower with Maghrebi dialects; MSA is the shared written standard.", competency: "sh-media", related: ["fc05.arabic-register"] },
    { id: "sh05.code-switching", name: "Code-switching", description: "Moving between Arabic and English (or French in the Maghreb) within a conversation or sentence, common among builders for technical terms. Natural in speech and community channels; needs care in writing for layout and searchability.", competency: "sh-media", related: ["sh05.dialect-landscape"] },
    { id: "sh05.bilingual-edition-model", name: "Bilingual edition model", description: "How a publication serves two languages: one language only, two full editions, a primary edition plus a transcreated digest, or a single mixed issue. Chosen by production hours per reader served and by mission.", competency: "sh-media", related: ["fc05.transcreation"] },
    { id: "sh05.rtl-implementation", name: "RTL implementation", description: "Setting language and direction at document level, isolating embedded left-to-right runs (names, code, numbers with units), using logical CSS properties so layouts mirror, and Arabic-appropriate typography (no letter-spacing, no faux italics, taller line height).", competency: "sh-media", related: ["fc05.bidi-typography"] },
    { id: "sh05.arabic-seo", name: "Arabic SEO basics", description: "Separate URLs per language linked with hreflang, no automatic redirects by IP, titles and descriptions written for Arabic queries, and keyword research that covers MSA, dialect and English loanword spellings and orthographic variants.", competency: "sh-media", related: ["sh05.rtl-implementation"] },
  ],
  sections: [
    {
      layer: "theory",
      title: "Who speaks what, and what to publish in which",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`"Bilingual" is the line in every Suhail plan that quietly doubles the workload. Get the language policy wrong in one direction and Suhail reads like a translated Western newsletter that Arabic-first builders ignore; in the other, the Editorial team spends half its volunteer hours translating content nobody needed in two languages. You are the person on the team who can judge register in both languages: this lesson turns that judgement into a policy others can follow.`,
        },
        { kind: "xref", to: "fc05-l05", note: "Founder Core covers the basics: MSA vs Gulf dialect by channel, transcreation, honorifics, numerals and right-to-left pitfalls. This lesson adds the pan-Arab, media-production and web-implementation view for Suhail." },
        {
          kind: "md",
          md: md`### The dialect landscape for a pan-Arab audience

| Group | Where | Notes for Suhail media |
|---|---|---|
| Gulf (Khaleeji) | Kuwait, Saudi Arabia (eastern and central varieties), UAE, Qatar, Bahrain, Oman | The host's natural register; understood across the Gulf |
| Iraqi | Iraq | Close to Gulf in some features, distinct vocabulary |
| Levantine (Shami) | Syria, Lebanon, Jordan, Palestine | Widely understood through TV drama |
| Egyptian | Egypt | The most widely understood dialect, through decades of film, TV and music; Egypt is also a large builder population |
| Sudanese, Yemeni | Sudan, Yemen | Distinct; subtitle for pan-Arab audiences |
| Maghrebi (Darija) | Morocco, Algeria, Tunisia, Libya | Hardest for Mashriqi listeners; heavy French and Amazigh borrowing; subtitles essential |

**MSA** (الفصحى) is the shared written standard: news, official documents, most published text. Educated speakers move between MSA and dialect on a continuum, and builders add English for technical terms. Social media writing also uses **Arabizi** (Arabic in Latin letters, with digits for sounds Latin lacks: 3 for ع, 7 for ح, 2 for ء).

### A language policy by channel`,
        },
        {
          kind: "matrix",
          title: "Register by Suhail channel",
          xAxis: ["Spoken", "Written"],
          yAxis: ["Community, informal", "Public, formal"],
          cells: [
            { label: "The Majlis, event stages, hosting", detail: "Natural speech of host and guest: any dialect, English, code-switching. Subtitles and show notes make it accessible across the region." },
            { label: "Website, sponsor materials, partner letters", detail: "Clear modern MSA and English, parallel pages. Formal partners (universities, governments) expect MSA." },
            { label: "Community chat, clips' captions, social replies", detail: "Light dialect and English as members use them; mirror the member's language in replies. Arabizi tolerated in replies, not in Suhail's own posts." },
            { label: "Newsletter", detail: "Light, readable MSA in the Arabic edition (understood everywhere), English edition in plain international English; technical terms in English with an Arabic gloss on first use." },
          ],
          caption: "Write in light MSA when the reader could be anywhere in the Arab world; speak naturally when the listener hears a real person. Never rewrite a speaker's dialect into MSA inside a quote.",
        },
        {
          kind: "md",
          md: md`### Code-switching in writing

Builders say "سوينا fine-tuning للموديل على داتا محلية" (dialect plus English terms). In speech, keep it. In Suhail's written Arabic:

- Use an established Arabic term where one is common (ذكاء اصطناعي for AI, نموذج لغوي كبير for LLM, مجموعة بيانات for dataset), with the English in parentheses on first use.
- Keep English where the Arabic term is rare or ambiguous among builders (fine-tuning, benchmark, open weights) and gloss it once: **الضبط الدقيق (fine-tuning)**.
- Keep product and model names in Latin script (Jais, Falcon, ALLaM) and never translate them.
- Each Latin run inside Arabic text is a bidirectional-layout risk (below): budget a rendered-proof check.

### Translation vs transcreation as a workflow

**Translation** carries meaning sentence by sentence; **transcreation** rebuilds the message for the target reader (hook, examples, tone), keeping intent. For Suhail: translate factual items (opportunity listings, dates, eligibility), transcreate the lead story, subject lines, calls to action and social posts. Machine translation and LLMs give a fast first draft; a **named human reviewer** fluent in the target register owns the final text (Lesson 6).

### Bilingual edition models`,
        },
        { kind: "equation", formula: "sh05-hours-per-100-clicks" },
        {
          kind: "md",
          md: md`| Model | How it works | Cost | Risk |
|---|---|---|---|
| A. English only | One edition | Lowest | Fails Arabic-first readers and the mission |
| B. Two full editions | Everything in both languages, readers choose at signup | Highest (often +50 to 70% hours) | Translation becomes the bottleneck |
| C. Primary plus transcreated digest | Full English issue plus a shorter Arabic issue (lead story transcreated, opportunities translated), or the reverse | Medium | Arabic readers may feel second-class if the digest is thin |
| D. Mixed issue | Each item in the language it was written in, with a one-line summary in the other | Low to medium | Layout complexity; readers skip half |

Choose by **hours per unit of reader action** and by mission: Suhail exists for Arabic-speaking builders, so a cheaper model that underserves them is not automatically better.

### Right-to-left on the web and in email

The mechanics, for briefing the Head of Engineering:

- **Document level:** set the page language and direction for Arabic pages (lang="ar" and dir="rtl" on the html element); English pages keep dir="ltr". The browser then lays out text, tables and inline flow right to left.
- **Bidirectional text:** the Unicode Bidirectional Algorithm (UAX 9) orders mixed runs. Neutral characters (punctuation, spaces, digits next to Latin) can land on the wrong side: "Jais 2 (70B)" may render with the parenthesis misplaced. Wrap embedded Latin runs and user-generated names in an isolating element (the HTML bdi element, or dir="auto"), and check rendered output, not the source.
- **Layout:** use CSS **logical properties** (margin-inline-start, padding-inline-end, text-align: start) instead of left and right, so one stylesheet mirrors correctly. Mirror directional icons (back and forward arrows, progress); do not mirror logos, media playback symbols, charts with numeric axes or code.
- **Typography:** choose a font designed for Arabic (with full glyph sets and matching Latin), increase line height (Arabic has tall ascenders and deep descenders and diacritics), **never apply letter-spacing** (it breaks the joining of letters), avoid faux italics (Arabic has no italic tradition; use weight or colour for emphasis), and keep body text slightly larger than the Latin equivalent.
- **Numbers:** decide once whether Arabic pages use Western digits (0 to 9) or Eastern Arabic digits (٠ to ٩) and apply consistently; digits are written left to right in both.
- **Email:** set dir="rtl" and lang on the html and on table cells of the Arabic template, align with start and end, and test in the major clients (Gmail web and app, Outlook desktop and web, Apple Mail), which handle direction differently.

### Arabic search basics

- **Separate URLs per language** (for example suhail.build/ar/... and suhail.build/en/...), linked with **hreflang** annotations (ar, en, and x-default for the language chooser). Do not auto-redirect by IP or browser language: search crawlers and VPN users then never see the other version. Google's guidance is to let users switch language with a visible link.
- **Write for Arabic queries,** not translated English keywords. People search the same idea in MSA, dialect and English: هاكاثون, hackathon, مسابقة برمجة; وظائف ذكاء اصطناعي, AI jobs.
- **Orthographic variants:** users type with or without hamza on alif (أ إ آ ا), with ة or ه at word end, ي or ى. Search engines normalise some of these but not reliably; use the form most people type in titles, and do not stuff variants.
- **Slugs:** Arabic URL slugs work but become long percent-encoded strings when copied into many apps; many Arabic sites use short Latin slugs with Arabic titles.
- **Measure** with Google Search Console filtered by page language and country, and Google Trends by country for term choice.`,
        },
        {
          kind: "callout",
          tone: "unverified",
          title: "Search engine normalisation of Arabic",
          md: md`How far Google and other search engines normalise Arabic orthographic variants (hamza forms, ta marbuta and ha, alif maqsura and ya) and dialect spellings is not publicly documented in detail and changes with their language models. Test with Search Console data for Suhail's own pages rather than relying on rules of thumb.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Choosing an edition model for launch",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Hours per 100 clicks for three edition models",
          given: md`Illustrative list of 6,000: 35% prefer Arabic (2,100), 65% English (3,900). Assumed click rate 5% for a reader served in the preferred language, 2% in the other language, 4% for a shorter digest. English issue: 8 h. Full Arabic edition: +5 h. Transcreated Arabic digest: +2.5 h.`,
          steps: [
            { md: md`**A, English only (8 h):** clicks $= 3{,}900 \times 0.05 + 2{,}100 \times 0.02 = 195 + 42 = 237$. Hours per 100 clicks $= 8/2.37 = 3.38$.` },
            { md: md`**B, two full editions (13 h):** clicks $= 6{,}000 \times 0.05 = 300$. Hours per 100 clicks $= 13/3.00 = 4.33$.` },
            { md: md`**C, English plus Arabic digest (10.5 h):** clicks $= 195 + 2{,}100 \times 0.04 = 195 + 84 = 279$. Hours per 100 clicks $= 10.5/2.79 = 3.76$.` },
            { md: md`**Arabic readers' click rate:** A 2%, C 4%, B 5%. Model A is cheapest per click only because it gives up on a third of the list.` },
          ],
          result: md`Launch with **C**: about 11% more hours per 100 clicks than A but double the Arabic engagement, at 2.5 h less per issue than B. Move to B when Arabic-preferring readers become the majority or a dedicated Arabic editor joins. Re-test with real click data after a quarter; these rates are assumptions.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A larger Arabic share",
          given: md`Illustrative: same list size and rates, but 55% prefer Arabic (3,300) and 45% English (2,700).`,
          steps: [
            { md: md`Model A clicks $= 2{,}700 \times 0.05 + 3{,}300 \times 0.02 = 135 + 66 = 201$.` },
            { md: md`Model C clicks $= 135 + 3{,}300 \times 0.04$.` },
            { md: md`$= 135 + 132 = 267$ clicks.`, hidden: true, check: { prompt: "Model C clicks", answer: 267, tolerance: { abs: 0.5 } } },
            { md: md`Model C hours per 100 clicks $= 10.5/2.67$.` },
            { md: md`$= 3.93$ h.`, hidden: true, check: { prompt: "Model C hours per 100 clicks", answer: 3.93, unit: "h", tolerance: { abs: 0.02 } } },
            { md: md`Model B: 300 clicks, $13/3 = 4.33$ h per 100 clicks. With an Arabic majority the natural primary edition becomes Arabic, with English as the digest.` },
          ],
          result: md`As the Arabic share grows, flip the primary language rather than paying for two full editions.`,
        },
        {
          kind: "bilingual",
          title: "Transcreating a newsletter opening (English and light MSA)",
          en: md`This fortnight: three Arabic open-weight models shipped updates, two hackathons opened registration, and one team in Amman needs a data engineer.

If you build with Arabic data, this issue is for you.`,
          ar: md`في هذا العدد: ثلاثة نماذج عربية مفتوحة الأوزان أصدرت تحديثات جديدة، وفُتح التسجيل في هاكاثونين، وفريق في عمّان يبحث عن مهندس بيانات.

إذا كنت تبني بالبيانات العربية، فهذا العدد كُتب لك.`,
        },
        {
          kind: "md",
          md: md`**What the transcreation did:** "This fortnight" became "في هذا العدد" (in this issue), which reads naturally in Arabic newsletters; the sentence keeps one list rather than mirroring English punctuation; "open-weight" uses مفتوحة الأوزان, the term used in Arabic AI writing, and could carry the English in parentheses on first use; the closing line addresses the reader directly in the singular, as Arabic community writing does. No numbers about Suhail's audience are claimed.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running bilingual production",
      blocks: [
        {
          kind: "checklist",
          title: "Language and layout checks per issue and page",
          items: [
            "Register matches the channel policy; quotes keep the speaker's own words and dialect",
            "Technical terms follow the Suhail bilingual glossary; English gloss on first use",
            "Names of people, places and models spelled consistently in both scripts, and checked with the person",
            "Rendered proof checked by a native reader on phone and desktop: punctuation, parentheses, numbers with units, Latin runs",
            "Digits convention consistent within the page",
            "Arabic page has its own URL, title and description written for Arabic queries; hreflang pair in place",
            "Email template tested in Gmail, Outlook and Apple Mail in both directions",
          ],
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`**Machine-translated Arabic published unreviewed:** correct words, foreign rhythm, and occasional howlers in technical terms. **Letter-spacing or uppercase-style styling** applied to Arabic headings by a Latin-first design system. **One slug, two languages with a toggle in JavaScript,** so search engines index only one. **Left and right hard-coded in CSS,** so the Arabic layout half-mirrors. **Subtitles in Gulf dialect** for a Moroccan guest's clip, or in heavy classical Arabic for a casual conversation.`,
        },
        {
          kind: "ask",
          title: "Questions for the Head of Engineering about suhail.build",
          items: [
            "Do Arabic routes set lang and dir at the html element, server-rendered, not toggled client side?",
            "Are styles written with logical properties, and which components still use left and right?",
            "Which Arabic font do we ship, does it include the Latin glyphs we need, and is it subset and preloaded?",
            "Are hreflang annotations generated for every page pair, with x-default?",
            "How are user-supplied names isolated (bdi or dir auto) in member profiles and event pages?",
          ],
        },
        {
          kind: "question",
          question: {
            id: "sh05-l04-p1",
            type: "short",
            prompt: md`**Produce it.** Write Suhail's **language policy** (one page): register for each channel (newsletter, The Majlis, clips, social, website, sponsor and partner documents), the bilingual edition model for launch with its hours-per-click justification (illustrative numbers), the rules for code-switching and technical terms, the translation and transcreation workflow with named review roles, and five RTL and SEO requirements for the engineering team.`,
            rubric: [
              "Register chosen per channel with a reason (audience spread, formality, authenticity), and dialect preserved in quotes",
              "An edition model chosen with an hours-per-reader-action comparison and a trigger for changing it",
              "Rules for technical terms and English in Arabic text (glossary, gloss on first use, names in Latin script)",
              "A workflow distinguishing translation from transcreation, with a human reviewer owning the final text",
              "Concrete RTL and SEO requirements: lang and dir, bidi isolation, logical CSS, Arabic typography, separate URLs with hreflang and no IP redirect",
            ],
            modelAnswer: md`**Register.** The Majlis and stages: natural speech, any dialect, English and code-switching. Clips: subtitles in clear Arabic plus English. Social: light dialect and English, replies mirror the member. Newsletter: light MSA Arabic edition, plain international English edition. Website, sponsor and partner documents: modern MSA and English in parallel. Never convert a speaker's dialect to MSA in a quote.

**Edition model.** Launch with full English plus a transcreated Arabic digest (lead story transcreated, opportunities translated). Illustrative: 3.76 h per 100 clicks vs 3.38 for English only and 4.33 for two full editions, while doubling Arabic readers' click rate from 2% to 4%. Trigger: when Arabic-preferring readers exceed half the list, make Arabic the primary edition; when an Arabic editor joins, move to two full editions.

**Terms.** Use the Suhail glossary; common Arabic terms where they exist (ذكاء اصطناعي, مجموعة بيانات), English kept for fine-tuning, benchmark, open weights with a gloss on first use; model and product names in Latin script.

**Workflow.** Writer drafts; translation by a volunteer or a machine draft for factual items; transcreation by a fluent writer for lead, subject line and calls to action; a named reviewer (Arabic editor) signs off on the rendered proof; names checked with the people named.

**Engineering requirements.** (1) lang and dir on the html element, server-rendered per route. (2) Logical CSS properties only; mirror directional icons, not logos, media controls or charts. (3) Isolate Latin and user-generated runs with bdi or dir auto. (4) An Arabic-designed font, taller line height, no letter-spacing or faux italics. (5) Separate /ar and /en URLs with hreflang (ar, en, x-default), visible language switch, no IP redirects; Arabic titles and descriptions written for Arabic queries.`,
            explanation: md`The policy should let a volunteer decide register, edition, terminology and review without asking you, and give the engineer concrete, checkable RTL and SEO requirements.`,
            concepts: ["sh05.dialect-landscape", "sh05.code-switching", "sh05.bilingual-edition-model", "sh05.rtl-implementation", "sh05.arabic-seo"],
            difficulty: 3,
          },
        },
        { kind: "sources", refs: ["sh05-r15", "sh05-r16", "sh05-r17", "sh05-r18"] },
        {
          kind: "feynman",
          prompt: "Explain to a European co-organiser why Suhail's podcast does not use Modern Standard Arabic, while its website does.",
          keyPoints: [
            "MSA is the shared written standard understood everywhere, and expected by formal partners",
            "Nobody speaks MSA at home; a conversation in MSA sounds stiff and performed",
            "Guests speak their own dialect, with English technical terms; that is authentic",
            "Subtitles and show notes in clear Arabic and English make dialect speech accessible",
            "Register follows channel and purpose, not one rule for all",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "sh05-l04-q1",
      type: "mcq",
      prompt: md`Which dialect group is typically hardest for listeners from the Gulf and Levant to follow without subtitles?`,
      options: ["Egyptian", "Levantine", "Maghrebi (Darija)", "Iraqi"],
      answer: 2,
      explanation: md`Maghrebi varieties differ most in vocabulary and phonology and borrow heavily from French and Amazigh. Egyptian is the most widely understood because of decades of regional media.`,
      concepts: ["sh05.dialect-landscape"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "sh05-l04-q2",
      type: "multi",
      prompt: md`Which are correct RTL practices for suhail.build?`,
      options: [
        "Set lang and dir at the html element for Arabic pages",
        "Use margin-inline-start rather than margin-left",
        "Apply letter-spacing to Arabic headings for a modern look",
        "Mirror back and forward arrows, but not the logo",
        "Isolate embedded Latin names with bdi or dir auto",
      ],
      answer: [0, 1, 3, 4],
      explanation: md`Letter-spacing breaks the joining of Arabic letters. Direction at the document level, logical properties, selective mirroring and bidi isolation are the core practices.`,
      concepts: ["sh05.rtl-implementation"],
      difficulty: 2,
    },
    {
      id: "sh05-l04-q3",
      type: "numeric",
      prompt: md`Illustrative. An issue takes 9 h in English; adding a full Arabic edition takes 6 h more. Together they produce 330 clicks. Hours per 100 clicks? (2 decimals)`,
      answer: 4.55,
      tolerance: { abs: 0.02 },
      unit: "h",
      explanation: md`$15/3.30 = 4.55$ h per 100 clicks. Compare it with the other models' figures, then weigh the mission value of serving Arabic-first readers fully.`,
      concepts: ["sh05.bilingual-edition-model"],
      difficulty: 1,
    },
    {
      id: "sh05-l04-q4",
      type: "mcq",
      prompt: md`What is the main SEO problem with switching an article's language by a JavaScript toggle on one URL?`,
      options: [
        "Arabic text loads more slowly",
        "Search engines index one version and cannot associate the other with Arabic or English queries; there is no hreflang pair",
        "Google penalises bilingual sites",
        "It breaks DMARC",
      ],
      answer: 1,
      explanation: md`Each language version needs its own URL, linked with hreflang, so each can be indexed and shown to the right searchers.`,
      concepts: ["sh05.arabic-seo"],
      difficulty: 2,
    },
    {
      id: "sh05-l04-q5",
      type: "decision",
      prompt: md`A Moroccan founder's Majlis episode is mostly in Darija with French and English terms. The Editorial lead proposes subtitling the clips in Gulf dialect "because our audience is Gulf-heavy". What do you decide?`,
      options: [
        { text: "Gulf dialect subtitles", score: 0.2, feedback: "Misrepresents the guest and still excludes non-Gulf readers." },
        { text: "Subtitles in clear, light MSA plus an English line, keeping the guest's terms where they are technical", score: 1, feedback: "Pan-Arab readable, faithful to meaning, and respectful of the guest." },
        { text: "No subtitles: authenticity first", score: 0.3, feedback: "Most short video is watched muted, and Darija is the hardest dialect for Mashriqi viewers." },
        { text: "Re-record the episode in MSA", score: 0, feedback: "Destroys the conversation the format exists for." },
      ],
      explanation: md`Subtitles are for comprehension across the region: light MSA is the shared written layer, and the guest's own voice stays in the audio.`,
      concepts: ["sh05.dialect-landscape", "sh05.code-switching"],
      difficulty: 2,
    },
    {
      id: "sh05-l04-q6",
      type: "mcq",
      prompt: md`Which item should be transcreated rather than translated?`,
      options: [
        "A hackathon's registration deadline and eligibility rules",
        "The newsletter subject line and lead-story hook",
        "A grant's official name",
        "A model's parameter count",
      ],
      answer: 1,
      explanation: md`Hooks, subject lines and calls to action depend on rhythm and culture and must be rebuilt for the reader. Facts, rules and names are translated exactly or kept as they are.`,
      concepts: ["sh05.bilingual-edition-model"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "sh05-l04-f1", front: "Most widely understood Arabic dialect", back: "Egyptian, through decades of regional film, TV and music.", concepts: ["sh05.dialect-landscape"] },
    { id: "sh05-l04-f2", front: "Arabizi", back: "Arabic written in Latin letters with digits for missing sounds: 3 for ع, 7 for ح, 2 for ء.", concepts: ["sh05.code-switching"] },
    { id: "sh05-l04-f3", front: "Edition model chosen for launch (illustrative)", back: "Full primary edition plus a transcreated digest in the other language; flip the primary when that audience becomes the majority.", concepts: ["sh05.bilingual-edition-model"] },
    { id: "sh05-l04-f4", front: "Three RTL typography rules", back: "No letter-spacing, no faux italics, taller line height (and an Arabic-designed font).", concepts: ["sh05.rtl-implementation"] },
    { id: "sh05-l04-f5", front: "Bidi isolation", back: "Wrap embedded Latin or user-supplied runs in bdi or dir auto so the Unicode Bidirectional Algorithm does not misplace neutral characters.", concepts: ["sh05.rtl-implementation"] },
    { id: "sh05-l04-f6", front: "Arabic SEO: URL rule", back: "Separate URL per language, hreflang pair with x-default, visible language switch, no IP redirect.", concepts: ["sh05.arabic-seo"] },
    { id: "sh05-l04-f7", front: "Orthographic variants to watch in Arabic titles", back: "Hamza on alif (أ إ آ ا), ة vs ه, ي vs ى. Use the form people actually type.", concepts: ["sh05.arabic-seo"] },
  ],
};

export default lesson;
