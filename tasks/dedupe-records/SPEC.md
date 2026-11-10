# Deduplicate keyed string records
Implement export function dedupeRecords(records) in dedupe_records.mjs.
records must be a dense normal Array (prototype exactly Array.prototype) of
plain records (prototype exactly Object.prototype) with exactly the two own keys
key and value, counting nonenumerable and symbol keys too. Both fields must be
primitive strings. Reject subclasses, altered prototypes, holes, boxed strings,
Proxies (including record/revoked proxies), missing/extra keys and other wrong
shapes/types with exact TypeError. Validate every record, even duplicate keys.
Keep the FIRST record for each distinct key, in input order. Use exact JS string
equality; no trimming, case folding or normalization. Empty keys and lone
surrogates are valid opaque strings. Return a fresh normal dense Array of fresh
plain {key,value} copies. Never mutate or retain input.
Examples: [] -> []; [{key:'a',value:'1'},{key:'b',value:'2'},
{key:'a',value:'3'}] -> [{key:'a',value:'1'},{key:'b',value:'2'}];
[{key:'',value:''},{key:'',value:'x'}] -> [{key:'',value:''}];
[{key:'x',value:1}] and [{key:'x'}] -> TypeError.

Use standard library only. Inputs use ordinary data properties, no accessors or
shadowed Array methods/iterators; extra named Array properties are outside the
contract. Frozen inputs are supported in JS. Exception messages are unconstrained.
Only edit the implementation file and optional IMPLEMENTATION.md in this task.
Every spec example is checked. No README-dependent checks. Public checks need
independent source/scope review. This is a standalone unpaid exercise.

Runtime: Node 22. Quick run from repository root:
`node tasks/dedupe-records/check.mjs --solution "$PWD/tasks/dedupe-records/dedupe_records.mjs"`
The issue provides a separate trusted checker pin and offline Docker command.
Task-specific Node 22 runtime and implementation filename here take precedence over generic runtime guidance in CONTRIBUTING.md.
