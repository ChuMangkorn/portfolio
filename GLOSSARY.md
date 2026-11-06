# Glossary

Vocabulary for this portfolio. Terms are about the content and audience, not the code.

## Audience & purpose

**Hiring reader**
The person the site is written for: a recruiter or hiring manager at a Thai, Japanese-owned, or international company. They decide within seconds whether to keep reading, so every section answers one of three questions: who is this, what can they do, how do I contact them.

**Positioning**
The one-line claim the whole page proves. Current positioning: *an AI-driven engineer who takes a Japanese client brief end to end to a shipped product*. Japanese ability and Shopify/LP experience are proof points under it, not the headline.

## Content units

**Case study**
A featured piece of work told as problem, what was done, and outcome. Client and brand names are never shown (see ADR-0001); the case is described by industry and shape ("Japanese D2C cosmetics brand"). Links appear only when the artifact is public.

**Visual card and text card**
A case study with a picture or an evidence panel is a visual card: the title over the text in one column, the visual in the other (title, picture, then text on a phone). A case with nothing to show is a text card: the same text in three columns, with its checks as a plain list. A card does not dress a list up as an artefact.

**Proof point**
A short, verifiable fact that supports the positioning: a JLPT level, a number of stores imported, a test suite that runs in CI. Never a self-assessment like "expert" or "can do everything".

**Measured strip**
The three measurements directly under the hero, each linking to the case study that holds the evidence: an AI model compared with the on-device one on a real meeting (16 of 18 against 7 of 18), a defect the reviewer agent caught (28 blocks hidden, then 0), and client delivery (300+ store locations). The first leads and takes two columns. It never repeats the reviewer's score, which the hero panel and the chart already show. A content test ties every figure and label to the sentence it comes from. NN/g's eye tracking puts 74% of reading time in the first two screenfuls, so this is where a proof point is read.

**Reviewer's own words**
The openable excerpt of a reviewer agent's report, under a row of "what the reviewer caught". It is the evidence behind that row's claim, so it is cut only for formatting and a screenshot reference, and its source line says it is an excerpt.

**Workflow**
The AI-agent engineering setup the author built and uses daily (harness, skills, memory, review agents). Treated as a case study in its own right because it is the strongest evidence for the positioning.

## Motion

**The run**
The hero's one scripted opening, about four seconds long: the headline lands word by word, an amber line travels the five stages, and a four-line panel replays how this page was built while the reviewer's score steps through the real review rounds. It plays once, then rests, and can be replayed. See ADR-0002.

**Experience rail**
The career list drawn as the hero's rail again: a dot per entry, the current job in amber, and a line whose segments fill with amber as each entry arrives (the same release as the chart bars, so it works in every browser). At rest, with no script and under reduced motion, the line is simply drawn.

**Scroll-linked effect**
Motion driven by the reader's own scroll position (the progress hairline and the hero's recede). It stops when the reader stops, lives inside `prefers-reduced-motion: no-preference` and `@supports (animation-timeline: view())`, and its resting state is the finished page. Safari's support is partial (see the note in CODING_STANDARDS), so nothing the page needs depends on one.

**Resting state**
What an animated element looks like when no animation is running: the finished page. Every keyframe describes only where an element starts, so a reader with no script, no scrolling or reduced motion lands here directly.

## Language

**Primary language**
English. Every section is readable in English alone.

**Japanese accent line**
A single short Japanese sentence under the headline plus a few labels. It signals Japanese ability without making the page bilingual.

**Stated level**
Language ability is written at the certified level (JLPT N3) plus a plain description of daily use. No inflation.
