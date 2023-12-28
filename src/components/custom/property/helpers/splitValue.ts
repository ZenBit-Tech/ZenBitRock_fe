export function splitValue(value: string): string {
  return value
    .split('_')
    .map((a: string) =>
      a
        .split('')
        .map((b: string, idx: number) => (idx === 0 ? b.toUpperCase() : b))
        .join('')
    )
    .join(' ');
}
