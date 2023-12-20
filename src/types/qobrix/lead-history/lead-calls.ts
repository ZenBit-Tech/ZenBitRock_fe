import { QobrixPagination } from '..';

type ILeadCall = {
  id: string | null;
  status: string | null;
  start_date?: string | null;
  startDate?: string | null;
  direction?: string | null;
};

type ILeadCallList = ILeadCall[];

type ILeadCallsResponse = {
  data: ILeadCallList;
  pagination: QobrixPagination;
};

export { type ILeadCallsResponse, type ILeadCall, type ILeadCallList };
