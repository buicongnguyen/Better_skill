import {createHash} from 'node:crypto';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const folders=['book','locales','prompts','diagrams','site','illustrations'];
async function files(dir){
 const found=[];
 for(const entry of await readdir(path.join(root,dir),{withFileTypes:true})){
  const file=dir+'/'+entry.name;
  if(entry.isDirectory())found.push(...await files(file));
  else if(!file.endsWith('.blend1'))found.push(file);
 }
 return found;
}
async function sourceHash(){
 const hash=createHash('sha256');
 const names=(await Promise.all(folders.map(files))).flat().concat(['scripts/build.mjs','scripts/build-pdf.py','scripts/mermaid-pdf.json','scripts/render-pdf-diagrams.mjs']).sort();
 for(const name of names){
  let bytes=await readFile(path.join(root,name));
  if(/\.(html|json|md|mmd|css|js|mjs|py|svg)$/.test(name))bytes=Buffer.from(bytes.toString('utf8').replaceAll('\r\n','\n'));
  hash.update(name+'\0');hash.update(bytes);hash.update('\0');
 }
 return hash.digest('hex');
}
const manifestPath=path.join(root,'output/pdf/manifest.json');
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
if(process.argv.includes('--stamp')){
 manifest.sourceHash=await sourceHash();
 await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
 console.log('Stamped PDF source fingerprint.');
}else{
 assert.equal(manifest.sourceHash,await sourceHash(),'PDFs are stale: rebuild them after editing book sources or figures.');
 assert.equal(manifest.outputs.length,3);
 for(const lang of ['en','vi','ko']){
  const file=`how-to-do-better-${lang}.pdf`;
  const entry=manifest.outputs.find(x=>x.file===file);assert(entry&&entry.pages>=35,`Missing complete ${lang} PDF`);
  for(const dir of ['output/pdf','dist/pdf']){
   const bytes=await readFile(path.join(root,dir,file));
   assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
   assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,`PDF checksum mismatch: ${dir}/${file}`);
  }
 }
 console.log('Passed: three complete PDFs, source freshness and publication checksums.');
}
