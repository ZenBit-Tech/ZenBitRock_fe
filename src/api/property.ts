import { useMemo } from 'react';
import useSWR from 'swr';
import { endpoints, fetcherQobrix } from 'utils/axios';
import { IProperties, IPropertyParams, IPropertyDetailed } from 'types/property';
import { QobrixProperty } from 'types/qobrix';

const URL = endpoints.property;

export function useGetProperties(params: IPropertyParams) {
  const { data, error } = useSWR([URL.list, params], fetcherQobrix);

  if (error) {
    console.error('Error fetching properties:', error);
  }

  const memoizedValue = useMemo(() => {
    const properties = {
      data: data?.data.map((property: QobrixProperty) => ({
        ...property,
        id: property.id,
        saleRent: property.sale_rent,
        status: property.status,
        country: property.country,
        city: property.city,
        price: property.list_selling_price_amount,
        photo: property.media?.[0]?.file?.thumbnails?.medium || null,
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

export function useGetProperty(id: string) {
  const { data, error } = useSWR([`${URL.list}/${id}`, null], fetcherQobrix);
  if (error) {
    console.error('Error fetching properties:', error);
  }
  const memoizedValue = useMemo(() => {
    const property: IPropertyDetailed = {
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
      livingrooms: data?.data.living_rooms,
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
      landType: data?.data.land_type,
      communityFeatures: data?.data.community_features,
      unit: data?.data.unit_number,
      electricity: data?.data.electricity,
      reception: data?.data.reception,
      water: data?.data.water,
      air: data?.data.air_condition,
      alarm: data?.data.alarm,
      fireplace: data?.data.fireplace,
      smart: data?.data.smart_home,
      storage: data?.data.storage_space,
      heating: data?.data.heating_type,
    };
    return data
      ? {
          property: property as IPropertyDetailed,
          propertyError: error,
        }
      : { property: null, propertyError: null };
  }, [data, error]);
  return memoizedValue;
}
