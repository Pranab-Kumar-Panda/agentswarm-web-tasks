import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const task=new URL('.',import.meta.url).pathname.split('/').filter(Boolean).at(-1);
const module=await import(pathToFileURL(process.argv[2]));
const helper=module[{"dedupe-rows": "dedupeRows", "dedupe-records": "dedupeRecords", "wrap-words": "wrapWords", "truncate-words": "truncateWords", "histogram-js": "histogram"}[task]];
const cases=JSON.parse(readFileSync(new URL('./fixtures/cases.json',import.meta.url)));
function check(args,row) {
 const before=structuredClone(args);
 if(row.error) assert.throws(()=>helper(...args),e=>e.constructor==={TypeError,RangeError}[row.error]);
 else {
  const a=helper(...args),b=helper(...args);
  assert.deepEqual(a,row.expected);assert.deepEqual(b,row.expected);
  if(task==='truncate-words') assert.equal(typeof a,'string');
  else {
   assert.equal(Object.getPrototypeOf(a),Array.prototype);assert.notEqual(a,b);assert.notEqual(a,args[0]);
   if(task==='dedupe-rows' || task==='dedupe-records') {
    for(let i=0;i<a.length;i++) {assert.notEqual(a[i],b[i]);assert.equal(args[0].includes(a[i]),false);assert.equal(Object.getPrototypeOf(a[i]),task==='dedupe-rows'?Array.prototype:Object.prototype);}
    if(a.length) {if(task==='dedupe-rows') a[0].push('changed');else a[0].value='changed';}
   }
   a.push('changed');assert.deepEqual(helper(...args),row.expected);
  }
 }
 assert.deepEqual(args,before);
}
for(const row of cases) check(row.args,row);
const rejects=(args,ErrorType=TypeError)=>assert.throws(()=>helper(...args),e=>e.constructor===ErrorType);
class A extends Array {} class S extends String {} class N extends Number {}
const proxy=x=>new Proxy(x,{}),revoked=()=>{const p=Proxy.revocable([],{});p.revoke();return p.proxy;};
const badArrays=[undefined,null,true,1,'',{},new A(),Object.setPrototypeOf([],null),Array(1),proxy([]),revoked()];
const badStrings=[undefined,null,true,1,1n,Symbol('x'),[],{},new String('a'),new S('a'),proxy(new String('a'))];
const badNumbers=[undefined,null,true,'1',1n,Symbol('x'),[],{},new Number(1),new N(1)];
if(task==='wrap-words' || task==='truncate-words') {
 for(const v of badStrings) rejects([v,1]);
 for(const v of badNumbers) rejects(['x',v]);
 for(const v of [NaN,Infinity,-Infinity,1.5,-1,Number.MAX_SAFE_INTEGER+1]) rejects(['x',v],RangeError);
 for(const s of ['\ud800','\udc00','a\ud800x','\ud800\ud800','\udc00\ud800','\udc00\udc00']) rejects([s,task==='wrap-words'?1:0],RangeError);
 rejects(['\ud800','1']);
 if(task==='wrap-words') {
  check(['a 😀 b',3],{expected:['a 😀','b']});check(['e\u0301 x',2],{expected:['e\u0301','x']});check(['   ',1],{expected:[]});
  check(['\ta b',2],{expected:['\ta','b']});check(['a\n b',2],{expected:['a\n','b']});
  check(['aa bb',5],{expected:['aa bb']});check(['a b c',3],{expected:['a b','c']});
  check(['x',Number.MAX_SAFE_INTEGER],{expected:['x']});
 } else {check(['   ',2],{expected:''});check(['a b c',2],{expected:'a b'});check(['x',Number.MAX_SAFE_INTEGER],{expected:'x'});}
} else if(task==='histogram-js') {
 for(const v of badArrays) {rejects([v,[0,1]]);rejects([[],v]);}
 for(const v of badNumbers) {rejects([[v],[0,1]]);rejects([[],[0,v]]);}
 for(const v of [NaN,Infinity,-Infinity,.5,Number.MAX_SAFE_INTEGER+1]) {rejects([[v],[0,1]],RangeError);rejects([[],[0,v]],RangeError);}
 rejects([[NaN,'x'],[0,1]]);rejects([['x'],[]]);
 check([[-0],[0,1]],{expected:[0+1]});check([[],[-1,0,1]],{expected:[0,0]});
 check([[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],[Number.MIN_SAFE_INTEGER,0,Number.MAX_SAFE_INTEGER]],{expected:[1,1]});
 assert.deepEqual(helper(Object.freeze([0,1]),Object.freeze([0,1])),[2]);
} else if(task==='dedupe-rows') {
 for(const v of badArrays) {rejects([v,0]);rejects([[v],0]);}
 for(const v of badStrings) rejects([[[v]],0]);
 for(const v of badNumbers) rejects([[],v]);
 for(const v of [NaN,Infinity,-Infinity,.5,-1,Number.MAX_SAFE_INTEGER+1]) rejects([[],v],RangeError);
 rejects([[['x',1]],-1]);check([[],Number.MAX_SAFE_INTEGER],{expected:[]});
 check([[['A'],['a'],['é'],['e\u0301'],['\ud800'],['\ud800']],0],{expected:[['A'],['a'],['é'],['e\u0301'],['\ud800']]});
 check([[['x','a'],['x','b','c'],['y']],0],{expected:[['x','a'],['y']]});
 assert.deepEqual(helper(Object.freeze([Object.freeze(['x'])]),0),[['x']]);
} else {
 for(const v of badArrays) rejects([v]);
 for(const row of [null,[],Object.assign(Object.create(null),{key:'x',value:'v'}),new(class R{constructor(){this.key='x';this.value='v'}})(),{key:'x',value:'v',extra:1},{key:'x',value:'v',[Symbol('x')]:1},proxy({key:'x',value:'v'}),revoked()]) rejects([[row]]);
 for(const v of badStrings) {rejects([[{key:v,value:'v'}]]);rejects([[{key:'x',value:v}]]);}
 rejects([[{key:'x',value:'ok'},{key:'x',value:1}]]);
 const keys=['A','a','é','e\u0301','\ud800','__proto__','constructor'];check([keys.map(key=>({key,value:'v'}))],{expected:keys.map(key=>({key,value:'v'}))});
 const row={key:'x'};Object.defineProperty(row,'value',{value:'v'});assert.deepEqual(helper([row]),[{key:'x',value:'v'}]);
 assert.deepEqual(helper(Object.freeze([Object.freeze({key:'x',value:'v'})])),[{key:'x',value:'v'}]);
}
console.log(`PASS ${task}: ${cases.length} fixtures plus exact types, proxies, subclasses, holes and boundary probes`);
