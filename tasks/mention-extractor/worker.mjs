import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {extractMentions:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
cases.push({input:new String('x'),error:'TypeError'});
for(const [i,row] of cases.entries()) {
 if(row.error) assert.throws(()=>helper(row.input),{name:row.error},String(i));
 else {const result=helper(row.input);assert.deepEqual(result,row.expected,String(i));const again=helper(row.input);assert.deepEqual(again,result,'repeat');
 assert(Array.isArray(result));assert.equal(Object.getPrototypeOf(result),Array.prototype);assert.notEqual(result,again,"call alias");assert(result.every(x=>typeof x==="string"));
 }
}
console.log(`PASS mention-extractor: ${cases.length} exact cases and repeat probes`);
