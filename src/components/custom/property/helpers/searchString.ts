import { QobrixPropertyDetailed } from 'types';

type Props = {
  saleRent?: QobrixPropertyDetailed['saleRent'];
  propertyType?: QobrixPropertyDetailed['propertyType'];
  price?: string;
  priceRental?: string;
  bedrooms?: QobrixPropertyDetailed['bedrooms'];
  bathrooms?: QobrixPropertyDetailed['bathrooms'];
  municipality?: QobrixPropertyDetailed['municipality'];
  city?: QobrixPropertyDetailed['city'];
  state?: QobrixPropertyDetailed['state'];
};

export function searchString(data: Props): string {
  const {
    saleRent,
    propertyType,
    price,
    priceRental,
    bedrooms,
    bathrooms,
    municipality,
    city,
    state,
  } = data;

  function setSaleRent(): string | null {
    if (saleRent === 'for_rent') {
      return 'buy_rent in ["to_rent"] and ';
    }
    if (saleRent === 'for_sale') {
      return 'buy_rent in ["to_buy"] and ';
    }

    return '';
  }

  return `${
    saleRent && setSaleRent()
  }status !== "closed_won" and (enquiry_type === null or enquiry_type === "${
    propertyType || ''
  }") and (list_selling_price_from === null or list_selling_price_from <= ${
    price || '0'
  }) and (list_selling_price_to === null or list_selling_price_to >= ${
    price || '0'
  }) and (list_rental_price_from === null or list_rental_price_from <= ${
    priceRental || '0'
  }) and (list_rental_price_to === null or list_rental_price_to >= ${
    priceRental || '0'
  }) and (bedrooms_from === null or bedrooms_from <= ${
    bedrooms || '0'
  }) and (bedrooms_to === null or bedrooms_to >= ${
    bedrooms || '0'
  }) and (bathrooms_from === null or bathrooms_from <= ${
    bathrooms || '0'
  }) and (bathrooms_to === null or bathrooms_to >= ${
    bathrooms || '0'
  }) and (Locations.subarea === null or Locations.subarea === "${
    municipality || ''
  }") and (Locations.area === null or Locations.area === "${
    city || ''
  }") and (Locations.district === null or Locations.district === "${state || ''}")`;
}
