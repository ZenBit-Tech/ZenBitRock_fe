import { useEffect, useTranslations } from 'hooks';

type Props = { lead: QobrixLead };

const LeadHistorySection = ({ lead }: Props) => {
  const { id, created } = lead;
  ('sms https://trial5251.eu1.qobrix.com/api/v2/sms-messages/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('emails https://trial5251.eu1.qobrix.com/api/v2/email-messages/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('tasks https://trial5251.eu1.qobrix.com/api/v2/tasks/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('tasks by id https://trial5251.eu1.qobrix.com/api/v2/workflows/taskWorkflowId/stages');
  ('meetings https://trial5251.eu1.qobrix.com/api/v2/meetings/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('calls https://trial5251.eu1.qobrix.com/api/v2/calls/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('statuses https://trial5251.eu1.qobrix.com/api/v2/opportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/changes');

  const t = useTranslations('leadDetailsPage');

  useEffect(() => {
    const smses = useGetSmsesQuery(id);
    const emails = useGetEmailsQuery(id);
    const meetings = useGetMeetingsQuery(id);
    const calls = useGetCallsQuery(id);
    const tasks = useGetTasksQuery(id);
    tasks.forEach((task) => useGetTasksByLeadQuery(task.id));
    const statuses = useGetStatusesQuery(id);
  }, []);

  return (
    <>
      {isValidBuyRent && (
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
