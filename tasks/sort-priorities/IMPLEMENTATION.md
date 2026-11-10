# Task Priority Sorting Refactor

## Approach & Implementation

The `sortPriorities` function implements task priority sorting in ascending numeric order while adhering strictly to contract specifications and validation constraints:

1. **Strict Prototype & Array Validation**:
   - Rejects non-arrays, subclasses (e.g., `class Sub extends Array {}`), altered prototypes, and primitives by verifying `Array.isArray(values)` and `Object.getPrototypeOf(values) === Array.prototype`.
   - Rejects missing inputs, null, and objects with exact `TypeError`.

2. **Density and Type Validation (Pass 1)**:
   - Verifies that every index `0` to `len - 1` is an own property (`Object.hasOwn(values, i)`), rejecting sparse arrays and holes with exact `TypeError`.
   - Verifies that every value is a primitive number (`typeof values[i] === 'number'`), rejecting boxed numbers (`new Number(1)`), booleans, BigInts, strings, and objects with `TypeError`.
   - Density and type validation runs prior to numeric bounds checking, guaranteeing inputs like `[NaN, 'x']` throw `TypeError`.

3. **Numeric Bounds Validation (Pass 2)**:
   - Validates that every number is a safe integer via `Number.isSafeInteger(values[i])`.
   - Rejects non-integers, floats, `NaN`, and `+/-Infinity` with exact `RangeError`.
   - Preserves negative numbers and `-0`.

4. **Input Preservation & Shadow-Resistant Isolation**:
   - Does not invoke any methods on `values` (e.g. `slice`, `map`, `sort`, `constructor`) or the input iterator (`values[Symbol.iterator]`), preventing breakage if properties are shadowed or deleted.
   - Ignores extra named properties without modifying them.
   - Fully supports frozen inputs (`Object.freeze(...)`).
   - Copies elements by direct index assignment into a fresh `Array(len)`.

5. **Ascending Sort & Stability**:
   - Uses three-way comparator `(a, b) => (a < b ? -1 : a > b ? 1 : 0)`.
   - Because ECMAScript guarantees stable array sorting, returning `0` for equal numbers preserves the relative order of duplicate priorities and `-0` vs `+0`.
