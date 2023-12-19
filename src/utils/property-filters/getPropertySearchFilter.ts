import { QobrixLead } from 'types';
import { getBathroomsFilter } from './getBathroomsFilter';
import { getSellingPriceFilter } from './getSellingPriceFilter';
import { getBedroomsFilter } from './getBedroomsFilter';
import { getBuyRentFilter } from './getBuyRentFilter';

const DEFAULT_FILTER = `status == "available"`;

const getPropertySearchFilter = (lead: QobrixLead): string => {
  let filter = DEFAULT_FILTER;

  const {
    bathrooms_from,
    bathrooms_to,
    list_selling_price_from,
    list_selling_price_to,
    bedrooms_from,
    bedrooms_to,
    buy_rent,
  } = lead;

  filter = filter
    .concat(getBathroomsFilter(bathrooms_from, bathrooms_to))
    .concat(getBedroomsFilter(bedrooms_from, bedrooms_to))
    .concat(getBuyRentFilter(buy_rent))
    .concat(getSellingPriceFilter(list_selling_price_from, list_selling_price_to));

  return filter;
};

export { getPropertySearchFilter };
