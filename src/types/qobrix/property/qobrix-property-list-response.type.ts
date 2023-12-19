import { QobrixPropertyList } from './qobrix-property.type';
import { QobrixPagination } from '../qobrix-pagination.type';

type QobrixPropertyListResponse = {
  data: QobrixPropertyList;
  pagination: QobrixPagination;
};

export { type QobrixPropertyListResponse };
