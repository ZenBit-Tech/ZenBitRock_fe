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
  media: boolean;
  sort?: string[];
  search?: string;
};

export type IPropertyPagination = {
  pageCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
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
  unit?: string | null;
  floorNumber?: number | null;
  seaView?: boolean | null;
  mountainView?: boolean | null;
  privateSwimmingPool?: boolean | null;
  commonSwimmingPool?: boolean | null;
  petsAllowed?: boolean | null;
  elevator?: boolean | null;
  listingDate?: string | null;
  internalAreaAmount?: number | null;
  coveredVerandasAmount?: number | null;
  landType?: string | null;
  communityFeatures?: string[];
  electricity?: boolean | null;
  reception?: boolean | null;
  water?: boolean | null;
  air?: boolean | null;
  alarm?: boolean | null;
  fireplace?: boolean | null;
  smart?: boolean | null;
  storage?: boolean | null;
  heating?: string | null;
};
