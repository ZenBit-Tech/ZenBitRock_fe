// import { Typography, Grid } from '@mui/material';
import { useEffect, useState, useTranslations } from 'hooks';
import {
  useGetCallsQuery,
  useGetChangelogsQuery,
  useGetEmailsQuery,
  useGetMeetingsQuery,
  useGetSmsesQuery,
  useGetTasksQuery,
  useGetTasksWorkflowQuery,
} from 'store/api/qobrixApi';
import { QobrixLead } from 'types';

type Props = { lead: QobrixLead };

const LeadHistorySection = ({ lead }: Props) => {
  const [history, setHistory] = useState<IHistories>({});
  const [tasksChanhelog, setTasksChangelog] = useState<ILeadTasks>(null);
  const { id } = lead;

  const t = useTranslations('leadDetailsPage');

  const smses = useGetSmsesQuery(id);
  const emails = useGetEmailsQuery(id);
  const meetings = useGetMeetingsQuery(id);
  const calls = useGetCallsQuery(id);
  const tasks = useGetTasksQuery(id);
  tasks.forEach((task) => setTasksChangelog(useGetTasksWorkflowQuery(task.id)));
  const statuses = useGetChangelogsQuery(id);

  useEffect(() => {
    setHistory(...smses, ...emails, ...meetings, ...statuses, ...calls, ...tasksChanhelog);
  }, []);

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
          <Typography variant="h4" color="text.secondary">
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
          </Grid>
        </>
      )}
    </>
  );
};

export { LeadHistorySection };
