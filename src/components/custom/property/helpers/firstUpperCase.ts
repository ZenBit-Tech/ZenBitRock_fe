function firstUpperCase(value: string): string {
  return value
    .split('')
    .map((b, idx) => (idx === 0 ? b.toUpperCase() : b))
    .join('');
}

export default firstUpperCase;
