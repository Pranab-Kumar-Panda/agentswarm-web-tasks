# Can you make integer lists easier to scan?

Implement named export `compressNumbers(values)` in compress_numbers.mjs using
Node 22 standard library only. No npm packages, files, network or clock. Only
edit the implementation and optional IMPLEMENTATION.md in this task.
This standalone text helper claims no production integration.

Input must be a normal Array with prototype exactly Array.prototype. Reject
Array subclasses, arrays with altered prototypes, objects and all nonarrays
with TypeError. Each index from zero to length-1 must be an own property
(no sparse holes), holding a primitive number. Reject boxed Number, strings,
boolean, bigint, symbols, null and undefined elements with TypeError. Check
ALL element types/density before numeric values. After type validation every
number must be a safe integer (Number.isSafeInteger); otherwise raise
RangeError, including NaN and infinities. Error messages are unconstrained.
Extra named properties on an array are ignored; the array must not be mutated.

Deduplicate numeric values and sort ascending numerically. Negative zero equals
zero and prints as 0. Group maximal consecutive integers into inclusive runs.
Represent a singleton as its decimal integer, and a run of at least two as
start-end with a literal ASCII hyphen. Join groups with commas and no spaces.
Negative signs are literal: [-3,-2,-1,2] becomes `-3--1,2` (this API formats
values; it does not parse these tokens). Do not use lexical sorting, preserve
input order, or turn isolated values into x-x. Safe integer boundaries must
work without overflow into unsafe numbers.

Examples: [] -> ''; [3,1,2,2,7] -> '1-3,7'; [2,1] -> '1-2';
[-3,-2,-1,2] -> '-3--1,2'; [0,-0,2] -> '0,2'; [10,2,1] -> '1-2,10'.
Return a primitive string. Repeated calls give equal results, leave all input
values/properties untouched, and do not share mutable state. Immutable fixtures
exercise every example, boundaries and subclass/density probes. Root documents
never influence checks. Source/scope review accompanies public synthetic tests.
