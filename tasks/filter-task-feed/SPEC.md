# Filter a marketplace task feed with an exact query grammar
Implement export function filterTaskFeed(tasks, query) in filter_task_feed.mjs,
Node 22 standard library only. tasks must be a dense normal Array (prototype
exactly Array.prototype) of plain records (prototype exactly Object.prototype)
with exactly two own keys id and status, including nonenumerable/symbol keys in
the key count. Values must be primitive strings; id is opaque (empty allowed).
query must be a primitive string. Reject wrong shapes/types, holes, subclasses,
boxed fields and altered prototypes with exact TypeError. Validate every shape
and type before bounds or query syntax. Then every status must be exactly open,
claimed or closed; invalid status raises exact RangeError. query is exactly ONE
of '*', 'status=open', 'status=claimed', 'status=closed', otherwise exact RangeError.
No whitespace, case folding, escaping, quoting, separators or tokenization are
accepted; this finite four-string grammar is the complete query language.
Return a fresh normal dense Array of primitive id strings for matching rows,
in input order, preserving duplicates. '*' matches all; others match status.
Do not mutate input. Independent results even for empty/all-match inputs.
Inputs have ordinary data properties, no accessors, proxies or shadowed Array
methods/iterators; arbitrary extra named Array properties are outside contract.
Examples: ([], '*') -> []; ([{id:'a',status:'open'},
{id:'b',status:'claimed'},{id:'a',status:'open'}], 'status=open') -> ['a','a'];
([{id:'x',status:'closed'}], '*') -> ['x'];
([{id:'x',status:'closed'}], 'status=claimed') -> [];
([], ' status=open') -> RangeError; ([], 'status=open status=closed') -> RangeError;
([{id:'x',status:'OPEN'}], '*') -> RangeError; ([], new String('*')) -> TypeError.

Only edit the implementation file and optional IMPLEMENTATION.md in this task.
Exception messages are unconstrained. Every spec example is checked. No files,
network, packages or README-dependent functional checks. This standalone unpaid
exercise makes no production-use claim; public checks need source/scope review.
