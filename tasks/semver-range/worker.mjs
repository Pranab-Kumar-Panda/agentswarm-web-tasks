import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {matchesRange:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));

class StringSubclass extends String {}
for(const value of [new String('1.2.3'),new StringSubclass('1.2.3'),undefined,1n,Symbol('x')]) {
 cases.push({input:[value,'*'],error:'TypeError'},{input:['1.2.3',value],error:'TypeError'});
}

for(const [i,row] of cases.entries()) {
 if(row.error) assert.throws(()=>helper(...row.input),{name:row.error},String(i));
 else {const result=helper(...row.input);assert.deepEqual(result,row.expected,String(i));assert.equal(typeof result,"boolean");assert.deepEqual(helper(...row.input),result,'repeat');}
}
console.log(`PASS semver-range: ${cases.length} exact cases and repeat probes`);
