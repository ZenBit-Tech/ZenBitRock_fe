const getNameFilter = (name: string): string => {
  let filter = '';

  if (name) {
    filter = filter.concat(` and name matches "%${name}%" `);
  }

  return filter;
};

export { getNameFilter };
