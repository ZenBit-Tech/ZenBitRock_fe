type PropertyFilterFormData = {
  status: { value: string; label: string } | null;
  propertyType: { value: string; label: string } | null;
  priceRange?: (number | undefined)[] | null | undefined;
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
