# Vietnamese heading font

The Vietnamese edition uses locally hosted Noto Serif for titles, lead text,
figure headings, and other serif text. The previous Georgia stack produced
detached accents and apparent spaces inside words such as “tắt” and “nhất”.

`vietnamese-serif.css` includes both Latin and Vietnamese subsets, in normal
and italic styles, with variable weights 400–700. Keep all four WOFF2 files
together: a Vietnamese subset alone does not contain the complete Latin text.
The first fallback is Arial so initial text remains readable while loading.
English and Korean keep their existing typefaces.

The ReportLab PDF exporter uses its own embedded fonts and does not read this
CSS. This typography-only update leaves the generated book HTML, PDF exporter,
and illustration inputs unchanged; the existing PDF checksums are preserved.

Files are unmodified Google Fonts v33 downloads from Google's font servers.
`manifest.json` records exact URLs and checksums. The upstream family is
<https://github.com/google/fonts/tree/main/ofl/notoserif>; its SIL Open Font
License is included in `OFL-NotoSerif.txt`.
