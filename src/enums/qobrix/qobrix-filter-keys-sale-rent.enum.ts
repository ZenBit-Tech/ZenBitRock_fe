import { QobrixLeadBuyRent } from './qobrix-lead-buy-rent.enum';
import { QobrixPropertySaleRent } from './qobrix-property-sale-rent.enum';

const QobrixFilterKeysSaleRent = {
  [QobrixLeadBuyRent.TO_BUY]: [
    QobrixPropertySaleRent.FOR_SALE,
    QobrixPropertySaleRent.FOR_SALE_AND_RENT,
  ],
  [QobrixLeadBuyRent.TO_BUY_AND_RENT]: [QobrixPropertySaleRent.FOR_SALE_AND_RENT],
  [QobrixLeadBuyRent.TO_RENT]: [
    QobrixPropertySaleRent.FOR_SALE,
    QobrixPropertySaleRent.FOR_SALE_AND_RENT,
  ],
} as const;

export { QobrixFilterKeysSaleRent };
