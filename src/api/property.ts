import { useMemo } from 'react';
import useSWR from 'swr';
import { endpoints, fetcherQobrix } from 'utils/axios';
import { IPropertyItem, IProperties, IPropertyParams } from 'types/properties';

const URL = endpoints.property;

export function useGetProperties(params: IPropertyParams) {
  const { data, error } = useSWR([URL.list, params], fetcherQobrix);

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const memoizedValue = useMemo(() => {
    const properties = {
      data: data?.data.map((property: IPropertyItem) => ({
        ...property,
        id: property.id,
        saleRent: property.sale_rent,
        status: property.status,
        country: property.country,
        city: property.city,
        price: property.list_selling_price_amount,
        photo: property.media[0].file.thumbnails.medium,
      })),
      pagination: { hasNextPage: data?.pagination.has_next_page },
    };

    return {
      properties: properties as IProperties,
      propertiesError: error,
    };
  }, [data, error]);

  return memoizedValue;
}
