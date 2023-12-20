// import { Typography, Grid } from '@mui/material';
import { ApiRoute } from 'enums';
import { useEffect, useState, useTranslations } from 'hooks';
import { useAllPagesData } from 'hooks/use-all-pages-data';
import {
  useGetLeadCallsQuery,
  useGetLeadStatusChangesQuery,
  useGetLeadEmailsQuery,
  useGetLeadMeetingsQuery,
  useGetLeadSmsesQuery,
  useGetLeadTasksQuery,
  useGetLeadTaskChangesQuery,
} from 'store/api/qobrixApi';
import { ILeadSmssResponse, ILeadTasksResponse, QobrixLead } from 'types';

const START_PAGE: number = 1;

type Props = { lead: QobrixLead };

const LeadHistorySection = ({ lead }: Props) => {
  const [history, setHistory] = useState<IHistories>({});
  // const [taskChanges, setTaskChanges] = useState<ILeadTasks>(null);
  const { id } = lead;

  const t = useTranslations('leadDetailsPage');
  // let dataArray = [
  //   useGetLeadSmsesQuery({ page: START_PAGE, id }),
  //   useGetLeadEmailsQuery({ page: START_PAGE, id }),
  //   useGetLeadMeetingsQuery({ page: START_PAGE, id }),
  //   useGetLeadCallsQuery({ page: START_PAGE, id }),
  //   useGetLeadStatusChangesQuery({ page: START_PAGE, id }),
  //   ...useGetLeadTasksQuery({ page: START_PAGE, id }).map((task) =>
  //     setTaskChanges(useGetLeadTaskChangesQuery({ page: START_PAGE, id }))
  //   ),
  // ];
  const { data, isFetching } = useAllPagesData<ILeadTasksResponse['data']>(
    ApiRoute.QOBRIX_GET_LEAD_TASKS,
    [],
    'e52f7f35-b3fd-488f-a13f-aa00c4c15177'
  );
  // let pageSms = START_PAGE;

  if (!data?.pagination.has_next_page) {
    console.log(data);
  }

  // const [sms, setSms] = useState({});
  // setSms((prev) => ({ ...prev, ...data }));
  // do {
  //   pageSms += 1;
  // } while (smses?.pagination.hasNextPage);

  // let pageEmail = START_PAGE;
  // const { data: emails } = useGetLeadEmailsQuery({ page: pageEmail, id });

  // do {
  //   pageEmail += 1;
  // } while (emails?.pagination.hasNextPage);

  // let pageCall = START_PAGE;
  // const { data: calls } = useGetLeadCallsQuery({ page: pageCall, id });

  // do {
  //   pageCall += 1;
  // } while (calls?.pagination.hasNextPage);

  // let pageMeeting = START_PAGE;
  // const { data: meetings } = useGetLeadMeetingsQuery({ page: pageMeeting, id });

  // do {
  //   pageMeeting += 1;
  // } while (meetings?.pagination.hasNextPage);

  // let pageTasks = START_PAGE;
  // const { data: tasks } = useGetLeadTasksQuery({ page: pageTasks, id });

  // do {
  //   pageTasks += 1;
  // } while (tasks?.pagination.hasNextPage);

  // let pageStatus = START_PAGE;
  // const { data: statuses } = useGetLeadStatusChangesQuery({ page: pageStatus, id });

  // do {
  //   pageStatus += 1;
  // } while (statuses?.pagination.hasNextPage);

  // let pageTask = START_PAGE;

  // for (const task of tasks.data) {
  //   const { data: taskChanges } = useGetLeadTaskChangesQuery({ page: pageTask, id });

  //   do {
  //     pageTask += 1;
  //   } while (taskChanges?.pagination.hasNextPage);
  // }

  // const emails = useGetLeadEmailsQuery({ page: START_PAGE, id });
  // const meetings = useGetLeadMeetingsQuery({ page: START_PAGE, id });
  // const calls = useGetLeadCallsQuery({ page: START_PAGE, id });
  // const tasks = useGetLeadTasksQuery({ page: START_PAGE, id });
  // tasks.forEach((task) => setTaskChanges(useGetLeadTaskChangesQuery({ page: START_PAGE, id })));
  // const statuses = useGetLeadStatusChangesQuery({ page: START_PAGE, id });

  // useEffect(() => {
  //   setHistory(...smses, ...emails, ...meetings, ...statuses, ...calls, ...tasksChanhelog);
  // }, []);

  // ('sms https://trial5251.eu1.qobrix.com/api/v2/sms-messages/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  // ('emails https://trial5251.eu1.qobrix.com/api/v2/email-messages/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  // ('tasks https://trial5251.eu1.qobrix.com/api/v2/tasks/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  // ('tasks by id https://trial5251.eu1.qobrix.com/api/v2/workflows/taskWorkflowId/stages');
  // ('meetings https://trial5251.eu1.qobrix.com/api/v2/meetings/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  // ('calls https://trial5251.eu1.qobrix.com/api/v2/calls/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  // ('statuses https://trial5251.eu1.qobrix.com/api/v2/opportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/changes');

  return (
    <>
      {history.length !== 0 && (
        <>
          {/* <Typography variant="h4" color="text.secondary">
            {t('budget')}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <LeadDetailsInfoBlock label={t('buyRent')} info={toTitleCase(buyRent)} />
            </Grid>
            <LeadBuyRentInfo
              infoKeys={QobrixPriceKeysBuyRent[buyRent as ValueOf<typeof QobrixLeadBuyRent>]}
              lead={lead}
            />
          </Grid> */}
        </>
      )}
    </>
  );
};

export { LeadHistorySection };
