type QobrixPropertyTypeResponse = {
  data: QobrixPropertyType[];
};

type QobrixPropertyType = {
  base_type: string;
  code: string;
  name: string;
};

export { type QobrixPropertyTypeResponse, type QobrixPropertyType };
