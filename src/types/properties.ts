// ----------------------------------------------------------------------

export type PropertyItem = {
  id: string;
  saleRent: string | null;
  status: string | null;
  country: string;
  city: string;
  price: number;
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
  pageCount: number;
  currentPage: number;
  hasNextPage: Boolean;
  hasPrevPage: Boolean;
  count: number;
  limit: number;
};
