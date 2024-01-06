import { LocationSelectOption } from './select-options';

export interface ICreateLeadData {
  offeringType: string | null;
  leadSource: string;
  description: string;
  enquiryType: { value: string; label: string } | null;
  countOfBedrooms: { value: string; label: string } | null;
  totalAreaFrom: number;
  totalAreaTo: number;
  priceRangeRentFrom: number | null;
  priceRangeRentTo: number | null;
  priceRangeBuyFrom: number | null;
  priceRangeBuyTo: number | null;
  locations: LocationSelectOption | null;
}
