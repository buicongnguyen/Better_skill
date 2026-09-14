import { mkdir, readFile, writeFile, readdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFile(path.join(root, file), 'utf8');
const esc = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const files = (await readdir(path.join(root, 'book'))).filter(f => f.endsWith('.html')).sort();
const sources = JSON.parse(await read('book/sources.json'));
const diagrams = JSON.parse(await read('diagrams/catalog.json'));
const evidence = JSON.parse(await read('book/evidence.json'));
const sourceLinks = numbers => numbers.map(number => {
  const source = sources.find(s => s.id === number);
  if (!source) throw new Error(`Unknown evidence source ${number}`);
  return `<a href="${esc(source.verification.url || source.url)}">${esc(source.title)} ↗</a> <a class="evidence-note-link" href="#source-${number}">[${number}: reading note]</a>`;
}).join('<br>');
const chapters = [];
for (const file of files) {
  let body = await read(`book/${file}`);
  const [, id, title] = body.match(/<h2 id="([^"]+)">([^<]+)<\/h2>/) ?? [];
  if (!id) throw new Error(`Missing chapter title: ${file}`);
  const sectionTitles = ['Introduction'];
  body = body.replace(/<h3>([^<]+)<\/h3>/g, (_, heading) => {
    sectionTitles.push(heading);
    return `<h3 id="${id}-part-${sectionTitles.length - 1}">${heading}</h3>`;
  });
  const chapterEvidence = evidence.find(e => e.chapter === id);
  if (!chapterEvidence) throw new Error(`Missing chapter evidence: ${id}`);
  for (const match of [...body.matchAll(/\{\{diagram:([a-z-]+)\}\}/g)]) {
    const diagram = diagrams.find(d => d.id === match[1]);
    if (!diagram) throw new Error(`Unknown diagram ${match[1]}`);
    const source = await read(`diagrams/${diagram.id}.mmd`);
    body = body.replace(match[0], `<figure class="diagram" id="diagram-${diagram.id}"><figcaption><span class="diagram-label">MERMAID · EDITABLE FLOW</span><strong>${esc(diagram.title)}</strong></figcaption><p class="diagram-description">${esc(diagram.description)}</p><div class="diagram-canvas" tabindex="0" role="region" aria-label="${esc(diagram.title)}; scroll horizontally if needed"><p class="diagram-status">Diagram loading. The text description and Mermaid source are available below.</p></div><div class="diagram-actions"><button type="button" class="diagram-copy">Copy Mermaid</button><a href="diagrams/${diagram.id}.mmd" download>Download .mmd ↗</a><a class="diagram-svg" hidden>Download SVG ↗</a></div><details class="diagram-source"><summary>Read or edit the Mermaid source</summary><pre tabindex="0"><code>${esc(source.trim())}</code></pre></details><noscript><p>The visual graph needs JavaScript. Read its description and source, or download the editable definition.</p></noscript></figure>`);
  }
  for (const match of [...body.matchAll(/\{\{prompt:([^}]+)\}\}/g)]) {
    const prompt = await read(`prompts/${match[1]}`);
    body = body.replace(match[0], `<div class="prompt-block"><div class="prompt-bar"><span>READY TO USE · ${esc(match[1])}</span><button type="button" class="copy-button" aria-label="Copy ${esc(match[1])}">Copy prompt</button></div><pre tabindex="0"><code>${esc(prompt.trim())}</code></pre><a class="download-link" href="prompts/${esc(match[1])}" download>Download .md ↗</a></div>`);
  }
  body = body.replace(/\{\{cite:(\d+)\}\}/g, (_, number) => {
    const source = sources.find(s => s.id === number);
    if (!source) throw new Error(`Unknown citation ${number}`);
    return `<a class="citation" href="#source-${number}" title="${esc(source.title)}" aria-label="Source ${number}: ${esc(source.title)}">[${number}]</a>`;
  });
  body = body.replaceAll('<div class="table-wrap">', '<div class="table-wrap" tabindex="0" role="region" aria-label="Comparison table; scroll horizontally on small screens">');
  const coverage = chapterEvidence.records.map(record => {
    const sections = record.sections.map(n => {
      if (!sectionTitles[n]) throw new Error(`Invalid section ${n} in ${id}`);
      return `<a href="#${n === 0 ? id : `${id}-part-${n}`}">${esc(sectionTitles[n])}</a>`;
    }).join(' · ');
    return `<li><span class="evidence-basis">${esc(record.basis)}</span><h4>${esc(record.label)}</h4><p class="evidence-covers"><strong>Covers:</strong> ${sections}</p><p>${esc(record.note)}</p><p class="evidence-links">${record.sources.length ? sourceLinks(record.sources) : 'Original design: no external source establishes these targets. Evaluate them in the proposed game.'}</p></li>`;
  }).join('');
  body += `\n<details class="chapter-evidence" id="evidence-${id}"><summary>Source check · what supports this chapter?</summary><p>Checked 14 September 2026. Direct links below support the stated scope; original proposals are distinguished from documented or measured findings.</p><ul class="evidence-records">${coverage}</ul><a class="evidence-method" href="#review-notes">Read the review method and corrections ↗</a></details>`;
  chapters.push({ id, title, body });
}
const sourceNote = value => esc(value).replace(/\[(\d{2})\]/g, (_, id) => {
  if (!sources.some(s => s.id === id)) throw new Error(`Unknown source cross-reference ${id}`);
  return `<a href="#source-${id}">[${id}]</a>`;
});
const refs = sources.map(s => `<li id="source-${s.id}"><span class="source-number">${s.id}</span><div class="source-body"><span class="source-type">${esc(s.type)}</span><h3><a href="${esc(s.url)}">${esc(s.title)} ↗</a></h3><div class="source-meta"><span class="source-badge${s.freshness === 'Historical exception' ? ' historical' : ''}">${esc(s.freshness)}</span><span>${esc(s.date)}</span></div><h4 class="source-summary-label">${s.verification.status === 'Transcript unavailable' ? 'Reading status' : 'Main items'}</h4><ul class="source-summary">${s.summary.map(item => `<li>${esc(item)}</li>`).join('')}</ul><p class="source-application"><strong>For this book:</strong> ${sourceNote(s.application)}</p><p class="source-limit"><strong>Limits / Astra relevance:</strong> ${sourceNote(s.limits)}</p><div class="source-verification"><p><strong>${esc(s.verification.status)} · ${esc(s.verification.checked)}</strong></p><p><strong>Passage locator:</strong> <a href="${esc(s.verification.url || s.url)}">${esc(s.verification.locator)} ↗</a></p>${s.verification.note ? `<p>${esc(s.verification.note)}</p>` : ''}${s.related ? `<p><strong>Companion references:</strong><br>${s.related.map(r => `<a href="${esc(r.url)}">${esc(r.title)} ↗</a>`).join('<br>')}</p>` : ''}</div>${s.video ? `<p class="source-extra"><a href="${esc(s.video)}">Original / companion YouTube video ↗</a> · ${esc(s.videoNote || 'Selected transcript passage checked through a mirror.')}</p>` : ''}</div></li>`).join('');
const nav = chapters.map((c, i) => `<a href="#${c.id}"><span>${String(i + 1).padStart(2, '0')}</span>${c.title}</a>`).join('');
let template = await read('site/template.html');
template = template.replaceAll('{{chapterCount}}', String(chapters.length)).replace('{{nav}}', nav).replace('{{chapters}}', chapters.map((c, i) => `<section class="chapter" aria-labelledby="${c.id}"><div class="chapter-kicker">CHAPTER ${String(i + 1).padStart(2, '0')}</div>${c.body}</section>`).join('\n')).replace('{{sources}}', refs);
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), template);
await cp(path.join(root, 'site/styles.css'), path.join(root, 'dist/styles.css'));
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
console.log(`Built ${chapters.length} chapters and ${sources.length} sources into dist/`);
