import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const task=new URL('.',import.meta.url).pathname.split('/').filter(Boolean).at(-1);
const module=await import(pathToFileURL(process.argv[2]));
const helper=module[{'ceil-seconds':'ceilSeconds','sort-priorities':'sortPriorities','remove-trailing-slash':'removeTrailingSlash'}[task]];
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
function check(input,row) {
 const before=structuredClone(input);
 if(row.error) assert.throws(()=>helper(input),error=>error.constructor==={TypeError,RangeError}[row.error]);
 else {
  const first=helper(input),second=helper(input);
  assert.deepEqual(first,row.expected);assert.deepEqual(second,row.expected);
  if(task==='sort-priorities') {
   assert.equal(Object.getPrototypeOf(first),Array.prototype);assert.notEqual(first,input);assert.notEqual(first,second);
   first.push(99);assert.deepEqual(helper(input),row.expected);
  } else assert.equal(typeof first,task==='ceil-seconds'?'number':'string');
 }
 assert.deepEqual(input,before);
}
for(const row of cases)check(row.input,row);
class N extends Number {} class S extends String {} class A extends Array {}
const wrong=[null,undefined,true,false,{},[],1n,Symbol('x')];
if(task==='ceil-seconds') {
 for(const v of [...wrong,'1',new Number(1),new N(1)])assert.throws(()=>helper(v),e=>e.constructor===TypeError);
 for(const v of [NaN,Infinity,-Infinity])assert.throws(()=>helper(v),e=>e.constructor===RangeError);
 assert.equal(Object.is(helper(-0),0),true);
} else if(task==='remove-trailing-slash') {
 for(const v of [...wrong,1,NaN,new String('a/'),new S('a/')])assert.throws(()=>helper(v),e=>e.constructor===TypeError);
 assert.equal(helper('\ud800/'),'\ud800');assert.equal(helper('\udfff'),'\udfff');
} else {
 for(const v of [null,undefined,{},'x',new A(1),Object.setPrototypeOf([1],null),Array(2)])assert.throws(()=>helper(v),e=>e.constructor===TypeError);
 for(const v of [new Number(1),new N(1),new String('1'),new S('1'),undefined,1n,Symbol('x'),false,null])assert.throws(()=>helper([v]),e=>e.constructor===TypeError);
 for(const v of [NaN,Infinity,-Infinity])assert.throws(()=>helper([v]),e=>e.constructor===RangeError);
 assert.throws(()=>helper([NaN,'x']),e=>e.constructor===TypeError);
 assert.deepEqual(helper([-0,0,-1]),[-1,-0,0]);assert.deepEqual(helper([0,-0,-1]),[-1,0,-0]);
 for(const name of ['sort','slice','map','some','constructor']){const a=[10,2,-1];a[name]=null;assert.deepEqual(helper(a),[-1,2,10]);assert.deepEqual([...a],[10,2,-1]);assert.equal(a[name],null);}
 const a=[10,2,-1];a[Symbol.iterator]=null;assert.deepEqual(helper(a),[-1,2,10]);assert.equal(a[Symbol.iterator],null);
 assert.deepEqual(helper(Object.freeze([10,2,-1])),[-1,2,10]);
}
console.log(`PASS ${task}: ${cases.length} fixtures plus exact type, subclass and contract probes`);
