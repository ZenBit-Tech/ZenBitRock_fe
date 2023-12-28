export function firstUpperCase(value: string): string {
  return value
    .split('')
    .map((b: string, idx: number) => (idx === 0 ? b.toUpperCase() : b))
    .join('');
}
