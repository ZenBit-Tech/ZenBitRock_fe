export interface ICreateLeadData {
  offeringType: string | null;
  leadSource: string;
  description: string;
  enquiryType: Object | null;
  countOfBedrooms: Object | null;
  totalAreaFrom: number;
  totalAreaTo: number;
  priceRahgeRentFrom: number;
  priceRahgeRentTo: number;
  priceRahgeSellFrom: number;
  priceRahgeSellTo: number;
  locations: object | null;
}
