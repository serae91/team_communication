export function arraysHaveSameElements<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;

  const setA = new Set(a);
  const setB = new Set(b);

  return [...setA].every(value => setB.has(value));
}
