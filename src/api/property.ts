import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { fetcher, endpoints } from 'utils/axios';
// types
import { PropertyItem, PropertyList } from 'types/properties';

// ----------------------------------------------------------------------

const options = {
  // mode: 'no-cors',
  headers: {
    'X-Api-User': 'be81403c-9488-4e21-b7b2-97189a13d485',
    'X-Api-Key': '884b188fb86dc64c3ccb54449addd0056fc8e5fc110e4f3544a3f4c534effcee',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Accept: 'application/json',
  },
};

const URL = endpoints.property;

export function useGetProperties(params: {
  page: number;
  limit: number;
  fields: [string];
  media: Boolean;
  sort: [string];
  search: string;
}) {
  const { data, isLoading, error, isValidating } = useSWR(
    [URL.list, { ...options, ...params }],
    fetcher
  );

  if (error) {
    console.error('Error fetching properties:', error);
  }
  const memoizedValue = useMemo(() => {
    const properties = data?.map((property: PropertyItem) => ({
      ...property,
      id: property.id,
      sale_rent: property.sale_rent,
      status: property.status,
      country: property.country,
      city: property.city,
      list_selling_price_amount: property.list_selling_price_amount,
      photo: property.media[0].file.href,
    }));

    return {
      properties: (properties as PropertyList) || [],
      propertiesLoading: isLoading,
      propertiesError: error,
      propertiesValidating: isValidating,
      propertiesEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}
