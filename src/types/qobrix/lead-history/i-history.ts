import { QobrixPagination } from '../qobrix-pagination.type';

type IHistoryItem = {
  direction: string;
  id: string;
  startDate: string;
  status: string;
  subject: string;
  dateSent: string;
  fromAddress: string;
  toAddress: string;
  changedStatus: string;
  originalStatus: string;
  timestamp: string;
  created: string;
  data: {
    data: {
      id: string;
      timestamp: string;
      originalStatus: string;
      changedStatus: string;
    }[];
    pagination: QobrixPagination;
  };
  taskId: string;
  sender: string;
  recipient: string;
};

type IHistory = {
  calls: IHistoryItem[];
  emails: IHistoryItem[];
  meetings: IHistoryItem[];
  smses: IHistoryItem[];
  statusChanges: IHistoryItem[];
  taskChanges: IHistoryItem[];
};

export { type IHistory, type IHistoryItem };
