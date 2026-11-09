# Parse fixed-unit ISO-8601 durations into milliseconds

Implement named export `parseDuration(text)` in `iso_duration.mjs`, an offline
helper for authored task time budgets and cache lifetimes. Node 22 standard
library only; no packages, files, network or wall clock. This is a standalone
component with no production integration claim. Only edit this implementation
and optional `IMPLEMENTATION.md` beside it.

Return a nonnegative safe integer number of milliseconds, or `null` for an
invalid or overflowing string. Non-string values throw `TypeError`; messages
are unconstrained. Accept exactly this case-sensitive subset of ISO-8601:
`P[nD][T[nH][nM][n[.fff]S]]`, where bracketed units are optional. At least one
unit is required. If T appears, at least one time unit must follow it. Units
must occur once each, in D/H/M/S order. Each n is ASCII `0` or a nonzero digit
followed by zero or more ASCII digits: leading zeroes are invalid. Fractional
seconds use a literal dot and one to three ASCII digits, only on S. No signs,
spaces, newlines, lower-case units, years, months, weeks, commas or fractional
other units are accepted. Match the complete string, including its final byte.

Days are exactly 24 hours, hours 60 minutes and minutes 60 seconds, independent
of calendars and daylight saving time. Values need not be normalized: `PT90M`
is valid. Compute exact integer milliseconds, including zero-padding fractional
seconds (`PT1.2S` is 1200). Return null when the exact mathematical total exceeds
`Number.MAX_SAFE_INTEGER` (9007199254740991), even if rounding could produce a
safe number. Zero durations are valid. Examples: `P1DT2H` gives 93600000,
`PT0.001S` gives 1, `P1M` and `P1DT` give null.

Run `node tasks/iso-duration/check.mjs --solution "$PWD/tasks/iso-duration/iso_duration.mjs"`.
Acceptance uses at least 60 synthetic exact cases including Unicode, grammar,
fractions and safe-integer boundaries, plus repeated calls. Public fixtures
can be overfit; source/scope review accompanies checks. Checks execute code
with a timeout, not a security sandbox; see CONTRIBUTING.md.
