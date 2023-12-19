import { ValueOf } from 'types';
import { QobrixLead } from 'types/qobrix/qobrix-lead.type';
import { QobrixLeadBuyRent } from './qobrix-lead-buy-rent.enum';

const QobrixPriceKeysBuyRent: Record<ValueOf<typeof QobrixLeadBuyRent>, Partial<QobrixLead>> = {
  to_buy: { list_selling_price_from: 1, list_selling_price_to: 1 },
  to_rent: { list_rental_price_from: 1, list_rental_price_to: 1 },
  to_sell: { list_selling_price: 1, lowest_selling_price: 1 },
  to_let: { list_letting_price: 1, lowest_letting_price: 1 },
  to_buy_and_rent: {},
  to_manage: {},
};

export { QobrixPriceKeysBuyRent };
