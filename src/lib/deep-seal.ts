/** A method to seal javascript objects to improve Vue performance */
export function deepSeal<T>(input: T): T {
  Object.seal(input);
  if (Array.isArray(input)) {
    for (const item of input) deepSeal(item);
  }
  if (typeof input === 'object') {
    for (const key in input) deepSeal(input[key]);
  }
  return input;
}
