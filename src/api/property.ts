import { useMemo } from 'react';
import useSWR from 'swr';
// utils
import { endpoints, fetcherQobrix } from 'utils/axios';
// types
import { PropertyItem, Properties, PropertyParams, PropertyDetailed } from 'types/properties';
import { QOBRIX_KEYS } from 'config-global';

// ----------------------------------------------------------------------

const options = {
  headers: {
    'X-Api-User': QOBRIX_KEYS.apiUser,
    'X-Api-Key': QOBRIX_KEYS.apiKey,
  },
};

const URL = endpoints.property;

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export function useGetProperty(id: string) {
  const { data, error } = useSWR([`${URL.list}/${id}`, { ...options }], fetcherQobrix);

  if (error) {
    console.error('Error fetching properties:', error);
  }
  const memoizedValue = useMemo(() => {
    const property: PropertyDetailed = {
      saleRent: data?.data.sale_rent,
      status: data?.data.status,
      country: data?.data.country,
      city: data?.data.city,
      price: data?.data.list_selling_price_amount,
      media: data?.data.media,
      description: data?.data.description,
      name: data?.data.name,
      propertyType: data?.data.property_type,
      bedrooms: data?.data.bedrooms,
      bathrooms: data?.data.bathrooms,
      kitchenType: data?.data.kitchen_type,
      verandas: data?.data.verandas,
      parking: data?.data.parking,
      coordinates: data?.data.coordinates,
      municipality: data?.data.municipality,
      state: data?.data.state,
      postCode: data?.data.post_code,
      street: data?.data.street,
      floorNumber: data?.data.floor_number,
      seaView: data?.data.sea_view,
      mountainView: data?.data.mountain_view,
      privateSwimmingPool: data?.data.private_swimming_pool,
      commonSwimmingPool: data?.data.common_swimming_pool,
      petsAllowed: data?.data.pets_allowed,
      elevator: data?.data.elevator,
      listingDate: data?.data.listing_date,
      internalAreaAmount: data?.data.internal_area_amount,
      coveredVerandasAmount: data?.data.covered_verandas_amount,
      sellerName: data?.data.seller_contact.name,
      sellerEmail: data?.data.seller_contact.email,
      sellerPhone: data?.data.seller_contact.phone,
      salespersonUserName: data?.data.salesperson_user.name,
      salespersonUserEmail: data?.data.salesperson_user.username,
    };

    return {
      property: property as PropertyDetailed,
      propertyError: error,
    };
  }, [data, error]);

  return memoizedValue;
}
