import { mkdir, readFile, writeFile, readdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const esc = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const files = (await readdir(path.join(root, 'book'))).filter(f => f.endsWith('.html')).sort();
const allUi = JSON.parse(await read('locales/ui.json'));
const originals = JSON.parse(await read('book/sources.json'));
const originalEvidence = JSON.parse(await read('book/evidence.json'));
await mkdir(path.join(root, 'dist'), { recursive: true });
async function buildLanguage(lang) {
const ui = allUi[lang];
const translated = lang === 'en' ? originals : JSON.parse(await read(`locales/${lang}/sources.json`));
const sources = originals.map(source => {
  const text = translated.find(s => s.id === source.id);
  if (!text) throw new Error(`Missing ${lang} source ${source.id}`);
  return {...source, ...text, verification:{...source.verification, ...text.verification}};
});
const diagrams = JSON.parse(await read(lang === 'en' ? 'diagrams/catalog.json' : `locales/${lang}/diagrams/catalog.json`));
const translatedEvidence = lang === 'en' ? originalEvidence : JSON.parse(await read(`locales/${lang}/evidence.json`));
const evidence = originalEvidence.map(entry => {
  const text = translatedEvidence.find(e => e.chapter === entry.chapter);
  if (!text || text.records.length !== entry.records.length) throw new Error(`Missing ${lang} chapter evidence ${entry.chapter}`);
  return {...entry, records:entry.records.map((record, i) => ({...record, ...text.records[i]}))};
});
const assetLanguage = lang === 'en' ? '' : `${lang}/`;
const sourceLinks = numbers => numbers.map(number => {
  const source = sources.find(s => s.id === number);
  if (!source) throw new Error(`Unknown evidence source ${number}`);
  return `<a href="${esc(source.verification.url || source.url)}" lang="en">${esc(source.title)} ↗</a> <a class="evidence-note-link" href="#source-${number}">[${number}: ${ui.readingNote}]</a>`;
}).join('<br>');
const chapters = [];
for (const file of files) {
  let body = await read(lang === 'en' ? `book/${file}` : `locales/${lang}/book/${file}`);
  const [, id, title] = body.match(/<h2 id="([^"]+)">([^<]+)<\/h2>/) ?? [];
  if (!id) throw new Error(`Missing chapter title: ${file}`);
  const sectionTitles = [ui.introduction];
  body = body.replace(/<h3>([^<]+)<\/h3>/g, (_, heading) => {
    sectionTitles.push(heading);
    return `<h3 id="${id}-part-${sectionTitles.length - 1}">${heading}</h3>`;
  });
  const chapterEvidence = evidence.find(e => e.chapter === id);
  if (!chapterEvidence) throw new Error(`Missing chapter evidence: ${id}`);
  for (const match of [...body.matchAll(/\{\{diagram:([a-z-]+)\}\}/g)]) {
    const diagram = diagrams.find(d => d.id === match[1]);
    if (!diagram) throw new Error(`Unknown diagram ${match[1]}`);
    const source = await read(lang === 'en' ? `diagrams/${diagram.id}.mmd` : `locales/${lang}/diagrams/${diagram.id}.mmd`);
    body = body.replace(match[0], `<figure class="diagram" id="diagram-${diagram.id}"><figcaption><span class="diagram-label">${ui.mermaidLabel}</span><strong>${esc(diagram.title)}</strong></figcaption><p class="diagram-description">${esc(diagram.description)}</p><div class="diagram-canvas" tabindex="0" role="region" aria-label="${esc(diagram.title)}; ${ui.scrollHint}"><p class="diagram-status">${ui.diagramLoading}</p></div><div class="diagram-actions"><button type="button" class="diagram-copy">${ui.copyMermaid}</button><a href="diagrams/${assetLanguage}${diagram.id}.mmd" download>${ui.downloadMermaid}</a><a class="diagram-svg" hidden>${ui.downloadSvg}</a></div><details class="diagram-source"><summary>${ui.readMermaid}</summary><pre tabindex="0"><code>${esc(source.trim())}</code></pre></details><noscript><p>${ui.diagramNoJs}</p></noscript></figure>`);
  }
  for (const match of [...body.matchAll(/\{\{prompt:([^}]+)\}\}/g)]) {
    const prompt = await read(lang === 'en' ? `prompts/${match[1]}` : `locales/${lang}/prompts/${match[1]}`);
    body = body.replace(match[0], `<div class="prompt-block"><div class="prompt-bar"><span>${ui.ready} · ${esc(match[1])}</span><button type="button" class="copy-button" aria-label="${ui.copy}: ${esc(match[1])}">${ui.copy}</button></div><pre tabindex="0"><code>${esc(prompt.trim())}</code></pre><a class="download-link" href="prompts/${assetLanguage}${esc(match[1])}" download>${ui.downloadPrompt}</a></div>`);
  }
  body = body.replace(/\{\{cite:(\d+)\}\}/g, (_, number) => {
    const source = sources.find(s => s.id === number);
    if (!source) throw new Error(`Unknown citation ${number}`);
    return `<a class="citation" href="#source-${number}" title="${esc(source.title)}" aria-label="${ui.source} ${number}: ${esc(source.title)}">[${number}]</a>`;
  });
  body = body.replaceAll('<div class="table-wrap">', `<div class="table-wrap" tabindex="0" role="region" aria-label="${ui.tableHint}">`);
  const coverage = chapterEvidence.records.map(record => {
    const sections = record.sections.map(n => {
      if (!sectionTitles[n]) throw new Error(`Invalid section ${n} in ${id}`);
      return `<a href="#${n === 0 ? id : `${id}-part-${n}`}">${esc(sectionTitles[n])}</a>`;
    }).join(' · ');
    return `<li><span class="evidence-basis">${esc(ui.basis[record.basis])}</span><h4>${esc(record.label)}</h4><p class="evidence-covers"><strong>${ui.covers}</strong> ${sections}</p><p>${esc(record.note)}</p><p class="evidence-links">${record.sources.length ? sourceLinks(record.sources) : ui.originalDesign}</p></li>`;
  }).join('');
  body += `\n<details class="chapter-evidence" id="evidence-${id}"><summary>${ui.sourceCheck}</summary><p>${ui.checkedIntro}</p><ul class="evidence-records">${coverage}</ul><a class="evidence-method" href="#review-notes">${ui.reviewMethod}</a></details>`;
  chapters.push({ id, title, body, number: Number(file.slice(0, 2)) });
}
const sourceNote = value => esc(value).replace(/\[(\d{2})\]/g, (_, id) => {
  if (!sources.some(s => s.id === id)) throw new Error(`Unknown source cross-reference ${id}`);
  return `<a href="#source-${id}">[${id}]</a>`;
});
const refs = sources.map(s => `<li id="source-${s.id}"><span class="source-number">${s.id}</span><div class="source-body"><span class="source-type">${esc(s.type)}</span><h3><a href="${esc(s.url)}" lang="en">${esc(s.title)} ↗</a></h3><div class="source-meta"><span class="source-badge${s.freshness === 'Historical exception' ? ' historical' : ''}">${esc(ui.freshness[s.freshness])}</span><span>${esc(s.date)}</span></div><h4 class="source-summary-label">${s.verification.status === 'Transcript unavailable' ? ui.readingStatus : ui.mainItems}</h4><ul class="source-summary">${s.summary.map(item => `<li>${esc(item)}</li>`).join('')}</ul><p class="source-application"><strong>${ui.application}</strong> ${sourceNote(s.application)}</p><p class="source-limit"><strong>${ui.limits}</strong> ${sourceNote(s.limits)}</p><div class="source-verification"><p><strong>${esc(ui.status[s.verification.status])} · ${esc(s.verification.checked)}</strong></p><p><strong>${ui.locator}</strong> <a href="${esc(s.verification.url || s.url)}" lang="en">${esc(s.verification.locator)} ↗</a></p>${s.verification.note ? `<p>${esc(s.verification.note)}</p>` : ''}${s.related ? `<p><strong>${ui.related}</strong><br>${s.related.map(r => `<a href="${esc(r.url)}" lang="en">${esc(r.title)} ↗</a>`).join('<br>')}</p>` : ''}</div>${s.video ? `<p class="source-extra"><a href="${esc(s.video)}">${ui.video}</a> · ${esc(s.videoNote || ui.transcriptNote)}</p>` : ''}</div></li>`).join('');
const nav = chapters.map(c => `<a href="#${c.id}"><span>${c.number === 0 ? '↳' : String(c.number).padStart(2, '0')}</span>${c.title}</a>`).join('');
let template = await read('site/template.html');
if (lang !== 'en') {
  const shell = JSON.parse(await read(`locales/${lang}/shell.json`));
  for (const [original, translated] of Object.entries(shell)) {
    if (!template.includes(original)) throw new Error(`Stale ${lang} shell translation: ${original.slice(0,60)}`);
    template = template.replaceAll(original, translated);
  }
}
const controls = `<div class="reader-controls" role="group" aria-label="${ui.readingOptions}"><nav class="language-switch" aria-label="${ui.chooseLanguage}">${Object.entries(allUi).map(([key, item]) => `<a href="${item.file}?lang=${key}" lang="${key}" hreflang="${key}" data-language="${key}"${key === lang ? ' aria-current="true"' : ''}>${item.language}</a>`).join('')}</nav><button class="theme-toggle" type="button" aria-pressed="false" aria-label="${ui.darkMode}" title="${ui.themeHint}"><span aria-hidden="true">◐</span><span>${ui.darkMode}</span></button></div>`;
template = template.replace('{{readingControls}}', controls).replace('{{readerMessages}}', JSON.stringify(ui).replaceAll('<','\\u003c')).replace('{{lang}}',lang).replace('{{localeUrl}}',lang === 'en' ? '' : ui.file);
template = template.replaceAll('{{chapterCount}}', String(chapters.filter(c => c.number > 0).length)).replace('{{nav}}', nav).replace('{{chapters}}', chapters.map(c => `<section class="chapter" aria-labelledby="${c.id}"><div class="chapter-kicker">${c.number === 0 ? ui.quickRead : `${ui.chapter} ${String(c.number).padStart(2, '0')}`}</div>${c.body}</section>`).join('\n')).replace('{{sources}}', refs);
await writeFile(path.join(root, `dist/${ui.file}`), template);
if (lang !== 'en') {
  await cp(path.join(root, `locales/${lang}/prompts`), path.join(root, `dist/prompts/${lang}`), {recursive:true});
  await cp(path.join(root, `locales/${lang}/diagrams`), path.join(root, `dist/diagrams/${lang}`), {recursive:true});
}
console.log(`Built ${lang}: ${chapters.length} chapters and ${sources.length} sources`);
}
for (const language of Object.keys(allUi)) await buildLanguage(language);
await cp(path.join(root, 'site/styles.css'), path.join(root, 'dist/styles.css'));
await cp(path.join(root, 'site/preferences.js'), path.join(root, 'dist/preferences.js'));
await cp(path.join(root, 'site/book.js'), path.join(root, 'dist/book.js'));
await cp(path.join(root, 'site/diagrams.js'), path.join(root, 'dist/diagrams.js'));
await mkdir(path.join(root, 'dist/vendor'), { recursive: true });
await cp(path.join(root, 'node_modules/mermaid/dist/mermaid.min.js'), path.join(root, 'dist/vendor/mermaid.min.js'));
await cp(path.join(root, 'node_modules/mermaid/LICENSE'), path.join(root, 'dist/vendor/mermaid-LICENSE.txt'));
await cp(path.join(root, 'diagrams'), path.join(root, 'dist/diagrams'), { recursive: true });
await cp(path.join(root, 'site/favicon.svg'), path.join(root, 'dist/favicon.svg'));
await cp(path.join(root, 'prompts'), path.join(root, 'dist/prompts'), { recursive: true });
await cp(path.join(root, 'research'), path.join(root, 'dist/research'), { recursive: true });
await writeFile(path.join(root, 'dist/.nojekyll'), '');
console.log('Built three complete language editions into dist/');
