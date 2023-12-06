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
