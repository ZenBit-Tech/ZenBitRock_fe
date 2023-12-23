import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadCall = {
  id?: string;
  status?: string;
  subject?: string;
  start_date?: string;
  startDate?: string;
  direction?: string;
};

type ILeadCallList = ILeadCall[];

type ILeadCallsResponse = {
  data: ILeadCallList;
  pagination: QobrixPagination;
};

export { type ILeadCallsResponse, type ILeadCall, type ILeadCallList };
