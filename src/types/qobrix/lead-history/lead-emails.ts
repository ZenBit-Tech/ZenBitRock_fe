import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadEmail = {
  id?: string;
  date_sent?: string;
  dateSent?: string;
  from_address?: string;
  to_address?: string;
  fromAddress?: string;
  toAddress?: string;
  direction?: string;
};

type ILeadEmailList = ILeadEmail[];

type ILeadEmailsResponse = {
  data: ILeadEmailList;
  pagination: QobrixPagination;
};

export { type ILeadEmailsResponse, type ILeadEmail, type ILeadEmailList };
