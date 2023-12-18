import { QobrixFilterKeysSaleRent } from 'enums';
import { QobrixLead } from 'types';

const getBuyRentFilter = (buyRent: QobrixLead['buy_rent']): string => {
  let filter = '';

  if (buyRent && Object.keys(QobrixFilterKeysSaleRent).includes(buyRent)) {
    const filterKey = QobrixFilterKeysSaleRent[buyRent as keyof typeof QobrixFilterKeysSaleRent];

    filter = filter.concat(` and sale_rent in ${JSON.stringify(filterKey)} `);
  }

  return filter;
};

export { getBuyRentFilter };
