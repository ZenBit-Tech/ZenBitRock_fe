// ----------------------------------------------------------------------

export type PropertyItem = {
  id: string;
  sale_rent: string | null;
  status: string | null;
  country: string;
  city: string;
  list_selling_price_amount: number;
  media: { file: { thumbnails: { medium: string } } }[];
  photo: string;
};

// ----------------------------------------------------------------------

export type PropertyList = PropertyItem[];

// ----------------------------------------------------------------------

export type Properties = {
  data: PropertyList;
  pagination: PropertyPagination;
};

// ----------------------------------------------------------------------

export type PropertyParams = {
  params: PropertyParamsList;
};

// ----------------------------------------------------------------------

export type PropertyParamsList = {
  page: number;
  limit: number;
  fields: string[];
  media: Boolean;
  sort?: string[];
  search?: string;
};

// ----------------------------------------------------------------------

export type PropertyPagination = {
  page_count: number;
  current_page: number;
  has_next_page: Boolean;
  has_prev_page: Boolean;
  count: number;
  limit: number;
};

// ----------------------------------------------------------------------

export type PropertyDetailed = {
  sale_rent: string | null;
  status: string | null;
  country: string;
  city: string;
  list_selling_price_amount: number;
  media: { file: { thumbnails: { medium: string } } }[];
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
