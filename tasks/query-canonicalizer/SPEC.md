# Canonicalize an offline query string with exact escaping

Implement named export `canonicalizeQuery(text)` in `query_canonicalizer.mjs`.
Use Node 22 standard library only, with no packages, files, network or clock.
Only edit this implementation and optional task-local `IMPLEMENTATION.md`.
This is an offline string helper, not a URL resolver, signature scheme, or
production integration claim. Input must be a primitive string; any other type,
including boxed String, throws TypeError. Error messages are unconstrained.

Remove exactly one leading ASCII `?` if present. Split on literal `&` characters
and discard empty segments. In each remaining segment split at the FIRST literal
`=`; its left side is the name and its right side the value. Without an equals
sign the entire segment is the name and the value is empty. Empty names and
empty values are valid. Semicolons and hash characters have no special role.

In each name and value replace literal `+` with ASCII space, then decode
percent escapes as UTF-8 using ECMAScript decodeURIComponent semantics. Decode
exactly once, so `%2520` becomes literal `%20`. Invalid percent sequences or
invalid UTF-8 throw URIError for the whole input. Literal Unicode is accepted;
unpaired UTF-16 surrogates anywhere in a retained name/value also throw URIError.
Percent-encoded plus becomes a literal plus, not space. Do not normalize Unicode,
trim whitespace, fold case, resolve paths or interpret names such as `__proto__`.

Sort all pairs first by DECODED name, then by DECODED value, using ascending
ECMAScript string comparison (UTF-16 code units, not locale or code-point order).
Keep every duplicate pair, including repeated empty-name pairs. Encode both
fields as UTF-8 percent escapes, leaving ONLY ASCII letters, digits, hyphen,
period, underscore and tilde unescaped. Hex digits must be uppercase; space is
`%20`, plus is `%2B`, and `!'()*` must be escaped too. Join each encoded pair as
`name=value`, then join pairs with `&`. Always emit equals, never a leading `?`.
Empty input or only separators yields the empty string. Never drop duplicates
or empty fields from a retained segment.

For example `?b=hello+world&a=%2f&a` becomes
`a=&a=%2F&b=hello%20world`. `=x&&flag` becomes `=x&flag=`.
`??a=1` keeps the second question mark as part of its name and emits `%3Fa=1`.
Calls must be deterministic and return a primitive string. Canonicalizing an
already canonical result must preserve it.

Run `node tasks/query-canonicalizer/check.mjs --solution "$PWD/tasks/query-canonicalizer/query_canonicalizer.mjs"`.
Acceptance has at least 60 synthetic cases including Unicode sorting, strict
encoding, malformed escapes and type errors. Public fixtures can be overfit;
source/scope review accompanies checks. Checks are not a security sandbox.
