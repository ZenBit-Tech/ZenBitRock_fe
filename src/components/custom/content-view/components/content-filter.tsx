type PropContentFilter = {
  getFilter(arg: string): void;
};

function ContentFilter({ getFilter }: PropContentFilter): JSX.Element {
  return <p>content-filter</p>;
}

export { ContentFilter };
