import { QobrixProperty } from 'types';

const getPropertyStatusFilter = (status: QobrixProperty['status']): string => {
  let filter = '';

  if (status) {
    filter = filter.concat(` and status == "${status}" `);
  }

  return filter;
};

export { getPropertyStatusFilter };
