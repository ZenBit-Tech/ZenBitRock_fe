import { Grid, Typography } from '@mui/material';
import { QobrixLead } from 'types';
import { useTranslations } from 'hooks';
import { toTitleCase } from 'utils';
import { LeadDetailsInfoBlock } from './lead-details-info-block';

type Props = { lead: QobrixLead };

const LeadDetailsSourceSection = ({ lead }: Props) => {
  const t = useTranslations('leadDetailsPage');

  return (
    <>
      {lead.source && (
        <>
          <Typography variant="h4" color="text.secondary">
            {t('sourceDetails')}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <LeadDetailsInfoBlock label={t('source')} info={toTitleCase(lead.source)} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export { LeadDetailsSourceSection };
