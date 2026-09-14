# Full book PDF exports

The site links to a complete PDF in its selected language. Each contains the
quick summary, 15 chapters, prompt templates, diagrams, evidence panels,
review notes, source summaries, links, contents page, and PDF bookmarks.
Downloads are committed rather than rebuilding Blender and Chromium on Pages CI.
Most pages are A4; wide diagrams use landscape pages and long diagrams use
A3 foldouts to keep their labels readable. Choose “fit to page” when printing
on smaller paper, or read the foldouts at their original size on screen.

For an editorial update:

1. Update all language editions and run `npm run build`.
2. If figures changed, run `npm run artwork`. The default launcher reuses
   the neighboring `3d_astra/.tools/blender-4.5.3-windows-x64/blender.exe`.
   Set `BLENDER_BIN` or pass `--blender` elsewhere.
3. Install the official document renderer into an ignored tools directory:
   `npm install --prefix .qa/mermaid --no-audit --no-fund @mermaid-js/mermaid-cli@11.17.0`.
   Run `node scripts/render-pdf-diagrams.mjs` when Mermaid definitions change.
   `MERMAID_CLI` can point to another compatible CLI's `src/cli.js`.
4. Run `python scripts/build-pdf.py` with Python 3 and `reportlab`,
   `beautifulsoup4`, `pillow`, and `pypdf`. The script also recognizes
   dependencies in `.qa/python`. This release used ReportLab 5.0.1.
   Fonts default to `C:/Windows/Fonts`: Arial regular/bold, Georgia, and
   Malgun Gothic regular/bold. Set `BOOK_FONT_DIR` to a directory with those
   legitimately available font files on another machine. Fonts are embedded
   as subsets; font files themselves are not distributed in this repository.
5. Render the PDFs with `pdftoppm` and inspect all pages. Check text, glyphs,
   table breaks, diagram legibility, and links. Never substitute text
   extraction for visual inspection.
6. After verifying the export, run `node scripts/pdf-integrity.mjs --stamp`,
   `npm run build`, and `npm run check`.

`output/pdf/manifest.json` records each PDF's page count, checksum, and a
fingerprint of the book, translations, figures, and export code. The check
fails if a manuscript changes without a corresponding refreshed PDF or if
the published copy differs. Text is normalized to LF for cross-platform
checksums. Do not stamp a stale PDF to bypass a failed freshness check.

Temporary page renders belong in `tmp/pdfs/` (ignored).
