export default function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError('Invalid arguments');
  }
  return a + b;
}
