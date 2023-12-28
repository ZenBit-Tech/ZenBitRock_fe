import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadSms = {
  id?: string;
  created?: string;
  status?: string;
  sender?: string;
  recipient?: string;
  direction?: string;
};

type ILeadSmsList = ILeadSms[];

type ILeadSmssResponse = {
  data: ILeadSmsList;
  pagination: QobrixPagination;
};

export { type ILeadSmssResponse, type ILeadSms, type ILeadSmsList };
