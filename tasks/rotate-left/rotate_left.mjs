export function rotateLeft(values, amount) {
  if (!Array.isArray(values) || typeof amount !== 'number') throw new TypeError('plain array and primitive number required');
  const input=[];
  for (let i=0; i<values.length; i++) {
    if (!Object.hasOwn(values,i) || typeof values[i] !== 'string') throw new TypeError('dense primitive strings required');
    input.push(values[i]);
  }
  if (!Number.isSafeInteger(amount) || amount < 0) throw new RangeError('nonnegative safe integer required');
  const shift=input.length ? amount : 0;
  values.splice(0,shift); return values;
}
