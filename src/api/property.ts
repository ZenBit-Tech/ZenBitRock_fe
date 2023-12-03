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
  const { data, isLoading, error, isValidating } = useSWR(
    [URL.list, { ...options, ...params }],
    fetcherQobrix
  );

  if (error) {
    console.error('Error fetching properties:', error);
  }
  // console.log(data);
  const memoizedValue = useMemo(() => {
    const properties = {
      data: data?.data.map((property: PropertyItem) => ({
        ...property,
        id: property.id,
        sale_rent: property.sale_rent,
        status: property.status,
        country: property.country,
        city: property.city,
        list_selling_price_amount: property.list_selling_price_amount,
        photo: property.media[0].file.thumbnails.medium,
      })),
      pagination: data?.pagination,
    };

    return {
      properties: properties as Properties,
      propertiesLoading: isLoading,
      propertiesError: error,
      propertiesValidating: isValidating,
      propertiesEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}
