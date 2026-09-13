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
assert.equal(sources.length, 38, 'The 38 reviewed sources must be present');
assert.equal((html.match(/class="source-summary"/g) || []).length, sources.length, 'Every source needs a rendered summary');
for (const source of sources) {
  assert(source.summary?.length >= 3, `Missing main items for source ${source.id}`);
  for (const field of ['date', 'freshness', 'application', 'limits']) assert(source[field]?.trim(), `Missing ${field} for source ${source.id}`);
  for (const item of source.summary) assert(html.includes(item.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')), `Unrendered summary item for source ${source.id}`);
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
console.log(`Passed: unique anchors, all local links/assets, 15 chapters, 8 prompt downloads, 9 described diagram sources, 38 source summaries with dates and limits (${manuscript.split(' ').length} words including templates and sources). Browser rendering is checked separately.`);
