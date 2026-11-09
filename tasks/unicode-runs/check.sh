set -eu
if [ "$#" != 2 ] || [ "$1" != --solution ]; then echo 'expected --solution FILE' >&2; exit 2; fi
here=$(cd -- "$(dirname -- "$0")" && pwd)
build=$(mktemp -d)
trap 'rm -rf -- "$build"' EXIT
mkdir -p "$build/src" "$build/tests"
cp -- "$2" "$build/src/lib.rs"
cp -- "$here/fixtures/runs.rs" "$build/tests/runs.rs"
printf '[package]\nname = "unicode_runs"\nversion = "0.1.0"\nedition = "2021"\n' > "$build/Cargo.toml"
cd -- "$build"
cargo test --offline --quiet
printf 'PASS unicode-runs: trusted cargo integration cases\n'
