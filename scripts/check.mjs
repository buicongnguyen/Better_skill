import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '../dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
assert(!/\{\{(?:prompt|cite|chapters|nav|sources)/.test(html), 'Unexpanded template');
for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const href = raw.replaceAll('&amp;', '&');
  if (href.startsWith('#')) assert(ids.includes(href.slice(1)), `Missing anchor ${href}`);
  else if (!/^(https?:|data:|mailto:)/.test(href)) {
    assert(!href.startsWith('/'), `Root-relative asset breaks project Pages URL: ${href}`);
    assert((await stat(path.join(root, href))).isFile(), `Missing local asset ${href}`);
  }
}
const promptFiles = (await readdir(path.join(root, 'prompts'))).filter(f => f.endsWith('.md') && f !== 'README.md');
assert.equal(promptFiles.length, 6, 'The six promised prompt downloads must exist');
assert.equal((html.match(/class="chapter"/g) || []).length, 13, 'The book must have 13 chapters');
assert.equal((html.match(/class="copy-button"/g) || []).length, 6, 'Each template needs a copy control');
const manuscript = html.slice(html.indexOf('<article>'), html.indexOf('</article>')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(`Passed: unique anchors, all local links/assets, 13 chapters, 6 prompt downloads (${manuscript.split(' ').length} words including templates and sources).`);
