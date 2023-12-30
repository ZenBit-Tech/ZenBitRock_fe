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
  priceRangeSell: Yup.array().of(Yup.number()).nullable(),
  priceRangeRent: Yup.array().of(Yup.number()).nullable(),
  bedrooms: Yup.string().nullable(),
  rentOrSale: Yup.string().nullable(),
});

export { FilterSchema };
