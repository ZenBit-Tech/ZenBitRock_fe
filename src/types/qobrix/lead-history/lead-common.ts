import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadCommon = {
  id?: string;
  subject?: string;
  status?: string;
  start_date?: string;
  startDate?: string;
  direction?: string;
  date_sent?: string;
  dateSent?: string;
  from_address?: string;
  to_address?: string;
  fromAddress?: string;
  toAddress?: string;
  created?: string;
  sender?: string;
  recipient?: string;
  timestamp?: string;
  changedStatus?: string;
  originalStatus?: string;
  changed?: { status?: string };
  original?: { status?: string };
};

type ILeadCommonList = ILeadCommon[];

type ILeadCommonResponse = {
  data: ILeadCommonList;
  pagination: QobrixPagination;
};

export { type ILeadCommonResponse, type ILeadCommon, type ILeadCommonList };
