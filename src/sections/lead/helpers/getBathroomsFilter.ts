import { QobrixLead } from 'types';

const getBathroomsFilter = (
  from: QobrixLead['bathrooms_from'],
  to: QobrixLead['bathrooms_to']
): string => {
  let filter = '';

  if (from) {
    filter = filter.concat(` and bathrooms >= ${from} `);
  }
  if (to) {
    filter = filter.concat(` and bathrooms <= ${to} `);
  }

  return filter;
};

export { getBathroomsFilter };
