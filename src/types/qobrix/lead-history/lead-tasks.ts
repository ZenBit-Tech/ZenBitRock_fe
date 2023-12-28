import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadTask = {
  id?: string;
  subject?: string;
  status?: string;
  created?: string;
};

type ILeadTaskList = ILeadTask[];

type ILeadTasksResponse = {
  data: ILeadTaskList;
  pagination: QobrixPagination;
};

export { type ILeadTasksResponse, type ILeadTask, type ILeadTaskList };
