# How to do better

A practical, researched book about making a 3D game with an AI agent: prompts, GitHub, reusable skills, GPT-6 Astra, playable milestones, verification, and GitHub Pages.

**Read the book:** https://buicongnguyen.github.io/Better_skill/

Use the reading toolbar to choose **English**, **Tiếng Việt**, or **한국어**, and toggle **Dark mode**. Each edition includes a quick summary, all 17 full chapters, 64 reading notes, evidence panels, 21 prompt downloads, and ten translated diagrams. Source titles and passage-search terms retain their original English; the separate audit-record download is labeled as English.

Language switching keeps the nearest chapter or subsection. The site remembers language and theme locally in the browser, with system light/dark preference as the initial default. Explicit language links override the saved language. No translation service or account is required. Without JavaScript, the three editions and their language links remain readable.

## Contents

Start with the [quick summary](https://buicongnguyen.github.io/Better_skill/#summary): three main points and eleven concise steps, each linked to the full reading. It appears before chapter 1 and in the contents; existing chapter numbers and links remain unchanged. The final step covers the optional trailer. Each step also links to its copyable recipe in chapter 17. Chapter 16 covers desktop setup, Git/GitHub login, optional SSH and Claude Code, and Pages/Vercel publishing.

17 chapters compare game workflows and engine choices, draw on 64 source records, and develop the original Signal Garden design into an implementation plan. Every introduction and subsection has a source check record with direct links and a statement of what the evidence supports. Original proposals are labeled separately from documented behavior and research findings.

63 entries have checked source content; one historical video remains a reading lead because its transcript was unavailable in this review. Its earlier passage summary was withdrawn. Verified reading notes include main items, date information, application, limits, and passage locators. See the [content review](research/review-2026-09-14.md).

Twenty-one copyable and downloadable templates cover repository instructions, an optional game review skill, a prompt-generating prompt, compact and bootstrap Astra prompts, targeted repair, release, a video workflow brief, an environment preflight, and eleven cookbook steps with two publishing alternatives.

Ten original Mermaid diagrams map observable decisions, context/data flow, improvement, separate game/prompt iteration, video route selection, shot assets, a conceptual ComfyUI graph, asynchronous job handling, and a narrowly scoped hook. Readers can copy the definitions or download `.mmd` and rendered SVG files. The video chapter compares Remotion, ComfyUI, a provider API, and n8n, with a Comfy Cloud MCP setup walkthrough. Its Remotion companion video is linked, but its transcript was not retrieved.

The September revision prioritizes research published or updated since 1 March 2026, including OpenAI’s 11 September Astra instruction guidance. Undated live documentation and explicitly labeled historical exceptions remain. The skills chapter distinguishes availability, automatic selection, explicit invocation, and authoring; it proposes an Astra comparison without claiming to have run it.

Signal Garden is a worked design example. This repository is the book website, not an implemented game. Prompt examples and design targets are original proposals, not measured benchmark results. Transcript mirrors and retrieval limitations are disclosed in the source ledger. Research date: 14 September 2026.

## Local development

Requires Node.js 22 or later. Install the locked Mermaid dependency before building.

```sh
npm ci
npm run build
npm run check
npm start
```

Open http://127.0.0.1:4173/Better_skill/ . The server deliberately supports the production repository subpath. Rebuild and reload after editing.

## Editing

- `book/*.html`: chapter manuscripts, ordered and numbered by their two-digit filename prefix. `00-summary.html` is the unnumbered quick read; chapters 01–15 retain their numbers. Each needs an `h2` with a unique ID.
- `book/sources.json`: source URLs, types, dates, three main items, applications, and evidence limits. IDs remain stable while reading order prioritizes recent research.
- `book/evidence.json`: coverage of every chapter introduction and subsection, with source IDs, basis, and scope of support. Section 0 is the introduction; subsequent numbers follow the chapter's `h3` order.
- `research/`: downloadable content-review record and disclosed retrieval limits.
- `prompts/*.md`: source templates, embedded at build time and copied as downloads.
- `diagrams/*.mmd` and `diagrams/catalog.json`: original flow definitions and plain-language descriptions.
- `locales/vi/` and `locales/ko/`: complete translated chapters, prompts, diagram labels/descriptions, reading notes, evidence text, and page-shell strings. Preserve chapter IDs, subsection order, citations, and diagram connections when editing. Source URL and evidence metadata inherit from the English originals.
- `locales/ui.json`: native reading controls, interaction messages, and evidence labels for each edition. `site/preferences.js` applies preferences before styling to avoid a light flash.
- `site/`: page shell, stylesheet, accessible reading interactions, and original SVG favicon.
- `scripts/build.mjs`: static generation, including the locally bundled Mermaid renderer and its license.
- `scripts/check.mjs`: all three editions' anchors, assets, translated summaries/evidence, citation coverage, prompt downloads, and diagram topology parity. Visual rendering and saved preferences are verified in a browser.
- `dist/`: generated, tracked public site. Deploy this directory only.

`{{cite:01}}` creates a link to a source entry. `{{prompt:meta-prompt.md}}` embeds an escaped copyable prompt and its download. `{{diagram:thinking-loop}}` embeds a described Mermaid figure. Tables and diagrams scroll within the reading column on smaller screens; Graphs begin at a readable native size; “Fit diagram” switches to an overview. The browser’s print action formats the full book without navigation and without truncating prompts.

The design uses Google Fonts with system-font fallbacks. Vietnamese serif text uses locally bundled Noto Serif with Latin and Vietnamese character subsets, avoiding detached accents from the previous Georgia fallback; its license and provenance are in `site/fonts/`. All chapters, diagram descriptions, and Mermaid definitions remain readable without JavaScript. Visual graphs render from trusted static definitions with Mermaid's strict security setting; no external diagram service or media API is called by the book. The renderer is pinned to 11.17.2 with a committed lockfile, and its license is included in `dist/vendor/`.

Dark mode includes tables, source panels, code, and Mermaid diagrams. Print styles and standalone SVG downloads use a light background for legibility outside the website. The build produces `index.html`, `vi.html`, and `ko.html` with language-specific prompt and diagram download folders.

## Publication

GitHub Pages is configured to use GitHub Actions. Pushes to `main` run the static build and checks, upload `dist/`, then deploy through the `github-pages` environment. This follows the GitHub Pages deployment pattern used by neighboring repositories without changing them.

The source files and deployed output belong to this repository. The skill text in `prompts/` is an illustrative game template and is not installed as an active skill for the book project.

## PDF and illustration editions

Download the full book as [English PDF](output/pdf/how-to-do-better-en.pdf), [Vietnamese PDF](output/pdf/how-to-do-better-vi.pdf), or [Korean PDF](output/pdf/how-to-do-better-ko.pdf). The website has matching download and GitHub links. Each edition contains a contents page, all chapters, prompts, diagrams, citations, and reading notes.

Original Blender concept figures include an [editable scene](illustrations/signal-garden.blend) and [reproduction instructions](illustrations/README.md). The shared Blender executable is reused from the neighboring 3d_astra project; it is not needed to read the website. [PDF maintenance instructions](scripts/PDF.md) explain rebuilding and the freshness check that prevents stale downloads.
