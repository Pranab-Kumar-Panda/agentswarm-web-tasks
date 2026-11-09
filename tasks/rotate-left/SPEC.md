# rotateLeft mutates its input and drops values after a full turn

Fix rotateLeft(values, amount) in rotate_left.mjs, Node 22 standard library only.
The supplied implementation has seeded bugs in array validation, modulo
handling and input mutation. Only edit rotate_left.mjs and optional
IMPLEMENTATION.md. No packages, files, network, clock or production integration.

values must be a dense normal Array whose prototype is exactly Array.prototype.
Reject subclasses, altered prototypes and nonarrays with TypeError. Each index
must be an own property holding a primitive string; holes, boxed String (also
subclasses) and other values raise TypeError. amount must be a primitive number,
otherwise TypeError (including boxed Number/subclasses). Check all input types
and density before numeric bounds, so ([1],-1) raises TypeError. Then require
amount to be a nonnegative safe integer; otherwise RangeError (including NaN,
infinities, fractions, negatives and unsafe integers). -0 is accepted as zero.
Error messages are unconstrained. Ignore extra named array properties; never
call user-shadowed array methods. Strings are opaque, never split or normalized.

Return a fresh normal Array of the input strings rotated left by amount modulo
length. For empty arrays return a fresh []. Preserve order and duplicates; no
input values/properties may change. Independent repeated results must not share
mutable arrays. Examples: (['a','b','c'],1)->['b','c','a'];
(['a','b','c'],4)->['b','c','a']; (['a','b'],2)->['a','b'];
([],5)->[]; (['x'],0)->['x']; ([1],-1) raises TypeError;
(['x'],-1) raises RangeError. All examples are checked, with exact types,
nonmutation and repeated-call probes. README is not a functional input.
Public Docker --network none checks require source/scope review.
