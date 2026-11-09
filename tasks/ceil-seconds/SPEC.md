# Round retry delays up to seconds in TypeScript

Implement export function ceilSeconds(milliseconds: number): number in
ceil_seconds.ts. Run TypeScript directly via Node 22 --experimental-strip-types;
standard library only, no npm/compiler dependencies or nonerasable TS features.
Only edit ceil_seconds.ts and optional IMPLEMENTATION.md.

Runtime input must be a primitive number, otherwise throw exact TypeError
(including boxed Number and subclasses, strings, bool, null, undefined, bigint,
symbols and containers). Then require a nonnegative safe integer, otherwise
exact RangeError (NaN, infinities, fractions, negatives and unsafe integers).
Messages are unconstrained. Accept -0 as zero. Return a primitive number: the
mathematical ceiling of milliseconds/1000; zero must be positive zero. Do not
coerce, parse, tokenize or access files/network; calls are deterministic.
Examples: 0 -> 0; -0 -> +0; 1 -> 1; 999 -> 1; 1000 -> 1; 1001 -> 2;
Number.MAX_SAFE_INTEGER -> 9007199254741; '1' and new Number(1) -> TypeError;
-1, 0.5, NaN and 2**53 -> RangeError. Every example is checked.
Public offline Docker checks require source/scope review. No README contents
participate and no production integration is claimed.
