// ----------------------------------------------------------------------

export type PropertyItem = {
  id: string;
  sale_rent: string | null;
  status: string | null;
  country: string;
  city: string;
  list_selling_price_amount: number;
  media: { file: { href: string } }[];
  photo: string;
};

// ----------------------------------------------------------------------

export type PropertyList = PropertyItem[];
