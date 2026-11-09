# Remove exactly one trailing slash

Implement export function removeTrailingSlash(value) in remove_trailing_slash.mjs,
Node 22 standard library only. Only edit that file and optional IMPLEMENTATION.md.
Input must be a primitive string. Reject boxed String and subclasses, numbers,
bool, null, undefined, bigint, symbols and containers with exact TypeError;
messages are unconstrained. Return a primitive string, removing exactly one final
ASCII slash '/' if present, otherwise returning the original content. Empty
string remains empty; '/' becomes empty and '///' becomes '//'. No trimming,
normalization, decoding, splitting, URL parsing or other path interpretation.
Preserve all other UTF-16 code units, including Unicode and lone surrogates.
Examples: '' -> ''; '/' -> ''; '///' -> '//'; 'task/' -> 'task';
'a/b' -> 'a/b'; 'a/ ' -> 'a/ '; 'é/' -> 'é'; 1 -> TypeError.
Every example is checked. Deterministic, no side effects, files, network or npm.
No README-dependent checks or production-use claims; offline public fixtures
still need source/scope review. The private reference uses at most 20 lines.
