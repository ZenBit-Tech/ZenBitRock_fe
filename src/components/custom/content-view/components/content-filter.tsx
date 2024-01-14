type PropContentFilter = {
  getFilter(arg: string): void;
  t: Function;
};

function ContentFilter({ getFilter, t }: PropContentFilter): JSX.Element {
  return <p>content-filter</p>;
}

export { ContentFilter };
