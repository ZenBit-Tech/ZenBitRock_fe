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
  propertyType: Yup.object<{ label: string; value: string }>()
    .shape({ label: Yup.string().required(), value: Yup.string().required() })
    .nullable(),
  status: Yup.object<{ label: string; value: string }>()
    .shape({ label: Yup.string().required(), value: Yup.string().required() })
    .nullable(),
  priceRange: Yup.array().of(Yup.number()).nullable(),
  bedrooms: Yup.object<{ label: string; value: string }>()
    .shape({ label: Yup.string().required(), value: Yup.string().required() })
    .nullable(),
  rentOrSale: Yup.string().nullable(),
});

export { FilterSchema };
