# Format bytes as lowercase colon-separated hexadecimal in Go

Implement FormatBytes(values []byte) string in hex_groups.go, package hexgroups,
Go 1.23 standard library only. Only edit hex_groups.go and optional
IMPLEMENTATION.md; do not change go.mod, checker, tests or spec. No dependencies,
files, network, clock or production integration. []byte is the static input
type; Go assignability rules apply, with no dynamic coercion or subclass API.
Return a string containing two lowercase ASCII hex digits for each byte,
in input order, separated by exactly one colon. Include leading zeroes, and
no prefix, spaces or leading/trailing separator. nil and empty slices return
"". Do not mutate the input; return deterministic independent strings. Each
byte is formatted individually: there is no text tokenization or Unicode step.

Examples: nil -> ""; [] -> ""; [0] -> "00"; [15,16,255] -> "0f:10:ff";
[1,2,3] -> "01:02:03"; [255,0,128] -> "ff:00:80". All are checked.
All 256 byte values are covered. The Go checker copies only the candidate file
into a temporary module with trusted tests. Preload the digest-pinned Go image;
acceptance uses --network none, GOPROXY=off and GOSUMDB=off. No README-dependent
checks. Public fixtures require source/scope review; compile errors fail.
