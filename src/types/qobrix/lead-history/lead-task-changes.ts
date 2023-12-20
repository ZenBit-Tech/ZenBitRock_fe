import { QobrixPagination } from '..';

type ILeadTaskChange = {
  id: string | null;
  timestamp: string | null;
  changedStatus?: string | null;
  originalStatus?: string | null;
  changed?: { status?: string | null };
  original?: { status?: string | null };
};

type ILeadTaskChangeList = ILeadTaskChange[];

type ILeadTaskChangesResponse = {
  data: ILeadTaskChangeList;
  pagination: QobrixPagination;
};

export { type ILeadTaskChangesResponse, type ILeadTaskChange, type ILeadTaskChangeList };
