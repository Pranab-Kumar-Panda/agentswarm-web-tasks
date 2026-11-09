# Extract unique handles while excluding paired backtick spans

Implement named export `extractMentions(text)` in `mention_extractor.mjs`, a
standalone offline helper for authored discussion text. Use Node 22 standard
library only; no packages, files, network or clock. Only edit this implementation
and optional task-local `IMPLEMENTATION.md`. This precise subset is not a full
Markdown parser and claims no production integration. A primitive string is
required; all other types, including boxed String, throw TypeError. Error
messages are unconstrained.

Scan the original string from left to right. At each maximal run of one or more
ASCII backticks, look for the FIRST later maximal backtick run of exactly the
same length. If found, ignore everything from the opener through that closer,
including all mentions and other-length backtick runs inside, then resume after
the closer. Newlines are ordinary content and may occur inside a span. If no
same-length closer exists, treat only the opener run as ordinary text and
resume immediately after it; later runs may still open spans of their own.
Backslashes never escape anything; fenced and inline code use the same rule.
There is no nesting or other Markdown syntax, and no replacement whitespace is
inserted. A backtick run is maximal even if a shorter prefix would match.

Outside these excluded spans, an ASCII `@` can start a mention only at string
start or if its immediately preceding ORIGINAL character is not an ASCII
letter, digit, underscore or `@`. Read the maximal following run of ASCII
letters, digits and underscores. Accept it only if it starts with an ASCII
letter and has 1..30 characters inclusive. Reject an overlong run entirely;
do not accept its first 30 characters. A digit/underscore as first character
invalidates the entire run. Hyphens, punctuation and every non-ASCII character
terminate a handle and can serve as boundaries. Thus `x@alice` and `@@alice`
yield none; `é@Bob` yields Bob; `@café` yields caf; `@ab-cd` yields ab.

Return a fresh array of primitive strings WITHOUT the `@`. Deduplicate by ASCII
case-insensitive handle equality, preserving the first accepted spelling and
first-appearance order. Mentions inside excluded spans do not count as earlier
occurrences. Do not sort, normalize Unicode or change returned spelling.
For example `@Ada ` followed by backtick, `@Hidden`, backtick, ` @ada @BOB`
returns `['Ada', 'BOB']`. Unmatched backticks do not by themselves hide mentions.
Repeated calls must return equal but independent arrays. The input is immutable.

Run `node tasks/mention-extractor/check.mjs --solution "$PWD/tasks/mention-extractor/mention_extractor.mjs"`.
Acceptance uses at least 60 exact synthetic cases including Unicode boundaries,
run lengths, unmatched spans, deduplication and types. Public fixtures can be
overfit; source/scope review accompanies checks. Checks are not a security sandbox.
