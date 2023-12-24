import { QobrixPropertyList } from './qobrix-property.type';
import { QobrixPagination } from '../qobrix-pagination.type';
import { QobrixPropertyDetailed } from './qobrix-property-detailed.type';

type QobrixPropertyListResponse = {
  data: QobrixPropertyList;
  pagination: QobrixPagination;
};

type QobrixPropertyResponse = {
  data: QobrixPropertyDetailed;
};

export { type QobrixPropertyListResponse, type QobrixPropertyResponse };
