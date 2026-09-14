// Use the official Mermaid CLI for document assets, not browser UI automation.
import {readFile,mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const cli=process.env.MERMAID_CLI ?? path.join(root,'.qa/mermaid/node_modules/@mermaid-js/mermaid-cli/src/cli.js');
const catalog=JSON.parse(await readFile(path.join(root,'diagrams/catalog.json'),'utf8'));
for(const lang of ['en','vi','ko']){
  const dir=path.join(root,'illustrations/diagrams',lang);await mkdir(dir,{recursive:true});
  for(const diagram of catalog){
    const source=path.join(root,lang==='en'?'diagrams':`locales/${lang}/diagrams`,diagram.id+'.mmd');
    const result=spawnSync(process.execPath,[cli,'-i',source,'-o',path.join(dir,diagram.id+'.png'),'-c',path.join(root,'scripts/mermaid-pdf.json'),'-s','3','-b','#ffffff','-q'],{cwd:root,encoding:'utf8',windowsHide:true});
    if(result.status!==0)throw new Error(result.stderr||result.stdout||result.error);
  }
  console.log(`Rendered ${lang}: ${catalog.length} PDF diagrams`);
}
