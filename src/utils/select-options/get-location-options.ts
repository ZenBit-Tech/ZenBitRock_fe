import { LocationSelectOption, QobrixLocationsResponse } from 'types';

function getLocationOptions(response: QobrixLocationsResponse): Array<LocationSelectOption> {
  return response.data.map((location, idx) => ({
    label: location.subarea
      ? `${location.country}, ${location.district}, ${location.area}, ${location.subarea}`
      : `${location.country}, ${location.district}, ${location.area}`,
    value: { _ids: [location.id] },
    searchParams: { district: location.district, area: location.area, subarea: location.subarea },
    key: idx,
  }));
}

export { getLocationOptions };
