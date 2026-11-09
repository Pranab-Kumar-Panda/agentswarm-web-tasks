import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {canonicalizeQuery:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
cases.push({input:new String('x'),error:'TypeError'});
for(const [i,row] of cases.entries()) {
 if(row.error) assert.throws(()=>helper(row.input),{name:row.error},String(i));
 else {const result=helper(row.input);assert.deepEqual(result,row.expected,String(i));const again=helper(row.input);assert.deepEqual(again,result,'repeat');
 assert.equal(typeof result,"string");assert.equal(helper(result),result,"idempotence");
 }
}
console.log(`PASS query-canonicalizer: ${cases.length} exact cases and repeat probes`);
