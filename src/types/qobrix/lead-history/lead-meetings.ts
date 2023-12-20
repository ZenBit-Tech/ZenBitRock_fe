import { QobrixPagination } from '..';

type ILeadMeeting = {
  id: string | null;
  status: string | null;
  start_date?: string | null;
  startDate?: string | null;
};

type ILeadMeetingList = ILeadMeeting[];

type ILeadMeetingsResponse = {
  data: ILeadMeetingList;
  pagination: QobrixPagination;
};

export { type ILeadMeetingsResponse, type ILeadMeeting, type ILeadMeetingList };
