import { md, type Lesson } from "../../schema";

const lesson: Lesson = {
  id: "fc10-l04",
  title: "Building internal tools with Claude Code: what a non-coding founder can build safely",
  summary:
    "Decide what to build yourself (scripts over exports, internal dashboards, small internal web apps) and what to leave to engineers, set up a repository that keeps secrets out and changes reviewable, and check that a tool pays back its build time before you start.",
  minutes: 75,
  objectives: [
    "Place a proposed tool on the sensitivity by blast-radius matrix and decide build yourself, build with review, or hand to engineers",
    "Set up a private repository with a .gitignore, CLAUDE.md rules, environment-variable secrets and test vectors",
    "Explain what to do when a secret leaks (rotate first; deleting the commit is not enough)",
    "Compute the break-even time of an internal tool and recognise tools that never pay back",
    "Run the plan, build, test, review loop with Claude Code and know which changes need an engineer's review",
  ],
  concepts: [
    {
      id: "fc10.safe-build-zone",
      name: "Safe build zone",
      description:
        "The class of tools a non-engineer can build and run alone: own or exported data, read-only access, local or access-controlled internal use, nothing that sends externally or touches production.",
      competency: "fc-ai",
      related: ["m14.safe-tooling", "m14.agentic-coding"],
    },
    {
      id: "fc10.secrets-hygiene",
      name: "Secrets hygiene",
      description:
        "Keeping API keys and passwords out of code, chats and repositories: environment variables, a git-ignored .env file, least-privilege keys, push protection, and rotation on any leak.",
      competency: "fc-ai",
      related: ["fc10.repo-hygiene"],
    },
    {
      id: "fc10.repo-hygiene",
      name: "Repository hygiene",
      description:
        "Private repo from day one, .gitignore, README, a CLAUDE.md with rules, small commits on branches, lockfiles and tests, so every change is visible and reversible.",
      competency: "fc-ai",
      related: ["m14.tool-lifecycle"],
    },
    {
      id: "fc10.tool-breakeven",
      name: "Tool break-even",
      description:
        "Months until the time saved by a tool repays its build effort; negative or tiny savings mean a template or a manual process is the better answer.",
      competency: "fc-ai",
    },
    {
      id: "fc10.review-before-run",
      name: "Review before run",
      description:
        "Reading Claude Code's plan and change summary, running tests on known inputs, and getting an engineer's review for anything with network, write or external effects, before using a tool on real data.",
      competency: "fc-ai",
      related: ["m14.describe-plan-build-test", "m14.test-vectors"],
    },
  ],
  sections: [
    {
      layer: "theory",
      title: "What to build, how agentic coding fails, and when a tool pays",
      blocks: [
        {
          kind: "callout",
          tone: "why",
          title: "Why this matters for you",
          md: md`You do not write the product; your engineering partners do. But you run three companies on spreadsheets, CRM exports, event registrations and investor updates, and each of them hides hours of repeated work a week. Claude Code lets you build the small tools that remove it: a pipeline report from a CRM export, a Suhail registration dashboard, a script that checks a tender document list. The skill is choosing tools that are safe for a non-engineer to own, and keeping the repository clean enough that an engineer can pick it up later.`,
        },
        {
          kind: "xref",
          to: "m14-l05",
          note: "Track 0 introduces Claude Code, the describe, plan, build, test loop and test vectors. This lesson adds the founder's decision of what to build, repository and secrets hygiene, and break-even.",
        },
        {
          kind: "md",
          md: md`### How an agentic coding tool works, and the four ways it hurts you

Claude Code reads files in a project folder, proposes and makes edits, and runs terminal commands, asking permission according to the mode and rules you set. It iterates: write code, run it, read the error, fix. That loop is powerful and has four failure modes a founder must design against:

1. **Secrets leak.** You paste an API key into a file or a chat; it gets committed and pushed. Public repositories are scanned for keys by attackers within minutes, and even in a private repo the key now lives in the history forever.
2. **Destructive actions.** A command deletes files, overwrites a spreadsheet, or (with credentials) changes records in a live CRM. With broad permissions and no review, the agent can do in seconds what you would never approve.
3. **Data exposure.** A dashboard deployed "quickly" to a public URL, or a repository created public by default, puts customer names and pipeline values on the internet.
4. **Untrusted inputs steering the agent.** A web page, document or data file can contain instructions the model follows (prompt injection). An agent that reads untrusted content should not also have powerful tools.

### The safe build zone

Two questions decide whether you build alone: **how sensitive is the data the tool touches**, and **what is the worst thing it can do** (its blast radius).`,
        },
        {
          kind: "matrix",
          title: "Build alone, build with review, or hand to engineers",
          xAxis: ["Read-only, local or internal", "Writes to systems, sends, or is public"],
          yAxis: ["Customer, personal, financial data or credentials", "Own or public data"],
          cells: [
            { label: "Build alone", detail: "Scripts over exports, a local dashboard of your own pipeline, a static internal page. Test vectors, private repo." },
            { label: "Build, engineer reviews", detail: "A tool that posts to Slack, writes back to a CRM, or a public event site. Review the network and write paths before first run." },
            { label: "Build alone with care", detail: "Analysis of exported customer or pilot data on your machine: no deploy, no third-party upload, delete exports after use." },
            { label: "Engineers own it", detail: "Anything with customer data in production, logins for outsiders, payments, emails to customers, or code that ships in the product." },
          ],
          caption: "Top row: own or public data. Bottom row: sensitive data. Most founder tools belong in the top-left quadrant, and that is a feature.",
        },
        {
          kind: "md",
          md: md`### Repository hygiene in six rules

1. **Git from the first minute, private repository.** Every change is a commit you can read and undo.
2. **A .gitignore before the first commit** listing .env, data folders, exports, credentials files and build output.
3. **Secrets only in environment variables** (a local .env file that is git-ignored, or the hosting platform's secret store). Never in code, never pasted into chat. Use the **least-privilege key**: read-only CRM scope for a report.
4. **A CLAUDE.md** in the repo root: what the tool does, rules ("never commit .env", "never deploy", "never call external APIs except X", "ask before deleting files"), how to run tests. Claude Code reads it every session.
5. **Small changes on a branch**, tested, then merged. Ask Claude for a plan first and approve it before any edits.
6. **Test vectors**: a small input file with a known correct output, run on every change. If the totals do not match, nothing goes to real data.

If a secret leaks: **rotate it first** (revoke the key, issue a new one), then clean up. Deleting the commit does not remove it from forks, caches or anyone who already pulled. GitHub's push protection blocks many known key formats before they leave your machine; turn it on.

### Does the tool pay?

Before building, check that time saved exceeds time spent:`,
        },
        { kind: "equation", formula: "fc10-tool-breakeven" },
        {
          kind: "md",
          md: md`Count $t_1$ honestly: time to run the tool **plus time to check its output**. A tool you must re-verify line by line saves little. And $C_b$ includes review and tests, not just the hour of prompting.`,
        },
        {
          kind: "flow",
          title: "The founder's build loop with Claude Code",
          steps: [
            { label: "Brief", detail: "Input, output, rules, test vector. One paragraph each." },
            { label: "Plan (no edits)", detail: "Claude proposes files, libraries, steps. You approve or narrow." },
            { label: "Build in small steps", detail: "One feature per commit; permission prompts left on." },
            { label: "Test on known data", detail: "Test vector totals match to the cent before real data." },
            { label: "Review", detail: "Ask Claude for a security self-review; engineer reviews anything that writes, sends or is public." },
            { label: "Run and maintain", detail: "README says how to run it and who owns it; delete what you stop using." },
          ],
        },
      ],
    },
    {
      layer: "applied",
      title: "Two tools: one obvious, one marginal",
      blocks: [
        {
          kind: "worked",
          mode: "worked",
          title: "Afterwave weekly pipeline report from a CRM export",
          given: md`Illustrative. Every Monday you spend about 2 hours turning a CRM CSV export into a pipeline summary for the team and the monthly investor update: deals by stage, weighted value, deals with no next step, stale deals. With a script, running and checking takes 15 minutes. Build with Claude Code: 6 hours including test vector and review. Maintenance: 0.5 h/month (export format changes). 4.33 Mondays a month. Your time valued at EUR 80/h.`,
          steps: [
            { md: md`**Quadrant:** exported pipeline data (sensitive but yours), read-only, local output. Build alone with care: run locally, no deploy, exports in a git-ignored folder.` },
            { md: md`**Monthly saving:** $f(t_0 - t_1) - C_m = 4.33 \times (2 - 0.25) - 0.5 = 7.58 - 0.5 = 7.08$ h/month (about EUR 566).` },
            { md: md`**Break-even:** $T_{be} = 6/7.08 = 0.85$ months, about **3.5 weeks**.` },
            { md: md`**Test vector:** a 12-deal CSV you build by hand with a known weighted total (for example EUR 247,500). The script must reproduce it exactly, and flag the two deals you deliberately left without a next step.` },
            { md: md`**Brief to Claude Code (abridged):** "Read data/export.csv (CRM export, columns listed in README). Output report.md with: deals by stage, weighted pipeline using the stage probabilities in config.yaml, deals with no next step, deals untouched for 21 days. Python, standard library plus pandas only. No network calls. Write tests that run against tests/vector.csv. Plan first; no edits until I approve."` },
          ],
          result: md`Pays back in under a month and improves the investor update's consistency. This is the ideal first tool: own data, read-only, local, recurring weekly.`,
        },
        {
          kind: "worked",
          mode: "faded",
          title: "Suhail event check-in reconciliation",
          given: md`Illustrative. After each Suhail event, volunteers reconcile the registration export with check-in scans and sponsor badge lists: about 6 hours by hand. A tool would cut it to 1 hour including checking. Events: 3 a year, so $f = 0.25$ runs/month. Build effort 10 hours; maintenance 0.2 h/month.`,
          steps: [
            { md: md`Monthly net saving: $0.25 \times (6 - 1) - 0.2$.` },
            {
              md: md`$= 1.25 - 0.2 =$ **1.05 h/month**.`,
              hidden: true,
              check: { prompt: "Net saving (h/month)", answer: 1.05, unit: "h/month", tolerance: { abs: 0.01 } },
            },
            { md: md`Break-even: $T_{be} = 10/1.05$.` },
            {
              md: md`$T_{be} = 9.5$ months, more than three events.`,
              hidden: true,
              check: { prompt: "Break-even (months)", answer: 9.52, unit: "months", tolerance: { abs: 0.05 } },
            },
            { md: md`It also handles attendees' personal data (names, emails, employers), so it sits in the "build alone with care" quadrant at best. A well-designed spreadsheet template with lookup formulas may get 70 % of the benefit in 2 hours.` },
          ],
          result: md`Marginal. Build it only if events become monthly (break-even then falls to about 2 months), or if the reconciliation errors themselves are costly (sponsor reporting). Otherwise use a template.`,
        },
        {
          kind: "question",
          question: {
            id: "fc10-l04-p1",
            type: "numeric",
            prompt: md`A Mizan tender-document checker would run 2 times a month, cutting each check from 3 h to 1 h (including review of its output). Build effort 12 h, maintenance 1 h/month. Break-even in months?`,
            answer: 4,
            tolerance: { abs: 0.05 },
            unit: "months",
            explanation: md`Net saving $= 2 \times (3 - 1) - 1 = 3$ h/month; $T_{be} = 12/3 = 4$ months. Reasonable if the tender pipeline lasts beyond that; a missed document in a public tender can mean disqualification, which is worth more than the hours.`,
            concepts: ["fc10.tool-breakeven"],
            difficulty: 1,
          },
        },
      ],
    },
    {
      layer: "field",
      title: "Setting up and running founder tools safely",
      blocks: [
        {
          kind: "md",
          md: md`### Template 1: CLAUDE.md for a founder tools repository

    # [venture]-tools
    Purpose: small internal tools for [venture]. Owner: [name]. Not product code.

    ## Rules (always)
    - Never read, print, commit or move files in .env, secrets/ or data/raw/.
    - Never commit anything listed in .gitignore. Run "git status" before commits.
    - No network calls except the APIs listed below. No deploys. No new public
      URLs. Ask before installing any new dependency.
    - Ask before deleting or overwriting any file outside the tool's output/ folder.
    - Plan first: list files to change and why; wait for approval.
    - Every tool has tests in tests/ that run on tests/vectors/; run them after
      every change and show the result.

    ## Allowed APIs and keys (names only, values live in .env)
    - CRM_READ_TOKEN (read-only scope)

    ## How to run
    [one command per tool]

### Template 2: tool brief

    TOOL: [name]. USER: [who runs it, how often].
    INPUT: [file or export, columns, example row]. Data class: [own / customer /
    personal]. Location: data/ (git-ignored).
    OUTPUT: [file, format, exact sections].
    RULES: [no network / read-only API X], [libraries allowed].
    TEST VECTOR: tests/vectors/[file] must produce [known totals and flags].
    ACCEPTANCE: tests pass; README explains how to run; no secrets in repo.
    STEP 1: propose a plan and file list only.

### Template 3: self-review before first real run

    Review this repository as a security reviewer. Report: any secret or key in
    code, history or config; any network call (host, purpose); any write or
    delete outside output/; any dependency added and why; any place untrusted
    input (files, web pages) could steer actions; anything that would expose
    data publicly. Do not fix; list findings with file and line.

### A .gitignore starting point

    .env
    .env.*
    secrets/
    data/
    output/
    *.csv
    *.xlsx
    __pycache__/
    node_modules/
    .venv/`,
        },
        {
          kind: "callout",
          tone: "pitfall",
          title: "What typically goes wrong",
          md: md`- **"Just paste the key here so I can test."** The key is now in the conversation log and probably in a file. Put it in .env yourself; tell Claude the variable name.
- **Public by default.** Creating a repository or a hosted app without checking visibility. Check before the first push and the first deploy.
- **Skipping the permission prompts.** Modes that approve every command are for disposable sandboxes, not for a laptop that holds your companies' data and credentials.
- **Write access "for convenience".** A report needs a read-only key. A tool that can write to the CRM can corrupt the pipeline you report to investors.
- **Orphan tools.** A dashboard nobody owns breaks silently when the export format changes and keeps showing stale numbers. README with owner and a test that fails loudly.
- **Letting the tool drift into the product.** If a customer will see it or rely on it, it is product: hand it to the engineers.`,
        },
        {
          kind: "ask",
          title: "Questions to ask your engineering partner before a tool goes beyond your laptop",
          items: [
            "Does anything in this repo call the network or write anywhere I have not listed?",
            "Is there any credential with more scope than the tool needs?",
            "If this runs every week for a year, what breaks first?",
            "Should this live in our main codebase, or stay as a separate internal tool?",
            "What would you need to take ownership of it?",
          ],
        },
        { kind: "scenario", scenario: "fc10-s2" },
        {
          kind: "question",
          question: {
            id: "fc10-l04-p2",
            type: "short",
            prompt: md`**Produce it.** Choose one internal tool for one of your ventures (for example: Afterwave investor-update metrics from CRM and bank exports; Mizan tender document checklist; Suhail newsletter subscriber and sponsor report). Write (a) its quadrant on the matrix with a one-line justification, (b) a break-even estimate with your numbers labelled illustrative, (c) the tool brief from Template 2, and (d) the rules section of its CLAUDE.md.`,
            rubric: [
              "Quadrant is justified by both data sensitivity and blast radius; tools that write, send or go public with sensitive data are handed to engineers",
              "Break-even computed with the formula and includes time to check output in t1",
              "Brief specifies input, data class, output, rules, a concrete test vector with known results, and plan-first",
              "CLAUDE.md rules cover secrets (.env never read or committed), network limits, no deploys, deletion approval, tests after each change",
              "Uses least-privilege access (read-only keys, exports) and keeps data in git-ignored folders",
            ],
            modelAnswer: md`**Tool:** Afterwave investor-update metrics.
(a) **Quadrant:** "build alone with care" (sensitive data, read-only). Inputs are a CRM export and a bank CSV (sensitive, ours), the tool is read-only and writes a local markdown file. No deploy.
(b) **Break-even (illustrative):** monthly update takes 3 h to assemble; tool cuts it to 0.75 h including checks. $f = 1$, build 8 h, maintenance 0.5 h/month. Saving $1 \times (3 - 0.75) - 0.5 = 1.75$ h/month; $T_{be} = 8/1.75 = 4.6$ months. Worth it because the same tool works for Mizan and Suhail updates with a config change, and it removes copy errors in numbers investors track month to month.
(c) **Brief:** Input: data/crm.csv (columns: deal, stage, value EUR, next step, last activity) and data/bank.csv (date, amount, category). Data class: internal financial and customer names. Output: output/update.md with cash at month end, net burn (3-month average), runway, pipeline by stage, weighted pipeline, new and lost deals. Rules: Python standard library plus pandas; no network; no writes outside output/. Test vector: tests/vectors/ with 10 deals and 30 transactions; expected cash EUR 412,300, 3-month average net burn EUR 44,100, runway 9.3 months, weighted pipeline EUR 96,000. Acceptance: tests pass, README with run command, git status clean of data. Step 1: plan and file list only.
(d) **CLAUDE.md rules:** never read, print or commit .env or anything in data/; run git status before every commit; no network calls; no deploys or public URLs; ask before adding dependencies; ask before deleting or overwriting anything outside output/; plan first and wait for approval; run tests after every change and show results.`,
            explanation: md`The grader checks that the founder can decide what to build, quantify it and constrain the agent. Clever code is not the point.`,
            concepts: ["fc10.safe-build-zone", "fc10.tool-breakeven", "fc10.repo-hygiene", "fc10.secrets-hygiene"],
            difficulty: 2,
          },
        },
        {
          kind: "feynman",
          prompt: "Suppose Omar proposes building a customer-facing soiling report portal with Claude Code over a weekend. Explain to him which part he can build himself and which part needs an engineer.",
          keyPoints: [
            "The matrix: data sensitivity times blast radius",
            "Customer logins, customer data in production and external access put it in the engineers' quadrant",
            "He can safely prototype the report layout on public or synthetic data, locally",
            "Secrets, permissions and deployment are where weekend tools fail",
            "A prototype is a spec for the engineers, not the product",
          ],
        },
        { kind: "sources", refs: ["fc10-r2", "fc10-r14", "fc10-r17"] },
      ],
    },
  ],
  quiz: [
    {
      id: "fc10-l04-q1",
      type: "mcq",
      prompt: "You discover an API key was pushed to a private GitHub repository last week. What is the first action?",
      options: [
        "Delete the commit and force-push",
        "Revoke and rotate the key, then clean the history and check the provider's access logs",
        "Make the repository private (it already is) and move on",
        "Rename the variable",
      ],
      answer: 1,
      explanation: md`The key must be assumed compromised: anyone who cloned, any cache or integration may hold it. Rotation makes the leaked value useless; history cleanup is secondary.`,
      concepts: ["fc10.secrets-hygiene"],
      difficulty: 1,
      diagnostic: true,
    },
    {
      id: "fc10-l04-q2",
      type: "multi",
      prompt: "Which tools sit in the 'build alone' zone for a non-engineer founder? (Select all that apply.)",
      options: [
        "A local script that summarises your own CRM export",
        "A static internal page listing Suhail volunteer roles",
        "A portal where customers log in to see their test data",
        "A script that emails all leads automatically every morning",
        "A local chart of your monthly burn from a bank CSV",
      ],
      answer: [0, 1, 4],
      explanation: md`Read-only, own data, local or internal. Customer logins and automatic external sends are engineers' work (and automated sends also run into the outreach rules of the previous lesson).`,
      concepts: ["fc10.safe-build-zone"],
      difficulty: 1,
    },
    {
      id: "fc10-l04-q3",
      type: "numeric",
      prompt: md`A report runs 4 times a month, saves 1.5 h each run, costs 0.5 h/month to maintain and took 11 h to build. Break-even in months?`,
      answer: 2,
      tolerance: { abs: 0.02 },
      unit: "months",
      explanation: md`Net saving $= 4 \times 1.5 - 0.5 = 5.5$ h/month; $11/5.5 = 2$ months.`,
      concepts: ["fc10.tool-breakeven"],
      difficulty: 1,
    },
    {
      id: "fc10-l04-q4",
      type: "order",
      prompt: "Order the first steps when starting a new tools repository.",
      items: [
        "Create a private repository",
        "Add a .gitignore covering .env, data and exports",
        "Write CLAUDE.md with rules and run commands",
        "Put secrets in a local .env file yourself",
        "Ask Claude Code for a plan before any edits",
      ],
      explanation: md`Visibility and ignore rules come before the first commit so nothing sensitive can be committed; rules before the agent starts; secrets placed by you, not by the agent.`,
      concepts: ["fc10.repo-hygiene", "fc10.secrets-hygiene"],
      difficulty: 2,
    },
    {
      id: "fc10-l04-q5",
      type: "decision",
      prompt: md`Claude Code's plan for your pipeline report includes "deploy to a free hosting service so the team can view it". The data includes customer names and deal values. What do you do?`,
      options: [
        { text: "Approve; the URL is hard to guess.", score: 0, feedback: "An unguessable URL is not access control. Customer names and deal values on the public internet are a confidentiality breach." },
        { text: "Remove the deploy step; generate a local file you share in the team's existing private workspace.", score: 1, feedback: "Keeps the tool in the safe zone and uses access control you already have." },
        { text: "Approve but add a password in the page's JavaScript.", score: 0.1, feedback: "Client-side passwords are visible to anyone who opens the source." },
      ],
      explanation: md`Deployment moves a tool from the read-only column to the public column, and with customer data into the engineers' quadrant. If team access matters, have an engineer set up proper authentication.`,
      concepts: ["fc10.safe-build-zone", "fc10.review-before-run"],
      difficulty: 2,
    },
    {
      id: "fc10-l04-q6",
      type: "mcq",
      prompt: "What is the purpose of a test vector in a founder tool?",
      options: [
        "To make the code run faster",
        "To give a small input with a known correct output so every change can be checked before real data",
        "To encrypt the data",
        "To satisfy GitHub's requirements",
      ],
      answer: 1,
      explanation: md`It is the acceptance test you can understand without reading code: if totals do not match, the tool is not used.`,
      concepts: ["fc10.review-before-run"],
      difficulty: 1,
    },
  ],
  flashcards: [
    { id: "fc10-l04-f1", front: "Two axes of the safe build matrix", back: "Data sensitivity (own or public vs customer, personal, financial, credentials) and blast radius (read-only local vs writes, sends, public).", concepts: ["fc10.safe-build-zone"] },
    { id: "fc10-l04-f2", front: "First action on a leaked key", back: "Rotate (revoke and reissue). Deleting the commit is not enough.", concepts: ["fc10.secrets-hygiene"] },
    { id: "fc10-l04-f3", front: "Tool break-even", back: md`$T_{be} = C_b/(f(t_0 - t_1) - C_m)$, with checking time inside $t_1$.`, concepts: ["fc10.tool-breakeven"] },
    { id: "fc10-l04-f4", front: "What goes in CLAUDE.md for a tools repo", back: "Purpose, owner, rules (secrets, network, deploys, deletions, plan first, tests), allowed APIs by variable name, run commands.", concepts: ["fc10.repo-hygiene"] },
    { id: "fc10-l04-f5", front: "When an engineer must review", back: "Any network call, write to a live system, external send, public deploy, or customer data in production.", concepts: ["fc10.review-before-run"] },
    { id: "fc10-l04-f6", front: "Least privilege for a report tool", back: "Read-only key or a manual export; never write access for convenience.", concepts: ["fc10.secrets-hygiene"] },
  ],
  scenarios: [
    {
      id: "fc10-s2",
      title: "Friday evening, one hour before the investor update",
      context: md`Your pipeline report script fails because the CRM changed its export format. You open Claude Code. It suggests: "The quickest fix is to call the CRM API directly. Paste your API key here and I will add it to the script."`,
      start: "a",
      concepts: ["fc10.secrets-hygiene", "fc10.review-before-run"],
      nodes: {
        a: {
          md: md`What do you do?`,
          choices: [
            { text: "Paste the admin key; it is the only one you have.", score: 0, feedback: "The key is now in the chat log and likely hard-coded in a file you will commit. It also has write scope the report does not need.", next: "b" },
            { text: "Decline. Ask Claude to adapt the parser to the new export columns, update the test vector, and run the tests.", score: 9, feedback: "Fixes the actual problem within the existing safe design.", next: "c" },
            { text: "Create a read-only API token, put it in .env yourself, and tell Claude the variable name.", score: 7, feedback: "Safe secret handling, but you have just widened the tool's blast radius under time pressure. Fine as a planned change, risky as a Friday-night one.", next: "c" },
          ],
        },
        b: {
          md: md`Claude adds the key to config.py. You run the script, it works, and you commit and push to send the update on time.`,
          choices: [
            { text: "Next morning: revoke the key, issue a read-only one into .env, purge it from history, enable push protection, and add the rule to CLAUDE.md.", score: 5, feedback: "Correct recovery, in the correct order: rotate first." },
            { text: "Leave it; the repository is private.", score: 0, feedback: "Private repositories get shared, cloned to new laptops and connected to integrations. An admin CRM key in history is a standing risk." },
          ],
        },
        c: {
          md: md`The new export has two renamed columns and a new date format. Claude proposes a parser change and an updated test vector; tests pass. The weighted pipeline total differs from last week's by 3 %.`,
          choices: [
            { text: "Check the 3 % difference against the CRM's own stage totals before sending; note in the update if the definition changed.", score: 10, feedback: "Tests prove the code matches the vector, not that the vector still matches reality after a format change." },
            { text: "Send it; tests pass.", score: 4, feedback: "A format change can also change meanings (for example a new stage). Reconcile once against the source." },
          ],
        },
      },
    },
  ],
};

export default lesson;
