import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {parseBlocks:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
function assertIndependent(first, second) {
  if (first && typeof first === 'object') {
    assert.notEqual(first, second, 'fresh objects and arrays required');
    for (const key of Object.keys(first)) assertIndependent(first[key], second[key]);
  }
}
for (const [i,row] of cases.entries()) {
  const args=structuredClone(row.input),before=structuredClone(args);
  if (row.error) assert.throws(()=>helper(...args),{name:row.error},String(i));
  else { const first=helper(...args),second=helper(...args);assert.deepEqual(first,row.expected,String(i));assert.deepEqual(second,first);assert.notEqual(first,second);assert.notEqual(first.children,second.children);assertIndependent(first,second); }
  assert.deepEqual(args,before,'mutation');
}
class StringSubclass extends String {}
class ArraySubclass extends Array {}
class NumberSubclass extends Number {}

for (const value of [new String('x'),new StringSubclass('x'),undefined,1n,Symbol('x')]) assert.throws(()=>helper(value),TypeError);
console.log(`PASS markdown-blocks: ${cases.length} exact fixtures and type/repeat probes`);
