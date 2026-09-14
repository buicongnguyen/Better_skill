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
    assert((await stat(path.join(root, href))).isFile(), `Missing local asset ${href}`);
  }
}
const promptFiles = (await readdir(path.join(root, 'prompts'))).filter(f => f.endsWith('.md') && f !== 'README.md');
assert.equal(promptFiles.length, 8, 'The eight promised prompt downloads must exist');
assert.equal((html.match(/class="chapter"/g) || []).length, 15, 'The book must have 15 chapters');
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
console.log(`Passed: unique anchors, local links/assets, 15 chapters, ${coveredSections} introductions/subsections with evidence coverage, 8 prompts, 9 diagram sources, 48 source records with verification metadata (${manuscript.split(' ').length} words including templates and sources). Browser rendering is checked separately.`);
