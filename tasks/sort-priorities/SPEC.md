# Refactor task priority sorting to preserve its input

Refactor export function sortPriorities(values) in sort_priorities.mjs, Node 22
standard library only. The supplied messy implementation sorts ordinary numeric
arrays correctly, but mutates them and does not satisfy stricter validation.
Keep its ascending numeric behavior while meeting the complete contract below.
Only edit sort_priorities.mjs and optional IMPLEMENTATION.md.

Require a dense normal Array with prototype exactly Array.prototype; reject
subclasses, altered prototypes, nonarrays and holes with exact TypeError. Every
index must be an own property holding a primitive number (boxed numbers and
subclasses and all other types raise exact TypeError). Validate all types and
density before numeric bounds; [NaN,'x'] raises TypeError. Then require all
numbers to be safe integers, otherwise exact RangeError. Accept negatives and
-0; preserve negative zero and every duplicate. Messages are unconstrained.

Return a fresh normal Array sorted numerically ascending. Preserve relative
order of equal values, including -0/+0. Do not change any input values or named
properties. Ignore extra named properties and never call shadowed input methods
or the input iterator. Frozen arrays are supported. Independent calls return
independent mutable arrays, even when input is empty or already sorted.
Examples: [10,2,-1] -> [-1,2,10]; [2,1,2] -> [1,2,2]; [] -> [];
[-0,0,-1] -> [-1,-0,0]; [NaN,'x'] -> TypeError; [0.5] -> RangeError.
Every example, nonmutation and frozen inputs are checked. No tokenization,
coercion, dependencies, file/network access or README-dependent functional checks.
This standalone public exercise needs source/scope review with offline checks.
