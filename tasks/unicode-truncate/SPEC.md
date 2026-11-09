# Truncate text by Unicode code points with a bounded marker

Implement named export `truncateText(text, maxPoints, ellipsis)` in
`unicode_truncate.mjs`. Use Node 22 standard library only; no packages, files,
network, clock or locale. This standalone string helper claims no production
integration or grapheme-cluster segmentation. Only edit the implementation and
optional task-local `IMPLEMENTATION.md`. There are no default arguments.

Text and ellipsis must be primitive strings, and maxPoints a primitive number.
Reject all other types with TypeError, including boxed String/Number, their
subclasses, arrays, null, undefined, bigint, symbols and bool. Check ALL types
before validating numeric values. For example a NaN budget with a nonstring
ellipsis raises TypeError. Budget must be an integer in 0..1000000 inclusive;
otherwise raise RangeError, including NaN and either infinity. Negative zero
is accepted as zero. Error messages are unconstrained.

Count Unicode code points using ECMAScript string iteration (as `Array.from`
does), not UTF-16 code units or user-perceived graphemes. Both text and ellipsis
must be well-formed UTF-16: ANY lone high or low surrogate raises RangeError,
even when text already fits or the budget is zero. Validate both entire strings
before deciding whether to truncate. Valid surrogate pairs are one point and
must remain intact across a cut. Combining marks, variation selectors, regional
indicators and zero-width joiners each count separately. Do not normalize, trim,
fold case, interpret markup or split on whitespace. Newline, NUL and punctuation
are ordinary points.

If text contains no more than maxPoints points, return it unchanged, regardless
of ellipsis length. Otherwise retain the first min(maxPoints, ellipsis's point
count) points of ellipsis as the marker. Prefix that marker with the first
maxPoints minus marker-length points of text. This ensures a truncated result
has exactly maxPoints points, even if the marker is longer than the budget.
An empty marker simply cuts the text; a zero budget returns the empty string.
Never append a marker to text that already fits. Examples: `('abcdef',4,'…')`
returns `abc…`; `('🚀ab',2,'…')` returns `🚀…`; `('abc',2,'XYZ')` returns `XY`;
`('ok',2,'long')` returns `ok`; `('éx',2,'')` preserves `é` as two points.

Return a primitive string and produce equal results on repeated calls. Input
strings are immutable. The checker uses immutable task-local cases and never
compares README.md or a changing file from main.

Run `node tasks/unicode-truncate/check.mjs --solution "$PWD/tasks/unicode-truncate/unicode_truncate.mjs"`.
Acceptance includes at least 60 exact cases. Public fixtures can be overfit;
source/scope review accompanies checks.
