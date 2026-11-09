import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {truncateText:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));

class StringSubclass extends String {}
class NumberSubclass extends Number {}
for(const value of [new String('x'),new StringSubclass('x'),undefined,1n,Symbol('x')]) {
 cases.push({input:[value,1,'…'],error:'TypeError'},{input:['abc',1,value],error:'TypeError'});
}
for(const value of [new Number(1),new NumberSubclass(1),undefined,1n,Symbol('x')]) cases.push({input:['abc',value,'…'],error:'TypeError'});
for(const value of [NaN,Infinity,-Infinity]) {
 cases.push({input:['abc',value,'…'],error:'RangeError'},{input:['abc',value,null],error:'TypeError'});
}
cases.push({input:['abc',-0,'…'],expected:''});

for(const [i,row] of cases.entries()) {
 if(row.error) assert.throws(()=>helper(...row.input),{name:row.error},String(i));
 else {const result=helper(...row.input);assert.deepEqual(result,row.expected,String(i));assert.equal(typeof result,"string");assert.deepEqual(helper(...row.input),result,'repeat');}
}
console.log(`PASS unicode-truncate: ${cases.length} exact cases and repeat probes`);
