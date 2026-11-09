import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {rotateLeft:helper}=await import(pathToFileURL(process.argv[2]));
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
for(const [i,row] of cases.entries()) {
 const args=structuredClone(row.input),before=structuredClone(args);
 if(row.error) assert.throws(()=>helper(...args),{name:row.error},String(i));
 else {const first=helper(...args),second=helper(...args);assert.deepEqual(first,row.expected,String(i));assert.deepEqual(second,first);assert.notEqual(first,second);assert.notEqual(first,args[0]);assert.equal(Object.getPrototypeOf(first),Array.prototype);}
 assert.deepEqual(args,before,'input mutation');
}
class A extends Array {} class S extends String {} class N extends Number {}
for(const v of [new A('a'),Object.setPrototypeOf(['a'],null),undefined,{},'a',null]) assert.throws(()=>helper(v,0),TypeError);
for(const v of [new String('a'),new S('a'),undefined,1n,Symbol('a'),false]) assert.throws(()=>helper([v],0),TypeError);
for(const n of [new Number(1),new N(1),undefined,1n,Symbol('a'),null]) assert.throws(()=>helper(['a'],n),TypeError);
for(const n of [NaN,Infinity,-Infinity]) assert.throws(()=>helper(['a'],n),RangeError);
assert.throws(()=>helper(Array(2),0),TypeError);assert.throws(()=>helper([1],NaN),TypeError);
assert.deepEqual(helper(['a','b'],-0),['a','b']);
for(const name of ['slice','concat','splice','map','constructor']) {const a=['a','b'];a[name]=null;assert.deepEqual(helper(a,1),['b','a']);assert.equal(a[name],null);assert.deepEqual([...a],['a','b']);}
const frozen=Object.freeze(['a','b']);assert.deepEqual(helper(frozen,1),['b','a']);
const noIterator=['a','b'];noIterator[Symbol.iterator]=null;assert.deepEqual(helper(noIterator,1),['b','a']);assert.equal(noIterator[Symbol.iterator],null);
const a=helper(['a','b'],1);a.push('x');assert.deepEqual(helper(['a','b'],1),['b','a']);
console.log(`PASS rotate-left: ${cases.length} fixtures plus subclass, density, numeric, shadowed-method and independence probes`);
