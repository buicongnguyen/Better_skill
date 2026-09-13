# How to do better

A practical, researched book about making a 3D game with an AI agent: prompts, GitHub, reusable skills, GPT-6 Astra, playable milestones, verification, and GitHub Pages.

**Read the book:** https://buicongnguyen.github.io/Better_skill/

## Contents

13 chapters compare six workflows and four engine/toolchain choices, synthesize findings from 22 sources (including two historical YouTube transcript readings), and develop the original Signal Garden design into a concrete implementation plan. Each source includes main-item summaries, date information, an application, and limitations.

Seven copyable and downloadable templates cover repository instructions, an optional game review skill, a prompt-generating prompt, compact and bootstrap Astra prompts, targeted repair, and release.

The September revision prioritizes research published or updated since 1 March 2026, including OpenAI’s 11 September Astra instruction guidance. Undated live documentation and explicitly labeled historical exceptions remain. The skills chapter distinguishes availability, automatic selection, explicit invocation, and authoring; it proposes an Astra comparison without claiming to have run it.

Signal Garden is a worked design example. This repository is the book website, not an implemented game. Prompt examples and design targets are original proposals, not measured benchmark results. Transcript mirrors and retrieval limitations are disclosed in the source ledger. Research date: 14 September 2026.

## Local development

Requires Node.js 22 or later. There are no package dependencies or install step.

```sh
npm run build
npm run check
npm start
```

Open http://127.0.0.1:4173/Better_skill/ . The server deliberately supports the production repository subpath. Rebuild and reload after editing.

## Editing

- `book/*.html`: chapter manuscripts, ordered by filename. Each needs an `h2` with a unique ID.
- `book/sources.json`: source URLs, types, dates, three main items, applications, and evidence limits. IDs remain stable while reading order prioritizes recent research.
- `prompts/*.md`: source templates, embedded at build time and copied as downloads.
- `site/`: page shell, stylesheet, accessible reading interactions, and original SVG favicon.
- `scripts/build.mjs`: dependency-free static generation.
- `scripts/check.mjs`: anchor, asset, template, and chapter checks.
- `dist/`: generated, tracked public site. Deploy this directory only.

`{{cite:01}}` creates a link to a source entry. `{{prompt:meta-prompt.md}}` embeds an escaped copyable prompt and its download. Tables scroll within the reading column on smaller screens. The browser’s print action formats the full book without navigation and without truncating prompts.

The design uses Google Fonts with local serif and system-font fallbacks; the text and navigation remain available if the font service cannot load. All chapters are rendered in HTML and remain readable without JavaScript.

## Publication

GitHub Pages is configured to use GitHub Actions. Pushes to `main` run the static build and checks, upload `dist/`, then deploy through the `github-pages` environment. This follows the GitHub Pages deployment pattern used by neighboring repositories without changing them.

The source files and deployed output belong to this repository. The skill text in `prompts/` is an illustrative game template and is not installed as an active skill for the book project.
