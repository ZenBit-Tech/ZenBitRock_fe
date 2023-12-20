import { QobrixPagination } from '..';

type ILeadSms = {
  id: string | null;
  created: string | null;
  status: string | null;
  sender: string | null;
  recipient: string | null;
  direction?: string | null;
};

type ILeadSmsList = ILeadSms[];

type ILeadSmssResponse = {
  data: ILeadSmsList;
  pagination: QobrixPagination;
};

export { type ILeadSmssResponse, type ILeadSms, type ILeadSmsList };
