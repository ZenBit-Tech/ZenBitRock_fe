type PropertyFilterFormData = {
  status: { value: string; label: string } | null;
  propertyType: { value: string; label: string } | null;
  priceRangeRentFrom?: number;
  priceRangeRentTo?: number;
  priceRangeSaleFrom?: number;
  priceRangeSaleTo?: number;
  bedrooms: { value: string; label: string } | null;
  rentOrSale?: string | null | undefined;
  location: {
    searchParams: {
      district?: string | undefined;
      area?: string | undefined;
      subarea?: string | undefined;
    };
  } | null;
};

export { type PropertyFilterFormData };
