function splitValue(value: string): string {
  return value
    .split('_')
    .map((a) =>
      a
        .split('')
        .map((b, idx) => (idx === 0 ? b.toUpperCase() : b))
        .join('')
    )
    .join(' ');
}

export default splitValue;
