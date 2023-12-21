import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadTaskChange = {
  id?: string;
  timestamp?: string;
  changedStatus?: string;
  originalStatus?: string;
  changed?: { status?: string };
  original?: { status?: string };
};

type ILeadTaskChangeList = ILeadTaskChange[];

type ILeadTaskChangesResponse = {
  data: ILeadTaskChangeList;
  pagination: QobrixPagination;
};

export { type ILeadTaskChangesResponse, type ILeadTaskChange, type ILeadTaskChangeList };
