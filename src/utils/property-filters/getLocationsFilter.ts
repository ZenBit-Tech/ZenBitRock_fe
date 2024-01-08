import { QobrixLocations } from 'types/qobrix';
import { getLocationFilter } from './getLocationFilter';

const getLocationsFilter = (locations: QobrixLocations[]): string => {
  let filter = '';

  if (locations.length) {
    locations.forEach((location) => {
      let locationFilter = getLocationFilter({
        area: location.area,
        subarea: location.subarea,
        district: location.district,
      });

      locationFilter = locationFilter.substring(locationFilter.indexOf('and') + 3);
      locationFilter = ' ('.concat(locationFilter).concat(') or');

      filter = filter.concat(locationFilter);
    });

    filter = filter.substring(0, filter.lastIndexOf('or'));
    filter = 'and ('.concat(filter).concat(')');
  }

  return filter;
};

export { getLocationsFilter };
