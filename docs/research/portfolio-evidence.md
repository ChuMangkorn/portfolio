# Portfolio evidence base

Prepared 2026-11-05. All sources accessed 2026-11-05 unless noted. Primary: the originating body's own page or dataset; secondary: a third party's summary. [S#] points to the source list. Read modes: exact (script-extracted text), tool (quotes returned by a fetch tool), abstract (abstract only), summary (search-result summary, page unread). Nothing was tested in a real browser.

## Q1. How hiring readers read in the first seconds

|Study|Sample and measure|Number|Does NOT show|
|---|---|---|---|
|NN/g dwell time, 2011-09-11 [S1], secondary (NN/g summary of Microsoft Research data)|205,873 pages, 2 billion+ dwell times from a browser plug-in|Users often leave in 10 to 20 seconds; first 10 seconds critical; "communicate your value proposition within 10 seconds"|Collection years; plug-in population; portfolios or hiring readers; original paper not read|
|NN/g scrolling and attention, 2018-04-15 [S2], primary|120 participants, 130,000+ eye fixations on a 1920x1080 screen; news, shopping, blog, FAQ pages|57% of viewing time above the fold (80% in 2010); 74% in the first two screenfuls|Phones; portfolios. Authors say the result may reflect short pages|
|Lindgaard et al. 2006 [S3], primary, abstract|Three studies; participants rated visual appeal of homepages shown for 500 ms, then 50 ms|Ratings correlated across 50 and 500 ms; "visual appeal can be assessed within 50 ms"|Sample sizes and r values; credibility or hiring outcomes; stimuli were homepages|
|Fogg et al., Stanford, 2003 [S4], primary, abstract|2,684 people judged credibility of two live sites; comments coded|"Design look" in 46.1% of comments, then information structure and focus|That design outweighs content; comment frequency is not effect size; sites were not portfolios|
|Stanford credibility guidelines [S5], primary|"three years of research that included over 4,500 people"|Show real people, expertise, easy contact; "people quickly evaluate a site by visual design alone"; some operators "try to show the dazzling things they can do with web technology"|Effect sizes; the text read carries no date|
|Ladders eye tracking, 2018 [S6], primary, archive copy|Recruiters skimming resumes: timed stage, then lab eye tracking|Average first screen "just 7.4 seconds" (earlier study: 6); best results had simple layouts, clear headers, job titles|Sample size (absent from its six pages); engineers; web pages|

Reading (inference): no study found used developer portfolios or engineers as hiring readers; all used other material (resumes, homepages, general sites). Consistent signals: fast judgement, plain structure with clear titles, trust cues (real people, expertise, contact), and a warning against showy technology.

## Q2. First-party statements on evidence of AI or agent engineering skill

None found: a first-party document saying how a portfolio should evidence agent engineering. The closest are one interview guide, one recruiter-session transcript, one candidate guidance page and two job postings.

|Source|Says|
|---|---|
|OpenAI interview guide, archived 2026-10-09 [S7], primary, exact|"We are not credential-driven"; "high potential" means "demonstrated the ability to ramp up quickly in a new domain and produce results"; formats include "pair coding interviews, take-home projects, technical tests"; "Expectations for AI and other tools vary by interview". No mention of portfolio, GitHub or personal website (searched).|
|OpenAI Residency info session transcript [S8], primary, tool|A recruiter wants "GitHub or a personal website that sort of showcases a portfolio of your research work" and says "We do wanna see a portfolio of work". A research residency, not agent engineering.|
|Anthropic guidance on candidates' AI usage, "Last updated Jul 10, 2025" [S9], primary, tool|"we're looking for candidates who excel at collaborating with AI"; "We want to see your actual experience and how you think"; no AI in interviews or take-homes unless indicated.|
|Cursor, Software Engineer, Bugbot [S10], primary, exact|"You obsess about your evals"; "You've built or worked on agents that integrate into the code review or CI/CD workflow"; "launched a product or feature to external users and owned the full loop". The form asks for a GitHub profile and "a short note on a project you're proud of".|
|Vercel, DevRel Engineer, Agentic Infrastructure [S11], primary, exact|"include a link to something you made ... a talk, a repo, a post, a video. Applications without one will not be considered." Wants "built and shipped AI applications or agents: you know tool calling, model routing, and sandboxed code execution from using them" and "a public body of work".|

Secondary sources used: none. OpenAI job postings returned 403 and were not used.

## Q3. Support and guidance matrix

Versions are the first release with unprefixed, unflagged support (MDN browser-compat-data 8.1.8, built 2026-11-02 [S12]); Baseline status is from web-features 3.45.0 [S13]. Edge matches Chrome unless shown; Chrome Android and Firefox Android match desktop in every row.

|Feature|Chrome/Edge|Safari macOS|Safari iOS|Firefox|Baseline and note|
|---|---|---|---|---|---|
|Scroll-driven animations (animation-timeline view() and scroll(), animation-range)|115|26|26|159 (2026-10-27)|Newly available since 2026-10-27|
|View Transitions, same-document|111|18|18|144|Newly, 2025-10-14|
|View Transitions, cross-document|126|18.2|18.2|none|Not Baseline|
|@starting-style|117|17.5|17.5|129|Newly, 2024-08-06|
|linear() easing|113|17.2|17.2|112|Widely, 2026-06-11|
|@property (counter() count-up needs only this plus counters; technique untested)|85|16.4|16.4|128|Newly, 2024-07-09|
|position: sticky|56 (Edge 16)|13|13|32 (feature group: 59)|Widely|
|popover attribute|114|17|17 (JS property row: 18.3)|125|Newly, 2025-01-27|
|Anchor positioning (anchor-name, anchor(), position-area)|125 (position-area 129)|26|26|147|Umbrella feature not Baseline|
|dialog, showModal()|37 (Edge 79)|15.4|15.4|98|Widely|
|dialog closedby (light dismiss)|134|preview only|none|141|Not Baseline|
|Invoker commands (command, commandfor)|135|26.2|26.2|144|Newly, 2025-12-12|
|light-dark()|123|17.5|17.5|120|Newly, 2024-05-13|
|color-mix()|111|16.2|16.2|113|Widely, 2025-11-09|
|text-wrap: balance|114|17.5|17.5|121|Newly, 2024-05-13|
|text-wrap: pretty|117|26|26|none|Not Baseline|
|font-variation-settings (kinetic type)|62 (Edge 17)|11|11|62|Widely|
|mask-image, unprefixed|120|15.4|15.4|53|Widely, 2026-06-07; -webkit- prefix earlier in Chrome and Safari|
|backdrop-filter|76 (Edge 79)|18 (prefixed from 9)|18 (prefixed from 9)|103|Newly, 2024-09-16|

Different from what I expected:
- Scroll-driven animations now ship in all three engines, but Firefox only since 159 on 2026-10-27, nine days before this check [S14]. Chrome's own page lists the same versions [S15]; WebKit's Safari 26.0 post [S16, summary only] lists it too.
- Cross-document View Transitions and text-wrap: pretty: still no Firefox [S12].
- Anchor positioning: core properties ship in all engines, but position-anchor is flagged partial before Chrome 151, Firefox 151 and Safari 27 (initial value differs) [S12].
- For a command palette, dialog.showModal() is widely available; light dismiss through closedby is missing in Safari, so click-outside needs script (my inference).

WCAG position on motion:
- SC 2.3.3 Animation from Interactions, Level AAA [S17, updated 2025-09-16]: "Motion animation triggered by interaction can be disabled, unless the animation is essential". Intent: if scrolling makes elements move beyond the essential movement of scrolling, "it can trigger vestibular disorders"; parallax is the example.
- SC 2.2.2 Pause, Stop, Hide, Level A [S18]: moving content that "(1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content" needs a pause, stop or hide control unless essential. The page does not say whether scroll-linked motion counts as starting automatically (not verified).
- Technique C39, prefers-reduced-motion [S19]: Sufficient for 2.3.3. Test: with reduced motion enabled, the animation is essential or is suppressed.
- F87 [S20, updated 2026-01-12, marked Obsolete]: it failed 1.3.1 when non-decorative content was inserted with ::before or ::after; no example uses numbers. A counter()-only count-up has no current W3C failure and no endorsement; keeping the final number as HTML text is my recommendation.

Performance:
- Chrome's page (published 2023-05-05) says scroll-driven animations can run "off the main thread" and animates transform; it gives no reduced-motion guidance [S15].
- web.dev on filters (undated) [S21]: "filters that do any kind of blurring tend to be slower than the others"; "4 times slower for each doubling of the radius"; tuning matters "especially if they use your site from a phone". It does not mention backdrop-filter. First-party guidance or benchmarks specific to backdrop-filter on mobile: none found.

## Q4. Machine-readable signals

|Statement|Status|
|---|---|
|Google AI features page [S23, undated]: "There are no additional requirements to appear in AI Overviews or AI Mode"; "You don't need to create new machine readable files, AI text files, or markup"; "no special schema.org structured data". llms.txt is not named.|Documented|
|Google Profile page markup [S24]: Person requires name; recommends agentInteractionStatistic, alternateName, description, identifier, image, interactionStatistic, sameAs. knowsAbout, hasOccupation and jobTitle are not on the page. Markup "helps Google Search understand the creators".|Documented; no Google use of knowsAbout or hasOccupation documented|
|llms.txt proposal [S22]: published 2024-09-03, modified 2026-08-10; "thousands of sites publish" it; OpenAI, Anthropic and Gemini publish their own; "this was largely a prediction" in 2024; names no crawler or assistant that reads it.|Proposed|
|Chrome Lighthouse llms-txt audit [S25]: flags a server error on fetch; a 404 is N/A because the file is optional for now; says nothing about any crawler using it.|Documented as an audit only|
|OpenAI bots page [S26]: OAI-SearchBot, GPTBot, ChatGPT-User, OAI-AdsBot, controlled by robots.txt. llms.txt appears only as a link to its own docs index; no schema.org or JSON-LD.|No consumption claim|
|Anthropic crawler article [S27]: ClaudeBot, Claude-User, Claude-SearchBot, robots.txt; no llms.txt, schema.org or JSON-LD; a machine-readable "no AI training" signal recognised from 2026-10-30.|No consumption claim|
|Bing [S28]: the page gave my fetcher no body text. A search-result summary (secondary) said Bing guidance backs schema markup for AI grounding without a guarantee and names no llms.txt statement.|Not verified|

Documented: Google says its AI features need no special files or markup. Proposed: llms.txt. In the pages read, no first-party statement says a major crawler or assistant uses llms.txt, knowsAbout or hasOccupation, and no first-party figure says how often recruiters have assistants summarise candidate pages.

## Not verified

- Lindgaard sample sizes and correlations; the full Fogg paper (abstracts only; publisher pages blocked).
- The Liu, White and Dumais paper behind S1; the Ladders sample size (live PDF 403, archive copy read).
- Live OpenAI interview guide (403; archived 2026-10-09 copy read).
- Bing guideline text; WebKit's Safari 26.0 post (summary only); Safari 27 release notes.
- Real-browser behaviour of every matrix row; performance of the counter() count-up and animated font axes (no source found).

## Sources

S1 https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/ (tool)
S2 https://www.nngroup.com/articles/scrolling-and-attention/ (tool)
S3 https://doi.org/10.1080/01449290500330448 (publisher 403; abstract via https://api.openalex.org/works/doi:10.1080/01449290500330448)
S4 https://dl.acm.org/doi/10.1145/997078.997097 (abstract via https://api.openalex.org/works/doi:10.1145/997078.997097)
S5 https://credibility.stanford.edu/guidelines/index.html (exact)
S6 https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf (live 403; read https://web.archive.org/web/2023if_/https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf, pages 1 to 6)
S7 https://openai.com/interview-guide/ (live 403; read https://web.archive.org/web/20261009124021id_/https://openai.com/interview-guide/)
S8 https://forum.openai.com/public/videos/openai-residency-program-info-session-2024-08-05 (page lists 2025-03-12)
S9 https://www.anthropic.com/candidate-ai-guidance
S10 https://cursor.com/careers/software-engineer-bugbot
S11 https://vercel.com/careers/dev-rel-engineer-agentic-infrastructure-6122437004
S12 https://cdn.jsdelivr.net/npm/@mdn/browser-compat-data@latest/data.json (8.1.8; repo https://github.com/mdn/browser-compat-data)
S13 https://cdn.jsdelivr.net/npm/web-features@latest/data.json (3.45.0)
S14 https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/159
S15 https://developer.chrome.com/docs/css-ui/scroll-driven-animations
S16 https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
S17 https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
S18 https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
S19 https://www.w3.org/WAI/WCAG22/Techniques/css/C39
S20 https://www.w3.org/WAI/WCAG22/Techniques/failures/F87
S21 https://web.dev/understanding-css
S22 https://llmstxt.org/
S23 https://developers.google.com/search/docs/appearance/ai-features
S24 https://developers.google.com/search/docs/appearance/structured-data/profile-page
S25 https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt
S26 https://developers.openai.com/api/docs/bots
S27 https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
S28 https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a (no body text returned)
