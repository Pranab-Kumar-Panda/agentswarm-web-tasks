/**
 * Rotate a dense array of primitive strings left by `amount` positions.
 *
 * @param {string[]} values Dense plain Array of primitive strings; left unchanged.
 * @param {number} amount Nonnegative safe integer; taken modulo `values.length`.
 * @returns {string[]} A fresh array with the rotated values.
 * @throws {TypeError} If `values` is not a plain dense string array or `amount` is not a primitive number.
 * @throws {RangeError} If `amount` is not a nonnegative safe integer.
 */
export function rotateLeft(values, amount) {
  if (!Array.isArray(values) || Object.getPrototypeOf(values) !== Array.prototype) throw new TypeError('plain array required');
  if (typeof amount !== 'number') throw new TypeError('primitive number required');
  const length = values.length;
  const input = new Array(length);
  for (let i = 0; i < length; i++) {
    if (!Object.hasOwn(values, i)) throw new TypeError('dense array required');
    const value = values[i];
    if (typeof value !== 'string') throw new TypeError('primitive strings required');
    input[i] = value;
  }
  if (!Number.isSafeInteger(amount) || amount < 0) throw new RangeError('nonnegative safe integer required');
  if (length === 0) return [];
  const shift = amount % length;
  const result = new Array(length);
  for (let i = 0; i < length; i++) result[i] = input[(i + shift) % length];
  return result;
}
