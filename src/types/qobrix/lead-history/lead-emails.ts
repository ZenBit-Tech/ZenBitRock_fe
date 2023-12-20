import { QobrixPagination } from '..';

type ILeadEmail = {
  id: string | null;
  date_sent?: string | null;
  dateSent?: string | null;
  from_address?: string | null;
  to_address?: string | null;
  fromAddress?: string | null;
  toAddress?: string | null;
  direction?: string | null;
};

type ILeadEmailList = ILeadEmail[];

type ILeadEmailsResponse = {
  data: ILeadEmailList;
  pagination: QobrixPagination;
};

export { type ILeadEmailsResponse, type ILeadEmail, type ILeadEmailList };
