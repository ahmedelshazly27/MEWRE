import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc05-l05",
  title: "LinkedIn as a founder channel, and bilingual Arabic/English communication",
  summary:
    "The founder's own LinkedIn as a compounding B2B channel: what to post, how often, in which formats, how to measure it down to qualified conversations, and why messaging is never automated. Then communicating with Gulf audiences in Arabic and English: MSA vs Gulf dialect by channel, transcreation instead of literal translation, terminology, honorifics, numerals and right-to-left layout.",
  minutes: 80,
  objectives: [
    "You can set a sustainable posting cadence and format mix for founder-led LinkedIn and tie it to the brand platform",
    "You can compute engagement rate and cost per qualified conversation, and tell diagnostic metrics from business outcomes",
    "You can explain why automated connection requests and messages are prohibited and counterproductive, and use AI safely instead",
    "You can choose the right Arabic register (MSA, educated spoken, Gulf dialect) for a channel and audience",
    "You can transcreate a post or announcement between English and Arabic and avoid the common translation and layout pitfalls",
  ],
  concepts: [
    { id: "fc05.founder-led-linkedin", name: "Founder-led LinkedIn", description: "The founder's personal profile used as a B2B channel: consistent posts that teach from real work, plus thoughtful comments and personal messages, building an audience of buyers, partners, hires and investors that compounds over months.", competency: "fc-marketing", related: ["fc05.brand-platform"] },
    { id: "fc05.linkedin-metrics", name: "LinkedIn measurement", description: "Diagnostic metrics (impressions, engagement rate, follower fit) versus outcome metrics (profile visits from target accounts, inbound messages, qualified conversations, cost per conversation).", competency: "fc-marketing", related: ["fc05.cpql"] },
    { id: "fc05.no-automation", name: "Never automate messaging", description: "Bots and automation tools for connection requests, messages or scraping breach LinkedIn's User Agreement, risk account restriction and data-protection breaches, and destroy trust with engineer buyers. AI may help draft; a human writes, checks and sends each message.", competency: "fc-marketing", related: ["m14.ai-governance"] },
    { id: "fc05.arabic-register", name: "Arabic register: MSA vs Gulf dialect", description: "Modern Standard Arabic for formal written and official communication; educated spoken Arabic for formal speech; Gulf or Kuwaiti dialect for informal speech, podcasts and community. The choice signals respect, seriousness and closeness.", competency: "fc-marketing", related: ["m13.arabic-correspondence", "m14.register-control"] },
    { id: "fc05.transcreation", name: "Transcreation", description: "Re-creating a message in the target language for the target audience (intent, tone, examples, call to action) instead of translating words; with consistent technical terminology and native review.", competency: "fc-marketing", related: ["m14.bilingual-drafting", "m14.term-consistency"] },
    { id: "fc05.bidi-typography", name: "Bidirectional (RTL) typography", description: "Arabic runs right to left while Latin product names, numbers and units run left to right; without care, punctuation, percentages and names render in the wrong place. Checked with native reviewers and correct direction settings.", competency: "fc-marketing" },
  ],
  sections: [
    {
      layer: "theory",
      title: "The founder channel and the bilingual audience",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`Across three ventures you are the most credible voice each one has: test leads, plant owners, KISR researchers, investors, potential hires and Suhail's builders all look you up before they reply. Your LinkedIn is the one channel that serves all of them at near-zero cash cost, if you run it with discipline. And you are fluent in both languages of your markets: knowing when to write formal Arabic, when to speak Kuwaiti, and when a literal translation will embarrass you is an advantage most competitors in the Gulf cannot match.`,
        },
        {
          kind: "md",
          md: md`### Why a founder's profile outperforms a company page

People trust people more than logos, and B2B buyers research individuals before taking a meeting. A personal profile reaches your network and their networks; company pages typically reach far fewer people. The mechanism is simple: every comment and repost exposes a post to that person's connections, so a post that starts a real discussion among test engineers travels through exactly the network you want.

### What to post: teach from real work

Derive posts from the brand platform and from what you see every week:

- **Lessons from the field:** "Three things test leads told me this month about rerun decisions" (no names without permission).
- **Mechanisms and methods:** a short explanation of one-clock capture, or of how soiling loss is estimated from inverter data.
- **Regulatory and market explainers:** what the EU Machinery Regulation changes for AI-enabled machines from 20 January 2027.
- **Building in public, honestly:** what you tried, what did not work, what you learned.
- **Comments on others' posts:** substantive comments on posts by your buyers are often worth more than your own posts.

### Cadence and formats

Consistency beats volume: **two to four posts a week, sustained for months**, is more effective than daily bursts followed by silence. Block time for writing (batch on one morning) and for replying to comments the same day.

| Format | Good for | Note |
|---|---|---|
| Text post | Stories, lessons, opinions | Strong first two lines; the rest is hidden behind "see more" |
| Document (PDF carousel) | Frameworks, step-by-step methods | Re-use slides from a talk or a whitepaper section |
| Image or chart | One striking number or diagram | The chart must be readable on a phone |
| Short native video | Showing a rig, a demo, a face | Subtitles; most people watch muted |
| Newsletter or article | Long-form, searchable | Lower reach per piece, good archive |

Platform ranking rules are not public and change often. Treat claims such as "links in posts kill reach" or "the first hour decides everything" as hypotheses to test on your own data.`,
        },
        {
          kind: "chart",
          chart: "bar",
          title: "Engagement rate by format over one quarter (illustrative, %)",
          xKey: "format",
          xLabel: "Post format",
          yLabel: "Engagement rate per impression (%)",
          series: [{ key: "er", label: "Engagement rate" }],
          data: [
            { format: "Text", er: 2.0 },
            { format: "Document", er: 3.2 },
            { format: "Image or chart", er: 2.4 },
            { format: "Short video", er: 1.8 },
            { format: "Poll", er: 2.6 },
          ],
          caption: "Illustrative numbers for one founder's own posts, not platform benchmarks. Use your own quarter of data; and remember a poll's engagement is cheap, while a comment from a head of test is worth a hundred reactions.",
        },
        {
          kind: "md",
          md: md`### Measure down to conversations`,
        },
        { kind: "equation", formula: "fc05-engagement-rate" },
        { kind: "equation", formula: "fc05-cost-per-conversation" },
        {
          kind: "md",
          md: md`Impressions and engagement rate are **diagnostics**: they tell you which posts resonate. The **outcomes** are profile visits from target accounts, inbound messages from people matching your ideal customer profile, and qualified conversations. Track the outcomes weekly in a simple sheet; ask every new contact "what made you reach out?"

### Never automate messaging

Automation tools that send connection requests, follow-up messages or scrape profiles at scale are prohibited by LinkedIn's User Agreement (bots and automated methods to access the service, add or download contacts, or send messages). The consequences are concrete: restricted or banned accounts (losing years of network), data-protection exposure (scraping and messaging people in the EU needs a lawful basis under the GDPR), and loss of trust: engineers recognise a template in one line, and a test lead who receives a fake-personal sequence will not take your call. Use AI to draft, research a person's published work and check your Arabic; then **you** write, check and send each message by hand.

### The bilingual audience: register

Arabic has a wide gap between the written standard and spoken dialects, and choosing the wrong register sends the wrong signal.`,
        },
        {
          kind: "matrix",
          title: "Choosing an Arabic register by channel",
          xAxis: ["Spoken", "Written"],
          yAxis: ["Informal", "Formal"],
          cells: [
            { label: "Educated spoken Arabic", detail: "MSA vocabulary with a Gulf accent and some dialect grammar: conference panels, meetings at a ministry or KISR, investor meetings in the Gulf." },
            { label: "Modern Standard Arabic (MSA)", detail: "Official letters, tender documents, press releases, website, product documentation, company LinkedIn posts aimed at government and industry." },
            { label: "Gulf or Kuwaiti dialect", detail: "The Majlis podcast, hackathon hosting, voice notes, informal community chat. Signals closeness and authenticity." },
            { label: "Light MSA, occasionally dialect", detail: "Founder posts and community channels. Mizan's business posts stay in light MSA; Suhail's community posts can use dialect for warmth." },
          ],
          caption: "When unsure in writing, use clear, simple MSA: it is understood across the Arab world and never reads as disrespectful. Dialect in a formal letter reads as unserious; heavy classical MSA on a podcast reads as stiff.",
        },
        {
          kind: "md",
          md: md`A few concrete differences between Kuwaiti or Gulf dialect and MSA you will meet in practice:

| Meaning | Gulf or Kuwaiti dialect | MSA |
|---|---|---|
| How are you? | شلونك؟ | كيف حالك؟ |
| A lot, very | وايد | كثيراً، جداً |
| I want | أبي | أريد |
| What? | شنو؟ | ماذا؟ |
| Now | الحين | الآن |

### Translation pitfalls

Literal translation is the most common failure. Typical traps for your ventures:

- **False friends and literal terms:** "pilot" is مشروع تجريبي, never طيار; "soiling" is اتساخ الألواح or تراكم الغبار, not تلوث (which suggests environmental pollution); "cleaning optimisation" reads better as تحسين جدولة التنظيف than as a coined أمثلة.
- **Product and brand names stay in Latin script** (Lockstep, Ripple, Enclave) with an Arabic explanation on first use; do not translate them.
- **Technical terms:** keep a bilingual glossary and use one Arabic term consistently, adding the English in parentheses on first use where readers know the English term better.
- **Honorifics and protocol:** معالي for ministers, سعادة for senior officials such as undersecretaries and ambassadors, الدكتور or الدكتورة for researchers; get them right in every letter and on every slide.
- **Numbers and dates:** some Gulf official documents use Eastern Arabic digits (٠١٢٣) and some use Western digits; match the recipient's convention and keep it consistent within a document. Official correspondence may carry both Hijri and Gregorian dates.
- **Right-to-left layout:** Latin names, percentages, units and punctuation inside Arabic text can render in the wrong order (the Unicode bidirectional algorithm at work). Set the document and web page direction correctly and have a native reader check the final rendered version, not the draft.`,
        },
      ],
    },
    {
      layer: "applied",
      title: "Measuring a quarter of posting, and transcreating a Mizan post",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "One quarter of founder posting for Afterwave",
          given: md`Illustrative. 12 weeks, 3 posts a week (36 posts). Totals: 90,000 impressions, 1,800 reactions, 360 comments, 90 reposts, 1,200 profile views. Outcomes: 14 inbound messages from people matching the ideal customer profile, 6 qualified conversations booked. Time: 3 hours a week of writing and replying at an opportunity cost of EUR 100/h; no paid tools.`,
          steps: [
            { md: md`**Engagement rate:** $\text{ER} = (1{,}800 + 360 + 90)/90{,}000 = 2{,}250/90{,}000 = 2.5\%$.` },
            { md: md`**Comment share of engagement:** $360/2{,}250 = 16\%$. Comments are the most valuable engagement; read who wrote them, not just how many.` },
            { md: md`**Founder time cost:** $12 \times 3 \times 100 = $ EUR 3,600.` },
            { md: md`**Cost per qualified conversation:** $C_{\text{conv}} = 3{,}600/6 = $ **EUR 600**.` },
            { md: md`**Compare:** the booth in Lesson 4 cost EUR 1,583 per qualified lead, talk plus dinner EUR 1,011. The founder channel is competitive in its first quarter and should get cheaper as the audience compounds.` },
          ],
          result: md`ER 2.5% and EUR 600 per qualified conversation. Keep the cadence, double down on the post types that produced the 14 inbound messages, and track whether cost per conversation falls in the next quarter.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "A first month for Mizan",
          given: md`Illustrative. 4 weeks, 3 posts a week. 24,000 impressions, 420 reactions, 95 comments, 25 reposts. 12 hours of founder time at EUR 100/h; 3 qualified conversations with O&M or asset managers.`,
          steps: [
            { md: md`Engagements $= 420 + 95 + 25 = 540$.` },
            { md: md`$\text{ER} = 540/24{,}000$.` },
            { md: md`= **2.25%**.`, hidden: true, check: { prompt: "Engagement rate (%)", answer: 2.25, unit: "%", tolerance: { abs: 0.01 } } },
            { md: md`Cost per conversation $= 12 \times 100/3$.` },
            { md: md`= **EUR 400**.`, hidden: true, check: { prompt: "Cost per qualified conversation (EUR)", answer: 400, unit: "EUR", tolerance: { abs: 1 } } },
          ],
          result: md`Early numbers from a small Gulf audience are noisy; judge the channel on a quarter, not a month, and on who is in the conversations.`,
        },
        {
          kind: "bilingual",
          title: "Transcreating a Mizan post (English and MSA)",
          en: md`Most PV plants in Kuwait clean on a calendar. Dust does not arrive on a calendar.

A dust storm can undo a week of cleaning in an afternoon, and a calm fortnight can leave panels clean enough to skip a cycle.

At Mizan we are working on measuring soiling loss from the plant's own data, so cleaning follows the loss, not the date.

A question for O&M managers: how do you decide today when to clean?`,
          ar: md`تعتمد معظم محطات الطاقة الشمسية في الكويت على جدول زمني ثابت للتنظيف، لكن الغبار لا يلتزم بجدول.

فقد تُبدّد عاصفة غبارية واحدة أثر أسبوع كامل من التنظيف خلال ساعات، وقد تمرّ أسابيع هادئة تبقى فيها الألواح نظيفة بما يكفي لتأجيل دورة تنظيف.

نعمل في ميزان على قياس فاقد الاتساخ من بيانات المحطة نفسها، ليتبع التنظيفُ حجمَ الفاقد لا التاريخ.

سؤال لمديري التشغيل والصيانة: كيف تقررون اليوم موعد التنظيف؟`,
        },
        {
          kind: "md",
          md: md`**What the transcreation did:** it kept the hook (calendar vs dust) but rebuilt the sentences in natural MSA rather than mirroring English word order; used اتساخ for soiling, not تلوث; addressed managers in the respectful plural (تقررون); and made no claims about results, because none exist yet. A Kuwaiti reader should not be able to tell which version was written first.`,
        },
      ],
    },
    {
      layer: "field",
      title: "Running the channel and bilingual communication week to week",
      blocks: [
        {
          kind: "md",
          md: md`### The weekly routine (about three hours)

1. **Monday, 60 minutes:** draft three posts from last week's calls, notes and engineering conversations; an AI tool can turn your notes into drafts, you rewrite them in your voice.
2. **Engineering check:** any technical claim goes past Ismail, Yusuf or Omar, exactly as in the claims register.
3. **Publish** on two or three weekdays at times when your audience is working (Gulf and European working hours overlap in the morning in Europe).
4. **Daily, 15 minutes:** reply to every substantive comment; leave three thoughtful comments on buyers' or partners' posts.
5. **Friday, 15 minutes:** update the sheet (impressions, ER, profile visits from target accounts, inbound messages, conversations) and note what generated conversations.

### Bilingual practice

- Decide per post whether it is English only, Arabic only or both; for Gulf government and industry audiences, an Arabic version signals respect.
- Write the Arabic as its own post (transcreation), not a translation pasted under the English.
- Keep a shared EN/AR glossary for each venture (soiling, performance ratio, pilot, change impact) and use it in posts, decks and letters alike.
- Have a native reviewer for important pieces: Gulf Arabic for anything aimed at Kuwaiti or Gulf readers; machine translation and AI drafts are a start, not a finish.
- Check the rendered result on a phone: Arabic with embedded Latin names and numbers is where layout breaks.`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What goes wrong",
          md: md`- **Automation tools.** Connection-request and message sequences breach the User Agreement, can get your account restricted and read as spam to exactly the buyers you want.
- **Engagement bait.** "Comment YES for the PDF" grows numbers and an audience of the wrong people.
- **Inconsistency.** Three weeks of daily posting followed by two months of silence resets the audience.
- **Confidential details.** Naming a pilot customer, a KISR study or a rig failure without written approval, even in passing.
- **Dialect in the wrong place.** A dialect phrase in a letter to a ministry, or heavy formal MSA on a podcast.
- **Literal translation.** English word order in Arabic, wrong honorifics, or a translated product name.`,
        },
        { kind: "sources", refs: ["fc05-r18", "fc05-r19", "fc05-r20", "fc05-r21", "fc05-r22"] },
        {
          kind: "callout",
          tone: "ai",
          title: "Using AI without automating",
          md: md`Good uses: turning call notes into draft posts; suggesting three hooks; checking an Arabic draft for register and grammar; producing a first transcreation that a native speaker then fixes; researching a person's public work before you write to them. Not acceptable: any tool that sends, connects, likes or scrapes on your behalf. The rule: a human reads and sends every message.`,
        },
        { kind: "xref", to: "m13-l02", note: "Briefs, memos and official letters in English and Arabic: formats, honorifics and protocol for ministry correspondence." },
        { kind: "xref", to: "m14-l03", note: "Drafting EN/AR documents with AI: register control and terminology consistency with AI tools." },
        {
          kind: "checklist",
          title: "Before a post or bilingual piece goes out",
          items: [
            "Derived from the brand platform; teaches something from real work",
            "Technical claims checked by an engineering partner",
            "No partner, customer or government body named without written approval",
            "Arabic version transcreated, in the right register, with consistent terminology and correct honorifics",
            "Rendered version checked on a phone for right-to-left layout of names, numbers and punctuation",
            "No automation anywhere in the distribution",
          ],
        },
        {
          kind: "question",
          question: {
            id: "fc05-l05-p1",
            type: "short",
            prompt: md`Produce a four-week LinkedIn plan for yourself as founder of **Mizan or Suhail**: cadence, a list of 10 to 12 post ideas tagged by format, your weekly routine, the metrics you will track (with at least one formula), and one complete post written in both English and Arabic, with a sentence justifying the Arabic register you chose. Include your rule on automation. Do not invent results, partners or numbers.`,
            rubric: [
              "Sustainable cadence (two to four posts a week) with a weekly routine including replies and comments on others' posts",
              "Post ideas teach from real work, are tied to the venture's platform and mix formats; no invented results or partners",
              "Metrics separate diagnostics (impressions, ER) from outcomes (inbound from ICP, qualified conversations) with a correct formula",
              "Explicit rule: no automation of connections, messages or scraping; AI only for drafting and checking",
              "Bilingual post is transcreated rather than literal, uses an appropriate register with a justification, consistent terminology and correct direction for Latin names",
              "Plan is concrete enough to start on Monday",
            ],
            modelAnswer: md`**Venture: Suhail. Cadence:** three posts a week (Monday, Wednesday, Sunday for Gulf readers), plus three substantive comments a day on builders', researchers' and investors' posts.

**Post ideas:** (1) why we are starting Suhail (text); (2) the Arab builder problem: talent leaving for lack of peers (text); (3) map of open Arabic model and dataset resources (document); (4) what makes a hackathon produce projects that survive (document); (5) build-night announcement (bilingual text); (6) a builder's project after the first build night, with permission (image); (7) what sponsors get from a community that is valuable without them (text); (8) The Majlis podcast trailer (short video, Gulf dialect, subtitled); (9) lessons from organising the first event, including what went wrong (text); (10) call for volunteer leads (bilingual); (11) poll: what should the next build night focus on (poll); (12) thank-you post naming volunteers who agreed (image).

**Routine:** Sunday 60 minutes drafting from notes, AI helps with structure and Arabic proofreading; daily 15 minutes replies and comments; Thursday 15 minutes metrics.

**Metrics:** diagnostics: impressions and $\text{ER} = (R + K + S)/I$; outcomes: messages from builders, sign-ups for the build night, conversations with potential sponsors; $C_{\text{conv}} = h c_h / N_{\text{conv}}$.

**Automation rule:** no tool connects, messages, likes or scrapes on my behalf; I write and send every message myself.

**Post (EN):** Arab builders: we are starting Suhail, a place to build together. First build night: [city], [date]. Bring a project you are stuck on: Arabic NLP, hardware, anything. No talks, no pitches: two hours of building, then dinner. Comment or message me if you want to come, and I will send the details myself.

**Post (AR):** إلى البنّائين العرب: نطلق «سهيل»، مساحةً لنبني معاً. أول أمسية بناء: [المدينة]، [التاريخ]. أحضر مشروعاً توقفت عنده: معالجة اللغة العربية، أو العتاد، أو أي فكرة أخرى. لا محاضرات ولا عروض للمستثمرين: ساعتان من العمل ثم عشاء. اكتب تعليقاً أو راسلني إن أردت الحضور، وسأرسل التفاصيل بنفسي.

**Register:** light MSA so that builders across the Arab world read it easily, with a warm, direct tone that suits a community invitation; the podcast trailer uses Gulf dialect.`,
            explanation: md`The plan must be sustainable for a founder running three ventures, measured on conversations, free of automation, and bilingual in a way that reads native in both languages.`,
            concepts: ["fc05.founder-led-linkedin", "fc05.linkedin-metrics", "fc05.no-automation", "fc05.arabic-register", "fc05.transcreation"],
            difficulty: 2,
          },
        },
        { kind: "scenario", scenario: "fc05-s3" },
        {
          kind: "feynman",
          prompt: "Explain to Suhail's new volunteer leads when to write in Modern Standard Arabic, when to use Gulf dialect, and why a literal translation of an English post is not good enough.",
          keyPoints: [
            "MSA for formal and written official communication: sponsors, government, press, website",
            "Gulf dialect for spoken and community settings: podcast, hosting, informal chat",
            "Light MSA for posts aimed at the whole Arab world; dialect for warmth in community posts",
            "Transcreation keeps intent and tone, rebuilds sentences, adapts examples and calls to action",
            "Consistent terminology, correct honorifics, product names in Latin script, and a native reviewer",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "fc05-l05-q1",
      type: "numeric",
      prompt: md`A post gets 8,000 impressions, 150 reactions, 30 comments and 20 reposts. What is the engagement rate? (%)`,
      answer: 2.5,
      tolerance: { abs: 0.01 },
      unit: "%",
      explanation: md`$(150 + 30 + 20)/8{,}000 = 200/8{,}000 = 2.5\%$. A diagnostic only; who commented matters more.`,
      concepts: ["fc05.linkedin-metrics"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc05-l05-q2",
      type: "numeric",
      prompt: md`In a quarter you spend 40 hours on LinkedIn at an opportunity cost of EUR 120/h and EUR 600 on design help, producing 8 qualified conversations. What is the cost per qualified conversation? (EUR)`,
      answer: 675,
      tolerance: { abs: 1 },
      unit: "EUR",
      explanation: md`$(40 \times 120 + 600)/8 = (4{,}800 + 600)/8 = 675$ EUR.`,
      concepts: ["fc05.linkedin-metrics"],
      difficulty: 2,
    },
    {
      id: "fc05-l05-q3",
      type: "mcq",
      prompt: "Which use of tools on LinkedIn is acceptable?",
      options: [
        "A tool that sends 100 personalised connection requests a day",
        "A scraper that exports profiles of test engineers into a spreadsheet",
        "An AI assistant that drafts a message you then edit and send yourself",
        "An engagement pod that auto-likes members' posts",
      ],
      answer: 2,
      explanation: md`Drafting help is fine; anything that connects, messages, scrapes or engages on your behalf breaches the User Agreement or its spirit, and the GDPR applies to scraped personal data of people in the EU.`,
      concepts: ["fc05.no-automation"],
      difficulty: 1,
    },
    {
      id: "fc05-l05-q4",
      type: "mcq",
      prompt: "Which register fits a letter from Mizan to a director at KISR?",
      options: ["Kuwaiti dialect, to sound close", "Formal Modern Standard Arabic with correct titles", "English only", "A literal machine translation of the English letter"],
      answer: 1,
      explanation: md`Formal written correspondence to a government research body is MSA with correct honorifics (الدكتور, سعادة where applicable).`,
      concepts: ["fc05.arabic-register"],
      difficulty: 1,
    },
    {
      id: "fc05-l05-q5",
      type: "multi",
      prompt: "Which are good transcreation practices? (Select all that apply.)",
      options: [
        "Keep product names such as Ripple and Lockstep in Latin script",
        "Mirror the English word order to stay faithful",
        "Use one Arabic term consistently for each technical concept",
        "Translate 'pilot project' as طيار",
        "Have a native Gulf Arabic reader check the rendered version",
      ],
      answer: [0, 2, 4],
      explanation: md`Mirroring English word order produces unnatural Arabic; "pilot project" is مشروع تجريبي.`,
      concepts: ["fc05.transcreation", "fc05.bidi-typography"],
      difficulty: 1,
    },
    {
      id: "fc05-l05-q6",
      type: "decision",
      prompt: md`Your quarter shows high impressions but zero inbound messages from target accounts. What do you change first?`,
      options: [
        { text: "Post more often to raise impressions further.", score: 0.1, feedback: "More of the same reach to the wrong people will not create conversations." },
        { text: "Review which posts drew comments from target-role people, shift topics toward their problems, add a clear invitation to talk, and spend more time commenting on buyers' posts.", score: 1, feedback: "Fix audience fit and the path to conversation, which are the outcome levers." },
        { text: "Buy a tool that messages everyone who liked a post.", score: 0, feedback: "Automation breaches the User Agreement and turns warm readers into annoyed ones." },
      ],
      explanation: md`Impressions are a diagnostic. Outcomes depend on audience fit and an explicit, personal path to a conversation.`,
      concepts: ["fc05.linkedin-metrics", "fc05.founder-led-linkedin"],
      difficulty: 2,
    },
    {
      id: "fc05-l05-q7",
      type: "mcq",
      prompt: "What is the MSA equivalent of the Gulf dialect word وايد?",
      options: ["الآن", "كثيراً", "أريد", "ماذا"],
      answer: 1,
      explanation: md`وايد means "a lot" or "very": MSA كثيراً or جداً. الحين is "now" (الآن), أبي is "I want" (أريد), شنو is "what" (ماذا).`,
      concepts: ["fc05.arabic-register"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc05-l05-f1", front: "Sustainable founder posting cadence", back: "Two to four posts a week, sustained for months, plus daily replies and comments on buyers' posts.", concepts: ["fc05.founder-led-linkedin"] },
    { id: "fc05-l05-f2", front: "Engagement rate formula", back: md`$\text{ER} = (R + K + S)/I$, a diagnostic, not an outcome.`, concepts: ["fc05.linkedin-metrics"] },
    { id: "fc05-l05-f3", front: "The outcome metric for a founder channel", back: "Qualified conversations, and cost per conversation including founder time.", concepts: ["fc05.linkedin-metrics"] },
    { id: "fc05-l05-f4", front: "Why never automate LinkedIn messaging", back: "Breaches the User Agreement, risks account restriction and GDPR exposure, and destroys trust with engineer buyers.", concepts: ["fc05.no-automation"] },
    { id: "fc05-l05-f5", front: "MSA vs Gulf dialect, one-line rule", back: "MSA for formal and written, Gulf dialect for informal and spoken; light MSA for posts to the wider Arab world.", concepts: ["fc05.arabic-register"] },
    { id: "fc05-l05-f6", front: "Arabic for 'soiling' in PV", back: "اتساخ الألواح or تراكم الغبار, not تلوث.", concepts: ["fc05.transcreation"] },
    { id: "fc05-l05-f7", front: "Transcreation vs translation", back: "Transcreation recreates intent, tone and call to action for the target audience; translation maps words.", concepts: ["fc05.transcreation"] },
    { id: "fc05-l05-f8", front: "Where bilingual layout breaks", back: "Latin names, numbers, percentages and punctuation inside Arabic text; check the rendered version on a phone.", concepts: ["fc05.bidi-typography"] },
  ],
  scenarios: [
    {
      id: "fc05-s3",
      title: "The growth agency's automation offer",
      context: md`A growth agency offers to "scale your founder brand": a tool that sends 100 personalised connection requests a day to test engineers in Europe, a three-step follow-up message sequence written by AI, and an engagement group that likes your posts. EUR 900 a month, "guaranteed 20 meetings".`,
      start: "a",
      concepts: ["fc05.no-automation", "fc05.founder-led-linkedin", "fc05.linkedin-metrics"],
      nodes: {
        a: {
          md: md`What do you reply?`,
          choices: [
            { text: "Accept for one month as a test; meetings are meetings.", score: 0, feedback: "It breaches LinkedIn's User Agreement, risks your account and your reputation with a small, connected community of test leads.", next: "c" },
            { text: "Decline. Ask instead whether they can help with research and drafting only, with you sending everything by hand.", score: 9, feedback: "Keeps the useful part (preparation) and removes the harmful part (automated sending).", next: "b" },
            { text: "Decline and ignore the topic.", score: 6, feedback: "Avoids the harm, but you still need a plan to scale conversations.", next: "b" },
          ],
        },
        b: {
          md: md`Your engineer partner asks how you will get to 20 conversations a quarter without automation.`,
          choices: [
            { text: "Show the numbers: about 6 conversations a quarter from posting at EUR 600 each, plus 10 personal messages a week to people who commented or work at target accounts, plus event follow-ups; track cost per conversation weekly.", score: 10, feedback: "A measurable manual system that compounds and protects the brand." },
            { text: "Promise to post daily until it works.", score: 3, feedback: "Volume without a path to conversation rarely works." },
          ],
        },
        c: {
          md: md`Three weeks in, your account is restricted for suspicious activity, and a head of test you met at a conference posts a screenshot of your "personal" message sequence, asking if anyone else got the same one.`,
          choices: [
            { text: "Stop the tool, apologise publicly and personally to those affected, and rebuild with manual outreach.", score: 3, feedback: "The only honest path now, but the reputational cost in a small professional community is lasting." },
          ],
        },
      },
    },
  ],
};

export default lesson;
