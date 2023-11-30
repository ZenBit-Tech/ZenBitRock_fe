import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { fetcher, endpoints } from 'utils/axios';
// types
import { PropertyItem, Properties, PropertyParams } from 'types/properties';

// ----------------------------------------------------------------------

const options = {
  headers: {
    'X-Api-User': 'be81403c-9488-4e21-b7b2-97189a13d485',
    'X-Api-Key': '884b188fb86dc64c3ccb54449addd0056fc8e5fc110e4f3544a3f4c534effcee',
  },
};

const URL = endpoints.property;

export function useGetProperties(params: PropertyParams) {
  const { data, isLoading, error, isValidating } = useSWR(
    [URL.list, { ...options, ...params }],
    fetcher
  );

  if (error) {
    console.error('Error fetching properties:', error);
  }
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
        photo: property.media[0].file.href,
      })),
      pagination: data?.pagination,
    };

    return {
      properties: (properties as Properties) || { data: [], pagination: {} },
      propertiesLoading: isLoading,
      propertiesError: error,
      propertiesValidating: isValidating,
      propertiesEmpty: !isLoading && !data?.length,
    };
  }, [data?.data, data?.pagination, error, isLoading, isValidating]);

  return memoizedValue;
}
