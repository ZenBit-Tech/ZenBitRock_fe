import { PropertyFilterFormData } from 'types';
import { getBedroomsFilter } from './getBedroomsFilter';
import { getBuyRentFilter } from './getBuyRentFilter';
import { getPropertyStatusFilter } from './getPropertyStatusFilter';
import { getPropertyTypeFilter } from './getPropertyTypeFilter';
import { getLocationFilter } from './getLocationFilter';

const getMainPagePropertyFilter = (formData: PropertyFilterFormData): string => {
  let filter = '';

  const { bedrooms, status, rentOrSale: rent, propertyType, location } = formData;

  filter = filter
    .concat(getBedroomsFilter(bedrooms?.value ? Number(bedrooms.value) : null, null))
    .concat(getPropertyStatusFilter(status?.value ?? null))
    .concat(getBuyRentFilter(rent ?? null))
    .concat(getPropertyTypeFilter(propertyType?.value ? [propertyType.value] : []))
    .concat(
      getLocationFilter({
        area: location?.searchParams.area ?? '',
        subarea: location?.searchParams.subarea ?? '',
        district: location?.searchParams.district ?? '',
      })
    );
  return filter;
};

export { getMainPagePropertyFilter };
