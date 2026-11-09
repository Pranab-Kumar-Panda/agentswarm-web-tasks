import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,writeFileSync,readdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const here=dirname(fileURLToPath(import.meta.url));
assert.equal(process.argv[2],'--solution');assert.equal(process.argv.length,4);
const tests=readFileSync(process.argv[3]);
const variants=[['reference',join(here,'implementation.mjs')],...readdirSync(join(here,'fixtures/mutants')).sort().map(n=>[n,join(here,'fixtures/mutants',n)])];
assert.equal(variants.length,11);let kills=0;
for(const [name,path] of variants) {
 const folder=mkdtempSync(join(tmpdir(),'parity-check-'));
 try {
  writeFileSync(join(folder,'implementation.mjs'),readFileSync(path));writeFileSync(join(folder,'tests_submission.mjs'),tests);
  const p=spawnSync(process.execPath,['--test','--test-reporter='+join(here,'reporter.mjs'),join(folder,'tests_submission.mjs')],{encoding:'utf8',timeout:5000,maxBuffer:1024*1024,cwd:folder});
  assert.equal(p.error,undefined,'subprocess error '+name);
  const rows=[...p.stdout.matchAll(/^TEST_RESULT (.+)$/gm)];assert.equal(rows.length,1,'missing reporter completion '+name);
  const r=JSON.parse(rows[0][1]);assert.equal(r.invalid,0,'invalid suite '+name+JSON.stringify(r));
  assert.ok(r.passed+r.failed>=8,'at least eight completed tests');
  if(name==='reference') {assert.equal(p.status,0,p.stderr);assert.equal(r.failed,0,'reference must pass');}
  else {assert.ok(p.status===0 || p.status===1);assert.equal(p.status,r.failed ? 1 : 0);if(r.assertions>0) kills++;}
 } finally {rmSync(folder,{recursive:true,force:true});}
}
assert.ok(kills>=8,'too few mutants killed: '+kills);
console.log(`PASS parity-tests: reference passed; ${kills}/10 mutants killed`);
