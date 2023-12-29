const getLocationFilter = ({
  area,
  subarea,
  district,
}: {
  area: string;
  subarea: string;
  district: string;
}): string => {
  let filter = '';

  if (area) {
    filter = filter.concat(`and LocationLocations.area ==  "${area}" `);
  }
  if (subarea) {
    filter = filter.concat(`and LocationLocations.subarea ==  "${subarea}" `);
  }
  if (district) {
    filter = filter.concat(`and LocationLocations.district ==  "${district}" `);
  }

  return filter;
};

export { getLocationFilter };
