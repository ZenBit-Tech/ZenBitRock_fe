import { PropertyFilterFormData } from 'types';
import { getBedroomsFilter } from './getBedroomsFilter';
import { getBuyRentFilter } from './getBuyRentFilter';
import { getPropertyStatusFilter } from './getPropertyStatusFilter';
import { getPropertyTypeFilter } from './getPropertyTypeFilter';
import { getLocationFilter } from './getLocationFilter';
import { getSellingPriceFilter } from './getSellingPriceFilter';
import { getRentalPriceFilter } from './getRentalPriceFilter';

const getMainPagePropertyFilter = (formData: PropertyFilterFormData): string => {
  let filter = '';

  const {
    bedrooms,
    status,
    rentOrSale: rent,
    propertyType,
    location,
    priceRangeSaleFrom,
    priceRangeSaleTo,
    priceRangeRentFrom,
    priceRangeRentTo,
  } = formData;

  filter = filter
    .concat(getBedroomsFilter(bedrooms ? Number(bedrooms) : null, null))
    .concat(getPropertyStatusFilter(status ?? null))
    .concat(getBuyRentFilter(rent ?? null))
    .concat(getPropertyTypeFilter(propertyType ? [propertyType] : []))
    .concat(
      getLocationFilter({
        area: location?.searchParams.area ?? '',
        subarea: location?.searchParams.subarea ?? '',
        district: location?.searchParams.district ?? '',
      })
    );
  if (rent === 'for_sale') {
    filter = filter.concat(getSellingPriceFilter(priceRangeSaleFrom, priceRangeSaleTo));
  }
  if (rent === 'for_rent') {
    filter = filter.concat(getRentalPriceFilter(priceRangeRentFrom, priceRangeRentTo));
  }

  return filter;
};

export { getMainPagePropertyFilter };
