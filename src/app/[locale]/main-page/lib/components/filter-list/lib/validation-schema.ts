import * as Yup from 'yup';

const FilterSchema = Yup.object().shape({
  location: Yup.string().nullable(),
  propertyType: Yup.string().nullable(),
  status: Yup.string().nullable(),
  priceRange: Yup.string().nullable(),
  bedrooms: Yup.string().nullable(),
  rentOrSale: Yup.string().nullable(),
});

export { FilterSchema };
