const getPropertyTypeFilter = (types: string[]): string => {
  let filter = '';

  if (types.length) {
    filter = filter.concat(` and property_type in ${JSON.stringify(types)} `);
  }

  return filter;
};

export { getPropertyTypeFilter };
