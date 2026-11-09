# Truncate a string by an exact word count
Implement export function truncateWords(text, limit) in truncate_words.mjs.
Require primitive string text and primitive number limit; reject every other
type, including boxed primitives/subclasses, with exact TypeError. Validate both
types first. Then limit must be a nonnegative safe integer, otherwise exact
RangeError. Next reject any lone high or low surrogate in text with exact
RangeError, INCLUDING when limit is zero. Valid surrogate pairs are accepted.
Tokenize ONLY on U+0020 ASCII space, discard empty tokens. Tabs, newlines,
nonbreaking spaces and all other characters are literal parts of words. Return
the first at most limit tokens joined by one ASCII space, as a primitive string.
No ellipsis, trimming inside tokens, normalization or case folding. Empty text,
only ASCII spaces or limit zero returns ''. Never retain mutable state.
Examples: ('',3) -> ''; ('  a  bb c ',2) -> 'a bb'; ('a b',0) -> '';
('a b',9) -> 'a b'; ('😀 a',1) -> '😀'; ('a\tb c',1) -> 'a\tb';
('a\nb c',1) -> 'a\nb'; ('a\u00a0b c',1) -> 'a\u00a0b';
('a',-1) -> RangeError; ('\ud800',0) -> RangeError;
(new String('a'),1) -> TypeError.

Use standard library only. Inputs use ordinary data properties, no accessors or
shadowed Array methods/iterators; extra named Array properties are outside the
contract. Frozen inputs are supported in JS. Exception messages are unconstrained.
Only edit the implementation file and optional IMPLEMENTATION.md in this task.
Every spec example is checked. No README-dependent checks. Public checks need
independent source/scope review. This is a standalone unpaid exercise.

Runtime: Node 22. Quick run from repository root:
`node tasks/truncate-words/check.mjs --solution "$PWD/tasks/truncate-words/truncate_words.mjs"`
The issue provides a separate trusted checker pin and offline Docker command.
