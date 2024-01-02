type LocationSelectOption = {
  value: { _ids: [string] };
  label: string;
  key: number;
  searchParams: { district: string; area: string; subarea: string };
};

export { type LocationSelectOption };
