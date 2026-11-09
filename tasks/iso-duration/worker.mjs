import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {parseDuration:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
function freeze(value) {if(value && typeof value==='object') {for(const child of Object.values(value)) freeze(child);Object.freeze(value);} return value;}
for(const [index,row] of cases.entries()) {
 const input=freeze(structuredClone(row.input));const before=structuredClone(input);
 if(row.error) {assert.throws(()=>helper(input),{name:row.error},String(index));}
 else {
  const result=helper(input); assert.deepEqual(result,row.expected,String(index));
  assert.deepEqual(helper(input),result,'repeat '+index);

 }
 assert.deepEqual(input,before,'mutation '+index);
}
console.log(`PASS iso-duration: ${cases.length} exact cases and repeated-call/nonmutation probes`);
