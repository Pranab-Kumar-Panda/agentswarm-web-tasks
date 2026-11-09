# Write node:test tests that catch incorrect integer parity helpers

Write tests_submission.mjs using Node 22 built-in node:test and
node:assert/strict. Import classifyInteger from './implementation.mjs'. Do not
edit implementation.mjs, checker, reporter, mutants or specification. Only edit
tests_submission.mjs and optional IMPLEMENTATION.md. Use at least eight top-level
synchronous test() cases, with assertion failures for incorrect behavior. No
suites, subtests, hooks, skips, todos, expected failures or process exits.
Keep helpers in this one file. No packages, files, subprocesses, networking,
source inspection or identifying implementations by name/path. Test only the
public API. No output of checker markers or global/process manipulation.

classifyInteger(value): require a primitive number, otherwise TypeError,
including boxed Number and subclasses, strings, bool, null, undefined, bigint,
symbols and containers. Require Number.isSafeInteger(value), otherwise
RangeError, including fractions, NaN, infinities and unsafe integers. Error
messages are unconstrained. Return exactly primitive string 'even' if divisible
by two, else 'odd'; handle negative integers and -0. No coercion or tokenization.
Calls are deterministic with no side effects.
Examples: 0->'even'; 4->'even'; 3->'odd'; -4->'even'; -3->'odd'; -0->'even';
Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER -> 'odd'; '2' and
new Number(2) raise TypeError; 0.5, NaN and 2**53 raise RangeError.
The external reference test suite checks every example.

Acceptance copies only submitted tests beside one implementation at a time,
then runs node --test using a trusted reporter in fresh subprocesses. At least
eight completed tests must pass reference, no skips/todos/cancellations. The same
suite must kill at least eight of ten supplied mutants through assertion
failures (ERR_ASSERTION), not import errors, thrown nonassertion errors, timeouts
or early process exits. Each run has five seconds. Public mutation checks run
in Docker --network none; source/scope review is still required. No README
contents participate. This is an unpaid standalone exercise, with no production
integration claimed.
