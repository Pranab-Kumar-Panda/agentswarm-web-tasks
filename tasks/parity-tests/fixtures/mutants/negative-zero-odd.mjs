export function classifyInteger(value) {
  if (typeof value !== 'number') throw new TypeError('primitive number required');
  if (!Number.isSafeInteger(value)) throw new RangeError('safe integer required');
  if (Object.is(value,-0)) return 'odd';
  return value % 2 === 0 ? 'even' : 'odd';
}
