import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadStatusChange = {
  id?: string;
  timestamp?: string;
  changedStatus?: string;
  originalStatus?: string;
  changed?: { status?: string };
  original?: { status?: string };
};

type ILeadStatusChangeList = ILeadStatusChange[];

type ILeadStatusChangesResponse = {
  data: ILeadStatusChangeList;
  pagination: QobrixPagination;
};

export { type ILeadStatusChangesResponse, type ILeadStatusChange, type ILeadStatusChangeList };
