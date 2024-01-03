import { LocationSelectOption } from 'types';
import * as Yup from 'yup';

const FilterSchema = Yup.object().shape({
  location: Yup.object<LocationSelectOption>()
    .shape({
      searchParams: Yup.object().shape({
        district: Yup.string(),
        area: Yup.string(),
        subarea: Yup.string(),
      }),
    })
    .nullable(),
  propertyType: Yup.string().nullable(),
  status: Yup.string().nullable(),
  priceRangeRentFrom: Yup.number()
    .min(100, 'Min 100')
    .lessThan(Yup.ref('priceRangeRentTo'), 'Should be less than max value'),
  priceRangeRentTo: Yup.number()
    .min(100, 'Min 100')
    .max(10000, 'Max 10000')
    .moreThan(Yup.ref('priceRangeRentFrom'), 'Should be more than min value'),
  priceRangeSaleFrom: Yup.number()
    .min(10000, 'Min 10000')
    .lessThan(Yup.ref('priceRangeSaleTo'), 'Should be less than max value'),
  priceRangeSaleTo: Yup.number()
    .min(10000, 'Min 10000')
    .max(10000000, 'Max 10000000')
    .moreThan(Yup.ref('priceRangeSaleFrom'), 'Should be more than min value'),
  bedrooms: Yup.string().nullable(),
  rentOrSale: Yup.string().nullable(),
});

export { FilterSchema };
