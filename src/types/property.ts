export type IPropertyItem = {
  id: string;
  sale_rent: string | null;
  saleRent: string | null;
  status: string | null;
  country: string;
  city: string;
  price: number;
  list_selling_price_amount: number;
  media: { file: { thumbnails: { medium: string } } }[];
  photo: string;
};

export type IPropertyList = IPropertyItem[];

export type IProperties = {
  data: IPropertyList;
  pagination: IPropertyPagination;
};

export type IPropertyParams = {
  params: IPropertyParamsList;
};

export type IPropertyParamsList = {
  page: number;
  limit: number;
  fields: string[];
  media: Boolean;
  sort?: string[];
  search?: string;
};

export type IPropertyPagination = {
  pageCount: number;
  currentPage: number;
  hasNextPage: Boolean;
  hasPrevPage: Boolean;
  count: number;
  limit: number;
};

export type IPropertyDetailed = {
  sale_rent?: string | null;
  saleRent?: string | null;
  status: string | null;
  country: string;
  city: string;
  price?: number;
  list_selling_price_amount?: number;
  media: {
    file: {
      href: string;
      thumbnails: { large: string };
    };
  }[];
  description: string | null;
  name: string | null;
  propertyType: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  livingrooms?: number | null;
  kitchenType?: string | null;
  verandas?: number | null;
  parking?: number | null;
  coordinates: string | null;
  municipality?: string | null;
  state?: string | null;
  postCode?: string | null;
  street?: string | null;
  floorNumber?: number | null;
  seaView?: Boolean | null;
  mountainView?: Boolean | null;
  privateSwimmingPool?: Boolean | null;
  commonSwimmingPool?: Boolean | null;
  petsAllowed?: Boolean | null;
  elevator?: Boolean | null;
  listingDate?: string | null;
  internalAreaAmount?: number | null;
  coveredVerandasAmount?: number | null;
  tenancyType?: string | null;
  communityFeatures?: string[];
  sellerName?: string | null;
  sellerEmail?: string | null;
  sellerPhone?: string | null;
  salespersonUserName?: string | null;
  salespersonUserEmail?: string | null;
};
