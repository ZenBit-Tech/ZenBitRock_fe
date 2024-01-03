type PropertyFilterFormData = {
  status: { value: string; label: string } | null;
  propertyType: { value: string; label: string } | null;
  priceRangeRentFrom?: number | null | undefined;
  priceRangeRentTo?: number | null | undefined;
  priceRangeSaleFrom?: number | null | undefined;
  priceRangeSaleTo?: number | null | undefined;
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
