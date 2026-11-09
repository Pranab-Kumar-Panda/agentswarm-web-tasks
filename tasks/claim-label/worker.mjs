import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const task=new URL('.',import.meta.url).pathname.split('/').filter(Boolean).at(-1);
const module=await import(pathToFileURL(process.argv[2]));
const helper=module[{'filter-task-feed':'filterTaskFeed','reputation-score':'reputationScore','claim-label':'claimLabel'}[task]];
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
function check(args,row) {
 const before=structuredClone(args);
 if(row.error) assert.throws(()=>helper(...args),e=>e.constructor==={TypeError,RangeError}[row.error]);
 else {
  const first=helper(...args),second=helper(...args);
  assert.deepEqual(first,row.expected);assert.deepEqual(second,row.expected);
  if(task==='filter-task-feed') {
   assert.equal(Object.getPrototypeOf(first),Array.prototype);assert.notEqual(first,args[0]);assert.notEqual(first,second);
   first.push('changed');assert.deepEqual(helper(...args),row.expected);
  } else assert.equal(typeof first,task==='reputation-score'?'number':'string');
 }
 assert.deepEqual(args,before);
}
for(const row of cases)check(row.args,row);
class A extends Array {} class N extends Number {} class S extends String {}
const rejects=(args,ErrorType=TypeError)=>assert.throws(()=>helper(...args),e=>e.constructor===ErrorType);
if(task==='claim-label') {
 for(const v of [undefined,null,true,false,1,NaN,1n,Symbol('x'),[],{},new String('open'),new S('open')])rejects([v]);
 for(const v of ['closed\n','open\0','constructor','toString','__proto__','é','open claimed'])rejects([v],RangeError);
} else {
 for(const v of [undefined,null,true,1,'',{},new A(),Object.setPrototypeOf([],null),Array(1)])rejects(task==='filter-task-feed'?[v,'*']:[v]);
 if(task==='reputation-score') {
  for(const v of [undefined,null,true,'1',1n,Symbol('x'),[],{},new Number(1),new N(1)])rejects([[v]]);
  for(const v of [NaN,Infinity,-Infinity])rejects([[v]],RangeError);
  rejects([[NaN,'x']]);assert.equal(Object.is(helper([-0]),0),true);
  assert.equal(helper(Object.freeze([0,1])),1);
  for(const name of ['reduce','map','some','constructor']){const a=[1,2];a[name]=null;assert.equal(helper(a),2);assert.equal(a[name],null);}
  const a=[1,2];a[Symbol.iterator]=null;assert.equal(helper(a),2);assert.equal(a[Symbol.iterator],null);
 } else {
  for(const q of [undefined,null,1,true,1n,Symbol('x'),[],{},new String('*'),new S('*')])rejects([[],q]);
  for(const row of [null,[],Object.assign(Object.create(null),{id:'x',status:'open'}),new (class Row {constructor(){this.id='x';this.status='open'}})(),{id:new String('x'),status:'open'},{id:'x',status:new S('open')},{id:'x'},{id:'x',status:'open',extra:1},{id:'x',status:'open',[Symbol('x')]:1}])rejects([[row],'*']);
  rejects([[{id:'x',status:'bad'}, {id:1,status:'open'}],'bad']);
  assert.deepEqual(helper(Object.freeze([Object.freeze({id:'x',status:'open'})]),'*'),['x']);
  const row={id:'x'};Object.defineProperty(row,'status',{value:'open'});assert.deepEqual(helper([row],'*'),['x']);assert.equal(Object.getOwnPropertyDescriptor(row,'status').enumerable,false);
  check([[{id:'é',status:'open'},{id:'e\u0301',status:'closed'},{id:'',status:'claimed'}],'*'],{expected:['é','e\u0301','']});
 }
}
console.log(`PASS ${task}: ${cases.length} fixtures plus exact type, subclass and contract probes`);
