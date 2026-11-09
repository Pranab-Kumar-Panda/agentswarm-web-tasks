export function classifyInteger(value) {
  if (typeof value !== 'number') throw new TypeError('primitive number required');
  if (!Number.isFinite(value)) throw new RangeError('safe integer required');
  return value % 2 === 0 ? 'even' : 'odd';
}
