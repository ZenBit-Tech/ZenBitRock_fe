export type QobrixLocations = {
  area: string;
  coordinates: string;
  country: string;
  created: string;
  created_by: string | null;
  display_priority: null;
  dist: boolean;
  district: string;
  id: string;
  modified: string;
  modified_by: string | null;
  ref: number;
  subarea: string;
  trashed: null;
};

export type QobrixLocationsResponse = {
  data: QobrixLocations[];
  pagination: {
    page_count: number;
    current_page: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    count: number;
    limit: number;
  };
};
