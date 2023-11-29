import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { fetcher, endpoints } from 'utils/axios';
// types
import { PropertyItem, PropertyList } from 'types/properties';

// ----------------------------------------------------------------------

const URL = endpoints.property;

export function useGetProperties() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(() => {
    const properties = data?.map((property: PropertyItem) => ({
      ...properties,
      id: property.id,
      sale_rent: property.sale_rent,
      status: property.status,
      country: property.country,
      city: property.city,
      list_selling_price_amount: property.list_selling_price_amount,
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

// ----------------------------------------------------------------------

export function useGetProperty(propertyId: string) {
  const URL = propertyId ? [endpoints.product.details, { params: { propertyId } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(() => {
    const property = data?.map((prop: PropertyItem) => ({
      ...property,
      media: prop.media,
    }));

    return {
      property: (property as PropertyItem) || [],
      propertiesLoading: isLoading,
      propertiesError: error,
      propertiesValidating: isValidating,
      propertiesEmpty: !isLoading && !data?.length,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------
