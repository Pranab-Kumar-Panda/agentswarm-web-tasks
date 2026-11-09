# Match a precise subset of semantic-version ranges

Implement named export `matchesRange(version, range)` in `semver_range.mjs`.
Use Node 22 standard library only; no packages, files, network or clock. Only
edit this implementation and optional task-local `IMPLEMENTATION.md`. This
standalone subset helper claims no production integration or full npm-semver
compatibility. Both arguments must be primitive strings. Reject every other
type, including boxed String and subclasses of String, with TypeError before
any syntax validation. Error messages are unconstrained.

A version is exactly three ASCII decimal components `major.minor.patch`, each
0..999 inclusive, with no leading zero unless it is exactly `0`. No whitespace,
`v` prefix, signs, wildcards, prerelease, build metadata, newline or Unicode
digits are allowed. Compare component triples numerically, lexicographically.

A range is either a single `*`, or one or more comparator tokens joined by one
or more ASCII spaces or horizontal tabs. Strip only ASCII spaces/tabs at the
range's ends. Empty ranges are invalid. Every comparator is an optional operator
(`=`, `>`, `>=`, `<`, `<=`, `^`, `~`) immediately followed by a version. A bare
version means equality. Operators MUST touch their version; comparator tokens
MUST NOT touch each other. `>=1.2.3 <2.0.0` is valid; `>= 1.2.3` and
`>=1.2.3<2.0.0` are invalid. `*` cannot be combined with any other token.
CR/LF, NBSP, commas, `||`, hyphen ranges and partial versions are invalid.

All comparators are ANDed. Ordinary inequalities include equality only with
`=`. Tilde allows versions at least its operand but below `(major,minor+1,0)`.
Caret allows versions at least its operand but below `(major+1,0,0)` if major
is nonzero, else `(0,minor+1,0)` if minor is nonzero, else `(0,0,patch+1)`.
Calculated exclusive upper components may exceed 999; they are comparison
bounds, not parsed input versions. For example `1.9.0` matches `^1.2.3`,
`2.0.0` does not; `0.2.9` matches `^0.2.3`, while `0.3.0` does not;
`0.0.4` does not match `^0.0.3`. Contradictory valid ranges return false.
Validate the entire version AND every range token before matching; a malformed
later token raises RangeError even if an earlier comparator already fails.
Every syntax error raises RangeError. Return a primitive boolean, deterministic
across calls. The checker uses immutable local fixtures, not root documents.

Run `node tasks/semver-range/check.mjs --solution "$PWD/tasks/semver-range/semver_range.mjs"`.
At least 60 cases cover syntax, Unicode, boundaries and type rules. Source/scope
review accompanies the check.
