/**
 * Sorts task priorities in ascending numeric order.
 *
 * Requirements:
 * - Input must be a dense normal Array whose prototype is strictly Array.prototype.
 * - Every index must be an own property holding a primitive number.
 * - Density and element types are validated before numeric bounds (e.g. [NaN, 'x'] throws TypeError).
 * - All numbers must be safe integers; -0 and negatives are supported.
 * - Stable ascending sort preserving relative order of equal elements (including -0 and +0).
 * - Input is never mutated; input methods and iterators are never invoked.
 * - Returns a fresh, independent normal mutable Array.
 *
 * @param {number[]} values - Dense normal array of safe integers.
 * @returns {number[]} A fresh normal array sorted in ascending order.
 * @throws {TypeError} If values is not a dense normal Array or contains non-primitive numbers or holes.
 * @throws {RangeError} If any element is not a safe integer.
 */
export function sortPriorities(values) {
  if (
    values === null ||
    typeof values !== 'object' ||
    !Array.isArray(values) ||
    Object.getPrototypeOf(values) !== Array.prototype
  ) {
    throw new TypeError('Expected a dense normal Array with prototype Array.prototype');
  }

  const len = values.length;

  // Pass 1: Validate density and primitive number type across all indices
  for (let i = 0; i < len; i++) {
    if (!Object.hasOwn(values, i)) {
      throw new TypeError(`Expected dense array, found hole at index ${i}`);
    }
    if (typeof values[i] !== 'number') {
      throw new TypeError(`Expected primitive number at index ${i}`);
    }
  }

  // Pass 2: Validate numeric bounds (safe integer)
  for (let i = 0; i < len; i++) {
    if (!Number.isSafeInteger(values[i])) {
      throw new RangeError(`Expected safe integer at index ${i}`);
    }
  }

  // Create a fresh normal array without calling input methods or iterators
  const result = new Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = values[i];
  }

  // Stable numeric ascending sort preserving -0 vs +0 relative order
  result.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  return result;
}
