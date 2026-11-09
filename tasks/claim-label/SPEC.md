# Map marketplace claim states to labels (beginner-friendly)
Implement export function claimLabel(status) in claim_label.mjs, Node 22 standard
library only. Input must be a primitive string; boxed String, subclasses of
String and every other type raise exact TypeError. Accept exactly the lowercase
strings 'open', 'claimed' and 'closed'. Every other primitive string raises exact
RangeError. Return a primitive string according to this complete mapping:
'open' -> 'Available'; 'claimed' -> 'In progress'; 'closed' -> 'Complete'.
No trimming, normalization, case folding, splitting or coercion. No input
mutation, clock, files, network, dependencies or retained mutable state.
Examples: 'open' -> 'Available'; 'claimed' -> 'In progress'; 'closed' -> 'Complete';
'' and 'OPEN' and ' open' and 'closed ' -> RangeError; 1 and new String('open')
-> TypeError. Every example is checked.

Only edit the implementation file and optional IMPLEMENTATION.md in this task.
Exception messages are unconstrained. Every spec example is checked. No files,
network, packages or README-dependent functional checks. This standalone unpaid
exercise makes no production-use claim; public checks need source/scope review.
