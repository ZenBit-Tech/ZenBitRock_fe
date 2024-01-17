import { LocationSelectOption } from 'types/select-options';

export type QobrixCreateLead = {
  conversion_status: string;
  agent: string;
  contact_name: string;
  buy_rent: string | null;
  description: string | null;
  source_description: string | null;
  enquiry_type: string | null;
  bedrooms_from: number | null;
  covered_area_from_amount: number | null;
  covered_area_to_amount: number | null;
  list_selling_price_from?: number | null;
  list_selling_price_to?: number | null;
  list_rental_price_from?: number | null;
  list_rental_price_to?: number | null;
  locations: LocationSelectOption['value'] | null;
  source: string;
};

export type QobrixCreateLeadResponse = {
  data: {
    conversion_status: string;
    agent: string;
    contact_name: string;
    buy_rent: string | null;
    description: string | undefined;
    source_description: string | undefined;
    enquiry_type: string;
    bedrooms_from: number | null;
    total_area_from_amount: number | null;
    total_area_to_amount: number | null;
    list_selling_price_from: number | null;
    list_selling_price_to: number | null;
    list_rental_price_from: number | null;
    list_rental_price_to: number | null;
  };
};
