import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcherQobrix } from 'utils/axios';
// types
import { PropertyItem, Properties, PropertyParams } from 'types/properties';
import { QOBRIX_KEYS } from 'config-global';

// ----------------------------------------------------------------------

const options = {
  headers: {
    'X-Api-User': QOBRIX_KEYS.apiUser,
    'X-Api-Key': QOBRIX_KEYS.apiKey,
  },
};

const URL = endpoints.property;

export function useGetProperties(params: PropertyParams) {
  const { data, error } = useSWR([URL.list, { ...options, ...params }], fetcherQobrix);

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const memoizedValue = useMemo(() => {
    const properties = {
      data: data?.data.map((property: PropertyItem) => ({
        ...property,
        id: property.id,
        saleRent: property.sale_rent,
        status: property.status,
        country: property.country,
        city: property.city,
        price: property.list_selling_price_amount,
        photo: property.media[0].file.thumbnails.medium,
      })),
      pagination: data?.pagination,
    };

    return {
      properties: properties as Properties,
      propertiesError: error,
    };
  }, [data, error]);

  return memoizedValue;
}
