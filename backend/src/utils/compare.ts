export function compare<T>(
  key: keyof T,
  order: 'asc' | 'desc' = 'asc',
  nullFirst: boolean = false
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const aVal = a[key];
    const bVal = b[key];

    // Handle null or undefined
    const aNull = aVal === null || aVal === undefined;
    const bNull = bVal === null || bVal === undefined;

    if (aNull && bNull) return 0;
    if (aNull) return nullFirst ? -1 : 1;
    if (bNull) return nullFirst ? 1 : -1;

    // Standard comparison
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;

    return 0;
  };
}
