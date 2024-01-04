import { QobrixLead } from 'types';

const getRentalPriceFilter = (
  from: QobrixLead['list_rental_price_from'],
  to: QobrixLead['list_rental_price_from']
): string => {
  let filter = '';

  if (from) {
    filter = filter.concat(` and list_rental_price_amount >= ${from}`);
  }
  if (to) {
    filter = filter.concat(` and list_rental_price_amount <= ${to}`);
  }

  return filter;
};

export { getRentalPriceFilter };
