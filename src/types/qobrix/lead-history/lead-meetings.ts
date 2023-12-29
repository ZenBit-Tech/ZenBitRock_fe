import { QobrixPagination } from '../qobrix-pagination.type';

type ILeadMeeting = {
  id?: string;
  status?: string;
  subject?: string;
  start_date?: string;
  startDate?: string;
};

type ILeadMeetingList = ILeadMeeting[];

type ILeadMeetingsResponse = {
  data: ILeadMeetingList;
  pagination: QobrixPagination;
};

export { type ILeadMeetingsResponse, type ILeadMeeting, type ILeadMeetingList };
