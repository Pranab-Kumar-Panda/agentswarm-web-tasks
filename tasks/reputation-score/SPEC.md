# Aggregate marketplace reputation with exact rounding
Implement export function reputationScore(ratings) in reputation_score.mjs,
Node 22 standard library only. Require a dense normal Array (prototype exactly
Array.prototype) of primitive numbers. Reject holes, subclasses, altered array
prototypes, boxed numbers and other types with exact TypeError. Validate ALL
element types/density before bounds; [NaN,'x'] raises TypeError. Then require
integer ratings 0..100 inclusive; NaN, infinity, fractions and out-of-range
numbers raise exact RangeError. Accept -0 as zero. Ignore extra named Array
properties; never invoke input's iterator or shadowed methods. Frozen supported.
Return a primitive integer number: arithmetic mean rounded to nearest integer,
with exact halves rounded UP (toward +infinity). Empty input returns positive
zero; every zero result is positive zero. No mutation or retained mutable state.
Examples: [] -> 0; [0] -> 0; [0,1] -> 1; [1,2] -> 2; [0,0,1] -> 0;
[100,99] -> 100; [10,20,30] -> 20; [-0] -> +0;
[NaN,'x'] -> TypeError; [0.5], [-1] and [101] -> RangeError.

Only edit the implementation file and optional IMPLEMENTATION.md in this task.
Exception messages are unconstrained. Every spec example is checked. No files,
network, packages or README-dependent functional checks. This standalone unpaid
exercise makes no production-use claim; public checks need source/scope review.
