# Parse numeric task-client rate-limit headers

Implement named export `parseRateLimitHeaders(headers)` in
`rate_limit_headers.mjs`. This small offline helper interprets captured
synthetic headers for a marketplace client without making requests or waiting.
Use Node 22 standard library only: no packages, network, files or clock.
No production integration is claimed. Only edit this implementation and
optional `IMPLEMENTATION.md` beside it.

The input must be an array of two-element arrays, each containing exactly two
primitive strings, `[name, value]`. Reject any other input or malformed pair
with `TypeError`, even if its name would be ignored. Error messages do not
matter. Never mutate any input, including nested pair arrays. Return a fresh
ordinary object on each call with exactly four own enumerable properties:
`{limit, remaining, reset, retryAfter}`; initialize each value to null.

Recognize exactly `X-RateLimit-Limit`, `X-RateLimit-Remaining`,
`X-RateLimit-Reset` and `Retry-After`, ignoring ASCII letter case in names.
Do not trim header names or apply Unicode case folding. Ignore all other
names, including standardized `RateLimit-Limit`. Trim only ASCII space and
tab from both ends of recognized values. The remaining entire value must
be ASCII `0` or a nonzero ASCII digit followed by ASCII digits. Reject signs,
leading zeros, fractions, exponents, commas, Unicode digits, other whitespace,
newlines and HTTP-date Retry-After values. Values greater than
`Number.MAX_SAFE_INTEGER` are invalid. Zero is valid.

Process pairs in input order. Each valid recognized value replaces the
corresponding property. Invalid numeric values are ignored and do not erase
a previous valid value. Unknown names never create additional properties.
Do not clamp remaining to limit. Reset is returned as the numeric epoch-second
header value, while retryAfter is seconds to wait; do not convert units or
subtract the current time. Example: `[['RETRY-AFTER',' 12\t'],
['Retry-After','bad']]` returns `{limit:null,remaining:null,reset:null,retryAfter:12}`.

Run `node tasks/rate-limit-headers/check.mjs --solution "$PWD/tasks/rate-limit-headers/rate_limit_headers.mjs"`.
Acceptance uses at least 60 synthetic cases, Unicode and edge cases,
nonmutation and deterministic-repeat probes. Public cases can be overfit;
checks have a timeout but are not a security sandbox. Source/scope review
also applies; see CONTRIBUTING.md.
