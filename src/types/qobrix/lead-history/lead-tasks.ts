import { QobrixPagination } from '..';

type ILeadTask = {
  id: string | null;
  subject: string | null;
  status: string | null;
};

type ILeadTaskList = ILeadTask[];

type ILeadTasksResponse = {
  data: ILeadTaskList;
  pagination: QobrixPagination;
};

export { type ILeadTasksResponse, type ILeadTask, type ILeadTaskList };
