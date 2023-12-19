import { QobrixLeadList } from './qobrix-lead-list.type';
import { QobrixPagination } from './qobrix-pagination.type';

type QobrixLeadListResponse = {
  data: QobrixLeadList;
  pagination: QobrixPagination;
};

export { type QobrixLeadListResponse };
