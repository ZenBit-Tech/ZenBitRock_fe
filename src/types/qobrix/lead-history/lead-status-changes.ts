import { QobrixPagination } from '..';

type ILeadStatusChange = {
  id: string | null;
  timestamp: string | null;
  changedStatus?: string | null;
  originalStatus?: string | null;
  changed?: { status?: string | null };
  original?: { status?: string | null };
};

type ILeadStatusChangeList = ILeadStatusChange[];

type ILeadStatusChangesResponse = {
  data: ILeadStatusChangeList;
  pagination: QobrixPagination;
};

export { type ILeadStatusChangesResponse, type ILeadStatusChange, type ILeadStatusChangeList };
