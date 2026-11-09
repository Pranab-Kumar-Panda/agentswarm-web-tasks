# Encode adjacent Unicode scalar runs in Rust

Implement `pub fn encode_runs(input: &str) -> Vec<(char, usize)>` in src/lib.rs.
Use Rust 1.89 standard library only. The Cargo crate has no dependencies; do
not add any. Only edit src/lib.rs and optional IMPLEMENTATION.md in this task.
No file, network or clock access and no production integration is claimed.

Return one (character, count) pair per maximal run of equal adjacent Unicode
scalar values in input, preserving order. Count is the positive number of
scalar values in that run, not UTF-8 bytes or grapheme clusters. Empty input
returns an empty vector. Repeated characters separated by another scalar form
separate runs. Whitespace, newline, NUL, combining marks, variation selectors
and zero-width joiners are ordinary characters. Do not trim, normalize, fold
case, sort, merge nonadjacent runs or interpret punctuation. UTF-8 validity is
guaranteed by &str; malformed bytes cannot be passed to this signature. Rust
has no subclass/coercion behavior here: output is exactly Vec<(char, usize)>
and input exactly &str. Counts cannot exceed the input length.

Examples: "" -> []; "aaabbcaa" -> [('a',3),('b',2),('c',1),('a',2)];
"🚀🚀a" -> [('🚀',2),('a',1)]; "éé" -> [('é',2)];
"e\u{301}e\u{301}" -> [('e',1),('\u{301}',1),('e',1),('\u{301}',1)].
"  \n" -> [(' ',2),('\n',1)]. A run of one scalar has count one.

Each call returns its own owned vector, with no global state or modification
of input. Results must be deterministic. The checker copies only src/lib.rs
into a temporary crate with its trusted integration tests, runs cargo test
--offline, and never uses candidate Cargo settings. The repository keeps tests
outside the default tests/ directory to discourage accidental modification;
they are public, not secret. Source/scope review accompanies checks. Preload
the digest-pinned Rust Docker image in the issue. Acceptance runs with
--network none, no crates.io dependencies, and a writable temporary directory
for compiler output. No README or changing main files participate in checks.
