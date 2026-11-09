# Extract pagination relations from a small HTTP Link grammar

Implement named export `parseLinkHeader(text)` in `link_header.mjs`. This offline
helper interprets authored or captured pagination metadata for task clients.
Use Node 22 standard library only: no packages, network, files or clock. Only
edit the implementation and optional task-local `IMPLEMENTATION.md`. This is a
standalone subset parser, not a complete RFC implementation or a production claim.

Non-string input throws TypeError. Split the string at commas outside quoted
parameter values. Within quotes only backslash-quote and backslash-backslash
escapes are valid; a backslash escapes the next character when locating comma
boundaries. If any quote is left open, return an empty array for the WHOLE input.
For each segment trim only ASCII space and tab; ignore segments that fail the
following complete grammar. A segment is `<URI>` followed by zero or more
parameters. URI is nonempty, contains no Unicode whitespace, commas or angle
brackets, and is returned unchanged (relative URLs and Unicode are allowed).

Each parameter has optional ASCII spaces/tabs, semicolon, optional spaces/tabs,
name, optional spaces/tabs, equals, optional spaces/tabs, value. Name starts
with an ASCII letter then contains only ASCII letters, digits, underscore or
hyphen. An unquoted value is one or more ASCII letters, digits, underscore or
hyphen. A quoted value permits any characters except unescaped quote, backslash,
CR and LF; its only escapes are backslash-quote and backslash-backslash. Empty
quoted values are allowed. No trailing whitespace after a value is allowed
except that stripped from the segment or preceding the next semicolon.

Use the first parameter whose name equals `rel`, ignoring ASCII letter case.
Later rel parameters are ignored. Unescape its quoted value, then split it on
runs of ASCII space/tab, discard empty tokens and remove duplicate tokens,
keeping first occurrence order. Relation values are case-sensitive and otherwise
unrestricted when quoted. Ignore segments without nonempty relation tokens.
Return an array of fresh ordinary objects with exactly `{url, rels}`, in segment
order; rels is a fresh array. Preserve duplicate links as separate entries.
An invalid segment does not discard valid siblings; an unclosed quote does.
For example `<p2>; rel="next prev next"` yields
`[{url:'p2', rels:['next','prev']}]`. No URL resolution is performed.

Run `node tasks/link-header/check.mjs --solution "$PWD/tasks/link-header/link_header.mjs"`.
Acceptance has at least 60 synthetic cases, Unicode, quoting, malformed siblings,
repeat calls and fresh results. Public fixtures can be overfit. Checks are not a
security sandbox; source/scope review accompanies acceptance.
