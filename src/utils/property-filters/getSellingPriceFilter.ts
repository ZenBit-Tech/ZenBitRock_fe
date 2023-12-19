import { QobrixLead } from 'types';

const getSellingPriceFilter = (
  from: QobrixLead['list_selling_price_from'],
  to: QobrixLead['list_selling_price_from']
): string => {
  let filter = '';

  if (from) {
    filter = filter.concat(` and list_selling_price_amount >= ${from}`);
  }
  if (to) {
    filter = filter.concat(` and list_selling_price_amount <= ${to}`);
  }

  return filter;
};

export { getSellingPriceFilter };
