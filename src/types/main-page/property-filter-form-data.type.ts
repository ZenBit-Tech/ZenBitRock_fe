type PropertyFilterFormData = {
  status?: string | null | undefined;
  propertyType?: string | null | undefined;
  priceRange?: (number | undefined)[] | null | undefined;
  bedrooms?: string | null | undefined;
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
