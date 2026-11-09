import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {compressNumbers:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
for (const [i,row] of cases.entries()) {
  const args=structuredClone(row.input),before=structuredClone(args);
  if (row.error) assert.throws(()=>helper(...args),{name:row.error},String(i));
  else { const first=helper(...args),second=helper(...args);assert.deepEqual(first,row.expected,String(i));assert.deepEqual(second,first);assert.equal(typeof first,"string"); }
  assert.deepEqual(args,before,'mutation');
}
class StringSubclass extends String {}
class ArraySubclass extends Array {}
class NumberSubclass extends Number {}

for (const value of [new ArraySubclass(1,2),Object.setPrototypeOf([1],null),undefined,1n,Symbol('x')]) assert.throws(()=>helper(value),TypeError);
for (const value of [new Number(1),new NumberSubclass(1),undefined,1n,Symbol('x')]) assert.throws(()=>helper([value]),TypeError);
assert.throws(()=>helper(Array(2)),TypeError);
assert.throws(()=>helper([NaN,'x']),TypeError);
for (const value of [NaN,Infinity,-Infinity]) assert.throws(()=>helper([value]),RangeError);
const own=[1,2];own.note='ignored';assert.equal(helper(own),'1-2');assert.equal(own.note,'ignored');
console.log(`PASS compress-numbers: ${cases.length} exact fixtures and type/repeat probes`);
