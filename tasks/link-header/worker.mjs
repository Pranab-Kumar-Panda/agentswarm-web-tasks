import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {parseLinkHeader:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));

function freeze(value) {if(value && typeof value==='object') {for(const child of Object.values(value)) freeze(child);Object.freeze(value);}return value;}
function fresh(value,seen=new Set()) {if(value && typeof value==='object') {assert(!seen.has(value),'aliased output');seen.add(value);assert.equal(Object.getPrototypeOf(value),Array.isArray(value)?Array.prototype:Object.prototype);for(const child of Object.values(value)) fresh(child,seen);}return seen;}
for(const [i,row] of cases.entries()) {
 const input=freeze(structuredClone(row.input)),before=structuredClone(input);
 if(row.error) assert.throws(()=>helper(input),{name:row.error},String(i));
 else {const result=helper(input);assert.deepEqual(result,row.expected,String(i));const again=helper(input);assert.deepEqual(again,result,'repeat');const seen=fresh(result);for(const obj of fresh(again)) assert(!seen.has(obj),'call alias');for(const obj of fresh(before)) assert(!seen.has(obj));}
 assert.deepEqual(input,before,'mutation '+i);
}
console.log(`PASS link-header: ${cases.length} exact cases, repeat and nonmutation probes`);
