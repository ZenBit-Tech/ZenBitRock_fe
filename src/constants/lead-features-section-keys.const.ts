import { type QobrixLead } from 'types';

type K = keyof QobrixLead;

const LeadFeaturesSectionKeys: K[] = [
  'apartment_type',
  'construction_stage',
  'bedrooms_from',
  'bedrooms_to',
  'bathrooms_from',
  'bathrooms_to',
  'covered_area_from_amount',
  'covered_area_to_amount',
];

export { LeadFeaturesSectionKeys };
