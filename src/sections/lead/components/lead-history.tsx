import { QobrixLead, ValueOf } from 'types';
import { toTitleCase } from 'utils';
import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'hooks';

type Props = { lead: QobrixLead };

const LeadHistorySection = ({ lead }: Props) => {
  const { id, created } = lead;
  ('https://trial5251.eu1.qobrix.com/api/v2/sms-messages/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('https://trial5251.eu1.qobrix.com/api/v2/email-messages/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('https://trial5251.eu1.qobrix.com/api/v2/tasks/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('https://trial5251.eu1.qobrix.com/api/v2/workflows/taskWorkflowId/stages');
  ('https://trial5251.eu1.qobrix.com/api/v2/meetings/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('https://trial5251.eu1.qobrix.com/api/v2/calls/related-with/RelatedOpportunityOpportunities/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('https://trial5251.eu1.qobrix.com/api/v2/opportunities/related-with/ConversionStatusWorkflowStages/e52f7f35-b3fd-488f-a13f-aa00c4c15177/');
  ('https://trial5251.eu1.qobrix.com/api/v2/workflows?search=resource%20%3D%3D%20%22Opportunities%22');
  `search = resource == 'Opportunities'`;
  const t = useTranslations('leadDetailsPage');

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
