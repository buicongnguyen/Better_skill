import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '../dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
assert(!/\{\{(?:prompt|cite|diagram|chapters|nav|sources)/.test(html), 'Unexpanded template');
for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const href = raw.replaceAll('&amp;', '&');
  if (href.startsWith('#')) assert(ids.includes(href.slice(1)), `Missing anchor ${href}`);
  else if (!/^(https?:|data:|mailto:)/.test(href)) {
    assert(!href.startsWith('/'), `Root-relative asset breaks project Pages URL: ${href}`);
    assert((await stat(path.join(root, href.split(/[?#]/)[0]))).isFile(), `Missing local asset ${href}`);
  }
}
const promptFiles = (await readdir(path.join(root, 'prompts'))).filter(f => f.endsWith('.md') && f !== 'README.md');
assert.equal(promptFiles.length, 8, 'The eight promised prompt downloads must exist');
assert.equal((html.match(/class="chapter"/g) || []).length, 16, 'The book must have a quick summary and 15 full chapters');
assert.equal((html.match(/class="copy-button"/g) || []).length, 8, 'Each template needs a copy control');
const sources = JSON.parse(await readFile(path.resolve(root, '../book/sources.json'), 'utf8'));
assert.equal(sources.length, 48, 'The 48 source records must be present');
assert.equal(new Set(sources.map(s => s.id)).size, sources.length, 'Duplicate source IDs');
assert.equal((html.match(/class="source-summary"/g) || []).length, sources.length, 'Every source needs a rendered summary');
for (const source of sources) {
  assert(source.summary?.length >= 3, `Missing main items for source ${source.id}`);
  for (const field of ['date', 'freshness', 'application', 'limits']) assert(source[field]?.trim(), `Missing ${field} for source ${source.id}`);
  for (const field of ['checked', 'status', 'locator']) assert(source.verification?.[field]?.trim(), `Missing verification ${field} for source ${source.id}`);
  assert(['Content checked', 'Transcript unavailable'].includes(source.verification.status), `Unknown verification status for source ${source.id}`);
  for (const url of [source.url, source.verification.url, ...(source.related || []).map(r => r.url)].filter(Boolean)) assert.equal(new URL(url).protocol, 'https:', `Non-HTTPS source ${source.id}`);
  for (const item of source.summary) assert(html.includes(item.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')), `Unrendered summary item for source ${source.id}`);
}
const evidence = JSON.parse(await readFile(path.resolve(root, '../book/evidence.json'), 'utf8'));
const chapterFiles = (await readdir(path.resolve(root, '../book'))).filter(f => f.endsWith('.html'));
assert.equal(evidence.length, chapterFiles.length, 'Every chapter needs evidence coverage');
assert.equal(new Set(evidence.map(e => e.chapter)).size, evidence.length, 'Duplicate evidence chapter');
assert.equal((html.match(/class="chapter-evidence"/g) || []).length, chapterFiles.length, 'Every chapter needs a rendered evidence panel');
let coveredSections = 0;
for (const file of chapterFiles) {
  const chapter = await readFile(path.resolve(root, '../book', file), 'utf8');
  const id = chapter.match(/<h2 id="([^"]+)"/)[1];
  const sectionCount = (chapter.match(/<h3>/g) || []).length;
  const entry = evidence.find(e => e.chapter === id);
  assert(entry?.records.length, `Missing evidence for ${id}`);
  const expected = Array.from({length:sectionCount + 1}, (_, i) => i);
  const actual = entry.records.flatMap(r => r.sections).sort((a,b) => a-b);
  assert.deepEqual(actual, expected, `Every introduction/subsection needs exactly one coverage record: ${id}`);
  coveredSections += actual.length;
  for (const record of entry.records) {
    assert(record.label?.trim() && record.note?.trim(), `Incomplete evidence record: ${id}`);
    assert(['Documented behavior', 'Research finding', 'Synthesis', 'Original proposal', 'Retrieval limitation'].includes(record.basis), `Unknown evidence basis: ${id}`);
    assert(record.basis === 'Original proposal' || record.sources.length, `Missing evidence links: ${id}`);
    for (const source of record.sources) assert(sources.some(s => s.id === source), `Missing evidence source ${source}`);
  }
}
const diagrams = JSON.parse(await readFile(path.join(root, 'diagrams/catalog.json'), 'utf8'));
assert.equal(diagrams.length, 9, 'The nine promised diagrams must exist');
assert.equal((html.match(/class="diagram"/g) || []).length, diagrams.length);
for (const diagram of diagrams) {
  const source = await readFile(path.join(root, `diagrams/${diagram.id}.mmd`), 'utf8');
  assert(source.startsWith('flowchart '), `Unexpected diagram type for ${diagram.id}`);
  assert(source.includes('accTitle:') && source.includes('accDescr:'), `Missing accessible diagram text for ${diagram.id}`);
  assert(html.includes(`id="diagram-${diagram.id}"`), `Missing diagram ${diagram.id}`);
  assert(diagram.description?.trim() && html.includes(diagram.description), `Missing description for ${diagram.id}`);
  assert(html.includes(source.trim().replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')), `Diagram source mismatch for ${diagram.id}`);
}
const manuscript = html.slice(html.indexOf('<article>'), html.indexOf('</article>')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
// Each translation must preserve the book's traceability and downloadable artifacts.
const escapeHtml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const tokens = value => [...value.matchAll(/\{\{(?:cite|prompt|diagram):[^}]+\}\}/g)].map(m=>m[0]).sort();
const topology = value => value.replace(/acc(?:Title|Descr):[^\r\n]*/g,'').replace(/"[^"]+"/g,'"label"').replace(/\|[^|]+\|/g,'|label|').replace(/\s+/g,' ').trim();
const ui = JSON.parse(await readFile(path.resolve(root,'../locales/ui.json'),'utf8'));
for (const lang of ['en','vi','ko']) {
  const edition = await readFile(path.join(root,ui[lang].file),'utf8');
  const editionIds = [...edition.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert(edition.includes(`<html lang="${lang}">`), `Wrong document language: ${lang}`);
  assert.deepEqual(editionIds.slice().sort(),ids.slice().sort(),`Anchor parity: ${lang}`);
  assert(!/\{\{[a-zA-Z]|\bundefined\b/.test(edition),`Unresolved content: ${lang}`);
  assert.equal((edition.match(/class="chapter-evidence"/g)||[]).length,chapterFiles.length);
  assert.equal((edition.match(/class="source-summary"/g)||[]).length,48);
  assert.equal((edition.match(/class="copy-button"/g)||[]).length,8);
  assert.equal((edition.match(/class="diagram"/g)||[]).length,9);
  for (const [,raw] of edition.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href=raw.replaceAll('&amp;','&');
    if(href.startsWith('#'))assert(editionIds.includes(href.slice(1)),`Broken ${lang} anchor: ${href}`);
    else if(!/^(https?:|data:|mailto:)/.test(href)) {
      assert(!href.startsWith('/'),`Root-relative ${lang} URL: ${href}`);
      assert((await stat(path.join(root,href.split(/[?#]/)[0]))).isFile(),`Missing ${lang} asset: ${href}`);
    }
  }
  for (const target of ['en','vi','ko']) assert(edition.includes(`href="${ui[target].file}?lang=${target}"`),`Explicit language link missing: ${lang}/${target}`);
  const summary=edition.match(/<section class="chapter" aria-labelledby="summary">([\s\S]*?)<\/section>/)?.[1];
  assert(summary, `Missing quick summary: ${lang}`);
  assert(edition.indexOf('aria-labelledby="summary"')<edition.indexOf('aria-labelledby="better-loop"'),`Summary must precede the full book: ${lang}`);
  for(const file of chapterFiles.filter(file=>!file.startsWith('00-'))) {
    const original=await readFile(path.resolve(root,'../book',file),'utf8');
    const id=original.match(/<h2 id="([^"]+)"/)[1];
    assert(summary.includes(`href="#${id}"`),`Summary omits full reading link: ${lang}/${id}`);
    assert(edition.includes(`aria-labelledby="${id}"><div class="chapter-kicker">${ui[lang].chapter} ${file.slice(0,2)}</div>`),`Existing chapter number changed: ${lang}/${id}`);
  }
  if(lang==='en')continue;
  const localeRoot=path.resolve(root,`../locales/${lang}`);
  for(const file of chapterFiles) {
    const enChapter=await readFile(path.resolve(root,'../book',file),'utf8');
    const localChapter=await readFile(path.join(localeRoot,'book',file),'utf8');
    assert.equal((localChapter.match(/<h3>/g)||[]).length,(enChapter.match(/<h3>/g)||[]).length,`Section parity: ${lang}/${file}`);
    assert.deepEqual(tokens(localChapter),tokens(enChapter),`Citation/download parity: ${lang}/${file}`);
  }
  const notes=JSON.parse(await readFile(path.join(localeRoot,'sources.json'),'utf8'));
  assert.deepEqual(notes.map(n=>n.id).sort(),sources.map(n=>n.id).sort(),`Source parity: ${lang}`);
  for(const note of notes) {
    const original=sources.find(s=>s.id===note.id);
    for(const field of ['type','date','application','limits'])assert(note[field]?.trim()&&note[field]!==original[field],`Missing translated ${field}: ${lang}/${note.id}`);
    assert.equal(note.summary.length,original.summary.length);
    for(const item of note.summary)assert(edition.includes(escapeHtml(item)),`Missing translated summary: ${lang}/${note.id}`);
    if(original.verification.note)assert(note.verification?.note?.trim(),`Missing translated verification: ${lang}/${note.id}`);
    if(original.video)assert(note.videoNote?.trim(),`Missing translated video note: ${lang}/${note.id}`);
  }
  const localEvidence=JSON.parse(await readFile(path.join(localeRoot,'evidence.json'),'utf8'));
  assert.equal(localEvidence.length,evidence.length);
  for(const entry of evidence) {
    const local=localEvidence.find(e=>e.chapter===entry.chapter);
    assert.equal(local?.records.length,entry.records.length,`Evidence parity: ${lang}/${entry.chapter}`);
    for(const record of local.records)assert(record.label?.trim()&&record.note?.trim()&&edition.includes(escapeHtml(record.note)),`Missing translated evidence: ${lang}/${entry.chapter}`);
  }
  for(const file of promptFiles) {
    const text=await readFile(path.join(localeRoot,'prompts',file),'utf8');
    assert(edition.includes(escapeHtml(text.trim())),`Prompt content mismatch: ${lang}/${file}`);
    assert.equal(await readFile(path.join(root,'prompts',lang,file),'utf8'),text,`Prompt download mismatch: ${lang}/${file}`);
  }
  for(const diagram of diagrams) {
    const text=await readFile(path.join(localeRoot,'diagrams',`${diagram.id}.mmd`),'utf8');
    const original=await readFile(path.join(root,'diagrams',`${diagram.id}.mmd`),'utf8');
    assert.equal(topology(text),topology(original),`Changed diagram logic: ${lang}/${diagram.id}`);
    assert(edition.includes(escapeHtml(text.trim())),`Diagram content mismatch: ${lang}/${diagram.id}`);
    assert.equal(await readFile(path.join(root,'diagrams',lang,`${diagram.id}.mmd`),'utf8'),text);
  }
}
console.log('Passed: English, Vietnamese and Korean edition/anchor parity, translated summaries and evidence, 24 prompt copies, 27 diagrams with identical graph logic, and all local links/assets.');
console.log(`Passed: unique anchors, local links/assets, quick summary linking all 15 full chapters with stable numbers, ${coveredSections} introductions/subsections with evidence coverage, 8 prompts, 9 diagram sources, 48 source records with verification metadata (${manuscript.split(' ').length} words including templates and sources). Browser rendering is checked separately.`);
