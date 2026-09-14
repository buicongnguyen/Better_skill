# How to do better

A practical, researched book about making a 3D game with an AI agent: prompts, GitHub, reusable skills, GPT-6 Astra, playable milestones, verification, and GitHub Pages.

**Read the book:** https://buicongnguyen.github.io/Better_skill/

## Contents

15 chapters compare game workflows and engine choices, draw on 48 source records, and develop the original Signal Garden design into an implementation plan. Every introduction and subsection has a source check record with direct links and a statement of what the evidence supports. Original proposals are labeled separately from documented behavior and research findings.

47 entries have checked source content; one historical video remains a reading lead because its transcript was unavailable in this review. Its earlier passage summary was withdrawn. Verified reading notes include main items, date information, application, limits, and passage locators. See the [content review](research/review-2026-09-14.md).

Eight copyable and downloadable templates cover repository instructions, an optional game review skill, a prompt-generating prompt, compact and bootstrap Astra prompts, targeted repair, release, and a video workflow brief.

Nine original Mermaid diagrams map observable decisions, context/data flow, improvement, video route selection, shot assets, a conceptual ComfyUI graph, asynchronous job handling, and a narrowly scoped hook. Readers can copy the definitions or download `.mmd` and rendered SVG files. The video chapter compares Remotion, ComfyUI, a provider API, and n8n, with a Comfy Cloud MCP setup walkthrough. Its Remotion companion video is linked, but its transcript was not retrieved.

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

- `book/*.html`: chapter manuscripts, ordered by filename. Each needs an `h2` with a unique ID.
- `book/sources.json`: source URLs, types, dates, three main items, applications, and evidence limits. IDs remain stable while reading order prioritizes recent research.
- `book/evidence.json`: coverage of every chapter introduction and subsection, with source IDs, basis, and scope of support. Section 0 is the introduction; subsequent numbers follow the chapter's `h3` order.
- `research/`: downloadable content-review record and disclosed retrieval limits.
- `prompts/*.md`: source templates, embedded at build time and copied as downloads.
- `diagrams/*.mmd` and `diagrams/catalog.json`: original flow definitions and plain-language descriptions.
- `site/`: page shell, stylesheet, accessible reading interactions, and original SVG favicon.
- `scripts/build.mjs`: static generation, including the locally bundled Mermaid renderer and its license.
- `scripts/check.mjs`: anchor, asset, source-summary, prompt, chapter, and diagram-source checks. Visual rendering is verified in a browser.
- `dist/`: generated, tracked public site. Deploy this directory only.

`{{cite:01}}` creates a link to a source entry. `{{prompt:meta-prompt.md}}` embeds an escaped copyable prompt and its download. `{{diagram:thinking-loop}}` embeds a described Mermaid figure. Tables and diagrams scroll within the reading column on smaller screens; Graphs begin at a readable native size; “Fit diagram” switches to an overview. The browser’s print action formats the full book without navigation and without truncating prompts.

The design uses Google Fonts with local serif and system-font fallbacks. All chapters, diagram descriptions, and Mermaid definitions remain readable without JavaScript. Visual graphs render from trusted static definitions with Mermaid's strict security setting; no external diagram service or media API is called by the book. The renderer is pinned to 11.17.2 with a committed lockfile, and its license is included in `dist/vendor/`.

## Publication

GitHub Pages is configured to use GitHub Actions. Pushes to `main` run the static build and checks, upload `dist/`, then deploy through the `github-pages` environment. This follows the GitHub Pages deployment pattern used by neighboring repositories without changing them.

The source files and deployed output belong to this repository. The skill text in `prompts/` is an illustrative game template and is not installed as an active skill for the book project.
