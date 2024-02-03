type QobrixProperty = {
  id: string;
  name: string;
  bathrooms?: number | null;
  bedrooms?: number | null;
  property_type?: string;
  sale_rent?: string | null;
  saleRent?: string | null;
  status: string | null;
  country: string;
  city: string;
  price?: number | null;
  list_selling_price_amount?: number | null;
  priceRental?: number | null;
  list_rental_price_amount?: number | null;
  media?: { file: { thumbnails: { medium: string } } }[];
  photo: string | null;
};

type QobrixPropertyList = QobrixProperty[];

export { type QobrixProperty, type QobrixPropertyList };
