import { QobrixLead } from 'types';

const getBedroomsFilter = (
  from: QobrixLead['bedrooms_from'],
  to: QobrixLead['bedrooms_to']
): string => {
  let filter = '';

  if (from) {
    filter = filter.concat(` and bedrooms >= ${from} `);
  }
  if (to) {
    filter = filter.concat(` and bedrooms <= ${to} `);
  }

  return filter;
};

export { getBedroomsFilter };
