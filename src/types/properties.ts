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
